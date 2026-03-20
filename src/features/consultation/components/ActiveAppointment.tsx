"use client";

import { AlertCircle, Copy, FileText, MessageSquare, Video } from "lucide-react";

const relatedFiles = ["X-quang.pdf", "Mau.pdf"];

const ActiveAppointment = () => {
  return (
    <section className="rounded-[34px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_32px_rgba(148,163,184,0.08)] lg:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="text-[18px] font-extrabold tracking-tight text-slate-800">
          CUỘC HẸN HIỆN TẠI
        </h2>
        <span className="inline-flex h-9 items-center rounded-full bg-[#edf4ff] px-5 text-sm font-extrabold text-[#3375f6]">
          15 PHÚT NỮA
        </span>
      </div>

      <div className="rounded-[30px] border border-slate-200/80 bg-[#fcfdff] p-5 shadow-[0_18px_45px_rgba(210,220,235,0.15)] lg:p-7">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120"
            alt="Bệnh nhân"
            className="h-24 w-24 rounded-[22px] object-cover shadow-[0_14px_30px_rgba(110,140,170,0.16)]"
          />

          <div className="pt-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#84add2]">
              Tư vấn trực tuyến
            </p>
            <h3 className="mt-1 text-[28px] font-extrabold tracking-tight text-[#25324a]">
              14:30 - 15:00
            </h3>
            <p className="mt-3 text-[18px] font-medium text-slate-500">Nội tiết & Tiểu đường</p>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-[20px] border border-slate-200/80 bg-white px-4 py-4 shadow-[0_8px_22px_rgba(226,232,240,0.35)] sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff1ef] text-[#f2554a]">
              <AlertCircle className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Google Meet
              </p>
              <a
                href="#"
                className="block truncate text-[15px] font-semibold text-[#6aa2dd] hover:text-[#4d8dce]"
              >
                meet.google.com/abc-xy...
              </a>
            </div>
          </div>

          <button className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600">
            <Copy className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between gap-4">
          <h4 className="text-[13px] font-bold uppercase tracking-[0.22em] text-[#7083a5]">
            Hồ sơ liên quan (2)
          </h4>
          <button className="text-sm font-semibold text-[#8bb1d6] transition-colors hover:text-[#6f9fcd]">
            + Thêm mới
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {relatedFiles.map((file) => (
            <button
              key={file}
              className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-left shadow-[0_6px_16px_rgba(226,232,240,0.18)] transition-colors hover:bg-slate-50"
            >
              <FileText className="h-5 w-5 text-[#ff4a4a]" />
              <span className="text-[15px] font-semibold text-slate-700">{file}</span>
            </button>
          ))}
        </div>

        <div className="mt-7 rounded-[22px] border-l-4 border-[#d7e3f2] bg-[#eef4fb] px-5 py-6">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#7fa9d0]" />
            <span className="text-[12px] font-bold uppercase tracking-wide text-[#7fa9d0]">
              Lời nhắn của BS. Danh
            </span>
          </div>

          <p className="text-[15px] leading-7 text-slate-600">
            &ldquo;Vui lòng chuẩn bị sẵn kết quả xét nghiệm máu gần nhất và đo huyết áp trước
            khi bắt đầu cuộc gọi.&rdquo;
          </p>
        </div>

        <button className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-[18px] bg-[#7eaad0] text-lg font-semibold text-white shadow-[0_16px_30px_rgba(126,170,208,0.4)] transition-colors hover:bg-[#6f9dc6]">
          <Video className="h-5 w-5" />
          <span>Vào phòng chờ trực tuyến</span>
        </button>
      </div>
    </section>
  );
};

export default ActiveAppointment;
