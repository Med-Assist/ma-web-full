import { AdminPharmacyWorkspace } from "@/features/admin/components/AdminPharmacyWorkspace";
import { RoleBasedDashboardView } from "@/features/admin/components/RoleBasedDashboardView";
import { PharmacyWorkspace } from "@/features/pharmacy/components/PharmacyWorkspace";

export default function PharmacyPage() {
  return (
    <RoleBasedDashboardView
      admin={<AdminPharmacyWorkspace />}
      doctor={<PharmacyWorkspace />}
    />
  );
}
