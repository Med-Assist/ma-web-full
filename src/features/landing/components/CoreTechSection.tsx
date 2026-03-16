"use client";

import { motion } from 'framer-motion';
import { Activity, LayoutDashboard, Shield, Zap } from 'lucide-react';
import '@/styles/landing.scss'; 

export const CoreTechSection = () => {
  const features = [
    { icon: Activity, title: 'Chẩn đoán AI', desc: 'Các mô hình học sâu độc quyền được đào tạo trên hàng triệu hình ảnh võng mạc lâm sàng đã được xác minh.' },
    { icon: LayoutDashboard, title: 'Bảng điều khiển Y tế', desc: 'Trung tâm điều khiển tập trung cho dữ liệu bệnh nhân, kết quả AI và theo dõi lịch sử lâm sàng.' },
    { icon: Shield, title: 'Dữ liệu Bảo mật', desc: 'Mã hóa cấp doanh nghiệp với đầy đủ các giao thức tuân thủ HIPAA, GDPR và SOC2.' },
    { icon: Zap, title: 'Tầm soát Nhanh', desc: 'Từ khi tải ảnh lên đến báo cáo chẩn đoán toàn diện trong chưa đầy 60 giây.' }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="py-24 bg-[#0B1121] border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 block">
          Công nghệ cốt lõi
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Độ chính xác chuẩn Y khoa với Tốc độ AI
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-16">
          Nền tảng của chúng tôi tích hợp liền mạch vào cơ sở hạ tầng bệnh viện hiện có đồng thời cung cấp các chẩn đoán tiên tiến nhất.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {features.map((feature, idx) => (
            <div key={idx} className="glass-card">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};