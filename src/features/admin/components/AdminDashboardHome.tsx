"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BellRing,
  CalendarClock,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  getAiDiagnoses,
  getAllUsers,
  getAppointments,
  getDoctors,
  getReportsWorkspace,
  type GetAiDiagnosesData,
  type GetAllUsersData,
  type GetAppointmentsData,
  type GetDoctorsData,
  type GetReportsWorkspaceData,
  upsertAssistantMessage,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import {
  buildDoctorNoticeThreadKey,
  createClientId,
  nowIsoString,
} from "@/shared/lib/medassist-runtime";
import {
  ADMIN_DEFAULT_PAGE_SIZE,
  formatDateTime,
  formatDate,
  getPageCount,
  paginateItems,
} from "../lib/admin-utils";
import {
  AdminButton,
  AdminEmptyState,
  AdminInput,
  AdminPagination,
  AdminPanel,
  AdminScrollViewport,
  AdminSection,
  AdminStatCard,
} from "./AdminPrimitives";

type DashboardBundle = {
  users: GetAllUsersData["users"];
  doctors: GetDoctorsData["users"];
  appointments: GetAppointmentsData["appointments"];
  diagnoses: GetAiDiagnosesData["aiDiagnoses"];
  reportAlerts: GetReportsWorkspaceData["reportAlertCases"];
};

type DoctorLoadCard = {
  doctor: GetDoctorsData["users"][number];
  totalAppointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  highRiskCount: number;
  nextAppointmentAt: string | null;
};

type AlertCard = {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  doctorUid: string | null;
  doctorName: string;
  patientUid: string | null;
  patientName: string;
  scheduledAt?: string | null;
};

const DOCTOR_CARD_PAGE_SIZE = 6;

function isPendingAppointment(status: string) {
  const normalized = status.toLowerCase();
  return normalized !== "completed" && normalized !== "cancelled" && normalized !== "canceled";
}

function isSameDay(isoString: string, targetDate: Date) {
  const date = new Date(isoString);
  return (
    date.getFullYear() === targetDate.getFullYear()
    && date.getMonth() === targetDate.getMonth()
    && date.getDate() === targetDate.getDate()
  );
}

