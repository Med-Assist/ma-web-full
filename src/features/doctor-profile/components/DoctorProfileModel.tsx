"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Camera,
  CheckCircle2,
  Edit3,
  FileBadge,
  Headphones,
  Save,
  Scan,
  Settings,
  ShieldCheck,
  TrendingUp,
  Upload,
  UploadCloud,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createUser,
  getDoctorProfileWorkspace,
  getPatientWorkspace,
  getScheduleWorkspace,
  type GetDoctorProfileWorkspaceData,
  type GetPatientWorkspaceData,
  type GetScheduleWorkspaceData,
  upsertDoctorProfile,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { auth } from "@/shared/lib/firebase";
import { getActiveDoctorUid, nowIsoString, readFileAsDataUrl } from "@/shared/lib/medassist-runtime";
import { buildSupportMailto } from "@/shared/lib/support";

type EditableProfile = {
  id: string;
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  specialty: string;
  certNumber: string;
  bio: string;
  avatarUrl: string;
  verificationStatus: string;
  verificationDocumentName: string;
  verificationDocumentDataUrl: string;
};

type ActivityMetric = {
  id: string;
  label: string;
  helper: string;
  countLabel: string;
  percent: number;
};

function FormField({
  label,
  name,
  value,
  isEditing,
  multiline = false,
  onChange,
}: {
  label: string;
  name: keyof EditableProfile;
  value: string;
  isEditing: boolean;
  multiline?: boolean;
  onChange: (name: keyof EditableProfile, value: string) => void;
}) {
  return (
    <div className="relative border-b border-slate-100 pb-3">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      {isEditing ? (
        multiline ? (
          <textarea
            value={value}
            onChange={(event) => onChange(name, event.target.value)}
            rows={4}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-[#638BB5]"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(name, event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-[#638BB5]"
          />
        )
      ) : (
        <div className="min-h-[28px] text-sm font-medium text-slate-800">
          {value || "Chưa cập nhật"}
        </div>
      )}
    </div>
  );
}

function buildInitialProfile(doctorUid: string): EditableProfile {
  return {
    id: `profile-${doctorUid}`,
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    specialty: "",
    certNumber: "",
    bio: "",
    avatarUrl: "",
    verificationStatus: "verified",
    verificationDocumentName: "",
    verificationDocumentDataUrl: "",
  };
}

function normalizePercentage(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function DoctorProfileModel() {
  const router = useRouter();
  const doctorUid = getActiveDoctorUid();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const verifyInputRef = useRef<HTMLInputElement>(null);

  const [workspace, setWorkspace] = useState<GetDoctorProfileWorkspaceData | null>(null);
  const [patientWorkspace, setPatientWorkspace] = useState<GetPatientWorkspaceData | null>(null);
  const [scheduleWorkspace, setScheduleWorkspace] = useState<GetScheduleWorkspaceData | null>(null);
  const [profile, setProfile] = useState<EditableProfile>(() => buildInitialProfile(doctorUid));
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadBundle = async () => {
      try {
        const [doctorResponse, patientResponse, scheduleResponse] = await Promise.all([
          getDoctorProfileWorkspace(getMedAssistDataConnect(), { doctorUid }),
          getPatientWorkspace(getMedAssistDataConnect(), { doctorUid }),
          getScheduleWorkspace(getMedAssistDataConnect(), { doctorUid }),
        ]);

        if (!mounted) {
          return;
        }

        setWorkspace(doctorResponse.data);
        setPatientWorkspace(patientResponse.data);
        setScheduleWorkspace(scheduleResponse.data);

        const doctor = doctorResponse.data.doctorProfiles[0];
        if (doctor) {
          setProfile({
            id: doctor.id,
            fullName: doctor.fullName || "",
            dob: doctor.dob || "",
            gender: doctor.gender || "",
            phone: doctor.phone || "",
            specialty: doctor.specialty || "",
            certNumber: doctor.certNumber || "",
            bio: doctor.bio || "",
            avatarUrl: doctor.avatarUrl || "",
            verificationStatus: doctor.verificationStatus || "verified",
            verificationDocumentName: doctor.verificationDocumentName || "",
            verificationDocumentDataUrl: doctor.verificationDocumentDataUrl || "",
          });
        }
      } catch (error) {
        console.error("Khong the tai ho so bac si:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadBundle();

    return () => {
      mounted = false;
    };
  }, [doctorUid]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timerId = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timerId);
  }, [toast]);

  const doctorProfile = workspace?.doctorProfiles[0] ?? null;
  const doctorEmail = auth.currentUser?.email?.trim() || `${doctorUid}@medassist.local`;

  const activityMetrics = useMemo<ActivityMetric[]>(() => {
    const appointments = patientWorkspace?.appointments ?? [];
    const trackedPatients = patientWorkspace?.patientProfiles ?? [];
    const diagnoses = patientWorkspace?.aiDiagnoses ?? [];
    const scheduleEvents = (scheduleWorkspace?.scheduleEvents ?? []).filter((event) => !event.isDeleted);

    const activeAppointments = appointments.filter((appointment) => {
      const normalizedStatus = appointment.status.toLowerCase();
      return !["completed", "cancelled", "canceled"].includes(normalizedStatus);
    });
    const completedAppointments = appointments.filter(
      (appointment) => appointment.status.toLowerCase() === "completed"
    ).length;
    const upcomingAppointments = activeAppointments.filter(
      (appointment) => new Date(appointment.scheduledAt).getTime() >= Date.now()
    ).length;
    const uniquePatientsWithAppointments = new Set(
      appointments.map((appointment) => appointment.patientUid)
    ).size;
    const highRiskPatients = new Set(
      diagnoses
        .filter((diagnosis) => diagnosis.riskLevel?.toLowerCase() === "high")
        .map((diagnosis) => diagnosis.patientUid)
    ).size;

    const todayLabel = new Date().toLocaleDateString("en-CA");
    const todaySchedules = scheduleEvents.filter((event) => event.scheduledDate === todayLabel).length;

    return [
      {
        id: "completed-appointments",
        label: "Ca da hoan tat",
        helper: "Tong so lich kham da duoc danh dau hoan thanh.",
        countLabel: `${completedAppointments}/${appointments.length} ca`,
        percent: appointments.length
          ? normalizePercentage((completedAppointments / appointments.length) * 100)
          : 0,
      },
      {
        id: "upcoming-appointments",
        label: "Ca sap toi",
        helper: "Lich tu van con hieu luc trong cac ca dang cho xu ly.",
        countLabel: `${upcomingAppointments} ca`,
        percent: activeAppointments.length
          ? normalizePercentage((upcomingAppointments / activeAppointments.length) * 100)
          : 0,
      },
      {
        id: "tracked-patients",
        label: "Benh nhan dang theo doi",
        helper: "So ho so bac si dang phu trach co lich kham phat sinh.",
        countLabel: `${uniquePatientsWithAppointments}/${trackedPatients.length} ho so`,
        percent: trackedPatients.length
          ? normalizePercentage((uniquePatientsWithAppointments / trackedPatients.length) * 100)
          : 0,
      },
      {
        id: "high-risk-patients",
        label: "Ca nguy co cao",
        helper: "Ho so co ket qua AI nguy co cao can uu tien.",
        countLabel: `${highRiskPatients} ho so`,
        percent: trackedPatients.length
          ? normalizePercentage((highRiskPatients / trackedPatients.length) * 100)
          : 0,
      },
      {
        id: "today-schedule",
        label: "Lich hom nay",
        helper: "Su kien trong ngay so voi tong lich lam viec hien co.",
        countLabel: `${todaySchedules}/${scheduleEvents.length} su kien`,
        percent: scheduleEvents.length
          ? normalizePercentage((todaySchedules / scheduleEvents.length) * 100)
          : 0,
      },
    ];
  }, [patientWorkspace, scheduleWorkspace]);

  const supportMailto = useMemo(() => {
    const subject = `[MedAssist Support] Ho so bac si - ${profile.fullName.trim() || doctorUid}`;
    const body = [
      `Bac si: ${profile.fullName.trim() || doctorUid}`,
      `Doctor UID: ${doctorUid}`,
      `Email lien he: ${doctorEmail}`,
      `Chuyen khoa: ${profile.specialty.trim() || "Dang cap nhat"}`,
      "",
      "Noi dung can ho tro:",
      "Can ho tro ky thuat tai man hinh ho so bac si.",
    ];

    return buildSupportMailto({
      subject,
      body,
    });
  }, [doctorEmail, doctorUid, profile.fullName, profile.specialty]);

  const saveProfile = async (nextProfile = profile) => {
    const resolvedDisplayName =
      nextProfile.fullName.trim() ||
      auth.currentUser?.displayName?.trim() ||
      `Bac si ${doctorUid.slice(-4).toUpperCase()}`;

    await createUser(getMedAssistDataConnect(), {
      uid: doctorUid,
      email: doctorEmail,
      role: "doctor",
      displayName: resolvedDisplayName,
      status: "active",
      phone: nextProfile.phone.trim() || auth.currentUser?.phoneNumber || null,
      photoURL: nextProfile.avatarUrl || auth.currentUser?.photoURL || null,
      updatedAt: nowIsoString(),
      updatedBy: doctorUid,
      authProvider: auth.currentUser?.providerData[0]?.providerId || null,
      passwordSet: true,
    });

    await upsertDoctorProfile(getMedAssistDataConnect(), {
      id: nextProfile.id,
      doctorUid,
      fullName: resolvedDisplayName,
      dob: nextProfile.dob || null,
      gender: nextProfile.gender || null,
      phone: nextProfile.phone.trim() || null,
      specialty: nextProfile.specialty.trim() || null,
      certNumber: nextProfile.certNumber.trim() || null,
      bio: nextProfile.bio.trim() || null,
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
    setProfile({
      id: refreshedDoctor?.id || nextProfile.id,
      fullName: refreshedDoctor?.fullName || resolvedDisplayName,
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
    });

    window.dispatchEvent(
      new CustomEvent("profileUpdate", {
        detail: {
          name: resolvedDisplayName,
          avatar: nextProfile.avatarUrl,
        },
      })
    );
  };

  const uploadAsset = async (file: File, target: "avatar" | "verify") => {
    const dataUrl = await readFileAsDataUrl(file);
    const nextProfile =
      target === "avatar"
        ? {
            ...profile,
            avatarUrl: dataUrl,
          }
        : {
            ...profile,
            verificationDocumentName: file.name,
            verificationDocumentDataUrl: dataUrl,
            verificationStatus: "verified",
          };

    await saveProfile(nextProfile);
    setToast(
      target === "avatar"
        ? "Da cap nhat anh dai dien."
        : "Da cap nhat tai lieu xac minh."
    );
  };

  return (
    <div className="mx-auto w-full max-w-7xl font-sans text-slate-800">
      <input
        ref={avatarInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void uploadAsset(file, "avatar");
          }
        }}
      />
      <input
        ref={verifyInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void uploadAsset(file, "verify");
          }
        }}
      />

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-1/2 top-6 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white shadow-lg"
          >
            <CheckCircle2 size={20} />
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Ho so bac si</h1>
          <p className="mt-1 text-sm text-slate-500">
            Quan ly thong tin ca nhan, xac minh va hoat dong chuyen mon.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/dashboard/settings")}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Settings size={16} />
          Cai dat
        </motion.button>
      </header>

      <div className="grid grid-cols-1 gap-8 pb-10 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt="Avatar"
                      className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-slate-400 shadow-md">
                      <Camera size={32} />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute bottom-1 right-1 rounded-full border border-slate-100 bg-white p-2 text-slate-600 shadow-md hover:text-[#638BB5]"
                  >
                    <Camera size={16} />
                  </button>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {profile.fullName || "Chua cap nhat"}
                  </h2>
                  <p className="mt-1.5 flex items-center gap-1.5 font-medium text-[#638BB5]">
                    <Building2 size={16} />
                    {profile.specialty || "Chua cap nhat"}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="flex items-center gap-2 rounded-lg bg-[#638BB5] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#527a9f]"
                    >
                      <Upload size={16} />
                      Thay doi anh dai dien
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await saveProfile({ ...profile, avatarUrl: "" });
                        setToast("Da go anh dai dien.");
                      }}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Go anh
                    </button>
                  </div>
                </div>
              </div>

              {isEditing ? (
                <button
                  type="button"
                  onClick={async () => {
                    await saveProfile();
                    setIsEditing(false);
                    setToast("Da luu thong tin thanh cong.");
                  }}
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
                >
                  <Save size={16} />
                  Luu thay doi
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-xl bg-[#638BB5] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#527a9f]"
                >
                  <Edit3 size={16} />
                  Chinh sua ho so
                </button>
              )}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              <FormField
                label="Ho va ten"
                name="fullName"
                value={profile.fullName}
                isEditing={isEditing}
                onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))}
              />
              <FormField
                label="Ngay sinh"
                name="dob"
                value={profile.dob}
                isEditing={isEditing}
                onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))}
              />
              <FormField
                label="Gioi tinh"
                name="gender"
                value={profile.gender}
                isEditing={isEditing}
                onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))}
              />
              <FormField
                label="So dien thoai"
                name="phone"
                value={profile.phone}
                isEditing={isEditing}
                onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))}
              />
              <FormField
                label="Chuyen khoa"
                name="specialty"
                value={profile.specialty}
                isEditing={isEditing}
                onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))}
              />
              <FormField
                label="So chung chi hanh nghe"
                name="certNumber"
                value={profile.certNumber}
                isEditing={isEditing}
                onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))}
              />
              <div className="sm:col-span-2">
                <FormField
                  label="Tieu su"
                  name="bio"
                  value={profile.bio}
                  isEditing={isEditing}
                  multiline
                  onChange={(name, value) => setProfile((current) => ({ ...current, [name]: value }))}
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2.5 text-xl font-bold text-slate-800">
              <ShieldCheck className="text-[#638BB5]" size={24} />
              Chung chi va xac minh
            </h3>

            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-6 sm:flex-row sm:items-center">
              <div className="flex items-start gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#638BB5] shadow-sm">
                  <FileBadge size={32} />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800">Chung chi hanh nghe Y</h4>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-500">
                    {profile.verificationDocumentName ||
                      "Tai len hoac quet ban sao chung chi hanh nghe de duy tri trang thai xac minh tai khoan cua ban."}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => verifyInputRef.current?.click()}
                      className="flex items-center gap-2 rounded-lg bg-[#638BB5] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#527a9f]"
                    >
                      <UploadCloud size={16} />
                      Tai len minh chung
                    </button>
                    <button
                      type="button"
                      onClick={() => verifyInputRef.current?.click()}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Scan size={16} />
                      Quet tai lieu
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 w-full text-center sm:mt-0 sm:w-auto sm:text-right">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Trang thai
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold whitespace-nowrap text-emerald-600">
                  <CheckCircle2 size={16} />
                  {profile.verificationStatus || doctorProfile?.verificationStatus || "verified"}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                <TrendingUp className="text-[#638BB5]" size={20} />
                Thong ke hoat dong
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Chi so duoc tinh truc tiep tu ho so benh nhan, lich kham va lich lam viec hien co.
              </p>
            </div>

            <div className="space-y-4">
              {activityMetrics.map((metric) => (
                <div key={metric.id} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{metric.label}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{metric.helper}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{metric.countLabel}</p>
                      <p className="mt-1 text-xs font-medium text-slate-400">{metric.percent}%</p>
                    </div>
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-[#638BB5]"
                      style={{ width: `${metric.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#638BB5] to-[#4A6F94] p-8 text-white shadow-md">
            <Headphones className="absolute -bottom-6 -right-6 h-40 w-40 opacity-10" />
            <h3 className="relative z-10 mb-3 text-xl font-bold">Ho tro ky thuat</h3>
            <p className="relative z-10 mb-8 max-w-[85%] text-sm leading-relaxed text-blue-100">
              Ban gap kho khan khi cap nhat ho so? He thong se mo ung dung email de gui yeu cau ho tro.
            </p>
            <a
              href={supportMailto}
              onClick={() => setToast("Dang mo ung dung email...")}
              className="relative z-10 inline-flex items-center gap-1 text-sm font-medium text-white/90 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
            >
              Gui yeu cau ho tro
            </a>
          </section>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-sm font-medium text-slate-500 shadow-sm">
          Dang dong bo du lieu ho so bac si...
        </div>
      ) : null}
    </div>
  );
}
