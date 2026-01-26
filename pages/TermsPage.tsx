
import React, { useEffect } from 'react';
import { FileText } from 'lucide-react';

const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20 pb-20">
      
      <div className="max-w-3xl mx-auto px-6">
         
         <div className="text-center mb-16 pt-16">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
               <FileText size={14} className="text-luma-yellow" />
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">سند حقوقی</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">قوانین و مقررات</h1>
            <p className="text-gray-400 font-light">آخرین بروزرسانی: ۱۰ تیر ۱۴۰۳</p>
         </div>

         <div className="prose prose-invert prose-lg max-w-none font-light">
            <p className="lead text-xl text-gray-300 mb-12">
               استفاده از خدمات لوما به منزله پذیرش کامل قوانین و مقررات زیر است. لطفاً آن‌ها را با دقت مطالعه کنید.
            </p>

            <h3 className="text-white font-bold text-2xl mt-12 mb-4">۱. تعاریف</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
               «لوما» به پلتفرم ارائه‌دهنده خدمات هوش مصنوعی اشاره دارد. «کاربر» هر شخص حقیقی یا حقوقی است که از خدمات لوما استفاده می‌کند.
            </p>

            <h3 className="text-white font-bold text-2xl mt-12 mb-4">۲. شرایط استفاده</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
               کاربر متعهد می‌شود که از خدمات لوما برای موارد زیر استفاده نکند:
            </p>
            <ul className="list-disc pr-6 space-y-2 text-gray-400 mb-8">
               <li>تولید محتوای غیرقانونی، توهین‌آمیز یا مستهجن</li>
               <li>نقض حقوق مالکیت فکری دیگران</li>
               <li>تلاش برای نفوذ یا اختلال در سیستم‌های لوما</li>
            </ul>

            <h3 className="text-white font-bold text-2xl mt-12 mb-4">۳. مالکیت محتوا</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
               مالکیت معنوی تمام محتوای تولید شده توسط کاربر (تصاویر، متون، ویدیوها) متعلق به خود کاربر است. لوما هیچ ادعای مالکیتی بر خروجی‌های شما ندارد.
            </p>

            <h3 className="text-white font-bold text-2xl mt-12 mb-4">۴. پرداخت و بازپرداخت</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
               پرداخت‌ها از طریق درگاه‌های بانکی معتبر انجام می‌شود. اعتبار خریداری شده (لوم) قابل استرداد نیست، مگر در مواردی که سرویس به دلیل مشکل فنی از جانب ما برای مدت طولانی در دسترس نباشد.
            </p>

            <h3 className="text-white font-bold text-2xl mt-12 mb-4">۵. تغییرات در قوانین</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
               لوما حق دارد در هر زمان این قوانین را بروزرسانی کند. تغییرات مهم از طریق ایمیل یا اطلاعیه در پنل کاربری به اطلاع کاربران خواهد رسید.
            </p>
         </div>

      </div>
    </div>
  );
};

export default TermsPage;
