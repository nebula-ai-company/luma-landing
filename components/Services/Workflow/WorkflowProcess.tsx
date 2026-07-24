import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileInput, BrainCircuit, Wrench, RefreshCw, FileOutput } from 'lucide-react';
import { WorkflowCard } from './WorkflowCard';
import { WorkflowSectionBackground } from './WorkflowSectionBackground';

const Motion = motion as any;

interface StepData {
  id: number;
  label: string;
  persianNum: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const PROCESS_STEPS: StepData[] = [
  {
    id: 1,
    label: 'ورودی داده',
    persianNum: '۱',
    icon: FileInput,
    description: 'متن، فایل یا اطلاعات موردنیاز جریان‌کار را مشخص کنید.',
    color: '#DA8FFF' // Purple
  },
  {
    id: 2,
    label: 'مدل هوش مصنوعی',
    persianNum: '۲',
    icon: BrainCircuit,
    description: 'مدل مناسب را برای تحلیل، تصمیم‌گیری یا تولید محتوا انتخاب کنید.',
    color: '#FF6482' // Pink
  },
  {
    id: 3,
    label: 'ابزار لوما',
    persianNum: '۳',
    icon: Wrench,
    description: 'ابزارهای مختلف لوما را در یک فرآیند واحد ترکیب کنید.',
    color: '#FFC964' // Yellow
  },
  {
    id: 4,
    label: 'پردازش خودکار',
    persianNum: '۴',
    icon: RefreshCw,
    description: 'مراحل تعریف‌شده به‌ترتیب و با سرعت بالا اجرا می‌شوند.',
    color: '#DA8FFF' // Purple
  },
  {
    id: 5,
    label: 'خروجی نهایی',
    persianNum: '۵',
    icon: FileOutput,
    description: 'نتیجه نهایی را دریافت، ذخیره یا در مرحله بعد استفاده کنید.',
    color: '#FF6482' // Pink
  }
];

export const WorkflowProcess: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef as any, { once: false, amount: 0.1 });
  const [activeStep, setActiveStep] = useState<number>(1);

  // Animate steps loop only while visible
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = prev + 1;
        return next > PROCESS_STEPS.length ? 1 : next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section 
      id="workflow-process" 
      ref={containerRef}
      className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300"
    >
      {/* Background aesthetics */}
      <WorkflowSectionBackground variant="process" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luma-pink/10 border border-luma-pink/20 text-xs font-black text-luma-pink uppercase tracking-wider mb-4"
          >
            <span>جریان یکپارچه</span>
          </Motion.div>

          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white leading-tight mb-4"
          >
            از یک ورودی ساده تا یک خروجی کامل
          </Motion.h2>

          <Motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            هر مرحله را به یک نود تبدیل کنید، ارتباط میان مراحل را بسازید و اجرای کل فرآیند را به لوما بسپارید.
          </Motion.p>
        </div>

        {/* Desktop Presentation: LTR process diagram flow */}
        <div className="hidden md:block" dir="ltr">
          <div className="relative flex justify-between items-start w-full pt-8">
            
            {/* Mathematical Connecting Line (Starts exactly at center of first step 10%, ends at last 90%) */}
            <div className="absolute top-16 left-[10%] right-[10%] h-[2px] bg-zinc-200 dark:bg-zinc-800/60 z-0">
              
              {/* Active filled line with correct math */}
              <div 
                className="h-full bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow transition-all duration-500 shadow-[0_0_12px_rgba(255,100,130,0.5)] relative"
                style={{ 
                  width: `${((activeStep - 1) / (PROCESS_STEPS.length - 1)) * 100}%`,
                }}
              >
                {/* Micro flowing data packet */}
                <Motion.div
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#DA8FFF]"
                  style={{ left: 0 }}
                />
              </div>
            </div>

            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isCurrent = activeStep === step.id;
              const isPassed = activeStep >= step.id;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center w-1/5 px-4">
                  
                  {/* Step Node Circle */}
                  <div className="relative group mb-8">
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-500 bg-white dark:bg-[#0a0a0a] ${
                        isCurrent 
                          ? 'shadow-[0_0_25px_rgba(218,143,255,0.35)] border-luma-purple scale-110 z-20'
                          : isPassed
                          ? 'border-zinc-300 dark:border-white/20'
                          : 'border-zinc-200 dark:border-white/5 opacity-40'
                      }`}
                      style={{
                        borderColor: isCurrent ? step.color : undefined
                      }}
                    >
                      <StepIcon 
                        size={22} 
                        className={`transition-colors duration-500 ${
                          isCurrent 
                            ? 'text-zinc-950 dark:text-white' 
                            : 'text-zinc-400 dark:text-zinc-600'
                        }`}
                        style={{ color: isCurrent ? step.color : undefined }}
                      />
                    </div>

                    {/* Ping active circle */}
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: step.color }} />
                    )}
                  </div>

                  {/* Node Label */}
                  <h3 
                    className={`text-sm font-black mb-4 transition-colors duration-500 font-sans ${
                      isCurrent ? 'text-zinc-950 dark:text-white font-black scale-102' : 'text-zinc-400 dark:text-zinc-500'
                    }`}
                    style={{ color: isCurrent ? step.color : undefined }}
                    dir="rtl"
                  >
                    {step.label}
                  </h3>

                  {/* Redesigned WorkflowCard details card */}
                  <div className="w-full">
                    <WorkflowCard
                      accentColor={step.color}
                      className={`w-full transition-all duration-500 ${isCurrent ? 'opacity-100 scale-102' : 'opacity-40'}`}
                      index={idx}
                      delay={0.1}
                    >
                      <p className="text-[10px] text-zinc-400 dark:text-gray-500 mb-1.5 font-sans text-right">مرحله {step.persianNum}</p>
                      <p className="text-xs font-medium text-zinc-700 dark:text-gray-300 leading-relaxed text-right flex-grow">
                        {step.description}
                      </p>
                    </WorkflowCard>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

        {/* Mobile Presentation: Vertical Timeline */}
        <div className="block md:hidden max-w-md mx-auto relative px-2">
          
          {/* Vertical central timeline line (starts and ends at the center of first/last circles) */}
          <div className="absolute top-[24px] bottom-[24px] right-10 w-[2px] bg-zinc-200 dark:bg-zinc-800 z-0">
            <div 
              className="w-full bg-gradient-to-b from-luma-purple via-luma-pink to-luma-yellow transition-all duration-1000"
              style={{ 
                height: `${((activeStep - 1) / (PROCESS_STEPS.length - 1)) * 100}%` 
              }}
            />
          </div>

          <div className="space-y-8">
            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isCurrent = activeStep === step.id;

              return (
                <div key={step.id} className="relative flex items-start gap-6 flex-row-reverse text-right">
                  
                  {/* Timeline Circle */}
                  <div 
                    className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center border transition-all duration-500 relative z-10 bg-white dark:bg-[#0a0a0a] ${
                      isCurrent 
                        ? 'border-luma-purple shadow-[0_0_15px_rgba(218,143,255,0.25)] scale-110'
                        : 'border-zinc-200 dark:border-white/10'
                    }`}
                    style={{ borderColor: isCurrent ? step.color : undefined }}
                  >
                    <StepIcon 
                      size={18} 
                      className={isCurrent ? 'text-zinc-950 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}
                      style={{ color: isCurrent ? step.color : undefined }}
                    />
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: step.color }} />
                    )}
                  </div>

                  {/* Card Info using LUMA shell */}
                  <div className={`flex-1 transition-all duration-500 ${isCurrent ? 'opacity-100' : 'opacity-50'}`}>
                    <WorkflowCard
                      accentColor={step.color}
                      className="w-full"
                      index={idx}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-sans">مرحله {step.persianNum}</span>
                        <h4 
                          className="text-sm font-black font-sans"
                          style={{ color: isCurrent ? step.color : undefined }}
                        >
                          {step.label}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed text-right">
                        {step.description}
                      </p>
                    </WorkflowCard>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
