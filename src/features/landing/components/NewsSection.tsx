"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowLeft, ArrowRight, Eye, FileText, Stethoscope, type LucideIcon } from "lucide-react";
import "@/styles/landing.scss";
import { useLandingWorkspace } from "../lib/useLandingWorkspace";

const iconMap = {
  stethoscope: Stethoscope,
  eye: Eye,
  activity: Activity,
  file: FileText,
} as const;

type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  link?: string;
  image: string;
  icon: LucideIcon;
};

export const NewsSection = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const { data } = useLandingWorkspace();

  const articles = useMemo<NewsArticle[]>(
    () =>
      data.landingArticles
        .slice()
        .sort((left, right) => left.displayOrder - right.displayOrder)
        .map((article) => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          link: article.link || undefined,
          image: article.imagePath,
          icon: iconMap[article.iconKey as keyof typeof iconMap] ?? Activity,
        })),
    [data]
  );

  const handleOpenArticle = (article: NewsArticle) => {
    setActiveArticle(article);
    setStep(2);
  };

  return (
    <section className="flex min-h-[700px] flex-col justify-center bg-[#0B1121] py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {"Ki\u1ebfn th\u1ee9c Y khoa & Truy\u1ec1n th\u00f4ng"}
          </h2>
          <p className="text-slate-400">
            {"Kh\u00e1m ph\u00e1 c\u00e1c nghi\u00ean c\u1ee9u v\u00e0 \u0111\u1ed9t ph\u00e1 m\u1edbi nh\u1ea5t trong ng\u00e0nh nh\u00e3n khoa."}
          </p>
        </div>

        <div className="relative mx-auto w-full">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="cover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="group relative mx-auto max-w-4xl cursor-pointer overflow-hidden py-20 text-center glass-card"
                onClick={() => setStep(1)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-400/20 opacity-50 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-500/30 bg-[#151C2C] shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all group-hover:scale-110 group-hover:bg-cyan-500/20">
                    <Activity className="h-10 w-10 text-cyan-400" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">{"M\u1edf Kho T\u1ee7 S\u00e1ch Y Khoa"}</h3>
                  <p className="mb-6 text-slate-400">
                    {"Nh\u1ea5n \u0111\u1ec3 kh\u00e1m ph\u00e1"} {articles.length} {"m\u1ea3nh gh\u00e9p ki\u1ebfn th\u1ee9c"}
                  </p>
                  <button className="flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-bold text-[#0F172A] transition-colors hover:bg-cyan-400">
                    {"Kh\u00e1m ph\u00e1 ngay"} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ) : null}

            {step === 1 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {articles.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative z-0 flex cursor-pointer flex-col rounded-2xl border border-white/5 bg-[#0F172A] p-5 transition-all duration-500 ease-out hover:z-10 hover:scale-[1.03] hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                    onClick={() => handleOpenArticle(article)}
                  >
                    <div className="relative mb-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-[#151C2C]">
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0">
                        <article.icon className="h-16 w-16 text-cyan-400 opacity-80" />
                      </div>

                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full scale-100 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent"></div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col">
                      <h3 className="mb-3 text-lg leading-snug font-bold text-white">{article.title}</h3>
                      <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-slate-400">{article.excerpt}</p>

                      <div className="mt-auto">
                        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-500 uppercase transition-colors group-hover:text-cyan-400">
                          {"XEM B\u00c0I B\u00c1O"}{" "}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                        </span>
                      </div>
                    </div>

                    <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20"></div>
                  </motion.div>
                ))}
              </motion.div>
            ) : null}

            {step === 2 && activeArticle ? (
              <motion.div
                key="article"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative mx-auto max-w-4xl bg-[#0F172A] glass-card"
              >
                <button
                  onClick={() => setStep(1)}
                  className="mb-8 flex items-center gap-2 text-sm font-bold tracking-wider text-cyan-500 uppercase transition-colors hover:text-cyan-400"
                >
                  <ArrowLeft className="h-4 w-4" /> {"Quay l\u1ea1i danh s\u00e1ch"}
                </button>

                <div className="mb-10 flex flex-col gap-8 sm:flex-row">
                  <div className="relative w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 aspect-square sm:w-1/3">
                    <img src={activeArticle.image} alt="Cover" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay"></div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className="mb-4 text-3xl leading-tight font-bold text-white sm:text-4xl">{activeArticle.title}</h3>
                    <p className="text-lg font-medium text-cyan-400">{activeArticle.excerpt}</p>
                  </div>
                </div>

                <div className="mb-8 h-px w-full bg-white/10"></div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-lg leading-loose text-slate-300">{activeArticle.content}</p>
                </div>

                {activeArticle.link ? (
                  <div className="mt-12 border-t border-white/10 pt-8">
                    <a
                      href={activeArticle.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 text-sm font-bold text-[#0F172A] shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-colors hover:bg-cyan-400 sm:w-auto"
                    >
                      {"\u0110\u1eccC B\u00c0I VI\u1ebeT G\u1ed0C TR\u00caN B\u00c1O"} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
