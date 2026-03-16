"use client"; 

import { ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden pt-24 pb-32"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 blur-[100px] rounded-full mix-blend-screen"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              AI CORE V3.0 ĐÃ RA MẮT
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Tái định nghĩa <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Chẩn đoán</span> <br />
              Võng mạc bằng AI.
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
              Mang năng lực chẩn đoán chuyên sâu từ bệnh viện tuyến trên về tận y tế cơ sở với chi phí chỉ bằng 1/10 so với phương pháp truyền thống.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-sm font-semibold text-white hover:from-blue-500 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Vào hệ thống
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                Tìm hiểu thêm
              </button>
            </div>
          </div>

          <div className="relative lg:ml-auto">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-800/50 aspect-[4/5] max-w-md mx-auto shadow-2xl">
              <img
                src="/doctor.png"
                alt="Doctor"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-[#0B1121]/80 backdrop-blur-xl p-4 flex items-center gap-4 shadow-2xl">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <Activity className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400">Phân tích bệnh nhân</p>
                  <p className="text-sm font-medium text-white">ID: #RE-99042</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider">Hoàn tất</p>
                  <p className="text-lg font-bold text-white">98.4% Chính xác</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};