"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, Calendar, User, Activity, FileText } from "lucide-react";
import { InvoiceLineItem, InvoiceModel } from "./InvoiceModel";

export type ServiceRecord = {
  id: string;
  serviceName: string;
  specialty: string;
  doctorName: string;
  dateTimeLabel: string;
  diagnosis: string;
  quantity: number;
  unitPrice: number;
  insuranceCoveragePercent: number;
};

interface ServiceDetailsModelProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  serviceRecords: ServiceRecord[];
}

export function ServiceDetailsModel({
  isOpen,
  onClose,
  patientName,
  serviceRecords,
}: ServiceDetailsModelProps) {
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const invoiceCode = useMemo(() => `INV-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}`, []);
  const printedAt = useMemo(
    () =>
      new Date().toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    []
  );

  const invoiceItems: InvoiceLineItem[] = serviceRecords.map((record) => ({
    id: record.id,
    serviceName: record.serviceName,
    quantity: record.quantity,
    unitPrice: record.unitPrice,
    insuranceCoveragePercent: record.insuranceCoveragePercent,
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                Chi tiết dịch vụ bệnh nhân:
                <span className="rounded-full bg-blue-100 px-3 py-0.5 text-sm font-semibold text-blue-700">
                  {patientName}
                </span>
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/50 p-6">
              {serviceRecords.map((service) => (
                <div
                  key={service.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-start gap-3 border-b border-slate-100 pb-4">
                    <div className="rounded-lg bg-blue-50 p-2 text-[#35678E]">
                      <Activity size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{service.serviceName}</h3>
                      <p className="mt-0.5 text-sm font-medium text-[#35678E]">{service.specialty}</p>
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User size={16} className="text-slate-400" />
                      <span>
                        <span className="text-slate-400">Thực hiện:</span> {service.doctorName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={16} className="text-slate-400" />
                      <span>{service.dateTimeLabel}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50 p-3.5">
                    <FileText size={18} className="mt-0.5 shrink-0 text-[#35678E]" />
                    <div>
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Chẩn đoán / Kết luận
                      </span>
                      <p className="text-sm font-medium leading-relaxed text-slate-700">{service.diagnosis}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-white px-6 py-4">
              <button
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                Đóng
              </button>
              <button
                onClick={() => setIsInvoiceOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#35678E] to-[#8BB4DC] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
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
        patientName={patientName}
        invoiceCode={invoiceCode}
        printedAt={printedAt}
        serviceRecords={invoiceItems}
      />
    </AnimatePresence>
  );
}
