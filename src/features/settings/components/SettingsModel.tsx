"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  ChevronDown,
  Shield,
  Clock,
  PenTool,
  Check,
  Eye,
  EyeOff,
  Smartphone,
  X
} from 'lucide-react';

// --- Custom Animated Components ---

const AnimatedCheckbox = ({ checked, onChange, label }: { checked: boolean, onChange: () => void, label: string }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer group select-none">
      <div className="relative flex items-center justify-center w-[18px] h-[18px]">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={onChange} 
        />
        <motion.div 
          className={`absolute inset-0 rounded-[4px] border ${checked ? 'bg-[#4A729D] border-[#4A729D]' : 'border-gray-300 group-hover:border-[#4A729D]'}`}
          initial={false}
          animate={{
            backgroundColor: checked ? '#4A729D' : '#ffffff',
            borderColor: checked ? '#4A729D' : '#d1d5db'
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          initial={false}
          animate={{
            scale: checked ? 1 : 0,
            opacity: checked ? 1 : 0
          }}
          transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
          className="absolute text-white pointer-events-none flex items-center justify-center"
        >
          <Check size={12} strokeWidth={4} />
        </motion.div>
      </div>
      <span className="text-sm text-gray-700 font-medium">{label}</span>
    </label>
  );
};

const AnimatedSwitch = ({ checked, onChange }: { checked: boolean, onChange: (val: boolean) => void }) => {
  return (
    <div 
      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${checked ? 'bg-[#2b4c7e]' : 'bg-gray-200'}`}
      onClick={() => onChange(!checked)}
    >
      <motion.div 
        className="bg-white w-4 h-4 rounded-full shadow-sm"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        animate={{
          x: checked ? 20 : 0
        }}
      />
    </div>
  );
};

const AnimatedButton = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center focus:outline-none";
  const variants = {
    primary: "bg-[#5b83b1] text-white hover:bg-[#4a6b92] shadow-sm",
    outline: "border border-gray-200 text-gray-700 hover:bg-gray-50 bg-white",
    ghost: "text-gray-600 hover:bg-gray-100"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6 ${className}`}>
    {children}
  </div>
);

// --- Main Sections ---

const Header = () => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1>
    <AnimatedButton variant="primary" className="px-5 py-2.5 flex items-center space-x-2">
      <Settings size={16} />
      <span>Cài đặt</span>
    </AnimatedButton>
  </div>
);

const LanguageSelector = () => (
  <div className="mb-6">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Ngôn ngữ hệ thống</label>
    <div className="relative w-64">
      <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b83b1] focus:border-transparent text-sm font-medium shadow-sm cursor-pointer">
        <option>Tiếng Việt (Vietnam)</option>
        <option>English (US)</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
        <ChevronDown size={16} />
      </div>
    </div>
  </div>
);

