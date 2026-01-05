
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Zap, Layers, Sparkles, Brain, Cpu, Code2, FileText, Box } from 'lucide-react';
import Button from '../../Button';
import { ChatHeroAnim } from './ChatHeroAnim';
import MatrixRain from '../../MatrixRain';

const HERO_TAGS = [
  { label: 'GPT-5 Ready', icon: Brain, color: 'text-emerald-400', border: 'group-hover:border-emerald-400/20', bg: 'group-hover:bg-emerald-400/5' },
  { label: 'Claude 3.7', icon: Cpu, color: 'text-orange-400', border: 'group-hover:border-orange-400/20', bg: 'group-hover:bg-orange-400/5' },
  { label: 'Gemini 3 Pro', icon: Sparkles, color: 'text-blue-400', border: 'group-hover:border-blue-400/20', bg: 'group-hover:bg-blue-400/5' },
  { label: 'Live Code', icon: Code2, color: 'text-luma-purple', border: 'group-hover:border-luma-purple/20', bg: 'group-hover:bg-luma-purple/5' },
  { label: 'File Gen', icon: FileText, color: 'text-luma-pink', border: 'group-hover:border-luma-pink/20', bg: 'group-hover:bg-luma-pink/5' },
  { label: 'Widgets', icon: Box, color: 'text-luma-yellow', border: 'group-hover:border-luma-yellow/20', bg: 'group-hover:bg-luma-yellow/5' },
];

export const ChatHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0a0a0a]">
      
      {/* --- Advanced Background System --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         
         {/* 0. Matrix Code Rain (Base Layer) */}
         <MatrixRain opacity={0.12} />

         {/* 1. Dynamic Gradient Orbs (Mesh) */}
         <motion.div 
            animate={{ 
               scale: [1, 1.2, 1],
               opacity: [0.15, 0.25, 0.15],
               rotate: [0, 20, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            // Changed from via-blue-600/10 to via-luma-pink/10 to remove blue
            className="absolute -top-[20%] -right-[10%] w-[1000px] h-[1000px] bg-gradient-to-br from-luma-purple/20 via-luma-pink/10 to-transparent rounded-full blur-[120px] mix-blend-screen"
         />
         <motion.div 
            animate={{ 
               scale: [1, 1.1, 1],
               opacity: [0.1, 0.2, 0.1],
               x: [0, -30, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[40%] -left-[10%] w-[800px] h-[800px] bg-gradient-to-tr from-luma-pink/15 via-luma-yellow/5 to-transparent rounded-full blur-[100px] mix-blend-screen"
         />

         {/* 2. Animated Grid & Data Flow */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]">
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ width: '50%', opacity: 0.1 }}
            />
         </div>

         {/* 3. Floating Particles (Subtle) */}
         {[...Array(20)].map((_, i) => (
            <motion.div
               key={i}
               className="absolute bg-white/10 rounded-full"
               style={{
                  width: Math.random() * 2 + 1 + 'px',
                  height: Math.random() * 2 + 1 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
               }}
               animate={{
                  y: [0, -30, 0],
                  opacity: [0, 0.5, 0]
               }}
               transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5
               }}
            />
         ))}

         {/* 4. Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
         
         {/* 5. Vignette Fade (Top & Bottom) */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-80" />
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
               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luma-purple/20 bg-luma-purple/5 backdrop-blur-md mb-8 shadow-[0_0_20px_-5px_rgba(218,143,255,0.3)]"
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
            
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left dir-ltr">
                {HERO_TAGS.map((tag, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        className={`
                            group flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/5 bg-[#151515] 
                            transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-opacity-100 cursor-default
                            ${tag.border} ${tag.bg}
                        `}
                    >
                        <div className={`p-1.5 rounded-lg bg-white/5 ${tag.color} group-hover:scale-110 transition-transform shadow-inner`}>
                            <tag.icon size={14} />
                        </div>
                        <span className="text-[11px] font-bold text-gray-400 group-hover:text-gray-200 transition-colors whitespace-nowrap">
                            {tag.label}
                        </span>
                    </motion.div>
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
