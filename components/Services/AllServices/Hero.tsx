
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowLeft, Cpu, Layers, Activity } from 'lucide-react';
import Button from '../../Button';
import { ServiceGalaxy } from './ServiceGalaxy';

export const Hero: React.FC = () => {
  // Hero Stagger Animation Variants
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } 
    }
  };

  return (
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
         {/* Background Effects */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
         
         {/* Animated Background Blobs */}
         <motion.div 
            animate={{ 
               y: [0, -50, 0],
               x: [0, 30, 0],
               scale: [1, 1.2, 1],
               opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" 
         />
         <motion.div 
            animate={{ 
               y: [0, 50, 0],
               x: [0, -30, 0],
               scale: [1, 1.1, 1],
               opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/20 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" 
         />
         <motion.div 
            animate={{ 
               y: [0, 30, -30, 0],
               x: [0, 50, 0],
               scale: [0.9, 1.1, 0.9],
               opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-luma-yellow/20 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2" 
         />

         <div className="max-w-screen-2xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            
            {/* Left Column: Text Content */}
            <motion.div 
              className="order-2 lg:order-1 text-center lg:text-right relative z-20"
              variants={heroContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
                {/* Decorative background behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none -z-10" />

                {/* Premium Badge */}
                <motion.div variants={heroItemVariants} className="flex justify-center lg:justify-start">
                   <div className="inline-flex items-center gap-3 pl-4 pr-1 py-1 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-luma-purple/10 hover:border-luma-purple/30 transition-colors group cursor-default">
                      <span className="bg-gradient-to-r from-luma-purple to-luma-pink text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                          نسخه ۴.۰
                      </span>
                      <span className="text-gray-300 font-medium text-xs tracking-wide pl-2 group-hover:text-white transition-colors">
                          پلتفرم جامع هوش مصنوعی
                      </span>
                   </div>
                </motion.div>
                
                {/* Title */}
                <motion.h1 
                    variants={heroItemVariants}
                    className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight tracking-tight relative"
                >
                    نهایت قدرت
                    <br />
                    <span className="relative inline-block mt-2 pb-2">
                        {/* Glow effect behind text */}
                        <span className="absolute -inset-4 bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow blur-3xl opacity-20 animate-pulse pointer-events-none"></span>
                        <span className="relative text-gradient-animated">
                            در دستان شما
                        </span>
                    </span>
                </motion.h1>
                
                {/* Description */}
                <motion.p 
                    variants={heroItemVariants}
                    className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-loose font-light"
                >
                   به اکوسیستم جامع لوما خوش آمدید. ما مجموعه‌ای از قدرتمندترین ابزارهای هوش مصنوعی را در یک پلتفرم یکپارچه گردآوری کرده‌ایم تا خلاقیت شما را به سطح جدیدی برسانیم.
                </motion.p>
                
                {/* Buttons */}
                <motion.div 
                    variants={heroItemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                >
                    <Button 
                        externalHref="https://dash.lumai.ir/" 
                        variant="primary" 
                        className="px-8 h-14 text-base shadow-[0_0_30px_rgba(255,100,130,0.3)] hover:shadow-[0_0_50px_rgba(255,100,130,0.5)] border-0 ring-1 ring-white/50"
                    >
                        <Zap size={20} className="fill-black" />
                        دسترسی آنی
                    </Button>
                    <Button 
                        variant="secondary" 
                        onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth'})}
                        className="px-8 h-14 text-base border-white/10 hover:bg-white/5 hover:border-white/20"
                    >
                        بررسی سرویس‌ها
                        <ArrowLeft size={20} />
                    </Button>
                </motion.div>

                {/* Stats Cards - Redesigned as Trust Bar */}
                <motion.div 
                    variants={heroItemVariants}
                    className="grid grid-cols-3 gap-6 border-t border-white/5 pt-10"
                >
                    {[
                        { val: "۸+", label: "ابزار هوش مصنوعی", icon: Cpu },
                        { val: "۱۰۰٪", label: "یکپارچگی ابزارها", icon: Layers },
                        { val: "۲۴/۷", label: "پشتیبانی فعال", icon: Activity },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center lg:items-start gap-2 group cursor-default">
                            <div className="flex items-center gap-3 text-white">
                                <div className="p-2 rounded-xl bg-white/5 text-gray-400 group-hover:text-luma-pink group-hover:bg-luma-pink/10 transition-all duration-300 ring-1 ring-white/5">
                                    <item.icon size={18} />
                                </div>
                                <span className="text-2xl lg:text-3xl font-bold tracking-tighter">{item.val}</span>
                            </div>
                            <span className="text-xs text-gray-500 font-bold tracking-wide">{item.label}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Right Column: Galaxy Animation */}
            <div className="order-1 lg:order-2 flex justify-center items-center">
               <ServiceGalaxy />
            </div>
         </div>

         {/* Smooth Fade Transition */}
         <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-[#080808] pointer-events-none z-0" />
      </section>
  );
};
