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

type ExtractedMetric = {
  code: string;
  label: string;
  value: string;
  status: string;
  reference?: string;
  tone: "normal" | "warning";
};

const extractedMetrics: ExtractedMetric[] = [
  {
    code: "WBC",
    label: "White Blood Cell",
    value: "6.4 G/L",
    status: "Bình thường",
    tone: "normal",
  },
  {
    code: "GLU",
    label: "Glucose",
    value: "7.2 mmol/L",
    status: "Vượt ngưỡng",
    reference: "Ref: 3.9 - 6.4",
    tone: "warning",
  },
  {
    code: "RBC",
    label: "Red Blood Cell",
    value: "4.8 T/L",
    status: "Bình thường",
    tone: "normal",
  },
];

const toneClassMap = {
  normal: {
    pill: "bg-emerald-50 text-emerald-600",
    value: "text-slate-900",
  },
  warning: {
    pill: "bg-blue-50 text-[#5f8ebf]",
    value: "text-[#5f8ebf]",
  },
} as const;

export function RecordDigitizationWorkspace() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[38px] font-bold tracking-tight text-slate-900">Số hóa hồ sơ bệnh án</h1>
          <p className="mt-2 text-lg text-slate-500">
            Hệ thống đang trích xuất dữ liệu bằng công nghệ Vision AI cao cấp
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
            <Upload className="h-5 w-5 text-slate-500" />
            Tải tài liệu mới
          </button>

          <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#507fa8] to-[#6a9bc6] px-6 py-4 text-base font-semibold text-white shadow-[0_14px_28px_rgba(80,127,168,0.26)] transition-transform hover:-translate-y-0.5">
            <Download className="h-5 w-5" />
            Xuất dữ liệu
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
              <h2 className="text-[28px] font-bold tracking-tight text-slate-900">Đang bóc tách dữ liệu AI...</h2>
              <p className="mt-1 text-xl text-slate-500">Tiến trình xử lý tài liệu 04/2024</p>
            </div>
          </div>

          <span className="text-[28px] font-bold text-[#5f8ebf]">75%</span>
        </div>

        <div className="mt-7 h-4 overflow-hidden rounded-full bg-[#d7e7fa]">
          <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-[#4a7ba6] via-[#5a8dba] to-[#689fc8] shadow-[0_10px_18px_rgba(90,141,186,0.28)]" />
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
              <button className="rounded-full p-2 transition-colors hover:bg-slate-100 hover:text-slate-600">
                <ZoomIn className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2 transition-colors hover:bg-slate-100 hover:text-slate-600">
                <ZoomOut className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2 transition-colors hover:bg-slate-100 hover:text-slate-600">
                <RotateCw className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_32px_rgba(148,163,184,0.1)]">
            <div className="relative flex min-h-[590px] items-center justify-center overflow-hidden rounded-[24px] border border-slate-100 bg-[linear-gradient(180deg,#f4f7fb_0%,#edf2f8_100%)] px-6 py-10">
              <div className="absolute inset-x-0 top-[49%] h-8 -translate-y-1/2 bg-[linear-gradient(180deg,rgba(109,155,210,0),rgba(109,155,210,0.2),rgba(109,155,210,0))]" />
              <div className="absolute inset-x-0 top-[49%] h-px -translate-y-1/2 bg-[#8eb7e0]" />

              <div className="w-full max-w-[460px] rounded-[4px] border border-slate-200 bg-white px-10 py-12 shadow-[0_20px_45px_rgba(100,116,139,0.22)]">
                <div className="text-center">
                  <h3 className="font-serif text-[23px] font-bold uppercase text-slate-800">
                    Bệnh viện Đa khoa Quốc tế
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">Địa chỉ: 123 Đường Y Học, TP. Hồ Chí Minh</p>
                </div>

                <div className="my-5 h-px bg-[#c6d5ea]" />

                <div className="space-y-4">
                  <div className="flex items-end justify-between gap-4 border-b border-slate-100 pb-3">
                    <div>
                      <p className="font-serif text-[15px] font-bold uppercase text-slate-800">
                        Phiếu kết quả xét nghiệm
                      </p>
                      <p className="mt-1 text-sm text-slate-500">Họ và tên:</p>
                    </div>
                    <p className="font-serif text-lg font-bold uppercase text-slate-700">Nguyễn Văn An</p>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-y-3 text-[15px] text-slate-700">
                    <span>Năm sinh:</span>
                    <span>1985</span>
                    <span>Ngày khám:</span>
                    <span className="rounded bg-[#d9e9ff] px-1.5">20/05/2024</span>
                  </div>
                </div>

                <div className="mt-8 rounded border border-slate-100 bg-slate-50/50 p-3">
                  <div className="grid grid-cols-[1.5fr_1fr_0.8fr] gap-3 border-b border-slate-200 pb-3 text-sm font-semibold text-slate-700">
                    <span>Chỉ số</span>
                    <span>Kết quả</span>
                    <span>Tham chiếu</span>
                  </div>

                  <div className="grid grid-cols-[1.5fr_1fr_0.8fr] gap-3 py-3 text-sm text-slate-700">
                    <span>WBC (Bạch cầu)</span>
                    <span className="font-semibold">6.4</span>
                    <span>4.0 - 10.0</span>
                  </div>
                  <div className="grid grid-cols-[1.5fr_1fr_0.8fr] gap-3 border-t border-slate-100 py-3 text-sm text-slate-700">
                    <span>RBC (Hồng cầu)</span>
                    <span className="font-semibold">4.8</span>
                    <span>3.8 - 5.8</span>
                  </div>
                  <div className="grid grid-cols-[1.5fr_1fr_0.8fr] gap-3 border-t border-slate-100 bg-[#edf5ff] py-3 text-sm text-[#5f8ebf]">
                    <span>Glucose</span>
                    <span className="font-semibold">7.2</span>
                    <span>3.9 - 6.4</span>
                  </div>
                  <div className="grid grid-cols-[1.5fr_1fr_0.8fr] gap-3 border-t border-slate-100 py-3 text-sm text-slate-700">
                    <span>Cholesterol</span>
                    <span className="font-semibold">5.1</span>
                    <span>&lt; 5.2</span>
                  </div>
                </div>

                <p className="mt-8 text-right text-xs italic text-slate-400">Bác sĩ chỉ định: Lê Minh Tâm</p>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-2 text-sm font-medium text-[#8ca2c0] transition-colors hover:text-[#5f8ebf]">
            <History className="h-4 w-4" />
            Xem lịch sử quét tài liệu
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
                  <Building2 className="h-4 w-4" />
                  Tên cơ sở y tế
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <h3 className="text-[32px] font-bold tracking-tight text-slate-900">Bệnh viện Đa khoa Quốc tế</h3>
                  <CheckCircle2 className="h-5 w-5 text-[#78a5d2]" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#6b94bf]">
                  <CalendarDays className="h-4 w-4" />
                  Ngày khám
                </div>
                <p className="mt-3 text-[34px] font-bold tracking-tight text-slate-900">20/05/2024</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#6b94bf]">
                  <UserRound className="h-4 w-4" />
                  Họ và tên
                </div>
                <p className="mt-3 text-[34px] font-bold tracking-tight text-slate-900">Nguyễn Văn An</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#6b94bf]">
                  <FlaskConical className="h-4 w-4" />
                  Chỉ số xét nghiệm máu
                </div>
                <span className="rounded-full border border-[#b9d2ee] bg-[#edf5ff] px-3 py-1 text-xs font-medium text-[#6b94bf]">
                  Tự động nhận diện
                </span>
              </div>

              <div className="space-y-4">
                {extractedMetrics.map((metric) => {
                  const toneClass = toneClassMap[metric.tone];

                  return (
                    <div
                      key={metric.code}
                      className="flex flex-col gap-4 rounded-[24px] border border-slate-100 bg-slate-50/70 px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-600">
                          {metric.code}
                        </div>

                        <div>
                          <p className="text-sm text-slate-400">{metric.label}</p>
                          <p className={`mt-1 text-[23px] font-bold ${toneClass.value}`}>{metric.value}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-2 sm:items-end">
                        <span className={`rounded-xl px-3 py-1.5 text-sm font-semibold ${toneClass.pill}`}>
                          {metric.status}
                        </span>
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
        <button className="px-4 py-3 text-base font-medium text-slate-400 transition-colors hover:text-slate-600">
          Hủy bỏ
        </button>
        <button className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#507fa8] to-[#6a9bc6] px-7 py-4 text-base font-semibold text-white shadow-[0_14px_28px_rgba(80,127,168,0.26)] transition-transform hover:-translate-y-0.5">
          <Save className="h-5 w-5" />
          Lưu vào hồ sơ bệnh án
        </button>
      </div>
    </section>
  );
}
