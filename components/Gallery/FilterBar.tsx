
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  activeService: string;
  setActiveService: (s: string) => void;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  activeSort: string;
  setActiveSort: (s: string) => void;
}

const SERVICES = [
  { id: 'all', label: 'همه' },
  { id: 'img-gen', label: 'ساخت تصویر' },
  { id: 'video', label: 'ساخت ویدیو' },
  { id: 'img-edit', label: 'ویرایش تصویر' },
  { id: 'vton', label: 'پرو مجازی' },
  { id: 'bg-remove', label: 'حذف پس‌زمینه' },
  { id: 'upscale', label: 'افزایش کیفیت' },
];

const CATEGORIES = [
  { id: 'all', label: 'همه دسته‌ها' },
  { id: 'Portrait', label: 'پرتره' },
  { id: 'Product', label: 'محصول' },
  { id: 'Fashion', label: 'فشن' },
  { id: 'Landscape', label: 'منظره' },
  { id: 'Architecture', label: 'معماری' },
  { id: 'Commercial', label: 'تبلیغاتی' },
  { id: 'Animation', label: 'انیمیشن' },
  { id: 'Text-to-Video', label: 'متن به ویدیو' },
  { id: 'Image-to-Video', label: 'تصویر به ویدیو' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  activeService, setActiveService,
  activeCategory, setActiveCategory,
  activeSort, setActiveSort
}) => {
  return (
    <div className="sticky top-20 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 py-4">
      <div className="max-w-screen-2xl mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Service Filters (Scrollable) */}
        <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs ml-2 hidden md:inline-block">سرویس:</span>
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s.id)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border
                  ${activeService === s.id 
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Category & Sort */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
           
           {/* Mobile Label */}
           <span className="text-gray-500 text-xs md:hidden">فیلترها:</span>

           {/* Category Dropdown (Simulated) */}
           <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121212] border border-white/10 text-xs text-gray-300 hover:border-white/20 transition-colors">
                 <Filter size={14} />
                 <span>{CATEGORIES.find(c => c.id === activeCategory)?.label || 'دسته‌بندی'}</span>
                 <ChevronDown size={12} className="opacity-50" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-40 bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden hidden group-hover:block max-h-64 overflow-y-auto custom-scrollbar">
                 {CATEGORIES.map(c => (
                    <div 
                       key={c.id} 
                       onClick={() => setActiveCategory(c.id)}
                       className={`px-4 py-2.5 text-xs cursor-pointer hover:bg-white/5 ${activeCategory === c.id ? 'text-luma-purple font-bold' : 'text-gray-400'}`}
                    >
                       {c.label}
                    </div>
                 ))}
              </div>
           </div>

           {/* Sort Dropdown */}
           <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121212] border border-white/10 text-xs text-gray-300 hover:border-white/20 transition-colors">
                 <SlidersHorizontal size={14} />
                 <span>{activeSort === 'newest' ? 'جدیدترین' : 'محبوب‌ترین'}</span>
              </button>
              <div className="absolute top-full left-0 mt-2 w-32 bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden hidden group-hover:block">
                 <div onClick={() => setActiveSort('newest')} className="px-4 py-2.5 text-xs cursor-pointer hover:bg-white/5 text-gray-400 hover:text-white">جدیدترین</div>
                 <div onClick={() => setActiveSort('popular')} className="px-4 py-2.5 text-xs cursor-pointer hover:bg-white/5 text-gray-400 hover:text-white">محبوب‌ترین</div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};
