import { auth } from "./firebase";

export const DEFAULT_DOCTOR_UID = "doctor_001";
export const DEFAULT_PATIENT_UID = "patient_001";
export const DEFAULT_DASHBOARD_THREAD = "dashboard-main";
const ACTIVE_DOCTOR_UID_KEY = "medassist_active_doctor_uid";

function readRememberedDoctorUid() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(ACTIVE_DOCTOR_UID_KEY) || "";
    const normalized = raw.trim();
    return normalized || null;
  } catch {
    return null;
  }
}

export function rememberActiveDoctorUid(uid?: string | null) {
  if (typeof window === "undefined") {
    return;
  }

  const normalized = (uid || "").trim();
  if (!normalized) {
    return;
  }

  try {
    window.localStorage.setItem(ACTIVE_DOCTOR_UID_KEY, normalized);
  } catch {
    // Ignore storage failures in private mode or restricted environments.
  }
}

export function clearRememberedDoctorUid() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(ACTIVE_DOCTOR_UID_KEY);
  } catch {
    // Ignore storage failures in private mode or restricted environments.
  }
}

export function getActiveDoctorUid() {
  const authUid = auth.currentUser?.uid?.trim();
  if (authUid) {
    rememberActiveDoctorUid(authUid);
    return authUid;
  }

  const rememberedUid = readRememberedDoctorUid();
  if (rememberedUid) {
    return rememberedUid;
  }

  return DEFAULT_DOCTOR_UID;
}

export function createClientId(prefix: string) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function nowIsoString() {
  return new Date().toISOString();
}

export function formatShortTime(isoString: string) {
  const date = new Date(isoString);

  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateTimeLabel(isoString: string) {
  const date = new Date(isoString);

  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatBirthDate(dateString?: string | null) {
  if (!dateString) {
    return "Chưa cập nhật";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("vi-VN");
}

export function calculateAge(dateString?: string | null) {
  if (!dateString) {
    return 0;
  }

  const birthDate = new Date(dateString);

  if (Number.isNaN(birthDate.getTime())) {
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}

export function deriveInitials(name?: string | null) {
  const safeName = (name || "MedAssist").trim();
  const parts = safeName.split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export function getAvatarColorClass(seed: string) {
  const palette = [
    "bg-indigo-500",
    "bg-red-500",
    "bg-blue-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  const hash = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palette[hash % palette.length];
}

export function getStatusColorClass(status?: string | null) {
  const normalized = (status || "").toLowerCase();

  if (normalized.includes("active") || normalized.includes("online") || normalized.includes("completed")) {
    return "bg-emerald-500";
  }

  if (normalized.includes("urgent") || normalized.includes("high")) {
    return "bg-red-500";
  }

  return "bg-slate-300";
}

export function getPriorityLabel(riskLevel?: string | null, appointmentStatus?: string | null) {
  const risk = (riskLevel || "").toLowerCase();
  const status = (appointmentStatus || "").toLowerCase();

  if (risk.includes("high") || risk.includes("severe") || status.includes("pending")) {
    return {
      priority: "KHẨN CẤP",
      prioritySub: "(Cần xử lý sớm)",
      priorityColor: "text-red-500",
    };
  }

  if (risk.includes("medium") || status.includes("approved")) {
    return {
      priority: "THEO DÕI",
      prioritySub: "(Cần tái khám)",
      priorityColor: "text-blue-600",
    };
  }

  return {
    priority: "ĐỊNH KỲ",
    prioritySub: "(Khám định kỳ)",
    priorityColor: "text-emerald-500",
  };
}

export function getDiagnosisLabel(stageLabel?: string | null, riskLevel?: string | null) {
  if (stageLabel) {
    return stageLabel;
  }

  const risk = (riskLevel || "").toLowerCase();

  if (risk === "high") {
    return "Cấp độ 4";
  }

  if (risk === "medium") {
    return "Cấp độ 3";
  }

  if (risk === "low") {
    return "Chưa quét";
  }

  return "Chưa cập nhật";
}

export function safeClipboardCopy(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(value);
  }

  return Promise.resolve();
}

export function triggerBrowserPrint() {
  if (typeof window !== "undefined") {
    window.print();
  }
}

export function formatCurrencyVnd(value: number) {
  return value.toLocaleString("vi-VN");
}

export function toDayMonthLabel(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return { day: "--", date: "--" };
  }

  return {
    day: date
      .toLocaleDateString("vi-VN", { weekday: "short" })
      .replace(".", "")
      .toUpperCase(),
    date: String(date.getDate()).padStart(2, "0"),
  };
}

export function toIsoDateString(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function toTimeRangeLabel(startTime: string, endTime: string) {
  return `${startTime} - ${endTime}`;
}

export function downloadTextFile(filename: string, content: string, mimeType = "text/plain;charset=utf-8") {
  if (typeof document === "undefined") {
    return;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadJsonFile(filename: string, value: unknown) {
  downloadTextFile(filename, JSON.stringify(value, null, 2), "application/json;charset=utf-8");
}

export function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Không thể đọc tệp."));
    reader.readAsDataURL(file);
  });
}

export function readFileAsText(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Không thể đọc tệp văn bản."));
    reader.readAsText(file);
  });
}
