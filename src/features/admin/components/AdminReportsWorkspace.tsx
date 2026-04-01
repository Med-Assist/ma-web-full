"use client";

import { useEffect, useState } from "react";
import { AlertCircle, BarChart3, LineChart, PieChart, Save } from "lucide-react";
import {
  getAiDiagnoses,
  getReportsWorkspace,
  type GetAiDiagnosesData,
  type GetReportsWorkspaceData,
  upsertReportAlertCase,
  upsertReportStageDistribution,
  upsertReportSummaryMetric,
  upsertReportTrendPoint,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { createClientId, deriveInitials } from "@/shared/lib/medassist-runtime";
import { AdminButton, AdminEmptyState, AdminInput, AdminPanel, AdminSection, AdminStatCard, AdminTextarea } from "./AdminPrimitives";

type ReportsBundle = {
  reports: GetReportsWorkspaceData;
  diagnoses: GetAiDiagnosesData["aiDiagnoses"];
};

export function AdminReportsWorkspace() {
  const [bundle, setBundle] = useState<ReportsBundle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [metricForm, setMetricForm] = useState({
    title: "",
    valueText: "",
    helper: "",
    delta: "",
    deltaTone: "positive",
    iconKey: "chart",
  });
  const [distributionForm, setDistributionForm] = useState({
    label: "",
    value: "0",
  });
  const [trendForm, setTrendForm] = useState({
    label: "",
    x: "0",
    y: "0",
    series: "consultation",
  });
  const [alertForm, setAlertForm] = useState({
    name: "",
    phone: "",
    recordId: "",
    conclusion: "",
  });

  useEffect(() => {
    let mounted = true;

    const loadBundle = async () => {
      try {
        const [reportsResponse, diagnosesResponse] = await Promise.all([
          getReportsWorkspace(getMedAssistDataConnect()),
          getAiDiagnoses(getMedAssistDataConnect()),
        ]);

        if (!mounted) {
          return;
        }

        setBundle({
          reports: reportsResponse.data,
          diagnoses: diagnosesResponse.data.aiDiagnoses,
        });
      } catch (error) {
        console.error("Không thể tải workspace báo cáo quản trị:", error);
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

  const highRiskCount = bundle?.diagnoses.filter((item) => item.riskLevel.toLowerCase() === "high").length || 0;

  const handleCreateMetric = async () => {
    if (!metricForm.title.trim()) {
      alert("Cần nhập tên metric.");
      return;
    }

    try {
      await upsertReportSummaryMetric(getMedAssistDataConnect(), {
        id: createClientId("report-metric"),
        title: metricForm.title.trim(),
        valueText: metricForm.valueText.trim(),
        helper: metricForm.helper.trim(),
        delta: metricForm.delta.trim(),
        deltaTone: metricForm.deltaTone.trim(),
        iconKey: metricForm.iconKey.trim(),
        displayOrder: bundle?.reports.reportSummaryMetrics.length || 0,
      });
      alert("Đã thêm summary metric.");
    } catch (error) {
      console.error("Không thể thêm summary metric:", error);
      alert("Không thể thêm metric.");
    }
  };

  const handleCreateDistribution = async () => {
    if (!distributionForm.label.trim()) {
      alert("Cần nhập nhãn phân bố.");
      return;
    }

    try {
      await upsertReportStageDistribution(getMedAssistDataConnect(), {
        id: createClientId("report-stage"),
        label: distributionForm.label.trim(),
        value: Number(distributionForm.value) || 0,
        displayOrder: bundle?.reports.reportStageDistributions.length || 0,
      });
      alert("Đã thêm stage distribution.");
    } catch (error) {
      console.error("Không thể thêm distribution:", error);
      alert("Không thể thêm distribution.");
    }
  };

  const handleCreateTrendPoint = async () => {
    if (!trendForm.label.trim()) {
      alert("Cần nhập nhãn trend.");
      return;
    }

    try {
      await upsertReportTrendPoint(getMedAssistDataConnect(), {
        id: createClientId("report-trend"),
        label: trendForm.label.trim(),
        x: Number(trendForm.x) || 0,
        y: Number(trendForm.y) || 0,
        series: trendForm.series.trim(),
        displayOrder: bundle?.reports.reportTrendPoints.length || 0,
      });
      alert("Đã thêm trend point.");
    } catch (error) {
      console.error("Không thể thêm trend point:", error);
      alert("Không thể thêm trend point.");
    }
  };

  const handleCreateAlertCase = async () => {
    if (!alertForm.name.trim()) {
      alert("Cần nhập tên ca cảnh báo.");
      return;
    }

    try {
      await upsertReportAlertCase(getMedAssistDataConnect(), {
        id: createClientId("report-alert"),
        initials: deriveInitials(alertForm.name),
        name: alertForm.name.trim(),
        recordId: alertForm.recordId.trim() || alertForm.name.trim(),
        conclusion: alertForm.conclusion.trim(),
        phone: alertForm.phone.trim() || "Chưa cập nhật",
        displayOrder: bundle?.reports.reportAlertCases.length || 0,
      });
      alert("Đã thêm alert case.");
    } catch (error) {
      console.error("Không thể thêm alert case:", error);
      alert("Không thể thêm alert case.");
    }
  };

  return (
    <div className="space-y-6">
      <AdminSection
        eyebrow="Reports Administration"
        title="Quản trị dữ liệu báo cáo và cảnh báo"
        description="Admin có thể thêm metric, stage distribution, trend point và alert case để dashboard báo cáo phản ánh đúng bức tranh điều hành."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <AdminStatCard icon={BarChart3} label="Summary metric" value={String(bundle?.reports.reportSummaryMetrics.length || 0)} helper="Chỉ số headline trên dashboard báo cáo" tone="blue" />
          <AdminStatCard icon={PieChart} label="Stage distribution" value={String(bundle?.reports.reportStageDistributions.length || 0)} helper="Phân bố các stage bệnh lý" tone="emerald" />
          <AdminStatCard icon={LineChart} label="Trend point" value={String(bundle?.reports.reportTrendPoints.length || 0)} helper="Điểm dữ liệu cho chuỗi thời gian" tone="amber" />
          <AdminStatCard icon={AlertCircle} label="Ca cảnh báo" value={String(bundle?.reports.reportAlertCases.length || 0)} helper={`${highRiskCount} ca AI high-risk đang tồn tại`} tone="rose" />
        </div>
      </AdminSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminSection eyebrow="Summary metric" title="Thêm chỉ số headline" description="Dùng cho các khối thống kê lớn trên màn hình báo cáo.">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput value={metricForm.title} onChange={(event) => setMetricForm((current) => ({ ...current, title: event.target.value }))} placeholder="Tên metric" />
            <AdminInput value={metricForm.valueText} onChange={(event) => setMetricForm((current) => ({ ...current, valueText: event.target.value }))} placeholder="Giá trị hiển thị" />
            <AdminInput value={metricForm.helper} onChange={(event) => setMetricForm((current) => ({ ...current, helper: event.target.value }))} placeholder="Helper text" />
            <AdminInput value={metricForm.delta} onChange={(event) => setMetricForm((current) => ({ ...current, delta: event.target.value }))} placeholder="Delta" />
            <AdminInput value={metricForm.deltaTone} onChange={(event) => setMetricForm((current) => ({ ...current, deltaTone: event.target.value }))} placeholder="Delta tone" />
            <AdminInput value={metricForm.iconKey} onChange={(event) => setMetricForm((current) => ({ ...current, iconKey: event.target.value }))} placeholder="Icon key" />
          </div>
          <div className="mt-4">
            <AdminButton onClick={handleCreateMetric}>
              <span className="inline-flex items-center gap-2">
                <Save className="h-4 w-4" />
                Lưu metric
              </span>
            </AdminButton>
          </div>
        </AdminSection>

        <AdminSection eyebrow="Stage distribution" title="Thêm stage bệnh lý" description="Phục vụ biểu đồ phân bố trên dashboard báo cáo.">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput value={distributionForm.label} onChange={(event) => setDistributionForm((current) => ({ ...current, label: event.target.value }))} placeholder="Nhãn stage" />
            <AdminInput value={distributionForm.value} onChange={(event) => setDistributionForm((current) => ({ ...current, value: event.target.value }))} placeholder="Giá trị" />
          </div>
          <div className="mt-4">
            <AdminButton onClick={handleCreateDistribution}>Lưu stage distribution</AdminButton>
          </div>
        </AdminSection>

        <AdminSection eyebrow="Trend point" title="Thêm điểm xu hướng" description="Dùng để điều chỉnh chart theo ngày / tuần / tháng.">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput value={trendForm.label} onChange={(event) => setTrendForm((current) => ({ ...current, label: event.target.value }))} placeholder="Nhãn trục" />
            <AdminInput value={trendForm.series} onChange={(event) => setTrendForm((current) => ({ ...current, series: event.target.value }))} placeholder="Series" />
            <AdminInput value={trendForm.x} onChange={(event) => setTrendForm((current) => ({ ...current, x: event.target.value }))} placeholder="X" />
            <AdminInput value={trendForm.y} onChange={(event) => setTrendForm((current) => ({ ...current, y: event.target.value }))} placeholder="Y" />
          </div>
          <div className="mt-4">
            <AdminButton onClick={handleCreateTrendPoint}>Lưu trend point</AdminButton>
          </div>
        </AdminSection>

        <AdminSection eyebrow="Alert case" title="Thêm ca cảnh báo" description="Đưa các ca cần theo dõi đặc biệt lên khu vực alert của báo cáo.">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput value={alertForm.name} onChange={(event) => setAlertForm((current) => ({ ...current, name: event.target.value }))} placeholder="Tên ca / bệnh nhân" />
            <AdminInput value={alertForm.phone} onChange={(event) => setAlertForm((current) => ({ ...current, phone: event.target.value }))} placeholder="Số điện thoại" />
            <AdminInput value={alertForm.recordId} onChange={(event) => setAlertForm((current) => ({ ...current, recordId: event.target.value }))} placeholder="Mã hồ sơ" className="md:col-span-2" />
          </div>
          <AdminTextarea rows={4} value={alertForm.conclusion} onChange={(event) => setAlertForm((current) => ({ ...current, conclusion: event.target.value }))} placeholder="Kết luận / hành động cần làm..." className="mt-4" />
          <div className="mt-4">
            <AdminButton onClick={handleCreateAlertCase}>Lưu alert case</AdminButton>
          </div>
        </AdminSection>
      </div>

      <AdminSection eyebrow="Hiện trạng báo cáo" title="Snapshot dữ liệu đang có" description="Đọc nhanh dữ liệu báo cáo hiện hữu để kiểm tra sau khi thao tác.">
        {isLoading ? (
          <AdminEmptyState message="Đang tải snapshot báo cáo..." />
        ) : (
          <div className="grid gap-4 xl:grid-cols-3">
            <AdminPanel title="Summary metrics" helper="Khối headline hiện có">
              <div className="space-y-2 text-sm text-slate-600">
                {(bundle?.reports.reportSummaryMetrics || []).slice(0, 5).map((item) => (
                  <p key={item.id}>{item.title}: {item.valueText}</p>
                ))}
              </div>
            </AdminPanel>
            <AdminPanel title="Stage distributions" helper="Phân bố stage đang hiển thị">
              <div className="space-y-2 text-sm text-slate-600">
                {(bundle?.reports.reportStageDistributions || []).slice(0, 5).map((item) => (
                  <p key={item.id}>{item.label}: {item.value}</p>
                ))}
              </div>
            </AdminPanel>
            <AdminPanel title="Alert cases" helper="Ca cảnh báo đang theo dõi">
              <div className="space-y-2 text-sm text-slate-600">
                {(bundle?.reports.reportAlertCases || []).slice(0, 5).map((item) => (
                  <p key={item.id}>{item.name}: {item.conclusion}</p>
                ))}
              </div>
            </AdminPanel>
          </div>
        )}
      </AdminSection>
    </div>
  );
}
