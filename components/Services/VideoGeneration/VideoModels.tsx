
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Film, Image as ImageIcon, Zap, Crown, MonitorPlay, Clock, Sparkles, Video, Star } from 'lucide-react';

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
  }
];

// Consistent Premium Card Architecture
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
            className="h-full"
        >
            <div 
                ref={divRef}
                onMouseMove={handleMouseMove}
                className="group relative h-full rounded-[24px] p-px overflow-hidden transition-transform duration-300 hover:-translate-y-1 cursor-default"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
            >
                {/* 1. Dynamic Border Gradient */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
                    style={{
                        background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${model.hex}60, transparent 40%)`
                    }}
                />

                {/* 2. Inner Content Container */}
                <div className="relative h-full bg-[#0c0c0e] rounded-[23px] overflow-hidden flex flex-col p-6">
                    
                    {/* Inner Glow Effect */}
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                        style={{
                            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${model.hex}, transparent 40%)`
                        }}
                    />
                    
                    {/* Bottom Tint */}
                    <div 
                       className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                       style={{ background: `linear-gradient(to top, ${model.hex}, transparent)` }}
                    />

                    {/* Noise Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

                    {/* Content Layer */}
                    <div className="relative z-10 flex flex-col h-full">
                        
                        {/* Header */}
                        <div className="flex justify-between items-start mb-5">
                            <div className={`
                                w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110
                                bg-white/5 border border-white/5
                                ${model.colorClass}
                            `}>
                                <model.icon size={24} />
                            </div>
                            
                            {model.badge && (
                                <span className={`
                                    px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase border
                                    bg-white/5 border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/20 transition-colors
                                `}>
                                    {model.badge}
                                </span>
                            )}
                        </div>

                        {/* Title & Desc */}
                        <div className="mb-6">
                            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition-colors">
                                {model.name}
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-2 group-hover:text-gray-300 transition-colors">
                                {model.desc}
                            </p>
                        </div>

                        {/* Footer / Specs */}
                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5">
                                    <Clock size={10} className="text-gray-500" />
                                    <span className="text-[10px] font-mono text-gray-400">{model.speed}</span>
                                </div>
                                {model.type === 'Pro' && (
                                    <span className="text-[10px] font-bold text-luma-purple bg-luma-purple/10 px-2 py-1 rounded border border-luma-purple/20">4K Ready</span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luma-yellow opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luma-yellow"></span>
                                </span>
                                <span className="text-[9px] font-bold text-white uppercase tracking-wider">Ready</span>
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
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        
        {/* --- Top Gradient Fade --- */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* --- Bottom Gradient Fade --- */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luma-purple/5 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/5 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
            
            {/* Section Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
                >
                    <Film size={14} className="text-luma-purple" />
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Generation Engine</span>
                </motion.div>

                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight"
                >
                    موتورهای <span className="text-gradient-animated">تولید ویدیو</span>
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-lg font-light leading-relaxed"
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
