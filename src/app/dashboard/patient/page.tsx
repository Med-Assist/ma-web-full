import type { Metadata } from "next";
import { AdminPatientWorkspace } from "@/features/admin/components/AdminPatientWorkspace";
import { RoleBasedDashboardView } from "@/features/admin/components/RoleBasedDashboardView";
import { PatientFeature } from "@/features/patient/PatientFeature";

export const metadata: Metadata = {
  title: "Hồ sơ bệnh nhân | MedAssist",
  description: "Quản lý hồ sơ bệnh nhân, BHYT và thông tin theo dõi cơ bản.",
};

export default function PatientPage() {
  return (
    <RoleBasedDashboardView
      admin={<AdminPatientWorkspace />}
      doctor={<PatientFeature />}
    />
  );
}
