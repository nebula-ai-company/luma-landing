import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, Sparkles, Star, Award, History, Info, Check } from 'lucide-react';
import {
  MediaCatalogModel,
  formatPersianDigits,
  formatCurrencyLabel,
} from '../../lib/catalogApi';
import { getThemeClasses } from './pricingConfig';

export interface CatalogMediaPricingBrowserProps {
  /** Array of media models to display */
  models: MediaCatalogModel[];
  /** Tailwind text color class, e.g. "text-luma-pink" or "text-luma-purple" */
  color: string;
  /** Section or service title used in accessible labels and captions */
  title?: string;
  /** Controlled selected model ID */
  selectedModelId?: string | null;
  /** Callback when a model is selected */
  onSelectModelId?: (modelId: string) => void;
  /** Controlled search term */
  searchTerm?: string;
  /** Callback when search term changes */
  onSearchTermChange?: (term: string) => void;
  /** Optional custom message when search returns 0 results */
  emptyMessage?: string;
}

/**
 * Determine the initial selected model based on the requirement priority:
 * 1. recommended === true && legacy === false
 * 2. featured === true && legacy === false
 * 3. first non-legacy model
 * 4. first model
 */
export function pickDefaultModel(models: MediaCatalogModel[]): MediaCatalogModel | null {
  if (models.length === 0) return null;

  const recommendedNonLegacy = models.find(m => m.recommended && !m.legacy);
  if (recommendedNonLegacy) return recommendedNonLegacy;

  const featuredNonLegacy = models.find(m => m.featured && !m.legacy);
  if (featuredNonLegacy) return featuredNonLegacy;

  const firstNonLegacy = models.find(m => !m.legacy);
  if (firstNonLegacy) return firstNonLegacy;

  return models[0];
}

