import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, Laptop, FileText, Megaphone, ArrowRight } from 'lucide-react';

const Motion = motion as any;

interface UseCaseData {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  nodes: string[];
  color: string;
  duration: number; // custom timing for desynchronization
}

const USE_CASES: UseCaseData[] = [
  {
    id: 1,
    title: 'خط تولید محتوای تصویری',
    description: 'از یک موضوع اولیه به متن و تصویر آماده انتشار برسید.',
    icon: Image,
    nodes: ['ایده', 'تولید متن', 'ساخت تصویر', 'افزایش کیفیت'],
    color: '#DA8FFF', // Luma Purple
    duration: 4.5
  },
  {
    id: 2,
    title: 'آماده‌سازی تصویر محصول',
    description: 'فرآیند آماده‌سازی تصاویر فروشگاهی را در یک Workflow قرار دهید.',
    icon: Laptop,
    nodes: ['تصویر اولیه', 'حذف پس‌زمینه', 'ساخت صحنه', 'خروجی نهایی'],
    color: '#FF6482', // Luma Pink
    duration: 5.8
  },
  {
    id: 3,
    title: 'پژوهش و گزارش',
    description: 'اطلاعات خام را به یک خروجی ساختاریافته و قابل استفاده تبدیل کنید.',
    icon: FileText,
    nodes: ['ورودی', 'تحلیل', 'خلاصه‌سازی', 'گزارش'],
    color: '#FFB340', // Luma Yellow
    duration: 6.5
  },
  {
    id: 4,
    title: 'ساخت کمپین خلاق',
    description: 'مراحل اصلی تولید یک کمپین را در یک جریان هوشمند به هم متصل کنید.',
    icon: Megaphone,
    nodes: ['Brief', 'ایده‌پردازی', 'متن تبلیغاتی', 'تصویر کمپین'],
    color: '#DA8FFF', // Luma Purple
    duration: 5.0
  }
];

// Individual Animated Mini Graph inside each card
const MiniGraph: React.FC<{ nodes: string[]; color: string; duration: number }> = ({ nodes, color, duration }) => {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    // Cycle active node from 0 to 3
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, (duration * 1000) / nodes.length);

    return () => clearInterval(interval);
  }, [nodes.length, duration]);

  return (
    <div className="w-full bg-zinc-50/50 dark:bg-black/40 rounded-xl p-4 border border-zinc-200/40 dark:border-white/5 relative overflow-hidden" dir="ltr">
      
      {/* Connector Line */}
      <div className="absolute top-[26px] left-8 right-8 h-[1px] bg-zinc-200 dark:bg-white/5 z-0" />

      {/* Mini Nodes sequence */}
      <div className="flex justify-between items-center relative z-10">
        {nodes.map((node, i) => {
          const isNodeActive = activeNode === i;
          return (
            <div key={node} className="flex flex-col items-center flex-1">
              {/* Circle */}
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center border text-[9px] font-mono transition-all duration-300 ${
                  isNodeActive
                    ? 'bg-white dark:bg-zinc-950 scale-110 shadow-md font-extrabold'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 border-zinc-200 dark:border-white/5'
                }`}
                style={{
                  borderColor: isNodeActive ? color : undefined,
                  color: isNodeActive ? color : undefined,
                  boxShadow: isNodeActive ? `0 0 10px ${color}33` : undefined
                }}
              >
                {i + 1}
              </div>
              
              {/* Label */}
              <span 
                className={`text-[9px] mt-1.5 font-bold transition-colors duration-300 text-center truncate w-full px-1 ${
                  isNodeActive ? 'text-zinc-950 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'
                }`}
                dir="rtl"
              >
                {node}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const WorkflowUseCases: React.FC = () => {
  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative grids */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-luma-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-luma-yellow/10 border border-luma-yellow/20 text-xs font-black text-luma-yellow uppercase tracking-wider mb-4"
          >
            <span>کیس‌های فرآیندی</span>
          </Motion.div>

          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white leading-tight mb-4"
          >
            یک ابزار، ده‌ها سناریو
          </Motion.h2>

          <Motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            ابزارهای لوما را متناسب با فرآیند خود کنار هم قرار دهید و Workflow اختصاصی خود را بسازید.
          </Motion.p>
        </div>

        {/* Use-cases 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {USE_CASES.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                className="p-8 rounded-3xl bg-white dark:bg-[#0c0c0c] border border-zinc-200/60 dark:border-white/5 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300 shadow-sm relative group"
              >
                {/* Header info */}
                <div className="flex items-start gap-4 mb-6 text-right">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 transition-colors duration-300"
                    style={{ 
                      backgroundColor: `${useCase.color}10`,
                      borderColor: `${useCase.color}25`,
                      color: useCase.color
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans group-hover:text-zinc-900 group-hover:dark:text-luma-purple transition-colors">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-gray-400 font-light leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>

                {/* Micro Animated Flow */}
                <MiniGraph nodes={useCase.nodes} color={useCase.color} duration={useCase.duration} />

              </Motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
