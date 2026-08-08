
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, History, MousePointerClick } from 'lucide-react';

const STEPS = [
    { 
        id: 1, 
        title: 'انتخاب مدل', 
        desc: 'روی نام مدل کلیک کنید تا لیست باز شود. آیکون‌های کنار مدل‌ها (فایل، وب، ابزار) را بررسی کنید.', 
        icon: MousePointerClick,
        color: 'text-luma-purple',
        gradient: 'from-luma-purple/20',
        border: 'group-hover:border-luma-purple/30'
    },
    { 
        id: 2, 
        title: 'شروع گفتگو', 
        desc: 'سوال بپرسید یا فایل آپلود کنید. می‌توانید فارسی محاوره صحبت کنید.', 
        icon: MessageSquare, 
        color: 'text-luma-pink',
        gradient: 'from-luma-pink/20',
        border: 'group-hover:border-luma-pink/30'
    },
    { 
        id: 3, 
        title: 'مدیریت تاریخچه', 
        desc: 'مکالمات شما ذخیره می‌شوند. برای دسترسی به آنها از نوار کناری استفاده کنید.', 
        icon: History, 
        color: 'text-luma-yellow',
        gradient: 'from-luma-yellow/20',
        border: 'group-hover:border-luma-yellow/30'
    },
];

export const ChatGuide: React.FC = () => {
  return (
    <section className="py-32 bg-white dark:bg-[#0a0a0a] border-t border-zinc-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
        
        {/* NEW: Top Fade */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />
        
        {/* NEW: Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-luma-purple/5 blur-[120px] rounded-full mix-blend-screen opacity-50" />
            <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        </div>

        <div className="max-w-screen-xl mx-auto px-6 relative z-10">
            
            {/* Header */}
            <div className="text-center mb-24">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight transition-colors">
                        چگونه شروع کنیم؟
                    </h2>
                    <p className="text-zinc-650 dark:text-gray-400 text-lg font-light transition-colors">
                        مسیر ساده برای دستیابی به پاسخ‌های هوشمند
                    </p>
                </motion.div>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                
                {/* Connecting Line (Desktop Only) */}
                <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-zinc-200 dark:bg-white/5 z-0 overflow-hidden transition-colors">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-transparent via-luma-purple to-transparent opacity-50"
                        initial={{ x: "100%" }}
                        whileInView={{ x: "-100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                    />
                </div>

                {STEPS.map((step, i) => (
                    <motion.div 
                        key={step.id} 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                        className="relative z-10 flex flex-col items-center text-center group"
                    >
                        {/* Icon Box */}
                        <div className={`
                            w-32 h-32 rounded-[32px] bg-zinc-50 dark:bg-[#121212] border border-zinc-205 dark:border-white/10 flex items-center justify-center mb-8 relative transition-all duration-500
                            shadow-2xl group-hover:-translate-y-2 ${step.border}
                        `}>
                            {/* Inner Gradient Glow on Hover */}
                            <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${step.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            
                            <step.icon 
                                size={36} 
                                className={`relative z-10 transition-transform duration-500 group-hover:scale-110 ${step.color}`} 
                            />

                            {/* Number Badge */}
                            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-lg text-zinc-800 dark:text-white font-bold text-sm group-hover:border-zinc-350 dark:group-hover:border-white/30 transition-colors z-20">
                                {step.id}
                            </div>
                        </div>

                        {/* Text Content */}
                        <h3 className="text-xl font-bold text-zinc-850 dark:text-white mb-4 group-hover:text-zinc-950 dark:group-hover:text-gray-200 transition-colors">
                            {step.title}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed max-w-[260px] font-light transition-colors">
                            {step.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};
