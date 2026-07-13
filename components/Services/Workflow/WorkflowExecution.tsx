import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Share2, Check, RefreshCw, Lock, Globe, Database, ArrowLeft } from 'lucide-react';
import { WorkflowCard } from './WorkflowCard';
import { WorkflowSectionBackground } from './WorkflowSectionBackground';

const Motion = motion as any;

const useVisibleStep = (maxSteps: number, intervalMs: number = 2200) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % maxSteps);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [maxSteps, intervalMs]);
  return step;
};

export const WorkflowExecution: React.FC = () => {
  // Loop-based states for visual execution demonstrations
  const panel1State = useVisibleStep(4, 2500); // 0: idle, 1: sending, 2: processing, 3: completed
  const panel2State = useVisibleStep(4, 2300); // 0: idle, 1: sending, 2: processing, 3: completed
  const panel3State = useVisibleStep(3, 2800); // 0: private, 1: publishing, 2: public

  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      
      {/* Reusable section bg */}
      <WorkflowSectionBackground variant="execution" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luma-purple/10 border border-luma-purple/20 text-xs font-black text-luma-purple uppercase tracking-wider mb-4"
          >
            <span>اجرا و انتشار</span>
          </Motion.div>

          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white leading-tight mb-4"
          >
            ساخته‌شده برای اجرا
          </Motion.h2>

          <Motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Workflow را مستقیماً از روی پنل بصری لوما اجرا کنید، از طریق ابزار API فراخوانی نمایید یا برای سایر کاربران انتشار دهید.
          </Motion.p>
        </div>

        {/* 3 Connected Panels Layout using full container width */}
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 w-full">
            
            {/* Panel 1: اجرای دستی */}
            <div className="h-full">
              <WorkflowCard accentColor="#DA8FFF" className="p-8 flex flex-col justify-between h-full min-h-[460px]" index={0}>
                
                {/* Text section */}
                <div className="text-right mb-6" dir="rtl">
                  <span className="text-[10px] text-luma-purple font-black mb-1.5 block">روش اول</span>
                  <h3 className="text-2xl font-black text-zinc-950 dark:text-white mb-3 font-sans">اجرای دستی</h3>
                  <p className="text-xs text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                    فرآیند طراحی‌شده را مستقیماً با فشردن یک کلید در پنل لوما اجرا نمایید و نتیجه را گام‌به‌گام رهگیری کنید.
                  </p>
                </div>

                {/* Animation Canvas */}
                <div className="h-48 bg-zinc-50/50 dark:bg-black/30 rounded-2xl border border-zinc-200/50 dark:border-white/5 flex flex-col justify-between p-4 relative overflow-hidden">
                  <div className="flex items-center justify-between" dir="rtl">
                    <span className="text-[10px] text-zinc-400 font-bold">پنل مدیریت لوما</span>
                    
                    {/* State Status Indicator */}
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${panel1State === 2 ? 'bg-amber-500 animate-pulse' : panel1State === 3 ? 'bg-emerald-500' : 'bg-zinc-300'}`} />
                      <span className="text-[9px] font-bold text-zinc-500">
                        {panel1State === 0 && 'آماده به کار'}
                        {panel1State === 1 && 'ارسال داده ورودی...'}
                        {panel1State === 2 && 'در حال پردازش خودکار...'}
                        {panel1State === 3 && 'عملیات با موفقیت انجام شد'}
                      </span>
                    </div>
                  </div>

                  {/* Nodes Flow */}
                  <div className="flex justify-between items-center px-6 relative w-full">
                    {/* Input */}
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${panel1State >= 1 ? 'bg-luma-purple/20 border-luma-purple text-luma-purple shadow-sm' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400'}`}>
                      <Play size={14} className="rotate-180" />
                    </div>

                    {/* SVG Connector Line */}
                    <svg className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 pointer-events-none px-16" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <line x1="0" y1="5" x2="100" y2="5" stroke={panel1State >= 2 ? '#DA8FFF' : '#e4e4e7'} strokeWidth="2" strokeDasharray={panel1State === 2 ? '4 4' : 'none'} />
                    </svg>

                    {/* Output */}
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${panel1State === 3 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500 shadow-sm' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400'}`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </div>

                  {/* Run Button Simulation */}
                  <div className="flex justify-center">
                    <button 
                      className={`h-9 px-6 rounded-xl font-black text-xs flex items-center gap-2 transition-all duration-300 border ${
                        panel1State === 1 
                          ? 'bg-luma-purple text-zinc-950 border-transparent scale-95 shadow-lg shadow-luma-purple/20' 
                          : panel1State === 2 
                          ? 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/5 text-zinc-400 cursor-not-allowed'
                          : 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:scale-102 border-transparent shadow-sm'
                      }`}
                    >
                      {panel1State === 2 ? (
                        <RefreshCw size={12} className="animate-spin text-luma-pink" />
                      ) : (
                        <Play size={12} className="rotate-180" />
                      )}
                      <span>اجرای Workflow</span>
                    </button>
                  </div>
                </div>

              </WorkflowCard>
            </div>

            {/* Panel 2: اجرای API */}
            <div className="h-full">
              <WorkflowCard accentColor="#FF6482" className="p-8 flex flex-col justify-between h-full min-h-[460px]" index={1}>
                
                {/* Text section */}
                <div className="text-right mb-6" dir="rtl">
                  <span className="text-[10px] text-luma-pink font-black mb-1.5 block">روش دوم</span>
                  <h3 className="text-2xl font-black text-zinc-950 dark:text-white mb-3 font-sans">اجرای API</h3>
                  <p className="text-xs text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                    بدون نیاز به باز کردن سایت، جریان‌های آماده را از طریق فراخوانی استاندارد API در درون نرم‌افزار خود فعال کنید.
                  </p>
                </div>

                {/* Animation Canvas: Rich Visual API Flow, No Latin/Monospace Code Labels */}
                <div className="h-48 bg-zinc-50/50 dark:bg-black/30 rounded-2xl border border-zinc-200/50 dark:border-white/5 flex flex-col justify-between p-4 relative overflow-hidden">
                  <div className="flex items-center justify-between" dir="rtl">
                    <span className="text-[10px] text-zinc-400 font-bold">اتصال از طریق API</span>
                    
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${panel2State === 2 ? 'bg-amber-500 animate-pulse' : panel2State === 3 ? 'bg-emerald-500' : 'bg-zinc-300'}`} />
                      <span className="text-[9px] font-bold text-zinc-500">
                        {panel2State === 0 && 'منتظر درخواست'}
                        {panel2State === 1 && 'ارسال داده‌ها...'}
                        {panel2State === 2 && 'اجرای موازی مدل‌ها...'}
                        {panel2State === 3 && 'پاسخ دریافت شد'}
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Sequential Diagram Steps, Pure Visual, No English request/response labels */}
                  <div className="flex justify-between items-center px-4 relative w-full" dir="rtl">
                    
                    {/* step 1 */}
                    <div className="flex flex-col items-center gap-1.5 z-10 w-1/3">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${panel2State >= 1 ? 'bg-luma-pink/10 border-luma-pink text-luma-pink' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400'}`}>
                        <Database size={14} />
                      </div>
                      <span className="text-[8px] font-bold text-zinc-500">درخواست ورودی</span>
                    </div>

                    {/* connector 1 */}
                    <svg className="absolute top-[15px] right-[25%] left-[55%] h-1 pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <line x1="0" y1="5" x2="100" y2="5" stroke={panel2State >= 2 ? '#FF6482' : '#e4e4e7'} strokeWidth="2" strokeDasharray={panel2State === 1 ? '4 4' : 'none'} />
                    </svg>

                    {/* step 2 */}
                    <div className="flex flex-col items-center gap-1.5 z-10 w-1/3">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${panel2State >= 2 ? 'bg-luma-purple/10 border-luma-purple text-luma-purple' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400'}`}>
                        <RefreshCw size={14} className={panel2State === 2 ? 'animate-spin-slow' : ''} />
                      </div>
                      <span className="text-[8px] font-bold text-zinc-500">پردازشگر لوما</span>
                    </div>

                    {/* connector 2 */}
                    <svg className="absolute top-[15px] right-[55%] left-[25%] h-1 pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <line x1="0" y1="5" x2="100" y2="5" stroke={panel2State === 3 ? '#FF6482' : '#e4e4e7'} strokeWidth="2" strokeDasharray={panel2State === 2 ? '4 4' : 'none'} />
                    </svg>

                    {/* step 3 */}
                    <div className="flex flex-col items-center gap-1.5 z-10 w-1/3">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${panel2State === 3 ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400'}`}>
                        <Check size={14} />
                      </div>
                      <span className="text-[8px] font-bold text-zinc-500">پاسخ نهایی</span>
                    </div>

                  </div>

                  {/* Processing stream line indicator */}
                  <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <Motion.div 
                      animate={panel2State === 2 ? { x: ['100%', '-100%'] } : { x: '100%' }}
                      transition={panel2State === 2 ? { repeat: Infinity, duration: 1.2, ease: "linear" } : {}}
                      className="h-full w-1/3 bg-luma-pink rounded-full" 
                    />
                  </div>
                </div>

              </WorkflowCard>
            </div>

            {/* Panel 3: انتشار و اشتراک‌گذاری */}
            <div className="h-full">
              <WorkflowCard accentColor="#FFC964" className="p-8 flex flex-col justify-between h-full min-h-[460px]" index={2}>
                
                {/* Text section */}
                <div className="text-right mb-6" dir="rtl">
                  <span className="text-[10px] text-luma-yellow font-black mb-1.5 block">روش سوم</span>
                  <h3 className="text-2xl font-black text-zinc-950 dark:text-white mb-3 font-sans">انتشار عمومی</h3>
                  <p className="text-xs text-zinc-500 dark:text-gray-400 leading-relaxed font-light">
                    فرآیند خلق‌شده را منتشر نمایید تا با ایجاد یک پیوند اختصاصی امن، سایر کاربران یا تیم شما بتوانند از آن استفاده کنند.
                  </p>
                </div>

                {/* Animation Canvas */}
                <div className="h-48 bg-zinc-50/50 dark:bg-black/30 rounded-2xl border border-zinc-200/50 dark:border-white/5 flex flex-col justify-between p-4 relative overflow-hidden">
                  <div className="flex items-center justify-between" dir="rtl">
                    <span className="text-[10px] text-zinc-400 font-bold">تنظیمات انتشار</span>
                    
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-all duration-300 ${panel3State === 2 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-100 dark:bg-white/5 text-zinc-400'}`}>
                      {panel3State === 2 ? <Globe size={11} /> : <Lock size={11} />}
                      <span className="text-[9px] font-bold">
                        {panel3State === 2 ? 'پیوند عمومی' : 'حالت شخصی'}
                      </span>
                    </div>
                  </div>

                  {/* Flow card model illustration */}
                  <div className="relative flex justify-center w-full">
                    <div className="w-52 p-3 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/10 rounded-xl shadow-sm text-right" dir="rtl">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[10px] font-black text-zinc-800 dark:text-gray-200">فرآیند تولید محتوا</span>
                        <Share2 size={11} className="text-zinc-400" />
                      </div>
                      
                      {/* Generated clean URL */}
                      <AnimatePresence mode="wait">
                        {panel3State >= 1 ? (
                          <Motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-2.5 py-1.5 bg-zinc-50 dark:bg-black/50 border border-zinc-200/40 dark:border-white/5 rounded text-[9px] text-luma-yellow text-left truncate mb-2 font-sans flex items-center justify-between"
                            dir="ltr"
                          >
                            <span className="opacity-40"><Share2 size={8} /></span>
                            <span>luma.ir/wf/shoma</span>
                          </Motion.div>
                        ) : (
                          <div className="h-6 mb-2" />
                        )}
                      </AnimatePresence>

                      <div className="h-1.5 w-full bg-zinc-100 dark:bg-white/5 rounded-full" />
                    </div>
                  </div>

                  {/* Status explanation */}
                  <div className="text-center">
                    <p className="text-[10px] text-zinc-500 dark:text-gray-400 font-bold transition-all duration-300">
                      {panel3State === 0 && 'دسترسی امن فقط برای توسعه‌دهنده.'}
                      {panel3State === 1 && 'در حال ساخت لینک انتشار...'}
                      {panel3State === 2 && 'لینک برای استفاده همگانی فعال است.'}
                    </p>
                  </div>
                </div>

              </WorkflowCard>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
