"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  Download,
  FolderOpen,
  Loader2,
  Printer,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  createAiDiagnosis,
  getAiDiagnosisWorkspace,
  getPatientsByDoctor,
  type GetAiDiagnosisWorkspaceData,
  type GetPatientsByDoctorData,
  updateAiDiagnosisReview,
  upsertAiDiagnosisReference,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import {
  createClientId,
  downloadTextFile,
  getActiveDoctorUid,
  triggerBrowserPrint,
} from "@/shared/lib/medassist-runtime";

type PatientProfileRow = GetPatientsByDoctorData["patientProfiles"][number];
type DiagnosisRow = GetAiDiagnosisWorkspaceData["aiDiagnoses"][number];
type PreviewMode = "original" | "overlay";
type Notice = { tone: "success" | "error" | "info"; message: string } | null;

type PatientOption = {
  uid: string;
  displayName: string;
  userCode?: string | null;
};

const SUPPORTED_IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp"]);

function compareDiagnosisDates(left: DiagnosisRow, right: DiagnosisRow) {
  const leftTime = left.examDate ? new Date(left.examDate).getTime() : 0;
  const rightTime = right.examDate ? new Date(right.examDate).getTime() : 0;
  return rightTime - leftTime;
}

function buildPatientOptions(
  patientProfiles: PatientProfileRow[],
  diagnoses: DiagnosisRow[]
): PatientOption[] {
  const map = new Map<string, PatientOption>();

  patientProfiles.forEach((profile) => {
    map.set(profile.userUid, {
      uid: profile.userUid,
      displayName: profile.user.displayName,
      userCode: profile.user.userCode || null,
    });
  });

  diagnoses.forEach((diagnosis) => {
    const current = map.get(diagnosis.patientUid);
    map.set(diagnosis.patientUid, {
      uid: diagnosis.patientUid,
      displayName: current?.displayName || diagnosis.patient.displayName,
      userCode: current?.userCode || diagnosis.patient.userCode || null,
    });
  });

  return Array.from(map.values()).sort((left, right) =>
    left.displayName.localeCompare(right.displayName, "vi", { sensitivity: "base" })
  );
}

function toStageNumber(diagnosis: DiagnosisRow | null) {
  if (!diagnosis) return "--";
  const stage = diagnosis.stageLabel || "";
  const match = stage.match(/\d+/);
  return match?.[0] || "--";
}

function noticeClass(tone: NonNullable<Notice>["tone"]) {
  if (tone === "success") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (tone === "error") return "border-red-200 bg-red-50 text-red-700";
  return "border-slate-200 bg-slate-50 text-slate-700";
}

function parseErrorDetail(detail: unknown) {
  if (typeof detail !== "string" || !detail.trim()) {
    return null;
  }

  try {
    const parsed = JSON.parse(detail);
    const message = parsed?.error?.message;

    if (typeof message === "string" && message.trim()) {
      return message.trim();
    }
  } catch {
  }

  return detail.trim();
}

async function readFileAsDataUrl(file: File) {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Không thể đọc ảnh đã chọn."));
    reader.readAsDataURL(file);
  });
}

async function loadImageFromFile(file: File) {
  return await new Promise<HTMLImageElement>((resolve, reject) => {
    // Dùng object URL thay vì Base64. Không gây tốn bộ nhớ DOM của trình duyệt
    const url = URL.createObjectURL(file);
    const image = new Image();
    
    image.onload = () => {
      URL.revokeObjectURL(url); // Phục hồi bộ nhớ ngay sau khi nạp ảnh xong
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url); // Ngừa rò rỉ bộ nhớ
      reject(new Error("Không thể đọc định dạng hình ảnh này. Vui lòng thử ảnh khác."));
    };
    
    image.src = url;
  });
}

async function prepareImageForAnalysis(file: File) {
  if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Hiện chỉ hỗ trợ ảnh PNG, JPG hoặc WEBP.");
  }

  const previewDataUrl = await readFileAsDataUrl(file);
   const image = await loadImageFromFile(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return {
      previewDataUrl,
      uploadDataUrl: previewDataUrl,
    };
  }

  const maxSide = 1400;
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  canvas.width = width;
  canvas.height = height;
  context.fillStyle = "#05070f";
  context.fillRect(0, 0, width, height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, width, height);

  return {
    previewDataUrl,
    uploadDataUrl: canvas.toDataURL("image/jpeg", 0.9),
  };
}

