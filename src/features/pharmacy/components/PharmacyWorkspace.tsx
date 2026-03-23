"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Filter,
  Pill,
  Search,
  Syringe,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import {
  deletePrescriptionDraftItem,
  getPharmacyWorkspace,
  type GetPharmacyWorkspaceData,
  upsertPrescriptionDraft,
  upsertPrescriptionDraftItem,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import {
  createClientId,
  formatCurrencyVnd,
  getActiveDoctorUid,
  nowIsoString,
} from "@/shared/lib/medassist-runtime";
import { PrescriptionPdfSheet } from "./PrescriptionPdfSheet";

type DraftItem = GetPharmacyWorkspaceData["prescriptionDraftItems"][number];
type CatalogDrug = GetPharmacyWorkspaceData["drugCatalogItems"][number];
type TemplateDrug = GetPharmacyWorkspaceData["prescriptionTemplateDrugs"][number];
type Feedback = { tone: "success" | "error"; message: string } | null;
type EditableField = "quantity" | "dosage" | "timing" | "duration";

const iconTone = {
  scissors: "bg-[#eef4ff] text-[#2977ff]",
  eye: "bg-emerald-50 text-emerald-500",
  thermometer: "bg-orange-50 text-orange-500",
  heart: "bg-violet-50 text-violet-500",
} as const;

const VI_TEXT_OVERRIDES: Record<string, string> = {
  "phac do vong mac": "Phác đồ võng mạc",
  "kiem soat kho mat": "Kiểm soát khô mắt",
  "tai kham sau hoi chan": "Tái khám sau hội chẩn",
  "cham soc sau kham": "Chăm sóc sau khám",
  "kiem soat duong huyet & vi tuan hoan": "Kiểm soát đường huyết và vi tuần hoàn",
  "kiem soat duong huyet va vi tuan hoan": "Kiểm soát đường huyết và vi tuần hoàn",
  "giam kich ung & bo sung nuoc mat": "Giảm kích ứng và bổ sung nước mắt",
  "giam kich ung va bo sung nuoc mat": "Giảm kích ứng và bổ sung nước mắt",
  "theo doi va bo sung vitamin": "Theo dõi và bổ sung vitamin",
  "huong dan ngan han": "Hướng dẫn ngắn hạn",
};

function toViOverrideKey(value: string) {
  return value
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/[•|]/g, " ")
    .replace(/[.,;:]/g, "")
    .replace(/\s+/g, " ");
}

function normalizeViText(value?: string | null) {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  return VI_TEXT_OVERRIDES[toViOverrideKey(trimmed)] || trimmed;
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return fallback;
}

function findLatestDraftForPatient(
  data: GetPharmacyWorkspaceData,
  patientUid?: string | null
) {
  const drafts = (data.prescriptionDrafts ?? []).filter(
    (item) => !patientUid || item.patientUid === patientUid
  );
  if (!drafts.length) {
    return null;
  }

  return drafts
    .slice()
    .sort((left, right) => (right.updatedAt || "").localeCompare(left.updatedAt || ""))[0];
}

function SectionIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf5ff] text-[#2977ff]">
      <Syringe className="h-5 w-5" />
    </div>
  );
}

function feedbackClass(tone: NonNullable<Feedback>["tone"]) {
  return tone === "success"
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border-red-200 bg-red-50 text-red-700";
}

