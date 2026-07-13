import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Image, Laptop, FileText, Megaphone } from 'lucide-react';
import { WorkflowCard } from './WorkflowCard';
import { WorkflowSectionBackground } from './WorkflowSectionBackground';
import { useIsVisible, useVisibleInterval } from './useVisibleLoop';
import { useTheme } from '../../../lib/ThemeContext';

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

const MiniGraph: React.FC<{ nodes: string[]; persianNums: string[]; color: string; duration: number }> = ({ nodes, persianNums, color, duration }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, 0.05);
  const { theme } = useTheme();

  const [timeline, setTimeline] = useState(0); // 0 to 4.0
  const [opacity, setOpacity] = useState(1);

  const tickRate = 50; // ms
  const totalSteps = 4;
  const increment = (totalSteps / (duration * 1000)) * tickRate;

  useVisibleInterval(
    containerRef,
    () => {
      setTimeline((prev) => {
        let next = prev + increment;
        if (next >= 4) {
          return 0;
        }
        return next;
      });
    },
    tickRate,
    isVisible
  );

  // Soft fade out / fade in of active tracks and packets near the end of the loop
  useEffect(() => {
    if (timeline >= 3.6) {
      setOpacity(Math.max(0, (4.0 - timeline) / 0.4));
    } else if (timeline <= 0.2) {
      setOpacity(Math.min(1, timeline / 0.2));
    } else {
      setOpacity(1);
    }
  }, [timeline]);

  // Coordinates for the 4 nodes in a 500x110 viewBox
  const nodeCoords = [55, 185, 315, 445];
  const centerY = 35;

  // Determine active node and packet X position
  let packetX = nodeCoords[0];
  let activeStep = 0;
  if (timeline <= 3) {
    const currentStepIndex = Math.floor(timeline);
    const stepProgress = timeline - currentStepIndex;
    activeStep = currentStepIndex;
    
    const startX = nodeCoords[currentStepIndex];
    const endX = nodeCoords[Math.min(currentStepIndex + 1, 3)];
    packetX = startX + (endX - startX) * stepProgress;
  } else {
    activeStep = 3;
    packetX = nodeCoords[3];
  }

  const pathColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(9, 9, 11, 0.08)';

  return (
    <div ref={containerRef} className="w-full bg-zinc-50/50 dark:bg-black/30 rounded-2xl p-4 border border-zinc-200/50 dark:border-white/5 relative overflow-hidden">
      <svg
        viewBox="0 0 500 110"
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Layer 1: Static background route */}
        <line
          x1={nodeCoords[0]}
          y1={centerY}
          x2={nodeCoords[3]}
          y2={centerY}
          stroke={pathColor}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Layer 2: Colored active path */}
        <line
          x1={nodeCoords[0]}
          y1={centerY}
          x2={packetX}
          y2={centerY}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          opacity={opacity}
        />

        {/* Layer 3: Moving glowing packet */}
        {timeline <= 3.8 && (
          <circle
            cx={packetX}
            cy={centerY}
            r="4.5"
            fill={color}
            opacity={opacity}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        )}

        {/* Node Points */}
        {nodes.map((node, i) => {
          const isCompleted = activeStep >= i;
          const isCurrentlyActive = activeStep === i;
          const nodeX = nodeCoords[i];

          return (
            <g key={node} className="cursor-default">
              {/* Outer halo for active node */}
              {isCurrentlyActive && (
                <circle
                  cx={nodeX}
                  cy={centerY}
                  r="14"
                  fill="none"
                  stroke={color}
                  strokeWidth="1"
                  opacity={opacity * 0.4}
                />
              )}

              {/* Node Main Circle */}
              <circle
                cx={nodeX}
                cy={centerY}
                r="10"
                fill={theme === 'dark' ? '#0a0a0a' : '#ffffff'}
                stroke={isCompleted ? color : (theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e4e4e7')}
                strokeWidth="1.5"
                style={{ transition: 'stroke 0.3s ease' }}
              />

              {/* Inner dot or check for visual indicators */}
              <circle
                cx={nodeX}
                cy={centerY}
                r={isCompleted ? "4" : "1.5"}
                fill={isCompleted ? color : (theme === 'dark' ? '#4b5563' : '#a1a1aa')}
                opacity={isCurrentlyActive ? opacity : 1}
                style={{ transition: 'r 0.3s ease, fill 0.3s ease' }}
              />

              {/* Node Persian Number */}
              <text
                x={nodeX}
                y={centerY - 16}
                textAnchor="middle"
                className={`text-[10px] font-mono transition-colors duration-300 ${
                  isCompleted ? 'fill-zinc-800 dark:fill-zinc-300 font-bold' : 'fill-zinc-400 dark:fill-zinc-600'
                }`}
              >
                {persianNums[i]}
              </text>

              {/* Persian Label text */}
              <text
                x={nodeX}
                y={centerY + 28}
                textAnchor="middle"
                className={`text-[11px] font-bold transition-colors duration-300 ${
                  isCurrentlyActive
                    ? 'fill-zinc-950 dark:fill-white'
                    : isCompleted
                    ? 'fill-zinc-700 dark:fill-zinc-400'
                    : 'fill-zinc-400 dark:fill-zinc-600'
                }`}
                style={{ direction: 'rtl' }}
              >
                {node}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const WorkflowUseCases: React.FC = () => {
  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      
      {/* Section Background grids & details with useCases variant prop */}
      <WorkflowSectionBackground variant="useCases" />

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
