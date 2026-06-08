
import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, UserCog, Camera, Zap } from 'lucide-react';

const STEPS = [
    {
        id: "01",
        title: "تصویر ورودی",
        desc: "عکس لباس را آپلود کنید.",
        detail: "روی چوب‌لباسی یا سطح صاف",
        icon: UploadCloud,
        color: "text-luma-purple",
        hex: "#DA8FFF"
    },
    {
        id: "02",
        title: "شخصی‌سازی",
        desc: "ویژگی‌های مانکن را تعیین کنید.",
        detail: "سن، سایز، حجاب و ژست",
        icon: UserCog,
        color: "text-luma-pink",
        hex: "#FF6482"
    },
    {
        id: "03",
        title: "تنظیم محیط",
        desc: "نورپردازی و پس‌زمینه را بسازید.",
        detail: "استودیویی یا فضای باز",
        icon: Camera,
        color: "text-luma-yellow",
        hex: "#FFB340"
    },
    {
        id: "04",
        title: "ساخت تصویر",
        desc: "جادوی نهایی را تماشا کنید.",
        detail: "رندر آنی در ۵ ثانیه",
        icon: Zap,
        color: "text-luma-purple",
        hex: "#DA8FFF"
    }
];

export const VtonSteps: React.FC = () => {
  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
        
        {/* --- Top Gradient Fade --- */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        {/* --- Background Ambient Effects (Automatically Animated) --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.25, 0.15],
                    x: [0, 50, 0],
                    y: [0, -50, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-luma-purple/10 dark:bg-luma-purple/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-100" 
            />
            <motion.div 
                animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.15, 0.25, 0.15],
                    x: [0, -30, 0],
                    y: [0, 50, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-luma-pink/10 dark:bg-luma-pink/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-100" 
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.03]" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
            
            {/* --- Header --- */}
            <div className="text-center mb-24 max-w-3xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100/50 dark:bg-white/5 backdrop-blur-md transition-colors duration-300"
                >
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luma-yellow opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-luma-yellow"></span>
                    </span>
                    <span className="text-zinc-650 dark:text-gray-300 font-bold text-xs tracking-wide uppercase">روند کار</span>
                </motion.div>
                
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight transition-colors duration-300"
                >
                    مسیر خلق <span className="text-gradient-animated">استایل</span>
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-650 dark:text-gray-400 text-lg font-light leading-relaxed transition-colors duration-300"
                >
                    چهار گام ساده برای تبدیل یک عکس معمولی لباس به یک کاتالوگ حرفه‌ای با هوش مصنوعی.
                </motion.p>
            </div>

            {/* --- Steps Visualization --- */}
            <div className="relative">
                
                {/* Connecting Line (Desktop) - Auto Draws from Right to Left */}
                <div className="hidden lg:block absolute top-[80px] left-0 right-0 h-px bg-zinc-200 dark:bg-white/10 overflow-hidden">
                    <motion.div 
                        initial={{ x: "100%" }}
                        whileInView={{ x: "0%" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                        className="w-full h-full bg-gradient-to-r from-transparent via-zinc-400 dark:via-white/50 to-transparent opacity-50"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
                    {STEPS.map((step, i) => (
                        <motion.div 
                            key={step.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.2, duration: 0.6, ease: "backOut" }}
                            className="relative group"
                        >
                            {/* Connector Arrow (Mobile) */}
                            {i !== STEPS.length - 1 && (
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:hidden text-zinc-400/20 dark:text-white/10">
                                    <div className="w-px h-6 bg-gradient-to-b from-zinc-300 dark:from-white/20 to-transparent" />
                                </div>
                            )}

                            {/* Floating Animation Wrapper */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ 
                                    duration: 4, 
                                    repeat: Infinity, 
                                    ease: "easeInOut", 
                                    delay: i * 0.5 // Stagger the floating effect
                                }}
                                className="h-full"
                            >
                                {/* Card Body */}
                                <div className="h-full bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 rounded-[32px] p-6 relative overflow-hidden transition-all duration-500 hover:border-zinc-350 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/50 group-hover:bg-zinc-50 dark:group-hover:bg-[#151515]">
                                    
                                    {/* Hover/Active Glow */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                                        style={{ background: `radial-gradient(circle at top, ${step.hex}, transparent 70%)` }}
                                    />

                                    {/* Step Number (Left Side) */}
                                    <span className="absolute top-4 left-6 text-6xl font-black text-zinc-200/40 dark:text-white/5 select-none transition-colors group-hover:text-zinc-300/50 dark:group-hover:text-white/[0.07]">
                                        {step.id}
                                    </span>

                                    {/* Icon Container with Auto Pulse */}
                                    <div className="relative mb-8 pt-4 flex justify-center lg:justify-start">
                                        <div className="relative">
                                            {/* Icon Ring */}
                                            <div className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-white/5 flex items-center justify-center shadow-md dark:shadow-lg relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-zinc-300 dark:group-hover:border-white/20">
                                                <step.icon size={28} className={`${step.color} transition-all duration-300 drop-shadow-md`} />
                                            </div>
                                            
                                            {/* Automatic Subtle Pulse */}
                                            <motion.div 
                                                animate={{ scale: [1, 1.2, 1], opacity: [0, 0.2, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                                className="absolute inset-0 rounded-2xl z-0"
                                                style={{ backgroundColor: step.hex }}
                                            />
                                            
                                            {/* Connection Dot on Line (Desktop) */}
                                            <motion.div 
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ delay: 0.5 + (i * 0.2), type: "spring" }}
                                                className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#FAFAFA] dark:bg-[#0a0a0a] border border-zinc-300 dark:border-white/20 rounded-full z-0 -mt-[56px]"
                                            >
                                                <div className="w-full h-full rounded-full bg-zinc-400 dark:bg-white animate-pulse" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="text-center lg:text-right relative z-10">
                                        <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-2 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-zinc-650 dark:text-gray-400 font-medium mb-3 group-hover:text-zinc-850 dark:group-hover:text-gray-300 transition-colors">
                                            {step.desc}
                                        </p>
                                        <div className="inline-block px-3 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 text-[10px] text-zinc-500 dark:text-gray-500 font-bold group-hover:bg-zinc-200 dark:group-hover:bg-white/10 group-hover:text-zinc-700 dark:group-hover:text-gray-305 transition-all border-dashed group-hover:border-solid">
                                            {step.detail}
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- Bottom Gradient Fade --- */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />
    </section>
  );
};
