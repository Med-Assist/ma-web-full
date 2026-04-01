"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { AdminButton, AdminSection } from "./AdminPrimitives";

export function AdminFeatureRemoved({
  title,
  description,
  backPath = "/dashboard",
}: {
  title: string;
  description: string;
  backPath?: string;
}) {
  const router = useRouter();

  return (
    <AdminSection
      eyebrow="Admin Update"
      title={title}
      description={description}
    >
      <div className="rounded-[32px] border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#35678E]/10 text-[#35678E]">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <p className="mt-5 text-base font-semibold text-slate-800">
          Khu vực này đã được gỡ khỏi giao diện quản trị viên.
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Bạn vẫn có thể tiếp tục làm việc ở các màn hình điều phối chính như trang chủ quản trị,
          danh sách bệnh nhân, kiểm duyệt AI, lịch khám, tư vấn và cấu hình hệ thống.
        </p>
        <div className="mt-6 flex justify-center">
          <AdminButton onClick={() => router.push(backPath)}>
            <span className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay về trung tâm quản trị
            </span>
          </AdminButton>
        </div>
      </div>
    </AdminSection>
  );
}
