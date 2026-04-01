"use client";

import { useState } from "react";
import { X } from "lucide-react";

export type PatientCreateValues = {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  bloodType: string;
  insuranceNumber: string;
  cccd: string;
  allergies: string;
  occupation: string;
  height: string;
  weight: string;
};

const defaultValues: PatientCreateValues = {
  fullName: "",
  phone: "",
  email: "",
  dob: "",
  gender: "Nam",
  address: "",
  bloodType: "O+",
  insuranceNumber: "",
  cccd: "",
  allergies: "",
  occupation: "",
  height: "",
  weight: "",
};

export function PatientCreateModal({
  isOpen,
  isSubmitting,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (values: PatientCreateValues) => Promise<void>;
}) {
  const [values, setValues] = useState<PatientCreateValues>(defaultValues);
  const resetValues = () => setValues(defaultValues);
  const handleClose = () => {
    resetValues();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const updateField = (field: keyof PatientCreateValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
    resetValues();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Tạo hồ sơ bệnh nhân mới</h2>
            <p className="mt-1 text-sm text-slate-500">Nhập thông tin ban đầu để tạo nhanh bệnh án điện tử cho bệnh nhân.</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="grid flex-1 gap-6 overflow-y-auto px-6 py-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Thông tin cơ bản</h3>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Họ và tên</span>
                <input
                  value={values.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  placeholder="Nguyễn Văn A"
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Ngày sinh</span>
                  <input
                    type="date"
                    value={values.dob}
                    onChange={(event) => updateField("dob", event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Giới tính</span>
                  <select
                    value={values.gender}
                    onChange={(event) => updateField("gender", event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Số điện thoại</span>
                  <input
                    value={values.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="09xx xxx xxx"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
                  <input
                    type="email"
                    value={values.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="benhnhan@example.com"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Địa chỉ</span>
                <textarea
                  value={values.address}
                  onChange={(event) => updateField("address", event.target.value)}
                  rows={4}
                  placeholder="Quận/Huyện, Tỉnh/Thành phố"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                />
              </label>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Hồ sơ y tế ban đầu</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Nhóm máu</span>
                  <select
                    value={values.bloodType}
                    onChange={(event) => updateField("bloodType", event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Nghề nghiệp</span>
                  <input
                    value={values.occupation}
                    onChange={(event) => updateField("occupation", event.target.value)}
                    placeholder="Nhân viên văn phòng"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Số BHYT</span>
                  <input
                    value={values.insuranceNumber}
                    onChange={(event) => updateField("insuranceNumber", event.target.value)}
                    placeholder="GD4 01 01..."
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">CCCD / Passport</span>
                  <input
                    value={values.cccd}
                    onChange={(event) => updateField("cccd", event.target.value)}
                    placeholder="012345678901"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Chiều cao (cm)</span>
                  <input
                    inputMode="decimal"
                    value={values.height}
                    onChange={(event) => updateField("height", event.target.value)}
                    placeholder="170"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Cân nặng (kg)</span>
                  <input
                    inputMode="decimal"
                    value={values.weight}
                    onChange={(event) => updateField("weight", event.target.value)}
                    placeholder="65"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Dị ứng / lưu ý</span>
                <textarea
                  value={values.allergies}
                  onChange={(event) => updateField("allergies", event.target.value)}
                  rows={4}
                  placeholder="Ghi chú dị ứng thuốc, bệnh nền hoặc lưu ý ban đầu"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#638BB5] focus:ring-4 focus:ring-[#638BB5]/10"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-2xl px-5 py-3 text-sm font-semibold text-white transition-opacity ${
                isSubmitting ? "cursor-not-allowed bg-slate-400" : "bg-gradient-to-r from-[#35678E] to-[#8BB4DC] hover:opacity-90"
              }`}
            >
              {isSubmitting ? "Đang tạo hồ sơ..." : "Tạo bệnh nhân"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
