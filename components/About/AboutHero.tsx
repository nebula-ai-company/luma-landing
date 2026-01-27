
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Globe } from 'lucide-react';

const Gyroscope = () => {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center" style={{ perspective: '1000px' }}>
      
      {/* Core Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-luma-purple/20 via-luma-pink/20 to-luma-yellow/20 blur-[100px] rounded-full opacity-50" />

      {/* Core Orb */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-luma-purple via-luma-pink to-luma-yellow blur-md absolute z-10"
      />
      <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 absolute z-20 flex items-center justify-center shadow-[0_0_50px_rgba(218,143,255,0.3)]">
         <Globe size={40} className="text-white opacity-90" strokeWidth={1} />
      </div>

      {/* Ring 1 - Purple - Fast */}
      <motion.div
        className="absolute w-[280px] h-[280px] rounded-full border border-white/10 border-t-luma-purple border-l-luma-purple/30"
        animate={{ rotateX: [0, 360], rotateY: [0, 180], rotateZ: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
         <div className="absolute inset-0 rounded-full border border-white/5 transform scale-105" />
      </motion.div>

      {/* Ring 2 - Pink - Medium */}
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full border border-white/5 border-b-luma-pink border-r-luma-pink/30"
        animate={{ rotateX: [0, 180], rotateY: [0, 360], rotateZ: [0, -180] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
         <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-luma-pink rounded-full blur-[1px] shadow-[0_0_10px_#FF6482]" />
      </motion.div>

      {/* Ring 3 - Yellow - Slow */}
      <motion.div
        className="absolute w-[480px] h-[480px] rounded-full border border-white/5 border-t-luma-yellow/50"
        animate={{ rotateX: [0, -360], rotateY: [0, -180], rotateZ: [0, 90] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      />
      
      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
           key={i}
           className="absolute w-1 h-1 bg-white/80 rounded-full"
           animate={{
              x: [0, (Math.random() - 0.5) * 500],
              y: [0, (Math.random() - 0.5) * 500],
              opacity: [0, 1, 0],
              scale: [0, Math.random() * 2 + 0.5, 0]
           }}
           transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
           }}
        />
      ))}
    </div>
  );
};

export const AboutHero: React.FC = () => {
  return (
    <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-20 border-b border-white/5">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-luma-pink/5 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text Content (RTL: Right side visually) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-right order-2 lg:order-1"
        >
           <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
           >
              <Users size={16} className="text-luma-purple" />
              <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">درباره لوما</span>
           </motion.div>

           <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              ما آینده را <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow animate-text-flow bg-[length:200%_auto]">
                 طراحی می‌کنیم
              </span>
           </h1>

           <p className="text-lg text-gray-400 mb-10 leading-loose font-light max-w-xl mx-auto lg:mx-0">
              لوما فراتر از یک پلتفرم هوش مصنوعی است. ما تیمی از رویاپردازان، مهندسان و هنرمندان هستیم که با هدف شکستن مرزهای خلاقیت گرد هم آمده‌ایم.
           </p>

           <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto lg:mx-0">
              {[
                 { icon: Target, label: "هدف ما", desc: "دموکراسی‌سازی خلاقیت" },
                 { icon: Lightbulb, label: "باور ما", desc: "ترکیب هنر و تکنولوژی" }
              ].map((item, i) => (
                 <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl text-right group hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 rounded-lg bg-white/5 text-luma-purple group-hover:scale-110 transition-transform">
                          <item.icon size={18} />
                       </div>
                       <span className="font-bold text-white text-sm">{item.label}</span>
                    </div>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                 </div>
              ))}
           </div>
        </motion.div>

        {/* Right: Gyroscope Animation */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="order-1 lg:order-2 flex items-center justify-center h-[600px] w-full"
        >
           <Gyroscope />
        </motion.div>

      </div>
    </section>
  );
};
