"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarPlus2, Save, ShieldPlus, UserCog } from "lucide-react";
import {
  createAppointment,
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
  upsertPatientProfile,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { getActiveDoctorUid, nowIsoString } from "@/shared/lib/medassist-runtime";
import { AdminButton, AdminEmptyState, AdminInput, AdminPanel, AdminSection, AdminSelect, AdminTextarea } from "./AdminPrimitives";
import { formatDateTime } from "../lib/admin-utils";

type PatientDetailBundle = {
  users: GetAllUsersData["users"];
  doctors: GetDoctorsData["users"];
  appointments: GetAppointmentsData["appointments"];
  diagnoses: GetAiDiagnosesData["aiDiagnoses"];
  patientProfiles: GetDashboardHomeWorkspaceData["patientProfiles"];
};

type PatientProfileForm = {
  assignedDoctorUid: string;
  dob: string;
  gender: string;
  insuranceNumber: string;
  address: string;
  cccd: string;
  occupation: string;
  allergies: string;
  bloodType: string;
};

const EMPTY_FORM: PatientProfileForm = {
  assignedDoctorUid: "",
  dob: "",
  gender: "",
  insuranceNumber: "",
  address: "",
  cccd: "",
  occupation: "",
  allergies: "",
  bloodType: "",
};

export function AdminPatientDetailWorkspace({ patientUid }: { patientUid: string }) {
  const [bundle, setBundle] = useState<PatientDetailBundle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  const [profileForm, setProfileForm] = useState<PatientProfileForm>(EMPTY_FORM);
  const [appointmentForm, setAppointmentForm] = useState({
    doctorUid: "",
    scheduledAt: "",
    specialty: "",
    appointmentType: "",
    symptoms: "",
  });

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
        console.error("Không thể tải hồ sơ bệnh nhân quản trị:", error);
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

  const patientUser = useMemo(
    () => bundle?.users.find((user) => user.uid === patientUid) || null,
    [bundle?.users, patientUid]
  );

  const patientProfile = useMemo(
    () => bundle?.patientProfiles.find((profile) => profile.userUid === patientUid) || null,
    [bundle?.patientProfiles, patientUid]
  );

  const patientAppointments = useMemo(
    () =>
      (bundle?.appointments ?? [])
        .filter((appointment) => appointment.patientUid === patientUid)
        .slice()
        .sort((left, right) => new Date(right.scheduledAt).getTime() - new Date(left.scheduledAt).getTime()),
    [bundle?.appointments, patientUid]
  );

  const patientDiagnoses = useMemo(
    () =>
      (bundle?.diagnoses ?? [])
        .filter((diagnosis) => diagnosis.patientUid === patientUid)
        .slice()
        .sort((left, right) => new Date(right.examDate || "").getTime() - new Date(left.examDate || "").getTime()),
    [bundle?.diagnoses, patientUid]
  );

  useEffect(() => {
    if (!patientProfile) {
      return;
    }

    setProfileForm({
      assignedDoctorUid: patientProfile.assignedDoctorUid || "",
      dob: patientProfile.dob || "",
      gender: patientProfile.gender || "",
      insuranceNumber: patientProfile.insuranceNumber || "",
      address: patientProfile.address || "",
      cccd: patientProfile.cccd || "",
      occupation: patientProfile.occupation || "",
      allergies: patientProfile.allergies || "",
      bloodType: patientProfile.bloodType || "",
    });
  }, [patientProfile]);

  const assignedDoctor = bundle?.doctors.find((doctor) => doctor.uid === profileForm.assignedDoctorUid) || null;

  const handleSaveProfile = async () => {
    if (!patientProfile) {
      alert("Hồ sơ nền của bệnh nhân chưa tồn tại để cập nhật.");
      return;
    }

    setIsSaving(true);

    try {
      await upsertPatientProfile(getMedAssistDataConnect(), {
        id: patientProfile.id,
        userUid: patientUid,
        assignedDoctorUid: profileForm.assignedDoctorUid || null,
        dob: profileForm.dob || null,
        gender: profileForm.gender || null,
        cccd: profileForm.cccd || null,
        occupation: profileForm.occupation || null,
        insuranceNumber: profileForm.insuranceNumber || null,
        address: profileForm.address || null,
        bloodType: profileForm.bloodType || null,
        allergies: profileForm.allergies || null,
      });

      alert("Đã lưu cập nhật hồ sơ bệnh nhân.");
    } catch (error) {
      console.error("Không thể cập nhật hồ sơ bệnh nhân:", error);
      alert("Không thể cập nhật hồ sơ bệnh nhân.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateAppointment = async () => {
    if (!appointmentForm.doctorUid || !appointmentForm.scheduledAt) {
      alert("Cần chọn bác sĩ và thời gian hẹn.");
      return;
    }

    const doctor = bundle?.doctors.find((item) => item.uid === appointmentForm.doctorUid);
    if (!doctor) {
      alert("Không tìm thấy bác sĩ được chọn.");
      return;
    }

    setIsCreatingAppointment(true);

    try {
      await createAppointment(getMedAssistDataConnect(), {
        patientUid,
        doctorUid: doctor.uid,
        doctorName: doctor.displayName,
        scheduledAt: new Date(appointmentForm.scheduledAt).toISOString(),
        status: "PENDING",
        specialty: appointmentForm.specialty || null,
        appointmentType: appointmentForm.appointmentType || null,
        symptoms: appointmentForm.symptoms || null,
      });

      alert("Đã tạo lịch hẹn mới cho bệnh nhân.");
      setAppointmentForm({
        doctorUid: "",
        scheduledAt: "",
        specialty: "",
        appointmentType: "",
        symptoms: "",
      });
    } catch (error) {
      console.error("Không thể tạo lịch hẹn mới:", error);
      alert("Không thể tạo lịch hẹn mới.");
    } finally {
      setIsCreatingAppointment(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminSection
        eyebrow="Patient Detail"
        title={patientUser ? `Hồ sơ quản trị: ${patientUser.displayName}` : "Hồ sơ bệnh nhân"}
        description="Admin có thể cập nhật thông tin nền, đổi bác sĩ phụ trách, theo dõi lịch hẹn và mở rộng điều phối khám từ cùng một màn hình."
        actions={
          <Link
            href="/dashboard/patient"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại danh sách bệnh nhân
          </Link>
        }
      >
        {isLoading ? (
          <AdminEmptyState message="Đang tải hồ sơ bệnh nhân..." />
        ) : !patientUser ? (
          <AdminEmptyState message="Không tìm thấy bệnh nhân trong hệ thống." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AdminPanel title="Thông tin định danh" helper="Tài khoản nền và liên hệ">
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>Email:</strong> {patientUser.email}</p>
                <p><strong>SĐT:</strong> {patientUser.phone || "Chưa cập nhật"}</p>
                <p><strong>Mã bệnh nhân:</strong> {patientUser.userCode || patientUser.uid}</p>
              </div>
            </AdminPanel>
            <AdminPanel title="Bác sĩ phụ trách" helper="Có thể thay đổi từ form bên dưới">
              <p className="text-lg font-semibold text-slate-900">{assignedDoctor?.displayName || "Chưa gán"}</p>
            </AdminPanel>
            <AdminPanel title="Lịch hẹn" helper="Tổng lịch đã tạo">
              <p className="text-3xl font-bold text-slate-900">{patientAppointments.length}</p>
            </AdminPanel>
            <AdminPanel title="AI / bệnh nền" helper="Kết quả gần nhất">
              <p className="text-sm font-semibold text-slate-700">
                {patientDiagnoses[0]?.stageLabel || patientDiagnoses[0]?.riskLevel || "Chưa có dữ liệu AI"}
              </p>
            </AdminPanel>
          </div>
        )}
      </AdminSection>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <AdminSection
          eyebrow="Cập nhật hồ sơ"
          title="Thông tin nền của bệnh nhân"
          description="Những thay đổi ở đây sẽ phản ánh sang các màn hình bác sĩ và báo cáo liên quan."
        >
          {patientProfile ? (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <AdminSelect value={profileForm.assignedDoctorUid} onChange={(event) => setProfileForm((current) => ({ ...current, assignedDoctorUid: event.target.value }))}>
                  <option value="">Chọn bác sĩ phụ trách</option>
                  {(bundle?.doctors ?? []).map((doctor) => (
                    <option key={doctor.uid} value={doctor.uid}>
                      {doctor.displayName}
                    </option>
                  ))}
                </AdminSelect>
                <AdminInput type="date" value={profileForm.dob} onChange={(event) => setProfileForm((current) => ({ ...current, dob: event.target.value }))} />
                <AdminSelect value={profileForm.gender} onChange={(event) => setProfileForm((current) => ({ ...current, gender: event.target.value }))}>
                  <option value="">Giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </AdminSelect>
                <AdminInput value={profileForm.insuranceNumber} onChange={(event) => setProfileForm((current) => ({ ...current, insuranceNumber: event.target.value }))} placeholder="Số BHYT" />
                <AdminInput value={profileForm.bloodType} onChange={(event) => setProfileForm((current) => ({ ...current, bloodType: event.target.value }))} placeholder="Nhóm máu" />
                <AdminInput value={profileForm.cccd} onChange={(event) => setProfileForm((current) => ({ ...current, cccd: event.target.value }))} placeholder="CCCD" />
                <AdminInput value={profileForm.occupation} onChange={(event) => setProfileForm((current) => ({ ...current, occupation: event.target.value }))} placeholder="Nghề nghiệp" className="md:col-span-2" />
                <AdminInput value={profileForm.address} onChange={(event) => setProfileForm((current) => ({ ...current, address: event.target.value }))} placeholder="Địa chỉ" className="md:col-span-2" />
              </div>
              <AdminTextarea rows={4} value={profileForm.allergies} onChange={(event) => setProfileForm((current) => ({ ...current, allergies: event.target.value }))} placeholder="Dị ứng, tiền sử hoặc ghi chú điều trị..." />
              <AdminButton onClick={handleSaveProfile} disabled={isSaving}>
                <span className="inline-flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {isSaving ? "Đang lưu..." : "Lưu hồ sơ bệnh nhân"}
                </span>
              </AdminButton>
            </div>
          ) : (
            <AdminEmptyState message="Bệnh nhân này chưa có patient profile để cập nhật." />
          )}
        </AdminSection>

        <AdminSection
          eyebrow="Tạo lịch hẹn"
          title="Điều phối khám mới cho bệnh nhân"
          description="Admin có thể lên lịch ngay từ hồ sơ bệnh nhân mà không cần đi qua màn hình lịch chung."
        >
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <AdminSelect value={appointmentForm.doctorUid} onChange={(event) => setAppointmentForm((current) => ({ ...current, doctorUid: event.target.value }))}>
                <option value="">Chọn bác sĩ</option>
                {(bundle?.doctors ?? []).map((doctor) => (
                  <option key={doctor.uid} value={doctor.uid}>
                    {doctor.displayName}
                  </option>
                ))}
              </AdminSelect>
              <AdminInput type="datetime-local" value={appointmentForm.scheduledAt} onChange={(event) => setAppointmentForm((current) => ({ ...current, scheduledAt: event.target.value }))} />
              <AdminInput value={appointmentForm.specialty} onChange={(event) => setAppointmentForm((current) => ({ ...current, specialty: event.target.value }))} placeholder="Chuyên khoa" />
              <AdminInput value={appointmentForm.appointmentType} onChange={(event) => setAppointmentForm((current) => ({ ...current, appointmentType: event.target.value }))} placeholder="Loại lịch hẹn" />
            </div>
            <AdminTextarea rows={3} value={appointmentForm.symptoms} onChange={(event) => setAppointmentForm((current) => ({ ...current, symptoms: event.target.value }))} placeholder="Triệu chứng hoặc mô tả lý do khám..." />
            <AdminButton onClick={handleCreateAppointment} disabled={isCreatingAppointment}>
              <span className="inline-flex items-center gap-2">
                <CalendarPlus2 className="h-4 w-4" />
                {isCreatingAppointment ? "Đang tạo..." : "Tạo lịch hẹn"}
              </span>
            </AdminButton>
          </div>
        </AdminSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <AdminSection
          eyebrow="Lịch sử lịch hẹn"
          title="Timeline điều phối"
          description="Toàn bộ lịch khám của bệnh nhân, không bị giới hạn theo bác sĩ đăng nhập."
        >
          <div className="space-y-3">
            {patientAppointments.length === 0 ? (
              <AdminEmptyState message="Bệnh nhân chưa có lịch hẹn nào." />
            ) : (
              patientAppointments.map((appointment) => (
                <div key={appointment.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-base font-bold text-slate-900">{appointment.doctorName}</h3>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{formatDateTime(appointment.scheduledAt)}</p>
                  <p className="mt-2 text-sm text-slate-600">{appointment.specialty || appointment.appointmentType || "Khám tổng quát"}</p>
                </div>
              ))
            )}
          </div>
        </AdminSection>

        <AdminSection
          eyebrow="Theo dõi AI / bệnh"
          title="Chẩn đoán liên quan bệnh nhân"
          description="Giúp admin quyết định ưu tiên khám hoặc điều phối bác sĩ chuyên sâu."
        >
          <div className="space-y-3">
            {patientDiagnoses.length === 0 ? (
              <AdminEmptyState message="Bệnh nhân chưa có bản ghi AI nào." />
            ) : (
              patientDiagnoses.map((diagnosis) => (
                <div key={diagnosis.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-base font-bold text-slate-900">{diagnosis.stageLabel || "Kết quả AI"}</h3>
                    <span className="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-rose-600">
                      {diagnosis.riskLevel}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    {diagnosis.doctor?.displayName || "Bác sĩ"} • {formatDateTime(diagnosis.examDate || null)}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {diagnosis.reportSummary || diagnosis.aiAnalysis || diagnosis.doctorAdvice || "Chưa có ghi chú bổ sung."}
                  </p>
                </div>
              ))
            )}
          </div>
        </AdminSection>
      </div>
    </div>
  );
}
