"use client";

import { MonitorPlay, Search } from "lucide-react";

const ConsultationHeader = () => {
  return (
    <header className="border-b border-slate-200/80 bg-white px-5 py-5 lg:px-7">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#8db7da]/20 text-[#7ea9cf] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            <MonitorPlay className="h-5 w-5" />
          </div>

          <div className="flex min-w-0 items-center gap-4 text-sm">
            <span className="truncate text-slate-400">Trang chủ</span>
            <span className="text-slate-300">/</span>
            <span className="truncate font-semibold text-slate-900">Tư vấn trực tiếp</span>
          </div>
        </div>

        <label className="relative block w-full max-w-[280px]">
          <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            aria-label="Tìm kiếm"
            className="h-11 w-full rounded-full border border-slate-200 bg-white pl-4 pr-11 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-300 focus:border-[#8ab0d5] focus:ring-4 focus:ring-[#8ab0d5]/10"
          />
        </label>
      </div>
    </header>
  );
};

export default ConsultationHeader;
