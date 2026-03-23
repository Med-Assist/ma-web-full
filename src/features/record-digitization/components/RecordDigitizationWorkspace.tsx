"use client";

import { useEffect, useRef, useState } from "react";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  FlaskConical,
  History,
  RotateCw,
  Save,
  Sparkles,
  Upload,
  UserRound,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  getRecordDigitizationWorkspace,
  type GetRecordDigitizationWorkspaceData,
  upsertDigitizationJob,
  upsertDigitizationMetric,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { createClientId, downloadJsonFile, readFileAsText } from "@/shared/lib/medassist-runtime";

const toneClassMap = {
  normal: { pill: "bg-emerald-50 text-emerald-600", value: "text-slate-900" },
  warning: { pill: "bg-blue-50 text-[#5f8ebf]", value: "text-[#5f8ebf]" },
} as const;

type ExtractedMetric = {
  code: string;
  label: string;
  value: string;
  status: string;
  reference: string | null;
  tone: "normal" | "warning";
};

function extractMetricsFromDocument(body: string): ExtractedMetric[] {
  const lines = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const parsed = lines
    .map((line) => {
      const match = line.match(/^([A-Za-z][A-Za-z0-9/%-]{1,14})\s*[:=-]\s*(.+)$/);

      if (!match) {
        return null;
      }

      const rawLabel = match[1].trim();
      const rawValue = match[2].trim();
      const referenceMatch = rawValue.match(/\b(?:ref|tham chieu)\s*[:=-]\s*(.+)$/i);
      const value = referenceMatch ? rawValue.slice(0, referenceMatch.index).trim() : rawValue;
      const warning = /(cao|vuot|tang|high|thap|giam|low)/i.test(rawValue);

      return {
        code: rawLabel.toUpperCase().slice(0, 12),
        label: rawLabel,
        value: value.slice(0, 48) || rawValue.slice(0, 48),
        status: warning ? "Cần đối chiếu" : "Đã trích xuất",
        reference: referenceMatch ? `Ref: ${referenceMatch[1].trim().slice(0, 48)}` : null,
        tone: warning ? "warning" : "normal",
      } satisfies ExtractedMetric;
    })
    .filter((metric): metric is ExtractedMetric => metric !== null)
    .slice(0, 6);

  if (parsed.length > 0) {
    return parsed;
  }

  return [
    {
      code: "OCR",
      label: "Trạng thái OCR",
      value: "Đã tiếp nhận",
      status: "Đã đồng bộ",
      reference: lines[0] ? `Dòng 1: ${lines[0].slice(0, 36)}` : null,
      tone: "normal",
    },
    {
      code: "DOC",
      label: "Số dòng tài liệu",
      value: `${lines.length} dòng`,
      status: "Đã đếm",
      reference: null,
      tone: "normal",
    },
    {
      code: "TXT",
      label: "Độ dài văn bản",
      value: `${body.trim().length} ký tự`,
      status: "Đã trích xuất",
      reference: null,
      tone: "normal",
    },
  ];
}

