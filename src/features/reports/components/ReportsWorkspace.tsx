"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Pill, Sparkles, Users } from "lucide-react";
import { getDashboardHomeWorkspace, type GetDashboardHomeWorkspaceData } from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { deriveInitials, formatShortTime, getActiveDoctorUid } from "@/shared/lib/medassist-runtime";

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

type SummaryCard = {
  id: string;
  title: string;
  valueText: string;
  helper: string;
  delta: string;
  deltaTone: keyof typeof deltaToneMap;
  iconKey: keyof typeof iconMap;
};

type StageBar = {
  id: string;
  label: string;
  value: number;
};

type TrendPoint = {
  id: string;
  label: string;
  x: number;
  y: number;
};

type AlertPatient = {
  id: string;
  initials: string;
  name: string;
  recordId: string;
  conclusion: string;
  phone: string;
};

function isCompletedAppointment(status: string) {
  return status.toLowerCase() === "completed";
}

function isPendingAppointment(status: string) {
  const normalized = status.toLowerCase();
  return normalized !== "completed" && normalized !== "cancelled" && normalized !== "canceled";
}

function stageIndexFromDiagnosis(stageLabel?: string | null, riskLevel?: string | null) {
  const stageMatch = (stageLabel || "").match(/\d+/);
  if (stageMatch) {
    const stageIndex = Number(stageMatch[0]);
    if (!Number.isNaN(stageIndex) && stageIndex >= 0 && stageIndex <= 4) {
      return stageIndex;
    }
  }

  const normalizedRisk = (riskLevel || "").toLowerCase();
  if (normalizedRisk === "high") {
    return 4;
  }
  if (normalizedRisk === "medium") {
    return 2;
  }
  return 0;
}

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toDateOnly(isoString: string) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return toIsoDate(date);
}

function toCompactNumber(value: number) {
  return value.toLocaleString("vi-VN");
}

