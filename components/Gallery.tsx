import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_ITEMS } from '../constants';
import { GalleryItem } from '../types';
import { 
  ZoomIn, X, Copy, Calendar, Aperture, 
  Maximize2, Download, Share2,
  Sparkles, Check, Layers, ChevronDown
} from 'lucide-react';
import Button from './Button';

// --- Components ---

const GalleryModal = ({ item, onClose }: { item: GalleryItem; onClose: () => void }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
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
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative flex flex-col lg:flex-row bg-[#080808]/60 backdrop-blur-3xl rounded-[28px] overflow-hidden shadow-2xl border border-white/10 w-auto h-auto max-w-[95vw] lg:max-w-7xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        layout
      >
        {/* Close Button - Absolute for Mobile/Desktop consistency */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-white border border-white/5 hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Section - Right Side in RTL */}
        {/* flex-shrink-0 ensures image size dictates layout, not squeezed by text */}
        <div className="relative flex items-center justify-center bg-white/[0.01] overflow-hidden min-h-[300px] lg:min-h-[500px]">
           {/* Ambient Glow */}
           <div 
             className="absolute inset-0 opacity-30 blur-[80px] scale-110 pointer-events-none mix-blend-screen"
             style={{ backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
           />
           
           {/* Image: max-h limits it to viewport, w-auto lets it determine width */}
           <img 
             src={item.imageUrl} 
             alt={item.title} 
             className="relative block max-h-[40vh] md:max-h-[50vh] lg:max-h-[90vh] w-auto h-auto max-w-full object-contain z-10 shadow-2xl"
           />
           
           {/* Subtle Vignette */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20" />
        </div>

        {/* Info Section - Left Side in RTL */}
        {/* Fixed width on desktop, flexible on mobile */}
        <div className="flex flex-col w-full lg:w-[400px] xl:w-[440px] border-t lg:border-t-0 lg:border-r border-white/10 bg-white/[0.01] backdrop-blur-md shrink-0 h-full lg:h-auto overflow-hidden">
           
           {/* Header */}
           <div className="p-6 border-b border-white/5 bg-white/[0.01] shrink-0">
              <div className="pr-8 lg:pr-0"> {/* Padding for close button on mobile */}
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight leading-tight">{item.title}</h3>
                <div className="flex items-center gap-2">
                   <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                     {item.category}
                   </span>
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
                 <Button variant="primary" className="col-span-2 py-3 text-sm font-bold shadow-lg shadow-white/5">
                    <Download size={16} />
                    <span className="mr-1">دانلود</span>
                 </Button>

                 {/* Share */}
                 <Button variant="secondary" className="col-span-1 px-0 flex items-center justify-center text-gray-400 hover:text-white">
                    <Share2 size={18} />
                 </Button>
              </div>
           </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="gallery" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Premium Background Effects with Mask and Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        
        {/* Animated Purple Blob */}
        <motion.div 
           animate={{ 
             x: [0, 50, -50, 0],
             y: [0, -30, 30, 0],
             scale: [1, 1.1, 0.9, 1],
             opacity: [0.1, 0.15, 0.1]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/20 blur-[150px] rounded-full mix-blend-screen" 
        />
        
        {/* Animated Pink Blob */}
        <motion.div 
           animate={{ 
             x: [0, -30, 30, 0],
             y: [0, 50, -50, 0],
             scale: [1, 0.9, 1.1, 1],
             opacity: [0.1, 0.15, 0.1]
           }}
           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/20 blur-[150px] rounded-full mix-blend-screen" 
        />

        {/* Animated Yellow Blob */}
        <motion.div 
           animate={{ 
             x: [0, 40, -40, 0],
             y: [0, 40, -40, 0],
             scale: [0.9, 1.1, 1, 0.9],
             opacity: [0.1, 0.15, 0.1]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-luma-yellow/10 blur-[150px] rounded-full mix-blend-screen" 
        />

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md"
          >
             <Layers className="text-luma-pink" size={14} />
             <span className="text-gray-300 font-medium text-xs tracking-wide">ویترین آثار منتخب</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
          >
            گالری <span className="text-gradient-animated">خلاقیت بی‌نهایت</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed font-light max-w-2xl mx-auto"
          >
            مجموعه‌ای از تصاویر خیره‌کننده که با قدرت هوش مصنوعی خلق شده‌اند.
            الهام بگیرید و مرزهای تخیل خود را جابجا کنید.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <motion.div 
           variants={containerVariants}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-50px" }}
           className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 px-2"
        >
            {GALLERY_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                onClick={() => setSelectedItem(item)}
                className="break-inside-avoid relative group rounded-[24px] overflow-hidden cursor-pointer bg-surface border border-white/5 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-luma-purple/10 hover:-translate-y-2 z-0 hover:z-10"
              >
                 {/* Image */}
                 <div className="relative overflow-hidden w-full">
                   <img 
                     src={item.imageUrl} 
                     alt={item.title} 
                     className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                     loading="lazy"
                   />
                   
                   {/* Clean Gradient Overlay on Hover */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-6 md:p-8">
                     <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-500">
                           <span className="text-[10px] font-bold text-black bg-white px-2 py-0.5 rounded shadow-lg">{item.category}</span>
                        </div>
                        <h3 className="text-white font-bold text-xl leading-snug">{item.title}</h3>
                     </div>
                   </div>

                   {/* Minimal Zoom Icon */}
                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-black hover:border-white transition-colors">
                        <ZoomIn size={18} />
                      </div>
                   </div>
                 </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-20"
        >
           <Button variant="secondary" className="px-12 py-4 text-sm hover:bg-white/10 hover:border-white/20 transition-all group">
             <span>مشاهده آثار بیشتر</span>
             <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
           </Button>
        </motion.div>

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