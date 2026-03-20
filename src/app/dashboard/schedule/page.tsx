"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Search, 
  Download, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Sun, 
  SunDim, 
  Moon, 
  Move, 
  Info,
  Paperclip,
  X,
  User,
  Clock,
  FileText,
  Image as ImageIcon,
  Eye,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export default function SchedulePage() {
  const [view, setView] = useState<'Ngày' | 'Tuần' | 'Tháng'>('Ngày');
  const [offset, setOffset] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [completedEvents, setCompletedEvents] = useState<string[]>([]);
  const [deletedEvents, setDeletedEvents] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [customEvents, setCustomEvents] = useState<any[]>([]);
  const [newForm, setNewForm] = useState({
    patientId: '',
    patientName: '',
    insuranceId: '',
    date: '2023-10-12',
    startTime: '08:00',
    endTime: '09:00'
  });

  const [selectedDepartment, setSelectedDepartment] = useState('Phòng Flem 407');
  const [selectedShift, setSelectedShift] = useState('morning');
  const [availableDoctors, setAvailableDoctors] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSwapShift = (doctorName: string) => {
    setToastMessage(`Đã gửi yêu cầu đổi ca đến ${doctorName}.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const names = ["Nguyễn An", "Trần Đức", "Phạm Mai", "Lê Hoàng", "Vũ Lan", "Đinh Tuấn", "Hoàng Yến", "Bùi Nam", "Ngô Thanh", "Đỗ Dũng"];
    const statuses = ["Sẵn sàng", "Sẵn sàng", "Đang khám"]; 
    const generated = Array.from({ length: 3 }).map((_, i) => {
      const name = names[Math.floor(Math.random() * names.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const isAvailable = status === "Sẵn sàng";
      return {
        id: i,
        name: `BS. ${name}`,
        specialty: isAvailable ? selectedDepartment : "Đang khám",
        isAvailable,
        avatarSeed: Math.floor(Math.random() * 1000)
      };
    });
    setAvailableDoctors(generated);
  }, [selectedDepartment, selectedShift]);

  const handlePatientIdBlur = () => {
    if (newForm.patientId.trim().length > 0) {
      setNewForm(prev => ({
        ...prev,
        patientName: 'Nguyễn Văn Demo',
        insuranceId: '001085000999'
      }));
    } else {
      setNewForm(prev => ({
        ...prev,
        patientName: '',
        insuranceId: ''
      }));
    }
  };

  const handleCreateSubmit = () => {
    if (!newForm.patientName) {
      alert("Vui lòng nhập mã bệnh nhân hợp lệ");
      return;
    }
    const [year, month, day] = newForm.date.split('-');
    const eventDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    const newEvent = {
      id: `custom-${Date.now()}`,
      patientName: newForm.patientName,
      patientId: newForm.patientId,
      insuranceId: newForm.insuranceId,
      date: eventDate,
      startTime: newForm.startTime,
      endTime: newForm.endTime,
      timeString: `Ngày ${newForm.date}, ${newForm.startTime} - ${newForm.endTime}`,
      attachments: [],
      type: 'blue',
      title: `Khám bệnh - ${newForm.patientName}`,
      time: newForm.startTime
    };
    setCustomEvents(prev => [...prev, newEvent]);
    setIsCreateModalOpen(false);
    setNewForm({
      patientId: '',
      patientName: '',
      insuranceId: '',
      date: '2023-10-12',
      startTime: '08:00',
      endTime: '09:00'
    });
  };

  const handleEventClick = (eventData: any) => {
    setSelectedEvent(eventData);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleMarkComplete = () => {
    if (selectedEvent && selectedEvent.id) {
      setCompletedEvents(prev => {
        if (prev.includes(selectedEvent.id)) {
          return prev.filter(id => id !== selectedEvent.id);
        }
        return [...prev, selectedEvent.id];
      });
      closeModal();
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent && selectedEvent.id) {
      setDeletedEvents(prev => [...prev, selectedEvent.id]);
      closeModal();
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent]);

  const handleViewChange = (newView: 'Ngày' | 'Tuần' | 'Tháng') => {
    setView(newView);
    setOffset(0);
  };

  let todayText = "Hôm nay";
  if (offset !== 0) {
    const absOffset = Math.abs(offset);
    const unit = view === 'Ngày' ? 'ngày' : view === 'Tuần' ? 'tuần' : 'tháng';
    const direction = offset < 0 ? 'trước' : 'sau';
    todayText = `${absOffset} ${unit} ${direction}`;
  }

  // Day View Calculations
  const baseDay = new Date(2023, 9, 12); // Oct 12, 2023
  baseDay.setDate(baseDay.getDate() + offset);
  const dayOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][baseDay.getDay()];
  const dayString = `${dayOfWeek}, ${baseDay.getDate()} Tháng ${baseDay.getMonth() + 1}, ${baseDay.getFullYear()}`;

  // Week View Calculations
  const baseWeekStart = new Date(2023, 9, 9); // Oct 9, 2023
  baseWeekStart.setDate(baseWeekStart.getDate() + offset * 7);
  const weekDays = Array.from({length: 7}).map((_, i) => {
    const d = new Date(baseWeekStart);
    d.setDate(d.getDate() + i);
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const isToday = offset === 0 && i === 3;
    return { name: dayNames[d.getDay()], date: d.getDate(), isToday, fullDate: d };
  });

  // Month View Calculations
  const baseMonthDate = new Date(2023, 9, 1); // Oct 1, 2023
  baseMonthDate.setMonth(baseMonthDate.getMonth() + offset);
  
  const currentYear = baseMonthDate.getFullYear();
  const currentMonth = baseMonthDate.getMonth();
  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
  
  const monthDays = [];
  
  // Previous month days
  for (let i = 0; i < startingDayOfWeek; i++) {
    monthDays.push({
      date: daysInPrevMonth - startingDayOfWeek + i + 1,
      isCurrentMonth: false,
      isToday: false,
      fullDate: new Date(currentYear, currentMonth - 1, daysInPrevMonth - startingDayOfWeek + i + 1)
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = offset === 0 && i === 12 && currentMonth === 9 && currentYear === 2023; // Hardcoded today as Oct 12, 2023
    monthDays.push({
      date: i,
      isCurrentMonth: true,
      isToday: isToday,
      fullDate: new Date(currentYear, currentMonth, i)
    });
  }
  
  // Next month days
  const remainingCells = 42 - monthDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    monthDays.push({
      date: i,
      isCurrentMonth: false,
      isToday: false,
      fullDate: new Date(currentYear, currentMonth + 1, i)
    });
  }

  const monthEvents = [
    { id: 'month-1', date: new Date(2023, 9, 10), title: 'Khám tổng quát', time: '08:30', type: 'green' },
    { id: 'month-2', date: new Date(2023, 9, 11), title: 'Xét nghiệm máu', time: '10:45', type: 'blue' },
    { id: 'month-3', date: new Date(2023, 9, 12), title: 'Khám từ xa', time: '08:00', type: 'orange' },
    { id: 'month-4', date: new Date(2023, 9, 12), title: 'Họp chuyên môn', time: '14:00', type: 'blue' },
    { id: 'month-5', date: new Date(2023, 9, 13), title: 'Nội soi dạ dày', time: '10:00', type: 'purple' },
    { id: 'month-6', date: new Date(2023, 9, 18), title: 'Hội chẩn ca khó', time: '15:00', type: 'red' },
    { id: 'month-7', date: new Date(2023, 9, 25), title: 'Khám định kỳ', time: '09:00', type: 'green' },
    { id: 'month-8', date: new Date(2023, 10, 2), title: 'Họp giao ban', time: '08:00', type: 'blue' },
    { id: 'month-9', date: new Date(2023, 8, 28), title: 'Kiểm tra thiết bị', time: '16:00', type: 'orange' },
  ];

  // Month Title
  let currentMonthStr = "Tháng 10, 2023";
  if (view === 'Ngày') {
    currentMonthStr = `Tháng ${baseDay.getMonth() + 1}, ${baseDay.getFullYear()}`;
  } else if (view === 'Tuần') {
    const thursday = new Date(baseWeekStart);
    thursday.setDate(thursday.getDate() + 3);
    currentMonthStr = `Tháng ${thursday.getMonth() + 1}, ${thursday.getFullYear()}`;
  } else if (view === 'Tháng') {
    currentMonthStr = `Tháng ${baseMonthDate.getMonth() + 1}, ${baseMonthDate.getFullYear()}`;
  }

  return (
    <div className="space-y-6">
    <div className="w-full">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <div className="flex items-center gap-1.5 text-[#4285F4] font-medium cursor-pointer hover:underline">
          <Calendar className="h-4 w-4" /> 
          <span>Trang chủ</span>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-400" />
        <span className="font-bold text-slate-900">Ca trực và lịch khám</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Ca trực và lịch khám</h1>
          <p className="text-slate-500 text-sm mt-1">Quản lý khung giờ làm việc và điều phối cuộc hẹn chẩn đoán AI</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} /> Xuất báo cáo
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)} 
            className="flex items-center gap-2 px-4 py-2.5 bg-[#638BB5] text-white rounded-xl text-sm font-semibold hover:bg-[#527a9f] transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Plus size={16} /> Tạo lịch mới
          </button>
        </div>
      </div>
    </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-slate-900">{currentMonthStr}</h2>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1">
                <button onClick={() => setOffset(o => o - 1)} className="p-1 hover:bg-white rounded-md text-slate-500 transition-colors"><ChevronLeft size={16} /></button>
                <button onClick={() => setOffset(0)} className="px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-white rounded-md transition-colors min-w-[110px] text-center">{todayText}</button>
                <button onClick={() => setOffset(o => o + 1)} className="p-1 hover:bg-white rounded-md text-slate-500 transition-colors"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1 text-sm font-semibold">
              <button 
                onClick={() => handleViewChange('Ngày')}
                className={`px-4 py-1.5 rounded-md transition-colors ${view === 'Ngày' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Ngày
              </button>
              <button 
                onClick={() => handleViewChange('Tuần')}
                className={`px-4 py-1.5 rounded-md transition-colors ${view === 'Tuần' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Tuần
              </button>
              <button 
                onClick={() => handleViewChange('Tháng')}
                className={`px-4 py-1.5 rounded-md transition-colors ${view === 'Tháng' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Tháng
              </button>
            </div>
          </div>

          {view === 'Tuần' && (
            <div className="flex-1 border border-slate-100 rounded-xl overflow-hidden flex flex-col">
              <div className="flex border-b border-slate-100 bg-slate-50/50 pr-1 sm:pr-2 md:pr-3">
                <div className="w-16 shrink-0 p-3 border-r border-slate-100"></div>
                <div className="flex-1 grid grid-cols-7">
                  {weekDays.map((day, i) => (
                    <div key={i} className={`p-2 text-center ${day.isToday ? 'text-blue-600' : 'text-slate-500'} ${i < 6 ? 'border-r border-slate-100' : ''}`}>
                      <div className="text-xs font-bold">{day.name} {day.isToday && '(NAY)'}</div>
                      <div className={`text-sm font-bold mt-1 ${day.isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full mx-auto flex items-center justify-center' : 'text-slate-700'}`}>
                        {day.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto relative min-h-[500px] custom-scrollbar flex">
                <div className="w-16 shrink-0 border-r border-slate-100 flex flex-col bg-white">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className="h-20 border-b border-slate-100 p-2 text-xs font-medium text-slate-400 text-right">
                      {(i + 8).toString().padStart(2, '0')}:00
                    </div>
                  ))}
                </div>
                <div className="flex-1 grid grid-cols-7 bg-white relative">
                  {Array.from({length: 7}).map((_, col) => (
                    <div key={col} className={`flex flex-col ${col < 6 ? 'border-r border-slate-100' : ''} relative`}>
                      {Array.from({length: 10}).map((_, row) => (
                        <div key={row} className="h-20 border-b border-slate-100/50"></div>
                      ))}
                      
                      {col === 1 && !deletedEvents.includes('week-1') && (
                        <div 
                          onClick={() => handleEventClick({
                            id: 'week-1',
                            patientName: "Lê Văn C",
                            patientId: "0112233445",
                            insuranceId: "001085000789",
                            timeString: "Thứ 2, 08:30 - 09:15",
                            attachments: []
                          })}
                          className={`absolute top-[10px] left-2 right-2 bg-green-100/80 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${completedEvents.includes('week-1') ? 'border-2 border-green-500 border-solid' : 'border-2 border-transparent'}`}
                        >
                          <p className="text-xs font-bold text-green-800">Khám tổng quát</p>
                          <p className="text-[10px] font-medium text-green-600 mt-0.5">08:30 - 09:15</p>
                        </div>
                      )}
                      {col === 2 && !deletedEvents.includes('week-2') && (
                        <div 
                          onClick={() => handleEventClick({
                            id: 'week-2',
                            patientName: "Phạm Thị D",
                            patientId: "0987654321",
                            insuranceId: "001085000123",
                            timeString: "Thứ 3, 10:45 - 11:30",
                            attachments: []
                          })}
                          className={`absolute top-[160px] left-2 right-2 bg-blue-100/80 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${completedEvents.includes('week-2') ? 'border-2 border-green-500 border-solid' : 'border-2 border-transparent'}`}
                        >
                          <p className="text-xs font-bold text-blue-800">Xét nghiệm máu</p>
                          <p className="text-[10px] font-medium text-blue-600 mt-0.5">10:45 - 11:30</p>
                        </div>
                      )}
                      {col === 3 && (
                        <>
                          {!deletedEvents.includes('week-3') && (
                            <div 
                              onClick={() => handleEventClick({
                                id: 'week-3',
                                patientName: "Nguyễn Văn A",
                                patientId: "0123456789",
                                insuranceId: "001085000123",
                                timeString: "Thứ 4, 08:00 - 08:30",
                                attachments: [
                                  { name: "Hoso_Benhan.pdf", type: "pdf" }
                                ]
                              })}
                              className={`absolute top-[0px] left-2 right-2 bg-orange-100/80 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${completedEvents.includes('week-3') ? 'border-2 border-green-500 border-solid' : 'border-2 border-transparent'}`}
                            >
                              <p className="text-xs font-bold text-orange-800">Khám từ xa</p>
                              <p className="text-[10px] font-medium text-orange-600 mt-0.5">08:00 - 08:30</p>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <img src="https://picsum.photos/seed/doctor1/100/100" referrerPolicy="no-referrer" className="w-4 h-4 rounded-full object-cover" alt="BS" />
                                <span className="text-[10px] font-bold text-orange-800">BS. Hương</span>
                              </div>
                            </div>
                          )}
                          {!deletedEvents.includes('week-4') && (
                            <div 
                              onClick={() => handleEventClick({
                                id: 'week-4',
                                patientName: "Họp chuyên môn",
                                patientId: "N/A",
                                insuranceId: "N/A",
                                timeString: "Thứ 4, 14:00 - 15:30",
                                attachments: []
                              })}
                              className={`absolute top-[400px] left-2 right-2 bg-blue-100/80 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${completedEvents.includes('week-4') ? 'border-2 border-green-500 border-solid' : 'border-2 border-transparent'}`}
                            >
                              <p className="text-xs font-bold text-blue-800">Họp chuyên môn</p>
                              <p className="text-[10px] font-medium text-blue-600 mt-0.5">14:00 - 15:30</p>
                            </div>
                          )}
                        </>
                      )}
                      {col === 4 && !deletedEvents.includes('week-5') && (
                        <div 
                          onClick={() => handleEventClick({
                            id: 'week-5',
                            patientName: "Trần Thị B",
                            patientId: "0987654321",
                            insuranceId: "001085000456",
                            timeString: "Thứ 5, 10:00 - 11:00",
                            attachments: [
                              { name: "ChiDinh_NoiSoi.pdf", type: "pdf" }
                            ]
                          })}
                          className={`absolute top-[160px] left-2 right-2 bg-purple-100/80 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${completedEvents.includes('week-5') ? 'border-2 border-green-500 border-solid' : 'border-2 border-transparent'}`}
                        >
                          <p className="text-xs font-bold text-purple-800">Nội soi dạ dày</p>
                          <p className="text-[10px] font-medium text-purple-600 mt-0.5">10:00 - 11:00</p>
                        </div>
                      )}

                      {customEvents.filter(e => 
                        e.date.getDate() === weekDays[col].fullDate.getDate() && 
                        e.date.getMonth() === weekDays[col].fullDate.getMonth() && 
                        e.date.getFullYear() === weekDays[col].fullDate.getFullYear() &&
                        !deletedEvents.includes(e.id)
                      ).map(event => {
                        const startHour = parseInt(event.startTime.split(':')[0]) + parseInt(event.startTime.split(':')[1])/60;
                        const top = (startHour - 8) * 80;
                        return (
                          <div 
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            className={`absolute left-2 right-2 bg-blue-100/80 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${completedEvents.includes(event.id) ? 'border-2 border-green-500 border-solid' : 'border-2 border-transparent'}`}
                            style={{ top: `${top}px` }}
                          >
                            <p className="text-xs font-bold text-blue-800">{event.title}</p>
                            <p className="text-[10px] font-medium text-blue-600 mt-0.5">{event.startTime} - {event.endTime}</p>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === 'Ngày' && (
            <div className="flex-1 border border-slate-100 rounded-xl overflow-hidden flex flex-col">
              <div className="border-b border-slate-100 bg-slate-50/50 flex pr-1 sm:pr-2 md:pr-3">
                <div className="w-16 p-3 text-center text-xs font-medium text-slate-400 border-r border-slate-100 shrink-0"></div>
                <div className="flex-1 p-3 text-center text-sm font-bold text-blue-600">
                  {dayString}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto relative min-h-[500px] custom-scrollbar flex">
                <div className="w-16 border-r border-slate-100 flex flex-col bg-white shrink-0">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className="h-32 border-b border-slate-100 p-2 text-xs font-medium text-slate-400 text-right">
                      {(i + 8).toString().padStart(2, '0')}:00
                    </div>
                  ))}
                </div>
                <div className="flex-1 relative flex flex-col bg-white">
                  {Array.from({length: 10}).map((_, row) => (
                    <div key={row} className="h-32 border-b border-slate-100/50"></div>
                  ))}
                  
                  {!deletedEvents.includes('day-1') && (
                    <div 
                      onClick={() => handleEventClick({
                        id: 'day-1',
                        patientName: "Nguyễn Văn A",
                        patientId: "0123456789",
                        insuranceId: "001085000123",
                        timeString: "Hôm nay, 08:00 - 09:30",
                        attachments: [
                          { name: "Hoso_Benhan.pdf", type: "pdf" },
                          { name: "XQuang_TimPhoi.jpg", type: "image" }
                        ]
                      })}
                      className={`absolute top-[0px] left-4 right-4 bg-orange-100/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${completedEvents.includes('day-1') ? 'border-2 border-green-500 border-solid' : 'border-2 border-transparent'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-bold text-orange-900">Khám từ xa - Bệnh nhân: Nguyễn Văn A</p>
                          <p className="text-xs font-medium text-orange-700 mt-1">08:00 - 09:30</p>
                        </div>
                        <div className="flex items-center gap-2 bg-white/60 px-2 py-1 rounded-lg">
                          <img src="https://picsum.photos/seed/doctor1/100/100" referrerPolicy="no-referrer" className="w-5 h-5 rounded-full object-cover" alt="BS" />
                          <span className="text-xs font-bold text-orange-900">BS. Hương</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-lg text-xs font-medium text-orange-800">
                          <Paperclip size={14} />
                          <span>Hoso_Benhan.pdf</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-lg text-xs font-medium text-orange-800">
                          <Paperclip size={14} />
                          <span>XQuang_TimPhoi.jpg</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {!deletedEvents.includes('day-2') && (
                    <div 
                      onClick={() => handleEventClick({
                        id: 'day-2',
                        patientName: "Trần Thị B",
                        patientId: "0987654321",
                        insuranceId: "001085000456",
                        timeString: "Hôm nay, 10:00 - 11:00",
                        attachments: [
                          { name: "ChiDinh_NoiSoi.pdf", type: "pdf" }
                        ]
                      })}
                      className={`absolute top-[256px] left-4 right-4 bg-purple-100/80 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${completedEvents.includes('day-2') ? 'border-2 border-green-500 border-solid' : 'border-2 border-transparent'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-bold text-purple-900">Nội soi dạ dày - Bệnh nhân: Trần Thị B</p>
                          <p className="text-xs font-medium text-purple-700 mt-1">10:00 - 11:00</p>
                        </div>
                        <div className="flex items-center gap-2 bg-white/60 px-2 py-1 rounded-lg">
                          <img src="https://picsum.photos/seed/doctor5/100/100" referrerPolicy="no-referrer" className="w-5 h-5 rounded-full object-cover" alt="BS" />
                          <span className="text-xs font-bold text-purple-900">BS. Danh Nguyễn</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-800">
                          <Paperclip size={14} />
                          <span>ChiDinh_NoiSoi.pdf</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {customEvents.filter(e => 
                    e.date.getDate() === baseDay.getDate() && 
                    e.date.getMonth() === baseDay.getMonth() && 
                    e.date.getFullYear() === baseDay.getFullYear() &&
                    !deletedEvents.includes(e.id)
                  ).map(event => {
                    const startHour = parseInt(event.startTime.split(':')[0]) + parseInt(event.startTime.split(':')[1])/60;
                    const top = (startHour - 8) * 128;
                    return (
                      <div 
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className={`absolute left-4 right-4 bg-blue-100/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${completedEvents.includes(event.id) ? 'border-2 border-green-500 border-solid' : 'border-2 border-transparent'}`}
                        style={{ top: `${top}px` }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-bold text-blue-900">{event.title}</p>
                            <p className="text-xs font-medium text-blue-700 mt-1">{event.startTime} - {event.endTime}</p>
                          </div>
                          <div className="flex items-center gap-2 bg-white/60 px-2 py-1 rounded-lg">
                            <img src="https://picsum.photos/seed/doctor1/100/100" referrerPolicy="no-referrer" className="w-5 h-5 rounded-full object-cover" alt="BS" />
                            <span className="text-xs font-bold text-blue-900">BS. Mới</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {view === 'Tháng' && (
            <div className="flex-1 border border-slate-100 rounded-xl overflow-hidden flex flex-col bg-white min-h-[600px]">
              <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
                {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, i) => (
                  <div key={i} className={`p-3 text-center text-xs font-bold text-slate-500 ${i < 6 ? 'border-r border-slate-100' : ''}`}>
                    {day}
                  </div>
                ))}
              </div>
              <div className="flex-1 grid grid-cols-7 grid-rows-6">
                {monthDays.map((day, i) => {
                  const allMonthEvents = [...monthEvents, ...customEvents];
                  const dayEvents = allMonthEvents.filter(e => 
                    e.date.getDate() === day.fullDate.getDate() && 
                    e.date.getMonth() === day.fullDate.getMonth() && 
                    e.date.getFullYear() === day.fullDate.getFullYear()
                  );

                  return (
                    <div key={i} className={`min-h-[100px] p-1.5 border-b border-slate-100 ${i % 7 !== 6 ? 'border-r border-slate-100' : ''} ${!day.isCurrentMonth ? 'bg-slate-50/50' : ''}`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${day.isToday ? 'bg-blue-600 text-white' : day.isCurrentMonth ? 'text-slate-700' : 'text-slate-400'}`}>
                          {day.date}
                        </span>
                      </div>
                      <div className="space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar pr-1">
                        {dayEvents.filter(e => !deletedEvents.includes(e.id)).map((event, idx) => (
                          <div key={idx} 
                            onClick={() => handleEventClick({
                              id: event.id,
                              patientName: "Bệnh nhân mẫu",
                              patientId: "0123456789",
                              insuranceId: "001085000123",
                              timeString: `${day.date}/${day.fullDate.getMonth()+1}/${day.fullDate.getFullYear()}, ${event.time}`,
                              attachments: [
                                { name: "KetQuaKham.pdf", type: "pdf" }
                              ]
                            })}
                            className={`text-[10px] sm:text-xs px-1.5 py-1 rounded truncate font-medium cursor-pointer hover:opacity-80 transition-opacity
                            ${event.type === 'green' ? 'bg-green-100 text-green-800' : 
                              event.type === 'blue' ? 'bg-blue-100 text-blue-800' : 
                              event.type === 'orange' ? 'bg-orange-100 text-orange-800' : 
                              event.type === 'purple' ? 'bg-purple-100 text-purple-800' : 
                              'bg-red-100 text-red-800'} ${completedEvents.includes(event.id) ? 'border-2 border-green-500 border-solid' : 'border-2 border-transparent'}`}
                            title={`${event.time} - ${event.title}`}
                          >
                            <span className="font-bold mr-1">{event.time}</span>
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="mt-5 flex items-center justify-center gap-8 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5"><Move size={14} /> Kéo & thả để thay đổi lịch</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-1.5"><Info size={14} /> Nhấp để xem chi tiết</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Quản lý ca trực</h2>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">Xem tất cả</button>
            </div>
            
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Chọn Khoa/Phòng</label>
              <div className="relative">
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold cursor-pointer transition-all"
                >
                  <option value="Phòng Flem 407">Phòng Flem 407</option>
                  <option value="Phòng Khám 1">Phòng Khám 1</option>
                  <option value="Phòng Cấp Cứu">Phòng Cấp Cứu</option>
                  <option value="Khoa Nhi">Khoa Nhi</option>
                  <option value="Nội tiết">Nội tiết</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-3">
              <div 
                onClick={() => setSelectedShift('morning')}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${selectedShift === 'morning' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-100 hover:border-blue-200 hover:bg-blue-50/50'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform ${selectedShift === 'morning' ? 'bg-blue-100 text-blue-600 scale-110' : 'bg-blue-50 text-blue-500 group-hover:scale-110'}`}>
                  <Sun size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Ca Sáng</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">08:00 - 12:00</p>
                </div>
              </div>
              <div 
                onClick={() => setSelectedShift('afternoon')}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${selectedShift === 'afternoon' ? 'border-orange-500 bg-orange-50/50' : 'border-slate-100 hover:border-orange-200 hover:bg-orange-50/50'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform ${selectedShift === 'afternoon' ? 'bg-orange-100 text-orange-600 scale-110' : 'bg-orange-50 text-orange-500 group-hover:scale-110'}`}>
                  <SunDim size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Ca Chiều</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">13:00 - 17:00</p>
                </div>
              </div>
              <div 
                onClick={() => setSelectedShift('night')}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${selectedShift === 'night' ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform ${selectedShift === 'night' ? 'bg-indigo-100 text-indigo-600 scale-110' : 'bg-indigo-50 text-indigo-500 group-hover:scale-110'}`}>
                  <Moon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Ca Trực Đêm</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">20:00 - 06:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Bác sĩ đang sẵn sàng</h2>
            
            <div className="space-y-5">
              {availableDoctors.map(doc => (
                <div key={doc.id} className={`flex items-center justify-between ${!doc.isAvailable ? 'opacity-70' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={`https://picsum.photos/seed/doctor${doc.avatarSeed}/100/100`} referrerPolicy="no-referrer" alt="Doctor" className={`w-10 h-10 rounded-full object-cover border border-slate-200 ${!doc.isAvailable ? 'grayscale' : ''}`} />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${doc.isAvailable ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{doc.name}</h3>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">{doc.specialty}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => doc.isAvailable ? handleSwapShift(doc.name) : undefined}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${doc.isAvailable ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' : 'text-slate-500 bg-slate-100 hover:bg-slate-200'}`}
                  >
                    {doc.isAvailable ? 'Đổi ca' : 'Hẹn sau'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
            onClick={() => setIsCreateModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100 shrink-0">
                <h3 className="text-lg font-bold text-slate-900">Tạo lịch trực mới</h3>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Ngày</label>
                  <input 
                    type="date" 
                    value={newForm.date}
                    onChange={e => setNewForm({...newForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Mã bệnh nhân</label>
                  <input 
                    type="text" 
                    placeholder="Nhập mã bệnh nhân (VD: BN01)"
                    value={newForm.patientId}
                    onChange={e => setNewForm({...newForm, patientId: e.target.value})}
                    onBlur={handlePatientIdBlur}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Họ và tên</label>
                  <input 
                    type="text" 
                    readOnly
                    value={newForm.patientName}
                    placeholder="Tự động điền"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Số thẻ BHYT</label>
                  <input 
                    type="text" 
                    readOnly
                    value={newForm.insuranceId}
                    placeholder="Tự động điền"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Giờ bắt đầu</label>
                    <select 
                      value={newForm.startTime}
                      onChange={e => setNewForm({...newForm, startTime: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      {Array.from({length: 19}).map((_, i) => {
                        const hour = Math.floor(i/2) + 8;
                        const min = i % 2 === 0 ? '00' : '30';
                        const time = `${hour.toString().padStart(2, '0')}:${min}`;
                        return <option key={time} value={time}>{time}</option>;
                      })}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Giờ kết thúc</label>
                    <select 
                      value={newForm.endTime}
                      onChange={e => setNewForm({...newForm, endTime: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      {Array.from({length: 19}).map((_, i) => {
                        const hour = Math.floor(i/2) + 8;
                        const min = i % 2 === 0 ? '30' : '00';
                        const actualHour = min === '00' ? hour + 1 : hour;
                        const time = `${actualHour.toString().padStart(2, '0')}:${min}`;
                        return <option key={time} value={time}>{time}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Đính kèm tệp</label>
                  <button type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition-colors">
                    <Paperclip size={16} /> Chọn tệp đính kèm
                  </button>
                </div>
              </div>
              
              <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50 shrink-0">
                <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors">
                  Hủy
                </button>
                <button onClick={handleCreateSubmit} className="flex items-center gap-2 px-4 py-2 bg-[#638BB5] text-white rounded-xl text-sm font-semibold hover:bg-[#527a9f] transition-colors shadow-sm">
                  Xác nhận
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100 shrink-0">
              <h3 className="text-lg font-bold text-slate-900">Chi tiết ca trực</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
              <div>
                <div className="flex items-center gap-2 text-orange-500 mb-4">
                  <User size={16} className="stroke-[2.5px]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Thông tin bệnh nhân</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-slate-500">Họ và tên</span>
                    <span className="font-bold text-slate-900">{selectedEvent.patientName}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-slate-500">CCCD</span>
                    <span className="font-bold text-slate-900">{selectedEvent.patientId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Số thẻ BHYT</span>
                    <span className="font-bold text-slate-900">{selectedEvent.insuranceId}</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-4 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                  <Clock size={20} className="stroke-[2.5px]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-0.5">Thời gian hẹn</h4>
                  <p className="text-sm text-slate-500">{selectedEvent.timeString}</p>
                </div>
              </div>

              {selectedEvent.attachments && selectedEvent.attachments.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-orange-500 mb-4">
                    <Paperclip size={16} className="stroke-[2.5px]" />
                    <span className="text-xs font-bold uppercase tracking-wider">Tệp đính kèm</span>
                  </div>
                  <div className="space-y-2">
                    {selectedEvent.attachments.map((file: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-white transition-colors group">
                        <div className="flex items-center gap-3">
                          {file.type === 'pdf' ? (
                            <FileText size={18} className="text-red-500" />
                          ) : (
                            <ImageIcon size={18} className="text-blue-500" />
                          )}
                          <span className="text-sm font-medium text-slate-700">{file.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"><Eye size={16} /></button>
                          <button className="p-1.5 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"><Download size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50 shrink-0">
              <button onClick={closeModal} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors">
                Đóng
              </button>
              <button onClick={handleDeleteEvent} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors shadow-sm">
                <Trash2 size={16} /> Xóa
              </button>
              <button onClick={handleMarkComplete} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm ${completedEvents.includes(selectedEvent.id) ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-[#557b9e] text-white hover:bg-[#466887]'}`}>
                <CheckCircle2 size={16} /> {completedEvents.includes(selectedEvent.id) ? 'Hủy đánh dấu hoàn thành' : 'Đánh dấu hoàn thành'}
              </button>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50"
          >
            <CheckCircle2 size={20} className="text-green-400" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
