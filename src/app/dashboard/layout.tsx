"use client";

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import {
  LayoutGrid, FileText, Calendar, Eye, Pill,
  MessageSquare, BarChart2, LogOut
} from 'lucide-react';
import { FloatingChat } from '@/features/chat/FloatingZaloContacts';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const [sidebarAvatar, setSidebarAvatar] = useState('/doctor.png');
  const [sidebarName, setSidebarName] = useState('BS. Danh Nguyễn');

  useEffect(() => {
    const handleProfileUpdate = (e: any) => {
      if (e.detail.avatar !== undefined) setSidebarAvatar(e.detail.avatar); 
      if (e.detail.name !== undefined) setSidebarName(e.detail.name);
    };
    window.addEventListener('profileUpdate', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdate', handleProfileUpdate);
  }, []);

  const navItems = [
    { icon: LayoutGrid, label: 'Trang chủ', path: '/dashboard' },
    { icon: FileText, label: 'Bệnh án điện tử', path: '/dashboard/patient' },
    { icon: Calendar, label: 'Ca trực & Lịch khám', path: '/dashboard/schedule' },
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
                    ? 'bg-gradient-to-r from-[#35678E] to-[#8BB4DC] text-white shadow-md shadow-[#35678E]/20'
                    
                    : 'text-slate-500 hover:bg-blue-50/50 hover:text-[#35678E]'
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
                
                : 'bg-transparent hover:bg-blue-50/50 group'
            }`}
          >
            {sidebarAvatar ? (
              <img
                src={sidebarAvatar}
                alt="Doctor"
                className={`h-10 w-10 flex-shrink-0 rounded-full object-cover border-2 shadow-sm transition-colors ${
                  pathname === '/dashboard/profile' ? 'border-white/40' : 'border-slate-200 group-hover:border-[#8BB4DC]/50'
                }`}
              />
            ) : (
              <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center border-2 shadow-sm font-bold text-xs transition-colors ${
                pathname === '/dashboard/profile' ? 'border-white/40 bg-white/20 text-white' : 'border-slate-200 bg-slate-100 text-slate-500 group-hover:border-[#8BB4DC]/50'
              }`}>
                BS
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold truncate transition-colors ${
                pathname === '/dashboard/profile' ? 'text-white' : 'text-slate-700 group-hover:text-[#35678E]'
              }`}>
                {sidebarName}
              </p>
            </div>
          </Link>
          
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="h-5 w-5 text-slate-400" />
            Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-6 overflow-x-hidden relative">
        {children}
      </main>
      
      <FloatingChat />
      
    </div>
  );
}