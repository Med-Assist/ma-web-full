"use client";

import { motion } from 'framer-motion';
import { Activity, Mail, Phone, MapPin, ArrowRight, User, Stethoscope, FileText } from 'lucide-react';
import '@/styles/landing.scss';

export const ContactSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="py-24 bg-[#0B1121]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/5 bg-[#151C2C] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            <div className="p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 mb-8">
                  <Activity className="h-3 w-3" /> TRUNG TÂM HỖ TRỢ
                </div>
                <h2 className="text-4xl sm:text-5xl font-light text-white mb-6 leading-tight">
                  Kết nối Giải pháp <br/>
                  <span className="font-bold text-gradient-cyan">chẩn đoán</span> cùng <br/>
                  <span className="font-semibold text-blue-500">Med-Assist</span>
                </h2>
                <p className="text-slate-400 mb-12 leading-relaxed">
                  Hãy cùng chúng tôi tiên phong trong việc tầm soát sớm bệnh lý võng mạc, mang công nghệ AI đến gần hơn với cộng đồng.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1121] text-cyan-400 border border-white/5">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span className="text-white font-medium">nguyenthanhdanhctk42@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1121] text-cyan-400 border border-white/5">
                      <Phone className="h-5 w-5" />
                    </div>
                    <span className="text-white font-medium">+84 348 547 500</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1121] text-cyan-400 border border-white/5">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="text-white font-medium">TP. Hồ Chí Minh, Việt Nam</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 lg:p-16 bg-[#0B1121]/50 border-l border-white/5">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Họ và Tên</label>
                    <div className="relative">
                      <User className="absolute top-3 left-3 h-5 w-5 text-slate-500 pointer-events-none" />
                      <input type="text" placeholder="Nguyễn Văn A" className="input-dark" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Email Liên hệ</label>
                    <div className="relative">
                      <Mail className="absolute top-3 left-3 h-5 w-5 text-slate-500 pointer-events-none" />
                      <input type="email" placeholder="email@example.com" className="input-dark" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Bạn là ai?</label>
                  <div className="relative">
                    <Stethoscope className="absolute top-3 left-3 h-5 w-5 text-slate-500 pointer-events-none" />
                    <select className="input-dark pr-10 appearance-none" defaultValue="">
                      <option value="" disabled >Chọn vai trò của bạn</option>
                      <option value="doctor">Bác sĩ / Chuyên gia y tế</option>
                      <option value="hospital">Bệnh viện / Phòng khám</option>
                      <option value="patient">Bệnh nhân</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Lời nhắn</label>
                  <div className="relative">
                    <FileText className="absolute top-3 left-3 h-5 w-5 text-slate-500 pointer-events-none" />
                    
                    <textarea 
                      rows={4} 
                      placeholder="Hãy cho chúng tôi biết mong muốn hợp tác..." 
                      className="input-dark pt-3 resize-none"
                    ></textarea>
                  </div>
                </div>

                <button type="button" className="btn-glow-primary w-full">
                  NHẬN TƯ VẤN NGAY <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
};