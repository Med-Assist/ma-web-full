"use client";

import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { useMedAssistRole } from "@/shared/lib/medassist-role";

export function RoleBasedDashboardView({
  admin,
  doctor,
}: {
  admin: ReactNode;
  doctor: ReactNode;
}) {
  const { isAdmin, isLoading } = useMedAssistRole();

  if (isLoading) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-5 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8db7da]/15 text-[#35678E]">
            <ShieldCheck className="h-6 w-6 animate-pulse" />
          </div>
          <p className="text-sm font-semibold text-slate-700">Đang xác thực quyền truy cập dashboard...</p>
        </div>
      </div>
    );
  }

  return <>{isAdmin ? admin : doctor}</>;
}
