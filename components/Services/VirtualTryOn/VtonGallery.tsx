
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ZoomIn, X, Copy, Calendar, Aperture, 
  Maximize2, Download, Share2,
  Sparkles, Check, Layers, ChevronDown, Shirt
} from 'lucide-react';
import Button from '../../Button';

// Bypass type issues
const Motion = motion as any;

// VTON Specific Gallery Data
const GALLERY_ITEMS = [
  { 
    id: 'v1', 
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', 
    title: 'کالکشن بهاره ۱۴۰۳',
    category: 'فشن',
    prompt: 'مدل زن با کت کرم رنگ و شلوار جین، استایل کژوال، نور طبیعی روز، پس‌زمینه خیابان شهری.',
    model: 'Nano Banana Pro',
    date: '۱۴۰۳/۰۳/۱۲',
    dimensions: '1024x1536'
  },
  { 
    id: 'v2', 
    imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop', 
    title: 'لباس شب مخمل',
    category: 'مجلسی',
    prompt: 'پیراهن مجلسی مخمل مشکی بلند، نورپردازی استودیویی دراماتیک، ژست ایستاده، میکاپ لایت.',
    model: 'Flux 2 Pro',
    date: '۱۴۰۳/۰۳/۱۵',
    dimensions: '1024x1536'
  },
  { 
    id: 'v3', 
    imageUrl: 'https://images.unsplash.com/photo-1605763240004-7d93b172d7cd?q=80&w=1000&auto=format&fit=crop', 
    title: 'ست ورزشی نایک',
    category: 'اسپرت',
    prompt: 'پسر جوان با هودی و شلوار ورزشی طوسی، کفش‌های رانینگ، محیط باشگاه بدنسازی مدرن.',
    model: 'Luma VTON 4.0',
    date: '۱۴۰۳/۰۳/۱۸',
    dimensions: '1024x1024'
  },
  { 
    id: 'v4', 
    imageUrl: 'https://images.unsplash.com/photo-1589465885857-44edb59ef526?q=80&w=1000&auto=format&fit=crop', 
    title: 'کت و شلوار اداری',
    category: 'رسمی',
    prompt: 'کت و شلوار سرمه‌ای رسمی، پیراهن سفید، کراوات زرشکی، فضای دفتر کار مدرن با نور پنجره.',
    model: 'Nano Banana Pro',
    date: '۱۴۰۳/۰۳/۲۰',
    dimensions: '1024x1536'
  },
  { 
    id: 'v5', 
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1000&auto=format&fit=crop', 
    title: 'استایل خیابانی تهران',
    category: 'مانتو',
    prompt: 'مانتو کتان سبز زیتونی، شال نخی، شلوار بگ، لوکیشن کافه فضای باز، نور ساعت طلایی.',
    model: 'Flux 2 Pro',
    date: '۱۴۰۳/۰۳/۲۲',
    dimensions: '1024x1536'
  },
  { 
    id: 'v6', 
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop', 
    title: 'پالتو چرم زنانه',
    category: 'زمستانی',
    prompt: 'پالتو چرم بلند قهوه‌ای، بوت‌های چرمی، شال گردن بافتنی، فضای پاییزی با برگ‌های خشک.',
    model: 'Nano Banana',
    date: '۱۴۰۳/۰۳/۲۵',
    dimensions: '1024x1536'
  },
  { 
    id: 'v7', 
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop', 
    title: 'پیراهن تابستانی',
    category: 'کژوال',
    prompt: 'پیراهن نخی گلدار روشن، کلاه حصیری، صندل تابستانی، لوکیشن ساحلی با نور شدید آفتاب.',
    model: 'Luma VTON 4.0',
    date: '۱۴۰۳/۰۳/۲۸',
    dimensions: '1024x1536'
  },
  { 
    id: 'v8', 
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop', 
    title: 'تیشرت و جین',
    category: 'پایه',
    prompt: 'تیشرت سفید ساده یقه گرد، شلوار جین آبی کلاسیک، ژست ریلکس نشسته روی صندلی.',
    model: 'Nano Banana Pro',
    date: '۱۴۰۳/۰۳/۳۰',
    dimensions: '1024x1024'
  },
  { 
    id: 'v9', 
    imageUrl: 'https://images.unsplash.com/photo-1550614000-4b9519e09d5a?q=80&w=1000&auto=format&fit=crop', 
    title: 'هودی اورسایز',
    category: 'استریت ویر',
    prompt: 'هودی مشکی اورسایز با چاپ گرافیکی، کلاه کپ، شلوار کارگو، نورپردازی نئونی شب.',
    model: 'Flux 2 Pro',
    date: '۱۴۰۳/۰۴/۰۲',
    dimensions: '1024x1536'
  }
];

