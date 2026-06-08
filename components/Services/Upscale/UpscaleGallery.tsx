import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageCard } from '../../Gallery/ImageCard';
import { Lightbox } from '../../Gallery/Lightbox';
import { GalleryItemData, fetchGalleryAssets } from '../../Gallery/data';
import { Layers, Loader2 } from 'lucide-react';
import Button from '../../Button';

export const UpscaleGallery: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [items, setItems] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchGalleryAssets('upscale');
        if (isMounted) {
          setItems(data);
        }
      } catch (err) {
        console.error("Failed to fetch upscale gallery assets", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => { isMounted = false; };
  }, []);
  
  const handleNext = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => (prev! + 1) % items.length);
  };

  const handlePrev = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => (prev! - 1 + items.length) % items.length);
  };

  return (
    <section className="py-24 bg-[#FAFAFA] dark:bg-[#0a0a0a] transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

      <div className="max-w-screen-2xl mx-auto px-4 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-16">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-200/60 dark:border-white/10 bg-zinc-200/25 dark:bg-white/5 backdrop-blur-md"
           >
              <Layers size={14} className="text-[#D97706] dark:text-luma-yellow" />
              <span className="text-[10px] font-bold text-zinc-650 dark:text-gray-300 uppercase tracking-widest">گالری نمونه‌ها</span>
           </motion.div>
           
           <motion.h2 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4"
           >
              کیفیت را <span className="text-gradient-animated">احساس کنید</span>
           </motion.h2>
           
           <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-600 dark:text-gray-400 text-lg font-light"
           >
              تصاویر واقعی که توسط هوش مصنوعی لوما ارتقا یافته‌اند.
           </motion.p>
        </div>

        {/* Gallery Grid */}
        {loading ? (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={40} className="text-[#D97706] dark:text-luma-yellow animate-spin" />
            </div>
        ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
               <AnimatePresence mode="popLayout">
                  {items.map((item, idx) => (
                     <ImageCard 
                        key={item.id} 
                        item={item} 
                        onClick={() => setSelectedItemIndex(idx)}
                     />
                  ))}
               </AnimatePresence>
            </div>
        )}

        {/* Load More / CTA */}
        <div className="mt-16 flex justify-center">
           <Button href="/gallery" variant="secondary" className="px-10">
              مشاهده تمام آثار
           </Button>
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItemIndex !== null && items[selectedItemIndex] && (
          <Lightbox 
            item={items[selectedItemIndex]} 
            onClose={() => setSelectedItemIndex(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>

    </section>
  );
};
