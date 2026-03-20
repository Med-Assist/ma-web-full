"use client";

import { useMemo, useState } from "react";
import {
  ChevronRight,
  Eye,
  Filter,
  HeartPulse,
  Pill,
  Scissors,
  Search,
  Syringe,
  Thermometer,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

type QuickTemplate = {
  id: string;
  title: string;
  subtitle: string;
  drugCount: string;
  icon: typeof Scissors;
  iconColor: string;
  iconBg: string;
};

type SelectedDrug = {
  name: string;
  note: string;
  quantity: string;
  unit: string;
  dosage: string;
  timing: string;
  duration: string;
  price: number;
};

type TemplateDrug = {
  name: string;
  description: string;
  dosage: string;
  quantity: string;
  unit: string;
  timing: string;
  duration: string;
  price: number;
};

const quickTemplates: QuickTemplate[] = [
  {
    id: "post-op",
    title: "Hậu phẫu tổng quát",
    subtitle: "Chăm sóc, kháng sinh cơ bản",
    drugCount: "4 loại thuốc",
    icon: Scissors,
    iconColor: "text-[#2977ff]",
    iconBg: "bg-[#eef4ff]",
  },
  {
    id: "conjunctivitis",
    title: "Viêm kết mạc",
    subtitle: "Kháng viêm, nhỏ mắt",
    drugCount: "3 loại thuốc",
    icon: Eye,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    id: "fever",
    title: "Sốt siêu vi",
    subtitle: "Hạ sốt, bù nước, vitamin",
    drugCount: "5 loại thuốc",
    icon: Thermometer,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
  {
    id: "hypertension",
    title: "Tăng huyết áp",
    subtitle: "Duy trì huyết áp ổn định",
    drugCount: "2 loại thuốc",
    icon: HeartPulse,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50",
  },
];

const templateLibrary: Record<
  string,
  { badge: string; specialty: string; title: string; summary: string; drugs: TemplateDrug[] }
> = {
  "post-op": {
    badge: "Phổ biến",
    specialty: "Ngoại khoa",
    title: "Hậu phẫu tổng quát",
    summary: "Sử dụng cho các trường hợp phục hồi sau phẫu thuật nhẹ, giảm đau và kháng viêm cơ bản.",
    drugs: [
      {
        name: "Amoxicillin 500mg",
        description: "Kháng sinh nhóm Penicillin",
        dosage: "Liều dùng: Sáng: 1, Trưa: 1, Tối: 1 (sau ăn 30p)",
        quantity: "21",
        unit: "viên",
        timing: "Sau ăn 30p",
        duration: "07 ngày",
        price: 125000,
      },
      {
        name: "Paracetamol 500mg",
        description: "Hạ sốt, giảm đau",
        dosage: "Liều dùng: Khi sốt > 38.5°C (cách nhau ít nhất 4h)",
        quantity: "10",
        unit: "viên",
        timing: "Cách nhau ít nhất 4h",
        duration: "03 ngày",
        price: 40000,
      },
      {
        name: "Alpha Choay",
        description: "Kháng viêm, giảm phù nề",
        dosage: "Liều dùng: Sáng 1 viên, tối 1 viên",
        quantity: "14",
        unit: "viên",
        timing: "Ngậm dưới lưỡi",
        duration: "07 ngày",
        price: 180000,
      },
      {
        name: "Betadine súc họng",
        description: "Sát khuẩn niêm mạc sau thủ thuật",
        dosage: "Liều dùng: Ngày 2 lần sáng và tối",
        quantity: "01",
        unit: "chai",
        timing: "Sau vệ sinh răng miệng",
        duration: "05 ngày",
        price: 55000,
      },
    ],
  },
  conjunctivitis: {
    badge: "Nhanh",
    specialty: "Nhãn khoa",
    title: "Viêm kết mạc",
    summary: "Đơn mẫu dành cho mắt đỏ, ngứa rát, chảy nước mắt không biến chứng.",
    drugs: [
      {
        name: "Tobramycin nhỏ mắt",
        description: "Kháng sinh tại chỗ",
        dosage: "Liều dùng: 1 giọt/lần, ngày 4 lần",
        quantity: "01",
        unit: "lọ",
        timing: "Cách 6 giờ/lần",
        duration: "05 ngày",
        price: 95000,
      },
      {
        name: "Nước mắt nhân tạo",
        description: "Làm dịu khô rát",
        dosage: "Liều dùng: 1-2 giọt khi khó chịu",
        quantity: "01",
        unit: "lọ",
        timing: "Khi khô rát",
        duration: "07 ngày",
        price: 78000,
      },
      {
        name: "Olopatadine nhỏ mắt",
        description: "Giảm ngứa, chống dị ứng",
        dosage: "Liều dùng: 1 giọt/lần, ngày 2 lần",
        quantity: "01",
        unit: "lọ",
        timing: "Sáng và tối",
        duration: "05 ngày",
        price: 120000,
      },
    ],
  },
  fever: {
    badge: "Phổ biến",
    specialty: "Nội tổng quát",
    title: "Sốt siêu vi",
    summary: "Đơn mẫu hỗ trợ hạ sốt và bù nước cho trường hợp nhẹ.",
    drugs: [
      {
        name: "Paracetamol 500mg",
        description: "Hạ sốt",
        dosage: "Liều dùng: Khi sốt > 38.5°C",
        quantity: "10",
        unit: "viên",
        timing: "Cách nhau ít nhất 4h",
        duration: "03 ngày",
        price: 40000,
      },
      {
        name: "ORESOL",
        description: "Bù nước điện giải",
        dosage: "Liều dùng: Pha theo gói, uống nhiều lần",
        quantity: "05",
        unit: "gói",
        timing: "Sau mỗi lần sốt hoặc mệt",
        duration: "03 ngày",
        price: 30000,
      },
      {
        name: "Vitamin C 500mg",
        description: "Bổ sung đề kháng",
        dosage: "Liều dùng: 1 viên/ngày",
        quantity: "05",
        unit: "viên",
        timing: "Sau ăn sáng",
        duration: "05 ngày",
        price: 25000,
      },
      {
        name: "Kẽm gluconat",
        description: "Hỗ trợ hồi phục",
        dosage: "Liều dùng: 1 viên/ngày",
        quantity: "05",
        unit: "viên",
        timing: "Sau ăn trưa",
        duration: "05 ngày",
        price: 35000,
      },
      {
        name: "Dung dịch sát khuẩn mũi họng",
        description: "Hỗ trợ giảm kích thích đường hô hấp",
        dosage: "Liều dùng: Xịt 2 lần/ngày",
        quantity: "01",
        unit: "lọ",
        timing: "Sáng và tối",
        duration: "05 ngày",
        price: 62000,
      },
    ],
  },
  hypertension: {
    badge: "Theo dõi",
    specialty: "Tim mạch",
    title: "Tăng huyết áp",
    summary: "Đơn nền duy trì cho bệnh nhân đã có phác đồ ổn định.",
    drugs: [
      {
        name: "Amlodipine 5mg",
        description: "Hạ áp nhóm chẹn kênh canxi",
        dosage: "Liều dùng: 1 viên mỗi sáng",
        quantity: "30",
        unit: "viên",
        timing: "Sau ăn sáng",
        duration: "30 ngày",
        price: 165000,
      },
      {
        name: "Telmisartan 40mg",
        description: "Kiểm soát huyết áp dài hạn",
        dosage: "Liều dùng: 1 viên buổi tối",
        quantity: "30",
        unit: "viên",
        timing: "Sau ăn tối",
        duration: "30 ngày",
        price: 210000,
      },
    ],
  },
};

const initialSelectedDrugs: SelectedDrug[] = [
  {
    name: "Amoxicillin 500mg",
    note: "Kháng sinh nhóm Penicillin",
    quantity: "2",
    unit: "1 viên",
    dosage: "Sáng: 1, Trưa: 1, Tối: 1",
    timing: "Sau ăn 30p",
    duration: "07 ngày",
    price: 125000,
  },
  {
    name: "Paracetamol 500mg",
    note: "Hạ sốt, giảm đau",
    quantity: "1",
    unit: "0 viên",
    dosage: "Khi sốt > 38.5°C",
    timing: "Cách nhau ít nhất 4h",
    duration: "03 ngày",
    price: 40000,
  },
  {
    name: "Alpha Choay",
    note: "Kháng viêm, giảm phù nề",
    quantity: "1",
    unit: "4 viên",
    dosage: "Sáng: 1, Tối: 1",
    timing: "Ngậm dưới lưỡi",
    duration: "07 ngày",
    price: 180000,
  },
];

function PrescriptionLibraryModal({
  activeTemplateId,
  onChangeTemplate,
  onApply,
  onClose,
}: {
  activeTemplateId: string;
  onChangeTemplate: (templateId: string) => void;
  onApply: () => void;
  onClose: () => void;
}) {
  const activeTemplate = templateLibrary[activeTemplateId] ?? templateLibrary["post-op"];
  const activeTemplateMeta = quickTemplates.find((template) => template.id === activeTemplateId) ?? quickTemplates[0];
  const TemplateIcon = activeTemplateMeta.icon;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm">
      <div className="flex max-h-[88vh] w-full max-w-[860px] flex-col overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_36px_80px_rgba(15,23,42,0.26)]">
        <div className="flex items-center justify-between border-b border-slate-100 px-7 py-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <h2 className="text-[22px] font-bold tracking-tight text-slate-900">Thư viện đơn thuốc mẫu</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto px-7 py-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm đơn thuốc mẫu (Tên bệnh, triệu chứng...)"
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
              />
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
              <Filter className="h-4 w-4" />
              Lọc
            </button>
          </div>

          <div>
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="text-[18px] font-bold text-slate-900">Đơn mẫu được đề xuất</h3>
              <button className="text-sm font-semibold text-[#2977ff] transition-colors hover:text-[#1e66dc]">
                Xem tất cả đề xuất
              </button>
            </div>

            <div className="rounded-[28px] border border-[#cfe0f6] bg-[#f7fbff] p-5 shadow-[0_14px_32px_rgba(125,159,198,0.14)]">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <span className="rounded-full bg-[#fff2e6] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#f28f34]">
                      {activeTemplate.badge}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>{activeTemplate.specialty}</span>
                  </div>

                  <div className="mt-4 flex items-start gap-3">
                    <div className={`mt-1 flex h-11 w-11 items-center justify-center rounded-2xl ${activeTemplateMeta.iconBg} ${activeTemplateMeta.iconColor}`}>
                      <TemplateIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-[28px] font-bold tracking-tight text-slate-900">{activeTemplate.title}</h4>
                      <p className="mt-2 text-sm leading-7 text-slate-500">{activeTemplate.summary}</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-[20px] bg-[#e7f1ff] p-4 text-[#2977ff] transition-colors hover:bg-[#dcecff]"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4 rounded-[24px] border border-slate-100 bg-white/80 p-4">
                {activeTemplate.drugs.map((drug) => (
                  <div
                    key={drug.name}
                    className="flex flex-col gap-4 rounded-[22px] border border-slate-100 bg-white px-5 py-4 shadow-[0_8px_20px_rgba(148,163,184,0.08)] sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-slate-100 bg-white text-[#f0a33f] shadow-sm">
                        <Pill className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="text-[18px] font-bold text-slate-900">{drug.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{drug.description}</p>
                        <p className="mt-2 text-sm font-medium text-slate-600">{drug.dosage}</p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-[16px] font-semibold text-slate-900">
                        {drug.quantity} {drug.unit}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">{drug.duration}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={onApply}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-[22px] bg-gradient-to-r from-[#5a96cb] to-[#6aa7db] px-6 py-4 text-lg font-semibold text-white shadow-[0_14px_28px_rgba(90,150,203,0.28)] transition-transform hover:-translate-y-0.5"
              >
                Áp dụng đơn mẫu này
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-[18px] font-bold text-slate-900">Các chuyên khoa khác</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {quickTemplates
                .filter((template) => template.id !== activeTemplateId)
                .map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => onChangeTemplate(template.id)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
                  >
                    {template.title}
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-7 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-5 text-slate-400">
            * Các đơn mẫu này chỉ mang tính chất tham khảo. Bác sĩ cần điều chỉnh liều lượng dựa trên tình trạng lâm
            sàng thực tế của bệnh nhân.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf5ff] text-[#2977ff]">
      <Syringe className="h-5 w-5" />
    </div>
  );
}

export function PharmacyWorkspace() {
  const [selectedDrugs, setSelectedDrugs] = useState<SelectedDrug[]>(initialSelectedDrugs);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [activeTemplateId, setActiveTemplateId] = useState("post-op");

  const openTemplateModal = (templateId: string) => {
    setActiveTemplateId(templateId);
    setIsLibraryOpen(true);
  };

  const handleApplyTemplate = () => {
    const template = templateLibrary[activeTemplateId] ?? templateLibrary["post-op"];
    const chosenDrugs = template.drugs.map<SelectedDrug>((drug) => ({
        name: drug.name,
        note: drug.description,
        quantity: drug.quantity,
        unit: drug.unit,
        dosage: drug.dosage,
        timing: drug.timing,
        duration: drug.duration,
        price: drug.price,
      }));

    setSelectedDrugs((current) => {
      const merged = new Map(current.map((drug) => [drug.name, drug]));

      chosenDrugs.forEach((drug) => {
        merged.set(drug.name, drug);
      });

      return Array.from(merged.values());
    });
    setIsLibraryOpen(false);
  };

  const handleRemoveDrug = (drugName: string) => {
    setSelectedDrugs((current) => current.filter((drug) => drug.name !== drugName));
  };

  const totalPrice = useMemo(
    () => selectedDrugs.reduce((total, drug) => total + drug.price, 0).toLocaleString("vi-VN"),
    [selectedDrugs]
  );

  return (
    <>
      <section className="space-y-6">
        <div className="grid gap-4 xl:grid-cols-[1.6fr_0.5fr]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm thuốc từ kho dược (Tên thuốc, hoạt chất, biệt dược...)"
              className="w-full rounded-[20px] border border-slate-200 bg-white py-4 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
            />
          </div>

          <div className="flex items-center justify-between rounded-[22px] border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Bệnh nhân</p>
                <p className="text-lg font-semibold text-slate-900">Lê Văn A - 45 tuổi</p>
              </div>
            </div>

            <button className="text-sm font-semibold text-[#2977ff] transition-colors hover:text-[#1e66dc]">
              Chi tiết
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <SectionIcon />
              <h2 className="text-[26px] font-bold tracking-tight text-slate-900">Đơn thuốc mẫu (Quick-select)</h2>
            </div>

            <button
              type="button"
              onClick={() => openTemplateModal(activeTemplateId)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2977ff] transition-colors hover:text-[#1e66dc]"
            >
              Xem tất cả
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {quickTemplates.map((template) => {
              const Icon = template.icon;

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => openTemplateModal(template.id)}
                  className="rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-[0_12px_26px_rgba(148,163,184,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#bfd8f1]"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${template.iconBg} ${template.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">{template.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{template.subtitle}</p>
                  <p className="mt-4 text-sm font-semibold text-slate-500">{template.drugCount}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_32px_rgba(148,163,184,0.08)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <SectionIcon />
              <h2 className="text-[26px] font-bold tracking-tight text-slate-900">Danh sách thuốc đã chọn</h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50">
                Lưu nháp
              </button>
              <button className="rounded-2xl bg-gradient-to-r from-[#5a96cb] to-[#6aa7db] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(90,150,203,0.26)] transition-transform hover:-translate-y-0.5">
                Hoàn tất đơn thuốc
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-100 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  <th className="px-5 py-4">Tên thuốc & hàm lượng</th>
                  <th className="px-5 py-4">Số lượng</th>
                  <th className="px-5 py-4">Liều dùng / ngày</th>
                  <th className="px-5 py-4">Thời gian</th>
                  <th className="px-5 py-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {selectedDrugs.map((drug) => (
                  <tr key={drug.name} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-5 py-5 align-top">
                      <p className="text-base font-semibold text-slate-900">{drug.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{drug.note}</p>
                    </td>
                    <td className="px-5 py-5 align-top">
                      <div className="space-y-1 text-sm">
                        <p className="font-semibold text-slate-900">{drug.quantity}</p>
                        <p className="text-slate-400">{drug.unit}</p>
                      </div>
                    </td>
                    <td className="px-5 py-5 align-top">
                      <div className="space-y-1 text-sm">
                        <p className="font-medium text-slate-700">{drug.dosage}</p>
                        <p className="text-[#4a86c6]">{drug.timing}</p>
                      </div>
                    </td>
                    <td className="px-5 py-5 align-top text-sm font-medium text-slate-700">{drug.duration}</td>
                    <td className="px-5 py-5 align-top text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveDrug(drug.name)}
                        className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-5 border-t border-slate-100 px-5 py-5 xl:grid-cols-[1fr_auto] xl:items-end">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Lời dặn bác sĩ</p>
              <textarea
                placeholder="Nhập ghi chú cho đơn do bệnh nhân..."
                className="min-h-[86px] w-full rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-300 focus:border-[#8db7da] focus:ring-4 focus:ring-[#8db7da]/10"
              />
            </div>

            <div className="text-right">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Tạm tính chi phí</p>
              <p className="mt-2 text-[38px] font-bold tracking-tight text-[#5a96cb]">{totalPrice}đ</p>
              <p className="mt-1 text-xs text-slate-400">Giá tham khảo tại kho dược nội viện</p>
            </div>
          </div>
        </div>
      </section>

      {isLibraryOpen ? (
        <PrescriptionLibraryModal
          activeTemplateId={activeTemplateId}
          onChangeTemplate={setActiveTemplateId}
          onApply={handleApplyTemplate}
          onClose={() => setIsLibraryOpen(false)}
        />
      ) : null}
    </>
  );
}
