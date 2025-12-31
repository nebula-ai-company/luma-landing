import React, { useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Layers, Bot, Wallet, Terminal, Sparkles, 
  Image as ImageIcon, Video, Shirt, Wand2, 
  Infinity as InfinityIcon, FileText,
  ArrowRight, Cpu,
  Scissors, Maximize2, MessageSquare
} from 'lucide-react';

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
// 8 Positions for full service coverage
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
          
          {/* Card 1: Visual Ecosystem (Large, Left) */}
          <FeatureCard 
            className="md:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[550px]"
            glowColor="#DA8FFF"
          >
            {/* Header Content - Positioned at Top */}
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

            {/* -------------------- RE-ENGINEERED ANIMATION AREA -------------------- */}
            {/* Positioned at the bottom 70% of the card to prevent text overlap but keep it nicely centered vertically */}
            <div className="absolute inset-x-0 bottom-0 h-[70%] flex items-center justify-center pointer-events-none">
              <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
                
                {/* 1. Orbit Tracks (SVG) */}
                <svg className="absolute inset-0 w-full h-full overflow-visible">
                   {/* Outer Ring */}
                   <circle cx="50%" cy="50%" r="42%" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                   {/* Inner Ring */}
                   <circle cx="50%" cy="50%" r="25%" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
                   
                   {/* Rotating Dashed Ring */}
                   <motion.circle 
                      cx="50%" cy="50%" r="34%" 
                      fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="6 6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "50% 50%" }}
                   />
                </svg>

                {/* 2. Connecting Beams (SVG Lines) */}
                <svg className="absolute inset-0 w-full h-full overflow-visible z-10">
                   <defs>
                      <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
                         <stop offset="0%" stopColor="white" stopOpacity="0" />
                         <stop offset="50%" stopColor="white" stopOpacity="0.8" />
                         <stop offset="100%" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                   </defs>
                   
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
                            delay: sat.delay // Staggered start
                          }
                        }}
                      />
                   ))}
                </svg>

                {/* 3. Central Core (Fixed Rotation) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <motion.div 
                       className="relative w-24 h-24 bg-[#0F0F0F] rounded-[24px] border border-white/10 flex items-center justify-center z-20 shadow-2xl overflow-hidden"
                       whileHover={{
                          scale: [1, 1.05, 1],
                          boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 30px rgba(218,143,255,0.2)", "0 0 0px rgba(0,0,0,0)"],
                          transition: { duration: 2, repeat: Infinity }
                       }}
                    >
                       {/* Animated Gradient Background (Not Rotating, But Flowing) */}
                       <motion.div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100"
                          style={{
                              background: 'linear-gradient(135deg, rgba(218,143,255,0.2), rgba(0,0,0,0), rgba(255,100,130,0.2))',
                              backgroundSize: '200% 200%'
                          }}
                          animate={{ 
                            backgroundPosition: ['0% 0%', '100% 100%'],
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            repeatType: 'reverse',
                            ease: 'easeInOut' 
                          }}
                       />
                       
                       {/* Subtle Pulse Ring */}
                       <div className="absolute inset-0 rounded-[24px] border border-luma-purple/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                       <div className="relative z-10 flex flex-col items-center gap-1">
                          <Cpu size={32} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                          <div className="px-1.5 py-0.5 rounded bg-white/10 border border-white/5 text-[8px] font-mono text-gray-400 uppercase tracking-widest">
                             Core
                          </div>
                       </div>
                    </motion.div>
                </div>

                {/* 4. Satellite Nodes */}
                {SATELLITE_POSITIONS.map((sat) => (
                   <div 
                      key={sat.id}
                      className="absolute z-20 flex flex-col items-center gap-3"
                      style={{ 
                        left: `${sat.x}%`, 
                        top: `${sat.y}%`, 
                        transform: 'translate(-50%, -50%)' 
                      }}
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
                              delay: 0.4 + sat.delay, // Sync with beam arrival
                              times: [0, 0.2, 1]
                            }
                         }}
                      >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
                          <sat.icon size={20} style={{ color: sat.color }} className="relative z-10" />
                          
                          {/* Active Fill Flash */}
                          <motion.div 
                             className="absolute inset-0 rounded-2xl bg-current opacity-0 z-0"
                             style={{ color: sat.color }}
                             whileHover={{ opacity: [0, 0.15, 0], transition: { duration: 2, repeat: Infinity, delay: 0.4 + sat.delay } }}
                          />
                      </motion.div>

                      <div className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur border border-white/10 shadow-lg">
                         <span className="text-[9px] font-bold text-gray-300 whitespace-nowrap">
                            {sat.label}
                         </span>
                      </div>
                   </div>
                ))}
                
              </div>
            </div>
          </FeatureCard>

          {/* Card 2: Smart Assistant (Top Right) */}
          <FeatureCard 
             className="md:col-span-1 lg:col-span-5 min-h-[320px]"
             glowColor="#FFB340"
             delay={0.1}
          >
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-luma-yellow/5 to-transparent pointer-events-none" />
             
             <div className="p-8 pb-0 relative z-10">
                <div className="flex items-center justify-between mb-4">
                   <div className="w-12 h-12 rounded-2xl bg-luma-yellow/10 border border-luma-yellow/20 flex items-center justify-center text-luma-yellow group-hover:scale-110 transition-transform duration-300">
                      <Bot size={24} />
                   </div>
                   <div className="px-2.5 py-1 rounded-lg bg-[#1A1A1A] border border-white/10 flex items-center gap-1.5 group-hover:border-luma-yellow/30 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-luma-yellow animate-pulse" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-gray-200">RAG Enabled</span>
                   </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">دستیار هوشمند سازمانی</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                   ساخت چت‌بات اختصاصی با آموزش روی اسناد شما.
                </p>
             </div>

             {/* Visual: Document Scanner */}
             <div className="relative mt-auto h-36 w-full flex items-end justify-center px-8 overflow-hidden">
                 <div className="w-full max-w-[280px] bg-[#161616] rounded-t-2xl border border-white/10 p-5 relative top-4 shadow-2xl flex gap-4 items-center ring-1 ring-white/5 group-hover:translate-y-[-5px] transition-transform duration-500">
                    {/* Doc Icon */}
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                       <FileText size={20} className="text-gray-500 group-hover:text-gray-300" />
                    </div>
                    {/* Skeleton Text */}
                    <div className="flex-1 space-y-2">
                       <div className="h-1.5 w-3/4 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors" />
                       <div className="h-1.5 w-1/2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors" />
                    </div>
                    
                    {/* Scanning Beam - Only active on hover */}
                    <motion.div 
                       variants={{
                         idle: { left: "-100%", opacity: 0 },
                         active: { 
                           left: ["-100%", "200%"], 
                           opacity: 1,
                           transition: { duration: 2, repeat: Infinity, ease: "linear" } 
                         }
                       }}
                       className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-luma-yellow/20 to-transparent blur-md pointer-events-none z-10"
                    />
                    <motion.div 
                       variants={{
                         idle: { left: "-100%", opacity: 0 },
                         active: { 
                           left: ["-100%", "200%"], 
                           opacity: 1,
                           transition: { duration: 2, repeat: Infinity, ease: "linear" } 
                         }
                       }}
                       className="absolute top-0 bottom-0 w-[1px] bg-luma-yellow shadow-[0_0_15px_rgba(255,179,64,1)] pointer-events-none z-10"
                    />
                 </div>
             </div>
          </FeatureCard>

          {/* Card 3: Payment Model (Middle Right) */}
          <FeatureCard 
             className="md:col-span-1 lg:col-span-5 min-h-[320px]"
             glowColor="#22c55e"
             delay={0.2}
          >
             <div className="p-8 relative z-10 h-full flex flex-col justify-between">
                <div>
                   <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 group-hover:scale-110 transition-transform duration-300">
                         <Wallet size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white">مدل پرداخت منصفانه</h3>
                   </div>
                   <p className="text-gray-400 text-sm leading-relaxed">
                      حذف اشتراک‌های اجباری. اعتبار (لوم) بخرید و هرگز نگران انقضای آن نباشید.
                   </p>
                </div>
                
                {/* Visual: Infinity Credit */}
                <div className="w-full mt-6">
                   <div className="bg-[#0A0A0A] rounded-2xl p-5 border border-white/5 flex items-center justify-between shadow-lg relative overflow-hidden group-hover:border-green-500/30 transition-colors duration-500">
                      {/* Background Glow */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-green-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex flex-col gap-1 relative z-10">
                         <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">موجودی اعتبار</span>
                         <span className="text-xs text-green-400 font-medium">همیشگی و بدون تاریخ</span>
                      </div>
                      <div className="flex items-center gap-4 relative z-10">
                         <motion.div variants={{
                            idle: { scale: 1, opacity: 0.8 },
                            active: { 
                              scale: [1, 1.1, 1], 
                              opacity: 1,
                              transition: { duration: 2, repeat: Infinity } 
                            }
                         }}>
                           <InfinityIcon size={36} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                         </motion.div>
                      </div>
                   </div>
                </div>
             </div>
          </FeatureCard>

          {/* Card 4: Engineering & API (Bottom Left) */}
          <FeatureCard 
             className="md:col-span-1 lg:col-span-6 min-h-[340px]"
             glowColor="#3b82f6"
             delay={0.3}
          >
             <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             
             <div className="p-8 relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Terminal size={24} />
                   </div>
                   <h3 className="text-lg font-bold text-white">قدرت مهندسی & API</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                   ارائه راهکارهای سازمانی اختصاصی و API پرسرعت برای توسعه‌دهندگان.
                </p>

                {/* Visual: Code Snippet */}
                <div className="bg-[#080808] rounded-2xl p-5 border border-white/5 font-mono text-[11px] md:text-xs text-gray-400 flex-1 relative overflow-hidden shadow-lg transition-colors ring-1 ring-white/5 group-hover:border-blue-500/20">
                   {/* Terminal Header */}
                   <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                      <div className="flex gap-1.5 opacity-60">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                         <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                         <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      </div>
                      <span className="text-[9px] text-gray-600 font-sans">bash</span>
                   </div>
                   
                   <motion.div 
                     variants={{
                        idle: { opacity: 0.6 },
                        active: { opacity: 1, transition: { duration: 0.3 } }
                     }}
                     className="space-y-2 relative z-10 leading-relaxed" 
                     dir="ltr"
                   >
                      <p><span className="text-purple-400">const</span> <span className="text-blue-400">client</span> = <span className="text-yellow-400">new</span> LumaSDK();</p>
                      <p className="text-gray-600 italic mt-1 mb-1">// Enterprise Connection</p>
                      <p><span className="text-purple-400">await</span> client.connect({'{'}</p>
                      <p className="pl-4">key: <span className="text-green-400">"sk_live_..."</span>,</p>
                      <p className="pl-4">mode: <span className="text-green-400">"fast"</span></p>
                      <p>{'}'});</p>
                   </motion.div>
                   
                   {/* Connection Visual */}
                   <div className="absolute bottom-4 right-5 flex items-center gap-2">
                       <span className="text-[9px] text-blue-500/80 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity delay-300">Connected</span>
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] opacity-50 group-hover:opacity-100 group-hover:animate-pulse" />
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
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                   قابلیت Prompt Enhancer متن ساده شما را به دستورات حرفه‌ای مهندسی‌شده تبدیل می‌کند.
                </p>

                {/* Visual: Prompt Transformation */}
                <div className="mt-auto flex flex-col gap-3">
                   {/* Input Bubble */}
                   <div className="self-end bg-white/5 rounded-2xl rounded-br-none px-4 py-2.5 border border-white/5 max-w-[85%] group-hover:border-white/10 transition-colors">
                      <span className="text-xs text-gray-300 dir-rtl">یک گربه فضانورد...</span>
                   </div>
                   
                   {/* Transformation Arrow */}
                   <div className="self-center text-luma-pink flex flex-col items-center h-8 justify-center">
                      <motion.div 
                        variants={{
                           idle: { x: 0, opacity: 0.5 },
                           active: { 
                             x: [0, 5, 0], 
                             opacity: 1,
                             transition: { duration: 1.5, repeat: Infinity } 
                           }
                        }}
                      >
                         <ArrowRight size={16} className="rotate-90" />
                      </motion.div>
                   </div>

                   {/* Output Bubble */}
                   <motion.div 
                     initial={{ opacity: 0.8, y: -5 }}
                     whileHover={{ opacity: 1, y: 0 }}
                     className="self-start bg-luma-pink/5 rounded-2xl rounded-bl-none px-4 py-3 border border-luma-pink/10 relative overflow-hidden w-full max-w-[95%] shadow-lg group-hover:border-luma-pink/20 transition-all"
                   >
                      <div className="flex gap-2 relative z-10 items-start">
                         <Sparkles size={12} className="text-luma-pink flex-shrink-0 mt-0.5" />
                         <span className="text-[11px] text-gray-200 dir-ltr text-left leading-relaxed font-mono opacity-90 group-hover:text-white transition-colors">
                            "Cinematic shot of a cute cat astronaut, galaxy nebula, 8k..."
                         </span>
                      </div>
                   </motion.div>
                </div>
             </div>
          </FeatureCard>

        </div>
      </div>
    </section>
  );
};

export default Features;