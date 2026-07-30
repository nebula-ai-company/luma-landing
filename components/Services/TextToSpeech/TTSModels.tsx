import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap, Sparkles, CheckCircle2, AlertCircle, Cpu, Radio, ShieldCheck, FileText } from 'lucide-react';

interface ModelInfo {
  id: string;
  name: string;
  maxChars: string;
  strengths: string[];
  bestFor: string;
  tags: string[];
  badge?: string;
  accentColor: string;
}

const TTS_MODELS: ModelInfo[] = [
  {
    id: 'gemini-31-flash',
    name: 'Gemini 3.1 Flash TTS',
    maxChars: '۵۰,۰۰۰ کاراکتر',
    strengths: [
      'تولید سریع',
      'پشتیبانی فارسی',
      'گویندگی چندزبانه',
      'هدایت سبک با زبان طبیعی',
      'مجموعه صدای آماده',
    ],
    bestFor: 'نریشن عمومی، محتوای چندزبانه، تحویل کنترل‌شده',
    tags: ['ظرفیت بالا', 'سرعت بالا', 'گفتار هوشمند'],
    badge: 'پیش‌فرض',
    accentColor: '#FFC700',
  },
  {
    id: 'elevenlabs-v3',
    name: 'ElevenLabs Eleven v3',
    maxChars: '۵,۰۰۰ کاراکتر',
    strengths: [
      'بیان طبیعی و احساسی',
      'بازه دینامیکی بالا',
      'خروجی چندزبانه',
      'کنترل پایداری صدا',
      'نرمال‌سازی متن',
    ],
    bestFor: 'تبلیغات، داستان‌گویی، نریشن نمایشی، محتوای احساسی',
    tags: ['احساسی', 'روایی', 'دینامیک بالا'],
    accentColor: '#EC4899',
  },
  {
    id: 'minimax-28-turbo',
    name: 'MiniMax Speech 2.8 Turbo',
    maxChars: '۱۰,۰۰۰ کاراکتر',
    strengths: [
      'تعادل سرعت، طبیعی‌بودن و هزینه',
      'کنترل سرعت',
      'کنترل بلندی صدا',
      'کنترل زیر و بمی',
      'کنترل احساس',
      'فرمت صوتی',
    ],
    bestFor: 'پیش‌نمایش، تولید حجمی، فرآیندهای حساس به سرعت',
    tags: ['مقرون‌به‌صرفه', 'تولید انبوه', 'کنترل پارامتریک'],
    accentColor: '#10B981',
  },
  {
    id: 'minimax-28-hd',
    name: 'MiniMax Speech 2.8 HD',
    maxChars: '۱۰,۰۰۰ کاراکتر',
    strengths: [
      'شفافیت بالاتر',
      'خروجی نهایی حرفه‌ای',
      'کنترل کامل تنظیمات صوتی',
      'کیفیت استودیویی',
    ],
    bestFor: 'پادکست، نریشن نهایی ویدیو، آموزش آنلاین، محتوای حرفه‌ای',
    tags: ['کیفیت HD', 'استودیویی', 'شفافیت بالا'],
    accentColor: '#A855F7',
  },
];

export const TTSModels: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="models" className="py-20 lg:py-28 bg-white dark:bg-[#07070a] text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-800 dark:text-gray-200 text-xs font-bold">
            <Cpu size={14} className="text-luma-yellow" />
            <span>مدل‌های هوش مصنوعی</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
            مدل‌های قدرتمند تولید گفتار
          </h2>

          <p className="text-zinc-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed font-light">
            بسته‌به نوع پروژه، میزان طبیعی‌بودن، حجم متن و سبک روایت، مدل هوش مصنوعی مناسب خود را انتخاب کنید.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-medium mt-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>تنظیمات، صداها، محدودیت متن و هزینه در هر مدل متفاوت است.</span>
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TTS_MODELS.map((model, idx) => (
            <motion.div
              key={model.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-3xl bg-zinc-50 dark:bg-[#0f0f16] border border-black/5 dark:border-white/10 p-6 flex flex-col justify-between hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              {/* Top Card Badge & Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-mono font-medium text-zinc-700 dark:text-gray-300">
                    <FileText size={12} className="text-zinc-400" />
                    {model.maxChars}
                  </span>

                  {model.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-luma-yellow text-zinc-950 text-[10px] font-bold">
                      {model.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 group-hover:text-luma-yellow transition-colors">
                  {model.name}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-200/60 dark:bg-white/5 text-zinc-600 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Strengths */}
                <div className="space-y-2 mb-6 border-t border-black/5 dark:border-white/10 pt-4">
                  <div className="text-xs font-bold text-zinc-700 dark:text-gray-300 mb-2">نقاط قوت کلیدی:</div>
                  {model.strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-gray-400 leading-normal">
                      <CheckCircle2 size={14} className="text-luma-yellow shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best For (Footer of Card) */}
              <div className="pt-4 border-t border-black/5 dark:border-white/10">
                <div className="text-[11px] font-bold text-zinc-500 dark:text-gray-400 mb-1">مناسب برای:</div>
                <div className="text-xs font-medium text-zinc-800 dark:text-gray-200 leading-snug">
                  {model.bestFor}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
