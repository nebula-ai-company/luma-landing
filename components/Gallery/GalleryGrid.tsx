
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageCard } from './ImageCard';
import { GalleryItemData, fetchGalleryAssets } from './data';
import { FilterBar } from './FilterBar';
import { Lightbox } from './Lightbox';
import { ImageOff } from 'lucide-react';

export const GalleryGrid: React.FC = () => {
  const [activeService, setActiveService] = useState('all');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  
  // Data State
  const [galleryItems, setGalleryItems] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch Data on Filter Change
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchGalleryAssets(activeService);
        if (isMounted) {
          setGalleryItems(data);
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => { isMounted = false; };
  }, [activeService]);

  const filteredData = galleryItems;

  const handleNext = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => (prev! + 1) % filteredData.length);
  };

  const handlePrev = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => (prev! - 1 + filteredData.length) % filteredData.length);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <FilterBar 
        activeService={activeService} 
        setActiveService={setActiveService}
      />

      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        
        {loading ? (
          /* Premium Shimmer Skeleton Grid */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
             {[...Array(8)].map((_, i) => (
                <div key={i} className="break-inside-avoid mb-6 bg-zinc-50 dark:bg-[#121212] rounded-2xl border border-zinc-200 dark:border-white/5 overflow-hidden shadow-md">
                   <div className="relative w-full aspect-[4/5] bg-zinc-150 dark:bg-[#1a1a1a] overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-800/10 dark:via-white/5 to-transparent" />
                   </div>
                   <div className="p-4 space-y-3">
                      <div className="h-4 bg-zinc-200 dark:bg-white/5 rounded w-3/4 animate-pulse" />
                      <div className="h-3 bg-zinc-200 dark:bg-white/5 rounded w-1/2 animate-pulse" />
                   </div>
                </div>
             ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
             <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                <ImageOff size={32} className="text-red-500" />
             </div>
             <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">خطا در دریافت اطلاعات</h3>
             <p className="text-zinc-500 dark:text-gray-400 text-sm">لطفاً اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید.</p>
             <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-850 dark:text-white border border-zinc-200 dark:border-transparent text-sm font-bold hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors"
             >
                تلاش مجدد
             </button>
          </div>
        ) : filteredData.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, idx) => (
                <ImageCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => setSelectedItemIndex(idx)}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
             <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-6">
                <ImageOff size={32} className="text-zinc-550 dark:text-gray-500" />
             </div>
             <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">نتیجه‌ای یافت نشد</h3>
             <p className="text-zinc-500 dark:text-gray-400 text-sm">در این دسته‌بندی هنوز اثری ثبت نشده است.</p>
             <button 
                onClick={() => { setActiveService('all'); }}
                className="mt-6 px-6 py-2 rounded-full bg-luma-purple text-white dark:text-black text-sm font-bold hover:opacity-90 transition-colors"
             >
                مشاهده همه آثار
             </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedItemIndex !== null && filteredData[selectedItemIndex] && (
          <Lightbox 
            item={filteredData[selectedItemIndex]} 
            onClose={() => setSelectedItemIndex(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
