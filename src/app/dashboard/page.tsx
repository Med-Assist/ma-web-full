import { AdminDashboardHome } from "@/features/admin/components/AdminDashboardHome";
import { RoleBasedDashboardView } from "@/features/admin/components/RoleBasedDashboardView";
import DoctorDashboardHome from "./doctor-home";

export default function DashboardPage() {
  return (
    <RoleBasedDashboardView
      admin={<AdminDashboardHome />}
      doctor={<DoctorDashboardHome />}
    />
  );
}