export const CatalogMediaPricingBrowser: React.FC<CatalogMediaPricingBrowserProps> = ({
  models,
  color,
  title = 'سرویس',
  selectedModelId: externalSelectedModelId,
  onSelectModelId,
  searchTerm: externalSearchTerm,
  onSearchTermChange,
  emptyMessage,
}) => {
  // Support both controlled and uncontrolled search term
  const [internalSearchTerm, setInternalSearchTerm] = useState('');
  const isSearchControlled = externalSearchTerm !== undefined;
  const currentSearchTerm = isSearchControlled ? externalSearchTerm : internalSearchTerm;

  const handleSearchChange = (term: string) => {
    if (!isSearchControlled) {
      setInternalSearchTerm(term);
    }
    onSearchTermChange?.(term);
  };

  // Support both controlled and uncontrolled selected model ID
  const [internalSelectedModelId, setInternalSelectedModelId] = useState<string | null>(null);
  const isSelectedControlled = externalSelectedModelId !== undefined;
  const currentSelectedModelId = isSelectedControlled
    ? externalSelectedModelId
    : internalSelectedModelId;

  const handleSelectModel = (modelId: string) => {
    if (!isSelectedControlled) {
      setInternalSelectedModelId(modelId);
    }
    onSelectModelId?.(modelId);
  };

  const theme = getThemeClasses(color);
  const shouldReduceMotion = useReducedMotion();

  // Search filtering across name, provider, description, capabilities, and tags
  const filteredModels = useMemo<MediaCatalogModel[]>(() => {
    const term = currentSearchTerm.trim().toLowerCase();
    if (!term) return models;

    return models.filter(model => {
      const nameMatch = (model.name || '').toLowerCase().includes(term);
      const providerMatch = (model.provider || '').toLowerCase().includes(term);
      const descMatch = (model.description || '').toLowerCase().includes(term);
      const capMatch = Array.isArray(model.capabilities)
        ? model.capabilities.some(c => (c || '').toLowerCase().includes(term))
        : false;
      const tagMatch = Array.isArray(model.tags)
        ? model.tags.some(t => (t || '').toLowerCase().includes(term))
        : false;

      return nameMatch || providerMatch || descMatch || capMatch || tagMatch;
    });
  }, [models, currentSearchTerm]);

  // Synchronize default selected model safely
  useEffect(() => {
    if (filteredModels.length === 0) return;

    // If currently selected model is still in the filtered view, keep it
    if (currentSelectedModelId && filteredModels.some(m => m.id === currentSelectedModelId)) {
      return;
    }

    // Otherwise pick the best default candidate from the visible list
    const candidate = pickDefaultModel(filteredModels);
    if (candidate) {
      handleSelectModel(candidate.id);
    }
  }, [filteredModels, currentSelectedModelId]);

  // Resolve currently active selected model object
  const selectedModel = useMemo<MediaCatalogModel | null>(() => {
    if (filteredModels.length === 0) return null;
    const found = filteredModels.find(m => m.id === currentSelectedModelId);
    return found || filteredModels[0] || null;
  }, [filteredModels, currentSelectedModelId]);

  // Adjust height cleanly for compact services (e.g. 1-3 models like speech_to_text) to avoid blank space
  const isCompactService = models.length <= 3;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Table Box (7 cols desktop) */}
      <div className={`lg:col-span-7 h-auto ${isCompactService ? 'lg:h-[390px] min-h-[300px]' : 'lg:h-[600px] min-h-[420px]'} flex flex-col`}>
        <div className="w-full h-full flex flex-col bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] shadow-xl dark:shadow-2xl transition-colors duration-300 relative overflow-hidden">
          {/* Fixed Search Header */}
          <div className="p-4 border-b border-zinc-200 dark:border-white/5 bg-white dark:bg-[#121212] transition-colors duration-300 relative z-20 shrink-0">
            <div className="relative group">
              <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-gray-500 group-focus-within:text-zinc-700 dark:group-focus-within:text-white transition-colors"
                size={18}
                aria-hidden="true"
              />
              <input
                type="text"
                aria-label={`جستجو در مدل‌های ${title}`}
                placeholder={`جستجو در بین ${formatPersianDigits(models.length)} مدل...`}
                value={currentSearchTerm}
                onChange={e => handleSearchChange(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl py-3 pr-12 pl-4 text-sm text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple focus:border-zinc-300 dark:focus:border-white/20 focus:bg-zinc-100 dark:focus:bg-[#151515] transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Scrollable Table Area */}
          <div className="flex-1 overflow-x-auto overflow-y-auto max-h-[460px] lg:max-h-none custom-scrollbar relative">
            {/* Subtle Top Gradient Line */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${theme.via} to-transparent opacity-50 z-10 pointer-events-none`}
              aria-hidden="true"
            />

            <table className="w-full text-right border-collapse table-fixed min-w-[340px]">
              <caption className="sr-only">جدول تعرفه و مدل‌های {title}</caption>
              <thead className="sticky top-0 bg-white dark:bg-[#121212] z-10 shadow-sm transition-colors duration-300">
                <tr className="border-b border-zinc-200 dark:border-white/5">
                  <th
                    scope="col"
                    className="py-4 px-4 sm:px-6 text-xs text-zinc-400 dark:text-gray-500 font-bold uppercase tracking-wider w-[48%]"
                  >
                    مدل
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-3 sm:px-4 text-xs text-zinc-400 dark:text-gray-500 font-bold uppercase tracking-wider w-[24%]"
                  >
                    سازنده
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-4 sm:px-6 text-xs text-zinc-400 dark:text-gray-500 font-bold uppercase tracking-wider text-center w-[28%]"
                  >
                    شروع قیمت
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/50 dark:divide-white/5">
                <AnimatePresence initial={false}>
                  {filteredModels.map((model, i) => {
                    const isSelected = selectedModel?.id === model.id;
                    const minPrice = model.pricing?.minimum;

                    return (
                      <motion.tr
                        key={model.id}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.15,
                          delay: shouldReduceMotion ? 0 : Math.min(i * 0.015, 0.2),
                        }}
                        onClick={() => handleSelectModel(model.id)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSelectModel(model.id);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isSelected}
                        aria-label={`انتخاب مدل ${model.name}، سازنده ${model.provider}، شروع قیمت از ${formatPersianDigits(minPrice)} ${formatCurrencyLabel(model.pricing?.currency)}`}
                        className={`
                          transition-all cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple focus-visible:ring-inset
                          ${
                            isSelected
                              ? 'bg-zinc-100/90 dark:bg-white/[0.08] shadow-inner'
                              : 'hover:bg-zinc-50 dark:hover:bg-white/[0.02]'
                          }
                        `}
                      >
                        {/* Column 1: Model Name & Status Badges */}
                        <td className="py-4 px-4 sm:px-6 align-middle">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-bold text-sm tracking-tight transition-colors ${
                                  isSelected
                                    ? 'text-zinc-950 dark:text-white font-extrabold'
                                    : 'text-zinc-800 dark:text-gray-200 group-hover:text-zinc-950 dark:group-hover:text-white'
                                }`}
                                dir="ltr"
                              >
                                {model.name}
                              </span>
                            </div>

                            {/* Status badges row with defined priority */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                              {model.recommended && !model.legacy && (
                                <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded font-bold">
                                  <Star size={10} aria-hidden="true" />
                                  پیشنهادی
                                </span>
                              )}
                              {model.isNew && !model.legacy && (
                                <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.2 bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 rounded font-bold">
                                  <Sparkles size={10} aria-hidden="true" />
                                  جدید
                                </span>
                              )}
                              {model.featured && !model.legacy && !model.recommended && (
                                <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.2 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded font-bold">
                                  <Award size={10} aria-hidden="true" />
                                  ویژه
                                </span>
                              )}
                              {model.legacy && (
                                <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.2 bg-zinc-200/60 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700/50 rounded font-medium">
                                  <History size={10} aria-hidden="true" />
                                  قدیمی
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Column 2: Provider */}
                        <td className="py-4 px-3 sm:px-4 align-middle">
                          <span
                            className="text-xs text-zinc-600 dark:text-gray-400 font-medium tracking-wide block truncate max-w-[130px]"
                            title={model.provider}
                            dir="ltr"
                          >
                            {model.provider}
                          </span>
                        </td>

                        {/* Column 3: Starting Price */}
                        <td className="py-4 px-4 sm:px-6 text-center align-middle">
                          {typeof minPrice === 'number' && Number.isFinite(minPrice) ? (
                            <div className="flex items-baseline justify-center gap-1">
                              <span className="text-xs text-zinc-400 dark:text-gray-500 font-medium">از</span>
                              <span className={`text-base sm:text-lg font-black ${color} drop-shadow-sm`}>
                                {formatPersianDigits(minPrice)}
                              </span>
                              <span className="text-xs text-zinc-500 dark:text-gray-400 font-medium">
                                {formatCurrencyLabel(model.pricing?.currency)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs font-bold text-amber-500 dark:text-amber-400">
                              تعرفه نامشخص
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>

            {/* Empty Search Result */}
            {filteredModels.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-3">
                  <Search size={24} className="text-gray-500" aria-hidden="true" />
                </div>
                <span className="text-sm text-zinc-500 dark:text-gray-400 font-medium">
                  {emptyMessage || 'مدلی با این مشخصات یافت نشد'}
                </span>
              </div>
            )}
          </div>

          {/* Footer Bar with Live Catalog Attribution */}
          <div className="bg-zinc-50 dark:bg-[#0a0a0a] px-6 py-3 border-t border-zinc-200 dark:border-white/5 flex justify-between items-center text-[10px] text-zinc-400 dark:text-gray-500 font-mono shrink-0 rounded-b-[28px] transition-colors">
            <span>
              {currentSearchTerm.trim() !== ''
                ? `نتایج: ${formatPersianDigits(filteredModels.length)} از ${formatPersianDigits(models.length)}`
                : `تعداد مدل‌ها: ${formatPersianDigits(models.length)}`}
            </span>
            <span className="font-sans font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              تعرفه‌های زنده از کاتالوگ لوما
            </span>
          </div>
        </div>
      </div>

      {/* Right: Interactive Model Information & Pricing Detail Panel (5 cols desktop) */}
      <div className={`lg:col-span-5 h-auto ${isCompactService ? 'lg:h-[390px]' : 'lg:h-[600px]'} flex flex-col`}>
        <div className="w-full h-full flex flex-col bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-300">
          {/* Top Header of Detail Panel */}
          <div className="p-6 border-b border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-[#151515]/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${theme.bg}`} aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-gray-400">
                مشخصات و جزئیات تعرفه مدل
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
                  <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white tracking-tight" dir="ltr">
                    {selectedModel.name}
                  </h3>

                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {selectedModel.recommended && !selectedModel.legacy && (
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full font-bold">
                        <Star size={12} aria-hidden="true" />
                        پیشنهادی
                      </span>
                    )}
                    {selectedModel.isNew && !selectedModel.legacy && (
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 rounded-full font-bold">
                        <Sparkles size={12} aria-hidden="true" />
                        جدید
                      </span>
                    )}
                    {selectedModel.featured && !selectedModel.legacy && !selectedModel.recommended && (
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-full font-bold">
                        <Award size={12} aria-hidden="true" />
                        ویژه
                      </span>
                    )}
                    {selectedModel.legacy && (
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 bg-zinc-200/60 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700/50 rounded-full font-medium">
                        <History size={12} aria-hidden="true" />
                        مدل قدیمی (Legacy)
                      </span>
                    )}
                  </div>
                </div>

                {/* Authoritative Model Description from API */}
                <p className="text-sm text-zinc-600 dark:text-gray-300 font-light leading-relaxed break-words">
                  {selectedModel.description || 'توضیحات اختصاصی برای این مدل ثبت نشده است.'}
                </p>
              </div>

              {/* Capabilities (if available from API) */}
              {Array.isArray(selectedModel.capabilities) && selectedModel.capabilities.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-zinc-400 dark:text-gray-500 uppercase tracking-wide block">
                    قابلیت‌های مدل
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedModel.capabilities.map((cap, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-800 dark:text-gray-200 font-medium"
                      >
                        <Check size={12} className={color} aria-hidden="true" />
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Detail Card */}
              <div className="mt-auto bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-zinc-400 dark:text-gray-500">
                  <Info size={14} aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider">نحوه محاسبه تعرفه</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-gray-300 font-light leading-relaxed break-words whitespace-pre-line">
                  {selectedModel.pricing?.description || 'بر اساس کیفیت، نوع کاربری و پارامترهای اجرایی مدل.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <span className="text-sm text-zinc-400">یک مدل را برای مشاهده مشخصات انتخاب کنید</span>
            </div>
          )}

          {/* Footer: Prominent Starting Price */}
          {selectedModel && (
            <div className="bg-zinc-50 dark:bg-[#080808] border-t border-zinc-200 dark:border-white/10 px-6 py-4 flex justify-between items-center shrink-0 transition-colors">
              <div className="flex flex-col items-start">
                <span className="text-xs text-zinc-400 dark:text-gray-500 font-bold uppercase tracking-wide">
                  پایه هزینه پردازش
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-gray-400 font-light">
                  شروع تعرفه از حداقل
                </span>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-medium text-zinc-400 dark:text-gray-500">از</span>
                <span className="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none">
                  {typeof selectedModel.pricing?.minimum === 'number' && Number.isFinite(selectedModel.pricing.minimum)
                    ? formatPersianDigits(selectedModel.pricing.minimum)
                    : '—'}
                </span>
                <span className={`${color} text-sm font-bold`}>
                  {formatCurrencyLabel(selectedModel.pricing?.currency)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
