
import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export const SecurityHero: React.FC = () => {
  return (
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-4 relative z-10 text-center">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md"
            >
               <Shield className="text-emerald-400" size={16} />
               <span className="text-emerald-100 font-medium text-xs tracking-wide">مرکز امنیت و اعتماد</span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black mb-6"
            >
                امنیت شما، <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">اولویت ماست</span>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
                ما در لوما معتقدیم که خلاقیت نیاز به فضایی امن دارد. زیرساخت‌های ما با بالاترین استانداردهای امنیتی جهان طراحی شده‌اند تا از دارایی‌های دیجیتال شما محافظت کنند.
            </motion.p>
        </div>
      </section>
  );
};
