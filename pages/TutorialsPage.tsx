
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, 
  Clock, Layers, 
  GraduationCap, 
  Image as ImageIcon, Building2, ShieldCheck, 
  ChevronLeft, LayoutGrid, Rocket, MessageSquare, Sparkles
} from 'lucide-react';
import CTA from '../components/CTA';
import { TutorialViewer } from '../components/TutorialViewer';

// --- Types ---

interface NavItem {
  id: string;
  title: string;
  url: string;
}

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

// --- Configuration & Constants ---

// Specific categories to include (matching API titles roughly)
const ALLOWED_CATEGORIES = [
  "مقدمه و معرفی",
  "شروع به کار",
  "سرویس‌های پردازش تصویر و ویدیو",
  "سرویس‌های متنی و پردازشی",
  "راهکارهای سازمانی و توسعه اختصاصی",
  "قوانین و پشتیبانی"
];

// Mapping API Titles to Visual Assets using strict Luma Colors
const CATEGORY_CONFIG: Record<string, { icon: any, color: string, hex: string, desc: string, gradient: string }> = {
  "مقدمه و معرفی": { 
    icon: GraduationCap, 
    color: "text-luma-yellow", 
    hex: "#FFB340",
    desc: "آشنایی با مفاهیم پایه، هوش مصنوعی مولد و اکوسیستم لوما.",
    gradient: "from-luma-yellow/20 to-transparent"
  },
  "شروع به کار": { 
    icon: Rocket, 
    color: "text-luma-pink", 
    hex: "#FF6482",
    desc: "راهنمای گام‌به‌گام ساخت حساب، احراز هویت و شارژ کیف پول.",
    gradient: "from-luma-pink/20 to-transparent"
  },
  "سرویس‌های پردازش تصویر و ویدیو": { 
    icon: ImageIcon, 
    color: "text-luma-purple", 
    hex: "#DA8FFF",
    desc: "آموزش کامل ابزارهای تولید تصویر، ویرایش، حذف پس‌زمینه و ساخت ویدیو.",
    gradient: "from-luma-purple/20 to-transparent"
  },
  "سرویس‌های متنی و پردازشی": { 
    icon: MessageSquare, 
    color: "text-luma-yellow", 
    hex: "#FFB340",
    desc: "نحوه استفاده از دستیار هوشمند و مدل‌های زبانی برای تولید محتوا.",
    gradient: "from-luma-yellow/20 to-transparent"
  },
  "راهکارهای سازمانی و توسعه اختصاصی": { 
    icon: Building2, 
    color: "text-luma-pink", 
    hex: "#FF6482",
    desc: "خدمات ویژه کسب‌وکارها، مشاوره فنی و پیاده‌سازی اختصاصی.",
    gradient: "from-luma-pink/20 to-transparent"
  },
  "قوانین و پشتیبانی": { 
    icon: ShieldCheck, 
    color: "text-luma-purple", 
    hex: "#DA8FFF",
    desc: "شرایط استفاده، حریم خصوصی و راه‌های تماس با پشتیبانی.",
    gradient: "from-luma-purple/20 to-transparent"
  }
};

const FallbackConfig = { 
  icon: Layers, 
  color: "text-gray-400", 
  hex: "#9CA3AF",
  desc: "مجموعه مقالات آموزشی و راهنماهای کاربردی.",
  gradient: "from-gray-500/20 to-transparent"
};

// --- Components ---

