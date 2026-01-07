
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageCard } from './ImageCard';
import { GALLERY_DATA } from './data';
import { FilterBar } from './FilterBar';
import { Lightbox } from './Lightbox';
import { ImageOff } from 'lucide-react';

export const GalleryGrid: React.FC = () => {
  const [activeService, setActiveService] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('newest');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  // Filter Logic
  const filteredData = GALLERY_DATA.filter(item => {
    const serviceMatch = activeService === 'all' || item.service === activeService;
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    return serviceMatch && categoryMatch;
  });

  // Sort Logic (Mock)
  const sortedData = [...filteredData].sort((a, b) => {
    if (activeSort === 'newest') return b.date.localeCompare(a.date);
    return 0; // Maintain order for now
  });

  const handleNext = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => (prev! + 1) % sortedData.length);
  };

  const handlePrev = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => (prev! - 1 + sortedData.length) % sortedData.length);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <FilterBar 
        activeService={activeService} 
        setActiveService={setActiveService}
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
      />

      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        {sortedData.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {sortedData.map((item, idx) => (
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
             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <ImageOff size={32} className="text-gray-500" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">نتیجه‌ای یافت نشد</h3>
             <p className="text-gray-400 text-sm">لطفاً فیلترها را تغییر دهید یا دسته‌بندی دیگری را انتخاب کنید.</p>
             <button 
                onClick={() => { setActiveService('all'); setActiveCategory('all'); }}
                className="mt-6 px-6 py-2 rounded-full bg-luma-purple text-black text-sm font-bold hover:bg-white transition-colors"
             >
                پاک کردن فیلترها
             </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedItemIndex !== null && (
          <Lightbox 
            item={sortedData[selectedItemIndex]} 
            onClose={() => setSelectedItemIndex(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
