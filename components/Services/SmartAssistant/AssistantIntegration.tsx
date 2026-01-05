
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, LayoutTemplate, MessageSquare, X, Send, 
  ShoppingBag, Search, Menu, MousePointer2, User, Sparkles, Copy
} from 'lucide-react';
import Button from '../../Button';

// --- Types ---
type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  isTyping?: boolean;
};

// --- Sub-Component: Browser Frame ---
const BrowserFrame = ({ url, children, className = "" }: { url: string, children?: React.ReactNode, className?: string }) => (
  <div className={`bg-[#121212] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col ${className}`}>
    {/* Browser Header */}
    <div className="h-10 bg-[#1a1a1a] border-b border-white/5 flex items-center px-4 gap-4 shrink-0">
       <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
       </div>
       <div className="flex-1 bg-[#0a0a0a] h-6 rounded-md border border-white/5 flex items-center justify-center text-[10px] text-gray-500 font-mono relative overflow-hidden group">
          <Globe size={10} className="mr-1.5 opacity-50" />
          {url}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-green-500 rounded-full" />
       </div>
    </div>
    {/* Browser Body */}
    <div className="flex-1 relative overflow-hidden bg-white/5">
       {children}
    </div>
  </div>
);

// --- Content: Dedicated Page Simulation ---
const DedicatedPageSim = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotThinking, setIsBotThinking] = useState(false);

  useEffect(() => {
    // Scenario: User asks price -> Bot answers
    const scenario = async () => {
        // 1. Initial State
        await new Promise(r => setTimeout(r, 800));
        
        // 2. User Types
        const question = "هزینه ارسال چقدره؟";
        for (let i = 0; i <= question.length; i++) {
            setInputValue(question.slice(0, i));
            await new Promise(r => setTimeout(r, 50));
        }
        await new Promise(r => setTimeout(r, 400));

        // 3. User Sends
        setMessages([{ id: 1, text: question, sender: 'user' }]);
        setInputValue("");
        setIsBotThinking(true);

        // 4. Bot Thinks
        await new Promise(r => setTimeout(r, 1500));
        setIsBotThinking(false);

        // 5. Bot Types/Streams
        const answer = "برای سفارش‌های بالای ۲ میلیون تومان رایگان است.";
        setMessages(prev => [...prev, { id: 2, text: "", sender: 'bot', isTyping: true }]);
        
        for (let i = 0; i <= answer.length; i++) {
            setMessages(prev => prev.map(m => m.id === 2 ? { ...m, text: answer.slice(0, i) } : m));
            await new Promise(r => setTimeout(r, 30));
        }
        setMessages(prev => prev.map(m => m.id === 2 ? { ...m, isTyping: false } : m));
    };

    scenario();
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col relative overflow-hidden font-sans">
       
       {/* Header */}
       <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-luma-purple to-luma-pink p-0.5">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                   <div className="w-3 h-3 bg-white rounded-full" />
                </div>
             </div>
             <div className="flex flex-col">
                <span className="text-sm font-bold text-white">فرنام چت</span>
                <span className="text-[9px] text-green-500">پاسخگوی هوشمند</span>
             </div>
          </div>
       </div>

       {/* Chat Area */}
       <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {/* Welcome Message */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
             <div className="bg-[#1a1a1a] border border-white/5 text-gray-300 text-xs py-3 px-4 rounded-2xl rounded-tr-sm max-w-[80%] leading-relaxed dir-rtl text-right">
                سلام! 👋 چطور می‌تونم کمکتون کنم؟
             </div>
          </motion.div>

          {/* Dynamic Messages */}
          {messages.map((msg) => (
             <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
             >
                <div className={`
                    text-xs py-3 px-4 rounded-2xl max-w-[80%] leading-relaxed dir-rtl text-right
                    ${msg.sender === 'user' 
                       ? 'bg-luma-purple text-black rounded-tl-sm font-bold' 
                       : 'bg-[#1a1a1a] border border-white/5 text-gray-200 rounded-tr-sm'}
                `}>
                   {msg.text}
                   {msg.isTyping && <span className="inline-block w-1.5 h-3 bg-white ml-1 align-middle animate-pulse"/>}
                </div>
             </motion.div>
          ))}

          {/* Thinking Indicator */}
          {isBotThinking && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-[#1a1a1a] border border-white/5 py-3 px-4 rounded-2xl rounded-tr-sm flex gap-1">
                   <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                   <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100" />
                   <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200" />
                </div>
             </motion.div>
          )}
       </div>
  
       {/* Footer Input */}
       <div className="p-4 border-t border-white/5 bg-[#0a0a0a]">
          <div className="h-12 bg-[#151515] rounded-xl border border-white/10 flex items-center px-4 justify-between gap-3">
             <div className="w-8 h-8 rounded-lg bg-luma-purple text-black flex items-center justify-center shrink-0">
                <Send size={16} />
             </div>
             <div className="flex-1 text-right text-xs text-white dir-rtl truncate">
                {inputValue || <span className="text-gray-600">پیام خود را بنویسید...</span>}
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Content: Widget Simulation (Online Shop) ---
const WidgetPageSim = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [isHoveringProduct, setIsHoveringProduct] = useState(false);

  useEffect(() => {
     const scenario = async () => {
        // 0. Initial scroll
        
        // 1. Mouse moves to product (Simulated by container hover state in animation)
        await new Promise(r => setTimeout(r, 1000));
        setIsHoveringProduct(true);
        await new Promise(r => setTimeout(r, 1000));
        setIsHoveringProduct(false);

        // 2. Open Widget
        await new Promise(r => setTimeout(r, 500));
        setIsOpen(true);

        // 3. Bot Typing
        await new Promise(r => setTimeout(r, 600));
        setMessages([{ id: 'typing', type: 'typing' }]);
        
        // 4. Bot Message
        await new Promise(r => setTimeout(r, 1500));
        setMessages([
            { id: 1, text: "سلام! 👋", type: 'text' },
            { id: 2, text: "دنبال کفش خاصی می‌گردید؟", type: 'text' }
        ]);
     };
     scenario();
  }, []);

  return (
    <div className="w-full h-full bg-white relative flex flex-col font-sans select-none overflow-hidden">
       {/* Simulated Mouse Cursor */}
       <motion.div 
          className="absolute z-50 pointer-events-none drop-shadow-xl"
          initial={{ top: "110%", left: "50%", opacity: 1 }}
          animate={{ 
             top: ["110%", "40%", "40%", "calc(100% - 50px)"], 
             left: ["50%", "25%", "25%", "calc(100% - 50px)"], // Targets Bottom-Right
             scale: [1, 1, 0.9, 1],
          }}
          transition={{ 
             duration: 3, 
             times: [0, 0.3, 0.6, 1],
             ease: "easeInOut" 
          }}
       >
          <MousePointer2 className="text-black fill-white w-6 h-6" />
       </motion.div>

       {/* Fake Navbar */}
       <div className="h-14 border-b flex items-center justify-between px-6 bg-white shrink-0 z-10 relative">
          <div className="font-black text-xl tracking-tighter">NIKE</div>
          <div className="flex gap-4 text-gray-400">
             <Search size={18} />
             <ShoppingBag size={18} />
             <Menu size={18} />
          </div>
       </div>

       {/* Shop Content (Scrolls) */}
       <motion.div 
          className="flex-1 p-6 relative"
          animate={{ y: [0, -50] }}
          transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
       >
          <div className="flex gap-6 mb-8">
             <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-black text-gray-900 leading-none">AIR MAX<br/><span className="text-gray-400">2025</span></h1>
                <div className="px-4 py-2 bg-black text-white text-xs font-bold rounded-full w-fit">خرید کنید</div>
             </div>
             <div className="w-32 h-32 bg-gray-100 rounded-full mix-blend-multiply" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             {/* Product Card 1 (Right in RTL - Not target) */}
             <div className="aspect-[3/4] bg-gray-100 rounded-xl" />
             
             {/* Product Card 2 (Left in RTL - Target) */}
             <motion.div 
                animate={{ scale: isHoveringProduct ? 1.05 : 1 }}
                className="aspect-[3/4] bg-gray-100 rounded-xl relative overflow-hidden"
             >
                {isHoveringProduct && <div className="absolute inset-0 bg-black/5" />}
             </motion.div>
             
             <div className="aspect-[3/4] bg-gray-100 rounded-xl" />
             <div className="aspect-[3/4] bg-gray-100 rounded-xl" />
          </div>
       </motion.div>

       {/* --- The Widget (Bottom Right) --- */}
       {/* 'items-start' in RTL Flex column aligns items to the RIGHT side */}
       <div className="absolute bottom-6 right-6 z-20 flex flex-col items-start gap-4">
          
          {/* Popup Window */}
          <AnimatePresence>
             {isOpen && (
                <motion.div
                   initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.8, y: 20 }}
                   className="w-[260px] h-[320px] bg-[#1a1a1a] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden origin-bottom-right"
                >
                   {/* Chat Header */}
                   <div className="h-12 bg-luma-purple flex items-center justify-between px-4">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                         <span className="text-xs font-bold text-white">پشتیبانی آنلاین</span>
                      </div>
                      <X size={14} className="text-white/80 cursor-pointer" />
                   </div>
                   
                   {/* Messages */}
                   <div className="flex-1 p-4 space-y-3 bg-[#111] overflow-y-auto">
                      {messages.map((msg, i) => (
                         <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="flex flex-col gap-1 items-start"
                         >
                            {msg.type === 'typing' ? (
                               <div className="bg-[#222] px-3 py-2 rounded-xl rounded-tl-none flex gap-1">
                                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100" />
                                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200" />
                               </div>
                            ) : (
                               <div className="bg-[#222] text-gray-200 text-[10px] p-3 rounded-xl rounded-tl-none text-right dir-rtl leading-relaxed">
                                  {msg.text}
                               </div>
                            )}
                         </motion.div>
                      ))}
                   </div>

                   {/* Input */}
                   <div className="p-3 border-t border-white/10 bg-[#151515]">
                      <div className="h-8 bg-[#0a0a0a] rounded-lg border border-white/5 flex items-center px-2">
                         <span className="text-[8px] text-gray-600">نوشتن پیام...</span>
                      </div>
                   </div>
                </motion.div>
             )}
          </AnimatePresence>

          {/* Launcher Button */}
          <motion.button
             animate={isOpen ? { scale: 0.9, rotate: -90 } : { scale: 1, rotate: 0 }}
             className="w-14 h-14 bg-luma-purple rounded-full flex items-center justify-center shadow-lg shadow-luma-purple/30 z-30 relative"
          >
             {/* Notification Badge */}
             {!isOpen && (
                <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 2 }}
                   className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
                />
             )}
             {isOpen ? <X size={24} className="text-white" /> : <MessageSquare size={24} className="text-white fill-white" />}
          </motion.button>
       </div>
    </div>
  );
}

