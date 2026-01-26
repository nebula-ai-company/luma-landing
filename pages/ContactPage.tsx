
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, MessageSquare } from 'lucide-react';
import Button from '../components/Button';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    // Simulate API call
    setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setIsSent(false);
        alert("پیام شما با موفقیت ارسال شد.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20">
      
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-luma-pink/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-6 relative z-10">
           <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6">تماس با ما</h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                 سوالی دارید یا نیاز به راهنمایی دارید؟ تیم پشتیبانی لوما آماده پاسخگویی به شماست.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Info */}
              <div className="space-y-8">
                 <div className="bg-[#121212] border border-white/5 rounded-[32px] p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                       <MessageSquare size={20} className="text-luma-purple" />
                       اطلاعات تماس
                    </h3>
                    <div className="space-y-6">
                       <div className="flex items-center gap-4 text-gray-300">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-luma-purple">
                             <Mail size={18} />
                          </div>
                          <span>support@lumai.ir</span>
                       </div>
                       <div className="flex items-center gap-4 text-gray-300">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-luma-purple">
                             <Phone size={18} />
                          </div>
                          <span>۰۲۱-۸۸۸۸۸۸۸۸</span>
                       </div>
                       <div className="flex items-center gap-4 text-gray-300">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-luma-purple">
                             <MapPin size={18} />
                          </div>
                          <span>تهران، خیابان ولیعصر، برج فناوری</span>
                       </div>
                    </div>
                 </div>

                 <div className="bg-[#121212] border border-white/5 rounded-[32px] p-8">
                    <h3 className="text-xl font-bold text-white mb-4">ساعات پاسخگویی</h3>
                    <div className="space-y-2 text-gray-400 font-light">
                       <p>شنبه تا چهارشنبه: ۹ صبح تا ۵ عصر</p>
                       <p>پنجشنبه: ۹ صبح تا ۱ ظهر</p>
                       <p>پشتیبانی تیکت: ۲۴ ساعته / ۷ روز هفته</p>
                    </div>
                 </div>
              </div>

              {/* Form */}
              <div className="bg-[#121212] border border-white/5 rounded-[32px] p-8 lg:p-10">
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                       <label className="block text-sm text-gray-400 mb-2">نام و نام خانوادگی</label>
                       <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-luma-purple/50 focus:outline-none transition-colors"
                          placeholder="مثال: علی رضایی"
                       />
                    </div>
                    <div>
                       <label className="block text-sm text-gray-400 mb-2">ایمیل</label>
                       <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-luma-purple/50 focus:outline-none transition-colors"
                          placeholder="name@example.com"
                       />
                    </div>
                    <div>
                       <label className="block text-sm text-gray-400 mb-2">پیام شما</label>
                       <textarea 
                          rows={5}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-luma-purple/50 focus:outline-none transition-colors resize-none"
                          placeholder="پیام خود را بنویسید..."
                       />
                    </div>
                    <Button type="submit" variant="primary" className="w-full justify-center" disabled={isSent}>
                       {isSent ? 'در حال ارسال...' : (
                          <>
                             ارسال پیام <Send size={18} />
                          </>
                       )}
                    </Button>
                 </form>
              </div>

           </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
