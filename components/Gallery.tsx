
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '../types';
import { fetchGalleryAssets, GalleryItemData } from './Gallery/data';
import { 
  ZoomIn, X, Copy, Calendar, Aperture, 
  Maximize2, Download, Share2,
  Sparkles, Check, Layers, ChevronDown, Play, Loader2, ScanLine, Shirt
} from 'lucide-react';
import Button from './Button';

// Bypass type issues with framer-motion props
const Motion = motion as any;

// --- Components ---

const GalleryModal = ({ item, onClose }: { item: GalleryItem; onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (item.type !== 'comparison' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
    >
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-xl transition-all"
        onClick={onClose}
      />

      {/* Modal Content - Dynamic Auto Sizing */}
      <Motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative flex flex-col lg:flex-row bg-[#080808]/60 backdrop-blur-3xl rounded-[28px] overflow-hidden shadow-2xl border border-white/10 w-auto h-auto max-w-[95vw] lg:max-w-7xl max-h-[90vh]"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        layout
      >
        {/* Close Button - Absolute for Mobile/Desktop consistency */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-white border border-white/5 hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Visual Content Section */}
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative flex items-center justify-center bg-white/[0.01] overflow-hidden min-h-[300px] lg:min-h-[500px] flex-1 cursor-crosshair"
        >
           {/* Background Glow */}
           <div 
             className="absolute inset-0 opacity-30 blur-[80px] scale-110 pointer-events-none mix-blend-screen"
             style={{ backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
           />
           
           {/* Content Logic */}
           {item.type === 'video' && item.videoUrl ? (
             <video 
               src={item.videoUrl} 
               poster={item.imageUrl}
               controls
               autoPlay
               className="relative block max-h-[40vh] md:max-h-[50vh] lg:max-h-[90vh] w-auto h-auto max-w-full object-contain z-10 shadow-2xl"
             />
           ) : item.type === 'comparison' && item.thumbnailUrlBefore ? (
             <div className="relative w-full h-full flex items-center justify-center max-h-[85vh]">
                {/* After Image (Base) */}
                <img src={item.imageUrl} alt={item.title} className="max-w-full max-h-full object-contain select-none" />
                
                {/* Before Image (Overlay) */}
                <div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                    <img src={item.thumbnailUrlBefore} alt="Before" className="max-w-full max-h-full object-contain" />
                    <div className="absolute top-4 left-4 bg-black/60 px-3 py-1.5 rounded text-xs text-white font-bold backdrop-blur">قبل</div>
                </div>
                <div className="absolute top-4 right-16 bg-black/60 px-3 py-1.5 rounded text-xs text-white font-bold backdrop-blur">بعد</div>

                {/* Slider Handle */}
                <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none z-20"
                    style={{ left: `${sliderPos}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-black">
                        <ScanLine size={14} className="rotate-90" />
                    </div>
                </div>
             </div>
           ) : (
             // Standard Image & VTON (Full view)
             <div className="relative flex items-center justify-center w-full h-full">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="relative block max-h-[40vh] md:max-h-[50vh] lg:max-h-[90vh] w-auto h-auto max-w-full object-contain z-10 shadow-2xl"
                />
                {item.type === 'vton' && item.clothingImageUrl && (
                    <div className="absolute bottom-6 left-6 z-20 w-24 h-32 rounded-xl border-2 border-white/50 bg-black/50 overflow-hidden shadow-2xl">
                        <img src={item.clothingImageUrl} className="w-full h-full object-cover" alt="Garment" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Shirt size={16} className="text-white drop-shadow-md opacity-50" />
                        </div>
                    </div>
                )}
             </div>
           )}
           
           {/* Subtle Vignette */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20" />
        </div>

        {/* Info Section - Left Side in RTL */}
        <div className="flex flex-col w-full lg:w-[400px] xl:w-[440px] border-t lg:border-t-0 lg:border-r border-white/10 bg-white/[0.01] backdrop-blur-md shrink-0 h-full lg:h-auto overflow-hidden">
           
           {/* Header */}
           <div className="p-6 border-b border-white/5 bg-white/[0.01] shrink-0">
              <div className="pr-8 lg:pr-0">
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight leading-tight">{item.title}</h3>
                <div className="flex items-center gap-2">
                   <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                     {item.category}
                   </span>
                   {item.type === 'comparison' && <span className="px-2 py-0.5 rounded-md bg-luma-purple/10 border border-luma-purple/20 text-[10px] text-luma-purple">Before / After</span>}
                </div>
              </div>
           </div>

           {/* Scrollable Content */}
           <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              
              {/* Prompt Box */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-luma-purple text-[10px] font-black uppercase tracking-widest">
                   <Sparkles size={12} />
                   <span>دستور متنی (Prompt)</span>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors group/prompt">
                   <p className="text-gray-300 text-sm leading-7 font-light text-justify select-text">
                      {item.prompt}
                   </p>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2">
                 <div className="bg-white/[0.02] rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-1.5 text-gray-500 text-[10px] mb-1.5 uppercase tracking-wider font-bold">
                       <Aperture size={10} />
                       <span>مدل</span>
                    </div>
                    <span className="text-gray-200 font-bold text-xs dir-ltr block text-right truncate">{item.model}</span>
                 </div>
                 <div className="bg-white/[0.02] rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-1.5 text-gray-500 text-[10px] mb-1.5 uppercase tracking-wider font-bold">
                       <Maximize2 size={10} />
                       <span>ابعاد</span>
                    </div>
                    <span className="text-gray-200 font-bold text-xs dir-ltr block text-right">{item.dimensions}</span>
                 </div>
                 <div className="bg-white/[0.02] rounded-xl p-3 border border-white/5 col-span-2">
                    <div className="flex items-center gap-1.5 text-gray-500 text-[10px] mb-1.5 uppercase tracking-wider font-bold">
                       <Calendar size={10} />
                       <span>تاریخ تولید</span>
                    </div>
                    <span className="text-gray-200 font-bold text-xs">{item.date}</span>
                 </div>
              </div>
           </div>

           {/* Actions Footer */}
           <div className="p-6 border-t border-white/5 bg-white/[0.01] shrink-0">
              <div className="grid grid-cols-4 gap-2">
                 {/* Copy */}
                 <Button 
                    variant="secondary" 
                    onClick={handleCopyPrompt}
                    className="col-span-1 px-0 flex items-center justify-center text-gray-400 hover:text-white"
                    title="کپی دستور"
                 >
                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                 </Button>

                 {/* Download */}
                 <a 
                    href={item.videoUrl || item.imageUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    download
                    className="col-span-2"
                 >
                    <Button variant="primary" className="w-full py-3 text-sm font-bold shadow-lg shadow-white/5 flex items-center justify-center">
                        <Download size={16} />
                        <span className="mr-1">دانلود</span>
                    </Button>
                 </a>

                 {/* Share */}
                 <Button variant="secondary" className="col-span-1 px-0 flex items-center justify-center text-gray-400 hover:text-white">
                    <Share2 size={18} />
                 </Button>
              </div>
           </div>

        </div>
      </Motion.div>
    </Motion.div>
  );
};

// --- Gallery Card Component (Handles Interactive Types) ---
interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick }) => {
    const [sliderPos, setSliderPos] = useState(50);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (item.type !== 'comparison' || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPos(pos);
    };

    return (
        <Motion.div
            variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
            }}
            onClick={onClick}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="break-inside-avoid relative group rounded-[24px] overflow-hidden cursor-pointer bg-surface border border-white/5 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-luma-purple/10 hover:-translate-y-2 z-0 hover:z-10"
        >
            <div className="relative overflow-hidden w-full bg-[#121212]">
                
                {/* 1. Comparison Card (Editing/Upscale) */}
                {item.type === 'comparison' && item.thumbnailUrlBefore ? (
                    <div className="relative w-full h-auto">
                        {/* After Image (Base) */}
                        <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-auto object-cover" 
                        />
                        {/* Before Image (Overlay with Clip) */}
                        <div 
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ clipPath: `inset(0 ${100-sliderPos}% 0 0)` }}
                        >
                            <img src={item.thumbnailUrlBefore} className="w-full h-full object-cover" alt="Before" />
                            <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[9px] text-white font-bold backdrop-blur">Original</div>
                        </div>
                        {/* Slider Handle */}
                        <div 
                            className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_black] z-20 pointer-events-none" 
                            style={{ left: `${sliderPos}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                                <ScanLine size={12} className="text-black rotate-90" />
                            </div>
                        </div>
                    </div>
                ) : (
                    /* 2. Standard / Video / VTON Cards */
                    <>
                        <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                            loading="lazy"
                        />
                        
                        {/* Video Indicator */}
                        {item.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                    <Play size={20} className="text-white fill-white ml-1" />
                                </div>
                            </div>
                        )}

                        {/* VTON Inset */}
                        {item.type === 'vton' && item.clothingImageUrl && (
                            <div className="absolute bottom-3 left-3 z-20 w-12 h-16 rounded-lg border border-white/30 bg-black/50 overflow-hidden shadow-lg group-hover:scale-110 transition-transform origin-bottom-left">
                                <img src={item.clothingImageUrl} className="w-full h-full object-cover" alt="Cloth" />
                                <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                                    <Shirt size={8} className="text-white" />
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Hover Overlay - Common for all */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-6 md:p-8 pointer-events-none">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-500">
                            <span className={`text-[10px] font-bold text-black px-2 py-0.5 rounded shadow-lg ${item.type === 'comparison' ? 'bg-luma-purple' : item.type === 'vton' ? 'bg-luma-pink' : 'bg-white'}`}>
                                {item.category}
                            </span>
                        </div>
                        <h3 className="text-white font-bold text-xl leading-snug">{item.title}</h3>
                    </div>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
                    <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                        <ZoomIn size={18} />
                    </div>
                </div>
            </div>
        </Motion.div>
    );
};

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to map aspect ratio
  const determineAspectRatio = (dims?: string): 'portrait' | 'landscape' | 'square' => {
    if (!dims) return 'square';
    const [w, h] = dims.split('x').map(Number);
    if (!w || !h) return 'square';
    if (w > h) return 'landscape';
    if (h > w) return 'portrait';
    return 'square';
  };

  // Helper to map category slugs
  const mapCategory = (slug: string): string => {
    const map: Record<string, string> = {
      'image-gen': 'تصویرسازی',
      'video-gen': 'ویدیو',
      'edit-image': 'ویرایش',
      'virtual-try-on': 'فشن',
      'upscale': 'کیفیت'
    };
    return map[slug] || slug;
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch latest items from all categories
        const categories = ['image-gen', 'video-gen', 'edit-image', 'virtual-try-on'];
        const fetchPromises = categories.map(cat => fetchGalleryAssets(cat, 1));
        
        const results = await Promise.all(fetchPromises);
        
        let mixedItems: GalleryItem[] = [];
        
        results.forEach((catItems, index) => {
            const categorySlug = categories[index];
            
            const mapped = catItems.slice(0, 3).map(item => {
                // Determine UI Type based on available fields from API
                let type: 'image' | 'video' | 'comparison' | 'vton' = 'image';
                
                if (item.videoUrl) type = 'video';
                else if (item.thumbnailUrlBefore) type = 'comparison';
                else if (item.clothingImageUrl) type = 'vton';
                // Fallback for known categories if fields missing but context implies it
                else if (categorySlug === 'edit-image' || categorySlug === 'upscale') type = 'comparison'; 
                else if (categorySlug === 'virtual-try-on') type = 'vton';

                return {
                    id: item.id,
                    type,
                    imageUrl: item.thumbnailUrl,
                    videoUrl: item.videoUrl,
                    thumbnailUrlBefore: item.thumbnailUrlBefore, // Map new field
                    clothingImageUrl: item.clothingImageUrl,     // Map new field
                    title: item.title || 'بدون عنوان',
                    prompt: item.prompt || '',
                    category: mapCategory(categorySlug),
                    model: item.modelUsed || 'Luma AI',
                    date: item.date, // FIX: Use the string directly, it is already formatted in data.ts
                    aspectRatio: determineAspectRatio(item.dimensions),
                    dimensions: item.dimensions || 'Unknown'
                } as GalleryItem;
            });
            mixedItems = [...mixedItems, ...mapped];
        });

        // Shuffle
        mixedItems.sort(() => 0.5 - Math.random());

        if (isMounted) {
            setItems(mixedItems);
            setLoading(false);
        }
      } catch (err) {
        console.error("Gallery Fetch Error:", err);
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section id="gallery" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        <Motion.div 
           animate={{ 
             x: [0, 50, -50, 0], y: [0, -30, 30, 0], scale: [1, 1.1, 0.9, 1], opacity: [0.1, 0.15, 0.1]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/20 blur-[150px] rounded-full mix-blend-screen" 
        />
        <Motion.div 
           animate={{ 
             x: [0, -30, 30, 0], y: [0, 50, -50, 0], scale: [1, 0.9, 1.1, 1], opacity: [0.1, 0.15, 0.1]
           }}
           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/20 blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md"
          >
             <Layers className="text-luma-pink" size={14} />
             <span className="text-gray-300 font-medium text-xs tracking-wide">ویترین آثار منتخب</span>
          </Motion.div>
          
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
          >
            گالری <span className="text-gradient-animated">خلاقیت بی‌نهایت</span>
          </Motion.h2>
          
          <Motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed font-light max-w-2xl mx-auto"
          >
            مجموعه‌ای از تصاویر خیره‌کننده که با قدرت هوش مصنوعی خلق شده‌اند.
            الهام بگیرید و مرزهای تخیل خود را جابجا کنید.
          </Motion.p>
        </div>

        {/* Masonry Grid */}
        {loading ? (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={40} className="text-luma-purple animate-spin" />
            </div>
        ) : (
            <Motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, margin: "-50px" }}
               className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 px-2"
            >
                {items.map((item) => (
                  <GalleryCard 
                    key={item.id} 
                    item={item} 
                    onClick={() => setSelectedItem(item)} 
                  />
                ))}
            </Motion.div>
        )}

        {/* Load More Button */}
        <Motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-20"
        >
           <Button href="/gallery" variant="secondary" className="px-12 py-4 text-sm hover:bg-white/10 hover:border-white/20 transition-all group">
             <span>مشاهده آثار بیشتر</span>
             <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
           </Button>
        </Motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <GalleryModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;
