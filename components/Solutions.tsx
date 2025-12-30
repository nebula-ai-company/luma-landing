
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, Star, Zap, ScanLine, ArrowRight, Menu as MenuIcon, Search, Shirt, Camera } from 'lucide-react';
import Button from './Button';

const Solutions: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'complete'>('idle');
  
  // Animation Loop
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    const runCycle = () => {
      setPhase('idle');
      
      // Start Scanning after delay
      timeout = setTimeout(() => {
        setPhase('scanning');
        
        // Complete after scan duration
        setTimeout(() => {
            setPhase('complete');
            
            // Restart loop
            setTimeout(() => {
                runCycle();
            }, 6000); // Hold result for 6s
        }, 2500); // Scan duration 2.5s (slower is more premium)
      }, 3000); // Hold idle for 3s
    };

    runCycle();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="solutions" className="py-32 relative overflow-hidden bg-[#030303]">
      
      {/* --- SMOOTH TRANSITION MASKS --- */}
      {/* Top Fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

      {/* --- PROFESSIONAL ANIMATED BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* 1. Base Dark Layer */}
          <div className="absolute inset-0 bg-[#050505]" />
          
          {/* 2. Animated Ambient Orbs (Brand Colors) */}
          
          {/* Purple Glow - Top Left */}
          <motion.div 
            animate={{ 
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-luma-purple/30 rounded-full blur-[120px] mix-blend-screen"
          />
          
          {/* Pink Glow - Center Right */}
          <motion.div 
            animate={{ 
                x: [0, -100, 0],
                y: [0, -50, 0],
                scale: [1.2, 1, 1.2],
                opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] -right-[20%] w-[800px] h-[800px] bg-luma-pink/20 rounded-full blur-[120px] mix-blend-screen"
          />

           {/* Yellow Glow - Bottom Left */}
           <motion.div 
            animate={{ 
                x: [-50, 50, -50],
                y: [0, -30, 0],
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.25, 0.1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-[20%] left-[10%] w-[900px] h-[600px] bg-luma-yellow/15 rounded-full blur-[100px] mix-blend-screen"
          />
          
          {/* 3. Technical Grid & Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-luma-purple text-xs font-bold mb-6 hover:bg-white/10 transition-colors cursor-default"
            >
                <Sparkles size={12} />
                <span>مخصوص فروشگاه‌های اینترنتی</span>
            </motion.div>

            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-black text-white leading-tight mb-8"
            >
                انقلاب در عکاسی محصول
                <br />
                {/* CORRECTED GRADIENT: Purple -> Pink -> Yellow */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DA8FFF] via-[#FF6482] to-[#FFB340]">
                    بدون نیاز به استودیو
                </span>
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-gray-300 leading-relaxed font-light"
            >
                ابزارهای هوش مصنوعی ما مستقیماً روی سایت شما می‌نشینند و تصاویر ساده لباس‌ها را به مدل‌های زنده و جذاب تبدیل می‌کنند.
            </motion.p>
        </div>

        {/* Browser Window Simulation */}
        <div className="relative mx-auto max-w-5xl">
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-[#0F0F0F] ring-1 ring-white/5"
            >
                {/* Browser Title Bar */}
                <div className="h-12 border-b border-white/5 bg-[#1a1a1a] flex items-center px-4 gap-4 select-none">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    {/* Fake URL Bar */}
                    <div className="flex-1 max-w-lg mx-auto bg-black/40 rounded-lg h-7 flex items-center justify-center text-[10px] text-gray-500 font-mono border border-white/5 opacity-60">
                        mystore.com/products/classic-tee
                    </div>
                </div>

                {/* MOCK WEBSITE CONTENT */}
                <div className="bg-white text-black min-h-[600px] md:min-h-[500px] flex flex-col font-sans relative overflow-hidden">
                    
                    {/* Mock Nav */}
                    <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white z-20 relative select-none">
                        <div className="flex items-center gap-6">
                            <MenuIcon size={20} className="text-gray-400" />
                            <span className="text-xl font-bold tracking-tighter">MY<span className="text-luma-purple">STORE</span></span>
                        </div>
                        <div className="flex items-center gap-6 text-gray-400">
                            <Search size={20} />
                            <div className="relative">
                                <ShoppingBag size={20} />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Product Page Layout */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
                        
                        {/* LEFT COLUMN: Product Image (The Magic Zone) */}
                        <div className="bg-gray-50 p-8 md:p-12 flex items-center justify-center relative overflow-hidden group">
                            
                            {/* Main Image Container - Key for centering */}
                            <div className="relative w-full aspect-[3/4] max-w-md mx-auto shadow-2xl shadow-gray-200 rounded-xl overflow-hidden bg-white ring-1 ring-black/5 transform transition-transform duration-700 hover:scale-[1.01]">
                                
                                {/* 1. Boring Original Image (Flat Lay) */}
                                <div className="absolute inset-0 flex items-center justify-center bg-[#f4f4f5]">
                                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
                                    <img 
                                        src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop"
                                        alt="Original Flat Lay" 
                                        className="w-[85%] object-contain mix-blend-multiply opacity-90 transition-opacity duration-500"
                                        style={{ opacity: phase === 'complete' ? 0 : 0.9 }}
                                    />
                                    
                                    <motion.div 
                                        animate={{ opacity: phase === 'complete' ? 0 : 1 }}
                                        className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-gray-200 flex items-center gap-2"
                                    >
                                        <Camera size={12} />
                                        <span>Original</span>
                                    </motion.div>
                                </div>

                                {/* 2. Transformed Image (Model) - Revealed by ClipPath */}
                                <motion.div 
                                    className="absolute inset-0 bg-white"
                                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                                    animate={{ 
                                        clipPath: phase === 'idle' ? "inset(0 100% 0 0)" : "inset(0 0 0 0)" 
                                    }}
                                    transition={{ 
                                        duration: 2.5, 
                                        ease: [0.22, 1, 0.36, 1], // Custom ease for premium feel
                                    }}
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1587&auto=format&fit=crop"
                                        alt="AI Generated Model" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40" />
                                    
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.5 }}
                                        className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5 border border-white/10"
                                    >
                                        <Sparkles size={10} className="text-luma-purple" />
                                        <span>Luma Generated</span>
                                    </motion.div>
                                </motion.div>

                                {/* 3. The Scanning Line - More elaborate now */}
                                <motion.div
                                    className="absolute top-0 bottom-0 w-[4px] z-20"
                                    initial={{ left: "0%", opacity: 0 }}
                                    animate={{ 
                                        left: phase === 'scanning' ? ["0%", "100%"] : "100%",
                                        opacity: phase === 'scanning' ? 1 : 0
                                    }}
                                    transition={{ 
                                        duration: 2.5, 
                                        ease: [0.22, 1, 0.36, 1] 
                                    }}
                                >
                                    {/* The glowing bar */}
                                    <div className="absolute inset-y-0 left-0 w-full bg-white shadow-[0_0_25px_4px_rgba(255,255,255,0.7)]" />
                                    
                                    {/* Leading Purple Edge */}
                                    <div className="absolute inset-y-0 -left-[2px] w-[2px] bg-luma-purple" />

                                    {/* Trailing Gradient (The 'Scan' Light) - Fixed skew issue */}
                                    <div className="absolute inset-y-0 -left-48 w-48 bg-gradient-to-r from-transparent via-luma-purple/10 to-luma-purple/50" />
                                    
                                    {/* Sparkles on the scanner */}
                                    {phase === 'scanning' && (
                                        <div className="absolute top-1/2 left-0 w-1 h-1">
                                            <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full animate-ping" />
                                            <div className="absolute -top-10 left-0 w-1 h-1 bg-luma-purple rounded-full animate-ping delay-75" />
                                            <div className="absolute top-20 left-0 w-1 h-1 bg-luma-pink rounded-full animate-ping delay-150" />
                                        </div>
                                    )}
                                </motion.div>
                                
                                {/* 4. Floating "Magic" Button - Now Centered properly */}
                                <AnimatePresence>
                                    {phase === 'idle' && (
                                        <motion.div 
                                            key="trigger-btn"
                                            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                                            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", x: "-50%", y: "-50%" }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="absolute top-1/2 left-1/2 z-30"
                                        >
                                            <button className="group relative">
                                                <div className="absolute inset-0 bg-luma-purple/50 rounded-full blur-xl animate-pulse" />
                                                <div className="relative bg-[#1a1a1a] text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/20 group-hover:scale-105 transition-transform duration-300 ring-4 ring-black/10">
                                                    <div className="relative">
                                                        <Zap size={18} className="text-luma-yellow group-hover:animate-bounce" fill="currentColor" />
                                                        <div className="absolute inset-0 blur-sm bg-luma-yellow/50 opacity-50" />
                                                    </div>
                                                    <span className="font-bold text-sm whitespace-nowrap tracking-wide">تبدیل با هوش مصنوعی</span>
                                                </div>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>

                        </div>

                        {/* RIGHT COLUMN: Product Details (Static UI) */}
                        <div className="p-8 md:p-12 flex flex-col justify-center text-right dir-rtl" style={{ direction: 'rtl' }}>
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} className="text-gray-200" fill="#e5e7eb" />
                                <span className="text-xs text-gray-400 font-medium mr-2 font-mono mt-0.5">(4.0)</span>
                            </div>

                            <h3 className="text-3xl font-black mb-3 tracking-tight text-gray-900">تی‌شرت نخی کلاسیک</h3>
                            <p className="text-gray-500 mb-8 text-sm leading-7">
                                با طراحی مینیمال و پارچه ۱۰۰٪ پنبه ارگانیک، این تی‌شرت ترکیبی از راحتی و استایل مدرن است. مناسب برای استفاده روزمره با دوام بالا.
                            </p>

                            <div className="text-3xl font-bold mb-8 flex items-end gap-2 text-gray-900">
                                ۹۵۰,۰۰۰ <span className="text-sm font-medium text-gray-500 mb-1.5">تومان</span>
                            </div>

                            {/* Size Selector */}
                            <div className="mb-6">
                                <div className="flex justify-between mb-3">
                                   <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">راهنمای سایز</span>
                                   <span className="text-xs font-bold uppercase text-gray-900 tracking-wider">انتخاب سایز</span>
                                </div>
                                <div className="flex gap-3 justify-end">
                                    {['S', 'M', 'L', 'XL'].map((size, i) => (
                                        <div key={size} className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-sm cursor-pointer transition-all duration-200 ${i === 1 ? 'border-black bg-black text-white shadow-lg shadow-black/20' : 'border-gray-100 text-gray-400 hover:border-gray-300 hover:text-gray-600'}`}>
                                            {size}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selector */}
                            <div className="mb-8">
                                <span className="text-xs font-bold uppercase text-gray-900 mb-3 block text-left">Color</span>
                                <div className="flex gap-3 justify-end">
                                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] ring-2 ring-offset-2 ring-gray-200 cursor-pointer shadow-sm hover:scale-110 transition-transform" />
                                    <div className="w-10 h-10 rounded-full bg-[#9ca3af] cursor-pointer hover:scale-110 transition-transform border border-gray-200" />
                                    <div className="w-10 h-10 rounded-full bg-[#1e3a8a] cursor-pointer hover:scale-110 transition-transform border border-gray-200" />
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <button className="group w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-black/10 active:scale-95">
                                <span className="group-hover:mr-1 transition-all">افزودن به سبد خرید</span>
                                <ShoppingBag size={20} />
                            </button>
                            
                            <div className="mt-6 flex items-center justify-center gap-6 text-gray-400 grayscale opacity-70">
                                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
                                    <div className="w-1 h-1 rounded-full bg-gray-400" />
                                    ارسال رایگان
                                </div>
                                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
                                    <div className="w-1 h-1 rounded-full bg-gray-400" />
                                    ضمانت بازگشت
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Solutions;
