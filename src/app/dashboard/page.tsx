"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  Plus,
  Eye,
  Calendar,
  MoreVertical,
  Paperclip,
  Send,
  Activity,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle2,
} from "lucide-react";
import {
  getDashboardHomeWorkspace,
  type GetDashboardHomeWorkspaceData,
  upsertAppointment,
  upsertAssistantMessage,
} from "../../shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "../../shared/lib/dataconnect";
import {
  DEFAULT_DASHBOARD_THREAD,
  createClientId,
  formatShortTime,
  getActiveDoctorUid,
  nowIsoString,
} from "../../shared/lib/medassist-runtime";
import { ServiceDetailsModel, type ServiceRecord } from "./components/ServiceDetailsModel";

type DashboardPatientCard = {
  appointmentId: string;
  patientUid: string;
  displayName: string;
  email: string;
  patientCode: string | null;
  queueTime: string;
  appointmentType: string | null;
};

type DashboardMessage = {
  id: string;
  role: string;
  content: string;
  timestampLabel: string;
};

type DashboardAppointment = GetDashboardHomeWorkspaceData["appointments"][number];
const DASHBOARD_DUE_APPOINTMENT_IDS_KEY = "medassist_dashboard_due_appointment_ids";
const UPCOMING_CONSULTATION_WINDOW_MS = 24 * 60 * 60 * 1000;
const DUE_CONSULTATION_WINDOW_MS = 60 * 1000;

function getAppointmentTimestamp(appointment: DashboardAppointment) {
  return new Date(appointment.scheduledAt).getTime();
}

function isQueuedAppointment(status: string) {
  return !["completed", "cancelled", "canceled"].includes(status.toLowerCase());
}

function readDueAppointmentIds() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(DASHBOARD_DUE_APPOINTMENT_IDS_KEY) || "[]";
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is string => typeof item === "string" && Boolean(item.trim()));
  } catch {
    return [];
  }
}

function persistDueAppointmentIds(ids: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(DASHBOARD_DUE_APPOINTMENT_IDS_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage failures in private mode or restricted environments.
  }
}

function calculateAgeFromDob(dob?: string | null) {
  if (!dob) {
    return null;
  }

  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}

