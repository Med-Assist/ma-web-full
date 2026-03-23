import type { Metadata } from "next";
import { AiDiagnosisWorkspace } from "@/features/ai-diagnosis/components/AiDiagnosisWorkspace";

export const metadata: Metadata = {
  title: "Chẩn đoán AI võng mạc | MedAssist",
  description: "Đối chiếu ảnh đáy mắt, kết quả AI và lịch sử chẩn đoán võng mạc.",
};

export default function AiDiagnosisPage() {
  return <AiDiagnosisWorkspace />;
}
