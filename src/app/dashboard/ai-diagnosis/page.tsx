import type { Metadata } from "next";
import { AiDiagnosisWorkspace } from "@/features/ai-diagnosis/components/AiDiagnosisWorkspace";

export const metadata: Metadata = {
  title: "Chuan doan AI vong mac | MedAssist",
  description: "Doi chieu anh day mat, ket qua AI va lich su chan doan vong mac.",
};

export default function AiDiagnosisPage() {
  return <AiDiagnosisWorkspace />;
}
