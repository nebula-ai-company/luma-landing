
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ShoppingBag, Star, Zap, Search, 
  Home, MapPin, Share2, Heart, Wand2, Menu as MenuIcon,
  CheckCircle2, Sliders, MoveLeft, MoreHorizontal, Bell,
  Maximize2, Grid
} from 'lucide-react';

import { useTheme } from '../lib/ThemeContext';
import { fetchCachedJson, getFileUrl, HOMEPAGE_THUMB_MEDIUM } from '../lib/pbCache';
import { useSectionVisibility } from '../lib/useSectionVisibility';

// Bypass type issues with framer-motion props
const Motion = motion as any;

// --- Types & Data ---

type UseCase = {
  id: string;
  badge: string;
  badgeIcon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  color: string;
  url: string;
  beforeImage: string;
  afterImage: string;
  scanColor: string;
};

const USE_CASES: UseCase[] = [
  {
    id: 'ecommerce',
    badge: 'مخصوص فروشگاه‌های اینترنتی',
    badgeIcon: Sparkles,
    title: 'انقلاب در عکاسی محصول',
    subtitle: 'بدون نیاز به استودیو',
    description: 'با هوش مصنوعی لوما، تصاویر ساده و بی‌روح محصولات و لباس‌ها را در کمترین زمان به عکس‌های تبلیغاتی باکیفیت و مدل‌های متنوع تبدیل کنید.',
    gradient: 'from-[#DA8FFF] via-[#FF6482] to-[#FFB340]',
    color: 'text-luma-pink',
    url: 'mystore.com/products/classic-tee',
    beforeImage: '',
    afterImage: '',
    scanColor: '#FF6482' // Pink
  },
  {
    id: 'realestate',
    badge: 'املاک و معماری',
    badgeIcon: Home,
    title: 'بازآفرینی فضای داخلی',
    subtitle: 'چیدمان مجازی هوشمند',
    description: 'خانه‌های خالی را در چند ثانیه به فضاهای مبله و دنج تبدیل کنید. فروش سریع‌تر با هزینه‌ی کمتر.',
    gradient: 'from-[#FFB340] via-[#FACC15] to-[#DA8FFF]',
    color: 'text-luma-yellow',
    url: 'luxury-estates.com/listings/penthouse-4b',
    beforeImage: '',
    afterImage: '',
    scanColor: '#FFB340' // Yellow
  },
  {
    id: 'creative',
    badge: 'تولید محتوا و تبلیغات',
    badgeIcon: Wand2,
    title: 'خلاقیت بدون مرز',
    subtitle: 'ویرایش جادویی تصاویر',
    description: 'پس‌زمینه را تغییر دهید، المان‌ها را حذف کنید و در کسری از ثانیه پوسترهای تبلیغاتی خیره‌کننده بسازید.',
    gradient: 'from-[#DA8FFF] via-[#A855F7] to-[#6366F1]',
    color: 'text-luma-purple',
    url: 'creator-studio.app/project/campaign-01',
    beforeImage: '',
    afterImage: '',
    scanColor: '#DA8FFF' // Purple
  }
];

// --- Shared Image Comparison Component ---

