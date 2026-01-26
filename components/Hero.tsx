
// ... existing imports ...
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  LayoutDashboard, Code2, User, CreditCard,
  Image as ImageIcon, Video, Play, Send, Sparkles, Zap, Loader2, Command, MessageSquare, Bot,
  ChevronDown
} from 'lucide-react';
import Button from './Button';
import PrismaticBurst from './PrismaticBurst';

// Bypass type issues with framer-motion props
const Motion = motion as any;

// ... (keep all existing constants like TOOLS, SIDEBAR_ITEMS, and helper components WindowHeader, Sidebar, DashboardSimulator) ...

const TOOLS = [
  { 
    id: 'image', 
    icon: ImageIcon, 
    label: 'ابزار ساخت تصویر', 
    color: 'text-luma-pink', 
    bgGradient: 'from-luma-pink/20 to-luma-pink/5',
    border: 'border-luma-pink/50',
    shadow: 'shadow-luma-pink/20',
    prompt: 'یک فضانورد در حال قدم زدن روی سطح مریخ با نورهای نئونی...',
    resultImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop'
  },
  { 
    id: 'video', 
    icon: Video, 
    label: 'ابزار ساخت ویدیو', 
    color: 'text-luma-purple', 
    bgGradient: 'from-luma-purple/20 to-luma-purple/5',
    border: 'border-luma-purple/50',
    shadow: 'shadow-luma-purple/20',
    prompt: 'نمای هوایی از جنگل‌های بارانی آمازون در مه صبحگاهی...',
    resultImage: 'https://images.unsplash.com/photo-1440557653017-d39f46ee36f6?q=80&w=2076&auto=format&fit=crop'
  },
  { 
    id: 'chat', 
    icon: MessageSquare, 
    label: 'دستیار هوشمند', 
    color: 'text-luma-yellow', 
    bgGradient: 'from-luma-yellow/20 to-luma-yellow/5',
    border: 'border-luma-yellow/50',
    shadow: 'shadow-luma-yellow/20',
    prompt: 'چگونه می‌توانم کمپین تبلیغاتی خود را با هوش مصنوعی بهینه کنم؟',
    resultText: 'برای بهینه‌سازی کمپین خود، ابتدا مخاطب هدف را با تحلیل داده‌ها شناسایی کنید. سپس از ابزارهای تولید تصویر ما برای ساخت بنرهای جذاب و از دستیار متنی برای نوشتن کپی‌های متقاعدکننده استفاده کنید...'
  },
];

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard },
  { icon: ImageIcon, toolId: 'image' },
  { icon: Video, toolId: 'video' },
  { icon: MessageSquare, toolId: 'chat' },
  { icon: Code2 },
  { icon: CreditCard },
  { icon: User },
];

