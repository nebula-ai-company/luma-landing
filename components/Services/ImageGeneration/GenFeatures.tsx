
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, Zap, Cpu, Crown, 
  Sparkles, Palette, ArrowLeft, LayoutGrid,
  Activity, Clock, ShieldCheck, ChevronRight, BarChart3
} from 'lucide-react';

// --- Data Configuration ---

const FEATURED_MODELS = [
  { 
    id: 'flux',
    name: "FLUX 2 MAX", 
    tag: "واقع‌گرایی محض", 
    desc: "پیشرفته‌ترین موتور جهان برای خلق تصاویر فوتورئالیستیک با جزئیات پوست و نورپردازی بی‌نظیر.",
    color: "#DA8FFF", // Luma Purple
    icon: Crown,
    stats: { quality: 98, speed: 85 },
    meta: { time: "~۴ ثانیه", license: "تجاری" }
  },
  { 
    id: 'ideogram',
    name: "IDEOGRAM V3", 
    tag: "تایپوگرافی دقیق", 
    desc: "متخصص درج متن دقیق داخل تصویر و طراحی لوگوتایپ‌های پیچیده و پوسترهای تبلیغاتی.",
    color: "#FF6482", // Luma Pink
    icon: Star,
    stats: { quality: 95, speed: 90 },
    meta: { time: "~۵ ثانیه", license: "تجاری" }
  },
  { 
    id: 'recraft',
    name: "RECRAFT V3", 
    tag: "وکتور و گرافیک", 
    desc: "تولید وکتور، آیکون و طراحی‌های گرافیکی تخت (Flat) با قابلیت ویرایش لایه‌باز.",
    color: "#FFB340", // Luma Yellow
    icon: LayoutGrid,
    stats: { quality: 92, speed: 95 },
    meta: { time: "~۳ ثانیه", license: "سازمانی" }
  },
];

const COMPACT_MODELS = [
  "Nano Banana", "Flux 1.1 Pro", "GPT Image", "Imagen 3",
  "Seedream 4", "Wan 2.6", "Hunyuan", "Emu 3.5",
  "Reve Fast", "Z Image", "Midjourney V6", "DALL-E 3"
];

// Mosaic Layout Configuration for Styles
const STYLES_GALLERY = [
  { name: "Cinematic", faName: "سینمایی", span: "md:col-span-2 md:row-span-2", img: "https://luma-assets.fsn1.your-objectstorage.com/-/2a3072cdc1f140ae83e80d3851e70093.jpg" },
  { name: "3D Render", faName: "سه بعدی", span: "md:col-span-1 md:row-span-1", img: "https://luma-assets.fsn1.your-objectstorage.com/-/fc60e831679d4c1592f36dae0d16f526.jpg" },
  { name: "Neon Punk", faName: "نئون", span: "md:col-span-1 md:row-span-2", img: "https://luma-assets.fsn1.your-objectstorage.com/-/abae6b30e598413484fd5439d3c54c0d.jpg" },
  { name: "Minimal", faName: "مینیمال", span: "md:col-span-2 md:row-span-1", img: "https://luma-assets.fsn1.your-objectstorage.com/-/ef4d380e0561491dbe0ee4dc0c0f2b0e.jpg" },
  { name: "Fashion", faName: "فشن", span: "md:col-span-2 md:row-span-1", img: "https://luma-assets.fsn1.your-objectstorage.com/-/1f4190cd05704aaaa3b033b5c1856723.jpg" },
  { name: "Sketch", faName: "طراحی دستی", span: "md:col-span-1 md:row-span-1", img: "https://luma-assets.fsn1.your-objectstorage.com/-/ae0f4eb14e7e41b689272eb85bcb31fa.jpg" },
];

