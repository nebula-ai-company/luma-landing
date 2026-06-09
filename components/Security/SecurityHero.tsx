
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, CheckCircle2 } from 'lucide-react';
import { SecurityHeroAnim } from './SecurityHeroAnim';

export const SecurityHero: React.FC = () => {
  return (
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FAFAFA] dark:bg-[#0a0a0a] transition-colors duration-300">
        
        {/* --- Background Atmosphere --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           {/* Purple Orb (Right) */}
           <motion.div 
              animate={{ 
                 x: [0, 50, -50, 0],
                 y: [0, -30, 30, 0],
                 scale: [1, 1.2, 0.9, 1],
                 opacity: [0.15, 0.25, 0.15]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/10 dark:bg-luma-purple/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 mix-blend-multiply dark:mix-blend-screen" 
           />
           
           {/* Pink Orb (Left) */}
           <motion.div 
              animate={{ 
                 x: [0, -50, 50, 0],
                 y: [0, 40, -40, 0],
                 scale: [0.9, 1.1, 1, 0.9],
                 opacity: [0.15, 0.25, 0.15]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-luma-pink/10 dark:bg-luma-pink/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 mix-blend-multiply dark:mix-blend-screen" 
           />

           {/* Noise Texture */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.04] mix-blend-overlay" />
        </div>

        {/* --- Seamless Bottom Fade --- */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                
                {/* Text Content - Right (RTL) */}
                <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8 }}
                   className="text-center lg:text-right"
                >
                   <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 dark:border-luma-yellow/20 bg-orange-500/5 dark:bg-luma-yellow/5 backdrop-blur-md mb-8 group hover:bg-orange-500/10 dark:hover:bg-luma-yellow/10 transition-colors"
                   >
                      <Shield size={16} className="text-orange-600 dark:text-luma-yellow animate-pulse" />
                      <span className="text-[11px] font-bold text-orange-700 dark:text-luma-yellow tracking-wide uppercase">امنیت در سطح سازمانی</span>
                   </motion.div>

                   <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 dark:text-white mb-6 leading-tight tracking-tight transition-colors duration-300">
                      امنیت شما،
                      <br />
                      <span className="text-gradient-animated py-2 inline-block">
                         اولویت مطلق ماست
                      </span>
                   </h1>

                   <p className="text-lg text-zinc-600 dark:text-gray-400 mb-10 leading-loose max-w-xl mx-auto lg:mx-0 font-light transition-colors duration-300">
                      ما در لوما معتقدیم که خلاقیت نیاز به فضایی امن دارد. زیرساخت‌های ما با استاندارد AES-256 و پروتکل‌های امنیتی چندلایه طراحی شده‌اند تا از دارایی‌های دیجیتال شما محافظت کنند.
                   </p>
                   
                   {/* Security Badges */}
                   <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                      {[
                         { label: "End-to-End Encryption", icon: Lock },
                         { label: "GDPR Compliant", icon: CheckCircle2 },
                         { label: "ISO 27001", icon: Server },
                      ].map((badge, i) => (
                         <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 text-[10px] text-zinc-650 dark:text-gray-400 transition-colors duration-300">
                            <badge.icon size={12} className="text-indigo-600 dark:text-luma-purple" />
                            {badge.label}
                         </div>
                      ))}
                   </div>
                </motion.div>

                {/* Animation Container */}
                <motion.div
                   initial={{ opacity: 0, scale: 0.95, x: -20 }}
                   animate={{ opacity: 1, scale: 1, x: 0 }}
                   transition={{ duration: 0.8, delay: 0.2 }}
                   className="relative h-[600px] w-full"
                >
                   {/* Glow Behind Container */}
                   <div className="absolute -inset-4 bg-gradient-to-tr from-luma-purple/20 via-luma-pink/10 to-transparent blur-3xl opacity-30 dark:opacity-40 rounded-[40px] -z-10 animate-pulse-slow" />
                   
                   {/* Component Wrapper */}
                   <div className="w-full h-full shadow-2xl shadow-zinc-250 dark:shadow-black rounded-[40px] overflow-hidden border border-zinc-200/50 dark:border-white/10 bg-[#FAFAFA] dark:bg-[#0c0c0e] transition-colors duration-300">
                      <SecurityHeroAnim />
                   </div>
                </motion.div>

            </div>
        </div>
      </section>
  );
};
