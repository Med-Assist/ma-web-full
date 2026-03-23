"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ArrowRight, FileText, Mail, MapPin, Phone, Stethoscope, User } from "lucide-react";
import "@/styles/landing.scss";
import { createContactLead } from "@/shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "@/shared/lib/dataconnect";
import { nowIsoString } from "@/shared/lib/medassist-runtime";
import { useLandingWorkspace } from "../lib/useLandingWorkspace";

type ContactFormState = {
  name: string;
  email: string;
  role: string;
  message: string;
};

export const ContactSection = () => {
  const { data } = useLandingWorkspace();
  const support = data.supportContactInfos[0];
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    role: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: keyof ContactFormState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.role.trim() || !form.message.trim()) {
      alert("Vui l\u00f2ng \u0111i\u1ec1n \u0111\u1ea7y \u0111\u1ee7 th\u00f4ng tin \u0111\u1ec3 g\u1eedi y\u00eau c\u1ea7u.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createContactLead(getMedAssistDataConnect(), {
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        message: form.message.trim(),
        createdAt: nowIsoString(),
      });

      alert("Y\u00eau c\u1ea7u c\u1ee7a b\u1ea1n \u0111\u00e3 \u0111\u01b0\u1ee3c l\u01b0u v\u00e0o Data Connect. MedAssist s\u1ebd li\u00ean h\u1ec7 l\u1ea1i s\u1edbm.");
      setForm({
        name: "",
        email: "",
        role: "",
        message: "",
      });
    } catch (error) {
      console.error("Kh\u00f4ng th\u1ec3 g\u1eedi contact lead:", error);
      alert("Kh\u00f4ng th\u1ec3 g\u1eedi y\u00eau c\u1ea7u l\u00fac n\u00e0y. Vui l\u00f2ng th\u1eed l\u1ea1i.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="bg-[#0B1121] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#151C2C]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative flex flex-col justify-center overflow-hidden p-12 lg:p-16">
              <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-gradient-to-br from-blue-900/20 to-transparent"></div>

              <div className="relative z-10">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                  <Activity className="h-3 w-3" /> {support.centerBadge}
                </div>
                <h2 className="mb-6 text-4xl leading-tight font-light text-white sm:text-5xl">
                  {support.headlinePrefix} <br />
                  <span className="font-bold text-gradient-cyan">{support.headlineAccent}</span> {"c\u00f9ng"} <br />
                  <span className="font-semibold text-blue-500">{support.headlineBrand}</span>
                </h2>
                <p className="mb-12 leading-relaxed text-slate-400">{support.description}</p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-[#0B1121] text-cyan-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-white">{support.email}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-[#0B1121] text-cyan-400">
                      <Phone className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-white">{support.phone}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-[#0B1121] text-cyan-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-white">{support.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l border-white/5 bg-[#0B1121]/50 p-12 lg:p-16">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{"H\u1ecd v\u00e0 T\u00ean"}</label>
                    <div className="relative">
                      <User className="pointer-events-none absolute top-3 left-3 h-5 w-5 text-slate-500" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={handleChange("name")}
                        placeholder={"Nguy\u1ec5n V\u0103n A"}
                        className="input-dark"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{"Email li\u00ean h\u1ec7"}</label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-3 left-3 h-5 w-5 text-slate-500" />
                      <input type="email" value={form.email} onChange={handleChange("email")} placeholder="email@example.com" className="input-dark" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">{"B\u1ea1n l\u00e0 ai?"}</label>
                  <div className="relative">
                    <Stethoscope className="pointer-events-none absolute top-3 left-3 h-5 w-5 text-slate-500" />
                    <select className="input-dark pr-10 appearance-none" value={form.role} onChange={handleChange("role")}>
                      <option value="" disabled>
                        {"Ch\u1ecdn vai tr\u00f2 c\u1ee7a b\u1ea1n"}
                      </option>
                      <option value="doctor">{"B\u00e1c s\u0129 / Chuy\u00ean gia y t\u1ebf"}</option>
                      <option value="hospital">{"B\u1ec7nh vi\u1ec7n / Ph\u00f2ng kh\u00e1m"}</option>
                      <option value="patient">{"B\u1ec7nh nh\u00e2n"}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">{"L\u1eddi nh\u1eafn"}</label>
                  <div className="relative">
                    <FileText className="pointer-events-none absolute top-3 left-3 h-5 w-5 text-slate-500" />
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={handleChange("message")}
                      placeholder={"H\u00e3y cho ch\u00fang t\u00f4i bi\u1ebft mong mu\u1ed1n h\u1ee3p t\u00e1c..."}
                      className="input-dark resize-none pt-3"
                    ></textarea>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-glow-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
                  {isSubmitting ? "\u0110ANG G\u1eecI..." : "NH\u1eacN T\u01af V\u1ea4N NGAY"} <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
