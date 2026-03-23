"use client";

import { CalendarPlus, Plus, Users } from "lucide-react";

export type ConsultationTimelineItem = {
  id: string;
  status: string;
  badge: string;
  time: string;
  title: string;
  description: string;
  members: string;
  action?: string | null;
};

const DailyTimeline = ({
  dateLabel,
  timelineItems,
  onCreateRoom,
  onCreateGoogleMeetRoom,
  onSelectRoom,
  selectedRoomId,
}: {
  dateLabel: string;
  timelineItems: ConsultationTimelineItem[];
  onCreateRoom: () => void;
  onCreateGoogleMeetRoom: () => void;
  onSelectRoom: (id: string) => void;
  selectedRoomId?: string | null;
}) => {
  return (
    <aside className="flex h-full min-h-[760px] flex-col overflow-hidden rounded-[34px] border border-slate-200/80 bg-white shadow-[0_12px_32px_rgba(148,163,184,0.08)]">
      <div className="px-6 pb-8 pt-8 lg:px-8">
        <h2 className="text-[18px] font-extrabold tracking-tight text-slate-800">LỊCH HẸN HÔM NAY</h2>
        <p className="mt-1 text-[15px] text-[#788aa7]">{dateLabel}</p>
      </div>

      <div className="border-t border-slate-200/70" />

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 lg:px-6">
        {timelineItems.length ? (
          timelineItems.map((item) => {
            const isActive = item.status === "active";
            const isSelected = item.id === selectedRoomId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectRoom(item.id)}
                className={`w-full rounded-[24px] bg-white p-5 text-left shadow-[0_8px_22px_rgba(226,232,240,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(198,210,226,0.28)] ${
                  isSelected
                    ? "border-2 border-[#2f6df5]"
                    : isActive
                      ? "border border-[#9fc4ea]"
                      : "border border-slate-200/80"
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ${
                      isActive ? "bg-[#e8faf0] text-[#1daf77]" : "bg-[#edf3ff] text-[#2f6df5]"
                    }`}
                  >
                    {item.badge}
                  </span>
                  <span className="text-[12px] font-semibold text-[#98a7bf]">{item.time}</span>
                </div>

                <h3 className="text-[16px] font-extrabold text-slate-800">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-[#6e809d]">{item.description}</p>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-[#7b8eaa]">
                    <Users className="h-3.5 w-3.5" />
                    <span className="text-sm font-semibold">{item.members}</span>
                  </div>

                  <span
                    className={`text-[12px] font-bold uppercase ${
                      isSelected ? "text-[#2458c7]" : "text-[#2f6df5]"
                    }`}
                  >
                    {isSelected ? "Đang xem" : item.action || "Xem"}
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="rounded-[22px] border border-dashed border-slate-200 bg-[#fcfdff] p-6 text-center text-sm font-medium text-slate-500">
            Chưa có phòng nào trong ngày hôm nay.
          </div>
        )}
      </div>

      <div className="space-y-3 border-t border-slate-200/70 bg-[#fafbfd] p-5 lg:p-6">
        <button
          type="button"
          onClick={onCreateRoom}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-[18px] bg-[#f1f5f9] text-[15px] font-semibold text-slate-700 transition-colors hover:bg-[#e8eef5]"
        >
          <Plus className="h-4 w-4" />
          <span>Tạo phòng mới</span>
        </button>
        <button
          type="button"
          onClick={onCreateGoogleMeetRoom}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-[18px] bg-[#edf4ff] text-[15px] font-semibold text-[#2f6df5] transition-colors hover:bg-[#e4eefc]"
        >
          <CalendarPlus className="h-4 w-4" />
          <span>Tạo phòng Google Meet</span>
        </button>
      </div>
    </aside>
  );
};

export default DailyTimeline;