// Reusing Modal Component Logic
const GalleryModal = ({ item, onClose }: { item: typeof GALLERY_ITEMS[0]; onClose: () => void }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-all"
        onClick={onClose}
      />
      <Motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative flex flex-col lg:flex-row bg-[#0c0c0e] rounded-[28px] overflow-hidden shadow-2xl border border-white/10 w-auto h-auto max-w-[95vw] lg:max-w-6xl max-h-[90vh]"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        layout
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-white border border-white/5 hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="relative flex items-center justify-center bg-black/20 overflow-hidden min-h-[300px] lg:min-h-[500px] flex-1">
           <img 
             src={item.imageUrl} 
             alt={item.title} 
             className="relative block w-full h-full object-contain z-10 shadow-2xl"
           />
        </div>

        <div className="flex flex-col w-full lg:w-[400px] border-t lg:border-t-0 lg:border-r border-white/10 bg-[#0c0c0e] shrink-0 h-full lg:h-auto overflow-hidden">
           <div className="p-6 border-b border-white/5 shrink-0">
              <h3 className="text-2xl font-black text-white mb-2">{item.title}</h3>
              <div className="flex items-center gap-2">
                 <span className="px-2.5 py-0.5 rounded-md bg-luma-pink/10 border border-luma-pink/20 text-[11px] font-bold text-luma-pink uppercase tracking-wider">
                   {item.category}
                 </span>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-luma-pink text-[10px] font-black uppercase tracking-widest">
                   <Sparkles size={12} />
                   <span>دستور متنی (Prompt)</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                   <p className="text-gray-300 text-sm leading-7 font-light text-justify select-text">
                      {item.prompt}
                   </p>
                </div>
              </div>

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

           <div className="p-6 border-t border-white/5 shrink-0">
              <div className="grid grid-cols-4 gap-2">
                 <Button 
                    variant="secondary" 
                    onClick={handleCopyPrompt}
                    className="col-span-1 px-0 flex items-center justify-center text-gray-400 hover:text-white"
                 >
                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                 </Button>
                 <Button variant="primary" className="col-span-2 py-3 text-sm font-bold shadow-lg shadow-luma-pink/10 bg-luma-pink text-black hover:bg-white border-none">
                    <Download size={16} />
                    <span className="mr-1">دانلود</span>
                 </Button>
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

export const VtonGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      
      {/* --- Top Gradient Fade --- */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-pink/10 blur-[150px] rounded-full mix-blend-screen opacity-50" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-purple/10 blur-[150px] rounded-full mix-blend-screen opacity-50" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
      </div>

      {/* --- Bottom Gradient Fade --- */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md"
          >
             <Layers className="text-luma-pink" size={14} />
             <span className="text-gray-300 font-medium text-xs tracking-wide">ویترین مدل‌ها</span>
          </Motion.div>
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            گالری <span className="text-gradient-animated">استایل‌های هوشمند</span>
          </Motion.h2>
          <Motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed font-light"
          >
            نمونه‌هایی از خروجی‌های واقعی که با ابزار پرو مجازی لوما تولید شده‌اند.
          </Motion.p>
        </div>

        <Motion.div 
           variants={containerVariants}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-50px" }}
           className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
            {GALLERY_ITEMS.map((item) => (
              <Motion.div
                key={item.id}
                variants={itemVariants}
                onClick={() => setSelectedItem(item)}
                className="break-inside-avoid relative group rounded-[24px] overflow-hidden cursor-pointer bg-[#121212] border border-white/5 shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-luma-pink/20 hover:-translate-y-2"
              >
                 <div className="relative overflow-hidden w-full">
                   <img 
                     src={item.imageUrl} 
                     alt={item.title} 
                     className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                     loading="lazy"
                   />
                   
                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                     <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="text-[10px] font-bold text-black bg-luma-pink px-2 py-0.5 rounded shadow-lg">{item.category}</span>
                        </div>
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                     </div>
                   </div>
                   
                   {/* Zoom Icon */}
                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-black transition-colors">
                        <ZoomIn size={18} />
                      </div>
                   </div>
                 </div>
              </Motion.div>
            ))}
        </Motion.div>

        <Motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-20"
        >
           <Button variant="secondary" className="px-12 py-4 text-sm hover:bg-white/10 hover:border-white/20 transition-all group">
             <span>مشاهده همه طرح‌ها</span>
             <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
           </Button>
        </Motion.div>
      </div>

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
