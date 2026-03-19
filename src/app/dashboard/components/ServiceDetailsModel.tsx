"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Calendar, User, Activity, FileText } from 'lucide-react';
import { useState } from 'react';
import { InvoiceModel } from './InvoiceModel'; // Đảm bảo đúng đường dẫn

interface ServiceRecord {
  id: string;
  name: string;
  specialty: string;
  doctor: string;
  dateTime: string;
  diagnosis: string;
}

// Dữ liệu mẫu (Mock data) theo đúng yêu cầu của bạn
const mockServices: ServiceRecord[] = [
  {
    id: '1',
    name: 'Siêu âm tim màu',
    specialty: 'Khoa Tim mạch',
    doctor: 'BS. Danh Nguyễn',
    dateTime: '09:00 - 15/03/2026',
    diagnosis: 'Hở van tim 2 lá nhẹ. Huyết động ổn định. Đề nghị theo dõi thêm và tái khám sau 3 tháng.'
  },
  {
    id: '2',
    name: 'Xét nghiệm máu sinh hóa',
    specialty: 'Khoa Xét nghiệm',
    doctor: 'BS. Trần Thị B',
    dateTime: '08:30 - 15/03/2026',
    diagnosis: 'Các chỉ số cơ bản trong mức bình thường. Cholesterol hơi cao (5.2 mmol/L).'
  }
];

interface ServiceDetailsModelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceDetailsModel({ isOpen, onClose }: ServiceDetailsModelProps) {
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Lớp nền mờ (Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Nội dung Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                Chi tiết dịch vụ bệnh nhân:
                <span className="font-semibold text-blue-700 bg-blue-100 px-3 py-0.5 rounded-full text-sm">
                  James Dalton
                </span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body (Danh sách dịch vụ cuộn được) */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">
              {mockServices.map((service) => (
                <div key={service.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  {/* Tên dịch vụ & Chuyên khoa */}
                  <div className="flex items-start gap-3 mb-4 border-b border-slate-100 pb-4">
                    <div className="p-2 bg-blue-50 text-[#35678E] rounded-lg">
                      <Activity size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{service.name}</h3>
                      <p className="text-sm text-[#35678E] font-medium mt-0.5">{service.specialty}</p>
                    </div>
                  </div>

                  {/* Thông tin chi tiết */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User size={16} className="text-slate-400" />
                      <span><span className="text-slate-400">Thực hiện:</span> {service.doctor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={16} className="text-slate-400" />
                      <span>{service.dateTime}</span>
                    </div>
                  </div>

                  {/* Chẩn đoán */}
                  <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-100 flex items-start gap-2.5">
                    <FileText size={18} className="text-[#35678E] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Chẩn đoán / Kết luận</span>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">{service.diagnosis}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer (Các nút bấm) */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-white">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Đóng
              </button>
              <button
                onClick={() => setIsInvoiceOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#35678E] to-[#8BB4DC] rounded-xl hover:opacity-90 transition-opacity shadow-sm"
              >
                <Printer size={18} /> In báo cáo
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <InvoiceModel 
        isOpen={isInvoiceOpen} 
        onClose={() => setIsInvoiceOpen(false)} 
      />
    </AnimatePresence>
  );
}