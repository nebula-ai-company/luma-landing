import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Code, Link2, Share2, Eye, Shield, 
  ArrowLeft, Cpu, RefreshCw, Send, CheckCircle, Database, LayoutGrid
} from 'lucide-react';

const Motion = motion as any;

// --- Animation Components for each Bento Card ---

// 1. Visual canvas drawing animation
const VisualCanvasAnimation: React.FC = () => {
  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-44 bg-zinc-50 dark:bg-black/40 rounded-2xl overflow-hidden border border-zinc-200/40 dark:border-white/5 flex items-center justify-center">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      
      {/* Node 1 */}
      <Motion.div 
        animate={animStep >= 0 ? { x: -60, y: -20, opacity: 1, scale: 1 } : { x: -100, y: -20, opacity: 0, scale: 0.8 }}
        className="absolute w-24 py-1.5 px-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg text-center text-[10px] font-black shadow-sm"
      >
        ورودی متن
      </Motion.div>

      {/* Node 2 */}
      <Motion.div 
        animate={animStep >= 1 ? { x: 60, y: -20, opacity: 1, scale: 1 } : { x: 100, y: -20, opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.2 }}
        className="absolute w-24 py-1.5 px-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg text-center text-[10px] font-black shadow-sm"
      >
        مدل زبانی
      </Motion.div>

      {/* SVG Connection drawing */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" dir="ltr">
        {animStep >= 1 && (
          <Motion.path 
            d="M 120 70 Q 180 70 240 70"
            fill="none"
            stroke="#DA8FFF"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}
        {animStep >= 2 && (
          <Motion.path 
            d="M 240 70 Q 180 120 180 120"
            fill="none"
            stroke="#FF6482"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </svg>

      {/* Node 3 snaps in */}
      <Motion.div 
        animate={animStep >= 2 ? { x: 0, y: 35, opacity: 1, scale: 1 } : { x: 0, y: 80, opacity: 0, scale: 0.8 }}
        className="absolute w-24 py-1.5 px-2 bg-gradient-to-r from-luma-purple to-luma-pink text-white rounded-lg text-center text-[10px] font-black shadow-md shadow-luma-purple/10"
      >
        ابزار خلاقیت
      </Motion.div>
    </div>
  );
};

// 2. Luma models orbiting/entering node animation
const LumaToolsAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-32 bg-zinc-50 dark:bg-black/40 rounded-2xl overflow-hidden border border-zinc-200/40 dark:border-white/5 flex items-center justify-center">
      {/* Central Workflow Node */}
      <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center z-10 shadow-sm relative">
        <Cpu size={20} className="text-luma-purple animate-pulse" />
        <span className="absolute inset-0 rounded-xl border border-luma-purple animate-ping opacity-30" />
      </div>

      {/* Orbiting Model Chips */}
      {[
        { label: 'GPT', color: '#DA8FFF', delay: 0, x: -50, y: -25 },
        { label: 'Stable Diffusion', color: '#FF6482', delay: 0.5, x: 55, y: -20 },
        { label: 'Luma Upscale', color: '#FFB340', delay: 1, x: -40, y: 30 },
        { label: 'Claude', color: '#DA8FFF', delay: 1.5, x: 45, y: 25 },
      ].map((chip, i) => (
        <Motion.div
          key={i}
          animate={{ 
            y: [chip.y, chip.y - 6, chip.y],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: chip.delay,
            ease: 'easeInOut'
          }}
          className="absolute py-1 px-2.5 rounded-full border text-[9px] font-bold shadow-sm"
          style={{ 
            transform: `translate(${chip.x}px, ${chip.y}px)`,
            backgroundColor: `${chip.color}10`,
            borderColor: chip.color,
            color: chip.color
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
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrigger((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-32 bg-zinc-50 dark:bg-black/40 rounded-2xl overflow-hidden border border-zinc-200/40 dark:border-white/5 flex items-center justify-center">
      {/* Base Template Card */}
      <div className="relative w-28 h-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl p-2 shadow-sm z-10 flex flex-col justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-luma-purple/10 border border-luma-purple/20 flex items-center justify-center text-[7px] text-luma-purple">
            <RefreshCw size={8} />
          </div>
          <span className="text-[8px] font-bold text-zinc-800 dark:text-gray-200">الگوی اصلی</span>
        </div>
        <div className="h-1.5 w-full bg-zinc-100 dark:bg-white/5 rounded" />
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
              y: idx * -12,
              borderColor: idx === 1 ? '#DA8FFF' : idx === 2 ? '#FF6482' : '#FFB340'
            } : { 
              opacity: 0, 
              scale: 0.85, 
              x: 0, 
              y: 0 
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="absolute w-28 h-16 bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-white/10 rounded-xl p-2 shadow-sm pointer-events-none"
            style={{ zIndex: 10 - idx }}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[7px] font-medium text-zinc-500">کپی {idx}#</span>
            </div>
          </Motion.div>
        );
      })}
    </div>
  );
};

// 4. API Request and Response loop animation
const APIExecutionAnimation: React.FC = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-32 bg-zinc-50 dark:bg-black/40 rounded-2xl overflow-hidden border border-zinc-200/40 dark:border-white/5 flex items-center justify-center">
      {/* Code window chrome */}
      <div className="absolute top-1 right-2 left-2 h-4 border-b border-zinc-200/40 dark:border-white/5 flex items-center justify-end gap-1 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-white/10" />
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-white/10" />
      </div>

      {/* Central node API handler */}
      <div className="w-20 py-1.5 bg-zinc-900 text-white rounded-lg text-center text-[9px] font-mono border border-white/10 z-10 shadow-sm">
        API_ENDPOINT
      </div>

      {/* Moving Request packet */}
      <Motion.div
        animate={stage === 1 ? { x: [-120, 0], opacity: [0, 1, 1] } : stage > 1 ? { x: 0, opacity: 0 } : { x: -120, opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2 py-1 px-2 rounded bg-luma-purple text-black font-mono text-[8px] font-extrabold z-20"
      >
        POST: {"{ run }"}
      </Motion.div>

      {/* Moving Response packet */}
      <Motion.div
        animate={stage === 3 ? { x: [0, 120], opacity: [1, 1, 0] } : { x: 0, opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2 py-1 px-2 rounded bg-emerald-500 text-white font-mono text-[8px] font-extrabold z-20"
      >
        200: {"{ ok }"}
      </Motion.div>

      {/* Processing indication */}
      {stage === 2 && (
        <span className="absolute w-24 h-8 rounded-full bg-luma-purple/10 border border-luma-purple animate-ping opacity-30 pointer-events-none" />
      )}
    </div>
  );
};

// 5. Sharing state transition animation
const PublishShareAnimation: React.FC = () => {
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShared((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-32 bg-zinc-50 dark:bg-black/40 rounded-2xl overflow-hidden border border-zinc-200/40 dark:border-white/5 flex items-center justify-center">
      {/* Workflow Card */}
      <div className="w-32 h-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl p-3 shadow-sm z-10 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-zinc-800 dark:text-gray-200">کدنویس خودکار</span>
          
          {/* Status Badge */}
          <Motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
              isShared 
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500' 
                : 'bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 text-zinc-400 dark:text-gray-500'
            }`}
          >
            {isShared ? 'منتشر شده' : 'خصوصی'}
          </Motion.div>
        </div>

        {/* Share avatars */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-white/5">
          <span className="text-[8px] text-zinc-400 dark:text-gray-500">اشتراک‌گذاری:</span>
          <div className="flex -space-x-1.5 flex-row-reverse">
            <Motion.div 
              animate={isShared ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              className="w-5 h-5 rounded-full bg-luma-purple flex items-center justify-center text-[8px] font-bold text-black border border-white dark:border-zinc-900"
            >
              U1
            </Motion.div>
            <Motion.div 
              animate={isShared ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.15 }}
              className="w-5 h-5 rounded-full bg-luma-pink flex items-center justify-center text-[8px] font-bold text-white border border-white dark:border-zinc-900"
            >
              U2
            </Motion.div>
            <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[8px] font-bold text-zinc-500 border border-white dark:border-zinc-900">
              ME
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Sequential input and output paths animation
const DataPipelineAnimation: React.FC = () => {
  const [pipelineState, setPipelineState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineState((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[140px] bg-zinc-50 dark:bg-black/40 rounded-2xl overflow-hidden border border-zinc-200/40 dark:border-white/5 flex items-center justify-between px-8">
      {/* Input Port (Left) */}
      <div className="flex flex-col items-center gap-1.5 z-10">
        <div 
          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-500 ${
            pipelineState === 0
              ? 'bg-luma-purple text-black border-transparent shadow-[0_0_15px_rgba(218,143,255,0.4)]'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400'
          }`}
        >
          <Database size={16} />
        </div>
        <span className="text-[9px] font-bold text-zinc-500">ورودی داده</span>
      </div>

      {/* SVG Pipeline */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" dir="ltr">
        <path d="M 60 70 L 260 70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
        {pipelineState === 1 && (
          <Motion.line
            x1="60" y1="70" x2="260" y2="70"
            stroke="#FF6482"
            strokeWidth="2.5"
            strokeDasharray="8 20"
            animate={{ strokeDashoffset: [0, -40] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          />
        )}
      </svg>

      {/* Flow Processor Node (Center) */}
      <div className="w-14 h-14 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 flex items-center justify-center z-10 shadow-sm">
        <RefreshCw size={18} className={`text-zinc-400 ${pipelineState === 1 ? 'animate-spin text-luma-pink' : ''}`} />
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
        <span className="text-[9px] font-bold text-zinc-500">خروجی پاکسازی شده</span>
      </div>
    </div>
  );
};


export const WorkflowCapabilities: React.FC = () => {
  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-right">
          <Motion.div 
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-luma-purple/10 border border-luma-purple/20 text-xs font-black text-luma-purple uppercase tracking-wider mb-4"
          >
            <span>بوم همه کاره</span>
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
            Workflow به شما اجازه می‌دهد فرآیندهای چندمرحله‌ای را به‌صورت بصری طراحی، اجرا و دوباره استفاده کنید.
          </Motion.p>
        </div>

        {/* Asymmetric Bento Grid (12 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 xl:gap-8 max-w-6xl mx-auto">
          
          {/* Row 1 - Card 1 (Large - 8 cols) - ساخت بصری */}
          <div className="md:col-span-8 p-8 rounded-3xl bg-white dark:bg-[#0c0c0c] border border-zinc-200/60 dark:border-white/5 flex flex-col justify-between min-h-[360px] hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300 shadow-sm relative group">
            <VisualCanvasAnimation />
            
            <div className="mt-6 text-right">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans group-hover:text-luma-purple transition-colors">
                ساخت بصری، بدون پیچیدگی
              </h3>
              <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                نودها را روی بوم قرار دهید، آن‌ها را به هم متصل کنید و مسیر اجرای Workflow را ببینید.
              </p>
            </div>
          </div>

          {/* Row 1 - Card 2 (Medium - 4 cols) - مدل‌ها و ابزارها */}
          <div className="md:col-span-4 p-8 rounded-3xl bg-white dark:bg-[#0c0c0c] border border-zinc-200/60 dark:border-white/5 flex flex-col justify-between min-h-[360px] hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300 shadow-sm group">
            <LumaToolsAnimation />

            <div className="mt-6 text-right">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans group-hover:text-luma-pink transition-colors">
                ترکیب مدل‌ها و ابزارها
              </h3>
              <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                قابلیت‌های مختلف هوش مصنوعی را در یک جریان منسجم کنار هم قرار دهید.
              </p>
            </div>
          </div>

          {/* Row 2 - Card 3 (Medium - 4 cols) - استفاده مجدد */}
          <div className="md:col-span-4 p-8 rounded-3xl bg-white dark:bg-[#0c0c0c] border border-zinc-200/60 dark:border-white/5 flex flex-col justify-between min-h-[340px] hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300 shadow-sm group">
            <ReusabilityAnimation />

            <div className="mt-6 text-right">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans group-hover:text-luma-yellow transition-colors">
                یکبار بسازید، دوباره استفاده کنید
              </h3>
              <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                فرآیندهای تکراری را به Workflowهای آماده و قابل اجرای مجدد تبدیل کنید.
              </p>
            </div>
          </div>

          {/* Row 2 - Card 4 (Medium - 4 cols) - اجرای API */}
          <div className="md:col-span-4 p-8 rounded-3xl bg-white dark:bg-[#0c0c0c] border border-zinc-200/60 dark:border-white/5 flex flex-col justify-between min-h-[340px] hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300 shadow-sm group">
            <APIExecutionAnimation />

            <div className="mt-6 text-right">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans group-hover:text-luma-purple transition-colors">
                اجرا از طریق API
              </h3>
              <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                Workflowهای ساخته‌شده را از محصولات و سرویس‌های دیگر خود اجرا کنید.
              </p>
            </div>
          </div>

          {/* Row 2 - Card 5 (Medium - 4 cols) - انتشار و اشتراک‌گذاری */}
          <div className="md:col-span-4 p-8 rounded-3xl bg-white dark:bg-[#0c0c0c] border border-zinc-200/60 dark:border-white/5 flex flex-col justify-between min-h-[340px] hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300 shadow-sm group">
            <PublishShareAnimation />

            <div className="mt-6 text-right">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans group-hover:text-luma-pink transition-colors">
                انتشار و اشتراک‌گذاری
              </h3>
              <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                Workflow خود را منتشر کنید و آن را در اختیار دیگران قرار دهید.
              </p>
            </div>
          </div>

          {/* Row 3 - Card 6 (Full - 12 cols) - مسیر شفاف داده */}
          <div className="md:col-span-12 p-8 rounded-3xl bg-white dark:bg-[#0c0c0c] border border-zinc-200/60 dark:border-white/5 flex flex-col md:flex-row gap-8 items-center justify-between min-h-[220px] hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300 shadow-sm group">
            <div className="w-full md:w-1/2 text-right">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 font-sans group-hover:text-luma-yellow transition-colors">
                مسیر شفاف داده
              </h3>
              <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                در هر مرحله مشخص است چه اطلاعاتی وارد می‌شود و چه خروجی‌ای تولید خواهد شد. از تداخل جریان و ناهماهنگی اطلاعات جلوگیری کنید.
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <DataPipelineAnimation />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
