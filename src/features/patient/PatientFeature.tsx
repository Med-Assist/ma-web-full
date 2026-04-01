"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Filter, Grid, List, Search, UserPlus } from "lucide-react";
import {
  createPatientProfile,
  createUser,
  getPatientWorkspace,
  type GetPatientWorkspaceData,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import {
  calculateAge,
  createClientId,
  deriveInitials,
  getActiveDoctorUid,
  getAvatarColorClass,
  getDiagnosisLabel,
  getPriorityLabel,
  getStatusColorClass,
  nowIsoString,
} from "@/shared/lib/medassist-runtime";
import { PatientCreateModal, type PatientCreateValues } from "./components/PatientCreateModal";
import { PatientGridCard, type PatientData } from "./components/PatientGridCard";

type PatientWorkspaceData = GetPatientWorkspaceData;
const PATIENTS_PER_PAGE = 10;

function parseOptionalNumber(value: string) {
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function createNextPatientCode(patients: PatientData[]) {
  const maxPatientNumber = patients.reduce((max, patient) => {
    const matched = patient.patientId.match(/PAT(\d+)/);
    const value = matched ? Number(matched[1]) : 0;
    return Number.isFinite(value) ? Math.max(max, value) : max;
  }, 0);

  return `PAT${String(maxPatientNumber + 1).padStart(4, "0")}`;
}

function mapPatients(data: PatientWorkspaceData): PatientData[] {
  const latestDiagnosisByPatient = data.aiDiagnoses.reduce(
    (map, diagnosis) => {
      const current = map.get(diagnosis.patientUid);
      const currentDate = current?.examDate || "";
      const nextDate = diagnosis.examDate || "";

      if (!current || nextDate.localeCompare(currentDate) >= 0) {
        map.set(diagnosis.patientUid, diagnosis);
      }

      return map;
    },
    new Map<string, PatientWorkspaceData["aiDiagnoses"][number]>()
  );

  const latestAppointmentByPatient = data.appointments.reduce(
    (map, appointment) => {
      const current = map.get(appointment.patientUid);
      const currentTime = current ? new Date(current.scheduledAt).getTime() : 0;
      const nextTime = new Date(appointment.scheduledAt).getTime();

      if (!current || nextTime >= currentTime) {
        map.set(appointment.patientUid, appointment);
      }

      return map;
    },
    new Map<string, PatientWorkspaceData["appointments"][number]>()
  );

  return data.patientProfiles.map<PatientData>((patientProfile) => {
    const diagnosis = latestDiagnosisByPatient.get(patientProfile.userUid);
    const appointment = latestAppointmentByPatient.get(patientProfile.userUid);
    const priority = getPriorityLabel(diagnosis?.riskLevel, appointment?.status);

    return {
      id: patientProfile.id,
      userUid: patientProfile.userUid,
      initials: deriveInitials(patientProfile.user.displayName),
      avatarColor: getAvatarColorClass(patientProfile.userUid),
      statusColor: getStatusColorClass(patientProfile.user.status || appointment?.status),
      name: patientProfile.user.displayName,
      patientId: patientProfile.user.userCode ? `#${patientProfile.user.userCode}` : `#${patientProfile.userUid}`,
      age: calculateAge(patientProfile.dob),
      gender: patientProfile.gender || "Khác",
      diagnosis: getDiagnosisLabel(diagnosis?.stageLabel, diagnosis?.riskLevel),
      diagnosisColor: diagnosis?.riskLevel?.toLowerCase() === "high" ? "text-blue-600" : "text-slate-600",
      bloodType: patientProfile.bloodType || "Chưa rõ",
      phone: patientProfile.user.phone || "Chưa cập nhật",
      email: patientProfile.user.email,
      address: patientProfile.address || "Chưa cập nhật",
      priority: priority.priority,
      prioritySub: priority.prioritySub,
      priorityColor: priority.priorityColor,
      insuranceNumber: patientProfile.insuranceNumber || "Chưa cập nhật",
      cccd: patientProfile.cccd || "Chưa cập nhật",
      allergies: patientProfile.allergies || "Không có ghi nhận",
      occupation: patientProfile.occupation || "Chưa cập nhật",
      height: patientProfile.height ? `${patientProfile.height} cm` : "Chưa cập nhật",
      weight: patientProfile.weight ? `${patientProfile.weight} kg` : "Chưa cập nhật",
      lastVisit: appointment ? new Date(appointment.scheduledAt).toLocaleDateString("vi-VN") : "Chưa có lịch hẹn",
    };
  });
}

export const PatientFeature = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadWorkspace = async () => {
      try {
        const response = await getPatientWorkspace(getMedAssistDataConnect(), {
          doctorUid: getActiveDoctorUid(),
        });

        if (!isMounted) {
          return;
        }

        setPatients(mapPatients(response.data));
      } catch (error) {
        console.error("Không thể tải patient workspace:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadWorkspace();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPatients = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch =
        !normalizedSearch ||
        patient.name.toLowerCase().includes(normalizedSearch) ||
        patient.patientId.toLowerCase().includes(normalizedSearch) ||
        patient.phone.toLowerCase().includes(normalizedSearch);

      const matchesUrgent = !showUrgentOnly || patient.priority === "KHẨN CẤP";

      return matchesSearch && matchesUrgent;
    });
  }, [patients, searchTerm, showUrgentOnly]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showUrgentOnly]);

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(filteredPatients.length / PATIENTS_PER_PAGE)),
    [filteredPatients.length]
  );

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount);
    }
  }, [currentPage, pageCount]);

  const pagedPatients = useMemo(() => {
    const safePage = Math.min(Math.max(currentPage, 1), pageCount);
    const startIndex = (safePage - 1) * PATIENTS_PER_PAGE;
    return filteredPatients.slice(startIndex, startIndex + PATIENTS_PER_PAGE);
  }, [currentPage, filteredPatients, pageCount]);

  const pageSummary = useMemo(() => {
    const safePage = Math.min(Math.max(currentPage, 1), pageCount);
    const startItem = filteredPatients.length === 0 ? 0 : (safePage - 1) * PATIENTS_PER_PAGE + 1;
    const endItem = Math.min(safePage * PATIENTS_PER_PAGE, filteredPatients.length);

    return {
      page: safePage,
      startItem,
      endItem,
    };
  }, [currentPage, filteredPatients.length, pageCount]);

  const handleOpenPatient = (patient: PatientData) => {
    router.push(`/dashboard/patient/${patient.userUid}`);
  };

  const handleCreatePatient = async (values: PatientCreateValues) => {
    setIsSubmitting(true);

    const uid = createClientId("patient");
    const userCode = createNextPatientCode(patients);
    const displayName = values.fullName.trim();
    const phone = values.phone.trim();

    try {
      await createUser(getMedAssistDataConnect(), {
        uid,
        email: values.email.trim() || `${uid}@patient.medassist.vn`,
        role: "patient",
        displayName,
        userCode,
        status: "active",
        phone: phone || null,
        createdAt: nowIsoString(),
        createdBy: getActiveDoctorUid(),
        updatedAt: nowIsoString(),
        updatedBy: getActiveDoctorUid(),
        authProvider: "dataconnect-seed",
        passwordSet: false,
      });

      await createPatientProfile(getMedAssistDataConnect(), {
        userUid: uid,
        assignedDoctorUid: getActiveDoctorUid(),
        dob: values.dob || null,
        gender: values.gender || null,
        cccd: values.cccd.trim() || null,
        occupation: values.occupation.trim() || null,
        insuranceNumber: values.insuranceNumber.trim() || null,
        address: values.address.trim() || null,
        height: parseOptionalNumber(values.height),
        weight: parseOptionalNumber(values.weight),
        bloodType: values.bloodType || null,
        allergies: values.allergies.trim() || null,
      });

      const nextPatient: PatientData = {
        id: uid,
        userUid: uid,
        initials: deriveInitials(displayName),
        avatarColor: getAvatarColorClass(uid),
        statusColor: "bg-emerald-500",
        name: displayName,
        patientId: `#${userCode}`,
        age: calculateAge(values.dob),
        gender: values.gender || "Khác",
        diagnosis: "Chưa cập nhật",
        diagnosisColor: "text-slate-600",
        bloodType: values.bloodType || "Chưa rõ",
        phone: values.phone.trim() || "Chưa cập nhật",
        email: values.email.trim() || `${uid}@patient.medassist.vn`,
        address: values.address.trim() || "Chưa cập nhật",
        priority: "ĐỊNH KỲ",
        prioritySub: "(Bệnh nhân mới)",
        priorityColor: "text-emerald-500",
        insuranceNumber: values.insuranceNumber.trim() || "Chưa cập nhật",
        cccd: values.cccd.trim() || "Chưa cập nhật",
        allergies: values.allergies.trim() || "Không có ghi nhận",
        occupation: values.occupation.trim() || "Chưa cập nhật",
        height: values.height.trim() ? `${values.height.trim()} cm` : "Chưa cập nhật",
        weight: values.weight.trim() ? `${values.weight.trim()} kg` : "Chưa cập nhật",
        lastVisit: "Chưa có lịch hẹn",
      };

      setPatients((current) => [nextPatient, ...current]);

      if (phone && typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("medassist:patient-created", {
            detail: {
              uid,
              name: displayName,
              phone,
              userCode,
            },
          })
        );
      }

      setIsCreateModalOpen(false);
      router.push(`/dashboard/patient/${uid}`);
    } catch (error) {
      console.error("Không thể tạo bệnh nhân mới:", error);
      alert("Không thể tạo hồ sơ bệnh nhân lúc này.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Danh sách bệnh nhân</h1>
          <p className="mt-1 text-sm text-slate-500">Theo dõi hồ sơ bệnh án, mức độ ưu tiên và lịch tái khám gần nhất.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Tìm theo tên, mã hồ sơ hoặc số điện thoại..."
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:w-72"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowUrgentOnly((current) => !current)}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            <Filter className="h-4 w-4 text-slate-400" />
            {showUrgentOnly ? "Tắt lọc khẩn cấp" : "Lọc khẩn cấp"}
          </button>

          <div className="flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`rounded-full p-1.5 transition-colors ${viewMode === "list" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
              title="Xem dạng danh sách"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`rounded-full p-1.5 transition-colors ${viewMode === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
              title="Xem dạng lưới"
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#35678E] to-[#8BB4DC] px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-[#35678E]/20 transition-all hover:opacity-90"
          >
            <UserPlus className="h-4 w-4" />
            Thêm bệnh nhân
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-sm font-medium text-slate-500 shadow-sm">
          Đang tải danh sách bệnh nhân...
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pagedPatients.length ? (
            pagedPatients.map((patient) => (
              <PatientGridCard key={patient.id} patient={patient} onOpen={handleOpenPatient} />
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center text-sm font-medium text-slate-500 shadow-sm">
              Khong tim thay ho so phu hop.
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Họ và tên</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Giới tính</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Tuổi</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Chẩn đoán</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Điện thoại</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Địa chỉ</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Nhóm máu</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Ưu tiên</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pagedPatients.length ? (
                  pagedPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="cursor-pointer transition-colors hover:bg-slate-50/80"
                    onClick={() => handleOpenPatient(patient)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${patient.avatarColor}`}>
                            {patient.initials}
                          </div>
                          <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${patient.statusColor}`} />
                        </div>
                        <div>
                          <span className="block font-bold text-slate-900">{patient.name}</span>
                          <span className="text-xs font-medium text-slate-500">{patient.patientId}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{patient.gender}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{patient.age} tuổi</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${patient.diagnosisColor || "text-slate-600"}`}>{patient.diagnosis}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{patient.phone}</td>
                    <td className="max-w-[220px] truncate px-6 py-4 text-sm text-slate-600" title={patient.address}>
                      {patient.address}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{patient.bloodType}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`flex items-center gap-1 text-xs font-bold ${patient.priorityColor}`}>{patient.priority}</span>
                        <span className="mt-0.5 whitespace-nowrap text-[10px] text-slate-400">{patient.prioritySub}</span>
                      </div>
                    </td>
                  </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-14 text-center text-sm font-medium text-slate-500">
                      Khong tim thay ho so phu hop.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!isLoading ? (
        <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-slate-500">
            {filteredPatients.length === 0
              ? "0 ho so"
              : `${pageSummary.startItem}-${pageSummary.endItem} / ${filteredPatients.length} ho so | ${PATIENTS_PER_PAGE} ho so/trang`}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={pageSummary.page <= 1}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Trang truoc"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
              Trang {pageSummary.page}/{pageCount}
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(page + 1, pageCount))}
              disabled={pageSummary.page >= pageCount}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Trang sau"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}

      <div className="fixed bottom-6 right-6 z-50">
        <button className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#35678E] to-[#8BB4DC] text-white shadow-lg shadow-[#35678E]/30 transition-transform hover:scale-105 hover:opacity-90">
          <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold">
            {filteredPatients.filter((patient) => patient.priority === "KHẨN CẤP").length}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>

      <PatientCreateModal
        isOpen={isCreateModalOpen}
        isSubmitting={isSubmitting}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePatient}
      />
    </div>
  );
};
