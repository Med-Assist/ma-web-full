"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Pill, Sparkles, Users } from "lucide-react";
import { getReportsWorkspace, type GetReportsWorkspaceData } from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";

const iconMap = {
  users: { icon: Users, iconBg: "bg-[#eef4ff]", iconColor: "text-[#2f6fe4]" },
  sparkles: { icon: Sparkles, iconBg: "bg-[#eef2ff]", iconColor: "text-[#4f46e5]" },
  alert: { icon: AlertTriangle, iconBg: "bg-[#fff1f1]", iconColor: "text-[#ef4444]" },
  pill: { icon: Pill, iconBg: "bg-[#ebfbf7]", iconColor: "text-[#0f9f8a]" },
} as const;

const deltaToneMap = {
  positive: "bg-emerald-50 text-emerald-600",
  negative: "bg-red-50 text-red-500",
  neutral: "bg-slate-100 text-slate-500",
} as const;

export function ReportsWorkspace() {
  const [workspace, setWorkspace] = useState<GetReportsWorkspaceData | null>(null);

  useEffect(() => {
    let mounted = true;
    getReportsWorkspace(getMedAssistDataConnect())
      .then((response) => mounted && setWorkspace(response.data))
      .catch((error) => console.error("Không thể tải workspace báo cáo:", error));
    return () => {
      mounted = false;
    };
  }, []);

  const linePoints = useMemo(
    () => (workspace?.reportTrendPoints ?? []).filter((item) => item.series === "visits"),
    [workspace?.reportTrendPoints]
  );
  const stageBars = workspace?.reportStageDistributions ?? [];
  const alertPatients = workspace?.reportAlertCases ?? [];
  const summaryCards = workspace?.reportSummaryMetrics ?? [];
  const linePath = linePoints.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPath = `M ${linePoints[0]?.x || 0} 240 L ${linePoints.map((point) => `${point.x} ${point.y}`).join(" L ")} L ${linePoints[linePoints.length - 1]?.x || 0} 240 Z`;

  return (
    <section className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const iconMeta = iconMap[(card.iconKey as keyof typeof iconMap) || "users"] ?? iconMap.users;
          const Icon = iconMeta.icon;
          const tone = deltaToneMap[(card.deltaTone as keyof typeof deltaToneMap) || "neutral"] ?? deltaToneMap.neutral;

          return (
            <div key={card.id} className="min-h-[188px] rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_14px_28px_rgba(148,163,184,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-[20px] ${iconMeta.iconBg} ${iconMeta.iconColor}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${tone}`}>{card.delta}</span>
              </div>
              <p className="mt-6 text-[18px] font-medium text-slate-500">{card.title}</p>
              <p className="mt-2 text-[34px] font-bold leading-none tracking-tight text-slate-900">{card.valueText}</p>
              <p className="mt-4 text-sm text-slate-400">{card.helper}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_14px_28px_rgba(148,163,184,0.08)]">
          <h2 className="text-[24px] font-bold tracking-tight text-slate-900">Phân bố Cấp độ Võng mạc (AI Stage 0-4)</h2>
          <div className="mt-6 h-[300px]">
            <svg viewBox="0 0 580 300" className="h-full w-full">
              {stageBars.map((bar, index) => {
                const x = 78 + index * 102;
                const height = bar.value * 2.15;
                const y = 240 - height;

                return (
                  <g key={bar.id}>
                    <rect x={x} y={y} width="52" height={height} rx="18" fill={index === 4 ? "#f3b6b0" : index === 2 ? "#d6e5fb" : "#edf3fb"} />
                    <text x={x + 26} y="274" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7b8aa3">
                      {bar.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_14px_28px_rgba(148,163,184,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-[24px] font-bold tracking-tight text-slate-900">Xu hướng Phân tích AI & Khám bệnh</h2>
            <div className="flex items-center gap-5 text-sm font-medium">
              <div className="flex items-center gap-2 text-slate-500"><span className="h-3 w-3 rounded-full bg-[#3f7dea]" /> Khám bệnh</div>
            </div>
          </div>
          <div className="mt-6 h-[300px]">
            <svg viewBox="0 0 600 300" className="h-full w-full">
              {[0, 1, 2].map((line) => <line key={line} x1="30" x2="570" y1={58 + line * 60} y2={58 + line * 60} stroke="#edf2f7" strokeWidth="1" />)}
              <path d={areaPath} fill="url(#reportArea)" opacity="0.85" />
              <polyline fill="none" stroke="#3f7dea" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" points={linePath} />
              {linePoints.map((point, index) => (
                <g key={point.id}>
                  <circle cx={point.x} cy={point.y} r={index === 4 || index === 6 ? 8 : 0} fill="#ffffff" stroke="#3f7dea" strokeWidth="4" />
                  <text x={point.x} y="280" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9aa8be">
                    {point.label}
                  </text>
                </g>
              ))}
              <defs>
                <linearGradient id="reportArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#cfe0ff" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#ff4f4f] text-white">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h2 className="text-[28px] font-bold tracking-tight text-slate-900">Danh sách Cảnh báo Khẩn (Giai đoạn PDR)</h2>
        </div>

        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_14px_28px_rgba(148,163,184,0.08)]">
          <div className="grid grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr_0.8fr] gap-4 border-b border-slate-100 px-6 py-5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            <span>Bệnh nhân</span>
            <span>Mã hồ sơ</span>
            <span>Kết luận AI</span>
            <span>So dien thoai</span>
            <span className="text-center">Hành động</span>
          </div>

          {alertPatients.map((patient) => (
            <div key={patient.id} className="grid grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr_0.8fr] items-center gap-4 border-b border-slate-100 px-6 py-8 last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-600">{patient.initials}</div>
                <p className="text-[18px] font-semibold text-slate-900">{patient.name}</p>
              </div>
              <p className="text-[18px] text-slate-500">{patient.recordId}</p>
              <div><span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-500">{patient.conclusion}</span></div>
              <p className="text-[18px] text-slate-600">{patient.phone}</p>
              <div className="text-center">
                <button type="button" onClick={() => (window.location.href = `tel:${patient.phone.replace(/\s+/g, "")}`)} className="rounded-full bg-[#306ae6] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_22px_rgba(48,106,230,0.2)] transition-transform hover:-translate-y-0.5">
                  Liên hệ ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="pb-2 text-center text-sm text-slate-400">© 2024 MedAssist Healthcare Analytics. Bảo mật & Chuyên nghiệp.</p>
    </section>
  );
}
