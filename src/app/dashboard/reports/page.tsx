import { AdminFeatureRemoved } from "@/features/admin/components/AdminFeatureRemoved";
import { RoleBasedDashboardView } from "@/features/admin/components/RoleBasedDashboardView";
import { ReportsWorkspace } from "@/features/reports/components/ReportsWorkspace";

export default function ReportsPage() {
  return (
    <RoleBasedDashboardView
      admin={
        <AdminFeatureRemoved
          title="Báo cáo điều hành đã được gỡ"
          description="Phần báo cáo điều hành không còn hiển thị trong giao diện quản trị viên theo yêu cầu mới."
        />
      }
      doctor={<ReportsWorkspace />}
    />
  );
}
