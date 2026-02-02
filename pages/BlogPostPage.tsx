import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Clock, Calendar, ChevronLeft, Share2, Sparkles, 
  User, Quote, Terminal, Copy, Check, ArrowRight, Play, Image as ImageIcon
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// --- Types ---

interface BlogPost {
  id: string;
  title: string;
  coverImage: string | null;
  content: string;
  readTime: number;
  date: string;
  author: string;
  tags: string[];
}

interface NavItem {
  id: string;
  title: string;
  url: string;
}

// --- Helper Components ---

const CodeBlock = ({ code, language = 'bash' }: { code: string, language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-10 rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl relative group dir-ltr text-left">
      <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/5 select-none">
        <div className="flex gap-2">
           <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
           <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
           <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex items-center gap-2 opacity-50">
           <Terminal size={12} className="text-gray-400" />
           <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{language}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </div>
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={vscDarkPlus}
        customStyle={{ 
           margin: 0, 
           padding: '1.5rem', 
           fontSize: '0.9rem', 
           background: 'transparent', 
           lineHeight: '1.7',
           fontFamily: 'Menlo, Monaco, Consolas, monospace'
        }}
        showLineNumbers={true}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const MediaCard = ({ src, alt, type }: { src: string, alt?: string, type: 'image' | 'video' | 'audio' }) => {
  if (type === 'video') {
    return (
      <div className="my-12 rounded-[32px] overflow-hidden border border-white/10 bg-[#050505] shadow-2xl w-full group">
         <video src={src} controls className="w-full h-auto block" />
      </div>
    );
  }

  if (type === 'audio') {
    return (
      <div className="my-8 rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 flex items-center gap-4 shadow-lg w-full">
          <div className="w-12 h-12 rounded-full bg-luma-pink/10 flex items-center justify-center border border-luma-pink/20 shrink-0">
              <Play size={20} className="text-luma-pink fill-luma-pink ml-1" />
          </div>
          <audio src={src} controls className="w-full h-10 accent-luma-pink" />
      </div>
    );
  }

  // Image Default
  return (
    <figure className="my-12 group w-full">
      <div className="rounded-[32px] overflow-hidden border border-white/10 bg-[#050505] shadow-2xl transition-transform duration-500 hover:scale-[1.01] relative">
         {/* Skeleton / Fallback bg */}
         <div className="absolute inset-0 bg-[#111] animate-pulse -z-10" />
         <img 
            src={src} 
            alt={alt || "Blog Image"} 
            className="w-full h-auto block m-0" 
            loading="lazy" 
         />
      </div>
      {alt && (
         <figcaption className="text-center text-sm text-gray-500 mt-3 font-medium">
            {alt}
         </figcaption>
      )}
    </figure>
  );
};

// --- Related Post Card Component ---

const RelatedPostCard: React.FC<{ item: NavItem }> = ({ item }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<{ image: string | null, desc: string } | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const uuid = item.url.replace('#', '');
        const res = await fetch(`https://luma-doc.nebula-ai-company.workers.dev/api/pages/${uuid}/markdown`);
        const json = await res.json();
        
        if (isMounted) {
            const extracted = extractData(json.markdown, item.title);
            // Clean description: remove markdown symbols
            const cleanDesc = extracted.content
                .replace(/!\[.*?\]\(.*?\)/g, '') 
                .replace(/\[.*?\]\(.*?\)/g, '')
                .replace(/[#*`]/g, '')
                .split('\n')
                .filter(line => line.trim().length > 0)
                .join(' ')
                .substring(0, 100) + '...';
                
            setData({ image: extracted.coverImage, desc: cleanDesc });
        }
      } catch (e) {
        console.error(e);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [item]);

  const handleClick = () => {
      navigate(`/blog/${item.url.replace('#', '')}`);
      window.scrollTo(0, 0);
  };

  return (
    <div onClick={handleClick} className="group cursor-pointer">
        <div className="aspect-[4/3] rounded-3xl bg-[#1a1a1a] border border-white/5 overflow-hidden mb-6 relative">
            {data?.image ? (
                <img src={data.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <ImageIcon className="text-white/20" size={32} />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="flex items-center gap-2 text-white text-sm font-bold">
                    مطالعه کنید <ArrowRight size={16} className="rotate-180" />
                </span>
            </div>
        </div>
        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-luma-pink transition-colors leading-tight">
            {item.title}
        </h4>
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            {data?.desc || "در حال بارگذاری..."}
        </p>
    </div>
  );
};

// --- Helper Functions ---

const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const extractData = (rawMarkdown: string, titleFromNav?: string) => {
  const lines = rawMarkdown.split('\n');
  const firstLine = lines[0].trim();
  const isUrl = firstLine.startsWith('http') || firstLine.startsWith('https');
  
  let coverImage = null;
  let content = rawMarkdown;

  if (isUrl) {
    coverImage = firstLine;
    content = lines.slice(1).join('\n');
  }

  return {
    title: titleFromNav || "عنوان مقاله",
    coverImage,
    content,
    readTime: calculateReadTime(content),
    date: new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }),
    author: "تیم تحریریه لوما",
    tags: ["هوش مصنوعی", "تکنولوژی", "آموزش"]
  };
};

// --- URL Detection Helpers ---

const getMediaType = (url: string): 'image' | 'video' | 'audio' | null => {
  if (!url) return null;
  const cleanUrl = url.toLowerCase();
  
  if (/\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff|ico)([\?#].*)?$/.test(cleanUrl) || cleanUrl.includes('/_next/image')) return 'image';
  if (/\.(mp4|webm|mov|mkv|avi|wmv)([\?#].*)?$/.test(cleanUrl)) return 'video';
  if (/\.(mp3|wav|ogg|m4a|aac)([\?#].*)?$/.test(cleanUrl)) return 'audio';
  
  return null;
};

// --- Main Component ---

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<NavItem[]>([]);
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPost = async () => {
      try {
        setLoading(true);
        // First get navigation to find title and related posts
        const navRes = await fetch('https://luma-doc.nebula-ai-company.workers.dev/api/navigation');
        const navData = await navRes.json();
        
        let title = "";
        const findTitle = (items: any[]) => {
            for (const item of items) {
                if (item.id === id || item.url?.includes(id || '')) return item.title;
                if (item.items) {
                    const found = findTitle(item.items);
                    if (found) return found;
                }
            }
            return null;
        };
        
        if (navData.navigation) {
            title = findTitle(navData.navigation) || "";

            // Find Blog section and select 3 random posts
            const blogSection = navData.navigation.find((s: any) => s.title.trim() === "بلاگ");
            if (blogSection && Array.isArray(blogSection.items)) {
                const currentId = id || '';
                // Filter out current post
                const otherPosts = blogSection.items.filter((item: any) => !item.url.includes(currentId) && item.id !== currentId);
                // Shuffle
                const shuffled = otherPosts.sort(() => 0.5 - Math.random());
                // Take 3
                setRelatedPosts(shuffled.slice(0, 3));
            }
        }

        const response = await fetch(`https://luma-doc.nebula-ai-company.workers.dev/api/pages/${id}/markdown`);
        const data = await response.json();
        
        const extracted = extractData(data.markdown, title || data.title);
        setPost({ id: id!, ...extracted });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-luma-purple border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500 text-sm animate-pulse">در حال بارگذاری مقاله...</p>
            </div>
        </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-luma-pink selection:text-white font-sans">
      
      {/* --- 1. Immersive Hero Section --- */}
      <div className="relative h-[75vh] w-full overflow-hidden">
         
         <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: heroY, scale: heroScale }}
         >
            {post.coverImage ? (
                <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#2a1b3d] via-[#1a1a1a] to-[#0a0a0a]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
         </motion.div>

         <div className="absolute inset-0 z-10 flex flex-col justify-end pb-20 px-6">
            <div className="max-w-4xl mx-auto w-full">
                
                <motion.button 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/blog')}
                    className="mb-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors group w-fit"
                >
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/10 group-hover:bg-white/20">
                        <ChevronLeft size={16} />
                    </div>
                    <span className="text-sm font-medium">بازگشت به وبلاگ</span>
                </motion.button>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap gap-3 mb-6"
                >
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-2">
                        <Calendar size={14} className="text-luma-purple" />
                        {post.date}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-2">
                        <Clock size={14} className="text-luma-pink" />
                        {post.readTime} دقیقه مطالعه
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-2">
                        <User size={14} className="text-luma-yellow" />
                        {post.author}
                    </span>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-8"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                        {post.title}
                    </span>
                </motion.h1>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2"
                >
                    {post.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-bold text-luma-purple/80 px-2 py-1 bg-luma-purple/10 rounded border border-luma-purple/20">
                            #{tag}
                        </span>
                    ))}
                </motion.div>

            </div>
         </div>
      </div>

      {/* --- 2. Content Section --- */}
      <div className="max-w-4xl mx-auto px-6 relative z-20 pb-32">
         
         <article className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
               remarkPlugins={[remarkGfm]}
               components={{
                  // --- Structure ---
                  h1: ({node, ...props}) => <h1 className="hidden" {...props} />,
                  h2: ({node, ...props}) => (
                     <div className="mt-16 mb-8">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 pb-4 border-b border-white/10" {...props}>
                           <div className="w-2 h-8 bg-gradient-to-b from-luma-purple to-luma-pink rounded-full" />
                           {props.children}
                        </h2>
                     </div>
                  ),
                  h3: ({node, ...props}) => (
                     <h3 className="text-xl font-bold text-gray-100 mt-12 mb-4 flex items-center gap-2" {...props}>
                        <Sparkles size={18} className="text-luma-yellow" />
                        {props.children}
                     </h3>
                  ),
                  hr: ({node, ...props}) => (
                     <hr className="my-16 border-white/5" {...props} />
                  ),

                  // --- Text & Lists ---
                  strong: ({node, ...props}) => <strong className="text-white font-bold" {...props} />,
                  ul: ({node, ...props}) => <ul className="space-y-4 mb-8 list-none pr-0 my-8" {...props} />,
                  li: ({node, children, ...props}) => (
                     <li className="relative pr-8 text-gray-300 leading-9 text-lg" {...props}>
                        <span className="absolute top-3.5 right-0 w-2 h-2 bg-luma-purple rounded-full ring-4 ring-luma-purple/10" />
                        {children}
                     </li>
                  ),
                  blockquote: ({node, children, ...props}) => (
                     <div className="my-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#151515] to-[#0a0a0a] border border-white/10 p-8 shadow-2xl">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                           <Quote size={80} className="text-white" />
                        </div>
                        <div className="absolute left-0 top-8 bottom-8 w-1 bg-luma-yellow rounded-r-full" />
                        <div className="relative z-10 text-xl font-medium text-gray-200 italic leading-relaxed pl-6">
                           {children}
                        </div>
                     </div>
                  ),

                  // --- Code ---
                  code(props) {
                     const {children, className, node, ...rest} = props
                     const match = /language-(\w+)/.exec(className || '')
                     if (match) {
                        return <CodeBlock code={String(children).replace(/\n$/, '')} language={match[1]} />
                     }
                     return <code className="bg-white/10 text-luma-pink px-1.5 py-0.5 rounded text-[0.9em] font-mono border border-white/5 mx-1" {...rest}>{children}</code>
                  },

                  // --- Media Handling (Images, Videos, Links) ---
                  img: ({node, src, alt, ...props}) => {
                     // Always render Markdown images as MediaCards
                     if (!src) return null;
                     const type = getMediaType(src) || 'image';
                     return <MediaCard src={src} alt={alt} type={type} />;
                  },

                  a: ({node, href, children, ...props}) => {
                     if (!href) return <>{children}</>;
                     
                     // Check if link points to media
                     const mediaType = getMediaType(href);
                     if (mediaType) {
                        return <MediaCard src={href} alt={String(children)} type={mediaType} />;
                     }

                     // Regular link
                     return (
                        <a 
                           href={href}
                           className="text-luma-pink border-b border-luma-pink/30 hover:border-luma-pink transition-colors no-underline font-medium hover:text-white pb-0.5" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           {...props}
                        >
                           {children}
                        </a>
                     );
                  },

                  // --- Smart Paragraph (Detect Raw URLs) ---
                  p: ({node, children, ...props}) => {
                     // 1. Check if children contain a single raw URL string
                     if (node.children && node.children.length === 1 && node.children[0].type === 'text') {
                        const text = node.children[0].value.trim();
                        // Basic check for URL format
                        if (text.startsWith('http')) {
                           const mediaType = getMediaType(text);
                           if (mediaType) {
                              return <MediaCard src={text} type={mediaType} />;
                           }
                        }
                     }

                     // 2. Default Paragraph
                     return <p className="text-gray-300 text-lg leading-10 font-light mb-8 text-justify" {...props}>{children}</p>;
                  },
               }}
            >
               {post.content}
            </ReactMarkdown>
         </article>

         {/* --- 3. Share & Actions --- */}
         <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
               <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white font-medium">
                  <Share2 size={18} />
                  اشتراک‌گذاری
               </button>
               <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-luma-purple/10 hover:bg-luma-purple/20 border border-luma-purple/20 text-luma-purple transition-colors font-medium">
                  <Copy size={18} />
                  کپی لینک
               </button>
            </div>
            <div className="text-gray-500 text-sm">
               نوشته شده با ❤️ توسط تیم لوما
            </div>
         </div>

      </div>

      {/* --- 4. Related Posts --- */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-[#050505] border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
                <Sparkles className="text-luma-yellow" />
                شاید دوست داشته باشید
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((item) => (
                    <RelatedPostCard key={item.id} item={item} />
                ))}
                </div>
            </div>
        </section>
      )}

    </div>
  );
};

export default BlogPostPage;