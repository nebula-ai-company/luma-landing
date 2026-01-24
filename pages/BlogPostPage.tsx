
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, Calendar, ChevronRight, Share2, Sparkles, 
  ArrowLeft, BookOpen, Image as ImageIcon, User, Tag
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

interface BlogPostContent {
  id: string;
  title: string;
  coverImage: string | null;
  markdown: string;
  readTime: number;
}

// --- Helper Functions ---
const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const extractCoverAndContent = (rawMarkdown: string) => {
  const lines = rawMarkdown.split('\n');
  const firstLine = lines[0].trim();
  const isUrl = firstLine.startsWith('http') || firstLine.startsWith('https');
  
  if (isUrl) {
    return {
      coverImage: firstLine,
      content: lines.slice(1).join('\n')
    };
  }
  return {
    coverImage: null,
    content: rawMarkdown
  };
};

// --- Related Post Card Component ---
const RelatedPostCard: React.FC<{ item: NavItem, onClick: () => void }> = ({ item, onClick }) => {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      try {
        const uuid = item.url.replace('#', '');
        const response = await fetch(`https://luma-doc.nebula-ai-company.workers.dev/api/pages/${uuid}/markdown`);
        const data = await response.json();
        if (isMounted) {
          const { coverImage } = extractCoverAndContent(data.markdown);
          setCoverImage(coverImage);
        }
      } catch (e) {
        // quiet fail
      }
    };
    fetchImage();
    return () => { isMounted = false; };
  }, [item]);

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col gap-4 p-4 rounded-3xl bg-[#121212] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
    >
      <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white/5 relative">
        {coverImage ? (
          <img src={coverImage} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            <ImageIcon size={24} />
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      </div>
      <div className="flex flex-col flex-1">
        <h4 className="text-white font-bold text-base leading-snug line-clamp-2 group-hover:text-luma-purple transition-colors mb-auto">
          {item.title}
        </h4>
        <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-500 border-t border-white/5 pt-3">
           <span className="flex items-center gap-1"><Calendar size={10} /> ۱۴۰۳/۰۴/۱۵</span>
           <div className="w-1 h-1 rounded-full bg-gray-700" />
           <span className="text-luma-yellow mr-auto flex items-center gap-1 group-hover:gap-2 transition-all">
             خواندن <ArrowLeft size={10} />
           </span>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<BlogPostContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<NavItem[]>([]);

  // Fetch Current Post & Related
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        // 1. Fetch Article Content
        const response = await fetch(`https://luma-doc.nebula-ai-company.workers.dev/api/pages/${id}/markdown`);
        const json = await response.json();
        
        const { coverImage, content } = extractCoverAndContent(json.markdown);
        
        setData({
          id: json.id,
          title: json.title,
          coverImage,
          markdown: content,
          readTime: calculateReadTime(content)
        });

        // 2. Fetch Navigation for Related Posts
        const navResponse = await fetch('https://luma-doc.nebula-ai-company.workers.dev/api/navigation');
        const navData = await navResponse.json();
        
        // Find Blog Section
        const blogSection = navData.navigation.find((s: NavSection) => s.title.trim() === "بلاگ");
        
        if (blogSection) {
          // Filter out current post
          const otherPosts = blogSection.items.filter((item: NavItem) => {
             const itemUuid = item.url.replace('#', '');
             return itemUuid !== id;
          });
          
          // Random Shuffle
          const shuffled = otherPosts.sort(() => 0.5 - Math.random());
          // Pick 3
          setRelatedPosts(shuffled.slice(0, 3));
        }

      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleRelatedClick = (url: string) => {
    const uuid = url.replace('#', '');
    navigate(`/blog/${uuid}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
         <div className="w-10 h-10 border-2 border-luma-purple border-t-transparent rounded-full animate-spin mb-4" />
         <p className="text-sm text-gray-500 animate-pulse">در حال آماده‌سازی مقاله...</p>
      </div>
    );
  }

  if (!data) return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
        <p className="text-lg text-gray-400 mb-6">مقاله‌ای با این مشخصات یافت نشد.</p>
        <button 
          onClick={() => navigate('/blog')} 
          className="px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold"
        >
          بازگشت به وبلاگ
        </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-luma-purple/30 selection:text-white font-sans">
      
      {/* Scroll Progress Bar (Simple Implementation) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-luma-purple origin-left z-50"
        style={{ scaleX: 0 }} // Note: Needs useScroll from framer-motion for real progress, simplified here
      />

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="pt-20"
      >
         {/* --- Article Hero --- */}
         <div className="relative w-full h-[55vh] min-h-[450px] overflow-hidden group">
            {data.coverImage ? (
               <>
                 <div className="absolute inset-0 bg-[#0a0a0a]" />
                 <img 
                    src={data.coverImage} 
                    alt={data.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[3s] group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
               </>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
                </div>
            )}
            
            <div className="absolute inset-0 flex flex-col justify-end pb-16 px-6">
               <div className="max-w-3xl mx-auto w-full">
                  <motion.button 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.1 }}
                     onClick={() => navigate('/blog')}
                     className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white mb-8 backdrop-blur-md bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10 transition-colors hover:bg-white/10"
                  >
                     <ChevronRight size={14} />
                     بازگشت به لیست مقالات
                  </motion.button>
                  
                  <motion.h1 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.2 }}
                     className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.2] tracking-tight drop-shadow-2xl"
                  >
                     {data.title}
                  </motion.h1>
                  
                  <motion.div 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-300 font-medium"
                  >
                     <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full pr-1 pl-3 py-1 border border-white/10">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-luma-purple to-luma-pink p-[1px]">
                           <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                              <User size={14} className="text-white" />
                           </div>
                        </div>
                        <span className="text-white text-xs">تحریریه لوما</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-luma-yellow" />
                        <span>۱۴۰۳/۰۴/۱۵</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Clock size={14} className="text-luma-pink" />
                        <span>{data.readTime} دقیقه مطالعه</span>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>

         {/* --- Article Content --- */}
         <div className="max-w-3xl mx-auto px-6 py-16 relative">
            
            {/* Background Decor */}
            <div className="absolute top-0 right-[-20%] w-[400px] h-[400px] bg-luma-purple/5 blur-[100px] rounded-full pointer-events-none" />
            
            <article className="prose prose-invert max-w-none relative z-10">
               <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                     // Enhanced Paragraphs
                     p: ({node, ...props}) => (
                        <p className="text-lg text-gray-300 leading-[2.4] mb-8 font-light text-justify tracking-wide opacity-90" {...props} />
                     ),
                     
                     // Headings
                     h2: ({node, ...props}) => (
                        <div className="mt-16 mb-8">
                           <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 pb-4 border-b border-white/10 relative" {...props}>
                              <span className="absolute -right-5 top-2 w-1.5 h-6 bg-luma-purple rounded-full" />
                              {props.children}
                           </h2>
                        </div>
                     ),
                     h3: ({node, ...props}) => (
                        <h3 className="text-xl font-bold text-gray-100 mt-12 mb-6 flex items-center gap-2" {...props}>
                           <div className="w-2 h-2 rounded-full bg-luma-pink ring-4 ring-luma-pink/10" />
                           {props.children}
                        </h3>
                     ),
                     
                     // Quotes
                     blockquote: ({node, ...props}) => (
                        <div className="my-12 relative overflow-hidden rounded-2xl bg-[#121212] border-r-4 border-luma-purple shadow-inner">
                           <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
                              <Sparkles size={60} />
                           </div>
                           <div className="p-8 text-xl text-gray-200 italic leading-relaxed relative z-10 font-light">
                              {props.children}
                           </div>
                        </div>
                     ),
                     
                     // Lists
                     ul: ({node, ...props}) => <ul className="space-y-4 mb-10 list-none pr-2" {...props} />,
                     li: ({node, children, ...props}) => (
                        <li className="relative pr-8 text-gray-300 leading-9 text-lg" {...props}>
                           <span className="absolute top-3.5 right-0 w-2 h-2 bg-[#222] border border-luma-yellow rounded-full" />
                           {children}
                        </li>
                     ),

                     // Images
                     img: ({node, ...props}) => (
                        <div className="my-12">
                           <div className="rounded-[24px] overflow-hidden border border-white/10 shadow-2xl bg-[#080808]">
                              <img 
                                 {...props} 
                                 className="w-full h-auto block m-0 opacity-90 hover:opacity-100 transition-opacity duration-500" 
                                 loading="lazy" 
                              />
                           </div>
                           {props.title && (
                              <div className="mt-3 text-center text-xs text-gray-500 font-medium">
                                 {props.title}
                              </div>
                           )}
                        </div>
                     ),

                     // Links
                     a: ({node, ...props}) => (
                        <a className="text-luma-purple border-b border-luma-purple/30 hover:border-luma-purple transition-all pb-0.5 hover:text-white mx-1 font-medium" target="_blank" rel="noopener noreferrer" {...props} />
                     ),
                     
                     // Code
                     code: ({node, className, children, ...props}) => {
                        const match = /language-(\w+)/.exec(className || '')
                        return !match ? (
                          <code className="bg-white/10 text-luma-pink px-1.5 py-0.5 rounded text-sm font-mono dir-ltr" {...props}>
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-[#121212] p-4 rounded-xl overflow-x-auto text-sm dir-ltr border border-white/10 my-6">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        )
                     }
                  }}
               >
                  {data.markdown}
               </ReactMarkdown>
            </article>

            {/* --- Post Footer --- */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex flex-wrap gap-2">
                  {['هوش مصنوعی', 'تکنولوژی', 'آموزش', 'خلاقیت'].map(tag => (
                     <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs border border-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer group flex items-center gap-1">
                        <Tag size={12} className="group-hover:text-luma-purple transition-colors" />
                        {tag}
                     </span>
                  ))}
               </div>
               <button className="flex items-center gap-3 text-white font-bold bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95">
                  <Share2 size={18} />
                  <span>اشتراک‌گذاری مقاله</span>
               </button>
            </div>
         </div>

         {/* --- Read Next Section --- */}
         {relatedPosts.length > 0 && (
            <div className="bg-[#050505] border-t border-white/5 py-24 mt-12 relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-luma-purple/5 blur-[120px] rounded-full pointer-events-none" />

               <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
                  <div className="flex flex-col items-center text-center mb-12">
                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-luma-purple/10 to-transparent border border-white/10 flex items-center justify-center mb-4">
                        <BookOpen size={24} className="text-luma-purple" />
                     </div>
                     <h3 className="text-3xl font-black text-white mb-2">ادامه یادگیری</h3>
                     <p className="text-gray-400 text-sm">مقالات پیشنهادی برای مطالعه بیشتر</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {relatedPosts.map((post) => (
                        <RelatedPostCard 
                           key={post.id} 
                           item={post} 
                           onClick={() => handleRelatedClick(post.url)} 
                        />
                     ))}
                  </div>
               </div>
            </div>
         )}

      </motion.div>
    </div>
  );
};

export default BlogPostPage;
