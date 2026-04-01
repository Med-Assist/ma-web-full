import { AdminFeatureRemoved } from "@/features/admin/components/AdminFeatureRemoved";
import { RoleBasedDashboardView } from "@/features/admin/components/RoleBasedDashboardView";
import { RecordDigitizationWorkspace } from "@/features/record-digitization/components/RecordDigitizationWorkspace";

export default function RecordDigitizationPage() {
  return (
    <RoleBasedDashboardView
      admin={
        <AdminFeatureRemoved
          title="Số hóa hồ sơ đã được gỡ khỏi quản trị"
          description="Khu vực số hóa hồ sơ không còn hiển thị cho quản trị viên và đã được thay bằng các màn điều phối chính."
        />
      }
      doctor={<RecordDigitizationWorkspace />}
    />
  );
}