const NotificationSettings = () => {
  const [notifs, setNotifs] = useState({
    newApptEmail: true,
    newApptApp: true,
    reminderEmail: false,
    reminderApp: true,
    reportEmail: false,
    reportApp: true,
  });

  const toggle = (key: keyof typeof notifs) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <Card className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Tùy chọn thông báo</h2>
      
      <div className="space-y-6 flex-1">
        <div className="flex justify-between items-center">
          <div className="pr-4">
            <div className="font-semibold text-sm text-gray-800">Thông báo lịch hẹn mới</div>
            <div className="text-xs text-gray-500 mt-0.5">Nhận thông báo ngay khi có bệnh nhân đặt lịch khám.</div>
          </div>
          <div className="flex space-x-5 shrink-0">
            <AnimatedCheckbox checked={notifs.newApptEmail} onChange={() => toggle('newApptEmail')} label="Email" />
            <AnimatedCheckbox checked={notifs.newApptApp} onChange={() => toggle('newApptApp')} label="App" />
          </div>
        </div>

        <div className="w-full h-px bg-gray-100"></div>

        <div className="flex justify-between items-center">
          <div className="pr-4">
            <div className="font-semibold text-sm text-gray-800">Nhắc nhở hồ sơ bệnh án</div>
            <div className="text-xs text-gray-500 mt-0.5">Nhắc nhở khi có hồ sơ chưa hoàn tất sau 24h.</div>
          </div>
          <div className="flex space-x-5 shrink-0">
            <AnimatedCheckbox checked={notifs.reminderEmail} onChange={() => toggle('reminderEmail')} label="Email" />
            <AnimatedCheckbox checked={notifs.reminderApp} onChange={() => toggle('reminderApp')} label="App" />
          </div>
        </div>

        <div className="w-full h-px bg-gray-100"></div>

        <div className="flex justify-between items-center">
          <div className="pr-4">
            <div className="font-semibold text-sm text-gray-800">Báo cáo tuần</div>
            <div className="text-xs text-gray-500 mt-0.5">Gửi tổng hợp kết quả công việc vào sáng thứ Hai.</div>
          </div>
          <div className="flex space-x-5 shrink-0">
            <AnimatedCheckbox checked={notifs.reportEmail} onChange={() => toggle('reportEmail')} label="Email" />
            <AnimatedCheckbox checked={notifs.reportApp} onChange={() => toggle('reportApp')} label="App" />
          </div>
        </div>
      </div>
    </Card>
  );
};

