
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Brain, Zap, Globe, FileText, Wrench, Search, 
  Wind, Infinity, Box, Sparkles, Command, Check, Filter,
  Star, Shield, Code2, Rocket, ArrowLeft
} from 'lucide-react';

// --- Brand Configuration ---
const BRAND_PALETTE = [
  { name: 'purple', hex: '#DA8FFF', class: 'text-luma-purple', bg: 'bg-luma-purple/10', border: 'border-luma-purple/20' },
  { name: 'pink', hex: '#FF6482', class: 'text-luma-pink', bg: 'bg-luma-pink/10', border: 'border-luma-pink/20' },
  { name: 'yellow', hex: '#FFB340', class: 'text-luma-yellow', bg: 'bg-luma-yellow/10', border: 'border-luma-yellow/20' },
];

const getBrandStyle = (index: number) => BRAND_PALETTE[index % BRAND_PALETTE.length];

const PROVIDERS = [
  { id: 'openai', name: 'OpenAI', icon: Zap },
  { id: 'google', name: 'Google', icon: Globe },
  { id: 'xai', name: 'xAI', icon: Command },
  { id: 'anthropic', name: 'Anthropic', icon: Box },
  { id: 'deepseek', name: 'Deepseek', icon: Search },
  { id: 'meta', name: 'Meta', icon: Infinity },
  { id: 'mistral', name: 'Mistral', icon: Wind },
  { id: 'alibaba', name: 'Alibaba', icon: Cpu },
  { id: 'minimax', name: 'Minimax', icon: Sparkles },
  { id: 'zai', name: 'Zai', icon: Brain },
  { id: 'moonshot', name: 'Moonshot', icon: Rocket },
].map((p, i) => ({ ...p, style: getBrandStyle(i) }));

