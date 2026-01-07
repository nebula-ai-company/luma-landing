
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Twitter, Instagram, Linkedin, Github, 
  ArrowUpRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  const footerSections = [
    {
      title: "محصولات",
      links: [
        { label: "همه سرویس‌ها", href: "/#services" },
        { label: "ساخت تصویر", href: "/service/img-gen" },
        { label: "ویرایش تصویر", href: "/service/img-edit" },
        { label: "حذف پس‌زمینه", href: "/service/bg-remove" },
        { label: "دستیار هوشمند", href: "/service/assistant" },
        { label: "ساخت ویدیو", href: "/service/video" },
        { label: "افزایش کیفیت", href: "/service/upscale" },
        { label: "پوشاندن لباس", href: "/service/try-on" },
        { label: "چت هوشمند", href: "/service/chat" },
      ]
    },
    {
      title: "دسترسی سریع",
      links: [
        { label: "گالری آثار", href: "/#gallery" },
        { label: "راهکارهای سازمانی", href: "/solutions" },
        { label: "تعرفه‌ها", href: "/pricing" },
        { label: "درباره ما", href: "/about" },
        { label: "تماس با ما", href: "/contact" },
      ]
    },
    {
      title: "قوانین و امنیت",
      links: [
        { label: "حریم خصوصی", href: "/privacy" },
        { label: "قوانین و مقررات", href: "/terms" },
        { label: "امنیت شما در لوما", href: "/security" },
      ]
    },
    {
      title: "منابع و پشتیبانی",
      links: [
        { label: "وبلاگ", href: "/blog" },
        { label: "مرکز آموزش", href: "/tutorials" },
        { label: "مستندات فنی", href: "/docs" },
        { label: "ورود به پنل", href: "https://lumai.ir/dashboard", external: true },
        { label: "شروع رایگان", href: "https://lumai.ir/dashboard", external: true },
      ]
    }
  ];

  // Helper to handle hash scrolling vs navigation
  const LinkItem = ({ link }: { link: { label: string, href: string, external?: boolean, badge?: string } }) => {
    const content = (
        <>
            {link.label}
            {link.badge && (
                <span className="px-1.5 py-0.5 rounded-full bg-luma-purple/10 border border-luma-purple/20 text-[9px] text-luma-purple font-bold mr-2">
                    {link.badge}
                </span>
            )}
            {link.external && <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 mr-1" />}
        </>
    );

    if (link.external) {
       return (
         <a href={link.href} className="text-gray-500 hover:text-white transition-colors text-sm flex items-center group">
            {content}
         </a>
       );
    }
    
    // Hash link handling
    if (link.href.startsWith('/#')) {
        return (
            <a href={link.href} className="text-gray-500 hover:text-luma-purple transition-colors text-sm flex items-center">
               {content}
            </a>
        );
    }

    return (
        <Link to={link.href} className="text-gray-500 hover:text-luma-pink transition-colors text-sm flex items-center">
           {content}
        </Link>
    );
  };

  return (
    <footer className="relative bg-[#020202] border-t border-white/5 pt-20 pb-10 overflow-hidden font-sans">
        {/* Minimal Background Gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-luma-purple/5 blur-[120px] pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
                
                {/* Brand Column */}
                <div className="lg:col-span-4 flex flex-col items-start gap-6">
                    <Link to="/" className="flex items-center gap-2 group mb-2">
                        <img src="https://lumai.ir/logo-en.svg" alt="Luma AI" className="h-8 w-auto invert brightness-0 opacity-90 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-gray-500 text-sm leading-7 font-light max-w-xs text-justify lg:text-right">
                        پیشگام در ارائه ابزارهای خلاقیت مبتنی بر هوش مصنوعی. 
                        ما مرزهای تخیل را با تکنولوژی ادغام می‌کنیم تا آینده‌ای روشن‌تر بسازیم.
                    </p>
                    <div className="flex gap-3 pt-2">
                        {socialLinks.map((social, i) => (
                            <a 
                                key={i} 
                                href={social.href}
                                aria-label={social.label}
                                className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                            >
                                <social.icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Links Grid */}
                <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:pr-12">
                    {footerSections.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-5">
                            <h4 className="text-white font-bold text-sm tracking-wide relative inline-flex items-center gap-2">
                                {section.title}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <LinkItem link={link} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Copyright */}
                <div className="flex items-center gap-2 text-xs text-gray-600 font-mono dir-ltr">
                   <span>© {currentYear} Luma AI Inc. All rights reserved.</span>
                </div>

                {/* System Status */}
                <div className="flex items-center gap-6">
                    <a href="/status" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors group">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 group-hover:opacity-100"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-300 tracking-wide transition-colors">SYSTEMS OPERATIONAL</span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
