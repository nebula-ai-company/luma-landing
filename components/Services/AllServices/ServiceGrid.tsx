
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Play, AudioLines } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPreloadHandlers } from '../../../lib/routePreload';
import { SERVICES } from '../../../constants';
import { Service } from '../../../types';
import { fetchGalleryAssets } from '../../Gallery/data';
import { useTheme } from '../../../lib/ThemeContext';

// --- Color Palette Mapping ---
const BRAND_COLORS = {
  purple: '#DA8FFF',
  pink: '#FF6482',
  yellow: '#FFB340',
};

const getServiceColor = (id: string) => {
  switch (id) {
    case 'img-gen':
    case 'bg-remove':
    case 'try-on':
      return BRAND_COLORS.pink;
    case 'video':
    case 'img-edit':
    case 'chat':
    case 'workflow':
      return BRAND_COLORS.purple;
    case 'assistant':
    case 'upscale':
    case 'text-to-speech':
      return BRAND_COLORS.yellow;
    default:
      return BRAND_COLORS.purple;
  }
};

// --- Extended Details (Features remain static, Images will be overridden) ---
const SERVICE_EXTENDED_DETAILS: Record<string, { images: string[]; features: string[] }> = {
  'img-gen': {
    images: [],
    features: ['موتور تولید تصویر Luma XL', 'پشتیبانی از استایل‌های هنری', 'رزولوشن ۸K و جزئیات دقیق']
  },
  'img-edit': {
    images: [],
    features: ['حذف و اضافه اشیاء با متن', 'تغییر نورپردازی و ترکیب‌بندی', 'بازسازی هوشمند بخش‌های حذف شده']
  },
  'bg-remove': {
    images: [],
    features: ['تشخیص لبه‌های پیچیده (مو)', 'خروجی PNG شفاف لایه باز', 'پردازش دسته‌ای هزاران تصویر']
  },
  'assistant': {
    images: [],
    features: ['برنامه‌ریزی و مدیریت تسک‌ها', 'تحلیل داده‌های کسب‌وکار', 'پاسخگویی به ایمیل‌ها و پیام‌ها']
  },
  'video': {
    images: [],
    features: ['تبدیل متن به ویدیو سینمایی', 'انیمیت کردن تصاویر ثابت', 'کنترل حرکت دوربین و زاویه']
  },
  'text-to-speech': {
    images: [],
    features: [
      'تبدیل متن فارسی و چندزبانه به گفتار',
      'انتخاب صدا و سبک بیان',
      'خروجی مناسب ویدئو، پادکست و تبلیغات'
    ]
  },
  'upscale': {
    images: [],
    features: ['افزایش رزولوشن تا ۴ برابر', 'حذف نویز و تاری تصویر', 'بازسازی چهره و جزئیات بافت']
  },
  'try-on': {
    images: [],
    features: ['پرو مجازی لباس روی مانکن', 'تغییر رنگ و طرح پارچه', 'حفظ چین و چروک طبیعی لباس']
  },
  'chat': {
    images: [],
    features: ['مدل زبانی GPT-4 بهینه شده', 'درک عمیق زبان فارسی', 'حافظه طولانی مدت مکالمات']
  },
  'workflow': {
    images: [],
    features: ['طراحی بوم بصری فرآیندها', 'اتصال مدل‌های گوناگون هوش مصنوعی', 'اتوماسیون هوشمند چندمرحله‌ای']
  }
};

// Helper to map internal IDs to API categories
const getApiServiceType = (id: string) => {
  const map: Record<string, string> = {
    'img-gen': 'image-gen',
    'img-edit': 'edit-image',
    'bg-remove': 'remove-bg',
    'video': 'video-gen',
    'upscale': 'upscale',
    'try-on': 'virtual-try-on'
  };
  return map[id];
};