export function PharmacyWorkspace() {
  const router = useRouter();
  const pdfTemplateRef = useRef<HTMLDivElement | null>(null);
  const [workspace, setWorkspace] = useState<GetPharmacyWorkspaceData | null>(null);
  const [selectedPatientUid, setSelectedPatientUid] = useState("");
  const [draftId, setDraftId] = useState("");
  const [activeTemplateId, setActiveTemplateId] = useState("");
  const [selectedItems, setSelectedItems] = useState<DraftItem[]>([]);
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isSavingItemIds, setIsSavingItemIds] = useState<string[]>([]);
  const [dirtyItemIds, setDirtyItemIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    let mounted = true;

    getPharmacyWorkspace(getMedAssistDataConnect(), {
      doctorUid: getActiveDoctorUid(),
    })
      .then((response) => {
        if (!mounted) {
          return;
        }

        const data = response.data;
        setWorkspace(data);

        const initialPatientUid =
          data.prescriptionDrafts[0]?.patientUid || data.patientProfiles[0]?.userUid || "";
        const draft = findLatestDraftForPatient(data, initialPatientUid);

        setSelectedPatientUid(initialPatientUid);
        setDraftId(draft?.id || "");
        setActiveTemplateId(
          draft?.activeTemplateId || data.prescriptionTemplates[0]?.id || ""
        );
        setSelectedItems(
          draft ? data.prescriptionDraftItems.filter((item) => item.draftId === draft.id) : []
        );
        setNote(draft?.note || "");
      })
      .catch((error) => {
        console.error("Không thể tải workspace nhà thuốc:", error);
        if (mounted) {
          setFeedback({ tone: "error", message: "Không thể tải dữ liệu toa thuốc lúc này." });
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const searchKeyword = search.trim().toLowerCase();
  const patientProfiles = workspace?.patientProfiles ?? [];
  const templateTitleById = useMemo(() => {
    const map = new Map<string, string>();
    (workspace?.prescriptionTemplates ?? []).forEach((template) => {
      map.set(template.id, normalizeViText(template.title));
    });
    return map;
  }, [workspace?.prescriptionTemplates]);
  const searchMatchedTemplateDrugs = useMemo(() => {
    const candidates = (workspace?.prescriptionTemplateDrugs ?? []).filter((item) =>
      `${item.name} ${item.description} ${item.dosage} ${item.timing} ${item.duration}`
        .toLowerCase()
        .includes(searchKeyword)
    );

    const unique = new Map<string, TemplateDrug>();
    candidates.forEach((item) => {
      const key = `${normalizeViText(item.name).toLowerCase()}__${normalizeViText(item.dosage).toLowerCase()}`;
      if (!unique.has(key)) {
        unique.set(key, item);
      }
    });

    return Array.from(unique.values()).sort((left, right) =>
      normalizeViText(left.name).localeCompare(normalizeViText(right.name), "vi")
    );
  }, [searchKeyword, workspace?.prescriptionTemplateDrugs]);
  const templates = useMemo(
    () => {
      const templateDrugs = workspace?.prescriptionTemplateDrugs ?? [];
      return (workspace?.prescriptionTemplates ?? []).filter((item) => {
        if (!searchKeyword) {
          return true;
        }

        const templateText = `${item.title} ${item.subtitle} ${item.specialty} ${item.summary}`.toLowerCase();
        if (templateText.includes(searchKeyword)) {
          return true;
        }

        return templateDrugs.some(
          (drug) =>
            drug.templateId === item.id &&
            `${drug.name} ${drug.description} ${drug.dosage} ${drug.timing} ${drug.duration}`
              .toLowerCase()
              .includes(searchKeyword)
        );
      });
    },
    [searchKeyword, workspace?.prescriptionTemplateDrugs, workspace?.prescriptionTemplates]
  );
  const allCatalogDrugs = useMemo(
    () =>
      (workspace?.drugCatalogItems ?? [])
        .filter((item) => item.isAvailable)
        .filter((item) =>
          `${item.name} ${item.description} ${item.activeIngredient || ""} ${item.category} ${item.searchKeywords || ""}`
            .toLowerCase()
            .includes(searchKeyword)
        )
        .sort((left, right) => normalizeViText(left.name).localeCompare(normalizeViText(right.name), "vi")),
    [searchKeyword, workspace?.drugCatalogItems]
  );

  const activeTemplate =
    templates.find((item) => item.id === activeTemplateId) ??
    workspace?.prescriptionTemplates[0] ??
    null;
  const activeDrugs = (workspace?.prescriptionTemplateDrugs ?? []).filter(
    (item) => item.templateId === activeTemplate?.id
  );
  const patient =
    patientProfiles.find((profile) => profile.userUid === selectedPatientUid)?.user ??
    patientProfiles[0]?.user ??
    null;
  const patientProfile =
    patientProfiles.find((profile) => profile.userUid === (selectedPatientUid || patient?.uid)) ??
    patientProfiles[0] ??
    null;
  const orderedItems = useMemo(
    () => selectedItems.slice().sort((left, right) => left.displayOrder - right.displayOrder),
    [selectedItems]
  );
  const selectedNameSet = useMemo(
    () =>
      new Set(orderedItems.map((item) => normalizeViText(item.drugName).toLowerCase())),
    [orderedItems]
  );
  const selectedCatalogSourceSet = useMemo(
    () =>
      new Set(
        orderedItems
          .filter((item) => (item.sourceType || "").toLowerCase() === "catalog")
          .map((item) => item.sourceId)
      ),
    [orderedItems]
  );
  const totalPriceValue = orderedItems.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = formatCurrencyVnd(totalPriceValue);
  const issuedDate = useMemo(
    () =>
      new Date().toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    []
  );
  const prescriptionCode =
    draftId || `RX-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}`;

  const ensureDraft = async () => {
    if (draftId) {
      return draftId;
    }

    const patientUid = selectedPatientUid || patient?.uid || workspace?.patientProfiles[0]?.userUid;
    if (!patientUid) {
      throw new Error("Không có bệnh nhân để tạo đơn thuốc.");
    }

    const nextDraftId = createClientId("rx-draft");
    await upsertPrescriptionDraft(getMedAssistDataConnect(), {
      id: nextDraftId,
      doctorUid: getActiveDoctorUid(),
      patientUid,
      activeTemplateId: activeTemplateId || workspace?.prescriptionTemplates[0]?.id || null,
      note,
      status: "DRAFT",
      updatedAt: nowIsoString(),
    });
    setDraftId(nextDraftId);
    return nextDraftId;
  };

  const downloadPrescriptionPdf = async (currentDraftId: string) => {
    if (!pdfTemplateRef.current) {
      throw new Error("Không thể tạo mẫu PDF đơn thuốc.");
    }

    setIsExportingPdf(true);
    try {
      const [{ toPng }, { jsPDF }] = await Promise.all([
        import("html-to-image"),
        import("jspdf/dist/jspdf.es.min.js"),
      ]);

      const templateElement = pdfTemplateRef.current;
      const rect = templateElement.getBoundingClientRect();
      const sourceWidth = Math.max(
        1,
        Math.round(rect.width || templateElement.scrollWidth || templateElement.offsetWidth)
      );
      const sourceHeight = Math.max(
        1,
        Math.round(rect.height || templateElement.scrollHeight || templateElement.offsetHeight)
      );

      let imageData = "";
      try {
        imageData = await toPng(templateElement, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
        });
      } catch (toPngError) {
        const { default: html2canvas } = await import("html2canvas");
        const fallbackCanvas = await html2canvas(templateElement, {
          backgroundColor: "#ffffff",
          scale: 2,
          useCORS: true,
          logging: false,
        });
        imageData = fallbackCanvas.toDataURL("image/png");
        console.warn("Xuất PDF đã chuyển sang cơ chế dự phòng.", toPngError);
      }

      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const ratio = Math.min(
        (pageWidth - margin * 2) / sourceWidth,
        (pageHeight - margin * 2) / sourceHeight
      );
      const imageWidth = sourceWidth * ratio;
      const imageHeight = sourceHeight * ratio;
      const offsetX = (pageWidth - imageWidth) / 2;
      const offsetY = (pageHeight - imageHeight) / 2;

      pdf.addImage(imageData, "PNG", offsetX, offsetY, imageWidth, imageHeight);
      pdf.save(`don-thuoc-${currentDraftId}.pdf`);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const applyTemplate = async () => {
    if (!activeTemplate) {
      return;
    }

    try {
      const currentDraftId = await ensureDraft();
      const created = await Promise.all(
        activeDrugs.map(async (drug, index) => {
          const nextItem = {
            id: createClientId("rx-item"),
            draftId: currentDraftId,
            drugName: normalizeViText(drug.name),
            note: normalizeViText(drug.description),
            quantity: drug.quantity,
            unit: drug.unit,
            dosage: normalizeViText(drug.dosage),
            timing: normalizeViText(drug.timing),
            duration: normalizeViText(drug.duration),
            price: drug.price,
            sourceType: "template",
            sourceId: drug.id,
            displayOrder: orderedItems.length + index + 1,
          };

          await upsertPrescriptionDraftItem(getMedAssistDataConnect(), nextItem);
          return nextItem;
        })
      );

      setSelectedItems((current) => {
        const merged = new Map(current.map((item) => [item.drugName, item]));
        created.forEach((item) => merged.set(item.drugName, item as DraftItem));
        return Array.from(merged.values()).sort((left, right) => left.displayOrder - right.displayOrder);
      });
      setFeedback({ tone: "success", message: "Đã áp dụng đơn thuốc mẫu vào đơn hiện tại." });
      setModalOpen(false);
    } catch (error) {
      console.error("Không thể áp dụng đơn thuốc mẫu:", error);
      setFeedback({ tone: "error", message: "Không thể áp dụng đơn thuốc mẫu lúc này." });
    }
  };

  const addCatalogDrug = async (drug: CatalogDrug) => {
    try {
      const normalizedName = normalizeViText(drug.name).toLowerCase();
      const alreadyExists =
        selectedCatalogSourceSet.has(drug.id) || selectedNameSet.has(normalizedName);

      if (alreadyExists) {
        setFeedback({ tone: "error", message: "Thuốc này đã có trong đơn hiện tại." });
        return;
      }

      const currentDraftId = await ensureDraft();
      const nextDisplayOrder =
        selectedItems.reduce((max, item) => Math.max(max, item.displayOrder), 0) + 1;

      const nextItem = {
        id: createClientId("rx-item"),
        draftId: currentDraftId,
        drugName: normalizeViText(drug.name),
        note: normalizeViText(drug.description || drug.activeIngredient || ""),
        quantity: "1",
        unit: normalizeViText(drug.unit || "viên"),
        dosage: "1 lần/ngày",
        timing: "Sau ăn",
        duration: "7 ngày",
        price: drug.price,
        sourceType: "catalog",
        sourceId: drug.id,
        displayOrder: nextDisplayOrder,
      };

      await upsertPrescriptionDraftItem(getMedAssistDataConnect(), nextItem);
      setSelectedItems((current) =>
        [...current, nextItem as DraftItem].sort(
          (left, right) => left.displayOrder - right.displayOrder
        )
      );
      setFeedback({ tone: "success", message: "Đã thêm thuốc vào đơn." });
    } catch (error) {
      console.error("Không thể thêm thuốc từ kho vào đơn:", error);
      setFeedback({ tone: "error", message: "Không thể thêm thuốc lúc này." });
    }
  };

  const addTemplateDrug = async (drug: TemplateDrug) => {
    try {
      const normalizedName = normalizeViText(drug.name).toLowerCase();
      const alreadyExists =
        selectedNameSet.has(normalizedName) ||
        orderedItems.some(
          (item) =>
            (item.sourceType || "").toLowerCase() === "template" &&
            (item.sourceId || "") === drug.id
        );

      if (alreadyExists) {
        setFeedback({ tone: "error", message: "Thuốc này đã có trong đơn hiện tại." });
        return;
      }

      const currentDraftId = await ensureDraft();
      const nextDisplayOrder =
        selectedItems.reduce((max, item) => Math.max(max, item.displayOrder), 0) + 1;

      const nextItem = {
        id: createClientId("rx-item"),
        draftId: currentDraftId,
        drugName: normalizeViText(drug.name),
        note: normalizeViText(drug.description),
        quantity: drug.quantity || "1",
        unit: normalizeViText(drug.unit || "viên"),
        dosage: normalizeViText(drug.dosage || "1 lần/ngày"),
        timing: normalizeViText(drug.timing || "Sau ăn"),
        duration: normalizeViText(drug.duration || "7 ngày"),
        price: drug.price,
        sourceType: "template",
        sourceId: drug.id,
        displayOrder: nextDisplayOrder,
      };

      await upsertPrescriptionDraftItem(getMedAssistDataConnect(), nextItem);
      setSelectedItems((current) =>
        [...current, nextItem as DraftItem].sort(
          (left, right) => left.displayOrder - right.displayOrder
        )
      );
      setFeedback({ tone: "success", message: "Đã thêm thuốc từ đơn mẫu vào đơn." });
    } catch (error) {
      console.error("Không thể thêm thuốc từ đơn mẫu:", error);
      setFeedback({ tone: "error", message: "Không thể thêm thuốc lúc này." });
    }
  };

  const handlePatientChange = (patientUid: string) => {
    setSelectedPatientUid(patientUid);

    if (!workspace) {
      return;
    }

    const nextDraft = findLatestDraftForPatient(workspace, patientUid);
    setDraftId(nextDraft?.id || "");
    setActiveTemplateId(nextDraft?.activeTemplateId || workspace.prescriptionTemplates[0]?.id || "");
    setSelectedItems(
      nextDraft
        ? workspace.prescriptionDraftItems.filter((item) => item.draftId === nextDraft.id)
        : []
    );
    setNote(nextDraft?.note || "");
    setDirtyItemIds([]);
    setIsSavingItemIds([]);
  };

  const markItemDirty = (itemId: string) => {
    setDirtyItemIds((current) =>
      current.includes(itemId) ? current : [...current, itemId]
    );
  };

  const unmarkItemDirty = (itemId: string) => {
    setDirtyItemIds((current) => current.filter((id) => id !== itemId));
  };

  const markItemSaving = (itemId: string) => {
    setIsSavingItemIds((current) =>
      current.includes(itemId) ? current : [...current, itemId]
    );
  };

  const unmarkItemSaving = (itemId: string) => {
    setIsSavingItemIds((current) => current.filter((id) => id !== itemId));
  };

  const updateItemFieldLocal = (
    itemId: string,
    field: EditableField,
    value: string
  ) => {
    setSelectedItems((current) =>
      current.map((item) =>
        item.id === itemId
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
    markItemDirty(itemId);
  };

  const persistDraftItem = async (itemId: string) => {
    const item = selectedItems.find((entry) => entry.id === itemId);
    if (!item) {
      return;
    }
    if (!dirtyItemIds.includes(itemId)) {
      return;
    }

    markItemSaving(itemId);
    try {
      const currentDraftId = item.draftId || (await ensureDraft());
      await upsertPrescriptionDraftItem(getMedAssistDataConnect(), {
        id: item.id,
        draftId: currentDraftId,
        drugName: normalizeViText(item.drugName),
        note: normalizeViText(item.note),
        quantity: item.quantity,
        unit: item.unit,
        dosage: normalizeViText(item.dosage),
        timing: normalizeViText(item.timing),
        duration: normalizeViText(item.duration),
        price: item.price,
        sourceType: item.sourceType,
        sourceId: item.sourceId,
        displayOrder: item.displayOrder,
      });
      unmarkItemDirty(itemId);
    } catch (error) {
      console.error("Không thể lưu thay đổi thuốc:", error);
      setFeedback({
        tone: "error",
        message: "Không thể lưu thay đổi của thuốc. Vui lòng thử lại.",
      });
    } finally {
      unmarkItemSaving(itemId);
    }
  };

  const persistAllDirtyItems = async () => {
    const dirtyIds = [...dirtyItemIds];
    for (const itemId of dirtyIds) {
      await persistDraftItem(itemId);
    }
  };

  const removeItem = async (item: DraftItem) => {
    try {
      await deletePrescriptionDraftItem(getMedAssistDataConnect(), { id: item.id });
      setSelectedItems((current) => current.filter((entry) => entry.id !== item.id));
      unmarkItemDirty(item.id);
      unmarkItemSaving(item.id);
    } catch (error) {
      console.error("Không thể xóa thuốc khỏi đơn:", error);
      setFeedback({ tone: "error", message: "Không thể xóa thuốc khỏi đơn lúc này." });
    }
  };

  const saveDraft = async (status: "DRAFT" | "FINALIZED") => {
    const hasPatient = Boolean(selectedPatientUid || patient?.uid || workspace?.patientProfiles[0]?.userUid);

    if (status === "DRAFT" && !hasPatient) {
      setFeedback({ tone: "error", message: "Chưa có bệnh nhân để lưu đơn thuốc." });
      return;
    }

    if (!orderedItems.length) {
      setFeedback({ tone: "error", message: "Hãy thêm ít nhất một thuốc trước khi lưu đơn." });
      return;
    }

    try {
      let currentDraftId = draftId || createClientId("rx-draft");
      let persisted = false;

      if (hasPatient) {
        currentDraftId = await ensureDraft();
        await persistAllDirtyItems();
        await upsertPrescriptionDraft(getMedAssistDataConnect(), {
          id: currentDraftId,
          doctorUid: getActiveDoctorUid(),
          patientUid:
            selectedPatientUid || patient?.uid || workspace?.patientProfiles[0]?.userUid || "",
          activeTemplateId: activeTemplate?.id || null,
          note,
          status,
          updatedAt: nowIsoString(),
        });
        setDraftId(currentDraftId);
        persisted = true;
      }

      if (status === "FINALIZED") {
        await downloadPrescriptionPdf(currentDraftId);
        setFeedback({
          tone: "success",
          message: persisted
            ? "Đã hoàn tất đơn thuốc và xuất PDF theo mẫu chuẩn."
            : "Đã xuất PDF thành công. Đơn chưa lưu vì chưa có bệnh nhân.",
        });
        return;
      }

      setFeedback({ tone: "success", message: "Đã lưu đơn thuốc nháp." });
    } catch (error) {
      console.error("Không thể lưu đơn thuốc:", error);
      setFeedback({
        tone: "error",
        message: `Không thể lưu đơn thuốc lúc này. ${getErrorMessage(error, "")}`,
      });
    }
  };

  const exportCurrentPrescriptionPdf = async () => {
    if (!orderedItems.length) {
      setFeedback({ tone: "error", message: "Chưa có thuốc trong đơn để xuất PDF." });
      return;
    }

    try {
      let currentDraftId = draftId || createClientId("rx-draft");
      const hasPatient = Boolean(
        selectedPatientUid || patient?.uid || workspace?.patientProfiles[0]?.userUid
      );

      if (hasPatient) {
        currentDraftId = await ensureDraft();
        await persistAllDirtyItems();
      }

      await downloadPrescriptionPdf(currentDraftId);
      setFeedback({ tone: "success", message: "Đã xuất đơn thuốc PDF thành công." });
    } catch (error) {
      console.error("Không thể xuất đơn thuốc PDF:", error);
      setFeedback({
        tone: "error",
        message: `Không thể xuất đơn thuốc PDF lúc này. ${getErrorMessage(error, "")}`,
      });
    }
  };

  return (
    <>
      <section className="space-y-6">
        {feedback ? (
          <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${feedbackClass(feedback.tone)}`}>
            {feedback.message}
          </div>
        ) : null}

        <div className="grid gap-4 xl:grid-cols-[1.6fr_0.5fr]">
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -mt-px -translate-y-6">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm kiếm đơn thuốc mẫu hoặc thuốc..."
              className="w-full rounded-[20px] border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm text-slate-700 outline-none focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
            />
          </div>

          <div className="flex items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                <UserRound className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Bệnh nhân</p>
                <select
                  value={selectedPatientUid}
                  onChange={(event) => handlePatientChange(event.target.value)}
                  className="mt-1 w-full max-w-[260px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-[#8db7da] focus:ring-2 focus:ring-[#8db7da]/15"
                >
                  {patientProfiles.map((profile) => (
                    <option key={profile.userUid} value={profile.userUid}>
                      {normalizeViText(profile.user.displayName)}{" "}
                      {profile.user.userCode ? `• ${profile.user.userCode}` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => (patient?.uid ? router.push(`/dashboard/patient/${patient.uid}`) : null)}
              className="text-sm font-semibold text-[#2977ff] hover:text-[#1e66dc]"
            >
              Chi tiết
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <SectionIcon />
              <h2 className="text-[26px] font-bold tracking-tight text-slate-900">Kê đơn cho bệnh nhân</h2>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2977ff] hover:text-[#1e66dc]"
            >
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => {
                  setActiveTemplateId(template.id);
                  setModalOpen(true);
                }}
                className="rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-[0_12px_26px_rgba(148,163,184,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#bfd8f1]"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconTone[(template.iconKey as keyof typeof iconTone) || "scissors"] || iconTone.scissors}`}>
                  <Pill className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {normalizeViText(template.title)}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {normalizeViText(template.subtitle)}
                </p>
                <p className="mt-4 text-sm font-semibold text-slate-500">
                  {(workspace?.prescriptionTemplateDrugs ?? []).filter((item) => item.templateId === template.id).length} loại thuốc
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_32px_rgba(148,163,184,0.08)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <SectionIcon />
              <h2 className="text-[26px] font-bold tracking-tight text-slate-900">Danh sách thuốc đã chọn</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => saveDraft("DRAFT")}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Lưu nháp
              </button>
              <button
                type="button"
                onClick={exportCurrentPrescriptionPdf}
                disabled={isExportingPdf || !orderedItems.length}
                className="rounded-2xl border border-[#bfd8f1] bg-[#f5fafe] px-5 py-3 text-sm font-semibold text-[#35678E] hover:bg-[#e8f3ff] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isExportingPdf ? "Đang tạo PDF..." : "Xuất đơn PDF"}
              </button>
              <button
                type="button"
                onClick={() => saveDraft("FINALIZED")}
                disabled={isExportingPdf}
                className="rounded-2xl bg-gradient-to-r from-[#5a96cb] to-[#6aa7db] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(90,150,203,0.26)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isExportingPdf ? "Đang xuất PDF..." : "Hoàn tất đơn thuốc"}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-100 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  <th className="px-5 py-4">Tên thuốc và hàm lượng</th>
                  <th className="px-5 py-4">Số lượng</th>
                  <th className="px-5 py-4">Liều dùng / ngày</th>
                  <th className="px-5 py-4">Thời gian</th>
                  <th className="px-5 py-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orderedItems.map((drug) => (
                  <tr key={drug.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-5 py-5 align-top">
                      <p className="text-base font-semibold text-slate-900">
                        {normalizeViText(drug.drugName)}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        {normalizeViText(drug.note)}
                      </p>
                    </td>
                    <td className="px-5 py-5 align-top">
                      <input
                        value={drug.quantity}
                        onChange={(event) =>
                          updateItemFieldLocal(drug.id, "quantity", event.target.value)
                        }
                        onBlur={() => void persistDraftItem(drug.id)}
                        className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-sm font-semibold text-slate-800 outline-none focus:border-[#8db7da] focus:ring-2 focus:ring-[#8db7da]/15"
                      />
                      <p className="mt-1 text-slate-400">{normalizeViText(drug.unit)}</p>
                    </td>
                    <td className="px-5 py-5 align-top">
                      <input
                        value={drug.dosage}
                        onChange={(event) =>
                          updateItemFieldLocal(drug.id, "dosage", event.target.value)
                        }
                        onBlur={() => void persistDraftItem(drug.id)}
                        className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm font-medium text-slate-700 outline-none focus:border-[#8db7da] focus:ring-2 focus:ring-[#8db7da]/15"
                      />
                      <input
                        value={drug.timing}
                        onChange={(event) =>
                          updateItemFieldLocal(drug.id, "timing", event.target.value)
                        }
                        onBlur={() => void persistDraftItem(drug.id)}
                        className="mt-2 w-full rounded-lg border border-slate-200 px-2 py-1 text-sm text-[#4a86c6] outline-none focus:border-[#8db7da] focus:ring-2 focus:ring-[#8db7da]/15"
                      />
                    </td>
                    <td className="px-5 py-5 align-top">
                      <input
                        value={drug.duration}
                        onChange={(event) =>
                          updateItemFieldLocal(drug.id, "duration", event.target.value)
                        }
                        onBlur={() => void persistDraftItem(drug.id)}
                        className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm font-medium text-slate-700 outline-none focus:border-[#8db7da] focus:ring-2 focus:ring-[#8db7da]/15"
                      />
                      {isSavingItemIds.includes(drug.id) ? (
                        <p className="mt-1 text-[11px] font-medium text-[#35678E]">Đang lưu...</p>
                      ) : dirtyItemIds.includes(drug.id) ? (
                        <p className="mt-1 text-[11px] font-medium text-amber-600">Chưa lưu</p>
                      ) : (
                        <p className="mt-1 text-[11px] font-medium text-emerald-600">Đã lưu</p>
                      )}
                    </td>
                    <td className="px-5 py-5 align-top text-center">
                      <button
                        type="button"
                        onClick={() => removeItem(drug)}
                        className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-5 border-t border-slate-100 px-5 py-5 xl:grid-cols-[1fr_auto] xl:items-end">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Lời dặn bác sĩ</p>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Nhập hướng dẫn dùng thuốc, lưu ý tái khám hoặc theo dõi thêm..."
                className="min-h-[86px] w-full rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
              />
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Tạm tính chi phí</p>
              <p className="mt-2 text-[38px] font-bold tracking-tight text-[#5a96cb]">{totalPrice}</p>
              <p className="mt-1 text-xs text-slate-400">Giá tham khảo tại kho dược nội viện</p>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && activeTemplate ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm">
          <div className="flex max-h-[88vh] w-full max-w-[860px] flex-col overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_36px_80px_rgba(15,23,42,0.26)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-7 py-5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                >
                  <ChevronRight className="h-5 w-5 rotate-180" />
                </button>
                <h2 className="text-[22px] font-bold tracking-tight text-slate-900">
                  Thư viện thuốc và đơn mẫu
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-7 overflow-y-auto px-7 py-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute left-4 top-1/2 -mt-px -translate-y-1/2">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Tìm kiếm tên thuốc, hoạt chất hoặc đơn mẫu..."
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-700 outline-none focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Filter className="h-4 w-4" />
                  Lọc
                </button>
              </div>

              <div className="rounded-[28px] border border-[#cfe0f6] bg-[#f7fbff] p-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                      <span className="rounded-full bg-[#fff2e6] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#f28f34]">
                        {normalizeViText(activeTemplate.badge)}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span>{normalizeViText(activeTemplate.specialty)}</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-[28px] font-bold tracking-tight text-slate-900">
                        {normalizeViText(activeTemplate.title)}
                      </h4>
                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        {normalizeViText(activeTemplate.summary)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-[20px] bg-[#e7f1ff] p-4 text-[#2977ff] hover:bg-[#dcecff]"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4 rounded-[24px] border border-slate-100 bg-white/80 p-4">
                  {activeDrugs.map((drug) => (
                    <div
                      key={drug.id}
                      className="flex flex-col gap-4 rounded-[22px] border border-slate-100 bg-white px-5 py-4 shadow-[0_8px_20px_rgba(148,163,184,0.08)] sm:flex-row sm:items-start sm:justify-between"
                    >
                      <div>
                        <p className="text-[18px] font-bold text-slate-900">
                          {normalizeViText(drug.name)}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          {normalizeViText(drug.description)}
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-600">
                          {normalizeViText(drug.dosage)}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-[16px] font-semibold text-slate-900">
                          {drug.quantity} {drug.unit}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          {normalizeViText(drug.duration)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={applyTemplate}
                  className="mt-5 flex w-full items-center justify-center gap-3 rounded-[22px] bg-gradient-to-r from-[#5a96cb] to-[#6aa7db] px-6 py-4 text-lg font-semibold text-white shadow-[0_14px_28px_rgba(90,150,203,0.28)] transition-transform hover:-translate-y-0.5"
                >
                  Áp dụng đơn mẫu này
                </button>
              </div>

              {searchKeyword ? (
                <div className="rounded-[28px] border border-slate-200 bg-white p-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[22px] font-bold tracking-tight text-slate-900">
                        Thuốc có trong đơn mẫu
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Kết quả tìm từ các nhóm thuốc mẫu có sẵn.
                      </p>
                    </div>
                    <span className="rounded-full bg-[#f4f8fc] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#35678E]">
                      {searchMatchedTemplateDrugs.length} kết quả
                    </span>
                  </div>

                  <div className="space-y-3 rounded-[24px] border border-slate-100 bg-slate-50/60 p-4">
                    {searchMatchedTemplateDrugs.length ? (
                      searchMatchedTemplateDrugs.map((drug) => {
                        const isSelected =
                          selectedNameSet.has(normalizeViText(drug.name).toLowerCase()) ||
                          orderedItems.some(
                            (item) =>
                              (item.sourceType || "").toLowerCase() === "template" &&
                              (item.sourceId || "") === drug.id
                          );

                        return (
                          <div
                            key={drug.id}
                            className="flex flex-col gap-3 rounded-[20px] border border-slate-100 bg-white px-4 py-4 shadow-[0_6px_16px_rgba(148,163,184,0.08)] sm:flex-row sm:items-start sm:justify-between"
                          >
                            <div className="min-w-0">
                              <p className="text-[17px] font-semibold text-slate-900">
                                {normalizeViText(drug.name)}
                              </p>
                              <p className="mt-1 text-sm text-slate-500">
                                {normalizeViText(drug.description)}
                              </p>
                              <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                                Từ mẫu: {templateTitleById.get(drug.templateId) || "Đơn mẫu"}
                              </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-3">
                              <p className="text-sm font-semibold text-slate-700">
                                {formatCurrencyVnd(drug.price)}
                              </p>
                              <button
                                type="button"
                                onClick={() => void addTemplateDrug(drug)}
                                disabled={isSelected}
                                className="rounded-xl bg-[#e7f1ff] px-4 py-2 text-sm font-semibold text-[#35678E] hover:bg-[#dcecff] disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                              >
                                {isSelected ? "Đã thêm" : "Thêm vào đơn"}
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="rounded-[18px] border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
                        Không có thuốc mẫu phù hợp với từ khóa tìm kiếm.
                      </div>
                    )}
                  </div>
                </div>
              ) : null}

              <div className="rounded-[28px] border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-[24px] font-bold tracking-tight text-slate-900">
                      Tất cả thuốc đang có
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Chọn trực tiếp thuốc từ kho để thêm vào đơn hiện tại.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#edf5ff] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#35678E]">
                    {allCatalogDrugs.length} thuốc
                  </span>
                </div>

                <div className="space-y-3 rounded-[24px] border border-slate-100 bg-slate-50/60 p-4">
                  {allCatalogDrugs.length ? (
                    allCatalogDrugs.map((drug) => {
                      const isSelected =
                        selectedCatalogSourceSet.has(drug.id) ||
                        selectedNameSet.has(normalizeViText(drug.name).toLowerCase());

                      return (
                        <div
                          key={drug.id}
                          className="flex flex-col gap-3 rounded-[20px] border border-slate-100 bg-white px-4 py-4 shadow-[0_6px_16px_rgba(148,163,184,0.08)] sm:flex-row sm:items-start sm:justify-between"
                        >
                          <div className="min-w-0">
                            <p className="text-[17px] font-semibold text-slate-900">
                              {normalizeViText(drug.name)}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {normalizeViText(drug.description)}
                            </p>
                            <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                              {normalizeViText(drug.category)} • {normalizeViText(drug.unit)}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-3">
                            <p className="text-sm font-semibold text-slate-700">
                              {formatCurrencyVnd(drug.price)}
                            </p>
                            <button
                              type="button"
                              onClick={() => void addCatalogDrug(drug)}
                              disabled={isSelected}
                              className="rounded-xl bg-[#e7f1ff] px-4 py-2 text-sm font-semibold text-[#35678E] hover:bg-[#dcecff] disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                            >
                              {isSelected ? "Đã thêm" : "Thêm vào đơn"}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="rounded-[18px] border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
                      Không có thuốc phù hợp với từ khóa tìm kiếm.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <PrescriptionPdfSheet
        ref={pdfTemplateRef}
        prescriptionCode={prescriptionCode}
        issuedDate={issuedDate}
        patientName={patient?.displayName || "Bệnh nhân MedAssist"}
        patientCode={patient?.userCode || null}
        patientPhone={patient?.phone || null}
        patientDob={patientProfile?.dob || null}
        patientGender={patientProfile?.gender || null}
        doctorLabel="Bác sĩ điều trị - MedAssist"
        note={note}
        totalPrice={totalPrice}
        items={orderedItems}
      />
    </>
  );
}
