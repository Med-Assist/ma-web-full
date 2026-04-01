"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion";
import { Check, ChevronDown, Clock, Eye, EyeOff, PenTool, Settings, Shield, Smartphone, X } from "lucide-react";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import {
  createUser,
  getScheduleWorkspace,
  getSettingsWorkspace,
  type GetSettingsWorkspaceData,
  upsertDoctorAvailability,
  upsertDigitalSignature,
  upsertNotificationPreference,
  upsertWorkingScheduleSlot,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { auth } from "@/shared/lib/firebase";
import { getActiveDoctorUid, nowIsoString, readFileAsDataUrl } from "@/shared/lib/medassist-runtime";
import { buildSupportMailto } from "@/shared/lib/support";

const DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const FULL_DAYS = ["Thu Hai", "Thu Ba", "Thu Tu", "Thu Nam", "Thu Sau", "Thu Bay", "Chu Nhat"];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 8);
const FALLBACK_DEPARTMENT = "Phong kham 1";
const SHIFT_KEYS = ["morning", "afternoon", "night"] as const;
type NotificationPreferenceRow = GetSettingsWorkspaceData["notificationPreferences"][number];
type WorkingScheduleSlotRow = GetSettingsWorkspaceData["workingScheduleSlots"][number];

const buildDefaultPrefs = (doctorUid: string): NotificationPreferenceRow => ({
  id: `pref-${doctorUid}`,
  doctorUid,
  language: "vi-VN",
  newApptEmail: true,
  newApptApp: true,
  reminderEmail: false,
  reminderApp: true,
  reportEmail: false,
  reportApp: true,
  twoFactorEnabled: true,
  updatedAt: nowIsoString(),
  __typename: "NotificationPreference_Key",
});

const normalizeDepartmentKey = (value: string) => {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return normalized || "default";
};

const AnimatedCheckbox = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
  <label className="flex items-center space-x-2 cursor-pointer group select-none"><div className="relative flex items-center justify-center w-[18px] h-[18px]"><input type="checkbox" className="sr-only" checked={checked} onChange={onChange} /><motion.div className={`absolute inset-0 rounded-[4px] border ${checked ? "bg-[#4A729D] border-[#4A729D]" : "border-gray-300 group-hover:border-[#4A729D]"}`} initial={false} animate={{ backgroundColor: checked ? "#4A729D" : "#ffffff", borderColor: checked ? "#4A729D" : "#d1d5db" }} transition={{ duration: 0.2 }} /><motion.div initial={false} animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }} transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }} className="absolute text-white pointer-events-none flex items-center justify-center"><Check size={12} strokeWidth={4} /></motion.div></div><span className="text-sm text-gray-700 font-medium">{label}</span></label>
);

