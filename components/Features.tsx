import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, Bot, Wallet, Terminal, Sparkles, 
  Image as ImageIcon, Video, Shirt, Wand2, 
  Scissors, Maximize2, MessageSquare, Gem,
  Cpu, FileText
} from 'lucide-react';

// --- Static Data for Particles ---
const PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  x: (Math.random() - 0.5) * 600, 
  y: (Math.random() - 0.5) * 400, 
  scale: Math.random() * 0.5 + 0.5,
  opacity: Math.random() * 0.5 + 0.5,
  delay: Math.random() * 2,
  duration: Math.random() * 3 + 3 
}));

// --- Prompt Data for Animation Loop ---
const PROMPT_DATA = [
  { input: "یک گربه فضانورد", tags: ["Cinematic", "Cat"], main: "Cat", color: "text-luma-pink" },
  { input: "غروب در کویر", tags: ["8k", "Sunset"], main: "Desert", color: "text-luma-yellow" },
  { input: "ماشین کلاسیک", tags: ["Vintage", "Car"], main: "Auto", color: "text-blue-400" },
  { input: "شهر سایبرپانک", tags: ["Neon", "City"], main: "Cyber", color: "text-luma-purple" },
  { input: "قلعه باستانی", tags: ["Fantasy", "Epic"], main: "Castle", color: "text-emerald-400" }
];

