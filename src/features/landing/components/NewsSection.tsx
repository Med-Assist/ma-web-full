"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, ArrowLeft } from 'lucide-react';
import '@/styles/landing.scss';
import { ARTICLES } from '../constants/articles';

export const NewsSection = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [activeArticle, setActiveArticle] = useState<typeof ARTICLES[0] | null>(null);

  const handleOpenArticle = (article: typeof ARTICLES[0]) => {
    setActiveArticle(article);
    setStep(2);
  };

  return (
    <section className="py-24 bg-[#0B1121] min-h-[700px] flex flex-col justify-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Kiến thức Y khoa & Truyền thông
          </h2>
          <p className="text-slate-400">
            Khám phá các nghiên cứu và đột phá mới nhất trong ngành nhãn khoa.
          </p>
        </div>

        <div className="relative w-full mx-auto">
          <AnimatePresence mode="wait">
            
            {step === 0 && (
              <motion.div
                key="cover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto glass-card cursor-pointer text-center py-20 relative overflow-hidden group"
                onClick={() => setStep(1)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-400/20 group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-20 w-20 bg-[#151C2C] border border-cyan-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,211,238,0.2)] group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    <Activity className="h-10 w-10 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Mở Khóa Tủ Sách Y Khoa</h3>
                  <p className="text-slate-400 mb-6">Click để khám phá 4 mảnh ghép kiến thức</p>
                  <button className="flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-bold text-[#0F172A] hover:bg-cyan-400 transition-colors">
                    Khám phá ngay <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {ARTICLES.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative flex flex-col rounded-2xl bg-[#0F172A] p-5 border border-white/5 cursor-pointer transition-all duration-500 ease-out hover:scale-[1.03] hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:z-10"
                    onClick={() => handleOpenArticle(article)}
                  >
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#151C2C] mb-6 flex items-center justify-center">
                      
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0">
                        <article.icon className="h-16 w-16 text-cyan-400 opacity-80" />
                      </div>

                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover transform scale-100 transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent"></div>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-white mb-3 leading-snug">{article.title}</h3>
                      <p className="text-sm text-slate-400 mb-6 line-clamp-4 leading-relaxed">{article.excerpt}</p>
                      
                      <div className="mt-auto">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-500 group-hover:text-cyan-400 transition-colors">
                          XEM BÀI BÁO <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-2" />
                        </span>
                      </div>
                    </div>

                    <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {step === 2 && activeArticle && (
              <motion.div
                key="article"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="max-w-4xl mx-auto glass-card relative bg-[#0F172A]"
              >
                <button 
                  onClick={() => setStep(1)}
                  className="mb-8 flex items-center gap-2 text-sm font-bold text-cyan-500 hover:text-cyan-400 transition-colors uppercase tracking-wider"
                >
                  <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
                </button>
                
                <div className="flex flex-col sm:flex-row gap-8 mb-10">
                   <div className="w-full sm:w-1/3 aspect-square rounded-2xl overflow-hidden shrink-0 border border-white/10 relative">
                      <img src={activeArticle.image} alt="Cover" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay"></div>
                   </div>
                   
                   <div className="flex flex-col justify-center">
                     <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">{activeArticle.title}</h3>
                     <p className="text-lg text-cyan-400 font-medium">{activeArticle.excerpt}</p>
                   </div>
                </div>
                
                <div className="w-full h-px bg-white/10 mb-8"></div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-loose text-lg">
                    {activeArticle.content}
                  </p>
                </div>

                {activeArticle.link && (
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <a 
                      href={activeArticle.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-xl bg-cyan-500 px-8 py-4 text-sm font-bold text-[#0F172A] hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    >
                      ĐỌC BÀI VIẾT GỐC TRÊN BÁO <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};