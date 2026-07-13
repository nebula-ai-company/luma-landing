import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileInput, BrainCircuit, Wrench, RefreshCw, FileOutput, ChevronLeft } from 'lucide-react';

const Motion = motion as any;

interface StepData {
  id: number;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const PROCESS_STEPS: StepData[] = [
  {
    id: 1,
    label: 'ورودی',
    icon: FileInput,
    description: 'متن، فایل یا اطلاعات موردنیاز Workflow را مشخص کنید.',
    color: '#DA8FFF' // Purple
  },
  {
    id: 2,
    label: 'مدل هوش مصنوعی',
    icon: BrainCircuit,
    description: 'مدل مناسب را برای تحلیل، تصمیم‌گیری یا تولید محتوا انتخاب کنید.',
    color: '#FF6482' // Pink
  },
  {
    id: 3,
    label: 'ابزار لوما',
    icon: Wrench,
    description: 'ابزارهای مختلف لوما را در یک فرآیند واحد ترکیب کنید.',
    color: '#FFB340' // Yellow
  },
  {
    id: 4,
    label: 'پردازش',
    icon: RefreshCw,
    description: 'مراحل تعریف‌شده به‌ترتیب اجرا می‌شوند.',
    color: '#DA8FFF' // Purple
  },
  {
    id: 5,
    label: 'خروجی',
    icon: FileOutput,
    description: 'نتیجه نهایی را دریافت، ذخیره یا در مرحله بعد استفاده کنید.',
    color: '#FF6482' // Pink
  }
];

export const WorkflowProcess: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef as any, { once: false, amount: 0.2 });
  const [activeStep, setActiveStep] = useState<number>(0);

  // Animate steps loop only while visible
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (PROCESS_STEPS.length + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section 
      id="workflow-process" 
      ref={containerRef}
      className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300"
    >
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-luma-pink/5 dark:bg-luma-pink/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-luma-pink/10 border border-luma-pink/20 text-xs font-black text-luma-pink uppercase tracking-wider mb-4"
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
          <div className="relative flex justify-between items-start max-w-6xl mx-auto pt-8">
            
            {/* Connection Line Strip */}
            <div className="absolute top-16 left-0 right-0 h-[2px] bg-zinc-200 dark:bg-white/5 z-0">
              {/* Glow Active Signal Line */}
              <div 
                className="h-full bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow transition-all duration-1000 shadow-[0_0_12px_rgba(255,100,130,0.5)]"
                style={{ 
                  width: `${activeStep === 0 ? 0 : (activeStep / PROCESS_STEPS.length) * 100}%`,
                }}
              />
            </div>

            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isCurrent = activeStep === step.id;
              const isPassed = activeStep > step.id || activeStep === 0;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center w-1/5 px-2">
                  
                  {/* Step Node circle */}
                  <div className="relative group mb-6">
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-500 ${
                        isCurrent 
                          ? 'bg-white dark:bg-zinc-950 shadow-xl border-transparent ring-4 ring-transparent'
                          : isPassed
                          ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-300 dark:border-white/10'
                          : 'bg-white dark:bg-[#0a0a0a] border-zinc-200 dark:border-white/5 opacity-50'
                      }`}
                      style={{
                        boxShadow: isCurrent ? `0 0 25px ${step.color}33` : undefined,
                        borderColor: isCurrent ? step.color : undefined
                      }}
                    >
                      <StepIcon 
                        size={24} 
                        className={`transition-colors duration-500 ${
                          isCurrent 
                            ? 'text-zinc-950 dark:text-white' 
                            : 'text-zinc-400 dark:text-zinc-600'
                        }`}
                        style={{ color: isCurrent ? step.color : undefined }}
                      />
                    </div>

                    {/* Outer pulse indicator */}
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ backgroundColor: step.color }} />
                    )}
                  </div>

                  {/* Node Title (Aligned Properly) */}
                  <h3 
                    className={`text-base font-bold mb-3 transition-colors duration-500 font-sans ${
                      isCurrent ? 'text-zinc-950 dark:text-white' : 'text-zinc-500 dark:text-zinc-500'
                    }`}
                    style={{ color: isCurrent ? step.color : undefined }}
                    dir="rtl"
                  >
                    {step.label}
                  </h3>

                  {/* Step details card */}
                  <div 
                    className={`p-6 rounded-2xl border text-right transition-all duration-500 w-full min-h-[140px] flex flex-col justify-start ${
                      isCurrent
                        ? 'bg-white dark:bg-[#0c0c0c] border-zinc-200/80 dark:border-white/10 shadow-lg scale-102'
                        : 'bg-zinc-50/50 dark:bg-[#0d0d0d]/30 border-transparent opacity-60'
                    }`}
                    dir="rtl"
                  >
                    <p className="text-xs text-zinc-400 dark:text-gray-500 mb-1 font-mono">مرحله ۰{step.id}</p>
                    <p className="text-sm font-medium text-zinc-700 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

        {/* Mobile Presentation: Vertical Timeline */}
        <div className="block md:hidden max-w-md mx-auto relative px-4">
          
          {/* Vertical central timeline line */}
          <div className="absolute top-4 bottom-4 right-10 w-[2px] bg-zinc-200 dark:bg-white/5">
            <div 
              className="w-full bg-gradient-to-b from-luma-purple via-luma-pink to-luma-yellow transition-all duration-1000"
              style={{ 
                height: `${activeStep === 0 ? 0 : (activeStep / PROCESS_STEPS.length) * 100}%` 
              }}
            />
          </div>

          <div className="space-y-10">
            {PROCESS_STEPS.map((step) => {
              const StepIcon = step.icon;
              const isCurrent = activeStep === step.id;

              return (
                <div key={step.id} className="relative flex items-start gap-8 flex-row-reverse text-right">
                  
                  {/* Timeline Circle */}
                  <div 
                    className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center border transition-all duration-500 relative z-10 ${
                      isCurrent 
                        ? 'bg-white dark:bg-zinc-950 border-transparent shadow-lg scale-110'
                        : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-white/10'
                    }`}
                    style={{ borderColor: isCurrent ? step.color : undefined }}
                  >
                    <StepIcon 
                      size={20} 
                      className={isCurrent ? 'text-zinc-950 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}
                      style={{ color: isCurrent ? step.color : undefined }}
                    />
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ backgroundColor: step.color }} />
                    )}
                  </div>

                  {/* Card Info */}
                  <div 
                    className={`flex-1 p-5 rounded-2xl border transition-all duration-500 ${
                      isCurrent
                        ? 'bg-white dark:bg-[#0c0c0c] border-zinc-200/80 dark:border-white/10 shadow-md'
                        : 'bg-zinc-50/50 dark:bg-black/10 border-transparent opacity-70'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono text-zinc-400 dark:text-gray-500">مرحله ۰{step.id}</span>
                      <h4 
                        className="text-base font-bold font-sans"
                        style={{ color: isCurrent ? step.color : undefined }}
                      >
                        {step.label}
                      </h4>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
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
