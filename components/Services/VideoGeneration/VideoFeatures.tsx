import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize, Camera, Video, MonitorPlay, Scan, Aperture, Clock, Layers } from 'lucide-react';

const FEATURES = [
    {
        id: 'quality',
        title: "کیفیت سینمایی",
        desc: "تولید ویدیو با رزولوشن 4K و جزئیات دقیق، مناسب برای نمایشگرهای بزرگ و پروژه‌های حرفه‌ای.",
        icon: Maximize,
        secondaryIcon: Scan,
        hex: "#6366F1", // Indigo
        colorClass: "text-indigo-600"
    },
    {
        id: 'camera',
        title: "کنترل دوربین",
        desc: "قابلیت تعیین حرکت دوربین (پن، تیلت، زوم) برای خلق نماهای پویا و کارگردانی صحنه.",
        icon: Camera,
        secondaryIcon: Aperture,
        hex: "#F43F5E", // Rose
        colorClass: "text-rose-500"
    },
    {
        id: 'stability',
        title: "ثبات زمانی",
        desc: "حفظ هویت کاراکترها و اشیاء در طول ویدیو بدون تغییر شکل ناگهانی (Flickering).",
        icon: Video,
        secondaryIcon: Layers,
        hex: "#BAB018", // Amber tint
        colorClass: "text-amber-500"
    },
    {
        id: 'fps',
        title: "نرخ فریم بالا",
        desc: "تولید ویدیوهای نرم و روان تا ۶۰ فریم بر ثانیه برای خلق صحنه‌های اکشن و اسلوموشن‌های بی‌نظیر.",
        icon: MonitorPlay,
        secondaryIcon: Clock,
        hex: "#10B981", // Emerald
        colorClass: "text-emerald-500"
    }
];

interface FeatureCardProps {
    feature: typeof FEATURES[0];
    index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            className="h-full font-sans"
        >
            {/* Outer Bezel (Double-Bezel Doppelrand Pattern) */}
            <div 
                ref={divRef}
                onMouseMove={handleMouseMove}
                className="group relative h-full rounded-[24px] p-2 overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-default bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/40 dark:border-zinc-800/60 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)]"
            >
                {/* Dynamic Border Gradient */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
                    style={{
                        background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${feature.hex}35, transparent 40%)`
                    }}
                />

                {/* Inner Content Container */}
                <div className="relative h-full bg-white dark:bg-zinc-950 rounded-[18px] overflow-hidden flex flex-col p-8 border border-zinc-100 dark:border-zinc-900 shadow-sm transition-colors duration-300">
                    
                    {/* Inner Glow Effect */}
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                        style={{
                            background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${feature.hex}15, transparent 40%)`
                        }}
                    />
                    
                    {/* Noise Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.012] pointer-events-none" />

                    {/* Content Layer */}
                    <div className="relative z-10 flex flex-col h-full">
                        
                        {/* Header: Icons */}
                        <div className="flex justify-between items-start mb-8 relative">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 transition-all duration-350 group-hover:scale-105 group-hover:rotate-3 shadow-sm group-hover:bg-white group-hover:dark:bg-zinc-805 group-hover:border-zinc-250 group-hover:dark:border-zinc-700">
                                <feature.icon size={22} className={feature.colorClass} strokeWidth={1.5} />
                            </div>
                            
                            {/* Secondary decorative icon (Watermark effect) */}
                            <div className="opacity-[0.05] group-hover:opacity-15 transition-opacity duration-500 absolute -top-4 -left-4 transform scale-[2.2] rotate-12 pointer-events-none text-zinc-400 dark:text-zinc-600">
                                <feature.secondaryIcon size={44} strokeWidth={1} />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="mt-auto">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-black group-hover:dark:text-white transition-colors tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-7 font-light group-hover:text-zinc-650 group-hover:dark:text-zinc-300 transition-colors">
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const VideoFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-[#FBF9F6] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
        
        {/* --- Top Gradient Fade --- */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        {/* --- Bottom Gradient Fade --- */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-100/10 dark:bg-indigo-950/5 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 transition-colors duration-300" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {FEATURES.map((feature, i) => (
                    <FeatureCard key={feature.id} feature={feature} index={i} />
                ))}
            </div>
        </div>
    </section>
  );
};
