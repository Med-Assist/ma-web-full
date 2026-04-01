"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";

type AdminSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

type AdminStatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  helper?: string;
  tone?: "blue" | "emerald" | "amber" | "rose" | "slate";
};

const toneClassMap = {
  blue: "from-[#35678E] via-[#4A7CA4] to-[#8BB4DC] text-white",
  emerald: "from-emerald-600 via-emerald-500 to-teal-400 text-white",
  amber: "from-amber-500 via-orange-400 to-yellow-300 text-slate-950",
  rose: "from-rose-600 via-pink-500 to-orange-300 text-white",
  slate: "from-slate-800 via-slate-700 to-slate-500 text-white",
} as const;

export function AdminSection({
  eyebrow,
  title,
  description,
  actions,
  children,
}: AdminSectionProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#5d8ab3]">{eyebrow}</p>
          ) : null}
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          {description ? <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function AdminPanel({ title, helper, children }: { title: string; helper?: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50/75 p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {helper ? <p className="mt-1 text-sm text-slate-500">{helper}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function AdminStatCard({
  icon: Icon,
  label,
  value,
  helper,
  tone = "blue",
}: AdminStatCardProps) {
  return (
    <div className={`rounded-[28px] bg-gradient-to-br p-5 shadow-md ${toneClassMap[tone]}`}>
      <div className="mb-8 flex items-start justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.22em] opacity-80">{label}</span>
        <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      {helper ? <p className="mt-2 text-sm opacity-90">{helper}</p> : null}
    </div>
  );
}

export function AdminButton({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) {
  const variantClass =
    variant === "secondary"
      ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      : variant === "ghost"
        ? "bg-transparent text-slate-500 hover:bg-slate-100"
        : "bg-[#35678E] text-white shadow-lg shadow-[#35678E]/20 hover:bg-[#2e5b7d]";

  return (
    <button
      {...props}
      className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variantClass} ${props.className || ""}`}
    >
      {children}
    </button>
  );
}

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10 ${props.className || ""}`}
    />
  );
}

export function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10 ${props.className || ""}`}
    />
  );
}

export function AdminSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10 ${props.className || ""}`}
    />
  );
}

export function AdminEmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-medium text-slate-500">
      {message}
    </div>
  );
}

export function AdminScrollViewport({
  children,
  heightClass = "max-h-[640px]",
  className = "",
}: {
  children: ReactNode;
  heightClass?: string;
  className?: string;
}) {
  return <div className={`overflow-y-auto pr-1 ${heightClass} ${className}`}>{children}</div>;
}

export function AdminPagination({
  page,
  pageCount,
  totalItems,
  pageSize = 10,
  itemLabel = "dòng",
  onPageChange,
}: {
  page: number;
  pageCount: number;
  totalItems: number;
  pageSize?: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
}) {
  const safePage = Math.min(Math.max(page, 1), Math.max(pageCount, 1));
  const startItem = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endItem = Math.min(safePage * pageSize, totalItems);

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-slate-500">
        {totalItems === 0
          ? `0 ${itemLabel}`
          : `${startItem}-${endItem} / ${totalItems} ${itemLabel} • ${pageSize} ${itemLabel}/trang`}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage <= 1}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Trang trước"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
          Trang {safePage}/{Math.max(pageCount, 1)}
        </div>
        <button
          type="button"
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage >= pageCount}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Trang sau"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
