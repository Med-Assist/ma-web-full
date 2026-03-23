"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Printer, X } from "lucide-react";
import { triggerBrowserPrint } from "@/shared/lib/medassist-runtime";

export type InvoiceLineItem = {
  id: string;
  serviceName: string;
  quantity: number;
  unitPrice: number;
  insuranceCoveragePercent: number;
};

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  invoiceCode: string;
  printedAt: string;
  serviceRecords: InvoiceLineItem[];
}

export function InvoiceModel({
  isOpen,
  onClose,
  patientName,
  invoiceCode,
  printedAt,
  serviceRecords,
}: InvoiceModalProps) {
  const totalCost = serviceRecords.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const coverageRate = serviceRecords[0]?.insuranceCoveragePercent ?? 0;
  const insurancePaid = Math.round((totalCost * coverageRate) / 100);
  const patientPaid = totalCost - insurancePaid;

  const handleDownloadPdf = async () => {
    const { jsPDF } = await import("jspdf/dist/jspdf.es.min.js");
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("MedAssist Invoice", 20, 20);
    doc.setFontSize(11);
    doc.text(`Patient: ${patientName}`, 20, 32);
    doc.text(`Invoice: ${invoiceCode}`, 20, 40);
    doc.text(`Printed: ${printedAt}`, 20, 48);

    let y = 64;
    serviceRecords.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.serviceName} - ${item.quantity} x ${item.unitPrice.toLocaleString("vi-VN")} VND`,
        20,
        y
      );
      y += 10;
    });

    y += 4;
    doc.text(`Total: ${totalCost.toLocaleString("vi-VN")} VND`, 20, y);
    y += 8;
    doc.text(`Insurance: -${insurancePaid.toLocaleString("vi-VN")} VND`, 20, y);
    y += 8;
    doc.text(`Patient pays: ${patientPaid.toLocaleString("vi-VN")} VND`, 20, y);

    doc.save(`invoice-${invoiceCode}.pdf`);
  };

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
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <div className="flex-1 overflow-y-auto bg-white p-8 text-slate-700 md:p-10">
              <div className="mb-8 mt-4 flex flex-col-reverse items-start justify-between gap-6 border-b border-slate-200 pb-6 md:mt-0 md:flex-row md:items-center">
                <div>
                  <h2 className="mb-4 text-3xl font-black uppercase tracking-tight text-slate-800">Hóa đơn dịch vụ</h2>
                  <div className="space-y-1.5 text-sm text-slate-600">
                    <p>
                      <span className="inline-block w-24 font-semibold text-slate-500">Bệnh nhân:</span>{" "}
                      <span className="text-lg font-bold text-[#35678E]">{patientName}</span>
                    </p>
                    <p>
                      <span className="inline-block w-24 font-semibold text-slate-500">Mã HĐ:</span>{" "}
                      <span className="font-medium">{invoiceCode}</span>
                    </p>
                    <p>
                      <span className="inline-block w-24 font-semibold text-slate-500">Ngày in:</span>{" "}
                      <span className="font-medium">{printedAt}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-2">
                  <img src="/logo.png" alt="MedAssist Logo" className="h-10 w-10 object-contain" />
                  <span className="text-2xl font-black tracking-tight text-[#35678E]">MedAssist</span>
                </div>
              </div>

              <div className="mb-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <table className="w-full min-w-[600px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-600">
                      <th className="w-16 px-5 py-4 text-center font-bold">STT</th>
                      <th className="px-5 py-4 font-bold">Tên dịch vụ</th>
                      <th className="w-24 px-5 py-4 text-center font-bold">Số lượng</th>
                      <th className="w-32 px-5 py-4 text-right font-bold">Đơn giá</th>
                      <th className="w-36 px-5 py-4 text-right font-bold">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {serviceRecords.map((record, index) => (
                      <tr key={record.id} className="transition-colors hover:bg-slate-50">
                        <td className="px-5 py-4 text-center text-slate-500">{index + 1}</td>
                        <td className="px-5 py-4 font-semibold text-slate-800">{record.serviceName}</td>
                        <td className="px-5 py-4 text-center font-medium">{record.quantity}</td>
                        <td className="px-5 py-4 text-right text-slate-600">{record.unitPrice.toLocaleString("vi-VN")}</td>
                        <td className="px-5 py-4 text-right font-bold text-slate-800">
                          {(record.quantity * record.unitPrice).toLocaleString("vi-VN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
                <div className="w-full space-y-3 md:w-1/2">
                  <div className="flex items-center justify-between px-4 text-slate-600">
                    <span className="font-medium">Tổng chi phí:</span>
                    <span className="font-bold text-slate-800">{totalCost.toLocaleString("vi-VN")} VND</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 pb-4 text-emerald-600">
                    <span className="font-medium">BHYT chi trả ({coverageRate}%):</span>
                    <span className="font-bold">-{insurancePaid.toLocaleString("vi-VN")} VND</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded-2xl border border-blue-100 bg-[#F4F7F9] p-5 shadow-sm">
                    <span className="font-bold text-slate-800">Cần thanh toán:</span>
                    <span className="text-2xl font-black text-[#35678E]">{patientPaid.toLocaleString("vi-VN")} VND</span>
                  </div>
                </div>

                <div className="mt-4 flex h-full w-full flex-col gap-4 md:mt-0 md:w-1/2">
                  <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-[#35678E] shadow-sm">
                    <span className="text-sm font-semibold uppercase tracking-wide">Quầy thanh toán:</span>
                    <span className="text-2xl font-black">Số 03</span>
                  </div>

                  <div className="h-full rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm italic text-slate-500">
                    * Vui lòng kiểm tra kỹ thông tin trước khi rời quầy. Hóa đơn điện tử sẽ được gửi về email của quý khách.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 border-t border-slate-100 bg-white px-8 py-5">
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-colors hover:bg-orange-600"
              >
                <Download size={18} /> Xuất PDF
              </button>
              <button
                type="button"
                onClick={triggerBrowserPrint}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#35678E] to-[#8BB4DC] px-8 py-3 text-sm font-bold text-white shadow-md shadow-[#35678E]/20 transition-opacity hover:opacity-90"
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
