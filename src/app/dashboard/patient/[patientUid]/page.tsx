import type { Metadata } from "next";
import { AdminPatientDetailWorkspace } from "@/features/admin/components/AdminPatientDetailWorkspace";
import { RoleBasedDashboardView } from "@/features/admin/components/RoleBasedDashboardView";
import { PatientDetailWorkspace } from "@/features/patient/components/PatientDetailWorkspace";

export const metadata: Metadata = {
  title: "Chi tiết bệnh nhân | MedAssist",
  description: "Xem chi tiết bệnh án điện tử, lịch hẹn và lịch sử chẩn đoán của bệnh nhân.",
};

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ patientUid: string }>;
}) {
  const { patientUid } = await params;

  return (
    <RoleBasedDashboardView
      admin={<AdminPatientDetailWorkspace patientUid={patientUid} />}
      doctor={<PatientDetailWorkspace patientUid={patientUid} />}
    />
  );
}
