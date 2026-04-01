"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BadgeCheck, BellRing, CalendarRange, Save, Sparkles, Stethoscope, UserPlus } from "lucide-react";
import {
  createUser,
  getAiDiagnoses,
  getAppointments,
  getDoctorProfileWorkspace,
  getDoctors,
  getScheduleWorkspace,
  getSettingsWorkspace,
  type GetAiDiagnosesData,
  type GetAppointmentsData,
  type GetDoctorProfileWorkspaceData,
  type GetDoctorsData,
  type GetScheduleWorkspaceData,
  type GetSettingsWorkspaceData,
  upsertDoctorProfile,
  upsertDoctorProfileMetric,
  upsertNotificationPreference,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { createClientId, getActiveDoctorUid, nowIsoString } from "@/shared/lib/medassist-runtime";
import {
  AdminButton,
  AdminEmptyState,
  AdminInput,
  AdminPagination,
  AdminPanel,
  AdminScrollViewport,
  AdminSection,
  AdminSelect,
  AdminStatCard,
  AdminTextarea,
} from "./AdminPrimitives";
import {
  ADMIN_DEFAULT_PAGE_SIZE,
  buildDoctorFallbackName,
  dedupeByKey,
  formatDateTime,
  paginateItems,
} from "../lib/admin-utils";

type DoctorBundle = {
  doctors: GetDoctorsData["users"];
  profiles: GetDoctorProfileWorkspaceData["doctorProfiles"];
  metrics: GetDoctorProfileWorkspaceData["doctorProfileMetrics"];
  appointments: GetAppointmentsData["appointments"];
  diagnoses: GetAiDiagnosesData["aiDiagnoses"];
  notificationPreferences: GetSettingsWorkspaceData["notificationPreferences"];
  scheduleEvents: GetScheduleWorkspaceData["scheduleEvents"];
};

type DoctorFormState = {
  id: string;
  doctorUid: string;
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  specialty: string;
  certNumber: string;
  bio: string;
  avatarUrl: string;
  verificationStatus: string;
};

const EMPTY_FORM: DoctorFormState = {
  id: "",
  doctorUid: "",
  fullName: "",
  dob: "",
  gender: "",
  phone: "",
  specialty: "",
  certNumber: "",
  bio: "",
  avatarUrl: "",
  verificationStatus: "pending",
};

function createDefaultProfileForm(doctor: GetDoctorsData["users"][number], profile?: GetDoctorProfileWorkspaceData["doctorProfiles"][number] | null): DoctorFormState {
  return {
    id: profile?.id || `profile-${doctor.uid}`,
    doctorUid: doctor.uid,
    fullName: profile?.fullName || doctor.displayName || buildDoctorFallbackName(doctor.uid),
    dob: profile?.dob || "",
    gender: profile?.gender || "",
    phone: profile?.phone || doctor.phone || "",
    specialty: profile?.specialty || "",
    certNumber: profile?.certNumber || "",
    bio: profile?.bio || "",
    avatarUrl: profile?.avatarUrl || doctor.photoURL || "",
    verificationStatus: profile?.verificationStatus || "pending",
  };
}

function formatVerificationStatus(status?: string | null) {
  if (status === "verified") {
    return "ÄÃ£ xÃ¡c minh";
  }

  if (status === "needs-review") {
    return "Cáº§n rÃ  soÃ¡t";
  }

  return "Chá» xÃ¡c minh";
}

function getDoctorBadgeClass(status?: string | null) {
  if (status === "verified") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "needs-review") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-slate-100 text-slate-600";
}

