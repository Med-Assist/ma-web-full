"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronLeft, FileText, HeartPulse, Phone, ShieldCheck, UserRound } from "lucide-react";
import { getPatientWorkspace, type GetPatientWorkspaceData } from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { calculateAge, getActiveDoctorUid, getDiagnosisLabel, getPriorityLabel } from "@/shared/lib/medassist-runtime";

type PatientWorkspaceProps = {
  patientUid: string;
};

export function PatientDetailWorkspace({ patientUid }: PatientWorkspaceProps) {
  const [workspace, setWorkspace] = useState<GetPatientWorkspaceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getPatientWorkspace(getMedAssistDataConnect(), {
      doctorUid: getActiveDoctorUid(),
    })
      .then((response) => {
        if (!isMounted) {
          return;
        }

        setWorkspace(response.data);
      })
      .catch((error) => {
        console.error("Không thể tải chi tiết bệnh nhân:", error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [patientUid]);

  const patientProfile = useMemo(
    () => workspace?.patientProfiles.find((profile) => profile.userUid === patientUid) ?? null,
    [patientUid, workspace?.patientProfiles]
  );

  const diagnoses = useMemo(
    () =>
      (workspace?.aiDiagnoses ?? [])
        .filter((item) => item.patientUid === patientUid)
        .slice()
        .sort((left, right) => (right.examDate || "").localeCompare(left.examDate || "")),
    [patientUid, workspace?.aiDiagnoses]
  );

  const appointments = useMemo(
    () =>
      (workspace?.appointments ?? [])
        .filter((item) => item.patientUid === patientUid)
        .slice()
        .sort((left, right) => new Date(right.scheduledAt).getTime() - new Date(left.scheduledAt).getTime()),
    [patientUid, workspace?.appointments]
  );

  const latestDiagnosis = diagnoses[0] ?? null;
  const latestAppointment = appointments[0] ?? null;
  const priority = getPriorityLabel(latestDiagnosis?.riskLevel, latestAppointment?.status);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-sm font-medium text-slate-500 shadow-sm">
        Đang tải chi tiết bệnh nhân...
      </div>
    );
  }

  if (!patientProfile) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-sm font-medium text-slate-500 shadow-sm">
        Không tìm thấy hồ sơ bệnh nhân.
      </div>
    );
  }

  const patient = patientProfile.user;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <Link href="/dashboard/patient" className="inline-flex items-center gap-2 font-semibold text-[#35678E] hover:text-[#274e6d]">
          <ChevronLeft className="h-4 w-4" />
          Quay lại danh sách
        </Link>
        <span>•</span>
        <span>Hồ sơ chi tiết</span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                {patient.photoURL ? (
                  <img src={patient.photoURL} alt={patient.displayName} className="h-full w-full rounded-full object-cover" />
                ) : (
                  <UserRound className="h-10 w-10" />
                )}
              </div>
              <h1 className="mt-4 text-2xl font-bold text-slate-900">{patient.displayName}</h1>
              <p className="mt-1 text-sm text-slate-500">
                {calculateAge(patientProfile.dob)} tuổi • {patientProfile.gender || "Khác"}
              </p>
              <div className="mt-4 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {patient.userCode ? `Mã hồ sơ: ${patient.userCode}` : patient.uid}
              </div>
            </div>

            <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Điện thoại</span>
                <span className="font-semibold text-slate-900">{patient.phone || "Chưa cập nhật"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Email</span>
                <span className="font-semibold text-slate-900">{patient.email}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">BHYT</span>
                <span className="font-semibold text-slate-900">{patientProfile.insuranceNumber || "Chưa cập nhật"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">CCCD</span>
                <span className="font-semibold text-slate-900">{patientProfile.cccd || "Chưa cập nhật"}</span>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Chỉ số nền</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Nhóm máu</p>
                <p className="mt-2 text-lg font-bold text-slate-900">{patientProfile.bloodType || "Chưa rõ"}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Nghề nghiệp</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{patientProfile.occupation || "Chưa cập nhật"}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Chiều cao</p>
                <p className="mt-2 text-lg font-bold text-slate-900">
                  {patientProfile.height ? `${patientProfile.height} cm` : "Chưa cập nhật"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Cân nặng</p>
                <p className="mt-2 text-lg font-bold text-slate-900">
                  {patientProfile.weight ? `${patientProfile.weight} kg` : "Chưa cập nhật"}
                </p>
              </div>
            </div>
          </section>
        </aside>

        <main className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-[#35678E]">
                  <HeartPulse className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Chẩn đoán gần nhất</span>
                </div>
                <p className="mt-4 text-2xl font-bold text-slate-900">
                  {getDiagnosisLabel(latestDiagnosis?.stageLabel, latestDiagnosis?.riskLevel)}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {latestDiagnosis?.examDate ? `Ngày khám: ${latestDiagnosis.examDate}` : "Chưa có kết quả AI gần đây"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Mức ưu tiên</span>
                </div>
                <p className={`mt-4 text-2xl font-bold ${priority.priorityColor}`}>{priority.priority}</p>
                <p className="mt-2 text-sm text-slate-500">{priority.prioritySub}</p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-orange-500">
                  <CalendarDays className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Lịch gần nhất</span>
                </div>
                <p className="mt-4 text-2xl font-bold text-slate-900">
                  {latestAppointment ? new Date(latestAppointment.scheduledAt).toLocaleDateString("vi-VN") : "--/--/----"}
                </p>
                <p className="mt-2 text-sm text-slate-500">{latestAppointment?.status || "Chưa có lịch hẹn"}</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#35678E]" />
              <h2 className="text-lg font-bold text-slate-900">Thông tin bệnh án</h2>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Dị ứng / lưu ý</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{patientProfile.allergies || "Không có ghi nhận"}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Địa chỉ</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{patientProfile.address || "Chưa cập nhật"}</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-[#35678E]" />
              <h2 className="text-lg font-bold text-slate-900">Lịch sử chẩn đoán AI</h2>
            </div>

            <div className="mt-5 space-y-4">
              {diagnoses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
                  Chưa có bản ghi chẩn đoán AI cho bệnh nhân này.
                </div>
              ) : (
                diagnoses.map((diagnosis) => (
                  <article key={diagnosis.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Kết quả</p>
                        <h3 className="mt-2 text-lg font-bold text-slate-900">
                          {getDiagnosisLabel(diagnosis.stageLabel, diagnosis.riskLevel)}
                        </h3>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-600">
                        {diagnosis.examDate || "Chưa cập nhật ngày"}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                      <span className="rounded-full bg-white px-3 py-1">Nguy cơ: {diagnosis.riskLevel}</span>
                      <span className="rounded-full bg-white px-3 py-1">Độ tin cậy: {diagnosis.confidenceScore}%</span>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-[#35678E]" />
              <h2 className="text-lg font-bold text-slate-900">Lịch hẹn liên quan</h2>
            </div>

            <div className="mt-5 space-y-4">
              {appointments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
                  Chưa có lịch hẹn nào được ghi nhận.
                </div>
              ) : (
                appointments.map((appointment) => (
                  <article key={appointment.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Ngày hẹn</p>
                      <h3 className="mt-2 text-lg font-bold text-slate-900">
                        {new Date(appointment.scheduledAt).toLocaleString("vi-VN")}
                      </h3>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-600">
                      {appointment.status}
                    </span>
                  </article>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
