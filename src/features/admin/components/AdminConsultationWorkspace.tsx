"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquareHeart, PhoneCall, Plus, Save } from "lucide-react";
import {
  getAppointments,
  getConsultationWorkspace,
  type GetAppointmentsData,
  type GetConsultationWorkspaceData,
  upsertAppointment,
  upsertConsultationRoom,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { createClientId, getActiveDoctorUid } from "@/shared/lib/medassist-runtime";
import { formatDateTime, getPageCount, paginateItems } from "../lib/admin-utils";
import {
  AdminButton,
  AdminEmptyState,
  AdminInput,
  AdminPagination,
  AdminScrollViewport,
  AdminSection,
  AdminSelect,
  AdminStatCard,
  AdminTextarea,
} from "./AdminPrimitives";

type ConsultationBundle = {
  appointments: GetAppointmentsData["appointments"];
  rooms: GetConsultationWorkspaceData["consultationRooms"];
  attachments: GetConsultationWorkspaceData["appointmentAttachments"];
};

export function AdminConsultationWorkspace() {
  const [bundle, setBundle] = useState<ConsultationBundle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [consultationPage, setConsultationPage] = useState(1);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [doctorNote, setDoctorNote] = useState("");
  const [roomForm, setRoomForm] = useState({
    displayDate: "",
    status: "scheduled",
    badge: "Moi",
    timeLabel: "",
    title: "",
    description: "",
    membersLabel: "",
    actionLabel: "Mo phong",
  });

  useEffect(() => {
    let mounted = true;

    const loadBundle = async () => {
      try {
        const [appointmentsResponse, consultationResponse] = await Promise.all([
          getAppointments(getMedAssistDataConnect()),
          getConsultationWorkspace(getMedAssistDataConnect(), { doctorUid: getActiveDoctorUid() }),
        ]);

        if (!mounted) {
          return;
        }

        const nextBundle = {
          appointments: appointmentsResponse.data.appointments
            .filter((appointment) => Boolean(appointment.meetingLink || appointment.appointmentType || appointment.specialty))
            .slice()
            .sort((left, right) => new Date(left.scheduledAt).getTime() - new Date(right.scheduledAt).getTime()),
          rooms: consultationResponse.data.consultationRooms,
          attachments: consultationResponse.data.appointmentAttachments,
        };

        setBundle(nextBundle);
        setSelectedAppointmentId(nextBundle.appointments[0]?.id || null);
      } catch (error) {
        console.error("Không thể tải quản trị tư vấn:", error);
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

  const appointments = bundle?.appointments ?? [];
  const consultationPageCount = getPageCount(appointments.length);
  const pagedAppointments = paginateItems(appointments, consultationPage);
  const selectedAppointment = appointments.find((appointment) => appointment.id === selectedAppointmentId) || appointments[0] || null;

  useEffect(() => {
    if (consultationPage > consultationPageCount) {
      setConsultationPage(consultationPageCount);
    }
  }, [consultationPage, consultationPageCount]);

  useEffect(() => {
    if (!appointments.length) {
      setSelectedAppointmentId(null);
      return;
    }

    if (!selectedAppointmentId || !appointments.some((appointment) => appointment.id === selectedAppointmentId)) {
      setSelectedAppointmentId(appointments[0].id);
    }
  }, [appointments, selectedAppointmentId]);

  useEffect(() => {
    setMeetingLink(selectedAppointment?.meetingLink || "");
    setDoctorNote(selectedAppointment?.currentDoctorNote || "");
  }, [selectedAppointment]);

  const pendingCount = appointments.filter((appointment) => appointment.status.toLowerCase() === "pending").length;
  const roomCount = bundle?.rooms.length || 0;
  const attachmentCount = bundle?.attachments.length || 0;

  const handleSaveAppointment = async () => {
    if (!selectedAppointment) {
      return;
    }

    try {
      await upsertAppointment(getMedAssistDataConnect(), {
        id: selectedAppointment.id,
        patientUid: selectedAppointment.patientUid,
        doctorUid: selectedAppointment.doctorUid,
        doctorName: selectedAppointment.doctorName,
        scheduledAt: selectedAppointment.scheduledAt,
        endAt: selectedAppointment.endAt,
        status: selectedAppointment.status,
        meetingLink: meetingLink || null,
        symptoms: selectedAppointment.symptoms,
        specialty: selectedAppointment.specialty,
        appointmentType: selectedAppointment.appointmentType,
        queueLabel: selectedAppointment.queueLabel,
        currentDoctorNote: doctorNote || null,
        countdownLabel: selectedAppointment.countdownLabel,
      });

      alert("Đã lưu cập nhật phiên tư vấn.");
    } catch (error) {
      console.error("Không thể lưu phiên tư vấn:", error);
      alert("Không thể lưu phiên tư vấn.");
    }
  };

  const handleCreateRoom = async () => {
    if (!roomForm.title.trim()) {
      alert("Cần nhập tên phòng tư vấn.");
      return;
    }

    try {
      await upsertConsultationRoom(getMedAssistDataConnect(), {
        id: createClientId("consultation-room"),
        displayDate: roomForm.displayDate,
        status: roomForm.status,
        badge: roomForm.badge,
        timeLabel: roomForm.timeLabel,
        title: roomForm.title,
        description: roomForm.description,
        membersLabel: roomForm.membersLabel,
        actionLabel: roomForm.actionLabel,
        displayOrder: roomCount,
      });

      alert("Đã tạo phòng tư vấn mới.");
    } catch (error) {
      console.error("Không thể tạo phòng tư vấn:", error);
      alert("Không thể tạo phòng tư vấn.");
    }
  };

  return (
    <div className="space-y-6">
      <AdminSection
        eyebrow="Điều phối tư vấn"
        title="Quản lý phiên tư vấn trực tuyến"
        description="Danh sách phiên được cố định 10 dòng mỗi trang, có scroll để tránh trang quá dài."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <AdminStatCard icon={MessageSquareHeart} label="Phiên tư vấn" value={String(appointments.length)} helper="Lịch khám có yếu tố tư vấn / meeting" tone="blue" />
          <AdminStatCard icon={PhoneCall} label="Đang chờ" value={String(pendingCount)} helper="Phiên tư vấn chưa hoàn tất" tone="emerald" />
          <AdminStatCard icon={Plus} label="Phòng tư vấn" value={String(roomCount)} helper="Room đang có trong hệ thống" tone="amber" />
          <AdminStatCard icon={Save} label="Tệp đính kèm" value={String(attachmentCount)} helper="File hỗ trợ kèm lịch tư vấn" tone="slate" />
        </div>
      </AdminSection>

      <div className="grid gap-6 xl:grid-cols-[0.98fr_1.02fr]">
        <AdminSection
          eyebrow="Danh sách phiên"
          title="Hàng đợi cần theo dõi"
          description="Chọn một dòng để cập nhật meeting link và ghi chú hỗ trợ cho bác sĩ."
        >
          {isLoading ? (
            <AdminEmptyState message="Đang tải danh sách phiên tư vấn..." />
          ) : appointments.length === 0 ? (
            <AdminEmptyState message="Chưa có phiên tư vấn nào cần điều phối." />
          ) : (
            <>
              <div className="rounded-3xl border border-slate-200 bg-white">
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)_130px_120px] gap-3 border-b border-slate-100 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  <span>Bệnh nhân</span>
                  <span>Bác sĩ</span>
                  <span>Thời gian</span>
                  <span>Trạng thái</span>
                </div>
                <AdminScrollViewport heightClass="max-h-[620px]">
                  {pagedAppointments.items.map((appointment) => (
                    <button
                      key={appointment.id}
                      type="button"
                      onClick={() => setSelectedAppointmentId(appointment.id)}
                      className={`grid w-full grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)_130px_120px] gap-3 border-b border-slate-100 px-4 py-4 text-left transition-colors last:border-b-0 ${
                        appointment.id === selectedAppointment?.id ? "bg-[#35678E]/6" : "bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">{appointment.patient.displayName}</p>
                        <p className="mt-1 truncate text-xs text-slate-500">{appointment.patient.userCode || appointment.patient.uid}</p>
                      </div>
                      <div className="min-w-0 text-sm text-slate-600">
                        <p className="truncate font-medium text-slate-800">{appointment.doctorName}</p>
                        <p className="mt-1 truncate text-xs text-slate-500">{appointment.specialty || appointment.appointmentType || "Tư vấn"}</p>
                      </div>
                      <div className="text-sm text-slate-600">{formatDateTime(appointment.scheduledAt)}</div>
                      <div className="text-sm font-medium text-slate-700">{appointment.status}</div>
                    </button>
                  ))}
                </AdminScrollViewport>
              </div>
              <AdminPagination
                page={pagedAppointments.page}
                pageCount={pagedAppointments.pageCount}
                totalItems={appointments.length}
                onPageChange={setConsultationPage}
              />
            </>
          )}
        </AdminSection>

        <div className="space-y-6">
          <AdminSection
            eyebrow="Phiên đang chọn"
            title={selectedAppointment ? `Cập nhật: ${selectedAppointment.patient.displayName}` : "Chưa chọn phiên"}
            description="Admin có thể giữ link họp ổn định và ghi chú điều phối để bác sĩ nhận ngay."
          >
            {selectedAppointment ? (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Bác sĩ</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedAppointment.doctorName}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Lịch hẹn</p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">{formatDateTime(selectedAppointment.scheduledAt)}</p>
                  </div>
                </div>
                <AdminInput value={meetingLink} onChange={(event) => setMeetingLink(event.target.value)} placeholder="Meeting link / room URL" />
                <AdminTextarea rows={4} value={doctorNote} onChange={(event) => setDoctorNote(event.target.value)} placeholder="Ghi chú điều phối, hướng dẫn hỗ trợ hoặc lưu ý cho bác sĩ..." />
                <AdminButton onClick={handleSaveAppointment}>Lưu cập nhật phiên tư vấn</AdminButton>
              </div>
            ) : (
              <AdminEmptyState message="Chọn một dòng bên trái để thao tác." />
            )}
          </AdminSection>

          <AdminSection
            eyebrow="Tạo phòng tư vấn"
            title="Khởi tạo room mới"
            description="Dùng cho phòng support, hội chẩn hoặc phòng tư vấn bổ sung."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput value={roomForm.displayDate} onChange={(event) => setRoomForm((current) => ({ ...current, displayDate: event.target.value }))} placeholder="Ngày hiển thị" />
              <AdminInput value={roomForm.timeLabel} onChange={(event) => setRoomForm((current) => ({ ...current, timeLabel: event.target.value }))} placeholder="Khung giờ hiển thị" />
              <AdminInput value={roomForm.title} onChange={(event) => setRoomForm((current) => ({ ...current, title: event.target.value }))} placeholder="Tên phòng" />
              <AdminInput value={roomForm.badge} onChange={(event) => setRoomForm((current) => ({ ...current, badge: event.target.value }))} placeholder="Badge" />
              <AdminInput value={roomForm.membersLabel} onChange={(event) => setRoomForm((current) => ({ ...current, membersLabel: event.target.value }))} placeholder="Thành viên" />
              <AdminSelect value={roomForm.status} onChange={(event) => setRoomForm((current) => ({ ...current, status: event.target.value }))}>
                <option value="scheduled">Đã lên lịch</option>
                <option value="active">Đang hoạt động</option>
                <option value="closed">Đã đóng</option>
              </AdminSelect>
            </div>
            <AdminTextarea rows={3} value={roomForm.description} onChange={(event) => setRoomForm((current) => ({ ...current, description: event.target.value }))} placeholder="Mô tả ngắn cho phòng tư vấn..." className="mt-4" />
            <div className="mt-4">
              <AdminButton onClick={handleCreateRoom}>Tạo phòng tư vấn</AdminButton>
            </div>
          </AdminSection>
        </div>
      </div>
    </div>
  );
}

