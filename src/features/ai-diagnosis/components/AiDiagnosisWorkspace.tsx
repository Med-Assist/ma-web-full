"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  FileText,
  FolderOpen,
  Printer,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type PreviewMode = "original" | "overlay";

type ReferenceSnapshot = {
  id: string;
  label: string;
  diseaseLevel: string;
  aiScore: string;
  confidence: string;
  doctorNote: string;
  archiveLabel: string;
};

const referenceSnapshots: ReferenceSnapshot[] = [
  {
    id: "gp1",
    label: "12/01/2024 (GP 1)",
    diseaseLevel: "Võng mạc ĐTĐ tiền tăng sinh (Rất nhẹ)",
    aiScore: "0.42",
    confidence: "98.1%",
    doctorNote:
      "Phát hiện 3 vi phình mạch đơn lẻ tại vùng phía trên võng mạc. Không có dấu hiệu phù hoàng điểm hay xuất huyết võng mạc diện rộng. Hẹn tái khám sau 4-6 tháng để theo dõi tiến triển.",
    archiveLabel: "Ảnh gốc lưu trữ (12/01/2024)",
  },
  {
    id: "gp2",
    label: "08/09/2023 (GP 2)",
    diseaseLevel: "Tăng sinh nhẹ, cần theo dõi",
    aiScore: "0.37",
    confidence: "96.8%",
    doctorNote:
      "Các mảng xuất tiết cứng ít, chưa ghi nhận tân mạch mới. Khuyến nghị duy trì kiểm soát đường huyết và tái chụp sau 6 tháng.",
    archiveLabel: "Ảnh gốc lưu trữ (08/09/2023)",
  },
  {
    id: "gp3",
    label: "14/03/2023 (GP 3)",
    diseaseLevel: "NPDR giai đoạn sớm",
    aiScore: "0.28",
    confidence: "94.7%",
    doctorNote:
      "Rải rác vi xuất huyết nhỏ ngoại vi, chưa ảnh hưởng vùng hoàng điểm. Điều trị nội khoa và hẹn đánh giá lại định kỳ.",
    archiveLabel: "Ảnh gốc lưu trữ (14/03/2023)",
  },
];

const retinaVessels = [
  "M262 259C219 184 164 141 110 93",
  "M260 260C232 195 201 138 177 78",
  "M260 260C257 199 255 136 261 66",
  "M259 260C284 195 309 151 350 91",
  "M260 260C315 214 355 185 410 150",
  "M260 260C323 246 384 242 455 226",
  "M260 260C322 273 386 306 432 346",
  "M260 260C305 310 342 356 370 415",
  "M260 260C272 327 281 390 282 453",
  "M260 260C240 329 206 382 166 430",
  "M260 260C211 302 171 343 124 382",
  "M260 260C192 272 133 281 72 301",
  "M260 260C194 241 141 214 82 173",
  "M260 260C231 231 204 199 171 158",
  "M260 260C286 233 300 205 324 173",
  "M260 260C279 277 304 289 334 314",
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8ca6c7]">
      {children}
    </p>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0 last:pb-0">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</span>
      <span className="max-w-[220px] text-right text-sm font-semibold text-slate-700">{value}</span>
    </div>
  );
}

