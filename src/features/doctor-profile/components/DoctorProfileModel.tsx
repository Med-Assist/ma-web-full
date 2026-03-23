"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Camera, CheckCircle2, Edit3, FileBadge, Headphones, Save, Scan, Settings, ShieldCheck, TrendingUp, Upload, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createUser,
  createSupportRequest,
  getDoctorProfileWorkspace,
  type GetDoctorProfileWorkspaceData,
  upsertDoctorProfile,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { getActiveDoctorUid, nowIsoString, readFileAsDataUrl } from "@/shared/lib/medassist-runtime";
import { auth } from "@/shared/lib/firebase";

const FormField = ({ label, name, value, isEditing, onChange }: { label: string; name: string; value: string; isEditing: boolean; onChange: (name: string, value: string) => void }) => (
  <div className="border-b border-slate-100 pb-3 relative group"><label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>{isEditing ? <input type="text" value={value} onChange={(e) => onChange(name, e.target.value)} className="w-full text-slate-800 font-medium bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#638BB5]" /> : <div className="text-slate-800 font-medium">{value}</div>}</div>
);

export function DoctorProfileModel() {
  const router = useRouter();
  const doctorUid = getActiveDoctorUid();
  const [workspace, setWorkspace] = useState<GetDoctorProfileWorkspaceData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [profile, setProfile] = useState({ id: `profile-${doctorUid}`, fullName: "", dob: "", gender: "", phone: "", specialty: "", certNumber: "", bio: "", avatarUrl: "", verificationStatus: "verified", verificationDocumentName: "", verificationDocumentDataUrl: "" });
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const verifyInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    getDoctorProfileWorkspace(getMedAssistDataConnect(), { doctorUid }).then((response) => {
      if (!mounted) return;
      setWorkspace(response.data);
      const doctor = response.data.doctorProfiles[0];
      if (doctor) {
        setProfile({
          id: doctor.id,
          fullName: doctor.fullName,
          dob: doctor.dob || "",
          gender: doctor.gender || "",
          phone: doctor.phone || "",
          specialty: doctor.specialty || "",
          certNumber: doctor.certNumber || "",
          bio: doctor.bio || "",
          avatarUrl: doctor.avatarUrl || "",
          verificationStatus: doctor.verificationStatus,
          verificationDocumentName: doctor.verificationDocumentName || "",
          verificationDocumentDataUrl: doctor.verificationDocumentDataUrl || "",
        });
      }
    }).catch((error) => console.error("Không thể tải hồ sơ bác sĩ:", error));
    return () => { mounted = false; };
  }, [doctorUid]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const metrics = useMemo(() => workspace?.doctorProfileMetrics ?? [], [workspace?.doctorProfileMetrics]);

  const saveProfile = async (nextProfile = profile) => {
    const resolvedDisplayName =
      nextProfile.fullName.trim() ||
      auth.currentUser?.displayName?.trim() ||
      `Bác sĩ ${doctorUid.slice(-4)}`;
    const resolvedEmail = auth.currentUser?.email || `${doctorUid}@medassist.local`;

    await createUser(getMedAssistDataConnect(), {
      uid: doctorUid,
      email: resolvedEmail,
      role: "doctor",
      displayName: resolvedDisplayName,
      status: "active",
      phone: nextProfile.phone || auth.currentUser?.phoneNumber || null,
      photoURL: nextProfile.avatarUrl || auth.currentUser?.photoURL || null,
      updatedAt: nowIsoString(),
      updatedBy: doctorUid,
      authProvider: auth.currentUser?.providerData[0]?.providerId || null,
      passwordSet: true,
    });

    await upsertDoctorProfile(getMedAssistDataConnect(), {
      id: nextProfile.id,
      doctorUid,
      fullName: nextProfile.fullName,
      dob: nextProfile.dob || null,
      gender: nextProfile.gender || null,
      phone: nextProfile.phone || null,
      specialty: nextProfile.specialty || null,
      certNumber: nextProfile.certNumber || null,
      bio: nextProfile.bio || null,
      avatarUrl: nextProfile.avatarUrl || null,
      verificationStatus: nextProfile.verificationStatus,
      verificationDocumentName: nextProfile.verificationDocumentName || null,
      verificationDocumentDataUrl: nextProfile.verificationDocumentDataUrl || null,
      verificationUpdatedAt: nowIsoString(),
      updatedAt: nowIsoString(),
    });

    const refreshed = await getDoctorProfileWorkspace(getMedAssistDataConnect(), { doctorUid });
    const refreshedDoctor = refreshed.data.doctorProfiles[0];

    setWorkspace(refreshed.data);
    setProfile((current) => ({
      ...current,
      id: refreshedDoctor?.id || nextProfile.id,
      fullName: refreshedDoctor?.fullName || nextProfile.fullName,
      dob: refreshedDoctor?.dob || nextProfile.dob || "",
      gender: refreshedDoctor?.gender || nextProfile.gender || "",
      phone: refreshedDoctor?.phone || nextProfile.phone || "",
      specialty: refreshedDoctor?.specialty || nextProfile.specialty || "",
      certNumber: refreshedDoctor?.certNumber || nextProfile.certNumber || "",
      bio: refreshedDoctor?.bio || nextProfile.bio || "",
      avatarUrl: refreshedDoctor?.avatarUrl || nextProfile.avatarUrl || "",
      verificationStatus: refreshedDoctor?.verificationStatus || nextProfile.verificationStatus,
      verificationDocumentName:
        refreshedDoctor?.verificationDocumentName || nextProfile.verificationDocumentName || "",
      verificationDocumentDataUrl:
        refreshedDoctor?.verificationDocumentDataUrl || nextProfile.verificationDocumentDataUrl || "",
    }));

    window.dispatchEvent(new CustomEvent("profileUpdate", { detail: { name: resolvedDisplayName, avatar: nextProfile.avatarUrl } }));
  };

  const uploadAsset = async (file: File, target: "avatar" | "verify") => {
    const dataUrl = await readFileAsDataUrl(file);
    const nextProfile = target === "avatar" ? { ...profile, avatarUrl: dataUrl } : { ...profile, verificationDocumentName: file.name, verificationDocumentDataUrl: dataUrl, verificationStatus: "verified" };
    await saveProfile(nextProfile);
    setToast(target === "avatar" ? "Đã tải lên ảnh đại diện mới." : "Đã cập nhật tài liệu xác minh.");
  };

  const quickMetrics = {
    consultations: metrics.filter((item) => item.section === "consultations"),
    patients: metrics.filter((item) => item.section === "patients"),
    procedures: metrics.filter((item) => item.section === "procedures"),
  };

  return (
    <div className="font-sans text-slate-800 w-full max-w-7xl mx-auto">
      <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadAsset(e.target.files[0], "avatar")} />
      <input ref={verifyInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => e.target.files?.[0] && uploadAsset(e.target.files[0], "verify")} />

      <AnimatePresence>{toast ? <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 20 }} exit={{ opacity: 0, y: -20 }} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 font-medium"><CheckCircle2 size={20} />{toast}</motion.div> : null}</AnimatePresence>

      <header className="flex justify-between items-center mb-8"><div><h1 className="text-3xl font-bold text-slate-800">Hồ sơ bác sĩ</h1><p className="text-slate-500 mt-1">Quản lý thông tin cá nhân và chứng chỉ hành nghề</p></div><motion.button onClick={() => router.push("/dashboard/settings")} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium shadow-sm hover:bg-slate-50"><Settings size={16} /> Cài đặt</motion.button></header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6"><div className="flex items-center gap-6"><div className="relative">{profile.avatarUrl ? <img src={profile.avatarUrl} alt="Avatar" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md" /> : <div className="w-28 h-28 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-slate-400"><Camera size={32} /></div>}<button type="button" onClick={() => avatarInputRef.current?.click()} className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-slate-100 text-slate-600 hover:text-[#638BB5]"><Camera size={16} /></button></div><div><h2 className="text-2xl font-bold text-slate-800">{profile.fullName || "Chưa cập nhật"}</h2><p className="text-[#638BB5] flex items-center gap-1.5 mt-1.5 font-medium"><Building2 size={16} /> {profile.specialty || "Chưa cập nhật"}</p><div className="flex flex-wrap gap-3 mt-5"><button type="button" onClick={() => avatarInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-[#638BB5] text-white rounded-lg text-sm font-medium shadow-sm hover:bg-[#527a9f]"><Upload size={16} /> Thay đổi ảnh đại diện</button><button type="button" onClick={async () => { await saveProfile({ ...profile, avatarUrl: "" }); setToast("Đã gỡ ảnh đại diện"); }} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">Gỡ ảnh</button></div></div></div>{isEditing ? <button type="button" onClick={async () => { await saveProfile(); setIsEditing(false); setToast("Đã lưu thông tin thành công!"); }} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium shadow-sm hover:bg-emerald-700"><Save size={16} /> Lưu thay đổi</button> : <button type="button" onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#638BB5] text-white rounded-xl text-sm font-medium shadow-sm hover:bg-[#527a9f]"><Edit3 size={16} /> Chỉnh sửa hồ sơ</button>}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mt-10"><FormField label="HỌ VÀ TÊN" name="fullName" value={profile.fullName} isEditing={isEditing} onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))} /><FormField label="NGÀY SINH" name="dob" value={profile.dob} isEditing={isEditing} onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))} /><FormField label="GIỚI TÍNH" name="gender" value={profile.gender} isEditing={isEditing} onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))} /><FormField label="SỐ ĐIỆN THOẠI" name="phone" value={profile.phone} isEditing={isEditing} onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))} /><FormField label="CHUYÊN KHOA" name="specialty" value={profile.specialty} isEditing={isEditing} onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))} /><FormField label="SỐ CHỨNG CHỈ HÀNH NGHỀ" name="certNumber" value={profile.certNumber} isEditing={isEditing} onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))} /><div className="sm:col-span-2"><FormField label="TIỂU SỬ" name="bio" value={profile.bio} isEditing={isEditing} onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))} /></div></div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"><h3 className="text-xl font-bold text-slate-800 flex items-center gap-2.5 mb-6"><ShieldCheck className="text-[#638BB5]" size={24} /> Chứng chỉ & Xác minh</h3><div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"><div className="flex items-start gap-6"><div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-[#638BB5] shadow-sm flex-shrink-0"><FileBadge size={32} /></div><div><h4 className="font-bold text-slate-800 text-lg">Chứng chỉ hành nghề Y</h4><p className="text-slate-500 text-sm mt-1.5 max-w-md leading-relaxed">{profile.verificationDocumentName || "Tải lên hoặc quét bản sao chứng chỉ hành nghề để duy trì trạng thái xác minh tài khoản của bạn."}</p><div className="flex flex-wrap gap-3 mt-5"><button type="button" onClick={() => verifyInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-[#638BB5] text-white rounded-lg text-sm font-medium shadow-sm hover:bg-[#527a9f]"><UploadCloud size={16} /> Tải lên minh chứng</button><button type="button" onClick={() => verifyInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50"><Scan size={16} /> Quét tài liệu</button></div></div></div><div className="text-center sm:text-right w-full sm:w-auto mt-4 sm:mt-0"><div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Trạng thái</div><div className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-sm whitespace-nowrap bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100"><CheckCircle2 size={16} /> {profile.verificationStatus}</div></div></div></div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"><div className="flex justify-between items-start mb-8"><h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><TrendingUp className="text-[#638BB5]" size={20} /> Thống kê hoạt động</h3></div><div className="space-y-5">{[...quickMetrics.consultations, ...quickMetrics.patients, ...quickMetrics.procedures].map((metric) => <div key={metric.id}><div className="flex justify-between text-xs font-semibold mb-2"><span className="text-slate-600">{metric.label}</span><span className="text-slate-900">{metric.countLabel || metric.valueText || metric.valueNumber}</span></div><div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#638BB5] rounded-full" style={{ width: `${metric.valueNumber || 0}%` }} /></div></div>)}</div></div>
          <div className="bg-gradient-to-br from-[#638BB5] to-[#4A6F94] rounded-3xl p-8 text-white relative overflow-hidden shadow-md"><Headphones className="absolute -bottom-6 -right-6 w-40 h-40 text-white opacity-10" /><h3 className="text-xl font-bold mb-3 relative z-10">Hỗ trợ kỹ thuật</h3><p className="text-blue-100 text-sm mb-8 relative z-10 max-w-[85%] leading-relaxed">Bạn gặp khó khăn khi cập nhật hồ sơ? Liên hệ với chúng tôi ngay.</p><button type="button" onClick={() => createSupportRequest(getMedAssistDataConnect(), { doctorUid, source: "doctor-profile", message: "Cần hỗ trợ kỹ thuật tại màn hình hồ sơ bác sĩ.", createdAt: nowIsoString() }).then(() => setToast("Đã gửi yêu cầu hỗ trợ")).catch(() => setToast("Không thể gửi yêu cầu hỗ trợ"))} className="text-sm font-medium text-white/90 hover:text-white flex items-center gap-1 relative z-10 underline underline-offset-4 decoration-white/30 hover:decoration-white">Gửi yêu cầu hỗ trợ</button></div>
        </div>
      </div>
    </div>
  );
}
