"use client";

import { Plus, Users } from "lucide-react";

const timelineItems = [
  {
    id: "active",
    status: "active",
    badge: "Đang diễn ra",
    time: "10:30 - 11:30",
    title: "Phòng Hội chẩn A1",
    description: "Hội chẩn ca bệnh lý võng mạc tiểu đường (ID:...",
    members: "+3",
    action: "ĐANG XEM",
  },
  {
    id: "lab",
    status: "upcoming",
    badge: "Sắp diễn ra",
    time: "01:00 - 02:30",
    title: "Phòng Lab AI",
    description: "Kiểm định mô hình nhận diện Glaucoma mới v2.4",
    members: "+4",
  },
  {
    id: "telehealth",
    status: "upcoming",
    badge: "Sắp diễn ra",
    time: "03:00 - 04:00",
    title: "Phòng Telehealth 04",
    description: "Tư vấn từ xa cho bệnh nhân tỉnh xa qua nền tảng AI",
    members: "+2",
  },
  {
    id: "seminar",
    status: "upcoming",
    badge: "Sắp diễn ra",
    time: "04:30 - 05:30",
    title: "Phòng Hội thảo Trung tâm",
    description: "Báo cáo tổng kết tháng về hiệu quả chẩn đoán AI",
    members: "+12",
  },
];

const DailyTimeline = () => {
  return (
    <aside className="flex h-full min-h-[760px] flex-col overflow-hidden rounded-[34px] border border-slate-200/80 bg-white shadow-[0_12px_32px_rgba(148,163,184,0.08)]">
      <div className="px-6 pb-8 pt-8 lg:px-8">
        <h2 className="text-[18px] font-extrabold tracking-tight text-slate-800">
          LỊCH HẸN HÔM NAY
        </h2>
        <p className="mt-1 text-[15px] text-[#788aa7]">24 Tháng 5, 2024</p>
      </div>

      <div className="border-t border-slate-200/70" />

      <div className="flex-1 space-y-4 px-5 py-5 lg:px-6">
        {timelineItems.map((item) => {
          const isActive = item.status === "active";

          return (
            <article
              key={item.id}
              className={`rounded-[24px] bg-white p-5 shadow-[0_8px_22px_rgba(226,232,240,0.18)] ${
                isActive
                  ? "border-2 border-[#2f6df5]"
                  : "border border-slate-200/80"
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ${
                    isActive
                      ? "bg-[#e8faf0] text-[#1daf77]"
                      : "bg-[#edf3ff] text-[#2f6df5]"
                  }`}
                >
                  {item.badge}
                </span>
                <span className="text-[12px] font-semibold text-[#98a7bf]">{item.time}</span>
              </div>

              <h3 className="text-[16px] font-extrabold text-slate-800">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-[#6e809d]">
                {item.description}
              </p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[#7b8eaa]">
                  <Users className="h-3.5 w-3.5" />
                  <span className="text-sm font-semibold">{item.members}</span>
                </div>

                {item.action ? (
                  <button className="text-[12px] font-bold uppercase text-[#2f6df5] transition-colors hover:text-[#2458c7]">
                    {item.action}
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      <div className="border-t border-slate-200/70 bg-[#fafbfd] p-5 lg:p-6">
        <button className="flex h-14 w-full items-center justify-center gap-2 rounded-[18px] bg-[#f1f5f9] text-[15px] font-semibold text-slate-700 transition-colors hover:bg-[#e8eef5]">
          <Plus className="h-4 w-4" />
          <span>Đặt phòng mới</span>
        </button>
      </div>
    </aside>
  );
};

export default DailyTimeline;