// --- Audio Card Visual Mode Component ---
const AudioCardVisual: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const shouldReduceMotion = useReducedMotion();

  // Waveform heights pattern (14 bars)
  const barRatios = [0.35, 0.7, 0.45, 0.85, 0.6, 0.95, 0.5, 0.8, 0.4, 0.65, 0.9, 0.55, 0.75, 0.4];

  return (
    <div className="absolute inset-x-3.5 top-3.5 h-[180px] z-10 flex flex-col justify-between p-3.5 rounded-2xl bg-zinc-100/90 dark:bg-[#131318]/90 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm transition-all duration-300 group-hover:border-luma-yellow/40 overflow-hidden">
      {/* Soft Ambient Radial Accents */}
      <div 
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-35"
        style={{ backgroundColor: BRAND_COLORS.yellow }}
      />
      <div 
        className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-2xl opacity-15 pointer-events-none"
        style={{ backgroundColor: BRAND_COLORS.purple }}
      />

      {/* Header: Sample Persian Text Badge */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/60 border border-black/5 dark:border-white/10 text-[11px] font-medium text-zinc-800 dark:text-gray-200">
          <AudioLines size={12} className="text-luma-yellow shrink-0" />
          <span className="truncate">«صدایی طبیعی برای هر داستان»</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 dark:text-gray-400 pl-1">
          <span className="w-1.5 h-1.5 rounded-full bg-luma-yellow animate-pulse" />
          <span>HQ</span>
        </div>
      </div>

      {/* Center: Waveform Composition */}
      <div className="relative z-10 py-1 flex items-center justify-center gap-1 sm:gap-1.5 h-12 my-auto">
        {barRatios.map((ratio, idx) => {
          const barColor = idx % 4 === 0 ? BRAND_COLORS.pink : (idx % 3 === 0 ? BRAND_COLORS.purple : BRAND_COLORS.yellow);
          return (
            <motion.div
              key={idx}
              animate={shouldReduceMotion ? { scaleY: ratio } : {
                scaleY: isHovered 
                  ? [ratio * 0.4, Math.min(1, ratio * 1.15), ratio * 0.5, ratio * 0.95, ratio * 0.4] 
                  : [ratio * 0.75, ratio, ratio * 0.8, ratio]
              }}
              transition={{
                duration: isHovered ? 0.9 : 2.2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: idx * 0.06,
                ease: 'easeInOut'
              }}
              className="w-1 sm:w-1.5 rounded-full origin-center opacity-85 group-hover:opacity-100 transition-opacity"
              style={{
                height: '100%',
                backgroundColor: barColor,
              }}
            />
          );
        })}
      </div>

      {/* Footer: Timeline & Play Controls */}
      <div className="relative z-10 space-y-1.5 pt-2 border-t border-black/5 dark:border-white/10">
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-luma-yellow text-zinc-950 flex items-center justify-center shadow-xs">
              <Play size={10} className="fill-zinc-950 translate-x-[0.5px]" />
            </div>
            <span>پیش‌نمایش گفتار</span>
          </div>
          <span className="text-[10px]">0:02 / 0:14</span>
        </div>

        {/* Timeline Progress Bar */}
        <div className="relative w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            animate={shouldReduceMotion ? { width: '45%' } : { width: ['10%', '90%', '10%'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full rounded-full"
            style={{ backgroundColor: BRAND_COLORS.yellow }}
          />
        </div>
      </div>
    </div>
  );
};

