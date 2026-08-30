import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Diamond, Zap, Sliders, Sparkles, Layers } from 'lucide-react';

// --- Unified Data Configuration ---
const MODELS = [
  {
    id: 'topaz-precision',
    name: 'Topaz Precision',
    tag: 'افزایش مقیاس وفادار',
    desc: 'افزایش مقیاس با بیشترین وفاداری به ساختار و جزئیات اصلی تصویر، با کمترین تغییر در محتوا.',
    features: ['حفظ ساختار اصلی تصویر', 'افزایش مقیاس وفادارانه', 'مناسب تصاویر باکیفیت و ادیتوریال'],
    color: 'text-luma-purple',
    hex: '#DA8FFF',
    icon: Layers
  },
  {
    id: 'crystal',
    name: 'ClarityAI Crystal Upscaler',
    tag: 'افزایش مقیاس تا 10x',
    desc: 'افزایش مقیاس تصویر تا ۱۰ برابر با بازسازی شفاف جزئیات و بافت‌ها در انواع سبک‌های تصویری.',
    features: ['بزرگ‌نمایی تا ۱۰ برابر', 'شفافیت و بازیابی جزئیات', 'حفظ بافت طبیعی تصویر'],
    color: 'text-luma-yellow',
    hex: '#FFB340',
    icon: Diamond
  },
  {
    id: 'topaz-restore',
    name: 'Topaz Restore',
    tag: 'بازسازی و ترمیم',
    desc: 'ترمیم و بازسازی عکس‌های قدیمی و آسیب‌دیده با بازیابی بافت‌های تحلیل‌رفته و کاهش آسیب‌ها.',
    features: ['ترمیم عکس‌های قدیمی', 'بازیابی بافت‌های آسیب‌دیده', 'بهبود یکنواختی و وضوح'],
    color: 'text-luma-pink',
    hex: '#FF6482',
    icon: Sparkles
  },
  {
    id: 'topaz-generative',
    name: 'Topaz Generative',
    tag: 'بازسازی مولد',
    desc: 'بازسازی و ارتقای هوشمندانه جزئیات تصویر بر پایه مدل‌های پیشرفته هوش مصنوعی مولد.',
    features: ['بازسازی مولد جزئیات', 'ارتقای تصاویر کم‌کیفیت', 'خلق بافت‌های طبیعی تکمیلی'],
    color: 'text-luma-purple',
    hex: '#DA8FFF',
    icon: Zap
  },
  {
    id: 'seedvr2',
    name: 'SeedVR2 Upscaler',
    tag: 'ارتقا و بازیابی تا 10x',
    desc: 'افزایش مقیاس تا ۱۰ برابر با بازیابی عمیق بافت و جزئیات ظریف در تصاویر مختلف.',
    features: ['بزرگ‌نمایی تا ۱۰ برابر', 'بازیابی عمیق جزئیات', 'عملکرد عالی روی جزئیات ریز'],
    color: 'text-luma-yellow',
    hex: '#FFB340',
    icon: Sliders
  },
  {
    id: 'nano-pro',
    name: 'Nano Banana Pro',
    tag: 'بازسازی با وضوح بالا',
    desc: 'امکان تعیین دقیق رزولوشن نهایی (1K, 2K, 4K) و نسبت تصویر در کنار بازسازی با وضوح بالا.',
    features: ['کنترل دقیق رزولوشن نهایی', 'تغییر نسبت تصویر', 'بازسازی با وضوح بالا'],
    color: 'text-luma-pink',
    hex: '#FF6482',
    icon: Zap
  }
];

// Additional specialized documented engines
const SPECIALIZED_ENGINES = [
  { name: 'Topaz Denoise', role: 'حذف نویز بدون تغییر ابعاد تصویر', tag: 'Denoise' },
  { name: 'Topaz Sharpen', role: 'افزایش وضوح و شارپنس بدون تغییر سایز', tag: 'Sharpen' },
  { name: 'Topaz Creative', role: 'افزایش مقیاس خلاقانه و تولید جزئیات تکمیلی', tag: 'Creative' },
  { name: 'Topaz Transparent', role: 'ارتقا و بهبود تصاویر دوربری‌شده و PNG شفاف', tag: 'Transparent' },
  { name: 'Ideogram Upscaler', role: 'حفظ خطوط، متن‌ها و تایپوگرافی در تصویر', tag: 'Typography' },
  { name: 'Recraft Crisp Upscaler', role: 'ارتقای گرافیک، وکتور و خطوط برداری تیز', tag: 'Crisp' }
];

// Resolves theme safe readable colors depending on model ID
const getIconColorClass = (id: string) => {
  switch (id) {
    case 'topaz-precision': return 'text-[#9333EA] dark:text-luma-purple';
    case 'crystal': return 'text-[#D97706] dark:text-luma-yellow';
    case 'topaz-restore': return 'text-[#E11D48] dark:text-luma-pink';
    case 'topaz-generative': return 'text-[#9333EA] dark:text-luma-purple';
    case 'seedvr2': return 'text-[#D97706] dark:text-luma-yellow';
    case 'nano-pro': return 'text-[#E11D48] dark:text-luma-pink';
    default: return 'text-zinc-900 dark:text-white';
  }
};

