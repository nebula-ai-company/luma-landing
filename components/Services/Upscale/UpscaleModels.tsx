
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond, Zap, Brush, Layers, Maximize, Target, Check, Sliders } from 'lucide-react';

const SPECIALIZED_MODELS = [
  {
    id: 'topaz',
    name: 'Topaz Labs Upscaler',
    cost: '۵۸۰',
    tag: 'استاندارد صنعتی',
    desc: 'بهترین گزینه برای کارهای چاپی حساس و بازسازی عکس‌های بسیار قدیمی. استاندارد طلایی صنعت عکاسی.',
    features: ['حفظ بافت طبیعی', 'حذف نویز حرفه‌ای', 'مناسب چاپ لارج فرمت'],
    color: 'text-luma-purple',
    borderColor: 'border-luma-purple/30',
    bg: 'bg-luma-purple/5'
  },
  {
    id: 'crystal',
    name: 'ClarityAI Crystal Upscaler',
    cost: '۳۷۰',
    tag: 'حرفه‌ای‌ترین گزینه 💎',
    desc: 'شفافیت کریستالی. جزئیات را با وفاداری کامل به عکس اصلی بازسازی می‌کند (بدون تغییر چهره یا بافت).',
    features: ['عدم تغییر چهره', 'شارپنس فوق‌العاده', 'مناسب پرتره'],
    color: 'text-luma-yellow',
    borderColor: 'border-luma-yellow/30',
    bg: 'bg-luma-yellow/5'
  },
  {
    id: 'creative',
    name: 'Clarity AI Creative Upscaler',
    cost: '۱۵۰',
    tag: 'خلاقانه',
    desc: 'اگر عکس اصلی جزئیات کمی دارد، این مدل با هوش مصنوعی جزئیات جدیدی خلق می‌کند تا عکس زیباتر شود.',
    features: ['افزودن جزئیات جدید', 'مناسب نقاشی دیجیتال', 'مناسب کانسپت آرت'],
    color: 'text-luma-pink',
    borderColor: 'border-luma-pink/30',
    bg: 'bg-luma-pink/5'
  },
  {
    id: 'bria',
    name: 'Bria Increase Resolution',
    cost: '۶۰',
    tag: 'میان‌رده',
    desc: 'یک گزینه متعادل و مقرون‌به‌صرفه برای استفاده‌های عمومی وب و سوشال مدیا.',
    features: ['سرعت مناسب', 'قیمت اقتصادی', 'کیفیت استاندارد'],
    color: 'text-white',
    borderColor: 'border-white/20',
    bg: 'bg-white/5'
  },
  {
    id: 'nomos',
    name: 'Nomos Image Upscaler 4K',
    cost: '۱۵',
    tag: 'اقتصادی',
    desc: 'ارزان‌ترین گزینه. مناسب برای شفاف‌سازی سریع تصاویری که کیفیتشان خیلی پایین نیست.',
    features: ['فوق سریع', 'بسیار ارزان', 'مناسب انبوه'],
    color: 'text-gray-400',
    borderColor: 'border-gray-500/30',
    bg: 'bg-gray-500/5'
  }
];

