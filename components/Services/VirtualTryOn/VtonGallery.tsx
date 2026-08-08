
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronDown, Loader2 } from 'lucide-react';
import Button from '../../Button';
import { GalleryItemData, fetchGalleryAssets } from '../../Gallery/data';
import { ImageCard } from '../../Gallery/ImageCard';
import { Lightbox } from '../../Gallery/Lightbox';

// Bypass type issues
const Motion = motion as any;

export const VtonGallery: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [items, setItems] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchGalleryAssets('virtual-try-on');
        if (isMounted) {
          setItems(data);
        }
      } catch (err) {
        console.error("Failed to fetch VTON gallery assets", err);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section id="vton-gallery" className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      
      {/* --- Top Gradient Fade --- */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-pink/5 dark:bg-luma-pink/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 transition-colors" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-purple/5 dark:bg-luma-purple/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 transition-colors" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.04]" />
      </div>

      {/* --- Bottom Gradient Fade --- */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/5 bg-zinc-100/50 dark:bg-white/5 backdrop-blur-md transition-colors"
          >
             <Layers className="text-luma-pink" size={14} />
             <span className="text-zinc-650 dark:text-gray-300 font-medium text-xs tracking-wide">ویترین مدل‌ها</span>
          </Motion.div>
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight transition-colors"
          >
            گالری <span className="text-gradient-animated">استایل‌های هوشمند</span>
          </Motion.h2>
          <Motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-650 dark:text-gray-400 text-lg leading-relaxed font-light transition-colors"
          >
            نمونه‌هایی از خروجی‌های واقعی که با ابزار پرو مجازی لوما تولید شده‌اند.
          </Motion.p>
        </div>

        {loading ? (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={40} className="text-luma-yellow animate-spin" />
            </div>
        ) : (
            <Motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, margin: "-50px" }}
               className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
                <AnimatePresence mode="popLayout">
                    {items.map((item, idx) => (
                        <ImageCard 
                            key={item.id} 
                            item={item} 
                            onClick={() => setSelectedItemIndex(idx)} 
                        />
                    ))}
                </AnimatePresence>
            </Motion.div>
        )}

        <Motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-20"
        >
           <Button href="/gallery" variant="secondary" className="px-12 py-4 text-sm bg-white dark:bg-transparent border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all group">
             <span>مشاهده همه طرح‌ها</span>
             <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
           </Button>
        </Motion.div>
      </div>

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