export function ReportsWorkspace() {
  const [workspace, setWorkspace] = useState<GetDashboardHomeWorkspaceData | null>(null);

  useEffect(() => {
    let mounted = true;
    getDashboardHomeWorkspace(getMedAssistDataConnect(), {
      doctorUid: getActiveDoctorUid(),
    })
      .then((response) => {
        if (mounted) {
          setWorkspace(response.data);
        }
      })
      .catch((error) => console.error("Khong the tai workspace bao cao:", error));

    return () => {
      mounted = false;
    };
  }, []);

  const summaryCards = useMemo<SummaryCard[]>(() => {
    if (!workspace) {
      return [];
    }

    const now = Date.now();
    const upcomingSoon = workspace.appointments.filter((appointment) => {
      const appointmentTime = new Date(appointment.scheduledAt).getTime();
      return (
        isPendingAppointment(appointment.status) &&
        appointmentTime >= now &&
        appointmentTime - now <= 24 * 60 * 60 * 1000
      );
    }).length;

    const trackedPatientCount = new Set([
      ...workspace.patientProfiles.map((profile) => profile.userUid),
      ...workspace.appointments.map((appointment) => appointment.patientUid),
    ]).size;
    const totalAppointments = workspace.appointments.length;
    const completedAppointments = workspace.appointments.filter((appointment) =>
      isCompletedAppointment(appointment.status)
    ).length;
    const completionRate = totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0;
    const highRiskCount = workspace.aiDiagnoses.filter((diagnosis) => diagnosis.riskLevel.toLowerCase() === "high").length;

    return [
      {
        id: "summary-patients",
        title: "Benh nhan dang theo doi",
        valueText: toCompactNumber(trackedPatientCount),
        helper: "Tong hop tu ho so benh nhan va lich kham.",
        delta: `${upcomingSoon} ca sap toi`,
        deltaTone: upcomingSoon > 0 ? "positive" : "neutral",
        iconKey: "users",
      },
      {
        id: "summary-appointments",
        title: "Luot kham da ghi nhan",
        valueText: toCompactNumber(totalAppointments),
        helper: "Du lieu lich hen va tu van tren Data Connect.",
        delta: `${completedAppointments} da hoan tat`,
        deltaTone: completedAppointments > 0 ? "positive" : "neutral",
        iconKey: "sparkles",
      },
      {
        id: "summary-high-risk",
        title: "Canh bao nguy co cao",
        valueText: toCompactNumber(highRiskCount),
        helper: "Ca duoc danh dau riskLevel = high.",
        delta: highRiskCount > 0 ? "Can xu ly som" : "On dinh",
        deltaTone: highRiskCount > 0 ? "negative" : "positive",
        iconKey: "alert",
      },
      {
        id: "summary-completion",
        title: "Ty le hoan tat lich hen",
        valueText: `${completionRate}%`,
        helper: "Tinh tren tong lich hen cua bac si hien tai.",
        delta: `${totalAppointments} tong ca`,
        deltaTone: "neutral",
        iconKey: "pill",
      },
    ];
  }, [workspace]);

  const stageBars = useMemo<StageBar[]>(() => {
    if (!workspace) {
      return [];
    }

    const stageCounts = [0, 0, 0, 0, 0];
    for (const diagnosis of workspace.aiDiagnoses) {
      const stageIndex = stageIndexFromDiagnosis(diagnosis.stageLabel, diagnosis.riskLevel);
      stageCounts[stageIndex] += 1;
    }

    return stageCounts.map((value, index) => ({
      id: `stage-${index}`,
      label: `GĐ ${index}`,
      value,
    }));
  }, [workspace]);

  const linePoints = useMemo<TrendPoint[]>(() => {
    if (!workspace) {
      return [];
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const last7Days = Array.from({ length: 7 }, (_, index) => {
      const day = new Date(today);
      day.setDate(today.getDate() - 6 + index);
      return day;
    });

    const countByDate = workspace.appointments.reduce((map, appointment) => {
      const dateKey = toDateOnly(appointment.scheduledAt);
      if (!dateKey) {
        return map;
      }

      map.set(dateKey, (map.get(dateKey) || 0) + 1);
      return map;
    }, new Map<string, number>());

    const values = last7Days.map((day) => countByDate.get(toIsoDate(day)) || 0);
    const maxValue = Math.max(...values, 1);
    const startX = 44;
    const endX = 556;
    const chartBottom = 240;
    const chartHeight = 150;

    return last7Days.map((day, index) => {
      const ratio = values[index] / maxValue;
      const x = startX + ((endX - startX) * index) / Math.max(last7Days.length - 1, 1);
      const y = chartBottom - ratio * chartHeight;

      return {
        id: `trend-${toIsoDate(day)}`,
        label: day.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
        x,
        y,
      };
    });
  }, [workspace]);

  const alertPatients = useMemo<AlertPatient[]>(() => {
    if (!workspace) {
      return [];
    }

    const userByUid = new Map(workspace.users.map((user) => [user.uid, user]));
    const appointmentPatientByUid = new Map(workspace.appointments.map((appointment) => [appointment.patientUid, appointment.patient]));
    const latestByPatient = new Map<string, GetDashboardHomeWorkspaceData["aiDiagnoses"][number]>();

    workspace.aiDiagnoses
      .slice()
      .sort((left, right) => (right.examDate || "").localeCompare(left.examDate || ""))
      .forEach((diagnosis) => {
        if (diagnosis.riskLevel.toLowerCase() !== "high") {
          return;
        }

        if (!latestByPatient.has(diagnosis.patientUid)) {
          latestByPatient.set(diagnosis.patientUid, diagnosis);
        }
      });

    return Array.from(latestByPatient.values())
      .slice(0, 8)
      .map((diagnosis) => {
        const user = userByUid.get(diagnosis.patientUid) || appointmentPatientByUid.get(diagnosis.patientUid);
        const patientName = user?.displayName || "Benh nhan chua cap nhat";
        const patientPhone = user?.phone || "Chua co";
        const patientCode = user?.userCode || diagnosis.patientUid;
        const stageText = diagnosis.stageLabel || `Risk ${diagnosis.riskLevel.toUpperCase()}`;
        const examDate = diagnosis.examDate ? new Date(diagnosis.examDate) : null;
        const examTimeLabel =
          examDate && !Number.isNaN(examDate.getTime()) ? formatShortTime(examDate.toISOString()) : "";

        return {
          id: diagnosis.id,
          initials: deriveInitials(patientName),
          name: patientName,
          recordId: patientCode,
          conclusion: examTimeLabel ? `${stageText} (${examTimeLabel})` : stageText,
          phone: patientPhone,
        };
      });
  }, [workspace]);

  const linePath = linePoints.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPath = linePoints.length
    ? `M ${linePoints[0].x} 240 L ${linePoints.map((point) => `${point.x} ${point.y}`).join(" L ")} L ${
        linePoints[linePoints.length - 1].x
      } 240 Z`
    : "";

  if (!workspace) {
    return (
      <section className="rounded-[28px] border border-slate-200 bg-white p-8 text-center text-slate-500">
        Dang tai du lieu bao cao tu Data Connect...
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const iconMeta = iconMap[card.iconKey] ?? iconMap.users;
          const Icon = iconMeta.icon;
          const tone = deltaToneMap[card.deltaTone] ?? deltaToneMap.neutral;

          return (
            <div
              key={card.id}
              className="min-h-[188px] rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_14px_28px_rgba(148,163,184,0.08)]"
            >
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
          <h2 className="text-[24px] font-bold tracking-tight text-slate-900">Phan bo cap do vong mac (AI Stage 0-4)</h2>
          <div className="mt-6 h-[300px]">
            <svg viewBox="0 0 580 300" className="h-full w-full">
              {stageBars.map((bar, index) => {
                const x = 78 + index * 102;
                const normalizedHeight = Math.min(220, bar.value * 20);
                const y = 240 - normalizedHeight;

                return (
                  <g key={bar.id}>
                    <rect
                      x={x}
                      y={y}
                      width="52"
                      height={Math.max(normalizedHeight, 4)}
                      rx="18"
                      fill={index === 4 ? "#f3b6b0" : index === 2 ? "#d6e5fb" : "#edf3fb"}
                    />
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
            <h2 className="text-[24px] font-bold tracking-tight text-slate-900">Xu huong lich kham 7 ngay gan nhat</h2>
            <div className="flex items-center gap-5 text-sm font-medium">
              <div className="flex items-center gap-2 text-slate-500">
                <span className="h-3 w-3 rounded-full bg-[#3f7dea]" /> Kham benh
              </div>
            </div>
          </div>
          <div className="mt-6 h-[300px]">
            <svg viewBox="0 0 600 300" className="h-full w-full">
              {[0, 1, 2].map((line) => (
                <line key={line} x1="30" x2="570" y1={58 + line * 60} y2={58 + line * 60} stroke="#edf2f7" strokeWidth="1" />
              ))}
              {areaPath ? <path d={areaPath} fill="url(#reportArea)" opacity="0.85" /> : null}
              {linePath ? (
                <polyline fill="none" stroke="#3f7dea" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" points={linePath} />
              ) : null}
              {linePoints.map((point, index) => (
                <g key={point.id}>
                  <circle cx={point.x} cy={point.y} r={index === linePoints.length - 1 ? 8 : 0} fill="#ffffff" stroke="#3f7dea" strokeWidth="4" />
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
          <h2 className="text-[28px] font-bold tracking-tight text-slate-900">Danh sach canh bao khan (nguy co cao)</h2>
        </div>

        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_14px_28px_rgba(148,163,184,0.08)]">
          <div className="grid grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr_0.8fr] gap-4 border-b border-slate-100 px-6 py-5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            <span>Benh nhan</span>
            <span>Ma ho so</span>
            <span>Ket luan AI</span>
            <span>So dien thoai</span>
            <span className="text-center">Hanh dong</span>
          </div>

          {alertPatients.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-slate-500">Chua co ca nguy co cao nao trong du lieu hien tai.</div>
          ) : (
            alertPatients.map((patient) => (
              <div
                key={patient.id}
                className="grid grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr_0.8fr] items-center gap-4 border-b border-slate-100 px-6 py-8 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-600">
                    {patient.initials}
                  </div>
                  <p className="text-[18px] font-semibold text-slate-900">{patient.name}</p>
                </div>
                <p className="text-[18px] text-slate-500">{patient.recordId}</p>
                <div>
                  <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-500">{patient.conclusion}</span>
                </div>
                <p className="text-[18px] text-slate-600">{patient.phone}</p>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => (window.location.href = `tel:${patient.phone.replace(/\s+/g, "")}`)}
                    className="rounded-full bg-[#306ae6] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_22px_rgba(48,106,230,0.2)] transition-transform hover:-translate-y-0.5"
                  >
                    Lien he ngay
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <p className="pb-2 text-center text-sm text-slate-400">
        Du lieu bao cao duoc tong hop truc tiep tu Data Connect.
      </p>
    </section>
  );
}
