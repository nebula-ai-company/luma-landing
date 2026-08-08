
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap } from 'lucide-react';
import Button from '../../Button';
import { AssistantHeroAnim } from './AssistantHeroAnim';
import { useTheme } from '../../../lib/ThemeContext';

export const AssistantHero: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FAFAFA] dark:bg-[#0a0a0a] transition-colors duration-300">
      
      {/* --- Animated Background --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {/* Top Right Orb - Yellow/Orange emphasis for Assistant */}
         <motion.div 
            animate={{ 
               y: [0, -60, 0],
               x: [0, 40, 0],
               scale: [1, 1.2, 1],
               opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[700px] h-[700px] bg-luma-yellow/20 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4 mix-blend-multiply dark:mix-blend-screen" 
         />
         
         {/* Bottom Left Orb - Purple */}
         <motion.div 
            animate={{ 
               y: [0, 60, 0],
               x: [0, -40, 0],
               scale: [0.9, 1.1, 0.9],
               opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-purple/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 mix-blend-multiply dark:mix-blend-screen" 
         />

         {/* Floating Center Orb - Pink */}
         <motion.div 
            animate={{ 
               x: [0, -50, 50, 0],
               y: [0, 30, -30, 0],
               scale: [1, 0.8, 1.1, 1],
               opacity: [0.08, 0.15, 0.08]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luma-pink/10 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen" 
         />

         {/* Animated Grid Overlay */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />

         {/* Noise Texture */}
         <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.04] mix-blend-overlay" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
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
               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luma-yellow/20 dark:border-luma-yellow/30 bg-luma-yellow/5 backdrop-blur-md mb-8 group hover:bg-luma-yellow/10 transition-colors cursor-default"
            >
               <Bot size={16} className="text-luma-yellow animate-pulse" />
               <span className="text-[11px] font-bold text-zinc-600 dark:text-luma-yellow tracking-wide">نسل جدید پشتیبانی مشتریان</span>
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-black text-zinc-950 dark:text-white mb-6 leading-tight tracking-tight">
               استخدام
               <br />
               {/* Using standard animated gradient class */}
               <span className="text-gradient-animated py-2 inline-block">
                  کارمند دیجیتال
               </span>
            </h1>

            <p className="text-lg text-zinc-600 dark:text-gray-400 mb-10 leading-loose max-w-xl mx-auto lg:mx-0 font-light">
               با ساخت دستیار هوشمند، یک نماینده ۲۴ ساعته بسازید که با مطالعه مستندات و وب‌سایت شما، به تمام سوالات مشتریان با دقت و حوصله پاسخ می‌دهد.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <Button 
                  externalHref="https://dash.lumai.ir/" 
                  variant="primary"
                  className="bg-luma-yellow text-black hover:bg-amber-400 shadow-[0_0_30px_-5px_rgba(255,179,64,0.4)] border-none shrink-0"
               >
                  ساخت دستیار جدید
                  <Zap size={20} className="fill-black" />
               </Button>
            </div>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-zinc-550 dark:text-gray-550 font-medium"
            >
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> اتصال به سایت</span>
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse delay-100" /> پشتیبانی فارسی</span>
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse delay-200" /> بدون کدنویسی</span>
            </motion.div>
          </motion.div>

          {/* Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[550px] w-full"
          >
             {/* Glow Behind Container */}
             <div className="absolute -inset-1 bg-gradient-to-br from-luma-yellow/20 via-luma-purple/10 to-transparent blur-3xl opacity-40 rounded-[40px] -z-10 animate-pulse-slow font-sans" />
             <AssistantHeroAnim />
          </motion.div>

        </div>
      </div>

      {/* --- Bottom Fade --- */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </section>
  );
};
