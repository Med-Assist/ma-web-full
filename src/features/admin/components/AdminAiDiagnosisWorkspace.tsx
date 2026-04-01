"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, BadgeCheck, Eye, Save } from "lucide-react";
import {
  getAiDiagnoses,
  getAiDiagnosisWorkspace,
  getDoctors,
  type GetAiDiagnosesData,
  type GetAiDiagnosisWorkspaceData,
  type GetDoctorsData,
  updateAiDiagnosisReview,
  upsertReportAlertCase,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { deriveInitials, getActiveDoctorUid } from "@/shared/lib/medassist-runtime";
import { getPageCount, paginateItems, formatDateTime } from "../lib/admin-utils";
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

type AiBundle = {
  doctors: GetDoctorsData["users"];
  diagnoses: GetAiDiagnosesData["aiDiagnoses"];
  references: GetAiDiagnosisWorkspaceData["aiDiagnosisReferences"];
};

export function AdminAiDiagnosisWorkspace() {
  const [bundle, setBundle] = useState<AiBundle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [diagnosisPage, setDiagnosisPage] = useState(1);
  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState<string | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [reportSummary, setReportSummary] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadBundle = async () => {
      try {
        const [doctorsResponse, diagnosesResponse, workspaceResponse] = await Promise.all([
          getDoctors(getMedAssistDataConnect()),
          getAiDiagnoses(getMedAssistDataConnect()),
          getAiDiagnosisWorkspace(getMedAssistDataConnect(), { doctorUid: getActiveDoctorUid() }),
        ]);

        if (!mounted) {
          return;
        }

        const nextBundle = {
          doctors: doctorsResponse.data.users,
          diagnoses: diagnosesResponse.data.aiDiagnoses.slice().sort((left, right) => {
            return new Date(right.examDate || "").getTime() - new Date(left.examDate || "").getTime();
          }),
          references: workspaceResponse.data.aiDiagnosisReferences,
        };

        setBundle(nextBundle);
        setSelectedDiagnosisId(nextBundle.diagnoses[0]?.id || null);
      } catch (error) {
        console.error("Không thể tải quản trị AI diagnosis:", error);
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
  const filteredDiagnoses = useMemo(() => {
    return (bundle?.diagnoses ?? []).filter((diagnosis) => {
      if (doctorFilter !== "all" && diagnosis.doctorUid !== doctorFilter) {
        return false;
      }

      if (riskFilter !== "all" && diagnosis.riskLevel.toLowerCase() !== riskFilter) {
        return false;
      }

      return true;
    });
  }, [bundle?.diagnoses, doctorFilter, riskFilter]);

  useEffect(() => {
    setDiagnosisPage(1);
  }, [doctorFilter, riskFilter]);

  const diagnosisPageCount = getPageCount(filteredDiagnoses.length);
  const pagedDiagnoses = paginateItems(filteredDiagnoses, diagnosisPage);

  useEffect(() => {
    if (diagnosisPage > diagnosisPageCount) {
      setDiagnosisPage(diagnosisPageCount);
    }
  }, [diagnosisPage, diagnosisPageCount]);

  useEffect(() => {
    if (!filteredDiagnoses.length) {
      setSelectedDiagnosisId(null);
      return;
    }

    if (!selectedDiagnosisId || !filteredDiagnoses.some((diagnosis) => diagnosis.id === selectedDiagnosisId)) {
      setSelectedDiagnosisId(filteredDiagnoses[0].id);
    }
  }, [filteredDiagnoses, selectedDiagnosisId]);

  const selectedDiagnosis = filteredDiagnoses.find((diagnosis) => diagnosis.id === selectedDiagnosisId) || filteredDiagnoses[0] || null;
  const selectedReferences = (bundle?.references ?? []).filter((reference) => reference.diagnosisId === selectedDiagnosis?.id);

  useEffect(() => {
    setReviewNote(selectedDiagnosis?.doctorAdvice || "");
    setReportSummary(selectedDiagnosis?.reportSummary || "");
  }, [selectedDiagnosis]);

  const highRiskCount = (bundle?.diagnoses ?? []).filter((item) => item.riskLevel.toLowerCase() === "high").length;
  const approvedCount = (bundle?.diagnoses ?? []).filter((item) => item.doctorApproved).length;

  const handleSaveReview = async () => {
    if (!selectedDiagnosis) {
      return;
    }

    setIsSaving(true);

    try {
      await updateAiDiagnosisReview(getMedAssistDataConnect(), {
        id: selectedDiagnosis.id,
        doctorAdvice: reviewNote || null,
        doctorApproved: true,
        reportSummary: reportSummary || null,
      });

      alert("Đã lưu đánh giá quản trị cho chẩn đoán AI.");
    } catch (error) {
      console.error("Không thể lưu đánh giá AI:", error);
      alert("Không thể lưu đánh giá AI.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEscalateAlert = async () => {
    if (!selectedDiagnosis) {
      return;
    }

    try {
      await upsertReportAlertCase(getMedAssistDataConnect(), {
        id: `ai-alert-${selectedDiagnosis.id}`,
        patientUid: selectedDiagnosis.patientUid,
        initials: deriveInitials(selectedDiagnosis.patient.displayName),
        name: selectedDiagnosis.patient.displayName,
        recordId: selectedDiagnosis.patient.userCode || selectedDiagnosis.patient.uid,
        conclusion: reportSummary || selectedDiagnosis.stageLabel || selectedDiagnosis.riskLevel,
        phone: selectedDiagnosis.patient.phone || "Chưa cập nhật",
        displayOrder: 0,
      });

      alert("Đã đẩy ca này sang danh sách cảnh báo.");
    } catch (error) {
      console.error("Không thể đẩy alert AI:", error);
      alert("Không thể tạo cảnh báo từ ca AI này.");
    }
  };

  return (
    <div className="space-y-6">
      <AdminSection
        eyebrow="Kiểm duyệt AI"
        title="Rà soát toàn bộ ca chẩn đoán AI"
        description="Danh sách AI đã được đưa về dạng gọn hơn, có cuộn dọc và phân trang 10 dòng mỗi trang."
        actions={
          <div className="flex flex-wrap gap-3">
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
            <div className="min-w-[180px]">
              <AdminSelect value={riskFilter} onChange={(event) => setRiskFilter(event.target.value)}>
                <option value="all">Tất cả mức nguy cơ</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </AdminSelect>
            </div>
          </div>
        }
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <AdminStatCard icon={Eye} label="Ca AI" value={String(bundle?.diagnoses.length || 0)} helper="Toàn bộ bản ghi AI hiện có" tone="blue" />
          <AdminStatCard icon={AlertTriangle} label="Nguy co cao" value={String(highRiskCount)} helper="Cần admin theo dõi và điều phối sớm" tone="rose" />
          <AdminStatCard icon={BadgeCheck} label="Đã duyệt" value={String(approvedCount)} helper="Bản ghi đã được xác nhận lại" tone="emerald" />
          <AdminStatCard icon={Activity} label="Đang lọc" value={String(filteredDiagnoses.length)} helper="Số ca đang hiển thị theo bộ lọc hiện tại" tone="slate" />
        </div>
      </AdminSection>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.02fr]">
        <AdminSection
          eyebrow="Danh sách ca AI"
          title="Hàng đợi rà soát"
          description="Chọn một dòng để xem chi tiết và ra quyết định duyệt."
        >
          {isLoading ? (
            <AdminEmptyState message="Đang tải danh sách ca AI..." />
          ) : filteredDiagnoses.length === 0 ? (
            <AdminEmptyState message="Không có ca AI nào theo bộ lọc hiện tại." />
          ) : (
            <>
              <div className="rounded-3xl border border-slate-200 bg-white">
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_100px_150px] gap-3 border-b border-slate-100 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  <span>Bệnh nhân</span>
                  <span>Bác sĩ</span>
                  <span>Risk</span>
                  <span>Thời gian</span>
                </div>
                <AdminScrollViewport heightClass="max-h-[620px]">
                  {pagedDiagnoses.items.map((diagnosis) => (
                    <button
                      key={diagnosis.id}
                      type="button"
                      onClick={() => setSelectedDiagnosisId(diagnosis.id)}
                      className={`grid w-full grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_100px_150px] gap-3 border-b border-slate-100 px-4 py-4 text-left transition-colors last:border-b-0 ${
                        diagnosis.id === selectedDiagnosis?.id ? "bg-[#35678E]/6" : "bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">{diagnosis.patient.displayName}</p>
                        <p className="mt-1 truncate text-xs text-slate-500">{diagnosis.stageLabel || "Chưa có stage"}</p>
                      </div>
                      <div className="min-w-0 text-sm text-slate-600">
                        <p className="truncate font-medium text-slate-800">{diagnosis.doctor?.displayName || "Chưa gán"}</p>
                        <p className="mt-1 truncate text-xs text-slate-500">{diagnosis.patient.userCode || diagnosis.patient.uid}</p>
                      </div>
                      <div className="text-sm font-semibold text-rose-600">{diagnosis.riskLevel}</div>
                      <div className="text-sm text-slate-600">{formatDateTime(diagnosis.examDate || null)}</div>
                    </button>
                  ))}
                </AdminScrollViewport>
              </div>
              <AdminPagination
                page={pagedDiagnoses.page}
                pageCount={pagedDiagnoses.pageCount}
                totalItems={filteredDiagnoses.length}
                onPageChange={setDiagnosisPage}
              />
            </>
          )}
        </AdminSection>

        <AdminSection
          eyebrow="Duyệt ca bệnh"
          title={selectedDiagnosis ? `Rà soát: ${selectedDiagnosis.patient.displayName}` : "Chưa chọn ca"}
          description="Admin có thể cập nhật ghi chú điều phối, tóm tắt báo cáo và đẩy ca sang danh sách cảnh báo."
        >
          {selectedDiagnosis ? (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <AdminPanel title="Bác sĩ phụ trách" helper="Người đang chịu trách nhiệm lâm sàng">
                  <p className="text-lg font-semibold text-slate-900">{selectedDiagnosis.doctor?.displayName || "Chưa xác định"}</p>
                </AdminPanel>
                <AdminPanel title="Bệnh nhân" helper="Thông tin nhận diện">
                  <p className="text-lg font-semibold text-slate-900">{selectedDiagnosis.patient.displayName}</p>
                  <p className="mt-1 text-sm text-slate-500">{selectedDiagnosis.patient.userCode || selectedDiagnosis.patient.uid}</p>
                </AdminPanel>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <AdminInput value={selectedDiagnosis.stageLabel || ""} readOnly placeholder="Giai đoạn bệnh" />
                <AdminInput value={selectedDiagnosis.aiScore || ""} readOnly placeholder="Điểm AI" />
              </div>

              <AdminTextarea
                rows={4}
                value={reviewNote}
                onChange={(event) => setReviewNote(event.target.value)}
                placeholder="Ghi chú điều phối hoặc nhận xét của admin về ca bệnh này..."
              />
              <AdminTextarea
                rows={4}
                value={reportSummary}
                onChange={(event) => setReportSummary(event.target.value)}
                placeholder="Tóm tắt cần đưa lên cảnh báo / dashboard tổng..."
              />

              <AdminPanel title="Dấu hiệu tham chiếu" helper="Danh sách reference hỗ trợ cho ca AI đang chọn">
                {selectedReferences.length === 0 ? (
                  <AdminEmptyState message="Chưa có reference phụ cho ca này." />
                ) : (
                  <AdminScrollViewport heightClass="max-h-[260px]">
                    <div className="space-y-3">
                      {selectedReferences.map((reference) => (
                        <div key={reference.id} className="rounded-3xl bg-white p-4 shadow-sm">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900">{reference.label}</span>
                            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{reference.confidence}</span>
                          </div>
                          <p className="text-sm text-slate-600">{reference.doctorNote || reference.archiveLabel}</p>
                        </div>
                      ))}
                    </div>
                  </AdminScrollViewport>
                )}
              </AdminPanel>

              <div className="flex flex-wrap gap-3">
                <AdminButton onClick={handleSaveReview} disabled={isSaving}>
                  <span className="inline-flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? "Đang lưu..." : "Lưu duyệt quản trị"}
                  </span>
                </AdminButton>
                <AdminButton variant="secondary" onClick={handleEscalateAlert}>
                  Đẩy sang cảnh báo
                </AdminButton>
              </div>
            </div>
          ) : (
            <AdminEmptyState message="Chọn một dòng bên trái để bắt đầu rà soát." />
          )}
        </AdminSection>
      </div>
    </div>
  );
}

