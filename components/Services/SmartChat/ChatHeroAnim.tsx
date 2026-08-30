
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, Sun, 
  ChevronDown, Layout, Play, X, Check,
  MousePointer2, FileCode, Terminal
} from 'lucide-react';

// --- Types & Constants ---

const MODELS = [
  { id: 'gpt-mini', name: 'GPT 5.4 Mini', icon: ZapIcon, color: 'text-gray-400' },
  { id: 'claude', name: 'Claude Sonnet 4.6', icon: CodeIcon, color: 'text-luma-purple' },
  { id: 'gemini', name: 'Gemini 3.1 Pro', icon: BrainIcon, color: 'text-luma-yellow' },
];

function ZapIcon({ className }: { className?: string }) { return <span className={className}>⚡</span> }
function CodeIcon({ className }: { className?: string }) { return <span className={className}>⚛️</span> }
function BrainIcon({ className }: { className?: string }) { return <span className={className}>🧠</span> }

// --- Helper Components ---

const TypingText = ({ text, speed = 20, onComplete }: { text: string, speed?: number, onComplete?: () => void }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i + 1));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
};

const MouseCursor = ({ x, y, click }: { x: number | string, y: number | string, click: boolean }) => (
  <motion.div
    className="absolute z-50 pointer-events-none drop-shadow-xl text-black"
    animate={{ 
      top: y, 
      left: x,
      scale: click ? 0.9 : 1
    }}
    transition={{ 
      type: "spring", 
      stiffness: 150, 
      damping: 25,
      restDelta: 0.001
    }}
  >
    <MousePointer2 className="fill-white stroke-black w-6 h-6" />
    {click && (
      <motion.div
        initial={{ opacity: 1, scale: 0 }}
        animate={{ opacity: 0, scale: 1.5 }}
        className="absolute top-0 left-0 w-6 h-6 bg-white/50 rounded-full"
      />
    )}
  </motion.div>
);

// --- Main Component ---

