import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, ArrowLeft, RefreshCw, FileText } from 'lucide-react';
import Button from '../../Button';

const Motion = motion as any;

export const WorkflowMoment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef as any, { once: false, amount: 0.3 });

  return (
    <section 
      ref={containerRef}
      className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300"
    >
      {/* Dynamic colorful blur orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-luma-purple via-luma-pink to-luma-yellow opacity-10 dark:opacity-5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Visual Moment: Floating nodes that align on scroll */}
        <div className="max-w-2xl mx-auto h-48 relative mb-12 flex items-center justify-center">
          
          {/* Node 1 */}
          <Motion.div 
            animate={isInView 
              ? { x: -160, y: 0, rotate: 0, opacity: 1 } 
              : { x: -220, y: -40, rotate: -15, opacity: 0.4 }
            }
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="absolute p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-md flex items-center gap-2.5"
          >
            <div className="w-6 h-6 rounded bg-luma-purple/10 flex items-center justify-center text-luma-purple">
              <Play size={12} fill="currentColor" />
            </div>
            <span className="text-xs font-black text-zinc-800 dark:text-gray-200">شروع فرآیند</span>
          </Motion.div>

          {/* Connected SVG Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" dir="ltr">
            {isInView && (
              <>
                <Motion.path 
                  d="M 130 96 Q 260 96 390 96"
                  fill="none"
                  stroke="rgba(218,143,255,0.15)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <Motion.circle 
                  cx="130" cy="96" r="3"
                  fill="#FF6482"
                  animate={{ cx: [130, 390], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.5, delay: 0.8, repeat: Infinity, repeatDelay: 1 }}
                />
              </>
            )}
          </svg>

          {/* Node 2 - Transforms into a glorious glow element */}
          <Motion.div 
            animate={isInView 
              ? { x: 160, y: 0, rotate: 0, opacity: 1, scale: 1 } 
              : { x: 220, y: 40, rotate: 15, opacity: 0.4, scale: 0.95 }
            }
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className={`absolute p-3 rounded-2xl bg-white dark:bg-zinc-900 border transition-all duration-700 shadow-md flex items-center gap-2.5 ${
              isInView 
                ? 'border-luma-purple ring-2 ring-luma-purple/10 shadow-[0_0_20px_rgba(218,143,255,0.35)]' 
                : 'border-zinc-200 dark:border-white/5'
            }`}
          >
            <div className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <RefreshCw size={12} className="animate-spin-slow" />
            </div>
            <span className="text-xs font-black text-zinc-800 dark:text-gray-200">خروجی نهایی</span>
          </Motion.div>

        </div>

        {/* Copy and Actions */}
        <div className="max-w-3xl mx-auto">
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white leading-tight mb-6"
          >
            فرآیند بعدی شما از همین‌جا شروع می‌شود
          </Motion.h2>

          <Motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed mb-12 max-w-xl mx-auto"
          >
            ابزارهای لوما را به هم متصل کنید و یک Workflow تکرارپذیر برای کارهای واقعی خود بسازید.
          </Motion.p>

          <Motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              externalHref="https://dash.lumai.ir/"
              variant="primary"
              className="px-8 py-4 text-base font-bold shadow-xl shadow-luma-purple/20 hover:shadow-luma-purple/40 justify-center group w-full sm:w-auto"
            >
              <span>شروع ساخت Workflow</span>
              <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            </Button>

            <Button
              href="/docs"
              variant="secondary"
              className="px-8 py-4 text-base font-bold bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-800 dark:text-white rounded-2xl border border-black/10 dark:border-white/10 transition-all justify-center w-full sm:w-auto"
            >
              <span>مطالعه مستندات</span>
            </Button>
          </Motion.div>
        </div>

      </div>
    </section>
  );
};