interface CategoryCardProps { 
  section: NavSection; 
  onClick: () => void;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  section, 
  onClick,
  index 
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Normalize title for mapping
  const titleKey = section.title.trim();
  const config = CATEGORY_CONFIG[titleKey] || FallbackConfig;
  const Icon = config.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="h-full"
    >
      <div 
          ref={divRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
          className="group relative h-full rounded-[32px] p-px overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.03)',
          }}
      >
          {/* Dynamic Border Gradient */}
          <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
              style={{
                  background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${config.hex}50, transparent 40%)`
              }}
          />

          {/* Inner Content Container */}
          <div className="relative h-full bg-[#0c0c0e] rounded-[31px] overflow-hidden flex flex-col p-8">
              
              {/* Unified Background Gradient */}
              <div 
                 className="absolute bottom-0 left-0 right-0 h-3/4 opacity-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
                 style={{
                   background: `linear-gradient(to top, ${config.hex}, transparent)`
                 }}
              />

              {/* Subtle Inner Glow following cursor */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${config.hex}, transparent 40%)`
                }}
              />
              
              {/* Noise Texture */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                   <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center ${config.color} group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:bg-white/10`}>
                      <Icon size={28} />
                   </div>
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-black transition-colors border border-white/5 group-hover:border-white">
                      <ChevronLeft size={16} />
                   </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
                   {section.title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed font-light mb-6 flex-1 line-clamp-3 group-hover:text-gray-300 transition-colors">
                   {config.desc}
                </p>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 group-hover:border-white/10 transition-colors">
                   <span className="flex items-center gap-1.5 group-hover:text-gray-300 transition-colors">
                      <BookOpen size={14} />
                      {section.items.length} درس
                   </span>
                   <span className="flex items-center gap-1.5 group-hover:text-gray-300 transition-colors">
                      <Clock size={14} />
                      ~{section.items.length * 5} دقیقه
                   </span>
                </div>
              </div>
          </div>
      </div>
    </motion.div>
  );
};

// --- Main Page ---

const TutorialsPage: React.FC = () => {
  const [categories, setCategories] = useState<NavSection[]>([]);
  
  // Navigation State
  const [viewMode, setViewMode] = useState<'browse' | 'reader'>('browse');
  const [activeCategory, setActiveCategory] = useState<NavSection | null>(null);
  
  const [isLoadingNav, setIsLoadingNav] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Fetch Categories
  useEffect(() => {
    const fetchNav = async () => {
      try {
        setIsLoadingNav(true);
        const response = await fetch('https://luma-doc.nebula-ai-company.workers.dev/api/navigation');
        const data = await response.json();
        
        // Filter based on allowed titles
        const filtered = data.navigation.filter((section: NavSection) => 
          ALLOWED_CATEGORIES.some(allowed => section.title.trim() === allowed)
        );

        // Sort based on ALLOWED_CATEGORIES order
        filtered.sort((a: NavSection, b: NavSection) => {
           return ALLOWED_CATEGORIES.indexOf(a.title.trim()) - ALLOWED_CATEGORIES.indexOf(b.title.trim());
        });

        setCategories(filtered);
      } catch (err) {
        console.error("Failed to load tutorials nav", err);
      } finally {
        setIsLoadingNav(false);
      }
    };
    fetchNav();
  }, []);

  // Handle Category Selection
  const handleSelectCategory = (category: NavSection) => {
     setActiveCategory(category);
     setViewMode('reader');
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBrowse = () => {
     setViewMode('browse');
     setActiveCategory(null);
  };

  // Filter Logic
  const filteredCategories = useMemo(() => {
     if (!searchQuery) return categories;
     return categories.filter(cat => 
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        cat.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
     );
  }, [categories, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20 selection:bg-luma-pink selection:text-white font-sans">
      
      {/* --- Unified Hero Section --- */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#0a0a0a]">
         
         {/* Top Gradient Fade */}
         <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
         
         {/* Bottom Gradient Fade */}
         <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

         {/* Animated Background Ambience */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
               animate={{ 
                  scale: [1, 1.2, 1], 
                  opacity: [0.15, 0.25, 0.15],
                  x: [0, 50, 0],
                  y: [0, -30, 0]
               }}
               transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/20 blur-[120px] rounded-full mix-blend-screen"
            />
            <motion.div 
               animate={{ 
                  scale: [1, 1.1, 1], 
                  opacity: [0.15, 0.25, 0.15],
                  x: [0, -30, 0],
                  y: [0, 50, 0]
               }}
               transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/20 blur-[100px] rounded-full mix-blend-screen"
            />
            <motion.div 
               animate={{ 
                  scale: [0.9, 1.1, 0.9], 
                  opacity: [0.1, 0.2, 0.1],
                  x: [0, 20, 0],
                  y: [0, 20, 0]
               }}
               transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-luma-yellow/10 blur-[140px] rounded-full mix-blend-screen"
            />
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
            
            {/* Noise Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
         </div>

         <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg"
                >
                   <Sparkles size={14} className="text-luma-yellow" />
                   <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Luma Academy</span>
                </motion.div>

                <motion.h1 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 }}
                   className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight text-gradient-animated pb-2"
                >
                   مرکز یادگیری و آموزش
                </motion.h1>

                <motion.p 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 }}
                   className="text-lg text-gray-400 mb-12 leading-relaxed font-light max-w-2xl"
                >
                   از مفاهیم اولیه تا تکنیک‌های پیشرفته. با آموزش‌های جامع ما، پتانسیل کامل ابزارهای لوما را کشف کنید و خلاقیت خود را به سطح جدیدی برسانید.
                </motion.p>

                {/* Main Search Bar - Only visible in Browse Mode */}
                {viewMode === 'browse' && (
                   <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="w-full max-w-xl relative group z-20"
                   >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-luma-purple/30 to-luma-pink/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                      <div className="relative bg-[#0c0c0e] border border-white/10 rounded-2xl flex items-center h-14 px-4 shadow-2xl transition-all group-focus-within:border-white/30">
                         <Search size={20} className="ml-3 text-gray-500 group-focus-within:text-white transition-colors" />
                         <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="جستجوی موضوع یا آموزش..." 
                            className="bg-transparent border-none outline-none text-base text-white placeholder:text-gray-600 w-full h-full font-light"
                         />
                      </div>
                   </motion.div>
                )}

            </div>
         </div>
      </section>

      {/* --- Main Content Area --- */}
      <div className="max-w-screen-2xl mx-auto px-6 py-16 relative z-10 min-h-[600px]">
         <AnimatePresence mode="wait">
            
            {/* --- READER MODE (Full Screen) --- */}
            {viewMode === 'reader' && activeCategory ? (
               <motion.div
                  key="reader"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
               >
                  <TutorialViewer 
                     activeCategory={activeCategory} 
                     initialPageId={activeCategory.items[0]?.id}
                     onBack={handleBackToBrowse}
                  />
               </motion.div>
            ) : (
               /* --- BROWSE MODE --- */
               <motion.div
                  key="browse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
               >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                     {isLoadingNav ? (
                        [1,2,3,4,5,6].map(i => (
                           <div key={i} className="h-64 bg-white/5 rounded-[32px] animate-pulse border border-white/5" />
                        ))
                     ) : (
                        filteredCategories.map((cat, i) => (
                           <CategoryCard 
                              key={cat.id} 
                              section={cat} 
                              index={i} 
                              onClick={() => handleSelectCategory(cat)} 
                           />
                        ))
                     )}
                     
                     {filteredCategories.length === 0 && !isLoadingNav && (
                        <div className="col-span-full py-32 text-center flex flex-col items-center justify-center">
                           <LayoutGrid size={48} className="text-gray-600 mb-4 opacity-50" />
                           <h3 className="text-xl font-bold text-gray-300 mb-2">موردی یافت نشد</h3>
                           <p className="text-gray-500 text-sm">لطفاً جستجوی خود را تغییر دهید.</p>
                        </div>
                     )}
                  </div>
               </motion.div>
            )}

         </AnimatePresence>
      </div>

      <CTA />
    </div>
  );
};

export default TutorialsPage;
