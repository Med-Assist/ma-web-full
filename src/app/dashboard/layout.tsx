"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  FileText,
  Calendar,
  Eye,
  Pill,
  MessageSquare,
  BarChart2,
  LogOut,
} from "lucide-react";
import { FloatingChat } from "@/features/chat/FloatingZaloContacts";

interface DashboardLayoutProps {
  children: ReactNode;
}

type ProfileUpdateDetail = {
  avatar?: string;
  name?: string;
  specialty?: string;
};

const navItems = [
  { icon: LayoutGrid, label: "Trang chủ", path: "/dashboard" },
  { icon: FileText, label: "Bệnh án điện tử", path: "/dashboard/patient" },
  { icon: Calendar, label: "Ca trực & Lịch khám", path: "/dashboard/schedule" },
  { icon: Eye, label: "Chẩn đoán AI Võng mạc", path: "/ai-diagnosis" },
  { icon: Pill, label: "Toa thuốc & Dược phẩm", path: "/pharmacy" },
  { icon: MessageSquare, label: "Tư vấn trực tiếp", path: "/dashboard/consultation" },
  { icon: BarChart2, label: "Báo cáo & Thống kê", path: "/reports" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const isConsultationRoute = pathname === "/dashboard/consultation";

  const [profile, setProfile] = useState({
    avatar: "/doctor.png",
    name: "BS. Danh Nguyễn",
    specialty: "Khoa Tim mạch",
  });

  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const detail = (event as CustomEvent<ProfileUpdateDetail>).detail;

      setProfile((current) => ({
        avatar: detail.avatar ?? current.avatar,
        name: detail.name ?? current.name,
        specialty: detail.specialty ?? current.specialty,
      }));
    };

    window.addEventListener("profileUpdate", handleProfileUpdate as EventListener);

    return () => {
      window.removeEventListener("profileUpdate", handleProfileUpdate as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050c17] p-0 text-slate-800 lg:p-4">
      <div className="mx-auto flex min-h-screen max-w-[1800px] overflow-hidden border border-[#10253c] bg-[#f6f8fb] lg:min-h-[calc(100vh-2rem)] lg:rounded-[40px] lg:shadow-[0_28px_80px_rgba(2,15,35,0.48)]">
        <aside className="hidden w-[296px] shrink-0 border-r border-slate-200/80 bg-white lg:flex lg:flex-col">
          <div className="flex h-20 items-center border-b border-slate-100 px-9">
            <Link href="/dashboard" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="MedAssist"
                className="h-10 w-10 rounded-2xl object-contain"
              />
              <span className="text-[17px] font-extrabold tracking-tight text-slate-800">
                MedAssist
              </span>
            </Link>
          </div>

          <nav className="flex-1 space-y-2 px-6 py-10">
            {navItems.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path !== "/dashboard" && pathname.startsWith(`${item.path}/`));

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 rounded-[16px] px-4 py-3.5 text-[15px] font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#6f9fcd] to-[#86b0d8] text-white shadow-[0_16px_28px_rgba(113,159,205,0.38)]"
                      : "text-[#607393] hover:bg-[#f4f7fb] hover:text-[#4f6688]"
                  }`}
                >
                  <item.icon
                    className={`h-[19px] w-[19px] ${
                      isActive ? "text-white" : "text-[#7184a3]"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-3 px-6 pb-8">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-4 rounded-[22px] border border-slate-100 bg-[#f7f9fc] px-4 py-4 shadow-[0_10px_24px_rgba(148,163,184,0.08)] transition-colors hover:bg-[#f2f6fb]"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-[0_8px_16px_rgba(113,159,205,0.24)]"
              />
              <div className="min-w-0">
                <p className="truncate text-[15px] font-bold text-slate-800">{profile.name}</p>
                <p className="mt-0.5 text-sm text-[#7a8dab]">{profile.specialty}</p>
              </div>
            </Link>

            <button className="flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-[15px] font-medium text-[#607393] transition-colors hover:bg-red-50 hover:text-red-600">
              <LogOut className="h-5 w-5 text-[#7184a3]" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col bg-[#f5f7fb]">
          <main
            className={`flex-1 overflow-x-hidden overflow-y-auto ${
              isConsultationRoute ? "p-0" : "p-4 lg:p-6"
            }`}
          >
            {children}
          </main>
        </div>
      </div>

      <FloatingChat />
    </div>
  );
}
