
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Film } from 'lucide-react';
import Button from '../../Button';
import { VideoHeroAnim } from './VideoHeroAnim';

export const VideoHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0a0a0a]">
        
        {/* --- Background Atmosphere --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            
            {/* 1. Animated Gradient Blobs */}
            {/* Purple Orb (Top Right) */}
            <motion.div 
               animate={{ 
                 x: [0, 100, -50, 0],
                 y: [0, -50, 50, 0],
                 scale: [1, 1.2, 0.9, 1],
                 opacity: [0.15, 0.25, 0.15]
               }}
               transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 mix-blend-screen" 
            />
            
            {/* Pink Orb (Bottom Left) */}
            <motion.div 
               animate={{ 
                 x: [0, -80, 40, 0],
                 y: [0, 60, -40, 0],
                 scale: [0.9, 1.1, 1, 0.9],
                 opacity: [0.15, 0.25, 0.15]
               }}
               transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 mix-blend-screen" 
            />

            {/* Yellow Orb (Center Floating) */}
            <motion.div 
               animate={{ 
                 x: [0, 50, -50, 0],
                 y: [0, 40, -40, 0],
                 scale: [1, 0.8, 1.1, 1],
                 opacity: [0.1, 0.2, 0.1]
               }}
               transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-luma-yellow/10 rounded-full blur-[140px] mix-blend-screen" 
            />

            {/* 2. Cinematic Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
            
            {/* 3. Noise Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
        </div>

        {/* --- Seamless Bottom Fade --- */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                
                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-right"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 backdrop-blur-md mb-8 shadow-lg shadow-luma-purple/10">
                        <Film size={16} className="text-luma-purple animate-pulse" />
                        <span className="text-[11px] font-bold text-luma-purple tracking-wide uppercase">AI Video Studio</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
                        جادوی سینما
                        <br />
                        <span className="text-gradient-animated inline-block pb-2">
                            با یک جمله
                        </span>
                    </h1>

                    <p className="text-lg text-gray-400 mb-10 leading-loose max-w-xl mx-auto lg:mx-0 font-light">
                        با دسترسی به برترین مدل‌های جهان مثل <span className="text-white font-bold">Sora 2</span>، <span className="text-white font-bold">Kling</span> و <span className="text-white font-bold">Veo</span>، ایده‌های خود را به ویدیوهای خیره‌کننده تبدیل کنید.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button 
                            externalHref="https://lumai.ir/dashboard" 
                            variant="primary"
                            className="bg-white text-black hover:bg-gray-200 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] border-none px-8 py-4"
                        >
                            شروع ساخت ویدیو
                            <Play size={20} className="fill-black" />
                        </Button>
                        <Button variant="secondary" className="hover:bg-white/5 border-white/10 px-8 py-4">
                            مشاهده گالری
                            <Sparkles size={20} />
                        </Button>
                    </div>
                </motion.div>

                {/* Animation Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full aspect-video lg:aspect-[16/10]" // Slightly taller for the UI
                >
                    <div className="absolute -inset-1 bg-gradient-to-tr from-luma-purple/20 via-pink-500/20 to-transparent blur-3xl opacity-50 rounded-[40px] -z-10" />
                    <div className="w-full h-full shadow-2xl shadow-black rounded-[32px] overflow-hidden border border-white/10">
                        <VideoHeroAnim />
                    </div>
                </motion.div>

            </div>
        </div>
    </section>
  );
};
