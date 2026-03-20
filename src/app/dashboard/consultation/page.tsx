"use client";

import ActiveAppointment from "@/features/consultation/components/ActiveAppointment";
import UpcomingAppointments from "@/features/consultation/components/UpcomingAppointments";
import DailyTimeline from "@/features/consultation/components/DailyTimeline";

export default function ConsultationPage() {
  return (
    <div className="flex min-h-full flex-col bg-[#f5f7fb]">
      <div className="flex-1 px-5 py-6 lg:px-7 lg:py-7">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.85fr)_380px]">
          <div className="space-y-7">
            <ActiveAppointment />
            <UpcomingAppointments />
          </div>

          <div className="h-full">
            <DailyTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}
