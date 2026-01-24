
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  ArrowLeft, Layers, ChevronRight, ChevronLeft, 
  Loader2, FileText, Quote, Bookmark, Share2, PlayCircle
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
    <div className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-xl group relative dir-ltr text-left">
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">
        <div className="flex items-center gap-3">
           <div className="flex gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
           </div>
           <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">{title || language}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
        >
          {copied ? <span className="text-luma-yellow text-[10px] font-bold">Copied!</span> : <div className="text-[10px] uppercase">Copy</div>}
        </button>
      </div>
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.9rem', background: 'transparent', lineHeight: '1.6' }}
        wrapLines={true}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-in fade-in duration-500 min-h-[80vh]">
      
      {/* --- Sidebar (Table of Contents) --- */}
      <aside className="lg:col-span-3 order-2 lg:order-1">
         <div className="sticky top-32 space-y-6">
            <button 
               onClick={onBack}
               className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 group w-full"
            >
               <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5">
                 <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
               </div>
               <span>بازگشت به دوره‌ها</span>
            </button>

            <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 shadow-xl">
               <h4 className="text-xs font-bold text-white mb-4 px-2 flex items-center gap-2 border-b border-white/5 pb-3">
                  <Bookmark size={14} className="text-luma-purple" />
                  سرفصل‌های دوره
               </h4>
               <div className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                  {activeCategory.items.map((item) => (
                     <button
                        key={item.id}
                        onClick={() => {
                           setActivePageId(item.id);
                           window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`
                           w-full text-right px-3 py-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between group
                           ${activePageId === item.id 
                              ? 'bg-luma-purple/10 text-white border border-luma-purple/20' 
                              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                           }
                        `}
                     >
                        <span className="truncate leading-relaxed">{item.title}</span>
                        {activePageId === item.id && (
                           <div className="w-1.5 h-1.5 rounded-full bg-luma-purple shadow-[0_0_8px_#DA8FFF] shrink-0" />
                        )}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </aside>

      {/* --- Main Reading Area --- */}
      <main className="lg:col-span-9 lg:pl-4 min-h-[600px] order-1 lg:order-2">
         {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 opacity-70 bg-[#121212] rounded-[32px] border border-white/5">
               <Loader2 size={40} className="text-luma-purple animate-spin mb-4" />
               <p className="text-sm text-gray-400 font-medium">در حال بارگذاری محتوا...</p>
            </div>
         ) : pageContent ? (
            <motion.div
               key={pageContent.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4 }}
               className="max-w-4xl mx-auto"
            >
               {/* Article Header */}
               <div className="mb-10 pb-8 border-b border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 text-xs text-luma-purple font-bold uppercase tracking-wider bg-luma-purple/10 px-3 py-1 rounded-full w-fit border border-luma-purple/20">
                       <Layers size={14} />
                       {activeCategory.title}
                    </div>
                    <button className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                        <Share2 size={18} />
                    </button>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                     {pageContent.title}
                  </h1>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                     <span className="bg-white/5 px-2 py-1 rounded border border-white/5">Last updated: 2024</span>
                     <span>~5 min read</span>
                  </div>
               </div>

               {/* Markdown Body */}
               <article className="prose prose-invert max-w-none prose-headings:font-black prose-p:text-gray-300 prose-p:leading-8 prose-p:font-light prose-li:text-gray-300">
                  <ReactMarkdown
                     remarkPlugins={[remarkGfm]}
                     components={{
                        code(props) {
                           const {children, className, node, ...rest} = props
                           const match = /language-(\w+)/.exec(className || '')
                           if (match) {
                              return <CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} />
                           }
                           return <code className="bg-luma-pink/10 text-luma-pink px-1.5 py-0.5 rounded text-[13px] font-mono border border-luma-pink/20 mx-1" {...rest}>{children}</code>
                        },
                        h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-16 mb-6 flex items-center gap-3 border-r-4 border-luma-purple pr-4" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-200 mt-12 mb-4" {...props} />,
                        blockquote: ({node, ...props}) => (
                           <div className="my-10 bg-[#121212] border border-luma-yellow/20 rounded-2xl p-6 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-1 h-full bg-luma-yellow" />
                              <Quote size={24} className="text-luma-yellow/50 mb-3" />
                              <div className="text-gray-300 italic relative z-10 leading-relaxed">{props.children}</div>
                           </div>
                        ),
                        img: ({node, ...props}) => (
                           <div className="my-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505]">
                              <img {...props} className="w-full h-auto" loading="lazy" />
                           </div>
                        ),
                        table: ({node, ...props}) => (
                           <div className="overflow-x-auto my-8 rounded-xl border border-white/10 bg-[#121212]">
                              <table className="min-w-full text-right" {...props} />
                           </div>
                        ),
                        th: ({node, ...props}) => <th className="bg-white/5 p-4 text-xs font-bold text-white uppercase tracking-wider" {...props} />,
                        td: ({node, ...props}) => <td className="p-4 border-t border-white/5 text-sm text-gray-400" {...props} />
                     }}
                  >
                     {pageContent.markdown}
                  </ReactMarkdown>
               </article>

               {/* Footer Navigation */}
               <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-6">
                  {prevItem ? (
                    <button 
                        onClick={() => { setActivePageId(prevItem.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="flex flex-col items-start gap-3 group text-right p-6 rounded-2xl border border-white/5 bg-[#121212] hover:bg-white/5 hover:border-white/10 transition-all w-full sm:w-1/2"
                    >
                       <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <ChevronRight size={14} /> درس قبلی
                       </span>
                       <span className="text-base font-bold text-white group-hover:text-luma-purple transition-colors line-clamp-1">
                          {prevItem.title}
                       </span>
                    </button>
                  ) : <div className="w-full sm:w-1/2" />}

                  {nextItem ? (
                    <button 
                        onClick={() => { setActivePageId(nextItem.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="flex flex-col items-end gap-3 group text-left p-6 rounded-2xl border border-white/5 bg-[#121212] hover:bg-white/5 hover:border-white/10 transition-all w-full sm:w-1/2"
                    >
                       <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          درس بعدی <ChevronLeft size={14} />
                       </span>
                       <span className="text-base font-bold text-white group-hover:text-luma-purple transition-colors line-clamp-1">
                          {nextItem.title}
                       </span>
                    </button>
                  ) : <div className="w-full sm:w-1/2" />}
               </div>

            </motion.div>
         ) : (
            <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
               <FileText size={48} className="text-gray-600 mb-4 opacity-50" />
               <h3 className="text-xl font-bold text-gray-300 mb-2">محتوایی یافت نشد</h3>
               <p className="text-gray-500 text-sm">لطفاً دوباره تلاش کنید.</p>
            </div>
         )}
      </main>
    </div>
  );
};
