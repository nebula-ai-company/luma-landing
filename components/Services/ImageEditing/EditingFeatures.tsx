
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, LayoutGrid, MousePointer2, Image as ImageIcon, 
  Maximize2, Zap, Layers, Palette, ScanFace, Wand2, 
  Ratio, Crop, CheckCircle2, ChevronLeft, Sliders, Cpu
} from 'lucide-react';

const VISUAL_MODELS = [
  { 
    id: 'flux-2-pro', 
    name: 'FLUX 2 PRO', 
    badge: 'REALISTIC', 
    color: 'text-luma-purple',
    bg: 'bg-luma-purple/10',
    border: 'border-luma-purple/20',
    desc: 'قدرت بی‌نظیر در خلق تصاویر واقعی با جزئیات دقیق.' 
  },
  { 
    id: 'nano-pro', 
    name: 'NANO BANANA PRO', 
    badge: 'FASTEST', 
    color: 'text-luma-yellow',
    bg: 'bg-luma-yellow/10',
    border: 'border-luma-yellow/20',
    desc: 'سرعت پردازش فوق‌العاده برای ایده‌پردازی آنی.' 
  },
  { 
    id: 'qwen', 
    name: 'QWEN EDIT 2511', 
    badge: 'PRECISE', 
    color: 'text-luma-pink',
    bg: 'bg-luma-pink/10',
    border: 'border-luma-pink/20',
    desc: 'متخصص ویرایش دقیق و تغییرات جزئی در تصویر.' 
  },
  { 
    id: 'gpt', 
    name: 'GPT IMAGE 1.5', 
    badge: 'SMART', 
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    desc: 'فهم عمیق دستورات پیچیده و متنی.' 
  }
];

const ALL_MODELS_TAGS = [
  "GPT Image 1.5", "Nano Banana Pro", "Nano Banana",
  "Flux 2 Max", "Flux 2 Pro", "Flux 2 Flex", "Flux 2 Dev",
  "Flux Kontext Pro", "Flux Kontext Max", "Flux Kontext Dev",
  "Qwen Image Edit 2511", "Seedream 4.5", "Seedream 4",
  "Wan 2.6", "Emu 3.5 Image", "Reve", "Reve Fast"
];

const ASPECT_RATIOS = [
  { label: '1:1', w: 120, h: 120, icon: 'Instagram' },
  { label: '16:9', w: 160, h: 90, icon: 'Youtube' },
  { label: '9:16', w: 90, h: 160, icon: 'Story' },
  { label: '4:3', w: 140, h: 105, icon: 'Post' },
];

const FEATURES_GRID = [
    { 
        id: "ratios",
        icon: LayoutGrid, 
        title: "ابعاد و سایزها", 
        desc: "پشتیبانی از تمامی نسبت‌های استاندارد شبکه‌های اجتماعی.",
        iconColor: "text-luma-purple",
        hexColor: "#DA8FFF", // Purple
        tags: ["1:1", "16:9", "9:16", "Custom"]
    },
    { 
        id: "inpainting",
        icon: MousePointer2, 
        title: "ویرایش ناحیه‌ای", 
        desc: "انتخاب دقیق با قلم‌مو برای تغییر فقط بخشی از تصویر.",
        iconColor: "text-luma-pink",
        hexColor: "#FF6482", // Pink
        tags: ["Inpainting", "Brush", "Mask"]
    },
    { 
        id: "assets",
        icon: ImageIcon, 
        title: "مدیریت دارایی‌ها", 
        desc: "دسترسی سریع به تاریخچه و تصاویر تولید شده قبلی.",
        iconColor: "text-luma-yellow",
        hexColor: "#FFB340", // Yellow
        tags: ["History", "Gallery", "Export"]
    }
];