function renderPreview(imageUrl: string | null, mode: PreviewMode) {
  if (!imageUrl) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-[28px] bg-[#05070f] px-8 text-center text-sm text-slate-400">
        Chưa có ảnh để hiển thị
      </div>
    );
  }

  return (
    <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[28px] bg-[#05070f] p-5">
      <img
        src={imageUrl}
        alt="Ảnh đáy mắt"
        className="h-full w-full object-contain object-center opacity-95"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05070f]/30" />
      {mode === "overlay" ? (
        <>
          <div className="absolute left-[34%] top-[36%] h-12 w-12 rounded-full border-2 border-[#f5a17b] bg-[#f5a17b1f]" />
          <div className="absolute right-[28%] top-[42%] h-16 w-16 rounded-full border-2 border-[#96c2eb] bg-[#7ab2e21f]" />
        </>
      ) : null}
    </div>
  );
}

function renderInfoRow(label: string, value: string) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-slate-100 py-4 first:border-t-0 first:pt-0">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</span>
      <span className="text-right text-sm font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function renderResultCard({
  eyebrow,
  value,
  title,
  helper,
  accent,
}: {
  eyebrow: string;
  value: string;
  title: string;
  helper: string;
  accent: "red" | "blue" | "green";
}) {
  const palette =
    accent === "red"
      ? "border-red-100 bg-red-50/80 text-red-600"
      : accent === "green"
        ? "border-emerald-100 bg-white text-emerald-500"
        : "border-[#d7e5f4] bg-white text-[#7aa6d3]";

  return (
    <div className={`rounded-[24px] border p-5 shadow-[0_12px_30px_rgba(148,163,184,0.08)] ${palette}`}>
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">{eyebrow}</p>
      <p className="mt-4 text-[32px] font-bold leading-none">{value}</p>
      <p className="mt-3 text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{helper}</p>
    </div>
  );
}

function formatDiagnosisHistoryLabel(diagnosis: DiagnosisRow, index: number) {
  const examDate = diagnosis.examDate || "Không rõ ngày";
  const stage = diagnosis.stageLabel || diagnosis.riskLevel || "Chưa phân loại";
  return `Lần ${index + 1}: ${examDate} • ${stage}`;
}

