import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, Laptop, FileText, Megaphone } from 'lucide-react';
import { WorkflowCard } from './WorkflowCard';
import { WorkflowSectionBackground } from './WorkflowSectionBackground';

const Motion = motion as any;

interface UseCaseData {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  nodes: string[];
  persianNums: string[];
  color: string;
  duration: number;
}

const USE_CASES: UseCaseData[] = [
  {
    id: 1,
    title: 'خط تولید محتوای تصویری',
    description: 'از یک موضوع اولیه به متن و تصویر آماده انتشار برسید.',
    icon: Image,
    nodes: ['ایده اصلی', 'تولید متن', 'ساخت تصویر', 'اصلاح نهایی'],
    persianNums: ['۱', '۲', '۳', '۴'],
    color: '#DA8FFF', 
    duration: 5
  },
  {
    id: 2,
    title: 'آماده‌سازی تصویر محصول',
    description: 'فرآیند آماده‌سازی تصاویر فروشگاهی را در یک Workflow خودکار قرار دهید.',
    icon: Laptop,
    nodes: ['تصویر خام', 'حذف پس‌زمینه', 'جلوه ویژه', 'خروجی تجاری'],
    persianNums: ['۱', '۲', '۳', '۴'],
    color: '#FF6482', 
    duration: 5.5
  },
  {
    id: 3,
    title: 'پژوهش و گزارش‌نویسی',
    description: 'اطلاعات خام را به یک گزارش ساختاریافته و قابل استفاده تبدیل کنید.',
    icon: FileText,
    nodes: ['ورودی خام', 'تحلیل متن', 'خلاصه‌سازی', 'سند نهایی'],
    persianNums: ['۱', '۲', '۳', '۴'],
    color: '#FFC964', 
    duration: 6
  },
  {
    id: 4,
    title: 'ساخت کمپین‌های تبلیغاتی',
    description: 'مراحل اصلی تولید یک کمپین را در یک جریان هوشمند به هم متصل کنید.',
    icon: Megaphone,
    nodes: ['اهداف', 'ایده‌پردازی', 'متن سناریو', 'تولید پوستر'],
    persianNums: ['۱', '۲', '۳', '۴'],
    color: '#DA8FFF', 
    duration: 4.5
  }
];

// Rebuilt Mini Canvas Graph with 100% exact math coordinate alignment
const MiniGraph: React.FC<{ nodes: string[]; persianNums: string[]; color: string; duration: number }> = ({ nodes, persianNums, color, duration }) => {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, (duration * 1000) / nodes.length);

    return () => clearInterval(interval);
  }, [nodes.length, duration]);

  // For 4 nodes, column centers are exactly: 12.5%, 37.5%, 62.5%, 87.5%
  const centers = [12.5, 37.5, 62.5, 87.5];

  return (
    <div className="w-full bg-zinc-50/50 dark:bg-black/30 rounded-2xl p-5 border border-zinc-200/50 dark:border-white/5 relative overflow-hidden" dir="ltr">
      
      {/* Connector Line - Starts exactly at 12.5% center and ends at 87.5% center */}
      <div className="absolute top-[30px] left-[12.5%] right-[12.5%] h-[2px] bg-zinc-200 dark:bg-zinc-800 z-0">
        <div 
          className="h-full bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow transition-all duration-300 relative"
          style={{ 
            width: `${(activeNode / (nodes.length - 1)) * 100}%`,
          }}
        >
          {activeNode < nodes.length - 1 && (
            <Motion.div
              animate={{ left: ['0%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#DA8FFF]"
            />
          )}
        </div>
      </div>

      {/* Nodes Sequence */}
      <div className="flex justify-between items-center relative z-10 w-full">
        {nodes.map((node, i) => {
          const isNodeActive = activeNode === i;
          return (
            <div key={node} className="flex flex-col items-center w-1/4">
              
              {/* node circle - center of columns */}
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold transition-all duration-500 bg-white dark:bg-[#0a0a0a] ${
                  isNodeActive
                    ? 'border-luma-purple shadow-[0_0_12px_rgba(218,143,255,0.25)] scale-110'
                    : 'border-zinc-200 dark:border-white/10 opacity-50'
                }`}
                style={{
                  borderColor: isNodeActive ? color : undefined,
                  color: isNodeActive ? color : undefined,
                }}
              >
                <span className="font-sans">{persianNums[i]}</span>
              </div>
              
              {/* label in Persian */}
              <span 
                className={`text-[10px] mt-2.5 font-bold transition-colors duration-300 text-center truncate w-full px-1 ${
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
      
      {/* Section Background grids & details */}
      <WorkflowSectionBackground variant="use-cases" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luma-yellow/10 border border-luma-yellow/20 text-xs font-black text-luma-yellow uppercase tracking-wider mb-4"
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
            ابزارهای لوما و مدل‌های پیشرفته هوش مصنوعی را متناسب با نیاز کسب‌وکار خود کنار هم بگذارید و جریان کار خودکار بسازید.
          </Motion.p>
        </div>

        {/* Use-cases 2x2 Grid occupying full 2xl width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {USE_CASES.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <WorkflowCard
                key={useCase.id}
                accentColor={useCase.color}
                className="p-8 flex flex-col justify-between h-full"
                index={index}
              >
                {/* Header info */}
                <div className="flex items-start gap-4 mb-8 text-right" dir="rtl">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 bg-white dark:bg-[#0a0a0a] shadow-sm"
                    style={{ 
                      borderColor: `${useCase.color}40`,
                      color: useCase.color
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-gray-400 font-light leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>

                {/* Micro Animated Flow Canvas */}
                <MiniGraph 
                  nodes={useCase.nodes} 
                  persianNums={useCase.persianNums} 
                  color={useCase.color} 
                  duration={useCase.duration} 
                />

              </WorkflowCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
