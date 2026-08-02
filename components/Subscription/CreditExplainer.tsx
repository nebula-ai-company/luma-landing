import React from 'react';
import { motion } from 'framer-motion';
import { CREDIT_FACTS } from './SubscriptionData';

const VatAnimation: React.FC = () => {
  return (
    <div className="w-full h-44 relative flex items-center justify-center mb-6 overflow-hidden rounded-[20px] bg-indigo-50/30 dark:bg-zinc-900/40 border border-indigo-100/30 dark:border-white-50/5">
      {/* Background grid canvas */}
      <div 
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.14]"
        style={{
          backgroundImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, currentColor 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
      
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#DA8FFF] opacity-[0.08] dark:opacity-[0.12] blur-[40px]" />

      {/* Decorative design indicators */}
      <div className="absolute top-3 left-4 font-sans text-[9px] text-[#DA8FFF] opacity-80">
        [ مرجع سیستم // مالیات ]
      </div>
      <div className="absolute top-3 right-4 font-sans text-[9px] opacity-60">
        سیستم_مالیاتی_۰۱
      </div>

      <svg viewBox="0 0 200 120" className="w-40 h-28 text-indigo-500 dark:text-[#DA8FFF] relative z-10">
        {/* Hovering Receipt Document with spring levitation */}
        <motion.g
          animate={{
            y: [0, -6, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Main receipt body */}
          <path
            d="M 60 10 L 140 10 L 140 100 L 132 95 L 124 100 L 116 95 L 108 100 L 100 95 L 92 100 L 84 95 L 76 100 L 68 95 L 60 100 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
            className="stroke-zinc-400 dark:stroke-zinc-600 opacity-90"
          />

          {/* Simulated content text tracks on receipt */}
          <motion.line
            x1="70" y1="28" x2="115" y2="28"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
            className="opacity-40"
          />
          <motion.line
            x1="70" y1="40" x2="130" y2="40"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round"
            className="opacity-30"
          />
          <motion.line
            x1="70" y1="52" x2="110" y2="52"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
            className="opacity-40"
          />
          <motion.line
            x1="70" y1="64" x2="125" y2="64"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round"
            className="opacity-30"
          />

          {/* Secure watermark seal */}
          <circle cx="120" cy="74" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-40" />

          {/* Scanning laser beam sweep */}
          <motion.g
            animate={{
              y: [15, 80, 15]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <line x1="56" y1="10" x2="144" y2="10" stroke="#FF6482" strokeWidth="1" strokeLinecap="round" className="opacity-85" />
            <line x1="62" y1="10" x2="138" y2="10" stroke="#DA8FFF" strokeWidth="2.5" strokeLinecap="round" className="opacity-40 blur-[1.5px]" />
          </motion.g>
        </motion.g>

        {/* Dynamic VAT %10 Stamp rotating with orbital spring */}
        <motion.g
          animate={{
            scale: [0.94, 1.08, 0.94],
            y: [-3, 3, -3],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Stamp ring backdrop */}
          <circle cx="135" cy="45" r="22" className="fill-white dark:fill-[#121212] stroke-[#FF6482]" strokeWidth="1.5" />
          <circle cx="135" cy="45" r="18" fill="none" className="stroke-[#FF6482]/40" strokeWidth="0.5" strokeDasharray="1 3" />
          <text x="135" y="50" textAnchor="middle" className="fill-[#FF6482] font-sans text-[10px] font-extrabold">%۱۰</text>
        </motion.g>
      </svg>
    </div>
  );
};

const GiftAnimation: React.FC = () => {
  return (
    <div className="w-full h-44 relative flex items-center justify-center mb-6 overflow-hidden rounded-[20px] bg-rose-50/30 dark:bg-zinc-900/40 border border-rose-100/30 dark:border-white-50/5">
      {/* Background sparkling dot matrix */}
      <div 
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #FF6482 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      
      {/* Soft warm ambient color flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#FF6482] opacity-[0.07] dark:opacity-[0.11] blur-[42px]" />

      <div className="absolute top-3 left-4 font-sans text-[9px] text-[#FF6482] opacity-80">
        [ سامانه_هدایا ]
      </div>
      <div className="absolute top-3 right-4 font-sans text-[9px] opacity-60">
        سیستم_پاداش
      </div>

      <svg viewBox="0 0 200 120" className="w-40 h-28 text-rose-500 dark:text-[#FF6482] relative z-10">
        {/* Levinated reward star that floats out from the box */}
        <motion.g
          animate={{
            y: [50, -12, 10, -15, 50],
            x: [100, 88, 112, 95, 100],
            scale: [0, 1.15, 0.9, 1.25, 0],
            opacity: [0, 1, 0.9, 1, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Star/Crown golden reward shape */}
          <polygon points="100,10 103,18 112,18 105,23 108,31 100,26 92,31 95,23 88,18 97,18" fill="#FFB340" />
          <circle cx="100" cy="20" r="10" fill="none" stroke="#FFB340" strokeWidth="0.5" className="opacity-50 animate-ping" />
        </motion.g>

        {/* Gift Box Base */}
        <motion.g
          animate={{
            scaleY: [1, 0.94, 1.05, 1],
            skewX: [0, -1, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Main chest body */}
          <rect
            x="76" y="62" width="48" height="38" rx="4"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            className="stroke-zinc-400 dark:stroke-zinc-600 bg-white"
          />
          {/* Gift ribbon band */}
          <rect x="96" y="62" width="8" height="38" className="fill-current" />
        </motion.g>

        {/* Dynamic floating lid popping open and hovering */}
        <motion.g
          animate={{
            y: [0, -10, -4, -12, 0],
            rotate: [0, -6, 4, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Box lid structure */}
          <rect
            x="72" y="52" width="56" height="11" rx="2"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            className="stroke-zinc-400 dark:stroke-zinc-600 bg-[#121212]"
          />
          {/* Large dynamic loop bow ribbon */}
          <path d="M 100 52 Q 90 32, 85 52 Q 100 32, 115 52" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </motion.g>

        {/* Radiant ascending particle streams */}
        <motion.circle cx="70" cy="45" r="1.5" fill="#FFB340" animate={{ y: [0, -25], opacity: [0, 1, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }} />
        <motion.circle cx="130" cy="42" r="1.2" fill="#DA8FFF" animate={{ y: [0, -28], opacity: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.3 }} />
        <motion.circle cx="85" cy="35" r="1" fill="#FF6482" animate={{ y: [0, -20], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }} />
        <motion.circle cx="115" cy="38" r="1.5" fill="#FFB340" animate={{ y: [0, -22], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.9 }} />
      </svg>
    </div>
  );
};

const ReferralAnimation: React.FC = () => {
  return (
    <div className="w-full h-44 relative flex items-center justify-center mb-6 overflow-hidden rounded-[20px] bg-purple-50/30 dark:bg-zinc-900/40 border border-purple-100/30 dark:border-white-50/5">
      {/* Network background grid and alignments */}
      <div 
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
        style={{
          backgroundImage: 'linear-gradient(45deg, currentColor 1px, transparent 1px), linear-gradient(-45deg, currentColor 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Ambient background soft orb glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#DA8FFF] opacity-[0.08] dark:opacity-[0.13] blur-[42px]" />

      <div className="absolute top-3 left-4 font-sans text-[9px] text-[#DA8FFF] opacity-80">
        [ لینک_معرفی_همتا ]
      </div>
      <div className="absolute top-3 right-4 font-sans text-[9px] opacity-60">
        حلقه_دعوت
      </div>

      <svg viewBox="0 0 200 120" className="w-40 h-28 text-purple-500 dark:text-[#DA8FFF] relative z-10">
        {/* User Node 1 (Sender) */}
        <motion.g
          animate={{
            scale: [1, 1.04, 0.98, 1],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Ring halo indicator around node */}
          <circle cx="50" cy="65" r="24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" className="opacity-40" />
          {/* Main User Container Badge */}
          <circle cx="50" cy="65" r="18" fill="none" stroke="currentColor" strokeWidth="1.2" className="stroke-zinc-400 dark:stroke-zinc-650" />
          
          {/* Inside stylized user avatar icon */}
          <circle cx="50" cy="59" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 40 76 C 40 70, 60 70, 60 76" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </motion.g>

        {/* User Node 2 (Receiver) */}
        <motion.g
          animate={{
            scale: [0.98, 1, 1.04, 0.98],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          {/* Ring halo */}
          <circle cx="150" cy="45" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" className="opacity-40" />
          {/* Main receiver outline */}
          <circle cx="150" cy="45" r="15" fill="none" stroke="currentColor" strokeWidth="1.2" className="stroke-zinc-400 dark:stroke-zinc-650" />
          
          {/* Inside user representation */}
          <circle cx="150" cy="40" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 142 54 C 142 49, 158 49, 158 54" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </motion.g>

        {/* High-fidelity connectivity curve */}
        <path
          d="M 68 60 Q 100 35, 134 43"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="4 4"
          className="opacity-50"
        />

        {/* Dynamic network energy pulse traversing along path */}
        <motion.circle
          r="3"
          className="fill-[#FFB340]"
          animate={{
            cx: [68, 100, 134],
            cy: [60, 41, 43],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Interactive floating reward tag */}
        <motion.g
          animate={{
            y: [5, -4, 5],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="85" y="68" width="30" height="15" rx="3" fill="#FF6482" className="stroke-none" />
          <text x="100" y="79" textAnchor="middle" className="fill-white font-sans text-[9.5px] font-extrabold">+۲۵٪</text>
        </motion.g>
      </svg>
    </div>
  );
};

const PaymentAnimation: React.FC = () => {
  return (
    <div className="w-full h-44 relative flex items-center justify-center mb-6 overflow-hidden rounded-[20px] bg-teal-50/30 dark:bg-zinc-900/40 border border-teal-100/30 dark:border-white-50/5">
      {/* Background cyber scans overlays */}
      <div 
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #14b8a6 1px, transparent 1px)',
          backgroundSize: '15px 15px',
        }}
      />
      
      {/* Concentric cybernetic scanning graphics in the background bg */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]" style={{ backgroundImage: 'repeating-radial-gradient(circle, currentColor 0, currentColor 1px, transparent 1px, transparent 15px)' }} />

      {/* Cyber ambient color wave */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-teal-400 opacity-[0.06] dark:opacity-[0.11] blur-[42px]" />

      <div className="absolute top-3 left-4 font-sans text-[9px] text-teal-400 opacity-80">
        [ تایید_تراکنش ]
      </div>
      <div className="absolute top-3 right-4 font-sans text-[9px] opacity-60">
        درگاه_امن
      </div>

      <svg viewBox="0 0 200 120" className="w-40 h-28 text-teal-500 dark:text-cyan-400 relative z-10">
        {/* Holographic Security Perimeter Ring */}
        <rect x="42" y="15" width="116" height="90" rx="8" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" className="opacity-30" />

        {/* Glowing floating hardware Credit Card in perspective transform */}
        <motion.g
          animate={{
            y: [-3, 3, -3],
            rotateY: [-8, 8, -8],
            rotateX: [4, -4, 4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: '100px 60px' }}
        >
          {/* Holographic outer reflections glow */}
          <rect
            x="48" y="24" width="104" height="66" rx="6"
            fill="none" stroke="currentColor" strokeWidth="1.2"
            className="stroke-zinc-400 dark:stroke-zinc-600 bg-white"
          />

          {/* Card magnetic track strip details */}
          <line x1="48" y1="38" x2="152" y2="38" stroke="currentColor" strokeWidth="5" className="stroke-zinc-700 opacity-90" />

          {/* Microprocessor secure chip */}
          <rect x="60" y="52" width="16" height="12" rx="2" fill="#FFB340" className="stroke-none" />
          
          {/* High-Tech Network lines on card */}
          <line x1="84" y1="56" x2="114" y2="56" stroke="currentColor" strokeWidth="1" className="opacity-30" />
          <line x1="84" y1="64" x2="134" y2="64" stroke="currentColor" strokeWidth="1.2" className="opacity-40" />

          {/* Refraction sheen reflecting */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.g>

        {/* Security Approved Shield Floating down safely to lock card */}
        <motion.g
          animate={{
            scale: [0.94, 1.06, 0.94],
            y: [-2, 2, -2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M 140 70 L 152 64 L 164 70 L 164 82 C 164 92, 152 98, 152 98 C 152 98, 140 92, 140 82 Z" fill="#22c55e" className="stroke-none" />
          {/* Draw safety checkmark symbol */}
          <motion.path
            d="M 146 79 L 150 83 L 158 75"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Sweeping technical laser scan */}
        <motion.g
          animate={{
            y: [5, 85, 5],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <line x1="40" y1="20" x2="160" y2="20" stroke="#FF6482" strokeWidth="1" strokeLinecap="round" className="opacity-80" />
          <line x1="50" y1="20" x2="150" y2="20" stroke="#DA8FFF" strokeWidth="2" strokeLinecap="round" className="opacity-50 blur-[1px]" />
        </motion.g>
      </svg>
    </div>
  );
};

export const CreditExplainer: React.FC = () => {
  const items = [
    {
      animation: VatAnimation,
      title: "مالیات ارزش افزوده",
      text: CREDIT_FACTS.vat,
    },
    {
      animation: GiftAnimation,
      title: "هدیه خوش‌آمدگویی",
      text: CREDIT_FACTS.signupGift,
    },
    {
      animation: ReferralAnimation,
      title: "معرفی دوستان (Referral)",
      text: CREDIT_FACTS.referral,
    },
    {
      animation: PaymentAnimation,
      title: "درگاه پرداخت رسمی",
      text: `پرداخت مطمئن و سریع از طریق درگاه ${CREDIT_FACTS.gateway}`,
    }
  ];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden" dir="rtl">
      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        
        {/* Bordered top header divider or band */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white mb-4">
            دانستنی‌های مهم شارژ و مصرف اعتبار در لوما
          </h3>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light">
            چنانچه فاقد اشتراک فعال هستید یا مایل به شارژ مازاد هستید، محاسبات مالی بر اساس مفاد شفاف زیر انجام می‌پذیرد.
          </p>
        </div>
 
        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const AnimationComp = item.animation;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="relative group p-6 rounded-[24px] bg-white dark:bg-[#121212]/80 border border-zinc-200/50 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                {/* Double-Bezel Highlight */}
                <div className="absolute inset-0 rounded-[24px] ring-1 ring-black/[0.04] dark:ring-white/[0.04] pointer-events-none" />
 
                <div>
                  {/* Motion Graphics Loop Animation Unit */}
                  <AnimationComp />
                  
                  {/* Title */}
                  <h4 className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200 mb-2">
                    {item.title}
                  </h4>
                </div>
 
                {/* Text Description */}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light mt-1">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
 
      </div>
    </section>
  );
};


