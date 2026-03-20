"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

type DashboardPageHeaderProps = {
  icon: LucideIcon;
  title: string;
  actions?: ReactNode;
};

export function DashboardPageHeader({
  icon: Icon,
  title,
  actions,
}: DashboardPageHeaderProps) {
  return (
    <header className="-mx-6 -mt-6 mb-6 border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#8db7da]/20 text-[#7ea9cf] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            <Icon className="h-5 w-5" />
          </div>

          <div className="flex min-w-0 items-center gap-4 text-sm">
            <Link href="/dashboard" className="truncate text-slate-400 transition-colors hover:text-slate-500">
              Trang chủ
            </Link>
            <span className="text-slate-300">/</span>
            <span className="truncate font-semibold text-slate-900">{title}</span>
          </div>
        </div>

        {actions ? <div className="flex flex-wrap items-center justify-end gap-3">{actions}</div> : null}
      </div>
    </header>
  );
}
