"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  BarChart2,
  Calendar,
  ChevronDown,
  Eye,
  FileText,
  LayoutGrid,
  LogOut,
  MessageSquare,
  MessageSquareText,
  Pill,
  Plus,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import { FloatingChat } from "@/features/chat/FloatingZaloContacts";
import { DashboardPageHeader } from "@/shared/ui/DashboardPageHeader";
import { auth } from "@/shared/lib/firebase";

interface DashboardLayoutProps {
  children: ReactNode;
}

type ProfileUpdateDetail = {
  avatar?: string;
  name?: string;
};

type NavItem = {
  icon: typeof LayoutGrid;
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { icon: LayoutGrid, label: "Trang chủ", path: "/dashboard" },
  { icon: FileText, label: "Bệnh án điện tử", path: "/dashboard/patient" },
  { icon: Calendar, label: "Ca trực & Lịch khám", path: "/dashboard/schedule" },
  { icon: Eye, label: "Chẩn đoán AI Võng mạc", path: "/dashboard/ai-diagnosis" },
  { icon: Pill, label: "Toa thuốc & Dược phẩm", path: "/dashboard/pharmacy" },
  { icon: MessageSquare, label: "Tư vấn trực tuyến", path: "/dashboard/consultation" },
  { icon: BarChart2, label: "Báo cáo & Thống kê", path: "/dashboard/reports" },
];

function getPageHeader(pathname: string) {
  if (pathname === "/dashboard") {
    return { icon: LayoutGrid, title: "Tổng quan" };
  }

  if (pathname.startsWith("/dashboard/patient")) {
    return { icon: FileText, title: "Bệnh án điện tử" };
  }

  if (pathname.startsWith("/dashboard/schedule")) {
    return { icon: Calendar, title: "Ca trực & Lịch khám" };
  }

  if (pathname.startsWith("/dashboard/ai-diagnosis")) {
    return { icon: Eye, title: "Chẩn đoán AI võng mạc" };
  }

  if (pathname.startsWith("/dashboard/record-digitization")) {
    return { icon: FileText, title: "Số hóa hồ sơ bệnh án" };
  }

  if (pathname.startsWith("/dashboard/pharmacy")) {
    return { icon: Pill, title: "Toa thuốc & Dược phẩm" };
  }

  if (pathname.startsWith("/dashboard/consultation")) {
    return { icon: MessageSquareText, title: "Tư vấn trực tiếp" };
  }

  if (pathname.startsWith("/dashboard/reports")) {
    return { icon: BarChart2, title: "Báo cáo & Thống kê" };
  }

  if (pathname.startsWith("/dashboard/profile")) {
    return { icon: UserRound, title: "Hồ sơ bác sĩ" };
  }

  if (pathname.startsWith("/dashboard/settings")) {
    return { icon: Settings, title: "Cài đặt hệ thống" };
  }

  return null;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarAvatar, setSidebarAvatar] = useState("/doctor.png");
  const [sidebarName, setSidebarName] = useState("BS. Danh Nguyễn");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const detail = (event as CustomEvent<ProfileUpdateDetail>).detail;

      if (detail.avatar !== undefined) {
        setSidebarAvatar(detail.avatar);
      }

      if (detail.name !== undefined) {
        setSidebarName(detail.name);
      }
    };

    window.addEventListener("profileUpdate", handleProfileUpdate);
    return () => window.removeEventListener("profileUpdate", handleProfileUpdate);
  }, []);

  const pageHeader = getPageHeader(pathname);
  let pageHeaderActions: ReactNode = null;

  if (pathname.startsWith("/dashboard/ai-diagnosis")) {
    pageHeaderActions = (
      <>
        <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <Image
            src="/doctor.png"
            alt="James Dalton"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-slate-700">ID: 99420 • James Dalton</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:text-slate-700">
          <Search className="h-4 w-4" />
        </button>
      </>
    );
  } else if (pathname.startsWith("/dashboard/pharmacy")) {
    pageHeaderActions = (
      <>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#5a96cb] to-[#6aa7db] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_22px_rgba(90,150,203,0.24)] transition-transform hover:-translate-y-0.5">
          <Plus className="h-4 w-4" />
          Tạo đơn mới
        </button>

        <div className="relative w-full min-w-[260px] lg:w-[320px]">
          <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-4 pr-11 text-sm text-slate-700 outline-none transition-all focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
          />
        </div>
      </>
    );
  } else if (pathname.startsWith("/dashboard/reports")) {
    pageHeaderActions = (
      <div className="relative w-full min-w-[260px] lg:w-[320px]">
        <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          className="w-full rounded-full border border-slate-200 bg-white py-3 pl-4 pr-11 text-sm text-slate-700 outline-none transition-all focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
        />
      </div>
    );
  }

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await signOut(auth);
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      alert("Không thể đăng xuất lúc này. Vui lòng thử lại.");
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F9] font-sans text-slate-800">
      <aside className="fixed z-10 flex h-full w-64 flex-col border-r border-slate-200 bg-white">
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="MedAssist Logo"
              width={124}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
            <span className="text-xl font-bold text-slate-800">MedAssist</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          {navItems.map((item) => {
            const isActive =
              (item.path === "/dashboard" && pathname.startsWith("/dashboard/record-digitization")) ||
              pathname === item.path ||
              (item.path !== "/dashboard" && pathname.startsWith(`${item.path}/`));

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-[#35678E] to-[#8BB4DC] text-white shadow-md shadow-[#35678E]/20"
                    : "text-slate-500 hover:bg-blue-50/50 hover:text-[#35678E]"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <Link
            href="/dashboard/profile"
            className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
              pathname === "/dashboard/profile"
                ? "bg-gradient-to-r from-[#35678E] to-[#8BB4DC] shadow-md shadow-[#35678E]/20"
                : "group hover:bg-blue-50/50"
            }`}
          >
            {sidebarAvatar ? (
              <Image
                src={sidebarAvatar}
                alt="Doctor"
                width={40}
                height={40}
                unoptimized
                className={`h-10 w-10 shrink-0 rounded-full border-2 object-cover shadow-sm transition-colors ${
                  pathname === "/dashboard/profile"
                    ? "border-white/40"
                    : "border-slate-200 group-hover:border-[#8BB4DC]/50"
                }`}
              />
            ) : (
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold shadow-sm transition-colors ${
                  pathname === "/dashboard/profile"
                    ? "border-white/40 bg-white/20 text-white"
                    : "border-slate-200 bg-slate-100 text-slate-500 group-hover:border-[#8BB4DC]/50"
                }`}
              >
                BS
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-sm font-bold transition-colors ${
                  pathname === "/dashboard/profile"
                    ? "text-white"
                    : "text-slate-700 group-hover:text-[#35678E]"
                }`}
              >
                {sidebarName}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-5 w-5 text-slate-400" />
            {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
          </button>
        </div>
      </aside>

      <main className="relative ml-64 flex-1 overflow-x-hidden p-6">
        {pageHeader ? <DashboardPageHeader icon={pageHeader.icon} title={pageHeader.title} actions={pageHeaderActions} /> : null}
        {children}
      </main>

      <FloatingChat />
    </div>
  );
}
