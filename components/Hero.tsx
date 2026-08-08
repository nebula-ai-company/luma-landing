
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  LayoutDashboard, Code2, User, CreditCard,
  Image as ImageIcon, Video, Send, Sparkles, Zap, Loader2, Command, MessageSquare, Bot,
  ChevronDown
} from 'lucide-react';
import Button from './Button';
import HeroBackground from './HeroBackground';
import { useTheme } from '../lib/ThemeContext';
import { fetchCachedJson, getFileUrl, HOMEPAGE_THUMB_LARGE } from '../lib/pbCache';
import { useSectionVisibility } from '../lib/useSectionVisibility';

// Bypass type issues with framer-motion props
const Motion = motion as any;

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
    resultImage: ''
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
    resultImage: '',
    resultVideo: ''
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

const WindowHeader = ({ activeTool }: { activeTool: typeof TOOLS[0] }) => {
  const { theme } = useTheme();
  return (
    <div className="h-10 md:h-12 border-b border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/5 backdrop-blur-md flex items-center justify-between px-3 md:px-5 shrink-0 select-none z-30">
      {/* Window Controls */}
      <div className="flex gap-1.5 md:gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
      </div>
      
      {/* Centered Title */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 text-[9px] md:text-[10px] font-sans font-medium tracking-widest text-zinc-500 dark:text-gray-500 uppercase">
         <Zap size={10} className={`${activeTool.color} animate-pulse`} />
         <span>استودیو هوش مصنوعی لوما</span>
      </div>

      {/* System Status */}
      <div className="flex items-center gap-3">
         <div className="flex items-center gap-2 px-2 py-0.5 md:py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 transition-colors hover:bg-black/10 dark:hover:bg-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-luma-green shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            <span className="text-[9px] md:text-[10px] text-zinc-500 dark:text-gray-400 font-sans tracking-wide hidden sm:inline">سیستم فعال است</span>
         </div>
      </div>
    </div>
  );
};

const Sidebar = ({ activeToolId }: { activeToolId: string }) => {
  const { theme } = useTheme();
  return (
    <div className="w-16 md:w-20 border-r border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.02] backdrop-blur-xl flex flex-col items-center py-4 md:py-6 gap-3 md:gap-4 z-20 shrink-0">
       {/* App Logo */}
       <div className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-white/10 dark:to-white/5 rounded-xl mb-2 md:mb-4 border border-black/10 dark:border-white/10 text-zinc-950 dark:text-white shadow-lg dark:shadow-xl shadow-black/5 dark:shadow-white/5 group cursor-pointer hover:scale-105 transition-transform flex items-center justify-center">
          <Sparkles size={18} className="group-hover:rotate-12 transition-transform duration-500 md:w-5 md:h-5 text-zinc-800 dark:text-white" />
       </div>
       
       {/* Navigation Items */}
       <div className="flex flex-col gap-2 w-full px-2 md:px-3">
         {SIDEBAR_ITEMS.map((item, idx) => {
           const isActive = item.toolId === activeToolId;
           return (
             <div key={idx} className="relative w-full flex justify-center group">
                {isActive && (
                  <Motion.div 
                    layoutId="active-sidebar-pill"
                    className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div 
                  className={`relative p-2.5 md:p-3 rounded-xl transition-all duration-300 z-10 ${isActive ? 'text-zinc-950 dark:text-white' : 'text-zinc-400 dark:text-gray-500 group-hover:text-zinc-700 group-hover:dark:text-gray-300'}`}
                >
                  <item.icon size={20} strokeWidth={1.5} className="md:w-[22px] md:h-[22px]" />
                </div>
             </div>
           );
         })}
       </div>

       {/* User Avatar */}
       <div className="mt-auto mb-2 opacity-65 hover:opacity-100 transition-opacity cursor-pointer group">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 border border-black/10 dark:border-white/10 group-hover:border-zinc-300 group-hover:dark:border-white/30 transition-colors" />
       </div>
    </div>
  );
};

const DashboardSimulator = ({ shouldAnimate = true }: { shouldAnimate?: boolean }) => {
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [step, setStep] = useState(0); 
  // 0: Idle/Typing, 1: Processing, 2: Result

  const [liveTools, setLiveTools] = useState(TOOLS);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const imgUrl = 'https://pb.lumai.ir/api/collections/image_generation/records?page=1&perPage=1&sort=-created';
        const vidUrl = 'https://pb.lumai.ir/api/collections/video_generation/records?page=1&perPage=1&sort=-created';

        const [resImgResult, resVidResult] = await Promise.allSettled([
          fetchCachedJson(imgUrl),
          fetchCachedJson(vidUrl)
        ]);

        let imageResultUrl = '';
        let imagePrompt = '';
        if (resImgResult.status === 'fulfilled' && resImgResult.value?.items?.length > 0) {
          const latestImg = resImgResult.value.items[0];
          if (latestImg.result) {
            imageResultUrl = getFileUrl('image_generation', latestImg.id, latestImg.result, HOMEPAGE_THUMB_LARGE);
          }
          imagePrompt = latestImg.prompt || '';
        }

        let videoPosterUrl = '';
        let videoResultUrl = '';
        let videoPrompt = '';
        if (resVidResult.status === 'fulfilled' && resVidResult.value?.items?.length > 0) {
          const latestVid = resVidResult.value.items[0];
          if (latestVid.poster) {
            videoPosterUrl = getFileUrl('video_generation', latestVid.id, latestVid.poster, HOMEPAGE_THUMB_LARGE);
          }
          if (latestVid.video) {
            videoResultUrl = getFileUrl('video_generation', latestVid.id, latestVid.video);
          }
          videoPrompt = latestVid.prompt || '';
        }

        setLiveTools(prev => prev.map(t => {
          if (t.id === 'image') {
            return { ...t, resultImage: imageResultUrl || t.resultImage, prompt: imagePrompt || t.prompt };
          }
          if (t.id === 'video') {
            return {
              ...t,
              resultImage: videoPosterUrl || t.resultImage,
              resultVideo: videoResultUrl || t.resultVideo,
              prompt: videoPrompt || t.prompt
            };
          }
          return t;
        }));
      } catch (error) {
        console.error("Failed to fetch live tools in Hero:", error);
      }
    };

    fetchLiveData();
  }, []);

  const activeTool = liveTools[activeToolIndex];

  useEffect(() => {
    if (!shouldAnimate) return;
    let timeout: ReturnType<typeof setTimeout>;

    if (step === 0) {
      // 1. Typing Phase (3.5s) -> Go to Processing
      timeout = setTimeout(() => setStep(1), 3500);
    } else if (step === 1) {
      // 2. Processing Phase (3s) -> Go to Result
      timeout = setTimeout(() => setStep(2), 3000);
    } else if (step === 2) {
      // 3. Result Phase (5s) -> Reset to Typing & Switch Tool
      // Increased to 8s to let video play longer
      timeout = setTimeout(() => {
        setStep(0);
        setActiveToolIndex((prev) => (prev + 1) % TOOLS.length);
      }, 8000);
    }

    return () => clearTimeout(timeout);
  }, [step, shouldAnimate]);

  return (
    <Motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative w-full mx-auto lg:ml-auto h-[400px] md:h-[500px] lg:h-[550px] xl:h-[680px]"
    >
      
      {/* Background Ambience */}
      <Motion.div 
        animate={shouldAnimate ? { 
          opacity: [0.2, 0.4, 0.2], 
          scale: [0.95, 1.05, 0.95],
          background: activeTool.id === 'image' ? '#FF6482' : activeTool.id === 'video' ? '#DA8FFF' : '#FFB340'
        } : { opacity: 0.2, scale: 1 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[15%] w-[80%] sm:w-[60%] h-[80%] sm:h-[60%] blur-[60px] sm:blur-[140px] rounded-full -z-10 transition-colors duration-1000" 
      />

      {/* Main Glass Panel */}
      <div className="relative w-full h-full bg-white/45 dark:bg-[#0a0a0a]/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
        
        <WindowHeader activeTool={activeTool} />

        {/* Content Layout */}
        <div className="flex-1 flex flex-row-reverse overflow-hidden">
          
          {/* Sidebar - HIDDEN on Mobile for space */}
          <div className="hidden md:block">
            <Sidebar activeToolId={activeTool.id} />
          </div>

          {/* Workspace */}
          <div className="flex-1 flex flex-col relative bg-transparent">
            
            {/* Toolbar Header - Scaled for mobile */}
            <div className="h-14 md:h-16 flex items-center justify-between px-4 md:px-8 border-b border-black/5 dark:border-white/5 z-10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm">
               <Motion.div 
                 key={activeTool.id}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex items-center gap-2 md:gap-3"
               >
                 <div className={`p-1.5 md:p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${activeTool.color}`}>
                   <activeTool.icon size={18} className="md:w-5 md:h-5" />
                 </div>
                 <h3 className="text-sm md:text-lg font-bold text-zinc-900 dark:text-gray-200 tracking-tight">{activeTool.label}</h3>
               </Motion.div>
               
               {/* Visual Actions */}
               <div className="flex gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors" />
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors" />
               </div>
            </div>

            {/* Canvas / Interaction Area */}
            <div className="flex-1 p-4 md:p-6 relative flex flex-col overflow-hidden">
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
                      {/* Viewport - Scaled for mobile */}
                      <div className="absolute top-0 left-0 right-0 bottom-20 md:bottom-24 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-black/40 backdrop-blur-sm shadow-inner overflow-hidden flex items-center justify-center group">
                         {/* Texture */}
                         <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
                         <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />

                         {/* State: Idle */}
                         {step === 0 && (
                            <Motion.div 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }}
                              className="text-center text-zinc-400 dark:text-gray-600 flex flex-col items-center gap-3 md:gap-4"
                            >
                               <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center shadow-2xl text-zinc-800 dark:text-white">
                                  <activeTool.icon size={32} className="md:w-10 md:h-10 opacity-30" />
                               </div>
                               <p className="text-xs md:text-sm font-medium opacity-40 font-mono tracking-wide">READY TO CREATE</p>
                            </Motion.div>
                         )}

                         {/* State: Processing - Scaled rings for mobile */}
                         {step === 1 && (
                            <Motion.div 
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               exit={{ opacity: 0 }}
                               className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/20 dark:bg-black/20 backdrop-blur-xl"
                            >
                               {/* Loader Container */}
                               <div className="relative w-28 h-28 md:w-40 md:h-40 mb-4 md:mb-6 flex items-center justify-center">
                                  {/* Scale down for mobile */}
                                  <div className="scale-75 md:scale-100 origin-center absolute inset-0 flex items-center justify-center">
                                      {/* 1. Outer Dashed Ring (SVG) */}
                                      <Motion.svg 
                                        className="absolute w-[160px] h-[160px] text-black/10 dark:text-white/20"
                                        style={{ width: 160, height: 160 }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                        viewBox="0 0 160 160"
                                      >
                                        <circle 
                                          cx="80" cy="80" r="78" 
                                          fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6"
                                        />
                                      </Motion.svg>

                                      {/* 2. Middle Ring (Solid, Faint) */}
                                      <svg className="absolute w-[160px] h-[160px]" viewBox="0 0 160 160" style={{ width: 160, height: 160 }}>
                                        <circle 
                                          cx="80" cy="80" r="60" 
                                          fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2"
                                          className="text-zinc-600 dark:text-white"
                                        />
                                      </svg>

                                      {/* 3. Progress Arc (Colored) */}
                                      <svg className="absolute w-[160px] h-[160px] -rotate-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" viewBox="0 0 160 160" style={{ width: 160, height: 160 }}>
                                         <Motion.circle
                                            cx="80" cy="80" r="60"
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
                                  </div>

                                  {/* Center Icon */}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                     <Motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className={`p-3 md:p-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 ${activeTool.color.replace('text-', 'text-opacity-80 ')}`}
                                     >
                                        <activeTool.icon size={24} className="md:w-8 md:h-8" />
                                     </Motion.div>
                                  </div>
                                </div>

                               {/* Text Information */}
                               <div className="text-center space-y-1 md:space-y-2 mt-2">
                                  <div className="flex items-center justify-center gap-1.5 pl-4">
                                    <span className="flex gap-1">
                                       <Motion.div className="w-1 h-1 bg-zinc-800 dark:bg-white rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
                                       <Motion.div className="w-1 h-1 bg-zinc-800 dark:bg-white rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                                       <Motion.div className="w-1 h-1 bg-zinc-800 dark:bg-white rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
                                    </span>
                                    <span className="text-sm md:text-xl font-bold tracking-[0.2em] text-zinc-900 dark:text-white">PROCESSING</span>
                                  </div>
                                  <p className="text-[9px] md:text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase opacity-70">
                                    AI MODEL V4.0
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
                               {/* Video or Image */}
                               {activeTool.id === 'video' ? (
                                  (activeTool as any).resultVideo ? (
                                     <Motion.video
                                        src={(activeTool as any).resultVideo}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        initial={{ filter: "blur(20px)", scale: 1.1 }}
                                        animate={{ filter: "blur(0px)", scale: 1 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                     />
                                  ) : (
                                     <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                                  )
                               ) : (
                                  activeTool.resultImage ? (
                                     <Motion.img 
                                        src={activeTool.resultImage} 
                                        alt="نتیجه تولید شده" 
                                        className="w-full h-full object-cover" 
                                        initial={{ filter: "blur(20px)", scale: 1.1 }}
                                        animate={{ filter: "blur(0px)", scale: 1 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        referrerPolicy="no-referrer"
                                     />
                                  ) : (
                                     <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                                  )
                               )}
                               
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
                            </Motion.div>
                         )}
                      </div>

                      {/* Floating Prompt Bar - Smaller on mobile */}
                      <div className={`
                        absolute bottom-0 left-0 right-0 h-[50px] md:h-[64px] bg-[#fcfcfc]/90 dark:bg-[#121212]/80 backdrop-blur-xl rounded-xl border flex items-center px-3 md:px-4 gap-3 md:gap-4 shadow-2xl transition-all duration-500 z-20
                        ${step === 0 ? `border-${activeTool.color.split('-')[1]}-500/30 shadow-[0_10px_40px_-10px_rgba(var(--color-${activeTool.color.split('-')[1]}-500),0.1)]` : 'border-black/5 dark:border-white/10'}
                      `}>
                         <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-zinc-500 dark:text-gray-400 border border-black/5 dark:border-white/5 shrink-0">
                            <Command size={16} className="md:w-[18px] md:h-[18px]" />
                         </div>
                         
                         <div className="flex-1 text-right dir-rtl overflow-hidden h-full flex items-center relative">
                            {step === 0 ? (
                                <Motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: "auto" }}
                                  transition={{ duration: 2.5, ease: "linear" }}
                                  className={`whitespace-nowrap overflow-hidden text-xs md:text-sm text-zinc-800 dark:text-gray-200 dir-rtl border-l-2 pl-1 ${activeTool.color.replace('text-', 'border-')}`}
                                >
                                  {activeTool.prompt}
                                </Motion.div>
                            ) : (
                               <span className="text-xs md:text-sm text-zinc-500 dark:text-gray-500 truncate w-full block text-left">{activeTool.prompt}</span>
                            )}
                         </div>

                         <button className={`
                            h-8 md:h-10 px-4 md:px-6 rounded-lg font-bold text-[10px] md:text-xs transition-all duration-300 flex items-center gap-2 shrink-0
                            ${step === 0 
                               ? `bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-gray-200 shadow-lg shadow-zinc-950/10 dark:shadow-white/10` 
                               : `bg-black/5 dark:bg-white/[0.08] text-zinc-500 dark:text-gray-400 border border-black/5 dark:border-white/5`
                            }
                         `}>
                            {step === 1 ? (
                              <Loader2 size={14} className="animate-spin md:w-4 md:h-4" />
                            ) : (
                              <>
                                <span>{step === 2 ? 'ذخیره' : 'تولید'}</span>
                                {step !== 2 && <ArrowLeft size={12} className="md:w-[14px] md:h-[14px]" />}
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
                      {/* Messages Area - Adjusted padding for mobile */}
                      <div className="absolute top-0 left-0 right-0 bottom-20 md:bottom-24 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-black/30 backdrop-blur-sm p-4 md:p-6 flex flex-col gap-4 md:gap-6 overflow-hidden">
                          <div className="flex flex-col gap-4 md:gap-6 mt-auto">
                              {/* User Message */}
                              <Motion.div 
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="self-start max-w-[90%] md:max-w-[85%]" 
                              >
                                 <div className="bg-[#fcfcfc]/90 dark:bg-[#1F1F1F]/80 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-2xl rounded-tr-sm p-3 md:p-4 shadow-lg">
                                    <p className="text-xs md:text-sm text-zinc-800 dark:text-gray-200 leading-relaxed dir-rtl text-right">{activeTool.prompt}</p>
                                 </div>
                              </Motion.div>

                              {/* AI Message */}
                              {(step === 1 || step === 2) && (
                                <Motion.div 
                                   initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                   animate={{ opacity: 1, y: 0, scale: 1 }}
                                   className="self-end max-w-[95%] md:max-w-[90%] flex flex-row-reverse gap-3 md:gap-4"
                                >
                                   <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-luma-yellow to-luma-pink flex-shrink-0 shadow-lg shadow-luma-yellow/20 flex items-center justify-center">
                                      <Bot size={16} className="text-black/80 md:w-[18px] md:h-[18px]" />
                                   </div>
                                   
                                   <div className={`
                                      p-4 md:p-5 rounded-2xl rounded-tl-none border shadow-xl backdrop-blur-md
                                      bg-[#fcfcfc]/90 dark:bg-[#111]/90 border-black/5 dark:border-white/5 ${activeTool.border}
                                   `}>
                                      {step === 1 ? (
                                         <div className="flex gap-1.5 h-4 md:h-5 items-center px-1">
                                            <Motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                            <Motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                            <Motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                         </div>
                                      ) : (
                                         <Motion.p 
                                           initial={{ opacity: 0 }}
                                           animate={{ opacity: 1 }}
                                           className="text-xs md:text-sm text-zinc-700 dark:text-gray-300 leading-relaxed dir-rtl text-right"
                                         >
                                            {(activeTool as any).resultText}
                                         </Motion.p>
                                      )}
                                   </div>
                                </Motion.div>
                              )}
                          </div>
                      </div>

                      {/* Floating Chat Input */}
                      <div className="absolute bottom-0 left-0 right-0 h-[50px] md:h-[64px] bg-[#fcfcfc]/90 dark:bg-[#121212]/80 backdrop-blur-xl rounded-xl border border-black/5 dark:border-white/10 flex items-center px-3 md:px-4 gap-3 md:gap-4 shadow-2xl z-20">
                         <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-zinc-500 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer border border-black/5 dark:border-white/5 shrink-0">
                           <Bot size={18} className="md:w-5 md:h-5" />
                         </div>
                         <div className="flex-1 text-right text-xs md:text-sm text-zinc-400 dark:text-gray-600 dir-rtl">پیام خود را بنویسید...</div>
                         <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all shrink-0 ${step === 2 ? 'bg-luma-yellow text-black shadow-[0_0_15px_rgba(255,179,64,0.3)]' : 'bg-black/5 dark:bg-white/[0.08] text-zinc-400 dark:text-gray-600'}`}>
                           <Send size={16} className={`md:w-[18px] md:h-[18px] ${step === 2 ? 'mr-1' : ''}`} />
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
  const { theme } = useTheme();
  
  const { ref: sectionRef, shouldAnimate } = useSectionVisibility({ rootMargin: '200px 0px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-24">
      {/* Luma Generative Canvas Background */}
      <HeroBackground theme={theme} shouldAnimate={shouldAnimate} isMobile={isMobile} />

      {/* Fade to bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-5 pointer-events-none transition-colors duration-300" />

      {/* Scroll Indicator */}
      <Motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] text-zinc-500 dark:text-gray-500 font-medium tracking-widest uppercase opacity-70">برای مشاهده بیشتر اسکرول کنید</span>
        <Motion.div
           animate={shouldAnimate ? { y: [0, 8, 0] } : { y: 0 }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
           <ChevronDown className="text-zinc-600 dark:text-gray-600 w-5 h-5" />
        </Motion.div>
      </Motion.div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-center">
        
        {/* Text Content - Right Column in RTL (Order 1 for Priority on Mobile) */}
        <div className="order-1 lg:col-span-6 lg:order-1 z-20 flex flex-col justify-center lg:block">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col h-full lg:min-h-[680px] justify-center items-center lg:items-start text-center lg:text-right py-4 lg:py-8 px-2 sm:px-4 my-auto"
          >
            {/* Soft, seamless blurred area that fades away (Light color in light theme, Dark color in dark theme) */}
            <div 
              className="absolute -inset-6 sm:-inset-16 rounded-[100%] pointer-events-none -z-10 blur-xl sm:blur-3xl opacity-90 dark:opacity-95 bg-[radial-gradient(ellipse_85%_80%_at_center,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.72)_45%,rgba(255,255,255,0.2)_75%,transparent_100%)] dark:bg-[radial-gradient(ellipse_85%_80%_at_center,rgba(6,4,16,0.88)_0%,rgba(6,4,16,0.65)_45%,rgba(6,4,16,0.15)_75%,transparent_100%)]"
            />
            {/* Soft backdrop blur filter to soften underlying lines behind text */}
            <div 
              className="absolute -inset-4 sm:-inset-10 rounded-full pointer-events-none -z-10 backdrop-blur-md sm:backdrop-blur-2xl [mask-image:radial-gradient(ellipse_85%_80%_at_center,black_40%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_85%_80%_at_center,black_40%,transparent_100%)]"
            />

            {/* Middle: Main Content */}
            <div className="flex flex-col justify-center items-center lg:items-start w-full max-w-2xl md:max-w-4xl lg:max-w-none">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-black tracking-tight leading-[1.1] mb-6 lg:mb-8 text-gradient-animated w-full break-words whitespace-normal drop-shadow-md">
                  <span className="block mb-2">مرکز جامع ابزارهای</span>
                  <span className="block pb-2">هوش مصنوعی</span>
                </h1>

                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-800 dark:text-gray-200 mb-8 leading-tight">
                   در خدمت رشد کسب‌وکار شما
                </h2>
                
                <p className="text-lg text-zinc-800 dark:text-zinc-200 mb-10 max-w-xl mx-auto lg:mx-0 leading-8 font-normal">
                  با لوما، به پیشرفته‌ترین مدل‌های هوش مصنوعی دسترسی داشته باشید. 
                  خلق کنید، ویرایش کنید و ایده‌های خود را با سرعتی باورنکردنی به واقعیت تبدیل کنید.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <Button 
                    externalHref="https://dash.lumai.ir/" 
                    variant="primary"
                    className="w-full sm:w-auto px-10 py-4 text-base shadow-xl shadow-luma-purple/20"
                  >
                    شروع رایگان
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <Button 
                    externalHref="#services" 
                    variant="secondary"
                    className="w-full sm:w-auto px-10 py-4 text-base backdrop-blur-md bg-zinc-100/80 hover:bg-zinc-200/90 border-zinc-300 text-zinc-900 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20 dark:text-white"
                  >
                    مشاهده خدمات
                  </Button>
                </div>
            </div>

          </Motion.div>
        </div>

        {/* Product Animation - Left Column in RTL (Order 2 for visual balance on Mobile) */}
        <div className="relative order-2 lg:col-span-6 lg:order-2 w-full flex justify-end z-10 h-full flex items-center mt-8 lg:mt-0">
           <DashboardSimulator shouldAnimate={shouldAnimate} />
        </div>

      </div>
    </section>
  );
};

export default Hero;
