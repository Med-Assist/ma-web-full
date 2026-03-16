// src/shared/ui/Navbar.tsx
"use client";

import { useState } from 'react'; 
import Link from 'next/link';
import { Moon, Globe } from 'lucide-react';
import { AuthModal } from '@/features/auth/components/AuthModal';

export const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B1121]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="MedAssist Logo" 
              className="h-10 w-auto object-contain" 
            />
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              MedAssist<span className="text-cyan-400">.</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/" className="text-white hover:text-cyan-400 transition-colors">Trang chủ</Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">Dịch vụ</Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">Nghiên cứu</Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">Về chúng tôi</Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">Liên hệ</Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 transition-colors">
              <Globe className="h-3.5 w-3.5" /> VI/EN
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-colors">
              <Moon className="h-4 w-4" />
            </button>
            
            <button 
              onClick={() => openAuth('login')}
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            >
              Đăng nhập
            </button>
          </div>

        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
      />
    </>
  );
};