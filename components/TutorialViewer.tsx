
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LazySyntaxHighlighter from './CodeBlock/LazySyntaxHighlighter';
import postsFallback from './posts-fallback.json';
import { 
  ArrowLeft, Layers, ChevronRight, ChevronLeft, 
  Loader2, Share2, Check, Copy, 
  Clock, Calendar, Bookmark, FileText,
  Terminal, AlertCircle, RefreshCw, WifiOff, CheckCircle2, Circle, Target, GraduationCap, HelpCircle
} from 'lucide-react';
import { CategoryMetaConfig } from '../pages/TutorialsPage';

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
  categoryConfig?: CategoryMetaConfig;
  initialPageId?: string | null;
  onBack: () => void;
  completedItems?: string[];
  onProgressChange?: (items: string[]) => void;
}

// Reading time calculation function (Persian & English word count)
const calculateReadingTime = (text: string): number => {
  if (!text) return 1;
  const words = text.trim().split(/\s+/).length;
  // Average reading speed ~ 180 words per minute
  return Math.max(1, Math.ceil(words / 180));
};

// --- Helper Components ---

const CodeBlock = ({ code, language = 'bash', title }: { code: string, language?: string, title?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-[#0d0d0d] shadow-lg dark:shadow-2xl relative dir-ltr text-left group">
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
        <LazySyntaxHighlighter
          code={code}
          language={language.toLowerCase()}
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
        />
      </div>
    </div>
  );
};

export const TutorialViewer: React.FC<TutorialViewerProps> = ({ 
  activeCategory, 
  categoryConfig,
  initialPageId, 
  onBack,
  completedItems: initialCompletedItems = [],
  onProgressChange
}) => {
  const [activePageId, setActivePageId] = useState<string | null>(initialPageId || (activeCategory.items[0]?.id || null));
  const [pageContent, setPageContent] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [isOfflineContent, setIsOfflineContent] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [completedItems, setCompletedItems] = useState<string[]>(initialCompletedItems);
  const prefersReducedMotion = useReducedMotion();

  // Fetch Content with Offline Fallback
  const fetchContent = async (pageId: string) => {
    setIsLoading(true);
    setFetchError(false);
    setIsOfflineContent(false);

    try {
      const item = activeCategory.items.find(i => i.id === pageId);
      if (item) {
         const uuid = item.url.replace('#', '');
         let data: any;
         try {
           const response = await fetch(`https://luma-doc.nebula-ai-company.workers.dev/api/pages/${uuid}/markdown`);
           if (!response.ok) throw new Error('Network response not ok');
           data = await response.json();
         } catch (fetchErr) {
           console.warn(`Failed to fetch markdown for ${uuid} from server, using fallback:`, fetchErr);
           data = (postsFallback as Record<string, any>)[uuid];
           if (data) {
             setIsOfflineContent(true);
           }
         }
         
         if (data && data.markdown) {
           setPageContent(data);
         } else {
           setFetchError(true);
         }
      }
    } catch (err) {
      console.error(err);
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activePageId) {
      fetchContent(activePageId);
    }
  }, [activePageId, activeCategory]);

  // Toggle Completion
  const toggleCompletion = (pageId: string) => {
    const updated = completedItems.includes(pageId)
      ? completedItems.filter(id => id !== pageId)
      : [...completedItems, pageId];
    
    setCompletedItems(updated);
    try {
      localStorage.setItem('luma_tutorial_completed_items', JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save progress", err);
    }
    if (onProgressChange) {
      onProgressChange(updated);
    }
  };

  // Find Next/Prev logic
  const currentIndex = activeCategory.items.findIndex(i => i.id === activePageId);
  const prevItem = currentIndex > 0 ? activeCategory.items[currentIndex - 1] : null;
  const nextItem = currentIndex < activeCategory.items.length - 1 ? activeCategory.items[currentIndex + 1] : null;

  const handleNavClick = (id: string) => {
     setActivePageId(id);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
     navigator.clipboard.writeText(window.location.href);
     setCopiedLink(true);
     setTimeout(() => setCopiedLink(false), 2000);
  };

  // Calculate Course Progress Percent
  const completedInThisCat = activeCategory.items.filter(i => completedItems.includes(i.id)).length;
  const progressPercent = activeCategory.items.length > 0 
    ? Math.round((completedInThisCat / activeCategory.items.length) * 100) 
    : 0;

  const isCurrentCompleted = activePageId ? completedItems.includes(activePageId) : false;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[80vh]">
      
      {/* --- Sidebar (Navigation & Progress) --- */}
      <aside className="lg:col-span-3 order-2 lg:order-1">
         <div className="sticky top-28 space-y-4">
            <button 
               onClick={onBack}
               className="flex items-center gap-2.5 text-xs font-bold text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4 group w-full px-2 py-1"
            >
               <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-white/10 transition-colors border border-zinc-200 dark:border-white/5">
                 <ArrowLeft size={14} />
               </div>
               <span>بازگشت به لیست سرفصل‌ها</span>
            </button>

            {/* Course Progress Header */}
            <div className="bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-white/5 rounded-2xl p-4 shadow-sm">
               <div className="flex items-center justify-between text-xs font-bold mb-2 text-zinc-800 dark:text-gray-200">
                  <span>پیشرفت در این دوره</span>
                  <span className="text-luma-purple font-mono">{progressPercent}%</span>
               </div>
               <div className="w-full h-1.5 bg-zinc-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div 
                     className="h-full bg-gradient-to-r from-luma-pink to-luma-purple transition-all duration-500 rounded-full"
                     style={{ width: `${progressPercent}%` }}
                  />
               </div>
               <p className="text-[11px] text-zinc-500 dark:text-gray-400 mt-2 font-medium">
                  {completedInThisCat} از {activeCategory.items.length} درس تکمیل شده است
               </p>
            </div>

            {/* Sidebar Lessons List */}
            <div className="bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-white/5 rounded-2xl p-2 shadow-lg dark:shadow-xl backdrop-blur-sm">
               <div className="px-3 py-2.5 flex items-center gap-2 border-b border-zinc-100 dark:border-white/5 mb-1">
                  <Bookmark size={14} className="text-luma-purple" />
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-gray-200">سرفصل‌های دوره</h4>
               </div>
               
               <div className="space-y-0.5 max-h-[55vh] overflow-y-auto custom-scrollbar">
                  {activeCategory.items.map((item) => {
                     const isDone = completedItems.includes(item.id);
                     const isActive = activePageId === item.id;
                     return (
                        <button
                           key={item.id}
                           onClick={() => handleNavClick(item.id)}
                           className={`
                              relative w-full text-right px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between group z-10 gap-2
                              ${isActive ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-gray-200'}
                           `}
                        >
                           {isActive && (
                              <motion.div
                                 layoutId="active-nav-bg"
                                 className="absolute inset-0 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-xl -z-10 shadow-sm"
                                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                           )}
                           
                           <div className="flex items-center gap-2 truncate">
                             {isDone ? (
                               <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                             ) : (
                               <Circle size={14} className="text-zinc-300 dark:text-gray-600 shrink-0" />
                             )}
                             <span className="truncate leading-relaxed">{item.title}</span>
                           </div>

                           {isActive && (
                              <motion.div 
                                 layoutId="active-nav-dot"
                                 className="w-1.5 h-1.5 rounded-full bg-luma-purple shadow-[0_0_8px_#DA8FFF] shrink-0" 
                              />
                           )}
                        </button>
                     );
                  })}
               </div>
            </div>
         </div>
      </aside>

      {/* --- Main Reading Area --- */}
      <main className="lg:col-span-9 order-1 lg:order-2">
         
         {/* Offline Content Warning */}
         {isOfflineContent && pageContent && (
           <div className="mb-6 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                 <WifiOff size={15} className="text-amber-600 dark:text-amber-400 shrink-0" />
                 <span>محتوای این درس از ذخیره‌ساز محلی به صورت آفلاین بارگذاری گردید.</span>
              </div>
              <button 
                onClick={() => activePageId && fetchContent(activePageId)}
                className="hover:underline flex items-center gap-1 font-bold shrink-0 text-amber-900 dark:text-amber-100"
              >
                 <RefreshCw size={12} /> تلاش مجدد
              </button>
           </div>
         )}

         {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 bg-zinc-50/50 dark:bg-[#0f0f0f]/50 rounded-[32px] border border-zinc-200/50 dark:border-white/5 min-h-[500px]">
               <div className="relative">
                  <div className="absolute inset-0 bg-luma-purple blur-xl opacity-20 rounded-full animate-pulse" />
                  <Loader2 size={36} className="text-luma-purple animate-spin relative z-10" />
               </div>
               <p className="text-xs text-zinc-500 dark:text-gray-400 font-medium mt-4 tracking-widest">در حال بارگذاری محتوای درس...</p>
            </div>
         ) : fetchError ? (
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-rose-500/5 border border-rose-500/20 rounded-[32px] min-h-[400px]">
               <AlertCircle size={44} className="text-rose-500 mb-3" />
               <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">خطا در دریافت محتوای درس</h3>
               <p className="text-zinc-600 dark:text-gray-400 text-sm mb-6 max-w-md leading-relaxed">
                  ارتباط با سرور برای بارگذاری این مقاله برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید.
               </p>
               <button 
                  onClick={() => activePageId && fetchContent(activePageId)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
               >
                  <RefreshCw size={14} />
                  تلاش مجدد
               </button>
            </div>
         ) : pageContent ? (
            <motion.div
               key={pageContent.id}
               initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: prefersReducedMotion ? 0.1 : 0.35, ease: "easeOut" }}
               className="max-w-4xl mx-auto"
            >
               {/* Article Header */}
               <div className="mb-10 relative">
                  
                  {/* Category & Lesson Tag */}
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                     <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-luma-purple">
                        <span className="px-3 py-1 rounded-full bg-luma-purple/10 border border-luma-purple/20 flex items-center gap-2">
                           <Layers size={12} />
                           {activeCategory.title}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-gray-700" />
                        <span className="text-zinc-500 dark:text-gray-400">درس {currentIndex + 1} از {activeCategory.items.length}</span>
                     </div>

                     {/* Mark Completed Toggle */}
                     {activePageId && (
                       <button
                         onClick={() => toggleCompletion(activePageId)}
                         className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all duration-300 ${
                           isCurrentCompleted
                             ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                             : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-gray-300 hover:bg-zinc-200 dark:hover:bg-white/10'
                         }`}
                       >
                         {isCurrentCompleted ? (
                           <>
                             <CheckCircle2 size={15} className="text-emerald-500" />
                             <span>تکمیل‌شده</span>
                           </>
                         ) : (
                           <>
                             <Circle size={15} />
                             <span>علامت‌گذاری به‌صورت تکمیل‌شده</span>
                           </>
                         )}
                       </button>
                     )}
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 leading-tight tracking-tight">
                     {pageContent.title}
                  </h1>
                  
                  {/* Category Learning Outcome Card */}
                  {categoryConfig?.outcome && (
                     <div className="mb-8 p-4 rounded-2xl bg-luma-purple/5 dark:bg-luma-purple/10 border border-luma-purple/15 flex items-start gap-3 text-xs text-zinc-700 dark:text-gray-300">
                        <Target size={18} className="text-luma-purple shrink-0 mt-0.5" />
                        <div>
                           <span className="font-bold text-zinc-900 dark:text-white block mb-0.5">دست‌آورد یادگیری این فصل:</span>
                           <p className="leading-relaxed text-zinc-600 dark:text-gray-400">{categoryConfig.outcome}</p>
                        </div>
                     </div>
                  )}

                  {/* Article Metadata Line */}
                  <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-zinc-500 dark:text-gray-400 font-medium border-b border-zinc-200 dark:border-white/5 pb-6">
                     <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-zinc-400 dark:text-gray-500" />
                        <span>آخرین بروزرسانی: تیر ۱۴۰۳</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-zinc-400 dark:text-gray-500" />
                        <span>زمان مطالعه: {calculateReadingTime(pageContent.markdown)} دقیقه</span>
                     </div>
                     {categoryConfig?.difficulty && (
                        <div className="flex items-center gap-1.5">
                           <GraduationCap size={14} className="text-zinc-400 dark:text-gray-500" />
                           <span>سطح: {categoryConfig.difficulty}</span>
                        </div>
                     )}
                     {categoryConfig?.prerequisites && (
                        <div className="flex items-center gap-1.5 text-zinc-500 dark:text-gray-400">
                           <HelpCircle size={14} className="text-zinc-400 dark:text-gray-500" />
                           <span>پیش‌نیاز: {categoryConfig.prerequisites}</span>
                        </div>
                     )}
                     <div className="mr-auto flex items-center gap-2">
                        <button 
                          onClick={handleShare}
                          className="px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-all flex items-center gap-1.5 text-[11px] font-bold" 
                          title="اشتراک‌گذاری"
                        >
                           {copiedLink ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
                           <span>{copiedLink ? 'کپی شد!' : 'اشتراک‌گذاری'}</span>
                        </button>
                     </div>
                  </div>
               </div>

               {/* Content Body */}
               <article className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-white prose-p:text-zinc-700 dark:prose-p:text-gray-300 prose-p:leading-loose prose-p:text-lg prose-p:font-light prose-li:text-zinc-700 dark:prose-li:text-gray-300 prose-strong:text-zinc-900 dark:prose-strong:text-white prose-strong:font-bold">
                  <ReactMarkdown
                     remarkPlugins={[remarkGfm]}
                     components={{
                        code(props) {
                           const {children, className, node, ...rest} = props
                           const match = /language-(\w+)/.exec(className || '')
                           if (match) {
                               return <CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} />
                           }
                           return <code className="bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white px-1.5 py-0.5 rounded text-[0.85em] font-mono border border-zinc-200 dark:border-white/10 mx-1" {...rest}>{children}</code>
                        },
                        h2: ({node, ...props}) => (
                           <div className="mt-14 mb-6">
                              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3 pb-2" {...props}>
                                 <div className="w-1.5 h-7 bg-luma-purple rounded-full shrink-0" />
                                 {props.children}
                              </h2>
                           </div>
                        ),
                        h3: ({node, ...props}) => (
                           <h3 className="text-xl font-bold text-zinc-850 dark:text-gray-100 mt-10 mb-4 flex items-center gap-2" {...props}>
                              <span className="text-luma-purple opacity-50">#</span>
                              {props.children}
                           </h3>
                        ),
                        blockquote: ({node, ...props}) => (
                           <div className="my-10 bg-gradient-to-r from-zinc-100/70 to-zinc-50 dark:from-[#151515] dark:to-[#0f0f0f] border-r-4 border-luma-yellow rounded-xl p-6 relative overflow-hidden shadow-sm group">
                              <div className="relative z-10 text-zinc-700 dark:text-gray-300 italic leading-relaxed pl-4">{props.children}</div>
                           </div>
                        ),
                        ul: ({node, ...props}) => (
                           <ul className="space-y-3 mb-8 list-none pr-0" {...props} />
                        ),
                        li: ({node, children, ...props}) => (
                           <li className="relative pr-6 text-zinc-700 dark:text-gray-300 leading-8" {...props}>
                              <span className="absolute top-3 right-0 w-1.5 h-1.5 bg-luma-pink rounded-full ring-4 ring-luma-pink/10" />
                              {children}
                           </li>
                        ),
                        img: ({node, ...props}) => (
                           <div className="my-10 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-lg dark:shadow-2xl bg-[#050505]">
                              <img {...props} className="w-full h-auto block m-0 opacity-95 hover:opacity-100 transition-opacity duration-300" loading="lazy" />
                              {props.title && (
                                 <div className="p-3 bg-zinc-100 dark:bg-[#0f0f0f] border-t border-zinc-200 dark:border-white/5 text-center text-xs text-zinc-500 dark:text-gray-400 font-medium">
                                    {props.title}
                                 </div>
                              )}
                           </div>
                        ),
                        table: ({node, ...props}) => (
                           <div className="w-full overflow-hidden my-10 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f0f] shadow-lg">
                              <div className="overflow-x-auto custom-scrollbar" dir="rtl">
                                 <table className="min-w-full text-right text-sm border-collapse" {...props} />
                              </div>
                           </div>
                        ),
                        thead: ({node, ...props}) => (
                           <thead className="bg-zinc-50 dark:bg-[#1a1a1a] text-zinc-800 dark:text-white font-bold" {...props} />
                        ),
                        tbody: ({node, ...props}) => (
                           <tbody className="divide-y divide-zinc-200 dark:divide-white/5" {...props} />
                        ),
                        tr: ({node, ...props}) => (
                           <tr className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors odd:bg-zinc-50/20 dark:odd:bg-white/[0.01]" {...props} />
                        ),
                        th: ({node, ...props}) => (
                           <th className="p-4 uppercase tracking-wider text-zinc-700 dark:text-gray-300 border-b border-zinc-200 dark:border-white/10 whitespace-nowrap" {...props} />
                        ),
                        td: ({node, ...props}) => (
                           <td className="p-4 text-zinc-650 dark:text-gray-400 border-l border-zinc-200 dark:border-white/5 last:border-0 align-top" {...props} />
                        ),
                        a: ({node, ...props}) => (
                           <a className="text-luma-pink border-b border-luma-pink/30 hover:border-luma-pink transition-colors font-medium hover:text-zinc-900 hover:dark:text-white pb-0.5" target="_blank" rel="noopener noreferrer" {...props} />
                        ),
                        hr: ({node, ...props}) => (
                           <hr className="my-10 border-zinc-200 dark:border-white/5" {...props} />
                        )
                     }}
                  >
                     {pageContent.markdown}
                  </ReactMarkdown>
               </article>

               {/* Article Footer Controls */}
               <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col gap-8">
                  
                  {/* Mark Completed Banner */}
                  {activePageId && (
                    <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
                       <div>
                          <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">
                            {isCurrentCompleted ? 'این درس به عنوان کامل شده علامت‌گذاری شد!' : 'آیا این درس را مطالعه کردید؟'}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-gray-400">
                             با ثبت وضعیت مطالعه، میزان پیشرفت شما در این دوره به‌روزرسانی می‌شود.
                          </p>
                       </div>
                       <button
                         onClick={() => toggleCompletion(activePageId)}
                         className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                            isCurrentCompleted 
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                         }`}
                       >
                         {isCurrentCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                         <span>{isCurrentCompleted ? 'تکمیل شد ✓' : 'علامت‌گذاری به‌صورت تکمیل‌شده'}</span>
                       </button>
                    </div>
                  )}

                  {/* Previous / Next Lesson Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {prevItem ? (
                       <button 
                           onClick={() => handleNavClick(prevItem.id)}
                           className="flex flex-col items-start gap-3 p-5 rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-[#0f0f0f] hover:bg-zinc-50 dark:hover:bg-[#151515] hover:border-zinc-300 dark:hover:border-white/10 transition-all group text-right shadow-sm"
                       >
                          <span className="text-[10px] text-zinc-500 dark:text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:text-luma-purple transition-colors">
                             <ChevronRight size={12} /> درس قبلی
                          </span>
                          <span className="text-base font-bold text-zinc-900 dark:text-white leading-tight group-hover:underline underline-offset-4">
                             {prevItem.title}
                          </span>
                       </button>
                     ) : <div />}

                     {nextItem ? (
                       <button 
                           onClick={() => handleNavClick(nextItem.id)}
                           className="flex flex-col items-end gap-3 p-5 rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#151515] hover:bg-zinc-100 dark:hover:bg-[#1a1a1a] hover:border-luma-purple/30 hover:shadow-lg hover:shadow-luma-purple/5 transition-all group text-left shadow-sm"
                       >
                          <span className="text-[10px] text-zinc-500 dark:text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:text-luma-purple transition-colors">
                             درس بعدی <ChevronLeft size={12} />
                          </span>
                          <span className="text-base font-bold text-zinc-900 dark:text-white leading-tight group-hover:text-luma-purple transition-colors">
                             {nextItem.title}
                          </span>
                       </button>
                     ) : (
                        <div className="flex flex-col items-center justify-center p-5 rounded-2xl border border-dashed border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02]">
                           <span className="text-zinc-500 dark:text-gray-400 text-xs font-bold">پایان دروس این فصل</span>
                           <Check size={20} className="text-emerald-500 mt-1" />
                        </div>
                     )}
                  </div>
               </div>

            </motion.div>
         ) : (
            <div className="flex flex-col items-center justify-center py-28 border border-dashed border-zinc-200 dark:border-white/10 rounded-3xl bg-zinc-50 dark:bg-white/[0.01] h-full">
               <FileText size={44} className="text-gray-400 dark:text-gray-600 mb-3 opacity-50" />
               <h3 className="text-lg font-bold text-zinc-800 dark:text-gray-300 mb-2">محتوایی یافت نشد</h3>
               <p className="text-zinc-500 dark:text-gray-400 text-xs">لطفاً سرفصل دیگری را انتخاب کنید.</p>
            </div>
         )}
      </main>
    </div>
  );
};
