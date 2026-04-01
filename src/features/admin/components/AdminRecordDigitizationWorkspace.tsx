"use client";

import { useEffect, useState } from "react";
import { ClipboardPlus, FileScan, Gauge, Hospital } from "lucide-react";
import {
  getDoctors,
  getRecordDigitizationWorkspace,
  type GetDoctorsData,
  type GetRecordDigitizationWorkspaceData,
  upsertDigitizationJob,
  upsertDigitizationMetric,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { createClientId } from "@/shared/lib/medassist-runtime";
import { AdminButton, AdminEmptyState, AdminInput, AdminPanel, AdminSection, AdminSelect, AdminStatCard, AdminTextarea } from "./AdminPrimitives";

type DigitizationBundle = {
  doctors: GetDoctorsData["users"];
  jobs: GetRecordDigitizationWorkspaceData["digitizationJobs"];
  metrics: GetRecordDigitizationWorkspaceData["digitizationMetrics"];
};

export function AdminRecordDigitizationWorkspace() {
  const [bundle, setBundle] = useState<DigitizationBundle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [jobForm, setJobForm] = useState({
    title: "",
    subtitle: "",
    progressPercent: "0",
    facilityName: "",
    patientName: "",
    examDate: "",
    doctorName: "",
    sourceDocumentTitle: "",
    sourceDocumentBody: "",
    historyLabel: "",
  });
  const [metricForm, setMetricForm] = useState({
    jobId: "",
    code: "",
    label: "",
    value: "",
    status: "",
    reference: "",
    tone: "normal",
  });

  useEffect(() => {
    let mounted = true;

    const loadBundle = async () => {
      try {
        const [doctorsResponse, workspaceResponse] = await Promise.all([
          getDoctors(getMedAssistDataConnect()),
          getRecordDigitizationWorkspace(getMedAssistDataConnect()),
        ]);

        if (!mounted) {
          return;
        }

        setBundle({
          doctors: doctorsResponse.data.users,
          jobs: workspaceResponse.data.digitizationJobs,
          metrics: workspaceResponse.data.digitizationMetrics,
        });
      } catch (error) {
        console.error("Không thể tải quản trị số hóa:", error);
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

  const handleCreateJob = async () => {
    if (!jobForm.title.trim()) {
      alert("Cần nhập tiêu đề job số hóa.");
      return;
    }

    try {
      const nextId = createClientId("digitization-job");
      await upsertDigitizationJob(getMedAssistDataConnect(), {
        id: nextId,
        title: jobForm.title.trim(),
        subtitle: jobForm.subtitle.trim(),
        progressPercent: Number(jobForm.progressPercent) || 0,
        facilityName: jobForm.facilityName.trim(),
        patientName: jobForm.patientName.trim(),
        examDate: jobForm.examDate.trim(),
        doctorName: jobForm.doctorName.trim(),
        sourceDocumentTitle: jobForm.sourceDocumentTitle.trim(),
        sourceDocumentBody: jobForm.sourceDocumentBody.trim(),
        historyLabel: jobForm.historyLabel.trim(),
      });
      alert("Đã tạo job số hóa mới.");
      setMetricForm((current) => ({ ...current, jobId: nextId }));
    } catch (error) {
      console.error("Không thể tạo job số hóa:", error);
      alert("Không thể tạo job số hóa.");
    }
  };

  const handleCreateMetric = async () => {
    if (!metricForm.jobId || !metricForm.label.trim()) {
      alert("Cần chọn job và nhập tên metric.");
      return;
    }

    try {
      await upsertDigitizationMetric(getMedAssistDataConnect(), {
        id: createClientId("digitization-metric"),
        jobId: metricForm.jobId,
        code: metricForm.code.trim(),
        label: metricForm.label.trim(),
        value: metricForm.value.trim(),
        status: metricForm.status.trim(),
        reference: metricForm.reference.trim() || null,
        tone: metricForm.tone.trim(),
        displayOrder: bundle?.metrics.length || 0,
      });
      alert("Đã thêm metric số hóa.");
    } catch (error) {
      console.error("Không thể thêm metric số hóa:", error);
      alert("Không thể thêm metric số hóa.");
    }
  };

  return (
    <div className="space-y-6">
      <AdminSection
        eyebrow="Digitization Administration"
        title="Quản trị số hóa hồ sơ bệnh án"
        description="Admin tạo job số hóa, theo dõi tiến độ OCR và quản lý metric trích xuất cho từng hồ sơ nhập vào hệ thống."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <AdminStatCard icon={FileScan} label="Job số hóa" value={String(bundle?.jobs.length || 0)} helper="Tổng job OCR / nhập hồ sơ đang có" tone="blue" />
          <AdminStatCard icon={Gauge} label="Metric OCR" value={String(bundle?.metrics.length || 0)} helper="Metric chi tiết của các job số hóa" tone="emerald" />
          <AdminStatCard icon={Hospital} label="Cơ sở nhập liệu" value={String(new Set((bundle?.jobs || []).map((job) => job.facilityName)).size)} helper="Số cơ sở đang có hồ sơ số hóa" tone="amber" />
          <AdminStatCard icon={ClipboardPlus} label="Bác sĩ liên quan" value={String(new Set((bundle?.jobs || []).map((job) => job.doctorName)).size)} helper="Bác sĩ gắn trong pipeline số hóa" tone="slate" />
        </div>
      </AdminSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminSection eyebrow="Tạo job" title="Khởi tạo hồ sơ số hóa" description="Thiết lập job mới cho một tài liệu hoặc bệnh án đang cần nhập hệ thống.">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput value={jobForm.title} onChange={(event) => setJobForm((current) => ({ ...current, title: event.target.value }))} placeholder="Tiêu đề job" />
            <AdminInput value={jobForm.subtitle} onChange={(event) => setJobForm((current) => ({ ...current, subtitle: event.target.value }))} placeholder="Phụ đề" />
            <AdminInput value={jobForm.progressPercent} onChange={(event) => setJobForm((current) => ({ ...current, progressPercent: event.target.value }))} placeholder="Tiến độ %" />
            <AdminInput value={jobForm.facilityName} onChange={(event) => setJobForm((current) => ({ ...current, facilityName: event.target.value }))} placeholder="Cơ sở" />
            <AdminInput value={jobForm.patientName} onChange={(event) => setJobForm((current) => ({ ...current, patientName: event.target.value }))} placeholder="Tên bệnh nhân" />
            <AdminInput value={jobForm.examDate} onChange={(event) => setJobForm((current) => ({ ...current, examDate: event.target.value }))} placeholder="Ngày khám" />
            <AdminInput value={jobForm.doctorName} onChange={(event) => setJobForm((current) => ({ ...current, doctorName: event.target.value }))} placeholder="Bác sĩ liên quan" />
            <AdminInput value={jobForm.sourceDocumentTitle} onChange={(event) => setJobForm((current) => ({ ...current, sourceDocumentTitle: event.target.value }))} placeholder="Tên tài liệu nguồn" />
          </div>
          <AdminTextarea rows={4} value={jobForm.sourceDocumentBody} onChange={(event) => setJobForm((current) => ({ ...current, sourceDocumentBody: event.target.value }))} placeholder="Nội dung tóm tắt tài liệu nguồn..." className="mt-4" />
          <AdminInput value={jobForm.historyLabel} onChange={(event) => setJobForm((current) => ({ ...current, historyLabel: event.target.value }))} placeholder="Nhãn lịch sử / vết xử lý" className="mt-4" />
          <div className="mt-4">
            <AdminButton onClick={handleCreateJob}>Tạo job số hóa</AdminButton>
          </div>
        </AdminSection>

        <AdminSection eyebrow="Tạo metric" title="Thêm metric trích xuất" description="Phục vụ việc chấm chất lượng và xác minh dữ liệu OCR đã nhập.">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminSelect value={metricForm.jobId} onChange={(event) => setMetricForm((current) => ({ ...current, jobId: event.target.value }))}>
              <option value="">Chọn job</option>
              {(bundle?.jobs || []).map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </AdminSelect>
            <AdminInput value={metricForm.code} onChange={(event) => setMetricForm((current) => ({ ...current, code: event.target.value }))} placeholder="Mã metric" />
            <AdminInput value={metricForm.label} onChange={(event) => setMetricForm((current) => ({ ...current, label: event.target.value }))} placeholder="Tên metric" />
            <AdminInput value={metricForm.value} onChange={(event) => setMetricForm((current) => ({ ...current, value: event.target.value }))} placeholder="Giá trị" />
            <AdminInput value={metricForm.status} onChange={(event) => setMetricForm((current) => ({ ...current, status: event.target.value }))} placeholder="Trạng thái" />
            <AdminSelect value={metricForm.tone} onChange={(event) => setMetricForm((current) => ({ ...current, tone: event.target.value }))}>
              <option value="normal">Normal</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </AdminSelect>
          </div>
          <AdminInput value={metricForm.reference} onChange={(event) => setMetricForm((current) => ({ ...current, reference: event.target.value }))} placeholder="Reference" className="mt-4" />
          <div className="mt-4">
            <AdminButton onClick={handleCreateMetric}>Thêm metric</AdminButton>
          </div>
        </AdminSection>
      </div>

      <AdminSection eyebrow="Snapshot" title="Trạng thái job hiện hữu" description="Xem nhanh các job số hóa đang có để đối chiếu sau khi cập nhật.">
        {isLoading ? (
          <AdminEmptyState message="Đang tải snapshot số hóa..." />
        ) : (
          <div className="grid gap-4 xl:grid-cols-3">
            {(bundle?.jobs || []).slice(0, 6).map((job) => (
              <AdminPanel key={job.id} title={job.title} helper={`${job.facilityName} • ${job.patientName}`}>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>Tiến độ: {job.progressPercent}%</p>
                  <p>Bác sĩ: {job.doctorName}</p>
                  <p>Tài liệu nguồn: {job.sourceDocumentTitle}</p>
                </div>
              </AdminPanel>
            ))}
          </div>
        )}
      </AdminSection>
    </div>
  );
}