// --- Reusable Feature Card with Glow Effect ---
const FeatureCard = ({ 
  children, 
  className = "",
  glowColor = "#ffffff",
  delay = 0
}: { 
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      whileHover="active"
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } }
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative group rounded-[40px] p-px overflow-hidden transition-transform duration-500 hover:-translate-y-1 ${className}`}
      style={{ 
        backgroundColor: 'rgba(255,255,255,0.03)',
      }}
    >
      {/* Dynamic Border Gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
        style={{
          background: `radial-gradient(1200px circle at ${position.x}px ${position.y}px, ${glowColor}50, transparent 40%)`
        }}
      />

      {/* Inner Content Background */}
      <div className="relative h-full bg-[#050505] rounded-[39px] overflow-hidden flex flex-col">
        
        {/* Unified Background Gradient */}
        <div 
           className="absolute bottom-0 left-0 right-0 h-3/4 opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
           style={{
             background: `linear-gradient(to top, ${glowColor}, transparent)`
           }}
        />

        {/* Subtle Inner Glow following cursor */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(1000px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`
          }}
        />
        
        {/* Background Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        
        {children}
      </div>
    </motion.div>
  );
};

// --- Specialized Animation Constants ---
const SATELLITE_POSITIONS = [
  { id: 'img-gen', label: 'ساخت تصویر', icon: ImageIcon, x: 50, y: 15, color: '#FF6482', delay: 0 },
  { id: 'video', label: 'ساخت ویدیو', icon: Video, x: 75, y: 25, color: '#DA8FFF', delay: 0.1 },
  { id: 'img-edit', label: 'ویرایش تصویر', icon: Wand2, x: 85, y: 50, color: '#60A5FA', delay: 0.2 },
  { id: 'upscale', label: 'افزایش کیفیت', icon: Maximize2, x: 75, y: 75, color: '#4ADE80', delay: 0.3 },
  { id: 'bg-remove', label: 'حذف پس‌زمینه', icon: Scissors, x: 50, y: 85, color: '#F472B6', delay: 0.4 },
  { id: 'try-on', label: 'پرو مجازی', icon: Shirt, x: 25, y: 75, color: '#FFB340', delay: 0.5 },
  { id: 'assistant', label: 'دستیار هوشمند', icon: Bot, x: 15, y: 50, color: '#FACC15', delay: 0.6 },
  { id: 'chat', label: 'چت هوشمند', icon: MessageSquare, x: 25, y: 25, color: '#A78BFA', delay: 0.7 }
];

const Features: React.FC = () => {
  // Cycle through prompts
  const [promptIndex, setPromptIndex] = useState(0);

  // Driven by onAnimationComplete to ensure loop only happens when active
  const handleAnimationComplete = () => {
    setPromptIndex((prev) => (prev + 1) % PROMPT_DATA.length);
  };

  const currentPrompt = PROMPT_DATA[promptIndex];

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-luma-purple/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-luma-pink/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md"
          >
             <Sparkles className="text-luma-yellow" size={14} />
             <span className="text-gray-300 font-medium text-xs tracking-wide">ویژگی‌های کلیدی</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            تجربه <span className="text-gradient-animated">نهایت قدرت</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg font-light leading-relaxed px-4"
          >
            ما مجموعه‌ای از برترین مدل‌های هوش مصنوعی جهان را در یک پلتفرم یکپارچه، بومی و مهندسی‌شده برای شما گردآوری کرده‌ایم.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 auto-rows-[minmax(300px,auto)]">
          
          {/* Card 1: Visual Ecosystem */}
          <FeatureCard 
            className="md:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[550px]"
            glowColor="#DA8FFF"
          >
            {/* Header Content */}
            <div className="p-8 md:p-10 flex flex-col relative z-20 pointer-events-none h-full">
               <div>
                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-luma-purple/20 to-luma-purple/5 border border-luma-purple/20 flex items-center justify-center mb-6 text-luma-purple shadow-[0_0_30px_rgba(218,143,255,0.1)]">
                    <Layers size={28} />
                 </div>
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">اکوسیستم جامع بصری</h3>
                 <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    دسترسی آنی به قدرتمندترین و پیشرفته‌ترین مدل‌های هوش مصنوعی جهان در یک پلتفرم یکپارچه. مجموعه‌ای کامل از تمام ابزارهای مورد نیاز شما برای تولید و ویرایش حرفه‌ای محتوا.
                 </p>
               </div>
            </div>

            {/* Animation Area */}
            <div className="absolute inset-x-0 bottom-0 h-[70%] flex items-center justify-center pointer-events-none">
              <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full overflow-visible">
                   <circle cx="50%" cy="50%" r="42%" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                   <circle cx="50%" cy="50%" r="25%" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
                   <motion.circle 
                      cx="50%" cy="50%" r="34%" 
                      fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="6 6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "50% 50%" }}
                   />
                </svg>

                <svg className="absolute inset-0 w-full h-full overflow-visible z-10">
                   {SATELLITE_POSITIONS.map((sat, i) => (
                      <motion.line
                        key={sat.id}
                        x1="50%" y1="50%" x2={`${sat.x}%`} y2={`${sat.y}%`}
                        stroke={sat.color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileHover={{
                          pathLength: [0, 1, 1, 0],
                          opacity: [0, 1, 1, 0],
                          pathOffset: [0, 0, 1, 1],
                          transition: { 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            times: [0, 0.4, 0.6, 1],
                            delay: sat.delay
                          }
                        }}
                      />
                   ))}
                </svg>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <motion.div 
                       className="relative w-24 h-24 bg-[#0F0F0F] rounded-[24px] border border-white/10 flex items-center justify-center z-20 shadow-2xl overflow-hidden"
                       whileHover={{
                          scale: [1, 1.05, 1],
                          boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 30px rgba(218,143,255,0.2)", "0 0 0px rgba(0,0,0,0)"],
                          transition: { duration: 2, repeat: Infinity }
                       }}
                    >
                       <motion.div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100"
                          style={{
                              background: 'linear-gradient(135deg, rgba(218,143,255,0.2), rgba(0,0,0,0), rgba(255,100,130,0.2))',
                              backgroundSize: '200% 200%'
                          }}
                          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                       />
                       <div className="absolute inset-0 rounded-[24px] border border-luma-purple/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="relative z-10 flex flex-col items-center gap-1">
                          <Cpu size={32} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                          <div className="px-1.5 py-0.5 rounded bg-white/10 border border-white/5 text-[8px] font-mono text-gray-400 uppercase tracking-widest">Core</div>
                       </div>
                    </motion.div>
                </div>

                {SATELLITE_POSITIONS.map((sat) => (
                   <div 
                      key={sat.id}
                      className="absolute z-20 flex flex-col items-center gap-3"
                      style={{ left: `${sat.x}%`, top: `${sat.y}%`, transform: 'translate(-50%, -50%)' }}
                   >
                      <motion.div
                         className="relative w-14 h-14 rounded-2xl bg-[#151515] border border-white/10 flex items-center justify-center shadow-xl group/node cursor-pointer"
                         initial={{ scale: 1 }}
                         whileHover={{ 
                            scale: [1, 1.15, 1],
                            borderColor: [null, sat.color, null],
                            boxShadow: [null, `0 0 20px ${sat.color}40`, null],
                            transition: { 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: 0.4 + sat.delay,
                              times: [0, 0.2, 1]
                            }
                         }}
                      >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
                          <sat.icon size={20} style={{ color: sat.color }} className="relative z-10" />
                          <motion.div 
                             className="absolute inset-0 rounded-2xl bg-current opacity-0 z-0"
                             style={{ color: sat.color }}
                             whileHover={{ opacity: [0, 0.15, 0], transition: { duration: 2, repeat: Infinity, delay: 0.4 + sat.delay } }}
                          />
                      </motion.div>
                      <div className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur border border-white/10 shadow-lg">
                         <span className="text-[9px] font-bold text-gray-300 whitespace-nowrap">{sat.label}</span>
                      </div>
                   </div>
                ))}
              </div>
            </div>
          </FeatureCard>

          {/* Card 2: Smart Assistant */}
          <FeatureCard className="md:col-span-1 lg:col-span-5 min-h-[320px]" glowColor="#FFB340" delay={0.1}>
             <div className="p-8 pb-0 relative z-10">
                <div className="flex items-center justify-between mb-4">
                   <div className="w-12 h-12 rounded-2xl bg-luma-yellow/10 border border-luma-yellow/20 flex items-center justify-center text-luma-yellow group-hover:scale-110 transition-transform duration-300">
                      <Bot size={24} />
                   </div>
                   <div className="px-2.5 py-1 rounded-lg bg-[#1A1A1A] border border-white/10 flex items-center gap-1.5 group-hover:border-luma-yellow/30 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-luma-yellow animate-pulse" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-gray-200">RAG Engine</span>
                   </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">دستیار هوشمند سازمانی</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">ساخت چت‌بات اختصاصی با آموزش روی اسناد شما.</p>
             </div>
             <div className="relative mt-auto h-44 w-full flex items-end justify-center px-8 overflow-hidden pb-6">
                 <motion.div 
                    variants={{
                       visible: { y: 10, opacity: 0, scale: 0.9 },
                       active: { 
                          y: [10, -10, -10, 10], opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.9],
                          transition: { duration: 4, repeat: Infinity, times: [0.5, 0.6, 0.9, 1], ease: "easeInOut" }
                       }
                    }}
                    className="absolute top-4 z-30"
                 >
                    <div className="bg-[#1A1A1A] border border-luma-yellow/30 text-white pl-3 pr-4 py-2 rounded-2xl rounded-bl-none shadow-xl flex items-center gap-2">
                       <div className="w-5 h-5 rounded-full bg-luma-yellow flex items-center justify-center">
                          <Bot size={12} className="text-black" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[9px] text-gray-400 leading-none mb-0.5">Answer</span>
                          <span className="text-[10px] font-bold text-luma-yellow leading-none">Analysis Complete</span>
                       </div>
                    </div>
                 </motion.div>
                 <div className="absolute inset-0 flex justify-center pointer-events-none">
                    {[1, 2, 3].map((i) => (
                       <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-luma-yellow rounded-full bottom-20"
                          style={{ left: `calc(50% + ${(i-2)*15}px)` }}
                          variants={{
                             visible: { y: 0, opacity: 0 },
                             active: { y: [0, -60], opacity: [0, 1, 0], transition: { duration: 2, repeat: Infinity, delay: 1 + (i * 0.1), ease: "easeOut" } }
                          }}
                       />
                    ))}
                 </div>
                 <div className="relative w-full max-w-[240px] bg-[#121212] rounded-xl border border-white/10 p-4 shadow-2xl z-10 group-hover:border-luma-yellow/20 transition-colors duration-500">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500">
                           <FileText size={16} />
                        </div>
                        <div className="flex-1">
                           <div className="h-1.5 w-16 bg-white/10 rounded-full mb-1.5" />
                           <div className="h-1.5 w-10 bg-white/5 rounded-full" />
                        </div>
                        <div className="w-2 h-2 rounded-full bg-green-500/30" />
                     </div>
                     <div className="space-y-1.5 opacity-30">
                        <div className="h-1 w-full bg-white/10 rounded-full" />
                        <div className="h-1 w-4/5 bg-white/10 rounded-full" />
                        <div className="h-1 w-full bg-white/10 rounded-full" />
                     </div>
                     <motion.div 
                        className="absolute left-0 right-0 h-[1px] bg-luma-yellow shadow-[0_0_15px_2px_rgba(255,179,64,0.6)] z-20"
                        variants={{
                           visible: { top: "10%", opacity: 0 },
                           active: { top: ["10%", "90%", "10%"], opacity: [0, 1, 0], transition: { duration: 2, repeat: Infinity, times: [0, 0.5, 1], ease: "easeInOut", delay: 0.2 } }
                        }}
                     />
                     <motion.div 
                        className="absolute inset-0 bg-luma-yellow/5 rounded-xl pointer-events-none"
                        variants={{
                           visible: { opacity: 0 },
                           active: { opacity: [0, 1, 0], transition: { duration: 4, repeat: Infinity } }
                        }}
                     />
                 </div>
             </div>
          </FeatureCard>

          {/* Card 3: Payment Model */}
          <FeatureCard className="md:col-span-1 lg:col-span-5 min-h-[320px]" glowColor="#DA8FFF" delay={0.2}>
             <div className="p-8 relative z-10 h-full flex flex-col">
                <div className="mb-4">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-luma-purple/10 text-luma-purple border border-luma-purple/20 group-hover:scale-110 transition-transform duration-300">
                         <Wallet size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white">مدل پرداخت منصفانه</h3>
                   </div>
                   <p className="text-gray-400 text-sm leading-relaxed">اعتبار شما هرگز نمی‌سوزد. برخلاف اشتراک‌ها، فقط برای آنچه استفاده می‌کنید هزینه کنید.</p>
                </div>
                <div className="flex-1 w-full flex flex-col items-center justify-center relative perspective-container mt-4">
                    <motion.div className="relative z-20" variants={{ visible: { y: 0 }, active: { y: [-10, 10, -10], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } } }}>
                         <motion.div className="w-72 h-36 relative flex items-center justify-center" variants={{ visible: { filter: "drop-shadow(0 0 0px rgba(218,143,255,0))" }, active: { filter: "drop-shadow(0 0 25px rgba(218,143,255,0.4))", transition: { duration: 0.4 } } }}>
                            <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible">
                               <defs>
                                  <linearGradient id="infinity-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                     <stop offset="0%" stopColor="#C084FC" />
                                     <stop offset="100%" stopColor="#E879F9" />
                                  </linearGradient>
                               </defs>
                               <path d="M12,12 C9,8 3,8 3,12 C3,16 9,16 12,12 C15,8 21,8 21,12 C21,16 15,16 12,12" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
                               <motion.path d="M12,12 C9,8 3,8 3,12 C3,16 9,16 12,12 C15,8 21,8 21,12 C21,16 15,16 12,12" fill="none" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" variants={{ visible: { opacity: 1 }, active: { opacity: 0, transition: { duration: 0.3 } } }} />
                               <motion.path d="M12,12 C9,8 3,8 3,12 C3,16 9,16 12,12 C15,8 21,8 21,12 C21,16 15,16 12,12" fill="none" stroke="url(#infinity-gradient)" strokeWidth="1.5" strokeLinecap="round" variants={{ visible: { opacity: 0 }, active: { opacity: 1, transition: { duration: 0.3 } } }} />
                               <motion.path d="M12,12 C9,8 3,8 3,12 C3,16 9,16 12,12 C15,8 21,8 21,12 C21,16 15,16 12,12" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 40" variants={{ visible: { strokeDashoffset: 0, opacity: 0 }, active: { strokeDashoffset: [0, -44], opacity: 0.7, transition: { duration: 1.5, repeat: Infinity, ease: "linear" } } }} style={{ mixBlendMode: "overlay" }} />
                            </svg>
                            {PARTICLES.map((p, i) => (
                               <motion.div key={i} className="absolute rounded-full blur-[0.5px]" style={{ left: '50%', top: '50%', width: p.scale * 3, height: p.scale * 3, backgroundColor: i % 2 === 0 ? '#DA8FFF' : '#FFFFFF' }} variants={{ visible: { x: 0, y: 0, opacity: 0, scale: 0 }, active: { x: p.x, y: p.y, opacity: [0, p.opacity, 0], scale: [0, 1.5, 0], transition: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeOut" } } }} />
                            ))}
                         </motion.div>
                    </motion.div>
                    <motion.div className="w-40 h-3 bg-black/40 blur-xl rounded-[100%] mt-8" variants={{ visible: { scaleX: 1, opacity: 0.2 }, active: { scaleX: [0.8, 1.1, 0.8], opacity: [0.2, 0.5, 0.2], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } } }} />
                    <motion.div className="mt-8 px-4 py-2 rounded-xl flex items-center gap-2 backdrop-blur-md border transition-all duration-300" variants={{ visible: { y: 0, opacity: 1, backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)", boxShadow: "none" }, active: { y: 0, opacity: 1, backgroundColor: "rgba(218,143,255,0.1)", borderColor: "rgba(218,143,255,0.3)", boxShadow: "0 0 20px rgba(218,143,255,0.15)" } }}>
                       <motion.div className="w-2 h-2 rounded-full" variants={{ visible: { backgroundColor: "#666" }, active: { backgroundColor: "#DA8FFF" } }} />
                       <motion.span className="text-sm font-bold tracking-wide" variants={{ visible: { color: "#888" }, active: { color: "#fff" } }}>بدون تاریخ انقضا</motion.span>
                    </motion.div>
                </div>
             </div>
          </FeatureCard>

          {/* Card 4: Engineering & API */}
          <FeatureCard className="md:col-span-1 lg:col-span-6 min-h-[340px]" glowColor="#FFB340" delay={0.3}>
             <div className="p-8 relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 rounded-xl bg-luma-yellow/10 text-luma-yellow border border-luma-yellow/20 group-hover:scale-110 transition-transform duration-300">
                      <Terminal size={24} />
                   </div>
                   <h3 className="text-lg font-bold text-white">قدرت مهندسی & API</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">ارائه راهکارهای سازمانی اختصاصی و API پرسرعت برای توسعه‌دهندگان.</p>
                
                {/* Code Terminal */}
                <div className="bg-[#080808] rounded-2xl border border-white/5 font-mono text-[11px] md:text-xs text-gray-400 flex-1 relative overflow-hidden shadow-lg transition-colors ring-1 ring-white/5 group-hover:border-luma-yellow/30 flex flex-col">
                   
                   {/* Header */}
                   <div className="flex justify-between items-center px-4 py-3 border-b border-white/5 bg-white/5">
                      <div className="flex gap-1.5 opacity-60">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                         <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                         <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      </div>
                      <div className="flex items-center gap-2 opacity-50">
                        <span className="text-[10px] font-sans">bash</span>
                      </div>
                   </div>

                   {/* Code Content */}
                   <div className="p-5 relative flex-1" dir="ltr">
                      
                      {/* Scan Line */}
                      <motion.div 
                        className="absolute left-0 right-0 h-[40px] bg-gradient-to-b from-transparent via-luma-yellow/10 to-transparent z-10 pointer-events-none"
                        variants={{
                           hidden: { top: "-20%", opacity: 0 },
                           visible: { top: "-20%", opacity: 0 },
                           active: { 
                              top: ["-20%", "120%"], 
                              opacity: [0, 1, 0],
                              transition: { duration: 1.5, repeat: Infinity, ease: "linear" } 
                           }
                        }}
                      />

                      <div className="space-y-1 relative z-0 leading-relaxed">
                          <p><span className="text-purple-400">const</span> <span className="text-luma-yellow">client</span> = <span className="text-purple-400">new</span> LumaSDK();</p>
                          <p className="text-gray-600 italic py-1">// Initialize Secure Connection</p>
                          <p><span className="text-purple-400">await</span> client.<span className="text-blue-400">connect</span>({'{'}</p>
                          <p className="pl-4">apiKey: <span className="text-green-400">"sk_live_9x..."</span>,</p>
                          <p className="pl-4">region: <span className="text-green-400">"me-central"</span>,</p>
                          <p className="pl-4">mode: <span className="text-luma-yellow">"turbo"</span></p>
                          <p>{'}'});</p>
                      </div>

                      {/* Animated Graph / Activity Monitor */}
                      <div className="absolute bottom-4 right-5 flex flex-col items-end gap-2">
                           <div className="flex items-center gap-2">
                               <span className="text-[9px] text-luma-yellow/80 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  System Online
                               </span>
                               <div className="relative">
                                  <div className="w-1.5 h-1.5 rounded-full bg-luma-yellow shadow-[0_0_10px_#FFB340]" />
                                  <motion.div 
                                    className="absolute inset-0 rounded-full bg-luma-yellow"
                                    variants={{
                                        active: { scale: [1, 2], opacity: [0.5, 0], transition: { duration: 1, repeat: Infinity } }
                                    }}
                                  />
                               </div>
                           </div>
                           
                           {/* Bars */}
                           <div className="flex items-end gap-0.5 h-4">
                               {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8, 0.4].map((h, i) => (
                                   <motion.div 
                                      key={i}
                                      className="w-1 bg-luma-yellow rounded-sm opacity-40"
                                      variants={{
                                          active: { 
                                              height: [4, h * 16, 4],
                                              opacity: [0.4, 1, 0.4],
                                              backgroundColor: ["#FFB34066", "#FFB340", "#FFB34066"],
                                              transition: { duration: 0.5, repeat: Infinity, delay: i * 0.05 } 
                                          },
                                          visible: { height: 4 }
                                      }}
                                   />
                               ))}
                           </div>
                      </div>

                   </div>
                </div>
             </div>
          </FeatureCard>

          {/* Card 5: Prompt Enhancer (Bottom Right) */}
          <FeatureCard 
             className="md:col-span-1 lg:col-span-6 min-h-[340px]"
             glowColor="#FF6482"
             delay={0.4}
          >
             <div className="p-8 relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 rounded-xl bg-luma-pink/10 text-luma-pink border border-luma-pink/20 group-hover:scale-110 transition-transform duration-300">
                      <Wand2 size={24} />
                   </div>
                   <h3 className="text-lg font-bold text-white">جادوی پرامپت</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                   قابلیت Prompt Enhancer متن ساده شما را به دستورات حرفه‌ای مهندسی‌شده تبدیل می‌کند.
                </p>

                {/* Animation Container */}
                <div className="flex-1 relative flex items-center justify-center w-full min-h-[200px] overflow-hidden">
                   
                   {/* 0. Guide Track - Strictly Centered */}
                   <div className="absolute w-[80%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                   {/* 1. Center Core (Wand) */}
                   <div className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-luma-pink to-purple-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,100,130,0.4)] relative"
                            variants={{
                               visible: { rotate: 0, scale: 1 },
                               active: { 
                                  rotate: [0, 180, 360], 
                                  scale: [1, 1.25, 1],
                                  transition: { 
                                    duration: 4, 
                                    times: [0.2, 0.35, 0.5], 
                                    ease: "easeInOut", 
                                    repeat: Infinity 
                                  }
                               }
                            }}
                         >
                            <Sparkles size={20} className="fill-white" />
                            <motion.div 
                               className="absolute inset-0 rounded-2xl border-2 border-white opacity-0"
                               variants={{
                                  visible: { scale: 1, opacity: 0.5 }, 
                                  active: { 
                                     scale: [1, 1.8], 
                                     opacity: [1, 0],
                                     transition: { duration: 1, repeat: Infinity, repeatDelay: 3 } 
                                  }
                               }}
                               animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }} 
                               transition={{ duration: 2, repeat: Infinity }}
                            />
                         </motion.div>
                   </div>
                   
                   {/* KEYED WRAPPER: Re-mounts on prompt change to ensure sync */}
                   <div className="absolute inset-0 pointer-events-none">
                     <motion.div 
                        key={promptIndex} // CRITICAL: This forces reset on prompt change
                        className="w-full h-full relative"
                     >
                         {/* 2. Input Prompt (Right -> Center) */}
                         <motion.div
                             className="absolute top-1/2 right-1/2" // Anchor: Center-Right
                             variants={{
                                hidden: { x: 160, opacity: 0, scale: 0.9, y: "-50%" },
                                visible: { x: 160, opacity: 0, scale: 0.9, y: "-50%" },
                                active: { 
                                   x: [160, 60], 
                                   y: "-50%",
                                   opacity: [0, 1, 1, 0],
                                   scale: [0.9, 1, 1, 0.5],
                                   transition: {
                                      duration: 4,
                                      times: [0, 0.15, 0.35, 0.5],
                                      ease: "easeInOut"
                                   }
                                }
                             }}
                          >
                             <div className="translate-x-1/2 bg-[#1A1A1A] border border-white/10 px-4 py-2 rounded-xl text-gray-400 text-xs shadow-lg whitespace-nowrap flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gray-500" />
                                <span>{currentPrompt.input}</span>
                             </div>
                        </motion.div>

                        {/* Particle Stream (Right -> Center) */}
                        <div className="absolute inset-0">
                             {[...Array(5)].map((_, i) => (
                                <motion.div
                                   key={`in-${i}`}
                                   className="absolute w-1 h-1 bg-luma-pink rounded-full top-1/2 right-1/2"
                                   variants={{
                                      hidden: { opacity: 0, x: 100, y: 0 },
                                      visible: { opacity: 0, x: 100, y: 0 },
                                      active: { 
                                         opacity: [0, 1, 0],
                                         x: [100, 20], 
                                         y: [(Math.random()-0.5)*30, 0],
                                         transition: { duration: 0.6, delay: 0.2 + (i * 0.1) }
                                      }
                                   }}
                                />
                             ))}
                        </div>

                        {/* 3. Output Result (Center -> Left) */}
                        <motion.div
                             className="absolute top-1/2 left-1/2" // Anchor: Center-Left
                             variants={{
                                hidden: { x: -60, opacity: 0, scale: 0.5, y: "-50%" },
                                visible: { x: -60, opacity: 0, scale: 0.5, y: "-50%" },
                                active: { 
                                   x: [-60, -160], 
                                   y: "-50%",
                                   opacity: [0, 1, 1, 0],
                                   scale: [0.5, 1, 1, 1],
                                   transition: {
                                      duration: 4,
                                      times: [0.5, 0.65, 0.85, 1],
                                      ease: "easeInOut"
                                   }
                                }
                             }}
                             // CRITICAL: Drive the loop from here to ensure sync
                             onAnimationComplete={(definition) => {
                                if (definition === 'active') handleAnimationComplete();
                             }}
                          >
                             <div className="-translate-x-1/2 bg-[#151515]/90 backdrop-blur-md border border-luma-pink/30 p-3 rounded-xl shadow-2xl relative overflow-hidden group/output max-w-[180px]">
                                {/* Shining sweep effect */}
                                <motion.div 
                                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                                   animate={{ translateX: ["-100%", "200%"] }}
                                   transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                                />
                                
                                <div className="flex items-start gap-2">
                                   <div className="mt-0.5">
                                      <Gem size={12} className={currentPrompt.color} />
                                   </div>
                                   <div className="space-y-1.5">
                                      <div className="flex flex-wrap gap-1">
                                         <span className="text-[10px] font-bold text-white bg-white/10 px-1 rounded">{currentPrompt.tags[0]}</span>
                                         <span className="text-[10px] text-gray-400">shot of</span>
                                         <span className={`text-[10px] font-bold bg-white/5 px-1 rounded ${currentPrompt.color}`}>{currentPrompt.main}</span>
                                      </div>
                                      <div className="w-full h-1 bg-white/10 rounded-full" />
                                      <div className="w-4/5 h-1 bg-white/10 rounded-full" />
                                   </div>
                                </div>
                             </div>
                          </motion.div>
                      </motion.div>
                   </div>

                </div>
             </div>
          </FeatureCard>

        </div>
      </div>
    </section>
  );
};

export default Features;