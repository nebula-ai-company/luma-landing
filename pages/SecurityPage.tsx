import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, Eye, FileKey, CheckCircle2, ChevronRight, Globe, Fingerprint } from 'lucide-react';
import Button from '../components/Button';

const SecurityPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Lock,
      title: "رمزنگاری پیشرفته",
      description: "تمام داده‌های شما با استاندارد AES-256 در حالت استراحت و TLS 1.3 در هنگام انتقال رمزنگاری می‌شوند.",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10"
    },
    {
      icon: Server,
      title: "زیرساخت ابری امن",
      description: "سرورهای لوما در دیتاسنترهای ایزوله با لایه‌های امنیتی فیزیکی و دیجیتالی چندگانه میزبانی می‌شوند.",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      icon: Eye,
      title: "حریم خصوصی مطلق",
      description: "ما هرگز از تصاویر، ویدیوها یا داده‌های خصوصی شما برای آموزش مدل‌های عمومی خود استفاده نمی‌کنیم.",
      color: "text-luma-purple",
      bgColor: "bg-luma-purple/10"
    },
    {
      icon: FileKey,
      title: "کنترل دسترسی",
      description: "شما مالک کامل داده‌های خود هستید. هر زمان که بخواهید می‌توانید تمام اطلاعات خود را به صورت دائمی حذف کنید.",
      color: "text-luma-yellow",
      bgColor: "bg-luma-yellow/10"
    },
    {
      icon: Globe,
      title: "تطابق با استانداردها",
      description: "پلتفرم ما مطابق با قوانین GDPR و استانداردهای امنیت سایبری ملی طراحی شده است.",
      color: "text-luma-pink",
      bgColor: "bg-luma-pink/10"
    },
    {
      icon: Fingerprint,
      title: "احراز هویت دو مرحله‌ای",
      description: "حساب کاربری شما با سیستم‌های تشخیص نفوذ هوشمند و 2FA محافظت می‌شود.",
      color: "text-orange-400",
      bgColor: "bg-orange-400/10"
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-background text-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-4 relative z-10 text-center">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md"
            >
               <Shield className="text-emerald-400" size={16} />
               <span className="text-emerald-100 font-medium text-xs tracking-wide">مرکز امنیت و اعتماد</span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black mb-6"
            >
                امنیت شما، <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">اولویت ماست</span>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
                ما در لوما معتقدیم که خلاقیت نیاز به فضایی امن دارد. زیرساخت‌های ما با بالاترین استانداردهای امنیتی جهان طراحی شده‌اند تا از دارایی‌های دیجیتال شما محافظت کنند.
            </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 bg-[#050505]">
         <div className="max-w-screen-2xl mx-auto px-4">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {features.map((feature, idx) => (
                     <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-surfaceHighlight border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors group"
                     >
                         <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                             <feature.icon size={28} className={feature.color} />
                         </div>
                         <h3 className="text-xl font-bold mb-3 text-gray-100">{feature.title}</h3>
                         <p className="text-gray-400 leading-relaxed text-sm">
                             {feature.description}
                         </p>
                     </motion.div>
                 ))}
             </div>
         </div>
      </section>

      {/* Compliance / Info Section */}
      <section className="py-24 border-t border-white/5">
         <div className="max-w-screen-xl mx-auto px-4">
            <div className="bg-surfaceHighlight border border-white/10 rounded-[32px] p-8 md:p-12 lg:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">شفافیت در پردازش داده‌ها</h2>
                        <div className="space-y-4">
                            {[
                                "داده‌های شما فقط برای ارائه سرویس به خود شما استفاده می‌شود.",
                                "هیچ شخص ثالثی بدون اجازه صریح شما به اطلاعات دسترسی ندارد.",
                                "سیستم‌های نظارت خودکار ۲۴/۷ برای جلوگیری از حملات سایبری فعال هستند.",
                                "پشتیبان‌گیری منظم و رمزنگاری شده در سرورهای آفلاین."
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="text-emerald-400 shrink-0 mt-1" size={18} />
                                    <span className="text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                            <Button externalHref="mailto:security@luma.ir" variant="secondary" className="border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/5">
                                تماس با تیم امنیت
                            </Button>
                            <Button href="/terms" variant="secondary">
                                مطالعه قوانین و مقررات
                            </Button>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 font-mono text-xs text-gray-400 leading-relaxed overflow-hidden">
                            <div className="flex gap-1.5 mb-4 opacity-50">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            </div>
                            <p><span className="text-purple-400">const</span> <span className="text-emerald-400">securityProtocol</span> = <span className="text-purple-400">new</span> LumaGuard();</p>
                            <p className="mt-2"><span className="text-blue-400">await</span> securityProtocol.<span className="text-yellow-400">encrypt</span>({'{'}</p>
                            <p className="pl-4">mode: <span className="text-orange-400">'AES-GCM'</span>,</p>
                            <p className="pl-4">keySize: <span className="text-blue-300">256</span>,</p>
                            <p className="pl-4">data: <span className="text-orange-400">'User_Sensitive_Content'</span></p>
                            <p>{'}'});</p>
                            <p className="mt-2 text-gray-500">// Encryption Verified.</p>
                            <p className="text-gray-500">// Secure Tunnel Established.</p>
                            <div className="mt-4 flex items-center gap-2 text-emerald-400 font-bold">
                                <Shield size={14} />
                                <span>STATUS: SECURE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default SecurityPage;