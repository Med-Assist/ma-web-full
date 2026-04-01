import { AdminFeatureRemoved } from "@/features/admin/components/AdminFeatureRemoved";
import { RoleBasedDashboardView } from "@/features/admin/components/RoleBasedDashboardView";
import { DoctorProfileModel } from '@/features/doctor-profile/components/DoctorProfileModel';

export default function ProfilePage() {
  return (
    <RoleBasedDashboardView
      admin={
        <AdminFeatureRemoved
          title="Tính năng admin đã được tạm ẩn"
          description="Trang này hiện không còn dùng trong luồng quản trị hiện tại."
        />
      }
      doctor={<DoctorProfileModel />}
    />
  );
}
