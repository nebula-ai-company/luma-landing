
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Scan, Maximize2, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';

export const UpscaleHeroAnim = () => {
  const [data, setData] = useState({
    before: "https://luma-assets.fsn1.your-objectstorage.com/-/0362259310c34ad49faa18510d056f13.jpg", // Swapped to correct flow
    after: "https://luma-assets.fsn1.your-objectstorage.com/-/1799da47d81f469491fcedd18e769f66.jpg",  // Swapped to correct flow
    dimensions: "2816 x 1536",
    model: "NANO BANANA PRO"
  });

  const [loading, setLoading] = useState(true);
  
  // Motion Values
  const spotlightX = useMotionValue(50); // Percentage
  const spotlightY = useMotionValue(50); // Percentage
  const spotlightR = useMotionValue(0);  // Percentage (Radius)

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://luma-upload-center.pages.dev/api/public/assets?serviceType=upscale');
        if (response.ok) {
          const result = await response.json();
          if (result.assets && result.assets.length > 0) {
            const latest = result.assets[0];
            if (latest.thumbnailUrl && latest.thumbnailUrlBefore) {
                setData({
                    before: latest.thumbnailUrl,       // Swapped based on user request
                    after: latest.thumbnailUrlBefore,  // Swapped based on user request
                    dimensions: latest.dimensions ? latest.dimensions.replace('x', ' x ') : "4K",
                    model: latest.modelUsed || "NANO BANANA PRO"
                });
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch upscale hero data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animation Loop
  useEffect(() => {
    let mounted = true;
    let animations: any[] = [];

    const sequence = async () => {
      while (mounted) {
        // 1. Reset (Hidden Spotlight)
        spotlightR.set(0);
        spotlightX.set(20);
        spotlightY.set(50);
        
        // Wait on "Before" image
        await new Promise(r => setTimeout(r, 2000));
        if (!mounted) break;

        // 2. Open Spotlight (Reveal Detail)
        const a1 = animate(spotlightR, 25, { duration: 0.8, ease: "easeOut" });
        animations.push(a1);
        await a1;
        if (!mounted) break;

        // 3. Scan Movement (Move Spotlight)
        // Move Right
        const a2x = animate(spotlightX, 80, { duration: 2, ease: "easeInOut" });
        const a2y = animate(spotlightY, 40, { duration: 2, ease: "easeInOut" });
        animations.push(a2x, a2y);
        await Promise.all([a2x, a2y]);
        if (!mounted) break;
        
        // Move Center
        const a3x = animate(spotlightX, 50, { duration: 1.5, ease: "easeInOut" });
        const a3y = animate(spotlightY, 50, { duration: 1.5, ease: "easeInOut" });
        animations.push(a3x, a3y);
        await Promise.all([a3x, a3y]);
        if (!mounted) break;

        // 4. Expand to Full (Show Full High Res)
        const a4 = animate(spotlightR, 150, { duration: 1.5, ease: "circIn" });
        animations.push(a4);
        await a4;
        if (!mounted) break;

        // 5. Hold Full High Res
        await new Promise(r => setTimeout(r, 4000));
      }
    };

    sequence();
    return () => { 
        mounted = false; 
        animations.forEach(a => a.stop());
    };
  }, []);

  // Create the clip-path string dynamically
  const clipPath = useTransform(
    [spotlightX, spotlightY, spotlightR],
    ([x, y, r]) => `circle(${r}% at ${x}% ${y}%)`
  );

  return (
    <div className="relative w-full h-full bg-[#080808] flex flex-col font-sans select-none rounded-[32px] overflow-hidden border border-white/10 shadow-2xl group">
       
       {/* --- Header --- */}
       <div className="h-14 border-b border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-30 relative">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-luma-yellow/20 to-luma-purple/20 border border-white/10 flex items-center justify-center">
                 <Maximize2 size={16} className="text-luma-yellow" />
             </div>
             <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">موتور ارتقاء کیفیت</span>
                 <span className="text-[9px] text-luma-yellow font-bold">وضوح کریستالی</span>
             </div>
          </div>
          
          {/* Status Indicator */}
          <motion.div 
             className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/5"
          >
             <motion.div 
                style={{ opacity: useTransform(spotlightR, r => r > 100 ? 0 : 1) }}
             >
                <div className="flex items-center gap-2">
                    <AlertCircle size={12} className="text-gray-500" />
                    <span className="text-[10px] text-gray-400 font-bold">Original</span>
                </div>
             </motion.div>
             
             <div className="w-px h-3 bg-white/10" />
             
             <motion.div 
                style={{ opacity: useTransform(spotlightR, r => r > 0 ? 1 : 0.3) }}
             >
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-luma-yellow" />
                    <span className="text-[10px] text-luma-yellow font-bold">Upscaled</span>
                </div>
             </motion.div>
          </motion.div>
       </div>

       {/* --- Canvas --- */}
       <div className="flex-1 relative overflow-hidden bg-[#050505] flex items-center justify-center">
          
          {/* 1. Low Res Layer (Background) */}
          <div className="absolute inset-0 z-0">
             <img 
                src={data.before} 
                className="w-full h-full object-cover filter blur-[1px] opacity-80 scale-105" // Subtle blur to emphasize low quality
                alt="Original Low Res"
             />
             <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* 2. High Res Layer (Revealed by Spotlight) */}
          <motion.div 
             className="absolute inset-0 z-10 w-full h-full"
             style={{ clipPath }}
          >
             <img 
                src={data.after} 
                className="w-full h-full object-cover scale-105" // Match scale of background
                alt="Upscaled High Res"
             />
             
             {/* Glow effect inside the spotlight (Optional overlay) */}
             <div className="absolute inset-0 ring-1 ring-white/20 inset-shadow pointer-events-none" />
          </motion.div>

          {/* 3. The Spotlight Ring (Visual UI) */}
          <SpotlightRing x={spotlightX} y={spotlightY} r={spotlightR} />

       </div>

       {/* --- Footer Controls --- */}
       <div className="h-14 bg-[#0a0a0a] border-t border-white/5 flex items-center px-6 justify-between shrink-0 z-30 relative">
          <div className="flex gap-4">
             <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-bold uppercase">رزولوشن</span>
                <span className="text-[10px] text-white font-mono dir-ltr text-right">{data.dimensions}</span>
             </div>
             <div className="w-px h-6 bg-white/10" />
             <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-bold uppercase">مدل</span>
                <span className="text-[10px] text-luma-yellow font-bold">{data.model}</span>
             </div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-gray-500">
             <Zap size={14} />
          </div>
       </div>
    </div>
  );
};

// Helper Component for the visual ring of the spotlight
const SpotlightRing = ({ x, y, r }: { x: any, y: any, r: any }) => {
    // We only want to show the ring when r > 0 and r < 100 (not full screen)
    const opacity = useTransform(r, [0, 5, 90, 150], [0, 1, 1, 0]);
    
    return (
        <motion.div 
            className="absolute pointer-events-none z-20 flex items-center justify-center"
            style={{ 
                left: useTransform(x, v => `${v}%`), 
                top: useTransform(y, v => `${v}%`),
                opacity,
                width: useTransform(r, (v: number) => `${v * 2}%`), // Diameter = 2 * Radius % (approx)
                height: useTransform(r, (v: number) => `${v * 2}%`) // Ideally we'd use aspect ratio fix, but % works for responsive
            }}
        >
            {/* Centering the div */}
            <div className="w-full h-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.3)] box-content relative">
                {/* Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-50">
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white" />
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-white" />
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-luma-yellow text-black px-2 py-0.5 rounded text-[9px] font-bold shadow-lg whitespace-nowrap">
                    Enhancing...
                </div>
            </div>
        </motion.div>
    );
};
