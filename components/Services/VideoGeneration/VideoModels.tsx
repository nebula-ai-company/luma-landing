
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Film, Image as ImageIcon, Zap, Crown, MonitorPlay, Clock, Sparkles, Video, Star, Layers } from 'lucide-react';

// Unified Brand Palette Hex Codes
const COLORS = {
  purple: '#DA8FFF',
  pink: '#FF6482',
  yellow: '#FFB340',
};

const MODELS = [
  { 
    name: "SORA 2", 
    type: "Gen", 
    speed: "Standard", 
    desc: "نسل جدید تولید ویدیو با درک فیزیک جهان", 
    hex: COLORS.purple,
    colorClass: "text-luma-purple",
    icon: Film 
  },
  { 
    name: "SORA 2 PRO", 
    type: "Pro", 
    speed: "High", 
    desc: "کیفیت سینمایی 4K با جزئیات خیره‌کننده", 
    hex: COLORS.purple,
    colorClass: "text-luma-purple",
    icon: Crown,
    badge: "PRO"
  },
  { 
    name: "WAN 2.2 TURBO", 
    type: "Fast", 
    speed: "Turbo", 
    desc: "سرعت پردازش بالا برای نمونه‌سازی سریع", 
    hex: COLORS.yellow,
    colorClass: "text-luma-yellow",
    icon: Zap 
  },
  { 
    name: "WAN 2.5", 
    type: "Gen", 
    speed: "Standard", 
    desc: "تعادل عالی بین کیفیت و سرعت رندر", 
    hex: COLORS.pink,
    colorClass: "text-luma-pink",
    icon: Video 
  },
  { 
    name: "KLING 2.5 TURBO", 
    type: "Fast", 
    speed: "Turbo", 
    desc: "بهینه شده برای کلیپ‌های کوتاه شبکه‌های اجتماعی", 
    hex: COLORS.yellow,
    colorClass: "text-luma-yellow",
    icon: Zap,
    badge: "TURBO"
  },
  { 
    name: "KLING 2.6 PRO", 
    type: "Pro", 
    speed: "High", 
    desc: "واقع‌گرایی پیشرفته در حرکات انسانی", 
    hex: COLORS.pink,
    colorClass: "text-luma-pink",
    icon: Star,
    badge: "PRO"
  },
  { 
    name: "LTX 2 FAST", 
    type: "Light", 
    speed: "Fast", 
    desc: "رندر آنی و سبک برای دستگاه‌های همراه", 
    hex: COLORS.yellow,
    colorClass: "text-luma-yellow",
    icon: MonitorPlay 
  },
  { 
    name: "VEO 3 FAST", 
    type: "Light", 
    speed: "Fast", 
    desc: "مناسب برای استوری‌موشن و تبلیغات", 
    hex: COLORS.purple,
    colorClass: "text-luma-purple",
    icon: Film 
  },
  { 
    name: "VEO 3.1 FAST", 
    type: "Light", 
    speed: "Fast", 
    desc: "نسخه بهینه‌شده V3 با پایداری بیشتر", 
    hex: COLORS.pink,
    colorClass: "text-luma-pink",
    icon: Video 
  },
  { 
    name: "HAILUO 2.3", 
    type: "Gen", 
    speed: "Standard", 
    desc: "هوش مصنوعی خلاق برای ویدیوهای هنری", 
    hex: COLORS.purple,
    colorClass: "text-luma-purple",
    icon: Sparkles 
  },
  { 
    name: "SEEDANCE V1", 
    type: "Anim", 
    speed: "Fast", 
    desc: "مخصوص انیمیشن و موشن گرافیک", 
    hex: COLORS.pink,
    colorClass: "text-luma-pink",
    icon: MonitorPlay 
  },
  { 
    name: "SEEDANCE 2.0 REFERENCE", 
    type: "Pro", 
    speed: "High", 
    desc: "موتور تولید چند‌مرجع برای ویدئوساز هوشمند، مرجع تصویری/ویدیویی/صوتی، خروجی ۱۰۸۰p با صدا", 
    hex: COLORS.yellow,
    colorClass: "text-luma-yellow",
    icon: Layers,
    badge: "REFERENCE"
  },
  { 
    name: "SEEDANCE 2.0 REFERENCE FAST", 
    type: "Fast", 
    speed: "Turbo", 
    desc: "نسخهٔ ساخت سریع ویدیو مرجع، خروجی ۷۲۰p", 
    hex: COLORS.purple,
    colorClass: "text-luma-purple",
    icon: Layers,
    badge: "TURBO"
  }
];

