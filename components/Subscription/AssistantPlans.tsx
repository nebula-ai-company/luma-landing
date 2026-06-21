import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Bot, Sparkles, Zap, Shield, FileText, Cpu } from 'lucide-react';
import { ASSISTANT_PLANS, AssistantPlan } from './SubscriptionData';
import Button from '../Button';

const toPersianNum = (num: number | string) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

export const AssistantPlans: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePositions, setMousePositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions(prev => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
  };

  return (
    <section className="py-24 bg-[#FBF9F6] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300" dir="rtl">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, -40, 40, 0], y: [0, 30, -30, 0], scale: [1, 0.95, 1.05, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-yellow-250/20 dark:bg-yellow-950/10 rounded-full blur-[130px]"
        />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-200/85 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/10 backdrop-blur-md shadow-sm"
          >
            <Bot size={14} className="text-luma-yellow" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">پلن‌های مربی و دستیار پیام‌رسان (AI Agent)</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6"
          >
            دستیارهای شخصی و <span className="text-gradient-animated bg-gradient-to-r from-[#DA8FFF] via-[#FF6482] to-[#FFB340] text-transparent bg-clip-text">هوشمند</span> لوما
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-zinc-650 dark:text-zinc-400 font-light max-w-2xl mx-auto"
          >
            ربات‌ها و عامل‌های اختصاصی خود را بسازید. آموزش عامل صوتی و پشتیبان متنی بر اساس داده‌ها و فایل‌های بارگذاری شده شما.
          </motion.p>
        </div>

        {/* 4-Column Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {ASSISTANT_PLANS.map((plan, idx) => {
            const isPro = plan.recommended; // Plus represents recommended here
            const cardId = plan.id;
            const mousePos = mousePositions[cardId] || { x: 0, y: 0 };

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={(e) => handleMouseMove(cardId, e)}
                className={`relative group rounded-[32px] transition-all duration-300 h-full flex flex-col ${isPro ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                {/* Yellow Pro Glow Effect */}
                {isPro && (
                  <div className="absolute inset-0 bg-luma-yellow/20 dark:bg-yellow-950/20 blur-3xl -z-10 rounded-[40px] opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
                )}

                <div className={`
                  relative h-full flex-1 flex flex-col p-6 lg:p-8 rounded-[32px] border backdrop-blur-xl transition-all duration-300 overflow-hidden
                  ${isPro 
                    ? 'bg-amber-50/20 text-zinc-900 dark:bg-[#181611]/90 dark:text-white border-luma-yellow/30 shadow-xl shadow-luma-yellow/5' 
                    : 'bg-white dark:bg-[#121212]/90 border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 shadow-sm dark:shadow-none'
                  }
                `}>
                  
                  {/* Hover spotlight ring */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${isPro ? 'rgba(255, 179, 64, 0.12)' : 'rgba(255, 179, 64, 0.06)'}, transparent 45%)` }} 
                  />

                  {/* Top card header */}
                  <div className="relative z-10 flex justify-between items-center mb-6">
                    <span className={`text-base font-black ${isPro ? 'text-luma-yellow' : 'text-zinc-800 dark:text-zinc-250'}`}>
                      {plan.name}
                    </span>
                    
                    {isPro && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-luma-yellow/15 text-[#f59e0b] text-[10px] font-black border border-luma-yellow/30">
                        <Crown size={10} /> محبوب‌ترین
                      </span>
                    )}
                  </div>

                  {/* Pricing Info */}
                  <div className="relative z-10 mb-6 flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {plan.unit}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-zinc-200/60 dark:bg-white/5 mb-6 relative z-10" />

                  {/* Feature lists */}
                  <ul className="space-y-4 mb-8 flex-1 relative z-10">
                    
                    {/* Message Limitation */}
                    <li className="flex items-start gap-3 text-xs leading-relaxed">
                      <Zap size={14} className="text-luma-yellow shrink-0 mt-0.5" />
                      <div>
                        <div className="text-zinc-400 dark:text-zinc-500 text-[10px]">حداکثر سهمیه گفتگو</div>
                        <div className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{plan.messages}</div>
                      </div>
                    </li>

                    {/* File Limits */}
                    <li className="flex items-start gap-3 text-xs leading-relaxed">
                      <FileText size={14} className="text-luma-yellow shrink-0 mt-0.5" />
                      <div>
                        <div className="text-zinc-400 dark:text-zinc-500 text-[10px]">فایل حافظه ابری پشتیبانی</div>
                        <div className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{plan.files}</div>
                      </div>
                    </li>

                    {/* Models Allowed */}
                    <li className="flex items-start gap-3 text-xs leading-relaxed">
                      <Cpu size={14} className="text-luma-yellow shrink-0 mt-0.5" />
                      <div>
                        <div className="text-zinc-400 dark:text-zinc-500 text-[10px]">تعداد مدل‌های پردازشی</div>
                        <div className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{plan.models}</div>
                      </div>
                    </li>

                    {/* Status badge or checkmark */}
                    <li className="flex items-start gap-3 text-xs leading-relaxed">
                      <Shield size={14} className="text-emerald-550 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-zinc-400 dark:text-zinc-500 text-[10px]">امنیت حریم خصوصی</div>
                        <div className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">رمزنگاری سرتاسری و حفاظت داده</div>
                      </div>
                    </li>

                  </ul>

                  {/* Button Call to Action */}
                  <div className="relative z-10 w-full mt-auto">
                    <Button 
                      variant={isPro ? "primary" : "secondary"} 
                      externalHref="https://dash.lumai.ir/"
                      className="w-full text-center py-3 justify-center text-xs"
                    >
                      {plan.id === 'free' ? 'شروع رایگان دستیار' : plan.id === 'enterprise' ? 'هماهنگی و خرید' : 'تست و راه‌اندازی عامل'}
                    </Button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
