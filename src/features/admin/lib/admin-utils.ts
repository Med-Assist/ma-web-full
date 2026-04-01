import type {
  GetAiDiagnosesData,
  GetAllUsersData,
  GetAppointmentsData,
  GetConsultationWorkspaceData,
  GetDoctorProfileWorkspaceData,
  GetDoctorsData,
  GetPatientWorkspaceData,
  GetPharmacyWorkspaceData,
  GetRecordDigitizationWorkspaceData,
  GetReportsWorkspaceData,
  GetScheduleWorkspaceData,
  GetSettingsWorkspaceData,
} from "@/shared/lib/generated-fdc";

export type AdminUserRow = GetAllUsersData["users"][number];
export type AdminDoctorRow = GetDoctorsData["users"][number];
export type AdminAppointmentRow = GetAppointmentsData["appointments"][number];
export type AdminDiagnosisRow = GetAiDiagnosesData["aiDiagnoses"][number];
export type AdminDoctorProfileRow = GetDoctorProfileWorkspaceData["doctorProfiles"][number];
export type AdminDoctorMetricRow = GetDoctorProfileWorkspaceData["doctorProfileMetrics"][number];
export type AdminPatientProfileRow = GetPatientWorkspaceData["patientProfiles"][number];
export type AdminPatientAppointmentSummaryRow = GetPatientWorkspaceData["appointments"][number];
export type AdminScheduleEventRow = GetScheduleWorkspaceData["scheduleEvents"][number];
export type AdminScheduleAttachmentRow = GetScheduleWorkspaceData["scheduleAttachments"][number];
export type AdminDoctorAvailabilityRow = GetScheduleWorkspaceData["doctorAvailabilities"][number];
export type AdminSchedulePatientProfileRow = GetScheduleWorkspaceData["patientProfiles"][number];
export type AdminConsultationRoomRow = GetConsultationWorkspaceData["consultationRooms"][number];
export type AdminAppointmentAttachmentRow = GetConsultationWorkspaceData["appointmentAttachments"][number];
export type AdminTemplateRow = GetPharmacyWorkspaceData["prescriptionTemplates"][number];
export type AdminTemplateDrugRow = GetPharmacyWorkspaceData["prescriptionTemplateDrugs"][number];
export type AdminDrugCatalogRow = GetPharmacyWorkspaceData["drugCatalogItems"][number];
export type AdminPrescriptionDraftRow = GetPharmacyWorkspaceData["prescriptionDrafts"][number];
export type AdminPrescriptionDraftItemRow = GetPharmacyWorkspaceData["prescriptionDraftItems"][number];
export type AdminNotificationPreferenceRow = GetSettingsWorkspaceData["notificationPreferences"][number];
export type AdminWorkingScheduleSlotRow = GetSettingsWorkspaceData["workingScheduleSlots"][number];
export type AdminDigitalSignatureRow = GetSettingsWorkspaceData["digitalSignatures"][number];
export type AdminReportMetricRow = GetReportsWorkspaceData["reportSummaryMetrics"][number];
export type AdminReportStageRow = GetReportsWorkspaceData["reportStageDistributions"][number];
export type AdminReportTrendRow = GetReportsWorkspaceData["reportTrendPoints"][number];
export type AdminReportAlertRow = GetReportsWorkspaceData["reportAlertCases"][number];
export type AdminDigitizationJobRow = GetRecordDigitizationWorkspaceData["digitizationJobs"][number];
export type AdminDigitizationMetricRow = GetRecordDigitizationWorkspaceData["digitizationMetrics"][number];

export const ADMIN_DEFAULT_PAGE_SIZE = 10;

export function dedupeByKey<T>(items: T[], getKey: (item: T) => string) {
  const map = new Map<string, T>();

  items.forEach((item) => {
    const key = getKey(item);
    if (!key) {
      return;
    }

    map.set(key, item);
  });

  return Array.from(map.values());
}

export function groupByKey<T>(items: T[], getKey: (item: T) => string) {
  return items.reduce(
    (map, item) => {
      const key = getKey(item);
      const existing = map.get(key) || [];
      existing.push(item);
      map.set(key, existing);
      return map;
    },
    new Map<string, T[]>()
  );
}

export function sortByDateDesc<T>(items: T[], getValue: (item: T) => string | null | undefined) {
  return items.slice().sort((left, right) => {
    const leftTime = new Date(getValue(left) || "").getTime();
    const rightTime = new Date(getValue(right) || "").getTime();
    return rightTime - leftTime;
  });
}

export function sortByDateAsc<T>(items: T[], getValue: (item: T) => string | null | undefined) {
  return items.slice().sort((left, right) => {
    const leftTime = new Date(getValue(left) || "").getTime();
    const rightTime = new Date(getValue(right) || "").getTime();
    return leftTime - rightTime;
  });
}

export function formatRoleLabel(role?: string | null) {
  const normalized = (role || "").toLowerCase();

  if (normalized === "admin") {
    return "Quản trị viên";
  }

  if (normalized === "patient") {
    return "Bệnh nhân";
  }

  return "Bác sĩ";
}

export function formatStatusLabel(status?: string | null) {
  const normalized = (status || "").trim();
  return normalized || "Đang cập nhật";
}

export function calculateCompletionRate(completed: number, total: number) {
  if (!total) {
    return 0;
  }

  return Math.round((completed / total) * 100);
}

export function formatDateTime(value?: string | null) {
  if (!value) {
    return "Chưa cập nhật";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(value?: string | null) {
  if (!value) {
    return "Chưa cập nhật";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("vi-VN");
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatCurrency(value: number) {
  return value.toLocaleString("vi-VN");
}

export function buildDoctorFallbackName(doctorUid: string) {
  const suffix = doctorUid.slice(-4).toUpperCase();
  return `BS. ${suffix}`;
}

export function getPageCount(totalItems: number, pageSize = ADMIN_DEFAULT_PAGE_SIZE) {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function clampPage(page: number, totalItems: number, pageSize = ADMIN_DEFAULT_PAGE_SIZE) {
  return Math.min(Math.max(page, 1), getPageCount(totalItems, pageSize));
}

export function paginateItems<T>(items: T[], page: number, pageSize = ADMIN_DEFAULT_PAGE_SIZE) {
  const safePage = clampPage(page, items.length, pageSize);
  const startIndex = (safePage - 1) * pageSize;

  return {
    page: safePage,
    pageCount: getPageCount(items.length, pageSize),
    items: items.slice(startIndex, startIndex + pageSize),
  };
}
