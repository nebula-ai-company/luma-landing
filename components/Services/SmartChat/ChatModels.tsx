
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Brain, Zap, Globe, FileText, Wrench, Search, 
  Wind, Infinity, Box, Sparkles, Command, Check, Filter,
  Eye, EyeOff, Star, Shield, Code2, Rocket, ArrowLeft, Grid
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
    { name: 'GPT-5.2', tag: 'New', desc: 'جدیدترین و هوشمندترین مدل جهان' },
    { name: 'GPT-5.1', tag: 'Legacy' },
    { name: 'GPT-5', tag: 'Legacy' },
    { name: 'GPT-5 Mini', tag: 'Fast', desc: 'نسخه سبک و سریع برای کارهای روزمره' },
    { name: 'GPT-5 Nano', tag: 'Ultra Fast' },
    { name: 'GPT-4o', tag: 'Legacy' },
    { name: 'GPT-4o Mini', tag: 'Legacy' },
    { name: 'O4 Mini', tag: 'Legacy' },
    { name: 'O3', tag: 'Legacy' },
    { name: 'O3 Mini', tag: 'Legacy' },
    { name: 'GPT-4.1', tag: 'Legacy' },
    { name: 'GPT-4.1 Mini', tag: 'Legacy' },
    { name: 'GPT-4.1 Nano', tag: 'Legacy' },
  ],
  google: [
    { name: 'Gemini 3 Pro Preview', tag: 'Preview', desc: 'قدرتمندترین مدل چندوجهی گوگل' },
    { name: 'Gemini 3 Flash', tag: 'Fast', desc: 'سرعت پردازش بسیار بالا و هزینه کم' },
    { name: 'Gemini 2.5 Pro', tag: 'Legacy' },
    { name: 'Gemini 2.5 Flash', tag: 'Legacy' },
    { name: 'Gemini 2.5 Flash Lite', tag: 'Legacy' },
    { name: 'Gemini 2.0 Flash', tag: 'Legacy' },
  ],
  xai: [
    { name: 'Grok 4.1 Fast Reasoning', tag: 'Reasoning', desc: 'استدلال سریع و دسترسی به دیتای زنده' },
    { name: 'Grok 4.1 Fast Non-Reasoning', tag: 'Fast' },
    { name: 'Grok 4 Fast Non-Reasoning', tag: 'Legacy' },
    { name: 'Grok 4 Fast Reasoning', tag: 'Legacy' },
  ],
  anthropic: [
    { name: 'Claude Opus 4.5', tag: 'Flagship', desc: 'هوشمندترین مدل برای کدنویسی و تحلیل' },
    { name: 'Claude Sonnet 4.5', tag: 'Balanced', desc: 'تعادل عالی بین هوش و سرعت' },
    { name: 'Claude Haiku 4.5', tag: 'Fast' },
    { name: 'Claude Sonnet 4', tag: 'Legacy' },
    { name: 'Claude 3.7 Sonnet', tag: 'Legacy' },
  ],
  minimax: [
    { name: 'Minimax M2.1', tag: 'New' },
    { name: 'Minimax M2.1 Lightning', tag: 'Fast' },
    { name: 'Minimax M2', tag: 'Legacy' },
  ],
  deepseek: [
    { name: 'DeepSeek V3.2 Thinking', tag: 'Reasoning', desc: 'متخصص حل مسائل پیچیده ریاضی' },
    { name: 'DeepSeek V3.2', tag: 'Standard' },
    { name: 'DeepSeek V3.1', tag: 'Legacy' },
  ],
  alibaba: [
    { name: 'Qwen3 Max', tag: 'Flagship' },
    { name: 'Qwen3 VL Thinking', tag: 'Vision', desc: 'تحلیل پیشرفته تصاویر و ویدیو' },
  ],
  mistral: [
    { name: 'Ministral 3B', tag: 'Light' },
    { name: 'Devstral 2', tag: 'Dev' },
    { name: 'Mistral Large', tag: 'Flagship' },
  ],
  zai: [
    { name: 'GLM 4.7', tag: 'New' },
    { name: 'GLM 4.6v', tag: 'Vision' },
    { name: 'GLM 4.6', tag: 'Legacy' },
    { name: 'GLM 4.5', tag: 'Legacy' },
    { name: 'GLM 4.5 Air', tag: 'Legacy' },
  ],
  moonshot: [
    { name: 'Kimi K2', tag: 'Standard' },
    { name: 'Kimi K2 Thinking', tag: 'Reasoning' },
  ],
  meta: [
    { name: 'Llama 4 Maverick', tag: 'New', desc: 'جدیدترین مدل متن‌باز متا' },
    { name: 'Llama 4 Scout', tag: 'Fast' },
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
            <div className="relative h-full bg-[#0c0c0e] rounded-[15px] overflow-hidden flex flex-col p-5">
                
                {/* Subtle Inner Glow */}
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
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 transition-colors duration-300 ${activeProvider.style.bg} group-hover:scale-110`}>
                                {activeProvider && <activeProvider.icon size={18} className={activeProvider.style.class} />}
                            </div>
                            <div>
                                <h4 className={`text-sm font-bold transition-colors ${model.tag === 'Legacy' ? 'text-gray-400' : 'text-gray-200 group-hover:text-white'}`}>
                                    {model.name}
                                </h4>
                                {model.tag !== 'Legacy' && (
                                    <span className="text-[10px] text-gray-500 font-mono">Context: 128k</span>
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
                        <p className="text-[11px] text-gray-400 leading-relaxed mb-4 border-t border-white/5 pt-3 mt-auto">
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
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        
        {/* Ambient Background */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-luma-purple/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-luma-pink/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
            
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                
                {/* --- Left Column: Navigation --- */}
                <div className="w-full lg:w-72 shrink-0 flex flex-col gap-8">
                    
                    {/* Search & Filter */}
                    <div className="bg-[#0c0c0e] border border-white/10 rounded-2xl p-4 shadow-xl">
                        <div className="relative mb-4">
                            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input 
                                type="text" 
                                placeholder="جستجو در مدل‌ها..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 bg-[#151515] border border-white/5 rounded-xl pr-9 pl-3 text-xs text-white placeholder:text-gray-600 focus:border-luma-purple/50 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-medium">نمایش مدل‌های قدیمی</span>
                            <button 
                                onClick={() => setShowLegacy(!showLegacy)}
                                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 flex items-center ${showLegacy ? 'bg-luma-purple justify-end' : 'bg-white/10 justify-start'}`}
                            >
                                <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" />
                            </button>
                        </div>
                    </div>

                    {/* Provider List (Vertical) */}
                    <div className="space-y-1 hidden lg:block">
                        <h3 className="text-xs font-bold text-gray-500 px-2 mb-2 uppercase tracking-wider">سازندگان مدل</h3>
                        {PROVIDERS.map((p) => {
                            const isActive = selectedProvider === p.id;
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => setSelectedProvider(p.id)}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                                        ${isActive ? 'bg-[#151515] text-white shadow-lg border border-white/10' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'}
                                    `}
                                >
                                    {isActive && <motion.div layoutId="activeProviderIndicator" className="absolute left-0 top-0 bottom-0 w-1 bg-luma-purple" />}
                                    <div className={`p-1.5 rounded-lg transition-colors ${isActive ? p.style.bg + ' ' + p.style.class : 'bg-white/5 text-gray-500 group-hover:text-gray-300'}`}>
                                        <p.icon size={16} />
                                    </div>
                                    <span className="text-sm font-medium">{p.name}</span>
                                    {isActive && <span className="mr-auto text-[9px] bg-white/10 px-2 py-0.5 rounded text-gray-300">{ALL_MODELS[p.id]?.length}</span>}
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
                                                ? `bg-[#1a1a1a] text-white ${p.style.border} shadow-lg` 
                                                : 'bg-transparent border-white/10 text-gray-400 hover:bg-white/5'
                                            }
                                        `}
                                    >
                                        <p.icon size={16} className={`${isActive ? p.style.class : 'text-gray-500'}`} />
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
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className={`p-2 rounded-xl bg-white/5 ${activeProvider.style.class}`}>
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
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-all text-xs font-bold group">
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
                        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                            <Filter size={32} className="text-gray-600 mb-4" />
                            <p className="text-gray-500 text-sm">مدلی با این مشخصات یافت نشد.</p>
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
                    <div className="bg-gradient-to-b from-[#111] to-[#0c0c0e] border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-luma-purple/5 rounded-full blur-[40px] pointer-events-none" />
                        
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                            <Wrench size={16} className="text-luma-purple" />
                            <h3 className="font-bold text-sm text-white">جعبه‌ابزار هوشمند</h3>
                        </div>
                        
                        <div className="space-y-3 relative z-10">
                            {TOOLS.map((t, i) => (
                                <div key={i} className="flex gap-3 items-start group">
                                    <div className="mt-0.5 w-6 h-6 rounded bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-luma-purple/20 group-hover:text-luma-purple transition-colors">
                                        <t.icon size={12} className="text-gray-400 group-hover:text-luma-purple" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-gray-300 block group-hover:text-white transition-colors">{t.label}</span>
                                        <span className="text-[9px] text-gray-500">{t.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Tip Card */}
                    <div className="bg-[#1a1a1a] border border-luma-yellow/20 rounded-2xl p-5 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-luma-yellow" />
                        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-luma-yellow/10 rounded-full blur-xl group-hover:bg-luma-yellow/20 transition-colors" />
                        
                        <div className="flex items-start gap-3 relative z-10">
                            <div className="mt-0.5">
                                <Sparkles size={16} className="text-luma-yellow fill-luma-yellow" />
                            </div>
                            <div>
                                <span className="text-luma-yellow font-bold text-xs block mb-2 uppercase tracking-wider">پیشنهاد متخصصین</span>
                                <p className="text-gray-300 text-[11px] leading-relaxed">
                                    برای پروژه‌های کدنویسی سنگین و دیباگ کردن، مدل <span className="text-white font-bold border-b border-luma-yellow/50">Claude Opus 4.5</span> به دلیل پنجره متنی بزرگ و قدرت استدلال بالا، بهترین انتخاب است.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <Shield size={14} className="text-luma-purple" />
                        <span className="text-[10px] text-gray-500">حفاظت از داده‌ها و حریم خصوصی Enterprise-Grade</span>
                    </div>

                </div>

            </div>
        </div>
    </section>
  );
};
