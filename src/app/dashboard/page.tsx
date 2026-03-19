"use client";

import { useState, useEffect } from 'react';
import {
  Search, Bell, Plus, Eye, Calendar,
  MoreVertical, Paperclip, Send, Activity,
  ChevronLeft, ChevronRight, FileText
} from 'lucide-react';

import { getAllUsers } from '../../shared/lib/generated-fdc';

import { ServiceDetailsModel } from './components/ServiceDetailsModel';

export default function DashboardPage() {
  const [chatInput, setChatInput] = useState("");
  
  const [patients, setPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isServiceModelOpen, setIsServiceModelOpen] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllUsers();
        
        const fetchedUsers = response.data.users;
        
        setPatients(fetchedUsers);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu từ Data Connect:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="space-y-6">
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2000"
            alt="Mountain Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="flex items-center gap-4">
            <img
              src="/doctor.png"
              alt="Doctor"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20"
            />
            <div>
              <p className="text-sm text-slate-300 uppercase tracking-wider font-medium">Chào buổi sáng</p>
              <h1 className="text-2xl font-bold">BS. Danh Nguyễn</h1>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl w-full flex items-center gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm mã bệnh nhân, chẩn đoán, hoặc phác đồ nghiên cứu..."
                className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all backdrop-blur-md"
              />
            </div>
            <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-md relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-500 border-2 border-slate-900"></span>
            </button>
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg shadow-blue-500/30">
              <Plus className="h-5 w-5" />
              Báo cáo mới
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold">Ưu tiên hôm nay</h2>
            <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                <Eye className="h-4 w-4" />
              </div>
              <span className="font-medium">4 Phân tích Võng mạc</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Calendar className="h-4 w-4" />
              </div>
              <span className="font-medium">3 Ca tư vấn sắp tới</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-6 right-8 text-right z-10 hidden md:block">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Hệ thống MedAssist v3.0</p>
          <div className="flex items-center justify-end gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-emerald-400 font-medium">Ổn định</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-800">Danh sách chờ</h3>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  {isLoading ? '...' : patients.length} bệnh nhân
                </span>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Xem tất cả</button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
              {isLoading ? (
                <div className="text-sm font-medium text-slate-500 animate-pulse flex items-center gap-2 p-4">
                  <Activity className="h-4 w-4" /> Đang tải dữ liệu từ máy chủ...
                </div>
              ) : patients.length === 0 ? (
                <div className="text-sm font-medium text-slate-500 p-4">Chưa có bệnh nhân nào trong hệ thống.</div>
              ) : (
                patients.map((patient, index) => {
                  const isFirst = index === 0;
                  return (
                    <div key={patient.uid} className={`min-w-[240px] bg-white border ${isFirst ? 'border-2 border-blue-500' : 'border border-slate-200 hover:border-blue-300'} rounded-2xl p-4 shadow-sm relative overflow-hidden cursor-pointer transition-colors`}>
                      {isFirst && <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>}
                      
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${isFirst ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-blue-600'}`}>
                          {isFirst ? 'Đang khám' : 'Tiếp theo'}
                        </span>
                        <span className="text-xs font-medium text-slate-500">10:{45 + index * 15}</span>
                      </div>
                      
                      <h4 className="font-bold text-slate-900 text-lg mb-1 truncate">
                        {patient.displayName && patient.displayName !== "Chưa cập nhật" ? patient.displayName : "Bệnh nhân mới"}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">{patient.email}</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{patient.role}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Đang thực hiện thăm khám</span>
            </div>
            <div className="flex items-center gap-5 mb-8">
              <div className="h-20 w-20 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 70 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">James Dalton</h2>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span>15/04/1979 (45 tuổi)</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>Nam</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Mã: BN-8821</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">Triệu chứng hiện tại</h3>
                <div className="bg-slate-50 rounded-2xl p-4 text-sm text-slate-700 leading-relaxed border border-slate-100">
                  Bệnh nhân báo mờ mắt kéo dài 2 tuần. Đôi khi có hiện tượng chớp sáng ở mắt phải. Đã đo huyết áp bình thường lúc đón tiếp (120/80 mmHg).
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">Hồ sơ khám ngoại viện</h3>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center h-full min-h-[100px]">
                  <FileText className="h-6 w-6 text-slate-400 mb-2" />
                  <p className="text-xs text-slate-500 mb-3">Chưa có dữ liệu từ các cơ sở khác.</p>
                  <button className="text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full transition-colors">
                    + Số hóa hồ sơ
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Dịch vụ</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 bg-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Khám mắt</p>
                    <p className="text-xs text-slate-500">Chuyên sâu</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-emerald-200 bg-emerald-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-emerald-900 text-sm">Chụp ảnh nhãn lực</p>
                    <p className="text-xs text-emerald-700">Vùng hoàng điểm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20"
                onClick={() => setIsServiceModelOpen(true)}>
                Xem chi tiết
              </button>
            </div>

            <ServiceDetailsModel 
              isOpen={isServiceModelOpen} 
              onClose={() => setIsServiceModelOpen(false)} 
            />
          </div>
        </div>

        <div className="xl:col-span-4 flex flex-col h-[calc(100vh-2rem)]">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md">
                    <Activity className="h-5 w-5" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Trợ lý ảo MedAssist</h3>
                  <p className="text-xs text-slate-500">Hệ thống AI chuyên gia y tế</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50">
              <div className="flex justify-center">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">Hôm nay</span>
              </div>
              
              <div className="flex flex-col items-start max-w-[85%]">
                <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm p-4 text-sm leading-relaxed border border-slate-200">
                  Chào bác sĩ, tôi là trợ lý AI MedAssist. Tôi có thể giúp bạn phân tích kết quả võng mạc, tra cứu hồ sơ bệnh nhân hoặc tóm tắt các nghiên cứu y khoa mới nhất. Bạn cần hỗ trợ gì hôm nay?
                </div>
                <span className="text-[10px] text-slate-400 mt-1 ml-1">MedAssist • Vừa xong</span>
              </div>

              <div className="flex flex-col items-end self-end max-w-[85%] ml-auto">
                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-4 text-sm leading-relaxed shadow-md shadow-blue-600/10">
                  Hãy tóm tắt tiền sử bệnh lý và các kết quả xét nghiệm gần đây của bệnh nhân James Dalton.
                </div>
                <span className="text-[10px] text-slate-400 mt-1 mr-1">Đã xem • 10:42 AM</span>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-xl transition-colors shrink-0">
                  <Paperclip className="h-5 w-5" />
                </button>
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Nhập câu hỏi hoặc yêu cầu phân tích dữ liệu lâm sàng..."
                  className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2 text-sm text-slate-800 placeholder-slate-400 max-h-32 min-h-[44px]"
                  rows={1}
                />
                <button className={`p-3 rounded-xl flex items-center justify-center transition-all shrink-0 ${chatInput.trim() ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-3 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Lịch của tôi</h3>
              <div className="flex gap-2">
                <button className="p-1 text-slate-400 hover:text-slate-600"><ChevronLeft className="h-4 w-4" /></button>
                <button className="p-1 text-slate-400 hover:text-slate-600"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-center font-bold text-slate-800 mb-4">Tháng 4, 2024</h4>
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                <span className="text-slate-400 font-medium">T2</span>
                <span className="text-slate-400 font-medium">T3</span>
                <span className="text-slate-400 font-medium">T4</span>
                <span className="text-slate-400 font-medium">T5</span>
                <span className="text-slate-400 font-medium">T6</span>
                <span className="text-slate-400 font-medium">T7</span>
                <span className="text-slate-400 font-medium">CN</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                <span className="py-1.5 text-slate-300">11</span>
                <span className="py-1.5 bg-blue-600 text-white rounded-full font-bold shadow-md shadow-blue-600/30">12</span>
                <span className="py-1.5 text-slate-700 font-medium">13</span>
                <span className="py-1.5 text-slate-700 font-medium">14</span>
                <span className="py-1.5 text-slate-700 font-medium">15</span>
                <span className="py-1.5 text-slate-700 font-medium">16</span>
                <span className="py-1.5 text-slate-700 font-medium">17</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lịch trình hôm nay</h4>
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 w-4 h-4 rounded-full bg-white border-4 border-blue-500 mt-1"></div>
                  <div className="ml-8">
                    <p className="text-xs font-bold text-blue-600 mb-1">09:30 - 10:15</p>
                    <h5 className="font-bold text-slate-900 text-sm mb-1">Hội chẩn Ca #3921</h5>
                    <p className="text-xs text-slate-500 mb-2">Bệnh nhân: Lê Minh</p>
                    <span className="inline-block bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Ưu tiên cao</span>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 w-4 h-4 rounded-full bg-white border-4 border-slate-300 mt-1"></div>
                  <div className="ml-8">
                    <p className="text-xs font-bold text-slate-500 mb-1">11:00 - 12:00</p>
                    <h5 className="font-bold text-slate-900 text-sm mb-1">Phân tích AI Võng mạc</h5>
                    <p className="text-xs text-slate-500">4 mẫu mới từ phòng Lab</p>
                  </div>
                </div>

              </div>
              <button className="w-full mt-8 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Mở lịch trình đầy đủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}