function RetinaPreview({ mode }: { mode: PreviewMode }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[28px] border border-slate-200 bg-[#040404] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
      <svg viewBox="0 0 520 520" className="h-full w-full">
        <defs>
          <radialGradient id="retinaCore" cx="50%" cy="48%" r="52%">
            <stop offset="0%" stopColor="#f8ca8c" />
            <stop offset="16%" stopColor="#df8f5a" />
            <stop offset="38%" stopColor="#5a2214" />
            <stop offset="68%" stopColor="#130705" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>
          <radialGradient id="retinaHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,245,228,0.96)" />
            <stop offset="25%" stopColor="rgba(255,200,140,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <rect width="520" height="520" fill="#040404" />
        <circle cx="260" cy="260" r="202" fill="url(#retinaCore)" opacity="0.94" />
        <circle cx="260" cy="260" r="205" fill="none" stroke="rgba(183,104,64,0.32)" strokeWidth="5" />
        <circle cx="260" cy="260" r="38" fill="url(#retinaHalo)" />
        <circle cx="260" cy="260" r="18" fill="#ffe6ba" opacity="0.95" />

        {retinaVessels.map((path, index) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke={index % 2 === 0 ? "rgba(205,96,62,0.9)" : "rgba(168,77,48,0.78)"}
            strokeLinecap="round"
            strokeWidth={index % 3 === 0 ? 4.2 : 2.4}
            opacity={0.96}
          />
        ))}

        <circle cx="338" cy="245" r="9" fill="rgba(241,155,108,0.8)" />
        <circle cx="352" cy="248" r="5" fill="rgba(252,183,129,0.76)" />
        <circle cx="183" cy="203" r="4" fill="rgba(241,155,108,0.65)" />

        {mode === "overlay" ? (
          <>
            <circle cx="338" cy="246" r="31" fill="rgba(122,178,226,0.12)" stroke="#96c2eb" strokeWidth="2" />
            <circle cx="183" cy="203" r="24" fill="rgba(255,160,123,0.12)" stroke="#f5a17b" strokeWidth="2" />
            <path
              d="M128 188C161 157 221 124 299 122"
              fill="none"
              stroke="rgba(156,199,235,0.52)"
              strokeDasharray="8 7"
              strokeWidth="2"
            />
            <path
              d="M315 276C342 287 368 308 388 337"
              fill="none"
              stroke="rgba(245,161,123,0.7)"
              strokeDasharray="7 6"
              strokeWidth="2"
            />
          </>
        ) : null}
      </svg>
    </div>
  );
}