const WindowHeader = ({ activeTool }: { activeTool: typeof TOOLS[0] }) => (
  <div className="h-12 border-b border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-between px-5 shrink-0 select-none z-30">
    {/* Window Controls */}
    <div className="flex gap-2 opacity-80 hover:opacity-100 transition-opacity">
      <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
      <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
      <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
    </div>
    
    {/* Centered Title */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 text-[10px] font-mono font-medium tracking-widest text-gray-500 uppercase">
       <Zap size={10} className={`${activeTool.color} animate-pulse`} />
       <span>Luma AI Studio</span>
    </div>

    {/* System Status */}
    <div className="flex items-center gap-3">
       <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
          <div className="w-1.5 h-1.5 rounded-full bg-luma-green shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
          <span className="text-[10px] text-gray-400 font-mono tracking-wide">System Online</span>
       </div>
    </div>
  </div>
);

const Sidebar = ({ activeToolId }: { activeToolId: string }) => (
  <div className="w-20 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col items-center py-6 gap-4 z-20 shrink-0">
     {/* App Logo */}
     <div className="w-11 h-11 bg-gradient-to-br from-white/10 to-white/5 rounded-xl mb-4 border border-white/10 flex items-center justify-center text-white shadow-xl shadow-white/5 group cursor-pointer hover:scale-105 transition-transform">
        <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-500" />
     </div>
     
     {/* Navigation Items */}
     <div className="flex flex-col gap-2 w-full px-3">
       {SIDEBAR_ITEMS.map((item, idx) => {
         const isActive = item.toolId === activeToolId;
         return (
           <div key={idx} className="relative w-full flex justify-center group">
              {isActive && (
                <Motion.div 
                  layoutId="active-sidebar-pill"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div 
                className={`relative p-3 rounded-xl transition-all duration-300 z-10 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}
              >
                <item.icon size={22} strokeWidth={1.5} />
              </div>
           </div>
         );
       })}
     </div>

     {/* User Avatar */}
     <div className="mt-auto mb-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-800 border border-white/10 group-hover:border-white/30 transition-colors" />
     </div>
  </div>
);

const DashboardSimulator = () => {
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [step, setStep] = useState(0); 
  // 0: Idle/Typing, 1: Processing, 2: Result

  const activeTool = TOOLS[activeToolIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (step === 0) {
      // 1. Typing Phase (3.5s) -> Go to Processing
      timeout = setTimeout(() => setStep(1), 3500);
    } else if (step === 1) {
      // 2. Processing Phase (3s) -> Go to Result
      timeout = setTimeout(() => setStep(2), 3000);
    } else if (step === 2) {
      // 3. Result Phase (5s) -> Reset to Typing & Switch Tool
      timeout = setTimeout(() => {
        setStep(0);
        setActiveToolIndex((prev) => (prev + 1) % TOOLS.length);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <Motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative w-full mx-auto lg:ml-auto h-[600px] lg:h-[680px]"
    >
      
      {/* Background Ambience - Reduced opacity since glass is more transparent */}
      <Motion.div 
        animate={{ 
          opacity: [0.2, 0.4, 0.2], 
          scale: [0.95, 1.05, 0.95],
          background: activeTool.id === 'image' ? '#FF6482' : activeTool.id === 'video' ? '#DA8FFF' : '#FFB340'
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[15%] w-[60%] h-[60%] blur-[140px] rounded-full -z-10 transition-colors duration-1000" 
      />

      {/* Main Glass Panel */}
      <div className="relative w-full h-full bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/5">
        
        <WindowHeader activeTool={activeTool} />

        {/* Content Layout */}
        <div className="flex-1 flex flex-row-reverse overflow-hidden">
          <Sidebar activeToolId={activeTool.id} />

          {/* Workspace */}
          <div className="flex-1 flex flex-col relative bg-transparent">
            
            {/* Toolbar Header */}
            <div className="h-16 flex items-center justify-between px-8 border-b border-white/5 z-10 bg-white/[0.02] backdrop-blur-sm">
               <Motion.div 
                 key={activeTool.id}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex items-center gap-3"
               >
                 <div className={`p-2 rounded-lg bg-white/5 border border-white/5 ${activeTool.color}`}>
                   <activeTool.icon size={20} />
                 </div>
                 <h3 className="text-lg font-bold text-gray-200 tracking-tight">{activeTool.label}</h3>
               </Motion.div>
               
               {/* Visual Actions */}
               <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors" />
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors" />
               </div>
            </div>

            {/* Canvas / Interaction Area */}
            <div className="flex-1 p-6 relative flex flex-col overflow-hidden">
               <AnimatePresence mode="wait">
                 
                 {/* MEDIA TOOLS (Image/Video) */}
                 {(activeTool.id === 'image' || activeTool.id === 'video') && (
                   <Motion.div 
                     key="media-canvas"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="flex-1 flex flex-col h-full relative"
                   >
                      {/* Viewport - Takes full available space minus footer padding */}
                      <div className="absolute top-0 left-0 right-0 bottom-24 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-inner overflow-hidden flex items-center justify-center group">
                         {/* Texture */}
                         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
                         <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />

                         {/* State: Idle */}
                         {step === 0 && (
                            <Motion.div 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }}
                              className="text-center text-gray-600 flex flex-col items-center gap-4"
                            >
                               <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center shadow-2xl">
                                  <activeTool.icon size={40} className="opacity-30" />
                               </div>
                               <p className="text-sm font-medium opacity-40 font-mono tracking-wide">READY TO CREATE</p>
                            </Motion.div>
                         )}

                         {/* State: Processing */}
                         {step === 1 && (
                            <Motion.div 
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               exit={{ opacity: 0 }}
                               className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/20 backdrop-blur-xl"
                            >
                               {/* Loader Container */}
                               <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
                                  {/* 1. Outer Dashed Ring (SVG) */}
                                  <Motion.svg 
                                    className="absolute inset-0 w-full h-full text-white/20"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                  >
                                    <circle 
                                      cx="50%" cy="50%" r="78" 
                                      fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6"
                                    />
                                  </Motion.svg>

                                  {/* 2. Middle Ring (Solid, Faint) */}
                                  <svg className="absolute inset-0 w-full h-full">
                                    <circle 
                                      cx="50%" cy="50%" r="60" 
                                      fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="2"
                                    />
                                  </svg>

                                  {/* 3. Progress Arc (Colored) */}
                                  <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                     <Motion.circle
                                        cx="50%" cy="50%" r="60"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        className={activeTool.color}
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 3.2, ease: "easeInOut" }}
                                     />
                                  </svg>

                                  {/* 4. Inner Ring (Solid, Faint) */}
                                  <Motion.svg 
                                    className="absolute inset-0 w-full h-full text-white/10"
                                    animate={{ rotate: -180 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                  >
                                    <circle 
                                      cx="50%" cy="50%" r="45" 
                                      fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
                                    />
                                  </Motion.svg>

                                  {/* Center Icon */}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                     <Motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className={`p-4 rounded-full bg-white/5 border border-white/10 ${activeTool.color.replace('text-', 'text-opacity-80 ')}`}
                                     >
                                        <activeTool.icon size={32} />
                                     </Motion.div>
                                  </div>
                                </div>

                               {/* Text Information */}
                               <div className="text-center space-y-2 mt-2">
                                  <div className="flex items-center justify-center gap-1.5 pl-4">
                                    <span className="flex gap-1">
                                       <Motion.div className="w-1 h-1 bg-white rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
                                       <Motion.div className="w-1 h-1 bg-white rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                                       <Motion.div className="w-1 h-1 bg-white rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
                                    </span>
                                    <span className="text-xl font-bold tracking-[0.2em] text-white">PROCESSING</span>
                                  </div>
                                  <p className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase opacity-70">
                                    AI MODEL V4.0 // RENDERING
                                  </p>
                               </div>
                            </Motion.div>
                         )}

                         {/* State: Result */}
                         {step === 2 && (
                            <Motion.div 
                              className="absolute inset-0 w-full h-full overflow-hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                               {/* Image with Blur Reveal */}
                               <Motion.img 
                                  src={activeTool.resultImage} 
                                  alt="Result" 
                                  className="w-full h-full object-cover" 
                                  initial={{ filter: "blur(20px)", scale: 1.1 }}
                                  animate={{ filter: "blur(0px)", scale: 1 }}
                                  transition={{ duration: 0.8, ease: "easeOut" }}
                               />
                               
                               {/* Flash Overlay */}
                               <Motion.div 
                                  className="absolute inset-0 bg-white"
                                  initial={{ opacity: 0.8 }}
                                  animate={{ opacity: 0 }}
                                  transition={{ duration: 0.5 }}
                                  style={{ pointerEvents: 'none' }}
                               />

                               {/* Scanline Effect */}
                               <Motion.div
                                  className="absolute left-0 right-0 h-1 bg-white/50 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-10"
                                  initial={{ top: "-10%" }}
                                  animate={{ top: "110%" }}
                                  transition={{ duration: 1.5, ease: "easeInOut" }}
                               />
                               
                               {activeTool.id === 'video' && (
                                  <Motion.div 
                                     initial={{ opacity: 0, scale: 0.8 }}
                                     animate={{ opacity: 1, scale: 1 }}
                                     transition={{ delay: 0.5 }}
                                     className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]"
                                  >
                                     <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform group/play">
                                        <Play size={32} className="text-white fill-white ml-1 group-hover/play:scale-110 transition-transform" />
                                     </div>
                                  </Motion.div>
                               )}
                            </Motion.div>
                         )}
                      </div>

                      {/* Floating Prompt Bar - Anchored to bottom */}
                      <div className={`
                        absolute bottom-0 left-0 right-0 h-[64px] bg-[#121212]/80 backdrop-blur-xl rounded-xl border flex items-center px-4 gap-4 shadow-2xl transition-all duration-500 z-20
                        ${step === 0 ? `border-${activeTool.color.split('-')[1]}-500/30 shadow-[0_10px_40px_-10px_rgba(var(--color-${activeTool.color.split('-')[1]}-500),0.1)]` : 'border-white/10'}
                      `}>
                         <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 border border-white/5 shrink-0">
                            <Command size={18} />
                         </div>
                         
                         <div className="flex-1 text-right dir-rtl overflow-hidden h-full flex items-center relative">
                            {step === 0 ? (
                                <Motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: "auto" }}
                                  transition={{ duration: 2.5, ease: "linear" }}
                                  className={`whitespace-nowrap overflow-hidden text-sm text-gray-200 dir-rtl border-l-2 pl-1 ${activeTool.color.replace('text-', 'border-')}`}
                                >
                                  {activeTool.prompt}
                                </Motion.div>
                            ) : (
                               <span className="text-sm text-gray-500 truncate w-full block text-left">{activeTool.prompt}</span>
                            )}
                         </div>

                         <button className={`
                            h-10 px-6 rounded-lg font-bold text-xs transition-all duration-300 flex items-center gap-2 shrink-0
                            ${step === 0 
                               ? `bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10` 
                               : `bg-[#1a1a1a] text-gray-500 border border-white/5`
                            }
                         `}>
                            {step === 1 ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <>
                                <span>{step === 2 ? 'ذخیره' : 'تولید'}</span>
                                {step !== 2 && <ArrowLeft size={14} />}
                              </>
                            )}
                         </button>
                      </div>
                   </Motion.div>
                 )}

                 {/* CHAT TOOL */}
                 {activeTool.id === 'chat' && (
                   <Motion.div 
                     key="chat-canvas"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="flex-1 flex flex-col h-full relative"
                   >
                      {/* Messages Area */}
                      <div className="absolute top-0 left-0 right-0 bottom-24 rounded-xl border border-white/5 bg-black/30 backdrop-blur-sm p-6 flex flex-col gap-6 overflow-hidden">
                          <div className="flex flex-col gap-6 mt-auto">
                              {/* User Message - Right Side (RTL Start) */}
                              <Motion.div 
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="self-start max-w-[85%]" 
                              >
                                 <div className="bg-[#1F1F1F]/80 backdrop-blur-md border border-white/10 rounded-2xl rounded-tr-sm p-4 shadow-lg">
                                    <p className="text-sm text-gray-200 leading-relaxed dir-rtl text-right">{activeTool.prompt}</p>
                                 </div>
                              </Motion.div>

                              {/* AI Message - Left Side (RTL End) */}
                              {(step === 1 || step === 2) && (
                                <Motion.div 
                                   initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                   animate={{ opacity: 1, y: 0, scale: 1 }}
                                   className="self-end max-w-[90%] flex flex-row-reverse gap-4"
                                >
                                   <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-luma-yellow to-luma-pink flex-shrink-0 shadow-lg shadow-luma-yellow/20 flex items-center justify-center">
                                      <Bot size={18} className="text-black/80" />
                                   </div>
                                   
                                   <div className={`
                                      p-5 rounded-2xl rounded-tl-none border shadow-xl backdrop-blur-md
                                      bg-[#111]/90 ${activeTool.border}
                                   `}>
                                      {step === 1 ? (
                                         <div className="flex gap-1.5 h-5 items-center px-2">
                                            <Motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                            <Motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                            <Motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                         </div>
                                      ) : (
                                         <Motion.p 
                                           initial={{ opacity: 0 }}
                                           animate={{ opacity: 1 }}
                                           className="text-sm text-gray-300 leading-relaxed dir-rtl text-right"
                                         >
                                            {activeTool.resultText}
                                         </Motion.p>
                                      )}
                                   </div>
                                </Motion.div>
                              )}
                          </div>
                      </div>

                      {/* Floating Chat Input - Matching Prompt Bar Style */}
                      <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-[#121212]/80 backdrop-blur-xl rounded-xl border border-white/10 flex items-center px-4 gap-4 shadow-2xl z-20">
                         <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 shrink-0">
                           <Bot size={20} />
                         </div>
                         <div className="flex-1 text-right text-sm text-gray-600 dir-rtl">پیام خود را بنویسید...</div>
                         <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all shrink-0 ${step === 2 ? 'bg-luma-yellow text-black shadow-[0_0_15px_rgba(255,179,64,0.3)]' : 'bg-[#222] text-gray-600'}`}>
                           <Send size={18} className={step === 2 ? 'mr-1' : ''} />
                         </div>
                      </div>
                   </Motion.div>
                 )}

               </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </Motion.div>
  );
};

// --- Hero Component ---

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
          <PrismaticBurst
            intensity={1}
            speed={0.2}
            distort={0.5}
            hoverDampness={0}
            rayCount={2}
            animationType="rotate3d"
            colors={['#DA8FFF', '#FF6482', '#FFB340']}
          />
          <div className="absolute inset-0 bg-grid-white [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-20" />
          <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* NEW: Fade to bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      {/* NEW: Scroll Indicator */}
      <Motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase opacity-70">برای مشاهده بیشتر اسکرول کنید</span>
        <Motion.div
           animate={{ y: [0, 8, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
           <ChevronDown className="text-gray-600 w-5 h-5" />
        </Motion.div>
      </Motion.div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12 xl:items-center">
        
        {/* Text Content - Right Column (in RTL) */}
        <div className="order-2 xl:order-1 z-20 flex flex-col justify-center xl:block xl:col-span-6">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col h-full xl:min-h-[680px] justify-center items-center xl:items-start text-center xl:text-right py-4 gap-8"
          >
            {/* Top: Badge */}
            <div className="xl:mb-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default group">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luma-yellow opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-luma-yellow group-hover:scale-125 transition-transform"></span>
                </span>
                <span className="text-xs font-bold text-gray-200 tracking-wide group-hover:text-white transition-colors">نسخه جدید لوما منتشر شد</span>
              </div>
            </div>
            
            {/* Middle: Main Content */}
            <div className="flex flex-col justify-center items-center xl:items-start w-full max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-none">
                <h1 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1] mb-6 xl:mb-8 text-gradient-animated w-full">
                  <span className="block mb-2 xl:whitespace-nowrap">مرکز جامع ابزارهای</span>
                  <span className="block pb-2">هوش مصنوعی</span>
                </h1>

                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-400 mb-8 leading-tight">
                   در خدمت رشد کسب‌وکار شما
                </h2>
                
                <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto xl:mx-0 leading-8 font-light">
                  با لوما، به پیشرفته‌ترین مدل‌های هوش مصنوعی دسترسی داشته باشید. 
                  خلق کنید، ویرایش کنید و ایده‌های خود را با سرعتی باورنکردنی به واقعیت تبدیل کنید.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <Button 
                    externalHref="https://dash.lumai.ir/" 
                    variant="primary"
                    className="w-full sm:w-auto px-10 py-4 text-base shadow-lg shadow-luma-purple/10"
                  >
                    شروع رایگان
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <Button 
                    externalHref="#services" 
                    variant="secondary"
                    className="w-full sm:w-auto px-10 py-4 text-base"
                  >
                    مشاهده خدمات
                  </Button>
                </div>
            </div>

          </Motion.div>
        </div>

        {/* Product Animation - Left Column (in RTL) */}
        <div className="relative order-1 xl:order-2 w-full flex justify-end z-10 h-full flex items-center xl:col-span-6">
           <DashboardSimulator />
        </div>

      </div>
    </section>
  );
};

export default Hero;