export function RecordDigitizationWorkspace() {
  const [workspace, setWorkspace] = useState<GetRecordDigitizationWorkspaceData | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    getRecordDigitizationWorkspace(getMedAssistDataConnect())
      .then((response) => {
        if (!mounted) return;
        setWorkspace(response.data);
        setSelectedJobId(response.data.digitizationJobs[0]?.id ?? null);
      })
      .catch((error) => console.error("Không thể tải workspace số hóa:", error));
    return () => {
      mounted = false;
    };
  }, []);

  const jobs = workspace?.digitizationJobs ?? [];
  const job = jobs.find((item) => item.id === selectedJobId) ?? jobs[0] ?? null;
  const metrics = (workspace?.digitizationMetrics ?? []).filter((item) => item.jobId === job?.id);

  const uploadFile = async (file: File) => {
    const body = await readFileAsText(file).catch(() => `Tài liệu ${file.name} đã được tiếp nhận và lưu cho bước xử lý OCR.`);
    const nextJobId = createClientId("digit-job");
    const extractedMetrics = extractMetricsFromDocument(body);

    await upsertDigitizationJob(getMedAssistDataConnect(), {
      id: nextJobId,
      title: "Đang bóc tách dữ liệu AI...",
      subtitle: `Tài liệu ${file.name}`,
      progressPercent: 100,
      facilityName: "Bệnh viện Đa khoa Quốc tế",
      patientName: "Nguyễn Văn An",
      examDate: new Date().toLocaleDateString("vi-VN"),
      doctorName: "Lê Minh Tâm",
      sourceDocumentTitle: file.name,
      sourceDocumentBody: body.slice(0, 1200),
      historyLabel: `Tệp vừa tải lên lúc ${new Date().toLocaleTimeString("vi-VN")}`,
    });

    await Promise.all(
      extractedMetrics.map((metric, index) =>
        upsertDigitizationMetric(getMedAssistDataConnect(), {
          id: createClientId(`digit-metric-${metric.code.toLowerCase()}`),
          jobId: nextJobId,
          code: metric.code,
          label: metric.label,
          value: metric.value,
          status: metric.status,
          reference: metric.reference,
          tone: metric.tone,
          displayOrder: index + 1,
        })
      )
    );

    const nextWorkspace = await getRecordDigitizationWorkspace(getMedAssistDataConnect());
    setWorkspace(nextWorkspace.data);
    setSelectedJobId(nextJobId);
  };

  const saveToMedicalRecord = async () => {
    if (!job) {
      return;
    }

    try {
      await upsertDigitizationJob(getMedAssistDataConnect(), {
        id: job.id,
        title: job.title,
        subtitle: job.subtitle,
        progressPercent: job.progressPercent,
        facilityName: job.facilityName,
        patientName: job.patientName,
        examDate: job.examDate,
        doctorName: job.doctorName,
        sourceDocumentTitle: job.sourceDocumentTitle,
        sourceDocumentBody: job.sourceDocumentBody,
        historyLabel: `Đã đồng bộ vào hồ sơ bệnh án lúc ${new Date().toLocaleTimeString("vi-VN")}`,
      });
      const nextWorkspace = await getRecordDigitizationWorkspace(getMedAssistDataConnect());
      setWorkspace(nextWorkspace.data);
      setSelectedJobId(job.id);
      alert(`Đã lưu dữ liệu trích xuất cho ${job.patientName} vào Data Connect.`);
    } catch (error) {
      console.error("Không thể đồng bộ job số hóa:", error);
      alert("Không thể lưu dữ liệu vào hồ sơ bệnh án lúc này.");
    }
  };

  if (!job) {
    return (
      <section className="rounded-[28px] border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500 shadow-[0_14px_32px_rgba(148,163,184,0.08)]">
        Chưa có tài liệu số hóa nào trong Data Connect.
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <input ref={inputRef} type="file" className="hidden" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])} />
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[38px] font-bold tracking-tight text-slate-900">Số hóa hồ sơ bệnh án</h1>
          <p className="mt-2 text-lg text-slate-500">Toàn bộ tiến trình và metric được lưu trong Data Connect</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => inputRef.current?.click()} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <Upload className="h-5 w-5 text-slate-500" /> Tải tài liệu mới
          </button>
          <button type="button" onClick={() => downloadJsonFile("digitization-job.json", { job, metrics })} className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#507fa8] to-[#6a9bc6] px-6 py-4 text-base font-semibold text-white shadow-[0_14px_28px_rgba(80,127,168,0.26)] hover:-translate-y-0.5">
            <Download className="h-5 w-5" /> Xuất dữ liệu
          </button>
        </div>
      </div>

      <div className="rounded-[30px] border border-[#d9e7f6] bg-[#eff5fd] p-6 shadow-[0_18px_36px_rgba(154,177,203,0.12)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#dbe9f8] text-[#6e9ac6]">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-[28px] font-bold tracking-tight text-slate-900">{job.title}</h2>
              <p className="mt-1 text-xl text-slate-500">{job.subtitle}</p>
            </div>
          </div>
          <span className="text-[28px] font-bold text-[#5f8ebf]">{job.progressPercent}%</span>
        </div>
        <div className="mt-7 h-4 overflow-hidden rounded-full bg-[#d7e7fa]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#4a7ba6] via-[#5a8dba] to-[#689fc8]" style={{ width: `${job.progressPercent}%` }} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_1fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#6793bf]" />
              <h2 className="text-[28px] font-bold tracking-tight text-slate-900">Tài liệu gốc (Scan)</h2>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <button type="button" onClick={() => setZoom((value) => value + 0.1)} className="rounded-full p-2 hover:bg-slate-100 hover:text-slate-600"><ZoomIn className="h-5 w-5" /></button>
              <button type="button" onClick={() => setZoom((value) => Math.max(0.6, value - 0.1))} className="rounded-full p-2 hover:bg-slate-100 hover:text-slate-600"><ZoomOut className="h-5 w-5" /></button>
              <button type="button" onClick={() => setRotation((value) => value + 90)} className="rounded-full p-2 hover:bg-slate-100 hover:text-slate-600"><RotateCw className="h-5 w-5" /></button>
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_32px_rgba(148,163,184,0.1)]">
            <div className="relative flex min-h-[590px] items-center justify-center overflow-hidden rounded-[24px] border border-slate-100 bg-[linear-gradient(180deg,#f4f7fb_0%,#edf2f8_100%)] px-6 py-10">
              <div className="w-full max-w-[460px] rounded-[4px] border border-slate-200 bg-white px-10 py-12 shadow-[0_20px_45px_rgba(100,116,139,0.22)]" style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}>
                <div className="text-center">
                  <h3 className="font-serif text-[23px] font-bold uppercase text-slate-800">{job.facilityName}</h3>
                  <p className="mt-2 text-sm text-slate-500">{job.sourceDocumentTitle}</p>
                </div>
                <div className="my-5 h-px bg-[#c6d5ea]" />
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{job.sourceDocumentBody}</p>
                <p className="mt-8 text-right text-xs italic text-slate-400">Bác sĩ chỉ định: {job.doctorName}</p>
              </div>
            </div>
          </div>
          <button type="button" onClick={() => setSelectedJobId(jobs[(jobs.findIndex((item) => item.id === job.id) + 1) % jobs.length]?.id || job.id)} className="flex items-center gap-2 px-2 text-sm font-medium text-[#8ca2c0] hover:text-[#5f8ebf]">
            <History className="h-4 w-4" /> {job.historyLabel}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <FileText className="h-5 w-5 text-[#6793bf]" />
            <h2 className="text-[28px] font-bold tracking-tight text-slate-900">Dữ liệu đã trích xuất</h2>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_14px_32px_rgba(148,163,184,0.1)]">
            <div className="grid gap-6 border-b border-slate-100 pb-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#6b94bf]">
                  <Building2 className="h-4 w-4" /> Tên cơ sở y tế
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <h3 className="text-[32px] font-bold tracking-tight text-slate-900">{job.facilityName}</h3>
                  <CheckCircle2 className="h-5 w-5 text-[#78a5d2]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#6b94bf]">
                  <CalendarDays className="h-4 w-4" /> Ngày khám
                </div>
                <p className="mt-3 text-[34px] font-bold tracking-tight text-slate-900">{job.examDate}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#6b94bf]">
                  <UserRound className="h-4 w-4" /> Họ và tên
                </div>
                <p className="mt-3 text-[34px] font-bold tracking-tight text-slate-900">{job.patientName}</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#6b94bf]">
                  <FlaskConical className="h-4 w-4" /> Chỉ số xét nghiệm máu
                </div>
                <span className="rounded-full border border-[#b9d2ee] bg-[#edf5ff] px-3 py-1 text-xs font-medium text-[#6b94bf]">Tự động nhận diện</span>
              </div>
              <div className="space-y-4">
                {metrics.map((metric) => {
                  const tone = toneClassMap[(metric.tone as keyof typeof toneClassMap) || "normal"] ?? toneClassMap.normal;
                  return (
                    <div key={metric.id} className="flex flex-col gap-4 rounded-[24px] border border-slate-100 bg-slate-50/70 px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-600">{metric.code}</div>
                        <div>
                          <p className="text-sm text-slate-400">{metric.label}</p>
                          <p className={`mt-1 text-[23px] font-bold ${tone.value}`}>{metric.value}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-2 sm:items-end">
                        <span className={`rounded-xl px-3 py-1.5 text-sm font-semibold ${tone.pill}`}>{metric.status}</span>
                        {metric.reference ? <span className="text-xs text-slate-400">{metric.reference}</span> : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-[0_14px_32px_rgba(148,163,184,0.08)] sm:flex-row sm:items-center sm:justify-end">
        <button type="button" onClick={() => setSelectedJobId(jobs[0]?.id || null)} className="px-4 py-3 text-base font-medium text-slate-400 hover:text-slate-600">Hủy bỏ</button>
        <button type="button" onClick={saveToMedicalRecord} className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#507fa8] to-[#6a9bc6] px-7 py-4 text-base font-semibold text-white shadow-[0_14px_28px_rgba(80,127,168,0.26)] hover:-translate-y-0.5">
          <Save className="h-5 w-5" /> Lưu vào hồ sơ bệnh án
        </button>
      </div>
    </section>
  );
}
