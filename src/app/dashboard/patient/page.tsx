import type { Metadata } from "next";
import { PatientFeature } from "@/features/patient/PatientFeature";

export const metadata: Metadata = {
  title: "Hồ sơ bệnh nhân | MedAssist",
  description: "Quản lý hồ sơ bệnh nhân, BHYT và thông tin theo dõi cơ bản.",
};

export default function PatientPage() {
  return <PatientFeature />;
}
