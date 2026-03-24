"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink, MessageCircle, Phone, Search, X } from "lucide-react";
import { getPatientsByDoctor, type GetPatientsByDoctorData } from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import {
  deriveInitials,
  getActiveDoctorUid,
  getAvatarColorClass,
} from "@/shared/lib/medassist-runtime";

type PatientProfileRow = GetPatientsByDoctorData["patientProfiles"][number];

type ChatContact = {
  id: string;
  name: string;
  initials: string;
  phone: string;
  zaloLink: string;
  color: string;
  userCode?: string | null;
};

type PatientCreatedDetail = {
  uid: string;
  name: string;
  phone: string;
  userCode?: string | null;
};

function normalizePhone(phone?: string | null) {
  return (phone || "").replace(/\D/g, "");
}

function sortContacts(left: ChatContact, right: ChatContact) {
  return left.name.localeCompare(right.name, "vi", { sensitivity: "base" });
}

function mergeContacts(items: ChatContact[]) {
  const seenIds = new Set<string>();
  const seenPhones = new Set<string>();
  const merged: ChatContact[] = [];

  items
    .slice()
    .sort(sortContacts)
    .forEach((contact) => {
      if (!contact.phone || seenIds.has(contact.id) || seenPhones.has(contact.phone)) {
        return;
      }

      seenIds.add(contact.id);
      seenPhones.add(contact.phone);
      merged.push(contact);
    });

  return merged;
}

function toChatContact(patient: PatientProfileRow): ChatContact | null {
  const phone = normalizePhone(patient.user.phone);

  if (!phone) {
    return null;
  }

  return {
    id: patient.userUid,
    name: patient.user.displayName,
    initials: deriveInitials(patient.user.displayName),
    phone,
    zaloLink: `https://zalo.me/${phone}`,
    color: getAvatarColorClass(patient.userUid),
    userCode: patient.user.userCode || null,
  };
}

function fromCreatedPatient(detail: PatientCreatedDetail): ChatContact | null {
  const phone = normalizePhone(detail.phone);

  if (!phone) {
    return null;
  }

  return {
    id: detail.uid,
    name: detail.name,
    initials: deriveInitials(detail.name),
    phone,
    zaloLink: `https://zalo.me/${phone}`,
    color: getAvatarColorClass(detail.uid),
    userCode: detail.userCode || null,
  };
}

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadContacts = async () => {
    setIsLoading(true);

    try {
      const response = await getPatientsByDoctor(getMedAssistDataConnect(), {
        doctorUid: getActiveDoctorUid(),
      });

      setContacts(
        mergeContacts(
          response.data.patientProfiles
            .map(toChatContact)
            .filter((item): item is ChatContact => Boolean(item))
        )
      );
    } catch (error) {
      console.error("Không thể tải danh sách liên hệ bệnh nhân:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadContacts();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    void loadContacts();
  }, [isOpen]);

  useEffect(() => {
    const handlePatientCreated = (event: Event) => {
      const detail = (event as CustomEvent<PatientCreatedDetail>).detail;
      const contact = fromCreatedPatient(detail);

      if (!contact) {
        return;
      }

      setContacts((current) => mergeContacts([contact, ...current]));
    };

    window.addEventListener("medassist:patient-created", handlePatientCreated);
    return () => window.removeEventListener("medassist:patient-created", handlePatientCreated);
  }, []);

  const filteredContacts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return contacts.filter((contact) => {
      if (!normalizedSearch) {
        return true;
      }

      return (
        contact.name.toLowerCase().includes(normalizedSearch) ||
        contact.phone.includes(normalizedSearch) ||
        (contact.userCode || "").toLowerCase().includes(normalizedSearch)
      );
    });
  }, [contacts, searchTerm]);

  return (
    <div className="fixed bottom-4 right-3 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6 sm:gap-4">
      {isOpen ? (
        <div className="flex h-[min(500px,calc(100vh-8rem))] w-[min(340px,calc(100vw-1rem))] flex-col overflow-hidden rounded-xl border border-slate-800/60 bg-[#0B1121] font-sans shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-200 sm:h-[500px] sm:w-[340px]">
          <div className="flex items-center justify-between px-5 pb-3 pt-5">
            <div>
              <h2 className="flex items-center gap-2 text-[20px] font-bold tracking-tight text-white">
                <MessageCircle className="h-5 w-5 text-[#8BB4DC]" />
                Chat bệnh nhân
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Bệnh nhân có số điện thoại sẽ tự động hiện ở đây.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-2 px-4">
            <div className="flex items-center rounded-xl border border-transparent bg-white/5 px-3 py-2.5 text-slate-400 shadow-inner transition-all hover:bg-white/10 focus-within:border-[#8BB4DC]/50">
              <Search className="mr-2 h-4 w-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Tìm tên, mã hồ sơ hoặc số điện thoại..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full border-none bg-transparent text-sm text-slate-200 outline-none placeholder-slate-500"
              />
            </div>
          </div>

          <div className="mt-2 flex-1 space-y-1 overflow-y-auto px-2 pb-4">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                Đang tải liên hệ...
              </div>
            ) : filteredContacts.length ? (
              filteredContacts.map((contact) => (
                <a
                  key={contact.id}
                  href={contact.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-3 py-3 transition-all hover:border-slate-800 hover:bg-[#1A2235]"
                >
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[15px] font-bold text-white shadow-sm ${contact.color}`}
                  >
                    {contact.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-[14px] font-semibold text-slate-200 transition-colors group-hover:text-white">
                      {contact.name}
                    </h4>
                    <div className="mt-0.5 flex items-center gap-1.5 text-slate-400">
                      <Phone className="h-3 w-3" />
                      <span className="text-[12px] font-medium">{contact.phone}</span>
                    </div>
                    {contact.userCode ? (
                      <p className="mt-1 text-[11px] text-slate-500">Mã hồ sơ: {contact.userCode}</p>
                    ) : null}
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/50 text-[#8BB4DC] opacity-0 transition-opacity group-hover:opacity-100">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </a>
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-500">
                <Search className="h-8 w-8 opacity-20" />
                <p className="text-sm">Chưa tìm thấy liên hệ phù hợp.</p>
              </div>
            )}
          </div>

          <div className="border-t border-slate-800/60 bg-[#0B1121] px-4 py-3 text-center text-[12px] text-slate-500">
            Mở nhanh Zalo từ số điện thoại bệnh nhân đã lưu.
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#35678E] to-[#8BB4DC] text-white shadow-lg shadow-[#35678E]/30 transition-transform hover:scale-105 hover:opacity-90"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
};
