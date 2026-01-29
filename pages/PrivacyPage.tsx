
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PageData {
  id: string;
  title: string;
  markdown: string;
}

const PrivacyPage: React.FC = () => {
  const [content, setContent] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        // Fetching "حقوق و تعهدات کاربر"
        const response = await fetch('https://luma-doc.nebula-ai-company.workers.dev/api/pages/24105be4-3052-4ee0-98f0-eca1f4bbdb8f/markdown');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setContent(data);
      } catch (err) {
        console.error("Error fetching privacy content:", err);
        setError("خطا در بارگذاری محتوا. لطفاً اتصال خود را بررسی کنید.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20 pb-20 font-sans selection:bg-luma-pink selection:text-white">
      
      <div className="max-w-4xl mx-auto px-6">
         
         <div className="text-center mb-16 pt-16">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5"
            >
               <Shield size={14} className="text-luma-pink" />
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">سند حقوقی</span>
            </motion.div>
            <motion.h1 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl font-black text-white mb-6"
            >
               {content?.title || "حقوق و تعهدات کاربر"}
            </motion.h1>
            <motion.p 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-gray-400 font-light"
            >
               آخرین بروزرسانی: ۱۴۰۳
            </motion.p>
         </div>

         {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-70">
               <Loader2 size={40} className="text-luma-pink animate-spin mb-4" />
               <p className="text-sm text-gray-400">در حال دریافت قوانین...</p>
            </div>
         ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-red-400">
               <AlertCircle size={40} className="mb-4" />
               <p>{error}</p>
            </div>
         ) : (
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="prose prose-invert prose-lg max-w-none font-light dir-rtl text-justify"
            >
               <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                     h1: ({node, ...props}) => <h1 className="text-3xl font-black text-white mt-12 mb-6" {...props} />,
                     h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2" {...props} />,
                     h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-100 mt-8 mb-3 flex items-center gap-2" {...props}><div className="w-1.5 h-1.5 rounded-full bg-luma-pink" />{props.children}</h3>,
                     p: ({node, ...props}) => <p className="text-gray-300 leading-9 mb-6 text-justify" {...props} />,
                     ul: ({node, ...props}) => <ul className="space-y-2 mb-6 list-none pr-0" {...props} />,
                     li: ({node, children, ...props}) => (
                        <li className="relative pr-6 text-gray-300 leading-8" {...props}>
                           <span className="absolute top-3 right-0 w-1.5 h-1.5 bg-luma-pink rounded-full opacity-70" />
                           {children}
                        </li>
                     ),
                     strong: ({node, ...props}) => <strong className="text-white font-bold" {...props} />,
                     a: ({node, ...props}) => <a className="text-luma-pink hover:text-white transition-colors underline underline-offset-4" target="_blank" rel="noopener noreferrer" {...props} />,
                     blockquote: ({node, ...props}) => (
                        <div className="my-8 border-r-4 border-luma-pink bg-white/5 p-6 rounded-l-xl text-gray-300 italic">
                           {props.children}
                        </div>
                     ),
                  }}
               >
                  {content?.markdown || ""}
               </ReactMarkdown>
            </motion.div>
         )}

      </div>
    </div>
  );
};

export default PrivacyPage;
