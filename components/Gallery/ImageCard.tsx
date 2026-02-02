
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Play, ScanLine, Shirt, Image as ImageIcon } from 'lucide-react';
import { GalleryItemData } from './data';

interface ImageCardProps {
  item: GalleryItemData;
  onClick: () => void;
}

// --- Premium Shimmer Skeleton ---
const SkeletonLoader = () => (
  <div className="absolute inset-0 z-0 bg-[#1a1a1a] overflow-hidden">
    {/* Base Noise */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
    
    {/* Shimmer Effect */}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    
    {/* Central Icon Placeholder */}
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <ImageIcon size={32} className="text-white" />
    </div>
  </div>
);

export const ImageCard: React.FC<ImageCardProps> = ({ item, onClick }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isLoaded, setIsLoaded] = useState(false); // Track loading state
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || item.uiType !== 'comparison') return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(percentage);
  };

  const getServiceColor = (s?: string) => {
    if (!s) return 'text-gray-400 border-white/10';
    if (s.includes('image')) return 'text-luma-pink border-luma-pink/20';
    if (s.includes('video')) return 'text-luma-purple border-luma-purple/20';
    if (s.includes('try')) return 'text-luma-yellow border-luma-yellow/20';
    if (s.includes('edit')) return 'text-blue-400 border-blue-400/20';
    if (s.includes('upscale')) return 'text-green-400 border-green-400/20';
    return 'text-gray-400 border-white/10';
  };

  const formatServiceType = (type: string) => {
      const map: Record<string, string> = {
          'image-gen': 'تولید تصویر',
          'video-gen': 'تولید ویدیو',
          'edit-image': 'ویرایش تصویر',
          'virtual-try-on': 'پرو مجازی',
          'remove-bg': 'حذف پس‌زمینه',
          'upscale': 'افزایش کیفیت'
      };
      return map[type] || type;
  };

  // Handler when image is fully loaded
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Parse aspect ratio from dimensions string (e.g. "1024x768")
  const getAspectRatioStyle = () => {
    if (item.dimensions) {
        const [w, h] = item.dimensions.split('x').map(Number);
        if (w && h) return { aspectRatio: `${w}/${h}` };
    }
    // Fallback: No enforced ratio, let content dictate
    return {};
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="break-inside-avoid mb-6 relative group"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-[#121212] border border-white/5 shadow-md hover:shadow-2xl hover:shadow-white/5 transition-all duration-300 cursor-pointer">
        
        {/* Loading Skeleton Layer */}
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-10"
                    // Ensure skeleton has height if image isn't loaded yet
                    style={{ minHeight: '200px' }}
                >
                    <SkeletonLoader />
                </motion.div>
            )}
        </AnimatePresence>

        {/* Comparison Logic (Edit / Upscale) */}
        {item.uiType === 'comparison' && item.thumbnailUrlBefore ? (
           <div className="relative w-full bg-[#1a1a1a]" style={{ aspectRatio: '1/1' }}> {/* Comparisons usually square or fixed ratio */}
              {/* After Image (Base) */}
              <motion.img 
                src={item.thumbnailUrl} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover" 
                onLoad={handleImageLoad}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Before Image (Overlay with Clip) - Only show if base loaded */}
              <motion.div 
                className="absolute inset-0 w-full h-full"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
              >
                 <img src={item.thumbnailUrlBefore} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
                 
                 {/* Labels */}
                 <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-[9px] font-bold text-white border border-white/10 shadow-lg">قبل</div>
              </motion.div>
              
              {/* Controls (Only show if loaded) */}
              <motion.div animate={{ opacity: isLoaded ? 1 : 0 }}>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-[9px] font-bold text-luma-yellow border border-white/10 shadow-lg">بعد</div>

                  {/* Slider Handle */}
                  <div 
                     className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                     style={{ left: `${sliderPos}%` }}
                  >
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-xl text-black">
                        <ScanLine size={12} className="text-black rotate-90" />
                     </div>
                  </div>
              </motion.div>
           </div>
        ) : (
           /* Standard Image / VTON / Video */
           <div 
              className="relative w-full bg-[#1a1a1a]" 
              style={getAspectRatioStyle()}
           >
              {/* If no aspect ratio known, force a min-height so skeleton is visible */}
              {!item.dimensions && !isLoaded && <div className="pt-[100%]" />} 

              <motion.img 
                src={item.thumbnailUrl} 
                alt={item.title} 
                className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-105" 
                loading="lazy" 
                onLoad={handleImageLoad}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Only show overlays if loaded */}
              <motion.div animate={{ opacity: isLoaded ? 1 : 0 }} className="absolute inset-0 pointer-events-none">
                  {/* Video Play Icon */}
                  {item.uiType === 'video' && (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform shadow-xl">
                           <Play size={20} className="text-white fill-white ml-1" />
                        </div>
                        {item.duration && (
                            <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white font-mono border border-white/10">
                                {item.duration}
                            </div>
                        )}
                     </div>
                  )}

                  {/* VTON Garment Preview */}
                  {item.uiType === 'vton' && item.clothingImageUrl && (
                     <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
                        <div className="w-12 h-14 rounded-lg border-2 border-white/50 overflow-hidden shadow-xl bg-black/50 backdrop-blur-sm group-hover:scale-110 transition-transform origin-bottom-right">
                           <img src={item.clothingImageUrl} alt="Garment" className="w-full h-full object-cover" />
                           <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <Shirt size={10} className="text-white drop-shadow-md" />
                           </div>
                        </div>
                     </div>
                  )}
              </motion.div>
           </div>
        )}

        {/* Hover Overlay - Show only when loaded */}
        {isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
               <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                     <span className={`text-[10px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur px-2 py-0.5 rounded border ${getServiceColor(item.serviceType)}`}>
                        {formatServiceType(item.serviceType)}
                     </span>
                  </div>
                  <h3 className="text-white font-bold text-sm leading-tight mb-1 truncate">{item.title}</h3>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed opacity-80">{item.prompt}</p>
               </div>
               
               {/* Zoom Icon */}
               <div className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <Maximize2 size={14} />
               </div>
            </div>
        )}

      </div>
    </motion.div>
  );
};
