
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../../../constants';
import { Service } from '../../../types';
import { fetchGalleryAssets } from '../../Gallery/data';

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
      return BRAND_COLORS.purple;
    case 'assistant':
    case 'upscale':
      return BRAND_COLORS.yellow;
    default:
      return BRAND_COLORS.purple;
  }
};

// --- Extended Details (Features remain static, Images will be overridden) ---
const SERVICE_EXTENDED_DETAILS: Record<string, { images: string[]; features: string[] }> = {
  'img-gen': {
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    ],
    features: ['موتور تولید تصویر Luma XL', 'پشتیبانی از استایل‌های هنری', 'رزولوشن ۸K و جزئیات دقیق']
  },
  'img-edit': {
    images: [
      'https://images.unsplash.com/photo-1633515257399-5972216221c3?q=80&w=800&auto=format&fit=crop',
    ],
    features: ['حذف و اضافه اشیاء با متن', 'تغییر نورپردازی و ترکیب‌بندی', 'بازسازی هوشمند بخش‌های حذف شده']
  },
  'bg-remove': {
    images: [
      'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop',
    ],
    features: ['تشخیص لبه‌های پیچیده (مو)', 'خروجی PNG شفاف لایه باز', 'پردازش دسته‌ای هزاران تصویر']
  },
  'assistant': {
    images: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    ],
    features: ['برنامه‌ریزی و مدیریت تسک‌ها', 'تحلیل داده‌های کسب‌وکار', 'پاسخگویی به ایمیل‌ها و پیام‌ها']
  },
  'video': {
    images: [
      'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop',
    ],
    features: ['تبدیل متن به ویدیو سینمایی', 'انیمیت کردن تصاویر ثابت', 'کنترل حرکت دوربین و زاویه']
  },
  'upscale': {
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    ],
    features: ['افزایش رزولوشن تا ۴ برابر', 'حذف نویز و تاری تصویر', 'بازسازی چهره و جزئیات بافت']
  },
  'try-on': {
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    ],
    features: ['پرو مجازی لباس روی مانکن', 'تغییر رنگ و طرح پارچه', 'حفظ چین و چروک طبیعی لباس']
  },
  'chat': {
    images: [
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop',
    ],
    features: ['مدل زبانی GPT-4 بهینه شده', 'درک عمیق زبان فارسی', 'حافظه طولانی مدت مکالمات']
  },
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

const ServiceGridItem: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
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
      className="relative h-full"
    >
      <Link to={service.path} className="block h-full relative group outline-none">
        {/* Outer container for Border Effect */}
        <div 
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="h-full relative p-px overflow-hidden transition-all duration-300"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: '24px' 
            }}
        >
            {/* Dynamic Border Gradient */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
                style={{
                    background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`
                }}
            />

            {/* Inner Content Container */}
            <div 
              className="relative h-full bg-[#0a0a0a] overflow-hidden flex flex-col"
              style={{ borderRadius: '23px' }}
            >
                {/* Image Header - Uniform Height */}
                <div className="relative h-64 w-full overflow-hidden shrink-0 bg-[#0a0a0a]">
                    {/* Slideshow */}
                    <AnimatePresence mode="popLayout">
                        {images && images.length > 0 ? (
                          <motion.img 
                            key={currentImageIndex}
                            src={images[currentImageIndex]} 
                            alt={service.title}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                          />
                        ) : (
                          // Fallback gradient if no images
                          <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center`}>
                             <service.icon size={48} className="text-white/10" />
                          </div>
                        )}
                    </AnimatePresence>
                    
                    {/* Floating Icon Badge */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-lg z-20 group-hover:bg-black/60 transition-colors">
                       <service.icon size={20} style={{ color: isHovered ? color : 'white' }} className="transition-colors duration-300" />
                    </div>
                </div>

                {/* Content Padding */}
                <div className="relative z-10 p-6 pt-4 flex flex-col flex-grow">
                    
                    {/* Header */}
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                            {service.description}
                        </p>
                    </div>

                    {/* Extended Features List */}
                    <div className="space-y-2 mb-6">
                        {details.features.map((feat, i) => (
                           <div key={i} className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                              <span>{feat}</span>
                           </div>
                        ))}
                    </div>

                    {/* Footer / CTA Hint */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                         <span 
                           className="text-xs font-bold transition-all duration-300 tracking-wide"
                           style={{ color: isHovered ? color : '#6b7280' }}
                         >
                           مشاهده و شروع
                         </span>
                         <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isHovered ? 'border-transparent text-black scale-110' : 'border-transparent text-gray-600'}`}
                            style={{ backgroundColor: isHovered ? color : 'transparent' }}
                         >
                            <ArrowLeft size={16} className={`transition-transform duration-300 ${isHovered ? '-translate-x-0.5' : ''}`} />
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
    <section id="catalog" className="py-24 bg-[#080808] border-y border-white/5 relative">
         <div className="max-w-screen-2xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                <div>
                   <h2 className="text-3xl font-bold text-white mb-2">کاتالوگ سرویس‌ها</h2>
                   <p className="text-gray-400">همه ابزارهایی که برای خلق جادو نیاز دارید.</p>
                </div>
                <div className="flex gap-2">
                   <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">همه</button>
                   <button className="px-4 py-2 rounded-lg bg-transparent border border-white/10 text-gray-400 text-sm font-medium hover:text-white hover:border-white/30 transition-colors">خلق</button>
                   <button className="px-4 py-2 rounded-lg bg-transparent border border-white/10 text-gray-400 text-sm font-medium hover:text-white hover:border-white/30 transition-colors">ویرایش</button>
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