export default function DashboardPage() {
  const router = useRouter();
  const [workspace, setWorkspace] = useState<GetDashboardHomeWorkspaceData | null>(null);
  const [appointments, setAppointments] = useState<GetDashboardHomeWorkspaceData["appointments"]>([]);
  const [chatInput, setChatInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isServiceModelOpen, setIsServiceModelOpen] = useState(false);
  const [messages, setMessages] = useState<DashboardMessage[]>([]);
  const [activeAppointmentId, setActiveAppointmentId] = useState<string | null>(null);
  const [isCompletingAppointment, setIsCompletingAppointment] = useState(false);
  const [queueNotice, setQueueNotice] = useState<string | null>(null);
  const [dueAppointmentIds, setDueAppointmentIds] = useState<string[]>(() => readDueAppointmentIds());
  const [nowTick, setNowTick] = useState(() => Date.now());

  useEffect(() => {
    let isMounted = true;

    getDashboardHomeWorkspace(getMedAssistDataConnect(), {
      doctorUid: getActiveDoctorUid(),
    })
      .then((response) => {
        if (!isMounted) {
          return;
        }

        const sortedAppointments = response.data.appointments
          .slice()
          .sort((left, right) => getAppointmentTimestamp(left) - getAppointmentTimestamp(right));

        setWorkspace(response.data);
        setAppointments(sortedAppointments);

        setMessages(
          response.data.assistantMessages.map((message) => ({
            id: message.id,
            role: message.role,
            content: message.content,
            timestampLabel: message.timestampLabel,
          }))
        );
        setActiveAppointmentId(
          (current) => current ?? sortedAppointments.find((item) => isQueuedAppointment(item.status))?.id ?? null
        );
      })
      .catch((error) => {
        console.error("Lỗi khi tải dashboard workspace:", error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const timerId = window.setInterval(() => setNowTick(Date.now()), 30_000);
    return () => window.clearInterval(timerId);
  }, []);

  const doctorProfile = workspace?.doctorProfiles?.[0];
  const spotlight = workspace?.dashboardSpotlightCases?.[0] ?? null;
  const serviceRecords =
    workspace?.serviceRecords?.map<ServiceRecord>((record) => ({
      id: record.id,
      serviceName: record.serviceName,
      specialty: record.specialty,
      doctorName: record.doctorName,
      dateTimeLabel: record.dateTimeLabel,
      diagnosis: record.diagnosis,
      quantity: record.quantity,
      unitPrice: record.unitPrice,
      insuranceCoveragePercent: record.insuranceCoveragePercent,
    })) ?? [];

  const queuePatients = useMemo<DashboardPatientCard[]>(() => {
    const patients = workspace?.users?.filter((user) => user.role === "patient") ?? [];
    const nextAppointmentByPatient = (workspace?.appointments ?? [])
      .slice()
      .sort((left, right) => left.scheduledAt.localeCompare(right.scheduledAt))
      .reduce(
        (map, appointment) => {
          if (!map.has(appointment.patientUid)) {
            map.set(appointment.patientUid, appointment);
          }

          return map;
        },
        new Map<string, NonNullable<GetDashboardHomeWorkspaceData["appointments"]>[number]>()
      );

    return patients
      .filter((user) => {
        if (!searchTerm.trim()) {
          return true;
        }

        const normalized = searchTerm.toLowerCase();
        return (
          user.displayName.toLowerCase().includes(normalized) ||
          user.email.toLowerCase().includes(normalized) ||
          (user.userCode || "").toLowerCase().includes(normalized)
        );
      })
      .map((user) => {
        const nextAppointment = nextAppointmentByPatient.get(user.uid);

        return {
          appointmentId: nextAppointment?.id || user.uid,
          patientUid: user.uid,
          displayName: user.displayName || "Bệnh nhân mới",
          email: user.email,
          patientCode: user.userCode || null,
          queueTime: nextAppointment?.scheduledAt ? formatShortTime(nextAppointment.scheduledAt) : "--:--",
          appointmentType: nextAppointment?.specialty || nextAppointment?.appointmentType || null,
        };
      });
  }, [searchTerm, workspace?.appointments, workspace?.users]);

  const liveQueueAppointments = useMemo(
    () =>
      appointments
        .filter((appointment) => isQueuedAppointment(appointment.status))
        .slice()
        .sort((left, right) => getAppointmentTimestamp(left) - getAppointmentTimestamp(right)),
    [appointments]
  );

  useEffect(() => {
    if (!liveQueueAppointments.length) {
      setActiveAppointmentId(null);
      return;
    }

    if (!activeAppointmentId || !liveQueueAppointments.some((appointment) => appointment.id === activeAppointmentId)) {
      setActiveAppointmentId(liveQueueAppointments[0].id);
    }
  }, [activeAppointmentId, liveQueueAppointments]);

  const activeAppointmentSource = useMemo<DashboardAppointment | null>(() => {
    if (!liveQueueAppointments.length) {
      return null;
    }

    return liveQueueAppointments.find((appointment) => appointment.id === activeAppointmentId) ?? liveQueueAppointments[0];
  }, [activeAppointmentId, liveQueueAppointments]);

  const activePatientProfile = useMemo(() => {
    if (!activeAppointmentSource) {
      return null;
    }

    return workspace?.patientProfiles.find((profile) => profile.userUid === activeAppointmentSource.patientUid) ?? null;
  }, [activeAppointmentSource, workspace?.patientProfiles]);

  const activeDiagnosis = useMemo(() => {
    if (!activeAppointmentSource) {
      return null;
    }

    return (
      (workspace?.aiDiagnoses ?? [])
        .filter((item) => item.patientUid === activeAppointmentSource.patientUid)
        .slice()
        .sort((left, right) => (right.examDate || "").localeCompare(left.examDate || ""))[0] ?? null
    );
  }, [activeAppointmentSource, workspace?.aiDiagnoses]);

  const activeServiceRecords = useMemo<ServiceRecord[]>(() => {
    if (!activeAppointmentSource) {
      return [];
    }

    const patientName = activeAppointmentSource.patient.displayName.trim().toLowerCase();
    const patientCode = activeAppointmentSource.patient.userCode?.trim();

    return (workspace?.serviceRecords ?? [])
      .filter((record) => {
        const codeMatch = patientCode ? record.patientCode === patientCode : false;
        const nameMatch = record.patientName.trim().toLowerCase() === patientName;
        return codeMatch || nameMatch;
      })
      .slice()
      .sort((left, right) => left.displayOrder - right.displayOrder)
      .map((record) => ({
        id: record.id,
        serviceName: record.serviceName,
        specialty: record.specialty,
        doctorName: record.doctorName,
        dateTimeLabel: record.dateTimeLabel,
        diagnosis: record.diagnosis,
        quantity: record.quantity,
        unitPrice: record.unitPrice,
        insuranceCoveragePercent: record.insuranceCoveragePercent,
      }));
  }, [activeAppointmentSource, workspace?.serviceRecords]);

  const liveQueuePatients = useMemo<DashboardPatientCard[]>(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return liveQueueAppointments
      .filter((appointment) => {
        if (!normalizedSearch) {
          return true;
        }

        return (
          appointment.patient.displayName.toLowerCase().includes(normalizedSearch) ||
          appointment.patient.email.toLowerCase().includes(normalizedSearch) ||
          (appointment.patient.userCode || "").toLowerCase().includes(normalizedSearch)
        );
      })
      .map((appointment) => ({
        appointmentId: appointment.id,
        patientUid: appointment.patientUid,
        displayName: appointment.patient.displayName || "Bệnh nhân mới",
        email: appointment.patient.email,
        patientCode: appointment.patient.userCode || null,
        queueTime: formatShortTime(appointment.scheduledAt),
        appointmentType: appointment.specialty || appointment.appointmentType || null,
      }));
  }, [liveQueueAppointments, searchTerm]);

  const activePatientName = activeAppointmentSource?.patient.displayName || "Chưa có bệnh nhân đang khám";
  const activePatientCode = activeAppointmentSource?.patient.userCode || "Đang cập nhật";
  const activePatientDob = activePatientProfile?.dob || null;
  const activePatientAge = calculateAgeFromDob(activePatientDob);
  const activePatientDemographic = activePatientDob
    ? `${activePatientDob} (${activePatientAge ?? "--"} tuổi)`
    : "Đang chờ dữ liệu từ Data Connect";
  const activePatientGender = activePatientProfile?.gender || "N/A";
  const activePatientSymptoms =
    activeAppointmentSource?.symptoms || "Chưa có mô tả triệu chứng từ Data Connect.";
  const activeMedicalSummary = [
    activePatientProfile?.insuranceNumber ? `BHYT: ${activePatientProfile.insuranceNumber}` : null,
    activePatientProfile?.bloodType ? `Nhóm máu: ${activePatientProfile.bloodType}` : null,
    activePatientProfile?.allergies ? `Dị ứng: ${activePatientProfile.allergies}` : null,
    activeDiagnosis?.stageLabel ? `AI: ${activeDiagnosis.stageLabel}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const primaryService = activeServiceRecords[0] ?? null;
  const secondaryService = activeServiceRecords[1] ?? null;

  const highRiskCount = useMemo(
    () => (workspace?.aiDiagnoses ?? []).filter((item) => item.riskLevel?.toLowerCase() === "high").length,
    [workspace?.aiDiagnoses]
  );
  const upcomingConsultationAppointments = useMemo(
    () =>
      liveQueueAppointments.filter((appointment) => {
        const appointmentTime = getAppointmentTimestamp(appointment);
        return appointmentTime >= nowTick && appointmentTime - nowTick <= UPCOMING_CONSULTATION_WINDOW_MS;
      }),
    [liveQueueAppointments, nowTick]
  );
  const upcomingConsultations = upcomingConsultationAppointments.length;
  const nextUpcomingConsultation = upcomingConsultationAppointments[0] ?? null;

  const todaySchedule = useMemo(() => {
    return (workspace?.scheduleEvents ?? [])
      .filter((event) => !event.isDeleted)
      .slice(0, 2)
      .map((event) => ({
        id: event.id,
        timeLabel: event.timeString || `${event.startTime} - ${event.endTime}`,
        title: event.title,
        subtitle:
          event.patient?.displayName ||
          event.patientNameOverride ||
          event.department ||
          "Cập nhật từ lịch",
        badge: event.priority || event.status,
      }));
  }, [workspace?.scheduleEvents]);

  const registerDueAppointmentId = (appointmentId: string) => {
    setDueAppointmentIds((current) => {
      if (current.includes(appointmentId)) {
        return current;
      }

      const next = [...current, appointmentId];
      persistDueAppointmentIds(next);
      return next;
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const dueAppointment = liveQueueAppointments.find((appointment) => {
      if (dueAppointmentIds.includes(appointment.id)) {
        return false;
      }

      const appointmentTime = getAppointmentTimestamp(appointment);
      return nowTick >= appointmentTime && nowTick - appointmentTime < DUE_CONSULTATION_WINDOW_MS;
    });

    if (!dueAppointment) {
      return;
    }

    const dueMessage = `Đến giờ tư vấn với ${dueAppointment.patient.displayName} (${formatShortTime(dueAppointment.scheduledAt)}).`;
    setQueueNotice(dueMessage);
    registerDueAppointmentId(dueAppointment.id);

    if ("Notification" in window) {
      const openConsultation = () => {
        const targetUrl = `/dashboard/consultation?appointmentId=${encodeURIComponent(dueAppointment.id)}`;
        window.location.href = targetUrl;
      };
      const showNotification = () => {
        try {
          const notification = new window.Notification("MedAssist - Ca tư vấn đến giờ", {
            body: dueMessage,
            tag: `dashboard-due-${dueAppointment.id}`,
          });
          notification.onclick = openConsultation;
        } catch {
          // Ignore browser notification errors and keep in-app notice.
        }
      };

      if (window.Notification.permission === "granted") {
        showNotification();
      } else if (window.Notification.permission === "default") {
        void window.Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            showNotification();
          }
        });
      }
    }
  }, [dueAppointmentIds, liveQueueAppointments, nowTick]);

  const handleOpenUpcomingConsultations = () => {
    if (!nextUpcomingConsultation) {
      router.push("/dashboard/consultation");
      return;
    }

    router.push(`/dashboard/consultation?appointmentId=${encodeURIComponent(nextUpcomingConsultation.id)}`);
  };

  const handleBellClick = () => {
    alert(
      `Hôm nay có ${highRiskCount} ca cảnh báo và ${upcomingConsultations} ca tư vấn sắp tới đã được đồng bộ từ Data Connect.`
    );
  };

  const handleAssistantSearch = () => {
    setChatInput("Tóm tắt nhanh các ca ưu tiên trong hôm nay");
  };

  const handleAssistantMenu = () => {
    alert("Hội thoại trợ lý AI, thông điệp và chủ đề tương tác đã được đồng bộ trong Data Connect.");
  };

  const handleAssistantAttachment = () => {
    router.push("/dashboard/consultation");
  };

  const handleSendChatLegacy = async () => {
    if (!chatInput.trim()) {
      return;
    }

    const userMessage: DashboardMessage = {
      id: createClientId("assistant-user"),
      role: "user",
      content: chatInput.trim(),
      timestampLabel: "Đã gửi - Vừa xong",
    };
    const assistantMessage: DashboardMessage = {
      id: createClientId("assistant-reply"),
      role: "assistant",
      content: `Tóm tắt nhanh cho ${
        spotlight?.patientName || "bệnh nhân hiện tại"
      }: ${spotlight?.symptoms || "Chưa có triệu chứng chi tiết."} Ngoài ra hiện có ${serviceRecords.length} dịch vụ liên quan và ${upcomingConsultations} cuộc hẹn đang chờ xử lý.`,
      timestampLabel: "MedAssist AI - Vừa xong",
    };

    const nextMessages = [...messages, userMessage, assistantMessage];
    setMessages(nextMessages);
    setChatInput("");

    try {
      await Promise.all(
        [userMessage, assistantMessage].map((message, index) =>
          upsertAssistantMessage(getMedAssistDataConnect(), {
            id: message.id,
            threadKey: DEFAULT_DASHBOARD_THREAD,
            role: message.role,
            content: message.content,
            timestampLabel: message.timestampLabel,
            createdAt: nowIsoString(),
            displayOrder: messages.length + index + 1,
          })
        )
      );
    } catch (error) {
      console.error("Không thể lưu hội thoại trợ lý AI:", error);
    }
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) {
      return;
    }

    const prompt = chatInput.trim();
    const userMessage: DashboardMessage = {
      id: createClientId("assistant-user"),
      role: "user",
      content: prompt,
      timestampLabel: "Đã gửi - Vừa xong",
    };
    const assistantMessage: DashboardMessage = {
      id: createClientId("assistant-reply"),
      role: "assistant",
      content: "MedAssist AI đang phân tích yêu cầu của bạn...",
      timestampLabel: "MedAssist AI - Đang trả lời",
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setChatInput("");

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
          context: {
            activePatientName:
              activeAppointmentSource?.patient.displayName || spotlight?.patientName || null,
            activeSymptoms: activeAppointmentSource?.symptoms || spotlight?.symptoms || null,
            activeDiagnosis: activeDiagnosis?.stageLabel || null,
            pendingAppointments: upcomingConsultations,
            serviceCount: serviceRecords.length,
          },
        }),
      });

      const payload = await response.json().catch(() => ({}));
      const finalAssistantMessage: DashboardMessage = {
        ...assistantMessage,
        content: response.ok
          ? payload.reply || "MedAssist AI chưa tạo được phản hồi phù hợp."
          : payload.error === "Missing GEMINI_API_KEY"
            ? "Chưa cấu hình `GEMINI_API_KEY` cho hệ thống AI. Hãy thêm key vào môi trường server rồi khởi động lại ứng dụng."
            : payload.detail
              ? `MedAssist AI tạm gián đoạn: ${payload.detail}`
              : "MedAssist AI đang tạm gián đoạn. Vui lòng thử lại sau.",
        timestampLabel: "MedAssist AI - Vừa xong",
      };

      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessage.id ? finalAssistantMessage : message
        )
      );

      await Promise.all(
        [userMessage, finalAssistantMessage].map((message, index) =>
          upsertAssistantMessage(getMedAssistDataConnect(), {
            id: message.id,
            threadKey: DEFAULT_DASHBOARD_THREAD,
            role: message.role,
            content: message.content,
            timestampLabel: message.timestampLabel,
            createdAt: nowIsoString(),
            displayOrder: messages.length + index + 1,
          })
        )
      );
    } catch (error) {
      console.error("Không thể gửi hoặc lưu hội thoại trợ lý AI:", error);
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessage.id
            ? {
                ...message,
                content: "MedAssist AI đang tạm gián đoạn. Vui lòng thử lại sau.",
                timestampLabel: "MedAssist AI - Lỗi",
              }
            : message
        )
      );
    }
  };
  const handleCompleteAppointment = async () => {
    if (!activeAppointmentSource || isCompletingAppointment) {
      return;
    }

    const currentQueueIndex = liveQueueAppointments.findIndex(
      (appointment) => appointment.id === activeAppointmentSource.id
    );
    const nextAppointment =
      liveQueueAppointments[currentQueueIndex + 1] ||
      liveQueueAppointments.find((appointment) => appointment.id !== activeAppointmentSource.id) ||
      null;

    setIsCompletingAppointment(true);
    setQueueNotice(null);

    try {
      await upsertAppointment(getMedAssistDataConnect(), {
        id: activeAppointmentSource.id,
        patientUid: activeAppointmentSource.patientUid,
        doctorUid: activeAppointmentSource.doctorUid ?? getActiveDoctorUid(),
        doctorName: activeAppointmentSource.doctorName,
        scheduledAt: activeAppointmentSource.scheduledAt,
        endAt: activeAppointmentSource.endAt ?? null,
        status: "COMPLETED",
        meetingLink: activeAppointmentSource.meetingLink ?? null,
        symptoms: activeAppointmentSource.symptoms ?? null,
        specialty: activeAppointmentSource.specialty ?? null,
        appointmentType: activeAppointmentSource.appointmentType ?? null,
        queueLabel: "Đã khám xong",
        currentDoctorNote: activeAppointmentSource.currentDoctorNote ?? null,
        countdownLabel: activeAppointmentSource.countdownLabel ?? null,
      });

      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === activeAppointmentSource.id
            ? { ...appointment, status: "COMPLETED", queueLabel: "Đã khám xong" }
            : appointment
        )
      );
      setActiveAppointmentId(nextAppointment?.id ?? null);
      setQueueNotice(
        nextAppointment
          ? `Đã hoàn tất ca khám của ${activeAppointmentSource.patient.displayName}. Đang chuyển sang ${nextAppointment.patient.displayName}.`
          : `Đã hoàn tất ca khám của ${activeAppointmentSource.patient.displayName}. Hiện không còn bệnh nhân nào trong hàng chờ.`
      );
    } catch (error) {
      console.error("Không thể cập nhật trạng thái khám:", error);
      alert("Không thể đánh dấu khám xong lúc này.");
    } finally {
      setIsCompletingAppointment(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2000"
            alt="Mountain Background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            {doctorProfile?.avatarUrl ? (
              <img
                src={doctorProfile.avatarUrl}
                alt={doctorProfile.fullName || "Doctor"}
                className="h-16 w-16 rounded-2xl border-2 border-white/20 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/20 bg-white/10 text-lg font-bold text-white">
                BS
              </div>
            )}
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-slate-300">Chào buổi sáng</p>
              <h1 className="text-2xl font-bold">{doctorProfile?.fullName || "Bác sĩ MedAssist"}</h1>
            </div>
          </div>

          <div className="flex w-full max-w-2xl flex-1 items-center gap-4">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Tìm mã bệnh nhân, chẩn đoán hoặc phác đồ nghiên cứu..."
                className="w-full rounded-full border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-white placeholder-slate-400 backdrop-blur-md transition-all focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={handleBellClick}
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full border-2 border-slate-900 bg-red-500"></span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/reports")}
              className="flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-600"
            >
              <Plus className="h-5 w-5" />
              Báo cáo mới
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-8">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-xl font-bold">Ưu tiên hôm nay</h2>
            <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                <Eye className="h-4 w-4" />
              </div>
              <span className="font-medium">{highRiskCount} Phân tích võng mạc</span>
            </div>
            <button
              type="button"
              onClick={handleOpenUpcomingConsultations}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Calendar className="h-4 w-4" />
              </div>
              <span className="font-medium">{upcomingConsultations} Ca tư vấn sắp tới</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 right-8 z-10 hidden text-right md:block">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Hệ thống MedAssist v3.0</p>
          <div className="flex items-center justify-end gap-2">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
            <span className="text-sm font-medium text-emerald-400">Ổn định</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-5">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-800">Danh sách chờ</h3>
                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                  {isLoading ? "..." : liveQueueAppointments.length} bệnh nhân
                </span>
              </div>
              <button
                type="button"
                onClick={() => router.push("/dashboard/patient")}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Xem tất cả
              </button>
            </div>

            {queueNotice ? (
              <div className="mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {queueNotice}
              </div>
            ) : null}

            <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-2">
              {isLoading ? (
                <div className="flex items-center gap-2 p-4 text-sm font-medium text-slate-500 animate-pulse">
                  <Activity className="h-4 w-4" /> Đang tải dữ liệu từ máy chủ...
                </div>
              ) : liveQueuePatients.length === 0 ? (
                <div className="p-4 text-sm font-medium text-slate-500">Chưa có bệnh nhân nào trong hệ thống.</div>
              ) : (
                liveQueuePatients.map((patient) => {
                  const isFirst = patient.appointmentId === activeAppointmentId;
                  return (
                    <button
                      type="button"
                      key={patient.appointmentId}
                      onClick={() => setActiveAppointmentId(patient.appointmentId)}
                      className={`relative min-w-[240px] cursor-pointer overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-colors ${
                        isFirst ? "border-2 border-blue-500" : "border border-slate-200 hover:border-blue-300"
                      }`}
                    >
                      {isFirst ? <div className="absolute left-0 top-0 h-full w-1 bg-blue-500"></div> : null}

                      <div className="mb-3 flex items-start justify-between">
                        <span
                          className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            isFirst ? "bg-emerald-100 text-emerald-700" : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {isFirst ? "Đang khám" : "Tiếp theo"}
                        </span>
                        <span className="text-xs font-medium text-slate-500">{patient.queueTime}</span>
                      </div>

                      <h4 className="mb-1 truncate text-lg font-bold text-slate-900">{patient.displayName}</h4>
                      <p className="truncate text-xs text-slate-500">{patient.email}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-400">
                        {patient.patientCode || patient.appointmentType || "Bệnh nhân"}
                      </p>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Đang thực hiện thăm khám</span>
            </div>
            <div className="mb-8 flex items-center gap-5">
              <button
                type="button"
                onClick={() => {
                  if (activeAppointmentSource?.patientUid) {
                    router.push(`/dashboard/patient/${activeAppointmentSource.patientUid}`);
                  }
                }}
                className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 text-slate-400"
              >
                {activeAppointmentSource?.patient.photoURL ? (
                  <img
                    src={activeAppointmentSource.patient.photoURL}
                    alt={activePatientName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold">BN</span>
                )}
              </button>
              <div>
                <h2 className="mb-2 text-2xl font-bold text-slate-900">
                  {activePatientName}
                </h2>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span>{activePatientDemographic}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                  <span>{activePatientGender}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                  <span className="rounded bg-blue-50 px-2 py-0.5 font-medium text-blue-600">
                    Mã: {activePatientCode}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-bold text-slate-900">Triệu chứng hiện tại</h3>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                  {activePatientSymptoms}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-bold text-slate-900">Hồ sơ khám ngoại viện</h3>
                <div className="flex h-full min-h-[100px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-4 text-center">
                  <FileText className="mb-2 h-6 w-6 text-slate-400" />
                  <p className="mb-3 text-xs text-slate-500">
                    {activeMedicalSummary || "Chưa có bản ghi ngoại viện được đồng bộ."}
                  </p>
                  <Link
                    href="/dashboard/record-digitization"
                    className="rounded-full bg-slate-800 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-700"
                  >
                    + Số hóa hồ sơ
                  </Link>
                </div>
              </div>
            </div>

            <div>
                <h3 className="mb-3 text-sm font-bold text-slate-900">Dịch vụ</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {primaryService?.serviceName || "Chưa có dịch vụ"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {primaryService ? `${primaryService.specialty} · ${primaryService.doctorName}` : "Đồng bộ từ Data Connect"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-emerald-900">
                      {secondaryService?.serviceName || "Chưa có dịch vụ bổ sung"}
                    </p>
                    <p className="text-xs text-emerald-700">
                      {secondaryService ? `${secondaryService.specialty} · ${secondaryService.doctorName}` : "Thêm dữ liệu từ Data Connect"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                disabled={!activeAppointmentSource || isCompletingAppointment}
                onClick={handleCompleteAppointment}
                className={`flex items-center gap-2 rounded-xl px-6 py-3 font-medium transition-colors ${
                  !activeAppointmentSource || isCompletingAppointment
                    ? "cursor-not-allowed bg-slate-200 text-slate-400"
                    : "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
                }`}
              >
                <CheckCircle2 className="h-5 w-5" />
                {isCompletingAppointment ? "Đang cập nhật..." : "Khám xong"}
              </button>
              <button
                type="button"
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
                onClick={() => setIsServiceModelOpen(true)}
              >
                Xem chi tiết
              </button>
            </div>

            <ServiceDetailsModel
              isOpen={isServiceModelOpen}
              onClose={() => setIsServiceModelOpen(false)}
              patientName={activePatientName}
              serviceRecords={activeServiceRecords}
            />
          </div>
        </div>

        <div className="flex h-auto flex-col xl:col-span-4 xl:h-[calc(100vh-2rem)]">
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md">
                    <Activity className="h-5 w-5" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"></span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Trợ lý AI MedAssist</h3>
                  <p className="text-xs text-slate-500">Gemini hỗ trợ tư vấn nhanh cho bác sĩ</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAssistantSearch}
                  className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleAssistantMenu}
                  className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto bg-gradient-to-b from-slate-50 to-white p-5">
              <div className="flex justify-center">
                <span className="rounded-full border border-slate-100 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-400 shadow-sm">
                  Hôm nay
                </span>
              </div>

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.role === "assistant" ? "max-w-[86%] items-start" : "ml-auto max-w-[82%] items-end self-end"
                  }`}
                >
                  <div
                    className={
                      message.role === "assistant"
                        ? "rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3.5 text-sm leading-7 text-slate-700 shadow-sm"
                        : "rounded-2xl rounded-tr-sm bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-3.5 text-sm leading-7 text-white shadow-md shadow-blue-600/15"
                    }
                  >
                    {message.content}
                  </div>
                  <span className={`mt-1 text-[10px] text-slate-400 ${message.role === "assistant" ? "ml-1" : "mr-1"}`}>
                    {message.timestampLabel}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 bg-white p-4">
              <div className="group flex items-end gap-2 rounded-[26px] border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/70 p-2.5 shadow-[0_12px_28px_-22px_rgba(15,23,42,0.65)] transition-all duration-200 focus-within:-translate-y-0.5 focus-within:border-blue-400/80 focus-within:shadow-[0_18px_36px_-24px_rgba(37,99,235,0.55)] focus-within:ring-4 focus-within:ring-blue-500/10">
                <button
                  type="button"
                  onClick={handleAssistantAttachment}
                  className="shrink-0 rounded-2xl border border-slate-200/80 bg-white p-2.5 text-slate-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:text-blue-600 hover:shadow-md"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <textarea
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Nhập câu hỏi hoặc yêu cầu phân tích dữ liệu lâm sàng..."
                  onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void handleSendChat(); } }}
                  className="min-h-[46px] max-h-36 flex-1 resize-none border-0 bg-transparent px-1 py-2 text-[15px] leading-6 text-slate-800 placeholder:text-slate-400 focus:border-0 focus:outline-none focus:ring-0"
                  rows={1}
                />
                <button
                  type="button"
                  onClick={handleSendChat}
                  disabled={!chatInput.trim()}
                  className={`shrink-0 rounded-2xl p-3.5 transition-all duration-200 ${
                    chatInput.trim()
                      ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 hover:from-blue-700 hover:to-sky-600 active:translate-y-0"
                      : "cursor-not-allowed bg-slate-200 text-slate-400"
                  }`}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 xl:col-span-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Lịch của tôi</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/schedule")}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/schedule")}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="mb-4 text-center font-bold text-slate-800">
                {new Date().toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}
              </h4>
              <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs">
                <span className="font-medium text-slate-400">T2</span>
                <span className="font-medium text-slate-400">T3</span>
                <span className="font-medium text-slate-400">T4</span>
                <span className="font-medium text-slate-400">T5</span>
                <span className="font-medium text-slate-400">T6</span>
                <span className="font-medium text-slate-400">T7</span>
                <span className="font-medium text-slate-400">CN</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {Array.from({ length: 7 }).map((_, index) => {
                  const date = new Date();
                  date.setDate(date.getDate() - 1 + index);
                  const isToday = index === 1;

                  return (
                    <span
                      key={date.toISOString()}
                      className={`py-1.5 ${
                        isToday
                          ? "rounded-full bg-blue-600 font-bold text-white shadow-md shadow-blue-600/30"
                          : "font-medium text-slate-700"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Lịch trình hôm nay</h4>
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              <div className="relative space-y-6 before:absolute before:inset-0 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent before:h-full before:w-0.5 before:ml-2 md:before:mx-auto md:before:translate-x-0">
                {(todaySchedule.length > 0
                  ? todaySchedule
                  : [
                      {
                        id: "schedule-empty",
                        timeLabel: "--:--",
                        title: "Chưa có lịch hôm nay",
                        subtitle: "Hãy tạo lịch mới trong Data Connect",
                        badge: "",
                      },
                    ]
                ).map((item, index) => (
                  <div key={item.id} className="relative flex items-start gap-4">
                    <div
                      className={`absolute left-0 mt-1 h-4 w-4 rounded-full border-4 bg-white ${
                        index === 0 ? "border-blue-500" : "border-slate-300"
                      }`}
                    ></div>
                    <div className="ml-8">
                      <p className={`mb-1 text-xs font-bold ${index === 0 ? "text-blue-600" : "text-slate-500"}`}>
                        {item.timeLabel}
                      </p>
                      <h5 className="mb-1 text-sm font-bold text-slate-900">{item.title}</h5>
                      <p className="mb-2 text-xs text-slate-500">{item.subtitle}</p>
                      {item.badge ? (
                        <span className="inline-block rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600">
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => router.push("/dashboard/schedule")}
                className="mt-8 w-full rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                Mở lịch trình đầy đủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

