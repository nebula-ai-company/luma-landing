
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Clock, Calendar, ChevronRight, Share2, Sparkles, 
  ArrowLeft, Image as ImageIcon, Tag, Music, Quote
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

const getMediaType = (url: string) => {
  try {
      const cleanUrl = url.split('?')[0].split('#')[0];
      const extension = cleanUrl.split('.').pop()?.toLowerCase();
      
      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff'].includes(extension || '')) return 'image';
      if (['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(extension || '')) return 'video';
      if (['mp3', 'wav', 'aac', 'flac', 'm4a'].includes(extension || '')) return 'audio';
  } catch (e) {
      return 'link';
  }
  return 'link';
};

// --- Components ---

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
      className="group cursor-pointer flex flex-col h-full bg-transparent"
    >
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5 bg-[#1a1a1a] border border-white/5 group-hover:border-white/20 transition-colors">
        {coverImage ? (
          <img src={coverImage} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <ImageIcon size={32} />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                <ArrowLeft size={18} />
            </div>
        </div>
      </div>
      
      <div className="flex flex-col flex-1">
        <h4 className="text-xl font-bold text-gray-200 leading-snug group-hover:text-white transition-colors line-clamp-2 mb-3">
          {item.title}
        </h4>
        <span className="text-xs text-gray-500 group-hover:text-luma-pink transition-colors font-medium inline-flex items-center gap-1.5">
           مطالعه مقاله <ChevronRight size={14} className="rotate-180" />
        </span>
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
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

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
          
          // Random Shuffle & Pick 3
          const shuffled = otherPosts.sort(() => 0.5 - Math.random());
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
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
      >
         {/* --- Article Hero (Cinematic Full Height) --- */}
         <div className="relative w-full h-[75vh] min-h-[600px] overflow-hidden">
            <motion.div 
                className="absolute inset-0 w-full h-full"
                style={{ y: heroY }}
            >
                {data.coverImage ? (
                   <>
                     <motion.img 
                        src={data.coverImage} 
                        alt={data.title} 
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                        className="absolute inset-0 w-full h-full object-cover" 
                     />
                     <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
                   </>
                ) : (
                    <div className="absolute inset-0 bg-[#0a0a0a]">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/20 blur-[150px] rounded-full mix-blend-screen opacity-60" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/20 blur-[150px] rounded-full mix-blend-screen opacity-60" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    </div>
                )}
            </motion.div>
            
            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end pb-16 px-6 z-10">
               <motion.div 
                  className="max-w-screen-xl mx-auto w-full"
                  style={{ opacity: heroOpacity }}
               >
                  {/* Back Button */}
                  <motion.button 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.1 }}
                     onClick={() => navigate('/blog')}
                     className="group flex items-center gap-2 text-xs font-bold text-gray-200 hover:text-white mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md w-fit hover:bg-white/10 transition-all hover:pr-5"
                  >
                     <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                     بازگشت به لیست مقالات
                  </motion.button>
                  
                  {/* Title with Gradient Animation */}
                  <motion.h1 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.2 }}
                     className="text-5xl md:text-6xl lg:text-8xl font-black mb-8 leading-[1.15] tracking-tight drop-shadow-2xl max-w-none text-transparent bg-clip-text bg-[linear-gradient(to_right,#DA8FFF,#FF6482,#FFB340,#DA8FFF)] animate-text-flow bg-[length:200%_auto]"
                  >
                     {data.title}
                  </motion.h1>
                  
                  {/* Meta Data */}
                  <motion.div 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="flex flex-wrap items-center gap-4 text-sm font-medium"
                  >
                     <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <Calendar size={16} className="text-luma-yellow" />
                        <span className="text-gray-200">۱۴۰۳/۰۴/۱۵</span>
                     </div>
                     <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <Clock size={16} className="text-luma-pink" />
                        <span className="text-gray-200">{data.readTime} دقیقه مطالعه</span>
                     </div>
                     <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <Tag size={16} className="text-luma-purple" />
                        <span className="text-gray-200">هوش مصنوعی</span>
                     </div>
                  </motion.div>
               </motion.div>
            </div>
         </div>

         {/* --- Main Content (Wide Container) --- */}
         <div className="max-w-screen-xl mx-auto px-6 py-20">
            
            <article className="prose prose-invert prose-lg md:prose-xl max-w-none font-sans">
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                        // 1. Stylish H2 - Clean and modern (Line removed as requested)
                        h2: ({node, ...props}) => (
                            <h2 className="text-3xl md:text-4xl font-black text-white mt-16 mb-6 leading-tight scroll-mt-32" {...props}>
                                {props.children}
                            </h2>
                        ),
                        
                        // 2. Stylish H3 - Simple with dot accent
                        h3: ({node, ...props}) => (
                            <h3 className="text-xl md:text-2xl font-bold text-gray-100 mt-10 mb-4 flex items-center gap-3 scroll-mt-32" {...props}>
                                <div className="w-1.5 h-1.5 rounded-full bg-luma-pink/80" />
                                {props.children}
                            </h3>
                        ),

                        // 3. Readable Paragraphs - Optimized font weight and spacing
                        p: ({node, ...props}) => (
                            <p className="text-lg text-gray-300 leading-loose mb-8 font-normal text-justify tracking-normal opacity-90" {...props} />
                        ),

                        // 4. Modern Blockquote - Glassmorphism Card (No Serif/Italic)
                        blockquote: ({node, ...props}) => (
                            <div className="my-12 relative overflow-hidden rounded-2xl bg-[#111] border-r-4 border-luma-yellow shadow-lg group">
                                <div className="absolute top-4 right-4 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                                    <Quote size={40} className="text-luma-yellow" />
                                </div>
                                <div className="p-8 text-xl text-gray-200 font-medium leading-relaxed relative z-10">
                                    {props.children}
                                </div>
                            </div>
                        ),

                        // 5. Clean Lists - Custom Bullet Points
                        ul: ({node, ...props}) => <ul className="space-y-4 mb-10 list-none pr-0" {...props} />,
                        li: ({node, children, ...props}) => (
                            <li className="relative pr-8 text-gray-300 leading-8 text-lg group" {...props}>
                                <span className="absolute top-3 right-0 w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-luma-purple transition-colors ring-4 ring-black" />
                                {children}
                            </li>
                        ),

                        // 6. Styled Divider (Dots instead of line)
                        hr: ({node, ...props}) => (
                            <div className="my-20 flex items-center justify-center gap-3 opacity-20 select-none" {...props}>
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            </div>
                        ),

                        // 7. Media Links
                        a: ({node, ...props}) => {
                            const { href, children } = props;
                            if (!href) return <a {...props}>{children}</a>;
                            
                            const mediaType = getMediaType(href);
                            
                            // Image Embed
                            if (mediaType === 'image') {
                                return (
                                    <div className="my-16 flex flex-col items-center">
                                        <div className="rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-[#080808] w-full group">
                                            <img src={href} alt={String(children)} className="w-full h-auto block m-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500" loading="lazy" />
                                        </div>
                                        {children && String(children) !== href && (
                                            <span className="mt-4 text-sm text-gray-500 font-medium italic block text-center bg-[#121212] px-4 py-1.5 rounded-full border border-white/5">{children}</span>
                                        )}
                                    </div>
                                );
                            }
                            
                            // Video Embed
                            if (mediaType === 'video') {
                                return (
                                    <div className="my-16 w-full">
                                        <div className="rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-black relative aspect-video">
                                            <video controls className="w-full h-full block" preload="metadata">
                                                <source src={href} />
                                                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                                            </video>
                                        </div>
                                        {children && String(children) !== href && (
                                            <span className="mt-4 text-center text-sm text-gray-500 font-medium italic block">{children}</span>
                                        )}
                                    </div>
                                );
                            }

                            // Audio Embed
                            if (mediaType === 'audio') {
                                return (
                                    <div className="my-10 w-full">
                                        <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 flex flex-col gap-4 shadow-xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-full bg-luma-purple/10 flex items-center justify-center text-luma-purple shrink-0 border border-luma-purple/20 animate-pulse">
                                                    <Music size={24} />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-base font-bold text-gray-200 truncate dir-ltr text-right">{String(children) !== href ? children : href.split('/').pop()}</span>
                                                    <span className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-wider">Audio File • Luma Player</span>
                                                </div>
                                            </div>
                                            <audio controls className="w-full h-10 hue-rotate-15 invert-[.9] opacity-80 hover:opacity-100 transition-opacity rounded-lg">
                                                <source src={href} />
                                                مرورگر شما از پخش صدا پشتیبانی نمی‌کند.
                                            </audio>
                                        </div>
                                    </div>
                                );
                            }

                            // Standard Link (Clean, no permanent underline)
                            return (
                                <a className="text-luma-purple font-bold hover:text-luma-pink transition-colors px-1 rounded hover:bg-white/5" target="_blank" rel="noopener noreferrer" {...props}>
                                    {children}
                                </a>
                            );
                        },
                        img: ({node, ...props}) => (
                            <div className="my-16">
                                <div className="rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-[#080808] group">
                                    <img {...props} className="w-full h-auto block m-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500" loading="lazy" />
                                </div>
                                {props.title && <div className="mt-4 text-center text-xs text-gray-500 font-medium">{props.title}</div>}
                            </div>
                        ),
                        code: ({node, className, children, ...props}) => {
                            const match = /language-(\w+)/.exec(className || '')
                            return !match ? (
                                <code className="bg-white/10 text-luma-pink px-1.5 py-0.5 rounded text-[0.9em] font-mono dir-ltr border border-white/5 mx-1" {...props}>{children}</code>
                            ) : (
                                <pre className="bg-[#121212] p-6 rounded-3xl overflow-x-auto text-base dir-ltr border border-white/10 my-10 shadow-xl relative group">
                                    <div className="absolute top-0 right-0 left-0 h-10 bg-[#1a1a1a] border-b border-white/5 flex items-center px-4 gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                        <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                    </div>
                                    <code className={`${className} pt-8 block font-mono text-sm leading-relaxed`} {...props}>{children}</code>
                                </pre>
                            )
                        }
                    }}
                >
                    {data.markdown}
                </ReactMarkdown>
            </article>

            {/* Post Footer & Related */}
            <div className="mt-32 pt-16 border-t border-white/10">
                
                <div className="flex items-center gap-4 mb-16">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Tag size={16} />
                        برچسب‌ها:
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {['هوش مصنوعی', 'آموزش', 'تکنولوژی', 'Luma AI'].map(tag => (
                            <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 text-gray-300 text-xs font-medium border border-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer hover:border-white/20">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {relatedPosts.length > 0 && (
                    <div className="relative">
                        <div className="flex items-end justify-between mb-10">
                            <div>
                                <h3 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight">ادامه مطالعه</h3>
                                <p className="text-gray-400 text-base font-light">مقالات مرتبط که شاید برایتان جذاب باشد</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map(post => (
                                <RelatedPostCard 
                                    key={post.id} 
                                    item={post} 
                                    onClick={() => handleRelatedClick(post.url)} 
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

         </div>

      </motion.div>
    </div>
  );
};

export default BlogPostPage;
