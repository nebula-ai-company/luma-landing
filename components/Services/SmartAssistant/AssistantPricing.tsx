
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap } from 'lucide-react';
import Button from '../../Button';

const PLANS = [
  {
    name: "رایگان",
    price: "0",
    unit: "رایگان",
    features: [
      { name: "50 پیام/ماه", included: true },
      { name: "3 فایل دانش (3MB)", included: true },
      { name: "سینک دستی سایت", included: true },
      { name: "حذف برند لوما", included: false },
      { name: "بلاگ ساز خودکار", included: false },
    ],
    cta: "شروع کنید",
    highlight: false
  },
  {
    name: "پلاس",
    price: "5,000",
    unit: "لوم",
    features: [
      { name: "2,000 پیام/ماه", included: true },
      { name: "10 فایل دانش (15MB)", included: true },
      { name: "سینک خودکار ماهانه", included: true },
      { name: "گزارش‌گیری متوسط", included: true },
      { name: "1 مقاله بلاگ/ماه", included: true },
    ],
    cta: "خرید پلاس",
    highlight: false
  },
  {
    name: "حرفه‌ای",
    price: "25,000",
    unit: "لوم",
    features: [
      { name: "30,000 پیام/ماه", included: true },
      { name: "50 فایل دانش (250MB)", included: true },
      { name: "سینک خودکار هفتگی", included: true },
      { name: "حذف برند (White-label)", included: true },
      { name: "4 مقاله بلاگ/ماه", included: true },
    ],
    cta: "انتخاب حرفه‌ای‌ها",
    highlight: true
  },
  {
    name: "سازمانی",
    price: "توافقی",
    unit: "تماس بگیرید",
    features: [
      { name: "پیام نامحدود", included: true },
      { name: "دانش نامحدود", included: true },
      { name: "سینک آنی (On-demand)", included: true },
      { name: "API اختصاصی", included: true },
      { name: "بلاگ نامحدود", included: true },
    ],
    cta: "تماس با ما",
    highlight: false
  },
];

export const AssistantPricing: React.FC = () => {
  return (
    <section className="py-24 bg-[#080808] border-y border-white/5">
       <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-white mb-4">بسته‌های اشتراک</h2>
             <p className="text-gray-400">پرداخت‌ها از طریق اعتبار "لوم" انجام می‌شود. تمدید خودکار در دسترس است.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {PLANS.map((plan, idx) => (
                <motion.div
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className={`relative p-6 rounded-2xl border flex flex-col ${
                      plan.highlight 
                        ? 'bg-[#151515] border-luma-yellow/50 shadow-[0_0_30px_-10px_rgba(255,179,64,0.2)] transform lg:-translate-y-4' 
                        : 'bg-[#0a0a0a] border-white/10'
                   }`}
                >
                   {plan.highlight && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-luma-yellow text-black text-[10px] font-bold px-3 py-1 rounded-full">
                         پیشنهاد ویژه
                      </div>
                   )}

                   <h3 className={`text-lg font-bold mb-2 ${plan.highlight ? 'text-luma-yellow' : 'text-white'}`}>{plan.name}</h3>
                   <div className="mb-6 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">{plan.price}</span>
                      <span className="text-xs text-gray-500">{plan.unit}</span>
                   </div>

                   <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feat, i) => (
                         <li key={i} className="flex items-start gap-2 text-xs">
                            {feat.included ? (
                               <Check size={14} className="text-green-500 shrink-0 mt-0.5" />
                            ) : (
                               <X size={14} className="text-gray-700 shrink-0 mt-0.5" />
                            )}
                            <span className={feat.included ? 'text-gray-300' : 'text-gray-700'}>{feat.name}</span>
                         </li>
                      ))}
                   </ul>

                   <Button 
                      externalHref="https://lumai.ir/dashboard" 
                      variant={plan.highlight ? 'primary' : 'secondary'} 
                      className={`w-full py-3 text-sm ${plan.highlight ? 'bg-luma-yellow text-black hover:bg-amber-400 border-none' : ''}`}
                   >
                      {plan.cta}
                   </Button>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
};
