import React from 'react';
import { motion } from 'framer-motion';
import { Zap, DollarSign, Layers, Wand2, Cpu, ScanLine } from 'lucide-react';

const FEATURES = [
  {
    id: 1,
    title: "هوش مصنوعی",
    desc: "تشخیص دقیق لبه‌ها",
    icon: Zap,
    color: "#DA8FFF", // luma-purple
    // Coordinates: Top Left (20, 20)
    position: { top: "20%", left: "20%" }, 
    beamPath: "M 42 42 L 20 20"
  },
  {
    id: 2,
    title: "کاملاً خودکار",
    desc: "بدون دخالت دست",
    icon: Wand2,
    color: "#FF6482", // luma-pink
    // Coordinates: Top Right (80, 20)
    position: { top: "20%", left: "80%" }, 
    beamPath: "M 58 42 L 80 20"
  },
  {
    id: 3,
    title: "کمترین هزینه",
    desc: "۲ لوم / تصویر",
    icon: DollarSign,
    color: "#FFB340", // luma-yellow
    // Coordinates: Bottom Left (20, 80)
    position: { top: "80%", left: "20%" }, 
    beamPath: "M 42 58 L 20 80"
  },
  {
    id: 4,
    title: "کیفیت HD",
    desc: "خروجی لایه‌باز",
    icon: Layers,
    color: "#60A5FA", // blue-400
    // Coordinates: Bottom Right (80, 80)
    position: { top: "80%", left: "80%" }, 
    beamPath: "M 58 58 L 80 80"
  }
];

