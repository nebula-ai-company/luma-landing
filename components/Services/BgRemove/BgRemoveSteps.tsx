import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Zap, CheckCircle2 } from 'lucide-react';

export const BgRemoveSteps: React.FC = () => {
  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      {/* Top Gradient Mask */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-luma-purple/5 blur-[100px] rounded-full"
         />
         <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
         
         {/* Header */}
         <div className="text-center mb-24 relative font-sans">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 backdrop-blur-md text-xs font-bold text-zinc-600 dark:text-gray-300 mb-8"
            >
               ساده‌ترین فرآیند
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-8 tracking-tight">
              فقط در <span className="text-gradient-animated">۲ کلیک</span>
            </h2>
            
            {/* Enforced One-Line Description */}
            <div className="w-full overflow-hidden">
              <p className="text-zinc-550 dark:text-gray-400 text-lg md:text-xl font-light whitespace-nowrap overflow-visible min-w-full text-center">
                بدون نیاز به دانش فنی یا ابزارهای پیچیده. همه چیز به صورت خودکار انجام می‌شود.
              </p>
            </div>
         </div>

         {/* --- Abstract Pipeline Visualization --- */}
         <div className="relative max-w-5xl mx-auto font-sans">
            
            {/* Central Connecting Beam */}
            {/* Positioned at top-12 (48px) to align with the center of w-24 (96px) icons */}
            {/* Constrained left/right to ~16.5% to start/end at centers of outer circles */}
            <div className="absolute top-12 left-[16.5%] right-[16.5%] h-px bg-black/10 dark:bg-white/10 hidden md:block overflow-hidden">
               <motion.div 
                  className="h-full bg-gradient-to-r from-transparent via-luma-pink to-transparent w-1/2"
                  // Animate from Right (200% offset) to Left (-100% offset) to match RTL flow
                  animate={{ translateX: ["200%", "-100%"] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
               
               {/* Node 1: Upload (Rightmost in RTL) */}
               <div className="relative group">
                  <div className="flex flex-col items-center text-center">
                     <motion.div 
                        className="w-24 h-24 rounded-full bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 flex items-center justify-center relative z-10 shadow-sm dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] group-hover:border-luma-purple/50 transition-colors duration-500"
                        whileHover={{ scale: 1.1 }}
                     >
                        <div className="absolute inset-0 rounded-full bg-luma-purple/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <UploadCloud size={32} className="text-zinc-400 dark:text-gray-400 group-hover:text-luma-purple transition-colors" />
                        
                        {/* Orbiting Particle */}
                        <motion.div 
                           className="absolute inset-0 rounded-full border border-black/5 dark:border-white/5"
                           animate={{ rotate: 360 }}
                           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                           <div className="w-2 h-2 bg-luma-purple rounded-full absolute -top-1 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#DA8FFF]" />
                        </motion.div>
                     </motion.div>
                     
                     <div className="mt-8 relative z-10">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">بارگذاری تصویر</h3>
                        <p className="text-sm text-zinc-500 dark:text-gray-500 max-w-[200px] mx-auto leading-6">
                           فایل خود را بکشید و رها کنید. پشتیبانی از تمامی فرمت‌ها.
                        </p>
                     </div>
                  </div>
               </div>

               {/* Central Process Node */}
               <div className="relative">
                  <div className="flex flex-col items-center text-center">
                     <div className="relative w-24 h-24 flex items-center justify-center z-10">
                        {/* Spinning Core */}
                        <motion.div 
                           className="absolute inset-0 border-2 border-dashed border-black/10 dark:border-white/20 rounded-full"
                           animate={{ rotate: 360 }}
                           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div 
                           className="absolute inset-2 border border-black/5 dark:border-white/10 rounded-full"
                           animate={{ rotate: -360 }}
                           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                        
                        <div className="w-16 h-16 bg-white dark:bg-[#111] rounded-full flex items-center justify-center border border-black/10 dark:border-white/10 shadow-sm dark:shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                           <Zap size={24} className="text-zinc-900 dark:text-white animate-pulse" />
                        </div>

                        {/* Connectors (Mobile) */}
                        <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 h-12 w-px bg-gradient-to-b from-black/10 dark:from-white/20 to-transparent" />
                        <div className="md:hidden absolute bottom-full left-1/2 -translate-x-1/2 h-12 w-px bg-gradient-to-t from-black/10 dark:from-white/20 to-transparent" />
                     </div>

                     <div className="mt-8 relative z-10">
                        <span className="text-[10px] font-bold text-luma-yellow uppercase tracking-widest bg-luma-yellow/10 px-3 py-1.5 rounded-full border border-luma-yellow/20">
                           پردازش هوشمند
                        </span>
                     </div>
                  </div>
               </div>

               {/* Node 3: Result (Leftmost in RTL) */}
               <div className="relative group">
                  <div className="flex flex-col items-center text-center">
                     <motion.div 
                        className="w-24 h-24 rounded-full bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 flex items-center justify-center relative z-10 shadow-sm dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] group-hover:border-luma-pink/50 transition-colors duration-500"
                        whileHover={{ scale: 1.1 }}
                     >
                        <div className="absolute inset-0 rounded-full bg-luma-pink/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CheckCircle2 size={32} className="text-zinc-400 dark:text-gray-400 group-hover:text-luma-pink transition-colors" />
                        
                        {/* Burst Effect */}
                        <motion.div 
                           className="absolute inset-0 rounded-full border border-luma-pink/30 opacity-0 group-hover:opacity-100"
                           animate={{ scale: [1, 1.5], opacity: [0, 1, 0] }}
                           transition={{ duration: 2, repeat: Infinity }}
                        />
                     </motion.div>
                     
                     <div className="mt-8 relative z-10">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">دریافت خروجی</h3>
                        <p className="text-sm text-zinc-550 dark:text-gray-500 max-w-[200px] mx-auto leading-6">
                           تصویر بدون پس‌زمینه با فرمت PNG آماده دانلود است.
                        </p>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
      
      {/* Bottom Gradient Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </section>
  );
};
