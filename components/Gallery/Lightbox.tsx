
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Download, Copy, Calendar, Aperture, Maximize2, Sparkles, ScanLine, ArrowLeft, ArrowRight, Shirt, Play, Pause } from 'lucide-react';
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
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleCopyPrompt = () => {
    if (item.prompt) {
        navigator.clipboard.writeText(item.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (item.uiType !== 'comparison') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(percentage);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
        if (isPlaying) videoRef.current.pause();
        else videoRef.current.play();
        setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      {/* Navigation Arrows */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white hover:bg-white/10 transition-colors z-50"
      >
        <ArrowLeft size={24} />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white hover:bg-white/10 transition-colors z-50"
      >
        <ArrowRight size={24} />
      </button>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full h-full md:h-auto md:max-h-[90vh] max-w-7xl bg-[#0c0c0e] rounded-none md:rounded-[24px] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-white/10 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-white border border-white/5 hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image / Video Area */}
        <div 
           className="relative flex-1 bg-black/50 flex items-center justify-center overflow-hidden group cursor-crosshair lg:min-h-[500px]"
           onMouseMove={handleMouseMove}
        >
           {item.uiType === 'video' && item.videoUrl ? (
              <div className="relative w-full h-full flex items-center justify-center" onClick={toggleVideo}>
                 <video 
                    ref={videoRef}
                    src={item.videoUrl} 
                    poster={item.thumbnailUrl} 
                    className="max-w-full max-h-full object-contain" 
                    controls={false}
                    loop
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                 />
                 {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:scale-110 transition-transform">
                            <Play size={40} className="text-white fill-white ml-2" />
                        </div>
                    </div>
                 )}
              </div>
           ) : item.uiType === 'comparison' && item.thumbnailUrlBefore ? (
              <div className="relative w-full h-full max-h-[85vh] flex items-center justify-center">
                 {/* After (Base) */}
                 <img src={item.thumbnailUrl} alt={item.title} className="max-w-full max-h-full object-contain pointer-events-none select-none" />
                 
                 {/* Before (Overlay) */}
                 <div 
                    className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                 >
                    <img src={item.thumbnailUrlBefore} alt="Before" className="max-w-full max-h-full object-contain" />
                    
                    {/* Floating Label Before */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/10">
                       اصلی
                    </div>
                 </div>
                 
                 {/* Slider Line */}
                 <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(0,0,0,0.8)] pointer-events-none z-20"
                    style={{ left: `${sliderPos}%` }}
                 >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl text-black">
                       <ScanLine size={14} className="rotate-90" />
                    </div>
                 </div>

                 <div className="absolute top-4 right-14 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-luma-yellow border border-white/10">
                    خروجی
                 </div>
              </div>
           ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                 <img src={item.thumbnailUrl} alt={item.title} className="max-w-full max-h-full object-contain shadow-2xl" />
                 
                 {/* VTON Garment Button */}
                 {item.uiType === 'vton' && item.clothingImageUrl && (
                    <motion.div 
                        className="absolute bottom-6 left-6 cursor-pointer z-30 group/garment"
                        onClick={(e) => { e.stopPropagation(); setShowGarment(true); }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-16 h-20 rounded-xl overflow-hidden border-2 border-white/50 shadow-2xl relative bg-black/50">
                            <img src={item.clothingImageUrl} alt="Garment" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/garment:opacity-100 transition-opacity">
                                <Maximize2 size={16} className="text-white" />
                            </div>
                        </div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-[10px] text-white px-2 py-1 rounded opacity-0 group-hover/garment:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                            مشاهده لباس
                        </div>
                    </motion.div>
                 )}
              </div>
           )}
        </div>

        {/* Info Sidebar */}
        <div className="w-full lg:w-[400px] border-t lg:border-t-0 lg:border-r border-white/10 bg-[#0c0c0e] flex flex-col shrink-0 h-[40vh] lg:h-auto">
           <div className="p-6 border-b border-white/5">
              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              <div className="flex gap-2">
                 <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-gray-400 font-mono">
                    {item.status}
                 </span>
                 <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-gray-400 font-mono">
                    {item.serviceType}
                 </span>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              {/* Prompt */}
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-luma-purple text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles size={12} />
                    <span>کانسپت (Prompt)</span>
                 </div>
                 <div className="bg-[#151515] p-4 rounded-xl border border-white/5 text-sm text-gray-300 leading-relaxed font-light text-justify dir-rtl">
                    {item.prompt}
                 </div>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-3">
                 <div className="bg-[#151515] p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold mb-1 uppercase">
                       <Aperture size={12} /> مدل
                    </div>
                    <div className="text-xs text-white dir-ltr truncate">{item.modelUsed}</div>
                 </div>
                 <div className="bg-[#151515] p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold mb-1 uppercase">
                       <Maximize2 size={12} /> ابعاد
                    </div>
                    <div className="text-xs text-white dir-ltr">{item.dimensions || 'N/A'}</div>
                 </div>
                 <div className="bg-[#151515] p-3 rounded-xl border border-white/5 col-span-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold mb-1 uppercase">
                       <Calendar size={12} /> تاریخ
                    </div>
                    <div className="text-xs text-white">{item.date}</div>
                 </div>
              </div>
           </div>

           <div className="p-6 border-t border-white/5 bg-[#0c0c0e]">
              <div className="grid grid-cols-4 gap-3">
                 <Button variant="secondary" onClick={handleCopyPrompt} className="col-span-1 justify-center px-0">
                    {copied ? <Sparkles size={18} className="text-green-400" /> : <Copy size={18} />}
                 </Button>
                 <a 
                    href={item.videoUrl || item.thumbnailUrl} 
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-2"
                 >
                    <Button variant="primary" className="w-full justify-center text-sm font-bold bg-white text-black border-none hover:bg-gray-200">
                        <Download size={16} />
                        <span className="mr-1">دانلود</span>
                    </Button>
                 </a>
                 <Button variant="secondary" className="col-span-1 justify-center px-0">
                    <Share2 size={18} />
                 </Button>
              </div>
           </div>
        </div>

      </motion.div>
    </motion.div>

    {/* VTON Garment Popup Overlay */}
    <AnimatePresence>
        {showGarment && item.clothingImageUrl && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
                style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
                onClick={() => setShowGarment(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative bg-[#151515] rounded-2xl border border-white/10 p-2 shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        className="absolute -top-12 right-0 md:-right-12 md:top-0 text-white hover:text-luma-pink transition-colors bg-white/10 p-2 rounded-full md:bg-transparent"
                        onClick={() => setShowGarment(false)}
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="flex-1 overflow-hidden rounded-xl bg-black/20 flex items-center justify-center">
                        <img src={item.clothingImageUrl} alt="Garment Detail" className="max-w-full max-h-full object-contain" />
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-2 shadow-lg whitespace-nowrap">
                        <Shirt size={14} className="text-luma-yellow" />
                        تصویر لباس ورودی
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};
