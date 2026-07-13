import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal, Share2, Check, RefreshCw, Send, Lock, Globe } from 'lucide-react';

const Motion = motion as any;

export const WorkflowExecution: React.FC = () => {
  // Anim timers
  const [panel1State, setPanel1State] = useState(0); // 0: idle, 1: clicking, 2: executing, 3: completed
  const [panel2State, setPanel2State] = useState(0); // 0: idle, 1: receiving, 2: compiling, 3: returning
  const [panel3State, setPanel3State] = useState(0); // 0: private, 1: sharing, 2: published

  // Panel 1 Loop (Manual Run)
  useEffect(() => {
    const timer = setInterval(() => {
      setPanel1State((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Panel 2 Loop (API Call)
  useEffect(() => {
    const timer = setInterval(() => {
      setPanel2State((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  // Panel 3 Loop (Publish)
  useEffect(() => {
    const timer = setInterval(() => {
      setPanel3State((prev) => (prev + 1) % 3);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-luma-purple/5 dark:bg-luma-purple/[0.01] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-luma-purple/10 border border-luma-purple/20 text-xs font-black text-luma-purple uppercase tracking-wider mb-4"
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
            Workflow را در پنل اجرا کنید، از طریق API فراخوانی کنید یا برای استفاده دیگران منتشر کنید.
          </Motion.p>
        </div>

        {/* 3 Connected Panels Layout */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Subtle Horizontal Connect Line on Desktop */}
          <div className="hidden lg:block absolute top-[140px] left-1/6 right-1/6 h-[1.5px] bg-gradient-to-r from-luma-purple/10 via-luma-pink/30 to-luma-yellow/10 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            
            {/* Panel 1: اجرای دستی */}
            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white dark:bg-[#0c0c0c] border border-zinc-200/60 dark:border-white/5 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300 shadow-sm min-h-[440px] group"
            >
              <div>
                <span className="text-xs font-mono text-luma-purple font-bold mb-1 block">METHOD 01</span>
                <h3 className="text-2xl font-black text-zinc-950 dark:text-white mb-3 font-sans group-hover:text-luma-purple transition-colors">اجرای دستی</h3>
                <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light mb-8">
                  Workflow را مستقیماً از محیط لوما اجرا و نتیجه را مشاهده کنید.
                </p>
              </div>

              {/* Animation Graphic 1 */}
              <div className="h-48 bg-zinc-50 dark:bg-black/40 rounded-2xl border border-zinc-200/40 dark:border-white/5 flex flex-col justify-between p-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 font-medium">Luma Panel / Run</span>
                  
                  {/* Glowing execution state indicator */}
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${panel1State === 2 ? 'bg-amber-500 animate-pulse' : panel1State === 3 ? 'bg-emerald-500' : 'bg-zinc-300'}`} />
                    <span className="text-[9px] font-mono uppercase text-zinc-500">
                      {panel1State === 0 && 'آماده'}
                      {panel1State === 1 && 'ارسال درخواست...'}
                      {panel1State === 2 && 'پردازش فرآیند...'}
                      {panel1State === 3 && 'کامل شد'}
                    </span>
                  </div>
                </div>

                {/* Simulated Visual Nodes */}
                <div className="flex justify-between items-center px-4 relative">
                  {/* Start Node */}
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors duration-300 ${panel1State >= 1 ? 'bg-luma-purple/20 border-luma-purple text-luma-purple' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400'}`}>
                    <Play size={12} fill="currentColor" />
                  </div>

                  {/* SVG connecting path */}
                  <svg className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 pointer-events-none px-12" dir="ltr">
                    <line x1="0" y1="4" x2="100%" y2="4" stroke={panel1State === 2 ? '#FF6482' : '#e4e4e7'} strokeWidth="1.5" strokeDasharray={panel1State === 2 ? '4 4' : 'none'} className={panel1State === 2 ? 'animate-pulse' : ''} />
                  </svg>

                  {/* End Node */}
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors duration-300 ${panel1State === 3 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400'}`}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                </div>

                {/* Simulation controls */}
                <div className="flex justify-center">
                  <button 
                    className={`h-9 px-6 rounded-xl font-sans font-black text-xs flex items-center gap-2 transition-all duration-300 ${
                      panel1State === 1 
                        ? 'bg-luma-purple text-black scale-95 shadow-md shadow-luma-purple/20' 
                        : panel1State === 2 
                        ? 'bg-zinc-200 dark:bg-white/10 text-zinc-500 cursor-not-allowed'
                        : 'bg-zinc-900 text-white dark:bg-white dark:text-black hover:scale-102'
                    }`}
                  >
                    {panel1State === 2 ? (
                      <RefreshCw size={12} className="animate-spin" />
                    ) : (
                      <Play size={12} fill="currentColor" />
                    )}
                    <span>اجرای فرآیند</span>
                  </button>
                </div>
              </div>
            </Motion.div>

            {/* Panel 2: اجرای API */}
            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-white dark:bg-[#0c0c0c] border border-zinc-200/60 dark:border-white/5 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300 shadow-sm min-h-[440px] group"
            >
              <div>
                <span className="text-xs font-mono text-luma-pink font-bold mb-1 block">METHOD 02</span>
                <h3 className="text-2xl font-black text-zinc-950 dark:text-white mb-3 font-sans group-hover:text-luma-pink transition-colors">اجرای API</h3>
                <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light mb-8">
                  فرآیند ساخته‌شده را از محصول یا سرویس خود فراخوانی کنید.
                </p>
              </div>

              {/* Animation Graphic 2 */}
              <div className="h-48 bg-zinc-50 dark:bg-black/40 rounded-2xl border border-zinc-200/40 dark:border-white/5 flex flex-col justify-between p-4 relative overflow-hidden font-mono">
                <div className="flex items-center justify-between border-b border-zinc-200/40 dark:border-white/5 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Terminal size={12} className="text-luma-pink" />
                    <span className="text-[9px] text-zinc-400">REST API CLIENT</span>
                  </div>
                </div>

                {/* Code console request and response */}
                <div className="flex-1 flex flex-col justify-center text-[10px] gap-2 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-luma-pink font-bold">Request:</span>
                    <Motion.div 
                      animate={panel2State >= 1 ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                      className="text-zinc-500"
                    >
                      POST /run_workflow
                    </Motion.div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-bold">Status:</span>
                    <span className="text-zinc-400">
                      {panel2State === 2 ? 'پردازش نهایی...' : panel2State === 3 ? '۲۰۰ OK' : 'در انتظار...'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">Response:</span>
                    <Motion.div 
                      animate={panel2State === 3 ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                      className="text-zinc-400 font-sans font-bold"
                    >
                      نتیجه با موفقیت دریافت شد
                    </Motion.div>
                  </div>
                </div>

                {/* Processing bar */}
                <div className="w-full h-1 bg-zinc-200 dark:bg-white/5 rounded-full overflow-hidden">
                  <Motion.div 
                    animate={panel2State === 2 ? { x: ['-100%', '100%'] } : { x: '-100%' }}
                    transition={panel2State === 2 ? { repeat: Infinity, duration: 1 } : {}}
                    className="h-full w-1/3 bg-luma-pink rounded-full" 
                  />
                </div>
              </div>
            </Motion.div>

            {/* Panel 3: انتشار و اشتراک‌گذاری */}
            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-white dark:bg-[#0c0c0c] border border-zinc-200/60 dark:border-white/5 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300 shadow-sm min-h-[440px] group"
            >
              <div>
                <span className="text-xs font-mono text-luma-yellow font-bold mb-1 block">METHOD 03</span>
                <h3 className="text-2xl font-black text-zinc-950 dark:text-white mb-3 font-sans group-hover:text-luma-yellow transition-colors">انتشار و اشتراک‌گذاری</h3>
                <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light mb-8">
                  Workflow خود را منتشر کنید و دسترسی به آن را با دیگران به اشتراک بگذارید.
                </p>
              </div>

              {/* Animation Graphic 3 */}
              <div className="h-48 bg-zinc-50 dark:bg-black/40 rounded-2xl border border-zinc-200/40 dark:border-white/5 flex flex-col justify-between p-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 font-medium">تنظیمات دسترسی</span>
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded ${panel3State === 2 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-100 dark:bg-white/5 text-zinc-400'}`}>
                    {panel3State === 2 ? (
                      <Globe size={10} />
                    ) : (
                      <Lock size={10} />
                    )}
                    <span className="text-[9px] font-bold">
                      {panel3State === 2 ? 'عمومی' : 'خصوصی'}
                    </span>
                  </div>
                </div>

                {/* Workflow Card Instance */}
                <div className="relative flex justify-center">
                  <div className="w-48 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] font-bold text-zinc-800 dark:text-gray-200">فرآیند خلاق</span>
                      <Share2 size={10} className="text-zinc-400" />
                    </div>
                    
                    {/* Share Link container */}
                    <AnimatePresence>
                      {panel3State >= 1 && (
                        <Motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-2 py-1 bg-zinc-50 dark:bg-black/40 border border-zinc-200/50 dark:border-white/5 rounded text-[8px] text-luma-yellow font-mono truncate text-left mb-2"
                        >
                          lumai.ir/wf/creative_flow
                        </Motion.div>
                      )}
                    </AnimatePresence>

                    <div className="h-1 w-full bg-zinc-100 dark:bg-white/5 rounded" />
                  </div>
                </div>

                {/* Status caption */}
                <div className="text-center">
                  <p className="text-[10px] text-zinc-400 dark:text-gray-500">
                    {panel3State === 0 && 'فقط شما دسترسی دارید.'}
                    {panel3State === 1 && 'در حال ساخت لینک عمومی...'}
                    {panel3State === 2 && 'هر کسی با لینک می‌تواند اجرا کند.'}
                  </p>
                </div>
              </div>
            </Motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
