"use client";

import { type DragEvent, type KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Download,
  FileText,
  History,
  Printer,
  RotateCw,
  Save,
  Upload,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  getDashboardHomeWorkspace,
  type GetDashboardHomeWorkspaceData,
  getRecordDigitizationWorkspace,
  type GetRecordDigitizationWorkspaceData,
  upsertDigitizationJob,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import {
  createClientId,
  downloadJsonFile,
  formatShortTime,
  getActiveDoctorUid,
  readFileAsText,
} from "@/shared/lib/medassist-runtime";

type OcrApiResponse = {
  text?: string;
  source?: string;
  error?: string;
  detail?: string;
};

type UploadedScanPreview = {
  url: string;
  mimeType: string;
  fileName: string;
};

const SCAN_INPUT_ACCEPT = "image/*,.pdf";
const SUPPORTED_SCAN_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif", ".tif", ".tiff", ".pdf"] as const;

type WaitingAppointment = GetDashboardHomeWorkspaceData["appointments"][number];

function buildWaitingAppointmentsFromSchedule(appointments: WaitingAppointment[]) {
  const sorted = appointments
    .slice()
    .sort((left, right) => new Date(left.scheduledAt).getTime() - new Date(right.scheduledAt).getTime());

  const latestByPatient = new Map<string, WaitingAppointment>();
  sorted.forEach((appointment) => {
    if (!appointment.patientUid) return;
    latestByPatient.set(appointment.patientUid, appointment);
  });

  return Array.from(latestByPatient.values()).sort(
    (left, right) => new Date(left.scheduledAt).getTime() - new Date(right.scheduledAt).getTime()
  );
}

function buildLinkedJobId(appointmentId: string) {
  return `digit-job-${appointmentId}`;
}

function sanitizeDocumentBody(body: string) {
  return body.replace(/\u0000/g, "").trim();
}

function isLikelySupportedScanFile(file: File) {
  const normalizedName = file.name.toLowerCase();
  if (file.type.startsWith("image/") || file.type === "application/pdf") {
    return true;
  }

  return SUPPORTED_SCAN_EXTENSIONS.some((extension) => normalizedName.endsWith(extension));
}

function isImagePreview(preview: UploadedScanPreview) {
  return (
    preview.mimeType.startsWith("image/") ||
    /\.(png|jpg|jpeg|webp|gif|bmp|tif|tiff)$/i.test(preview.fileName)
  );
}

function isPdfPreview(preview: UploadedScanPreview) {
  return preview.mimeType === "application/pdf" || /\.pdf$/i.test(preview.fileName);
}

function findFirstMatch(lines: string[], patterns: RegExp[]) {
  for (const line of lines) {
    for (const pattern of patterns) {
      const match = line.match(pattern);
      const value = match?.[1]?.trim();
      if (value) return value;
    }
  }
  return null;
}

function buildDocumentContext(body: string, fileName: string) {
  const lines = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const facilityName =
    findFirstMatch(lines, [
      /(?:bá»‡nh viá»‡n|benh vien|phÃ²ng khÃ¡m|phong kham|hospital|clinic)\s*[:\-]\s*(.+)$/i,
      /^((?:bá»‡nh viá»‡n|benh vien|phÃ²ng khÃ¡m|phong kham).+)$/i,
    ]) || "Bá»‡nh viá»‡n Äa khoa Quá»‘c táº¿";

  const patientName =
    findFirstMatch(lines, [/(:?há» tÃªn|há» vÃ  tÃªn|ho ten|ho va ten|bá»‡nh nhÃ¢n|benh nhan|patient)\s*[:\-]\s*(.+)$/i]) ||
    "Bá»‡nh nhÃ¢n chÆ°a Ä‘á»‹nh danh";

  const doctorName =
    findFirstMatch(lines, [/(?:bÃ¡c sÄ©|bac si|doctor)\s*[:\-]\s*(.+)$/i]) || "BÃ¡c sÄ© Ä‘ang cáº­p nháº­t";

  const examDate =
    findFirstMatch(lines, [
      /(?:ngÃ y khÃ¡m|ngÃ y chá»‰ Ä‘á»‹nh|ngÃ y xÃ©t nghiá»‡m|ngay kham|ngay chi dinh|ngay xet nghiem|date)\s*[:\-]\s*([0-3]?\d[\/\.-][01]?\d[\/\.-]\d{2,4})$/i,
    ]) || new Date().toLocaleDateString("vi-VN");

  return {
    facilityName: facilityName.slice(0, 120),
    patientName: patientName.slice(0, 120),
    doctorName: doctorName.slice(0, 120),
    examDate: examDate.replace(/\./g, "/").slice(0, 32),
    subtitleSuffix: fileName.replace(/\.[^.]+$/, "").slice(0, 80),
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildPrintableReportHtml(params: {
  facilityName: string;
  patientName: string;
  examDate: string;
  doctorName: string;
  sourceDocumentTitle: string;
  extractedText: string;
}) {
  return `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <title>BÃ¡o cÃ¡o OCR - ${escapeHtml(params.patientName)}</title>
    <style>
      body { font-family: "Segoe UI", Arial, sans-serif; padding: 24px; color: #0f172a; }
      h1 { margin: 0 0 12px; font-size: 24px; }
      .meta { margin: 0 0 16px; line-height: 1.75; }
      .label { margin: 16px 0 8px; font-size: 13px; font-weight: 700; text-transform: uppercase; color: #334155; }
      .content { white-space: pre-wrap; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc; padding: 12px; min-height: 240px; }
      .foot { margin-top: 16px; color: #475569; font-size: 12px; }
    </style>
  </head>
  <body>
    <h1>BÃ¡o cÃ¡o sá»‘ hÃ³a OCR</h1>
    <p class="meta">
      <strong>CÆ¡ sá»Ÿ y táº¿:</strong> ${escapeHtml(params.facilityName)}<br />
      <strong>Bá»‡nh nhÃ¢n:</strong> ${escapeHtml(params.patientName)}<br />
      <strong>NgÃ y khÃ¡m:</strong> ${escapeHtml(params.examDate)}<br />
      <strong>BÃ¡c sÄ© chá»‰ Ä‘á»‹nh:</strong> ${escapeHtml(params.doctorName)}<br />
      <strong>TÃ i liá»‡u gá»‘c:</strong> ${escapeHtml(params.sourceDocumentTitle)}
    </p>
    <div class="label">VÄƒn báº£n OCR Ä‘Ã£ trÃ­ch xuáº¥t</div>
    <div class="content">${escapeHtml(params.extractedText || "ChÆ°a cÃ³ ná»™i dung OCR.")}</div>
    <div class="foot">In lÃºc: ${new Date().toLocaleString("vi-VN")}</div>
  </body>
</html>`;
}

export function RecordDigitizationWorkspace() {
  const [workspace, setWorkspace] = useState<GetRecordDigitizationWorkspaceData | null>(null);
  const [waitingAppointments, setWaitingAppointments] = useState<WaitingAppointment[]>([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isScanDropActive, setIsScanDropActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [editableExtractedText, setEditableExtractedText] = useState("");
  const [scanPreviewByJobId, setScanPreviewByJobId] = useState<Record<string, UploadedScanPreview>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const scanPreviewByJobIdRef = useRef<Record<string, UploadedScanPreview>>({});

  useEffect(() => {
    scanPreviewByJobIdRef.current = scanPreviewByJobId;
  }, [scanPreviewByJobId]);

  useEffect(() => {
    return () => {
      Object.values(scanPreviewByJobIdRef.current).forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    getRecordDigitizationWorkspace(getMedAssistDataConnect())
      .then((response) => {
        if (!mounted) return;
        setWorkspace(response.data);
        setSelectedJobId(response.data.digitizationJobs[0]?.id ?? null);
      })
      .catch((error) => console.error("KhÃ´ng thá»ƒ táº£i workspace sá»‘ hÃ³a:", error));

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    getDashboardHomeWorkspace(getMedAssistDataConnect(), {
      doctorUid: getActiveDoctorUid(),
    })
      .then((response) => {
        if (!mounted) return;

        const nextWaitingAppointments = buildWaitingAppointmentsFromSchedule(response.data.appointments);

        setWaitingAppointments(nextWaitingAppointments);
        setSelectedAppointmentId((current) =>
          current && nextWaitingAppointments.some((item) => item.id === current)
            ? current
            : nextWaitingAppointments[0]?.id ?? null
        );
      })
      .catch((error) => console.error("KhÃƒÂ´ng thÃ¡Â»Æ’ tÃ¡ÂºÂ£i danh sÃƒÂ¡ch chÃ¡Â»Â:", error));

    return () => {
      mounted = false;
    };
  }, []);

  const jobs = useMemo(() => workspace?.digitizationJobs ?? [], [workspace?.digitizationJobs]);
  const selectedAppointment =
    waitingAppointments.find((item) => item.id === selectedAppointmentId) ?? waitingAppointments[0] ?? null;
  const linkedJobId = selectedAppointment ? buildLinkedJobId(selectedAppointment.id) : null;
  const linkedJob = linkedJobId ? jobs.find((item) => item.id === linkedJobId) ?? null : null;
  const job = linkedJob ?? jobs.find((item) => item.id === selectedJobId) ?? jobs[0] ?? null;
  const previewJobId = job?.id ?? selectedJobId;
  const selectedScanPreview = previewJobId ? scanPreviewByJobId[previewJobId] : undefined;
  const sourceDocumentName = job?.sourceDocumentTitle || "";
  const sourceLooksLikeText = /\.txt$/i.test(sourceDocumentName);

  useEffect(() => {
    if (selectedAppointment) {
      const selectedLinkedJob = jobs.find((item) => item.id === buildLinkedJobId(selectedAppointment.id)) ?? null;
      if (selectedLinkedJob) {
        if (selectedJobId !== selectedLinkedJob.id) {
          setSelectedJobId(selectedLinkedJob.id);
        }
        setEditableExtractedText(selectedLinkedJob.sourceDocumentBody ?? "");
        return;
      }

      setEditableExtractedText("");
      return;
    }

    setEditableExtractedText(job?.sourceDocumentBody ?? "");
  }, [job?.id, job?.sourceDocumentBody, jobs, selectedAppointment, selectedJobId]);

  const openScanPicker = () => {
    if (!isUploading) inputRef.current?.click();
  };

  const handleScanPickerKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openScanPicker();
    }
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadStatus(`Äang OCR tÃ i liá»‡u ${file.name}...`);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/ocr/document", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json().catch(() => ({}))) as OcrApiResponse;

      if (!response.ok) {
        throw new Error(payload.detail || payload.error || "KhÃ´ng thá»ƒ xá»­ lÃ½ OCR.");
      }

      const ocrText = sanitizeDocumentBody(payload.text || "");
      const body =
        ocrText ||
        (await readFileAsText(file).catch(
          () => `TÃ i liá»‡u ${file.name} Ä‘Ã£ Ä‘Æ°á»£c tiáº¿p nháº­n vÃ  lÆ°u cho bÆ°á»›c xá»­ lÃ½ OCR.`
        ));

      const persistedBody = body.slice(0, 2500);
      const nextJobId = selectedAppointment ? buildLinkedJobId(selectedAppointment.id) : createClientId("digit-job");
      const documentContext = buildDocumentContext(body, file.name);
      const sourceLabel =
        payload.source === "document-ai" ? "Google Document AI" : "TrÃ¬nh phÃ¢n tÃ­ch vÄƒn báº£n";

      const targetPatientName = selectedAppointment?.patient.displayName || documentContext.patientName;
      const targetDoctorName = selectedAppointment?.doctorName || documentContext.doctorName;
      const targetExamDate = selectedAppointment
        ? new Date(selectedAppointment.scheduledAt).toLocaleDateString("vi-VN")
        : documentContext.examDate;
      const subtitleParts = [documentContext.subtitleSuffix, sourceLabel];
      if (selectedAppointment?.patient.userCode) {
        subtitleParts.push(selectedAppointment.patient.userCode);
      }

      await upsertDigitizationJob(getMedAssistDataConnect(), {
        id: nextJobId,
        title: selectedAppointment ? `OCR - ${targetPatientName}` : "OCR hoan tat",
        subtitle: subtitleParts.join(" - "),
        progressPercent: 100,
        facilityName: documentContext.facilityName,
        patientName: targetPatientName,
        examDate: targetExamDate,
        doctorName: targetDoctorName,
        sourceDocumentTitle: file.name,
        sourceDocumentBody: persistedBody,
        historyLabel: selectedAppointment
          ? `OCR cho ${targetPatientName} luc ${new Date().toLocaleTimeString("vi-VN")}`
          : `OCR thanh cong luc ${new Date().toLocaleTimeString("vi-VN")}`,
      });

      const scanPreviewUrl = URL.createObjectURL(file);
      setScanPreviewByJobId((current) => {
        const existing = current[nextJobId];
        if (existing) URL.revokeObjectURL(existing.url);

        return {
          ...current,
          [nextJobId]: {
            url: scanPreviewUrl,
            mimeType: file.type || "",
            fileName: file.name,
          },
        };
      });

      const [nextWorkspace, nextDashboard] = await Promise.all([
        getRecordDigitizationWorkspace(getMedAssistDataConnect()),
        getDashboardHomeWorkspace(getMedAssistDataConnect(), {
          doctorUid: getActiveDoctorUid(),
        }),
      ]);
      const nextWaitingAppointments = buildWaitingAppointmentsFromSchedule(nextDashboard.data.appointments);
      setWorkspace(nextWorkspace.data);
      setWaitingAppointments(nextWaitingAppointments);
      if (selectedAppointment?.id) {
        setSelectedAppointmentId(selectedAppointment.id);
      }
      setSelectedJobId(nextJobId);
      setEditableExtractedText(persistedBody);
      setUploadStatus(
        selectedAppointment
          ? `OCR hoan tat cho ${targetPatientName} bang ${sourceLabel}.`
          : `OCR hoan tat bang ${sourceLabel}.`
      );
    } catch (error) {
      console.error("KhÃ´ng thá»ƒ OCR tÃ i liá»‡u:", error);
      const message =
        error instanceof Error ? error.message : "KhÃ´ng thá»ƒ OCR tÃ i liá»‡u á»Ÿ thá»i Ä‘iá»ƒm hiá»‡n táº¡i.";
      setUploadStatus(message);
      alert(`KhÃ´ng thá»ƒ sá»‘ hÃ³a tÃ i liá»‡u: ${message}`);
    } finally {
      setIsUploading(false);
      setIsScanDropActive(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handlePickedFile = (file: File | null | undefined) => {
    if (!file) return;

    if (!isLikelySupportedScanFile(file)) {
      setUploadStatus(`Äá»‹nh dáº¡ng ${file.name} chÆ°a há»— trá»£ cho khung scan. Vui lÃ²ng chá»n áº£nh hoáº·c PDF.`);
      return;
    }

    void uploadFile(file);
  };

  const handleScanDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isUploading) setIsScanDropActive(true);
  };

  const handleScanDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isUploading) {
      event.dataTransfer.dropEffect = "copy";
      setIsScanDropActive(true);
    }
  };

  const handleScanDragLeave = (event: DragEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) return;
    setIsScanDropActive(false);
  };

  const handleScanDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsScanDropActive(false);
    if (isUploading) return;
    handlePickedFile(event.dataTransfer.files?.[0] ?? null);
  };

  const saveToMedicalRecord = async () => {
    if (!job && !selectedAppointment) return;

    const normalizedText = sanitizeDocumentBody(editableExtractedText).slice(0, 2500);
    const targetJobId = selectedAppointment ? buildLinkedJobId(selectedAppointment.id) : job?.id;
    if (!targetJobId) return;

    const targetPatientName = selectedAppointment?.patient.displayName || job?.patientName || "Benh nhan";
    const targetDoctorName = selectedAppointment?.doctorName || job?.doctorName || "Bac si";
    const targetExamDate = selectedAppointment
      ? new Date(selectedAppointment.scheduledAt).toLocaleDateString("vi-VN")
      : job?.examDate || new Date().toLocaleDateString("vi-VN");

    try {
      await upsertDigitizationJob(getMedAssistDataConnect(), {
        id: targetJobId,
        title: selectedAppointment ? `OCR - ${targetPatientName}` : job?.title || "OCR hoan tat",
        subtitle: job?.subtitle || "OCR text",
        progressPercent: 100,
        facilityName: job?.facilityName || "Benh vien Da khoa Quoc te",
        patientName: targetPatientName,
        examDate: targetExamDate,
        doctorName: targetDoctorName,
        sourceDocumentTitle: job?.sourceDocumentTitle || "ocr-manual.txt",
        sourceDocumentBody: normalizedText || job?.sourceDocumentBody || "",
        historyLabel: `Da dong bo luc ${new Date().toLocaleTimeString("vi-VN")}`,
      });

      const [nextWorkspace, nextDashboard] = await Promise.all([
        getRecordDigitizationWorkspace(getMedAssistDataConnect()),
        getDashboardHomeWorkspace(getMedAssistDataConnect(), {
          doctorUid: getActiveDoctorUid(),
        }),
      ]);
      const nextWaitingAppointments = buildWaitingAppointmentsFromSchedule(nextDashboard.data.appointments);
      setWorkspace(nextWorkspace.data);
      setWaitingAppointments(nextWaitingAppointments);
      if (selectedAppointment?.id) {
        setSelectedAppointmentId(selectedAppointment.id);
      }
      setSelectedJobId(targetJobId);
      alert(`Da luu du lieu OCR cho ${targetPatientName}.`);
    } catch (error) {
      console.error("KhÃ´ng thá»ƒ Ä‘á»“ng bá»™ job sá»‘ hÃ³a:", error);
      alert("KhÃ´ng thá»ƒ lÆ°u dá»¯ liá»‡u vÃ o há»“ sÆ¡ bá»‡nh Ã¡n lÃºc nÃ y.");
    }
  };

  const printReport = () => {
    if (!job) return;

    const reportWindow = window.open("", "_blank", "noopener,noreferrer,width=980,height=1080");
    if (!reportWindow) {
      alert("TrÃ¬nh duyá»‡t Ä‘ang cháº·n popup. HÃ£y cho phÃ©p popup Ä‘á»ƒ in bÃ¡o cÃ¡o.");
      return;
    }

    const html = buildPrintableReportHtml({
      facilityName: job.facilityName,
      patientName: job.patientName,
      examDate: job.examDate,
      doctorName: job.doctorName,
      sourceDocumentTitle: job.sourceDocumentTitle,
      extractedText: sanitizeDocumentBody(editableExtractedText),
    });

    reportWindow.document.open();
    reportWindow.document.write(html);
    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
  };

  if (!job) {
    return (
      <section className="rounded-[28px] border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500 shadow-[0_14px_32px_rgba(148,163,184,0.08)]">
        ChÆ°a cÃ³ tÃ i liá»‡u sá»‘ hÃ³a nÃ o trong Data Connect.
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <input
        ref={inputRef}
        type="file"
        accept={SCAN_INPUT_ACCEPT}
        className="hidden"
        onChange={(event) => handlePickedFile(event.target.files?.[0] ?? null)}
      />

      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[38px] font-bold tracking-tight text-slate-900">Sá»‘ hÃ³a há»“ sÆ¡ bá»‡nh Ã¡n</h1>
          <p className="mt-2 text-lg text-slate-500">
            Khung trÃ¡i hiá»ƒn thá»‹ scan gá»‘c. Khung pháº£i chá»‰ hiá»ƒn thá»‹ vÄƒn báº£n OCR Ä‘á»ƒ báº¡n xem vÃ  chá»‰nh sá»­a.
          </p>
          {uploadStatus ? (
            <p className="mt-3 flex items-center gap-2 text-sm text-[#5f8ebf]">
              <AlertTriangle className="h-4 w-4" />
              {uploadStatus}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={isUploading}
            onClick={openScanPicker}
            className={`flex items-center gap-3 rounded-2xl border border-slate-200 px-6 py-4 text-base font-semibold shadow-sm ${
              isUploading
                ? "cursor-not-allowed bg-slate-100 text-slate-400"
                : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Upload className="h-5 w-5 text-slate-500" />
            {isUploading ? "Äang OCR..." : "Táº£i tÃ i liá»‡u má»›i"}
          </button>

          <button
            type="button"
            onClick={() =>
              downloadJsonFile("digitization-job.json", {
                job: { ...job, sourceDocumentBody: editableExtractedText },
              })
            }
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#507fa8] to-[#6a9bc6] px-6 py-4 text-base font-semibold text-white shadow-[0_14px_28px_rgba(80,127,168,0.26)] hover:-translate-y-0.5"
          >
            <Download className="h-5 w-5" /> Xuáº¥t dá»¯ liá»‡u
          </button>

          <button
            type="button"
            onClick={printReport}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Printer className="h-5 w-5 text-slate-500" /> In bÃ¡o cÃ¡o
          </button>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_32px_rgba(148,163,184,0.08)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6b94bf]">Danh sach cho</p>
            <p className="text-sm text-slate-600">
              {selectedAppointment
                ? `Dang kham: ${selectedAppointment.patient.displayName}`
                : "Chua chon benh nhan kham."}
            </p>
          </div>
          <p className="text-sm font-medium text-slate-500">{waitingAppointments.length} benh nhan co lich kham</p>
        </div>

        {waitingAppointments.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
            Hien tai khong co benh nhan nao duoc tao lich kham.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {waitingAppointments.map((appointment) => {
              const isActive = appointment.id === selectedAppointment?.id;
              return (
                <article
                  key={appointment.id}
                  className={`rounded-2xl border px-4 py-4 ${
                    isActive ? "border-[#8ab3dd] bg-[#f4f9ff]" : "border-slate-200 bg-white"
                  }`}
                >
                  <p className="text-base font-semibold text-slate-900">{appointment.patient.displayName}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {appointment.patient.userCode || appointment.patient.email}
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    {formatShortTime(appointment.scheduledAt)} • {appointment.queueLabel || appointment.status}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAppointmentId(appointment.id);
                      const existingLinkedJob = jobs.find((item) => item.id === buildLinkedJobId(appointment.id));
                      if (existingLinkedJob) {
                        setSelectedJobId(existingLinkedJob.id);
                      }
                      setUploadStatus(`Da chon kham cho ${appointment.patient.displayName}.`);
                    }}
                    className={`mt-3 rounded-xl px-4 py-2 text-xs font-semibold ${
                      isActive
                        ? "bg-[#d9eafc] text-[#37658d]"
                        : "border border-[#b9d2ee] bg-white text-[#5f8ebf] hover:bg-[#eff6ff]"
                    }`}
                  >
                    {isActive ? "Dang kham" : "Chon kham"}
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_1fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#6793bf]" />
              <h2 className="text-[28px] font-bold tracking-tight text-slate-900">TÃ i liá»‡u gá»‘c (Scan)</h2>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <button
                type="button"
                onClick={() => setZoom((value) => value + 0.1)}
                className="rounded-full p-2 hover:bg-slate-100 hover:text-slate-600"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom((value) => Math.max(0.6, value - 0.1))}
                className="rounded-full p-2 hover:bg-slate-100 hover:text-slate-600"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setRotation((value) => value + 90)}
                className="rounded-full p-2 hover:bg-slate-100 hover:text-slate-600"
              >
                <RotateCw className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_32px_rgba(148,163,184,0.1)]">
            <div
              onDragEnter={handleScanDragEnter}
              onDragOver={handleScanDragOver}
              onDragLeave={handleScanDragLeave}
              onDrop={handleScanDrop}
              className={`relative flex min-h-[590px] items-center justify-center overflow-hidden rounded-[24px] border px-6 py-10 ${
                isScanDropActive
                  ? "border-[#6b94bf] bg-[#f1f7ff]"
                  : "border-slate-100 bg-[linear-gradient(180deg,#f4f7fb_0%,#edf2f8_100%)]"
              }`}
            >
              <button
                type="button"
                onClick={openScanPicker}
                onKeyDown={handleScanPickerKeyboard}
                disabled={isUploading}
                className={`absolute right-4 top-4 z-20 rounded-xl border px-3 py-2 text-xs font-semibold shadow-sm ${
                  isUploading
                    ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                    : "border-[#b9d2ee] bg-white text-[#5f8ebf] hover:bg-[#eff6ff]"
                }`}
              >
                {isUploading ? "Äang OCR..." : "Chá»n hoáº·c tháº£ file"}
              </button>

              {isScanDropActive ? (
                <div className="pointer-events-none absolute inset-3 z-10 flex items-center justify-center rounded-[16px] border-2 border-dashed border-[#6b94bf] bg-[#e9f2ff]/70 px-4 text-center text-sm font-semibold text-[#4d7ea7]">
                  Tháº£ file vÃ o Ä‘Ã¢y Ä‘á»ƒ OCR vÃ  xem ngay trong khung scan
                </div>
              ) : null}

              <div className="w-full max-w-[640px]" style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}>
                {selectedScanPreview ? (
                  isImagePreview(selectedScanPreview) ? (
                    <img
                      src={selectedScanPreview.url}
                      alt={`Scan ${selectedScanPreview.fileName}`}
                      className="mx-auto max-h-[540px] w-auto max-w-full rounded-[10px] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(100,116,139,0.22)]"
                    />
                  ) : isPdfPreview(selectedScanPreview) ? (
                    <iframe
                      src={selectedScanPreview.url}
                      title={`Scan ${selectedScanPreview.fileName}`}
                      className="mx-auto h-[560px] w-full rounded-[10px] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(100,116,139,0.22)]"
                    />
                  ) : (
                    <div className="mx-auto flex min-h-[320px] max-w-[540px] flex-col items-center justify-center rounded-[10px] border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-[0_20px_45px_rgba(100,116,139,0.22)]">
                      <p className="text-sm font-semibold text-slate-700">{selectedScanPreview.fileName}</p>
                      <p className="mt-2 text-xs">Äá»‹nh dáº¡ng nÃ y chÆ°a xem trá»±c tiáº¿p Ä‘Æ°á»£c trong khung scan.</p>
                    </div>
                  )
                ) : (
                  <div className="mx-auto flex min-h-[320px] max-w-[540px] flex-col items-center justify-center rounded-[10px] border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500">
                    <p className="text-sm font-semibold text-slate-700">{job.sourceDocumentTitle}</p>
                    <p className="mt-2 text-xs">
                      {sourceLooksLikeText
                        ? "Job nÃ y dÃ¹ng file .txt nÃªn khÃ´ng cÃ³ áº£nh gá»‘c Ä‘á»ƒ hiá»ƒn thá»‹."
                        : "áº¢nh gá»‘c sáº½ hiá»‡n khi báº¡n táº£i áº£nh/PDF trá»±c tiáº¿p trong phiÃªn hiá»‡n táº¡i."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setSelectedJobId(
                jobs[(jobs.findIndex((item) => item.id === job.id) + 1) % jobs.length]?.id || job.id
              )
            }
            className="flex items-center gap-2 px-2 text-sm font-medium text-[#8ca2c0] hover:text-[#5f8ebf]"
          >
            <History className="h-4 w-4" /> {job.historyLabel}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <FileText className="h-5 w-5 text-[#6793bf]" />
            <h2 className="text-[28px] font-bold tracking-tight text-slate-900">VÄƒn báº£n Ä‘Ã£ quÃ©t OCR</h2>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_14px_32px_rgba(148,163,184,0.1)]">
            <div className="mb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#6b94bf]">
              Ná»™i dung OCR (cÃ³ thá»ƒ chá»‰nh sá»­a)
            </div>
            <textarea
              value={editableExtractedText}
              onChange={(event) => setEditableExtractedText(event.target.value)}
              spellCheck={false}
              className="h-[520px] w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700 outline-none transition focus:border-[#6b94bf] focus:ring-2 focus:ring-[#cfe1f5]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-[0_14px_32px_rgba(148,163,184,0.08)] sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={() => setSelectedJobId(jobs[0]?.id || null)}
          className="px-4 py-3 text-base font-medium text-slate-400 hover:text-slate-600"
        >
          Há»§y bá»
        </button>
        <button
          type="button"
          onClick={saveToMedicalRecord}
          className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#507fa8] to-[#6a9bc6] px-7 py-4 text-base font-semibold text-white shadow-[0_14px_28px_rgba(80,127,168,0.26)] hover:-translate-y-0.5"
        >
          <Save className="h-5 w-5" /> LÆ°u vÄƒn báº£n OCR
        </button>
      </div>
    </section>
  );
}