export function AdminDashboardHome() {
  const router = useRouter();
  const [bundle, setBundle] = useState<DashboardBundle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [isNotifyingDoctor, setIsNotifyingDoctor] = useState<string | null>(null);
  const [priorityPage, setPriorityPage] = useState(1);
  const [doctorPage, setDoctorPage] = useState(1);
  const [alertPage, setAlertPage] = useState(1);

  useEffect(() => {
    let mounted = true;

    const loadBundle = async () => {
      try {
        const [usersResponse, doctorsResponse, appointmentsResponse, diagnosesResponse, reportsResponse] = await Promise.all([
          getAllUsers(getMedAssistDataConnect()),
          getDoctors(getMedAssistDataConnect()),
          getAppointments(getMedAssistDataConnect()),
          getAiDiagnoses(getMedAssistDataConnect()),
          getReportsWorkspace(getMedAssistDataConnect()),
        ]);

        if (!mounted) {
          return;
        }

        const nextBundle: DashboardBundle = {
          users: usersResponse.data.users,
          doctors: doctorsResponse.data.users,
          appointments: appointmentsResponse.data.appointments.slice().sort((left, right) => {
            return new Date(left.scheduledAt).getTime() - new Date(right.scheduledAt).getTime();
          }),
          diagnoses: diagnosesResponse.data.aiDiagnoses,
          reportAlerts: reportsResponse.data.reportAlertCases,
        };

        setBundle(nextBundle);
        setSelectedAppointmentId(
          nextBundle.appointments.find((appointment) => isPendingAppointment(appointment.status))?.id
          || nextBundle.appointments[0]?.id
          || null
        );
      } catch (error) {
        console.error("Không thể tải dashboard quản trị:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadBundle();

    return () => {
      mounted = false;
    };
  }, []);

  const users = bundle?.users ?? [];
  const doctors = bundle?.doctors ?? [];
  const appointments = bundle?.appointments ?? [];
  const diagnoses = bundle?.diagnoses ?? [];
  const reportAlerts = bundle?.reportAlerts ?? [];
  const today = useMemo(() => new Date(), []);

  const patientCount = users.filter((user) => user.role.toLowerCase() === "patient").length;
  const highRiskCount = diagnoses.filter((diagnosis) => diagnosis.riskLevel.toLowerCase() === "high").length;
  const upcomingAppointments = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const now = Date.now();

    return appointments.filter((appointment) => {
      const scheduledAt = new Date(appointment.scheduledAt).getTime();
      if (!isPendingAppointment(appointment.status) || Number.isNaN(scheduledAt) || scheduledAt < now) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return (
        appointment.patient.displayName.toLowerCase().includes(normalizedSearch)
        || appointment.doctorName.toLowerCase().includes(normalizedSearch)
        || (appointment.patient.userCode || "").toLowerCase().includes(normalizedSearch)
        || (appointment.specialty || appointment.appointmentType || "").toLowerCase().includes(normalizedSearch)
      );
    });
  }, [appointments, searchTerm]);

  const priorityPageCount = getPageCount(upcomingAppointments.length, ADMIN_DEFAULT_PAGE_SIZE);
  const pagedUpcomingAppointments = paginateItems(upcomingAppointments, priorityPage, ADMIN_DEFAULT_PAGE_SIZE);

  useEffect(() => {
    setPriorityPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (!upcomingAppointments.length) {
      setSelectedAppointmentId(null);
      return;
    }

    if (!selectedAppointmentId || !upcomingAppointments.some((appointment) => appointment.id === selectedAppointmentId)) {
      setSelectedAppointmentId(upcomingAppointments[0].id);
    }
  }, [selectedAppointmentId, upcomingAppointments]);

  useEffect(() => {
    if (priorityPage > priorityPageCount) {
      setPriorityPage(priorityPageCount);
    }
  }, [priorityPage, priorityPageCount]);

  const selectedAppointment = useMemo(() => {
    return upcomingAppointments.find((appointment) => appointment.id === selectedAppointmentId) || upcomingAppointments[0] || null;
  }, [selectedAppointmentId, upcomingAppointments]);

  const selectedDiagnosis = useMemo(() => {
    if (!selectedAppointment) {
      return null;
    }

    return diagnoses
      .filter((diagnosis) => diagnosis.patientUid === selectedAppointment.patientUid)
      .slice()
      .sort((left, right) => new Date(right.examDate || "").getTime() - new Date(left.examDate || "").getTime())[0] || null;
  }, [diagnoses, selectedAppointment]);

  const doctorCards = useMemo<DoctorLoadCard[]>(() => {
    return doctors
      .map((doctor) => {
        const doctorAppointments = appointments.filter((appointment) => appointment.doctorUid === doctor.uid);
        const pendingAppointmentsCount = doctorAppointments.filter((appointment) => isPendingAppointment(appointment.status)).length;
        const todayAppointments = doctorAppointments.filter((appointment) => isSameDay(appointment.scheduledAt, today)).length;
        const nextAppointment = doctorAppointments
          .filter((appointment) => isPendingAppointment(appointment.status))
          .slice()
          .sort((left, right) => new Date(left.scheduledAt).getTime() - new Date(right.scheduledAt).getTime())[0];
        const doctorHighRiskCount = diagnoses.filter((diagnosis) => diagnosis.doctorUid === doctor.uid && diagnosis.riskLevel.toLowerCase() === "high").length;

        return {
          doctor,
          totalAppointments: doctorAppointments.length,
          todayAppointments,
          pendingAppointments: pendingAppointmentsCount,
          highRiskCount: doctorHighRiskCount,
          nextAppointmentAt: nextAppointment?.scheduledAt || null,
        };
      })
      .sort((left, right) => {
        if (right.todayAppointments !== left.todayAppointments) {
          return right.todayAppointments - left.todayAppointments;
        }
        return right.pendingAppointments - left.pendingAppointments;
      });
  }, [appointments, diagnoses, doctors, today]);

  const doctorPageCount = getPageCount(doctorCards.length, DOCTOR_CARD_PAGE_SIZE);
  const pagedDoctorCards = paginateItems(doctorCards, doctorPage, DOCTOR_CARD_PAGE_SIZE);

  useEffect(() => {
    if (doctorPage > doctorPageCount) {
      setDoctorPage(doctorPageCount);
    }
  }, [doctorPage, doctorPageCount]);

  const alertCards = useMemo<AlertCard[]>(() => {
    const latestDiagnosisByPatientUid = new Map<string, GetAiDiagnosesData["aiDiagnoses"][number]>();
    const latestAppointmentByPatientUid = new Map<string, GetAppointmentsData["appointments"][number]>();

    diagnoses
      .slice()
      .sort((left, right) => new Date(right.examDate || "").getTime() - new Date(left.examDate || "").getTime())
      .forEach((diagnosis) => {
        if (!latestDiagnosisByPatientUid.has(diagnosis.patientUid)) {
          latestDiagnosisByPatientUid.set(diagnosis.patientUid, diagnosis);
        }
      });

    appointments
      .slice()
      .sort((left, right) => new Date(right.scheduledAt).getTime() - new Date(left.scheduledAt).getTime())
      .forEach((appointment) => {
        if (!latestAppointmentByPatientUid.has(appointment.patientUid)) {
          latestAppointmentByPatientUid.set(appointment.patientUid, appointment);
        }
      });

    const diagnosisAlerts = diagnoses
      .filter((diagnosis) => diagnosis.riskLevel.toLowerCase() === "high")
      .slice(0, 20)
      .map<AlertCard>((diagnosis) => ({
        id: `diagnosis-${diagnosis.id}`,
        title: diagnosis.patient.displayName,
        subtitle: diagnosis.doctor?.displayName || "Chưa gán bác sĩ",
        detail: diagnosis.stageLabel || diagnosis.reportSummary || diagnosis.riskLevel,
        doctorUid: diagnosis.doctorUid || null,
        doctorName: diagnosis.doctor?.displayName || "Chưa gán bác sĩ",
        patientUid: diagnosis.patientUid,
        patientName: diagnosis.patient.displayName,
        scheduledAt: diagnosis.examDate || null,
      }));

    const reportAlertCards = reportAlerts.map<AlertCard>((alertItem) => {
      const relatedDiagnosis = alertItem.patientUid ? latestDiagnosisByPatientUid.get(alertItem.patientUid) : null;
      const relatedAppointment = alertItem.patientUid ? latestAppointmentByPatientUid.get(alertItem.patientUid) : null;
      return {
        id: `report-${alertItem.id}`,
        title: alertItem.name,
        subtitle: relatedDiagnosis?.doctor?.displayName || relatedAppointment?.doctorName || "Chưa xác định bác sĩ",
        detail: alertItem.conclusion,
        doctorUid: relatedDiagnosis?.doctorUid || relatedAppointment?.doctorUid || null,
        doctorName: relatedDiagnosis?.doctor?.displayName || relatedAppointment?.doctorName || "Chưa xác định bác sĩ",
        patientUid: alertItem.patientUid || null,
        patientName: alertItem.name,
        scheduledAt: relatedDiagnosis?.examDate || relatedAppointment?.scheduledAt || null,
      };
    });

    return [...diagnosisAlerts, ...reportAlertCards].sort((left, right) => {
      return new Date(right.scheduledAt || 0).getTime() - new Date(left.scheduledAt || 0).getTime();
    });
  }, [appointments, diagnoses, reportAlerts]);

  const alertPageCount = getPageCount(alertCards.length, ADMIN_DEFAULT_PAGE_SIZE);
  const pagedAlertCards = paginateItems(alertCards, alertPage, ADMIN_DEFAULT_PAGE_SIZE);

  useEffect(() => {
    if (alertPage > alertPageCount) {
      setAlertPage(alertPageCount);
    }
  }, [alertPage, alertPageCount]);

  const handleNotifyDoctor = async (doctorUid: string, doctorName: string, content: string) => {
    setIsNotifyingDoctor(doctorUid);

    try {
      await upsertAssistantMessage(getMedAssistDataConnect(), {
        id: createClientId("doctor-notice"),
        threadKey: buildDoctorNoticeThreadKey(doctorUid),
        role: "assistant",
        content,
        timestampLabel: "Điều phối quản trị - vừa gửi",
        createdAt: nowIsoString(),
        displayOrder: Date.now(),
      });

      alert(`Đã gửi thông báo tới ${doctorName}.`);
    } catch (error) {
      console.error("Không thể gửi thông báo tới bác sĩ:", error);
      alert("Không thể gửi thông báo tới bác sĩ lúc này.");
    } finally {
      setIsNotifyingDoctor(null);
    }
  };

  const handleNotifySelectedDoctor = async () => {
    if (!selectedAppointment || !selectedAppointment.doctorUid) {
      return;
    }

    const diagnosisText = selectedDiagnosis?.stageLabel || selectedDiagnosis?.riskLevel || "chưa có kết quả AI";
    const content = `Admin ưu tiên ca ${selectedAppointment.patient.displayName} lúc ${formatDateTime(selectedAppointment.scheduledAt)}. Vui lòng kiểm tra và xử lý sớm. Tóm tắt AI: ${diagnosisText}.`;
    await handleNotifyDoctor(selectedAppointment.doctorUid, selectedAppointment.doctorName, content);
  };

  return (
    <div className="space-y-6">
      <AdminSection
        eyebrow="Trang chủ quản trị"
        title="Trung tâm điều phối MedAssist"
        description="Theo dõi lịch khám được bác sĩ sắp xếp hoặc bệnh nhân đã đặt lịch, ưu tiên ca cần xử lý sớm và điều hướng bác sĩ trực tiếp từ dữ liệu Data Connect."
        actions={
          <div className="min-w-[280px]">
            <AdminInput
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Tìm bệnh nhân, bác sĩ, mã hồ sơ hoặc chuyên khoa..."
            />
          </div>
        }
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <AdminStatCard icon={Users} label="Bệnh nhân" value={String(patientCount)} helper="Tổng bệnh nhân đang có trong hệ thống" tone="blue" />
          <AdminStatCard icon={CalendarClock} label="Lịch sắp tới" value={String(upcomingAppointments.length)} helper="Dữ liệu appointment sắp tới từ Data Connect" tone="emerald" />
          <AdminStatCard icon={ShieldCheck} label="Nguy cơ cao" value={String(highRiskCount)} helper="Các ca AI cần điều phối sớm" tone="rose" />
          <AdminStatCard icon={BellRing} label="Cảnh báo" value={String(alertCards.length)} helper="Tổng số cảnh báo có thể gửi tới bác sĩ" tone="amber" />
        </div>
      </AdminSection>

      <AdminSection
        eyebrow="Điều phối ưu tiên"
        title="Hàng đợi ưu tiên theo thời gian"
        description="Khung trên cùng tập trung lịch bác sĩ đã sắp xếp hoặc bệnh nhân đã đặt lịch. Dữ liệu được sắp theo thời gian để điều phối nhanh hơn."
      >
        <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
          <AdminPanel title="Danh sách lịch sắp tới" helper="Cố định 10 dòng mỗi trang, có cuộn dọc và giữ đúng thứ tự theo thời gian">
            {isLoading ? (
              <AdminEmptyState message="Đang đồng bộ lịch từ Data Connect..." />
            ) : upcomingAppointments.length === 0 ? (
              <AdminEmptyState message="Chưa có lịch sắp tới phù hợp với bộ lọc hiện tại." />
            ) : (
              <>
                <div className="rounded-3xl border border-slate-200 bg-white">
                  <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_180px] gap-4 border-b border-slate-100 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    <span>Bệnh nhân</span>
                    <span>Bác sĩ / chuyên khoa</span>
                    <span>Thời gian</span>
                  </div>
                  <AdminScrollViewport heightClass="max-h-[560px]">
                    {pagedUpcomingAppointments.items.map((appointment) => {
                      const isActive = appointment.id === selectedAppointment?.id;
                      return (
                        <button
                          key={appointment.id}
                          type="button"
                          onClick={() => setSelectedAppointmentId(appointment.id)}
                          className={`grid w-full grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_180px] gap-4 border-b border-slate-100 px-5 py-4 text-left transition-colors last:border-b-0 ${
                            isActive ? "bg-[#35678E]/6" : "bg-white hover:bg-slate-50"
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">{appointment.patient.displayName}</p>
                            <p className="mt-1 truncate text-xs text-slate-500">{appointment.patient.userCode || appointment.patient.uid}</p>
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-700">{appointment.doctorName}</p>
                            <p className="mt-1 truncate text-xs text-slate-500">{appointment.specialty || appointment.appointmentType || "Khám bệnh"}</p>
                          </div>
                          <div className="text-sm font-medium text-slate-600">{formatDateTime(appointment.scheduledAt)}</div>
                        </button>
                      );
                    })}
                  </AdminScrollViewport>
                </div>
                <AdminPagination
                  page={pagedUpcomingAppointments.page}
                  pageCount={pagedUpcomingAppointments.pageCount}
                  totalItems={upcomingAppointments.length}
                  onPageChange={setPriorityPage}
                />
              </>
            )}
          </AdminPanel>

          <AdminPanel
            title={selectedAppointment ? `Ca ưu tiên: ${selectedAppointment.patient.displayName}` : "Chưa chọn lịch"}
            helper="Bấm thông báo để gửi ngay luồng điều phối sang dashboard của bác sĩ phụ trách"
          >
            {selectedAppointment ? (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Bác sĩ phụ trách</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedAppointment.doctorName}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Thời gian</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{formatDateTime(selectedAppointment.scheduledAt)}</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Thông tin tiếp nhận</p>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <p>Bệnh nhân: <span className="font-semibold text-slate-800">{selectedAppointment.patient.displayName}</span></p>
                    <p>Mã hồ sơ: <span className="font-semibold text-slate-800">{selectedAppointment.patient.userCode || selectedAppointment.patient.uid}</span></p>
                    <p>Triệu chứng: <span className="font-semibold text-slate-800">{selectedAppointment.symptoms || "Chưa cập nhật"}</span></p>
                    <p>Tóm tắt AI: <span className="font-semibold text-slate-800">{selectedDiagnosis?.stageLabel || selectedDiagnosis?.riskLevel || "Chưa có"}</span></p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <AdminButton
                    onClick={handleNotifySelectedDoctor}
                    disabled={!selectedAppointment.doctorUid || isNotifyingDoctor === selectedAppointment.doctorUid}
                  >
                    {isNotifyingDoctor === selectedAppointment.doctorUid ? "Đang gửi..." : "Thông báo bác sĩ"}
                  </AdminButton>
                    <AdminButton
                      variant="ghost"
                      onClick={() => router.push(`/dashboard/patient/${encodeURIComponent(selectedAppointment.patientUid)}`)}
                    >
                      Mở hồ sơ bệnh nhân
                  </AdminButton>
                </div>
              </div>
            ) : (
              <AdminEmptyState message="Chọn một dòng bên trái để bắt đầu điều phối." />
            )}
          </AdminPanel>
        </div>
      </AdminSection>

      <AdminSection
        eyebrow="Theo dõi bác sĩ"
        title="Danh sách bác sĩ đang cần quan tâm"
        description="Khung thứ hai hiển thị dạng ô kề nhau với kích thước thoáng hơn để admin theo dõi tải làm việc của từng bác sĩ."
      >
        {isLoading ? (
          <AdminEmptyState message="Đang tải dữ liệu bác sĩ..." />
        ) : doctorCards.length === 0 ? (
          <AdminEmptyState message="Chưa có bác sĩ nào trong hệ thống." />
        ) : (
          <>
            <AdminScrollViewport heightClass="max-h-[620px]">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {pagedDoctorCards.items.map((item) => (
                  <div
                    key={item.doctor.uid}
                    className="rounded-[28px] border border-slate-200 bg-white p-5 text-left shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-lg font-bold text-slate-900">{item.doctor.displayName}</h3>
                        <p className="mt-1 truncate text-sm text-slate-500">{item.doctor.email}</p>
                      </div>
                      <div className="rounded-2xl bg-[#35678E]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#35678E]">
                        {item.highRiskCount} cảnh báo
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-slate-400">Ca hôm nay</p>
                        <p className="mt-1 font-bold text-slate-900">{item.todayAppointments}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-slate-400">Đang chờ</p>
                        <p className="mt-1 font-bold text-slate-900">{item.pendingAppointments}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-500">
                      {item.nextAppointmentAt ? `Lịch gần nhất: ${formatDateTime(item.nextAppointmentAt)}` : "Chưa có lịch đang chờ"}
                    </p>
                  </div>
                ))}
              </div>
            </AdminScrollViewport>
            <AdminPagination
              page={pagedDoctorCards.page}
              pageCount={pagedDoctorCards.pageCount}
              totalItems={doctorCards.length}
              pageSize={DOCTOR_CARD_PAGE_SIZE}
              itemLabel="bác sĩ"
              onPageChange={setDoctorPage}
            />
          </>
        )}
      </AdminSection>

      <AdminSection
        eyebrow="Cảnh báo điều phối"
        title="Cảnh báo cần gửi tới bác sĩ"
        description="Mỗi dòng đều có nút thông báo. Khi bấm, dashboard bác sĩ sẽ nhận được một thông điệp điều phối từ quản trị viên."
      >
        {isLoading ? (
          <AdminEmptyState message="Đang tải cảnh báo hệ thống..." />
        ) : alertCards.length === 0 ? (
          <AdminEmptyState message="Chưa có cảnh báo nào cần xử lý." />
        ) : (
          <>
            <div className="rounded-3xl border border-slate-200 bg-white">
              <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,1fr)_160px] gap-3 border-b border-slate-100 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                <span>Bệnh nhân</span>
                <span>Bác sĩ</span>
                <span>Nội dung</span>
                <span>Hành động</span>
              </div>
              <AdminScrollViewport heightClass="max-h-[520px]">
                {pagedAlertCards.items.map((alertItem) => {
                  const notifyMessage = `Admin gui canh bao cho ca ${alertItem.patientName}. Noi dung: ${alertItem.detail}. Vui long kiem tra va phan hoi som.`;
                  const canNotify = Boolean(alertItem.doctorUid);
                  return (
                    <div
                      key={alertItem.id}
                      className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,1fr)_160px] gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">{alertItem.title}</p>
                        <p className="mt-1 truncate text-xs text-slate-500">{alertItem.patientUid || "Không có patientUid"}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-700">{alertItem.doctorName}</p>
                        <p className="mt-1 text-xs text-slate-500">{alertItem.scheduledAt ? formatDate(alertItem.scheduledAt) : "Chưa có mốc thời gian"}</p>
                      </div>
                      <p className="text-sm leading-6 text-slate-600">{alertItem.detail}</p>
                      <div className="flex items-start justify-end">
                        <AdminButton
                          variant={canNotify ? "primary" : "secondary"}
                          onClick={() => canNotify && alertItem.doctorUid && handleNotifyDoctor(alertItem.doctorUid, alertItem.doctorName, notifyMessage)}
                          disabled={!canNotify || isNotifyingDoctor === alertItem.doctorUid}
                        >
                          {isNotifyingDoctor === alertItem.doctorUid ? "Đang gửi..." : "Thông báo"}
                        </AdminButton>
                      </div>
                    </div>
                  );
                })}
              </AdminScrollViewport>
            </div>
            <AdminPagination
              page={pagedAlertCards.page}
              pageCount={pagedAlertCards.pageCount}
              totalItems={alertCards.length}
              onPageChange={setAlertPage}
            />
          </>
        )}
      </AdminSection>
    </div>
  );
}