const ServiceGridItem: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const { theme } = useTheme();
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fetchedImages, setFetchedImages] = useState<string[]>([]);

  const color = useMemo(() => getServiceColor(service.id), [service.id]);
  const details = SERVICE_EXTENDED_DETAILS[service.id] || { 
    images: [], 
    features: [] 
  };

  // Fetch real images from API
  useEffect(() => {
    const apiType = getApiServiceType(service.id);
    if (!apiType) return;

    let isMounted = true;
    fetchGalleryAssets(apiType).then(assets => {
      if (isMounted && assets.length > 0) {
        // Map assets to URLs, preferring results over inputs where applicable
        const validImages = assets
          .map(a => a.thumbnailUrl)
          .filter(url => url && url.length > 0)
          .slice(0, 5); // Limit to 5 images for slideshow
        
        if (validImages.length > 0) {
          setFetchedImages(validImages);
        }
      }
    });

    return () => { isMounted = false; };
  }, [service.id]);

  // Use fetched images if available, otherwise fallback to static (or empty)
  const images = fetchedImages.length > 0 ? fetchedImages : details.images;

  // Slideshow Logic
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const intervalDuration = 4000;
    const staggerDelay = index * 200;

    const initialTimeout = setTimeout(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, intervalDuration);
        
        return () => clearInterval(timer);
    }, staggerDelay);

    return () => clearTimeout(initialTimeout);
  }, [index, images]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="relative h-full min-h-[420px]"
    >
      <Link to={service.path} {...getPreloadHandlers(service.path)} className="block h-full relative group outline-none">
        {/* Outer container for Border Effect */}
        <div 
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="h-full relative p-px overflow-hidden transition-all duration-300 hover:-translate-y-2 bg-zinc-100/50 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-transparent rounded-[24px]"
        >
            {/* Dynamic Border Gradient */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
                style={{
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`
                }}
            />

            {/* Inner Content Container - Immersive Layout */}
            <div 
              className="relative h-full bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden flex flex-col justify-end transition-colors duration-300"
              style={{ borderRadius: '23px' }}
            >
                {/* Visual Area / Background */}
                {service.id === 'text-to-speech' ? (
                    <AudioCardVisual isHovered={isHovered} />
                ) : (
                    <div className="absolute inset-0 z-0">
                        <AnimatePresence mode="popLayout">
                            {images && images.length > 0 && images[currentImageIndex] ? (
                              <motion.img 
                                key={currentImageIndex}
                                src={images[currentImageIndex]} 
                                alt={service.title}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-100/40 to-zinc-200/60 dark:via-zinc-900/40 dark:to-zinc-950/90" />
                            )}
                        </AnimatePresence>
                        
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/80 dark:to-transparent z-10 transition-colors duration-300" />
                    </div>
                )}

                {/* Floating Icon Badge (Top Right) */}
                <div className="absolute top-5 right-5 z-20">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-zinc-150/40 dark:bg-black/50 backdrop-blur-md border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-800 dark:text-white shadow-lg group-hover:bg-zinc-200/50 dark:group-hover:bg-black/70 transition-colors group-hover:scale-110 duration-300">
                       <service.icon size={22} style={{ color: isHovered ? color : (theme === 'dark' ? 'white' : '#3f3f46') }} className="transition-colors duration-300" />
                    </div>
                </div>

                {/* Content Padding */}
                <div className="relative z-20 p-6 flex flex-col">
                    
                    {/* Header */}
                    <div className="mb-4">
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2 group-hover:text-zinc-700 dark:group-hover:text-gray-100 transition-colors drop-shadow-md">
                            {service.title}
                        </h3>
                        <p className="text-sm text-zinc-650 dark:text-gray-300 leading-relaxed font-light line-clamp-2 drop-shadow-sm transition-colors">
                            {service.description}
                        </p>
                    </div>

                    {/* Extended Features List - Hidden on small, shown on hover/large */}
                    <div className="space-y-2 mb-6 opacity-80">
                        {details.features.slice(0, 2).map((feat, i) => (
                           <div key={i} className="flex items-center gap-2 text-xs text-zinc-500 dark:text-gray-400 group-hover:text-zinc-850 dark:group-hover:text-gray-200 transition-colors">
                              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                              <span>{feat}</span>
                           </div>
                        ))}
                    </div>

                    {/* Footer / CTA Hint */}
                    <div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between transition-colors">
                         <span 
                           className="text-xs font-bold transition-all duration-300 tracking-wide"
                           style={{ color: isHovered ? color : (theme === 'dark' ? '#9ca3af' : '#71717a') }}
                         >
                           شروع کنید
                         </span>
                         <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-zinc-900 text-white dark:bg-white dark:text-black translate-x-0' : 'bg-zinc-200/55 dark:bg-white/10 text-zinc-700 dark:text-white translate-x-2'}`}
                         >
                            <ArrowLeft size={16} />
                         </div>
                    </div>

                </div>
            </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const ServiceGrid: React.FC = () => {
  return (
    <section id="catalog" className="py-24 bg-white dark:bg-[#080808] border-y border-zinc-200 dark:border-white/5 relative transition-colors duration-300">
         <div className="max-w-screen-2xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                <div>
                   <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">کاتالوگ سرویس‌ها</h2>
                   <p className="text-zinc-500 dark:text-gray-400">همه ابزارهایی که برای خلق جادو نیاز دارید.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {SERVICES.map((service, index) => (
                  <ServiceGridItem key={service.id} service={service} index={index} />
               ))}
            </div>
         </div>
    </section>
  );
};
