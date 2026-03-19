import React from 'react';
import { MoreVertical, Phone, MapPin, ChevronRight } from 'lucide-react';


export interface PatientData {
  id: string;
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
  address: string;
  priority: string;
  prioritySub: string;
  priorityColor: string;
}

export const PatientGridCard = ({ patient }: { patient: PatientData }) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${patient.avatarColor}`}>
              {patient.initials}
            </div>
            <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${patient.statusColor}`}></div>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 truncate max-w-[130px]">{patient.name}</h3>
            <div className="flex items-center text-xs text-slate-500 gap-1 mt-0.5">
              <span className="font-medium">{patient.patientId}</span>
              <span className="text-slate-300">•</span>
              <span>{patient.age} tuổi</span>
              <span className="text-slate-300">•</span>
              <span>{patient.gender}</span>
            </div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600 p-1 -mr-1">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-3.5 bg-[#4285F4] rounded-full"></div>
          <h4 className="text-[11px] font-bold text-slate-800 tracking-wide">THÔNG TIN Y TẾ</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F8FAFC] rounded-xl p-3 border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">CHẨN ĐOÁN</p>
            <p className={`text-sm font-bold ${patient.diagnosisColor || 'text-slate-700'}`}>{patient.diagnosis}</p>
          </div>
          <div className="bg-[#F8FAFC] rounded-xl p-3 border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">NHÓM MÁU</p>
            <p className="text-sm font-bold text-slate-900">{patient.bloodType}</p>
          </div>
        </div>
      </div>
      <div className="mb-6 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-3.5 bg-[#34A853] rounded-full"></div>
          <h4 className="text-[11px] font-bold text-slate-800 tracking-wide">THÔNG TIN LIÊN HỆ</h4>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <p className="text-sm text-slate-700 font-medium">{patient.phone}</p>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700 font-medium line-clamp-2 leading-snug">{patient.address}</p>
          </div>
        </div>
      </div>
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">MỨC ĐỘ ƯU TIÊN</p>
          <div className="flex items-center gap-1.5">
            <span className={`text-[13px] font-bold ${patient.priorityColor}`}>{patient.priority}</span>
            <span className="text-[11px] text-slate-400">{patient.prioritySub}</span>
          </div>
        </div>
        <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors flex-shrink-0">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};