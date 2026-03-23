"use client";

import { motion } from "framer-motion";
import { Activity, LayoutDashboard, Shield, Zap } from "lucide-react";
import "@/styles/landing.scss";
import { useLandingWorkspace } from "../lib/useLandingWorkspace";

const iconMap = {
  activity: Activity,
  dashboard: LayoutDashboard,
  shield: Shield,
  zap: Zap,
} as const;

export const CoreTechSection = () => {
  const { data } = useLandingWorkspace();
  const features = data.landingFeatures
    .filter((feature) => feature.section === "core-tech")
    .sort((left, right) => left.displayOrder - right.displayOrder);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="border-t border-white/5 bg-[#0B1121] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="mb-4 block text-xs font-bold tracking-widest text-blue-500 uppercase">
          {"C\u00f4ng ngh\u1ec7 c\u1ed1t l\u00f5i"}
        </span>
        <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
          {"\u0110\u1ed9 ch\u00ednh x\u00e1c chu\u1ea9n Y khoa v\u1edbi t\u1ed1c \u0111\u1ed9 AI"}
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-slate-400">
          {
            "N\u1ec1n t\u1ea3ng c\u1ee7a ch\u00fang t\u00f4i t\u00edch h\u1ee3p li\u1ec1n m\u1ea1ch v\u00e0o c\u01a1 s\u1edf h\u1ea1 t\u1ea7ng b\u1ec7nh vi\u1ec7n hi\u1ec7n c\u00f3, \u0111\u1ed3ng th\u1eddi cung c\u1ea5p c\u00e1c ch\u1ea9n \u0111o\u00e1n ti\u00ean ti\u1ebfn nh\u1ea5t."
          }
        </p>

        <div className="grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = iconMap[feature.iconKey as keyof typeof iconMap] ?? Activity;

            return (
              <div key={feature.id} className="glass-card">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
