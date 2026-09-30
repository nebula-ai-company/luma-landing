import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Brain, Zap, Globe, FileText, Wrench, Search, 
  Wind, Infinity, Box, Sparkles, Command, Check, Filter,
  Star, Shield, Code2, Rocket, ArrowLeft, RefreshCw, AlertCircle, Layers
} from 'lucide-react';
import { 
  CatalogService, 
  ChatCatalogModel, 
  formatPersianDigits, 
  formatCurrencyLabel, 
  formatPerTokens 
} from '../../../lib/catalogApi';

export interface ChatModelsProps {
  service?: CatalogService;
  models?: ChatCatalogModel[];
  loading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

// --- Brand Configuration ---
const BRAND_PALETTE = [
  { name: 'purple', hex: '#DA8FFF', class: 'text-luma-purple', bg: 'bg-luma-purple/10', border: 'border-luma-purple/20' },
  { name: 'pink', hex: '#FF6482', class: 'text-luma-pink', bg: 'bg-luma-pink/10', border: 'border-luma-pink/20' },
  { name: 'yellow', hex: '#FFB340', class: 'text-luma-yellow', bg: 'bg-luma-yellow/10', border: 'border-luma-yellow/20' },
];

const getBrandStyle = (index: number) => BRAND_PALETTE[index % BRAND_PALETTE.length];

const PROVIDER_ICONS: Record<string, React.ElementType> = {
  OpenAI: Zap,
  Google: Globe,
  xAI: Command,
  Anthropic: Box,
  MiniMax: Sparkles,
  Minimax: Sparkles,
  DeepSeek: Search,
  Alibaba: Cpu,
  Mistral: Wind,
  'Z.ai': Brain,
  Zai: Brain,
  Xiaomi: Cpu,
  'Moonshot AI': Rocket,
  Meta: Infinity,
};

const TOOLS = [
  { icon: Code2, label: "تحلیل کد و ابزارها", desc: "Refactoring, Debugging, Tools" },
  { icon: FileText, label: "پردازش و استدلال عمیق", desc: "تحلیل اسناد و استنتاج منطقی" },
  { icon: Globe, label: "جستجوی وب", desc: "دسترسی به اطلاعات زنده اینترنت" },
];

// --- Premium Card Component ---
const ModelCard: React.FC<{ 
  model: ChatCatalogModel; 
  providerStyle: { hex: string; class: string; bg: string; border: string };
  providerIcon: React.ElementType;
}> = ({ model, providerStyle, providerIcon: ProviderIcon }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <li className="list-none">
      <article aria-label={`مدل ${model.name}`} className="h-full">
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
              ${model.legacy ? 'opacity-60 hover:opacity-100 grayscale hover:grayscale-0' : ''}
            `}
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          >
            {/* Dynamic Border Gradient */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
              style={{
                background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${providerStyle.hex}60, transparent 40%)`
              }}
            />

            {/* Inner Content Container */}
            <div className="relative h-full bg-white dark:bg-[#0c0c0e] rounded-[15px] overflow-hidden flex flex-col p-5 border border-zinc-200/60 dark:border-transparent transition-colors">
              
              {/* Subtle Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${providerStyle.hex}, transparent 40%)`
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-zinc-150 dark:border-white/5 transition-colors duration-300 ${providerStyle.bg} group-hover:scale-110 shadow-sm`}>
                      <ProviderIcon size={18} className={providerStyle.class} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold transition-colors ${model.legacy ? 'text-zinc-400 dark:text-gray-400' : 'text-zinc-850 dark:text-gray-100 group-hover:text-zinc-950 dark:group-hover:text-white'}`}>
                        {model.name}
                      </h3>
                      <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-medium transition-colors">
                        {model.provider}
                      </span>
                    </div>
                  </div>
                  
                  {/* Status & Capabilities Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 justify-end">
                    {model.legacy && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-gray-400">
                        مدل قبلی
                      </span>
                    )}
                    {model.capabilities?.reasoning && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Brain size={10} aria-hidden="true" />
                        استدلال
                      </span>
                    )}
                    {model.capabilities?.tools && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-luma-purple/20 bg-luma-purple/10 text-luma-purple flex items-center gap-1">
                        <Code2 size={10} aria-hidden="true" />
                        ابزار
                      </span>
                    )}
                    {model.capabilities?.webSearch && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-blue-400/20 bg-blue-400/10 text-blue-500 dark:text-blue-400 flex items-center gap-1">
                        <Globe size={10} aria-hidden="true" />
                        وب
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {model.description && (
                  <p className="text-[11px] text-zinc-500 dark:text-gray-400 leading-relaxed mb-4 border-t border-zinc-150 dark:border-white/5 pt-3 transition-colors">
                    {model.description}
                  </p>
                )}

                {/* Pricing Breakdown */}
                {model.pricing && (
                  <div className="mt-auto pt-3 border-t border-zinc-150 dark:border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-400 dark:text-gray-500">ورودی:</span>
                      <span className="font-bold text-zinc-800 dark:text-gray-200 font-mono dir-ltr">
                        {formatPersianDigits(model.pricing.input)} {formatCurrencyLabel(model.pricing.currency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-400 dark:text-gray-500">خروجی:</span>
                      <span className="font-bold text-zinc-800 dark:text-gray-200 font-mono dir-ltr">
                        {formatPersianDigits(model.pricing.output)} {formatCurrencyLabel(model.pricing.currency)}
                      </span>
                    </div>

                    {/* Cache Pricing */}
                    {(typeof model.pricing.cacheRead === 'number' || typeof model.pricing.cacheWrite === 'number') && (
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 dark:text-gray-400 pt-1 border-t border-zinc-100 dark:border-white/5">
                        {typeof model.pricing.cacheRead === 'number' && (
                          <span>
                            خواندن کش: <span className="font-mono font-bold text-zinc-700 dark:text-gray-300">{formatPersianDigits(model.pricing.cacheRead)}</span> {formatCurrencyLabel(model.pricing.currency)}
                          </span>
                        )}
                        {typeof model.pricing.cacheWrite === 'number' && (
                          <span>
                            نوشتن کش: <span className="font-mono font-bold text-zinc-700 dark:text-gray-300">{formatPersianDigits(model.pricing.cacheWrite)}</span> {formatCurrencyLabel(model.pricing.currency)}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="text-[9px] text-zinc-400 dark:text-gray-500 text-left dir-ltr">
                      به ازای {formatPerTokens(model.pricing.perTokens)}
                    </div>

                    {/* Tiered Pricing */}
                    {model.pricing.tiers && model.pricing.tiers.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-dashed border-zinc-200 dark:border-white/10 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold text-zinc-700 dark:text-gray-300">
                          <span className="flex items-center gap-1 text-luma-purple">
                            <Layers size={11} aria-hidden="true" />
                            تعرفه پلکانی
                          </span>
                          <span className="text-[9px] text-zinc-400 font-mono">
                            {formatPersianDigits(model.pricing.tiers.length)} پله
                          </span>
                        </div>
                        <div className="space-y-1 max-h-28 overflow-y-auto custom-scrollbar">
                          {[...model.pricing.tiers]
                            .sort((a, b) => a.minInputTokens - b.minInputTokens)
                            .map((tier, idx) => (
                              <div key={idx} className="bg-zinc-50 dark:bg-white/[0.03] p-1.5 rounded-lg text-[9px] text-zinc-650 dark:text-gray-400 flex flex-col gap-0.5">
                                <div className="flex items-center justify-between">
                                  <span>حداقل {formatPersianDigits(tier.minInputTokens)} توکن ورودی:</span>
                                  <span className="font-mono font-bold text-zinc-800 dark:text-gray-200 dir-ltr">
                                    {formatPersianDigits(tier.input)} / {formatPersianDigits(tier.output)} {formatCurrencyLabel(model.pricing.currency)}
                                  </span>
                                </div>
                                {(typeof tier.cacheRead === 'number' || typeof tier.cacheWrite === 'number') && (
                                  <div className="text-[8px] text-zinc-400 dark:text-gray-500 flex justify-between">
                                    {typeof tier.cacheRead === 'number' && (
                                      <span>خواندن کش: {formatPersianDigits(tier.cacheRead)}</span>
                                    )}
                                    {typeof tier.cacheWrite === 'number' && (
                                      <span>نوشتن کش: {formatPersianDigits(tier.cacheWrite)}</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Footer */}
                <div className="mt-3 pt-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <span className={`text-[10px] font-bold ${providerStyle.class}`}>شروع چت با این مدل</span>
                  <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center">
                    <Check size={12} className="text-zinc-800 dark:text-white" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </article>
    </li>
  );
};

export const ChatModels: React.FC<ChatModelsProps> = ({
  models = [],
  loading = false,
  error = null,
  onRetry,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLegacy, setShowLegacy] = useState(false);

  // Dynamically derive unique providers from live models in backend order of appearance
  const providers = useMemo(() => {
    if (!models || models.length === 0) return [];
    
    const ordered: string[] = [];
    for (const m of models) {
      const p = m.provider?.trim();
      if (p && !ordered.includes(p)) {
        ordered.push(p);
      }
    }

    return ordered.map((name, index) => ({
      id: name.toLowerCase(),
      name,
      icon: PROVIDER_ICONS[name] || Globe,
      style: getBrandStyle(index),
      count: models.filter(m => m.provider?.trim().toLowerCase() === name.toLowerCase()).length,
    }));
  }, [models]);

  // Set initial selected provider if 'all' is not chosen yet or when providers load
  useEffect(() => {
    if (selectedProvider === 'all' && providers.length > 0 && !searchQuery) {
      setSelectedProvider(providers[0].id);
    }
  }, [providers, selectedProvider, searchQuery]);

  const activeProvider = useMemo(() => {
    if (selectedProvider === 'all') {
      return {
        id: 'all',
        name: 'همه ارائه‌دهندگان',
        icon: Sparkles,
        style: getBrandStyle(0),
        count: models.length,
      };
    }
    return providers.find(p => p.id === selectedProvider) || providers[0] || {
      id: 'default',
      name: 'هوش مصنوعی',
      icon: Globe,
      style: getBrandStyle(0),
      count: models.length,
    };
  }, [providers, selectedProvider, models.length]);

  const filteredModels = useMemo(() => {
    if (!models) return [];
    return models.filter(m => {
      const matchesProvider = selectedProvider === 'all' || m.provider.toLowerCase() === selectedProvider.toLowerCase();
      const matchesLegacy = showLegacy ? true : !m.legacy;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = q
        ? m.name.toLowerCase().includes(q) ||
          m.provider.toLowerCase().includes(q) ||
          (m.description && m.description.toLowerCase().includes(q))
        : true;
      return matchesProvider && matchesLegacy && matchesSearch;
    });
  }, [models, selectedProvider, showLegacy, searchQuery]);

  return (
    <section id="chat-models" className="py-24 bg-white dark:bg-[#0a0a0a] border-t border-zinc-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
        
        {/* Top Fade */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        {/* Ambient Background */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-luma-purple/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-luma-pink/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
            
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                
                {/* --- Left Column: Navigation --- */}
                <nav aria-label="انتخاب سازندگان مدل" className="w-full lg:w-72 shrink-0 flex flex-col gap-8">
                    
                    {/* Search & Filter */}
                    <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 rounded-2xl p-4 shadow-xl transition-colors">
                        <div className="relative mb-4">
                            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-gray-500" aria-hidden="true" />
                            <input 
                                type="text" 
                                placeholder="جستجو در مدل‌ها..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="جستجو در مدل‌های چت هوشمند"
                                className="w-full h-10 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-white/5 rounded-xl pr-9 pl-3 text-xs text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-600 focus:border-luma-purple/50 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-zinc-500 dark:text-gray-500 font-medium transition-colors">نمایش مدل‌های قدیمی</span>
                            <button 
                                type="button"
                                aria-label="تغییر وضعیت نمایش مدل‌های قدیمی"
                                aria-pressed={showLegacy}
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
                        <ul className="space-y-1 list-none p-0 m-0" aria-label="لیست ارائه‌دهندگان مدل">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setSelectedProvider('all')}
                                    aria-pressed={selectedProvider === 'all'}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                                        ${selectedProvider === 'all'
                                            ? 'bg-zinc-100 dark:bg-[#151515] text-zinc-900 dark:text-white shadow-lg border border-zinc-200 dark:border-white/10' 
                                            : 'text-zinc-500 dark:text-gray-400 hover:text-zinc-800 dark:hover:text-gray-200 hover:bg-zinc-50 dark:hover:bg-white/5 border border-transparent'
                                        }
                                    `}
                                >
                                    {selectedProvider === 'all' && <motion.div layoutId="activeProviderIndicator" className="absolute left-0 top-0 bottom-0 w-1 bg-luma-purple" />}
                                    <div className="p-1.5 rounded-lg bg-zinc-50 dark:bg-white/5 text-zinc-400 dark:text-gray-500 group-hover:text-zinc-600 dark:group-hover:text-gray-300">
                                        <Sparkles size={16} aria-hidden="true" />
                                    </div>
                                    <span className="text-sm font-medium transition-colors">همه ارائه‌دهندگان</span>
                                    <span className="mr-auto text-[9px] bg-zinc-200 dark:bg-white/10 px-2 py-0.5 rounded text-zinc-600 dark:text-gray-300 transition-colors font-mono">
                                        {formatPersianDigits(models.length)}
                                    </span>
                                </button>
                            </li>
                            {providers.map((p) => {
                                const isActive = selectedProvider === p.id;
                                return (
                                    <li key={p.id}>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProvider(p.id)}
                                            aria-pressed={isActive}
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
                                                <p.icon size={16} aria-hidden="true" />
                                            </div>
                                            <span className="text-sm font-medium transition-colors">{p.name}</span>
                                            <span className="mr-auto text-[9px] bg-zinc-200 dark:bg-white/10 px-2 py-0.5 rounded text-zinc-600 dark:text-gray-300 transition-colors font-mono">
                                                {formatPersianDigits(p.count)}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Mobile Horizontal Tabs */}
                    <div className="lg:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        <ul className="flex gap-2 w-max list-none p-0 m-0" aria-label="لیست ارائه‌دهندگان مدل در موبایل">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setSelectedProvider('all')}
                                    aria-pressed={selectedProvider === 'all'}
                                    className={`
                                        flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300
                                        ${selectedProvider === 'all' 
                                            ? 'bg-zinc-100 dark:bg-[#1a1a1a] text-zinc-900 dark:text-white border-zinc-300 shadow-lg' 
                                            : 'bg-transparent border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-gray-400 hover:bg-zinc-50 dark:hover:bg-white/5'
                                        }
                                    `}
                                >
                                    <Sparkles size={16} aria-hidden="true" />
                                    <span className="text-xs font-bold whitespace-nowrap">همه</span>
                                </button>
                            </li>
                            {providers.map((p) => {
                                const isActive = selectedProvider === p.id;
                                return (
                                    <li key={p.id}>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProvider(p.id)}
                                            aria-pressed={isActive}
                                            className={`
                                                flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300
                                                ${isActive 
                                                    ? `bg-zinc-100 dark:bg-[#1a1a1a] text-zinc-900 dark:text-white border-zinc-300 dark:${p.style.border} shadow-lg` 
                                                    : 'bg-transparent border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-gray-400 hover:bg-zinc-50 dark:hover:bg-white/5'
                                                }
                                            `}
                                        >
                                            <p.icon size={16} className={`${isActive ? p.style.class : 'text-zinc-400 dark:text-gray-500'}`} aria-hidden="true" />
                                            <span className="text-xs font-bold whitespace-nowrap">{p.name}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>

                {/* --- Main Content: Models --- */}
                <div className="flex-1 min-w-0">
                    
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3 transition-colors">
                                <span className={`p-2 rounded-xl bg-zinc-50 dark:bg-white/5 ${activeProvider.style.class} transition-colors`}>
                                    <activeProvider.icon size={24} aria-hidden="true" />
                                </span>
                                {activeProvider.name}
                            </h2>
                            <span className="text-xs bg-zinc-100 dark:bg-white/5 px-2.5 py-1 rounded-full text-zinc-500 dark:text-gray-400 font-mono">
                              {formatPersianDigits(filteredModels.length)} مدل
                            </span>
                        </div>

                        {/* View All Button */}
                        {selectedProvider !== 'all' && (
                          <button 
                            type="button" 
                            onClick={() => setSelectedProvider('all')}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10 hover:border-zinc-300 dark:hover:border-white/20 text-zinc-650 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-white transition-all text-xs font-bold group"
                          >
                              <span>مشاهده همه مدل‌ها</span>
                              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                          </button>
                        )}
                    </header>

                    {/* Error Banner */}
                    {error && (
                      <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-center justify-between gap-4 text-red-700 dark:text-red-400">
                        <div className="flex items-center gap-3">
                          <AlertCircle size={20} className="shrink-0" aria-hidden="true" />
                          <span className="text-xs font-medium">خطا در بارگذاری آخرین وضعیت کاتالوگ مدل‌ها.</span>
                        </div>
                        {onRetry && (
                          <button
                            type="button"
                            onClick={onRetry}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shrink-0"
                          >
                            <RefreshCw size={12} aria-hidden="true" />
                            تلاش مجدد
                          </button>
                        )}
                      </div>
                    )}

                    {/* Skeleton Loading State */}
                    {loading && models.length === 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="h-48 rounded-2xl bg-zinc-100 dark:bg-white/5 animate-pulse border border-zinc-200 dark:border-white/5" />
                        ))}
                      </div>
                    )}

                    {/* Models Grid */}
                    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 list-none p-0 m-0" aria-label={`مدل‌های ${activeProvider?.name}`}>
                        <AnimatePresence mode='popLayout'>
                            {filteredModels.map((m) => {
                                const providerInfo = providers.find(p => p.name.toLowerCase() === m.provider.toLowerCase());
                                const style = providerInfo?.style || getBrandStyle(0);
                                const icon = providerInfo?.icon || Globe;
                                return (
                                    <ModelCard 
                                      key={m.id} 
                                      model={m} 
                                      providerStyle={style} 
                                      providerIcon={icon} 
                                    />
                                );
                            })}
                        </AnimatePresence>
                    </ul>

                    {/* Empty State */}
                    {!loading && filteredModels.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-200 dark:border-white/10 rounded-3xl bg-zinc-50/50 dark:bg-white/[0.01]">
                            <Filter size={32} className="text-zinc-400 dark:text-gray-600 mb-4" aria-hidden="true" />
                            <p className="text-zinc-500 dark:text-gray-500 text-sm">مدلی با این مشخصات یافت نشد.</p>
                            {!showLegacy && (
                                <button type="button" onClick={() => setShowLegacy(true)} className="text-luma-purple text-xs mt-2 hover:underline font-bold">
                                    بررسی مدل‌های قدیمی
                                </button>
                            )}
                            {selectedProvider !== 'all' && (
                                <button type="button" onClick={() => setSelectedProvider('all')} className="text-zinc-500 text-xs mt-1 hover:underline">
                                    مشاهده همه ارائه‌دهندگان
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* --- Right Column: Tools & Info --- */}
                <aside aria-label="جعبه‌ابزار و راهنما" className="w-full lg:w-72 shrink-0 space-y-6">
                    
                    {/* Tools Card */}
                    <div className="bg-gradient-to-b from-zinc-50 to-zinc-100/30 dark:from-[#111] dark:to-[#0c0c0e] border border-zinc-200 dark:border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-luma-purple/5 rounded-full blur-[40px] pointer-events-none" />
                        
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                            <Wrench size={16} className="text-luma-purple" aria-hidden="true" />
                            <h3 className="font-bold text-sm text-zinc-900 dark:text-white transition-colors">جعبه‌ابزار هوشمند</h3>
                        </div>
                        
                        <ul className="space-y-3 relative z-10 list-none p-0 m-0" aria-label="ابزارهای هوشمند">
                            {TOOLS.map((t, i) => (
                                <li key={i} className="flex gap-3 items-start group">
                                    <div className="mt-0.5 w-6 h-6 rounded bg-zinc-100 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-luma-purple/20 group-hover:text-luma-purple transition-colors">
                                        <t.icon size={12} className="text-zinc-400 dark:text-gray-400 group-hover:text-luma-purple transition-colors" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-zinc-700 dark:text-gray-300 block group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{t.label}</span>
                                        <span className="text-[9px] text-zinc-400 dark:text-gray-500 transition-colors">{t.desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pro Tip Card */}
                    <div className="bg-amber-50/40 dark:bg-[#1a1a1a] border border-luma-yellow/20 dark:border-luma-yellow/20 rounded-2xl p-5 relative overflow-hidden group transition-colors">
                        <div className="absolute top-0 left-0 w-full h-1 bg-luma-yellow" />
                        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-luma-yellow/10 rounded-full blur-xl group-hover:bg-luma-yellow/20 transition-colors" />
                        
                        <div className="flex items-start gap-3 relative z-10">
                            <div className="mt-0.5">
                                <Sparkles size={16} className="text-luma-yellow fill-luma-yellow" aria-hidden="true" />
                            </div>
                            <div>
                                <span className="text-luma-yellow font-bold text-xs block mb-2 uppercase tracking-wider">پیشنهاد متخصصین</span>
                                <p className="text-zinc-650 dark:text-gray-300 text-[11px] leading-relaxed transition-colors">
                                    برای وظایف چندمرحله‌ای، مدل‌های دارای قابلیت استدلال (Reasoning) و برای دسترسی به اخبار و داده‌های زنده، مدل‌های مجهز به جستجوی وب (Web Search) بهترین کارایی را دارند.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 transition-colors">
                        <Shield size={14} className="text-luma-purple" aria-hidden="true" />
                        <span className="text-[10px] text-zinc-400 dark:text-gray-500 transition-colors">حفاظت از داده‌ها و حریم خصوصی Enterprise-Grade</span>
                    </div>

                </aside>

            </div>
        </div>
    </section>
  );
};
