import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Search,
  Zap,
  Globe,
  Terminal,
  Box,
  Sparkles,
  Cpu,
  Wind,
  Brain,
  History,
  Info,
  RefreshCw,
  AlertCircle,
  Database,
  Layers,
  Wrench,
} from 'lucide-react';
import {
  CatalogService,
  ChatCatalogModel,
  isChatModel,
  formatPersianDigits,
  formatCurrencyLabel,
  formatPerTokens,
} from '../../lib/catalogApi';

export interface CatalogChatPricingSectionProps {
  /** The catalog chat service containing models and pricing */
  service?: CatalogService;
  /** Loading state from useCatalog() */
  loading?: boolean;
  /** Error state from useCatalog() */
  error?: Error | null;
  /** Callback to trigger fresh network fetch */
  onRetry?: () => void;
}

// Preferred provider ordering for known vendors
const PREFERRED_PROVIDER_ORDER = [
  'OpenAI',
  'Google',
  'xAI',
  'Anthropic',
  'MiniMax',
  'DeepSeek',
  'Alibaba',
  'Mistral',
  'Z.ai',
  'Xiaomi',
  'Moonshot AI',
  'Meta',
];

// Icons for Providers with safe fallback
const PROVIDER_ICONS: Record<string, React.ElementType> = {
  OpenAI: Zap,
  Google: Globe,
  xAI: Terminal,
  Anthropic: Box,
  MiniMax: Sparkles,
  Minimax: Sparkles,
  DeepSeek: Search,
  Alibaba: Cpu,
  Mistral: Wind,
  'Z.ai': Brain,
  Zai: Brain,
  Xiaomi: Cpu,
  'Moonshot AI': Sparkles,
  Meta: Box,
};

