
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Zap, Cpu, Box } from 'lucide-react';

// Unified Brand Palette
const BRAND_COLORS = {
  purple: '#DA8FFF',
  pink: '#FF6482',
  yellow: '#FFB340',
};

const MODELS = [
  {
    id: 'gpt-5',
    name: 'GPT 5',
    desc: 'بهترین مدل برای کدنویسی و وظایف عامل‌محور در حوزه‌های مختلف',
    stats: { intelligence: 5, speed: 3 },
    cost: '۹ لوم',
    tags: ['Flagship', 'Coding'],
    colorClass: 'text-luma-purple',
    hex: BRAND_COLORS.purple
  },
  {
    id: 'gpt-5-mini',
    name: 'GPT 5 mini',
    desc: 'نسخه‌ای سریع‌تر و مقرون‌به‌صرفه‌تر از GPT-5 برای وظایف مشخص و تعریف‌شده',
    stats: { intelligence: 4, speed: 4 },
    cost: '۳ لوم',
    tags: ['Balanced'],
    colorClass: 'text-luma-purple',
    hex: BRAND_COLORS.purple
  },
  {
    id: 'gpt-5-nano',
    name: 'GPT 5 nano',
    desc: 'سریع‌ترین و مقرون‌به‌صرفه‌ترین نسخه‌ی GPT-5',
    stats: { intelligence: 3, speed: 5 },
    cost: '۱ لوم',
    tags: ['Ultra Fast'],
    colorClass: 'text-luma-purple',
    hex: BRAND_COLORS.purple
  },
  {
    id: 'gpt-4o',
    name: 'GPT 4o',
    desc: 'مدل GPT سریع، هوشمند و چندوجهی (Multimodal)',
    stats: { intelligence: 4.5, speed: 4 },
    cost: '۱۰ لوم',
    tags: ['Multimodal'],
    colorClass: 'text-luma-pink',
    hex: BRAND_COLORS.pink
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT 4o mini',
    desc: 'نسخه کوچک و اقتصادی GPT-4o برای کارهای روزمره',
    stats: { intelligence: 3.5, speed: 5 },
    cost: '۳ لوم',
    tags: ['Daily'],
    colorClass: 'text-luma-pink',
    hex: BRAND_COLORS.pink
  },
  {
    id: 'gpt-4.1',
    name: 'GPT 4.1',
    desc: 'مدل پایدار برای پردازش‌های متنی طولانی و پیچیده',
    stats: { intelligence: 4, speed: 3.5 },
    cost: '۷ لوم',
    tags: ['Stable'],
    colorClass: 'text-luma-yellow', // Changed from blue to yellow
    hex: BRAND_COLORS.yellow
  },
  {
    id: 'gpt-4.1-mini',
    name: 'GPT 4.1 mini',
    desc: 'گزینه‌ای عالی برای چت‌بات‌های سریع و ساده',
    stats: { intelligence: 3, speed: 4.5 },
    cost: '۳ لوم',
    tags: ['Chatbot'],
    colorClass: 'text-luma-yellow', // Changed from blue to yellow
    hex: BRAND_COLORS.yellow
  },
  {
    id: 'gpt-4.1-nano',
    name: 'GPT 4.1 nano',
    desc: 'سبک‌ترین مدل برای پردازش‌های آنی و میکروسرویس‌ها',
    stats: { intelligence: 2, speed: 5 },
    cost: '۲ لوم',
    tags: ['Micro'],
    colorClass: 'text-luma-yellow', // Changed from blue to yellow
    hex: BRAND_COLORS.yellow
  },
  {
    id: 'o3-mini',
    name: 'o3 mini',
    desc: 'متخصص استدلال (Reasoning) و حل مسائل منطقی',
    stats: { intelligence: 4.5, speed: 3 },
    cost: '۴ لوم',
    tags: ['Reasoning'],
    colorClass: 'text-luma-pink', // Alternate color for variety
    hex: BRAND_COLORS.pink
  },
];

const ModelCard: React.FC<{ model: typeof MODELS[0], index: number }> = ({ model, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ delay: index * 0.05 }}
       className="relative h-full"
    >
       {/* Outer Container for Border Animation */}
       <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          className="group relative h-full rounded-[24px] p-px overflow-hidden transition-transform duration-300 hover:-translate-y-1"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
       >
          {/* Dynamic Border Gradient */}
          <div
             className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
             style={{
                background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${model.hex}60, transparent 40%)`
             }}
          />

          {/* Inner Card Content */}
          <div className="relative h-full bg-[#0c0c0e] rounded-[23px] overflow-hidden flex flex-col p-6">
             
             {/* Inner Glow Effect */}
             <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                style={{
                   background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${model.hex}, transparent 40%)`
                }}
             />

             {/* Content Layer */}
             <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                   <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-gray-100 transition-colors">{model.name}</h3>
                   <div className="flex gap-2">
                      {model.tags.map((tag, tIdx) => (
                         <span key={tIdx} className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5 group-hover:border-white/10 transition-colors">
                            {tag}
                         </span>
                      ))}
                   </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow min-h-[48px] group-hover:text-gray-300 transition-colors">
                   {model.desc}
                </p>

                {/* Stats Visualization */}
                <div className="space-y-4 mt-auto">
                   {/* Intelligence */}
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                         <BrainCircuit size={14} className="group-hover:text-gray-400 transition-colors" />
                         <span>هوش مدل:</span>
                      </div>
                      <div className="flex gap-1">
                         {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-1.5 h-3 rounded-sm transition-colors duration-300 ${i < Math.floor(model.stats.intelligence) ? 'bg-white group-hover:bg-gray-200' : 'bg-white/10'}`} />
                         ))}
                      </div>
                   </div>
                   
                   {/* Speed */}
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                         <Zap size={14} className="group-hover:text-gray-400 transition-colors" />
                         <span>سرعت مدل:</span>
                      </div>
                      <div className="flex gap-1">
                         {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-1.5 h-3 rounded-sm skew-x-12 transition-colors duration-300 ${i < model.stats.speed ? 'bg-luma-yellow group-hover:bg-[#ffc86e]' : 'bg-white/10'}`} />
                         ))}
                      </div>
                   </div>

                   {/* Cost */}
                   <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2 group-hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                         <Box size={14} className="group-hover:text-gray-400 transition-colors" />
                         <span>هزینه مدل:</span>
                      </div>
                      <span className={`text-sm font-bold ${model.colorClass} drop-shadow-sm`}>{model.cost} / هر پیام</span>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </motion.div>
  );
};

export const AssistantAdvanced: React.FC = () => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
       {/* --- Background Ambience --- */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
       
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luma-purple/5 blur-[100px] rounded-full pointer-events-none" />
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-luma-pink/5 blur-[100px] rounded-full pointer-events-none" />

       <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 mb-6 uppercase tracking-widest backdrop-blur-md"
             >
                <Cpu size={12} className="text-white" />
                <span>موتورهای پردازشی</span>
             </motion.div>
             <motion.h2 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight"
             >
                قدرت انتخاب <span className="text-gradient-animated">بی‌نهایت</span>
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-gray-400 text-lg leading-relaxed font-light"
             >
                دستیار هوشمند شما می‌تواند از طیف وسیعی از مدل‌های زبانی استفاده کند. 
                از مدل‌های فوق‌سریع و ارزان برای کارهای روزمره تا مدل‌های فوق‌هوشمند برای مسائل پیچیده.
             </motion.p>
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {MODELS.map((model, idx) => (
                <ModelCard key={model.id} model={model} index={idx} />
             ))}
          </div>

       </div>
    </section>
  );
};
