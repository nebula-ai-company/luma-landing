
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  BookOpen, Search, 
  Layers, 
  GraduationCap, 
  Image as ImageIcon, Building2, ShieldCheck, 
  ChevronLeft, LayoutGrid, Rocket, MessageSquare, Sparkles, ChevronRight,
  WifiOff, RefreshCw, AlertCircle, X, CheckCircle2
} from 'lucide-react';
import CTA from '../components/CTA';
import { TutorialViewer } from '../components/TutorialViewer';
import navigationFallback from '../components/navigation-fallback.json';

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

const ALLOWED_CATEGORIES = [
  "مقدمه و معرفی",
  "شروع به کار",
  "سرویس‌های پردازش تصویر و ویدیو",
  "سرویس‌های متنی و پردازشی",
  "راهکارهای سازمانی و توسعه اختصاصی",
  "قوانین و پشتیبانی"
];

export interface CategoryMetaConfig {
  icon: any;
  color: string;
  hex: string;
  desc: string;
  gradient: string;
  difficulty: string;
  outcome: string;
  prerequisites: string;
}

const CATEGORY_CONFIG: Record<string, CategoryMetaConfig> = {
  "مقدمه و معرفی": { 
    icon: GraduationCap, 
    color: "text-luma-yellow", 
    hex: "#FFB340",
    desc: "آشنایی با مفاهیم پایه، هوش مصنوعی مولد و اکوسیستم لوما.",
    gradient: "from-luma-yellow/20 to-transparent",
    difficulty: "مقدماتی",
    outcome: "شناخت نقشه راه لوما و انتخاب ابزارهای مناسب جهت شروع کار",
    prerequisites: "بدون پیش‌نیاز (مناسب برای تمامی کاربران)"
  },
  "شروع به کار": { 
    icon: Rocket, 
    color: "text-luma-pink", 
    hex: "#FF6482",
    desc: "راهنمای گام‌به‌گام ساخت حساب، احراز هویت و شارژ کیف پول.",
    gradient: "from-luma-pink/20 to-transparent",
    difficulty: "مقدماتی",
    outcome: "ایجاد حساب کاربری، مدیریت کیف پول و تسلط کامل بر داشبورد",
    prerequisites: "شماره موبایل فعال جهت ثبت‌نام"
  },
  "سرویس‌های پردازش تصویر و ویدیو": { 
    icon: ImageIcon, 
    color: "text-luma-purple", 
    hex: "#DA8FFF",
    desc: "آموزش کامل ابزارهای تولید تصویر، ویرایش، حذف پس‌زمینه و ساخت ویدیو.",
    gradient: "from-luma-purple/20 to-transparent",
    difficulty: "متوسط تا پیشرفته",
    outcome: "تولید و ویرایش حرفه‌ای تصویر و ویدیو همراه با حذف پس‌زمینه و پرامپت‌نویسی",
    prerequisites: "آشنایی اولیه با ابزارهای دیجیتال"
  },
  "سرویس‌های متنی و پردازشی": { 
    icon: MessageSquare, 
    color: "text-luma-yellow", 
    hex: "#FFB340",
    desc: "نحوه استفاده از دستیار هوشمند و مدل‌های زبانی برای تولید محتوا.",
    gradient: "from-luma-yellow/20 to-transparent",
    difficulty: "متوسط",
    outcome: "به‌کارگیری چت‌بات‌ها و ساخت دستیار هوشمند اختصاصی",
    prerequisites: "مفاهیم پایه تولید محتوای متنی"
  },
  "راهکارهای سازمانی و توسعه اختصاصی": { 
    icon: Building2, 
    color: "text-luma-pink", 
    hex: "#FF6482",
    desc: "خدمات ویژه کسب‌وکارها، مشاوره فنی و پیاده‌سازی اختصاصی.",
    gradient: "from-luma-pink/20 to-transparent",
    difficulty: "پیشرفته",
    outcome: "اتصال به API لوما و یکپارچه‌سازی با پلاگین‌های وردپرس و ووکامرس",
    prerequisites: "دانش برنامه‌نویسی یا مدیریت سیستم‌های تحت وب"
  },
  "قوانین و پشتیبانی": { 
    icon: ShieldCheck, 
    color: "text-luma-purple", 
    hex: "#DA8FFF",
    desc: "شرایط استفاده، حریم خصوصی و راه‌های تماس با پشتیبانی.",
    gradient: "from-luma-purple/20 to-transparent",
    difficulty: "عمومی",
    outcome: "آگاهی کامل از شرایط استفاده، حریم خصوصی و کانال‌های ارتباطی پشتیبانی",
    prerequisites: "بدون پیش‌نیاز"
  }
};

