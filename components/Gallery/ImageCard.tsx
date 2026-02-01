
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Play, ScanLine, Shirt } from 'lucide-react';
import { GalleryItemData } from './data';

interface ImageCardProps {
  item: GalleryItemData;
  onClick: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ item, onClick }) => {
  const [sliderPos, setSliderPos] = useState(50);
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="break-inside-avoid mb-6 relative group"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-[#121212] border border-white/5 shadow-md hover:shadow-2xl hover:shadow-white/5 transition-all duration-300 cursor-pointer">
        
        {/* Comparison Logic (Edit / Upscale) */}
        {item.uiType === 'comparison' && item.thumbnailUrlBefore ? (
           <div className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden">
              {/* After Image (Base) */}
              <img src={item.thumbnailUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
              
              {/* Before Image (Overlay with Clip) */}
              <div 
                className="absolute inset-0 w-full h-full"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                 <img src={item.thumbnailUrlBefore} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
                 
                 {/* Labels */}
                 <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-[9px] font-bold text-white border border-white/10">قبل</div>
              </div>
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-[9px] font-bold text-luma-yellow border border-white/10">بعد</div>

              {/* Slider Handle */}
              <div 
                 className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                 style={{ left: `${sliderPos}%` }}
              >
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <ScanLine size={12} className="text-black rotate-90" />
                 </div>
              </div>
           </div>
        ) : (
           /* Standard Image / VTON / Video */
           <div className="relative w-full aspect-[4/5] md:aspect-auto min-h-[250px] bg-[#1a1a1a]">
              <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              
              {/* Video Play Icon */}
              {item.uiType === 'video' && (
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                       <Play size={20} className="text-white fill-white ml-1" />
                    </div>
                    {item.duration && (
                        <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white font-mono">
                            {item.duration}
                        </div>
                    )}
                 </div>
              )}

              {/* VTON Garment Preview */}
              {item.uiType === 'vton' && item.clothingImageUrl && (
                 <div className="absolute bottom-4 right-4 z-20">
                    <div className="w-12 h-14 rounded-lg border-2 border-white/50 overflow-hidden shadow-lg bg-black/50 backdrop-blur-sm group-hover:scale-110 transition-transform origin-bottom-right">
                       <img src={item.clothingImageUrl} alt="Garment" className="w-full h-full object-cover" />
                       <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Shirt size={10} className="text-white drop-shadow-md" />
                       </div>
                    </div>
                 </div>
              )}
           </div>
        )}

        {/* Hover Overlay */}
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
           <div className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
              <Maximize2 size={14} />
           </div>
        </div>

      </div>
    </motion.div>
  );
};