// --- Reusable Premium Card Component ---
interface PremiumCardProps {
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  glowColor?: string;
  delay?: number;
  onClick?: () => void;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ 
  children, 
  className = "",
  contentClassName = "p-6 md:p-8",
  glowColor = "#ffffff",
  delay = 0,
  onClick
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`relative group rounded-[24px] p-px overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-zinc-200/80 dark:border-white/5 bg-zinc-200/20 dark:bg-white/5 shadow-sm dark:shadow-none ${className}`}
    >
      {/* Dynamic Border Gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
        style={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${glowColor}40, transparent 40%)`
        }}
      />

      {/* Inner Content Background */}
      <div className="relative h-full bg-white dark:bg-[#0c0c0e] rounded-[23px] overflow-hidden flex flex-col transition-colors duration-300">
        
        {/* Subtle Bottom Tint */}
        <div 
           className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-10 transition-opacity duration-500"
           style={{ background: `linear-gradient(to top, ${glowColor}, transparent)` }}
        />

        {/* Cursor Glow (Inner) */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.015] dark:group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`
          }}
        />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        
        <div className={`relative z-10 flex flex-col h-full ${contentClassName}`}>
            {children}
        </div>
      </div>
    </motion.div>
  );
};

export const UpscaleModels: React.FC = () => {
  return (
    <section id="upscale-models" className="py-24 bg-[#FAFAFA] dark:bg-[#0a0a0a] transition-colors duration-300 relative overflow-hidden">
       
       {/* Background Fades */}
       <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />
       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

       <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6"
             >
                موتورهای <span className="text-gradient-animated">پردازش تصویر</span>
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-zinc-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-light"
             >
                بسته به نیاز خود (چاپ، وب، بازیابی خاطرات)، هوشمندترین مدل را انتخاب کنید.
             </motion.p>
          </div>

          {/* Unified Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             
             {MODELS.map((model, idx) => (
                <PremiumCard 
                   key={model.id} 
                   glowColor={model.hex} 
                   delay={idx * 0.1}
                   className="group cursor-pointer col-span-1"
                >
                   {/* Header */}
                   <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5 ${getIconColorClass(model.id)} group-hover:scale-110 transition-transform duration-300`}>
                         <model.icon size={24} />
                      </div>
                      <span 
                         className={`text-[10px] font-bold px-3 py-1 rounded-full border tracking-wide ${getIconColorClass(model.id)}`}
                         style={{ 
                            borderColor: `${model.hex}30`, 
                            backgroundColor: `${model.hex}10` 
                         }}
                      >
                         {model.tag}
                      </span>
                   </div>

                   {/* Title & Desc */}
                   <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-[#D97706] dark:group-hover:text-luma-yellow transition-colors">
                      {model.name}
                   </h3>
                   <p className="text-sm text-zinc-650 dark:text-gray-400 leading-7 font-light mb-8 line-clamp-3">
                      {model.desc}
                   </p>
                   
                   {/* Features List */}
                   <div className="mt-auto space-y-3 pt-6 border-t border-zinc-100 dark:border-white/5">
                      {model.features.map((f, i) => (
                         <div key={i} className="flex items-center gap-3 text-xs text-zinc-600 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: model.hex }} />
                            {f}
                         </div>
                      ))}
                   </div>
                </PremiumCard>
             ))}
          </div>

          {/* Specialized Complementary Engines */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 md:p-8 rounded-3xl border border-zinc-200/80 dark:border-white/5 bg-white/60 dark:bg-[#0c0c0e]/60 backdrop-blur-sm"
          >
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-200/60 dark:border-white/5">
                <div>
                   <h3 className="text-lg font-bold text-zinc-900 dark:text-white">سایر موتورهای تخصصی پردازش</h3>
                   <p className="text-xs text-zinc-600 dark:text-gray-400 mt-1">ابزارهای مکمل برای اصلاح نویز، وضوح، وکتور و شفاف‌سازی تصاویر بدون تغییر سایز یا با نیازهای خاص</p>
                </div>
                <span className="text-[11px] font-mono font-medium px-3 py-1 rounded-full bg-luma-purple/10 text-luma-purple border border-luma-purple/20 shrink-0">
                   موتورهای مکمل فعال
                </span>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SPECIALIZED_ENGINES.map((engine, i) => (
                   <div 
                     key={i} 
                     className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-white/10 transition-colors"
                   >
                      <div className="flex items-center justify-between gap-2 mb-2">
                         <span className="text-sm font-bold text-zinc-800 dark:text-gray-200">{engine.name}</span>
                         <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-white/5 text-zinc-600 dark:text-gray-400 border border-black/5 dark:border-white/5">
                            {engine.tag}
                         </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                         {engine.role}
                      </p>
                   </div>
                ))}
             </div>
          </motion.div>

       </div>
    </section>
  );
};
