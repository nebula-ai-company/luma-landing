
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy, Calendar, Aperture, Maximize2, Sparkles, ScanLine, ArrowLeft, ArrowRight, Shirt, Play, Pause, Check } from 'lucide-react';
import Button from '../Button';
import { GalleryItemData } from './data';

interface LightboxProps {
  item: GalleryItemData;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onNext, onPrev }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [copied, setCopied] = useState(false);
  const [showGarment, setShowGarment] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset states when item changes
  useEffect(() => {
    setSliderPos(50);
    setIsPlaying(false);
    setShowGarment(false);
  }, [item.id]);

  const handleCopyPrompt = () => {
    if (item.prompt) {
        navigator.clipboard.writeText(item.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (item.uiType !== 'comparison' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (item.uiType !== 'comparison' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(percentage);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    }
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-6 lg:p-10"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#000000]/95 backdrop-blur-3xl transition-all"
        onClick={onClose}
      />
      
      {/* Close Button (Mobile Fixed - Premium Glassy) */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-[210] p-2.5 bg-black/50 backdrop-blur-md rounded-full text-white/90 border border-white/10 active:scale-95 transition-all md:hidden shadow-lg"
      >
        <X size={20} />
      </button>

      {/* Navigation Arrows (Desktop) */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all z-[70] group"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all z-[70] group"
      >
        <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="relative w-full h-full md:h-auto md:max-h-[85vh] max-w-[1400px] bg-white dark:bg-[#0c0c0e] md:rounded-[32px] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-zinc-200 dark:border-white/10 z-60 transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* === VISUAL AREA === */}
        {/* Mobile: 60vh fixed height (Increased size). Desktop: Flex-1/Auto */}
        <div 
           className="relative w-full h-[60vh] lg:h-auto lg:flex-1 bg-black flex items-center justify-center overflow-hidden group select-none shrink-0"
           ref={containerRef}
           onMouseMove={handleMouseMove}
           onTouchMove={handleTouchMove}
        >
           {/* Close Button (Desktop Absolute inside) */}
           <button 
             onClick={onClose}
             className="hidden md:flex absolute top-6 right-6 z-50 p-2.5 bg-black/40 backdrop-blur-xl rounded-full text-white/70 hover:text-white border border-white/10 hover:bg-white/10 transition-colors"
           >
             <X size={20} />
           </button>

           {/* Background Pattern */}
           <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

           {/* Content Logic */}
           {item.uiType === 'video' && item.videoUrl ? (
              <div className="relative w-full h-full flex items-center justify-center bg-black" onClick={toggleVideo}>
                 <video 
                    ref={videoRef}
                    src={item.videoUrl} 
                    poster={item.thumbnailUrl} 
                    className="w-full h-full object-contain" 
                    controls={false}
                    loop
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                 />
                 {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer backdrop-blur-[2px] transition-all hover:bg-black/20">
                        <motion.div 
                           initial={{ scale: 0.8 }} 
                           animate={{ scale: 1 }} 
                           className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
                        >
                            <Play size={32} className="text-white fill-white ml-1 md:ml-2" />
                        </motion.div>
                    </div>
                 )}
              </div>
           ) : item.uiType === 'comparison' && item.thumbnailUrlBefore ? (
              <div className="relative w-full h-full flex items-center justify-center bg-[#050505]">
                 <img 
                    src={item.thumbnailUrl} 
                    alt={item.title} 
                    className="max-w-full max-h-full object-contain pointer-events-none select-none" 
                 />
                 <div 
                    className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                 >
                    <img 
                        src={item.thumbnailUrlBefore} 
                        alt="Before" 
                        className="max-w-full max-h-full object-contain" 
                    />
                    <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/10 shadow-lg">
                       قبل (Original)
                    </div>
                 </div>
                 {/* Premium Slider Handle */}
                 <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                    style={{ left: `${sliderPos}%` }}
                 >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-2xl text-black border-[3px] border-black/10">
                       <ScanLine size={14} className="rotate-90 md:w-4 md:h-4 text-black" />
                    </div>
                 </div>
                 <div className="absolute top-6 right-16 md:right-20 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-lg text-xs font-bold text-luma-yellow border border-white/10 shadow-lg">
                    بعد (Result)
                 </div>
              </div>
           ) : (
              <div className="relative w-full h-full flex items-center justify-center p-0 md:p-4 lg:p-10">
                 <motion.img 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={item.thumbnailUrl} 
                    alt={item.title} 
                    className="max-w-full max-h-full object-contain shadow-2xl md:rounded-lg" 
                 />
                 {item.uiType === 'vton' && item.clothingImageUrl && (
                    <motion.div 
                        className="absolute bottom-6 left-6 md:bottom-8 md:left-8 cursor-pointer z-30 group/garment"
                        onClick={(e) => { e.stopPropagation(); setShowGarment(true); }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-16 h-20 md:w-20 md:h-24 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl relative bg-black/50 hover:border-white/80 transition-colors">
                            <img src={item.clothingImageUrl} alt="Garment" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/garment:opacity-100 transition-opacity">
                                <Maximize2 size={20} className="text-white drop-shadow-md" />
                            </div>
                        </div>
                    </motion.div>
                 )}
              </div>
           )}
        </div>

        {/* === INFO SIDEBAR (Bottom Sheet on Mobile) === */}
        {/* Negative margin for overlapping look, rounded top, fixed background */}
        <div className="w-full lg:w-[420px] bg-white dark:bg-[#121212] lg:bg-white lg:dark:bg-[#0c0c0e] lg:border-l border-zinc-200 dark:border-white/10 flex flex-col flex-1 lg:h-auto relative z-20 rounded-t-[24px] lg:rounded-none -mt-6 lg:mt-0 shadow-[0_-10px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.9)] lg:shadow-none overflow-hidden ring-1 ring-black/5 dark:ring-white/5 lg:ring-0 transition-colors duration-300">
           
           {/* Mobile Drag Handle */}
           <div className="w-full flex justify-center pt-3 pb-1 lg:hidden bg-white dark:bg-[#121212]" onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-1 bg-zinc-300 dark:bg-white/20 rounded-full" />
           </div>

           {/* Sidebar Header */}
           <div className="px-6 pb-4 pt-2 border-b border-zinc-150 dark:border-white/5 flex flex-col gap-2 bg-white dark:bg-[#121212] lg:bg-white lg:dark:bg-[#0c0c0e] lg:pt-6 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-1">
                 {item.uiType === 'video' && <div className="p-1.5 rounded-md bg-luma-purple/10 text-luma-purple"><Play size={12} fill="currentColor" /></div>}
                 {item.uiType === 'image' && <div className="p-1.5 rounded-md bg-luma-pink/10 text-luma-pink"><Sparkles size={12} /></div>}
                 <span className="text-[10px] font-bold text-zinc-500 dark:text-gray-400 uppercase tracking-wider">{item.serviceType}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white leading-tight">{item.title}</h2>
           </div>

           {/* Scrollable Details - Added bottom padding for sticky footer */}
           <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 md:space-y-8 bg-white dark:bg-[#121212] lg:bg-white lg:dark:bg-[#0c0c0e] pb-28 lg:pb-6 transition-colors duration-300">
              
              {/* Prompt Section */}
              <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-luma-purple text-[11px] font-bold uppercase tracking-widest">
                        <Sparkles size={12} />
                        <span>Prompt</span>
                    </div>
                    <button 
                        onClick={handleCopyPrompt}
                        className="text-[10px] text-zinc-500 hover:text-zinc-900 dark:text-gray-500 dark:hover:text-white flex items-center gap-1.5 transition-colors bg-zinc-100 dark:bg-white/5 px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-transparent cursor-pointer"
                    >
                        {copied ? <Check size={12} className="text-green-500"/> : <Copy size={12} />}
                        {copied ? "کپی شد" : "کپی"}
                    </button>
                 </div>
                 <div className="bg-zinc-50 dark:bg-[#1a1a1a] lg:bg-zinc-50 lg:dark:bg-[#151515] p-4 rounded-xl border border-zinc-200 dark:border-white/5 text-sm text-zinc-700 dark:text-gray-300 leading-7 font-light text-justify dir-rtl shadow-inner select-text">
                    {item.prompt}
                 </div>
              </div>

              {/* Metadata Grid */}
              <div className="space-y-3">
                 <div className="flex items-center gap-2 text-zinc-500 dark:text-gray-500 text-[11px] font-bold uppercase tracking-widest">
                    <Aperture size={12} />
                    <span>Details</span>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                     <div className="bg-zinc-50 dark:bg-[#1a1a1a] lg:bg-zinc-50 lg:dark:bg-[#151515] p-3 rounded-xl border border-zinc-200 dark:border-white/5 flex flex-col gap-1 transition-colors">
                        <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-medium">Model</span>
                        <span className="text-xs text-zinc-800 dark:text-white font-mono dir-ltr truncate" title={item.modelUsed}>{item.modelUsed}</span>
                     </div>
                     <div className="bg-zinc-50 dark:bg-[#1a1a1a] lg:bg-zinc-50 lg:dark:bg-[#151515] p-3 rounded-xl border border-zinc-200 dark:border-white/5 flex flex-col gap-1 transition-colors">
                        <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-medium">Dimensions</span>
                        <span className="text-xs text-zinc-800 dark:text-white font-mono dir-ltr">{item.dimensions || 'N/A'}</span>
                     </div>
                     <div className="bg-zinc-50 dark:bg-[#1a1a1a] lg:bg-zinc-50 lg:dark:bg-[#151515] p-3 rounded-xl border border-zinc-200 dark:border-white/5 flex flex-col gap-1 transition-colors">
                        <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-medium">Date</span>
                        <span className="text-xs text-zinc-800 dark:text-white font-mono">{item.date}</span>
                     </div>
                     {item.duration && (
                        <div className="bg-zinc-50 dark:bg-[#1a1a1a] lg:bg-zinc-50 lg:dark:bg-[#151515] p-3 rounded-xl border border-zinc-200 dark:border-white/5 flex flex-col gap-1 transition-colors">
                            <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-medium">Duration</span>
                            <span className="text-xs text-zinc-800 dark:text-white font-mono">{item.duration}</span>
                        </div>
                     )}
                 </div>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 text-[10px] text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-350 dark:hover:border-white/20 transition-colors cursor-default">
                              #{tag}
                          </span>
                      ))}
                  </div>
              )}
           </div>

           {/* Actions Footer - Floating/Sticky on Mobile */}
           <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-200 dark:border-white/5 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl z-30 lg:static lg:bg-white lg:dark:bg-[#0c0c0e] lg:p-5 transition-colors duration-300">
              <div className="flex gap-3">
                 <a 
                    href={item.videoUrl || item.thumbnailUrl} 
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1"
                 >
                    <Button variant="primary" className="w-full justify-center text-sm font-bold bg-zinc-900 dark:bg-white text-white dark:text-black border-none hover:opacity-90 py-3 shadow-lg rounded-xl">
                        <Download size={18} className="mr-2" />
                        دانلود فایل
                    </Button>
                 </a>
              </div>
           </div>
        </div>

      </motion.div>
    </motion.div>

    {/* Optional: VTON Garment Detail Overlay */}
    <AnimatePresence>
        {showGarment && item.clothingImageUrl && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[220] flex items-center justify-center p-6 bg-black/80 backdrop-blur-lg"
                onClick={() => setShowGarment(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative bg-[#151515] rounded-[32px] border border-white/10 p-2 shadow-2xl max-w-md w-full aspect-[3/4] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        className="absolute top-4 right-4 z-50 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-colors"
                        onClick={() => setShowGarment(false)}
                    >
                        <X size={20} />
                    </button>
                    
                    <div className="flex-1 overflow-hidden rounded-[24px] bg-[#0a0a0a] relative">
                        <img src={item.clothingImageUrl} alt="Garment Detail" className="w-full h-full object-contain" />
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-bold text-white border border-white/10 flex items-center gap-2 shadow-xl whitespace-nowrap">
                        <Shirt size={16} className="text-luma-yellow" />
                        تصویر لباس ورودی
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};