// --- Reusable Feature Card with Mouse Tracking ---
interface FeatureCardProps {
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  children, 
  className = "",
  glowColor = "#ffffff",
  delay = 0
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } }
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative group rounded-[32px] p-px overflow-hidden transition-transform duration-500 hover:-translate-y-2 ${className}`}
      style={{ 
        backgroundColor: 'rgba(255,255,255,0.03)',
      }}
    >
      {/* Dynamic Border Gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
        style={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${glowColor}50, transparent 40%)`
        }}
      />

      {/* Inner Content Background */}
      <div className="relative h-full bg-[#0c0c0e] rounded-[31px] overflow-hidden flex flex-col p-8">
        
        {/* Bottom Tint Gradient */}
        <div 
           className="absolute bottom-0 left-0 right-0 h-3/4 opacity-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
           style={{
             background: `linear-gradient(to top, ${glowColor}, transparent)`
           }}
        />

        {/* Cursor Glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`
          }}
        />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col h-full">
            {children}
        </div>
      </div>
    </motion.div>
  );
};

export const EditingFeatures: React.FC = () => {
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [activeRatioIndex, setActiveRatioIndex] = useState(0);

  useEffect(() => {
    const modelInterval = setInterval(() => {
      setActiveModelIndex((prev) => (prev + 1) % VISUAL_MODELS.length);
    }, 4000);

    const ratioInterval = setInterval(() => {
      setActiveRatioIndex((prev) => (prev + 1) % ASPECT_RATIOS.length);
    }, 3000);

    return () => {
      clearInterval(modelInterval);
      clearInterval(ratioInterval);
    };
  }, []);

  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Top Fade Mask for Seamless Entry */}
      <div 
        className="absolute top-0 left-0 right-0 h-40 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.8) 40%, transparent 100%)'
        }} 
      />

      {/* Bottom Fade Mask for Seamless Exit */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.8) 40%, transparent 100%)'
        }} 
      />

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg"
          >
             <Sliders className="text-luma-purple w-3.5 h-3.5" />
             <span className="text-gray-300 font-bold text-[10px] tracking-widest uppercase">رابط کاربری حرفه‌ای</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight"
          >
            قدرت <span className="text-gradient-animated">کنترل کامل</span>
            <br />
            در دستان شما
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto"
          >
            مجموعه‌ای از ابزارهای دقیق و حرفه‌ای که به شما اجازه می‌دهد هر جزئیاتی را مطابق سلیقه خود تغییر دهید.
          </motion.p>
        </div>

        {/* Feature Block 1: Intelligent Model Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32 items-center">
            
            {/* Visual (Left/Right based on RTL) */}
            <motion.div 
               className="lg:col-span-5 order-2 lg:order-1 relative"
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
               <div className="relative rounded-[32px] bg-[#111] border border-white/10 shadow-2xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] flex flex-col">
                  {/* Decorative Header */}
                  <div className="h-14 border-b border-white/5 bg-white/[0.02] flex items-center justify-between px-6">
                     <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Model Engine</span>
                     <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                     </div>
                  </div>

                  {/* Model List Visual */}
                  <div className="flex-1 p-6 flex flex-col justify-center gap-4 relative">
                      {/* Glow Effect behind active */}
                      <motion.div 
                         layoutId="model-glow"
                         className="absolute inset-x-6 h-24 rounded-2xl bg-gradient-to-r from-luma-purple/20 via-transparent to-transparent blur-xl pointer-events-none"
                         initial={false}
                         animate={{ top: 88 + (activeModelIndex * 100) }}
                         transition={{ type: "spring", stiffness: 50, damping: 20 }}
                      />

                      {VISUAL_MODELS.map((model, i) => {
                         const isActive = i === activeModelIndex;
                         return (
                            <motion.div
                               key={model.id}
                               className={`
                                  relative p-5 rounded-2xl border transition-all duration-500 overflow-hidden group cursor-default
                                  ${isActive ? 'bg-white/5 border-white/20' : 'bg-transparent border-white/5 opacity-50 blur-[1px] scale-95'}
                               `}
                               animate={{ 
                                  scale: isActive ? 1 : 0.95,
                                  opacity: isActive ? 1 : 0.5,
                                  filter: isActive ? 'blur(0px)' : 'blur(1px)'
                               }}
                            >
                               <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? model.bg : 'bg-white/5'} transition-colors`}>
                                        <Zap size={18} className={isActive ? model.color : 'text-gray-500'} />
                                     </div>
                                     <div>
                                        <h4 className={`text-sm font-bold tracking-wide ${isActive ? 'text-white' : 'text-gray-400'}`}>{model.name}</h4>
                                        <span className="text-[9px] text-gray-500 font-mono">V.4.2.0</span>
                                     </div>
                                  </div>
                                  {isActive && (
                                     <motion.div 
                                       initial={{ scale: 0 }} 
                                       animate={{ scale: 1 }}
                                       className={`px-2 py-1 rounded text-[9px] font-bold ${model.bg} ${model.color} border ${model.border}`}
                                     >
                                        {model.badge}
                                     </motion.div>
                                  )}
                               </div>
                               
                               <AnimatePresence>
                                  {isActive && (
                                     <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                     >
                                        <p className="text-[11px] text-gray-400 leading-relaxed border-t border-white/5 pt-3 mt-2">
                                           {model.desc}
                                        </p>
                                        <div className="mt-3 flex items-center gap-2">
                                           <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                              <motion.div 
                                                 className={`h-full ${model.color.replace('text-', 'bg-')}`}
                                                 initial={{ width: "0%" }}
                                                 animate={{ width: "100%" }}
                                                 transition={{ duration: 3.5, ease: "linear" }}
                                              />
                                           </div>
                                           <span className="text-[9px] font-mono text-gray-500">Loading...</span>
                                        </div>
                                     </motion.div>
                                  )}
                               </AnimatePresence>
                            </motion.div>
                         );
                      })}
                  </div>
               </div>
            </motion.div>

            {/* Text Content */}
            <motion.div 
               className="lg:col-span-7 order-1 lg:order-2 text-right"
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-luma-purple/10 border border-luma-purple/20 flex items-center justify-center text-luma-purple shadow-[0_0_20px_rgba(218,143,255,0.2)]">
                        <span className="font-bold text-lg">1</span>
                    </div>
                    <h3 className="text-luma-purple font-bold tracking-wide text-sm uppercase">انتخاب هوشمند</h3>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
                    <span className="block mb-4">موتور پردازش اختصاصی</span>
                    <span className="block text-gray-500">برای هر نیاز شما</span>
                </h2>
                
                <div className="space-y-8 text-gray-400 leading-loose text-lg">
                    <p>
                        با دسترسی به ۱۷ مدل پیشرفته، از Flux 2 برای واقع‌گرایی تا Nano Banana برای سرعت، دقیقاً ابزاری را انتخاب کنید که برای پروژه شما مناسب است.
                    </p>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: 'Flux 2 Series', desc: 'Max, Pro, Dev, Kontext' },
                            { title: 'Nano Banana', desc: 'Pro & Standard Versions' },
                            { title: 'Smart Edit', desc: 'Qwen Image Edit 2511 & GPT 1.5' },
                            { title: 'Creative Gen', desc: 'Seedream, Reve, Wan, Emu' },
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 items-start">
                                <CheckCircle2 className="text-luma-purple shrink-0 mt-1.5" size={18} />
                                <div>
                                    <strong className="text-white block mb-1">{item.title}</strong>
                                    <span className="text-sm">{item.desc}</span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* All Models Tags */}
                    <div className="pt-4 border-t border-white/5">
                        <p className="text-xs text-gray-500 mb-3 font-bold">لیست کامل مدل‌های موجود:</p>
                        <div className="flex flex-wrap gap-2">
                            {ALL_MODELS_TAGS.map((tag, i) => (
                                <span key={i} className="text-[10px] bg-white/5 border border-white/5 px-2 py-1 rounded text-gray-400 hover:text-white hover:border-white/20 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Feature Block 2: Precision Control */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32 items-center">
            
            {/* Text Content - Left Side in RTL */}
            <motion.div 
               className="lg:col-span-6 order-1"
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-luma-pink/10 border border-luma-pink/20 flex items-center justify-center text-luma-pink shadow-[0_0_20px_rgba(255,100,130,0.2)]">
                        <span className="font-bold text-lg">2</span>
                    </div>
                    <h3 className="text-luma-pink font-bold tracking-wide text-sm uppercase">دقت و ظرافت</h3>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
                    <span className="block mb-4">کادربندی سینمایی</span>
                    <span className="block text-gray-500">و تنظیمات دقیق</span>
                </h2>
                
                <p className="text-gray-400 text-lg mb-8 leading-loose border-r-2 border-white/10 pr-6 mr-1">
                    فقط با یک کلیک، نسبت تصویر را برای پلتفرم مورد نظر خود تغییر دهید.
                    هوش مصنوعی ما به صورت خودکار ترکیب‌بندی تصویر را متناسب با کادر جدید بازسازی می‌کند، بدون اینکه سوژه اصلی آسیب ببیند.
                </p>

                <div className="flex flex-wrap gap-3">
                   {['Instagram (1:1)', 'YouTube (16:9)', 'TikTok (9:16)', 'Twitter (2:1)'].map((tag, i) => (
                      <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:border-white/20 transition-colors cursor-default">
                         {tag}
                      </span>
                   ))}
                </div>
            </motion.div>

            {/* Visual (Right Side in RTL) */}
            <motion.div 
               className="lg:col-span-6 order-2 relative"
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
               <div className="relative rounded-[32px] bg-[#111] border border-white/10 shadow-2xl overflow-hidden aspect-square flex flex-col">
                  {/* Grid Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
                  
                  {/* Viewfinder UI */}
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                      <div className="relative w-full h-full flex items-center justify-center">
                          
                          {/* Animated Aspect Ratio Box */}
                          <motion.div 
                             className="relative border-2 border-white/80 rounded-lg shadow-[0_0_50px_rgba(255,255,255,0.1)] overflow-hidden z-10 bg-black/20 backdrop-blur-sm"
                             initial={false}
                             animate={{ 
                                width: ASPECT_RATIOS[activeRatioIndex].w * 2.1, 
                                height: ASPECT_RATIOS[activeRatioIndex].h * 2.1 
                             }}
                             transition={{ type: "spring", stiffness: 100, damping: 20 }}
                          >
                             {/* Image Inside */}
                             <img 
                               src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop" 
                               alt="Preview" 
                               className="absolute inset-0 w-full h-full object-cover opacity-80"
                             />
                             
                             {/* Corner Markers */}
                             <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-luma-pink -mt-0.5 -ml-0.5" />
                             <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-luma-pink -mt-0.5 -mr-0.5" />
                             <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-luma-pink -mb-0.5 -ml-0.5" />
                             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-luma-pink -mb-0.5 -mr-0.5" />

                             {/* Center Crosshair */}
                             <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                <div className="absolute top-1/2 left-0 w-full h-px bg-white" />
                                <div className="absolute left-1/2 top-0 h-full w-px bg-white" />
                             </div>
                          </motion.div>

                          {/* Floating Labels */}
                          <div className="absolute bottom-8 flex gap-4 z-20 flex-wrap justify-center px-4 w-full">
                             {ASPECT_RATIOS.map((ratio, i) => (
                                <motion.button
                                   key={i}
                                   className={`
                                      px-4 py-2 rounded-xl text-xs font-bold transition-all
                                      ${i === activeRatioIndex ? 'bg-luma-pink text-black scale-110 shadow-lg shadow-luma-pink/30' : 'bg-white/10 text-gray-400 hover:bg-white/20'}
                                   `}
                                   onClick={() => setActiveRatioIndex(i)}
                                >
                                   {ratio.label}
                                </motion.button>
                             ))}
                          </div>
                      </div>
                  </div>
               </div>
            </motion.div>
        </div>

        {/* Feature 3: Detailed Grid (Updated with Premium FeatureCard and Fixed Arrow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {FEATURES_GRID.map((item, i) => (
                <FeatureCard 
                    key={item.id}
                    glowColor={item.hexColor}
                    delay={i * 0.15}
                    className="min-h-[300px]"
                >
                    {/* Header: Icon & Big Number */}
                    <div className="flex justify-between items-start mb-8 relative">
                        <div className={`
                            w-14 h-14 rounded-2xl flex items-center justify-center
                            bg-white/5 border border-white/10 text-gray-400
                            transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:text-white
                            group-hover:bg-white/10 group-hover:border-white/20
                            ${item.iconColor.replace('text-', 'group-hover:text-')}
                        `}>
                            <item.icon size={28} strokeWidth={1.5} className="transition-colors duration-300" />
                        </div>
                        
                        {/* Stylized Index Number */}
                        <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 select-none">
                            0{i + 1}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-gray-100 group-hover:text-white mb-3 transition-colors duration-300">
                            {item.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-7 font-light mb-8 group-hover:text-gray-300 transition-colors duration-300">
                            {item.desc}
                        </p>
                    </div>

                    {/* Tags (Tech Pills) */}
                    <div className="mt-auto flex flex-wrap gap-2">
                        {item.tags.map((tag, idx) => (
                            <span 
                                key={idx} 
                                className="text-[10px] font-mono font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300 group-hover:border-white/10 transition-all duration-300 cursor-default"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </FeatureCard>
            ))}
        </div>

      </div>
    </section>
  );
};
