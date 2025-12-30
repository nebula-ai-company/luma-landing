import React from 'react';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import Button from './Button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-white/5 pt-16 pb-8">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <img src="https://lumai.ir/logo-en.svg" alt="Luma" className="h-8 w-auto invert brightness-0" />
            <p className="text-gray-400 text-sm leading-relaxed">
              لوما، پیشگام در ارائه سرویس‌های هوش مصنوعی مولد در ایران. 
              ما مرزهای خلاقیت را با تکنولوژی جابجا می‌کنیم.
            </p>
            <div className="flex space-x-4 space-x-reverse pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">خدمات</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-luma-pink transition-colors">ساخت تصویر</a></li>
              <li><a href="#" className="hover:text-luma-pink transition-colors">ویرایش هوشمند</a></li>
              <li><a href="#" className="hover:text-luma-pink transition-colors">دستیار صوتی</a></li>
              <li><a href="#" className="hover:text-luma-pink transition-colors">ساخت ویدیو</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">منابع</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-luma-purple transition-colors">مستندات API</a></li>
              <li><a href="#" className="hover:text-luma-purple transition-colors">وبلاگ</a></li>
              <li><a href="#" className="hover:text-luma-purple transition-colors">راهنما</a></li>
              <li><a href="#" className="hover:text-luma-purple transition-colors">قوانین و مقررات</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">خبرنامه</h3>
            <p className="text-gray-400 text-sm mb-4">برای اطلاع از آخرین اخبار و تخفیف‌ها عضو شوید.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="ایمیل خود را وارد کنید" 
                className="bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-luma-purple transition-colors"
              />
              <Button variant="primary" className="py-2">
                عضویت
              </Button>
            </form>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© ۱۴۰۳ تمامی حقوق برای لوما محفوظ است.</p>
          <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
            <a href="#" className="hover:text-white">حریم خصوصی</a>
            <a href="#" className="hover:text-white">شرایط استفاده</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;