export function AiDiagnosisWorkspace() {
  const doctorUid = getActiveDoctorUid();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [workspace, setWorkspace] = useState<GetAiDiagnosisWorkspaceData | null>(null);
  const [patientProfiles, setPatientProfiles] = useState<PatientProfileRow[]>([]);
  const [selectedPatientUid, setSelectedPatientUid] = useState<string | null>(null);
  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState<string | null>(null);
  const [selectedReferenceId, setSelectedReferenceId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("original");
  const [expertNote, setExpertNote] = useState("");
  const [pendingPreviewUrl, setPendingPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSavingReview, setIsSavingReview] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  const loadWorkspace = async (
    preservePatientUid?: string | null,
    preserveDiagnosisId?: string | null
  ) => {
    const [aiResponse, patientResponse] = await Promise.all([
      getAiDiagnosisWorkspace(getMedAssistDataConnect(), { doctorUid }),
      getPatientsByDoctor(getMedAssistDataConnect(), { doctorUid }),
    ]);

    const diagnoses = aiResponse.data.aiDiagnoses.slice().sort(compareDiagnosisDates);
    const patients = buildPatientOptions(patientResponse.data.patientProfiles, diagnoses);
    const nextPatientUid =
      preservePatientUid && patients.some((item) => item.uid === preservePatientUid)
        ? preservePatientUid
        : diagnoses[0]?.patientUid || patients[0]?.uid || null;
    const nextDiagnosisId =
      preserveDiagnosisId && diagnoses.some((item) => item.id === preserveDiagnosisId)
        ? preserveDiagnosisId
        : diagnoses.find((item) => item.patientUid === nextPatientUid)?.id || null;

    setWorkspace({ ...aiResponse.data, aiDiagnoses: diagnoses });
    setPatientProfiles(patientResponse.data.patientProfiles);
    setSelectedPatientUid(nextPatientUid);
    setSelectedDiagnosisId(nextDiagnosisId);
  };

  useEffect(() => {
    let mounted = true;

    loadWorkspace()
      .catch((error) => {
        console.error("Không thể tải giao diện AI diagnosis:", error);
        if (mounted) {
          setNotice({
            tone: "error",
            message: "Không thể tải dữ liệu chẩn đoán AI lúc này.",
          });
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [doctorUid]);

  const diagnoses = useMemo(
    () => workspace?.aiDiagnoses.slice().sort(compareDiagnosisDates) ?? [],
    [workspace?.aiDiagnoses]
  );

  const patientOptions = useMemo(
    () => buildPatientOptions(patientProfiles, diagnoses),
    [diagnoses, patientProfiles]
  );

  const patientDiagnoses = useMemo(
    () => diagnoses.filter((item) => item.patientUid === selectedPatientUid),
    [diagnoses, selectedPatientUid]
  );

  const activeDiagnosis = useMemo(
    () =>
      patientDiagnoses.find((item) => item.id === selectedDiagnosisId) ||
      patientDiagnoses[0] ||
      null,
    [patientDiagnoses, selectedDiagnosisId]
  );

  const activeReferences = useMemo(
    () =>
      (workspace?.aiDiagnosisReferences ?? [])
        .filter((item) => item.diagnosisId === activeDiagnosis?.id)
        .slice()
        .sort((left, right) => left.displayOrder - right.displayOrder),
    [activeDiagnosis?.id, workspace?.aiDiagnosisReferences]
  );

  const selectedReference = useMemo(
    () => activeReferences.find((item) => item.id === selectedReferenceId) || activeReferences[0] || null,
    [activeReferences, selectedReferenceId]
  );

  const selectedPatient = useMemo(
    () => patientOptions.find((item) => item.uid === selectedPatientUid) || null,
    [patientOptions, selectedPatientUid]
  );

  useEffect(() => {
    setSelectedDiagnosisId((current) =>
      current && patientDiagnoses.some((item) => item.id === current)
        ? current
        : patientDiagnoses[0]?.id || null
    );
  }, [patientDiagnoses]);

  useEffect(() => {
    setSelectedReferenceId(activeReferences[0]?.id || null);
  }, [activeDiagnosis?.id, activeReferences]);

  useEffect(() => {
    setExpertNote(activeDiagnosis?.doctorAdvice || "");
  }, [activeDiagnosis?.id]);

  const handleAnalyzeFile = async (file: File) => {
    if (!selectedPatient) {
      setNotice({
        tone: "error",
        message: "Hãy chọn bệnh nhân trước khi lưu lịch sử chẩn đoán.",
      });
      return;
    }

    setIsAnalyzing(true);
    setNotice({
      tone: "info",
      message: "Đang tối ưu và phân tích ảnh với Gemini...",
    });

    try {
      const { previewDataUrl, uploadDataUrl } = await prepareImageForAnalysis(file);
      setPendingPreviewUrl(previewDataUrl);

      const historySummary = patientDiagnoses
        .slice(0, 3)
        .map((item) => `${item.examDate || "Không rõ ngày"}: ${item.stageLabel || item.riskLevel}`)
        .join(" | ");

      const response = await fetch("/api/ai/retina", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: selectedPatient.displayName,
          patientCode: selectedPatient.userCode || null,
          screeningNote: activeDiagnosis?.reportSummary || null,
          historySummary: historySummary || null,
          imageDataUrl: uploadDataUrl,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload?.analysis) {
        throw new Error(
          parseErrorDetail(payload?.detail) ||
            payload?.error ||
            "Không thể phân tích ảnh AI lúc này."
        );
      }

      const examDate = new Date().toLocaleDateString("vi-VN");
      const aiScore = `${Math.round(payload.analysis.confidenceScore * 100)}%`;
      const created = await createAiDiagnosis(getMedAssistDataConnect(), {
        patientUid: selectedPatient.uid,
        doctorUid,
        fundusImageUrl: uploadDataUrl,
        archiveImagePath: uploadDataUrl,
        riskLevel: payload.analysis.riskLevel,
        confidenceScore: payload.analysis.confidenceScore,
        aiAnalysis: payload.analysis.findings.join(" • "),
        doctorAdvice: payload.analysis.doctorAdvice,
        stageLabel: payload.analysis.stageLabel,
        aiScore,
        examDate,
        deviceName: "Gemini Vision",
        technicianName: "Bác sĩ tải ảnh trực tiếp",
        doctorApproved: false,
        reportSummary: payload.analysis.summary,
      });

      await upsertAiDiagnosisReference(getMedAssistDataConnect(), {
        id: createClientId("ai-reference"),
        diagnosisId: created.data.aiDiagnosis_insert.id,
        label: `Lần quét ${examDate}`,
        diseaseLevel: payload.analysis.stageLabel,
        aiScore,
        confidence: aiScore,
        doctorNote: payload.analysis.doctorAdvice,
        archiveLabel: file.name || `Ảnh đáy mắt ${examDate}`,
        displayOrder: 1,
      });

      await loadWorkspace(selectedPatient.uid, created.data.aiDiagnosis_insert.id);
      setPendingPreviewUrl(null);
      setNotice({
        tone: "success",
        message: "Đã lưu ca AI mới vào lịch sử của bệnh nhân.",
      });
    } catch (error) {
      console.error("Không thể phân tích ảnh AI:", error);
      const detail = error instanceof Error ? error.message : "Đã có lỗi xảy ra.";
      setNotice({
        tone: "error",
        message:
          detail.includes("GEMINI_API_KEY")
            ? "Chưa cấu hình GEMINI_API_KEY cho hệ thống."
            : `Không thể phân tích ảnh AI lúc này. ${detail}`,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      void handleAnalyzeFile(file);
    }
    event.target.value = "";
  };

  const handleApproveReport = async () => {
    if (!activeDiagnosis) {
      return;
    }

    setIsSavingReview(true);
    try {
      await updateAiDiagnosisReview(getMedAssistDataConnect(), {
        id: activeDiagnosis.id,
        doctorAdvice: expertNote,
        doctorApproved: true,
        reportSummary: activeDiagnosis.reportSummary || activeDiagnosis.aiAnalysis || null,
        aiScore: activeDiagnosis.aiScore || `${Math.round(activeDiagnosis.confidenceScore * 100)}%`,
        confidenceScore: activeDiagnosis.confidenceScore,
      });

      await loadWorkspace(activeDiagnosis.patientUid, activeDiagnosis.id);
      setNotice({
        tone: "success",
        message: "Đã phê duyệt và lưu báo cáo AI vào bệnh án.",
      });
    } catch (error) {
      console.error("Không thể lưu báo cáo AI:", error);
      setNotice({
        tone: "error",
        message: "Không thể lưu báo cáo AI lúc này.",
      });
    } finally {
      setIsSavingReview(false);
    }
  };

  if (isLoading) {
    return (
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500 shadow-sm">
        Đang tải dữ liệu chẩn đoán AI...
      </section>
    );
  }

  if (!patientOptions.length) {
    return (
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500 shadow-sm">
        Chưa có bệnh nhân nào trong hệ thống để bắt đầu chẩn đoán AI.
      </section>
    );
  }

  const confidenceText = activeDiagnosis
    ? `${Math.round(activeDiagnosis.confidenceScore * 100)}%`
    : "--";
  const currentImageUrl = pendingPreviewUrl || activeDiagnosis?.fundusImageUrl || null;
  const selectedPatientLabel = selectedPatient
    ? `${selectedPatient.displayName}${selectedPatient.userCode ? ` • ${selectedPatient.userCode}` : ""}`
    : "Chọn bệnh nhân";
  const isLatestDiagnosis = !!activeDiagnosis && patientDiagnoses[0]?.id === activeDiagnosis.id;

  return (
    <div className="space-y-5 xl:-mx-4">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <Link
          href="/dashboard/patient"
          className="inline-flex items-center gap-2 font-semibold text-[#35678E] hover:text-[#274e6d]"
        >
          <ChevronLeft className="h-4 w-4" />
          Quay lại danh sách
        </Link>
      </div>

      {notice ? (
        <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${noticeClass(notice.tone)}`}>
          {notice.message}
        </div>
      ) : null}

      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
        <div className="grid xl:grid-cols-[380px_minmax(0,1fr)_360px]">
          <aside className="space-y-6 border-b border-slate-200 p-6 xl:border-b-0 xl:border-r">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8ca6c7]">
                  Hình ảnh hiện tại
                </p>
                <div className="relative max-w-[190px] flex-1">
                  <select
                    value={selectedPatientUid || ""}
                    onChange={(event) => setSelectedPatientUid(event.target.value)}
                    className="w-full appearance-none rounded-full border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
                  >
                    {patientOptions.map((patient) => (
                      <option key={patient.uid} value={patient.uid}>
                        {patient.displayName}
                        {patient.userCode ? ` • ${patient.userCode}` : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50/60 p-3">
                {renderPreview(currentImageUrl, previewMode)}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{selectedPatientLabel}</p>
                    <p className="text-xs text-slate-500">
                      Hỗ trợ PNG, JPG và WEBP. Ảnh sẽ được tối ưu trước khi gửi Gemini.
                    </p>
                  </div>
                  <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setPreviewMode("original")}
                      className={`rounded-lg px-3 py-2 text-xs font-bold ${
                        previewMode === "original" ? "bg-slate-900 text-white" : "text-slate-500"
                      }`}
                    >
                      Gốc
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode("overlay")}
                      className={`rounded-lg px-3 py-2 text-xs font-bold ${
                        previewMode === "overlay" ? "bg-slate-900 text-white" : "text-slate-500"
                      }`}
                    >
                      Lớp phủ
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <section className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-5">
              <h3 className="mb-5 text-sm font-bold text-slate-800">Thông tin lần quét</h3>
              {renderInfoRow("Ngày khám", activeDiagnosis?.examDate || "Chưa cập nhật")}
              {renderInfoRow("Thiết bị", activeDiagnosis?.deviceName || "Chưa cập nhật")}
              {renderInfoRow("Kỹ thuật viên", activeDiagnosis?.technicianName || "Chưa cập nhật")}
            </section>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#89b3d9] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#759fca] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {isAnalyzing ? "Đang phân tích..." : "Chọn PNG/JPG để phân tích"}
              </button>

              <button
                type="button"
                onClick={() =>
                  downloadTextFile(
                    `ai-diagnosis-${selectedPatientUid || "patient"}.txt`,
                    JSON.stringify(activeDiagnosis || { patient: selectedPatient }, null, 2)
                  )
                }
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Xuất dữ liệu thô
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </aside>

          <div className="space-y-8 border-b border-slate-200 p-6 xl:border-b-0 xl:border-r">
            <div className="space-y-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8ca6c7]">
                Current scan
              </p>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-[34px] font-bold tracking-tight text-slate-900">
                    Kết quả hiện tại
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    {activeDiagnosis?.aiAnalysis ||
                      "Ca AI sẽ hiển thị chi tiết kết quả tại đây ngay sau khi bạn chọn ảnh và gắn đúng bệnh nhân."}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#95bee3] text-sm font-bold text-[#7ea9cf]">
                  AI
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {renderResultCard({
                  eyebrow: "Risk score",
                  value: activeDiagnosis?.aiScore || "--",
                  title: activeDiagnosis?.riskLevel || "waiting",
                  helper: activeDiagnosis
                    ? "Cần đối chiếu lâm sàng và theo dõi sát."
                    : "Chưa có kết quả AI.",
                  accent: "red",
                })}
                {renderResultCard({
                  eyebrow: "Giai đoạn",
                  value: activeDiagnosis ? `G${toStageNumber(activeDiagnosis)}` : "--",
                  title: activeDiagnosis?.stageLabel || "0-4 scale",
                  helper: activeDiagnosis?.reportSummary || "Chưa có báo cáo tóm tắt.",
                  accent: "blue",
                })}
                {renderResultCard({
                  eyebrow: "Độ tin cậy",
                  value: confidenceText,
                  title: activeDiagnosis?.doctorApproved ? "verified" : "pending",
                  helper: activeDiagnosis?.doctorApproved
                    ? "Đã được bác sĩ phê duyệt."
                    : "Chờ bác sĩ xác nhận.",
                  accent: "green",
                })}
              </div>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-0 top-4 h-full w-px bg-[#d8e7f4]" />
              <div className="absolute left-0 top-4 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[#8db7da]" />

              <div className="rounded-[24px] border border-[#d8e7f4] bg-white p-5 shadow-[0_12px_30px_rgba(148,163,184,0.12)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#eaf3fb] px-3 py-1 text-xs font-bold text-[#7ea9cf]">
                      {activeDiagnosis?.examDate || "Mới nhất"}
                    </span>
                    <span className="rounded-full bg-[#8db7da] px-3 py-1 text-xs font-bold text-white">
                      {isLatestDiagnosis ? "Lần chụp mới nhất" : "Lần chụp đã chọn"}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    Bác sĩ: {activeDiagnosis?.doctor?.displayName || "MedAssist"}
                  </span>
                </div>

                <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50/70 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                    Báo cáo chẩn đoán gần nhất
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {activeDiagnosis?.reportSummary ||
                      "Chưa có tóm tắt báo cáo cho bệnh nhân này."}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-7 w-1 rounded-full bg-[#8db7da]" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Nhận định chuyên gia</h2>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Bình luận và chế độ điều trị
                  </p>
                </div>
              </div>

              <textarea
                value={expertNote}
                onChange={(event) => setExpertNote(event.target.value)}
                placeholder="Nhập nhận định của bác sĩ, hướng theo dõi hoặc điều trị..."
                className="min-h-[260px] w-full rounded-[24px] border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-700 outline-none focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
              />
            </div>
          </div>

          <aside className="space-y-6 bg-[#fbfcfe] p-6">
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8ca6c7]">
                Reference point
              </p>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[22px] font-bold tracking-tight text-slate-900">
                  Lịch sử chẩn đoán
                </h2>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <select
                    value={activeDiagnosis?.id || ""}
                    onChange={(event) => setSelectedDiagnosisId(event.target.value || null)}
                    className="w-full appearance-none rounded-full border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
                    disabled={!patientDiagnoses.length}
                  >
                    {patientDiagnoses.length ? (
                      patientDiagnoses.map((diagnosis, index) => (
                        <option key={diagnosis.id} value={diagnosis.id}>
                          {formatDiagnosisHistoryLabel(diagnosis, index)}
                        </option>
                      ))
                    ) : (
                      <option value="">Chưa có lịch sử chẩn đoán</option>
                    )}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#e2ebf5] bg-[#eef4fb] p-4">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                <div className="rounded-[22px] border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex items-center gap-2 text-[#f0a032]">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                      Mức độ bệnh
                    </span>
                  </div>
                  <p className="text-lg font-bold leading-8 text-[#ef8e18]">
                    {selectedReference?.diseaseLevel || activeDiagnosis?.stageLabel || "Chưa có"}
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                    AI accuracy
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        AI score
                      </p>
                      <p className="mt-2 text-[30px] font-bold leading-none text-slate-800">
                        {selectedReference?.aiScore || activeDiagnosis?.aiScore || "--"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        Độ tin cậy
                      </p>
                      <p className="mt-2 text-[30px] font-bold leading-none text-emerald-500">
                        {selectedReference?.confidence || confidenceText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  Lịch sử báo cáo của bác sĩ
                </p>
                <div className="mt-4 rounded-r-2xl border-l-4 border-[#d5e6f5] bg-slate-50/80 px-4 py-3">
                  <p className="text-sm leading-7 text-slate-700">
                    {selectedReference?.doctorNote ||
                      expertNote ||
                      "Chưa có nhận định bác sĩ cho mốc này."}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex aspect-[1.25] items-center justify-center overflow-hidden rounded-[22px] bg-[#121a2f] p-3">
                {activeDiagnosis?.archiveImagePath || currentImageUrl ? (
                  <img
                    src={activeDiagnosis?.archiveImagePath || currentImageUrl || ""}
                    alt="Ảnh lưu trữ"
                    className="h-full w-full object-contain object-center opacity-90"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                    Ảnh gốc lưu trữ
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  window.open(
                    activeDiagnosis?.archiveImagePath || currentImageUrl || "",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!activeDiagnosis?.archiveImagePath && !currentImageUrl}
              >
                <FolderOpen className="h-4 w-4" />
                Phóng to ảnh cũ
              </button>
            </div>
          </aside>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setExpertNote(activeDiagnosis?.doctorAdvice || "")}
            className="text-sm font-semibold text-slate-400 hover:text-slate-600"
          >
            Hủy phiên bản
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={triggerBrowserPrint}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Printer className="h-4 w-4" />
              In báo cáo
            </button>
            <button
              type="button"
              onClick={handleApproveReport}
              disabled={!activeDiagnosis || isSavingReview}
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSavingReview ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShieldCheck className="h-4 w-4" />
              )}
              {isSavingReview ? "Đang lưu..." : "Phê duyệt và lưu bệnh án"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
