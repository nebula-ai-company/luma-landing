import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Sliders, Mic, Globe2, Gauge, Volume2, Activity, Smile, 
  ShieldAlert, Sparkles, FileAudio, Check, Info
} from 'lucide-react';

export const TTSCapabilities: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'speed' | 'pitch' | 'emotion'>('speed');

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#07070a] text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-800 dark:text-gray-200 text-xs font-bold">
            <Sliders size={14} className="text-luma-yellow" />
            <span>تنظیمات و ابزارها</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
            کنترل دقیق بر تمام ابعاد گفتار
          </h2>

          <p className="text-zinc-600 dark:text-gray-400 text-base sm:text-lg font-light">
            لحن، سرعت، احساس و نحوه بیان صدای تولیدشده را براساس نیاز پروژه خود سفارشی کنید.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-600 dark:text-gray-300 text-xs">
            <Info size={14} className="text-luma-yellow shrink-0" />
            <span>هر مدل مجموعه تنظیمات مخصوص خود را دارد.</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Ready Voices (Large 2-col) */}
          <div className="md:col-span-2 rounded-3xl bg-zinc-50 dark:bg-[#0e0e16] border border-black/5 dark:border-white/10 p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-luma-yellow/15 text-zinc-950 dark:text-luma-yellow flex items-center justify-center mb-4">
                <Mic size={20} />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2">
                انتخاب صدای آماده
              </h3>
              <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed mb-6 font-light">
                دسترسی به مجموعه متنوعی از گویندگان زن و مرد با لحن‌های روایی، رسمی، تبلیغاتی و پادکستی.
              </p>
            </div>

            {/* Interactive Preview List */}
            <div className="grid grid-cols-2 gap-2 bg-white dark:bg-[#151522] p-3 rounded-2xl border border-black/5 dark:border-white/10">
              {['آرش (گوینده رسمی)', 'مریم (لحن روایی)', 'سینا (تیزر تبلیغاتی)', 'مینا (مستند آموزشی)'].map((voice, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-gray-300 p-2 rounded-xl bg-zinc-50 dark:bg-black/40">
                  <div className="w-2 h-2 rounded-full bg-luma-yellow" />
                  <span className="truncate">{voice}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Multilingual Support */}
          <div className="rounded-3xl bg-zinc-50 dark:bg-[#0e0e16] border border-black/5 dark:border-white/10 p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <Globe2 size={20} />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2">
                تعیین زبان
              </h3>
              <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed font-light">
                پشتیبانی کامل از زبان فارسی و ده‌ها زبان زنده دنیا با تلفظ دقیق و طبیعی.
              </p>
            </div>
            <div className="pt-4 flex flex-wrap gap-1.5">
              {['فارسی', 'English', 'العربية', 'Français'].map((lang) => (
                <span key={lang} className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-gray-300">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Expression & Emotion */}
          <div className="rounded-3xl bg-zinc-50 dark:bg-[#0e0e16] border border-black/5 dark:border-white/10 p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-pink-500/15 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4">
                <Smile size={20} />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2">
                سبک بیان و احساس
              </h3>
              <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed font-light">
                تنظیم حس گوینده از لحن رسمی و بیطرفانه تا هیجانی و داستانی.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs text-zinc-500 border-t border-black/5 dark:border-white/10">
              <span>احساسات:</span>
              <span className="font-bold text-pink-500">طبیعی / هیجانی / روایی</span>
            </div>
          </div>

          {/* Card 4: Speed Control */}
          <div className="rounded-3xl bg-zinc-50 dark:bg-[#0e0e16] border border-black/5 dark:border-white/10 p-7 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Gauge size={20} />
            </div>
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
              سرعت گفتار
            </h3>
            <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed font-light">
              تنظیم سرعت خوانش از 0.5x تا 2.0x متناسب با ریتم ویدیو و محتوا.
            </p>
            <div className="w-full bg-white dark:bg-black/40 p-3 rounded-2xl border border-black/5 dark:border-white/10 space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>0.5x</span>
                <span className="font-bold text-emerald-500">1.0x (پیش‌فرض)</span>
                <span>2.0x</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full relative">
                <div className="h-full w-1/2 bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* Card 5: Pitch & Volume */}
          <div className="rounded-3xl bg-zinc-50 dark:bg-[#0e0e16] border border-black/5 dark:border-white/10 p-7 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Activity size={20} />
            </div>
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
              بلندی و زیر و بمی
            </h3>
            <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed font-light">
              کنترل فرکانس و بم/زیر بودن صدا جهت هماهنگی با فرکانس‌های صوتی.
            </p>
            {/* Pitch Wave Visual */}
            <div className="h-8 flex items-center justify-center gap-1 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/10 px-2">
              {[0.3, 0.6, 0.9, 0.4, 0.7, 1.0, 0.5, 0.8].map((val, idx) => (
                <div key={idx} className="w-1 bg-blue-500 rounded-full" style={{ height: `${val * 100}%` }} />
              ))}
            </div>
          </div>

          {/* Card 6: Voice Stability & Normalization */}
          <div className="rounded-3xl bg-zinc-50 dark:bg-[#0e0e16] border border-black/5 dark:border-white/10 p-7 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShieldAlert size={20} />
            </div>
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
              پایداری و نرمال‌سازی
            </h3>
            <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed font-light">
              یکنواخت‌سازی اعداد، اختصارات و حفظ ثبات صدای گوینده در طول فایل.
            </p>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              ✓ تبدیل خودکار اعداد و علائم نگارشی
            </div>
          </div>

          {/* Card 7: Audio Format Selection */}
          <div className="rounded-3xl bg-zinc-50 dark:bg-[#0e0e16] border border-black/5 dark:border-white/10 p-7 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-luma-yellow/15 text-zinc-950 dark:text-luma-yellow flex items-center justify-center">
              <FileAudio size={20} />
            </div>
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
              انتخاب فرمت صوتی
            </h3>
            <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed font-light">
              دریافت خروجی با فرمت‌های MP3 (کم‌حجم)، WAV (کیفیت استودیویی) یا AAC.
            </p>
            <div className="flex gap-2">
              {['MP3', 'WAV', 'AAC'].map((fmt) => (
                <span key={fmt} className="px-3 py-1 rounded-lg bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 text-xs font-mono font-bold text-zinc-800 dark:text-gray-200">
                  {fmt}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
