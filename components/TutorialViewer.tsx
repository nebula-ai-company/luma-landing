
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  ArrowLeft, Layers, ChevronRight, ChevronLeft, 
  Loader2, Share2, Check, Copy, 
  Clock, Calendar, Hash, Quote, Bookmark, FileText,
  Terminal, AlertCircle
} from 'lucide-react';

// --- Types ---
interface NavItem {
  id: string;
  title: string;
  url: string;
}

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

interface PageData {
  id: string;
  title: string;
  markdown: string;
}

interface TutorialViewerProps {
  activeCategory: NavSection;
  initialPageId?: string | null;
  onBack: () => void;
}

// --- Helper Components ---

const CodeBlock = ({ code, language = 'bash', title }: { code: string, language?: string, title?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl relative dir-ltr text-left group">
      {/* Mac-style Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/5 select-none">
        <div className="flex gap-2">
           <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
           <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
           <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
           <Terminal size={12} className="text-gray-500" />
           <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">{title || language || 'CODE'}</span>
        </div>

        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
        >
          {copied ? (
             <>
                <Check size={12} className="text-green-400" />
                <span className="text-[10px] text-green-400 font-bold">Copied</span>
             </>
          ) : (
             <>
                <Copy size={12} />
                <span className="text-[10px] font-medium">Copy</span>
             </>
          )}
        </button>
      </div>
      
      {/* Code Content */}
      <div className="relative">
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={vscDarkPlus}
          customStyle={{ 
             margin: 0, 
             padding: '1.5rem', 
             fontSize: '0.9rem', 
             background: 'transparent', 
             lineHeight: '1.7',
             fontFamily: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
          }}
          showLineNumbers={true}
          lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#444', textAlign: 'right' }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export const TutorialViewer: React.FC<TutorialViewerProps> = ({ activeCategory, initialPageId, onBack }) => {
  const [activePageId, setActivePageId] = useState<string | null>(initialPageId || (activeCategory.items[0]?.id || null));
  const [pageContent, setPageContent] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Content
  useEffect(() => {
    if (!activePageId) return;

    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const item = activeCategory.items.find(i => i.id === activePageId);
        if (item) {
           const uuid = item.url.replace('#', '');
           const response = await fetch(`https://luma-doc.nebula-ai-company.workers.dev/api/pages/${uuid}/markdown`);
           const data = await response.json();
           setPageContent(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [activePageId, activeCategory]);

  // Find Next/Prev logic
  const currentIndex = activeCategory.items.findIndex(i => i.id === activePageId);
  const prevItem = currentIndex > 0 ? activeCategory.items[currentIndex - 1] : null;
  const nextItem = currentIndex < activeCategory.items.length - 1 ? activeCategory.items[currentIndex + 1] : null;

  const handleNavClick = (id: string) => {
     setActivePageId(id);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 animate-in fade-in duration-500 min-h-[80vh]">
      
      {/* --- Sidebar (Navigation) --- */}
      <aside className="lg:col-span-3 order-2 lg:order-1">
         <div className="sticky top-32 space-y-6">
            <button 
               onClick={onBack}
               className="flex items-center gap-3 text-xs font-bold text-gray-400 hover:text-white transition-colors mb-8 group w-full px-2"
            >
               <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5 group-hover:-translate-x-1">
                 <ArrowLeft size={16} />
               </div>
               <span>بازگشت به لیست دوره‌ها</span>
            </button>

            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-2 shadow-xl backdrop-blur-sm">
               <div className="px-4 py-3 flex items-center gap-2 border-b border-white/5 mb-2">
                  <Bookmark size={14} className="text-luma-purple" />
                  <h4 className="text-xs font-bold text-gray-200">سرفصل‌های دوره</h4>
               </div>
               
               <div className="space-y-0.5 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  {activeCategory.items.map((item) => (
                     <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`
                           relative w-full text-right px-4 py-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between group z-10
                           ${activePageId === item.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
                        `}
                     >
                        {activePageId === item.id && (
                           <motion.div
                              layoutId="active-nav-bg"
                              className="absolute inset-0 bg-white/5 border border-white/5 rounded-xl -z-10 shadow-sm"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                           />
                        )}
                        <span className="truncate leading-relaxed relative z-10">{item.title}</span>
                        {activePageId === item.id && (
                           <motion.div 
                              layoutId="active-nav-dot"
                              className="w-1.5 h-1.5 rounded-full bg-luma-purple shadow-[0_0_8px_#DA8FFF]" 
                           />
                        )}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </aside>

      {/* --- Main Reading Area --- */}
      <main className="lg:col-span-9 order-1 lg:order-2">
         {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 opacity-70 bg-[#0f0f0f] rounded-[32px] border border-white/5 min-h-[600px]">
               <div className="relative">
                  <div className="absolute inset-0 bg-luma-purple blur-xl opacity-20 rounded-full animate-pulse" />
                  <Loader2 size={40} className="text-luma-purple animate-spin relative z-10" />
               </div>
               <p className="text-xs text-gray-500 font-medium mt-4 tracking-widest uppercase">Loading Content...</p>
            </div>
         ) : pageContent ? (
            <motion.div
               key={pageContent.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="max-w-4xl mx-auto"
            >
               {/* Article Header */}
               <div className="mb-12 relative">
                  {/* Decorative Glow */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-luma-purple/10 blur-[80px] rounded-full pointer-events-none" />
                  
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-luma-purple mb-6">
                     <span className="px-3 py-1 rounded-full bg-luma-purple/10 border border-luma-purple/20 flex items-center gap-2">
                        <Layers size={12} />
                        {activeCategory.title}
                     </span>
                     <span className="w-1 h-1 rounded-full bg-gray-700" />
                     <span className="text-gray-500">Lesson {currentIndex + 1}</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-sm">
                     {pageContent.title}
                  </h1>
                  
                  <div className="flex items-center gap-6 text-xs text-gray-500 font-medium border-b border-white/5 pb-8">
                     <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-600" />
                        <span>بروزرسانی: ۲۰۲۴</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-600" />
                        <span>زمان مطالعه: ۵ دقیقه</span>
                     </div>
                     <div className="mr-auto flex items-center gap-2">
                        <button className="p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors" title="Share">
                           <Share2 size={16} />
                        </button>
                     </div>
                  </div>
               </div>

               {/* Content Body */}
               <article className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-gray-300 prose-p:leading-loose prose-p:text-lg prose-p:font-light prose-li:text-gray-300 prose-strong:text-white prose-strong:font-bold">
                  <ReactMarkdown
                     remarkPlugins={[remarkGfm]}
                     components={{
                        // Custom styling for markdown elements
                        code(props) {
                           const {children, className, node, ...rest} = props
                           const match = /language-(\w+)/.exec(className || '')
                           if (match) {
                              return <CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} />
                           }
                           return <code className="bg-white/10 text-white px-1.5 py-0.5 rounded text-[0.85em] font-mono border border-white/10 mx-1" {...rest}>{children}</code>
                        },
                        h2: ({node, ...props}) => (
                           <div className="mt-16 mb-6">
                              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 pb-2" {...props}>
                                 <div className="w-1.5 h-8 bg-luma-purple rounded-full" />
                                 {props.children}
                              </h2>
                           </div>
                        ),
                        h3: ({node, ...props}) => (
                           <h3 className="text-xl font-bold text-gray-100 mt-10 mb-4 flex items-center gap-2" {...props}>
                              <span className="text-luma-purple opacity-50">#</span>
                              {props.children}
                           </h3>
                        ),
                        blockquote: ({node, ...props}) => (
                           <div className="my-10 bg-gradient-to-r from-[#151515] to-[#0f0f0f] border-r-4 border-luma-yellow rounded-xl p-6 relative overflow-hidden shadow-lg group">
                              <Quote size={80} className="text-white/[0.02] absolute -top-2 -left-2 transform rotate-180 group-hover:scale-110 transition-transform duration-700" />
                              <div className="relative z-10 text-gray-300 italic leading-relaxed pl-4">{props.children}</div>
                           </div>
                        ),
                        ul: ({node, ...props}) => (
                           <ul className="space-y-3 mb-8 list-none pr-0" {...props} />
                        ),
                        li: ({node, children, ...props}) => (
                           <li className="relative pr-6 text-gray-300 leading-8" {...props}>
                              <span className="absolute top-3 right-0 w-1.5 h-1.5 bg-luma-pink rounded-full ring-4 ring-luma-pink/10" />
                              {children}
                           </li>
                        ),
                        img: ({node, ...props}) => (
                           <div className="my-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505]">
                              <img {...props} className="w-full h-auto block m-0 opacity-90 hover:opacity-100 transition-opacity duration-500" loading="lazy" />
                              {props.title && (
                                 <div className="p-3 bg-[#0f0f0f] border-t border-white/5 text-center text-xs text-gray-500 font-medium">
                                    {props.title}
                                 </div>
                              )}
                           </div>
                        ),
                        // RTL Table Configuration
                        table: ({node, ...props}) => (
                           <div className="w-full overflow-hidden my-10 rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-lg">
                              <div className="overflow-x-auto custom-scrollbar" dir="rtl">
                                 <table className="min-w-full text-right text-sm border-collapse" {...props} />
                              </div>
                           </div>
                        ),
                        thead: ({node, ...props}) => (
                           <thead className="bg-[#1a1a1a] text-white font-bold" {...props} />
                        ),
                        tbody: ({node, ...props}) => (
                           <tbody className="divide-y divide-white/5" {...props} />
                        ),
                        tr: ({node, ...props}) => (
                           <tr className="hover:bg-white/[0.02] transition-colors odd:bg-white/[0.01]" {...props} />
                        ),
                        th: ({node, ...props}) => (
                           <th className="p-4 uppercase tracking-wider text-gray-300 border-b border-white/10 whitespace-nowrap" {...props} />
                        ),
                        td: ({node, ...props}) => (
                           <td className="p-4 text-gray-400 border-l border-white/5 last:border-0 align-top" {...props} />
                        ),
                        a: ({node, ...props}) => (
                           <a className="text-luma-pink border-b border-luma-pink/30 hover:border-luma-pink transition-colors font-medium hover:text-white pb-0.5" target="_blank" rel="noopener noreferrer" {...props} />
                        ),
                        hr: ({node, ...props}) => (
                           <hr className="my-12 border-white/5" {...props} />
                        )
                     }}
                  >
                     {pageContent.markdown}
                  </ReactMarkdown>
               </article>

               {/* Footer Navigation Cards */}
               <div className="mt-24 pt-10 border-t border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     
                     {/* Previous */}
                     {prevItem ? (
                       <button 
                           onClick={() => handleNavClick(prevItem.id)}
                           className="flex flex-col items-start gap-4 p-6 rounded-3xl border border-white/5 bg-[#0f0f0f] hover:bg-[#151515] hover:border-white/10 transition-all group text-right"
                       >
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2 group-hover:text-luma-purple transition-colors">
                             <ChevronRight size={12} /> درس قبلی
                          </span>
                          <span className="text-lg font-bold text-white leading-tight group-hover:underline decoration-white/30 underline-offset-4">
                             {prevItem.title}
                          </span>
                       </button>
                     ) : <div />}

                     {/* Next */}
                     {nextItem ? (
                       <button 
                           onClick={() => handleNavClick(nextItem.id)}
                           className="flex flex-col items-end gap-4 p-6 rounded-3xl border border-white/10 bg-[#151515] hover:bg-[#1a1a1a] hover:border-luma-purple/30 hover:shadow-lg hover:shadow-luma-purple/5 transition-all group text-left"
                       >
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2 group-hover:text-luma-purple transition-colors">
                             درس بعدی <ChevronLeft size={12} />
                          </span>
                          <span className="text-lg font-bold text-white leading-tight group-hover:text-luma-purple transition-colors">
                             {nextItem.title}
                          </span>
                       </button>
                     ) : (
                        <div className="flex flex-col items-center justify-center p-6 rounded-3xl border border-dashed border-white/10 bg-white/[0.02]">
                           <span className="text-gray-500 text-sm font-medium">پایان دوره</span>
                           <Check size={24} className="text-green-500 mt-2" />
                        </div>
                     )}
                  </div>
               </div>

            </motion.div>
         ) : (
            <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/[0.01] h-full">
               <FileText size={48} className="text-gray-600 mb-4 opacity-50" />
               <h3 className="text-xl font-bold text-gray-300 mb-2">محتوایی یافت نشد</h3>
               <p className="text-gray-500 text-sm">لطفاً دوباره تلاش کنید یا سرفصل دیگری را انتخاب کنید.</p>
            </div>
         )}
      </main>
    </div>
  );
};
