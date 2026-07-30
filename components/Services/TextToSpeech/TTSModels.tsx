import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Sparkles, Zap, Radio, Crown } from 'lucide-react';
import { TTSHoverCard } from './TTSHoverCard';

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  accent: 'yellow' | 'purple' | 'pink';
  description: string;
  maxChars: string;
  ratePer4Chars: string;
  supportedLangs: string;
  features: string[];
  isRecommended?: boolean;
}

const MODELS_DATA: ModelInfo[] = [
  {
    id: 'gemini-flash',
    name: 'Gemini 3.1 Flash TTS',
    provider: 'Google AI',
    accent: 'yellow',
    isRecommended: true,
    description: 'بهترین انتخاب برای متون طولانی، مقاله‌ها و کتاب‌های صوتی با سرعت بالا و هزینه اقتصادی.',
    maxChars: '۵۰,۰۰۰ کاراکتر',
    ratePer4Chars: '۱ LUM',
    supportedLangs: 'فارسی، انگلیسی، عربی و ۵۰+ زبان',
    features: [
      'پردازش متون فوق‌طولانی تا ۵۰ هزار کاراکتر',
      'سرعت پاسخ‌دهی بسیار بالا (زیر ۱ ثانیه)',
      'بهترین نسبت قیمت به کارایی',
      'حفظ لحن یکنواخت در رندرینگ طولانی',
    ],
  },
  {
    id: 'eleven-v3',
    name: 'ElevenLabs Eleven v3',
    provider: 'ElevenLabs',
    accent: 'purple',
    description: 'مدل برتر جهانی برای طبیعی‌ترین لحن احساسی، پادکست‌های حرفه‌ای و تولید محتوای فاخر.',
    maxChars: '۵,۰۰۰ کاراکتر',
    ratePer4Chars: '۳ LUM',
    supportedLangs: 'چندزبانه پیشرفته (Multilingual v3)',
    features: [
      'طبیعی‌ترین فراز و فرود صوتی و کنترل احساسات',
      'مناسب پادکست، تیزرهای ویدئویی و دوبله',
      'پشتیبانی از تکیه‌کلام‌ها و نشانه‌های لحنی',
      'بالاترین کیفیت خروجی استودیویی',
    ],
  },
  {
    id: 'minimax-speech',
    name: 'MiniMax Speech 2.8',
    provider: 'MiniMax AI (Turbo & HD)',
    accent: 'pink',
    description: 'مدل قدرتمند دو نسخه‌ای (Turbo / HD) ویژه خروجی استودیویی با کیفیت بی‌نظیر.',
    maxChars: '۱۰,۰۰۰ کاراکتر',
    ratePer4Chars: '۲ LUM (HD: ۴ LUM)',
    supportedLangs: 'فارسی، انگلیسی، چینی و چندزبانه',
    features: [
      'ارائه دو نسخه Turbo (سریع) و HD (کیفیت استودیو)',
      'خروجی با فرمت‌های WAV و MP3 بدون فشرده‌سازی',
      'تولید لحن گفتاری روان برای گفتگوی زنده',
      'وضوح بالا در واژگان تخصصی و انگلیسی',
    ],
  },
];

export const TTSModels: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="models" className="py-20 lg:py-28 bg-white dark:bg-[#07070a] text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold">
            <Radio size={14} className="text-luma-purple" />
            <span>مدل‌های هوش مصنوعی گفتار</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            انتخاب مدل متناسب با نیاز شما
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            لوما از برترین مدل‌های بین‌المللی تبدیل متن به گفتار پشتیبانی می‌کند تا برای هر سناریو بهترین خروجی را دریافت کنید.
          </p>
        </div>

        {/* Models Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MODELS_DATA.map((model, idx) => (
            <motion.div
              key={model.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full flex flex-col"
            >
              <TTSHoverCard accentColor={model.accent} className="h-full">
                <div className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-6">
                  
                  {/* Card Header & Badge */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-gray-300 font-medium">
                        {model.provider}
                      </span>
                      {model.isRecommended && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-luma-yellow/20 text-zinc-950 dark:text-luma-yellow text-[11px] font-bold">
                          <Crown size={12} className="text-luma-yellow" />
                          <span>پیشنهاد ویژه</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                      {model.name}
                    </h3>

                    <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed font-light">
                      {model.description}
                    </p>
                  </div>

                  {/* Model Specs Specs */}
                  <div className="space-y-3 py-4 border-y border-black/5 dark:border-white/10 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 dark:text-gray-400">حداکثر طول متن:</span>
                      <span className="font-bold font-mono text-zinc-900 dark:text-white">{model.maxChars}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 dark:text-gray-400">نرخ مصرف (به‌ازای ۴ کاراکتر):</span>
                      <span className="font-bold text-luma-yellow font-mono">{model.ratePer4Chars}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 dark:text-gray-400">پشتیبانی زبان:</span>
                      <span className="font-medium text-zinc-800 dark:text-gray-200 text-left dir-ltr truncate max-w-[150px]">
                        {model.supportedLangs}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 flex-1">
                    <div className="text-[11px] font-bold text-zinc-500 dark:text-gray-400">ویژگی‌های کلیدی:</div>
                    <ul className="space-y-2 text-xs text-zinc-700 dark:text-gray-300">
                      {model.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="mt-0.5 w-4 h-4 rounded-full bg-luma-yellow/15 flex items-center justify-center shrink-0">
                            <Check size={10} className="text-luma-yellow stroke-[3]" />
                          </span>
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card CTA */}
                  <div className="pt-2">
                    <a
                      href="https://dash.lumai.ir/service/text-to-speech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-gray-100 font-bold text-xs transition-colors"
                    >
                      <span>استفاده از مدل</span>
                      <Sparkles size={14} />
                    </a>
                  </div>

                </div>
              </TTSHoverCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
