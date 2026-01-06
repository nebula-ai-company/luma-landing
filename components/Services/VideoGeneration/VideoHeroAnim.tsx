
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Film, Loader } from 'lucide-react';

// --- Configuration ---

const SCENARIOS = [
  {
    id: 1,
    prompt: "یک شهر سایبرپانک در زیر باران با نورهای نئونی بنفش و ماشین‌های پرنده، کیفیت سینمایی 8K...",
    videoUrl: "https://famjljl5gg.ufs.sh/f/aej4FOV7nKCWa2gs1JuV7nKCWNQtX5A9MYsSFDeirbP10oRI", // Cyberpunk City
    model: "SORA 2 PRO",
    ratio: "16:9",
    seed: "847291",
    duration: 6000
  },
  {
    id: 2,
    prompt: "تصویر آهسته از برخورد قطره آب با سطح دریاچه در غروب آفتاب، بازتاب نور طلایی...",
    videoUrl: "https://famjljl5gg.ufs.sh/f/aej4FOV7nKCWbhZZGXk6SrQmVWuotE8sHOxYZJIcjiaR7hL9", // Nature Macro
    model: "VEO 3.1",
    ratio: "16:9",
    seed: "102934",
    duration: 6000
  },
  {
    id: 3,
    prompt: "فضانوردی که در سطح مریخ قدم می‌زند، طوفان شن در پس‌زمینه، نورپردازی حماسی...",
    videoUrl: "https://famjljl5gg.ufs.sh/f/aej4FOV7nKCWPLCJ61ZXhV4d3AqmSM8rsKncyzD6NZbel0OE", // Astronaut on Mars
    model: "KLING 2.5",
    ratio: "2.35:1",
    seed: "559201",
    duration: 6000
  }
];

