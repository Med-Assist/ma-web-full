"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  BarChart2,
  Calendar,
  Eye,
  FileText,
  LayoutGrid,
  LogOut,
  Menu,
  MessageSquare,
  MessageSquareText,
  Pill,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { FloatingChat } from "@/features/chat/FloatingZaloContacts";
import { auth } from "@/shared/lib/firebase";
import { clearRememberedDoctorUid, getActiveDoctorUid } from "@/shared/lib/medassist-runtime";
import {
  clearRememberedRole,
  type MedAssistRole,
  useMedAssistRole,
  useMedAssistUserRecord,
} from "@/shared/lib/medassist-role";
import { DashboardPageHeader } from "@/shared/ui/DashboardPageHeader";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { getDoctorProfileWorkspace } from "@/shared/lib/generated-fdc";

interface DashboardLayoutProps {
  children: ReactNode;
}

type ProfileUpdateDetail = {
  avatar?: string;
  name?: string;
};

type NavItem = {
  icon: LucideIcon;
  label: string;
  path: string;
};

const DOCTOR_MAIN_NAV_ITEMS: NavItem[] = [
  { icon: LayoutGrid, label: "Trang chủ", path: "/dashboard" },
  { icon: FileText, label: "Bệnh án điện tử", path: "/dashboard/patient" },
  { icon: Calendar, label: "Ca trực & Lịch khám", path: "/dashboard/schedule" },
  { icon: Eye, label: "Chẩn đoán AI võng mạc", path: "/dashboard/ai-diagnosis" },
  { icon: Pill, label: "Toa thuốc & Dược phẩm", path: "/dashboard/pharmacy" },
  { icon: MessageSquare, label: "Tư vấn trực tuyến", path: "/dashboard/consultation" },
  { icon: BarChart2, label: "Báo cáo & Thống kê", path: "/dashboard/reports" },
];

const ADMIN_MAIN_NAV_ITEMS: NavItem[] = [
  { icon: LayoutGrid, label: "Trang chủ quản trị", path: "/dashboard" },
  { icon: FileText, label: "Danh sách bệnh nhân", path: "/dashboard/patient" },
  { icon: Calendar, label: "Điều phối lịch khám", path: "/dashboard/schedule" },
  { icon: Eye, label: "Kiểm duyệt AI", path: "/dashboard/ai-diagnosis" },
  { icon: Pill, label: "Toa thuốc & Dược phẩm", path: "/dashboard/pharmacy" },
  { icon: MessageSquare, label: "Điều phối tư vấn", path: "/dashboard/consultation" },
];

const ADMIN_SECONDARY_NAV_ITEMS: NavItem[] = [
  { icon: Settings, label: "Cấu hình hệ thống", path: "/dashboard/settings" },
];

function getPageHeader(pathname: string, role: MedAssistRole) {
  if (pathname === "/dashboard") {
    return {
      icon: LayoutGrid,
      title: role === "admin" ? "Trang chủ quản trị" : "Trang chủ",
    };
  }

  if (pathname.startsWith("/dashboard/patient")) {
    return {
      icon: FileText,
      title: role === "admin" ? "Danh sách bệnh nhân" : "Bệnh án điện tử",
    };
  }

  if (pathname.startsWith("/dashboard/schedule")) {
    return {
      icon: Calendar,
      title: role === "admin" ? "Điều phối lịch khám" : "Ca trực & Lịch khám",
    };
  }

  if (pathname.startsWith("/dashboard/ai-diagnosis")) {
    return {
      icon: Eye,
      title: role === "admin" ? "Kiểm duyệt AI" : "Chẩn đoán AI võng mạc",
    };
  }

  if (pathname.startsWith("/dashboard/record-digitization")) {
    return {
      icon: FileText,
      title: role === "admin" ? "Tính năng đã gỡ khỏi quản trị" : "Số hóa hồ sơ bệnh án",
    };
  }

  if (pathname.startsWith("/dashboard/pharmacy")) {
    return {
      icon: Pill,
      title: role === "admin" ? "Toa thuốc & dược phẩm" : "Toa thuốc & Dược phẩm",
    };
  }

  if (pathname.startsWith("/dashboard/consultation")) {
    return {
      icon: MessageSquareText,
      title: role === "admin" ? "Điều phối tư vấn trực tuyến" : "Tư vấn trực tuyến",
    };
  }

  if (pathname.startsWith("/dashboard/reports")) {
    return {
      icon: BarChart2,
      title: role === "admin" ? "Tính năng đã gỡ khỏi quản trị" : "Báo cáo & Thống kê",
    };
  }

  if (pathname.startsWith("/dashboard/profile")) {
    return {
      icon: UserRound,
      title: role === "admin" ? "Tính năng đã tạm ẩn" : "Hồ sơ bác sĩ",
    };
  }

  if (pathname.startsWith("/dashboard/settings")) {
    return {
      icon: Settings,
      title: role === "admin" ? "Cấu hình hệ thống" : "Cài đặt hệ thống",
    };
  }

  return null;
}