export const GenFeatures: React.FC = () => {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
       
       {/* --- Seamless Transition Fade (Top) --- */}
       <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />

       {/* Ambient Glows */}
       <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-luma-purple/5 blur-[120px] rounded-full pointer-events-none" />
       <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-luma-pink/5 blur-[120px] rounded-full pointer-events-none" />

       <div className="max-w-screen-2xl mx-auto px-4 relative z-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
             
             {/* --- RIGHT COLUMN: Powerful Models --- */}
             <div className="flex flex-col h-full min-w-0">
                <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="flex items-center gap-3 mb-6 md:mb-8"
                >
                   <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <Cpu className="text-luma-purple" size={20} />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">موتورهای <span className="text-luma-purple">قدرتمند</span></h3>
                </motion.div>
                
                {/* Featured "Pro" Cards - Horizontal Scroll on Mobile, Stack on Desktop */}
                <div className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x space-x-4 space-x-reverse no-scrollbar lg:block lg:space-x-0 lg:space-y-6 lg:overflow-visible lg:pb-0 lg:px-0 lg:mx-0 mb-8 flex-grow">
                   {FEATURED_MODELS.map((model, idx) => (
                      <motion.div 
                         key={model.id}
                         initial={{ opacity: 0, x: 20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: idx * 0.1 }}
                         onMouseEnter={() => setHoveredModel(model.id)}
                         onMouseLeave={() => setHoveredModel(null)}
                         className="relative group cursor-pointer min-w-[85vw] sm:min-w-[400px] snap-center lg:min-w-0 lg:w-full h-full"
                      >
                         {/* Card Background Glow */}
                         <div 
                            className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                            style={{ 
                                background: `linear-gradient(to left, ${model.color}10, transparent)`
                            }}
                         />
                         
                         {/* Main Card */}
                         <div className="relative bg-[#111] border border-white/5 rounded-[24px] overflow-hidden transition-all duration-300 group-hover:border-white/10 group-hover:translate-x-[-4px] shadow-lg h-full flex flex-col">
                            
                            {/* Enhanced Side Glow (Widened) */}
                            <div 
                                className="absolute right-0 top-0 bottom-0 w-[400px] max-w-[80%] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                                style={{ 
                                    background: `linear-gradient(to left, ${model.color}, transparent)`
                                }} 
                            />

                            <div className="p-6 md:p-7 relative z-10 flex flex-col flex-grow">
                                {/* Header Section */}
                                <div className="flex items-start justify-between mb-4 md:mb-6">
                                    <div className="flex items-center gap-4 md:gap-5">
                                        <div 
                                            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-lg border border-white/5 bg-[#151515]"
                                        >
                                            <model.icon size={24} style={{ color: model.color }} className="md:w-[26px] md:h-[26px]" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-base md:text-lg tracking-wide flex items-center gap-2 font-mono">
                                                {model.name}
                                            </h4>
                                            <span 
                                                className="text-[9px] md:text-[10px] font-bold tracking-wider opacity-80 bg-white/5 px-2 py-0.5 rounded border border-white/5 block mt-1 w-fit"
                                                style={{ color: model.color, borderColor: `${model.color}30` }}
                                            >
                                                {model.tag}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-400 font-light leading-7 md:leading-8 mb-6 text-justify pl-2 flex-grow">
                                    {model.desc}
                                </p>

                                {/* Footer / Specs */}
                                <div className="pt-5 border-t border-white/5 flex items-center justify-between mt-auto">
                                    {/* Stats */}
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">کیفیت</span>
                                            <div className="w-14 md:w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    className="h-full rounded-full" 
                                                    style={{ backgroundColor: model.color }}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${model.stats.quality}%` }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">سرعت</span>
                                            <div className="w-14 md:w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    className="h-full rounded-full bg-white/40" 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${model.stats.speed}%` }}
                                                    transition={{ duration: 1, delay: 0.4 }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <a 
                                        href="https://dash.lumai.ir/service/generate-image"
                                        className={`
                                        pl-3 pr-2 py-1.5 md:pl-4 md:pr-3 md:py-2 rounded-xl flex items-center gap-2 transition-all duration-300
                                        ${hoveredModel === model.id ? 'bg-white text-black translate-x-0 opacity-100' : 'bg-white/5 text-gray-400 opacity-80'}
                                    `}>
                                        <span className="text-[10px] md:text-[11px] font-bold">اجرای مدل</span>
                                        <ArrowLeft size={14} className={`md:w-4 md:h-4 ${hoveredModel === model.id ? "-translate-x-1 transition-transform" : ""}`} />
                                    </a>
                                </div>
                            </div>
                         </div>
                      </motion.div>
                   ))}
                </div>

                {/* Compact "Chipset" Grid */}
                <div className="mt-auto">
                   <h4 className="text-xs font-bold text-gray-500 mb-4 flex items-center gap-2 uppercase tracking-wider">
                      <Zap size={12} className="text-luma-yellow" />
                      سایر مدل‌های پردازشی
                   </h4>
                   <div className="flex flex-wrap gap-2">
                      {COMPACT_MODELS.map((m, i) => (
                         <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + (i * 0.02) }}
                            className="text-[10px] font-mono px-3 py-1.5 rounded bg-[#111] border border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-default flex items-center gap-1.5"
                         >
                            <div className="w-1 h-1 rounded-full bg-gray-600" />
                            {m}
                         </motion.div>
                      ))}
                   </div>
                </div>
             </div>

             {/* --- LEFT COLUMN: Styles Gallery (Mosaic) --- */}
             <div className="flex flex-col h-full mt-8 lg:mt-0">
                <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="flex items-center gap-3 mb-6 md:mb-8"
                >
                   <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <Palette className="text-luma-pink" size={20} />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">گالری <span className="text-luma-pink">استایل‌ها</span></h3>
                </motion.div>

                {/* Styles Grid: Horizontal Scroll on Mobile, Mosaic Grid on Desktop */}
                <div className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x space-x-3 space-x-reverse no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:auto-rows-[150px] lg:auto-rows-[170px] md:overflow-visible md:pb-0 md:mx-0 md:px-0 md:space-x-0">
                   {STYLES_GALLERY.map((style, idx) => (
                      <motion.div 
                         key={idx}
                         initial={{ opacity: 0, scale: 0.9 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: idx * 0.1 }}
                         // Mobile: Fixed size card in scroll view. Desktop: Span based on config
                         className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10 shrink-0 snap-center w-[160px] h-[200px] md:w-auto md:h-auto ${style.span}`}
                      >
                         <img 
                            src={style.img} 
                            alt={style.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                         />
                         
                         {/* Gradient Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                         
                         {/* Highlight Border on Hover */}
                         <div className="absolute inset-0 border-2 border-luma-pink/0 group-hover:border-luma-pink/50 rounded-2xl transition-colors duration-300" />

                         {/* Content */}
                         <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-[9px] md:text-[10px] font-bold text-luma-pink uppercase tracking-wider mb-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-75 dir-ltr text-right">
                               {style.name}
                            </span>
                            <div className="flex items-center justify-between">
                               <h4 className="text-white font-bold text-base md:text-lg">{style.faName}</h4>
                               <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-luma-pink hover:text-black">
                                  <ArrowLeft size={14} className="md:w-4 md:h-4 -ml-0.5" />
                               </div>
                            </div>
                         </div>
                      </motion.div>
                   ))}
                </div>

                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.6 }}
                   className="mt-auto pt-6"
                >
                   <div className="p-5 md:p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-luma-pink/5 blur-[50px] rounded-full group-hover:bg-luma-pink/10 transition-colors" />
                       <div className="flex items-start gap-4 relative z-10">
                          <div className="p-3 rounded-xl bg-white/5 text-luma-pink border border-white/5">
                             <Sparkles size={20} className="md:w-[22px] md:h-[22px]" />
                          </div>
                          <div>
                             <h5 className="text-white font-bold text-sm md:text-base mb-1.5">آزادی عمل مطلق</h5>
                             <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                علاوه بر این استایل‌ها، می‌توانید با گزینه <span className="text-white font-bold">"حالت خام"</span> تصویر بدون فیلتر دریافت کنید یا استایل اختصاصی خود را بسازید.
                             </p>
                          </div>
                       </div>
                   </div>
                </motion.div>
             </div>

          </div>

       </div>
    </section>
  );
};
