"use client";

import { useEffect, useMemo, useState } from "react";
import { Headset, LayoutTemplate, Settings2, Shield, Users } from "lucide-react";
import {
  getAllUsers,
  getLandingWorkspace,
  getZaloContacts,
  type GetAllUsersData,
  type GetLandingWorkspaceData,
  type GetZaloContactsData,
  upsertLandingHeroContent,
  upsertSupportContactInfo,
  upsertZaloContact,
} from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { createClientId, deriveInitials } from "@/shared/lib/medassist-runtime";
import { AdminButton, AdminEmptyState, AdminInput, AdminPanel, AdminSection, AdminTextarea, AdminStatCard } from "./AdminPrimitives";

type SettingsBundle = {
  users: GetAllUsersData["users"];
  landing: GetLandingWorkspaceData;
  zaloContacts: GetZaloContactsData["zaloContacts"];
};

export function AdminSystemSettings() {
  const [bundle, setBundle] = useState<SettingsBundle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [heroForm, setHeroForm] = useState({
    id: "hero-main",
    badgeText: "",
    titlePrefix: "",
    titleAccent: "",
    titleSuffix: "",
    body: "",
    primaryButtonLabel: "",
    primaryButtonTarget: "",
    secondaryButtonLabel: "",
    secondaryButtonTarget: "",
    patientCodeLabel: "",
    accuracyLabel: "",
    imagePath: "",
  });
  const [supportForm, setSupportForm] = useState({
    id: "support-main",
    centerBadge: "",
    headlinePrefix: "",
    headlineAccent: "",
    headlineBrand: "",
    description: "",
    email: "",
    phone: "",
    location: "",
  });
  const [zaloForm, setZaloForm] = useState({
    name: "",
    phone: "",
    zaloLink: "",
    colorToken: "blue",
  });

  useEffect(() => {
    let mounted = true;

    const loadBundle = async () => {
      try {
        const [usersResponse, landingResponse, zaloResponse] = await Promise.all([
          getAllUsers(getMedAssistDataConnect()),
          getLandingWorkspace(getMedAssistDataConnect()),
          getZaloContacts(getMedAssistDataConnect()),
        ]);

        if (!mounted) {
          return;
        }

        const nextBundle = {
          users: usersResponse.data.users,
          landing: landingResponse.data,
          zaloContacts: zaloResponse.data.zaloContacts,
        };

        setBundle(nextBundle);

        const hero = nextBundle.landing.landingHeroContents[0];
        if (hero) {
          setHeroForm({
            id: hero.id,
            badgeText: hero.badgeText,
            titlePrefix: hero.titlePrefix,
            titleAccent: hero.titleAccent,
            titleSuffix: hero.titleSuffix,
            body: hero.body,
            primaryButtonLabel: hero.primaryButtonLabel,
            primaryButtonTarget: hero.primaryButtonTarget,
            secondaryButtonLabel: hero.secondaryButtonLabel,
            secondaryButtonTarget: hero.secondaryButtonTarget,
            patientCodeLabel: hero.patientCodeLabel,
            accuracyLabel: hero.accuracyLabel,
            imagePath: hero.imagePath,
          });
        }

        const support = nextBundle.landing.supportContactInfos[0];
        if (support) {
          setSupportForm({
            id: support.id,
            centerBadge: support.centerBadge,
            headlinePrefix: support.headlinePrefix,
            headlineAccent: support.headlineAccent,
            headlineBrand: support.headlineBrand,
            description: support.description,
            email: support.email,
            phone: support.phone,
            location: support.location,
          });
        }
      } catch (error) {
        console.error("Không thể tải cấu hình hệ thống quản trị:", error);
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

  const users = bundle?.users ?? [];
  const adminCount = users.filter((user) => user.role.toLowerCase() === "admin").length;
  const doctorCount = users.filter((user) => user.role.toLowerCase() === "doctor").length;
  const patientCount = users.filter((user) => user.role.toLowerCase() === "patient").length;
  const passwordlessCount = users.filter((user) => !user.passwordSet).length;

  const handleSaveHero = async () => {
    try {
      await upsertLandingHeroContent(getMedAssistDataConnect(), heroForm);
      alert("Đã lưu hero landing.");
    } catch (error) {
      console.error("Không thể lưu hero landing:", error);
      alert("Không thể lưu hero landing.");
    }
  };

  const handleSaveSupport = async () => {
    try {
      await upsertSupportContactInfo(getMedAssistDataConnect(), supportForm);
      alert("Đã lưu thông tin support.");
    } catch (error) {
      console.error("Không thể lưu support info:", error);
      alert("Không thể lưu thông tin support.");
    }
  };

  const handleCreateZaloContact = async () => {
    if (!zaloForm.name.trim()) {
      alert("Cần nhập tên liên hệ Zalo.");
      return;
    }

    try {
      await upsertZaloContact(getMedAssistDataConnect(), {
        id: createClientId("zalo"),
        name: zaloForm.name.trim(),
        initials: deriveInitials(zaloForm.name),
        phone: zaloForm.phone.trim(),
        zaloLink: zaloForm.zaloLink.trim(),
        colorToken: zaloForm.colorToken.trim(),
        displayOrder: bundle?.zaloContacts.length || 0,
      });
      alert("Đã thêm liên hệ Zalo mới.");
    } catch (error) {
      console.error("Không thể thêm liên hệ Zalo:", error);
      alert("Không thể thêm liên hệ Zalo.");
    }
  };

  const pendingAccounts = useMemo(
    () => users.filter((user) => !user.passwordSet || !user.status || user.status.toLowerCase() !== "active"),
    [users]
  );

  return (
    <div className="space-y-6">
      <AdminSection
        eyebrow="System Settings"
        title="Cấu hình hệ thống dành cho quản trị viên"
        description="Điều khiển phần hiển thị landing, thông tin hỗ trợ, kênh liên lạc Zalo và giám sát tài khoản người dùng ở cấp hệ thống."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <AdminStatCard icon={Shield} label="Admin" value={String(adminCount)} helper="Tài khoản điều hành đang có" tone="blue" />
          <AdminStatCard icon={Users} label="Bác sĩ" value={String(doctorCount)} helper="Tài khoản bác sĩ trong hệ thống" tone="emerald" />
          <AdminStatCard icon={Settings2} label="Bệnh nhân" value={String(patientCount)} helper="Tài khoản bệnh nhân đang hoạt động" tone="amber" />
          <AdminStatCard icon={Headset} label="Chưa hoàn tất" value={String(passwordlessCount)} helper="Tài khoản chưa set password hoặc chưa active" tone="rose" />
        </div>
      </AdminSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminSection
          eyebrow="Landing hero"
          title="Hero nội dung landing"
          description="Cho phép admin cập nhật nội dung nổi bật của landing page mà không phải chỉnh tay trong code."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput value={heroForm.badgeText} onChange={(event) => setHeroForm((current) => ({ ...current, badgeText: event.target.value }))} placeholder="Badge text" />
            <AdminInput value={heroForm.imagePath} onChange={(event) => setHeroForm((current) => ({ ...current, imagePath: event.target.value }))} placeholder="Image path" />
            <AdminInput value={heroForm.titlePrefix} onChange={(event) => setHeroForm((current) => ({ ...current, titlePrefix: event.target.value }))} placeholder="Title prefix" />
            <AdminInput value={heroForm.titleAccent} onChange={(event) => setHeroForm((current) => ({ ...current, titleAccent: event.target.value }))} placeholder="Title accent" />
            <AdminInput value={heroForm.titleSuffix} onChange={(event) => setHeroForm((current) => ({ ...current, titleSuffix: event.target.value }))} placeholder="Title suffix" className="md:col-span-2" />
            <AdminInput value={heroForm.primaryButtonLabel} onChange={(event) => setHeroForm((current) => ({ ...current, primaryButtonLabel: event.target.value }))} placeholder="Primary CTA label" />
            <AdminInput value={heroForm.primaryButtonTarget} onChange={(event) => setHeroForm((current) => ({ ...current, primaryButtonTarget: event.target.value }))} placeholder="Primary CTA target" />
            <AdminInput value={heroForm.secondaryButtonLabel} onChange={(event) => setHeroForm((current) => ({ ...current, secondaryButtonLabel: event.target.value }))} placeholder="Secondary CTA label" />
            <AdminInput value={heroForm.secondaryButtonTarget} onChange={(event) => setHeroForm((current) => ({ ...current, secondaryButtonTarget: event.target.value }))} placeholder="Secondary CTA target" />
            <AdminInput value={heroForm.patientCodeLabel} onChange={(event) => setHeroForm((current) => ({ ...current, patientCodeLabel: event.target.value }))} placeholder="Patient code label" />
            <AdminInput value={heroForm.accuracyLabel} onChange={(event) => setHeroForm((current) => ({ ...current, accuracyLabel: event.target.value }))} placeholder="Accuracy label" />
          </div>
          <AdminTextarea rows={4} value={heroForm.body} onChange={(event) => setHeroForm((current) => ({ ...current, body: event.target.value }))} placeholder="Hero body..." className="mt-4" />
          <div className="mt-4">
            <AdminButton onClick={handleSaveHero}>Lưu hero landing</AdminButton>
          </div>
        </AdminSection>

        <AdminSection
          eyebrow="Support contact"
          title="Thông tin hỗ trợ trung tâm"
          description="Nơi admin cập nhật khối support ở landing và các điểm chạm hỗ trợ khách hàng."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput value={supportForm.centerBadge} onChange={(event) => setSupportForm((current) => ({ ...current, centerBadge: event.target.value }))} placeholder="Badge" />
            <AdminInput value={supportForm.headlineBrand} onChange={(event) => setSupportForm((current) => ({ ...current, headlineBrand: event.target.value }))} placeholder="Brand" />
            <AdminInput value={supportForm.headlinePrefix} onChange={(event) => setSupportForm((current) => ({ ...current, headlinePrefix: event.target.value }))} placeholder="Headline prefix" />
            <AdminInput value={supportForm.headlineAccent} onChange={(event) => setSupportForm((current) => ({ ...current, headlineAccent: event.target.value }))} placeholder="Headline accent" />
            <AdminInput value={supportForm.email} onChange={(event) => setSupportForm((current) => ({ ...current, email: event.target.value }))} placeholder="Email support" />
            <AdminInput value={supportForm.phone} onChange={(event) => setSupportForm((current) => ({ ...current, phone: event.target.value }))} placeholder="Phone support" />
            <AdminInput value={supportForm.location} onChange={(event) => setSupportForm((current) => ({ ...current, location: event.target.value }))} placeholder="Location" className="md:col-span-2" />
          </div>
          <AdminTextarea rows={4} value={supportForm.description} onChange={(event) => setSupportForm((current) => ({ ...current, description: event.target.value }))} placeholder="Mô tả support..." className="mt-4" />
          <div className="mt-4">
            <AdminButton onClick={handleSaveSupport}>Lưu thông tin support</AdminButton>
          </div>
        </AdminSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <AdminSection
          eyebrow="Zalo support"
          title="Danh bạ hỗ trợ Zalo"
          description="Quản trị các liên hệ chăm sóc khách hàng hoặc hỗ trợ nhanh hiển thị trên hệ thống."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput value={zaloForm.name} onChange={(event) => setZaloForm((current) => ({ ...current, name: event.target.value }))} placeholder="Tên liên hệ" />
            <AdminInput value={zaloForm.phone} onChange={(event) => setZaloForm((current) => ({ ...current, phone: event.target.value }))} placeholder="Số điện thoại" />
            <AdminInput value={zaloForm.zaloLink} onChange={(event) => setZaloForm((current) => ({ ...current, zaloLink: event.target.value }))} placeholder="Zalo link" className="md:col-span-2" />
            <AdminInput value={zaloForm.colorToken} onChange={(event) => setZaloForm((current) => ({ ...current, colorToken: event.target.value }))} placeholder="Color token" className="md:col-span-2" />
          </div>
          <div className="mt-4">
            <AdminButton onClick={handleCreateZaloContact}>Thêm liên hệ Zalo</AdminButton>
          </div>
        </AdminSection>

        <AdminSection
          eyebrow="Tài khoản hệ thống"
          title="Rà soát người dùng cần chú ý"
          description="Danh sách tài khoản chưa hoàn tất onboarding hoặc chưa active để admin xử lý."
        >
          {isLoading ? (
            <AdminEmptyState message="Đang tải danh sách tài khoản..." />
          ) : pendingAccounts.length === 0 ? (
            <AdminEmptyState message="Không có tài khoản nào cần rà soát thêm." />
          ) : (
            <div className="space-y-3">
              {pendingAccounts.slice(0, 8).map((user) => (
                <div key={user.uid} className="rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-base font-bold text-slate-900">{user.displayName}</h3>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {user.role}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{user.email}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Trạng thái: {user.status || "Chưa active"} • Password: {user.passwordSet ? "Đã thiết lập" : "Chưa thiết lập"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </AdminSection>
      </div>

      <AdminSection eyebrow="Snapshot" title="Các liên hệ hỗ trợ hiện có" description="Kiểm tra nhanh cấu hình liên hệ sau khi cập nhật.">
        {isLoading ? (
          <AdminEmptyState message="Đang tải snapshot liên hệ..." />
        ) : (
          <div className="grid gap-4 xl:grid-cols-3">
            {(bundle?.zaloContacts || []).slice(0, 6).map((contact) => (
              <AdminPanel key={contact.id} title={contact.name} helper={contact.phone}>
                <p className="text-sm text-slate-600">{contact.zaloLink}</p>
              </AdminPanel>
            ))}
          </div>
        )}
      </AdminSection>
    </div>
  );
}
