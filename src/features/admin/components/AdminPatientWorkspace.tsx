"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FilePlus2, Search, ShieldPlus, UsersRound } from "lucide-react";
import {
  createPatientProfile,
  createUser,
  getAiDiagnoses,
  getAllUsers,
  getAppointments,
  getDashboardHomeWorkspace,
  getDoctors,
  type GetAiDiagnosesData,
  type GetAllUsersData,
  type GetAppointmentsData,
  type GetDashboardHomeWorkspaceData,
  type GetDoctorsData,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { createClientId, getActiveDoctorUid, nowIsoString } from "@/shared/lib/medassist-runtime";
import {
  formatDateTime,
  getPageCount,
  paginateItems,
} from "../lib/admin-utils";
import {
  AdminButton,
  AdminEmptyState,
  AdminInput,
  AdminPagination,
  AdminScrollViewport,
  AdminSection,
  AdminSelect,
  AdminStatCard,
} from "./AdminPrimitives";

type PatientBundle = {
  users: GetAllUsersData["users"];
  doctors: GetDoctorsData["users"];
  appointments: GetAppointmentsData["appointments"];
  diagnoses: GetAiDiagnosesData["aiDiagnoses"];
  patientProfiles: GetDashboardHomeWorkspaceData["patientProfiles"];
};

function calculateAge(dob?: string | null) {
  if (!dob) {
    return 0;
  }

  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) {
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}

export function AdminPatientWorkspace() {
  const router = useRouter();
  const [bundle, setBundle] = useState<PatientBundle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [patientPage, setPatientPage] = useState(1);
  const [createForm, setCreateForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    assignedDoctorUid: "",
    dob: "",
    gender: "",
    insuranceNumber: "",
    address: "",
    cccd: "",
    occupation: "",
    bloodType: "",
    allergies: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadBundle = async () => {
      try {
        const [usersResponse, doctorsResponse, appointmentsResponse, diagnosesResponse, dashboardResponse] =
          await Promise.all([
            getAllUsers(getMedAssistDataConnect()),
            getDoctors(getMedAssistDataConnect()),
            getAppointments(getMedAssistDataConnect()),
            getAiDiagnoses(getMedAssistDataConnect()),
            getDashboardHomeWorkspace(getMedAssistDataConnect(), { doctorUid: getActiveDoctorUid() }),
          ]);

        if (!mounted) {
          return;
        }

        setBundle({
          users: usersResponse.data.users,
          doctors: doctorsResponse.data.users,
          appointments: appointmentsResponse.data.appointments,
          diagnoses: diagnosesResponse.data.aiDiagnoses,
          patientProfiles: dashboardResponse.data.patientProfiles,
        });
      } catch (error) {
        console.error("Không thể tải quản trị bệnh nhân:", error);
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

  const patientUsers = useMemo(
    () => (bundle?.users ?? []).filter((user) => user.role.toLowerCase() === "patient"),
    [bundle?.users]
  );

  const profileByUid = useMemo(() => {
    return new Map((bundle?.patientProfiles ?? []).map((profile) => [profile.userUid, profile]));
  }, [bundle?.patientProfiles]);

  const doctors = bundle?.doctors ?? [];
  const filteredPatients = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return patientUsers
      .map((patient) => {
        const profile = profileByUid.get(patient.uid);
        const latestAppointment = (bundle?.appointments ?? [])
          .filter((appointment) => appointment.patientUid === patient.uid)
          .slice()
          .sort((left, right) => new Date(right.scheduledAt).getTime() - new Date(left.scheduledAt).getTime())[0];
        const latestDiagnosis = (bundle?.diagnoses ?? [])
          .filter((diagnosis) => diagnosis.patientUid === patient.uid)
          .slice()
          .sort((left, right) => new Date(right.examDate || "").getTime() - new Date(left.examDate || "").getTime())[0];
        const assignedDoctor = doctors.find((doctor) => doctor.uid === profile?.assignedDoctorUid) || null;

        return {
          patient,
          profile,
          latestAppointment,
          latestDiagnosis,
          assignedDoctor,
        };
      })
      .filter((entry) => {
        if (doctorFilter !== "all" && entry.profile?.assignedDoctorUid !== doctorFilter) {
          return false;
        }

        if (!normalizedSearch) {
          return true;
        }

        return (
          entry.patient.displayName.toLowerCase().includes(normalizedSearch)
          || entry.patient.email.toLowerCase().includes(normalizedSearch)
          || (entry.patient.userCode || "").toLowerCase().includes(normalizedSearch)
          || (entry.profile?.insuranceNumber || "").toLowerCase().includes(normalizedSearch)
        );
      });
  }, [bundle?.appointments, bundle?.diagnoses, doctorFilter, doctors, patientUsers, profileByUid, searchTerm]);

  useEffect(() => {
    setPatientPage(1);
  }, [doctorFilter, searchTerm]);

  const patientPageCount = getPageCount(filteredPatients.length);
  const pagedPatients = paginateItems(filteredPatients, patientPage);

  useEffect(() => {
    if (patientPage > patientPageCount) {
      setPatientPage(patientPageCount);
    }
  }, [patientPage, patientPageCount]);

  const handleCreatePatient = async () => {
    if (!createForm.fullName.trim() || !createForm.assignedDoctorUid) {
      alert("Cần nhập tên bệnh nhân và bác sĩ phụ trách.");
      return;
    }

    setIsCreating(true);
    const patientUid = createClientId("patient");

    try {
      await createUser(getMedAssistDataConnect(), {
        uid: patientUid,
        email: createForm.email.trim() || `${patientUid}@patient.medassist.vn`,
        role: "patient",
        displayName: createForm.fullName.trim(),
        phone: createForm.phone.trim() || null,
        status: "active",
        createdAt: nowIsoString(),
        createdBy: getActiveDoctorUid(),
        updatedAt: nowIsoString(),
        updatedBy: getActiveDoctorUid(),
        authProvider: "admin-seeded",
        passwordSet: false,
      });

      await createPatientProfile(getMedAssistDataConnect(), {
        userUid: patientUid,
        assignedDoctorUid: createForm.assignedDoctorUid,
        dob: createForm.dob || null,
        gender: createForm.gender || null,
        cccd: createForm.cccd || null,
        occupation: createForm.occupation || null,
        insuranceNumber: createForm.insuranceNumber || null,
        address: createForm.address || null,
        bloodType: createForm.bloodType || null,
        allergies: createForm.allergies || null,
      });

      alert("Đã tạo bệnh nhân mới.");
      router.push(`/dashboard/patient/${patientUid}`);
    } catch (error) {
      console.error("Không thể tạo bệnh nhân mới:", error);
      alert("Không thể tạo bệnh nhân mới.");
    } finally {
      setIsCreating(false);
    }
  };

  const highRiskPatients = filteredPatients.filter((item) => item.latestDiagnosis?.riskLevel.toLowerCase() === "high").length;

  return (
    <div className="space-y-6">
      <AdminSection
        eyebrow="Danh sách bệnh nhân"
        title="Quản trị hồ sơ bệnh nhân"
        description="Danh sách được rút gọn, có cuộn dọc và phân trang 10 dòng mỗi trang để quan sát và thao tác nhanh."
        actions={
          <div className="flex flex-wrap gap-3">
            <div className="min-w-[260px]">
              <AdminInput
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Tìm theo tên, mã BN, email hoặc BHYT..."
              />
            </div>
            <div className="min-w-[220px]">
              <AdminSelect value={doctorFilter} onChange={(event) => setDoctorFilter(event.target.value)}>
                <option value="all">Tất cả bác sĩ</option>
                {doctors.map((doctor) => (
                  <option key={doctor.uid} value={doctor.uid}>
                    {doctor.displayName}
                  </option>
                ))}
              </AdminSelect>
            </div>
          </div>
        }
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <AdminStatCard icon={UsersRound} label="Bệnh nhân" value={String(patientUsers.length)} helper="Tổng hồ sơ bệnh nhân trong hệ thống" tone="blue" />
          <AdminStatCard icon={Search} label="Đang lọc" value={String(filteredPatients.length)} helper="Số dòng đang hiển thị theo bộ lọc" tone="emerald" />
          <AdminStatCard icon={ShieldPlus} label="Nguy cơ cao" value={String(highRiskPatients)} helper="Dựa trên chẩn đoán AI gần nhất" tone="rose" />
          <AdminStatCard icon={FilePlus2} label="Bác sĩ phụ trách" value={String(doctors.length)} helper="Có thể gán bệnh nhân cho bất kỳ bác sĩ nào" tone="slate" />
        </div>
      </AdminSection>

      <AdminSection
        eyebrow="Sổ bệnh nhân"
        title="Danh sách bệnh nhân dễ đọc hơn"
        description="Khung danh sách được đặt riêng một hàng để tên bệnh nhân hiển thị rõ hơn. Mỗi trang vẫn giữ cố định 10 dòng và có cuộn dọc."
      >
        {isLoading ? (
          <AdminEmptyState message="Đang tải hồ sơ bệnh nhân..." />
        ) : filteredPatients.length === 0 ? (
          <AdminEmptyState message="Không có bệnh nhân khớp với bộ lọc hiện tại." />
        ) : (
          <>
            <div className="rounded-3xl border border-slate-200 bg-white">
              <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1.1fr)_190px] gap-4 border-b border-slate-100 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                <span>Bệnh nhân</span>
                <span>Phụ trách & AI gần nhất</span>
                <span>Lịch gần nhất</span>
              </div>
              <AdminScrollViewport heightClass="max-h-[620px]">
                {pagedPatients.items.map((entry) => (
                  <button
                    key={entry.patient.uid}
                    type="button"
                    onClick={() => router.push(`/dashboard/patient/${entry.patient.uid}`)}
                    className="grid w-full grid-cols-[minmax(0,1.35fr)_minmax(0,1.1fr)_190px] gap-4 border-b border-slate-100 px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-slate-50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-slate-900">{entry.patient.displayName}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span>{entry.patient.userCode || entry.patient.uid}</span>
                        <span>{calculateAge(entry.profile?.dob)} tuổi</span>
                        <span>{entry.profile?.insuranceNumber || "Chưa có BHYT"}</span>
                      </div>
                    </div>
                    <div className="min-w-0 text-sm text-slate-600">
                      <p className="truncate font-medium text-slate-800">{entry.assignedDoctor?.displayName || "Chưa gán bác sĩ"}</p>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        AI: {entry.latestDiagnosis?.stageLabel || entry.latestDiagnosis?.riskLevel || "Chưa có kết quả"}
                      </p>
                    </div>
                    <div className="text-sm text-slate-600">
                      {entry.latestAppointment ? formatDateTime(entry.latestAppointment.scheduledAt) : "Chưa có lịch"}
                    </div>
                  </button>
                ))}
              </AdminScrollViewport>
            </div>
            <AdminPagination
              page={pagedPatients.page}
              pageCount={pagedPatients.pageCount}
              totalItems={filteredPatients.length}
              onPageChange={setPatientPage}
              itemLabel="bệnh nhân"
            />
          </>
        )}
      </AdminSection>

      <AdminSection
        eyebrow="Khởi tạo hồ sơ"
        title="Thêm bệnh nhân mới"
        description="Khung tạo mới được tách xuống bên dưới để phần danh sách phía trên có đủ không gian hiển thị tên và thông tin bệnh nhân."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AdminInput value={createForm.fullName} onChange={(event) => setCreateForm((current) => ({ ...current, fullName: event.target.value }))} placeholder="Họ tên bệnh nhân" />
          <AdminInput value={createForm.email} onChange={(event) => setCreateForm((current) => ({ ...current, email: event.target.value }))} placeholder="Email" />
          <AdminInput value={createForm.phone} onChange={(event) => setCreateForm((current) => ({ ...current, phone: event.target.value }))} placeholder="Số điện thoại" />
          <AdminSelect value={createForm.assignedDoctorUid} onChange={(event) => setCreateForm((current) => ({ ...current, assignedDoctorUid: event.target.value }))}>
            <option value="">Chọn bác sĩ phụ trách</option>
            {doctors.map((doctor) => (
              <option key={doctor.uid} value={doctor.uid}>
                {doctor.displayName}
              </option>
            ))}
          </AdminSelect>
          <AdminInput type="date" value={createForm.dob} onChange={(event) => setCreateForm((current) => ({ ...current, dob: event.target.value }))} />
          <AdminSelect value={createForm.gender} onChange={(event) => setCreateForm((current) => ({ ...current, gender: event.target.value }))}>
            <option value="">Giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nu">Nữ</option>
            <option value="Khac">Khác</option>
          </AdminSelect>
          <AdminInput value={createForm.insuranceNumber} onChange={(event) => setCreateForm((current) => ({ ...current, insuranceNumber: event.target.value }))} placeholder="Số BHYT" />
          <AdminInput value={createForm.bloodType} onChange={(event) => setCreateForm((current) => ({ ...current, bloodType: event.target.value }))} placeholder="Nhóm máu" />
          <AdminInput value={createForm.cccd} onChange={(event) => setCreateForm((current) => ({ ...current, cccd: event.target.value }))} placeholder="CCCD" />
          <AdminInput value={createForm.occupation} onChange={(event) => setCreateForm((current) => ({ ...current, occupation: event.target.value }))} placeholder="Nghề nghiệp" />
          <AdminInput value={createForm.address} onChange={(event) => setCreateForm((current) => ({ ...current, address: event.target.value }))} placeholder="Địa chỉ" className="md:col-span-2 xl:col-span-2" />
          <AdminInput value={createForm.allergies} onChange={(event) => setCreateForm((current) => ({ ...current, allergies: event.target.value }))} placeholder="Dị ứng / lưu ý quan trọng" className="md:col-span-2 xl:col-span-1" />
        </div>
        <div className="mt-4">
          <AdminButton onClick={handleCreatePatient} disabled={isCreating}>
            {isCreating ? "Đang tạo..." : "Tạo bệnh nhân mới"}
          </AdminButton>
        </div>
      </AdminSection>
    </div>
  );
}

