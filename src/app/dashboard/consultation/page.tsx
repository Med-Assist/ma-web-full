"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ActiveAppointment, {
  type ActiveAppointmentData,
  type AppointmentAttachmentItem,
} from "@/features/consultation/components/ActiveAppointment";
import CreateConsultationRoomModal, {
  type ConsultationRoomCreateDraft,
  type ConsultationRoomCreateMode,
} from "@/features/consultation/components/CreateConsultationRoomModal";
import DailyTimeline, { type ConsultationTimelineItem } from "@/features/consultation/components/DailyTimeline";
import SelectedConsultationRoom, {
  type SelectedConsultationRoomData,
} from "@/features/consultation/components/SelectedConsultationRoom";
import UpcomingAppointments, { type UpcomingAppointmentItem } from "@/features/consultation/components/UpcomingAppointments";
import type { GetConsultationWorkspaceData } from "@/shared/lib/generated-fdc";
import {
  createAppointment,
  getConsultationWorkspace,
  getPatientsByDoctor,
  upsertAppointment,
  upsertAppointmentAttachment,
  upsertConsultationRoom,
  type GetPatientsByDoctorData,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import {
  createClientId,
  formatDateTimeLabel,
  formatShortTime,
  getActiveDoctorUid,
  readFileAsDataUrl,
  safeClipboardCopy,
} from "@/shared/lib/medassist-runtime";

type ConsultationAppointment = GetConsultationWorkspaceData["appointments"][number];
type ConsultationRoom = GetConsultationWorkspaceData["consultationRooms"][number];
type PatientProfileRow = GetPatientsByDoctorData["patientProfiles"][number];

const GOOGLE_MEET_LAUNCH_URL = "https://meet.google.com/new";
const CONSULTATION_CREATED_ROOM_IDS_KEY = "medassist_consultation_created_room_ids";
const CONSULTATION_DUE_APPOINTMENT_IDS_KEY = "medassist_consultation_due_appointment_ids";
const ROOM_MEETING_LINK_PREFIX = "__meet_link__:";

function readCreatedRoomIds() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CONSULTATION_CREATED_ROOM_IDS_KEY) || "[]";
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is string => typeof item === "string" && Boolean(item.trim()));
  } catch {
    return [];
  }
}

function persistCreatedRoomIds(ids: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CONSULTATION_CREATED_ROOM_IDS_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage failures in restricted/private environments.
  }
}

function readDueAppointmentIds() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CONSULTATION_DUE_APPOINTMENT_IDS_KEY) || "[]";
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
    window.localStorage.setItem(CONSULTATION_DUE_APPOINTMENT_IDS_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage failures in restricted/private environments.
  }
}

function isPendingAppointmentStatus(status: string) {
  const normalizedStatus = status.toLowerCase();
  return normalizedStatus !== "completed" && normalizedStatus !== "cancelled" && normalizedStatus !== "canceled";
}

function isGoogleMeetRoom(room: ConsultationRoom) {
  const source = `${room.title} ${room.badge} ${room.actionLabel || ""}`.toLowerCase();
  return source.includes("google meet") || source.includes("meet");
}

function isLikelyMockRoom(room: ConsultationRoom) {
  const source = `${room.id} ${room.title} ${room.badge} ${room.membersLabel} ${room.actionLabel || ""}`.toLowerCase();
  return (
    source.includes("mock")
    || source.includes("demo")
    || source.includes("sample")
    || source.includes("hardcode")
    || source.includes("seed")
    || room.id.startsWith("room-")
    || room.id.startsWith("consult-room-")
    || room.id.startsWith("mock-")
  );
}

function isRoomOwnedByDoctor(roomId: string, doctorUid: string) {
  return roomId.startsWith(`consultation-room-${doctorUid}-`);
}