export const CatalogChatPricingSection: React.FC<CatalogChatPricingSectionProps> = ({
  service,
  loading = false,
  error = null,
  onRetry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeProvider, setActiveProvider] = useState<string>('all');
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  // Extract all valid chat models preserving backend catalog order
  const chatModels = useMemo<ChatCatalogModel[]>(() => {
    if (!service || !Array.isArray(service.models)) return [];
    return service.models.filter(isChatModel);
  }, [service]);

  // Determine standard perTokens across models (defaulting to 1,000,000 if not yet loaded)
  const commonPerTokens = useMemo(() => {
    if (chatModels.length === 0) return 1000000;
    const firstWithPerTokens = chatModels.find(m => m.pricing?.perTokens);
    return firstWithPerTokens?.pricing?.perTokens || 1000000;
  }, [chatModels]);

  // Dynamically derive unique providers from live models without dropping unknown ones
  const providers = useMemo(() => {
    const present = new Set<string>();
    chatModels.forEach(m => {
      if (m.provider && m.provider.trim()) {
        present.add(m.provider.trim());
      }
    });

    const ordered: string[] = [];

    // First insert providers in preferred order if present in live catalog
    for (const p of PREFERRED_PROVIDER_ORDER) {
      // Check case-insensitive match against present
      const match = Array.from(present).find(item => item.toLowerCase() === p.toLowerCase());
      if (match) {
        ordered.push(match);
        present.delete(match);
      }
    }

    // Append any unknown/new providers in stable alphabetical order
    const remaining = Array.from(present).sort((a, b) => a.localeCompare(b));
    return ['all', ...ordered, ...remaining];
  }, [chatModels]);

  // Combined filtering: provider filter AND search filter
  const filteredModels = useMemo<ChatCatalogModel[]>(() => {
    const term = searchTerm.trim().toLowerCase();

    return chatModels.filter(m => {
      // Provider matching
      const matchesProvider = activeProvider === 'all' || m.provider === activeProvider;
      if (!matchesProvider) return false;

      // Text search matching across name, provider, description, and capabilities
      if (!term) return true;

      const nameMatch = (m.name || '').toLowerCase().includes(term);
      const providerMatch = (m.provider || '').toLowerCase().includes(term);
      const descMatch = (m.description || '').toLowerCase().includes(term);

      // Capability keyword matching
      let capMatch = false;
      if (m.capabilities) {
        if (m.capabilities.reasoning && (term.includes('استدلال') || term.includes('reason'))) capMatch = true;
        if (m.capabilities.tools && (term.includes('ابزار') || term.includes('tool'))) capMatch = true;
        if (m.capabilities.webSearch && (term.includes('وب') || term.includes('search'))) capMatch = true;
      }

      return nameMatch || providerMatch || descMatch || capMatch;
    });
  }, [chatModels, activeProvider, searchTerm]);

  // Keep selected model valid when filtered list changes
  useEffect(() => {
    if (filteredModels.length === 0) return;

    if (selectedModelId && filteredModels.some(m => m.id === selectedModelId)) {
      return;
    }

    // Pick first non-legacy model or first available
    const firstNonLegacy = filteredModels.find(m => !m.legacy);
    setSelectedModelId(firstNonLegacy ? firstNonLegacy.id : filteredModels[0].id);
  }, [filteredModels, selectedModelId]);

  // Resolve currently active model object
  const selectedModel = useMemo<ChatCatalogModel | null>(() => {
    if (filteredModels.length === 0) return null;
    const found = filteredModels.find(m => m.id === selectedModelId);
    return found || filteredModels[0] || null;
  }, [filteredModels, selectedModelId]);

  // Sorted tiers for currently selected model
  const sortedTiers = useMemo(() => {
    if (!selectedModel?.pricing?.tiers || !Array.isArray(selectedModel.pricing.tiers)) {
      return [];
    }
    return [...selectedModel.pricing.tiers].sort((a, b) => a.minInputTokens - b.minInputTokens);
  }, [selectedModel]);

  const hasCachePricing = useMemo(() => {
    if (!selectedModel?.pricing) return false;
    return (
      (typeof selectedModel.pricing.cacheRead === 'number' && Number.isFinite(selectedModel.pricing.cacheRead)) ||
      (typeof selectedModel.pricing.cacheWrite === 'number' && Number.isFinite(selectedModel.pricing.cacheWrite))
    );
  }, [selectedModel]);

  return (
    <section className="py-16 border-b border-zinc-200 dark:border-white/5 last:border-0 relative">
      {/* Ambient Background Glow */}
      <motion.div
        animate={{ opacity: [0.03, 0.05, 0.03], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] blur-[120px] rounded-full pointer-events-none bg-luma-purple/10"
        aria-hidden="true"
      />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-6">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-[#121212] border border-zinc-200 dark:border-white/10 flex items-center justify-center text-luma-purple shadow-lg shrink-0">
              <MessageSquare size={28} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2 flex items-center gap-3">
                گفتگو با هوش مصنوعی
                {!loading && !error && chatModels.length > 0 && (
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-luma-purple/10 border border-luma-purple/20 text-luma-purple hidden sm:inline-block font-bold">
                    {formatPersianDigits(chatModels.length)} مدل
                  </span>
                )}
              </h2>
              <p className="text-zinc-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light">
                تعرفه‌ها بر اساس هر{' '}
                <span className="text-zinc-900 dark:text-white font-bold">
                  {formatPerTokens(commonPerTokens)}
                </span>{' '}
                محاسبه می‌شود.
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative group w-full md:w-80">
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-gray-500 group-focus-within:text-luma-purple transition-colors"
              size={18}
              aria-hidden="true"
            />
            <input
              type="text"
              aria-label="جستجو در مدل‌های گفتگو و هوش متنی"
              placeholder={`جستجو در بین ${formatPersianDigits(chatModels.length)} مدل...`}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-xl py-3 pr-12 pl-4 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple focus:border-luma-purple/50 outline-none transition-all shadow-inner"
            />
          </div>
        </header>

        {/* State 1: Error State */}
        {error && !loading && (
          <div className="w-full bg-white dark:bg-[#121212] border border-red-500/20 rounded-[28px] p-8 md:p-12 shadow-xl text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-6">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center mb-4">
              <AlertCircle size={28} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              دریافت تعرفه‌های به‌روز گفتگو با مشکل مواجه شد
            </h3>
            <p className="text-sm text-zinc-600 dark:text-gray-400 font-light max-w-md mb-6 leading-relaxed">
              ارتباط با سرویس کاتالوگ مدل‌های لوما برقرار نشد. سایر بخش‌های صفحه در دسترس هستند و می‌توانید دوباره تلاش کنید.
            </p>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple"
              >
                <RefreshCw size={16} aria-hidden="true" />
                تلاش مجدد
              </button>
            )}
          </div>
        )}

        {/* State 2: Loading Skeletons */}
        {loading && (
          <div className="space-y-6">
            {/* Filter Tabs Skeleton */}
            <div className="flex gap-2 max-w-2xl animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-9 w-24 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl shrink-0" />
              ))}
            </div>

            {/* Split Skeletons */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 h-[580px] bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] p-6 animate-pulse">
                <div className="h-10 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl mb-4" />
                <div className="space-y-3">
                  {[...Array(7)].map((_, idx) => (
                    <div key={idx} className="h-14 bg-zinc-100/70 dark:bg-zinc-800/30 rounded-xl" />
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 h-[580px] bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] p-6 animate-pulse">
                <div className="h-8 w-2/3 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl mb-4" />
                <div className="h-20 bg-zinc-100/70 dark:bg-zinc-800/30 rounded-xl mb-6" />
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="h-24 bg-zinc-100/60 dark:bg-zinc-800/20 rounded-xl" />
                  <div className="h-24 bg-zinc-100/60 dark:bg-zinc-800/20 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State 3: Missing Chat Service (valid response, but no models found) */}
        {!loading && !error && chatModels.length === 0 && (
          <div className="w-full bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] p-8 md:p-12 shadow-xl text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-6">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-500 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-4">
              <Info size={28} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              مدلی برای گفتگو در کاتالوگ یافت نشد
            </h3>
            <p className="text-sm text-zinc-500 dark:text-gray-400 font-light max-w-md leading-relaxed">
              کاتالوگ مدل‌های لوما در حال حاضر سرویس گفتگوی متنی را ارائه نداده است.
            </p>
          </div>
        )}

        {/* State 4: Normal Operational Chat Browser */}
        {!loading && !error && chatModels.length > 0 && (
          <div className="space-y-6">
            {/* Dynamic Provider Filter Tabs */}
            <div className="overflow-x-auto custom-scrollbar pb-2">
              <div className="flex gap-2 min-w-max" role="tablist" aria-label="فیلتر سازندگان مدل‌های گفتگو">
                {providers.map(p => {
                  const isActive = activeProvider === p;
                  const Icon = p !== 'all' ? PROVIDER_ICONS[p] || Cpu : MessageSquare;
                  const count =
                    p === 'all'
                      ? chatModels.length
                      : chatModels.filter(m => m.provider === p).length;

                  return (
                    <button
                      type="button"
                      role="tab"
                      key={p}
                      id={`provider-tab-${p}`}
                      aria-selected={isActive}
                      onClick={() => setActiveProvider(p)}
                      className={`
                        flex items-center gap-2 px-4 py-2 min-h-[38px] rounded-xl text-xs font-bold transition-all border cursor-pointer select-none
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple
                        ${
                          isActive
                            ? 'bg-luma-purple/10 text-luma-purple border-luma-purple/30 shadow-sm'
                            : 'bg-zinc-50 dark:bg-[#121212] text-zinc-600 dark:text-gray-400 border-zinc-200 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'
                        }
                      `}
                    >
                      <Icon size={14} className={isActive ? 'text-luma-purple' : 'text-zinc-400 dark:text-gray-500'} aria-hidden="true" />
                      <span>{p === 'all' ? 'همه سازندگان' : p}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                          isActive
                            ? 'bg-luma-purple/20 text-luma-purple'
                            : 'bg-zinc-200/60 dark:bg-white/5 text-zinc-500 dark:text-gray-500'
                        }`}
                      >
                        {formatPersianDigits(count)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Split Screen Layout: Left Table (7 cols) / Right Detail Panel (5 cols) */}
            <div
              role="tabpanel"
              id={`provider-panel-${activeProvider}`}
              aria-labelledby={`provider-tab-${activeProvider}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start focus-visible:outline-none"
            >
              {/* Left Box: Chat Models Table */}
              <div className="lg:col-span-7 h-auto lg:h-[640px] min-h-[440px] flex flex-col">
                <div className="w-full h-full flex flex-col bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-300 relative">
                  {/* Scrollable Table Area */}
                  <div className="flex-1 overflow-x-auto overflow-y-auto max-h-[480px] lg:max-h-none custom-scrollbar relative">
                    <table className="w-full text-right border-collapse table-fixed min-w-[360px]">
                      <caption className="sr-only">جدول تعرفه و هزینه‌های مدل‌های گفتگوی متنی لوما</caption>
                      <thead className="sticky top-0 bg-white dark:bg-[#121212] z-10 shadow-sm transition-colors duration-300">
                        <tr className="border-b border-zinc-200 dark:border-white/5 text-xs text-zinc-400 dark:text-gray-500 font-bold uppercase tracking-wider">
                          <th scope="col" className="py-4 px-4 sm:px-6 w-[42%]">
                            مدل
                          </th>
                          <th scope="col" className="py-4 px-3 sm:px-4 text-center w-[22%] hidden sm:table-cell">
                            سازنده
                          </th>
                          <th scope="col" className="py-4 px-3 sm:px-4 text-center w-[18%]">
                            ورودی
                          </th>
                          <th scope="col" className="py-4 px-4 sm:px-6 text-center w-[18%]">
                            خروجی
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200/50 dark:divide-white/5">
                        <AnimatePresence initial={false}>
                          {filteredModels.map((m, i) => {
                            const isSelected = selectedModel?.id === m.id;
                            const Icon = PROVIDER_ICONS[m.provider || ''] || MessageSquare;
                            const currencyLabel = formatCurrencyLabel(m.pricing?.currency);

                            return (
                              <motion.tr
                                key={m.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15, delay: Math.min(i * 0.015, 0.2) }}
                                onClick={() => setSelectedModelId(m.id)}
                                onKeyDown={e => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSelectedModelId(m.id);
                                  }
                                }}
                                tabIndex={0}
                                role="button"
                                aria-pressed={isSelected}
                                aria-label={`انتخاب مدل ${m.name}، سازنده ${m.provider}، نرخ ورودی ${formatPersianDigits(m.pricing?.input)} ${currencyLabel}، نرخ خروجی ${formatPersianDigits(m.pricing?.output)} ${currencyLabel}`}
                                className={`
                                  transition-all cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple focus-visible:ring-inset
                                  ${
                                    isSelected
                                      ? 'bg-zinc-100/90 dark:bg-white/[0.08] shadow-inner'
                                      : 'hover:bg-zinc-50 dark:hover:bg-white/[0.02]'
                                  }
                                `}
                              >
                                {/* Column 1: Model Name & Status */}
                                <td className="py-4 px-4 sm:px-6 align-middle">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                                        isSelected
                                          ? 'bg-luma-purple/10 text-luma-purple border-luma-purple/30'
                                          : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-gray-400 group-hover:text-zinc-900 dark:group-hover:text-white'
                                      }`}
                                      aria-hidden="true"
                                    >
                                      <Icon size={16} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                      <div className="flex items-center gap-2">
                                        <span
                                          className={`font-bold text-sm tracking-tight truncate ${
                                            isSelected
                                              ? 'text-zinc-950 dark:text-white font-extrabold'
                                              : 'text-zinc-800 dark:text-gray-200 group-hover:text-zinc-950 dark:group-hover:text-white'
                                          }`}
                                          dir="ltr"
                                        >
                                          {m.name}
                                        </span>
                                      </div>

                                      {/* Sub-row: Provider (mobile) & Legacy badge & Tiers indicator */}
                                      <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                                        <span className="text-[10px] text-zinc-500 dark:text-gray-500 sm:hidden" dir="ltr">
                                          {m.provider}
                                        </span>
                                        {m.legacy && (
                                          <span className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.2 bg-zinc-200/60 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700/50 rounded font-medium">
                                            <History size={9} aria-hidden="true" />
                                            قدیمی
                                          </span>
                                        )}
                                        {m.pricing?.tiers && m.pricing.tiers.length > 0 && (
                                          <span className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.2 bg-luma-purple/10 text-luma-purple border border-luma-purple/20 rounded font-medium">
                                            <Layers size={9} aria-hidden="true" />
                                            پلکانی
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                {/* Column 2: Provider (Desktop) */}
                                <td className="py-4 px-3 sm:px-4 text-center align-middle hidden sm:table-cell">
                                  <span
                                    className="text-xs text-zinc-600 dark:text-gray-400 font-medium bg-zinc-100 dark:bg-white/5 px-2 py-1 rounded-md max-w-[120px] truncate inline-block"
                                    title={m.provider}
                                    dir="ltr"
                                  >
                                    {m.provider}
                                  </span>
                                </td>

                                {/* Column 3: Input Price */}
                                <td className="py-4 px-3 sm:px-4 text-center align-middle">
                                  {typeof m.pricing?.input === 'number' && Number.isFinite(m.pricing.input) ? (
                                    <div className="flex items-baseline justify-center gap-1">
                                      <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                                        {formatPersianDigits(m.pricing.input)}
                                      </span>
                                      <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-medium">
                                        {currencyLabel}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-xs text-amber-500 font-bold">—</span>
                                  )}
                                </td>

                                {/* Column 4: Output Price */}
                                <td className="py-4 px-4 sm:px-6 text-center align-middle">
                                  {typeof m.pricing?.output === 'number' && Number.isFinite(m.pricing.output) ? (
                                    <div className="flex items-baseline justify-center gap-1">
                                      <span className="text-sm sm:text-base font-bold text-luma-purple">
                                        {formatPersianDigits(m.pricing.output)}
                                      </span>
                                      <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-medium">
                                        {currencyLabel}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-xs text-amber-500 font-bold">—</span>
                                  )}
                                </td>
                              </motion.tr>
                            );
                          })}
                        </AnimatePresence>
                      </tbody>
                    </table>

                    {/* Empty Filter / Search Result */}
                    {filteredModels.length === 0 && (
                      <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-3">
                          <Search size={24} className="text-zinc-400 dark:text-gray-500" aria-hidden="true" />
                        </div>
                        <span className="text-sm text-zinc-500 dark:text-gray-400 font-medium">
                          مدلی با این مشخصات یافت نشد
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Table Footer with Live Catalog Attribution */}
                  <div className="bg-zinc-50 dark:bg-[#0a0a0a] px-6 py-3 border-t border-zinc-200 dark:border-white/5 flex justify-between items-center text-[10px] text-zinc-400 dark:text-gray-500 font-mono shrink-0 rounded-b-[28px] transition-colors">
                    <span>
                      {searchTerm.trim() !== '' || activeProvider !== 'all'
                        ? `نتایج: ${formatPersianDigits(filteredModels.length)} از ${formatPersianDigits(chatModels.length)}`
                        : `تعداد مدل‌ها: ${formatPersianDigits(chatModels.length)}`}
                    </span>
                    <span className="font-sans font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                      تعرفه‌های زنده از کاتالوگ لوما
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Box: Interactive Chat Model Detail & Tiered Pricing Panel */}
              <div className="lg:col-span-5 h-auto lg:h-[640px] flex flex-col">
                <div className="w-full h-full flex flex-col bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-300">
                  {/* Top Header of Detail Panel */}
                  <div className="p-6 border-b border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-[#151515]/50 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-luma-purple" aria-hidden="true" />
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-gray-400">
                        مشخصات و تعرفه مدل گفتگو
                      </span>
                    </div>

                    {selectedModel && (
                      <span
                        className="text-xs font-bold text-zinc-500 dark:text-gray-400 px-2.5 py-1 rounded-lg bg-zinc-200/60 dark:bg-white/5 border border-zinc-200 dark:border-white/10 tracking-wide"
                        dir="ltr"
                      >
                        {selectedModel.provider}
                      </span>
                    )}
                  </div>

                  {/* Content Body of Selected Model */}
                  {selectedModel ? (
                    <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
                      {/* Model Identity & Status */}
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                          <h3
                            className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white tracking-tight"
                            dir="ltr"
                          >
                            {selectedModel.name}
                          </h3>

                          {selectedModel.legacy && (
                            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 bg-zinc-200/60 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700/50 rounded-full font-medium">
                              <History size={12} aria-hidden="true" />
                              مدل قدیمی (Legacy)
                            </span>
                          )}
                        </div>

                        {/* Model Description from API */}
                        <p className="text-sm text-zinc-600 dark:text-gray-300 font-light leading-relaxed break-words">
                          {selectedModel.description || 'مدل زبانی هوشمند برای پردازش و پاسخگویی به درخواست‌های متنی.'}
                        </p>
                      </div>

                      {/* Capabilities (reasoning, tools, webSearch - rendered only if true) */}
                      {selectedModel.capabilities && (
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-zinc-400 dark:text-gray-500 uppercase tracking-wide block">
                            قابلیت‌های پردازش
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {selectedModel.capabilities.reasoning && (
                              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-xl font-medium">
                                <Brain size={12} aria-hidden="true" />
                                استدلال منطقی (Reasoning)
                              </span>
                            )}
                            {selectedModel.capabilities.tools && (
                              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-xl font-medium">
                                <Wrench size={12} aria-hidden="true" />
                                فراخوانی ابزارها (Tools)
                              </span>
                            )}
                            {selectedModel.capabilities.webSearch && (
                              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-xl font-medium">
                                <Globe size={12} aria-hidden="true" />
                                جستجوی وب (Web Search)
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Base Token Rates Matrix */}
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-gray-500">
                          <span className="font-bold uppercase tracking-wide">نرخ پایه پردازش توکن</span>
                          <span className="font-medium">به ازای {formatPerTokens(selectedModel.pricing?.perTokens)}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {/* Input Token Rate */}
                          <div className="bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-2xl p-4">
                            <span className="text-xs text-zinc-500 dark:text-gray-400 font-medium block mb-1">
                              توکن ورودی (Input)
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                                {typeof selectedModel.pricing?.input === 'number'
                                  ? formatPersianDigits(selectedModel.pricing.input)
                                  : '—'}
                              </span>
                              <span className="text-xs font-bold text-zinc-500 dark:text-gray-400">
                                {formatCurrencyLabel(selectedModel.pricing?.currency)}
                              </span>
                            </div>
                          </div>

                          {/* Output Token Rate */}
                          <div className="bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-2xl p-4">
                            <span className="text-xs text-zinc-500 dark:text-gray-400 font-medium block mb-1">
                              توکن خروجی (Output)
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl sm:text-2xl font-black text-luma-purple">
                                {typeof selectedModel.pricing?.output === 'number'
                                  ? formatPersianDigits(selectedModel.pricing.output)
                                  : '—'}
                              </span>
                              <span className="text-xs font-bold text-luma-purple">
                                {formatCurrencyLabel(selectedModel.pricing?.currency)}
                              </span>
                            </div>
                          </div>

                          {/* Cache Read (if available) */}
                          {typeof selectedModel.pricing?.cacheRead === 'number' && Number.isFinite(selectedModel.pricing.cacheRead) && (
                            <div className="bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-2xl p-4">
                              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-gray-400 font-medium mb-1">
                                <Database size={12} className="text-emerald-500" aria-hidden="true" />
                                <span>خواندن کش (Cache Read)</span>
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg font-black text-zinc-900 dark:text-white">
                                  {formatPersianDigits(selectedModel.pricing.cacheRead)}
                                </span>
                                <span className="text-xs font-bold text-zinc-500 dark:text-gray-400">
                                  {formatCurrencyLabel(selectedModel.pricing?.currency)}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Cache Write (if available) */}
                          {typeof selectedModel.pricing?.cacheWrite === 'number' && Number.isFinite(selectedModel.pricing.cacheWrite) && (
                            <div className="bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-2xl p-4">
                              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-gray-400 font-medium mb-1">
                                <Database size={12} className="text-sky-500" aria-hidden="true" />
                                <span>نوشتن کش (Cache Write)</span>
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg font-black text-zinc-900 dark:text-white">
                                  {formatPersianDigits(selectedModel.pricing.cacheWrite)}
                                </span>
                                <span className="text-xs font-bold text-zinc-500 dark:text-gray-400">
                                  {formatCurrencyLabel(selectedModel.pricing?.currency)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Context Pricing Tiers (rendered clearly if model supports context tiers) */}
                      {sortedTiers.length > 0 && (
                        <div className="space-y-3 bg-zinc-50/70 dark:bg-[#0c0c0c] border border-zinc-200 dark:border-white/10 rounded-2xl p-4">
                          <div className="flex items-center gap-2 text-zinc-700 dark:text-gray-300">
                            <Layers size={14} className="text-luma-purple" aria-hidden="true" />
                            <span className="text-xs font-bold uppercase tracking-wider">
                              تعرفه پلکانی کانتکست (Context Tiers)
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-gray-400 font-light leading-relaxed">
                            در صورت افزایش طول متن ورودی از آستانه‌های مشخص، نرخ توکن‌ها به صورت خودکار مطابق جدول زیر تغییر می‌کند:
                          </p>

                          <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-right text-xs border-collapse">
                              <caption className="sr-only">جدول سطوح پلکانی توکن‌های ورودی</caption>
                              <thead>
                                <tr className="border-b border-zinc-200 dark:border-white/10 text-zinc-400 dark:text-gray-500 font-bold">
                                  <th scope="col" className="pb-2 pr-2">محدوده کانتکست</th>
                                  <th scope="col" className="pb-2 text-center">ورودی</th>
                                  <th scope="col" className="pb-2 text-center">خروجی</th>
                                  {hasCachePricing && (
                                    <>
                                      <th scope="col" className="pb-2 text-center">خواندن کش</th>
                                      <th scope="col" className="pb-2 text-center">نوشتن کش</th>
                                    </>
                                  )}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-200/40 dark:divide-white/5">
                                {/* Base Row */}
                                <tr>
                                  <td className="py-2.5 pr-2 font-medium text-zinc-600 dark:text-gray-300">
                                    پایه (تا قبل از {formatPersianDigits(sortedTiers[0].minInputTokens)} توکن)
                                  </td>
                                  <td className="py-2.5 text-center font-bold text-zinc-900 dark:text-white">
                                    {formatPersianDigits(selectedModel.pricing.input)}
                                  </td>
                                  <td className="py-2.5 text-center font-bold text-luma-purple">
                                    {formatPersianDigits(selectedModel.pricing.output)}
                                  </td>
                                  {hasCachePricing && (
                                    <>
                                      <td className="py-2.5 text-center text-zinc-600 dark:text-gray-400">
                                        {typeof selectedModel.pricing.cacheRead === 'number'
                                          ? formatPersianDigits(selectedModel.pricing.cacheRead)
                                          : '—'}
                                      </td>
                                      <td className="py-2.5 text-center text-zinc-600 dark:text-gray-400">
                                        {typeof selectedModel.pricing.cacheWrite === 'number'
                                          ? formatPersianDigits(selectedModel.pricing.cacheWrite)
                                          : '—'}
                                      </td>
                                    </>
                                  )}
                                </tr>

                                {/* Tier Rows */}
                                {sortedTiers.map((tier, idx) => (
                                  <tr key={idx} className="bg-luma-purple/[0.03]">
                                    <td className="py-2.5 pr-2 font-bold text-luma-purple">
                                      از {formatPersianDigits(tier.minInputTokens)} توکن به بالا
                                    </td>
                                    <td className="py-2.5 text-center font-bold text-zinc-900 dark:text-white">
                                      {formatPersianDigits(tier.input)}
                                    </td>
                                    <td className="py-2.5 text-center font-bold text-luma-purple">
                                      {formatPersianDigits(tier.output)}
                                    </td>
                                    {hasCachePricing && (
                                      <>
                                        <td className="py-2.5 text-center text-zinc-600 dark:text-gray-400">
                                          {typeof tier.cacheRead === 'number'
                                            ? formatPersianDigits(tier.cacheRead)
                                            : '—'}
                                        </td>
                                        <td className="py-2.5 text-center text-zinc-600 dark:text-gray-400">
                                          {typeof tier.cacheWrite === 'number'
                                            ? formatPersianDigits(tier.cacheWrite)
                                            : '—'}
                                        </td>
                                      </>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                      <span className="text-sm text-zinc-400">یک مدل را برای مشاهده مشخصات انتخاب کنید</span>
                    </div>
                  )}

                  {/* Panel Footer: Starting Processing Unit */}
                  {selectedModel && (
                    <div className="bg-zinc-50 dark:bg-[#080808] border-t border-zinc-200 dark:border-white/10 px-6 py-4 flex justify-between items-center shrink-0 transition-colors">
                      <div className="flex flex-col items-start">
                        <span className="text-xs text-zinc-400 dark:text-gray-500 font-bold uppercase tracking-wide">
                          واحد محاسبه نرخ
                        </span>
                        <span className="text-[11px] text-zinc-500 dark:text-gray-400 font-light">
                          توکن‌های ورودی و خروجی
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-medium text-zinc-400 dark:text-gray-500">هر</span>
                        <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none">
                          {formatPerTokens(selectedModel.pricing?.perTokens)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