export const ChatHeroAnim = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [currentModel, setCurrentModel] = useState(MODELS[0]);
  const [isArtifactOpen, setIsArtifactOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cursor, setCursor] = useState({ x: "50%", y: "110%", click: false });
  const [todos, setTodos] = useState([
    { id: 1, text: "طراحی کامپوننت", done: true },
    { id: 2, text: "اتصال به API", done: false },
    { id: 3, text: "تست نهایی", done: false }
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation Sequence
  useEffect(() => {
    let mounted = true;

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    const moveCursor = async (x: string, y: string) => {
      if (!mounted) return;
      setCursor(prev => ({ ...prev, x, y, click: false }));
      await wait(800); // Travel time
    };

    const clickCursor = async () => {
      if (!mounted) return;
      setCursor(prev => ({ ...prev, click: true }));
      await wait(150);
      setCursor(prev => ({ ...prev, click: false }));
      await wait(150);
    };

    const typeInput = async (text: string) => {
      if (!mounted) return;
      for (let i = 0; i <= text.length; i++) {
        if (!mounted) return;
        setInputValue(text.substring(0, i));
        await wait(30 + Math.random() * 30);
      }
      await wait(300);
    };

    const runScenario = async () => {
      while (mounted) {
        // Reset
        setMessages([]);
        setInputValue("");
        setCurrentModel(MODELS[0]);
        setIsArtifactOpen(false);
        setTodos([
            { id: 1, text: "طراحی کامپوننت", done: true },
            { id: 2, text: "اتصال به API", done: false },
            { id: 3, text: "تست نهایی", done: false }
        ]);
        await wait(1000);

        // --- Step 1: Simple Chat ---
        await moveCursor("50%", "92%"); // Move to input
        await clickCursor();
        await typeInput("یه برنامه سفر ۳ روزه به شیراز بده.");
        await wait(200);
        
        await moveCursor("6%", "92%"); // Move to Send Button (Far Left in RTL)
        await clickCursor(); // Send
        
        setInputValue("");
        setMessages(prev => [...prev, { role: 'user', content: "یه برنامه سفر ۳ روزه به شیراز بده." }]);
        await wait(600);
        setMessages(prev => [...prev, { role: 'ai', model: MODELS[0], content: "حتماً! روز اول: بازدید از تخت جمشید و نقش رستم. روز دوم: باغ ارم و حافظیه...", typing: true }]);
        await wait(2500);

        // --- Step 2: Switch Model (Right Side in RTL) ---
        await moveCursor("85%", "5%"); // Move to Model Selector (Top Right)
        await clickCursor();
        setIsMenuOpen(true);
        await wait(600);
        await moveCursor("85%", "14%"); // Move to Claude (Dropdown Item 2)
        await clickCursor();
        setCurrentModel(MODELS[1]);
        setIsMenuOpen(false);
        await wait(500);

        // --- Step 3: Coding Request ---
        await moveCursor("50%", "92%"); // Back to input
        await clickCursor();
        await typeInput("حالا یه کامپوننت React برای لیست کارها بساز.");
        
        await moveCursor("6%", "92%"); // Move to Send Button (Far Left in RTL)
        await clickCursor();
        
        setInputValue("");
        setMessages(prev => [...prev, { role: 'user', content: "حالا یه کامپوننت React برای لیست کارها بساز." }]);
        await wait(800);
        
        // AI Response with Artifact
        setMessages(prev => [...prev, { 
            role: 'ai', 
            model: MODELS[1], 
            content: "کد کامپوننت Todo List آماده است. می‌توانید آن را در پنل کناری مشاهده و تست کنید.", 
            hasArtifact: true,
            typing: true 
        }]);
        await wait(1000);
        
        // Open Artifact
        await moveCursor("85%", "50%"); // Move towards right side (where artifact preview button is)
        await clickCursor(); // Clicks "View" on the chat message bubble
        setIsArtifactOpen(true);
        await wait(1500);

        // --- Step 4: Interact with Artifact (Panel on LEFT in RTL) ---
        // Artifact panel opens on the left side (0-50% width)
        await moveCursor("25%", "42%"); // Move to Todo Item 2
        await clickCursor();
        setTodos(prev => prev.map(t => t.id === 2 ? { ...t, done: true } : t));
        await wait(800);
        
        await moveCursor("25%", "52%"); // Move to Todo Item 3
        await clickCursor();
        setTodos(prev => prev.map(t => t.id === 3 ? { ...t, done: true } : t));
        await wait(1500);

        // --- Step 5: Weather Query (Gemini) ---
        // Close artifact (Close button is Top Left of Left Panel in RTL => approx 4% x)
        await moveCursor("4%", "5%"); 
        await clickCursor();
        setIsArtifactOpen(false);
        await wait(800);

        await moveCursor("85%", "5%"); // Move to Model Selector (Top Right)
        await clickCursor();
        setIsMenuOpen(true);
        await wait(500);
        await moveCursor("85%", "19%"); // Move to Gemini (Dropdown Item 3)
        await clickCursor();
        setCurrentModel(MODELS[2]);
        setIsMenuOpen(false);

        await moveCursor("50%", "92%");
        await clickCursor();
        await typeInput("هوای تهران چطوره؟");
        
        await moveCursor("6%", "92%"); // Move to Send Button (Far Left in RTL)
        await clickCursor();
        
        setInputValue("");
        setMessages(prev => [...prev, { role: 'user', content: "هوای تهران چطوره؟" }]);
        await wait(800);
        setMessages(prev => [...prev, { 
            role: 'ai', 
            model: MODELS[2], 
            content: "", 
            widget: 'weather',
            typing: false 
        }]);
        
        await wait(4000); // Pause at end
      }
    };

    runScenario();

    return () => { mounted = false; };
  }, []);

  return (
    <div className="relative w-full h-full bg-white dark:bg-[#0c0c0e] rounded-[32px] border border-zinc-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col font-sans select-none transition-colors duration-300" dir="rtl">
      
      {/* Mouse Cursor Overlay */}
      <MouseCursor x={cursor.x} y={cursor.y} click={cursor.click} />

      {/* --- Header --- */}
      <div className="h-14 border-b border-zinc-150 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02] backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-40 relative transition-colors duration-300">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-luma-purple/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
                <Bot size={18} className="text-luma-purple" />
            </div>
            
            {/* Model Selector */}
            <div className="relative">
                <motion.button 
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${isMenuOpen ? 'bg-zinc-100 dark:bg-white/10 border-zinc-200 dark:border-white/20' : 'border-transparent hover:bg-zinc-100 dark:hover:bg-white/5'}`}
                >
                    <span className="text-[11px] font-bold text-zinc-805 dark:text-gray-200">{currentModel.name}</span>
                    <ChevronDown size={12} className="opacity-50 text-zinc-500 dark:text-gray-300" />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 transition-colors duration-300"
                        >
                            {MODELS.map(m => (
                                <div key={m.id} className="flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-55 dark:hover:bg-white/5 cursor-pointer">
                                    <m.icon className="text-xs" />
                                    <span className={`text-[10px] ${currentModel.id === m.id ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500 dark:text-gray-400'}`}>{m.name}</span>
                                    {currentModel.id === m.id && <Check size={12} className="mr-auto text-green-500" />}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
         </div>
         
         <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
             <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
             <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
         </div>
      </div>

      {/* --- Main Content Area (Split View) --- */}
      <div className="flex-1 flex relative overflow-hidden">
          
          {/* Chat Column (Right Side in RTL) */}
          <motion.div 
             className="flex-1 flex flex-col relative z-10 bg-white dark:bg-[#0c0c0e] transition-colors duration-300"
             animate={{ width: isArtifactOpen ? "50%" : "100%" }}
             transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          >
              <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
                  <AnimatePresence mode='popLayout'>
                      {messages.map((msg, i) => (
                          <motion.div 
                             key={i}
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start items-start gap-3'}`}
                          >
                             {msg.role === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center border border-zinc-200 dark:border-white/5 mt-1 shrink-0 text-zinc-700 dark:text-gray-300 transition-colors">
                                   <msg.model.icon className="text-xs" />
                                </div>
                             )}
                             
                             <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-luma-purple text-black rounded-2xl rounded-tr-sm px-4 py-3 text-xs font-medium' : 'w-full'}`}>
                                 {msg.role === 'user' ? (
                                     msg.content
                                 ) : (
                                     <div className="flex flex-col gap-3">
                                         {/* Text Content */}
                                         {msg.content && (
                                             <div className="bg-zinc-50 dark:bg-[#151515] border border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-gray-300 text-xs py-3 px-4 rounded-2xl rounded-tl-sm leading-relaxed transition-colors">
                                                 {msg.typing ? <TypingText text={msg.content} /> : msg.content}
                                             </div>
                                         )}
                                         
                                         {/* Artifact Chip */}
                                         {msg.hasArtifact && (
                                             <motion.div 
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 1 }}
                                                onClick={() => setIsArtifactOpen(true)}
                                                className="flex items-center gap-3 bg-zinc-50 dark:bg-[#151515] border border-zinc-200 dark:border-luma-purple/30 p-2.5 rounded-xl w-fit cursor-pointer hover:bg-zinc-100 dark:hover:bg-[#1a1a1a] transition-all"
                                             >
                                                 <div className="w-8 h-8 rounded-lg bg-luma-purple/10 flex items-center justify-center text-luma-purple">
                                                     <Layout size={16} />
                                                 </div>
                                                 <div className="flex flex-col">
                                                     <span className="text-[10px] font-bold text-zinc-800 dark:text-white transition-colors">Todo List Component</span>
                                                     <span className="text-[9px] text-zinc-500 dark:text-gray-500 transition-colors">React • Tailwind CSS</span>
                                                 </div>
                                                 <div className="mr-3 px-2 py-0.5 bg-luma-purple/20 text-luma-purple text-[9px] rounded font-bold">
                                                     مشاهده
                                                 </div>
                                             </motion.div>
                                         )}

                                         {/* Weather Widget */}
                                         {msg.widget === 'weather' && (
                                             <motion.div 
                                                initial={{ opacity: 0, scale: 0.9, height: 0 }}
                                                animate={{ opacity: 1, scale: 1, height: "auto" }}
                                                className="bg-gradient-to-br from-blue-600/10 dark:from-blue-600/20 to-cyan-500/5 dark:to-cyan-500/10 border border-blue-250 dark:border-blue-500/30 rounded-2xl p-4 w-[240px] relative overflow-hidden transition-all"
                                             >
                                                 <div className="flex justify-between items-start mb-4 relative z-10">
                                                     <div>
                                                         <h4 className="text-zinc-850 dark:text-white font-bold text-2xl transition-colors">۲۴°</h4>
                                                         <span className="text-blue-650 dark:text-blue-200 text-xs transition-colors">تهران، ایران</span>
                                                     </div>
                                                     <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                                     >
                                                         <Sun className="text-yellow-400 fill-yellow-400" size={32} />
                                                     </motion.div>
                                                 </div>
                                                 <div className="space-y-1 relative z-10">
                                                     <div className="flex justify-between text-[10px] text-blue-900/80 dark:text-blue-100 transition-colors">
                                                         <span>رطوبت</span>
                                                         <span>۳۰٪</span>
                                                     </div>
                                                     <div className="w-full bg-blue-500/20 h-1 rounded-full overflow-hidden">
                                                         <div className="w-[30%] h-full bg-blue-400 rounded-full" />
                                                     </div>
                                                     <div className="flex justify-between text-[10px] text-blue-900/80 dark:text-blue-100 mt-1 transition-colors">
                                                         <span>باد</span>
                                                         <span>۱۲ km/h</span>
                                                     </div>
                                                 </div>
                                             </motion.div>
                                         )}
                                     </div>
                                 )}
                             </div>
                          </motion.div>
                      ))}
                  </AnimatePresence>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-zinc-200 dark:border-white/5 bg-white dark:bg-[#0c0c0e] relative z-20 transition-colors">
                 <div className="h-12 bg-zinc-50 dark:bg-[#151515] rounded-xl border border-zinc-200 dark:border-white/10 flex items-center px-4 justify-between gap-3 shadow-inner transition-colors">
                    <div className="flex-1 text-right text-xs text-zinc-800 dark:text-white dir-rtl flex items-center transition-colors">
                        {inputValue}
                        {inputValue.length > 0 && <span className="w-0.5 h-4 bg-luma-purple animate-pulse mr-0.5" />}
                        {inputValue.length === 0 && <span className="text-zinc-400 dark:text-gray-600">پیام خود را بنویسید...</span>}
                    </div>
                    <div className="flex gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${inputValue.length > 0 ? 'bg-zinc-950 text-white dark:bg-white dark:text-black' : 'bg-zinc-200 dark:bg-white/5 text-zinc-500 dark:text-gray-500'}`}>
                            <Sparkles size={14}/>
                        </div>
                    </div>
                 </div>
              </div>
          </motion.div>

          {/* Artifact Column (Slide In - Left Side in RTL) */}
          <motion.div
             className="border-r border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#0f0f11] flex flex-col relative z-0 transition-colors"
             initial={{ width: 0, opacity: 0 }}
             animate={{ 
                 width: isArtifactOpen ? "50%" : 0, 
                 opacity: isArtifactOpen ? 1 : 0 
             }}
             transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          >
             {/* Artifact Header */}
             <div className="h-10 bg-zinc-100 dark:bg-[#151515] border-b border-zinc-200 dark:border-white/5 flex items-center justify-between px-4 shrink-0 transition-colors">
                 <div className="flex items-center gap-2">
                     <span className="text-[10px] font-bold text-zinc-500 dark:text-gray-400 uppercase">React Preview</span>
                     <div className="px-1.5 py-0.5 bg-green-500/10 text-green-600 dark:text-green-500 text-[9px] rounded border border-green-500/20">Live</div>
                 </div>
                 <div className="flex items-center gap-3">
                     <div className="flex gap-1">
                         <div className="p-1 hover:bg-zinc-200 dark:hover:bg-white/10 rounded cursor-pointer transition-colors" onClick={() => setIsArtifactOpen(false)}><X size={12} className="text-zinc-500 hover:text-zinc-800 dark:text-gray-400 dark:hover:text-white" /></div>
                     </div>
                 </div>
             </div>

             {/* Artifact Content (Fake Todo App - Dark Themed) */}
             <div className="flex-1 p-6 overflow-hidden relative">
                 <div className="absolute inset-0 bg-zinc-50 dark:bg-[#121212] flex flex-col font-sans text-right transition-colors" dir="rtl">
                     <div className="bg-white dark:bg-[#1a1a1a] border-b border-zinc-200 dark:border-white/5 p-6 text-zinc-800 dark:text-white relative overflow-hidden transition-colors">
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-luma-purple to-luma-pink" />
                         <h2 className="text-xl font-bold mb-1">کارهای امروز</h2>
                         <p className="text-zinc-500 dark:text-gray-400 text-xs transition-colors">{todos.filter(t => t.done).length} از {todos.length} انجام شده</p>
                     </div>
                     <div className="p-4 flex-1 overflow-y-auto">
                         <div className="space-y-2">
                             {todos.map(todo => (
                                 <motion.div 
                                    key={todo.id}
                                    layout
                                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${todo.done ? 'bg-zinc-200/50 dark:bg-white/5 border-zinc-200 dark:border-white/5' : 'bg-white dark:bg-[#1e1e1e] border-zinc-200 dark:border-white/10 shadow-sm'}`}
                                 >
                                     <div 
                                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors bg-white dark:bg-transparent ${todo.done ? 'bg-luma-purple border-luma-purple' : 'border-zinc-300 dark:border-gray-500'}`}
                                     >
                                         {todo.done && <Check size={12} className="text-black" />}
                                     </div>
                                     <span className={`text-sm transition-colors ${todo.done ? 'text-zinc-400 dark:text-gray-500 line-through' : 'text-zinc-700 dark:text-gray-200'}`}>{todo.text}</span>
                                 </motion.div>
                             ))}
                             
                             {/* Fake Add Task */}
                             <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-200 dark:border-white/5 opacity-50">
                                 <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center text-zinc-900 dark:text-white transition-colors font-bold">+</div>
                                 <span className="text-xs text-zinc-650 dark:text-gray-500 transition-colors">افزودن کار جدید...</span>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             
             {/* Code/Preview Tabs Bottom */}
             <div className="h-10 bg-zinc-100 dark:bg-[#151515] border-t border-zinc-200 dark:border-white/5 flex items-center px-2 gap-1 transition-colors">
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-200 dark:bg-[#222] rounded-lg text-zinc-805 dark:text-gray-200 text-[10px] cursor-pointer transition-colors">
                     <Play size={10} />
                     <span>Preview</span>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 text-zinc-500 hover:text-zinc-700 dark:text-gray-500 dark:hover:text-gray-300 text-[10px] cursor-pointer transition-colors">
                     <FileCode size={10} />
                     <span>Code</span>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 text-zinc-500 hover:text-zinc-700 dark:text-gray-500 dark:hover:text-gray-300 text-[10px] cursor-pointer transition-colors">
                     <Terminal size={10} />
                     <span>Console</span>
                 </div>
             </div>
          </motion.div>

      </div>
    </div>
  );
};
