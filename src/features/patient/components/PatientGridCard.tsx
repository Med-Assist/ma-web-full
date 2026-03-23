import React from "react";
import { ChevronRight, MapPin, MoreVertical, Phone } from "lucide-react";

export interface PatientData {
  id: string;
  userUid: string;
  initials: string;
  avatarColor: string;
  statusColor: string;
  name: string;
  patientId: string;
  age: number;
  gender: string;
  diagnosis: string;
  diagnosisColor?: string;
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  priority: string;
  prioritySub: string;
  priorityColor: string;
  insuranceNumber: string;
  cccd: string;
  allergies: string;
  occupation: string;
  height: string;
  weight: string;
  lastVisit: string;
}

export const PatientGridCard = ({
  patient,
  onOpen,
}: {
  patient: PatientData;
  onOpen?: (patient: PatientData) => void;
}) => {
  return (
    <div className="flex flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ${patient.avatarColor}`}>
              {patient.initials}
            </div>
            <div className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${patient.statusColor}`} />
          </div>
          <div>
            <h3 className="max-w-[130px] truncate font-bold text-slate-900">{patient.name}</h3>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <span className="font-medium">{patient.patientId}</span>
              <span className="text-slate-300">•</span>
              <span>{patient.age} tuổi</span>
              <span className="text-slate-300">•</span>
              <span>{patient.gender}</span>
            </div>
          </div>
        </div>

        <button type="button" onClick={() => onOpen?.(patient)} className="-mr-1 p-1 text-slate-400 hover:text-slate-600">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-3.5 w-1 rounded-full bg-[#4285F4]" />
          <h4 className="text-[11px] font-bold tracking-wide text-slate-800">THÔNG TIN Y TẾ</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-3">
            <p className="mb-1 text-[10px] font-bold uppercase text-slate-400">Chẩn đoán</p>
            <p className={`text-sm font-bold ${patient.diagnosisColor || "text-slate-700"}`}>{patient.diagnosis}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-3">
            <p className="mb-1 text-[10px] font-bold uppercase text-slate-400">Nhóm máu</p>
            <p className="text-sm font-bold text-slate-900">{patient.bloodType}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex-1">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-3.5 w-1 rounded-full bg-[#34A853]" />
          <h4 className="text-[11px] font-bold tracking-wide text-slate-800">THÔNG TIN LIÊN HỆ</h4>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 flex-shrink-0 text-slate-400" />
            <p className="text-sm font-medium text-slate-700">{patient.phone}</p>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
            <p className="line-clamp-2 text-sm font-medium leading-snug text-slate-700">{patient.address}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase text-slate-400">Mức độ ưu tiên</p>
          <div className="flex items-center gap-1.5">
            <span className={`text-[13px] font-bold ${patient.priorityColor}`}>{patient.priority}</span>
            <span className="text-[11px] text-slate-400">{patient.prioritySub}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpen?.(patient)}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
