import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Clock, Calendar, Share2, 
  ChevronLeft, Copy, Check, Sparkles, Image as ImageIcon, 
  FileText, ArrowDown, Quote, User
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import postsFallback from '../components/posts-fallback.json';
import { 
  BlogPostItem, 
  toPersianNum, 
  formatPersianDate, 
  resolveCoverImage, 
  resolveExcerpt, 
  isFarsiText, 
  calculateReadTime 
} from '../lib/blogUtils';
import { usePageMetadata } from '../components/SEOHead';
import usePageStructuredData from '../components/StructuredData';
import { buildBlogPostStructuredData } from '../lib/structuredData';
import { LazySyntaxHighlighter } from '../components/CodeBlock/LazySyntaxHighlighter';

// --- Helpers ---

const getMediaType = (url: string) => {
  if (!url) return null;
  const cleanUrl = url.split('?')[0].toLowerCase();
  if (cleanUrl.match(/\.(mp4|webm|ogg|mov)$/)) return 'video';
  if (cleanUrl.match(/\.(mp3|wav|ogg)$/)) return 'audio';
  if (cleanUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'image';
  if (cleanUrl.match(/\.pdf$/)) return 'pdf';
  return null;
};

// --- Custom Markdown Renderers ---

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const isFarsi = isFarsiText(code, language);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isFarsi) {
    return (
      <div 
        dir="rtl"
        className="my-8 md:my-10 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-white/10 bg-[#0d0d0d] shadow-xl dark:shadow-2xl relative group"
      >
        {/* Persian Code Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 dark:border-white/5 bg-zinc-900/50 backdrop-blur-md select-none">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-zinc-400">
              {language ? `نمونه / ${language}` : 'نمونه متن و دستورات'}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
            aria-label={copied ? 'کپی شد' : 'کپی متن'}
          >
            {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
            <span>{copied ? 'کپی شد' : 'کپی'}</span>
          </button>
        </div>

        {/* Persian Text / Code Content */}
        <pre 
          dir="rtl"
          className="p-5 md:p-6 text-right font-sans text-zinc-100 text-[15px] md:text-base leading-8 md:leading-9 whitespace-pre-wrap break-words font-normal selection:bg-luma-purple/40 selection:text-white m-0 overflow-x-auto"
          style={{ fontFamily: "'IRANYekanX', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          <code className="font-inherit">{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="my-8 md:my-10 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-[#0d0d0d] shadow-xl dark:shadow-2xl relative group dir-ltr text-left">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-white/5 bg-zinc-900/50 backdrop-blur-md select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs font-mono text-zinc-500 lowercase">{language || 'code'}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
          aria-label={copied ? 'کپی شد' : 'کپی کد'}
        >
          {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Syntax Highlighted Code */}
      <div className="p-0 overflow-x-auto">
        <LazySyntaxHighlighter
          code={code}
          language={language || 'bash'}
          showLineNumbers={code.split('\n').length > 3}
        />
      </div>
    </div>
  );
};

const MediaCard: React.FC<{ src: string; alt?: string; type: string }> = ({ src, alt, type }) => {
  if (type === 'video') {
    return (
      <figure className="my-10 rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-black/50 shadow-2xl relative group">
        <video 
          controls 
          className="w-full h-auto max-h-[550px] object-contain mx-auto"
          preload="metadata"
        >
          <source src={src} />
          مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
        </video>
        {alt && (
          <figcaption className="text-center text-sm text-zinc-500 dark:text-gray-400 mt-2 p-2">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  }

  if (type === 'audio') {
    return (
      <figure className="my-8 p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 backdrop-blur-md flex flex-col gap-2">
        <audio controls className="w-full h-10 accent-luma-purple">
          <source src={src} />
          مرورگر شما از پخش صدا پشتیبانی نمی‌کند.
        </audio>
        {alt && <figcaption className="text-xs text-zinc-500 dark:text-gray-400 text-center">{alt}</figcaption>}
      </figure>
    );
  }

  if (type === 'pdf') {
    return (
      <div className="my-8">
        <a 
          href={src} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 transition-all flex items-center justify-between group text-decoration-none"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <div className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-luma-pink transition-colors">
                {alt || 'دریافت فایل ضمیمه (PDF)'}
              </div>
              <div className="text-xs text-zinc-500 dark:text-gray-400 mt-0.5">برای مشاهده و دانلود کلیک کنید</div>
            </div>
          </div>
          <ArrowDown size={18} className="text-zinc-400 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    );
  }

  // Image Default
  return (
    <figure className="my-12 group w-full">
      <div className="rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#050505] shadow-xl dark:shadow-2xl transition-transform duration-500 hover:scale-[1.01] relative">
         <div className="absolute inset-0 bg-zinc-100 dark:bg-[#111] animate-pulse -z-10" />
         <img 
            src={src} 
            alt={alt || "تصویر مقاله لوما"} 
            className="w-full h-auto block m-0" 
            loading="lazy" 
         />
      </div>
      {alt && (
         <figcaption className="text-center text-sm text-zinc-500 dark:text-gray-500 mt-3 font-medium">
            {alt}
         </figcaption>
      )}
    </figure>
  );
};

const RelatedPostCard: React.FC<{ item: BlogPostItem }> = ({ item }) => {
  const target = item.slug || item.pageId || item.id;
  const postUrl = `/blog/${encodeURIComponent(target)}`;
  const coverImage = useMemo(() => resolveCoverImage(item), [item]);
  const excerpt = useMemo(() => resolveExcerpt(item), [item]);
  const rawDate = item.date || item.publishedAt;
  const dateFormatted = useMemo(() => formatPersianDate(item.date, item.publishedAt), [item.date, item.publishedAt]);

  return (
    <article className="group flex flex-col h-full">
        <Link 
          to={postUrl}
          onClick={() => window.scrollTo(0, 0)}
          className="aspect-[4/3] rounded-3xl bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-white/5 overflow-hidden mb-5 relative shadow-sm block focus:outline-none focus-visible:ring-2 focus-visible:ring-luma-pink"
          aria-label={`مطالعه مقاله: ${item.title}`}
        >
            {coverImage ? (
                <img 
                  src={coverImage} 
                  alt={item.title ? `تصویر مقاله: ${item.title}` : 'تصویر مرتبط'} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  loading="lazy" 
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-200/50 dark:bg-white/5">
                    <ImageIcon className="text-zinc-400 dark:text-white/20" size={32} aria-hidden="true" />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="flex items-center gap-2 text-white text-xs font-bold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    مطالعه کنید <ArrowRight size={14} className="rotate-180" aria-hidden="true" />
                </span>
            </div>
            {item.tags && item.tags.length > 0 && (
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/70 backdrop-blur-md text-zinc-800 dark:text-white text-[10px] font-bold border border-zinc-200/50 dark:border-white/10">
                {item.tags[0]}
              </span>
            )}
        </Link>
        <div className="text-xs text-zinc-400 dark:text-gray-500 mb-2 flex items-center gap-2">
          {rawDate ? (
            <time dateTime={rawDate}>{dateFormatted}</time>
          ) : null}
          {item.readingTime && (
            <>
              {rawDate ? <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" aria-hidden="true" /> : null}
              <span>{toPersianNum(item.readingTime)} دقیقه مطالعه</span>
            </>
          )}
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 leading-snug line-clamp-2">
            <Link 
              to={postUrl}
              onClick={() => window.scrollTo(0, 0)}
              className="group-hover:text-luma-pink transition-colors focus:outline-none focus-visible:underline"
            >
              {item.title}
            </Link>
        </h3>
        <p className="text-zinc-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed font-light mt-auto">
            {excerpt}
        </p>
    </article>
  );
};

// --- Main Page ---

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<BlogPostItem | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const postMetadata = useMemo(() => {
    if (!post) return undefined;
    const excerpt = resolveExcerpt(post);
    return {
      title: `${post.title} | وبلاگ لوما`,
      description: excerpt,
      ogTitle: `${post.title} | وبلاگ لوما`,
      ogDescription: excerpt,
      ogType: 'article' as const,
      twitterCard: 'summary' as const,
      twitterTitle: `${post.title} | وبلاگ لوما`,
      twitterDescription: excerpt,
    };
  }, [post]);

  const postStructuredData = useMemo(() => {
    if (!post) return null;
    return buildBlogPostStructuredData(post);
  }, [post]);

  usePageMetadata(postMetadata);
  usePageStructuredData(postStructuredData);

  useEffect(() => {
    const fetchCurrentPost = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);

      try {
        // Fetch all posts from modern blog API
        const response = await fetch('https://luma-doc.nebula-ai-company.workers.dev/api/blog');
        let allPosts: BlogPostItem[] = [];

        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data.posts)) {
            allPosts = data.posts;
          }
        }

        // Decode parameter safely
        const decodedId = decodeURIComponent(id).trim().toLowerCase();

        // Find current post by slug, pageId, or id
        let found = allPosts.find(p => 
          (p.slug && p.slug.toLowerCase() === decodedId) ||
          (p.pageId && p.pageId.toLowerCase() === decodedId) ||
          (p.id && p.id.toLowerCase() === decodedId)
        );

        // Fallback strategy to local mock/markdown assets if API failed or item not in main list
        if (!found) {
          const localMatch = (postsFallback as Record<string, any>)[id] || 
                             Object.values(postsFallback).find((p: any) => p.slug === id || p.title === id);
          if (localMatch) {
            found = {
              id: id,
              title: localMatch.title || 'مقاله آموزشی لوما',
              content: localMatch.markdown || '',
              fullDescription: localMatch.markdown || '',
              tags: ['هوش مصنوعی'],
              ...(localMatch.date ? { date: localMatch.date } : {}),
              ...(localMatch.publishedAt ? { publishedAt: localMatch.publishedAt } : {}),
              readingTime: 5
            };
          }
        }

        if (found) {
          setPost(found);
          // Pick related posts
          const others = allPosts.filter(p => (p.slug || p.id) !== (found?.slug || found?.id));
          setRelatedPosts(others.slice(0, 3));
        } else {
          setError('مقاله مورد نظر یافت نشد');
        }

      } catch (err: any) {
        console.error('Failed to fetch post:', err);
        setError('خطا در بارگذاری اطلاعات مقاله');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentPost();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || 'وبلاگ لوما',
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Memoized values
  const coverImage = useMemo(() => post ? resolveCoverImage(post) : null, [post]);
  const rawDate = post?.date || post?.publishedAt;
  const dateFormatted = useMemo(() => formatPersianDate(post?.date, post?.publishedAt), [post?.date, post?.publishedAt]);
  const readTimeFormatted = useMemo(() => {
    if (!post) return '';
    const time = post.readingTime || calculateReadTime(post.content || post.fullDescription || '');
    return `${toPersianNum(time)} دقیقه مطالعه`;
  }, [post]);

  const postAuthor = post?.author || post?.writer || 'تیم لوما';
  const postTags = post?.tags || [];
  const markdownContent = post?.content || post?.fullDescription || '';

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] pt-32 pb-20 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-luma-purple/20 border-t-luma-purple rounded-full animate-spin mb-4" />
        <p className="text-zinc-500 dark:text-gray-400 font-light text-sm">در حال دریافت و آماده‌سازی محتوا...</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] pt-32 pb-20 flex flex-col items-center justify-center px-6">
        <div className="w-16 h-16 rounded-3xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6">
           <FileText size={32} aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
           {error || 'مقاله‌ای یافت نشد'}
        </h1>
        <p className="text-zinc-500 dark:text-gray-400 mb-8 max-w-sm text-center">
           ممکن است آدرس مقاله تغییر کرده باشد یا صفحه حذف شده باشد.
        </p>
        <Link 
          to="/blog"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <ArrowRight size={16} aria-hidden="true" />
          بازگشت به لیست مقالات
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white selection:bg-luma-pink selection:text-white font-sans">
      
      <article>
        {/* --- 1. Immersive Hero Header --- */}
        <header className="relative min-h-[65vh] md:min-h-[75vh] w-full overflow-hidden flex flex-col justify-end">
           
           {/* Background Hero Layer */}
           <motion.div 
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 z-0"
           >
              {coverImage ? (
                 <img 
                   src={coverImage} 
                   alt={post.title ? `تصویر اصلی مقاله: ${post.title}` : 'تصویر اصلی مقاله لوما'} 
                   className="w-full h-full object-cover"
                 />
              ) : (
                 <div className="w-full h-full bg-gradient-to-br from-[#2a1b3d] via-[#1a1a1a] to-[#0a0a0a]" />
              )}
              
              {/* Premium Gradient Scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/70 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/80 dark:to-transparent" />
              <div className="absolute inset-0 bg-black/30 dark:bg-black/40 backdrop-blur-[2px]" />
           </motion.div>

           {/* Hero Content Container */}
           <div className="relative z-10 pb-16 md:pb-20 px-6 pt-32">
              <div className="max-w-4xl mx-auto w-full">
                 
                 {/* Back Button */}
                 <Link 
                   to="/blog"
                   className="mb-8 flex items-center gap-2 text-zinc-700 hover:text-zinc-950 dark:text-white/70 dark:hover:text-white transition-colors group w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple rounded-full"
                   aria-label="بازگشت به مقالات وبلاگ"
                 >
                   <div className="w-8 h-8 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur flex items-center justify-center border border-zinc-200 dark:border-white/10 group-hover:bg-zinc-100 dark:group-hover:bg-white/20 shadow-sm text-zinc-700 dark:text-white transition-all">
                      <ChevronLeft size={16} aria-hidden="true" />
                   </div>
                   <span className="text-sm font-medium">بازگشت به مقالات</span>
                 </Link>

                 {/* Badges & Meta */}
                 <div className="flex flex-wrap gap-3 mb-6">
                    {rawDate ? (
                      <time 
                        dateTime={rawDate}
                        className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-white flex items-center gap-2 shadow-sm"
                      >
                        <Calendar size={13} className="text-luma-purple" aria-hidden="true" />
                        {dateFormatted}
                      </time>
                    ) : null}
                    {readTimeFormatted && (
                      <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-white flex items-center gap-2 shadow-sm">
                        <Clock size={13} className="text-luma-pink" aria-hidden="true" />
                        {readTimeFormatted}
                      </span>
                    )}
                    {postAuthor && (
                      <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-white flex items-center gap-2 shadow-sm">
                        <User size={13} className="text-luma-yellow" aria-hidden="true" />
                        {postAuthor}
                      </span>
                    )}
                 </div>

                 {/* Single Page H1: Article Title */}
                 <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight mb-8"
                 >
                    <span className="text-zinc-950 dark:text-white drop-shadow-sm">
                       {post.title}
                    </span>
                 </motion.h1>

                 {/* Post Tags */}
                 {postTags && postTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                       {postTags.map((tag, i) => (
                          <span key={i} className="text-xs font-bold text-luma-purple px-2.5 py-1 bg-luma-purple/10 rounded-lg border border-luma-purple/20">
                             #{tag}
                          </span>
                       ))}
                    </div>
                 )}

              </div>
           </div>
        </header>

        {/* --- 2. Content Section --- */}
        <div className="max-w-4xl mx-auto px-6 relative z-20 pb-28">
           
           <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
              <ReactMarkdown
                 remarkPlugins={[remarkGfm]}
                 components={{
                    // --- Structure: Ensure heading hierarchy and avoid duplicate H1 ---
                    h1: ({node, ...props}) => {
                       const text = String(props.children || '');
                       if (text.trim() === post?.title?.trim()) {
                          return null;
                       }
                       return (
                          <div className="mt-14 mb-6">
                             <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3 pb-3 border-b border-zinc-200 dark:border-white/10" {...props}>
                                <div className="w-1.5 h-7 bg-gradient-to-b from-luma-purple to-luma-pink rounded-full" />
                                {props.children}
                             </h2>
                          </div>
                       );
                    },
                    h2: ({node, ...props}) => (
                       <div className="mt-14 mb-6">
                          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3 pb-3 border-b border-zinc-200 dark:border-white/10" {...props}>
                             <div className="w-1.5 h-7 bg-gradient-to-b from-luma-purple to-luma-pink rounded-full" />
                             {props.children}
                          </h2>
                       </div>
                    ),
                    h3: ({node, ...props}) => (
                       <h3 className="text-xl font-bold text-zinc-800 dark:text-gray-100 mt-10 mb-4 flex items-center gap-2" {...props}>
                          <Sparkles size={16} className="text-luma-yellow" aria-hidden="true" />
                          {props.children}
                       </h3>
                    ),
                    hr: ({node, ...props}) => (
                       <hr className="my-14 border-zinc-200 dark:border-white/5" {...props} />
                    ),

                    // --- Text & Lists ---
                    strong: ({node, ...props}) => <strong className="text-zinc-950 dark:text-white font-bold" {...props} />,
                    ul: ({node, ...props}) => <ul className="space-y-3 mb-8 list-none pr-0 my-6" {...props} />,
                    li: ({node, children, ...props}) => (
                       <li className="relative pr-7 text-zinc-800 dark:text-gray-300 leading-9 text-base md:text-lg" {...props}>
                          <span className="absolute top-3.5 right-0 w-2 h-2 bg-luma-purple rounded-full ring-4 ring-luma-purple/10" aria-hidden="true" />
                          {children}
                       </li>
                    ),
                    blockquote: ({node, children, ...props}) => (
                       <div className="my-10 relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-[#151515] dark:to-[#0a0a0a] border border-zinc-200 dark:border-white/10 p-7 shadow-sm">
                          <div className="absolute top-0 right-0 p-6 opacity-3 dark:opacity-5 pointer-events-none">
                             <Quote size={70} className="text-zinc-400 dark:text-white" aria-hidden="true" />
                          </div>
                          <div className="absolute left-0 top-6 bottom-6 w-1 bg-luma-yellow rounded-r-full" />
                          <div className="relative z-10 text-lg md:text-xl font-medium text-zinc-800 dark:text-gray-200 italic leading-relaxed pl-6">
                             {children}
                          </div>
                       </div>
                    ),

                    // --- Code Block Semantics ---
                    pre: ({ children }) => <>{children}</>,
                    code(props) {
                       const {children, className, node, ...rest} = props;
                       const match = /language-(\w+)/.exec(className || '');
                       const codeStr = String(children).replace(/\n$/, '');

                       if (match) {
                          return <CodeBlock code={codeStr} language={match[1]} />;
                       }

                       // If code is multiline, treat as a code block
                       if (codeStr.includes('\n')) {
                          return <CodeBlock code={codeStr} language="text" />;
                       }

                       // Inline code handling
                       const isInlineFarsi = isFarsiText(codeStr);
                       if (isInlineFarsi) {
                          return (
                             <code 
                                dir="rtl"
                                className="bg-zinc-100 dark:bg-white/10 text-luma-pink dark:text-luma-pink px-2 py-0.5 rounded text-[0.92em] font-sans font-medium border border-zinc-200 dark:border-white/10 mx-1 inline-block" 
                                style={{ fontFamily: "'IRANYekanX', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
                                {...rest}
                             >
                                {children}
                             </code>
                          );
                       }

                       return (
                          <code 
                             dir="ltr"
                             className="bg-zinc-100 dark:bg-white/10 text-luma-pink px-1.5 py-0.5 rounded text-[0.88em] font-mono border border-zinc-200 dark:border-white/5 mx-1 inline-block" 
                             {...rest}
                          >
                             {children}
                          </code>
                       );
                    },

                    // --- Media Handling ---
                    img: ({node, src, alt, ...props}) => {
                       if (!src) return null;
                       const type = getMediaType(src) || 'image';
                       return <MediaCard src={src} alt={alt || (post?.title ? `تصویر: ${post.title}` : undefined)} type={type} />;
                    },

                    a: ({node, href, children, ...props}) => {
                       if (!href) return <>{children}</>;
                       
                       const mediaType = getMediaType(href);
                       if (mediaType) {
                          return <MediaCard src={href} alt={String(children)} type={mediaType} />;
                       }

                       return (
                          <a 
                             href={href}
                             className="text-luma-pink border-b border-luma-pink/30 hover:border-luma-pink transition-colors no-underline font-medium hover:text-zinc-950 dark:hover:text-white pb-0.5" 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             {...props}
                          >
                             {children}
                          </a>
                       );
                    },

                    // --- Smart Paragraph ---
                    p: ({node, children, ...props}) => {
                       if (node.children && node.children.length === 1 && node.children[0].type === 'text') {
                          const text = node.children[0].value.trim();
                          if (text.startsWith('http')) {
                             const mediaType = getMediaType(text);
                             if (mediaType) {
                                return <MediaCard src={text} type={mediaType} />;
                             }
                          }
                       }

                       return <p className="text-zinc-800 dark:text-gray-300 text-base md:text-lg leading-9 md:leading-10 font-light mb-7 text-justify" {...props}>{children}</p>;
                    },
                 }}
              >
                 {markdownContent}
              </ReactMarkdown>
           </div>

           {/* --- 3. Share & Actions --- */}
           <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-3 w-full sm:w-auto">
                 <button 
                    onClick={handleShare}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/5 transition-colors text-zinc-800 dark:text-white font-medium text-sm"
                    aria-label="اشتراک‌گذاری مقاله"
                 >
                    <Share2 size={16} aria-hidden="true" />
                    اشتراک‌گذاری
                 </button>
                 <button 
                    onClick={handleCopyLink}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-luma-purple/10 hover:bg-luma-purple/20 border border-luma-purple/20 text-luma-purple transition-colors font-medium text-sm"
                    aria-label={copiedLink ? 'لینک مقاله کپی شد' : 'کپی لینک مقاله'}
                 >
                    {copiedLink ? <Check size={16} className="text-green-500" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                    {copiedLink ? 'لینک کپی شد' : 'کپی لینک'}
                 </button>
              </div>
              <div className="text-zinc-500 dark:text-gray-500 text-xs flex items-center gap-1.5">
                 <Sparkles size={14} className="text-luma-purple" aria-hidden="true" />
                 نوشته شده توسط تیم تحریریه لوما
              </div>
           </div>

        </div>
      </article>

      {/* --- 4. Related Posts Section --- */}
      {relatedPosts.length > 0 && (
        <section aria-labelledby="related-posts-heading" className="py-20 bg-[#f5f5f7] dark:bg-[#050505] border-t border-zinc-200 dark:border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center justify-between mb-10">
                  <h2 id="related-posts-heading" className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                    <Sparkles className="text-luma-yellow" size={22} aria-hidden="true" />
                    شاید دوست داشته باشید
                  </h2>
                  <Link 
                    to="/blog"
                    className="text-xs md:text-sm font-medium text-luma-purple hover:underline flex items-center gap-1"
                    aria-label="مشاهده همه مقالات وبلاگ"
                  >
                    مشاهده همه
                    <ChevronLeft size={14} aria-hidden="true" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((item) => (
                    <RelatedPostCard key={item.id || item.slug} item={item} />
                ))}
                </div>
            </div>
        </section>
      )}

    </main>
  );
};

export default BlogPostPage;
