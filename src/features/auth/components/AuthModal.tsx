"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Stethoscope, Activity, Mail, Lock, Eye, EyeOff, CheckCircle2, X } from 'lucide-react';
import '@/styles/landing.scss';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: { isOpen: boolean, onClose: () => void, initialMode?: 'login' | 'signup' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [role, setRole] = useState('doctor');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const isLogin = mode === 'login';
  const themeColor = isLogin ? 'blue' : 'cyan';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#0B1121] w-full max-w-5xl rounded-[2.5rem] overflow-hidden flex shadow-2xl border border-white/5 relative h-[700px]"
      >
        <button onClick={onClose} className="absolute top-8 right-8 z-50 text-slate-500 hover:text-white transition-colors">
          <X className="h-6 w-6" />
        </button>

        <div className="auth-left-branding">
          <div className="illustration-overlay" />
          <div className="relative z-10 flex items-center gap-3">
            <img 
            src="/logo.png"
            alt="MedAssist Logo" 
            className="h-10 w-auto object-contain" 
            />
            <span className="text-xl font-bold tracking-tight text-white uppercase">
            MedAssist
            </span>
        </div>

         <div className="relative z-10 flex-1 flex items-center justify-center my-8">
            <img 
            src="/phone.png" 
            alt="Illustration"
            className="max-w-[90%] h-auto object-contain drop-shadow-[0_20px_50px_rgba(34,211,238,0.2)]"
            />
        </div>

        <div className="relative z-20 max-w-sm">
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Cổng Thông tin Bệnh nhân <br/> & Chẩn đoán Nâng cao
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
            Truy cập dữ liệu lâm sàng thời gian thực và hồ sơ y tế bảo mật
            </p>
        </div>
        </div>

        <div className="w-full lg:w-1/2 p-12 overflow-y-auto custom-scrollbar bg-[#0B1121]">
          <AnimatePresence mode="wait">
            <motion.div key={mode} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              
              <h1 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'} 
              </h1>
              <p className="text-slate-400 text-sm mb-10">
                {isLogin ? 'Vui lòng nhập thông tin của bạn để truy cập bảng điều khiển bảo mật.' : 'Bắt đầu bằng cách chọn vai trò phù hợp với bạn trong hệ thống.'} 
              </p>

              {!isLogin && <label className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-4 block">BƯỚC 1: CHỌN VAI TRÒ CỦA BẠN</label>}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button type="button" onClick={() => setRole('admin')} className={`role-option ${role === 'admin' ? (isLogin ? 'selected-blue' : 'selected-cyan') : ''}`}>
                  <Shield className={`h-5 w-5 mb-2 ${role === 'admin' ? (isLogin ? 'text-blue-400' : 'text-cyan-400') : 'text-slate-500'}`} />
                  <span className="text-sm font-semibold text-white">Quản trị viên</span>
                </button>
                <button type="button" onClick={() => setRole('doctor')} className={`role-option ${role === 'doctor' ? (isLogin ? 'selected-blue' : 'selected-cyan') : ''}`}>
                  <Stethoscope className={`h-5 w-5 mb-2 ${role === 'doctor' ? (isLogin ? 'text-blue-400' : 'text-cyan-400') : 'text-slate-500'}`} />
                  <span className="text-sm font-semibold text-white">Bác sĩ</span>
                </button>
              </div>

              {!isLogin && <label className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-4 block">BƯỚC 2: THÔNG TIN ĐĂNG KÝ</label>}
              
              <form className="space-y-5" suppressHydrationWarning>
                <div>
                  <label className="text-sm font-medium text-slate-300 block mb-2">Email Công việc</label>
                  <div className="auth-input-group">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
                    <input className={`focus-${themeColor}`} type="email" placeholder={isLogin ? "ten@to-chuc-y-te.org" : "example@healthcare.com"} />
                  </div>
                </div>

                <div className={isLogin ? "" : "grid grid-cols-2 gap-4"}>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-slate-300">Mật khẩu</label>
                      {isLogin && <button className="text-xs text-blue-400 hover:underline">Quên mật khẩu?</button>}
                    </div>
                    <div className="auth-input-group">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
                      <input className={`focus-${themeColor}`} type={showPassword ? "text" : "password"} placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-slate-500">
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="flex-1">
                      <label className="text-sm font-medium text-slate-300 block mb-2">Xác nhận Mật khẩu</label>
                      <div className="auth-input-group">
                        <CheckCircle2 className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
                        <input className="focus-cyan" type="password" placeholder="••••••••" />
                      </div>
                    </div>
                  )}
                </div>

                {isLogin && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <input type="checkbox" className="rounded bg-[#151C2C] border-white/10 text-blue-500" />
                    <span>Ghi nhớ thiết bị này trong 30 ngày</span>
                  </div>
                )}

                <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-lg ${isLogin ? 'btn-glow-primary' : 'bg-cyan-400 text-[#0B1121] hover:bg-cyan-300 shadow-cyan-500/20'}`}>
                  {isLogin ? 'Đăng nhập vào Hệ thống' : 'ĐĂNG KÝ TÀI KHOẢN'} 
                </button>
              </form>

              <div className="relative my-8 flex items-center justify-center">
                <div className="absolute w-full border-t border-white/5" />
                <span className="relative bg-[#0B1121] px-4 text-[10px] uppercase tracking-widest text-slate-500">Hoặc {isLogin ? 'tiếp tục' : 'đăng ký'} với</span> 
              </div>

              <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-white/10 bg-[#151C2C] text-sm font-medium text-white hover:bg-white/5 transition-colors">
                <img src="/google.png" className="h-5 w-5" alt="Google" />
                {isLogin ? 'Tài khoản Google' : 'Tiếp tục với Google'}
              </button>

              <p className="text-center text-sm mt-8 text-slate-400">
                {isLogin ? 'Mới gia nhập mạng lưới y tế?' : 'Đã có tài khoản?'}
                <button onClick={() => setMode(isLogin ? 'signup' : 'login')} className={`ml-2 font-bold hover:underline ${isLogin ? 'text-blue-400' : 'text-cyan-400'}`}>
                   {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                </button>
              </p>

            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};