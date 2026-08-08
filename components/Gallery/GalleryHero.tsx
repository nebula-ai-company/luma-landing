
import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

export const GalleryHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-12 bg-white dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luma-purple/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-luma-pink/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10 text-center">
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[10px] font-bold text-zinc-500 dark:text-gray-400 mb-6 uppercase tracking-widest backdrop-blur-md"
            >
               <Layers size={12} className="text-zinc-800 dark:text-white" />
               <span>نمایشگاه آثار</span>
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight transition-colors duration-300"
            >
               گالری <span className="text-gradient-animated">خلاقیت</span>
            </motion.h1>
            
            <motion.p 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-zinc-500 dark:text-gray-400 text-lg font-light max-w-2xl mx-auto transition-colors duration-300"
            >
               مجموعه‌ای از بهترین آثار تولید شده با هوش مصنوعی لوما. الهام بگیرید و خلق کنید.
            </motion.p>
        </div>
    </section>
  );
};
