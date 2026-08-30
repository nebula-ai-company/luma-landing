
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Zap, Crown, MonitorPlay, Clock, Sparkles, Video, Star, Layers, Type, Image as ImageIcon } from 'lucide-react';

// Unified Brand Palette Hex Codes
const COLORS = {
  purple: '#DA8FFF',
  pink: '#FF6482',
  yellow: '#FFB340',
};

export type WorkflowType = 'all' | 'text-to-video' | 'image-to-video' | 'reference-to-video';

interface ModelData {
  name: string;
  type: string;
  speed: string;
  desc: string;
  hex: string;
  colorClass: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  badgeWorkflow: string;
  workflows: ('text-to-video' | 'image-to-video' | 'reference-to-video')[];
  startingPrice?: string;
}

const MODELS: ModelData[] = [
  { 
    name: "FLUX 3", 
    type: "New", 
    speed: "Advanced", 
    desc: "مدل جدید تولید ویدیو با پشتیبانی از هر دو جریان کاری تبدیل متن و تصویر به ویدیو", 
    hex: COLORS.purple,
    colorClass: "text-luma-purple",
    icon: Sparkles,
    badge: "NEW",
    badgeWorkflow: "Text & Image",
    workflows: ['text-to-video', 'image-to-video'],
    startingPrice: "شروع از ۱۲۷۵ لوم"
  },
  { 
    name: "MINIMAX H3", 
    type: "Pro", 
    speed: "Standard", 
    desc: "مدل تبدیل تصویر به ویدیو (Image-to-Video) با همراهی صدا و تداوم زمانی بالاتر", 
    hex: COLORS.pink,
    colorClass: "text-luma-pink",
    icon: Video,
    badge: "I2V + AUDIO",
    badgeWorkflow: "Image-to-Video",
    workflows: ['image-to-video'],
    startingPrice: "شروع از ۱۲۰۰ لوم"
  },
  { 
    name: "SORA 2", 
    type: "Gen", 
    speed: "Standard", 
    desc: "مدل پیشرفته نسل جدید تولید ویدیو از دستور متنی و تصویری", 
    hex: COLORS.purple,
    colorClass: "text-luma-purple",
    icon: Film,
    badgeWorkflow: "Text & Image",
    workflows: ['text-to-video', 'image-to-video']
  },
  { 
    name: "SORA 2 PRO", 
    type: "Pro", 
    speed: "High", 
    desc: "نسخه با وضوح و دقت بالاتر برای رندرهای باکیفیت و کنترل صحنه", 
    hex: COLORS.purple,
    colorClass: "text-luma-purple",
    icon: Crown,
    badge: "PRO",
    badgeWorkflow: "Text & Image",
    workflows: ['text-to-video', 'image-to-video']
  },
  { 
    name: "WAN 2.2 TURBO", 
    type: "Fast", 
    speed: "Turbo", 
    desc: "مدل بهینه‌شده با سرعت پردازش بالا برای پیش‌نمایش و تولید سریع", 
    hex: COLORS.yellow,
    colorClass: "text-luma-yellow",
    icon: Zap,
    badge: "TURBO",
    badgeWorkflow: "Text & Image",
    workflows: ['text-to-video', 'image-to-video']
  },
  { 
    name: "WAN 2.5", 
    type: "Gen", 
    speed: "Standard", 
    desc: "مدل پایدار و متوازن در تولید ویدیوی روان از متن و تصویر", 
    hex: COLORS.pink,
    colorClass: "text-luma-pink",
    icon: Video,
    badgeWorkflow: "Text & Image",
    workflows: ['text-to-video', 'image-to-video']
  },
  { 
    name: "KLING 2.5 TURBO", 
    type: "Fast", 
    speed: "Turbo", 
    desc: "مدل سریع پردازش ویدیو با پاسخ‌دهی بالا از ورودی متنی و تصویر", 
    hex: COLORS.yellow,
    colorClass: "text-luma-yellow",
    icon: Zap,
    badge: "TURBO",
    badgeWorkflow: "Text & Image",
    workflows: ['text-to-video', 'image-to-video']
  },
  { 
    name: "KLING 2.6 PRO", 
    type: "Pro", 
    speed: "High", 
    desc: "مدل قدرتمند با کنترل دقیق بر حرکات دوربین و تداوم فرم سوژه", 
    hex: COLORS.pink,
    colorClass: "text-luma-pink",
    icon: Star,
    badge: "PRO",
    badgeWorkflow: "Text & Image",
    workflows: ['text-to-video', 'image-to-video']
  },
  { 
    name: "LTX 2 FAST", 
    type: "Light", 
    speed: "Fast", 
    desc: "مدل فوق‌سریع برای رندرهای کوتاه‌مدت و جریان‌های کاری فوری", 
    hex: COLORS.yellow,
    colorClass: "text-luma-yellow",
    icon: MonitorPlay,
    badge: "FAST",
    badgeWorkflow: "Text & Image",
    workflows: ['text-to-video', 'image-to-video']
  },
  { 
    name: "VEO 3 FAST", 
    type: "Light", 
    speed: "Fast", 
    desc: "مدل سریع پردازش ویدیو سازگار با انواع نسبت‌های ابعادی", 
    hex: COLORS.purple,
    colorClass: "text-luma-purple",
    icon: Film,
    badge: "FAST",
    badgeWorkflow: "Text & Image",
    workflows: ['text-to-video', 'image-to-video']
  },
  { 
    name: "VEO 3.1 FAST", 
    type: "Light", 
    speed: "Fast", 
    desc: "نسخه ارتقایافته سری Veo با هماهنگی حرکتی و پایداری در فریم‌ها", 
    hex: COLORS.pink,
    colorClass: "text-luma-pink",
    icon: Video,
    badge: "FAST",
    badgeWorkflow: "Text & Image",
    workflows: ['text-to-video', 'image-to-video']
  },
  { 
    name: "HAILUO 2.3", 
    type: "Gen", 
    speed: "Standard", 
    desc: "مدل خلاقانه برای تولید ویدیوهای بصری و مفهومی از تصویر و متن", 
    hex: COLORS.purple,
    colorClass: "text-luma-purple",
    icon: Sparkles,
    badgeWorkflow: "Text & Image",
    workflows: ['text-to-video', 'image-to-video']
  },
  { 
    name: "SEEDANCE V1", 
    type: "Anim", 
    speed: "Fast", 
    desc: "مدل اختصاصی متحرک‌سازی و ساخت نماهای پویا از ورودی کاربر", 
    hex: COLORS.pink,
    colorClass: "text-luma-pink",
    icon: MonitorPlay,
    badgeWorkflow: "Text & Image",
    workflows: ['text-to-video', 'image-to-video']
  },
  { 
    name: "SEEDANCE 2.0 REFERENCE", 
    type: "Pro", 
    speed: "High", 
    desc: "موتور تولید چند‌مرجع (تصویر، ویدیو، صدا) با خروجی ویدیویی همراه با صدا", 
    hex: COLORS.yellow,
    colorClass: "text-luma-yellow",
    icon: Layers,
    badge: "REFERENCE",
    badgeWorkflow: "Ref-to-Video",
    workflows: ['reference-to-video']
  },
  { 
    name: "SEEDANCE 2.0 REFERENCE FAST", 
    type: "Fast", 
    speed: "Turbo", 
    desc: "نسخه بهینه‌سازی‌شده برای تولید سریع ویدیو بر اساس مراجع ورودی", 
    hex: COLORS.purple,
    colorClass: "text-luma-purple",
    icon: Layers,
    badge: "REF FAST",
    badgeWorkflow: "Ref-to-Video",
    workflows: ['reference-to-video']
  }
];

