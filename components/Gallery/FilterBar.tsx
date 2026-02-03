
import React from 'react';

interface FilterBarProps {
  activeService: string;
  setActiveService: (s: string) => void;
}

const SERVICES = [
  { id: 'all', label: 'همه' },
  { id: 'image-gen', label: 'ساخت تصویر' },
  { id: 'video-gen', label: 'ساخت ویدیو' },
  { id: 'edit-image', label: 'ویرایش تصویر' },
  { id: 'virtual-try-on', label: 'پرو مجازی' },
  { id: 'remove-bg', label: 'حذف پس‌زمینه' },
  { id: 'upscale', label: 'افزایش کیفیت' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  activeService, setActiveService
}) => {
  return (
    <div className="sticky top-20 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 py-4">
      <div className="max-w-screen-2xl mx-auto px-0 md:px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Service Filters (Scrollable) */}
        <div 
            className="w-full md:w-auto overflow-x-auto no-scrollbar touch-pan-x overscroll-x-contain"
            style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex items-center gap-3 md:gap-2 px-4 md:px-0 min-w-max">
            <span className="text-gray-500 text-xs ml-2 hidden md:inline-block">سرویس:</span>
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s.id)}
                className={`
                  whitespace-nowrap px-5 py-2.5 md:px-4 md:py-2 rounded-full text-xs font-bold transition-all border flex-shrink-0 select-none
                  ${activeService === s.id 
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-105 md:scale-100' 
                    : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {s.label}
              </button>
            ))}
            {/* Right Spacer for Mobile Scrolling */}
            <div className="w-2 md:hidden flex-shrink-0" />
          </div>
        </div>

      </div>
    </div>
  );
};
