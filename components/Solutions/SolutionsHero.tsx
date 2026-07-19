import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkle, Buildings, ChartLineUp, ShieldCheck } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Button from '../Button';

const MotionDiv = motion.div;

export const SolutionsHero: React.FC = () => {
  return (
    <div className="relative min-h-[90dvh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-zinc-50 dark:bg-[#080808] transition-colors duration-300">
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)]">
        <MotionDiv
          animate={{
            x: [-50, 100, -50],
            y: [-30, 30, -30],
            opacity: [0.08, 0.15, 0.08],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-luma-purple blur-[120px]"
        />
        <MotionDiv
          animate={{
            x: [50, -100, 50],
            y: [30, -30, 30],
            opacity: [0.06, 0.12, 0.06],
            scale: [1.15, 1, 1.15],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-luma-pink blur-[120px]"
        />
        {/* Subtle grid layout overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Micro eyebrow tag */}
        <MotionDiv
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-black text-luma-pink mb-8"
        >
          <Buildings size={12} weight="bold" />
          <span>پلتفرم سازمانی لوما</span>
        </MotionDiv>

        {/* Cinematic Headline - limited to 2-3 lines max */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-black text-zinc-950 dark:text-white leading-relaxed md:leading-relaxed mb-8 font-sans">
            زیرساخت هوش مصنوعی مولد
            <span className="block mt-4 md:mt-6 text-transparent bg-clip-text bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow">
              برای مقیاس‌پذیری و رشد کسب‌وکار شما
            </span>
          </h1>
        </MotionDiv>

        {/* Business focused copy (no tool bragging) */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            کاهش چشمگیر هزینه‌های آتلیه‌ای، افزایش نرخ کلیک مشتریان، و خودکارسازی جریان‌های کاری پیچیدهٔ خلاق به کمک APIهای با کارایی بالا و راه‌حل‌های وایت‌لیبل سفارشی لوما.
          </p>
        </MotionDiv>

        {/* Button-in-Button CTA design and secondary service catalog route */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Primary CTA (Consultation) */}
          <Button
            href="/contact?type=consultation"
            variant="primary"
            className="px-6 py-3 text-sm shadow-lg shadow-luma-purple/20 hover:shadow-luma-purple/40"
          >
            <span>دریافت مشاوره سازمانی و دمو</span>
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>

          {/* Secondary CTA (Link to full catalog on /services) */}
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 font-bold text-sm"
          >
            <span>مشاهده کاتالوگ ابزارها و مدل‌ها</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </MotionDiv>

        {/* Dynamic features strip highlighting core business pillars */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto border-t border-zinc-200/50 dark:border-white/5 pt-12 text-right"
        >
          {[
            { icon: Sparkle, text: 'سفارشی‌سازی بر اساس هویت برند' },
            { icon: ChartLineUp, text: 'کاهش ۹۰٪ هزینه‌های استودیویی' },
            { icon: ShieldCheck, text: 'امنیت داده‌های در سطح بانکی' },
            { icon: Buildings, text: 'زیرساخت پرسرعت و ابری پایدار' }
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3">
              <span className="p-2 rounded-xl bg-luma-pink/10 text-luma-pink shrink-0">
                <item.icon size={18} weight="duotone" />
              </span>
              <span className="text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200 pt-1.5">
                {item.text}
              </span>
            </div>
          ))}
        </MotionDiv>
      </div>
    </div>
  );
};