// Consistent Premium Card Architecture
// Consistent Premium Card Architecture with Light Theme Double-Bezel Pattern
const ModelCard: React.FC<{ model: typeof MODELS[0], index: number }> = ({ model, index }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="h-full font-sans"
        >
            {/* Outer Bezel (Doppelrand Parent) */}
            <div 
                ref={divRef}
                onMouseMove={handleMouseMove}
                className="group relative h-full rounded-[24px] p-2 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-default bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/40 dark:border-zinc-800/60 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)]"
            >
                {/* 1. Dynamic Hover Radial Background Border */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
                    style={{
                        background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${model.hex}40, transparent 45%)`
                    }}
                />

                {/* 2. Inner Bezel Card */}
                <div className="relative h-full bg-white dark:bg-zinc-950 rounded-[18px] overflow-hidden flex flex-col p-5 border border-zinc-100 dark:border-zinc-900 shadow-sm transition-colors duration-300">
                    
                    {/* Inner Spot Glow Effect with lower opacity for light background */}
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                        style={{
                            background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${model.hex}15, transparent 50%)`
                        }}
                    />
                    
                    {/* Bottom tint */}
                    <div 
                       className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                       style={{ background: `linear-gradient(to top, ${model.hex}15, transparent)` }}
                    />

                    {/* Noise Texture */}
                    <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />

                    {/* Content Layer */}
                    <div className="relative z-10 flex flex-col h-full">
                        
                        {/* Header */}
                        <div className="flex justify-between items-start mb-5">
                            <div className={`
                                w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-350 group-hover:scale-105
                                bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/85 group-hover:bg-white group-hover:dark:bg-zinc-800 group-hover:border-zinc-200 group-hover:dark:border-zinc-700 group-hover:shadow-sm
                                ${model.colorClass}
                            `}>
                                <model.icon size={22} />
                            </div>
                            
                            {model.badge && (
                                <span className={`
                                    px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase border transition-colors duration-300
                                    bg-zinc-50 dark:bg-zinc-900 border-zinc-200/60 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 group-hover:dark:text-zinc-200 group-hover:border-zinc-300 group-hover:dark:border-zinc-700
                                `}>
                                    {model.badge}
                                </span>
                            )}
                        </div>

                        {/* Title & Desc */}
                        <div className="mb-5">
                            <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-black group-hover:dark:text-white transition-colors">
                                {model.name}
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light line-clamp-2 group-hover:text-zinc-700 group-hover:dark:text-zinc-300 transition-colors">
                                {model.desc}
                            </p>
                        </div>

                        {/* Footer / Specs */}
                        <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between transition-colors duration-300">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors">
                                    <Clock size={10} className="text-zinc-400 dark:text-zinc-500" />
                                    <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">{model.speed}</span>
                                </div>
                                {model.type === 'Pro' && (
                                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2 py-1 rounded border border-indigo-100 dark:border-indigo-900/50 transition-colors">4K Ready</span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-all">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                                </span>
                                <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const VideoModels: React.FC = () => {
  return (
    <section className="py-24 bg-[#FBF9F6] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
        
        {/* --- Top Gradient Fade --- */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        {/* --- Bottom Gradient Fade --- */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/20 dark:bg-indigo-950/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100/15 dark:bg-rose-950/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-300" />
            <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
            
            {/* Section Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/30 backdrop-blur-md shadow-sm transition-colors duration-300"
                >
                    <Film size={14} className="text-indigo-600 dark:text-indigo-400" />
                    <span className="text-[10px] font-bold text-zinc-650 dark:text-zinc-400 uppercase tracking-widest">Generation Engine</span>
                </motion.div>

                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight"
                >
                    موتورهای <span className="text-gradient-animated">تولید ویدیو</span>
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-650 dark:text-zinc-400 text-lg font-light leading-relaxed transition-colors duration-300"
                >
                    دسترسی به قدرتمندترین مدل‌های هوش مصنوعی جهان. 
                    <br className="hidden md:block" />
                    تمامی مدل‌ها از قابلیت تبدیل متن و تصویر به ویدیو پشتیبانی می‌کنند.
                </motion.p>
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MODELS.map((model, i) => (
                    <ModelCard key={i} model={model} index={i} />
                ))}
            </div>
        </div>
    </section>
  );
};
