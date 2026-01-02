
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, Eye, FileKey, Fingerprint, Globe } from 'lucide-react';

export const SecurityFeatures: React.FC = () => {
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
  );
};
