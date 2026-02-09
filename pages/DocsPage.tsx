
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Search, Hash, Copy, Check, Terminal, 
  Globe, Shield, Zap, FileJson, Server, Code2, 
  ChevronRight, ChevronDown, X, ExternalLink, Menu, Loader2, AlertCircle, Quote, Table as TableIcon
} from 'lucide-react';
import CTA from '../components/CTA';

// --- Types ---

interface NavItem {
  id: string;
  title: string;
  url: string;
}

interface NavSection {
  id: string;
  title: string;
  icon: string;
  items: NavItem[];
}

interface PageData {
  id: string;
  title: string;
  markdown: string;
}

// --- UI Components ---

const CodeBlock = ({ code, language = 'bash', title }: { code: string, language?: string, title?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-xl group relative dir-ltr text-left">
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">
        <div className="flex items-center gap-3">
           <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
           </div>
           {(title || language) && (
             <span className="text-[11px] font-mono text-gray-500 ml-2 uppercase tracking-wider">{title || language}</span>
           )}
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="relative">
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            fontFamily: 'monospace'
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

// --- Main Page Component ---

const DocsPage: React.FC = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [pageContent, setPageContent] = useState<PageData | null>(null);
  
  const [isLoadingNav, setIsLoadingNav] = useState(true);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // 1. Fetch Navigation
  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        setIsLoadingNav(true);
        const response = await fetch('https://luma-doc.nebula-ai-company.workers.dev/api/navigation');
        const data = await response.json();
        
        // 1. Try exact matches for Developers/API sections
        const targetTitles = ["توسعه‌دهندگان", "مستندات API", "API Reference", "Developers", "API"];
        let developersSection = data.navigation.find((section: NavSection) => 
            targetTitles.some(t => section.title.trim().toLowerCase() === t.toLowerCase())
        );
        
        // 2. Fallback: Search for any section containing "api"
        if (!developersSection) {
            developersSection = data.navigation.find((section: NavSection) => 
                section.title.toLowerCase().includes("api")
            );
        }

        // 3. Ultimate Fallback: Use the last section (often tech docs are at the end) if nothing else matches
        if (!developersSection && data.navigation.length > 0) {
             developersSection = data.navigation[data.navigation.length - 1];
        }
        
        if (developersSection) {
          setNavItems(developersSection.items);
          if (developersSection.items.length > 0) {
            setActivePageId(developersSection.items[0].id);
          }
        } else {
          setError("بخش مستندات یافت نشد.");
        }
      } catch (err) {
        console.error("Failed to fetch navigation", err);
        setError("خطا در بارگذاری فهرست مستندات.");
      } finally {
        setIsLoadingNav(false);
      }
    };

    fetchNavigation();
  }, []);

  // 2. Fetch Page Content when activePageId changes
  useEffect(() => {
    if (!activePageId) return;

    const fetchPageContent = async () => {
      try {
        setIsLoadingContent(true);
        const activeItem = navItems.find(i => i.id === activePageId);
        if (!activeItem) return;

        const uuid = activeItem.url.replace('#', '');
        
        const response = await fetch(`https://luma-doc.nebula-ai-company.workers.dev/api/pages/${uuid}/markdown`);
        const data = await response.json();
        
        setPageContent(data);
      } catch (err) {
        console.error("Failed to fetch page content", err);
        setPageContent(null);
      } finally {
        setIsLoadingContent(false);
      }
    };

    fetchPageContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePageId, navItems]);


  // Filter nav based on search
  const filteredNav = useMemo(() => {
    if (!searchQuery) return navItems;
    return navItems.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, navItems]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-luma-purple/30 selection:text-white pt-20 font-sans">
      
      {/* --- Premium Hero Header --- */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5 bg-[#0a0a0a]">
         
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />
         
         <motion.div 
            animate={{ 
               x: [0, 100, -50, 0],
               y: [0, -50, 50, 0],
               scale: [1, 1.2, 0.9, 1],
               opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-luma-purple/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"
         />
         <motion.div 
            animate={{ 
               x: [0, -50, 50, 0],
               y: [0, 50, -50, 0],
               scale: [1, 1.1, 0.9, 1],
               opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-luma-pink/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"
         />

         <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
               
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg"
               >
                  <Terminal size={12} className="text-luma-purple" />
                  <span className="text-[10px] font-bold text-gray-300 tracking-wider uppercase">Developers Hub</span>
                  <div className="w-1 h-1 rounded-full bg-white/20 mx-1" />
                  <span className="text-[10px] text-luma-purple font-mono">v2.1</span>
               </motion.div>

               <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight"
               >
                  <span className="text-gradient-animated">مستندات API</span>
               </motion.h1>

               <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-400 mb-10 leading-relaxed font-light max-w-2xl"
               >
                  همه آن چیزی که برای ادغام هوش مصنوعی لوما نیاز دارید. 
                  <br className="hidden md:block" />
                  از ساخت تصویر تا ویرایش ویدیو، با چند خط کد.
               </motion.p>

               {/* Premium Search Box */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full max-w-2xl relative group z-20"
               >
                  <div className={`
                     absolute -inset-0.5 bg-gradient-to-r from-luma-purple/50 to-luma-pink/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500
                     ${searchQuery ? 'opacity-50' : ''}
                  `} />
                  <div className="relative bg-[#0c0c0e] border border-white/10 rounded-2xl flex items-center h-14 px-4 shadow-2xl transition-all group-focus-within:border-white/30">
                     <Search size={20} className={`ml-3 transition-colors ${searchQuery ? 'text-luma-purple' : 'text-gray-500'}`} />
                     <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="جستجو در مستندات (مثلا: احراز هویت، ساخت تصویر)..." 
                        className="bg-transparent border-none outline-none text-base text-white placeholder:text-gray-600 w-full h-full font-light"
                     />
                     {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                           <X size={16} />
                        </button>
                     )}
                  </div>
               </motion.div>

            </div>
         </div>
      </section>

      <div className="max-w-screen-2xl mx-auto px-6 py-12 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* --- Sticky Sidebar (Desktop) --- */}
            <aside className="lg:col-span-3 hidden lg:block">
               <div className="sticky top-32 space-y-8 pr-2 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
                  
                  {isLoadingNav ? (
                     <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                           <div key={i} className="h-8 bg-white/5 rounded-lg animate-pulse" />
                        ))}
                     </div>
                  ) : error ? (
                     <div className="text-red-400 text-sm flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                     </div>
                  ) : (
                     <div>
                        <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2 px-2">
                           <Code2 size={12} />
                           توسعه‌دهندگان
                        </h4>
                        <ul className="space-y-0.5 border-r border-white/5 mr-1.5">
                           {filteredNav.map((item) => (
                              <li key={item.id}>
                                 <button
                                    onClick={() => setActivePageId(item.id)}
                                    className={`
                                       group flex items-center justify-between w-full text-right pr-4 pl-2 py-2 text-sm transition-all border-r-2 -mr-[1px] rounded-l-lg
                                       ${activePageId === item.id 
                                          ? 'border-luma-purple text-white bg-luma-purple/5 font-medium' 
                                          : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-white/20 hover:bg-white/[0.02]'
                                       }
                                    `}
                                 >
                                    <span>{item.title}</span>
                                    {activePageId === item.id && <ChevronRight size={12} className="text-luma-purple rotate-180" />}
                                 </button>
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}
                  
               </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="lg:col-span-9 space-y-8 lg:pl-12 min-h-[500px]">
               
               {/* Mobile Navigation Menu */}
               <div className="lg:hidden mb-6">
                  <button 
                    onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                    className="w-full flex items-center justify-between p-4 bg-[#121212] border border-white/10 rounded-2xl text-gray-300 font-bold shadow-lg transition-all active:scale-[0.99]"
                  >
                    <span className="flex items-center gap-2">
                       <Menu size={18} className="text-luma-purple" />
                       فهرست مستندات
                    </span>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isMobileNavOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isMobileNavOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl mt-2 p-2 shadow-xl max-h-[60vh] overflow-y-auto custom-scrollbar">
                           {!isLoadingNav && !error && filteredNav.map(item => (
                              <button
                                 key={item.id}
                                 onClick={() => {
                                    setActivePageId(item.id);
                                    setIsMobileNavOpen(false);
                                 }}
                                 className={`
                                    w-full text-right px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between
                                    ${activePageId === item.id 
                                       ? 'bg-luma-purple/10 text-white border border-luma-purple/20' 
                                       : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                    }
                                 `}
                              >
                                 {item.title}
                                 {activePageId === item.id && <Check size={14} className="text-luma-purple" />}
                              </button>
                           ))}
                           {isLoadingNav && (
                              <div className="p-4 text-center text-xs text-gray-500">در حال بارگذاری...</div>
                           )}
                           {error && (
                              <div className="p-4 text-center text-xs text-red-400">{error}</div>
                           )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               {/* Content Loading State */}
               {isLoadingContent ? (
                  <div className="flex flex-col items-center justify-center py-32 opacity-70 bg-[#0f0f0f] rounded-[32px] border border-white/5 min-h-[600px]">
                     <div className="relative">
                        <div className="absolute inset-0 bg-luma-purple blur-xl opacity-20 rounded-full animate-pulse" />
                        <Loader2 size={40} className="text-luma-purple animate-spin relative z-10" />
                     </div>
                     <p className="text-xs text-gray-500 font-medium mt-4 tracking-widest uppercase">در حال دریافت محتوا...</p>
                  </div>
               ) : pageContent ? (
                  <motion.div
                     key={pageContent.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.4 }}
                     className="w-full max-w-none text-right" 
                  >
                     <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                           // 1. Headings
                           h1: ({node, ...props}) => (
                              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-10 pb-2 tracking-tight leading-tight" {...props} />
                           ),
                           h2: ({node, ...props}) => (
                              <div className="mt-16 mb-8 group">
                                 <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 pb-4 border-b border-white/10" {...props}>
                                    {props.children}
                                 </h2>
                              </div>
                           ),
                           h3: ({node, ...props}) => (
                              <h3 className="text-xl font-bold text-gray-100 mt-10 mb-4 flex items-center gap-2" {...props}>
                                 <div className="w-1.5 h-1.5 rounded-full bg-luma-purple" />
                                 {props.children}
                              </h3>
                           ),
                           h4: ({node, ...props}) => (
                              <h4 className="text-lg font-bold text-gray-300 mt-8 mb-3" {...props} />
                           ),

                           // 2. Paragraphs & Text
                           p: ({node, ...props}) => (
                              <p className="text-base md:text-[17px] text-gray-400 leading-9 mb-6 font-light text-justify" {...props} />
                           ),
                           strong: ({node, ...props}) => (
                              <strong className="text-white font-bold" {...props} />
                           ),
                           a: ({node, ...props}) => (
                              <a 
                                 className="text-luma-purple hover:text-luma-pink transition-colors border-b border-luma-purple/30 hover:border-luma-pink/50 pb-0.5 inline-flex items-center gap-1" 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 {...props} 
                              />
                           ),

                           // 3. Lists
                           ul: ({node, ...props}) => (
                              <ul className="space-y-3 mb-8 list-none pr-2" {...props} />
                           ),
                           ol: ({node, ...props}) => (
                              <ol className="space-y-3 mb-8 list-none pr-2 counter-reset-item" {...props} />
                           ),
                           li: ({node, children, ...props}) => (
                              <li className="relative pr-6 text-gray-300 leading-8 text-[16px]" {...props}>
                                 <span className="absolute top-3 right-0 w-1.5 h-1.5 bg-luma-purple rounded-full ring-2 ring-luma-purple/20" />
                                 {children}
                              </li>
                           ),

                           // 4. Blockquotes
                           blockquote: ({node, children, ...props}) => (
                              <div className="my-10 relative overflow-hidden rounded-2xl bg-white/[0.02] border-r-4 border-luma-purple">
                                 <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                    <Quote size={64} />
                                 </div>
                                 <div className="p-6 pr-8 text-gray-300 italic leading-relaxed relative z-10">
                                    {children}
                                 </div>
                              </div>
                           ),

                           // 5. Code
                           code(props) {
                              const {children, className, node, ...rest} = props
                              const match = /language-(\w+)/.exec(className || '')
                              
                              // Block Code
                              if (match) {
                                 return (
                                    <CodeBlock 
                                       language={match[1]}
                                       code={String(children).replace(/\n$/, '')}
                                    />
                                 )
                              }
                              
                              // Inline Code
                              return (
                                 <code className="mx-1 px-1.5 py-0.5 rounded-md bg-luma-pink/10 border border-luma-pink/20 text-luma-pink font-mono text-[13px] dir-ltr inline-block align-middle" {...rest}>
                                    {children}
                                 </code>
                              )
                           },

                           // 6. Tables - Premium Styling (Forced RTL)
                           table: ({node, ...props}) => (
                              <div className="w-full overflow-x-auto my-8 rounded-xl border border-white/10 bg-[#0c0c0e] shadow-lg" dir="rtl">
                                 <table className="w-full text-right text-sm border-collapse min-w-[600px]" {...props} />
                              </div>
                           ),
                           thead: ({node, ...props}) => (
                              <thead className="bg-white/5 text-white font-medium" {...props} />
                           ),
                           tbody: ({node, ...props}) => (
                              <tbody className="divide-y divide-white/5" {...props} />
                           ),
                           tr: ({node, ...props}) => (
                              <tr className="hover:bg-white/[0.02] transition-colors" {...props} />
                           ),
                           th: ({node, ...props}) => (
                              <th className="p-4 font-bold text-xs text-gray-300 uppercase tracking-wider border-b border-white/10 text-right whitespace-nowrap" {...props} />
                           ),
                           td: ({node, ...props}) => (
                              <td className="p-4 text-gray-400 border-b border-white/5 align-top leading-relaxed text-right" {...props} />
                           ),

                           // 7. Images
                           img: ({node, ...props}) => (
                              <div className="my-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505]">
                                 <img {...props} className="w-full h-auto block m-0" loading="lazy" />
                                 {props.title && (
                                    <div className="p-3 bg-[#0a0a0a] border-t border-white/5 text-center text-xs text-gray-500">
                                       {props.title}
                                    </div>
                                 )}
                              </div>
                           ),
                           
                           // 8. Horizontal Rule
                           hr: ({node, ...props}) => (
                              <hr className="my-12 border-white/10" {...props} />
                           )
                        }}
                     >
                        {pageContent.markdown}
                     </ReactMarkdown>
                  </motion.div>
               ) : (
                  <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                     <FileJson size={48} className="text-gray-600 mb-4 opacity-50" />
                     <h3 className="text-xl font-bold text-gray-300 mb-2">محتوایی یافت نشد</h3>
                     <p className="text-gray-500 text-sm">لطفاً یک صفحه را از منوی سمت راست (یا بالا) انتخاب کنید.</p>
                  </div>
               )}

            </main>
         </div>
      </div>

      <CTA />
    </div>
  );
};

export default DocsPage;
