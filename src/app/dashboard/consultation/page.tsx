"use client";

import { useEffect, useMemo, useState } from "react";
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
  getConsultationWorkspace,
  upsertAppointment,
  upsertAppointmentAttachment,
  upsertConsultationRoom,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import {
  createClientId,
  formatDateTimeLabel,
  formatShortTime,
  getActiveDoctorUid,
  safeClipboardCopy,
} from "@/shared/lib/medassist-runtime";

type ConsultationAppointment = GetConsultationWorkspaceData["appointments"][number];
type ConsultationRoom = GetConsultationWorkspaceData["consultationRooms"][number];

const GOOGLE_MEET_LAUNCH_URL = "https://meet.google.com/new";
const CONSULTATION_CREATED_ROOM_IDS_KEY = "medassist_consultation_created_room_ids";
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

function isGoogleMeetRoom(room: ConsultationRoom) {
  const source = `${room.title} ${room.badge} ${room.actionLabel || ""}`.toLowerCase();
  return source.includes("google meet") || source.includes("meet");
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

export default function ConsultationPage() {
  const activeDoctorUid = getActiveDoctorUid();
  const [appointments, setAppointments] = useState<GetConsultationWorkspaceData["appointments"]>([]);
  const [appointmentAttachments, setAppointmentAttachments] = useState<GetConsultationWorkspaceData["appointmentAttachments"]>([]);
  const [consultationRooms, setConsultationRooms] = useState<GetConsultationWorkspaceData["consultationRooms"]>([]);
  const [createdRoomIds, setCreatedRoomIds] = useState<string[]>([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);
  const [createRoomDraft, setCreateRoomDraft] = useState<ConsultationRoomCreateDraft>({
    mode: "standard",
    title: "",
    description: "",
    membersLabel: "",
    badge: "",
    timeLabel: "",
    meetingLink: "",
    openMeetingAfterCreate: false,
  });

  useEffect(() => {
    setCreatedRoomIds(readCreatedRoomIds());
  }, []);

  useEffect(() => {
    let isMounted = true;

    getConsultationWorkspace(getMedAssistDataConnect(), {
      doctorUid: getActiveDoctorUid(),
    })
      .then((response) => {
        if (!isMounted) {
          return;
        }

        const sortedAppointments = response.data.appointments
          .slice()
          .sort((left, right) => new Date(left.scheduledAt).getTime() - new Date(right.scheduledAt).getTime());

        const visibleRooms = response.data.consultationRooms
          .filter((room) => room.status !== "deleted")
          .slice()
          .sort((left, right) => left.displayOrder - right.displayOrder);

        setAppointments(sortedAppointments);
        setAppointmentAttachments(
          response.data.appointmentAttachments.slice().sort((left, right) => left.displayOrder - right.displayOrder)
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
  }, []);

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
    return appointments
      .filter((appointment) => appointment.id !== activeAppointmentSource?.id)
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
      || (isGoogleMeetRoom(selectedRoom) ? activeAppointmentSource?.meetingLink || GOOGLE_MEET_LAUNCH_URL : null);
    const canDelete =
      createdRoomIds.includes(selectedRoom.id) || selectedRoom.id.startsWith(`consultation-room-${activeDoctorUid}-`);

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
  }, [activeAppointmentSource?.meetingLink, activeDoctorUid, createdRoomIds, selectedRoom]);

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
    createdRoomIds.includes(room.id) || room.id.startsWith(`consultation-room-${activeDoctorUid}-`);

  const handleAddAttachment = async () => {
    if (!activeAppointmentSource) {
      alert("Chưa có cuộc hẹn nào để thêm hồ sơ.");
      return;
    }

    const nextAttachment = {
      id: createClientId("appointment-attachment"),
      appointmentId: activeAppointmentSource.id,
      fileName: `Ghi chú tư vấn ${attachments.length + 1}`,
      fileType: "text/plain",
      fileUrl: null,
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

  const syncActiveAppointmentMeetingLink = async (meetingLink: string) => {
    if (!activeAppointmentSource) {
      return;
    }

    await upsertAppointment(getMedAssistDataConnect(), {
      id: activeAppointmentSource.id,
      patientUid: activeAppointmentSource.patientUid,
      doctorUid: activeAppointmentSource.doctorUid ?? getActiveDoctorUid(),
      doctorName: activeAppointmentSource.doctorName,
      scheduledAt: activeAppointmentSource.scheduledAt,
      endAt: activeAppointmentSource.endAt ?? null,
      status: activeAppointmentSource.status,
      meetingLink,
      symptoms: activeAppointmentSource.symptoms ?? null,
      specialty: activeAppointmentSource.specialty ?? null,
      appointmentType: activeAppointmentSource.appointmentType ?? null,
      queueLabel: activeAppointmentSource.queueLabel ?? null,
      currentDoctorNote: activeAppointmentSource.currentDoctorNote ?? null,
      countdownLabel: activeAppointmentSource.countdownLabel ?? null,
    });

    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === activeAppointmentSource.id ? { ...appointment, meetingLink } : appointment
      )
    );
  };

  const buildCreateRoomDraft = (mode: ConsultationRoomCreateMode): ConsultationRoomCreateDraft => {
    const hasActiveRoom = consultationRooms.some((room) => room.status === "active");
    const defaultBadge = mode === "google-meet" ? "Google Meet" : hasActiveRoom ? "Sắp diễn ra" : "Đang diễn ra";
    const defaultDescription =
      mode === "google-meet"
        ? "Mở Google Meet để hội chẩn trực tuyến với bệnh nhân."
        : "Phòng tư vấn được tạo từ giao diện web để chuẩn bị phiên khám tiếp theo.";

    return {
      mode,
      title: mode === "google-meet" ? "Phòng Google Meet" : "Phòng tư vấn mới",
      description: defaultDescription,
      membersLabel: mode === "google-meet" ? "Bác sĩ + bệnh nhân" : "1 bác sĩ",
      badge: defaultBadge,
      timeLabel: createCurrentTimeLabel(),
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

    const status = consultationRooms.some((room) => room.status === "active") ? "scheduled" : "active";
    const meetingLinkFromForm = createRoomDraft.meetingLink.trim();
    const meetingLink =
      meetingLinkFromForm || (createRoomDraft.mode === "google-meet" ? GOOGLE_MEET_LAUNCH_URL : "");
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

    const nextRoom = {
      id: createClientId(`consultation-room-${activeDoctorUid}`),
      displayDate: createTimelineDateLabel(),
      status,
      badge,
      timeLabel: createRoomDraft.timeLabel.trim() || createCurrentTimeLabel(),
      title,
      description: buildRoomDescription(description, meetingLink),
      membersLabel: createRoomDraft.membersLabel.trim() || "Bác sĩ",
      actionLabel: createRoomDraft.mode === "google-meet" ? "Mở Meet" : "Xem",
      displayOrder: consultationRooms.length + 1,
    };

    setIsCreatingRoom(true);
    try {
      await upsertConsultationRoom(getMedAssistDataConnect(), nextRoom);
      setConsultationRooms((current) => [...current, nextRoom].sort((left, right) => left.displayOrder - right.displayOrder));
      registerCreatedRoom(nextRoom.id);
      setSelectedRoomId(nextRoom.id);

      if (meetingLink) {
        await syncActiveAppointmentMeetingLink(meetingLink);
      }

      setIsCreateRoomModalOpen(false);

      if (createRoomDraft.openMeetingAfterCreate && meetingLink) {
        window.open(meetingLink, "_blank", "noopener,noreferrer");
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
                  onBackToAppointment={() => setSelectedRoomId(null)}
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
        values={createRoomDraft}
        onClose={() => setIsCreateRoomModalOpen(false)}
        onChange={handleCreateRoomDraftChange}
        onSubmit={handleCreateRoomSubmit}
      />
    </div>
  );
}
