"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download } from 'lucide-react';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceModel({ isOpen, onClose }: InvoiceModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-10 overflow-y-auto flex-1 bg-white text-slate-700">
              
              <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-6 mb-8 gap-6 mt-4 md:mt-0">
                <div>
                  <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-4">Hóa đơn dịch vụ</h2>
                  <div className="text-slate-600 space-y-1.5 text-sm">
                    <p><span className="font-semibold text-slate-500 w-24 inline-block">Bệnh nhân:</span> <span className="font-bold text-lg text-[#35678E]">James Dalton</span></p>
                    <p><span className="font-semibold text-slate-500 w-24 inline-block">Mã HĐ:</span> <span className="font-medium">INV-20260315</span></p>
                    <p><span className="font-semibold text-slate-500 w-24 inline-block">Ngày in:</span> <span className="font-medium">15/03/2026</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                  <img src="/logo.png" alt="MedAssist Logo" className="w-10 h-10 object-contain" />
                  <span className="text-2xl font-black tracking-tight text-[#35678E]">MedAssist</span>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8 shadow-sm">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 text-xs uppercase tracking-wider">
                      <th className="px-5 py-4 font-bold text-center w-16">STT</th>
                      <th className="px-5 py-4 font-bold">Tên dịch vụ</th>
                      <th className="px-5 py-4 font-bold text-center w-24">Số lượng</th>
                      <th className="px-5 py-4 font-bold text-right w-32">Đơn giá</th>
                      <th className="px-5 py-4 font-bold text-right w-36">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 text-center text-slate-500">1</td>
                      <td className="px-5 py-4 font-semibold text-slate-800">Khám chuyên khoa</td>
                      <td className="px-5 py-4 text-center font-medium">1</td>
                      <td className="px-5 py-4 text-right text-slate-600">150.000</td>
                      <td className="px-5 py-4 text-right font-bold text-slate-800">150.000</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 text-center text-slate-500">2</td>
                      <td className="px-5 py-4 font-semibold text-slate-800">Xét nghiệm máu sinh hóa</td>
                      <td className="px-5 py-4 text-center font-medium">1</td>
                      <td className="px-5 py-4 text-right text-slate-600">300.000</td>
                      <td className="px-5 py-4 text-right font-bold text-slate-800">300.000</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 text-center text-slate-500">3</td>
                      <td className="px-5 py-4 font-semibold text-slate-800">Siêu âm tim màu</td>
                      <td className="px-5 py-4 text-center font-medium">1</td>
                      <td className="px-5 py-4 text-right text-slate-600">250.000</td>
                      <td className="px-5 py-4 text-right font-bold text-slate-800">250.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                
                <div className="w-full md:w-1/2 space-y-3">
                  <div className="flex justify-between items-center text-slate-600 px-4">
                    <span className="font-medium">Tổng chi phí:</span>
                    <span className="font-bold text-slate-800">700.000 VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-600 px-4 pb-4 border-b border-slate-200">
                    <span className="font-medium">BHYT chi trả (80%):</span>
                    <span className="font-bold">-560.000 VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#F4F7F9] p-5 rounded-2xl border border-blue-100 mt-2 shadow-sm">
                    <span className="font-bold text-slate-800">Cần thanh toán:</span>
                    <span className="text-2xl font-black text-[#35678E]">140.000 VNĐ</span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-4 mt-4 md:mt-0">
                  <div className="flex items-center justify-between bg-blue-50 text-[#35678E] px-5 py-4 rounded-2xl border border-blue-100 shadow-sm">
                    <span className="font-semibold text-sm uppercase tracking-wide">Quầy thanh toán:</span>
                    <span className="text-2xl font-black">Số 03</span>
                  </div>
                  
                  <div className="text-sm text-slate-500 italic bg-slate-50 p-5 rounded-2xl border border-slate-100 h-full">
                    * Vui lòng kiểm tra kỹ thông tin trước khi rời quầy. Hóa đơn điện tử sẽ được gửi về email của quý khách.
                  </div>
                </div>

              </div>

            </div>

            <div className="flex items-center justify-end gap-4 px-8 py-5 border-t border-slate-100 bg-white">
              <button
                className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
              >
                <Download size={18} /> Xuất PDF
              </button>
              <button
                className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#35678E] to-[#8BB4DC] rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-[#35678E]/20"
              >
                <Printer size={18} /> In hóa đơn
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}