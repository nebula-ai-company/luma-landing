
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Twitter, Instagram, Send, 
  ArrowUpRight, Mail, MapPin, Phone
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../lib/ThemeContext';
import { getPreloadHandlers } from '../lib/routePreload';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: shouldReduceMotion ? 1 : 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/Luma_ai_co", label: "X" },
    { icon: Send, href: "https://t.me/Luma_AI_Community", label: "Telegram" },
    { icon: Instagram, href: "https://www.instagram.com/luma.ai.official/", label: "Instagram" },
  ];

  const footerSections = [
    {
      title: "محصولات",
      links: [
        { label: "ساخت تصویر", href: "/service/img-gen" },
        { label: "ویرایش تصویر", href: "/service/img-edit" },
        { label: "حذف پس‌زمینه", href: "/service/bg-remove" },
        { label: "دستیار هوشمند", href: "/service/assistant" },
        { label: "ساخت ویدیو", href: "/service/video" },
        { label: "افزایش کیفیت ویدئو", href: "/service/video-enhancement", badge: "جدید" },
        { label: "تبدیل متن به گفتار", href: "/service/text-to-speech" },
        { label: "افزایش کیفیت تصویر", href: "/service/upscale" },
        { label: "پوشاندن لباس", href: "/service/try-on" },
        { label: "چت هوشمند", href: "/service/chat" },
        { label: "ورک‌فلوها", href: "/service/workflow" },
      ]
    },
    {
      title: "دسترسی سریع",
      links: [
        { label: "گالری آثار", href: "/gallery" },
        { label: "راهکارهای سازمانی", href: "/solutions" },
        { label: "تعرفه‌ها", href: "/pricing" },
        { label: "پلن‌های اشتراک", href: "/subscription" },
        { label: "درباره ما", href: "/about" },
        { label: "تماس با ما", href: "/contact" },
      ]
    },
    {
      title: "قوانین و امنیت",
      links: [
        { label: "حقوق و تعهدات کاربر", href: "/privacy" },
        { label: "شرایط استفاده از سرویس لـــوما", href: "/terms" },
        { label: "امنیت شما در لوما", href: "/security" },
      ]
    },
    {
      title: "منابع و پشتیبانی",
      links: [
        { label: "وبلاگ", href: "/blog" },
        { label: "مرکز آموزش", href: "/tutorials" },
        { label: "مستندات فنی", href: "/docs" },
        { label: "ورود به پنل", href: "https://dash.lumai.ir/", external: true },
        { label: "شروع رایگان", href: "https://dash.lumai.ir/", external: true },
      ]
    }
  ];

  const LinkItem = ({ link }: { link: { label: string, href: string, external?: boolean, badge?: string } }) => {
    const content = (
        <>
            {link.label}
            {link.badge && (
                <span className="px-1.5 py-0.5 rounded-full bg-luma-purple/10 border border-luma-purple/20 text-[9px] text-luma-purple font-bold mr-2">
                    {link.badge}
                </span>
            )}
            {link.external && <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 dark:text-gray-400 mr-1" />}
        </>
    );

    if (link.external) {
       return (
         <a href={link.href} className="text-zinc-500 dark:text-gray-500 hover:text-zinc-950 dark:hover:text-white transition-colors text-sm flex items-center group">
            {content}
         </a>
       );
    }
    
    if (link.href.startsWith('/#')) {
        return (
            <a href={link.href} {...getPreloadHandlers(link.href)} className="text-zinc-500 dark:text-gray-500 hover:text-luma-purple transition-colors text-sm flex items-center">
               {content}
            </a>
        );
    }

    return (
        <Link to={link.href} {...getPreloadHandlers(link.href)} className="text-zinc-500 dark:text-gray-500 hover:text-luma-pink transition-colors text-sm flex items-center">
           {content}
        </Link>
    );
  };

  return (
    <footer className="relative bg-[#FAFAFA] dark:bg-black border-t border-black/5 dark:border-white/5 pt-20 pb-10 overflow-hidden font-sans transition-colors duration-300">
        {/* Minimal Background Gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-luma-purple/5 blur-[120px] pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20"
            >
                {/* Brand Column with Enhanced Contact Details */}
                <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col items-start gap-6">
                    <Link to="/" className="flex items-center gap-2 group mb-2">
                        <img src="https://lumai.ir/logo-en.svg" alt="Luma AI" className="h-8 w-auto opacity-90 dark:invert dark:brightness-0 dark:opacity-90 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-zinc-600 dark:text-gray-400 text-sm leading-7 font-light max-w-xs text-justify lg:text-right">
                        پیشگام در ارائه ابزارهای خلاقیت مبتنی بر هوش مصنوعی. 
                        ما مرزهای تخیل را با تکنولوژی ادغام می‌کنیم تا آینده‌ای روشن‌تر بسازیم.
                    </p>

                    {/* Contact Details Group */}
                    <div className="flex flex-col gap-5 pt-4 mt-2 border-t border-black/5 dark:border-white/5 w-full">
                        {/* Central Office */}
                        <div className="space-y-2">
                            <div className="flex items-start gap-3 text-zinc-600 dark:text-gray-400">
                                <MapPin size={16} className="mt-1 text-luma-purple shrink-0" />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[11px] font-bold text-zinc-950 dark:text-white/80">دفتر مرکزی:</span>
                                    <span className="text-xs leading-relaxed font-light">خیابان سهروردی شمالی، خیابان کوشش، پلاک 35، واحد 7</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-600 dark:text-gray-400">
                                <Phone size={16} className="text-luma-purple shrink-0" />
                                <a href="tel:02188511051" className="text-xs hover:text-luma-pink dark:hover:text-white transition-colors dir-ltr font-mono tracking-wide">021-88511051</a>
                            </div>
                        </div>

                        {/* Tech Office */}
                        <div className="space-y-2">
                            <div className="flex items-start gap-3 text-zinc-600 dark:text-gray-400">
                                <MapPin size={16} className="mt-1 text-luma-yellow shrink-0" />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[11px] font-bold text-zinc-950 dark:text-white/80">دفتر فنی:</span>
                                    <span className="text-xs leading-relaxed font-light">بابلسر، بلوار پاسداران، پاسداران 24، ساختمان ترنم، طبقه -1</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-600 dark:text-gray-400">
                                <Phone size={16} className="text-luma-yellow shrink-0" />
                                <a href="tel:01135279771" className="text-xs hover:text-luma-pink dark:hover:text-white transition-colors dir-ltr font-mono tracking-wide">011-35279771</a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-3 text-zinc-600 dark:text-gray-400 pt-2 border-t border-black/5 dark:border-white/5 mt-1">
                            <Mail size={16} className="text-luma-pink shrink-0" />
                            <a href="mailto:support@lumai.ir" className="text-xs hover:text-luma-pink dark:hover:text-white transition-colors font-mono">support@lumai.ir</a>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        {socialLinks.map((social, i) => (
                            <a 
                                key={i} 
                                href={social.href}
                                aria-label={social.label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/5 flex items-center justify-center text-zinc-500 dark:text-gray-400 hover:bg-zinc-950 hover:dark:bg-white hover:text-white hover:dark:text-black hover:border-zinc-950 hover:dark:border-white transition-all duration-300 hover:-translate-y-1"
                            >
                                <social.icon size={16} />
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Links Grid */}
                <motion.div variants={itemVariants} className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:pr-12">
                    {footerSections.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-5">
                            <h4 className="text-zinc-950 dark:text-white font-bold text-sm tracking-wide relative inline-flex items-center gap-2">
                                {section.title}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <LinkItem link={link} />
                                    </li>
                                ))}
                            </ul>

                            {/* Trust Seals - Placed under Products (index 0) */}
                            {idx === 0 && (
                                <motion.div variants={itemVariants} className="flex flex-row gap-4 mt-8 pt-4 border-t border-black/5 dark:border-white/5">
                                    {/* Zarinpal */}
                                    <div className="flex flex-col items-center gap-2">
                                        <a 
                                            href="https://www.zarinpal.com/trustPage/lumai.ir" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="block w-28 h-28 rounded-2xl p-3 hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/10 bg-white/50 dark:bg-transparent shadow-sm dark:shadow-none"
                                        >
                                            <img 
                                                src="https://cdn.zarinpal.com/badges/trustLogo/1.svg" 
                                                alt="Zarinpal Trust" 
                                                className="w-full h-full object-contain"
                                            />
                                        </a>
                                        <span className="text-[10px] text-zinc-500 dark:text-gray-500 font-medium">پرداخت ایمن زرین‌پال</span>
                                    </div>

                                    {/* Enamad */}
                                    <div className="flex flex-col items-center gap-2">
                                        <a 
                                            href="https://trustseal.enamad.ir/?id=606981&Code=Dy9q7C5MnwzVji1sPGNtuiURQEdBhAqY" 
                                            target="_blank" 
                                            rel="noopener"
                                            referrerPolicy="origin"
                                            className="block w-28 h-28 rounded-2xl p-2 hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/10 bg-white/50 dark:bg-transparent shadow-sm dark:shadow-none"
                                        >
                                            <img 
                                                src="https://trustseal.enamad.ir/logo.aspx?id=606981&Code=Dy9q7C5MnwzVji1sPGNtuiURQEdBhAqY" 
                                                alt="Enamad" 
                                                referrerPolicy="origin"
                                                {...({ code: "Dy9q7C5MnwzVji1sPGNtuiURQEdBhAqY" } as any)}
                                                className="w-full h-full object-contain"
                                            />
                                        </a>
                                        <span className="text-[10px] text-zinc-500 dark:text-gray-500 font-medium">نماد اعتماد</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Bottom Bar */}
            <motion.div 
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
            >
                
                {/* Copyright */}
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-gray-600 font-light">
                   <span>© {currentYear} شرکت هوش مصنوعی لوما. تمامی حقوق محفوظ است.</span>
                </div>

                {/* System Status */}
                <div className="flex items-center gap-6">
                    <a href="/status" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/5 hover:border-black/20 hover:dark:border-white/10 transition-colors group shadow-sm dark:shadow-none">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 group-hover:opacity-100"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-600 dark:text-gray-500 group-hover:text-zinc-950 dark:group-hover:text-gray-300 tracking-wide transition-colors">سیستم‌ها فعال</span>
                    </a>
                </div>
            </motion.div>
        </div>
    </footer>
  );
};

export default Footer;
