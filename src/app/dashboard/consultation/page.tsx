import { AdminConsultationWorkspace } from "@/features/admin/components/AdminConsultationWorkspace";
import { RoleBasedDashboardView } from "@/features/admin/components/RoleBasedDashboardView";
import DoctorConsultationPage from "./doctor-page";

export default function ConsultationPage() {
  return (
    <RoleBasedDashboardView
      admin={<AdminConsultationWorkspace />}
      doctor={<DoctorConsultationPage />}
    />
  );
}
