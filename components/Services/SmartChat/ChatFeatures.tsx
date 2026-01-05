
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, MousePointer2, Cpu, Zap, Brain, Sparkles, 
  Terminal, Layout, BarChart3, CloudSun, Activity, 
  CheckCircle2, Search, ArrowRight, Lock, Check
} from 'lucide-react';

// --- VISUAL 1: ARTIFACTS (Split Screen IDE) ---
const ArtifactsVisual = () => {
  const [step, setStep] = useState(0);

  // Cycle: 0=Typing, 1=Building, 2=Complete, 3=Reset
  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#080808] rounded-xl overflow-hidden border border-white/5 flex flex-col shadow-2xl">
      
      {/* IDE Header */}
      <div className="h-9 bg-[#121212] border-b border-white/5 flex items-center justify-between px-3 shrink-0">
         <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
         </div>
         <div className="flex bg-black/50 rounded-md px-2 py-0.5 gap-2 border border-white/5">
            <span className="text-[9px] text-gray-500 font-mono">MyComponent.tsx</span>
         </div>
      </div>

      <div className="flex-1 flex flex-row overflow-hidden">
         {/* Left: Code Editor */}
         <div className="w-1/2 bg-[#0c0c0e] border-r border-white/5 p-4 font-mono text-[9px] leading-relaxed text-gray-400 relative overflow-hidden dir-ltr text-left">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#111] border-r border-white/5 flex flex-col items-center pt-4 gap-2 text-gray-700 select-none">
               <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
            </div>
            <div className="pl-8">
               <span className="text-luma-purple">export default</span> <span className="text-luma-pink">function</span> <span className="text-luma-yellow">StatsCard</span>() {'{'} <br/>
               &nbsp;&nbsp;<span className="text-luma-purple">return</span> (<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-luma-pink">div</span> className="<span className="text-green-400">card</span>"&gt;<br/>
               {step >= 1 && (
                 <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-luma-pink">h3</span>&gt;Revenue&lt;/<span className="text-luma-pink">h3</span>&gt;<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-luma-pink">div</span> className="<span className="text-green-400">value</span>"&gt;<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$45,200<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-luma-pink">div</span>&gt;<br/>
                 </motion.span>
               )}
               &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-luma-pink">div</span>&gt;<br/>
               &nbsp;&nbsp;);<br/>
               {'}'}
               {step === 0 && <motion.div className="w-1.5 h-3 bg-luma-yellow inline-block ml-1 animate-pulse" />}
            </div>
         </div>

         {/* Right: Live Preview */}
         <div className="w-1/2 bg-[#050505] relative flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
            
            <AnimatePresence mode="wait">
               {step >= 1 && (
                  <motion.div 
                     key="widget"
                     initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                     animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                     exit={{ scale: 1.1, opacity: 0 }}
                     transition={{ type: "spring", bounce: 0.5 }}
                     className="w-full aspect-[4/3] bg-[#151515] border border-white/10 rounded-xl p-4 shadow-2xl relative overflow-hidden group"
                  >
                     <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity size={48} className="text-luma-purple" />
                     </div>
                     <div className="h-full flex flex-col justify-between relative z-10">
                        <div>
                           <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Revenue</div>
                           <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="text-2xl font-black text-white"
                           >
                              $45,200
                           </motion.div>
                        </div>
                        {step >= 2 && (
                           <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: "100%" }}
                              className="h-16 flex items-end gap-1"
                           >
                              {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                 <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.1, type: "spring" }}
                                    className="flex-1 bg-gradient-to-t from-luma-purple/20 to-luma-purple rounded-t-sm opacity-80"
                                 />
                              ))}
                           </motion.div>
                        )}
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
};

