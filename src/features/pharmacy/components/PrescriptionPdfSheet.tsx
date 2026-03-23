"use client";

import { forwardRef } from "react";

type PrescriptionPdfItem = {
  id: string;
  drugName: string;
  note?: string | null;
  quantity: string;
  unit: string;
  dosage: string;
  timing: string;
  duration: string;
  price: number;
};

interface PrescriptionPdfSheetProps {
  prescriptionCode: string;
  issuedDate: string;
  patientName: string;
  patientCode?: string | null;
  patientPhone?: string | null;
  patientDob?: string | null;
  patientGender?: string | null;
  doctorLabel: string;
  note: string;
  totalPrice: string;
  items: PrescriptionPdfItem[];
}

const VI_TEXT_OVERRIDES: Record<string, string> = {
  "phac do vong mac": "Phác đồ võng mạc",
  "kiem soat kho mat": "Kiểm soát khô mắt",
  "tai kham sau hoi chan": "Tái khám sau hội chẩn",
  "cham soc sau kham": "Chăm sóc sau khám",
  "kiem soat duong huyet & vi tuan hoan": "Kiểm soát đường huyết và vi tuần hoàn",
  "kiem soat duong huyet va vi tuan hoan": "Kiểm soát đường huyết và vi tuần hoàn",
  "giam kich ung & bo sung nuoc mat": "Giảm kích ứng và bổ sung nước mắt",
  "giam kich ung va bo sung nuoc mat": "Giảm kích ứng và bổ sung nước mắt",
  "theo doi va bo sung vitamin": "Theo dõi và bổ sung vitamin",
  "huong dan ngan han": "Hướng dẫn ngắn hạn",
};

function toViOverrideKey(value: string) {
  return value
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/[•|]/g, " ")
    .replace(/[.,;:]/g, "")
    .replace(/\s+/g, " ");
}

function normalizeViText(value?: string | null) {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  return VI_TEXT_OVERRIDES[toViOverrideKey(trimmed)] || trimmed;
}

export const PrescriptionPdfSheet = forwardRef<HTMLDivElement, PrescriptionPdfSheetProps>(
  function PrescriptionPdfSheet(
    {
      prescriptionCode,
      issuedDate,
      patientName,
      patientCode,
      patientPhone,
      patientDob,
      patientGender,
      doctorLabel,
      note,
      totalPrice,
      items,
    },
    ref
  ) {
    return (
      <div className="fixed left-[-10000px] top-0 z-[-1]">
        <div
          ref={ref}
          className="w-[794px] bg-white px-12 py-10 text-slate-900"
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <div className="border-b border-slate-300 pb-6">
            <div className="flex items-start justify-between gap-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#35678E]">
                  MedAssist
                </p>
                <h1 className="mt-2 text-[28px] font-bold">ĐƠN THUỐC NGOẠI TRÚ</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Biểu mẫu kê đơn điện tử dành cho bác sĩ và dược sĩ nội bộ
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm">
                <p>
                  <span className="font-semibold text-slate-500">Mã đơn:</span>{" "}
                  <span className="font-bold text-slate-800">{prescriptionCode}</span>
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-slate-500">Ngày kê:</span>{" "}
                  <span className="font-medium text-slate-700">{issuedDate}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Thông tin bệnh nhân
              </p>
              <div className="mt-4 space-y-2 text-sm leading-6">
                <p>
                  <span className="font-semibold text-slate-500">Họ tên:</span>{" "}
                  <span className="font-bold text-slate-800">{normalizeViText(patientName)}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-500">Mã hồ sơ:</span>{" "}
                  <span>{patientCode || "Đang cập nhật"}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-500">Ngày sinh:</span>{" "}
                  <span>{patientDob || "Đang cập nhật"}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-500">Giới tính:</span>{" "}
                  <span>{patientGender || "Đang cập nhật"}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-500">Số điện thoại:</span>{" "}
                  <span>{patientPhone || "Đang cập nhật"}</span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Thông tin bác sĩ
              </p>
              <div className="mt-4 space-y-2 text-sm leading-6">
                <p>
                  <span className="font-semibold text-slate-500">Bác sĩ phụ trách:</span>{" "}
                  <span className="font-bold text-slate-800">{doctorLabel}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-500">Khoa:</span>{" "}
                  <span>Dược lâm sàng</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-500">Hình thức:</span>{" "}
                  <span>Toa thuốc điện tử</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-500">Trạng thái:</span>{" "}
                  <span className="font-semibold text-emerald-600">Đã hoàn tất</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#f4f8fc] text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  <th className="w-16 px-4 py-4 text-center">STT</th>
                  <th className="px-4 py-4">Thuốc và ghi chú</th>
                  <th className="w-40 px-4 py-4">Liều dùng</th>
                  <th className="w-32 px-4 py-4">Số lượng</th>
                  <th className="w-32 px-4 py-4">Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-t border-slate-100 align-top">
                    <td className="px-4 py-4 text-center font-semibold text-slate-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-slate-900">{normalizeViText(item.drugName)}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {normalizeViText(item.note) || "Không có ghi chú thêm."}
                      </p>
                      <p className="mt-2 text-xs font-medium text-[#35678E]">
                        {normalizeViText(item.timing)} | {normalizeViText(item.duration)}
                      </p>
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-700">
                      {normalizeViText(item.dosage)}
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-700">
                      {item.quantity} {normalizeViText(item.unit)}
                    </td>
                    <td className="px-4 py-4 font-semibold text-slate-800">
                      {item.price.toLocaleString("vi-VN")} VND
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-7 grid grid-cols-[1fr_220px] gap-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Lời dặn của bác sĩ
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {normalizeViText(note) ||
                  "Dùng thuốc đúng giờ, theo dõi đáp ứng và tái khám theo lịch hẹn của bác sĩ."}
              </p>
            </div>

            <div className="rounded-2xl border border-[#bfd8f1] bg-[#f5fafe] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Tổng chi phí tham khảo
              </p>
              <p className="mt-4 text-[28px] font-bold tracking-tight text-[#35678E]">
                {totalPrice}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Giá tại kho dược nội viện, có thể thay đổi theo thời điểm cấp phát.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-10 text-sm">
            <div className="rounded-2xl border border-dashed border-slate-300 px-5 py-6 text-center text-slate-500">
              <p className="font-semibold">Dược sĩ cấp phát</p>
              <p className="mt-16 text-xs">Ký và ghi rõ họ tên</p>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-300 px-5 py-6 text-center text-slate-500">
              <p className="font-semibold">Bác sĩ kê đơn</p>
              <p className="mt-16 text-xs">Ký và ghi rõ họ tên</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
