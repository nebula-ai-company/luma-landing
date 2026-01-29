
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, Eye, FileKey, Fingerprint, Globe, LucideIcon } from 'lucide-react';

// --- Brand Colors ---
const COLORS = {
  purple: '#DA8FFF',
  pink: '#FF6482',
  yellow: '#FFB340',
};

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  hex: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Lock,
    title: "رمزنگاری پیشرفته",
    description: "تمام داده‌های شما با استاندارد AES-256 در حالت استراحت و TLS 1.3 در هنگام انتقال رمزنگاری می‌شوند.",
    color: "text-luma-purple",
    hex: COLORS.purple
  },
  {
    icon: Server,
    title: "زیرساخت ابری امن",
    description: "سرورهای لوما در دیتاسنترهای ایزوله با لایه‌های امنیتی فیزیکی و دیجیتالی چندگانه میزبانی می‌شوند.",
    color: "text-luma-yellow",
    hex: COLORS.yellow
  },
  {
    icon: Eye,
    title: "حریم خصوصی مطلق",
    description: "ما هرگز از تصاویر، ویدیوها یا داده‌های خصوصی شما برای آموزش مدل‌های عمومی خود استفاده نمی‌کنیم.",
    color: "text-luma-pink",
    hex: COLORS.pink
  },
  {
    icon: FileKey,
    title: "کنترل دسترسی",
    description: "شما مالک کامل داده‌های خود هستید. هر زمان که بخواهید می‌توانید تمام اطلاعات خود را به صورت دائمی حذف کنید.",
    color: "text-luma-purple",
    hex: COLORS.purple
  },
  {
    icon: Globe,
    title: "تطابق با استانداردها",
    description: "پلتفرم ما مطابق با قوانین GDPR و استانداردهای امنیت سایبری ملی طراحی شده است.",
    color: "text-luma-yellow",
    hex: COLORS.yellow
  },
  {
    icon: Fingerprint,
    title: "احراز هویت دو مرحله‌ای",
    description: "حساب کاربری شما با سیستم‌های تشخیص نفوذ هوشمند و 2FA محافظت می‌شود.",
    color: "text-luma-pink",
    hex: COLORS.pink
  }
];

interface SecurityCardProps {
  item: FeatureItem;
  index: number;
}

const SecurityCard: React.FC<SecurityCardProps> = ({ item, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <div 
          ref={divRef}
          onMouseMove={handleMouseMove}
          className="group relative h-full rounded-[32px] p-px overflow-hidden transition-transform duration-500 hover:-translate-y-2"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.03)',
          }}
      >
          {/* Dynamic Border Gradient */}
          <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
              style={{
                  background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${item.hex}50, transparent 40%)`
              }}
          />

          {/* Inner Content Container */}
          <div className="relative h-full bg-[#0c0c0e] rounded-[31px] overflow-hidden flex flex-col p-8">
              
              {/* Subtle Inner Glow following cursor */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${item.hex}, transparent 40%)`
                }}
              />
              
              {/* Noise Texture */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner group-hover:bg-white/10 ${item.color}`}>
                    <item.icon size={28} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
                   {item.title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-7 font-light flex-1 group-hover:text-gray-300 transition-colors">
                   {item.description}
                </p>

                {/* Bottom Line Accent */}
                <div className="mt-6 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <div 
                      className="h-full w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"
                      style={{ backgroundColor: item.hex }} 
                   />
                </div>
              </div>
          </div>
      </div>
    </motion.div>
  );
};

export const SecurityFeatures: React.FC = () => {
  return (
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
         
         <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                 {FEATURES.map((feature, idx) => (
                     <SecurityCard key={idx} item={feature} index={idx} />
                 ))}
             </div>
         </div>
      </section>
  );
};
