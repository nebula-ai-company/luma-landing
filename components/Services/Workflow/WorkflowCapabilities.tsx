import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Code, Link2, Share2, Eye, Shield, 
  ArrowLeft, Cpu, RefreshCw, Send, CheckCircle, Database, LayoutGrid, Users, User
} from 'lucide-react';
import { WorkflowCard } from './WorkflowCard';
import { WorkflowSectionBackground } from './WorkflowSectionBackground';

const Motion = motion as any;

// --- Helper for visible-aware loops ---
const useVisibleStep = (maxSteps: number, intervalMs: number = 2000) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % maxSteps);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [maxSteps, intervalMs]);
  return step;
};

// 1. Visual canvas drawing animation with math viewBox alignment
const VisualCanvasAnimation: React.FC = () => {
  const animStep = useVisibleStep(4, 2500);

  return (
    <div className="relative w-full h-44 bg-zinc-50/50 dark:bg-black/30 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-white/5 flex items-center justify-center">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      
      {/* SVG Connection drawing - mapped exactly to percentage coordinates 0-100 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" dir="ltr">
        {animStep >= 1 && (
          <Motion.path 
            d="M 25 35 L 75 35"
            fill="none"
            stroke="#DA8FFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}
        {animStep >= 2 && (
          <Motion.path 
            d="M 75 35 L 50 75"
            fill="none"
            stroke="#FF6482"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </svg>

      {/* Node 1 */}
      <div 
        style={{ left: '25%', top: '35%', transform: 'translate(-50%, -50%)' }}
        className="absolute w-24 py-1.5 px-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg text-center text-[10px] font-black shadow-sm z-10"
      >
        ورودی داده
      </div>

      {/* Node 2 */}
      <Motion.div 
        style={{ left: '75%', top: '35%', transform: 'translate(-50%, -50%)' }}
        animate={animStep >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.95 }}
        className="absolute w-24 py-1.5 px-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg text-center text-[10px] font-black shadow-sm z-10"
      >
        مدل زبانی
      </Motion.div>

      {/* Node 3 */}
      <Motion.div 
        style={{ left: '50%', top: '75%', transform: 'translate(-50%, -50%)' }}
        animate={animStep >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.95 }}
        className="absolute w-24 py-1.5 px-2 bg-gradient-to-r from-luma-purple to-luma-pink text-white rounded-lg text-center text-[10px] font-black shadow-md z-10"
      >
        ابزار خلاقیت
      </Motion.div>
    </div>
  );
};