export const AssistantIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dedicated' | 'widget'>('dedicated');
  // Auto-play duration in ms - longer to allow full scenario
  const DURATION = 10000; 

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveTab(prev => prev === 'dedicated' ? 'widget' : 'dedicated');
    }, DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
       
       <div className="max-w-screen-xl mx-auto px-4 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             {/* Left Column: Text & Controls */}
             <div>
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="mb-10"
                >
                   <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight">
                      راه‌های اتصال
                      <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-l from-luma-purple to-gray-400 text-2xl lg:text-4xl">
                         دستیار خود را همه جا ببرید
                      </span>
                   </h2>
                   <p className="text-gray-400 text-lg leading-relaxed">
                      چه وب‌سایت داشته باشید و چه نداشته باشید، ما راهکار مناسب را برای شما آماده کرده‌ایم. دستیار شما می‌تواند یک صفحه مستقل باشد یا بخشی از سایت شما.
                   </p>
                </motion.div>

                {/* Toggle Controls with Progress Bars */}
                <div className="flex flex-col gap-4">
                   
                   <div 
                      onClick={() => setActiveTab('dedicated')}
                      className={`relative p-6 rounded-2xl border transition-all cursor-pointer group overflow-hidden ${activeTab === 'dedicated' ? 'bg-[#151515] border-luma-purple/50 shadow-lg' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
                   >
                      {activeTab === 'dedicated' && (
                         <motion.div 
                            className="absolute bottom-0 left-0 h-1 bg-luma-purple"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: DURATION / 1000, ease: "linear" }}
                         />
                      )}
                      <div className="flex items-center gap-4 mb-2">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === 'dedicated' ? 'bg-luma-purple text-black' : 'bg-white/10 text-gray-400'}`}>
                            <LayoutTemplate size={20} />
                         </div>
                         <h3 className={`text-lg font-bold ${activeTab === 'dedicated' ? 'text-white' : 'text-gray-400'}`}>صفحه اختصاصی</h3>
                      </div>
                      <p className="text-sm text-gray-500 pr-14 leading-relaxed">
                         یک لینک مستقیم (مانند lumai.ir/chat/your-brand) که می‌توانید در بیو اینستاگرام یا شبکه‌های اجتماعی به اشتراک بگذارید.
                      </p>
                   </div>

                   <div 
                      onClick={() => setActiveTab('widget')}
                      className={`relative p-6 rounded-2xl border transition-all cursor-pointer group overflow-hidden ${activeTab === 'widget' ? 'bg-[#151515] border-luma-purple/50 shadow-lg' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
                   >
                      {activeTab === 'widget' && (
                         <motion.div 
                            className="absolute bottom-0 left-0 h-1 bg-luma-purple"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: DURATION / 1000, ease: "linear" }}
                         />
                      )}
                      <div className="flex items-center gap-4 mb-2">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === 'widget' ? 'bg-luma-purple text-black' : 'bg-white/10 text-gray-400'}`}>
                            <MessageSquare size={20} />
                         </div>
                         <h3 className={`text-lg font-bold ${activeTab === 'widget' ? 'text-white' : 'text-gray-400'}`}>ویجت وب‌سایت</h3>
                      </div>
                      <p className="text-sm text-gray-500 pr-14 leading-relaxed">
                         یک قطعه کد ساده یا پلاگین وردپرس که دستیار را به گوشه سایت شما اضافه می‌کند. هماهنگ با دیزاین شما.
                      </p>
                   </div>

                </div>
                
                <div className="mt-8 flex gap-4">
                   <Button variant="primary" className="px-8">
                      {activeTab === 'dedicated' ? 'ساخت صفحه' : 'دریافت کد ویجت'}
                   </Button>
                   <Button variant="secondary" className="px-4">
                      <Copy size={18} />
                   </Button>
                </div>
             </div>

             {/* Right Column: Visual Simulation */}
             <div className="relative h-[600px] flex items-center justify-center">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-tr from-luma-purple/10 to-transparent rounded-full blur-[100px] opacity-50" />
                
                <AnimatePresence mode="wait">
                   {activeTab === 'dedicated' ? (
                      <motion.div
                         key="dedicated"
                         initial={{ opacity: 0, x: 50, scale: 0.9 }}
                         animate={{ opacity: 1, x: 0, scale: 1 }}
                         exit={{ opacity: 0, x: -50, scale: 0.9 }}
                         transition={{ duration: 0.5, ease: "backOut" }}
                         className="w-full h-full max-h-[550px]"
                      >
                         <BrowserFrame url="assistant.lumai.ir/brand" className="h-full">
                            <DedicatedPageSim />
                         </BrowserFrame>
                      </motion.div>
                   ) : (
                      <motion.div
                         key="widget"
                         initial={{ opacity: 0, x: 50, scale: 0.9 }}
                         animate={{ opacity: 1, x: 0, scale: 1 }}
                         exit={{ opacity: 0, x: -50, scale: 0.9 }}
                         transition={{ duration: 0.5, ease: "backOut" }}
                         className="w-full h-full max-h-[550px]"
                      >
                         <BrowserFrame url="mystore.com" className="h-full">
                            <WidgetPageSim />
                         </BrowserFrame>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>

          </div>
       </div>
    </section>
  );
};