const ALL_MODELS: Record<string, { name: string; tag?: string; desc?: string }[]> = {
  openai: [
    { name: 'GPT 5.5', tag: 'Flagship', desc: 'پیشرفته‌ترین و هوشمندترین مدل استدلال چندوجهی' },
    { name: 'GPT 5.4 Mini', tag: 'Fast', desc: 'نسخه سریع و بهینه برای کاربردهای روزمره' },
    { name: 'GPT 5.4 Nano', tag: 'Ultra Fast', desc: 'فوق‌العاده سریع با کمترین تاخیر پردازشی' },
    { name: 'GPT 5.2', tag: 'Standard', desc: 'مدل قدرتمند برای تولید متن و تحلیل پیشرفته' },
    { name: 'GPT 5 Mini', tag: 'Fast', desc: 'نسخه سبک و اقتصادی' },
    { name: 'GPT 5 Nano', tag: 'Ultra Fast', desc: 'نسخه میکروسرویسی و سریع' },
    { name: 'GPT-4o', tag: 'Legacy' },
    { name: 'GPT-4o Mini', tag: 'Legacy' },
    { name: 'O3', tag: 'Legacy' },
    { name: 'O3 Mini', tag: 'Legacy' },
  ],
  google: [
    { name: 'Gemini 3.1 Pro', tag: 'Flagship', desc: 'قدرتمندترین مدل چندوجهی گوگل برای وظایف تحلیلی' },
    { name: 'Gemini 3.5 Flash', tag: 'Fast', desc: 'سرعت پردازش بسیار بالا و پنجره متنی وسیع' },
    { name: 'Gemini 3.1 Flash Lite', tag: 'Ultra Fast', desc: 'نسخه سبک و فوق‌سریع برای درخواست‌های آنی' },
    { name: 'Gemini 2.5 Pro', tag: 'Legacy' },
    { name: 'Gemini 2.5 Flash', tag: 'Legacy' },
  ],
  xai: [
    { name: 'Grok 4.3', tag: 'Flagship', desc: 'جدیدترین مدل xAI با درک عمیق داده‌های زنده و تحلیل استدلالی' },
    { name: 'Grok 4.1 Fast Reasoning', tag: 'Reasoning', desc: 'استدلال سریع و حل مسائل منطقی' },
    { name: 'Grok 4 Fast', tag: 'Legacy' },
  ],
  anthropic: [
    { name: 'Claude Opus 4.8', tag: 'Flagship', desc: 'بالاترین سطح هوش و درک مفهومی پیچیده' },
    { name: 'Claude Sonnet 4.6', tag: 'Coding Pro', desc: 'پیشرو در برنامه‌نویسی، معماری کد و تحلیل اسناد' },
    { name: 'Claude Haiku 4.5', tag: 'Fast', desc: 'پاسخ‌دهی آنی و سبک برای پردازش‌های متنی پیوسته' },
    { name: 'Claude Sonnet 4', tag: 'Legacy' },
  ],
  minimax: [
    { name: 'MiniMax M2.7', tag: 'Flagship', desc: 'مدل قدرتمند پردازش زبان طبیعی و استدلال چندمرحله‌ای' },
    { name: 'MiniMax M2.1 Lightning', tag: 'Fast', desc: 'سرعت بالا برای مکالمات تعاملی و چت‌بات‌ها' },
    { name: 'MiniMax M2', tag: 'Legacy' },
  ],
  deepseek: [
    { name: 'DeepSeek V4 Pro', tag: 'Reasoning', desc: 'متخصص حل مسائل پیچیده ریاضی، منطق و مهندسی' },
    { name: 'DeepSeek V4 Flash', tag: 'Fast', desc: 'پاسخ‌دهی فوق‌سریع با حفظ کیفیت استدلال' },
    { name: 'DeepSeek V3.2', tag: 'Legacy' },
  ],
  alibaba: [
    { name: 'Qwen 3.7 Max', tag: 'Flagship', desc: 'پرچمدار علی‌بابا در درک زبان و دانش تخصصی' },
    { name: 'Qwen 3 VL', tag: 'Vision', desc: 'تحلیل پیشرفته تصاویر و اسناد دیداری' },
  ],
  mistral: [
    { name: 'Ministral 3B', tag: 'Fast', desc: 'مدل کوچک و بهینه‌سازی‌شده برای کارهای سبک' },
    { name: 'Devstral 2', tag: 'Dev', desc: 'بهینه‌سازی‌شده برای توسعه نرم‌افزار و خطایابی کد' },
    { name: 'Mistral Large', tag: 'Legacy' },
  ],
  zai: [
    { name: 'GLM 5', tag: 'Flagship', desc: 'جدیدترین نسل مدل‌های زبانی Z.ai با درک دوزبانه بالا' },
    { name: 'GLM 4.7', tag: 'Legacy' },
    { name: 'GLM 4.6v', tag: 'Legacy' },
  ],
  moonshot: [
    { name: 'Kimi K2.5', tag: 'Flagship', desc: 'مدل تخصصی با پنجره کانتکست عظیم برای تحلیل کتاب و اسناد طولانی' },
    { name: 'Kimi K2', tag: 'Legacy' },
  ],
  meta: [
    { name: 'Llama 4 Maverick', tag: 'Flagship', desc: 'مدل متن‌باز پیشرو متا با دقت تحلیلی بالا' },
    { name: 'Llama 4 Scout', tag: 'Fast', desc: 'مدل بهینه و پرسرعت برای کاربردهای متنوع' },
  ],
};

const TOOLS = [
    { icon: Code2, label: "تحلیل کد", desc: "Refactoring, Debugging" },
    { icon: FileText, label: "آنالیز اسناد", desc: "PDF, Docx (تا ۵۰۰ صفحه)" },
    { icon: Globe, label: "جستجوی وب", desc: "دسترسی به اینترنت زنده" },
];

