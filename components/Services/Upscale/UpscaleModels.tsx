import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Diamond, Zap, Sliders, Target, Maximize, Crown, Sparkles, Layers } from 'lucide-react';

// --- Unified Data Configuration ---
const MODELS = [
  {
    id: 'nano-pro',
    name: 'Nano Banana Pro',
    tag: 'سریع و منعطف',
    desc: 'این مدل ساختاری متفاوت دارد. به جای انتخاب ضریب بزرگ‌نمایی، به شما اجازه می‌دهد رزولوشن نهایی (1K, 2K, 4K) و نسبت تصویر را مستقیماً انتخاب کنید.',
    features: ['کنترل دقیق رزولوشن', 'تغییر نسبت تصویر', 'محاسبه خودکار هزینه'],
    color: 'text-luma-yellow',
    hex: '#FFB340',
    icon: Zap
  },
  {
    id: 'topaz',
    name: 'Topaz Labs Upscaler',
    tag: 'استاندارد صنعتی',
    desc: 'بهترین گزینه برای کارهای چاپی حساس و بازسازی عکس‌های بسیار قدیمی. استاندارد طلایی صنعت عکاسی.',
    features: ['حفظ بافت طبیعی', 'حذف نویز حرفه‌ای', 'مناسب چاپ لارج فرمت'],
    color: 'text-luma-purple',
    hex: '#DA8FFF',
    icon: Layers
  },
  {
    id: 'crystal',
    name: 'ClarityAI Crystal',
    tag: 'حرفه‌ای‌ترین گزینه',
    desc: 'شفافیت کریستالی. جزئیات را با وفاداری کامل به عکس اصلی بازسازی می‌کند (بدون تغییر چهره یا بافت).',
    features: ['عدم تغییر چهره', 'شارپنس فوق‌العاده', 'مناسب پرتره'],
    color: 'text-luma-yellow',
    hex: '#FFB340',
    icon: Diamond
  },
  {
    id: 'creative',
    name: 'Clarity AI Creative',
    tag: 'خلاقانه',
    desc: 'اگر عکس اصلی جزئیات کمی دارد، این مدل با هوش مصنوعی جزئیات جدیدی خلق می‌کند تا عکس زیباتر شود.',
    features: ['افزودن جزئیات جدید', 'مناسب نقاشی دیجیتال', 'مناسب کانسپت آرت'],
    color: 'text-luma-pink',
    hex: '#FF6482',
    icon: Sparkles
  },
  {
    id: 'bria',
    name: 'Bria Resolution',
    tag: 'میان‌رده',
    desc: 'یک گزینه متعادل و سریع برای استفاده‌های عمومی وب و شبکه‌های اجتماعی.',
    features: ['سرعت پردازش بالا', 'مناسب استفاده روزمره', 'کیفیت استاندارد وب'],
    color: 'text-zinc-600 dark:text-white',
    hex: '#8E8E93',
    icon: Zap
  },
  {
    id: 'nomos',
    name: 'Nomos Upscaler 4K',
    tag: 'اقتصادی',
    desc: 'سریع‌ترین گزینه. مناسب برای شفاف‌سازی فوری تصاویری که کیفیتشان خیلی پایین نیست.',
    features: ['فوق سریع', 'پردازش انبوه', 'حجم خروجی بهینه'],
    color: 'text-zinc-500 dark:text-gray-400',
    hex: '#9CA3AF',
    icon: Sliders
  }
];

// Resolves theme safe readable colors depending on model ID
const getIconColorClass = (id: string) => {
  switch (id) {
    case 'nano-pro': return 'text-[#D97706] dark:text-luma-yellow';
    case 'topaz': return 'text-[#9333EA] dark:text-luma-purple';
    case 'crystal': return 'text-[#D97706] dark:text-luma-yellow';
    case 'creative': return 'text-[#E11D48] dark:text-luma-pink';
    case 'bria': return 'text-zinc-800 dark:text-zinc-100';
    case 'nomos': return 'text-zinc-500 dark:text-gray-400';
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
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        
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
                            borderColor: model.id === 'nomos' || model.id === 'bria' ? 'rgba(128,128,128,0.2)' : `${model.hex}30`, 
                            backgroundColor: model.id === 'nomos' || model.id === 'bria' ? 'rgba(128,128,128,0.05)' : `${model.hex}10` 
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
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: model.id === 'nomos' || model.id === 'bria' ? '#8E8E93' : model.hex }} />
                            {f}
                         </div>
                      ))}
                   </div>
                </PremiumCard>
             ))}
          </div>

       </div>
    </section>
  );
};
