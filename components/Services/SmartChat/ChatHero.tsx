
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Zap, Layers, Sparkles } from 'lucide-react';
import Button from '../../Button';
import { ChatHeroAnim } from './ChatHeroAnim';

export const ChatHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0a0a0a]">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <motion.div 
            animate={{ 
               y: [0, -60, 0],
               opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-luma-purple/10 rounded-full blur-[120px] mix-blend-screen" 
         />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right"
          >
            <motion.div 
               initial={{ y: 10, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luma-purple/20 bg-luma-purple/5 backdrop-blur-md mb-8"
            >
               <MessageSquare size={16} className="text-luma-purple animate-pulse" />
               <span className="text-[11px] font-bold text-luma-purple tracking-wide">شورای مشورتی هوش مصنوعی</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
               چرا به یک مدل
               <br />
               <span className="text-gradient-animated py-2 inline-block">
                  محدود شوید؟
               </span>
            </h1>

            <p className="text-lg text-gray-400 mb-10 leading-loose max-w-xl mx-auto lg:mx-0 font-light">
               در سرویس چت هوشمند لوما، به برترین مدل‌های جهان (GPT-5، Claude 3.7، Gemini) در یک پنجره دسترسی دارید. 
               بحث را با یک مدل شروع کنید و با مدلی دیگر به پایان برسانید.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <Button 
                  externalHref="https://lumai.ir/dashboard" 
                  variant="primary"
                  className="bg-white text-black hover:bg-gray-200 shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] border-none"
               >
                  شروع گفتگو
                  <Zap size={20} className="fill-black" />
               </Button>
               <Button variant="secondary" className="hover:bg-white/5 border-white/10">
                  مشاهده مدل‌ها
                  <Layers size={20} />
               </Button>
            </div>
            
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 text-left dir-ltr">
                {['GPT-5 Ready', 'Claude 3.7', 'Gemini Pro', 'Live Code', 'File Gen', 'Widgets'].map((tag, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                        <Sparkles size={10} className="text-luma-yellow" />
                        {tag}
                    </div>
                ))}
            </div>
          </motion.div>

          {/* Animation Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] w-full"
          >
             <div className="absolute -inset-1 bg-gradient-to-tr from-luma-purple/20 via-blue-500/10 to-transparent blur-3xl opacity-40 rounded-[40px] -z-10" />
             <ChatHeroAnim />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
