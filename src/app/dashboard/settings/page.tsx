import { AdminSystemSettings } from "@/features/admin/components/AdminSystemSettings";
import { RoleBasedDashboardView } from "@/features/admin/components/RoleBasedDashboardView";
import { SettingsModel } from '@/features/settings/components/SettingsModel';

export default function SettingsPage() {
  return (
    <RoleBasedDashboardView
      admin={<AdminSystemSettings />}
      doctor={<SettingsModel />}
    />
  );
}