const ComparisonView = ({ data, phase }: { data: UseCase; phase: string }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-10 pointer-events-none select-none">
      <div className="relative w-full max-w-[340px] aspect-[4/5] shadow-2xl rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-black/5 transform transition-transform duration-700 hover:scale-[1.02]">
        
        {/* 1. Before Image */}
        <div className="absolute inset-0">
            {data.beforeImage ? (
                <img 
                    src={data.beforeImage}
                    alt="Original" 
                    className="w-full h-full object-cover grayscale opacity-90"
                    referrerPolicy="no-referrer"
                />
            ) : (
                <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            )}
            <Motion.div 
                animate={{ opacity: phase === 'complete' ? 0 : 1 }}
                className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 z-10 shadow-lg"
            >
                تصویر اولیه
            </Motion.div>
        </div>

        {/* 2. After Image (Revealed by ClipPath) */}
        <Motion.div 
            className="absolute inset-0 z-20"
            initial={{ clipPath: "inset(0 100% 0 0)" }} // RTL Reveal
            animate={{ 
                clipPath: (phase === 'scanning' || phase === 'complete') ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" 
            }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {data.afterImage ? (
                <img 
                    src={data.afterImage}
                    alt="Generated" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                />
            ) : (
                <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            )}
            {/* Subtle Inner Highlight */}
            <div className="absolute inset-0 ring-1 ring-white/10 inset-shadow" />
            
            {/* Luma Badge */}
            <Motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-xl text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-2 border border-white/10"
            >
                <Sparkles size={12} style={{ color: data.scanColor }} />
                <span>لوما</span>
            </Motion.div>
        </Motion.div>

        {/* 3. The Scanner Line */}
        <Motion.div
            className="absolute top-0 bottom-0 w-[2px] z-30"
            initial={{ left: "0%", opacity: 0 }}
            animate={{ 
                left: phase === 'scanning' ? ["0%", "100%"] : "100%",
                opacity: phase === 'scanning' ? 1 : 0
            }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="absolute inset-y-0 -left-px w-1 bg-white shadow-[0_0_15px_2px_rgba(255,255,255,1)]" />
            <div className="absolute inset-y-0 -left-[2px] w-[3px]" style={{ backgroundColor: data.scanColor }} />
            <div className="absolute inset-y-0 -left-20 w-20 bg-gradient-to-r from-transparent to-white/20" />
        </Motion.div>

        {/* 4. Magic Trigger Button (Visible in Idle) */}
        <AnimatePresence>
            {phase === 'idle' && (
                <Motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
                    className="absolute inset-0 flex items-center justify-center z-40 bg-black/20 backdrop-blur-[2px]"
                >
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 rounded-full blur-xl animate-pulse opacity-50 transition-opacity group-hover:opacity-80" style={{ backgroundColor: data.scanColor }} />
                        <div className="relative bg-[#111] text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl border border-white/10 ring-4 ring-black/20 group-hover:scale-105 transition-transform">
                            <Zap size={18} style={{ color: data.scanColor }} fill="currentColor" />
                            <span className="font-bold text-sm tracking-wide">تولید هوشمند</span>
                        </div>
                    </div>
                </Motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Refined Layouts ---

const EcommerceLayout = ({ isComplete, data, phase }: { isComplete: boolean; data: UseCase; phase: string }) => (
  <div className="flex-1 flex flex-col md:grid md:grid-cols-2 md:h-full bg-white font-sans">
    
    {/* Product Visual */}
    <div className="bg-[#F3F4F6] order-1 md:order-1 relative flex items-center justify-center border-b md:border-b-0 md:border-l border-gray-100 p-4 min-h-[360px] md:min-h-0 md:h-full">
        <ComparisonView data={data} phase={phase} />
    </div>
    
    {/* Product Details */}
    <div className="flex flex-col md:h-full bg-white relative z-10 order-2 md:order-2 text-right dir-rtl">
        {/* Header Actions */}
        <div className="flex items-center justify-between p-6 pb-2">
             <div className="px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold tracking-wide uppercase shadow-lg shadow-black/20">
                کلکسیون جدید
             </div>
             <div className="flex gap-3 text-gray-400">
                <Heart size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
                <Share2 size={20} className="hover:text-black cursor-pointer transition-colors" />
             </div>
        </div>

        <div className="px-8 md:px-12 py-4 flex flex-col md:h-full">
            {/* Title & Rating */}
            <Motion.h3 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-3xl lg:text-4xl font-black text-gray-900 mb-3 leading-tight"
            >
                {data.title}
            </Motion.h3>
            
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-baseline gap-2">
                   <span className="text-2xl font-bold text-gray-900">۹۵۰,۰۰۰</span>
                   <span className="text-sm font-medium text-gray-500">تومان</span>
                </div>
                <div className="h-4 w-px bg-gray-200" />
                <div className="flex items-center gap-1 text-amber-400">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold text-gray-700 pt-0.5 ml-1">۴.۸</span>
                    <span className="text-xs text-gray-400 underline cursor-pointer">(۴۲۰ نظر)</span>
                </div>
            </div>

            {/* Selectors */}
            <div className="space-y-6 mb-8">
                <div>
                    <span className="text-xs font-bold text-gray-500 uppercase mb-3 block tracking-wider">رنگ</span>
                    <div className="flex gap-3">
                        {['#1F2937', '#E5E7EB', '#D97706'].map((c, i) => (
                            <div key={i} className={`w-9 h-9 rounded-full border-2 cursor-pointer shadow-sm transition-transform hover:scale-110 ${i===0 ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-900' : 'border-transparent'}`} style={{ backgroundColor: c }} />
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-3 items-baseline">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">سایز</span>
                        <span className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer font-medium">راهنمای سایز</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {['S', 'M', 'L', 'XL'].map((size, i) => (
                            <button key={size} className={`h-11 rounded-xl text-sm font-bold border transition-all ${i === 1 ? 'bg-black text-white border-black shadow-lg shadow-black/20' : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50'}`}>
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Actions */}
            <div className="mt-auto pt-6 border-t border-gray-50 pb-6">
                <Motion.button 
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ y: -2 }}
                    className="w-full bg-black text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl shadow-black/10 transition-all"
                >
                    <ShoppingBag size={20} />
                    <span className="text-lg">افزودن به سبد خرید</span>
                </Motion.button>
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500 font-medium">
                    <CheckCircle2 size={14} className="text-green-500" />
                    <span>گارانتی اصالت و سلامت فیزیکی کالا</span>
                </div>
            </div>
        </div>
    </div>
  </div>
);

const RealEstateLayout = ({ isComplete, data, phase, agentAvatarUrl, agentAvatarLoading }: { isComplete: boolean; data: UseCase; phase: string; agentAvatarUrl: string; agentAvatarLoading: boolean }) => (
  <div className="flex-1 flex flex-col md:grid md:grid-cols-2 md:h-full bg-white font-sans">
    
    {/* Visual - Fixed minimum height on mobile */}
    <div className="bg-[#F8F9FA] order-1 md:order-1 relative flex items-center justify-center border-b md:border-b-0 md:border-l border-gray-100 p-4 min-h-[360px] md:min-h-0 md:h-full">
        <ComparisonView data={data} phase={phase} />
    </div>
    
    {/* Listing Details */}
    <div className="flex flex-col md:h-full bg-white relative z-10 order-2 md:order-2 text-right dir-rtl">
        {/* Luxury Header */}
        <div className="p-8 md:p-12 pb-2 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-luma-yellow uppercase">پیشنهاد ویژه</span>
                    <Motion.h3 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} 
                        className="text-3xl font-black text-gray-900 leading-tight"
                    >
                        پنت‌هاوس زعفرانیه
                    </Motion.h3>
                 </div>
                 <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
                    <Heart size={20} />
                 </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 mb-8 text-sm font-medium border-b border-gray-100 pb-6">
                <MapPin size={16} className="text-luma-yellow shrink-0" />
                <span className="truncate">تهران، منطقه ۱، خیابان ولیعصر</span>
            </div>

            {/* Elegant Grid Stats */}
            <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 mb-8">
                {[
                    { val: '۲۸۰', label: 'متر مربع', icon: Maximize2 },
                    { val: '۴', label: 'خواب', icon: Grid },
                    { val: '۲', label: 'پارکینگ', icon: CarIcon } // Assuming car icon placeholder
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors">
                        <span className="text-xl font-bold text-gray-900">{stat.val}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide">{stat.label}</span>
                    </div>
                ))}
            </div>

            {/* Agent Profile */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl mb-8 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white shrink-0 relative flex items-center justify-center">
                    {!agentAvatarLoading && agentAvatarUrl ? (
                        <img 
                            src={agentAvatarUrl} 
                            className="w-full h-full object-cover" 
                            alt="Agent"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">علی رضایی</span>
                    <span className="text-xs text-gray-500">مشاور ارشد املاک</span>
                </div>
                <button className="mr-auto bg-black text-white px-4 py-2 rounded-lg text-xs font-bold">مشاهده پروفایل</button>
            </div>

            <div className="mt-auto flex gap-4">
                 <Motion.button className="flex-1 bg-gray-900 text-white font-bold h-12 rounded-xl hover:bg-black transition-colors shadow-lg shadow-black/10">
                    تماس با مشاور
                 </Motion.button>
                 <Motion.button className="w-12 h-12 flex items-center justify-center border border-gray-200 text-gray-900 rounded-xl hover:bg-gray-50 shrink-0">
                    <MoreHorizontal size={20} />
                 </Motion.button>
            </div>
        </div>
    </div>
  </div>
);

// Placeholder icon for real estate
const CarIcon = ({size, className}: {size?: number, className?: string}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
    </svg>
);

const CreativeLayout = ({ isComplete, data, phase }: { isComplete: boolean; data: UseCase; phase: string }) => (
    <div className="flex-1 flex flex-col md:grid md:grid-cols-2 md:h-full bg-[#121212] text-white font-sans">
      {/* Visual Canvas */}
      <div className="bg-[#0A0A0A] order-1 md:order-1 relative flex items-center justify-center border-b md:border-b-0 md:border-l border-white/5 p-4 overflow-hidden min-h-[360px] md:min-h-0 md:h-full">
         <div className="absolute inset-0 bg-noise opacity-[0.025] pointer-events-none" />
         {/* Grid pattern overlay */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
         <ComparisonView data={data} phase={phase} />
      </div>
      
      {/* Pro Editor Panel */}
      <div className="flex flex-col md:h-full bg-[#18181B] relative z-10 order-2 md:order-2 border-l border-white/5">
          {/* Top Bar */}
          <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#202023]">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">تنظیمات تصویر</span>
              <div className="flex gap-3">
                  <div className="p-1.5 hover:bg-white/10 rounded cursor-pointer text-gray-400 hover:text-white transition-colors"><MoveLeft size={16} /></div>
                  <div className="p-1.5 hover:bg-white/10 rounded cursor-pointer text-gray-400 hover:text-white transition-colors rotate-180"><MoveLeft size={16} /></div>
              </div>
          </div>

          <div className="p-6 flex flex-col gap-8 md:overflow-y-auto custom-scrollbar">
              
              {/* Presets Grid */}
              <div>
                  <div className="flex justify-between mb-4 items-end">
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">پیش‌تنظیمات</label>
                    <span className="text-[10px] text-luma-purple cursor-pointer">مشاهده همه</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                      <div className="aspect-square rounded-lg bg-white/5 border border-white/10 hover:border-luma-purple transition-all cursor-pointer flex items-center justify-center group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-[10px] font-medium text-gray-400 group-hover:text-white relative z-10">پویا</span>
                      </div>
                      <div className="aspect-square rounded-lg bg-[#2A2A2E] border border-luma-purple cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-luma-purple/20 to-transparent" />
                        <span className="text-[10px] font-bold text-white relative z-10">اصلاح هوشمند</span>
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-luma-purple rounded-full" />
                      </div>
                      <div className="aspect-square rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all cursor-pointer flex items-center justify-center">
                         <span className="text-[10px] font-medium text-gray-400">سیاه و سفید</span>
                      </div>
                  </div>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                  <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block border-b border-white/5 pb-2">تنظیمات دستی</label>
                  
                  {[
                      { label: 'نوردهی', val: 60, color: 'bg-white' },
                      { label: 'کنتراست', val: 40, color: 'bg-white' },
                      { label: 'جزئیات هوشمند', val: 85, color: 'bg-luma-purple' }
                  ].map((s, i) => (
                      <div key={i} className="group">
                          <div className="flex justify-between text-[11px] mb-2 text-gray-400 font-medium">
                              <span>{s.label}</span>
                              <span className="font-mono opacity-0 group-hover:opacity-100 transition-opacity">{s.val}%</span>
                          </div>
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer relative">
                              <div className={`h-full absolute left-0 top-0 transition-all duration-300 ${s.color}`} style={{ width: `${s.val}%` }} />
                              {/* Knob simulation */}
                              <div className="w-2 h-2 rounded-full bg-white absolute top-1/2 -translate-y-1/2 shadow-lg scale-0 group-hover:scale-100 transition-transform" style={{ left: `${s.val}%` }} />
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="mt-auto p-6 border-t border-white/5 bg-[#18181B]">
              <button className="w-full bg-luma-purple hover:bg-[#c06ce6] text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(218,143,255,0.2)] hover:shadow-[0_0_30px_rgba(218,143,255,0.4)]">
                  <Wand2 size={18} />
                  <span>اعمال تغییرات</span>
              </button>
          </div>
      </div>
    </div>
);


const Solutions: React.FC = () => {
  const { theme } = useTheme();
  const { ref: sectionRef, shouldAnimate } = useSectionVisibility({ rootMargin: '200px 0px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'switching' | 'typing' | 'idle' | 'scanning' | 'complete'>('switching');
  const [typedUrl, setTypedUrl] = useState('');
  const [useCasesData, setUseCasesData] = useState<UseCase[]>(USE_CASES);
  const [agentAvatarUrl, setAgentAvatarUrl] = useState<string>('');
  const [agentAvatarLoading, setAgentAvatarLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCasesData = async () => {
      try {
        const urlEco = 'https://pb.lumai.ir/api/collections/virtual_tryon/records?page=1&perPage=1&sort=-created';
        const urlReal = 'https://pb.lumai.ir/api/collections/image_editing/records?page=1&perPage=1&sort=-created';
        const urlCre = 'https://pb.lumai.ir/api/collections/background_removal/records?page=1&perPage=1&sort=-created';
        const urlImg = 'https://pb.lumai.ir/api/collections/image_generation/records?page=1&perPage=1&sort=-created';

        const [resEco, resReal, resCre, resImg] = await Promise.allSettled([
          fetchCachedJson(urlEco),
          fetchCachedJson(urlReal),
          fetchCachedJson(urlCre),
          fetchCachedJson(urlImg)
        ]);

        const updatedCases = [...USE_CASES];

        // 1. virtual_tryon for ecommerce
        if (resEco.status === 'fulfilled' && resEco.value?.items?.length > 0) {
          const item = resEco.value.items[0];
          const ecoIdx = updatedCases.findIndex(c => c.id === 'ecommerce');
          if (ecoIdx !== -1) {
            updatedCases[ecoIdx] = {
              ...updatedCases[ecoIdx],
              beforeImage: item.clothing ? getFileUrl('virtual_tryon', item.id, item.clothing, HOMEPAGE_THUMB_MEDIUM) : '',
              afterImage: item.result ? getFileUrl('virtual_tryon', item.id, item.result, HOMEPAGE_THUMB_MEDIUM) : ''
            };
          }
        }

        // 2. image_editing for realestate
        if (resReal.status === 'fulfilled' && resReal.value?.items?.length > 0) {
          const item = resReal.value.items[0];
          const realIdx = updatedCases.findIndex(c => c.id === 'realestate');
          if (realIdx !== -1) {
            updatedCases[realIdx] = {
              ...updatedCases[realIdx],
              beforeImage: item.before ? getFileUrl('image_editing', item.id, item.before, HOMEPAGE_THUMB_MEDIUM) : '',
              afterImage: item.result ? getFileUrl('image_editing', item.id, item.result, HOMEPAGE_THUMB_MEDIUM) : ''
            };
          }
        }

        // 3. background_removal for creative
        if (resCre.status === 'fulfilled' && resCre.value?.items?.length > 0) {
          const item = resCre.value.items[0];
          const creIdx = updatedCases.findIndex(c => c.id === 'creative');
          if (creIdx !== -1) {
            updatedCases[creIdx] = {
              ...updatedCases[creIdx],
              beforeImage: item.original ? getFileUrl('background_removal', item.id, item.original, HOMEPAGE_THUMB_MEDIUM) : '',
              afterImage: item.result ? getFileUrl('background_removal', item.id, item.result, HOMEPAGE_THUMB_MEDIUM) : ''
            };
          }
        }

        // 4. image_generation for agent avatar
        if (resImg.status === 'fulfilled' && resImg.value?.items?.length > 0) {
          const latestImg = resImg.value.items[0];
          if (latestImg.result) {
            setAgentAvatarUrl(getFileUrl('image_generation', latestImg.id, latestImg.result, HOMEPAGE_THUMB_MEDIUM));
          }
        }

        setUseCasesData(updatedCases);
      } catch (error) {
        console.error("Failed to fetch PocketBase data in Solutions:", error);
      } finally {
        setAgentAvatarLoading(false);
      }
    };

    fetchCasesData();
  }, []);
  
  const currentCase = useCasesData[currentIndex];

  useEffect(() => {
    if (!shouldAnimate) return;
    let isCancelled = false;

    const runSequence = async () => {
      // 1. Switching (Fade Out Old)
      setPhase('switching');
      setTypedUrl(''); 
      await new Promise(r => setTimeout(r, 600));
      if (isCancelled) return;

      // 2. Typing URL
      setPhase('typing');
      const url = currentCase.url;
      for (let i = 0; i <= url.length; i++) {
        if (isCancelled) return;
        setTypedUrl(url.slice(0, i));
        await new Promise(r => setTimeout(r, 30)); 
      }
      await new Promise(r => setTimeout(r, 300));
      if (isCancelled) return;

      // 3. Idle
      setPhase('idle');
      await new Promise(r => setTimeout(r, 1000));
      if (isCancelled) return;

      // 4. Scanning
      setPhase('scanning');
      await new Promise(r => setTimeout(r, 2500)); 
      if (isCancelled) return;

      // 5. Complete
      setPhase('complete');
      await new Promise(r => setTimeout(r, 4000)); 
      if (isCancelled) return;

      // Loop
      setCurrentIndex((prev) => (prev + 1) % USE_CASES.length);
    };

    runSequence();
    
    return () => { isCancelled = true; };
  }, [currentIndex, currentCase.url, shouldAnimate]);

  // Dot pattern background
  const dotColor = theme === 'dark' ? 'rgb(255 255 255 / 0.05)' : 'rgb(0 0 0 / 0.05)';
  const dotStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='none'%3e%3ccircle cx='1.5' cy='1.5' r='1.5' fill='${encodeURIComponent(dotColor)}'/%3e%3c/svg%3e")`
  };

  return (
    <section ref={sectionRef} className={`py-32 relative bg-[#FAFAFA] dark:bg-[#0a0a0a] transition-colors duration-300 ${shouldAnimate ? '' : 'pause-animations'}`}>
      
      {/* Background Ambience with Smooth Edges */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          
          {/* Animated Glows - Smaller size, wider animation range, lower opacity */}
          <Motion.div 
            animate={shouldAnimate ? { 
                x: [-100, 150, -100],
                y: [-50, 50, -50],
                opacity: [0.05, 0.08, 0.05],
                scale: [1, 1.2, 1]
            } : { opacity: 0.05 }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] -left-[5%] w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] rounded-full bg-luma-purple blur-[50px] sm:blur-[100px]"
          />
          
          <Motion.div 
            animate={shouldAnimate ? { 
                x: [100, -150, 100],
                y: [50, -50, 50],
                opacity: [0.05, 0.08, 0.05],
                scale: [1.2, 1, 1.2]
            } : { opacity: 0.05 }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[15%] -right-[5%] w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] rounded-full bg-luma-pink blur-[50px] sm:blur-[100px]"
          />

           <Motion.div 
            animate={shouldAnimate ? { 
                x: [-100, 100, -100],
                opacity: [0.03, 0.06, 0.03],
                scale: [1, 1.1, 1]
            } : { opacity: 0.03 }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-[10%] left-[20%] right-[20%] h-[200px] sm:h-[400px] rounded-full bg-luma-yellow blur-[50px] sm:blur-[100px]"
          />

          {/* Dot Pattern - Subtler */}
          <div className="absolute inset-0" style={dotStyle} />
          
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-noise opacity-[0.025] pointer-events-none" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dynamic Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 h-[220px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
                <Motion.div 
                    key={currentCase.id}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md ${currentCase.color} text-xs font-bold mb-6`}>
                        <currentCase.badgeIcon size={12} />
                        <span>{currentCase.badge}</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white leading-tight mb-6">
                        {currentCase.title}
                        <br />
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentCase.gradient}`}>
                            {currentCase.subtitle}
                        </span>
                    </h2>

                    <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-light max-w-2xl">
                        {currentCase.description}
                    </p>
                </Motion.div>
            </AnimatePresence>
        </div>

        {/* Browser Simulation */}
        <div className="relative mx-auto max-w-6xl">
            <Motion.div 
                className="relative rounded-2xl md:rounded-[24px] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0F0F0F] ring-1 ring-black/5 dark:ring-white/5 min-h-[640px] flex flex-col transition-colors duration-300"
            >
                {/* Browser Title Bar - Fixed for Mobile */}
                <div className="h-10 border-b border-black/5 dark:border-white/5 bg-gray-50 dark:bg-[#121212] flex items-center px-2 md:px-4 gap-2 md:gap-4 select-none shrink-0 z-30 relative transition-colors duration-300">
                    {/* RTL Controls: Right side */}
                    <div className="flex gap-1.5 md:gap-2 opacity-80 group hover:opacity-100 transition-opacity">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
                    </div>
                    {/* Dynamic URL Bar */}
                    <div 
                        className="flex-1 max-w-xl mx-auto bg-gray-150 dark:bg-[#1A1A1A] rounded-md h-6 flex items-center justify-center text-[10px] md:text-[11px] text-zinc-600 dark:text-gray-400 font-mono border border-black/5 dark:border-white/5 overflow-hidden text-left shadow-inner px-2 transition-colors duration-300"
                        dir="ltr"
                    >
                        <span className="opacity-60 flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
                            <div className="w-2 h-2 rounded-full bg-green-500/50 shrink-0" />
                            {phase === 'switching' ? (
                                <span className="animate-pulse">در حال اتصال...</span>
                            ) : (
                                <span className="truncate flex items-center">
                                  <span className="text-gray-500 hidden sm:inline">https://</span>
                                  <span className="text-gray-300">{typedUrl}</span>
                                  {phase === 'typing' && <span className="w-1.5 h-3 bg-white/50 animate-pulse ml-0.5 inline-block" />}
                                </span>
                            )}
                        </span>
                    </div>
                    {/* Placeholder for visual balance - Hidden on mobile */}
                    <div className="hidden md:block w-12" />
                </div>

                {/* Browser Content Viewport - Allow scrolling on mobile */}
                <div className="flex-1 relative overflow-y-auto md:overflow-hidden bg-white scrollbar-hide">
                    <AnimatePresence mode="wait">
                        {phase !== 'switching' && (
                             <Motion.div
                                key={currentCase.id}
                                initial={{ opacity: 0, filter: "blur(8px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(4px)" }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 w-full md:h-full flex flex-col"
                             >
                                 {/* Mock Navigation */}
                                 <div className={`h-16 border-b flex items-center justify-between px-8 z-20 relative select-none shrink-0 ${currentCase.id === 'creative' ? 'bg-[#18181B] border-white/5 text-white' : 'bg-white border-gray-100'}`}>
                                     <div className="flex items-center gap-6">
                                         <MenuIcon size={20} className="opacity-50 cursor-pointer hover:opacity-100" />
                                         <span className="text-xl font-bold tracking-tighter flex items-center gap-1">
                                             {currentCase.id === 'ecommerce' && <><div className="w-6 h-6 bg-black rounded text-white flex items-center justify-center text-xs">M</div>MY<span className="text-luma-pink">STORE</span></>}
                                             {currentCase.id === 'realestate' && <><span className="text-luma-yellow font-serif">LUX</span>ESTATE</>}
                                             {currentCase.id === 'creative' && <><div className="w-6 h-6 bg-luma-purple rounded flex items-center justify-center"><Wand2 size={12} className="text-black"/></div>Pixel<span className="text-luma-purple">Studio</span></>}
                                         </span>
                                     </div>
                                     <div className="flex items-center gap-5 opacity-50">
                                         <Search size={20} className="cursor-pointer hover:opacity-100 transition-opacity" />
                                         {currentCase.id === 'ecommerce' && <div className="relative cursor-pointer hover:opacity-100"><ShoppingBag size={20} /><span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white" /></div>}
                                         {currentCase.id === 'realestate' && <Bell size={20} className="cursor-pointer hover:opacity-100" />}
                                         {currentCase.id === 'creative' && <div className="w-8 h-8 rounded-full bg-gradient-to-r from-luma-purple to-blue-500 cursor-pointer hover:opacity-100 border border-white/20" />}
                                     </div>
                                 </div>

                                 {/* Dynamic Layout */}
                                 <div className="flex-1 relative md:overflow-hidden">
                                    {currentCase.id === 'ecommerce' && <EcommerceLayout isComplete={phase === 'complete'} data={currentCase} phase={phase} />}
                                    {currentCase.id === 'realestate' && <RealEstateLayout isComplete={phase === 'complete'} data={currentCase} phase={phase} agentAvatarUrl={agentAvatarUrl} agentAvatarLoading={agentAvatarLoading} />}
                                    {currentCase.id === 'creative' && <CreativeLayout isComplete={phase === 'complete'} data={currentCase} phase={phase} />}
                                 </div>
                             </Motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Motion.div>

        </div>
      </div>
    </section>
  );
};

export default Solutions;
