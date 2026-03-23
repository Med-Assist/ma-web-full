"use client";

import { AlertCircle, CalendarClock, Copy, ExternalLink, MessageSquare, Trash2, Users, Video } from "lucide-react";

export type SelectedConsultationRoomData = {
  id: string;
  title: string;
  badge: string;
  status: string;
  timeLabel: string;
  displayDate: string;
  description: string;
  membersLabel: string;
  meetingLink?: string | null;
  canDelete: boolean;
};

const SelectedConsultationRoom = ({
  room,
  onCopyMeeting,
  onOpenMeeting,
  onDeleteRoom,
  isDeleting,
  onBackToAppointment,
}: {
  room: SelectedConsultationRoomData | null;
  onCopyMeeting: () => void;
  onOpenMeeting: () => void;
  onDeleteRoom: () => void;
  isDeleting?: boolean;
  onBackToAppointment?: () => void;
}) => {
  if (!room) {
    return (
      <section className="rounded-[34px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_32px_rgba(148,163,184,0.08)] lg:p-8">
        <div className="rounded-[30px] border border-dashed border-slate-200 bg-[#fcfdff] p-8 text-center text-slate-500">
          Chọn một phòng bên phải để xem thông tin chi tiết tại đây.
        </div>
      </section>
    );
  }

  const hasMeetingLink = Boolean(room.meetingLink);
  const isActiveRoom = room.status === "active";

  return (
    <section className="rounded-[34px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_32px_rgba(148,163,184,0.08)] lg:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-[18px] font-extrabold tracking-tight text-slate-800">CUỘC HẸN HIỆN TẠI</h2>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex rounded-full px-4 py-1.5 text-xs font-bold ${
              isActiveRoom ? "bg-[#e8faf0] text-[#1daf77]" : "bg-[#edf3ff] text-[#2f6df5]"
            }`}
          >
            {isActiveRoom ? "ĐANG DIỄN RA" : "SẮP DIỄN RA"}
          </span>
        </div>
      </div>

      <div className="rounded-[30px] border border-slate-200/80 bg-[#fcfdff] p-5 shadow-[0_18px_45px_rgba(210,220,235,0.15)] lg:p-7">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-24 w-24 items-center justify-center rounded-[22px] bg-[#eaf2fd] text-[#5f8fbe] shadow-[0_14px_30px_rgba(110,140,170,0.16)]">
            <Video className="h-10 w-10" />
          </div>

          <div className="pt-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#84add2]">{room.badge}</p>
            <h3 className="mt-1 text-[40px] font-extrabold tracking-tight text-[#25324a] leading-none">{room.timeLabel}</h3>
            <p className="mt-3 text-[18px] font-semibold text-slate-600">{room.title}</p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <CalendarClock className="h-4 w-4 text-[#7ea2ca]" />
              <span>{room.displayDate}</span>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-[20px] border border-slate-200/80 bg-white px-4 py-4 shadow-[0_8px_22px_rgba(226,232,240,0.35)] sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff1ef] text-[#f2554a]">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Google Meet Link</p>
              <p className="mt-1 truncate text-[15px] font-semibold text-[#568dc9]">
                {room.meetingLink || "Chưa có link Meet cho phòng này"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCopyMeeting}
              disabled={!hasMeetingLink}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Copy className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onOpenMeeting}
              disabled={!hasMeetingLink}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#7b90ae]">
          <Users className="h-4 w-4" />
          <span>{room.membersLabel}</span>
        </div>

        <div className="rounded-[22px] border-l-4 border-[#d7e3f2] bg-[#eef4fb] px-5 py-6">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#7fa9d0]" />
            <span className="text-[12px] font-bold uppercase tracking-wide text-[#7fa9d0]">Mô tả phiên tư vấn</span>
          </div>
          <p className="text-[15px] leading-7 text-slate-600">&ldquo;{room.description}&rdquo;</p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          {onBackToAppointment ? (
            <button
              type="button"
              onClick={onBackToAppointment}
              className="inline-flex h-12 items-center justify-center rounded-[14px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
            >
              Quay lại lịch hẹn
            </button>
          ) : null}
          {room.canDelete ? (
            <button
              type="button"
              onClick={onDeleteRoom}
              disabled={Boolean(isDeleting)}
              className="inline-flex h-12 items-center gap-2 rounded-[14px] bg-[#fff1ef] px-4 text-sm font-semibold text-[#d64f45] transition-colors hover:bg-[#ffe8e4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" />
              {isDeleting ? "Đang xóa..." : "Xóa phòng"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onOpenMeeting}
            disabled={!hasMeetingLink}
            className="flex h-14 flex-1 items-center justify-center gap-3 rounded-[18px] bg-[#7eaad0] px-5 text-lg font-semibold text-white shadow-[0_16px_30px_rgba(126,170,208,0.4)] transition-colors hover:bg-[#6f9dc6] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Video className="h-5 w-5" />
            <span>Vào phòng chờ trực tuyến</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SelectedConsultationRoom;