const AnimatedButton = ({ children, variant = "primary", className = "", ...props }: HTMLMotionProps<"button"> & { variant?: "primary" | "outline" }) => (
  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${variant === "primary" ? "bg-[#5b83b1] text-white hover:bg-[#4a6b92] shadow-sm" : "border border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"} px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center focus:outline-none ${className}`} {...props}>{children}</motion.button>
);

export function SettingsModel() {
  const [prefs, setPrefs] = useState<GetSettingsWorkspaceData["notificationPreferences"][number] | null>(null);
  const [slots, setSlots] = useState(new Set<string>());
  const [workingScheduleSlots, setWorkingScheduleSlots] = useState<WorkingScheduleSlotRow[]>([]);
  const [signature, setSignature] = useState<GetSettingsWorkspaceData["digitalSignatures"][number] | null>(null);
  const [lang, setLang] = useState("vi-VN");
  const [scheduleModal, setScheduleModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const applyWorkspaceData = (data: GetSettingsWorkspaceData, doctorUid: string) => {
    const nextPrefs = data.notificationPreferences[0] ?? buildDefaultPrefs(doctorUid);
    setPrefs(nextPrefs);
    setWorkingScheduleSlots(data.workingScheduleSlots);
    setSignature(data.digitalSignatures[0] ?? null);
    setLang(nextPrefs.language || "vi-VN");
    setSlots(new Set(data.workingScheduleSlots.filter((item) => item.isActive).map((item) => `${item.dayIndex}-${item.hour}`)));
  };

  const ensureDoctorUserRecord = async (doctorUid: string) => {
    await createUser(getMedAssistDataConnect(), {
      uid: doctorUid,
      email: auth.currentUser?.email || `${doctorUid}@medassist.local`,
      role: "DOCTOR",
      displayName: auth.currentUser?.displayName || `Bác sĩ ${doctorUid.slice(-4)}`,
      status: "ACTIVE",
      phone: auth.currentUser?.phoneNumber || null,
      photoURL: auth.currentUser?.photoURL || null,
      createdAt: nowIsoString(),
      createdBy: doctorUid,
      updatedAt: nowIsoString(),
      updatedBy: doctorUid,
      authProvider: auth.currentUser?.providerData[0]?.providerId || null,
    });
  };

  const saveWorkingScheduleSlots = async (doctorUid: string) => {
    const existingByKey = new Map<string, WorkingScheduleSlotRow>(
      workingScheduleSlots.map((item) => [`${item.dayIndex}-${item.hour}`, item])
    );
    const updates: Array<{ id: string; dayIndex: number; hour: number; isActive: boolean }> = [];

    FULL_DAYS.forEach((_, dayIndex) => {
      HOURS.forEach((hour) => {
        const key = `${dayIndex}-${hour}`;
        const desiredIsActive = slots.has(key);
        const existing = existingByKey.get(key);

        if (!existing && !desiredIsActive) {
          return;
        }

        if (existing && existing.isActive === desiredIsActive) {
          return;
        }

        updates.push({
          id: existing?.id || `slot-${doctorUid}-${dayIndex}-${hour}`,
          dayIndex,
          hour,
          isActive: desiredIsActive,
        });
      });
    });

    for (const update of updates) {
      await upsertWorkingScheduleSlot(getMedAssistDataConnect(), {
        id: update.id,
        doctorUid,
        dayIndex: update.dayIndex,
        hour: update.hour,
        isActive: update.isActive,
        updatedAt: nowIsoString(),
      });
    }
  };

  const syncDoctorAvailability = async (doctorUid: string) => {
    const scheduleResponse = await getScheduleWorkspace(getMedAssistDataConnect(), { doctorUid });
    const ownAvailabilityRows = scheduleResponse.data.doctorAvailabilities.filter((item) => item.doctorUid === doctorUid);
    const departments = Array.from(new Set(ownAvailabilityRows.map((item) => item.department).filter(Boolean)));
    if (departments.length === 0) {
      departments.push(FALLBACK_DEPARTMENT);
    }

    const hasHourInShift = (hour: number, shiftKey: typeof SHIFT_KEYS[number]) => {
      if (shiftKey === "morning") return hour < 12;
      if (shiftKey === "afternoon") return hour >= 12 && hour < 18;
      return hour >= 18 || hour < 8;
    };

    let nextDisplayOrder = ownAvailabilityRows.length > 0
      ? Math.max(...ownAvailabilityRows.map((item) => item.displayOrder)) + 1
      : 1;

    for (const department of departments) {
      for (const shiftKey of SHIFT_KEYS) {
        const existing = ownAvailabilityRows.find(
          (item) => item.department === department && (item.shiftKey || "").toLowerCase() === shiftKey
        );
        const isShiftActive = Array.from(slots).some((slotKey) => {
          const [dayIndexText, hourText] = slotKey.split("-");
          const dayIndex = Number(dayIndexText);
          const hour = Number(hourText);
          if (Number.isNaN(dayIndex) || Number.isNaN(hour)) return false;
          return dayIndex >= 0 && dayIndex <= 6 && hasHourInShift(hour, shiftKey);
        });

        await upsertDoctorAvailability(getMedAssistDataConnect(), {
          id: existing?.id || `availability-${doctorUid}-${normalizeDepartmentKey(department)}-${shiftKey}`,
          doctorUid,
          department,
          shiftKey,
          status: isShiftActive ? "ready" : "pending",
          displayOrder: existing?.displayOrder ?? nextDisplayOrder,
        });

        if (!existing) {
          nextDisplayOrder += 1;
        }
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    const doctorUid = getActiveDoctorUid();
    getSettingsWorkspace(getMedAssistDataConnect(), { doctorUid }).then((response) => {
      if (!mounted) return;
      applyWorkspaceData(response.data, doctorUid);
    }).catch((err) => {
      console.error("Không thể tải workspace cài đặt:", err);
      if (!mounted) return;
      setPrefs(buildDefaultPrefs(doctorUid));
      setWorkingScheduleSlots([]);
      setLang("vi-VN");
      setSlots(new Set());
    });
    return () => { mounted = false; };
  }, []);

  const displaySchedule = useMemo(() => FULL_DAYS.map((day, dayIndex) => ({ day, hours: HOURS.filter((hour) => slots.has(`${dayIndex}-${hour}`)) })).filter((item) => item.hours.length > 0), [slots]);
  const toggleSlot = (dayIndex: number, hour: number) => setSlots((current) => {
    const next = new Set(current);
    const key = `${dayIndex}-${hour}`;

    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }

    return next;
  });

  const saveAll = async () => {
    const doctorUid = getActiveDoctorUid();
    const nextPrefs = prefs ?? buildDefaultPrefs(doctorUid);
    setSaving(true);
    try {
      await ensureDoctorUserRecord(doctorUid);
      await upsertNotificationPreference(getMedAssistDataConnect(), { id: nextPrefs.id || `pref-${doctorUid}`, doctorUid, language: lang, newApptEmail: nextPrefs.newApptEmail, newApptApp: nextPrefs.newApptApp, reminderEmail: nextPrefs.reminderEmail, reminderApp: nextPrefs.reminderApp, reportEmail: nextPrefs.reportEmail, reportApp: nextPrefs.reportApp, twoFactorEnabled: nextPrefs.twoFactorEnabled, updatedAt: nowIsoString() });
      await saveWorkingScheduleSlots(doctorUid);
      await syncDoctorAvailability(doctorUid);
      const refreshed = await getSettingsWorkspace(getMedAssistDataConnect(), { doctorUid });
      applyWorkspaceData(refreshed.data, doctorUid);
      alert("Đã lưu tất cả cài đặt thành công!");
    } catch (err) {
      console.error("Không thể lưu cài đặt:", err);
      alert("Không thể lưu cài đặt lúc này.");
    } finally {
      setSaving(false);
    }
  };

  const saveWorkingHoursAndClose = async () => {
    const doctorUid = getActiveDoctorUid();
    setSaving(true);
    try {
      await ensureDoctorUserRecord(doctorUid);
      await saveWorkingScheduleSlots(doctorUid);
      await syncDoctorAvailability(doctorUid);
      const refreshed = await getSettingsWorkspace(getMedAssistDataConnect(), { doctorUid });
      applyWorkspaceData(refreshed.data, doctorUid);
      setScheduleModal(false);
      alert("Đã lưu lịch làm việc.");
    } catch (err) {
      console.error("Không thể lưu lịch làm việc:", err);
      alert("Không thể lưu lịch làm việc lúc này.");
    } finally {
      setSaving(false);
    }
  };

  const submitPassword = async () => {
    if (!auth.currentUser?.email) {
      setError("Tài khoản hiện tại không hỗ trợ đổi mật khẩu từ giao diện này.");
      return;
    }
    if (!oldPassword.trim() || !newPasswordValue.trim()) {
      setError("Vui lòng không để trống mật khẩu.");
      return;
    }
    if (oldPassword === newPasswordValue) {
      setError("Mật khẩu mới phải khác mật khẩu cũ.");
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPasswordValue);
      setPasswordModal(false);
      setOldPassword("");
      setNewPasswordValue("");
      setError("");
      alert("Đã cập nhật mật khẩu.");
    } catch (err) {
      console.error("Không thể đổi mật khẩu:", err);
      setError("Không thể xác minh mật khẩu hiện tại.");
    }
  };

  const uploadSignature = async (file: File) => {
    const doctorUid = getActiveDoctorUid();
    const imageDataUrl = await readFileAsDataUrl(file);
    const uploadedAt = nowIsoString();
    await ensureDoctorUserRecord(doctorUid);
    await upsertDigitalSignature(getMedAssistDataConnect(), { id: signature?.id || `signature-${doctorUid}`, doctorUid, imageDataUrl, uploadedAt });
    setSignature({
      id: signature?.id || `signature-${doctorUid}`,
      doctorUid,
      imageDataUrl,
      uploadedAt,
      __typename: "DigitalSignature_Key",
    });
  };

  const clearSignature = async () => {
    try {
      const doctorUid = getActiveDoctorUid();
      await ensureDoctorUserRecord(doctorUid);
      await upsertDigitalSignature(getMedAssistDataConnect(), {
        id: signature?.id || `signature-${doctorUid}`,
        doctorUid,
        imageDataUrl: null,
        uploadedAt: nowIsoString(),
      });
      setSignature(null);
      alert("Đã xóa chữ ký số.");
    } catch (error) {
      console.error("Không thể xóa chữ ký:", error);
      alert("Không thể xóa chữ ký lúc này.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadSignature(e.target.files[0])} />
      <div className="flex justify-between items-center mb-8"><h1 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1><AnimatedButton variant="primary" className="px-5 py-2.5 flex items-center space-x-2" onClick={saveAll}><Settings size={16} /><span>Cài đặt</span></AnimatedButton></div>
      <div className="mb-6"><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Ngôn ngữ hệ thống</label><div className="relative w-64"><select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b83b1] text-sm font-medium shadow-sm cursor-pointer"><option value="vi-VN">Tiếng Việt (Vietnam)</option><option value="en-US">English (US)</option></select><div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"><ChevronDown size={16} /></div></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6"><h2 className="text-lg font-bold text-gray-900 mb-6">Tùy chọn thông báo</h2><div className="space-y-6"><div className="flex justify-between items-center"><div><div className="font-semibold text-sm text-gray-800">Thông báo lịch hẹn mới</div><div className="text-xs text-gray-500 mt-0.5">Nhận thông báo khi có bệnh nhân đặt lịch.</div></div><div className="flex space-x-5 shrink-0"><AnimatedCheckbox checked={!!prefs?.newApptEmail} onChange={() => prefs && setPrefs({ ...prefs, newApptEmail: !prefs.newApptEmail })} label="Email" /><AnimatedCheckbox checked={!!prefs?.newApptApp} onChange={() => prefs && setPrefs({ ...prefs, newApptApp: !prefs.newApptApp })} label="App" /></div></div><div className="w-full h-px bg-gray-100" /><div className="flex justify-between items-center"><div><div className="font-semibold text-sm text-gray-800">Nhắc nhở hồ sơ bệnh án</div><div className="text-xs text-gray-500 mt-0.5">Nhắc nhở khi hồ sơ chưa hoàn tất.</div></div><div className="flex space-x-5 shrink-0"><AnimatedCheckbox checked={!!prefs?.reminderEmail} onChange={() => prefs && setPrefs({ ...prefs, reminderEmail: !prefs.reminderEmail })} label="Email" /><AnimatedCheckbox checked={!!prefs?.reminderApp} onChange={() => prefs && setPrefs({ ...prefs, reminderApp: !prefs.reminderApp })} label="App" /></div></div><div className="w-full h-px bg-gray-100" /><div className="flex justify-between items-center"><div><div className="font-semibold text-sm text-gray-800">Báo cáo tuần</div><div className="text-xs text-gray-500 mt-0.5">Gửi tổng hợp kết quả công việc vào sáng Thứ Hai.</div></div><div className="flex space-x-5 shrink-0"><AnimatedCheckbox checked={!!prefs?.reportEmail} onChange={() => prefs && setPrefs({ ...prefs, reportEmail: !prefs.reportEmail })} label="Email" /><AnimatedCheckbox checked={!!prefs?.reportApp} onChange={() => prefs && setPrefs({ ...prefs, reportApp: !prefs.reportApp })} label="App" /></div></div></div></div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6"><div className="flex items-center space-x-3 mb-6"><div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Shield size={20} /></div><div><h2 className="text-lg font-bold text-gray-900">Bảo mật tài khoản</h2><div className="text-xs text-gray-500">Quản lý mật khẩu và các lớp bảo mật.</div></div></div><div className="space-y-4"><div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4 flex justify-between items-center"><div><div className="font-semibold text-sm text-gray-800">Đổi mật khẩu</div><div className="text-xs text-gray-500 mt-0.5">Cập nhật mật khẩu tài khoản đăng nhập.</div></div><button type="button" onClick={() => setPasswordModal(true)} className="text-sm font-semibold text-[#5b83b1] hover:text-[#4a6b92]">Cập nhật</button></div><div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4 flex justify-between items-center"><div className="flex items-center space-x-4"><Smartphone size={24} strokeWidth={1.5} className="text-gray-400" /><div><div className="font-semibold text-sm text-gray-800">Xác thực 2 lớp (2FA)</div><div className="text-xs text-gray-500 mt-0.5">{prefs?.twoFactorEnabled ? "Đang bật (lưu preference)" : "Đang tắt"}</div></div></div><button type="button" onClick={() => prefs && setPrefs({ ...prefs, twoFactorEnabled: !prefs.twoFactorEnabled })} className={`w-11 h-6 rounded-full p-1 ${prefs?.twoFactorEnabled ? "bg-[#2b4c7e]" : "bg-gray-200"}`}><motion.div className="bg-white w-4 h-4 rounded-full shadow-sm" animate={{ x: prefs?.twoFactorEnabled ? 20 : 0 }} /></button></div></div></div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6"><div className="flex items-center space-x-3 mb-6"><div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500"><Clock size={20} /></div><div><h2 className="text-lg font-bold text-gray-900">Lịch làm việc cố định</h2><div className="text-xs text-gray-500">Thiết lập giờ khám bệnh định kỳ.</div></div></div><div className="space-y-3 mb-6">{displaySchedule.length === 0 ? <div className="text-sm text-gray-500 italic text-center py-4">Chưa có lịch làm việc</div> : displaySchedule.map((item) => <div key={item.day} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0"><div className="text-sm font-semibold text-gray-700">{item.day}</div><div className="text-sm font-bold text-[#5b83b1] text-right">{item.hours.map((hour) => `${String(hour).padStart(2, "0")}:00`).join(", ")}</div></div>)}</div><AnimatedButton variant="outline" onClick={() => setScheduleModal(true)} className="w-full border-dashed border-2 border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 bg-transparent">Điều chỉnh lịch chi tiết</AnimatedButton></div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6"><div className="flex items-center space-x-3 mb-6"><div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500"><PenTool size={20} /></div><div><h2 className="text-lg font-bold text-gray-900">Chữ ký số & Dấu mộc</h2><div className="text-xs text-gray-500">Dùng cho đơn thuốc và hồ sơ bệnh án.</div></div></div><div className="border border-gray-100 rounded-xl p-4 flex items-center space-x-6 bg-white"><div className="w-32 h-20 bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden shrink-0">{signature?.imageDataUrl ? <img src={signature.imageDataUrl} alt="Chữ ký" className="w-full h-full object-contain z-10" /> : <div className="text-gray-300 font-serif italic text-2xl z-10 opacity-60">x.b</div>}</div><div><div className="font-semibold text-sm text-gray-800">{signature?.imageDataUrl ? "Chữ ký hiện tại" : "Chưa có chữ ký"}</div><div className="text-xs text-gray-500 mt-0.5 mb-3">{signature?.uploadedAt ? `Tải lên lúc ${new Date(signature.uploadedAt).toLocaleString("vi-VN")}` : "Vui lòng tải lên chữ ký"}</div><div className="flex space-x-4 text-sm"><button type="button" onClick={() => fileInputRef.current?.click()} className="font-semibold text-[#5b83b1] hover:text-[#4a6b92]">{signature?.imageDataUrl ? "Thay đổi" : "Tải lên"}</button>{signature?.imageDataUrl ? <button type="button" onClick={clearSignature} className="font-semibold text-gray-400 hover:text-red-500">Xóa</button> : null}</div></div></div></div>
      </div>
      <div className="flex justify-end space-x-4 pt-4"><AnimatedButton variant="outline" className="px-6 py-2.5" onClick={() => { window.location.href = buildSupportMailto({ subject: `[MedAssist Support] Cai dat - ${auth.currentUser?.displayName || getActiveDoctorUid()}`, body: [`Tai khoan: ${auth.currentUser?.displayName || getActiveDoctorUid()}`, `Email lien he: ${auth.currentUser?.email || `${getActiveDoctorUid()}@medassist.local`}`, "", "Noi dung can ho tro:", "Can ho tro ky thuat tai man hinh cai dat."] }); }}>Gửi hỗ trợ</AnimatedButton><AnimatedButton variant="primary" className={`px-6 py-2.5 ${saving ? "opacity-75 cursor-not-allowed" : ""}`} onClick={saveAll}>{saving ? "Đang lưu..." : "Lưu tất cả cài đặt"}</AnimatedButton></div>

      <AnimatePresence>{scheduleModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"><motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"><div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0"><div><h3 className="text-xl font-bold text-gray-900">Điều chỉnh lịch chi tiết</h3><p className="text-sm text-gray-500 mt-1">Chọn các khung giờ rảnh trong tuần</p></div><button onClick={() => setScheduleModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100 focus:outline-none"><X size={20} /></button></div><div className="p-6 overflow-y-auto bg-gray-50/50 flex-1"><div className="min-w-[600px]"><div className="grid grid-cols-8 gap-2 mb-2 sticky top-0 bg-gray-50/90 backdrop-blur z-10 py-2"><div className="text-center font-semibold text-gray-400 text-xs uppercase tracking-wider">Gio</div>{DAYS.map((day) => <div key={day} className="text-center font-bold text-gray-700 text-sm">{day}</div>)}</div><div className="space-y-2">{HOURS.map((hour) => <div key={hour} className="grid grid-cols-8 gap-2"><div className="flex items-center justify-center text-xs font-medium text-gray-500">{`${String(hour).padStart(2, "0")}:00`}</div>{DAYS.map((_, dayIdx) => { const checked = slots.has(`${dayIdx}-${hour}`); return <button key={`${dayIdx}-${hour}`} onClick={() => toggleSlot(dayIdx, hour)} className={`h-10 rounded-md border flex items-center justify-center ${checked ? "bg-[#5b83b1] border-[#4a6b92] text-white" : "bg-white border-gray-200 hover:border-[#5b83b1] hover:bg-blue-50"}`}>{checked ? <Check size={16} /> : null}</button>; })}</div>)}</div></div></div><div className="p-6 border-t border-gray-100 flex justify-end space-x-3 shrink-0 bg-white"><AnimatedButton variant="outline" onClick={() => setScheduleModal(false)}>Đóng</AnimatedButton><AnimatedButton variant="primary" onClick={saveWorkingHoursAndClose}>Xác nhận</AnimatedButton></div></motion.div></div>}</AnimatePresence>
      <AnimatePresence>{passwordModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"><motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100"><div className="p-6"><div className="flex justify-between items-center mb-5"><h3 className="text-xl font-bold text-gray-900">Đổi mật khẩu</h3><button onClick={() => setPasswordModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100 focus:outline-none"><X size={20} /></button></div><div className="space-y-4">{error ? <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center"><span className="font-medium">{error}</span></div> : null}<div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Xác minh mật khẩu</label><div className="relative"><input type={showOld ? "text" : "password"} value={oldPassword} onChange={(e) => { setOldPassword(e.target.value); setError(""); }} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[#5b83b1]/50 focus:border-[#5b83b1] transition-all text-sm" placeholder="Nhập mật khẩu cũ" /><button type="button" onClick={() => setShowOld(!showOld)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">{showOld ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div><div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Tạo mật khẩu mới</label><div className="relative"><input type={showNew ? "text" : "password"} value={newPasswordValue} onChange={(e) => { setNewPasswordValue(e.target.value); setError(""); }} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[#5b83b1]/50 focus:border-[#5b83b1] transition-all text-sm" placeholder="Nhập mật khẩu mới" /><button type="button" onClick={() => setShowNew(!showNew)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">{showNew ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div></div><div className="mt-8 flex justify-end space-x-3"><AnimatedButton variant="outline" onClick={() => setPasswordModal(false)}>Hủy</AnimatedButton><AnimatedButton variant="primary" onClick={submitPassword}>Xác nhận</AnimatedButton></div></div></motion.div></div>}</AnimatePresence>
    </div>
  );
}