function parseRoomDescription(rawDescription: string | null | undefined) {
  const raw = (rawDescription || "").trim();
  if (!raw) {
    return {
      description: "Phòng tư vấn chưa có mô tả.",
      meetingLink: null as string | null,
    };
  }

  const lines = raw.split(/\r?\n/);
  let meetingLink: string | null = null;
  const contentLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.toLowerCase().startsWith(ROOM_MEETING_LINK_PREFIX)) {
      const extracted = trimmed.slice(ROOM_MEETING_LINK_PREFIX.length).trim();
      if (extracted) {
        meetingLink = extracted;
      }
      continue;
    }

    contentLines.push(line);
  }

  if (!meetingLink) {
    const matchedLink = raw.match(/https?:\/\/[^\s]+/i);
    if (matchedLink) {
      meetingLink = matchedLink[0];
    }
  }

  return {
    description: contentLines.join("\n").trim() || "Phòng tư vấn chưa có mô tả.",
    meetingLink,
  };
}

function buildRoomDescription(description: string, meetingLink: string) {
  const safeDescription = description.trim();
  const safeLink = meetingLink.trim();
  if (!safeLink) {
    return safeDescription;
  }

  return `${safeDescription}\n${ROOM_MEETING_LINK_PREFIX}${safeLink}`;
}

function formatUpcomingDayLabel(isoString: string) {
  return new Date(isoString).toLocaleDateString("vi-VN", { weekday: "short" }).replace(".", "").toUpperCase();
}

function formatUpcomingDateLabel(isoString: string) {
  return new Date(isoString).toLocaleDateString("vi-VN", { day: "2-digit" });
}

