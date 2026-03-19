"use client";

import React, { useState } from 'react';
import { Search, Filter, List, Grid, UserPlus, ChevronRight as ChevronRightIcon, Home } from 'lucide-react';
import { PatientGridCard, PatientData } from './components/PatientGridCard';


const MOCK_PATIENTS: PatientData[] = [
  { id: '1', initials: 'CK', avatarColor: 'bg-indigo-500', statusColor: 'bg-emerald-500', name: 'Ctk Kazuha', patientId: '#N1TVbG7g', age: 0, gender: 'Khác', diagnosis: 'Chưa quét', bloodType: 'O+', phone: 'N/A', address: '123 Sakura Way, Inazuma', priority: 'ĐỊNH KỲ', prioritySub: '(Khám định kỳ)', priorityColor: 'text-emerald-500' },
  { id: '2', initials: 'KN', avatarColor: 'bg-red-500', statusColor: 'bg-emerald-500', name: 'Kiet Nguyen', patientId: '#nKEdLe1e', age: 18, gender: 'Nam', diagnosis: 'Cấp độ 3', diagnosisColor: 'text-blue-600', bloodType: 'O+', phone: '0987123456', address: '45 Lê Lợi, Quận 1, TP.HCM', priority: 'KHẨN CẤP', prioritySub: '(Yêu cầu Phẫu thuật/Laser)', priorityColor: 'text-red-500' },
  { id: '3', initials: 'DN', avatarColor: 'bg-blue-500', statusColor: 'bg-slate-300', name: 'Danh Nguyễn', patientId: '#XiPc83DE', age: 24, gender: 'Khác', diagnosis: 'Chưa quét', bloodType: 'O+', phone: '0345678901', address: '88 Trần Hưng Đạo, Đà Nẵng', priority: 'ĐỊNH KỲ', prioritySub: '(Khám định kỳ)', priorityColor: 'text-emerald-500' },
  { id: '4', initials: 'DL', avatarColor: 'bg-amber-500', statusColor: 'bg-slate-300', name: 'Danh Le', patientId: '#HZQpnVLA', age: 12, gender: 'Nam', diagnosis: 'Cấp độ 3', diagnosisColor: 'text-blue-600', bloodType: 'O+', phone: '1561642234', address: 'N/A', priority: 'KHẨN CẤP', prioritySub: '(Yêu cầu Phẫu thuật/Laser)', priorityColor: 'text-red-500' },
  { id: '5', initials: 'TN', avatarColor: 'bg-emerald-500', statusColor: 'bg-emerald-500', name: 'Thanh Danh Ngu...', patientId: '#RjTAeE6y', age: 18, gender: 'Nam', diagnosis: 'Chưa quét', bloodType: 'O+', phone: '0348547500', address: 'Vinhome Grand Park, Quận 9, TP.HCM', priority: 'ĐỊNH KỲ', prioritySub: '(Khám định kỳ)', priorityColor: 'text-emerald-500' },
  { id: '6', initials: 'DJ', avatarColor: 'bg-indigo-500', statusColor: 'bg-emerald-500', name: 'Djabbd', patientId: '#aqd7ZaST', age: 12, gender: 'Nam', diagnosis: 'Chưa quét', bloodType: 'O+', phone: 'N/A', address: 'N/A', priority: 'ĐỊNH KỲ', prioritySub: '(Khám định kỳ)', priorityColor: 'text-emerald-500' },
  { id: '7', initials: 'HK', avatarColor: 'bg-purple-500', statusColor: 'bg-emerald-500', name: 'Hokaga', patientId: '#sgU9Fwdr', age: 16, gender: 'Nam', diagnosis: 'Chưa quét', bloodType: 'O+', phone: '0123456789', address: 'Làng Lá, Khu vYc 7', priority: 'ĐỊNH KỲ', prioritySub: '(Khám định kỳ)', priorityColor: 'text-emerald-500' },
  { id: '8', initials: 'DN', avatarColor: 'bg-red-500', statusColor: 'bg-red-500', name: 'Danhne', patientId: '#AqMWnGpp', age: 14, gender: 'Nam', diagnosis: 'Cấp độ 4', diagnosisColor: 'text-blue-600', bloodType: 'O+', phone: 'N/A', address: 'N/A', priority: 'KHẨN CẤP', prioritySub: '(Yêu cầu Phẫu thuật/Laser)', priorityColor: 'text-red-500' }
];

export const PatientFeature = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <div className="flex items-center gap-1.5 text-[#4285F4] font-medium cursor-pointer">
          <Home className="h-4 w-4" />
          <span>Trang chủ</span>
        </div>
        <ChevronRightIcon className="h-4 w-4 text-slate-400" />
        <span className="font-bold text-slate-900">Bệnh án điện tử</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Danh sách Bệnh nhân</h1>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Tìm theo tên hoặc ID..." 
              className="pl-9 pr-4 py-2.5 rounded-full border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full sm:w-64 text-sm transition-all"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
            <Filter className="h-4 w-4 text-slate-400" />
            Bộ lọc
          </button>

          <div className="flex items-center bg-white border border-slate-200 rounded-full p-1 shadow-sm">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-full transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
              title="Xem dạng danh sách"
            >
              <List className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
              title="Xem dạng lưới"
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#35678E] to-[#8BB4DC] hover:opacity-90 text-white rounded-full text-sm font-medium shadow-sm shadow-[#35678E]/20 transition-all">
            <UserPlus className="h-4 w-4" />
            Thêm bệnh nhân
          </button>
        </div>
      </div>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_PATIENTS.map((patient) => (
            <PatientGridCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">HỌ VÀ TÊN</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">GIỚI TÍNH</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">TUỔI</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">CHẨN ĐOÁN</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">SỐ ĐIỆN THOẠI</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">ĐỊA CHỈ</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">NHÓM MÁU</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">MỨC ĐỘ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_PATIENTS.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${patient.avatarColor}`}>
                            {patient.initials}
                          </div>
                          <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${patient.statusColor}`}></div>
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{patient.name}</span>
                          <span className="text-xs text-slate-500 font-medium">{patient.patientId}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{patient.gender}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{patient.age} tuổi</td>
                    <td className="py-4 px-6">
                      <span className={`text-sm font-bold ${patient.diagnosisColor || 'text-slate-600'}`}>{patient.diagnosis}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{patient.phone}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 max-w-[200px] truncate" title={patient.address}>{patient.address}</td>
                    <td className="py-4 px-6 text-sm font-bold text-slate-900">{patient.bloodType}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className={`text-xs font-bold ${patient.priorityColor} flex items-center gap-1`}>
                          {patient.priority}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 whitespace-nowrap">
                          {patient.prioritySub}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-gradient-to-r from-[#35678E] to-[#8BB4DC] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#35678E]/30 transition-transform hover:scale-105 hover:opacity-90 relative">
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">2</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
      </div>
    </div>
  );
};