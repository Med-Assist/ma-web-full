"use client";

import { CalendarPlus, Sparkles, Video, X } from "lucide-react";

export type ConsultationRoomCreateMode = "standard" | "google-meet";

export type ConsultationRoomCreateDraft = {
  mode: ConsultationRoomCreateMode;
  patientUid: string;
  scheduledDate: string;
  startTime: string;
  title: string;
  description: string;
  membersLabel: string;
  badge: string;
  timeLabel: string;
  meetingLink: string;
  openMeetingAfterCreate: boolean;
};

const fieldClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-[0_1px_0_rgba(255,255,255,0.9)] outline-none transition-colors focus:border-[#8bb1d7] focus:ring-2 focus:ring-[#8bb1d7]/35";

const CreateConsultationRoomModal = ({
  isOpen,
  isSaving,
  patientOptions,
  values,
  onClose,
  onChange,
  onSubmit,
}: {
  isOpen: boolean;
  isSaving?: boolean;
  patientOptions: { uid: string; label: string }[];
  values: ConsultationRoomCreateDraft;
  onClose: () => void;
  onChange: (field: keyof ConsultationRoomCreateDraft, value: string | boolean) => void;
  onSubmit: () => void;
}) => {
  if (!isOpen) {
    return null;
  }

  const isGoogleMeetMode = values.mode === "google-meet";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-[0_22px_55px_rgba(15,23,42,0.24)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5 lg:px-7">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800">Tạo phòng tư vấn</h2>
            <p className="mt-1 text-sm text-slate-500">Chỉnh nhanh thông tin trước khi tạo phòng họp trực tuyến.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Đóng popup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="space-y-5 px-6 py-6 lg:px-7">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onChange("mode", "standard")}
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                  values.mode === "standard"
                    ? "border-[#9ec2e3] bg-[#eef5ff] text-[#2f6df5]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <CalendarPlus className="h-4 w-4" />
                <span>Phòng thường</span>
              </button>
              <button
                type="button"
                onClick={() => onChange("mode", "google-meet")}
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                  values.mode === "google-meet"
                    ? "border-[#9ec2e3] bg-[#eef5ff] text-[#2f6df5]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <Video className="h-4 w-4" />
                <span>Google Meet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Bệnh nhân</label>
                <select
                  value={values.patientUid}
                  onChange={(event) => onChange("patientUid", event.target.value)}
                  className={fieldClassName}
                  required
                >
                  <option value="">Chọn bệnh nhân</option>
                  {patientOptions.map((patient) => (
                    <option key={patient.uid} value={patient.uid}>
                      {patient.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Ngày tư vấn</label>
                <input
                  type="date"
                  value={values.scheduledDate}
                  onChange={(event) => onChange("scheduledDate", event.target.value)}
                  className={fieldClassName}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Giờ bắt đầu</label>
                <input
                  type="time"
                  value={values.startTime}
                  onChange={(event) => onChange("startTime", event.target.value)}
                  className={fieldClassName}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Tên phòng</label>
                <input
                  type="text"
                  value={values.title}
                  onChange={(event) => onChange("title", event.target.value)}
                  className={fieldClassName}
                  placeholder="Nhập tên phòng"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Nhãn phòng</label>
                <input
                  type="text"
                  value={values.badge}
                  onChange={(event) => onChange("badge", event.target.value)}
                  className={fieldClassName}
                  placeholder="Ví dụ: Đang diễn ra"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Khung giờ hiển thị</label>
                <input
                  type="text"
                  value={values.timeLabel}
                  onChange={(event) => onChange("timeLabel", event.target.value)}
                  className={fieldClassName}
                  placeholder="Ví dụ: 10:30 - 11:00"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Thành viên</label>
                <input
                  type="text"
                  value={values.membersLabel}
                  onChange={(event) => onChange("membersLabel", event.target.value)}
                  className={fieldClassName}
                  placeholder="Ví dụ: Bác sĩ + bệnh nhân"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Mô tả phòng</label>
              <textarea
                value={values.description}
                onChange={(event) => onChange("description", event.target.value)}
                className={`${fieldClassName} min-h-[92px] resize-y`}
                placeholder="Mô tả ngắn cho phòng họp"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Link Google Meet</label>
              <input
                type="url"
                value={values.meetingLink}
                onChange={(event) => onChange("meetingLink", event.target.value)}
                className={fieldClassName}
                placeholder="https://meet.google.com/..."
              />
              <p className="text-xs text-slate-500">
                {isGoogleMeetMode
                  ? "Bạn có thể dùng link mặc định hoặc dán link Meet đã tạo sẵn."
                  : "Nếu có link họp, nhập tại đây để hiển thị ngay ở phần giữa màn hình."}
              </p>
            </div>

            <label className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <input
                type="checkbox"
                checked={values.openMeetingAfterCreate}
                onChange={(event) => onChange("openMeetingAfterCreate", event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2f6df5] focus:ring-[#2f6df5]"
              />
              <span className="text-sm text-slate-700">
                Mở link Meet ngay sau khi tạo phòng
                <span className="mt-0.5 block text-xs text-slate-500">
                  Chỉ hoạt động khi có link hợp lệ.
                </span>
              </span>
            </label>

            {values.meetingLink.trim() ? (
              <div className="rounded-xl border border-[#d9e8fb] bg-[#f3f8ff] px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#2f6df5]">
                  <Sparkles className="h-4 w-4" />
                  <span>Link sẽ hiển thị sau khi tạo</span>
                </div>
                <p className="mt-1 truncate text-sm text-[#4e78a6]">{values.meetingLink}</p>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 lg:px-7">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200/60 hover:text-slate-800"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={Boolean(isSaving)}
              className="rounded-xl bg-[#2f6df5] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2458c7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Đang tạo..." : "Tạo phòng"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateConsultationRoomModal;
