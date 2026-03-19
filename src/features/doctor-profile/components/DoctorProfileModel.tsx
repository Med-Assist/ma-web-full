"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Camera,
  Upload,
  Save,
  Edit3,
  Building2,
  ShieldCheck,
  FileBadge,
  UploadCloud,
  Scan,
  TrendingUp,
  ChevronDown,
  Headphones,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useRouter } from 'next/navigation';

const chartData1 = [
  { name: 'T1', value: 30 },
  { name: 'T2', value: 45 },
  { name: 'T3', value: 55 },
  { name: 'T4', value: 40, active: true },
];

const chartData2 = [
  { name: 'TH1', value: 20 },
  { name: 'TH2', value: 25 },
  { name: 'TH3', value: 30 },
  { name: 'TH4', value: 40 },
  { name: 'TH5', value: 35 },
  { name: 'TH6', value: 50, active: true },
];

const FormField = ({ label, name, value, isEditing, onChange, onEdit, isTextArea = false }: { label: string; name: string; value: string; isEditing: boolean; onChange: (e: any) => void; onEdit: () => void; isTextArea?: boolean }) => (
  <div className="border-b border-slate-100 pb-3 relative group">
    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>
    {isEditing ? (
      isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="w-full text-slate-800 font-medium bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#638BB5] transition-all"
          rows={3}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full text-slate-800 font-medium bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#638BB5] transition-all"
        />
      )
    ) : (
      <div className="text-slate-800 font-medium">{value}</div>
    )}
    {!isEditing && (
      <button 
        onClick={onEdit}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#638BB5]"
      >
        <Edit3 size={16} />
      </button>
    )}
  </div>
);

const ProgressBar = ({ label, value, count }: { label: string; value: number; count: string }) => (
  <div>
    <div className="flex justify-between text-xs font-semibold mb-2">
      <span className="text-slate-600">{label}</span>
      <span className="text-slate-900">{count}</span>
    </div>
    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="h-full bg-[#638BB5] rounded-full"
      />
    </div>
  </div>
);