// --- VISUAL 2: MANUAL SELECTION (Model Picker Simulation) ---
const SelectionVisual = () => {
  const [activeModelId, setActiveModelId] = useState('claude');
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 70 });
  const [isClicking, setIsClicking] = useState(false);

  const MODELS = [
    { id: 'claude', name: 'Claude 3.7', tag: 'Coding Pro', color: 'text-luma-purple', border: 'border-luma-purple', bg: 'bg-luma-purple', icon: Terminal },
    { id: 'gpt5', name: 'GPT-5', tag: 'Creative & Logic', color: 'text-luma-pink', border: 'border-luma-pink', bg: 'bg-luma-pink', icon: Brain },
    { id: 'gemini', name: 'Gemini 3 Pro', tag: 'Data Analysis', color: 'text-white', border: 'border-white', bg: 'bg-white', icon: Search },
  ];

  // Simulation Sequence
  useEffect(() => {
    const sequence = async () => {
      while(true) {
        // 1. Move to Claude
        setCursorPos({ x: 50, y: 70 }); 
        await new Promise(r => setTimeout(r, 1000));
        setIsClicking(true);
        setActiveModelId('claude');
        await new Promise(r => setTimeout(r, 200));
        setIsClicking(false);
        await new Promise(r => setTimeout(r, 2000));

        // 2. Move to GPT-5
        setCursorPos({ x: 50, y: 150 }); 
        await new Promise(r => setTimeout(r, 1000));
        setIsClicking(true);
        setActiveModelId('gpt5');
        await new Promise(r => setTimeout(r, 200));
        setIsClicking(false);
        await new Promise(r => setTimeout(r, 2000));

        // 3. Move to Gemini
        setCursorPos({ x: 50, y: 230 }); 
        await new Promise(r => setTimeout(r, 1000));
        setIsClicking(true);
        setActiveModelId('gemini');
        await new Promise(r => setTimeout(r, 200));
        setIsClicking(false);
        await new Promise(r => setTimeout(r, 2000));
      }
    };
    sequence();
  }, []);

  return (
    <div className="relative w-full h-full bg-[#050505] rounded-xl overflow-hidden border border-white/5 flex flex-col p-6">
       
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />

       {/* Cursor */}
       <motion.div
          animate={{ left: `${cursorPos.x}%`, top: cursorPos.y, scale: isClicking ? 0.9 : 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute z-50 pointer-events-none drop-shadow-2xl"
       >
          <MousePointer2 
            className="w-6 h-6 fill-white text-black stroke-[1.5px]" 
            style={{ transform: 'rotate(-25deg)' }}
          />
       </motion.div>

       {/* Top Status Bar */}
       <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-white/20" />
             <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                Select Model
             </span>
          </div>
       </div>

       {/* The List */}
       <div className="flex-1 flex flex-col gap-3 relative z-10">
          {MODELS.map((model) => {
             const isActive = activeModelId === model.id;

             return (
                <motion.div
                   key={model.id}
                   animate={{ 
                      scale: isActive ? 1.02 : 1,
                      backgroundColor: isActive ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0)',
                      borderColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                   }}
                   className={`relative w-full border rounded-2xl flex items-center p-3 gap-4 transition-all duration-300 overflow-hidden`}
                >
                   {/* Active Glow (Placed first to be behind text with z-0) */}
                   {isActive && (
                      <motion.div 
                         layoutId="glow"
                         className={`absolute inset-0 pointer-events-none z-0 ${model.bg}`}
                         style={{ opacity: 0.1 }}
                         initial={false}
                         transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                   )}

                   {/* Selection Indicator */}
                   <div className={`
                      w-5 h-5 rounded-full border flex items-center justify-center transition-colors relative z-10
                      ${isActive ? `${model.bg} ${model.border}` : 'border-white/10'}
                   `}>
                      {isActive && <Check size={12} className="text-black" />}
                   </div>

                   {/* Icon */}
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 relative z-10 ${isActive ? 'bg-white/5' : 'bg-[#0a0a0a]'}`}>
                      <model.icon size={20} className={isActive ? model.color : 'text-gray-600'} />
                   </div>

                   {/* Text */}
                   <div className="flex-1 relative z-10">
                      <div className="flex items-center gap-2">
                         <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>{model.name}</span>
                         {isActive && (
                            <motion.span 
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${model.bg.replace('bg-', 'bg-opacity-20 text-')}`}
                            >
                               {model.tag}
                            </motion.span>
                         )}
                      </div>
                   </div>
                </motion.div>
             );
          })}
       </div>

    </div>
  );
};

const FEATURES = [
  {
    id: 'artifacts',
    title: "محیط کدنویسی زنده (Artifacts)",
    subtitle: "اجرا و پیش‌نمایش آنی",
    desc: "چت‌بات لوما فقط متن تولید نمی‌کند. کدها را در یک پنل اختصاصی اجرا کنید، خروجی را ببینید و با یک کلیک ویرایش کنید.",
    icon: Code2,
    color: "text-luma-yellow",
    gradient: "from-luma-yellow/10 to-transparent",
    border: "group-hover:border-luma-yellow/30",
    shadow: "group-hover:shadow-luma-yellow/10",
    visual: <ArtifactsVisual />
  },
  {
    id: 'selection',
    title: "انتخاب آزادانه مدل‌ها",
    subtitle: "کنترل کامل در دستان شما",
    desc: "برخلاف سیستم‌های محدود، در لوما شما تصمیم می‌گیرید که با کدام هوش مصنوعی صحبت کنید. برای کدنویسی از Claude، برای خلاقیت از GPT-5 و برای تحلیل از Gemini استفاده کنید.",
    icon: MousePointer2,
    color: "text-luma-purple",
    gradient: "from-luma-purple/10 to-transparent",
    border: "group-hover:border-luma-purple/30",
    shadow: "group-hover:shadow-luma-purple/10",
    visual: <SelectionVisual />
  }
];

export const ChatFeatures: React.FC = () => {
  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-luma-purple/5 blur-[120px] rounded-full -translate-y-1/2" />
         <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-luma-yellow/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                فراتر از <span className="text-transparent bg-clip-text bg-gradient-to-r from-luma-purple to-luma-pink inline-block border-b-4 border-luma-purple/20 pb-1">متن خالی</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                قابلیت‌هایی که چت‌بات معمولی را به یک دستیار تمام‌عیار تبدیل می‌کنند.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {FEATURES.map((feat, i) => (
                <motion.div 
                    key={feat.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    className={`
                        relative bg-[#0c0c0e] rounded-[32px] p-px overflow-hidden group cursor-default transition-transform duration-500 hover:-translate-y-2
                    `}
                >
                    {/* Gradient Border */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Inner Card */}
                    <div className="relative h-full bg-[#0c0c0e] rounded-[31px] p-8 flex flex-col border border-white/5 group-hover:border-white/10 transition-colors">
                        
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider mb-2 block ${feat.color} opacity-80`}>{feat.subtitle}</span>
                                <h3 className="text-2xl font-bold text-white leading-tight">{feat.title}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform shadow-lg ${feat.color}`}>
                                <feat.icon size={24} />
                            </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 h-16 font-light">
                            {feat.desc}
                        </p>
                        
                        {/* Visual Container */}
                        <div className="relative mt-auto w-full aspect-[16/9] bg-[#050505] rounded-2xl overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors shadow-inner">
                            <div className="absolute inset-0 z-10">
                                {feat.visual}
                            </div>
                        </div>

                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