function isItemActive(pathname: string, itemPath: string) {
  if (itemPath === "/dashboard") {
    return pathname === itemPath;
  }

  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

function getIdentityRoleLabel(role: MedAssistRole) {
  if (role === "admin") {
    return "Quản trị viên hệ thống";
  }

  if (role === "patient") {
    return "Người dùng MedAssist";
  }

  return "Bác sĩ phụ trách";
}

function getFallbackName(role: MedAssistRole, uid: string, displayName?: string | null) {
  if (displayName?.trim()) {
    return displayName;
  }

  if (role === "admin") {
    return "Quản trị viên MedAssist";
  }

  return `Bác sĩ ${uid.slice(-4).toUpperCase() || "MA"}`;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { role } = useMedAssistRole();
  const { userRecord } = useMedAssistUserRecord();
  const [sidebarAvatar, setSidebarAvatar] = useState("/doctor.png");
  const [sidebarName, setSidebarName] = useState("MedAssist");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileSidebarPath, setMobileSidebarPath] = useState<string | null>(null);

  const isAdmin = role === "admin";
  const mainNavItems = useMemo(
    () => (isAdmin ? ADMIN_MAIN_NAV_ITEMS : DOCTOR_MAIN_NAV_ITEMS),
    [isAdmin]
  );
  const secondaryNavItems = useMemo(
    () => (isAdmin ? ADMIN_SECONDARY_NAV_ITEMS : []),
    [isAdmin]
  );
  const pageHeader = useMemo(() => getPageHeader(pathname, role), [pathname, role]);
  const sidebarRoleLabel = getIdentityRoleLabel(role);
  const footerProfilePath = isAdmin ? "/dashboard/profile" : "/dashboard/profile";
  const isMobileSidebarOpen = mobileSidebarPath === pathname;
  const closeMobileSidebar = () => setMobileSidebarPath(null);
  const toggleMobileSidebar = () => {
    setMobileSidebarPath((current) => (current === pathname ? null : pathname));
  };

  useEffect(() => {
    let mounted = true;

    const syncSidebarProfile = async () => {
      const currentUid = (userRecord?.uid || auth.currentUser?.uid || getActiveDoctorUid()).trim();
      const fallbackName = getFallbackName(role, currentUid, userRecord?.displayName);
      const fallbackAvatar = userRecord?.photoURL || auth.currentUser?.photoURL || "/doctor.png";

      if (!mounted) {
        return;
      }

      if (!currentUid || role !== "doctor") {
        setSidebarName(fallbackName);
        setSidebarAvatar(fallbackAvatar);
        return;
      }

      try {
        const response = await getDoctorProfileWorkspace(getMedAssistDataConnect(), {
          doctorUid: currentUid,
        });

        if (!mounted) {
          return;
        }

        const doctorProfile = response.data.doctorProfiles[0];
        setSidebarName(doctorProfile?.fullName || fallbackName);
        setSidebarAvatar(doctorProfile?.avatarUrl || fallbackAvatar);
      } catch (error) {
        console.error("Không thể đồng bộ thông tin thanh bên:", error);
        if (!mounted) {
          return;
        }

        setSidebarName(fallbackName);
        setSidebarAvatar(fallbackAvatar);
      }
    };

    void syncSidebarProfile();

    return () => {
      mounted = false;
    };
  }, [role, userRecord?.displayName, userRecord?.photoURL, userRecord?.uid]);

  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const detail = (event as CustomEvent<ProfileUpdateDetail>).detail;
      if (detail.avatar !== undefined) {
        setSidebarAvatar(detail.avatar || "/doctor.png");
      }
      if (detail.name !== undefined) {
        setSidebarName(detail.name || "MedAssist");
      }
    };

    window.addEventListener("profileUpdate", handleProfileUpdate);
    return () => window.removeEventListener("profileUpdate", handleProfileUpdate);
  }, []);

  useEffect(() => {
    if (!isMobileSidebarOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileSidebarOpen]);

  const pageHeaderActions: ReactNode = useMemo(() => {
    if (pathname.startsWith("/dashboard/ai-diagnosis")) {
      const identityLabel = isAdmin
        ? `ADMIN • ${sidebarName}`
        : `${userRecord?.userCode || "BS"} • ${sidebarName}`;

      return (
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <Image
              src={sidebarAvatar}
              alt={sidebarName}
              width={32}
              height={32}
              unoptimized
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="max-w-[170px] truncate text-sm font-semibold text-slate-700 sm:max-w-none">
              {identityLabel}
            </span>
          </div>

          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:text-slate-700">
            <Search className="h-4 w-4" />
          </button>
        </div>
      );
    }

    if (pathname.startsWith("/dashboard/reports")) {
      return (
        <div className="relative w-full min-w-0 lg:w-[320px]">
          <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={isAdmin ? "Tìm bác sĩ, bệnh nhân, chỉ số..." : "Tìm báo cáo..."}
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-4 pr-11 text-sm text-slate-700 outline-none transition-all focus:border-[#7ea9cf] focus:ring-4 focus:ring-[#7ea9cf]/12"
          />
        </div>
      );
    }

    return null;
  }, [isAdmin, pathname, sidebarAvatar, sidebarName, userRecord?.userCode]);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await signOut(auth);
      clearRememberedDoctorUid();
      clearRememberedRole();
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      alert("Không thể đăng xuất lúc này. Vui lòng thử lại.");
      setIsLoggingOut(false);
    }
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = isItemActive(pathname, item.path);

    return (
      <Link
        key={item.path}
        href={item.path}
        onClick={closeMobileSidebar}
        className={`flex items-center gap-3.5 rounded-[18px] border px-3.5 py-3 text-[13px] font-semibold transition-all duration-200 ${
          isActive
            ? "border-white/15 bg-[linear-gradient(90deg,#35678E_0%,#4F7EAA_28%,#76A4CE_72%,#8FB9DD_100%)] text-white shadow-[0_16px_28px_-18px_rgba(53,103,142,0.78)]"
            : "border-transparent text-[#4F6E8D] hover:border-[#d9e7f3] hover:bg-[#edf4fb] hover:text-[#35678E]"
        }`}
      >
        <item.icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? "text-white" : "text-[#86A1BC]"}`} />
        <span className="truncate">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F9] font-sans text-slate-800">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-[268px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:z-10 lg:translate-x-0 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[80px] items-center border-b border-slate-200 px-6">
          <Link href="/dashboard" className="flex items-center gap-2.5" onClick={closeMobileSidebar}>
            <Image
              src="/logo.png"
              alt="MedAssist Logo"
              width={38}
              height={38}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="text-[17px] font-bold tracking-tight text-[#163B63]">MedAssist</span>
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-hidden">
          <nav className="flex-1 px-3.5 py-5">
            <div className="space-y-1.5">{mainNavItems.map(renderNavItem)}</div>

            {secondaryNavItems.length ? (
              <div className="mt-5 border-t border-slate-100 pt-5">
                <div className="space-y-1.5">{secondaryNavItems.map(renderNavItem)}</div>
              </div>
            ) : null}
          </nav>

          <div className="border-t border-slate-200 px-3.5 py-4">
            <Link
              href={footerProfilePath}
              className="mb-2.5 flex items-center gap-2.5 rounded-[20px] border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 transition-colors hover:border-[#9ec1df] hover:bg-[#edf4fb]"
            >
              {sidebarAvatar ? (
                <Image
                  src={sidebarAvatar}
                  alt={sidebarName}
                  width={44}
                  height={44}
                  unoptimized
                  className="h-10 w-10 shrink-0 rounded-full border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-500">
                  {isAdmin ? "QT" : "BS"}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold text-[#183B63]">{sidebarName}</p>
                <p className="truncate text-xs text-slate-500">{sidebarRoleLabel}</p>
              </div>

              {isAdmin ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#35678E]/12 text-[#35678E]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
              ) : null}
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 rounded-[16px] px-3.5 py-2.5 text-left text-[13px] font-semibold text-[#4F6E8D] transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-[18px] w-[18px] text-[#86A1BC]" />
              {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
            </button>
          </div>
        </div>
      </aside>

      {isMobileSidebarOpen ? (
        <button
          type="button"
          aria-label="Đóng menu điều hướng"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-30 bg-slate-900/45 lg:hidden"
        />
      ) : null}

      <main className="relative ml-0 min-w-0 flex-1 overflow-x-hidden p-4 lg:ml-[268px] lg:p-6">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm lg:hidden">
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600"
            aria-label="Mở menu điều hướng"
          >
            {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="mx-3 truncate text-sm font-semibold text-slate-700">
            {pageHeader?.title || "Dashboard"}
          </span>
          <span className="h-9 w-9" />
        </div>

        {pageHeader && !pathname.startsWith("/dashboard/pharmacy") ? (
          <DashboardPageHeader
            icon={pageHeader.icon}
            title={pageHeader.title}
            actions={pageHeaderActions}
          />
        ) : null}

        {children}
      </main>

      <FloatingChat />
    </div>
  );
}