export const BgRemoveFeatures: React.FC = () => {
  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden min-h-[800px] flex items-center justify-center transition-colors duration-300">
       
       {/* --- Seamless Transition Fade (Top) --- */}
       <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
       
       {/* --- Seamless Transition Fade (Bottom) --- */}
       <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

       {/* Background Ambience */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
       <div className="absolute inset-0 bg-noise opacity-[0.015] dark:opacity-[0.03] pointer-events-none" />
       
       <div className="max-w-screen-xl mx-auto px-4 relative z-10 w-full">
          
          <div className="text-center mb-24 relative font-sans">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 backdrop-blur-md"
             >
                <Cpu size={14} className="text-zinc-500 dark:text-gray-400 animate-spin-slow" />
                <span className="text-[10px] font-bold text-zinc-500 dark:text-gray-400 uppercase tracking-widest">Core Engine 3.0</span>
             </motion.div>
             
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4"
             >
               ویژگی‌های <span className="text-gradient-animated inline-block pb-2">هسته پردازشی</span>
             </motion.h2>
             
             <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-500 dark:text-gray-500 text-sm md:text-base font-light"
             >
                موتور قدرتمند ما چگونه تصاویر شما را متحول می‌کند؟
             </motion.p>
          </div>

          {/* --- Orbit System Container --- */}
          <div className="relative w-full max-w-[700px] aspect-square mx-auto hidden md:block font-sans">
             
             {/* 1. Background Rings (Animated) */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Static base ring */}
                <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 0.2, scale: 1 }}
                   transition={{ duration: 1 }}
                   className="w-[60%] h-[60%] rounded-full border border-black/[0.05] dark:border-white/5"
                />
                
                {/* Outer Ring */}
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 0.1, scale: 1 }}
                   transition={{ duration: 1 }}
                   className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-black/[0.08] dark:border-white/10"
                />

                {/* Rotating Dashed Ring */}
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                   className="absolute w-[100%] h-[100%] rounded-full border border-dashed border-black/[0.04] dark:border-white/5 opacity-30 animate-pulse"
                />
                
                {/* Counter-Rotating Colored Ring Segment */}
                <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                   className="absolute w-[85%] h-[85%] rounded-full border border-black/[0.05] dark:border-white/5 border-t-luma-purple/20 border-b-luma-pink/20"
                />
             </div>

             {/* 2. Connection Beams (SVG) - Z-Index 0 to be behind everything */}
             <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                {FEATURES.map((item) => (
                   <g key={item.id}>
                      {/* Static Base Line */}
                      <path 
                         d={item.beamPath} 
                         stroke={item.color}
                         strokeOpacity="0.2" 
                         strokeWidth="1.5" 
                         fill="none" 
                         strokeLinecap="round"
                      />
                      
                      {/* Traveling Data Packet */}
                      <path 
                         d={item.beamPath} 
                         stroke={item.color} 
                         strokeWidth="2.5" 
                         fill="none" 
                         strokeDasharray="8, 80"
                         strokeLinecap="round"
                      >
                         <animate 
                            attributeName="stroke-dashoffset" 
                            from="88" 
                            to="0" 
                            dur="2s" 
                            repeatCount="indefinite" 
                         />
                         <animate 
                            attributeName="opacity" 
                            values="0;1;0" 
                            dur="2s" 
                            repeatCount="indefinite" 
                         />
                      </path>
                      
                      {/* Connection Dot at End of Line (Hidden behind card, but ensures solidity) */}
                      <circle r="3" fill={item.color} opacity="0.3">
                         <animateMotion dur="2s" repeatCount="indefinite" path={item.beamPath} keyPoints="1;1" keyTimes="0;1" calcMode="linear" />
                      </circle>
                   </g>
                ))}
             </svg>

             {/* 3. Central Core (The Brain) - Z-Index 20 */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div 
                   initial={{ scale: 0, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ type: "spring", stiffness: 200, damping: 20 }}
                   className="relative w-32 h-32 bg-white dark:bg-[#080808] rounded-full border border-black/10 dark:border-white/10 shadow-sm dark:shadow-[0_0_60px_-10px_rgba(218,143,255,0.15)] flex items-center justify-center group"
                >
                   {/* Inner Pulsing Rings */}
                   <div className="absolute inset-0 rounded-full border border-black/[0.05] dark:border-white/5 animate-ping opacity-20" />
                   <div className="absolute inset-2 rounded-full bg-black/[0.02] dark:bg-white/5 border border-black/[0.05] dark:border-white/5 backdrop-blur-sm" />
                   
                   {/* Core Icon */}
                   <div className="relative z-10 flex flex-col items-center gap-1.5">
                      <div className="relative w-10 h-10 flex items-center justify-center">
                         <ScanLine size={28} className="text-zinc-800 dark:text-white opacity-90" />
                         <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-transparent via-luma-purple/50 to-transparent w-full h-1/2"
                            animate={{ top: ["-50%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            style={{ filter: "blur(4px)" }}
                         />
                      </div>
                      <span className="text-[8px] font-bold text-zinc-550 dark:text-gray-500 tracking-[0.25em]">CORE AI</span>
                   </div>
                </motion.div>
             </div>

             {/* 4. Orbiting Features (Nodes) - Z-Index 30 (Above lines) */}
             {FEATURES.map((item, idx) => (
                <motion.div 
                   key={item.id}
                   // Important: Width fixed to ensure centering stability. 
                   // No Scale Animation here to prevent layout shift relative to center.
                   className="absolute z-30 flex flex-col items-center gap-4 w-40 pointer-events-auto"
                   // Use direct style props for Framer Motion to handle transform accurately
                   style={{ 
                      top: item.position.top, 
                      left: item.position.left,
                      x: "-50%", // Centers the w-40 wrapper horizontally
                      y: "-40px" // Centers the 80px card vertically (half height up)
                   }}
                >
                   {/* Icon Card - Height 80px (w-20 h-20) */}
                   <motion.div 
                      className="relative w-20 h-20 rounded-[24px] bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 flex items-center justify-center shadow-lg dark:shadow-2xl group cursor-default"
                      whileHover={{ scale: 1.1, borderColor: item.color, boxShadow: `0 0 40px -10px ${item.color}40` }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                         type: "spring", 
                         stiffness: 100, 
                         delay: 0.2 + (idx * 0.15) 
                      }}
                   >
                      {/* Opaque Background to hide line end */}
                      <div className="absolute inset-0 bg-white dark:bg-[#111] rounded-[24px]" />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/[0.03] dark:from-white/10 to-transparent rounded-[24px]" />
                      
                      {/* Glow on Hover */}
                      <div 
                         className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md"
                         style={{ backgroundColor: item.color }}
                      />

                      <item.icon size={30} style={{ color: item.color }} className="relative z-10 drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
                   </motion.div>

                   {/* Label */}
                   <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (idx * 0.15) }}
                   >
                      <h4 className="text-zinc-900 dark:text-white font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-zinc-550 dark:text-gray-550 text-xs font-medium bg-white/80 dark:bg-black/60 shadow-sm backdrop-blur px-2 py-1 rounded-lg border border-black/5 dark:border-white/5 inline-block">{item.desc}</p>
                   </motion.div>
                </motion.div>
             ))}
          </div>

          {/* --- Mobile View (Stacked Grid) --- */}
          <div className="grid grid-cols-1 gap-4 md:hidden mt-12 font-sans">
             {FEATURES.map((item, idx) => (
                <motion.div 
                   key={item.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-5 rounded-2xl flex items-center gap-5 relative overflow-hidden shadow-sm"
                >
                   {/* Side Color Bar */}
                   <div className="absolute right-0 top-0 bottom-0 w-1" style={{ backgroundColor: item.color }} />
                   
                   <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/5 shrink-0">
                      <item.icon size={24} style={{ color: item.color }} />
                   </div>
                   <div>
                      <h4 className="text-zinc-900 dark:text-white font-bold text-base mb-1">{item.title}</h4>
                      <p className="text-zinc-500 dark:text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                   </div>
                </motion.div>
             ))}
          </div>

       </div>
    </section>
  );
};
