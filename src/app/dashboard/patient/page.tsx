import { PatientFeature } from '@/features/patient/PatientFeature';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý Bệnh nhân | MedAssist',
  description: 'Danh sách và hồ sơ bệnh nhân',
};

export default function PatientPage() {
  return <PatientFeature />;
}