// Consistent Premium Card Architecture with Light Theme Double-Bezel Pattern
const ModelCard: React.FC<{ model: ModelData, index: number }> = ({ model, index }) => {
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
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
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
                    
                    {/* Inner Spot Glow Effect */}
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
                        <div className="flex justify-between items-start mb-4">
                            <div className={`
                                w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-350 group-hover:scale-105
                                bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/85 group-hover:bg-white group-hover:dark:bg-zinc-800 group-hover:border-zinc-200 group-hover:dark:border-zinc-700 group-hover:shadow-sm
                                ${model.colorClass}
                            `}>
                                <model.icon size={22} />
                            </div>
                            
                            <div className="flex items-center gap-1.5 flex-wrap justify-end">
                                {model.badge && (
                                    <span className={`
                                        px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase border transition-colors duration-300
                                        bg-zinc-50 dark:bg-zinc-900 border-zinc-200/60 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 group-hover:dark:text-zinc-100 group-hover:border-zinc-300 group-hover:dark:border-zinc-700
                                    `}>
                                        {model.badge}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Title & Desc */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                                <h4 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-black group-hover:dark:text-white transition-colors">
                                    {model.name}
                                </h4>
                                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                    {model.badgeWorkflow}
                                </span>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light line-clamp-2 group-hover:text-zinc-700 group-hover:dark:text-zinc-300 transition-colors">
                                {model.desc}
                            </p>
                        </div>

                        {/* Footer / Specs */}
                        <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between transition-colors duration-300">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors">
                                    <Clock size={10} className="text-zinc-400 dark:text-zinc-500" />
                                    <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">{model.speed}</span>
                                </div>
                                {model.startingPrice && (
                                    <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/70 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700/60 transition-colors">
                                        {model.startingPrice}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-all">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">فعال</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const VideoModels: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WorkflowType>('all');

  const filteredModels = MODELS.filter(model => {
    if (activeTab === 'all') return true;
    return model.workflows.includes(activeTab);
  });

  return (
    <section className="py-24 bg-[#FBF9F6] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
        
        {/* --- Top Gradient Fade --- */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        {/* --- Bottom Gradient Fade --- */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100/20 dark:bg-purple-950/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100/15 dark:bg-rose-950/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-300" />
            <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
            
            {/* Section Header */}
            <div className="text-center mb-12 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 backdrop-blur-md shadow-sm transition-colors duration-300"
                >
                    <Film size={14} className="text-luma-purple" />
                    <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">Generation Engines</span>
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
                    دسترسی به برترین مدل‌های هوش مصنوعی جهان در سه جریان کاری تبدیل متن به ویدیو، تصویر به ویدیو و تولید از روی مراجع چندگانه.
                </motion.p>

                {/* Workflow Selector Tabs */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center gap-2 mt-8"
                >
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeTab === 'all'
                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                                : 'bg-white/80 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800 hover:text-zinc-900 hover:dark:text-white'
                        }`}
                    >
                        <Film size={14} />
                        <span>همه مدل‌ها ({MODELS.length})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('text-to-video')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeTab === 'text-to-video'
                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                                : 'bg-white/80 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800 hover:text-zinc-900 hover:dark:text-white'
                        }`}
                    >
                        <Type size={14} className="text-luma-purple" />
                        <span>متن به ویدیو (Text-to-Video)</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('image-to-video')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeTab === 'image-to-video'
                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                                : 'bg-white/80 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800 hover:text-zinc-900 hover:dark:text-white'
                        }`}
                    >
                        <ImageIcon size={14} className="text-luma-pink" />
                        <span>تصویر به ویدیو (Image-to-Video)</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('reference-to-video')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeTab === 'reference-to-video'
                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                                : 'bg-white/80 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800 hover:text-zinc-900 hover:dark:text-white'
                        }`}
                    >
                        <Layers size={14} className="text-luma-yellow" />
                        <span>ویدیو از روی مرجع (Reference)</span>
                    </button>
                </motion.div>
            </div>

            {/* Models Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                    {filteredModels.map((model, i) => (
                        <ModelCard key={model.name} model={model} index={i} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Pricing note */}
            <div className="mt-12 text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
                    مقادیر اعتباری ذکر شده به عنوان حداقل شروع رندر بوده و بسته به تنظیمات و مدت انتخابی محاسبه می‌شوند. جزئیات دقیق در استودیو و <a href="/pricing" className="text-luma-purple underline underline-offset-4 hover:opacity-80">صفحه تعرفه‌ها</a> در دسترس است.
                </p>
            </div>
        </div>
    </section>
  );
};
