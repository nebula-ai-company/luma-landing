
import React, { useEffect } from 'react';
import { Shield } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20 pb-20">
      
      <div className="max-w-3xl mx-auto px-6">
         
         <div className="text-center mb-16 pt-16">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
               <Shield size={14} className="text-luma-pink" />
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">سند حقوقی</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">حریم خصوصی</h1>
            <p className="text-gray-400 font-light">آخرین بروزرسانی: ۱۰ تیر ۱۴۰۳</p>
         </div>

         <div className="prose prose-invert prose-lg max-w-none font-light">
            <p className="lead text-xl text-gray-300 mb-12">
               حریم خصوصی شما برای ما در لوما از اهمیت بالایی برخوردار است. این سند توضیح می‌دهد که ما چگونه اطلاعات شما را جمع‌آوری، استفاده و محافظت می‌کنیم.
            </p>

            <h3 className="text-white font-bold text-2xl mt-12 mb-4">۱. اطلاعاتی که جمع‌آوری می‌کنیم</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
               ما ممکن است اطلاعات زیر را جمع‌آوری کنیم:
            </p>
            <ul className="list-disc pr-6 space-y-2 text-gray-400 mb-8">
               <li>اطلاعات حساب کاربری (نام، ایمیل، شماره تماس)</li>
               <li>داده‌های مربوط به استفاده از سرویس‌ها (لاگ‌های سیستم، نوع دستگاه)</li>
               <li>محتوای تولید شده توسط شما (تصاویر، متون، ویدیوها) صرفاً جهت ارائه سرویس</li>
            </ul>

            <h3 className="text-white font-bold text-2xl mt-12 mb-4">۲. نحوه استفاده از اطلاعات</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
               ما از اطلاعات شما برای موارد زیر استفاده می‌کنیم:
            </p>
            <ul className="list-disc pr-6 space-y-2 text-gray-400 mb-8">
               <li>ارائه و بهبود خدمات پلتفرم</li>
               <li>پشتیبانی مشتریان و ارسال اطلاع‌رسانی‌های مهم</li>
               <li>جلوگیری از کلاهبرداری و سوءاستفاده</li>
            </ul>

            <h3 className="text-white font-bold text-2xl mt-12 mb-4">۳. امنیت داده‌ها</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
               ما از استانداردهای امنیتی روز دنیا (مانند رمزنگاری AES-256) برای محافظت از داده‌های شما استفاده می‌کنیم. با این حال، هیچ روش انتقال داده‌ای در اینترنت ۱۰۰٪ امن نیست.
            </p>

            <h3 className="text-white font-bold text-2xl mt-12 mb-4">۴. اشتراک‌گذاری اطلاعات</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
               ما اطلاعات شخصی شما را به هیچ شخص ثالثی نمی‌فروشیم. اشتراک‌گذاری اطلاعات تنها در موارد زیر انجام می‌شود:
            </p>
            <ul className="list-disc pr-6 space-y-2 text-gray-400 mb-8">
               <li>با رضایت صریح شما</li>
               <li>برای رعایت قوانین و مقررات قضایی</li>
               <li>با ارائه‌دهندگان خدمات ابری (مانند سرورها) که متعهد به حفظ محرمانگی هستند</li>
            </ul>
         </div>

      </div>
    </div>
  );
};

export default PrivacyPage;