export function AdminDoctorManagement() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedDoctorUid = searchParams.get("doctorUid");
  const [bundle, setBundle] = useState<DoctorBundle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorPage, setDoctorPage] = useState(1);
  const [selectedDoctorUid, setSelectedDoctorUid] = useState<string | null>(null);
  const [form, setForm] = useState<DoctorFormState>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreatingDoctor, setIsCreatingDoctor] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    email: "",
    displayName: "",
    specialty: "",
    phone: "",
  });

  useEffect(() => {
    let mounted = true;

    const loadBundle = async () => {
      try {
        const [doctorsResponse, appointmentsResponse, diagnosesResponse] = await Promise.all([
          getDoctors(getMedAssistDataConnect()),
          getAppointments(getMedAssistDataConnect()),
          getAiDiagnoses(getMedAssistDataConnect()),
        ]);

        const doctors = doctorsResponse.data.users;
        const scopedResponses = await Promise.all(
          doctors.map((doctor) =>
            Promise.all([
              getDoctorProfileWorkspace(getMedAssistDataConnect(), { doctorUid: doctor.uid }),
              getSettingsWorkspace(getMedAssistDataConnect(), { doctorUid: doctor.uid }),
              getScheduleWorkspace(getMedAssistDataConnect(), { doctorUid: doctor.uid }),
            ]).then(([profileResponse, settingsResponse, scheduleResponse]) => ({
              profileResponse,
              settingsResponse,
              scheduleResponse,
            }))
          )
        );

        if (!mounted) {
          return;
        }

        const nextBundle: DoctorBundle = {
          doctors,
          profiles: dedupeByKey(
            scopedResponses.flatMap((item) => item.profileResponse.data.doctorProfiles),
            (item) => item.id
          ),
          metrics: dedupeByKey(
            scopedResponses.flatMap((item) => item.profileResponse.data.doctorProfileMetrics),
            (item) => item.id
          ),
          appointments: appointmentsResponse.data.appointments,
          diagnoses: diagnosesResponse.data.aiDiagnoses,
          notificationPreferences: dedupeByKey(
            scopedResponses.flatMap((item) => item.settingsResponse.data.notificationPreferences),
            (item) => item.id
          ),
          scheduleEvents: dedupeByKey(
            scopedResponses.flatMap((item) => item.scheduleResponse.data.scheduleEvents),
            (item) => item.id
          ),
        };

        setBundle(nextBundle);
      } catch (error) {
        console.error("KhÃ´ng thá»ƒ táº£i quáº£n trá»‹ bÃ¡c sÄ©:", error);
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
  }, []);

  const doctors = bundle?.doctors ?? [];
  const filteredDoctors = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return doctors.filter((doctor) => {
      if (!normalizedSearch) {
        return true;
      }

      return (
        doctor.displayName.toLowerCase().includes(normalizedSearch) ||
        doctor.email.toLowerCase().includes(normalizedSearch) ||
        (doctor.userCode || "").toLowerCase().includes(normalizedSearch)
      );
    });
  }, [doctors, searchTerm]);

  const pagedDoctors = useMemo(
    () => paginateItems(filteredDoctors, doctorPage, ADMIN_DEFAULT_PAGE_SIZE),
    [doctorPage, filteredDoctors]
  );

  useEffect(() => {
    setDoctorPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (doctorPage !== pagedDoctors.page) {
      setDoctorPage(pagedDoctors.page);
    }
  }, [doctorPage, pagedDoctors.page]);

  useEffect(() => {
    if (!doctors.length) {
      if (selectedDoctorUid !== null) {
        setSelectedDoctorUid(null);
      }
      return;
    }

    const validRequestedDoctorUid =
      requestedDoctorUid && doctors.some((doctor) => doctor.uid === requestedDoctorUid)
        ? requestedDoctorUid
        : null;
    const validCurrentDoctorUid =
      selectedDoctorUid && doctors.some((doctor) => doctor.uid === selectedDoctorUid)
        ? selectedDoctorUid
        : null;
    const nextDoctorUid = validRequestedDoctorUid || validCurrentDoctorUid || doctors[0].uid;

    if (nextDoctorUid !== selectedDoctorUid) {
      setSelectedDoctorUid(nextDoctorUid);
    }
  }, [doctors, requestedDoctorUid, selectedDoctorUid]);

  const selectedDoctor = useMemo(
    () => doctors.find((doctor) => doctor.uid === selectedDoctorUid) || null,
    [doctors, selectedDoctorUid]
  );

  const selectedProfile = useMemo(
    () => bundle?.profiles.find((profile) => profile.doctorUid === selectedDoctor?.uid) || null,
    [bundle?.profiles, selectedDoctor]
  );

  const selectedDoctorAppointments = useMemo(
    () => (bundle?.appointments ?? []).filter((appointment) => appointment.doctorUid === selectedDoctor?.uid),
    [bundle?.appointments, selectedDoctor]
  );

  const selectedDoctorHighRisk = useMemo(
    () =>
      (bundle?.diagnoses ?? []).filter(
        (diagnosis) => diagnosis.doctorUid === selectedDoctor?.uid && diagnosis.riskLevel.toLowerCase() === "high"
      ),
    [bundle?.diagnoses, selectedDoctor]
  );

  const selectedNotifications = useMemo(
    () => bundle?.notificationPreferences.find((item) => item.doctorUid === selectedDoctor?.uid) || null,
    [bundle?.notificationPreferences, selectedDoctor]
  );

  const selectedDoctorSchedule = useMemo(
    () =>
      (bundle?.scheduleEvents ?? [])
        .filter((event) => event.doctorUid === selectedDoctor?.uid && !event.isDeleted)
        .slice()
        .sort((left, right) => {
          const leftDate = `${left.scheduledDate}T${left.startTime}`;
          const rightDate = `${right.scheduledDate}T${right.startTime}`;
          return new Date(leftDate).getTime() - new Date(rightDate).getTime();
        }),
    [bundle?.scheduleEvents, selectedDoctor]
  );

  useEffect(() => {
    if (!selectedDoctor) {
      setForm(EMPTY_FORM);
      return;
    }

    setForm(createDefaultProfileForm(selectedDoctor, selectedProfile));
  }, [selectedDoctor, selectedProfile]);

  const verifiedCount = bundle?.profiles.filter((profile) => profile.verificationStatus === "verified").length || 0;
  const pendingCount = Math.max(doctors.length - verifiedCount, 0);
  const todayScheduleCount = bundle?.scheduleEvents.filter((event) => {
    const today = new Date().toISOString().slice(0, 10);
    return event.scheduledDate === today && !event.isDeleted;
  }).length || 0;

  const handleSelectDoctor = (doctorUid: string) => {
    setSelectedDoctorUid(doctorUid);
    router.replace(`${pathname}?doctorUid=${encodeURIComponent(doctorUid)}`, { scroll: false });
  };

  const handleSaveDoctor = async () => {
    if (!selectedDoctor) {
      return;
    }

    setIsSaving(true);

    try {
      await upsertDoctorProfile(getMedAssistDataConnect(), {
        id: form.id,
        doctorUid: selectedDoctor.uid,
        fullName: form.fullName,
        dob: form.dob || null,
        gender: form.gender || null,
        phone: form.phone || null,
        specialty: form.specialty || null,
        certNumber: form.certNumber || null,
        bio: form.bio || null,
        avatarUrl: form.avatarUrl || null,
        verificationStatus: form.verificationStatus,
        verificationUpdatedAt: nowIsoString(),
        updatedAt: nowIsoString(),
      });

      await Promise.all([
        upsertDoctorProfileMetric(getMedAssistDataConnect(), {
          id: `doctor-metric-${selectedDoctor.uid}-appointments`,
          doctorProfileId: form.id,
          section: "admin",
          label: "Lá»‹ch khÃ¡m",
          valueNumber: selectedDoctorAppointments.length,
          helper: "Tá»•ng sá»‘ lá»‹ch Ä‘ang phá»¥ trÃ¡ch",
          countLabel: "lá»‹ch",
          accent: "blue",
          isActive: true,
          displayOrder: 0,
        }),
        upsertDoctorProfileMetric(getMedAssistDataConnect(), {
          id: `doctor-metric-${selectedDoctor.uid}-risk`,
          doctorProfileId: form.id,
          section: "admin",
          label: "Ca nguy cÆ¡ cao",
          valueNumber: selectedDoctorHighRisk.length,
          helper: "Ca cáº§n quáº£n trá»‹ theo dÃµi",
          countLabel: "ca",
          accent: "rose",
          isActive: selectedDoctorHighRisk.length > 0,
          displayOrder: 1,
        }),
        upsertDoctorProfileMetric(getMedAssistDataConnect(), {
          id: `doctor-metric-${selectedDoctor.uid}-today`,
          doctorProfileId: form.id,
          section: "admin",
          label: "Ca hÃ´m nay",
          valueNumber: selectedDoctorSchedule.length,
          helper: "Lá»‹ch trong ngÃ y hiá»‡n táº¡i",
          countLabel: "ca",
          accent: "emerald",
          isActive: true,
          displayOrder: 2,
        }),
      ]);

      const nextNotificationPreference = {
        id: selectedNotifications?.id || `notification-${selectedDoctor.uid}`,
        doctorUid: selectedDoctor.uid,
        language: selectedNotifications?.language || "vi",
        newApptEmail: selectedNotifications?.newApptEmail ?? true,
        newApptApp: selectedNotifications?.newApptApp ?? true,
        reminderEmail: selectedNotifications?.reminderEmail ?? true,
        reminderApp: selectedNotifications?.reminderApp ?? true,
        reportEmail: selectedNotifications?.reportEmail ?? false,
        reportApp: selectedNotifications?.reportApp ?? true,
        twoFactorEnabled: selectedNotifications?.twoFactorEnabled ?? false,
        updatedAt: nowIsoString(),
      };

      await upsertNotificationPreference(getMedAssistDataConnect(), nextNotificationPreference);

      setBundle((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          profiles: dedupeByKey(
            [
              ...current.profiles.filter((profile) => profile.doctorUid !== selectedDoctor.uid),
              {
                id: form.id,
                doctorUid: selectedDoctor.uid,
                fullName: form.fullName,
                dob: form.dob || null,
                gender: form.gender || null,
                phone: form.phone || null,
                specialty: form.specialty || null,
                certNumber: form.certNumber || null,
                bio: form.bio || null,
                avatarUrl: form.avatarUrl || null,
                verificationStatus: form.verificationStatus,
                verificationDocumentName: selectedProfile?.verificationDocumentName || null,
                verificationDocumentDataUrl: selectedProfile?.verificationDocumentDataUrl || null,
                verificationUpdatedAt: nowIsoString(),
                updatedAt: nowIsoString(),
              },
            ],
            (item) => item.id
          ),
          notificationPreferences: dedupeByKey(
            [
              ...current.notificationPreferences.filter((item) => item.doctorUid !== selectedDoctor.uid),
              nextNotificationPreference,
            ],
            (item) => item.id
          ),
        };
      });

      alert("ÄÃ£ lÆ°u há»“ sÆ¡ quáº£n trá»‹ bÃ¡c sÄ©.");
    } catch (error) {
      console.error("KhÃ´ng thá»ƒ lÆ°u há»“ sÆ¡ bÃ¡c sÄ©:", error);
      alert("KhÃ´ng thá»ƒ lÆ°u thay Ä‘á»•i bÃ¡c sÄ©.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateDoctor = async () => {
    if (!newDoctor.email.trim() || !newDoctor.displayName.trim()) {
      alert("Cáº§n nháº­p email vÃ  tÃªn bÃ¡c sÄ©.");
      return;
    }

    setIsCreatingDoctor(true);

    const doctorUid = createClientId("doctor");

    try {
      await createUser(getMedAssistDataConnect(), {
        uid: doctorUid,
        email: newDoctor.email.trim(),
        role: "doctor",
        displayName: newDoctor.displayName.trim(),
        phone: newDoctor.phone.trim() || null,
        status: "active",
        createdAt: nowIsoString(),
        createdBy: getActiveDoctorUid(),
        updatedAt: nowIsoString(),
        updatedBy: getActiveDoctorUid(),
        authProvider: "admin-seeded",
        passwordSet: false,
      });

      await upsertDoctorProfile(getMedAssistDataConnect(), {
        id: `profile-${doctorUid}`,
        doctorUid,
        fullName: newDoctor.displayName.trim(),
        phone: newDoctor.phone.trim() || null,
        specialty: newDoctor.specialty.trim() || null,
        verificationStatus: "pending",
        updatedAt: nowIsoString(),
      });

      const createdDoctor = {
        uid: doctorUid,
        displayName: newDoctor.displayName.trim(),
        email: newDoctor.email.trim(),
        userCode: null,
        role: "doctor",
        status: "active",
        phone: newDoctor.phone.trim() || null,
        photoURL: null,
      };

      setBundle((current) =>
        current
          ? {
              ...current,
              doctors: [createdDoctor, ...current.doctors],
              profiles: [
                {
                  id: `profile-${doctorUid}`,
                  doctorUid,
                  fullName: newDoctor.displayName.trim(),
                  dob: null,
                  gender: null,
                  phone: newDoctor.phone.trim() || null,
                  specialty: newDoctor.specialty.trim() || null,
                  certNumber: null,
                  bio: null,
                  avatarUrl: null,
                  verificationStatus: "pending",
                  verificationDocumentName: null,
                  verificationDocumentDataUrl: null,
                  verificationUpdatedAt: null,
                  updatedAt: nowIsoString(),
                },
                ...current.profiles,
              ],
            }
          : current
      );
      setDoctorPage(1);
      setSelectedDoctorUid(doctorUid);
      router.replace(`${pathname}?doctorUid=${encodeURIComponent(doctorUid)}`, { scroll: false });
      setNewDoctor({ email: "", displayName: "", specialty: "", phone: "" });
      alert("ÄÃ£ táº¡o bÃ¡c sÄ© má»›i trong há»‡ thá»‘ng.");
    } catch (error) {
      console.error("KhÃ´ng thá»ƒ táº¡o bÃ¡c sÄ© má»›i:", error);
      alert("KhÃ´ng thá»ƒ táº¡o bÃ¡c sÄ© má»›i.");
    } finally {
      setIsCreatingDoctor(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminSection
        eyebrow="Doctor Administration"
        title="Quáº£n lÃ½ toÃ n bá»™ Ä‘á»™i ngÅ© bÃ¡c sÄ©"
        description="Quáº£n trá»‹ viÃªn cÃ³ thá»ƒ thÃªm bÃ¡c sÄ© má»›i, cáº­p nháº­t há»“ sÆ¡ hÃ nh nghá», theo dÃµi táº£i lá»‹ch, ca nguy cÆ¡ cao vÃ  cáº¥u hÃ¬nh thÃ´ng bÃ¡o cho tá»«ng ngÆ°á»i."
        actions={
          <div className="min-w-[280px]">
            <AdminInput
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="TÃ¬m bÃ¡c sÄ© theo tÃªn hoáº·c email..."
            />
          </div>
        }
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <AdminStatCard icon={Stethoscope} label="BÃ¡c sÄ©" value={String(doctors.length)} helper="Äang Ä‘Æ°á»£c quáº£n trá»‹ theo dÃµi" tone="blue" />
          <AdminStatCard icon={BadgeCheck} label="ÄÃ£ xÃ¡c minh" value={String(verifiedCount)} helper="Há»“ sÆ¡ Ä‘Ã£ hoÃ n táº¥t xÃ¡c minh hÃ nh nghá»" tone="emerald" />
          <AdminStatCard icon={BellRing} label="Chá» xÃ¡c minh" value={String(pendingCount)} helper="Cáº§n quáº£n trá»‹ rÃ  soÃ¡t há»“ sÆ¡ bÃ¡c sÄ©" tone="amber" />
          <AdminStatCard icon={CalendarRange} label="Lá»‹ch hÃ´m nay" value={String(todayScheduleCount)} helper="Tá»•ng ca Ä‘ang cÃ³ trong ngÃ y toÃ n viá»‡n" tone="slate" />
        </div>
      </AdminSection>

      <div className="grid gap-6 xl:grid-cols-[0.92fr,1.08fr]">
        <AdminSection
          eyebrow="Danh bạ bác sĩ"
          title="Danh sách điều hành"
          description="Chọn một bác sĩ để mở hồ sơ quản trị chi tiết. Danh sách này có cuộn và cố định 10 bác sĩ mỗi trang."
        >
          {isLoading ? (
            <AdminEmptyState message="Đang tải dữ liệu bác sĩ..." />
          ) : filteredDoctors.length === 0 ? (
            <AdminEmptyState message="Không có bác sĩ nào khớp với bộ lọc hiện tại." />
          ) : (
            <>
              <AdminScrollViewport heightClass="max-h-[720px]" className="space-y-3">
                {pagedDoctors.items.map((doctor) => {
                  const doctorProfile = bundle?.profiles.find((item) => item.doctorUid === doctor.uid) || null;
                  const doctorAppointments = (bundle?.appointments ?? []).filter((item) => item.doctorUid === doctor.uid);
                  const highRiskCount = (bundle?.diagnoses ?? []).filter(
                    (item) => item.doctorUid === doctor.uid && item.riskLevel.toLowerCase() === "high"
                  ).length;
                  const isSelected = doctor.uid === selectedDoctor?.uid;

                  return (
                    <button
                      key={doctor.uid}
                      type="button"
                      onClick={() => handleSelectDoctor(doctor.uid)}
                      className={`w-full rounded-[28px] border p-4 text-left transition-colors ${isSelected ? "border-[#35678E] bg-[#35678E]/5" : "border-slate-200 bg-white hover:border-[#8db7da]"}`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{doctor.displayName}</h3>
                          <p className="mt-1 text-sm text-slate-500">{doctor.email}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${getDoctorBadgeClass(doctorProfile?.verificationStatus)}`}>
                          {formatVerificationStatus(doctorProfile?.verificationStatus)}
                        </span>
                      </div>
                      <div className="grid gap-2 text-xs text-slate-500 sm:grid-cols-3">
                        <div className="rounded-2xl bg-slate-50 px-3 py-2">
                          <p className="font-semibold text-slate-700">Chuyên khoa</p>
                          <p className="mt-1 truncate">{doctorProfile?.specialty || "Chưa cập nhật"}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 px-3 py-2">
                          <p className="font-semibold text-slate-700">Lịch khám</p>
                          <p className="mt-1">{doctorAppointments.length} lịch</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 px-3 py-2">
                          <p className="font-semibold text-slate-700">Ca nguy cơ cao</p>
                          <p className="mt-1">{highRiskCount} ca</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </AdminScrollViewport>

              <AdminPagination
                page={pagedDoctors.page}
                pageCount={pagedDoctors.pageCount}
                totalItems={filteredDoctors.length}
                pageSize={ADMIN_DEFAULT_PAGE_SIZE}
                itemLabel="bác sĩ"
                onPageChange={setDoctorPage}
              />
            </>
          )}
        </AdminSection>

        <div className="space-y-6">
          <AdminSection
            eyebrow="Táº¡o bÃ¡c sÄ© má»›i"
            title="Khá»Ÿi táº¡o tÃ i khoáº£n bÃ¡c sÄ©"
            description="Quáº£n trá»‹ viÃªn cÃ³ thá»ƒ thÃªm nhanh tÃ i khoáº£n bÃ¡c sÄ© má»›i vÃ o Data Connect vÃ  táº¡o sáºµn há»“ sÆ¡ hÃ nh nghá»."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput
                value={newDoctor.displayName}
                onChange={(event) => setNewDoctor((current) => ({ ...current, displayName: event.target.value }))}
                placeholder="TÃªn bÃ¡c sÄ©"
              />
              <AdminInput
                value={newDoctor.email}
                onChange={(event) => setNewDoctor((current) => ({ ...current, email: event.target.value }))}
                placeholder="Email bÃ¡c sÄ©"
              />
              <AdminInput
                value={newDoctor.specialty}
                onChange={(event) => setNewDoctor((current) => ({ ...current, specialty: event.target.value }))}
                placeholder="ChuyÃªn khoa"
              />
              <AdminInput
                value={newDoctor.phone}
                onChange={(event) => setNewDoctor((current) => ({ ...current, phone: event.target.value }))}
                placeholder="Sá»‘ Ä‘iá»‡n thoáº¡i"
              />
            </div>
            <div className="mt-4">
              <AdminButton onClick={handleCreateDoctor} disabled={isCreatingDoctor}>
                <span className="inline-flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  {isCreatingDoctor ? "Äang táº¡o..." : "Táº¡o bÃ¡c sÄ© má»›i"}
                </span>
              </AdminButton>
            </div>
          </AdminSection>

          <AdminSection
            eyebrow="Há»“ sÆ¡ hÃ nh nghá»"
            title={selectedDoctor ? `Quáº£n trá»‹ há»“ sÆ¡: ${selectedDoctor.displayName}` : "ChÆ°a chá»n bÃ¡c sÄ©"}
            description="Cáº­p nháº­t há»“ sÆ¡, tráº¡ng thÃ¡i xÃ¡c minh vÃ  Ä‘á»“ng bá»™ KPI quáº£n trá»‹ cho bÃ¡c sÄ© Ä‘ang chá»n."
          >
            {selectedDoctor ? (
              <div className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <AdminInput value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} placeholder="Há» tÃªn" />
                  <AdminInput value={form.specialty} onChange={(event) => setForm((current) => ({ ...current, specialty: event.target.value }))} placeholder="ChuyÃªn khoa" />
                  <AdminInput type="date" value={form.dob} onChange={(event) => setForm((current) => ({ ...current, dob: event.target.value }))} />
                  <AdminSelect value={form.gender} onChange={(event) => setForm((current) => ({ ...current, gender: event.target.value }))}>
                    <option value="">Giá»›i tÃ­nh</option>
                    <option value="Nam">Nam</option>
                    <option value="Ná»¯">Ná»¯</option>
                    <option value="KhÃ¡c">KhÃ¡c</option>
                  </AdminSelect>
                  <AdminInput value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} placeholder="Sá»‘ Ä‘iá»‡n thoáº¡i" />
                  <AdminInput value={form.certNumber} onChange={(event) => setForm((current) => ({ ...current, certNumber: event.target.value }))} placeholder="Sá»‘ chá»©ng chá»‰" />
                  <AdminInput value={form.avatarUrl} onChange={(event) => setForm((current) => ({ ...current, avatarUrl: event.target.value }))} placeholder="Avatar URL" className="md:col-span-2" />
                  <AdminSelect value={form.verificationStatus} onChange={(event) => setForm((current) => ({ ...current, verificationStatus: event.target.value }))} className="md:col-span-2">
                    <option value="pending">Chá» xÃ¡c minh</option>
                    <option value="verified">ÄÃ£ xÃ¡c minh</option>
                    <option value="needs-review">Cáº§n rÃ  soÃ¡t</option>
                  </AdminSelect>
                </div>

                <AdminTextarea
                  rows={4}
                  value={form.bio}
                  onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))}
                  placeholder="MÃ´ táº£ ngáº¯n vá» bÃ¡c sÄ©, chuyÃªn mÃ´n vÃ  ghi chÃº quáº£n trá»‹..."
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <AdminPanel title="Lá»‹ch khÃ¡m" helper="Tá»•ng sá»‘ lá»‹ch Ä‘ang Ä‘Æ°á»£c giao">
                    <p className="text-3xl font-bold text-slate-900">{selectedDoctorAppointments.length}</p>
                  </AdminPanel>
                  <AdminPanel title="Ca nguy cÆ¡ cao" helper="Tá»« dá»¯ liá»‡u AI vÃ  bá»‡nh Ã¡n">
                    <p className="text-3xl font-bold text-slate-900">{selectedDoctorHighRisk.length}</p>
                  </AdminPanel>
                  <AdminPanel title="ThÃ´ng bÃ¡o" helper="Tráº¡ng thÃ¡i notification hiá»‡n táº¡i">
                    <p className="text-sm font-semibold text-slate-700">
                      {selectedNotifications
                        ? `Email: ${selectedNotifications.newApptEmail ? "Báº­t" : "Táº¯t"} â€¢ App: ${selectedNotifications.newApptApp ? "Báº­t" : "Táº¯t"}`
                        : "ChÆ°a cáº¥u hÃ¬nh"}
                    </p>
                  </AdminPanel>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Má»‘c quáº£n trá»‹ gáº§n nháº¥t</p>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <p>Há»“ sÆ¡ xÃ¡c minh: {selectedProfile?.verificationStatus || "pending"}</p>
                    <p>Lá»‹ch gáº§n nháº¥t: {selectedDoctorAppointments[0] ? formatDateTime(selectedDoctorAppointments[0].scheduledAt) : "ChÆ°a cÃ³"}</p>
                    <p>Ca trá»±c hiá»‡n cÃ³: {selectedDoctorSchedule.length}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <AdminButton onClick={handleSaveDoctor} disabled={isSaving}>
                    <span className="inline-flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      {isSaving ? "Äang lÆ°u..." : "LÆ°u há»“ sÆ¡ bÃ¡c sÄ©"}
                    </span>
                  </AdminButton>
                  <AdminButton
                    variant="secondary"
                    onClick={() => alert("ÄÃ£ Ä‘á»“ng bá»™ KPI quáº£n trá»‹ kÃ¨m lÃºc lÆ°u há»“ sÆ¡.")}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Äá»“ng bá»™ KPI
                    </span>
                  </AdminButton>
                </div>
              </div>
            ) : (
              <AdminEmptyState message="Chá»n má»™t bÃ¡c sÄ© á»Ÿ cá»™t trÃ¡i Ä‘á»ƒ má»Ÿ há»“ sÆ¡ quáº£n trá»‹." />
            )}
          </AdminSection>
        </div>
      </div>
    </div>
  );
}