const FallbackConfig: CategoryMetaConfig = { 
  icon: Layers, 
  color: "text-gray-400", 
  hex: "#9CA3AF",
  desc: "مجموعه مقالات آموزشی و راهنماهای کاربردی.",
  gradient: "from-gray-500/20 to-transparent",
  difficulty: "عمومی",
  outcome: "ارتقای اطلاعات و یادگیری قابلیت‌های لوما",
  prerequisites: "بدون پیش‌نیاز"
};

// Helper for progress persistence
const getCompletedItemsFromStorage = (): string[] => {
  try {
    const saved = localStorage.getItem('luma_tutorial_completed_items');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// --- Components ---

interface CategoryCardProps { 
  section: NavSection; 
  onClick: () => void;
  index: number;
  completedItems: string[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  section, 
  onClick,
  index,
  completedItems
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const titleKey = section.title.trim();
  const config = CATEGORY_CONFIG[titleKey] || FallbackConfig;
  const Icon = config.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const completedCount = section.items.filter(item => completedItems.includes(item.id)).length;
  const hasProgress = completedCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: prefersReducedMotion ? 0 : index * 0.06, 
        duration: prefersReducedMotion ? 0.1 : 0.45,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="h-full"
    >
      <div 
          ref={divRef}
          onMouseMove={handleMouseMove}
          onClick={onClick}
          className="group relative h-full rounded-[32px] p-px overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 bg-zinc-200/60 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 shadow-sm hover:shadow-xl dark:hover:shadow-2xl"
      >
          {/* Dynamic Border Gradient */}
          <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
              style={{
                  background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${config.hex}30, transparent 40%)`
              }}
          />

          {/* Inner Content Container */}
          <div className="relative h-full bg-white dark:bg-[#0c0c0e] rounded-[31px] overflow-hidden flex flex-col p-8">
              
              {/* Unified Background Gradient */}
              <div 
                 className="absolute bottom-0 left-0 right-0 h-3/4 opacity-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-10 dark:group-hover:opacity-20"
                 style={{
                   background: `linear-gradient(to top, ${config.hex}, transparent)`
                 }}
              />

              {/* Subtle Inner Glow following cursor */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${config.hex}, transparent 40%)`
                }}
              />
              
              {/* Noise Texture */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                   <div className={`w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 flex items-center justify-center ${config.color} group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:bg-zinc-200/80 dark:group-hover:bg-white/10`}>
                      <Icon size={28} />
                   </div>
                   
                   <div className="flex items-center gap-2">
                      {hasProgress && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 size={12} />
                          {completedCount}/{section.items.length}
                        </span>
                      )}
                      <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-400 dark:text-gray-500 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors border border-zinc-200 dark:border-white/5 group-hover:border-zinc-950 dark:group-hover:border-white">
                         <ChevronLeft size={16} />
                      </div>
                   </div>
                </div>
                
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-zinc-950 dark:group-hover:text-gray-100 transition-colors">
                   {section.title}
                </h3>
                
                <p className="text-sm text-zinc-600 dark:text-gray-400 leading-relaxed font-light mb-6 flex-1 line-clamp-3 group-hover:text-zinc-850 dark:group-hover:text-gray-300 transition-colors">
                   {config.desc}
                </p>

                <div className="pt-6 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs text-zinc-500 dark:text-gray-400 group-hover:border-zinc-200 dark:group-hover:border-white/10 transition-colors">
                   <span className="flex items-center gap-1.5 font-medium">
                      <BookOpen size={14} className={config.color} />
                      {section.items.length} درس
                   </span>
                   <span className="flex items-center gap-1.5 font-medium">
                      <GraduationCap size={14} className="text-zinc-400 dark:text-gray-500" />
                      {config.difficulty}
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
  const [isOfflineFallback, setIsOfflineFallback] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const prefersReducedMotion = useReducedMotion();

  // Load Progress from LocalStorage
  useEffect(() => {
    setCompletedItems(getCompletedItemsFromStorage());
  }, []);

  // Fetch Categories
  const fetchNav = async () => {
    try {
      setIsLoadingNav(true);
      setFetchError(null);
      setIsOfflineFallback(false);

      let data: any;
      try {
        const response = await fetch('https://luma-doc.nebula-ai-company.workers.dev/api/navigation');
        if (!response.ok) throw new Error('خطا در دریافت اطلاعات از سرور');
        data = await response.json();
      } catch (fetchErr) {
        console.warn('Failed to load tutorials nav from server, using fallback:', fetchErr);
        setIsOfflineFallback(true);
        data = navigationFallback;
      }
      
      if (data && data.navigation) {
        const filtered = data.navigation.filter((section: NavSection) => 
          ALLOWED_CATEGORIES.some(allowed => section.title.trim() === allowed)
        );

        filtered.sort((a: NavSection, b: NavSection) => {
           return ALLOWED_CATEGORIES.indexOf(a.title.trim()) - ALLOWED_CATEGORIES.indexOf(b.title.trim());
        });

        setCategories(filtered);
      } else {
        throw new Error('ساختار داده‌های دریافتی معتبر نیست');
      }
    } catch (err: any) {
      console.error("Failed to load tutorials nav", err);
      setFetchError('امکان دریافت سرفصل‌های آموزشی وجود ندارد. لطفاً اتصال شبکه خود را بررسی کرده و مجدداً تلاش کنید.');
    } finally {
      setIsLoadingNav(false);
    }
  };

  useEffect(() => {
    fetchNav();
  }, []);

  // Sync completion updates from reader
  const handleProgressChange = (updatedCompletedItems: string[]) => {
    setCompletedItems(updatedCompletedItems);
  };

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
     const q = searchQuery.toLowerCase().trim();
     return categories.filter(cat => 
        cat.title.toLowerCase().includes(q) || 
        cat.items.some(item => item.title.toLowerCase().includes(q))
     );
  }, [categories, searchQuery]);

  // Determine Active Configuration for Reader Mode
  const activeConfig = activeCategory 
    ? (CATEGORY_CONFIG[activeCategory.title.trim()] || FallbackConfig)
    : FallbackConfig;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white pt-20 selection:bg-luma-pink selection:text-white font-sans">
      
      {/* --- Adaptive Hero Section --- */}
      <div className="relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
         
         {/* Global Background Elements */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.04]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
         </div>

         <AnimatePresence mode="wait">
            
            {/* BROWSE HERO */}
            {viewMode === 'browse' && (
                <motion.section
                    key="browse-hero"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.35, ease: "easeInOut" }}
                    className="relative pt-32 pb-24"
                >
                    <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                    
                    {!prefersReducedMotion && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                          <motion.div 
                             animate={{ 
                                scale: [1, 1.2, 1], 
                                opacity: [0.15, 0.25, 0.15],
                                x: [0, 50, 0],
                                y: [0, -30, 0]
                             }}
                             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                             className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/15 dark:bg-luma-purple/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen"
                          />
                          <motion.div 
                             animate={{ 
                                scale: [1, 1.1, 1], 
                                opacity: [0.15, 0.25, 0.15],
                                x: [0, -30, 0],
                                y: [0, 50, 0]
                             }}
                             transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                             className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/15 dark:bg-luma-pink/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen"
                          />
                      </div>
                    )}

                    <div className="max-w-screen-2xl mx-auto px-6 relative z-20">
                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                            <motion.div 
                               initial={{ opacity: 0, y: 10 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: true }}
                               className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100/50 dark:bg-white/5 backdrop-blur-md shadow-md dark:shadow-lg"
                            >
                               <Sparkles size={14} className="text-luma-yellow" />
                               <span className="text-[10px] font-bold text-zinc-500 dark:text-gray-300 uppercase tracking-widest">Luma Academy</span>
                            </motion.div>

                            <motion.h1 
                               initial={{ opacity: 0, y: 10 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: true }}
                               transition={{ delay: 0.08 }}
                               className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight text-gradient-animated pb-2"
                            >
                               مرکز یادگیری و آموزش
                            </motion.h1>

                            <motion.p 
                               initial={{ opacity: 0, y: 10 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: true }}
                               transition={{ delay: 0.15 }}
                               className="text-lg text-zinc-600 dark:text-gray-400 mb-12 leading-relaxed font-light max-w-2xl"
                            >
                               از مفاهیم اولیه تا تکنیک‌های پیشرفته. با آموزش‌های جامع ما، پتانسیل کامل ابزارهای لوما را کشف کنید و خلاقیت خود را به سطح جدیدی برسانید.
                            </motion.p>

                            {/* Search Bar */}
                            <motion.div 
                               initial={{ opacity: 0, y: 16 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: true }}
                               transition={{ delay: 0.2 }}
                               className="w-full max-w-xl relative group z-20"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-luma-purple/30 to-luma-pink/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                                <div className="relative bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 rounded-2xl flex items-center h-14 px-4 shadow-xl dark:shadow-2xl transition-all group-focus-within:border-zinc-400 dark:group-focus-within:border-white/30">
                                    <Search size={20} className="ml-3 text-zinc-400 dark:text-gray-500 group-focus-within:text-zinc-850 dark:group-focus-within:text-white transition-colors" />
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="جستجوی موضوع یا آموزش..." 
                                        className="bg-transparent border-none outline-none text-base text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-600 w-full h-full font-light"
                                    />
                                    {searchQuery && (
                                      <button 
                                        onClick={() => setSearchQuery('')}
                                        className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
                                      >
                                        <X size={16} />
                                      </button>
                                    )}
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </motion.section>
            )}

            {/* READER HERO */}
            {viewMode === 'reader' && activeCategory && (
                <motion.section
                    key="reader-hero"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.35, ease: "easeInOut" }}
                    className="relative pt-32 pb-16"
                >
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] blur-[150px] rounded-full opacity-20 ${activeConfig.gradient.replace('from-', 'bg-').replace('/20', '')}`} />
                    </div>

                    <div className="max-w-screen-2xl mx-auto px-6 relative z-20">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-lg dark:shadow-2xl relative overflow-hidden shrink-0"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${activeConfig.gradient} opacity-20`} />
                                <activeConfig.icon size={48} className={`${activeConfig.color} relative z-10`} strokeWidth={1.5} />
                            </motion.div>

                            <div className="text-center md:text-right flex-1">
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center justify-center md:justify-start gap-3 mb-4 text-xs font-bold text-zinc-500 dark:text-gray-400 uppercase tracking-widest"
                                >
                                    <button 
                                        onClick={handleBackToBrowse} 
                                        className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 group/back bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/5"
                                    >
                                        <ChevronRight size={14} className="group-hover/back:translate-x-0.5 transition-transform" />
                                        بازگشت به لیست سرفصل‌ها
                                    </button>
                                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-gray-600" />
                                    <span className={activeConfig.color}>دوره آموزشی</span>
                                </motion.div>

                                <motion.h1 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight leading-tight"
                                >
                                    {activeCategory.title}
                                </motion.h1>

                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-lg text-zinc-600 dark:text-gray-400 leading-relaxed font-light max-w-2xl"
                                >
                                    {activeConfig.desc}
                                </motion.p>

                                {/* Meta Stats Pills */}
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6"
                                >
                                    <div className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center gap-2 text-xs text-zinc-700 dark:text-gray-300">
                                        <Layers size={14} className={activeConfig.color} />
                                        <span>{activeCategory.items.length} درس</span>
                                    </div>
                                    <div className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center gap-2 text-xs text-zinc-700 dark:text-gray-300">
                                        <GraduationCap size={14} className={activeConfig.color} />
                                        <span>سطح: {activeConfig.difficulty}</span>
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    </div>
                </motion.section>
            )}

         </AnimatePresence>

         <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 dark:from-[#0a0a0a] dark:via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* --- Main Content Area --- */}
      <div className="max-w-screen-2xl mx-auto px-6 py-12 relative z-10 min-h-[600px]">
         
         {/* Offline Banner Indicator */}
         {isOfflineFallback && viewMode === 'browse' && (
           <motion.div 
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-8 p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 flex flex-wrap items-center justify-between gap-4 text-xs text-amber-800 dark:text-amber-200"
           >
              <div className="flex items-center gap-2.5">
                 <WifiOff size={18} className="shrink-0 text-amber-600 dark:text-amber-400" />
                 <span>داده‌های اولیه به دلیل عدم دسترسی مستقیم شبکه، از نسخه آفلاین ذخیره‌شده بارگذاری شده‌اند.</span>
              </div>
              <button 
                onClick={fetchNav}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-100 font-bold transition-colors shrink-0 flex items-center gap-1.5"
              >
                 <RefreshCw size={12} />
                 بروزرسانی
              </button>
           </motion.div>
         )}

         <AnimatePresence mode="wait">
            
            {/* READER MODE */}
            {viewMode === 'reader' && activeCategory ? (
               <motion.div
                  key="reader"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
               >
                  <TutorialViewer 
                     activeCategory={activeCategory} 
                     categoryConfig={activeConfig}
                     initialPageId={activeCategory.items[0]?.id}
                     onBack={handleBackToBrowse}
                     completedItems={completedItems}
                     onProgressChange={handleProgressChange}
                  />
               </motion.div>
            ) : (
               /* BROWSE MODE */
               <motion.div
                  key="browse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.1 : 0.25 }}
               >
                  {/* Fetch Error State */}
                  {fetchError && categories.length === 0 && !isLoadingNav ? (
                     <div className="col-span-full py-20 px-6 text-center flex flex-col items-center justify-center bg-rose-500/5 border border-rose-500/20 rounded-[32px] max-w-2xl mx-auto">
                        <AlertCircle size={44} className="text-rose-500 mb-4" />
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">خطا در دریافت سرفصل‌های آموزشی</h3>
                        <p className="text-zinc-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                           {fetchError}
                        </p>
                        <button 
                           onClick={fetchNav}
                           className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                        >
                           <RefreshCw size={14} />
                           تلاش مجدد
                        </button>
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {isLoadingNav ? (
                           [1, 2, 3, 4, 5, 6].map(i => (
                              <div key={i} className="h-64 bg-zinc-100 dark:bg-white/5 rounded-[32px] animate-pulse border border-zinc-200 dark:border-white/5 flex flex-col p-8 justify-between">
                                 <div className="flex justify-between items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-zinc-200 dark:bg-white/10" />
                                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-white/10" />
                                 </div>
                                 <div className="space-y-3">
                                    <div className="h-5 bg-zinc-200 dark:bg-white/10 rounded-lg w-2/3" />
                                    <div className="h-4 bg-zinc-200 dark:bg-white/10 rounded-lg w-full" />
                                    <div className="h-4 bg-zinc-200 dark:bg-white/10 rounded-lg w-4/5" />
                                 </div>
                                 <div className="pt-4 border-t border-zinc-200/50 dark:border-white/5 flex justify-between">
                                    <div className="h-3 bg-zinc-200 dark:bg-white/10 rounded w-1/4" />
                                    <div className="h-3 bg-zinc-200 dark:bg-white/10 rounded w-1/4" />
                                 </div>
                              </div>
                           ))
                        ) : (
                           filteredCategories.map((cat, i) => (
                              <CategoryCard 
                                 key={cat.id} 
                                 section={cat} 
                                 index={i} 
                                 completedItems={completedItems}
                                 onClick={() => handleSelectCategory(cat)} 
                              />
                           ))
                        )}
                        
                        {/* Empty Search Results State */}
                        {filteredCategories.length === 0 && !isLoadingNav && !fetchError && (
                           <div className="col-span-full py-24 px-6 text-center flex flex-col items-center justify-center bg-zinc-50 dark:bg-white/[0.02] border border-dashed border-zinc-200 dark:border-white/10 rounded-[32px]">
                              <LayoutGrid size={48} className="text-zinc-400 dark:text-gray-600 mb-4 opacity-50" />
                              <h3 className="text-xl font-bold text-zinc-900 dark:text-gray-200 mb-2">موردی یافت نشد</h3>
                              <p className="text-zinc-500 dark:text-gray-400 text-sm mb-6">
                                 هیچ عنوان آموزشی با عبارت «{searchQuery}» پیدا نشد.
                              </p>
                              <button
                                 onClick={() => setSearchQuery('')}
                                 className="px-4 py-2 rounded-xl bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20 text-zinc-800 dark:text-white text-xs font-bold transition-colors flex items-center gap-2"
                              >
                                 <X size={14} />
                                 پاک کردن جستجو
                              </button>
                           </div>
                        )}
                     </div>
                  )}
               </motion.div>
            )}

         </AnimatePresence>
      </div>

      <CTA />
    </div>
  );
};

export default TutorialsPage;