export const VideoHeroAnim = () => {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'generating' | 'playing'>('typing');
  const [typedText, setTypedText] = useState("");
  const [progress, setProgress] = useState(0); // For generation progress
  
  const currentScenario = SCENARIOS[index];
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- Cycle Logic ---
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let typeInterval: ReturnType<typeof setInterval>;
    let genInterval: ReturnType<typeof setInterval>;

    const runCycle = async () => {
      // 1. TYPING PHASE
      setPhase('typing');
      setTypedText("");
      setProgress(0);
      
      let charIndex = 0;
      typeInterval = setInterval(() => {
        if (charIndex <= currentScenario.prompt.length) {
          setTypedText(currentScenario.prompt.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          // Wait a bit after typing finishes
          timeout = setTimeout(startGeneration, 600);
        }
      }, 30); // Typing speed
    };

    const startGeneration = () => {
      // 2. GENERATING PHASE
      setPhase('generating');
      let p = 0;
      genInterval = setInterval(() => {
        p += 2;
        setProgress(p);
        if (p >= 100) {
          clearInterval(genInterval);
          startPlayback();
        }
      }, 40); // Generation duration (~2s)
    };

    const startPlayback = () => {
      // 3. PLAYBACK PHASE
      setPhase('playing');
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn("Video play failed", error);
            });
        }
      }
      
      // Wait for video duration then switch
      timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % SCENARIOS.length);
      }, currentScenario.duration);
    };

    runCycle();

    return () => {
      clearTimeout(timeout);
      clearInterval(typeInterval);
      clearInterval(genInterval);
    };
  }, [index]);

  return (
    <div className="relative w-full h-full bg-[#050505] flex flex-col font-sans select-none rounded-[32px] overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/5 group" dir="rtl">
       
       {/* --- Top UI Bar --- */}
       <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/90 to-transparent z-30 flex items-center justify-between px-8 pt-4">
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2 shadow-lg">
                 <Film size={16} className="text-luma-purple" />
                 <span className="text-xs font-bold text-gray-200 uppercase tracking-widest dir-ltr">{currentScenario.model}</span>
             </div>
             {phase === 'generating' && (
                <div className="px-4 py-2 rounded-xl bg-luma-purple/10 border border-luma-purple/20 flex items-center gap-2 shadow-lg shadow-luma-purple/5">
                    <Loader size={14} className="text-luma-purple animate-spin" />
                    <span className="text-xs font-bold text-luma-purple">در حال پردازش...</span>
                </div>
             )}
          </div>
          
          <div className="flex items-center gap-2">
             <div className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur border border-white/10 text-[10px] text-gray-400 font-mono dir-ltr tracking-wider">
                SEED: {currentScenario.seed}
             </div>
             <div className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur border border-white/10 text-[10px] text-gray-400 font-mono dir-ltr tracking-wider">
                HD 60FPS
             </div>
          </div>
       </div>

       {/* --- Main Viewport --- */}
       <div className="flex-1 relative overflow-hidden bg-[#020202]">
          
          {/* Background Grid (Always visible slightly) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* LAYER 1: VIDEO (The Result) */}
          <motion.div 
             className="absolute inset-0 w-full h-full"
             initial={{ opacity: 0 }}
             animate={{ opacity: phase === 'playing' ? 1 : 0 }}
             transition={{ duration: 0.8 }}
          >
             <video 
                key={currentScenario.videoUrl}
                ref={videoRef}
                src={currentScenario.videoUrl}
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
                preload="auto"
             />
             {/* Vignette Overlay for cinematic look */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,black_100%)] opacity-60" />
          </motion.div>

          {/* LAYER 2: GENERATION EFFECT (Diffusion Simulation) */}
          <AnimatePresence>
            {phase === 'generating' && (
                <motion.div 
                    className="absolute inset-0 z-20 bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Blurred version of video (simulated with image) or Noise */}
                    <div className="absolute inset-0 opacity-30">
                        <svg className="w-full h-full filter contrast-150 brightness-150">
                            <filter id="noise">
                                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                            </filter>
                            <rect width="100%" height="100%" filter="url(#noise)" />
                        </svg>
                    </div>

                    {/* Scanning Beam */}
                    <motion.div 
                        className="absolute left-0 right-0 h-2 bg-luma-purple/50 shadow-[0_0_50px_rgba(218,143,255,0.8)] blur-sm"
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                    />

                    {/* Center Progress */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-2 border-white/10 border-t-luma-purple animate-spin mb-8" />
                        <div className="text-white font-bold text-lg tracking-widest mb-3">در حال رندر ویدیو</div>
                        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-luma-purple"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

          {/* LAYER 3: INPUT PHASE (Dark Overlay) */}
          <AnimatePresence>
             {phase === 'typing' && (
                <motion.div 
                   className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                />
             )}
          </AnimatePresence>

       </div>

       {/* --- Bottom Controls (Floating Prompt) --- */}
       <div className="absolute bottom-10 left-10 right-10 z-40">
          <div className="bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
             
             {/* Header of Input */}
             <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2 text-luma-purple">
                   <Sparkles size={18} />
                   <span className="text-xs font-bold uppercase tracking-wider">دستور ساخت (Prompt)</span>
                </div>
                {phase === 'playing' && (
                   <span className="text-xs text-green-400 flex items-center gap-1.5 font-bold">
                      <Check size={14} /> تکمیل شد
                   </span>
                )}
             </div>

             {/* Prompt Text */}
             <div className="relative min-h-[32px]">
                <p className="text-base text-white/90 leading-relaxed font-light text-right">
                   {typedText}
                   {phase === 'typing' && <span className="inline-block w-0.5 h-5 bg-luma-purple mr-1 align-middle animate-pulse" />}
                </p>
             </div>

             {/* Progress Line (Timeline) */}
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1">
                {phase === 'playing' && (
                   <motion.div 
                      className="h-full bg-gradient-to-r from-luma-purple to-luma-pink"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: currentScenario.duration / 1000, ease: "linear" }}
                   />
                )}
             </div>
          </div>
       </div>

       {/* --- Playback Controls Overlay (Fake) --- */}
       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none" />
       
       <AnimatePresence>
          {phase === 'playing' && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
             >
                {/* Play Icon Flash */}
                <motion.div 
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1.2, opacity: 0 }}
                   transition={{ duration: 0.8 }}
                   className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm"
                >
                   <Play size={40} className="text-white fill-white ml-2" />
                </motion.div>
             </motion.div>
          )}
       </AnimatePresence>

    </div>
  );
};

// Simple Icon for check
function Check({ size, className }: { size: number, className?: string }) {
   return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
         <polyline points="20 6 9 17 4 12" />
      </svg>
   )
}
