"use client";

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import {
  LayoutGrid, FileText, Calendar, Eye, Pill,
  MessageSquare, BarChart2, LogOut, Activity
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const [sidebarAvatar, setSidebarAvatar] = useState('/doctor.png');
  const [sidebarName, setSidebarName] = useState('BS. Danh Nguyễn');

  useEffect(() => {
    const handleProfileUpdate = (e: any) => {
      // Cho phép nhận giá trị rỗng khi người dùng gỡ ảnh
      if (e.detail.avatar !== undefined) setSidebarAvatar(e.detail.avatar); 
      if (e.detail.name !== undefined) setSidebarName(e.detail.name);
    };
    window.addEventListener('profileUpdate', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdate', handleProfileUpdate);
  }, []);

  const navItems = [
    { icon: LayoutGrid, label: 'Trang chủ', path: '/dashboard' },
    { icon: FileText, label: 'Bệnh án điện tử', path: '/records' },
    { icon: Calendar, label: 'Ca trực & Lịch khám', path: '/schedule' },
    { icon: Eye, label: 'Chẩn đoán AI Võng mạc', path: '/ai-diagnosis' },
    { icon: Pill, label: 'Toa thuốc & Dược phẩm', path: '/pharmacy' },
    { icon: MessageSquare, label: 'Tư vấn trực tuyến', path: '/consultation' },
    { icon: BarChart2, label: 'Báo cáo & Thống kê', path: '/reports' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F9] flex font-sans text-slate-800">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="MedAssist Logo" 
              className="h-8 w-auto object-contain" 
            />
            <span className="text-xl font-bold text-slate-800">MedAssist</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link 
            href="/dashboard/profile"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 cursor-pointer transition-all block ${
              pathname === '/dashboard/profile' 
                ? 'bg-gradient-to-r from-[#35678E] to-[#8BB4DC] shadow-md shadow-[#35678E]/20' 
                : 'bg-slate-50 hover:bg-slate-200'
            }`}
          >
            {/* NẾU CÓ ẢNH THÌ HIỂN THỊ THẺ IMG, NẾU KHÔNG CÓ THÌ HIỂN THỊ CHỮ "BS" */}
            {sidebarAvatar ? (
              <img
                src={sidebarAvatar}
                alt="Doctor"
                className={`h-10 w-10 flex-shrink-0 rounded-full object-cover border-2 shadow-sm ${
                  pathname === '/dashboard/profile' ? 'border-white/40' : 'border-white'
                }`}
              />
            ) : (
              <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center border-2 shadow-sm font-bold text-xs ${
                pathname === '/dashboard/profile' ? 'border-white/40 bg-white/20 text-white' : 'border-white bg-slate-200 text-slate-500'
              }`}>
                BS
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold truncate ${
                pathname === '/dashboard/profile' ? 'text-white' : 'text-slate-900'
              }`}>
                {sidebarName}
              </p>
            </div>
          </Link>
          
          {/* Nút đăng xuất giữ nguyên [cite: 112-116] */}
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-red-600 transition-colors">
            <LogOut className="h-5 w-5 text-slate-400" />
            Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-6 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}