function createTimelineDateLabel() {
  return new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function createCurrentTimeLabel() {
  return new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toLocalDateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildDateTimeFromInputs(date: string, time: string) {
  return new Date(`${date}T${time}:00`);
}

function addMinutes(baseDate: Date, minutes: number) {
  return new Date(baseDate.getTime() + minutes * 60 * 1000);
}

function formatRoomDisplayDate(date: Date) {
  return date.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ConsultationPage() {
  const activeDoctorUid = getActiveDoctorUid();
  const router = useRouter();
  const pathname = usePathname();
  const [patientProfiles, setPatientProfiles] = useState<PatientProfileRow[]>([]);
  const [appointments, setAppointments] = useState<GetConsultationWorkspaceData["appointments"]>([]);
  const [appointmentAttachments, setAppointmentAttachments] = useState<GetConsultationWorkspaceData["appointmentAttachments"]>([]);
  const [consultationRooms, setConsultationRooms] = useState<GetConsultationWorkspaceData["consultationRooms"]>([]);
  const [createdRoomIds, setCreatedRoomIds] = useState<string[]>(() => readCreatedRoomIds());
  const [dueAppointmentIds, setDueAppointmentIds] = useState<string[]>(() => readDueAppointmentIds());
  const [roomIdFromUrl, setRoomIdFromUrl] = useState<string | null>(null);
  const [appointmentIdFromUrl, setAppointmentIdFromUrl] = useState<string | null>(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);
  const [dueNotice, setDueNotice] = useState<string | null>(null);
  const [createRoomDraft, setCreateRoomDraft] = useState<ConsultationRoomCreateDraft>({
    mode: "standard",
    patientUid: "",
    scheduledDate: toLocalDateInputValue(),
    startTime: "08:00",
    title: "",
    description: "",
    membersLabel: "",
    badge: "",
    timeLabel: "",
    meetingLink: "",
    openMeetingAfterCreate: false,
  });

  const updateRouteState = useCallback(
    (next: { roomId?: string | null; appointmentId?: string | null }) => {
      const currentQuery = typeof window !== "undefined" ? window.location.search : "";
      const params = new URLSearchParams(currentQuery);

      if (next.roomId) {
        params.set("roomId", next.roomId);
      } else {
        params.delete("roomId");
      }

      if (next.appointmentId) {
        params.set("appointmentId", next.appointmentId);
      } else {
        params.delete("appointmentId");
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });

      setRoomIdFromUrl(next.roomId || null);
      setAppointmentIdFromUrl(next.appointmentId || null);
    },
    [pathname, router]
  );

  const buildInternalRoomLink = useCallback(
    (roomId: string) => {
      if (typeof window === "undefined") {
        return `${pathname}?roomId=${encodeURIComponent(roomId)}`;
      }

      const target = new URL(pathname, window.location.origin);
      target.searchParams.set("roomId", roomId);
      return target.toString();
    },
    [pathname]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    setRoomIdFromUrl(params.get("roomId"));
    setAppointmentIdFromUrl(params.get("appointmentId"));
  }, []);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getConsultationWorkspace(getMedAssistDataConnect(), {
        doctorUid: getActiveDoctorUid(),
      }),
      getPatientsByDoctor(getMedAssistDataConnect(), {
        doctorUid: getActiveDoctorUid(),
      }),
    ])
      .then(([consultationResponse, patientsResponse]) => {
        if (!isMounted) {
          return;
        }

        const currentDoctorToken = `consultation-room-${activeDoctorUid}-`;
        const mockRooms = consultationResponse.data.consultationRooms.filter((room) => {
          const isForeignDoctorRoom =
            room.id.startsWith("consultation-room-")
            && !room.id.startsWith(currentDoctorToken)
            && !createdRoomIds.includes(room.id);
          return room.status !== "deleted" && (isLikelyMockRoom(room) || isForeignDoctorRoom);
        });

        if (mockRooms.length > 0) {
          void Promise.all(
            mockRooms.map((room) =>
              upsertConsultationRoom(getMedAssistDataConnect(), {
                id: room.id,
                displayDate: room.displayDate,
                status: "deleted",
                badge: room.badge,
                timeLabel: room.timeLabel,
                title: room.title,
                description: room.description,
                membersLabel: room.membersLabel,
                actionLabel: room.actionLabel || null,
                displayOrder: room.displayOrder,
              })
            )
          ).catch((error) => {
            console.error("Không thể xóa phòng mock consultation:", error);
          });
        }

        const sortedAppointments = consultationResponse.data.appointments
          .slice()
          .sort((left, right) => new Date(left.scheduledAt).getTime() - new Date(right.scheduledAt).getTime());

        const visibleRooms = consultationResponse.data.consultationRooms
          .filter((room) => room.status !== "deleted")
          .filter((room) => !mockRooms.some((mockRoom) => mockRoom.id === room.id))
          .slice()
          .sort((left, right) => left.displayOrder - right.displayOrder);

        setPatientProfiles(patientsResponse.data.patientProfiles);
        setAppointments(sortedAppointments);
        setAppointmentAttachments(
          consultationResponse.data.appointmentAttachments.slice().sort((left, right) => left.displayOrder - right.displayOrder)
        );
        setConsultationRooms(visibleRooms);
        setSelectedAppointmentId((current) => current ?? sortedAppointments[0]?.id ?? null);
        setSelectedRoomId((current) => {
          if (current && visibleRooms.some((room) => room.id === current)) {
            return current;
          }

          return null;
        });
      })
      .catch((error) => {
        console.error("Không thể tải dữ liệu consultation workspace:", error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [activeDoctorUid, createdRoomIds]);

  useEffect(() => {
    if (appointmentIdFromUrl && appointments.some((appointment) => appointment.id === appointmentIdFromUrl)) {
      setSelectedAppointmentId(appointmentIdFromUrl);
    }
  }, [appointmentIdFromUrl, appointments]);

  useEffect(() => {
    if (roomIdFromUrl && consultationRooms.some((room) => room.id === roomIdFromUrl)) {
      setSelectedRoomId(roomIdFromUrl);
    }
  }, [consultationRooms, roomIdFromUrl]);

  useEffect(() => {
    if (!consultationRooms.length) {
      setSelectedRoomId(null);
      return;
    }

    setSelectedRoomId((current) => (current && consultationRooms.some((room) => room.id === current) ? current : null));
  }, [consultationRooms]);

  const activeAppointmentSource = useMemo<ConsultationAppointment | null>(() => {
    if (!appointments.length) {
      return null;
    }

    return appointments.find((appointment) => appointment.id === selectedAppointmentId) ?? appointments[0];
  }, [appointments, selectedAppointmentId]);

  const activeAppointment = useMemo<ActiveAppointmentData | null>(() => {
    if (!activeAppointmentSource) {
      return null;
    }

    return {
      id: activeAppointmentSource.id,
      patientName: activeAppointmentSource.patient.displayName,
      specialty: activeAppointmentSource.specialty || activeAppointmentSource.appointmentType || "Tư vấn trực tuyến",
      timeLabel: formatDateTimeLabel(activeAppointmentSource.scheduledAt),
      meetingLink: activeAppointmentSource.meetingLink || null,
      doctorNote: activeAppointmentSource.currentDoctorNote || null,
      countdownLabel: activeAppointmentSource.countdownLabel || null,
      photoURL: activeAppointmentSource.patient.photoURL || null,
    };
  }, [activeAppointmentSource]);

  const patientOptions = useMemo(
    () =>
      patientProfiles
        .map((profile) => ({
          uid: profile.userUid,
          label: `${profile.user.displayName}${profile.user.userCode ? ` • ${profile.user.userCode}` : ""}`,
          patient: profile.user,
        }))
        .sort((left, right) => left.label.localeCompare(right.label, "vi", { sensitivity: "base" })),
    [patientProfiles]
  );

  const attachments = useMemo<AppointmentAttachmentItem[]>(() => {
    if (!activeAppointmentSource) {
      return [];
    }

    return appointmentAttachments
      .filter((item) => item.appointmentId === activeAppointmentSource.id)
      .map((item) => ({
        id: item.id,
        fileName: item.fileName,
        fileType: item.fileType,
        fileUrl: item.fileUrl || null,
      }));
  }, [activeAppointmentSource, appointmentAttachments]);

  const upcomingAppointments = useMemo<UpcomingAppointmentItem[]>(() => {
    const now = Date.now();

    return appointments
      .filter((appointment) => appointment.id !== activeAppointmentSource?.id)
      .filter((appointment) => isPendingAppointmentStatus(appointment.status))
      .filter((appointment) => new Date(appointment.scheduledAt).getTime() >= now)
      .slice()
      .sort((left, right) => new Date(left.scheduledAt).getTime() - new Date(right.scheduledAt).getTime())
      .map((appointment) => ({
        id: appointment.id,
        day: formatUpcomingDayLabel(appointment.scheduledAt),
        date: formatUpcomingDateLabel(appointment.scheduledAt),
        title: appointment.patient.displayName,
        time: `${formatShortTime(appointment.scheduledAt)} - ${
          appointment.specialty || appointment.appointmentType || "Tư vấn trực tuyến"
        }`,
      }));
  }, [activeAppointmentSource?.id, appointments]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const notifyDueAppointment = (appointment: ConsultationAppointment) => {
      const message = `Đến giờ tư vấn với ${appointment.patient.displayName} (${formatDateTimeLabel(appointment.scheduledAt)}).`;
      setDueNotice(message);

      if ("Notification" in window) {
        const showBrowserNotification = () => {
          try {
            const notification = new window.Notification("MedAssist - Ca tư vấn đến giờ", {
              body: message,
              tag: `consultation-due-${appointment.id}`,
            });

            notification.onclick = () => {
              window.focus();
              updateRouteState({
                roomId: null,
                appointmentId: appointment.id,
              });
            };
          } catch {
            // Ignore browser notification errors and keep in-app notice.
          }
        };

        if (window.Notification.permission === "granted") {
          showBrowserNotification();
        } else if (window.Notification.permission === "default") {
          void window.Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              showBrowserNotification();
            }
          });
        }
      }
    };

    const checkDueAppointments = () => {
      const now = Date.now();
      const dueAppointment = appointments
        .filter((appointment) => isPendingAppointmentStatus(appointment.status))
        .slice()
        .sort((left, right) => new Date(left.scheduledAt).getTime() - new Date(right.scheduledAt).getTime())
        .find((appointment) => {
          const scheduledAtMs = new Date(appointment.scheduledAt).getTime();
          const dueWindowStart = scheduledAtMs;
          const dueWindowEnd = scheduledAtMs + 60 * 1000;
          return now >= dueWindowStart && now < dueWindowEnd && !dueAppointmentIds.includes(appointment.id);
        });

      if (!dueAppointment) {
        return;
      }

      setDueAppointmentIds((current) => {
        if (current.includes(dueAppointment.id)) {
          return current;
        }

        const next = [...current, dueAppointment.id];
        persistDueAppointmentIds(next);
        return next;
      });
      notifyDueAppointment(dueAppointment);
    };

    checkDueAppointments();
    const timerId = window.setInterval(checkDueAppointments, 30_000);
    return () => window.clearInterval(timerId);
  }, [appointments, dueAppointmentIds, updateRouteState]);

  const timelineItems = useMemo<ConsultationTimelineItem[]>(() => {
    return consultationRooms.map<ConsultationTimelineItem>((room: ConsultationRoom) => ({
      id: room.id,
      status: room.status,
      badge: room.badge,
      time: room.timeLabel,
      title: room.title,
      description: parseRoomDescription(room.description).description,
      members: room.membersLabel,
      action: room.actionLabel || null,
    }));
  }, [consultationRooms]);

  const selectedRoom = useMemo<ConsultationRoom | null>(() => {
    if (!selectedRoomId) {
      return null;
    }

    return consultationRooms.find((room) => room.id === selectedRoomId) ?? null;
  }, [consultationRooms, selectedRoomId]);

  const selectedRoomDetails = useMemo<SelectedConsultationRoomData | null>(() => {
    if (!selectedRoom) {
      return null;
    }

    const parsed = parseRoomDescription(selectedRoom.description);
    const fallbackMeetingLink = parsed.meetingLink
      || (isGoogleMeetRoom(selectedRoom)
        ? activeAppointmentSource?.meetingLink || GOOGLE_MEET_LAUNCH_URL
        : buildInternalRoomLink(selectedRoom.id));
    const canDelete = createdRoomIds.includes(selectedRoom.id) || isRoomOwnedByDoctor(selectedRoom.id, activeDoctorUid);

    return {
      id: selectedRoom.id,
      title: selectedRoom.title,
      badge: selectedRoom.badge,
      status: selectedRoom.status,
      timeLabel: selectedRoom.timeLabel,
      displayDate: selectedRoom.displayDate,
      description: parsed.description,
      membersLabel: selectedRoom.membersLabel,
      meetingLink: fallbackMeetingLink,
      canDelete,
    };
  }, [activeAppointmentSource?.meetingLink, activeDoctorUid, buildInternalRoomLink, createdRoomIds, selectedRoom]);

  const registerCreatedRoom = (roomId: string) => {
    setCreatedRoomIds((current) => {
      if (current.includes(roomId)) {
        return current;
      }

      const next = [...current, roomId];
      persistCreatedRoomIds(next);
      return next;
    });
  };

  const unregisterCreatedRoom = (roomId: string) => {
    setCreatedRoomIds((current) => {
      if (!current.includes(roomId)) {
        return current;
      }

      const next = current.filter((id) => id !== roomId);
      persistCreatedRoomIds(next);
      return next;
    });
  };

  const isRoomCreatedByDoctor = (room: ConsultationRoom) =>
    createdRoomIds.includes(room.id) || isRoomOwnedByDoctor(room.id, activeDoctorUid);

  const handleAddAttachment = async (file: File) => {
    if (!activeAppointmentSource) {
      alert("Chưa có cuộc hẹn nào để thêm hồ sơ.");
      return;
    }

    const fileName = file.name?.trim() || `Tệp tư vấn ${attachments.length + 1}`;
    const fileType = file.type || "application/octet-stream";

    const nextAttachment = {
      id: createClientId("appointment-attachment"),
      appointmentId: activeAppointmentSource.id,
      fileName,
      fileType,
      fileUrl: await readFileAsDataUrl(file),
      displayOrder: attachments.length + 1,
    };

    try {
      await upsertAppointmentAttachment(getMedAssistDataConnect(), nextAttachment);
      setAppointmentAttachments((current) =>
        [...current, nextAttachment].sort((left, right) => left.displayOrder - right.displayOrder)
      );
    } catch (error) {
      console.error("Không thể thêm hồ sơ consultation:", error);
      alert("Không thể thêm hồ sơ liên quan lúc này.");
    }
  };

  const buildCreateRoomDraft = (mode: ConsultationRoomCreateMode): ConsultationRoomCreateDraft => {
    const hasActiveRoom = consultationRooms.some((room) => room.status === "active");
    const defaultBadge = mode === "google-meet" ? "Google Meet" : hasActiveRoom ? "Sắp diễn ra" : "Đang diễn ra";
    const defaultDescription =
      mode === "google-meet"
        ? "Mở Google Meet để hội chẩn trực tuyến với bệnh nhân."
        : "Phòng tư vấn được tạo từ giao diện web để chuẩn bị phiên khám tiếp theo.";
    const anchorDate = activeAppointmentSource ? new Date(activeAppointmentSource.scheduledAt) : new Date();
    const defaultDate = Number.isNaN(anchorDate.getTime()) ? new Date() : anchorDate;
    const defaultPatientUid = activeAppointmentSource?.patientUid || patientOptions[0]?.uid || "";
    const defaultStartTime = `${String(defaultDate.getHours()).padStart(2, "0")}:${String(defaultDate.getMinutes()).padStart(2, "0")}`;
    const defaultEndTime = addMinutes(defaultDate, 30);
    const defaultTimeLabel = `${defaultStartTime} - ${String(defaultEndTime.getHours()).padStart(2, "0")}:${String(defaultEndTime.getMinutes()).padStart(2, "0")}`;

    return {
      mode,
      patientUid: defaultPatientUid,
      scheduledDate: toLocalDateInputValue(defaultDate),
      startTime: defaultStartTime,
      title: mode === "google-meet" ? "Phòng Google Meet" : "Phòng tư vấn mới",
      description: defaultDescription,
      membersLabel: mode === "google-meet" ? "Bác sĩ + bệnh nhân" : "1 bác sĩ",
      badge: defaultBadge,
      timeLabel: defaultTimeLabel,
      meetingLink: mode === "google-meet" ? GOOGLE_MEET_LAUNCH_URL : activeAppointmentSource?.meetingLink || "",
      openMeetingAfterCreate: mode === "google-meet",
    };
  };

  const openCreateRoomModal = (mode: ConsultationRoomCreateMode) => {
    setCreateRoomDraft(buildCreateRoomDraft(mode));
    setIsCreateRoomModalOpen(true);
  };

  const handleCreateRoomSubmit = async () => {
    const title = createRoomDraft.title.trim();
    if (!title) {
      alert("Vui lòng nhập tên phòng.");
      return;
    }

    const selectedPatient = patientOptions.find((patient) => patient.uid === createRoomDraft.patientUid);
    if (!selectedPatient) {
      alert("Vui lòng chọn bệnh nhân cho ca tư vấn.");
      return;
    }

    const startAt = buildDateTimeFromInputs(createRoomDraft.scheduledDate, createRoomDraft.startTime);
    if (Number.isNaN(startAt.getTime())) {
      alert("Ngày hoặc giờ bắt đầu chưa hợp lệ.");
      return;
    }

    const endAt = addMinutes(startAt, 30);
    const now = new Date();
    const status = now >= startAt && now <= endAt ? "active" : "scheduled";
    const meetingLinkFromForm = createRoomDraft.meetingLink.trim();
    const roomId = createClientId(`consultation-room-${activeDoctorUid}`);
    const generatedRoomLink = buildInternalRoomLink(roomId);
    const meetingLink =
      meetingLinkFromForm || (createRoomDraft.mode === "google-meet" ? GOOGLE_MEET_LAUNCH_URL : generatedRoomLink);
    const badge =
      createRoomDraft.badge.trim()
      || (createRoomDraft.mode === "google-meet"
        ? "Google Meet"
        : status === "active"
          ? "Đang diễn ra"
          : "Sắp diễn ra");
    const description = createRoomDraft.description.trim()
      || (createRoomDraft.mode === "google-meet"
        ? "Mở Google Meet để hội chẩn trực tuyến với bệnh nhân."
        : "Phòng tư vấn được tạo từ giao diện web để chuẩn bị phiên khám tiếp theo.");
    const formattedStartTime = `${String(startAt.getHours()).padStart(2, "0")}:${String(startAt.getMinutes()).padStart(2, "0")}`;
    const formattedEndTime = `${String(endAt.getHours()).padStart(2, "0")}:${String(endAt.getMinutes()).padStart(2, "0")}`;
    const roomTimeLabel = createRoomDraft.timeLabel.trim() || `${formattedStartTime} - ${formattedEndTime}`;
    const roomMembersLabel =
      createRoomDraft.membersLabel.trim() || `Bác sĩ + ${selectedPatient.patient.displayName}`;
    const appointmentDoctorName = activeAppointmentSource?.doctorName || "Bác sĩ MedAssist";

    const nextRoom = {
      id: roomId,
      displayDate: formatRoomDisplayDate(startAt),
      status,
      badge,
      timeLabel: roomTimeLabel,
      title,
      description: buildRoomDescription(description, meetingLink),
      membersLabel: roomMembersLabel,
      actionLabel: createRoomDraft.mode === "google-meet" ? "Mở Meet" : "Xem",
      displayOrder: consultationRooms.length + 1,
    };

    setIsCreatingRoom(true);
    try {
      const appointmentResult = await createAppointment(getMedAssistDataConnect(), {
        patientUid: selectedPatient.uid,
        doctorUid: activeDoctorUid,
        doctorName: appointmentDoctorName,
        scheduledAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        status: "SCHEDULED",
        meetingLink,
        symptoms: null,
        specialty: "Tư vấn trực tuyến",
        appointmentType: "Tư vấn trực tiếp",
        queueLabel: "Ca tư vấn sắp tới",
        currentDoctorNote: null,
        countdownLabel: null,
      });
      const createdAppointmentId = appointmentResult.data.appointment_insert.id;

      await upsertConsultationRoom(getMedAssistDataConnect(), nextRoom);
      setConsultationRooms((current) => [...current, nextRoom].sort((left, right) => left.displayOrder - right.displayOrder));
      registerCreatedRoom(nextRoom.id);
      setAppointments((current) =>
        [...current, {
          id: createdAppointmentId,
          patientUid: selectedPatient.uid,
          doctorUid: activeDoctorUid,
          doctorName: appointmentDoctorName,
          scheduledAt: startAt.toISOString(),
          endAt: endAt.toISOString(),
          status: "SCHEDULED",
          meetingLink,
          symptoms: null,
          specialty: "Tư vấn trực tuyến",
          appointmentType: "Tư vấn trực tiếp",
          queueLabel: "Ca tư vấn sắp tới",
          countdownLabel: null,
          currentDoctorNote: null,
          patient: selectedPatient.patient,
        }].sort((left, right) => new Date(left.scheduledAt).getTime() - new Date(right.scheduledAt).getTime())
      );
      setSelectedAppointmentId(createdAppointmentId);
      setSelectedRoomId(nextRoom.id);
      updateRouteState({
        roomId: nextRoom.id,
        appointmentId: createdAppointmentId,
      });

      setIsCreateRoomModalOpen(false);

      if (createRoomDraft.openMeetingAfterCreate) {
        const launchLink = meetingLink;
        if (launchLink) {
          window.open(launchLink, "_blank", "noopener,noreferrer");
        }
      }
    } catch (error) {
      console.error("Không thể tạo phòng consultation:", error);
      alert("Không thể tạo phòng mới lúc này.");
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    updateRouteState({
      roomId,
      appointmentId: activeAppointmentSource?.id || selectedAppointmentId,
    });
  };

  const handleDeleteSelectedRoom = async () => {
    if (!selectedRoom) {
      return;
    }

    if (!isRoomCreatedByDoctor(selectedRoom)) {
      alert("Bạn chỉ có thể xóa các phòng do bạn tạo.");
      return;
    }

    const shouldDelete = window.confirm(`Bạn có muốn xóa phòng "${selectedRoom.title}" không?`);
    if (!shouldDelete) {
      return;
    }

    setDeletingRoomId(selectedRoom.id);
    try {
      await upsertConsultationRoom(getMedAssistDataConnect(), {
        id: selectedRoom.id,
        displayDate: selectedRoom.displayDate,
        status: "deleted",
        badge: selectedRoom.badge,
        timeLabel: selectedRoom.timeLabel,
        title: selectedRoom.title,
        description: selectedRoom.description,
        membersLabel: selectedRoom.membersLabel,
        actionLabel: null,
        displayOrder: selectedRoom.displayOrder,
      });

      setConsultationRooms((current) => current.filter((room) => room.id !== selectedRoom.id));
      unregisterCreatedRoom(selectedRoom.id);
      setSelectedRoomId(null);
      updateRouteState({
        roomId: null,
        appointmentId: activeAppointmentSource?.id || selectedAppointmentId,
      });
    } catch (error) {
      console.error("Không thể xóa phòng tư vấn:", error);
      alert("Không thể xóa phòng lúc này.");
    } finally {
      setDeletingRoomId(null);
    }
  };

  const handleCopySelectedRoomMeeting = async () => {
    if (!selectedRoomDetails?.meetingLink) {
      alert("Phòng này chưa có link Google Meet.");
      return;
    }

    await safeClipboardCopy(selectedRoomDetails.meetingLink);
    alert("Đã sao chép link Google Meet.");
  };

  const handleOpenSelectedRoomMeeting = () => {
    if (!selectedRoomDetails?.meetingLink) {
      alert("Phòng này chưa có link Google Meet.");
      return;
    }

    window.open(selectedRoomDetails.meetingLink, "_blank", "noopener,noreferrer");
  };

  const handleCreateRoomDraftChange = (field: keyof ConsultationRoomCreateDraft, value: string | boolean) => {
    setCreateRoomDraft((current) => ({
      ...current,
      [field]: value as never,
    }));
  };

  return (
    <div className="flex min-h-full flex-col bg-[#f5f7fb]">
      <div className="flex-1 px-5 py-6 lg:px-7 lg:py-7">
        {dueNotice ? (
          <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            {dueNotice}
          </div>
        ) : null}
        {isLoading ? (
          <div className="rounded-[34px] border border-slate-200/80 bg-white p-8 text-center text-slate-500 shadow-[0_12px_32px_rgba(148,163,184,0.08)]">
            Đang tải dữ liệu tư vấn...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.85fr)_380px]">
            <div className="space-y-7">
              {selectedRoomId ? (
                <SelectedConsultationRoom
                  room={selectedRoomDetails}
                  onCopyMeeting={handleCopySelectedRoomMeeting}
                  onOpenMeeting={handleOpenSelectedRoomMeeting}
                  onDeleteRoom={handleDeleteSelectedRoom}
                  isDeleting={deletingRoomId === selectedRoomDetails?.id}
                  onBackToAppointment={() => {
                    setSelectedRoomId(null);
                    updateRouteState({
                      roomId: null,
                      appointmentId: activeAppointmentSource?.id || selectedAppointmentId,
                    });
                  }}
                />
              ) : (
                <ActiveAppointment
                  appointment={activeAppointment}
                  attachments={attachments}
                  onAddAttachment={handleAddAttachment}
                  onCreateGoogleMeetRoom={() => openCreateRoomModal("google-meet")}
                />
              )}
              <UpcomingAppointments
                appointments={upcomingAppointments}
                onSelect={(appointmentId) => {
                  setSelectedAppointmentId(appointmentId);
                  setSelectedRoomId(null);
                  updateRouteState({
                    roomId: null,
                    appointmentId,
                  });
                }}
              />
            </div>

            <div className="h-full">
              <DailyTimeline
                dateLabel={consultationRooms[0]?.displayDate || createTimelineDateLabel()}
                timelineItems={timelineItems}
                onCreateRoom={() => openCreateRoomModal("standard")}
                onCreateGoogleMeetRoom={() => openCreateRoomModal("google-meet")}
                onSelectRoom={handleSelectRoom}
                selectedRoomId={selectedRoomId}
              />
            </div>
          </div>
        )}
      </div>

      <CreateConsultationRoomModal
        isOpen={isCreateRoomModalOpen}
        isSaving={isCreatingRoom}
        patientOptions={patientOptions.map((patient) => ({
          uid: patient.uid,
          label: patient.label,
        }))}
        values={createRoomDraft}
        onClose={() => setIsCreateRoomModalOpen(false)}
        onChange={handleCreateRoomDraftChange}
        onSubmit={handleCreateRoomSubmit}
      />
    </div>
  );
}
