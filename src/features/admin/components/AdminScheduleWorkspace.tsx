"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarPlus2, Clock3, RefreshCcw, ShieldCheck, Stethoscope } from "lucide-react";
import {
  getAppointments,
  getDoctors,
  getScheduleWorkspace,
  type GetAppointmentsData,
  type GetDoctorsData,
  type GetScheduleWorkspaceData,
  upsertScheduleEvent,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { createClientId } from "@/shared/lib/medassist-runtime";
import { dedupeByKey, getPageCount, paginateItems } from "../lib/admin-utils";
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

type ScheduleBundle = {
  doctors: GetDoctorsData["users"];
  appointments: GetAppointmentsData["appointments"];
  scheduleEvents: GetScheduleWorkspaceData["scheduleEvents"];
  patientProfiles: GetScheduleWorkspaceData["patientProfiles"];
};

export function AdminScheduleWorkspace() {
  const [bundle, setBundle] = useState<ScheduleBundle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [schedulePage, setSchedulePage] = useState(1);
  const [eventForm, setEventForm] = useState({
    doctorUid: "",
    patientUid: "",
    title: "",
    eventType: "CONSULTATION",
    department: "",
    scheduledDate: "",
    startTime: "08:00",
    endTime: "09:00",
    roomName: "",
    priority: "NORMAL",
    notes: "",
  });

  useEffect(() => {
    let mounted = true;

    const loadBundle = async () => {
      try {
        const [doctorsResponse, appointmentsResponse] = await Promise.all([
          getDoctors(getMedAssistDataConnect()),
          getAppointments(getMedAssistDataConnect()),
        ]);
        const doctors = doctorsResponse.data.users;
        const scheduleResponses = await Promise.all(
          doctors.map((doctor) => getScheduleWorkspace(getMedAssistDataConnect(), { doctorUid: doctor.uid }))
        );

        if (!mounted) {
          return;
        }

        setBundle({
          doctors,
          appointments: appointmentsResponse.data.appointments,
          scheduleEvents: dedupeByKey(
            scheduleResponses.flatMap((response) => response.data.scheduleEvents),
            (event) => event.id
          ),
          patientProfiles: dedupeByKey(
            scheduleResponses.flatMap((response) => response.data.patientProfiles),
            (profile) => profile.id
          ),
        });
      } catch (error) {
        console.error("Không thể tải lịch khám quản trị:", error);
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

  const doctors = bundle?.doctors ?? [];
  const filteredEvents = useMemo(() => {
    return (bundle?.scheduleEvents ?? [])
      .filter((event) => !event.isDeleted)
      .filter((event) => (doctorFilter === "all" ? true : event.doctorUid === doctorFilter))
      .slice()
      .sort((left, right) => {
        const leftValue = `${left.scheduledDate}T${left.startTime}`;
        const rightValue = `${right.scheduledDate}T${right.startTime}`;
        return new Date(leftValue).getTime() - new Date(rightValue).getTime();
      });
  }, [bundle?.scheduleEvents, doctorFilter]);

  useEffect(() => {
    setSchedulePage(1);
  }, [doctorFilter]);

  const schedulePageCount = getPageCount(filteredEvents.length);
  const pagedEvents = paginateItems(filteredEvents, schedulePage);

  useEffect(() => {
    if (schedulePage > schedulePageCount) {
      setSchedulePage(schedulePageCount);
    }
  }, [schedulePage, schedulePageCount]);

  const totalTodayEvents = filteredEvents.filter((event) => event.scheduledDate === new Date().toISOString().slice(0, 10)).length;
  const doctorsOnDuty = new Set(filteredEvents.filter((event) => event.scheduledDate === new Date().toISOString().slice(0, 10)).map((event) => event.doctorUid)).size;
  const linkedAppointments = (bundle?.appointments ?? []).filter((appointment) => (doctorFilter === "all" ? true : appointment.doctorUid === doctorFilter));

  const handleCreateEvent = async () => {
    if (!eventForm.doctorUid || !eventForm.title.trim() || !eventForm.scheduledDate) {
      alert("Cần chọn bác sĩ, nhập tiêu đề và ngày diễn ra.");
      return;
    }

    try {
      const patientProfile = bundle?.patientProfiles.find((profile) => profile.userUid === eventForm.patientUid);
      await upsertScheduleEvent(getMedAssistDataConnect(), {
        id: createClientId("schedule-event"),
        doctorUid: eventForm.doctorUid,
        patientUid: eventForm.patientUid || null,
        title: eventForm.title.trim(),
        eventType: eventForm.eventType,
        department: eventForm.department || null,
        scheduledDate: eventForm.scheduledDate,
        startTime: eventForm.startTime,
        endTime: eventForm.endTime,
        status: "SCHEDULED",
        colorTone: eventForm.priority === "URGENT" ? "red" : "blue",
        roomName: eventForm.roomName || null,
        insuranceNumber: patientProfile?.insuranceNumber || null,
        patientNameOverride: patientProfile?.user.displayName || null,
        timeString: `${eventForm.startTime} - ${eventForm.endTime}`,
        priority: eventForm.priority,
        notes: eventForm.notes || null,
        attachmentsCount: 0,
        displayOrder: filteredEvents.length + 1,
        isCompleted: false,
        isDeleted: false,
      });

      alert("Đã tạo lịch điều phối mới.");
    } catch (error) {
      console.error("Không thể tạo lịch điều phối:", error);
      alert("Không thể tạo lịch điều phối.");
    }
  };

  const handleMarkCompleted = async (event: GetScheduleWorkspaceData["scheduleEvents"][number]) => {
    try {
      await upsertScheduleEvent(getMedAssistDataConnect(), {
        ...event,
        isCompleted: !event.isCompleted,
      });
      alert("Đã cập nhật trạng thái lịch.");
    } catch (error) {
      console.error("Không thể cập nhật lịch:", error);
      alert("Không thể cập nhật trạng thái lịch.");
    }
  };

  return (
    <div className="space-y-6">
      <AdminSection
        eyebrow="Điều phối lịch khám"
        title="Quản lý lịch khám và ca trực"
        description="Tất cả dòng lịch đã được đưa vào khung cuộn dọc và chia 10 dòng mỗi trang."
        actions={
          <div className="min-w-[220px]">
            <AdminSelect value={doctorFilter} onChange={(event) => setDoctorFilter(event.target.value)}>
              <option value="all">Tất cả bác sĩ</option>
              {doctors.map((doctor) => (
                <option key={doctor.uid} value={doctor.uid}>
                  {doctor.displayName}
                </option>
              ))}
            </AdminSelect>
          </div>
        }
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <AdminStatCard icon={Clock3} label="Lịch đang hiển thị" value={String(filteredEvents.length)} helper="Theo bộ lọc bác sĩ hiện tại" tone="blue" />
          <AdminStatCard icon={ShieldCheck} label="Lịch hôm nay" value={String(totalTodayEvents)} helper="Ca trực và lịch điều phối trong ngày" tone="emerald" />
          <AdminStatCard icon={Stethoscope} label="Bác sĩ trực" value={String(doctorsOnDuty)} helper="Số bác sĩ có lịch trong ngày hôm nay" tone="amber" />
          <AdminStatCard icon={RefreshCcw} label="Lịch hẹn liên kết" value={String(linkedAppointments.length)} helper="Lấy từ bảng appointment toàn hệ thống" tone="slate" />
        </div>
      </AdminSection>

      <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
        <AdminSection
          eyebrow="Tạo lịch điều phối"
          title="Khởi tạo ca trực hoặc lịch khám mới"
          description="Dùng khi quản trị cần tạo lịch ngoài luồng hoặc sắp xếp nhanh bệnh nhân cho bác sĩ."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <AdminSelect value={eventForm.doctorUid} onChange={(event) => setEventForm((current) => ({ ...current, doctorUid: event.target.value }))}>
              <option value="">Chọn bác sĩ</option>
              {doctors.map((doctor) => (
                <option key={doctor.uid} value={doctor.uid}>
                  {doctor.displayName}
                </option>
              ))}
            </AdminSelect>
            <AdminSelect value={eventForm.patientUid} onChange={(event) => setEventForm((current) => ({ ...current, patientUid: event.target.value }))}>
              <option value="">Không gán bệnh nhân</option>
              {(bundle?.patientProfiles ?? []).map((profile) => (
                <option key={profile.id} value={profile.userUid}>
                  {profile.user.displayName}
                </option>
              ))}
            </AdminSelect>
            <AdminInput value={eventForm.title} onChange={(event) => setEventForm((current) => ({ ...current, title: event.target.value }))} placeholder="Tiêu đề lịch" className="md:col-span-2" />
            <AdminSelect value={eventForm.eventType} onChange={(event) => setEventForm((current) => ({ ...current, eventType: event.target.value }))}>
              <option value="CONSULTATION">Tư vấn</option>
              <option value="FOLLOW_UP">Tái khám</option>
              <option value="SURGERY_PREP">Chuẩn bị thủ thuật</option>
              <option value="ADMIN_REVIEW">Duyệt quản trị</option>
            </AdminSelect>
            <AdminInput value={eventForm.department} onChange={(event) => setEventForm((current) => ({ ...current, department: event.target.value }))} placeholder="Khoa / phòng ban" />
            <AdminInput type="date" value={eventForm.scheduledDate} onChange={(event) => setEventForm((current) => ({ ...current, scheduledDate: event.target.value }))} />
            <div className="grid grid-cols-2 gap-3">
              <AdminInput type="time" value={eventForm.startTime} onChange={(event) => setEventForm((current) => ({ ...current, startTime: event.target.value }))} />
              <AdminInput type="time" value={eventForm.endTime} onChange={(event) => setEventForm((current) => ({ ...current, endTime: event.target.value }))} />
            </div>
            <AdminInput value={eventForm.roomName} onChange={(event) => setEventForm((current) => ({ ...current, roomName: event.target.value }))} placeholder="Phòng khám" />
            <AdminSelect value={eventForm.priority} onChange={(event) => setEventForm((current) => ({ ...current, priority: event.target.value }))}>
              <option value="NORMAL">Bình thường</option>
              <option value="FOLLOW_UP">Theo dõi</option>
              <option value="URGENT">Khẩn cấp</option>
            </AdminSelect>
            <AdminTextarea rows={4} value={eventForm.notes} onChange={(event) => setEventForm((current) => ({ ...current, notes: event.target.value }))} placeholder="Ghi chú điều phối, dặn dò phòng khám, hồ sơ cần chuẩn bị..." className="md:col-span-2" />
          </div>
          <div className="mt-4">
            <AdminButton onClick={handleCreateEvent}>
              <span className="inline-flex items-center gap-2">
                <CalendarPlus2 className="h-4 w-4" />
                Tạo lịch điều phối
              </span>
            </AdminButton>
          </div>
        </AdminSection>

        <AdminSection
          eyebrow="Danh sách lịch"
          title="Timeline đã rút gọn"
          description="Danh sách bên phải đã có scroll và phân trang, giữ ổn định số dòng hiển thị mỗi lần."
        >
          {isLoading ? (
            <AdminEmptyState message="Đang tải timeline lịch..." />
          ) : filteredEvents.length === 0 ? (
            <AdminEmptyState message="Không có lịch nào theo bộ lọc hiện tại." />
          ) : (
            <>
              <div className="rounded-3xl border border-slate-200 bg-white">
                <div className="grid grid-cols-[minmax(0,1fr)_140px_140px_110px_130px] gap-3 border-b border-slate-100 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  <span>Tiêu đề</span>
                  <span>Ngày</span>
                  <span>Khung giờ</span>
                  <span>Ưu tiên</span>
                  <span>Trạng thái</span>
                </div>
                <AdminScrollViewport heightClass="max-h-[620px]">
                  {pagedEvents.items.map((event) => {
                    const doctor = doctors.find((item) => item.uid === event.doctorUid);
                    return (
                      <div key={event.id} className="grid grid-cols-[minmax(0,1fr)_140px_140px_110px_130px] gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">{event.title}</p>
                          <p className="mt-1 truncate text-xs text-slate-500">{doctor?.displayName || event.doctorUid} • {event.roomName || "Chưa gán phòng"}</p>
                          {event.notes ? <p className="mt-2 text-xs leading-5 text-slate-500">{event.notes}</p> : null}
                        </div>
                        <div className="text-sm text-slate-600">{event.scheduledDate}</div>
                        <div className="text-sm text-slate-600">{event.startTime} - {event.endTime}</div>
                        <div className="text-sm font-medium text-slate-700">{event.priority || "NORMAL"}</div>
                        <div className="flex flex-col items-start gap-2">
                          <span className="text-sm font-medium text-slate-700">{event.status}</span>
                          <AdminButton variant="secondary" onClick={() => handleMarkCompleted(event)} className="px-3 py-2 text-xs">
                            {event.isCompleted ? "Bỏ hoàn tất" : "Đánh dấu hoàn tất"}
                          </AdminButton>
                        </div>
                      </div>
                    );
                  })}
                </AdminScrollViewport>
              </div>
              <AdminPagination
                page={pagedEvents.page}
                pageCount={pagedEvents.pageCount}
                totalItems={filteredEvents.length}
                onPageChange={setSchedulePage}
              />
            </>
          )}
        </AdminSection>
      </div>
    </div>
  );
}

