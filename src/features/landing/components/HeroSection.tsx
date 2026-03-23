"use client";

import { ArrowRight, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLandingWorkspace } from "../lib/useLandingWorkspace";

export const HeroSection = () => {
  const router = useRouter();
  const { data } = useLandingWorkspace();
  const hero = data.landingHeroContents[0];

  const handleNavigate = (target: string) => {
    if (target.startsWith("#")) {
      const element = document.querySelector(target);

      if (element instanceof HTMLElement) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      return;
    }

    router.push(target);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden pt-24 pb-32"
    >
      <div className="absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 opacity-20 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
              {hero.badgeText}
            </div>

            <h1 className="mb-6 text-5xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {hero.titlePrefix} <br />
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>{" "}
              <br />
              {hero.titleSuffix}
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-400 sm:text-xl">{hero.body}</p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => handleNavigate(hero.primaryButtonTarget)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:from-blue-500 hover:to-blue-400"
              >
                {hero.primaryButtonLabel}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleNavigate(hero.secondaryButtonTarget)}
                className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {hero.secondaryButtonLabel}
              </button>
            </div>
          </div>

          <div className="relative lg:ml-auto">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-800/50 shadow-2xl">
              <img src={hero.imagePath} alt="Doctor" className="h-full w-full object-cover opacity-90" />
              <div className="absolute right-6 bottom-6 left-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0B1121]/80 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <Activity className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400">{"Ph\u00e2n t\u00edch b\u1ec7nh nh\u00e2n"}</p>
                  <p className="text-sm font-medium text-white">{hero.patientCodeLabel}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium tracking-wider text-emerald-400 uppercase">{"Ho\u00e0n t\u1ea5t"}</p>
                  <p className="text-lg font-bold text-white">{hero.accuracyLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
