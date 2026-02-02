
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Palette, Clapperboard, Video, Wand2 } from 'lucide-react';
import { fetchGalleryAssets } from '../../../Gallery/data';

// Bypass type issues with framer-motion props
const Motion = motion as any;

export const ContentWorkflowAnim = () => {
  const [step, setStep] = useState(1); 
  // 1: Script (Typing)
  // 2: Video Gen (Raw/Loading)
  // 3: Color Grade (Polished)

  const [videoSrc, setVideoSrc] = useState("https://famjljl5gg.ufs.sh/f/aej4FOV7nKCWa2gs1JuV7nKCWNQtX5A9MYsSFDeirbP10oRI");
  const scriptText = "خارجی. شب. خیابان‌های نئو-توکیو.\nباران به شدت می‌بارد. نورهای نئون در چاله‌های آب منعکس می‌شوند.\nیک موتورسوار با سرعت عبور می‌کند...";
  const [displayedScript, setDisplayedScript] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Fetch real video
    const loadVideo = async () => {
        try {
            const data = await fetchGalleryAssets('video-gen');
            const valid = data.find(v => v.videoUrl);
            if(valid) {
                setVideoSrc(valid.videoUrl!);
            }
        } catch (e) {
            console.error("Failed to load content workflow video", e);
        }
    };
    loadVideo();
  }, []);

  useEffect(() => {
     const duration = 13500; 
     
     // Typing effect logic
     let typeInterval: ReturnType<typeof setInterval>;
     
     const cycle = () => {
        setStep(1); // Script
        setDisplayedScript("");
        let charIndex = 0;
        
        // Start typing after a brief pause
        setTimeout(() => {
            if (typeInterval) clearInterval(typeInterval);
            typeInterval = setInterval(() => {
                if (charIndex <= scriptText.length) {
                    setDisplayedScript(scriptText.slice(0, charIndex));
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, 500);

        setTimeout(() => {
            setStep(2); // Video Gen
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
            }
        }, 4500); 

        setTimeout(() => setStep(3), 9000); // Color Grade
     };
     
     // Initial run
     cycle();
     const interval = setInterval(cycle, duration);
     
     return () => { 
         clearInterval(interval); 
         clearInterval(typeInterval);
     };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#0a0a0a] flex flex-col font-sans select-none rounded-[32px] overflow-hidden border border-white/10">
       
       {/* --- Visual Area (Full Bleed) --- */}
       <div className="relative flex-1 w-full h-full overflow-hidden bg-black">
          
          {/* STEP 1: Smart Scriptwriting */}
          <Motion.div 
             className="absolute inset-0 bg-[#080808] flex items-center justify-center p-8 z-20"
             animate={{ opacity: step === 1 ? 1 : 0 }}
             transition={{ duration: 0.8 }}
          >
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
             {/* Floating Code/Script Elements */}
             <div className="w-full max-w-sm space-y-4 relative z-10 dir-rtl text-right">
                <div className="flex items-center gap-2 mb-6">
                   <div className="w-8 h-8 rounded-lg bg-luma-purple/20 flex items-center justify-center text-luma-purple border border-luma-purple/30">
                      <Bot size={16} />
                   </div>
                   <span className="text-xs font-bold text-luma-purple tracking-wide">سناریو نویسی هوشمند</span>
                </div>
                
                <div className="font-mono text-sm text-gray-300 leading-8 whitespace-pre-line min-h-[100px]">
                    {displayedScript}
                    {step === 1 && <span className="inline-block w-1.5 h-4 bg-luma-purple align-middle mr-1 animate-pulse" />}
                </div>
             </div>
          </Motion.div>

          {/* STEP 2 & 3: Video Generation & Color Grading */}
          <Motion.div 
             className="absolute inset-0 z-10 bg-black flex items-center justify-center overflow-hidden"
             animate={{ opacity: step >= 2 ? 1 : 0 }}
             transition={{ duration: 0.5 }}
          >
             {/* Video Layer */}
             <Motion.video 
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
                animate={{ 
                    filter: step === 3 ? 'contrast(1.1) saturate(1.2) brightness(1.1)' : 'contrast(0.7) saturate(0.2) brightness(0.7) blur(4px)',
                    scale: step === 3 ? 1.05 : 1
                }}
                transition={{ duration: 1.5 }}
             />
             
             {/* Step 2 Overlay: Generating UI */}
             <AnimatePresence>
                {step === 2 && (
                    <Motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-luma-purple animate-spin" />
                            <div className="bg-black/60 backdrop-blur px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-white flex items-center gap-2">
                                <Video size={14} className="text-luma-purple" />
                                <span>در حال رندر ویدیو...</span>
                            </div>
                        </div>
                    </Motion.div>
                )}
             </AnimatePresence>

             {/* Step 3 Overlay: Color Grade UI */}
             <AnimatePresence>
                {step === 3 && (
                    <Motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md border border-luma-purple/50 text-luma-purple px-4 py-2 rounded-xl text-[10px] font-bold shadow-xl flex items-center gap-2"
                    >
                        <Palette size={14} />
                        <span>اصلاح رنگ سینمایی</span>
                    </Motion.div>
                )}
             </AnimatePresence>
          </Motion.div>

       </div>

       {/* --- Progress Steps Bar --- */}
       <div className="h-16 bg-[#0a0a0a] border-t border-white/5 flex items-center px-4 gap-2 shrink-0 relative z-20" dir="rtl">
          {[
             { label: 'سناریو نویسی', id: 1, icon: Bot },
             { label: 'تولید ویدیو', id: 2, icon: Clapperboard },
             { label: 'اصلاح رنگ', id: 3, icon: Wand2 }
          ].map((item, i) => {
             const isActive = step === item.id;
             let activeClass = "border-transparent bg-transparent text-gray-600"; 
             if (isActive) {
                activeClass = "bg-luma-purple/10 border-luma-purple/20 text-luma-purple border shadow-[0_0_15px_rgba(218,143,255,0.1)] scale-105";
             } else if (step > item.id) {
                activeClass = "bg-white/5 text-gray-400 border-transparent";
             }
             return (
                <div key={i} className={`flex-1 h-10 rounded-xl flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-bold transition-all duration-500 border ${activeClass}`}>
                   <item.icon size={14} />
                   <span className="hidden sm:inline">{item.label}</span>
                </div>
             );
          })}
       </div>
       
       {/* Progress Line */}
       <div className="h-0.5 bg-white/5 w-full relative overflow-hidden shrink-0">
          <Motion.div 
             className="absolute inset-y-0 right-0 h-full bg-luma-purple"
             initial={{ width: "0%" }}
             animate={{ width: `${(step / 3) * 100}%` }}
             transition={{ duration: 0.5 }}
          />
       </div>
    </div>
  );
};