// --- Premium Card Component ---
const ModelCard: React.FC<{ model: any, activeProvider: any }> = ({ model, activeProvider }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    // Determine badge style based on tag using strict brand colors
    const getBadgeStyle = (tag: string) => {
        if (tag === 'Legacy') return 'text-gray-500 border-white/10 bg-white/5';
        if (tag === 'New' || tag === 'Preview') return 'text-luma-purple border-luma-purple/30 bg-luma-purple/10';
        if (tag === 'Flagship' || tag === 'Reasoning' || tag === 'Thinking') return 'text-luma-yellow border-luma-yellow/30 bg-luma-yellow/10';
        if (tag === 'Fast' || tag === 'Light') return 'text-luma-pink border-luma-pink/30 bg-luma-pink/10';
        return 'text-gray-300 border-white/10 bg-white/5';
    };
  
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <div 
            ref={divRef}
            onMouseMove={handleMouseMove}
            className={`
                group relative h-full rounded-2xl p-px overflow-hidden transition-transform duration-300 hover:-translate-y-1 cursor-pointer
                ${model.tag === 'Legacy' ? 'opacity-60 hover:opacity-100 grayscale hover:grayscale-0' : ''}
            `}
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
        >
            {/* Dynamic Border Gradient */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
                style={{
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${activeProvider.style.hex}60, transparent 40%)`
                }}
            />
  
            {/* Inner Content Container */}
            <div className="relative h-full bg-white dark:bg-[#0c0c0e] rounded-[15px] overflow-hidden flex flex-col p-5 border border-zinc-200/60 dark:border-transparent transition-colors">
                
                {/* Subtle Glow */}
                <div 
                   className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                   style={{
                       background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${activeProvider.style.hex}, transparent 40%)`
                   }}
                />
  
                <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-zinc-150 dark:border-white/5 transition-colors duration-300 ${activeProvider.style.bg} group-hover:scale-110 shadow-sm`}>
                                {activeProvider && <activeProvider.icon size={18} className={activeProvider.style.class} />}
                            </div>
                            <div>
                                <h4 className={`text-sm font-bold transition-colors ${model.tag === 'Legacy' ? 'text-zinc-400 dark:text-gray-400' : 'text-zinc-850 dark:text-gray-100 group-hover:text-zinc-950 dark:group-hover:text-white'}`}>
                                    {model.name}
                                </h4>
                                {model.tag !== 'Legacy' && (
                                    <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-mono transition-colors">Context: 128k</span>
                                )}
                            </div>
                        </div>
                        
                        {/* Tags */}
                        {model.tag && (
                            <span className={`text-[9px] font-bold px-2 py-1 rounded border ${getBadgeStyle(model.tag)}`}>
                                {model.tag}
                            </span>
                        )}
                    </div>
  
                    {/* Description */}
                    {model.desc && (
                        <p className="text-[11px] text-zinc-500 dark:text-gray-400 leading-relaxed mb-4 border-t border-zinc-150 dark:border-white/5 pt-3 mt-auto transition-colors">
                            {model.desc}
                        </p>
                    )}
  
                    {/* Action Footer */}
                    <div className="mt-auto flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span className={`text-[10px] font-bold ${activeProvider.style.class}`}>انتخاب مدل</span>
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            <Check size={12} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    );
};

export const ChatModels: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<string>('openai');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLegacy, setShowLegacy] = useState(false);

  const activeProvider = PROVIDERS.find(p => p.id === selectedProvider) || PROVIDERS[0];
  const models = ALL_MODELS[selectedProvider] || [];

  const filteredModels = models.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLegacy = showLegacy ? true : m.tag !== 'Legacy';
    return matchesSearch && matchesLegacy;
  });

  return (
    <section id="chat-models" className="py-24 bg-white dark:bg-[#0a0a0a] border-t border-zinc-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
        
        {/* NEW: Top Fade */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />
        
        {/* NEW: Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        {/* Ambient Background */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-luma-purple/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-luma-pink/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
            
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                
                {/* --- Left Column: Navigation --- */}
                <div className="w-full lg:w-72 shrink-0 flex flex-col gap-8">
                    
                    {/* Search & Filter */}
                    <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 rounded-2xl p-4 shadow-xl transition-colors">
                        <div className="relative mb-4">
                            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-gray-500" />
                            <input 
                                type="text" 
                                placeholder="جستجو در مدل‌ها..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-white/5 rounded-xl pr-9 pl-3 text-xs text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-600 focus:border-luma-purple/50 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-zinc-500 dark:text-gray-500 font-medium transition-colors">نمایش مدل‌های قدیمی</span>
                            <button 
                                onClick={() => setShowLegacy(!showLegacy)}
                                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 flex items-center ${showLegacy ? 'bg-luma-purple justify-end' : 'bg-zinc-205 dark:bg-white/10 justify-start'}`}
                            >
                                <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" />
                            </button>
                        </div>
                    </div>

                    {/* Provider List (Vertical) */}
                    <div className="space-y-1 hidden lg:block">
                        <h3 className="text-xs font-bold text-zinc-400 dark:text-gray-500 px-2 mb-2 uppercase tracking-wider transition-colors">سازندگان مدل</h3>
                        {PROVIDERS.map((p) => {
                            const isActive = selectedProvider === p.id;
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => setSelectedProvider(p.id)}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                                        ${isActive 
                                            ? 'bg-zinc-100 dark:bg-[#151515] text-zinc-900 dark:text-white shadow-lg border border-zinc-200 dark:border-white/10' 
                                            : 'text-zinc-500 dark:text-gray-400 hover:text-zinc-800 dark:hover:text-gray-200 hover:bg-zinc-50 dark:hover:bg-white/5 border border-transparent'
                                        }
                                    `}
                                >
                                    {isActive && <motion.div layoutId="activeProviderIndicator" className="absolute left-0 top-0 bottom-0 w-1 bg-luma-purple" />}
                                    <div className={`p-1.5 rounded-lg transition-colors ${isActive ? p.style.bg + ' ' + p.style.class : 'bg-zinc-50 dark:bg-white/5 text-zinc-400 dark:text-gray-500 group-hover:text-zinc-600 dark:group-hover:text-gray-300'}`}>
                                        <p.icon size={16} />
                                    </div>
                                    <span className="text-sm font-medium transition-colors">{p.name}</span>
                                    {isActive && <span className="mr-auto text-[9px] bg-zinc-200 dark:bg-white/10 px-2 py-0.5 rounded text-zinc-600 dark:text-gray-300 transition-colors">{ALL_MODELS[p.id]?.length}</span>}
                                </button>
                            );
                        })}
                    </div>

                    {/* Mobile Horizontal Tabs */}
                    <div className="lg:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        <div className="flex gap-2 w-max">
                            {PROVIDERS.map((p) => {
                                const isActive = selectedProvider === p.id;
                                return (
                                    <button
                                        key={p.id}
                                        onClick={() => setSelectedProvider(p.id)}
                                        className={`
                                            flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300
                                            ${isActive 
                                                ? `bg-zinc-100 dark:bg-[#1a1a1a] text-zinc-900 dark:text-white border-zinc-300 dark:${p.style.border} shadow-lg` 
                                                : 'bg-transparent border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-gray-400 hover:bg-zinc-50 dark:hover:bg-white/5'
                                            }
                                        `}
                                    >
                                        <p.icon size={16} className={`${isActive ? p.style.class : 'text-zinc-400 dark:text-gray-500'}`} />
                                        <span className="text-xs font-bold whitespace-nowrap">{p.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* --- Main Content: Models --- */}
                <div className="flex-1 min-w-0">
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3 transition-colors">
                                <span className={`p-2 rounded-xl bg-zinc-50 dark:bg-white/5 ${activeProvider.style.class} transition-colors`}>
                                    {activeProvider && <activeProvider.icon size={24} />}
                                </span>
                                {activeProvider?.name} Models
                            </h2>
                            {/* Featured Badge */}
                            {selectedProvider === 'anthropic' && (
                                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-luma-yellow/10 border border-luma-yellow/20 rounded-full">
                                    <Star size={12} className="text-luma-yellow fill-luma-yellow" />
                                    <span className="text-[10px] font-bold text-luma-yellow">پیشنهاد سرآشپز</span>
                                </div>
                            )}
                        </div>

                        {/* View All Button */}
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10 hover:border-zinc-300 dark:hover:border-white/20 text-zinc-650 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-white transition-all text-xs font-bold group">
                            <span>مشاهده همه مدل‌ها</span>
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                        <AnimatePresence mode='popLayout'>
                            {filteredModels.map((m, i) => (
                                <ModelCard key={m.name} model={m} activeProvider={activeProvider} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredModels.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-200 dark:border-white/10 rounded-3xl bg-zinc-50/50 dark:bg-white/[0.01]">
                            <Filter size={32} className="text-zinc-400 dark:text-gray-600 mb-4" />
                            <p className="text-zinc-500 dark:text-gray-500 text-sm">مدلی با این مشخصات یافت نشد.</p>
                            {!showLegacy && (
                                <button onClick={() => setShowLegacy(true)} className="text-luma-purple text-xs mt-2 hover:underline font-bold">
                                    بررسی مدل‌های قدیمی
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* --- Right Column: Tools & Info --- */}
                <div className="w-full lg:w-72 shrink-0 space-y-6">
                    
                    {/* Tools Card */}
                    <div className="bg-gradient-to-b from-zinc-50 to-zinc-100/30 dark:from-[#111] dark:to-[#0c0c0e] border border-zinc-200 dark:border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-luma-purple/5 rounded-full blur-[40px] pointer-events-none" />
                        
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                            <Wrench size={16} className="text-luma-purple" />
                            <h3 className="font-bold text-sm text-zinc-900 dark:text-white transition-colors">جعبه‌ابزار هوشمند</h3>
                        </div>
                        
                        <div className="space-y-3 relative z-10">
                            {TOOLS.map((t, i) => (
                                <div key={i} className="flex gap-3 items-start group">
                                    <div className="mt-0.5 w-6 h-6 rounded bg-zinc-100 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-luma-purple/20 group-hover:text-luma-purple transition-colors">
                                        <t.icon size={12} className="text-zinc-400 dark:text-gray-400 group-hover:text-luma-purple transition-colors" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-zinc-700 dark:text-gray-300 block group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{t.label}</span>
                                        <span className="text-[9px] text-zinc-400 dark:text-gray-500 transition-colors">{t.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Tip Card */}
                    <div className="bg-amber-50/40 dark:bg-[#1a1a1a] border border-luma-yellow/20 dark:border-luma-yellow/20 rounded-2xl p-5 relative overflow-hidden group transition-colors">
                        <div className="absolute top-0 left-0 w-full h-1 bg-luma-yellow" />
                        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-luma-yellow/10 rounded-full blur-xl group-hover:bg-luma-yellow/20 transition-colors" />
                        
                        <div className="flex items-start gap-3 relative z-10">
                            <div className="mt-0.5">
                                <Sparkles size={16} className="text-luma-yellow fill-luma-yellow" />
                            </div>
                            <div>
                                <span className="text-luma-yellow font-bold text-xs block mb-2 uppercase tracking-wider">پیشنهاد متخصصین</span>
                                <p className="text-zinc-650 dark:text-gray-300 text-[11px] leading-relaxed transition-colors">
                                    برای پروژه‌های کدنویسی سنگین و دیباگ کردن، مدل <span className="text-zinc-800 dark:text-white font-bold border-b border-luma-yellow/50">Claude Sonnet 4.5</span> به دلیل پنجره متنی بزرگ و قدرت استدلال بالا، بهترین انتخاب است.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 transition-colors">
                        <Shield size={14} className="text-luma-purple" />
                        <span className="text-[10px] text-zinc-400 dark:text-gray-500 transition-colors">حفاظت از داده‌ها و حریم خصوصی Enterprise-Grade</span>
                    </div>

                </div>

            </div>
        </div>
    </section>
  );
};
