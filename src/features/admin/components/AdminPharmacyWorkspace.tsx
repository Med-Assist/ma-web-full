"use client";

import { useEffect, useState } from "react";
import { FilePlus2, Pill, Shapes, ShoppingBag } from "lucide-react";
import {
  getDoctors,
  getPharmacyWorkspace,
  type GetDoctorsData,
  type GetPharmacyWorkspaceData,
  upsertDrugCatalogItem,
  upsertPrescriptionTemplate,
  upsertPrescriptionTemplateDrug,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { createClientId } from "@/shared/lib/medassist-runtime";
import { AdminButton, AdminEmptyState, AdminInput, AdminPanel, AdminSection, AdminSelect, AdminStatCard, AdminTextarea } from "./AdminPrimitives";
import { dedupeByKey, formatDateTime } from "../lib/admin-utils";

type PharmacyBundle = {
  doctors: GetDoctorsData["users"];
  templates: GetPharmacyWorkspaceData["prescriptionTemplates"];
  templateDrugs: GetPharmacyWorkspaceData["prescriptionTemplateDrugs"];
  drugCatalog: GetPharmacyWorkspaceData["drugCatalogItems"];
  drafts: GetPharmacyWorkspaceData["prescriptionDrafts"];
  draftItems: GetPharmacyWorkspaceData["prescriptionDraftItems"];
};

export function AdminPharmacyWorkspace() {
  const [bundle, setBundle] = useState<PharmacyBundle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTemplateId, setActiveTemplateId] = useState("");
  const [templateForm, setTemplateForm] = useState({
    title: "",
    subtitle: "",
    specialty: "",
    badge: "",
    summary: "",
    iconKey: "pill",
  });
  const [templateDrugForm, setTemplateDrugForm] = useState({
    name: "",
    description: "",
    dosage: "",
    quantity: "",
    unit: "",
    timing: "",
    duration: "",
    price: "0",
  });
  const [drugForm, setDrugForm] = useState({
    name: "",
    description: "",
    activeIngredient: "",
    unit: "",
    price: "0",
    category: "",
    searchKeywords: "",
  });

  useEffect(() => {
    let mounted = true;

    const loadBundle = async () => {
      try {
        const doctorsResponse = await getDoctors(getMedAssistDataConnect());
        const doctors = doctorsResponse.data.users;
        const workspaceResponses = await Promise.all(
          doctors.map((doctor) => getPharmacyWorkspace(getMedAssistDataConnect(), { doctorUid: doctor.uid }))
        );
        const baseWorkspace = workspaceResponses[0]?.data;

        if (!mounted) {
          return;
        }

        setBundle({
          doctors,
          templates: baseWorkspace?.prescriptionTemplates ?? [],
          templateDrugs: baseWorkspace?.prescriptionTemplateDrugs ?? [],
          drugCatalog: baseWorkspace?.drugCatalogItems ?? [],
          drafts: dedupeByKey(
            workspaceResponses.flatMap((response) => response.data.prescriptionDrafts),
            (draft) => draft.id
          ),
          draftItems: dedupeByKey(
            workspaceResponses.flatMap((response) => response.data.prescriptionDraftItems),
            (item) => item.id
          ),
        });
        setActiveTemplateId(baseWorkspace?.prescriptionTemplates[0]?.id || "");
      } catch (error) {
        console.error("Không thể tải quản trị dược phẩm:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadBundle();

    return () => {
      mounted = false;
    };
  }, []);

  const templates = bundle?.templates ?? [];
  const activeTemplate = templates.find((template) => template.id === activeTemplateId) || templates[0] || null;
  const activeTemplateDrugs = (bundle?.templateDrugs ?? []).filter((item) => item.templateId === activeTemplate?.id);

  const handleCreateTemplate = async () => {
    if (!templateForm.title.trim()) {
      alert("Cần nhập tên toa mẫu.");
      return;
    }

    try {
      const nextId = createClientId("template");
      await upsertPrescriptionTemplate(getMedAssistDataConnect(), {
        id: nextId,
        title: templateForm.title.trim(),
        subtitle: templateForm.subtitle.trim(),
        specialty: templateForm.specialty.trim(),
        badge: templateForm.badge.trim(),
        summary: templateForm.summary.trim(),
        iconKey: templateForm.iconKey.trim() || "pill",
        displayOrder: templates.length,
      });

      alert("Đã tạo toa mẫu mới.");
      setActiveTemplateId(nextId);
    } catch (error) {
      console.error("Không thể tạo toa mẫu:", error);
      alert("Không thể tạo toa mẫu.");
    }
  };

  const handleAddTemplateDrug = async () => {
    if (!activeTemplate || !templateDrugForm.name.trim()) {
      alert("Cần chọn toa mẫu và nhập tên thuốc.");
      return;
    }

    try {
      await upsertPrescriptionTemplateDrug(getMedAssistDataConnect(), {
        id: createClientId("template-drug"),
        templateId: activeTemplate.id,
        name: templateDrugForm.name.trim(),
        description: templateDrugForm.description.trim(),
        dosage: templateDrugForm.dosage.trim(),
        quantity: templateDrugForm.quantity.trim(),
        unit: templateDrugForm.unit.trim(),
        timing: templateDrugForm.timing.trim(),
        duration: templateDrugForm.duration.trim(),
        price: Number(templateDrugForm.price) || 0,
        displayOrder: activeTemplateDrugs.length,
      });

      alert("Đã thêm thuốc vào toa mẫu.");
    } catch (error) {
      console.error("Không thể thêm thuốc vào toa mẫu:", error);
      alert("Không thể thêm thuốc vào toa mẫu.");
    }
  };

  const handleAddDrugCatalog = async () => {
    if (!drugForm.name.trim()) {
      alert("Cần nhập tên thuốc.");
      return;
    }

    try {
      await upsertDrugCatalogItem(getMedAssistDataConnect(), {
        id: createClientId("drug"),
        name: drugForm.name.trim(),
        description: drugForm.description.trim(),
        activeIngredient: drugForm.activeIngredient.trim() || null,
        unit: drugForm.unit.trim(),
        price: Number(drugForm.price) || 0,
        category: drugForm.category.trim(),
        searchKeywords: drugForm.searchKeywords.trim() || null,
        isAvailable: true,
      });

      alert("Đã thêm thuốc vào catalog.");
    } catch (error) {
      console.error("Không thể thêm catalog thuốc:", error);
      alert("Không thể thêm thuốc vào catalog.");
    }
  };

  return (
    <div className="space-y-6">
      <AdminSection
        eyebrow="Pharmacy Administration"
        title="Quản trị toa mẫu và dược phẩm toàn hệ thống"
        description="Admin quản lý thư viện toa mẫu, thành phần thuốc trong từng mẫu và toàn bộ catalog dược phẩm dùng chung cho các bác sĩ."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <AdminStatCard icon={Shapes} label="Toa mẫu" value={String(templates.length)} helper="Template đơn thuốc dùng chung toàn viện" tone="blue" />
          <AdminStatCard icon={FilePlus2} label="Thuốc mẫu" value={String(bundle?.templateDrugs.length || 0)} helper="Thuốc gắn bên trong các toa mẫu" tone="emerald" />
          <AdminStatCard icon={Pill} label="Catalog thuốc" value={String(bundle?.drugCatalog.length || 0)} helper="Danh mục dược phẩm quản trị có thể bổ sung" tone="amber" />
          <AdminStatCard icon={ShoppingBag} label="Draft toa" value={String(bundle?.drafts.length || 0)} helper="Toa thuốc đang được bác sĩ soạn" tone="slate" />
        </div>
      </AdminSection>

      <div className="grid gap-6 xl:grid-cols-[0.92fr,1.08fr]">
        <AdminSection
          eyebrow="Toa mẫu"
          title="Thư viện đơn thuốc"
          description="Tạo template mới và gán thuốc vào template để bác sĩ dùng nhanh khi kê toa."
        >
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput value={templateForm.title} onChange={(event) => setTemplateForm((current) => ({ ...current, title: event.target.value }))} placeholder="Tên toa mẫu" />
              <AdminInput value={templateForm.subtitle} onChange={(event) => setTemplateForm((current) => ({ ...current, subtitle: event.target.value }))} placeholder="Phụ đề" />
              <AdminInput value={templateForm.specialty} onChange={(event) => setTemplateForm((current) => ({ ...current, specialty: event.target.value }))} placeholder="Chuyên khoa" />
              <AdminInput value={templateForm.badge} onChange={(event) => setTemplateForm((current) => ({ ...current, badge: event.target.value }))} placeholder="Nhãn" />
              <AdminInput value={templateForm.iconKey} onChange={(event) => setTemplateForm((current) => ({ ...current, iconKey: event.target.value }))} placeholder="Icon key" />
              <AdminInput value={activeTemplateId} onChange={(event) => setActiveTemplateId(event.target.value)} placeholder="ID template đang chọn" />
            </div>
            <AdminTextarea rows={4} value={templateForm.summary} onChange={(event) => setTemplateForm((current) => ({ ...current, summary: event.target.value }))} placeholder="Tóm tắt sử dụng toa mẫu..." />
            <div className="flex flex-wrap gap-3">
              <AdminButton onClick={handleCreateTemplate}>
                <span className="inline-flex items-center gap-2">
                  <FilePlus2 className="h-4 w-4" />
                  Tạo toa mẫu mới
                </span>
              </AdminButton>
              <div className="min-w-[240px]">
                <AdminSelect value={activeTemplateId} onChange={(event) => setActiveTemplateId(event.target.value)}>
                  <option value="">Chọn toa mẫu để thêm thuốc</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.title}
                    </option>
                  ))}
                </AdminSelect>
              </div>
            </div>

            <AdminPanel title={activeTemplate ? `Thuốc trong: ${activeTemplate.title}` : "Chọn một toa mẫu"} helper="Danh sách thuốc đang được gắn cho toa mẫu">
              {activeTemplateDrugs.length === 0 ? (
                <AdminEmptyState message="Toa mẫu này chưa có thuốc nào." />
              ) : (
                <div className="space-y-3">
                  {activeTemplateDrugs.map((item) => (
                    <div key={item.id} className="rounded-3xl bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                        <span className="text-sm font-semibold text-slate-500">{item.price.toLocaleString("vi-VN")} đ</span>
                      </div>
                      <p className="text-sm text-slate-500">{item.dosage} • {item.quantity} {item.unit} • {item.duration}</p>
                    </div>
                  ))}
                </div>
              )}
            </AdminPanel>
          </div>
        </AdminSection>

        <div className="space-y-6">
          <AdminSection
            eyebrow="Thêm thuốc vào toa"
            title="Bổ sung cấu phần đơn thuốc"
            description="Nhập từng thuốc mới cho toa mẫu đang chọn để bác sĩ tái sử dụng nhanh."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput value={templateDrugForm.name} onChange={(event) => setTemplateDrugForm((current) => ({ ...current, name: event.target.value }))} placeholder="Tên thuốc" />
              <AdminInput value={templateDrugForm.description} onChange={(event) => setTemplateDrugForm((current) => ({ ...current, description: event.target.value }))} placeholder="Mô tả" />
              <AdminInput value={templateDrugForm.dosage} onChange={(event) => setTemplateDrugForm((current) => ({ ...current, dosage: event.target.value }))} placeholder="Liều dùng" />
              <AdminInput value={templateDrugForm.quantity} onChange={(event) => setTemplateDrugForm((current) => ({ ...current, quantity: event.target.value }))} placeholder="Số lượng" />
              <AdminInput value={templateDrugForm.unit} onChange={(event) => setTemplateDrugForm((current) => ({ ...current, unit: event.target.value }))} placeholder="Đơn vị" />
              <AdminInput value={templateDrugForm.timing} onChange={(event) => setTemplateDrugForm((current) => ({ ...current, timing: event.target.value }))} placeholder="Thời điểm dùng" />
              <AdminInput value={templateDrugForm.duration} onChange={(event) => setTemplateDrugForm((current) => ({ ...current, duration: event.target.value }))} placeholder="Thời gian dùng" />
              <AdminInput value={templateDrugForm.price} onChange={(event) => setTemplateDrugForm((current) => ({ ...current, price: event.target.value }))} placeholder="Giá" />
            </div>
            <div className="mt-4">
              <AdminButton onClick={handleAddTemplateDrug}>Thêm thuốc vào toa mẫu</AdminButton>
            </div>
          </AdminSection>

          <AdminSection
            eyebrow="Catalog dùng chung"
            title="Kho dược phẩm quản trị"
            description="Danh mục thuốc dùng chung cho toàn bộ đội ngũ bác sĩ khi xây dựng toa."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput value={drugForm.name} onChange={(event) => setDrugForm((current) => ({ ...current, name: event.target.value }))} placeholder="Tên thuốc" />
              <AdminInput value={drugForm.activeIngredient} onChange={(event) => setDrugForm((current) => ({ ...current, activeIngredient: event.target.value }))} placeholder="Hoạt chất" />
              <AdminInput value={drugForm.unit} onChange={(event) => setDrugForm((current) => ({ ...current, unit: event.target.value }))} placeholder="Đơn vị" />
              <AdminInput value={drugForm.price} onChange={(event) => setDrugForm((current) => ({ ...current, price: event.target.value }))} placeholder="Giá" />
              <AdminInput value={drugForm.category} onChange={(event) => setDrugForm((current) => ({ ...current, category: event.target.value }))} placeholder="Nhóm thuốc" />
              <AdminInput value={drugForm.searchKeywords} onChange={(event) => setDrugForm((current) => ({ ...current, searchKeywords: event.target.value }))} placeholder="Từ khóa tìm kiếm" />
            </div>
            <AdminTextarea rows={3} value={drugForm.description} onChange={(event) => setDrugForm((current) => ({ ...current, description: event.target.value }))} placeholder="Mô tả thuốc..." className="mt-4" />
            <div className="mt-4">
              <AdminButton onClick={handleAddDrugCatalog}>Thêm vào catalog thuốc</AdminButton>
            </div>
          </AdminSection>

          <AdminSection
            eyebrow="Theo dõi draft"
            title="Toa đang được soạn bởi bác sĩ"
            description="Admin nắm được draft đang hoạt động để tránh thiếu thuốc, trùng mẫu hoặc sai quy trình."
          >
            <div className="space-y-3">
              {isLoading ? (
                <AdminEmptyState message="Đang tải draft toa..." />
              ) : (bundle?.drafts.length || 0) === 0 ? (
                <AdminEmptyState message="Chưa có draft toa nào trong hệ thống." />
              ) : (
                bundle?.drafts.slice(0, 8).map((draft) => (
                  <div key={draft.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900">{draft.patient.displayName}</h3>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                        {draft.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">
                      Bác sĩ: {bundle?.doctors.find((doctor) => doctor.uid === draft.doctorUid)?.displayName || draft.doctorUid}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Cập nhật: {formatDateTime(draft.updatedAt || null)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </AdminSection>
        </div>
      </div>
    </div>
  );
}