const AccountSecurity = () => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseModal = () => {
    setIsPasswordModalOpen(false);
    setOldPassword('');
    setNewPassword('');
    setShowOldPassword(false);
    setShowNewPassword(false);
    setErrorMessage('');
  };

  const handleConfirmPasswordChange = () => {
    if (!oldPassword.trim() || !newPassword.trim()) {
      setErrorMessage('Vui lòng không để trống mật khẩu.');
      return;
    }
    if (oldPassword === newPassword) {
      setErrorMessage('Mật khẩu mới phải khác mật khẩu cũ.');
      return;
    }
    
    // Logic xử lý đổi mật khẩu ở đây
    console.log("Đổi mật khẩu:", { oldPassword, newPassword });
    handleCloseModal();
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
          <Shield size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Bảo mật tài khoản</h2>
          <div className="text-xs text-gray-500">Quản lý mật khẩu và các lớp bảo mật.</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-gray-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="10" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 10V7a5 5 0 0 1 10 0v3"></path>
                <circle cx="12" cy="15" r="1" fill="currentColor"></circle>
                <circle cx="8" cy="15" r="1" fill="currentColor"></circle>
                <circle cx="16" cy="15" r="1" fill="currentColor"></circle>
              </svg>
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">Đổi mật khẩu</div>
              <div className="text-xs text-gray-500 mt-0.5">Thay đổi lần cuối 3 tháng trước</div>
            </div>
          </div>
          <button 
            onClick={() => setIsPasswordModalOpen(true)}
            className="text-sm font-semibold text-[#5b83b1] hover:text-[#4a6b92] transition-colors focus:outline-none"
          >
            Cập nhật
          </button>
        </div>

        <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-gray-400">
              <Smartphone size={24} strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">Xác thực 2 lớp (2FA)</div>
              <div className="text-xs text-gray-500 mt-0.5">{twoFactor ? 'Đang bật (Email/SMS)' : 'Đang tắt'}</div>
            </div>
          </div>
          <AnimatedSwitch checked={twoFactor} onChange={setTwoFactor} />
        </div>
      </div>

      {/* Password Change Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-xl font-bold text-gray-900">Đổi mật khẩu</h3>
                  <button 
                    onClick={handleCloseModal} 
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100 focus:outline-none"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {errorMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center"
                    >
                      <span className="font-medium">{errorMessage}</span>
                    </motion.div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Xác minh mật khẩu</label>
                    <div className="relative">
                      <input 
                        type={showOldPassword ? "text" : "password"} 
                        value={oldPassword} 
                        onChange={e => {
                          setOldPassword(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[#5b83b1]/50 focus:border-[#5b83b1] transition-all text-sm" 
                        placeholder="Nhập mật khẩu cũ" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tạo mật khẩu mới</label>
                    <div className="relative">
                      <input 
                        type={showNewPassword ? "text" : "password"} 
                        value={newPassword} 
                        onChange={e => {
                          setNewPassword(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[#5b83b1]/50 focus:border-[#5b83b1] transition-all text-sm" 
                        placeholder="Nhập mật khẩu mới" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <AnimatedButton variant="outline" onClick={handleCloseModal}>
                    Hủy
                  </AnimatedButton>
                  <AnimatedButton variant="primary" onClick={handleConfirmPasswordChange}>
                    Xác nhận
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Card>
  );
};

const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const FULL_DAYS = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 8);

const initialSchedule = new Set<string>();
for (let d = 0; d <= 4; d++) {
  for (let h = 8; h <= 16; h++) initialSchedule.add(`${d}-${h}`);
}
for (let h = 8; h <= 11; h++) initialSchedule.add(`5-${h}`);

const formatHours = (hours: number[]) => {
  if (hours.length === 0) return 'Nghỉ';
  const sorted = [...hours].sort((a, b) => a - b);
  const ranges = [];
  let start = sorted[0];
  let prev = sorted[0];

  for (let i = 1; i <= sorted.length; i++) {
    if (i === sorted.length || sorted[i] !== prev + 1) {
      ranges.push(`${start.toString().padStart(2, '0')}:00 - ${(prev + 1).toString().padStart(2, '0')}:00`);
      if (i < sorted.length) {
        start = sorted[i];
        prev = sorted[i];
      }
    } else {
      prev = sorted[i];
    }
  }
  return ranges.join(', ');
};

const WorkingSchedule = () => {
  const [schedule, setSchedule] = useState<Set<string>>(initialSchedule);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSchedule, setTempSchedule] = useState<Set<string>>(new Set());

  const openModal = () => {
    setTempSchedule(new Set(schedule));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmSchedule = () => {
    setSchedule(new Set(tempSchedule));
    closeModal();
  };

  const toggleSlot = (day: number, hour: number) => {
    const key = `${day}-${hour}`;
    const newSchedule = new Set(tempSchedule);
    if (newSchedule.has(key)) {
      newSchedule.delete(key);
    } else {
      newSchedule.add(key);
    }
    setTempSchedule(newSchedule);
  };

  const displayData = FULL_DAYS.map((dayName, index) => {
    const hours = HOURS.filter(h => schedule.has(`${index}-${h}`));
    return { name: dayName, hours };
  }).filter(d => d.hours.length > 0);

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
          <Clock size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Lịch làm việc cố định</h2>
          <div className="text-xs text-gray-500">Thiết lập giờ khám bệnh định kỳ.</div>
        </div>
      </div>

      <div className="space-y-3 mb-6 flex-1 overflow-y-auto pr-2">
        {displayData.length > 0 ? displayData.map((day, idx) => (
          <div key={idx} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
            <div className="text-sm font-semibold text-gray-700">{day.name}</div>
            <div className="text-sm font-bold text-[#5b83b1] text-right">{formatHours(day.hours)}</div>
          </div>
        )) : (
          <div className="text-sm text-gray-500 italic text-center py-4">Chưa có lịch làm việc</div>
        )}
      </div>

      <AnimatedButton 
        variant="outline" 
        onClick={openModal}
        className="w-full border-dashed border-2 border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 bg-transparent mt-auto"
      >
        Điều chỉnh lịch chi tiết
      </AnimatedButton>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Điều chỉnh lịch chi tiết</h3>
                  <p className="text-sm text-gray-500 mt-1">Chọn các khung giờ rảnh trong tuần</p>
                </div>
                <button 
                  onClick={closeModal} 
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100 focus:outline-none"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto bg-gray-50/50 flex-1">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-8 gap-2 mb-2 sticky top-0 bg-gray-50/90 backdrop-blur z-10 py-2">
                    <div className="text-center font-semibold text-gray-400 text-xs uppercase tracking-wider">Giờ</div>
                    {DAYS.map(day => (
                      <div key={day} className="text-center font-bold text-gray-700 text-sm">{day}</div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    {HOURS.map(hour => (
                      <div key={hour} className="grid grid-cols-8 gap-2">
                        <div className="flex items-center justify-center text-xs font-medium text-gray-500">
                          {`${hour.toString().padStart(2, '0')}:00`}
                        </div>
                        {DAYS.map((_, dayIdx) => {
                          const isSelected = tempSchedule.has(`${dayIdx}-${hour}`);
                          return (
                            <button
                              key={`${dayIdx}-${hour}`}
                              onClick={() => toggleSlot(dayIdx, hour)}
                              className={`h-10 rounded-md border transition-all duration-200 focus:outline-none flex items-center justify-center ${
                                isSelected 
                                  ? 'bg-[#5b83b1] border-[#4a6b92] text-white shadow-inner' 
                                  : 'bg-white border-gray-200 hover:border-[#5b83b1] hover:bg-blue-50'
                              }`}
                            >
                              {isSelected && <Check size={16} />}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-100 flex justify-end space-x-3 shrink-0 bg-white">
                <AnimatedButton variant="outline" onClick={closeModal}>
                  Hủy
                </AnimatedButton>
                <AnimatedButton variant="primary" onClick={confirmSchedule}>
                  Xác nhận
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Card>
  );
};

const DigitalSignature = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [uploadDate, setUploadDate] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
      setUploadDate(formattedDate);
    }
  };

  const handleDelete = () => {
    setImageSrc(null);
    setUploadDate(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
          <PenTool size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Chữ ký số & Dấu mộc</h2>
          <div className="text-xs text-gray-500">Dùng cho đơn thuốc và hồ sơ bệnh án.</div>
        </div>
      </div>

      <div className="border border-gray-100 rounded-xl p-4 flex items-center space-x-6 bg-white">
        <div className="w-32 h-20 bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden shrink-0">
          {imageSrc ? (
            <img src={imageSrc} alt="Chữ ký" className="w-full h-full object-contain z-10" />
          ) : (
            <div className="text-gray-300 font-serif italic text-2xl z-10 opacity-60">x.b</div>
          )}
        </div>
        <div>
          <div className="font-semibold text-sm text-gray-800">
            {imageSrc ? 'Chữ ký hiện tại' : 'Chưa có chữ ký'}
          </div>
          {uploadDate ? (
            <div className="text-xs text-gray-500 mt-0.5 mb-3">Tải lên ngày {uploadDate}</div>
          ) : (
            <div className="text-xs text-gray-500 mt-0.5 mb-3">Vui lòng tải lên chữ ký</div>
          )}
          <div className="flex space-x-4 text-sm">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
            />
            <button 
              onClick={handleTriggerUpload}
              className="font-semibold text-[#5b83b1] hover:text-[#4a6b92] transition-colors"
            >
              {imageSrc ? 'Thay đổi' : 'Tải lên'}
            </button>
            {imageSrc && (
              <button 
                onClick={handleDelete}
                className="font-semibold text-gray-400 hover:text-red-500 transition-colors"
              >
                Xóa
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export function SettingsModel() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAll = () => {
    setIsSaving(true);
    // Giả lập gọi API lưu dữ liệu
    setTimeout(() => {
      setIsSaving(false);
      alert("Đã lưu tất cả cài đặt thành công!");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Header />
      <LanguageSelector />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <NotificationSettings />
        <AccountSecurity />
        <WorkingSchedule />
        <DigitalSignature />
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <AnimatedButton variant="outline" className="px-6 py-2.5">
          Hủy thay đổi
        </AnimatedButton>
        <AnimatedButton 
          variant="primary" 
          className={`px-6 py-2.5 ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
          onClick={handleSaveAll}
        >
          {isSaving ? 'Đang lưu...' : 'Lưu tất cả cài đặt'}
        </AnimatedButton>
      </div>
    </div>
  );
}
