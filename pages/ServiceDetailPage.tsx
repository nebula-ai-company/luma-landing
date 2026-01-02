import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Zap, Shield, Clock } from 'lucide-react';
import Button from '../components/Button';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-4">
            <h1 className="text-2xl text-white">سرویس یافت نشد</h1>
            <Button onClick={() => navigate('/')} variant="secondary">بازگشت به خانه</Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb - Pushed down to clear fixed navbar */}
      <div className="pt-24 max-w-screen-2xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-white">خانه</Link>
        <ChevronRight size={16} className="rotate-180" />
        <span className="text-white">{service.title}</span>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-24 border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-16 h-16 bg-surfaceHighlight border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-luma-pink">
              <service.icon size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {service.description}. با استفاده از جدیدترین مدل‌های هوش مصنوعی لوما، خلاقیت خود را بدون محدودیت گسترش دهید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                externalHref="https://lumai.ir/dashboard" 
                variant="primary"
                className="px-8 py-4"
              >
                همین حالا امتحان کنید
              </Button>
              <div className="flex items-center justify-center gap-2 px-6 text-gray-400">
                <Clock size={20} />
                <span>پردازش زیر ۵ ثانیه</span>
              </div>
            </div>
          </div>
          <div className="bg-surfaceHighlight rounded-3xl aspect-video border border-white/10 overflow-hidden relative group">
             {/* Simulated App Interface */}
             <div className="absolute top-0 w-full h-12 bg-black/40 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
             </div>
             <div className="w-full h-full flex items-center justify-center pt-12">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 border-4 border-luma-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-luma-purple font-mono">Processing...</p>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">چگونه کار می‌کند؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             {/* Line connector (hidden on mobile) */}
             <div className="hidden md:block absolute top-12 right-0 left-0 h-0.5 bg-gradient-to-l from-transparent via-white/10 to-transparent" />
             
             {[1, 2, 3].map((step) => (
               <div key={step} className="relative z-10 text-center">
                 <div className="w-24 h-24 mx-auto bg-background border border-white/10 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-xl">
                   {step}
                 </div>
                 <h3 className="text-xl font-bold mb-2">مرحله {step}</h3>
                 <p className="text-gray-400 text-sm">توضیحات مربوط به مرحله {step} برای استفاده از سرویس.</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-3xl bg-surfaceHighlight border border-white/5">
                    <Zap className="w-10 h-10 text-luma-yellow mb-4" />
                    <h3 className="text-xl font-bold mb-2">سرعت بالا</h3>
                    <p className="text-gray-400">پردازش آنی درخواست‌ها با زیرساخت قدرتمند ابری.</p>
                </div>
                <div className="p-8 rounded-3xl bg-surfaceHighlight border border-white/5">
                    <Shield className="w-10 h-10 text-luma-pink mb-4" />
                    <h3 className="text-xl font-bold mb-2">امنیت کامل</h3>
                    <p className="text-gray-400">حفظ حریم خصوصی داده‌های شما اولویت ماست.</p>
                </div>
                <div className="p-8 rounded-3xl bg-surfaceHighlight border border-white/5">
                    <ArrowLeft className="w-10 h-10 text-luma-purple mb-4" />
                    <h3 className="text-xl font-bold mb-2">کاربری آسان</h3>
                    <p className="text-gray-400">رابط کاربری ساده بدون نیاز به دانش فنی.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;