import { AdminScheduleWorkspace } from "@/features/admin/components/AdminScheduleWorkspace";
import { RoleBasedDashboardView } from "@/features/admin/components/RoleBasedDashboardView";
import DoctorSchedulePage from "./doctor-page";

export default function SchedulePage() {
  return (
    <RoleBasedDashboardView
      admin={<AdminScheduleWorkspace />}
      doctor={<DoctorSchedulePage />}
    />
  );
}
