"use client";

import { ChevronRight } from "lucide-react";

export type UpcomingAppointmentItem = {
  id: string;
  day: string;
  date: string;
  title: string;
  time: string;
};

const UpcomingAppointments = ({
  appointments,
  onSelect,
}: {
  appointments: UpcomingAppointmentItem[];
  onSelect: (id: string) => void;
}) => {
  return (
    <section className="rounded-[34px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_32px_rgba(148,163,184,0.08)] lg:p-8">
      <h2 className="mb-5 text-[18px] font-extrabold tracking-tight text-slate-800">LỊCH HẸN SẮP TỚI</h2>

      <div className="space-y-4">
        {appointments.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className="group flex w-full items-center justify-between rounded-[24px] border border-slate-200/80 bg-white px-5 py-5 text-left shadow-[0_8px_22px_rgba(226,232,240,0.18)] transition-all hover:translate-x-0.5 hover:border-[#d7e4f2] hover:shadow-[0_12px_28px_rgba(198,210,226,0.28)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-[54px] w-[54px] shrink-0 flex-col items-center justify-center rounded-[16px] bg-[#f7f9fc] text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <span className="text-[11px] font-bold uppercase tracking-wide text-[#92a1bb]">{item.day}</span>
                <span className="mt-0.5 text-[28px] font-extrabold leading-none text-[#2b364d]">{item.date}</span>
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-slate-800 transition-colors group-hover:text-[#5f86b4]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[15px] text-[#98a8c1]">{item.time}</p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-[#8eb3d7]" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default UpcomingAppointments;