export const UpscaleModels: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'specialized' | 'nano'>('specialized');

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
       <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
          
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-white mb-6">انتخاب <span className="text-luma-yellow">موتور پردازش</span></h2>
             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                ما برای هر نیاز، یک مدل تخصصی داریم. بسته به بودجه و هدف نهایی خود (چاپ، وب، بازسازی)، مدل مناسب را انتخاب کنید.
             </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
             <div className="bg-[#111] p-1 rounded-2xl border border-white/10 flex gap-2">
                <button
                   onClick={() => setActiveTab('specialized')}
                   className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'specialized' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                   <Diamond size={16} />
                   مدل‌های تخصصی بازسازی
                </button>
                <button
                   onClick={() => setActiveTab('nano')}
                   className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'nano' ? 'bg-luma-yellow text-black shadow-lg shadow-luma-yellow/20' : 'text-gray-400 hover:text-white'}`}
                >
                   <Zap size={16} />
                   مدل چندمنظوره (Nano Banana)
                </button>
             </div>
          </div>

          <div className="min-h-[600px]">
             <AnimatePresence mode="wait">
                {activeTab === 'specialized' ? (
                   <motion.div 
                      key="specialized"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                   >
                      {SPECIALIZED_MODELS.map((model) => (
                         <div key={model.id} className={`bg-[#111] border ${model.borderColor} ${model.bg} rounded-3xl p-6 relative group hover:bg-opacity-20 transition-all`}>
                            <div className="flex justify-between items-start mb-4">
                               <span className={`text-[10px] font-bold px-2 py-1 rounded bg-black/40 border border-white/5 ${model.color}`}>{model.tag}</span>
                               <div className="text-right">
                                  <span className={`text-2xl font-black ${model.color}`}>{model.cost}</span>
                                  <span className="text-[10px] text-gray-500 block">لوم / تصویر</span>
                               </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{model.name}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6 h-16">{model.desc}</p>
                            
                            <div className="space-y-2 mb-6">
                               {model.features.map((f, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                                     <Check size={12} className={model.color} />
                                     {f}
                                  </div>
                               ))}
                            </div>

                            <div className="pt-4 border-t border-white/5 mt-auto">
                               <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Sliders size={14} />
                                  <span>تنظیمات: <span className="text-white font-bold">Scale Factor (2x, 4x...)</span></span>
                               </div>
                            </div>
                         </div>
                      ))}
                   </motion.div>
                ) : (
                   <motion.div 
                      key="nano"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="max-w-4xl mx-auto"
                   >
                      <div className="bg-[#111] border border-luma-yellow/30 bg-luma-yellow/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-luma-yellow/10 blur-[80px] rounded-full pointer-events-none" />
                         
                         <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                            <div className="flex-1">
                               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luma-yellow/10 text-luma-yellow text-xs font-bold mb-6 border border-luma-yellow/20">
                                  <Zap size={14} />
                                  مدل چندمنظوره
                               </div>
                               <h3 className="text-3xl font-black text-white mb-4">NANO BANANA PRO</h3>
                               <p className="text-gray-400 text-lg leading-loose mb-8">
                                  این مدل ساختاری متفاوت دارد. به جای انتخاب ضریب بزرگ‌نمایی (مثلاً 2x)، به شما اجازه می‌دهد **رزولوشن نهایی** و **نسبت تصویر** را مستقیماً انتخاب کنید.
                                  <br/>
                                  <span className="text-white font-bold">ایده‌آل برای:</span> تبدیل عکس‌های کوچک مستطیلی به پوسترهای مربعی 4K برای اینستاگرام.
                               </p>
                               <div className="flex flex-wrap gap-4">
                                  <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                                     <Target className="text-luma-yellow" size={20} />
                                     <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-500">کنترل خروجی</span>
                                        <span className="text-sm font-bold text-white">انتخاب رزولوشن (1K, 4K)</span>
                                     </div>
                                  </div>
                                  <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                                     <Maximize className="text-luma-yellow" size={20} />
                                     <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-500">تغییر کادر</span>
                                        <span className="text-sm font-bold text-white">تغییر نسبت تصویر</span>
                                     </div>
                                  </div>
                               </div>
                            </div>
                            
                            {/* Visual Representation of Nano Controls */}
                            <div className="w-full md:w-80 bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 shadow-2xl">
                               <div className="space-y-4">
                                  <div className="space-y-2">
                                     <label className="text-xs text-gray-500">نسبت تصویر</label>
                                     <div className="grid grid-cols-3 gap-2">
                                        {['1:1', '3:4', '16:9'].map(r => (
                                           <div key={r} className="bg-[#222] text-center py-2 rounded text-xs text-gray-300 border border-white/5">{r}</div>
                                        ))}
                                     </div>
                                  </div>
                                  <div className="space-y-2">
                                     <label className="text-xs text-gray-500">وضوح تصویر</label>
                                     <div className="grid grid-cols-3 gap-2">
                                        {['1K', '2K', '4K'].map(r => (
                                           <div key={r} className={`text-center py-2 rounded text-xs border ${r === '4K' ? 'bg-luma-yellow text-black border-luma-yellow font-bold' : 'bg-[#222] text-gray-300 border-white/5'}`}>{r}</div>
                                        ))}
                                     </div>
                                  </div>
                                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                     <span className="text-xs text-gray-400">هزینه متغیر</span>
                                     <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg">محاسبه</button>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>
          </div>

       </div>
    </section>
  );
};
