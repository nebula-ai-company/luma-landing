
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
        hex: "#DA8FFF", // Purple
        colorClass: "text-luma-purple"
    },
    {
        id: 'camera',
        title: "کنترل دوربین",
        desc: "قابلیت تعیین حرکت دوربین (پن، تیلت، زوم) برای خلق نماهای پویا و کارگردانی صحنه.",
        icon: Camera,
        secondaryIcon: Aperture,
        hex: "#FF6482", // Pink
        colorClass: "text-luma-pink"
    },
    {
        id: 'stability',
        title: "ثبات زمانی",
        desc: "حفظ هویت کاراکترها و اشیاء در طول ویدیو بدون تغییر شکل ناگهانی (Flickering).",
        icon: Video,
        secondaryIcon: Layers,
        hex: "#FFB340", // Yellow
        colorClass: "text-luma-yellow"
    },
    {
        id: 'fps',
        title: "نرخ فریم بالا",
        desc: "تولید ویدیوهای نرم و روان تا ۶۰ فریم بر ثانیه برای حرکات طبیعی و اسلوموشن.",
        icon: MonitorPlay,
        secondaryIcon: Clock,
        hex: "#60A5FA", // Blue
        colorClass: "text-blue-400"
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
            className="h-full"
        >
            <div 
                ref={divRef}
                onMouseMove={handleMouseMove}
                className="group relative h-full rounded-[24px] p-px overflow-hidden transition-transform duration-300 hover:-translate-y-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
            >
                {/* Dynamic Border Gradient */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
                    style={{
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${feature.hex}80, transparent 40%)`
                    }}
                />

                {/* Inner Content Container */}
                <div className="relative h-full bg-[#0c0c0e] rounded-[23px] overflow-hidden flex flex-col p-8">
                    
                    {/* Inner Glow Effect */}
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                        style={{
                            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${feature.hex}, transparent 40%)`
                        }}
                    />
                    
                    {/* Noise Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

                    {/* Content Layer */}
                    <div className="relative z-10 flex flex-col h-full">
                        
                        {/* Header: Icons */}
                        <div className="flex justify-between items-start mb-8 relative">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:border-white/10`}>
                                <feature.icon size={26} className={feature.colorClass} />
                            </div>
                            
                            {/* Secondary decorative icon (Watermark effect) */}
                            <div className="opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 absolute -top-4 -left-4 transform scale-[2.5] rotate-12 pointer-events-none text-white">
                                <feature.secondaryIcon size={48} />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="mt-auto">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-400 leading-7 font-light group-hover:text-gray-300 transition-colors">
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
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        
        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full mix-blend-screen opacity-30" />
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