function ResultCard({
  eyebrow,
  title,
  value,
  helper,
  accent,
}: {
  eyebrow: string;
  title: string;
  value: string;
  helper: string;
  accent: "red" | "blue" | "green";
}) {
  const accentClass = {
    red: "border-red-100 bg-red-50/80 text-red-600",
    blue: "border-[#d7e5f4] bg-white text-[#7aa6d3]",
    green: "border-[#d7e5f4] bg-white text-emerald-500",
  }[accent];

  return (
    <div className={`rounded-[22px] border p-5 shadow-[0_10px_28px_rgba(148,163,184,0.08)] ${accentClass}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">{eyebrow}</p>
          <p className="mt-3 text-[34px] font-bold leading-none">{value}</p>
        </div>
        {accent === "red" ? <AlertTriangle className="h-5 w-5 text-red-400" /> : null}
        {accent === "blue" ? <Eye className="h-5 w-5 text-[#8db7da]" /> : null}
        {accent === "green" ? <ShieldCheck className="h-5 w-5 text-emerald-400" /> : null}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{helper}</p>
    </div>
  );
}

export function AiDiagnosisWorkspace() {
  const [previewMode, setPreviewMode] = useState<PreviewMode>("original");
  const [selectedReferenceId, setSelectedReferenceId] = useState(referenceSnapshots[0].id);
  const [expertNote, setExpertNote] = useState(
    "Ưu tiên kiểm soát đường huyết gắt gao trong 8 tuần tới. Theo dõi thêm tổn thương vi mạch quanh đĩa thị và đối chiếu ảnh OCT nếu bệnh nhân tiếp tục than phiền mờ mắt về đêm."
  );

  const selectedReference = useMemo(
    () => referenceSnapshots.find((snapshot) => snapshot.id === selectedReferenceId) ?? referenceSnapshots[0],
    [selectedReferenceId]
  );

  return (
    <section className="space-y-5 xl:-mx-4">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
        <div className="grid xl:grid-cols-[1.12fr_1.56fr_1.14fr] 2xl:grid-cols-[1.16fr_1.62fr_1.18fr]">
          <aside className="space-y-6 border-b border-slate-200 p-5 2xl:p-6 xl:border-b-0 xl:border-r">
            <SectionLabel>Hình ảnh hiện tại</SectionLabel>

            <div className="relative">
              <RetinaPreview mode={previewMode} />

              <div className="absolute right-4 top-4 inline-flex rounded-xl border border-white/10 bg-white/90 p-1 shadow-sm backdrop-blur">
                <button
                  type="button"
                  onClick={() => setPreviewMode("original")}
                  className={`rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
                    previewMode === "original" ? "bg-slate-900 text-white" : "text-slate-500"
                  }`}
                >
                  Gốc
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("overlay")}
                  className={`rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
                    previewMode === "overlay" ? "bg-slate-900 text-white" : "text-slate-500"
                  }`}
                >
                  Lớp phủ
                </button>
              </div>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-5 shadow-[0_10px_28px_rgba(148,163,184,0.06)]">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#8db7da]" />
                <h3 className="text-sm font-bold text-slate-800">Thông tin lần quét</h3>
              </div>

              <InfoRow label="Ngày khám" value="24/05/2024" />
              <InfoRow label="Thiết bị" value="Optos Daytona" />
              <InfoRow label="Kỹ thuật viên" value="Dr. Nguyen V." />
            </div>

            <div className="space-y-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#89b3d9] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#759fca]">
                <Sparkles className="h-4 w-4" />
                Quét lại với AI nội bộ
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                <Download className="h-4 w-4" />
                Xuất dữ liệu thô (.DICOM)
              </button>
            </div>
          </aside>

          <div className="space-y-8 border-b border-slate-200 p-5 2xl:p-6 xl:border-b-0 xl:border-r">
            <div className="space-y-5">
              <SectionLabel>Lần quét hiện tại</SectionLabel>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-[34px] font-bold tracking-tight text-slate-900">Kết quả hiện tại</h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Bản đọc tự động được tổng hợp từ ảnh đáy mắt gần nhất, đối chiếu với mốc lịch sử và chờ bác sĩ xác
                    nhận để lưu vào bệnh án điện tử.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#95bee3] text-sm font-bold text-[#7ea9cf]">
                  A1
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <ResultCard
                  eyebrow="Mức độ nguy cơ"
                  title="Cảnh báo"
                  value="0.94"
                  helper="Cần can thiệp gấp trong 1.0 tháng để tránh tiến triển nhanh."
                  accent="red"
                />
                <ResultCard
                  eyebrow="Giai đoạn"
                  title="Nhận định lâm sàng"
                  value="G3"
                  helper="NPDR tiền tăng sinh với nhiều vi phình mạch rải rác ở bán phần tư võng mạc."
                  accent="blue"
                />
                <ResultCard
                  eyebrow="Độ tin cậy"
                  title="Đã xác thực"
                  value="94.5%"
                  helper="Hệ thống AI v2.4 đã đạt ngưỡng tin cậy để bác sĩ đối chiếu nhanh."
                  accent="green"
                />
              </div>
            </div>

            <div className="relative pl-8">
              <span className="absolute left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-[#95bee3] ring-8 ring-[#eef5fb]" />
              <span className="absolute left-[13px] top-7 h-[calc(100%-14px)] w-px bg-[#d9e7f5]" />

              <div className="rounded-[24px] border border-[#d8e7f4] bg-white p-6 shadow-[0_12px_30px_rgba(148,163,184,0.12)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#eaf3fb] px-3 py-1 text-xs font-bold text-[#7ea9cf]">
                      24/05/2024
                    </span>
                    <span className="rounded-full bg-[#8db7da] px-3 py-1 text-xs font-bold text-white">
                      Lần chụp hiện tại
                    </span>
                  </div>

                  <span className="text-xs font-medium text-slate-400">Bác sĩ: Nguyen V.</span>
                </div>

                <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50/70 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                    Báo cáo chẩn đoán gần nhất
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    Phát hiện thấy có sự gia tăng các vi phình mạch (microaneurysms) rải rác ở bốn phần tư võng mạc.
                    Có dấu hiệu xuất huyết dạng chấm và một số vùng thiếu máu cục bộ tại vùng cực hậu. NPDR giai đoạn
                    3.
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
                    Bình luận & chế độ điều trị
                  </p>
                </div>
              </div>

              <textarea
                value={expertNote}
                onChange={(event) => setExpertNote(event.target.value)}
                placeholder="Nhập phác đồ điều trị so sánh..."
                className="min-h-[265px] w-full rounded-[24px] border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-700 outline-none transition-all placeholder:text-slate-300 focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
              />
            </div>
          </div>

          <aside className="space-y-6 bg-[#fbfcfe] p-5 2xl:p-6">
            <SectionLabel>Mốc đối chiếu</SectionLabel>

            <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-start 2xl:justify-between">
              <div className="max-w-[320px]">
                <h2 className="text-[22px] font-bold tracking-tight text-slate-900">Lịch sử chẩn đoán</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Đối chiếu điểm AI với các mốc đã được bác sĩ xác nhận.
                </p>
              </div>

              <div className="relative">
                <select
                  value={selectedReferenceId}
                  onChange={(event) => setSelectedReferenceId(event.target.value)}
                  className="appearance-none rounded-full border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
                >
                  {referenceSnapshots.map((snapshot) => (
                    <option key={snapshot.id} value={snapshot.id}>
                      {snapshot.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="rounded-[26px] border border-[#e2ebf5] bg-[#eef4fb] p-4">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8ca6c7]">
                Báo cáo chẩn đoán cũ
              </p>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <div className="rounded-[22px] border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex items-center gap-2 text-[#f0a032]">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                      Mức độ bệnh
                    </span>
                  </div>
                  <p className="text-lg font-bold leading-8 text-[#ef8e18]">{selectedReference.diseaseLevel}</p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white p-5">
                  <div className="mb-4 flex items-center gap-2 text-[#8db7da]">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                      Độ chính xác AI (lúc đó)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Điểm AI</p>
                      <p className="mt-2 text-[34px] font-bold leading-none text-slate-800">{selectedReference.aiScore}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        Độ tin cậy
                      </p>
                      <p className="mt-2 text-[34px] font-bold leading-none text-emerald-500">
                        {selectedReference.confidence}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-emerald-100">
                    <div className="h-full w-[92%] rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(148,163,184,0.08)]">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#8db7da]" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                    Lịch sử báo cáo do bác sĩ
                  </p>
                </div>

                <div className="rounded-r-2xl border-l-4 border-[#d5e6f5] bg-slate-50/80 px-4 py-3">
                  <p className="text-sm leading-7 text-slate-700">{selectedReference.doctorNote}</p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs font-semibold">Đã được xác nhận lâm sàng</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="overflow-hidden rounded-[20px] bg-[#121a2f] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="flex aspect-[1.35/1] items-end justify-start bg-[radial-gradient(circle_at_50%_40%,rgba(34,44,70,0.42),transparent_38%),linear-gradient(180deg,#121a2f_0%,#11192c_100%)] p-3">
                  <span className="rounded-md bg-black/50 px-2 py-1 text-[11px] font-semibold text-white">
                    {selectedReference.archiveLabel}
                  </span>
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                <FolderOpen className="h-4 w-4" />
                Phóng to ảnh cũ
              </button>
            </div>
          </aside>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <button className="text-sm font-semibold text-slate-400 transition-colors hover:text-slate-600">
            Hủy phiên bản
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
              <Printer className="h-4 w-4" />
              In báo cáo
            </button>
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Phê duyệt & Lưu Bệnh án
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
