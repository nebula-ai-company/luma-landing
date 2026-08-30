import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Image as ImageIcon, Video, Music, Clock, Settings, Monitor, ShieldCheck, Play, CheckCircle2 } from 'lucide-react';
import Button from '../../Button';

export const VideoReference: React.FC = () => {
  // Pos states for hover radial light inside the double-bezel card (DESIGN.md)
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  // State machine for our Left Visual Animation (Reference Chips -> Render -> Loop)
  const [phase, setPhase] = useState<'shuffling' | 'rendering' | 'playing'>('shuffling');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;

    const runShowcase = () => {
      // 1. Shuffling / Inputting Refs
      setPhase('shuffling');
      setProgress(0);

      // Transition to rendering after 3 seconds
      timeout = setTimeout(() => {
        setPhase('rendering');
        let currentProg = 0;
        interval = setInterval(() => {
          currentProg += 2.5;
          setProgress(Math.min(currentProg, 100));
          if (currentProg >= 100) {
            clearInterval(interval);
            setPhase('playing');
            // Play for 5 seconds, then repeat
            timeout = setTimeout(runShowcase, 5000);
          }
        }, 50);
      }, 3000);
    };

    runShowcase();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="py-24 bg-[#FBF9F6] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300" dir="rtl">
      {/* Gradient Fades for continuous connection (DESIGN.md) */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      {/* Atmospheric Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 60, -40, 0], y: [0, -30, 30, 0], scale: [1, 1.1, 0.9, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-purple-200/20 dark:bg-purple-950/10 rounded-full blur-[130px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          animate={{ x: [0, -50, 40, 0], y: [0, 40, -40, 0], scale: [1, 0.95, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-rose-200/20 dark:bg-rose-950/10 rounded-full blur-[110px] mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column: Narrative / Features (Order-1 on Mobile, Order-2 on Large RTL screen) */}
          <div className="lg:col-span-5 flex flex-col text-right order-1 lg:order-2">
            
            {/* Upper Badge */}
            <div className="flex justify-start mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/30 backdrop-blur-md shadow-sm"
              >
                <Layers size={14} className="text-luma-purple" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 dir-ltr">Reference-to-Video</span>
              </motion.div>
            </div>

            {/* Title with Gradient Animated Word */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 leading-tight"
            >
              تولید ویدیو از <span className="text-gradient-animated bg-gradient-to-r from-[#DA8FFF] via-[#FF6482] to-[#FFB340] text-transparent bg-clip-text animate-gradient-xy">روی مرجع (Reference)</span>
            </motion.h2>

            {/* Intro Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base text-zinc-600 dark:text-zinc-400 mb-8 leading-dashed leading-8 font-light"
            >
              ساخت ویدیو با ارجاع به چند مرجعِ تصویری، ویدیویی و صوتی برای حفظ سوژه، ریتم و حس بصری در طول ویدیو.
            </motion.p>

            {/* Double-Bezel Card wrapper around Features List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-8"
              ref={cardRef}
              onMouseMove={handleMouseMove}
            >
              <div className="group relative rounded-[24px] p-1 overflow-hidden transition-all duration-300 bg-zinc-200/50 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/60 shadow-sm">
                
                {/* Reveal gradient following cursor */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, rgba(218, 143, 255, 0.15), transparent 40%)` }} 
                />

                <div className="relative bg-white/80 dark:bg-zinc-950/90 rounded-[20px] p-6 md:p-8 border border-zinc-100/50 dark:border-zinc-900 shadow-sm flex flex-col gap-6">
                  
                  {/* Feature 1 */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 text-luma-purple">
                      <ImageIcon size={18} />
                    </div>
                    <div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold mb-1">ورودی‌های مرجع</div>
                      <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                        تا ۹ تصویر مرجع، تا ۳ ویدیوی مرجع، تا ۳ فایل صوتی مرجع
                      </div>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 text-luma-pink">
                      <Clock size={18} />
                    </div>
                    <div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold mb-1">مدت زمان تولید</div>
                      <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                        ۴ تا ۱۵ ثانیه
                      </div>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 text-luma-yellow">
                      <Monitor size={18} />
                    </div>
                    <div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold mb-1">وضوح و رزولوشن</div>
                      <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                        کیفیت خروجی: ۴۸۰p / ۷۲۰p
                      </div>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 text-luma-purple">
                      <Settings size={18} />
                    </div>
                    <div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold mb-1">ابعاد و نسبت تصویر</div>
                      <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide dir-ltr text-right">
                        AUTO / ۳:۴ / ۱:۱ / ۴:۳
                      </div>
                    </div>
                  </div>

                  {/* Feature 5 */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 text-emerald-500">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold mb-1">مدل‌های رندرینگ فعال</div>
                      <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-6 dir-ltr text-right">
                        «Seedance 2.0 Reference» (با صدا، ۱۰۸۰p) و «Seedance 2.0 Reference Fast» (سریع، ۷۲۰p)
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* Action Call Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex justify-start"
            >
              <Button variant="primary" externalHref="https://dash.lumai.ir/">
                تست ویدئوساز هوشمند
              </Button>
            </motion.div>

          </div>

          {/* Left Column: Visual Representation (Order-2 on Mobile, Order-1 on Large screen) */}
          <div className="lg:col-span-7 relative h-[480px] md:h-[540px] flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full h-full max-w-xl bg-zinc-100/40 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-[32px] p-4 shadow-xl flex items-center justify-center overflow-hidden">
              
              {/* Center Screen / Browser Chrome Vibe */}
              <div className="relative w-full h-full bg-white dark:bg-zinc-950 rounded-[24px] border border-zinc-200 dark:border-zinc-900 shadow-2xl flex flex-col overflow-hidden">
                
                {/* Browser top chrome dots */}
                <div className="h-12 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200/80 dark:border-zinc-800/40 flex items-center justify-between px-5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-450 bg-rose-400/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-450 bg-amber-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-450 bg-emerald-400/80" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase dir-ltr">LUMA REF-TO-VIDEO</span>
                </div>

                {/* Inner Stage */}
                <div className="flex-1 relative bg-zinc-900/90 flex flex-col items-center justify-center p-6">
                  
                  {/* Floating Reference Chips Area (Shuffle phase) */}
                  <AnimatePresence>
                    {phase === 'shuffling' && (
                      <motion.div 
                        key="shuffling-area"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-wrap items-center justify-center p-8 gap-3"
                      >
                        {/* Shuffling image references (9 items) */}
                        {Array.from({ length: 9 }).map((_, i) => (
                          <motion.div
                            key={`imgRef-${i}`}
                            initial={{ scale: 0.5, opacity: 0, rotate: Math.random() * 20 - 10 }}
                            animate={{ scale: 1, opacity: 0.9, x: (i % 3 - 1) * 35, y: (Math.floor(i / 3) - 1) * 35 }}
                            transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                            className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/20 shadow-md border border-white/10 flex items-center justify-center text-white/70"
                          >
                            <ImageIcon size={14} />
                          </motion.div>
                        ))}

                        {/* Shuffling video references (3 items) */}
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={`vidRef-${i}`}
                            initial={{ scale: 0.5, opacity: 0, scaleY:-1 }}
                            animate={{ scale: 1, opacity: 0.9, x: (i - 1) * 70, y: 70 }}
                            transition={{ delay: 0.8 + i * 0.12, type: "spring" }}
                            className="w-12 h-10 rounded-lg bg-gradient-to-br from-indigo-500/40 to-blue-500/20 shadow-md border border-white/10 flex items-center justify-center text-white/70"
                          >
                            <Video size={14} />
                          </motion.div>
                        ))}

                        {/* Shuffling sound references (3 items) */}
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={`audioRef-${i}`}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.9, x: (i - 1) * 70, y: -70 }}
                            transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
                            className="w-12 h-10 rounded-lg bg-gradient-to-br from-amber-500/40 to-rose-500/20 shadow-md border border-white/10 flex items-center justify-center text-white/70"
                          >
                            <Music size={14} />
                          </motion.div>
                        ))}

                        {/* Middle Text Info */}
                        <div className="absolute inset-x-0 bottom-6 text-center">
                          <p className="text-[11px] font-mono tracking-widest text-zinc-400 animate-pulse uppercase">دریافت و تحلیل مراجع چندگانه (Refs)</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Rendering Phase with Scanning Beam */}
                  <AnimatePresence>
                    {phase === 'rendering' && (
                      <motion.div
                        key="rendering-area"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#09090b] flex flex-col items-center justify-center"
                      >
                        {/* Scanning Line */}
                        <motion.div
                          className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-luma-purple to-transparent shadow-[0_0_25px_rgba(218,143,255,0.8)] z-30"
                          animate={{ top: ["0%", "100%"] }}
                          transition={{ duration: 1.3, ease: "linear", repeat: Infinity }}
                        />

                        {/* Central Ring Progress */}
                        <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-luma-purple animate-spin mb-4" />
                        <span className="text-[12px] font-bold text-zinc-200 tracking-wider mb-2">در حال ترکیب منابع و رندر ویدیو</span>
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-luma-purple to-luma-pink transition-all duration-75"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-450 text-zinc-400 mt-2">{Math.round(progress)}%</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Success / Playback Phase */}
                  <AnimatePresence>
                    {phase === 'playing' && (
                      <motion.div
                        key="playing-area"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col"
                      >
                        {/* A beautiful glowing video mock with parallax look */}
                        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-purple-900/40 via-amber-900/20 to-black flex items-center justify-center">
                          
                          {/* Animated abstract meshes */}
                          <motion.div 
                            className="absolute w-72 h-72 rounded-full bg-luma-purple/20 blur-3xl"
                            animate={{ 
                              scale: [1, 1.2, 1], 
                              x: [-20, 20, -20],
                              y: [-30, 20, -30] 
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.div 
                            className="absolute w-60 h-60 rounded-full bg-luma-pink/15 blur-3xl"
                            animate={{ 
                              scale: [1.2, 1, 1.2], 
                              x: [30, -30, 30],
                              y: [20, -20, 20] 
                            }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                          />

                          {/* Overlay central indicator */}
                          <div className="relative z-10 flex flex-col items-center">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg"
                            >
                              <Play size={24} className="text-white fill-white ml-1" />
                            </motion.div>
                            <span className="text-xs text-white/80 font-bold mt-4 tracking-widest uppercase bg-black/40 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">خروجی هوشمند لوما</span>
                          </div>

                        </div>

                        {/* Status Footer inside the simulated screen */}
                        <div className="h-12 bg-black/90 border-t border-white/10 px-4 flex items-center justify-between">
                          <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1.5">
                            <CheckCircle2 size={12} /> رندر با موفقیت تکمیل شد
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono tracking-widest dir-ltr">DUR: 00:08</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
