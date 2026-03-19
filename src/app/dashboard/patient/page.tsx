import { PatientFeature } from '@/features/patient/PatientFeature';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý Bệnh nhân | MedAssist',
  description: 'Danh sách và hồ sơ bệnh nhân',
};

export default function PatientPage() {
  return (
    
    <main className="min-h-screen bg-[#F4F7F9] p-6">
      <PatientFeature />
    </main>
  );
}