// 2. Luma models orbiting/entering node animation
const LumaToolsAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-44 bg-zinc-50/50 dark:bg-black/30 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-white/5 flex items-center justify-center">
      {/* Central Workflow Node */}
      <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/10 flex items-center justify-center z-10 shadow-sm relative">
        <Cpu size={20} className="text-luma-purple animate-pulse" />
        <span className="absolute inset-0 rounded-xl border border-luma-purple animate-ping opacity-20" />
      </div>

      {/* SVG connections with responsive coordinates */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="25" y1="25" x2="50" y2="50" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />
        <line x1="75" y1="30" x2="50" y2="50" stroke="rgba(255, 100, 130, 0.15)" strokeWidth="1" />
        <line x1="25" y1="75" x2="50" y2="50" stroke="rgba(255, 179, 64, 0.15)" strokeWidth="1" />
        <line x1="75" y1="70" x2="50" y2="50" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />
      </svg>

      {/* Orbiting Model Chips - Persian descriptions, no English titles */}
      {[
        { label: 'مدل زبانی', color: '#DA8FFF', delay: 0, left: '25%', top: '25%' },
        { label: 'مدل تصویر', color: '#FF6482', delay: 0.5, left: '75%', top: '30%' },
        { label: 'ویرایش تصویر', color: '#FFB340', delay: 1, left: '25%', top: '75%' },
        { label: 'افزایش کیفیت', color: '#DA8FFF', delay: 1.5, left: '75%', top: '70%' },
      ].map((chip, i) => (
        <Motion.div
          key={i}
          style={{ left: chip.left, top: chip.top, transform: 'translate(-50%, -50%)' }}
          animate={{ 
            y: [0, -4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: chip.delay,
            ease: 'easeInOut'
          }}
          className="absolute py-1 px-2.5 rounded-full border text-[9px] font-black shadow-sm bg-white dark:bg-zinc-950"
          style={{ 
            borderColor: chip.color,
            color: chip.color,
            backgroundColor: `${chip.color}08`,
            left: chip.left,
            top: chip.top,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {chip.label}
        </Motion.div>
      ))}
    </div>
  );
};

// 3. Duplicate template instance animation
const ReusabilityAnimation: React.FC = () => {
  const trigger = useVisibleStep(4, 2000);

  return (
    <div className="relative w-full h-44 bg-zinc-50/50 dark:bg-black/30 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-white/5 flex items-center justify-center">
      {/* Base Template Card */}
      <div className="relative w-32 h-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl p-3 shadow-sm z-10 flex flex-col justify-between text-right" dir="rtl">
        <div className="flex items-center gap-1.5 justify-start">
          <div className="w-4 h-4 rounded-full bg-luma-purple/10 border border-luma-purple/20 flex items-center justify-center text-luma-purple">
            <RefreshCw size={10} />
          </div>
          <span className="text-[10px] font-black text-zinc-800 dark:text-gray-200">فرآیند مرجع</span>
        </div>
        <div className="h-1.5 w-full bg-zinc-100 dark:bg-white/5 rounded" />
        <div className="h-1.5 w-2/3 bg-zinc-100 dark:bg-white/5 rounded" />
      </div>

      {/* Cloned stacked instances */}
      {[1, 2, 3].map((idx) => {
        const isShown = trigger >= idx;
        return (
          <Motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.85, x: 0, y: 0 }}
            animate={isShown ? { 
              opacity: 0.45, 
              scale: 0.9, 
              x: idx * 16, 
              y: idx * -14,
            } : { 
              opacity: 0, 
              scale: 0.85, 
              x: 0, 
              y: 0 
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="absolute w-32 h-20 bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 rounded-xl p-3 shadow-sm pointer-events-none text-right"
            style={{ zIndex: 10 - idx }}
            dir="rtl"
          >
            <div className="flex items-center gap-1.5 justify-start">
              <span className="text-[9px] font-black text-zinc-500">نمونه شماره {idx}</span>
            </div>
          </Motion.div>
        );
      })}
    </div>
  );
};

// 4. API Request and Response loop animation without Latin labels
const APIExecutionAnimation: React.FC = () => {
  const stage = useVisibleStep(4, 2000);

  return (
    <div className="relative w-full h-44 bg-zinc-50/50 dark:bg-black/30 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-white/5 flex items-center justify-center">
      {/* Code window chrome */}
      <div className="absolute top-2 right-2 left-2 h-4 border-b border-zinc-200/40 dark:border-white/5 flex items-center justify-end gap-1 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-white/10" />
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-white/10" />
      </div>

      {/* Central API Endpoint box */}
      <div className="w-24 py-2 bg-zinc-900 border border-white/10 rounded-lg text-center text-[10px] text-white font-black z-10 shadow-sm">
        درگاه API لوما
      </div>

      {/* Moving Request packet */}
      <Motion.div
        animate={stage === 1 ? { x: [-100, 0], opacity: [0, 1, 1] } : stage > 1 ? { x: 0, opacity: 0 } : { x: -100, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 -translate-x-1/2 py-1.5 px-3 rounded bg-luma-purple text-zinc-950 text-[10px] font-black z-20"
      >
        درخواست ورودی
      </Motion.div>

      {/* Moving Response packet */}
      <Motion.div
        animate={stage === 3 ? { x: [0, 100], opacity: [1, 1, 0] } : { x: 0, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 -translate-x-1/2 py-1.5 px-3 rounded bg-emerald-500 text-white text-[10px] font-black z-20"
      >
        پاسخ خروجی
      </Motion.div>

      {/* Processing indication */}
      {stage === 2 && (
        <span className="absolute w-28 h-10 rounded-xl bg-luma-purple/10 border border-luma-purple animate-ping opacity-25 pointer-events-none" />
      )}
    </div>
  );
};

// 5. Sharing state transition animation
const PublishShareAnimation: React.FC = () => {
  const isShared = useVisibleStep(2, 3000) === 1;

  return (
    <div className="relative w-full h-44 bg-zinc-50/50 dark:bg-black/30 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-white/5 flex items-center justify-center">
      {/* Workflow Card */}
      <div className="w-40 h-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl p-3 shadow-sm z-10 flex flex-col justify-between text-right" dir="rtl">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-zinc-800 dark:text-gray-200">جریان توسعه‌دهنده</span>
          
          {/* Status Badge */}
          <Motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            className={`px-2 py-0.5 rounded text-[8px] font-black ${
              isShared 
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500' 
                : 'bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 text-zinc-400 dark:text-gray-500'
            }`}
          >
            {isShared ? 'منتشر شده' : 'شخصی'}
          </Motion.div>
        </div>

        {/* Share avatars */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-white/5">
          <span className="text-[8px] text-zinc-400 dark:text-gray-500">دسترسی اعضا:</span>
          <div className="flex -space-x-1.5 flex-row-reverse items-center">
            <Motion.div 
              animate={isShared ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              className="w-5 h-5 rounded-full bg-luma-purple flex items-center justify-center border border-white dark:border-zinc-900 shadow-sm"
            >
              <User size={10} className="text-zinc-950" />
            </Motion.div>
            <Motion.div 
              animate={isShared ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="w-5 h-5 rounded-full bg-luma-pink flex items-center justify-center border border-white dark:border-zinc-900 shadow-sm"
            >
              <User size={10} className="text-white" />
            </Motion.div>
            <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-white dark:border-zinc-900 shadow-sm">
              <User size={10} className="text-zinc-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Sequential input and output paths animation with precise port math
const DataPipelineAnimation: React.FC = () => {
  const pipelineState = useVisibleStep(3, 2500);

  return (
    <div className="relative w-full h-24 bg-zinc-50/50 dark:bg-black/30 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-white/5 flex items-center justify-between px-8">
      
      {/* Input Port (Left) */}
      <div className="flex flex-col items-center gap-1.5 z-10">
        <div 
          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-500 ${
            pipelineState === 0
              ? 'bg-luma-purple text-zinc-950 border-transparent shadow-[0_0_15px_rgba(218,143,255,0.4)]'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400'
          }`}
        >
          <Database size={16} />
        </div>
        <span className="text-[9px] font-black text-zinc-500">ورودی داده</span>
      </div>

      {/* SVG Pipeline */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="15" y1="50" x2="85" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
        {pipelineState === 1 && (
          <Motion.line
            x1="15" y1="50" x2="85" y2="50"
            stroke="#FF6482"
            strokeWidth="2.5"
            strokeDasharray="4 8"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          />
        )}
      </svg>

      {/* Flow Processor Node (Center) */}
      <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-white/10 flex items-center justify-center z-10 shadow-sm">
        <RefreshCw size={16} className={`text-zinc-400 ${pipelineState === 1 ? 'animate-spin text-luma-pink' : ''}`} />
      </div>

      {/* Output Port (Right) */}
      <div className="flex flex-col items-center gap-1.5 z-10">
        <div 
          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-500 ${
            pipelineState === 2
              ? 'bg-emerald-500 text-white border-transparent shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400'
          }`}
        >
          <CheckCircle size={16} />
        </div>
        <span className="text-[9px] font-black text-zinc-500">تصفیه نهایی</span>
      </div>
    </div>
  );
};


export const WorkflowCapabilities: React.FC = () => {
  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      
      {/* Reusable capabilities bg */}
      <WorkflowSectionBackground variant="capabilities" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-right">
          <Motion.div 
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luma-purple/10 border border-luma-purple/20 text-xs font-black text-luma-purple uppercase tracking-wider mb-4"
          >
            <span>بوم همه‌کاره</span>
          </Motion.div>

          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white leading-tight mb-4"
          >
            همه‌چیز روی یک بوم
          </Motion.h2>

          <Motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl text-justify"
          >
            Workflow به شما اجازه می‌دهد فرآیندهای چندمرحله‌ای را به‌صورت کاملاً بصری بر روی یک بوم یکپارچه، طراحی، اجرا و دوباره استفاده کنید.
          </Motion.p>
        </div>

        {/* Asymmetric Bento Grid (12 Columns) occupying full container width */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 xl:gap-8 w-full">
          
          {/* Row 1 - Card 1 (Large - 8 cols) - ساخت بصری */}
          <div className="md:col-span-8">
            <WorkflowCard accentColor="#DA8FFF" className="h-full flex flex-col justify-between" index={0}>
              <VisualCanvasAnimation />
              
              <div className="mt-8 text-right">
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans">
                  ساخت بصری، بدون نیاز به کدنویسی
                </h3>
                <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                  نودها را روی بوم قرار دهید، آن‌ها را با خطوط جریان به هم متصل کنید و فرآیند انتقال داده‌ها را گام‌به‌گام مدیریت کنید.
                </p>
              </div>
            </WorkflowCard>
          </div>

          {/* Row 1 - Card 2 (Medium - 4 cols) - مدل‌ها و ابزارها */}
          <div className="md:col-span-4">
            <WorkflowCard accentColor="#FF6482" className="h-full flex flex-col justify-between" index={1}>
              <LumaToolsAnimation />

              <div className="mt-8 text-right">
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans">
                  ترکیب هوشمند مدل‌ها
                </h3>
                <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                  قابلیت‌های تخصصی پردازش متن، ویرایش تصاویر و افزایش کیفیت را در یک جریان هماهنگ با هم ترکیب کنید.
                </p>
              </div>
            </WorkflowCard>
          </div>

          {/* Row 2 - Card 3 (Medium - 4 cols) - استفاده مجدد */}
          <div className="md:col-span-4">
            <WorkflowCard accentColor="#FFC964" className="h-full flex flex-col justify-between" index={2}>
              <ReusabilityAnimation />

              <div className="mt-8 text-right">
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans">
                  یکبار ساخت، تکرار دائم
                </h3>
                <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                  فرآیندهای پیچیده و زمان‌بر روزانه خود را در قالب الگوهای آماده ذخیره کرده و بارها و بارها اجرا کنید.
                </p>
              </div>
            </WorkflowCard>
          </div>

          {/* Row 2 - Card 4 (Medium - 4 cols) - اجرای API */}
          <div className="md:col-span-4">
            <WorkflowCard accentColor="#DA8FFF" className="h-full flex flex-col justify-between" index={3}>
              <APIExecutionAnimation />

              <div className="mt-8 text-right">
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans">
                  اتصال به برنامه‌ها با API
                </h3>
                <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                  جریان‌های آماده‌شده خود را به‌صورت خودکار از طریق فراخوانی استاندارد API در سایر سیستم‌های نرم‌افزاری اجرا کنید.
                </p>
              </div>
            </WorkflowCard>
          </div>

          {/* Row 2 - Card 5 (Medium - 4 cols) - انتشار و اشتراک‌گذاری */}
          <div className="md:col-span-4">
            <WorkflowCard accentColor="#FF6482" className="h-full flex flex-col justify-between" index={4}>
              <PublishShareAnimation />

              <div className="mt-8 text-right">
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans">
                  اشتراک‌گذاری آسان
                </h3>
                <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                  جریان‌های کارآمد خود را به‌صورت امن برای اعضای تیم به اشتراک بگذارید یا با تعیین دسترسی عمومی منتشر کنید.
                </p>
              </div>
            </WorkflowCard>
          </div>

          {/* Row 3 - Card 6 (Full - 12 cols) - مسیر شفاف داده */}
          <div className="md:col-span-12">
            <WorkflowCard accentColor="#FFC964" className="p-8 flex flex-col md:flex-row gap-8 items-center justify-between" index={5}>
              <div className="w-full md:w-1/2 text-right">
                <h3 className="text-2xl font-bold text-zinc-950 dark:text-white mb-3 font-sans">
                  مسیر فوق‌العاده شفاف اطلاعات
                </h3>
                <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light text-justify">
                  در هر مرحله از اجرای فرآیند، ورودی‌ها و تغییرات داده‌ها کاملاً آشکار است. این یکپارچگی به شما اطمینان می‌دهد که هیچ خطایی در همپوشانی اطلاعات رخ نخواهد داد.
                </p>
              </div>

              <div className="w-full md:w-1/2">
                <DataPipelineAnimation />
              </div>
            </WorkflowCard>
          </div>

        </div>

      </div>
    </section>
  );
};
