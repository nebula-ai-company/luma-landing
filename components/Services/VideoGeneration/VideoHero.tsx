
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Film } from 'lucide-react';
import Button from '../../Button';
import { VideoHeroAnim } from './VideoHeroAnim';

export const VideoHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FBF9F6] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300">
        
        {/* --- Background Atmosphere --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            
            {/* 1. Animated Gradient Blobs */}
            {/* Indigo Orb (Top Right) */}
            <motion.div 
               animate={{ 
                 x: [0, 80, -40, 0],
                 y: [0, -40, 40, 0],
                 scale: [1, 1.15, 0.95, 1],
                 opacity: [0.3, 0.45, 0.3]
               }}
               transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200/30 dark:bg-indigo-950/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 mix-blend-multiply dark:mix-blend-screen" 
            />
            
            {/* Pink/Rose Orb (Bottom Left) */}
            <motion.div 
               animate={{ 
                 x: [0, -60, 30, 0],
                 y: [0, 50, -30, 0],
                 scale: [0.95, 1.1, 1.02, 0.95],
                 opacity: [0.25, 0.4, 0.25]
               }}
               transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-200/20 dark:bg-rose-950/15 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 mix-blend-multiply dark:mix-blend-screen" 
            />

            {/* Amber Orb (Center Floating) */}
            <motion.div 
               animate={{ 
                 x: [0, 40, -40, 0],
                 y: [0, 30, -30, 0],
                 scale: [1, 0.9, 1.05, 1],
                 opacity: [0.15, 0.25, 0.15]
               }}
               transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-100/20 dark:bg-yellow-950/10 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen" 
            />

            {/* 2. Cinematic Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
            
            {/* 3. Noise Texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />
        </div>

        {/* --- Seamless Bottom Fade --- */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                
                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-right"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-950/20 backdrop-blur-md mb-8 shadow-sm transition-colors duration-300">
                        <Film size={16} className="text-indigo-600 dark:text-indigo-400 animate-pulse" />
                        <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 tracking-wide uppercase">AI Video Studio</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-tight leading-tight">
                        جادوی سینما
                        <br />
                        <span className="text-gradient-animated inline-block pb-2">
                            با یک جمله
                        </span>
                    </h1>

                    <p className="text-lg text-zinc-600 dark:text-gray-400 mb-10 leading-loose max-w-xl mx-auto lg:mx-0 font-light transition-colors duration-300">
                        با دسترسی به برترین مدل‌های جهان مثل <span className="text-zinc-900 dark:text-white font-bold">Sora 2</span>، <span className="text-zinc-900 dark:text-white font-bold">Kling</span> و <span className="text-zinc-900 dark:text-white font-bold">Veo</span>، ایده‌های خود را به ویدیوهای خیره‌کننده تبدیل کنید.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button 
                            externalHref="https://dash.lumai.ir/service/text-to-video" 
                            variant="primary"
                            className="bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-zinc-850 dark:hover:bg-zinc-100 shadow-lg shadow-zinc-950/10 dark:shadow-none border-none px-8 py-4"
                        >
                            شروع ساخت ویدیو
                            <Play size={20} className="fill-current" />
                        </Button>
                        <Button 
                            href="/gallery"
                            variant="secondary" 
                            className="bg-white dark:bg-white/5 hover:bg-[#FBFBFA] dark:hover:bg-white/10 border-zinc-200 dark:border-white/10 shadow-sm text-zinc-800 dark:text-zinc-200 px-8 py-4 transition-colors duration-300"
                        >
                            مشاهده گالری
                            <Sparkles size={20} className="text-indigo-600 dark:text-indigo-400" />
                        </Button>
                    </div>
                </motion.div>

                {/* Animation Container - Fixed Mobile Height */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    // Fix: Use h-[380px] on mobile to prevent squashing, aspect ratio only on large screens
                    className="relative w-full h-[400px] md:h-[450px] lg:h-auto lg:aspect-[16/10]" 
                >
                    <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-200/30 via-pink-200/30 to-transparent blur-3xl opacity-60 rounded-[40px] -z-10" />
                    <div className="w-full h-full shadow-xl shadow-zinc-350/10 dark:shadow-none rounded-[32px] overflow-hidden border border-zinc-250/20 dark:border-zinc-800/40">
                        <VideoHeroAnim />
                    </div>
                </motion.div>

            </div>
        </div>
    </section>
  );
};