export function DoctorProfileModel() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Khai báo useRef để tham chiếu đến thẻ input file ẩn
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: 'BS. Danh Nguyễn',
    dob: '15/05/1985',
    gender: 'Nam',
    phone: '0901 234 567',
    specialty: 'Tim mạch',
    certNumber: '12345/HCM-CCHN',
    bio: 'Bác sĩ chuyên khoa Tim mạch với hơn 10 năm kinh nghiệm tại các bệnh viện lớn, chuyên sâu về can thiệp tim mạch và điều trị tăng huyết áp.',
    avatar: '/doctor.png' 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    // Nếu đổi tên, bắn sự kiện cập nhật tên sang Sidebar
    if (name === 'name') {
      window.dispatchEvent(new CustomEvent('profileUpdate', { detail: { name: value } }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    showToast('Đã lưu thông tin thành công!');
  };

  const handleRemoveAvatar = () => {
    setProfile(prev => ({ ...prev, avatar: '' }));
    // Bắn sự kiện xóa ảnh sang Sidebar
    window.dispatchEvent(new CustomEvent('profileUpdate', { detail: { avatar: '' } }));
    showToast('Đã gỡ ảnh đại diện');
  };

  const handleUploadAvatar = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result as string;
        setProfile(prev => ({ ...prev, avatar: newAvatar }));
        // Bắn sự kiện cập nhật ảnh mới sang Sidebar
        window.dispatchEvent(new CustomEvent('profileUpdate', { detail: { avatar: newAvatar } }));
        showToast('Đã tải lên ảnh đại diện mới');
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="font-sans text-slate-800 w-full max-w-7xl mx-auto">
      {/* Input file ẩn dùng để chọn ảnh */}
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 font-medium"
          >
            <CheckCircle2 size={20} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Hồ sơ bác sĩ</h1>
          <p className="text-slate-500 mt-1">Quản lý thông tin cá nhân và chứng chỉ hành nghề</p>
        </div>
        <motion.button 
          onClick={() => router.push('/dashboard/settings')} 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium shadow-sm hover:bg-slate-50"
        >
          <Settings size={16} /> Cài đặt
        </motion.button>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
        {/* Left Column (Profile & Certs) */}
        <div className="xl:col-span-2 space-y-8">
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
          >
            {/* Top section: Avatar, Name, Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md" />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-slate-400">
                      <Camera size={32} />
                    </div>
                  )}
                  <motion.button 
                    onClick={handleUploadAvatar}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-slate-100 text-slate-600 hover:text-[#638BB5]"
                  >
                    <Camera size={16} />
                  </motion.button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{profile.name || 'Chưa cập nhật'}</h2>
                  <p className="text-[#638BB5] flex items-center gap-1.5 mt-1.5 font-medium">
                    <Building2 size={16} /> {profile.specialty || 'Chưa cập nhật'}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-5">
                    <motion.button 
                      onClick={handleUploadAvatar}
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }} 
                      className="flex items-center gap-2 px-4 py-2 bg-[#638BB5] text-white rounded-lg text-sm font-medium shadow-sm hover:bg-[#527a9f] transition-colors"
                    >
                      <Upload size={16} /> Thay đổi ảnh đại diện
                    </motion.button>
                    <motion.button 
                      onClick={handleRemoveAvatar}
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }} 
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                    >
                      Gỡ ảnh
                    </motion.button>
                  </div>
                </div>
              </div>
              {isEditing ? (
                <motion.button 
                  onClick={handleSave}
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium shadow-sm hover:bg-emerald-700 transition-colors w-full sm:w-auto justify-center"
                >
                  <Save size={16} /> Lưu thay đổi
                </motion.button>
              ) : (
                <motion.button 
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#638BB5] text-white rounded-xl text-sm font-medium shadow-sm hover:bg-[#527a9f] transition-colors w-full sm:w-auto justify-center"
                >
                  <Edit3 size={16} /> Chỉnh sửa hồ sơ
                </motion.button>
              )}
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mt-10">
              <FormField label="HỌ VÀ TÊN" name="name" value={profile.name} isEditing={isEditing} onChange={handleChange} onEdit={() => setIsEditing(true)} />
              <FormField label="NGÀY SINH" name="dob" value={profile.dob} isEditing={isEditing} onChange={handleChange} onEdit={() => setIsEditing(true)} />
              <FormField label="GIỚI TÍNH" name="gender" value={profile.gender} isEditing={isEditing} onChange={handleChange} onEdit={() => setIsEditing(true)} />
              <FormField label="SỐ ĐIỆN THOẠI" name="phone" value={profile.phone} isEditing={isEditing} onChange={handleChange} onEdit={() => setIsEditing(true)} />
              <FormField label="CHUYÊN KHOA" name="specialty" value={profile.specialty} isEditing={isEditing} onChange={handleChange} onEdit={() => setIsEditing(true)} />
              <FormField label="SỐ CHỨNG CHỈ HÀNH NGHỀ" name="certNumber" value={profile.certNumber} isEditing={isEditing} onChange={handleChange} onEdit={() => setIsEditing(true)} />
              <div className="sm:col-span-2">
                <FormField label="TIỂU SỬ" name="bio" value={profile.bio} isEditing={isEditing} onChange={handleChange} onEdit={() => setIsEditing(true)} isTextArea />
              </div>
            </div>
          </motion.div>

          {/* Certifications Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
          >
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2.5 mb-6">
              <ShieldCheck className="text-[#638BB5]" size={24} /> Chứng chỉ & Xác minh
            </h3>
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-[#638BB5] shadow-sm flex-shrink-0">
                  <FileBadge size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">Chứng chỉ hành nghề Y</h4>
                  <p className="text-slate-500 text-sm mt-1.5 max-w-md leading-relaxed">
                    Tải lên hoặc quét bản sao chứng chỉ hành nghề để duy trì trạng thái xác minh tài khoản của bạn.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-5">
                    <motion.button 
                      onClick={() => showToast('Đang mở hộp thoại tải lên...')}
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }} 
                      className="flex items-center gap-2 px-4 py-2 bg-[#638BB5] text-white rounded-lg text-sm font-medium shadow-sm hover:bg-[#527a9f] transition-colors"
                    >
                      <UploadCloud size={16} /> Tải lên minh chứng
                    </motion.button>
                    <motion.button 
                      onClick={() => showToast('Đang mở camera quét tài liệu...')}
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }} 
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                    >
                      <Scan size={16} /> Quét tài liệu
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-right w-full sm:w-auto mt-4 sm:mt-0">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Trạng thái</div>
                {/* Đã thêm whitespace-nowrap và text-sm vào class bên dưới */}
                    <div className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-sm whitespace-nowrap bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                        <CheckCircle2 size={16} /> Xác minh
                    </div>
                </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Stats & Support) */}
        <div className="space-y-8">
          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
          >
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="text-[#638BB5]" size={20} /> Thống kê hoạt động
              </h3>
              <button className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                Tháng này <ChevronDown size={16} />
              </button>
            </div>

            {/* Chart 1 */}
            <div className="mb-10">
              <h4 className="text-sm font-semibold text-slate-600 mb-4">Lượng khám/Tư vấn</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData1} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#638BB5" />
                        <stop offset="100%" stopColor="#3B5B7E" />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                      {chartData1.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.active ? 'url(#colorActive)' : '#E2E8F0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2 */}
            <div className="mb-10">
              <h4 className="text-sm font-semibold text-slate-600 mb-4">Tổng bệnh nhân điều trị</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData2} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={30}>
                      {chartData2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.active ? 'url(#colorActive)' : '#E2E8F0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Progress Bars */}
            <div>
              <h4 className="text-sm font-semibold text-slate-600 mb-5">Ca phẫu thuật/Thủ thuật</h4>
              <div className="space-y-5">
                <ProgressBar label="Can thiệp mạch" value={80} count="12" />
                <ProgressBar label="Đặt Stent" value={60} count="08" />
                <ProgressBar label="Siêu âm tim" value={95} count="45" />
              </div>
            </div>
          </motion.div>

          {/* Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-[#638BB5] to-[#4A6F94] rounded-3xl p-8 text-white relative overflow-hidden shadow-md"
          >
            <Headphones className="absolute -bottom-6 -right-6 w-40 h-40 text-white opacity-10" />
            <h3 className="text-xl font-bold mb-3 relative z-10">Hỗ trợ kỹ thuật</h3>
            <p className="text-blue-100 text-sm mb-8 relative z-10 max-w-[85%] leading-relaxed">
              Bạn gặp khó khăn khi cập nhật hồ sơ? Liên hệ với chúng tôi ngay.
            </p>
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              className="text-sm font-medium text-white/90 hover:text-white flex items-center gap-1 relative z-10 underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all"
            >
              Gửi yêu cầu hỗ trợ
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}