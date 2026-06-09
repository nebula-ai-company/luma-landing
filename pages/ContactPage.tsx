
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MessageSquare, 
  CheckCircle2, Building2, Cpu, Sparkles, ArrowRight, Loader2, Check
} from 'lucide-react';
import Button from '../components/Button';

// --- Components ---

const OfficeCard = ({ title, address, phone, icon: Icon, color, delay, className = "" }: any) => {
  const handleCardClick = () => {
    window.location.href = `tel:${phone.replace(/-/g, '')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      onClick={handleCardClick}
      className={`group relative overflow-hidden rounded-[28px] bg-white dark:bg-[#121212] border border-zinc-200/60 dark:border-white/5 p-6 transition-all duration-500 hover:border-zinc-350 dark:hover:border-white/10 hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 flex flex-col justify-center cursor-pointer ${className}`}
    >
      {/* Hover Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Decorative Elements */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-zinc-950/5 dark:bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-5">
              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-white/5 group-hover:scale-110 transition-transform duration-500 text-zinc-600 group-hover:text-zinc-900 dark:text-gray-300 dark:group-hover:text-white shadow-sm dark:shadow-lg">
                  <Icon size={22} />
              </div>
              <div className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 text-[9px] font-bold text-zinc-500 dark:text-gray-500 uppercase tracking-wider group-hover:text-zinc-800 dark:group-hover:text-white/50 transition-colors">
                  Verified Location
              </div>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-luma-purple dark:group-hover:text-luma-yellow transition-colors">{title}</h3>
          
          <div className="pl-4 border-r-2 border-zinc-150 dark:border-white/5 pr-4 mr-1">
             <p className="text-sm text-zinc-500 dark:text-gray-400 leading-6 font-light group-hover:text-zinc-700 dark:group-hover:text-gray-300 transition-colors">
                {address}
             </p>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-zinc-150 dark:border-white/5 flex items-center justify-between">
           <div className="inline-flex items-center gap-3 text-lg font-mono font-bold text-zinc-900 dark:text-white group-hover:text-luma-purple dark:group-hover:text-luma-yellow transition-colors dir-ltr">
              <Phone size={16} className="text-zinc-400 dark:text-gray-500 group-hover:text-luma-purple dark:group-hover:text-luma-yellow transition-colors" />
              {phone}
           </div>
           <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
              <ArrowRight size={14} className="text-zinc-700 dark:text-white rotate-180" />
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const SubmissionModal = ({ isOpen, status, onClose }: { isOpen: boolean; status: 'loading' | 'success'; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={status === 'success' ? onClose : undefined}
                className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-white/10 rounded-[32px] p-8 max-w-sm w-full text-center shadow-2xl overflow-hidden ring-1 ring-zinc-950/5 dark:ring-white/5"
            >
                {/* Decorative gradients */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-luma-purple/10 blur-[60px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-luma-pink/10 blur-[60px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                    {status === 'loading' ? (
                        <div className="py-8 flex flex-col items-center">
                            <div className="relative mb-6">
                                {/* Spinner Ring */}
                                <div className="w-16 h-16 border-4 border-zinc-100 dark:border-white/5 border-t-luma-purple rounded-full animate-spin" />
                                {/* Inner Pulse */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-luma-purple rounded-full animate-pulse" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 tracking-wide">در حال ارسال...</h3>
                            <p className="text-xs text-zinc-400 dark:text-gray-500 font-medium">لطفاً چند لحظه صبر کنید</p>
                        </div>
                    ) : (
                        <>
                            {/* Animated Success Check */}
                            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)] relative">
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                  className="absolute inset-0 bg-green-500/10 rounded-full animate-ping opacity-20"
                                />
                                <Check className="w-10 h-10 text-green-500" strokeWidth={3} />
                            </div>
                            
                            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">پیام دریافت شد!</h3>
                            <p className="text-sm text-zinc-650 dark:text-gray-400 mb-8 leading-7 px-2">
                                پیام شما با موفقیت ثبت گردید. همکاران ما در اولین فرصت آن را بررسی و پاسخ خواهند داد.
                            </p>
                            
                            <Button 
                                onClick={onClose} 
                                variant="primary" 
                                className="w-full justify-center py-4 text-sm shadow-lg shadow-zinc-200/50 dark:shadow-white/5 hover:shadow-zinc-200/80 dark:hover:shadow-white/10"
                            >
                                متوجه شدم
                            </Button>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [modalStatus, setModalStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setModalStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const closeModal = () => {
    setModalStatus('idle');
  };

  return (
    <div className="w-full bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white pt-28 pb-10 selection:bg-luma-purple selection:text-white font-sans overflow-hidden relative transition-colors duration-300">
      
      {/* Feedback Modal */}
      <SubmissionModal 
        isOpen={modalStatus !== 'idle'} 
        status={modalStatus === 'loading' ? 'loading' : 'success'} 
        onClose={closeModal}
      />

      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 pointer-events-none fixed">
         <motion.div 
            animate={{ 
               x: [0, 50, -50, 0],
               y: [0, -30, 30, 0],
               opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 dark:mix-blend-screen mix-blend-multiply opacity-40 dark:opacity-[0.15]" 
         />
         <motion.div 
            animate={{ 
               x: [0, -50, 50, 0],
               y: [0, 40, -40, 0],
               opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-yellow/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 dark:mix-blend-screen mix-blend-multiply opacity-30 dark:opacity-[0.1]" 
         />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col">
         
         {/* --- Hero Section --- */}
         <div className="text-center max-w-4xl mx-auto mb-8">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-sm dark:shadow-lg"
            >
               <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luma-yellow opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-luma-yellow"></span>
               </span>
               <span className="text-[10px] font-bold text-zinc-650 dark:text-gray-300 uppercase tracking-widest">همیشه در دسترس</span>
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight"
            >
               آغاز یک <span className="text-transparent bg-clip-text bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow">همکاری بزرگ</span>
            </motion.h1>
            
            <motion.p 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
            >
               تیم پشتیبانی و فنی لوما آماده شنیدن صدای شماست. چه سوالی داشته باشید و چه پیشنهادی، ما اینجاییم تا به شما کمک کنیم.
            </motion.p>
         </div>

         {/* --- Main Content Grid --- */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
            
            {/* --- Left Column: Info Cards (5 Cols) --- */}
            <div className="lg:col-span-5 flex flex-col gap-3 h-full">
               
               <OfficeCard 
                  title="دفتر مرکزی"
                  icon={Building2}
                  address="خیابان سهروردی شمالی، خیابان کوشش، پلاک 35، واحد 7"
                  phone="021-88511051"
                  color="from-luma-purple/20 to-transparent"
                  className="flex-1" 
                  delay={0.3}
               />

               <OfficeCard 
                  title="دفتر فنی و توسعه"
                  icon={Cpu}
                  address="بابلسر، بلوار پاسداران، پاسداران 24، ساختمان ترنم، طبقه منفی یک"
                  phone="011-35279771"
                  color="from-luma-yellow/20 to-transparent"
                  className="flex-1"
                  delay={0.4}
               />

               {/* Email Card - Using motion.a for proper functionality */}
               <motion.a
                  href="mailto:support@lumai.ir"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="rounded-[28px] bg-white dark:bg-[#121212] border border-zinc-200/60 dark:border-white/5 p-6 flex items-center justify-between hover:border-zinc-350 dark:hover:border-white/20 transition-all cursor-pointer group shadow-lg hover:shadow-xl hover:shadow-zinc-200/40 dark:hover:shadow-luma-pink/5 block"
               >
                  <div className="flex items-center gap-5">
                     <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-zinc-700 dark:text-white border border-zinc-200 dark:border-white/5 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors shadow-inner">
                        <Mail size={22} />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-bold uppercase mb-1 tracking-wider">ایمیل سازمانی</span>
                        <span className="text-xl font-bold text-zinc-900 dark:text-white font-mono tracking-tight text-right">support@lumai.ir</span>
                     </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:bg-zinc-100 dark:group-hover:bg-white/10 transition-colors">
                     <ArrowRight size={18} className="text-zinc-400 dark:text-gray-400 group-hover:text-zinc-900 dark:group-hover:text-white rotate-180 transition-colors" />
                  </div>
               </motion.a>

            </div>

            {/* --- Right Column: Form (7 Cols) --- */}
            <div className="lg:col-span-7 h-full">
               <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative h-full"
               >
                  {/* Backdrop Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-luma-purple/20 via-luma-pink/10 to-transparent blur-3xl opacity-10 dark:opacity-40 -z-10 rounded-[40px]" />
                  
                  <div className="bg-white dark:bg-[#121212] border border-zinc-200/60 dark:border-white/10 rounded-[32px] p-6 shadow-2xl dark:shadow-none relative overflow-hidden h-full flex flex-col">
                     
                     <div className="mb-4 relative z-10">
                        <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight flex items-center gap-3">
                           ارسال پیام
                           <span className="w-2 h-2 rounded-full bg-luma-pink animate-pulse" />
                        </h3>
                        <p className="text-zinc-550 dark:text-gray-400 text-sm font-light">پاسخگویی معمولاً در کمتر از ۲ ساعت کاری.</p>
                     </div>

                     <motion.form 
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4 flex-1 flex flex-col"
                     >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-1.5">
                              <label className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${focusedField === 'name' ? 'text-luma-purple font-extrabold' : 'text-zinc-400 dark:text-gray-500'}`}>
                                 نام کامل
                              </label>
                              <input 
                                 type="text" 
                                 required
                                 value={formData.name}
                                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                                 onFocus={() => setFocusedField('name')}
                                 onBlur={() => setFocusedField(null)}
                                 className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-zinc-850 dark:text-white placeholder:text-zinc-405 dark:placeholder:text-zinc-700 focus:border-luma-purple/50 focus:bg-white dark:focus:bg-[#0f0f0f] focus:outline-none transition-all shadow-inner"
                                 placeholder="مثال: علی رضایی"
                              />
                           </div>
                           <div className="space-y-1.5">
                              <label className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${focusedField === 'email' ? 'text-luma-purple font-extrabold' : 'text-zinc-400 dark:text-gray-500'}`}>
                                 ایمیل
                              </label>
                              <input 
                                 type="email" 
                                 required
                                 value={formData.email}
                                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                                 onFocus={() => setFocusedField('email')}
                                 onBlur={() => setFocusedField(null)}
                                 className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-zinc-850 dark:text-white placeholder:text-zinc-405 dark:placeholder:text-zinc-700 focus:border-luma-purple/50 focus:bg-white dark:focus:bg-[#0f0f0f] focus:outline-none transition-all dir-ltr text-right shadow-inner"
                                 placeholder="name@example.com"
                              />
                           </div>
                        </div>

                        <div className="space-y-1.5">
                           <label className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${focusedField === 'subject' ? 'text-luma-purple font-extrabold' : 'text-zinc-400 dark:text-gray-500'}`}>
                              موضوع پیام
                           </label>
                           <div className="relative">
                              <select 
                                 value={formData.subject}
                                 onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                 onFocus={() => setFocusedField('subject')}
                                 onBlur={() => setFocusedField(null)}
                                 className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-zinc-800 dark:text-white focus:border-luma-purple/50 focus:bg-white dark:focus:bg-[#0f0f0f] focus:outline-none transition-all appearance-none cursor-pointer shadow-inner"
                              >
                                 <option value="" disabled>انتخاب کنید...</option>
                                 <option value="support">پشتیبانی فنی</option>
                                 <option value="sales">فروش و مشاوره</option>
                                 <option value="partnership">همکاری تجاری</option>
                                 <option value="feedback">انتقاد و پیشنهاد</option>
                              </select>
                              <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-450 dark:text-gray-500">
                                 <MessageSquare size={16} className="rotate-90" />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-1.5 flex-1 flex flex-col min-h-[150px]">
                           <label className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${focusedField === 'message' ? 'text-luma-purple font-extrabold' : 'text-zinc-400 dark:text-gray-500'}`}>
                              متن پیام
                           </label>
                           <textarea 
                              required
                              value={formData.message}
                              onChange={(e) => setFormData({...formData, message: e.target.value})}
                              onFocus={() => setFocusedField('message')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full flex-1 bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-zinc-850 dark:text-white placeholder:text-zinc-405 dark:placeholder:text-zinc-700 focus:border-luma-purple/50 focus:bg-white dark:focus:bg-[#0f0f0f] focus:outline-none transition-all resize-none leading-relaxed shadow-inner"
                              placeholder="توضیحات خود را بنویسید..."
                           />
                        </div>

                        <Button 
                           type="submit" 
                           variant="primary" 
                           className="w-full justify-center h-12 text-base font-bold shadow-lg shadow-luma-purple/20 hover:shadow-luma-purple/40 border-0 ring-1 ring-black/10 dark:ring-white/50 mt-2"
                           disabled={modalStatus === 'loading'}
                        >
                           {modalStatus === 'loading' ? (
                              <span className="flex items-center gap-2">
                                 <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                 در حال ارسال...
                              </span>
                           ) : (
                              <>
                                 ارسال پیام <Sparkles size={18} className="fill-black" />
                              </>
                           )}
                        </Button>
                     </motion.form>

                  </div>
               </motion.div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default ContactPage;
