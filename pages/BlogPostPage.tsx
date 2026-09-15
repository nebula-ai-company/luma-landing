import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Clock, Calendar, ChevronLeft, Share2, Sparkles, 
  User, Quote, Terminal, Copy, Check, ArrowRight, Play, Image as ImageIcon, Heart
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LazySyntaxHighlighter from '../components/CodeBlock/LazySyntaxHighlighter';
import navigationFallback from '../components/navigation-fallback.json';
import postsFallback from '../components/posts-fallback.json';
import { 
  BlogPostItem, 
  toPersianNum, 
  formatPersianDate, 
  resolveCoverImage, 
  resolveExcerpt, 
  cleanMarkdownBody, 
  calculateReadTime, 
  getMediaType,
  isFarsiText
} from '../lib/blogUtils';

// --- Helper Components ---

const CodeBlock = ({ code, language = 'bash' }: { code: string, language?: string }) => {
  const [copied, setCopied] = useState(false);
  const isFarsi = useMemo(() => isFarsiText(code, language), [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If the content is Persian text (e.g. AI prompt, instructions, sample text)
  if (isFarsi) {
    const isPrompt = !language || ['text', 'txt', 'prompt', 'none'].includes(language.toLowerCase());
    const badgeLabel = isPrompt ? 'نمونه پرامپت' : `متن (${language})`;

    return (
      <div 
        dir="rtl"
        className="my-8 md:my-10 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-white/10 bg-[#0d0d0d] shadow-xl dark:shadow-2xl relative group"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-white/5 select-none">
          {/* Mac-style Window Dots */}
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>

          {/* Contextual Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-200 shadow-sm">
            <Sparkles size={13} className="text-luma-yellow shrink-0" />
            <span className="text-[11px] font-medium tracking-normal text-zinc-200" style={{ fontFamily: "'IRANYekanX', sans-serif" }}>
              {badgeLabel}
            </span>
          </div>

          {/* Copy Button with Persian Feedback */}
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all text-xs"
            title="کپی متن پرامپت"
            style={{ fontFamily: "'IRANYekanX', sans-serif" }}
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400 text-[11px] font-bold">کپی شد!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span className="text-[11px] font-medium">کپی پرامپت</span>
              </>
            )}
          </button>
        </div>

        {/* Persian Text Content */}
        <div 
          dir="rtl"
          className="p-5 md:p-6 text-right font-sans text-zinc-100 text-[15px] md:text-base leading-8 md:leading-9 whitespace-pre-wrap break-words font-normal selection:bg-luma-purple/40 selection:text-white"
          style={{ fontFamily: "'IRANYekanX', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          {code}
        </div>
      </div>
    );
  }

  // English Code Block with Syntax Highlighting
  return (
    <div className="my-8 md:my-10 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-[#0d0d0d] shadow-xl dark:shadow-2xl relative group dir-ltr text-left">
      <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/5 select-none">
        <div className="flex gap-2">
           <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
           <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
           <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex items-center gap-2 opacity-60">
           <Terminal size={12} className="text-gray-400" />
           <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">{language}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          title="کپی کد"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400 text-[10px] font-bold">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>
      <LazySyntaxHighlighter
        code={code}
        language={language.toLowerCase()}
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
      />
    </div>
  );
};

const MediaCard = ({ src, alt, type }: { src: string, alt?: string, type: 'image' | 'video' | 'audio' }) => {
  if (type === 'video') {
    return (
      <div className="my-12 rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#050505] shadow-xl dark:shadow-2xl w-full group">
         <video src={src} controls className="w-full h-auto block" />
      </div>
    );
  }

  if (type === 'audio') {
    return (
      <div className="my-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] p-4 flex items-center gap-4 shadow-md dark:shadow-lg w-full">
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
      <div className="rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#050505] shadow-xl dark:shadow-2xl transition-transform duration-500 hover:scale-[1.01] relative">
         <div className="absolute inset-0 bg-zinc-100 dark:bg-[#111] animate-pulse -z-10" />
         <img 
            src={src} 
            alt={alt || "تصویر مقاله"} 
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

// --- Related Post Card Component ---

const RelatedPostCard: React.FC<{ item: BlogPostItem }> = ({ item }) => {
  const navigate = useNavigate();
  const coverImage = useMemo(() => resolveCoverImage(item), [item]);
  const excerpt = useMemo(() => resolveExcerpt(item), [item]);
  const dateFormatted = useMemo(() => formatPersianDate(item.date, item.publishedAt), [item.date, item.publishedAt]);

  const handleClick = () => {
    const target = item.slug || item.pageId || item.id;
    navigate(`/blog/${encodeURIComponent(target)}`);
    window.scrollTo(0, 0);
  };

  return (
    <article onClick={handleClick} className="group cursor-pointer flex flex-col h-full">
        <div className="aspect-[4/3] rounded-3xl bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-white/5 overflow-hidden mb-5 relative shadow-sm">
            {coverImage ? (
                <img 
                  src={coverImage} 
                  alt={item.title || 'تصویر مرتبط'} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  loading="lazy" 
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-200/50 dark:bg-white/5">
                    <ImageIcon className="text-zinc-400 dark:text-white/20" size={32} />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="flex items-center gap-2 text-white text-xs font-bold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    مطالعه کنید <ArrowRight size={14} className="rotate-180" />
                </span>
            </div>
            {item.tags && item.tags.length > 0 && (
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/70 backdrop-blur-md text-zinc-800 dark:text-white text-[10px] font-bold border border-zinc-200/50 dark:border-white/10">
                {item.tags[0]}
              </span>
            )}
        </div>
        <div className="text-xs text-zinc-400 dark:text-gray-500 mb-2 flex items-center gap-2">
          <span>{dateFormatted}</span>
          {item.readingTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span>{toPersianNum(item.readingTime)} دقیقه مطالعه</span>
            </>
          )}
        </div>
        <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-luma-pink transition-colors leading-snug line-clamp-2">
            {item.title}
        </h4>
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
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostItem[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 180]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.08]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;

    const fetchPostAndRelated = async () => {
      if (!id) return;
      try {
        setLoading(true);

        // 1. Fetch current post from the new dedicated /api/blog/{slugOrPageId} endpoint
        let currentPost: BlogPostItem | null = null;
        try {
          const postRes = await fetch(`https://luma-doc.nebula-ai-company.workers.dev/api/blog/${encodeURIComponent(id)}`);
          if (postRes.ok) {
            const postJson = await postRes.json();
            if (postJson && postJson.post) {
              currentPost = postJson.post;
            }
          }
        } catch (fetchErr) {
          console.warn(`Could not load post from /api/blog/${id}:`, fetchErr);
        }

        // Fallback for post if direct lookup failed (e.g. legacy UUID lookup)
        if (!currentPost) {
          try {
            const mdRes = await fetch(`https://luma-doc.nebula-ai-company.workers.dev/api/pages/${id}/markdown`);
            if (mdRes.ok) {
              const mdJson = await mdRes.json();
              currentPost = {
                id,
                title: mdJson.title || 'مقاله لوما',
                slug: id,
                content: mdJson.markdown,
                fullDescription: mdJson.markdown,
                date: new Date().toISOString(),
                readingTime: 5,
                tags: ['هوش مصنوعی', 'تکنولوژی']
              };
            }
          } catch (_) {
            const fallbackObj = (postsFallback as Record<string, any>)[id];
            if (fallbackObj) {
              currentPost = {
                id,
                title: fallbackObj.title || 'مقاله لوما',
                slug: id,
                content: fallbackObj.markdown,
                fullDescription: fallbackObj.markdown,
                date: new Date().toISOString(),
                readingTime: 5,
                tags: ['هوش مصنوعی', 'تکنولوژی']
              };
            }
          }
        }

        // 2. Fetch all posts from /api/blog to pick related posts
        let allPublished: BlogPostItem[] = [];
        try {
          const allRes = await fetch('https://luma-doc.nebula-ai-company.workers.dev/api/blog');
          if (allRes.ok) {
            const allJson = await allRes.json();
            if (Array.isArray(allJson.posts)) {
              allPublished = allJson.posts;
            }
          }
        } catch (allErr) {
          console.warn('Could not load related posts from /api/blog:', allErr);
        }

        if (isMounted) {
          setPost(currentPost);

          if (allPublished.length > 0) {
            const targetId = currentPost?.id || id;
            const targetSlug = currentPost?.slug || id;
            const targetPageId = currentPost?.pageId || id;
            
            const filtered = allPublished.filter(p => 
              p.id !== targetId && 
              p.slug !== targetSlug && 
              p.pageId !== targetPageId
            );
            // Pick up to 3 posts
            setRelatedPosts(filtered.slice(0, 3));
          }
        }
      } catch (err) {
        console.error('Error in BlogPostPage:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPostAndRelated();
    return () => { isMounted = false; };
  }, [id]);

  const coverImage = useMemo(() => post ? resolveCoverImage(post) : null, [post]);
  const dateFormatted = useMemo(() => post ? formatPersianDate(post.date, post.publishedAt) : '', [post]);
  const readTimeFormatted = useMemo(() => {
    if (!post) return '';
    const time = post.readingTime || calculateReadTime(post.content || post.fullDescription || '');
    return `${toPersianNum(time)} دقیقه مطالعه`;
  }, [post]);

  const postAuthor = useMemo(() => post?.author || post?.writer || 'تیم تحریریه لوما', [post]);
  const postTags = useMemo(() => {
    if (post?.tags && post.tags.length > 0) return post.tags;
    return ['هوش مصنوعی', 'تکنولوژی'];
  }, [post]);

  const markdownContent = useMemo(() => {
    return cleanMarkdownBody(post?.content || post?.fullDescription || '');
  }, [post]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || 'وبلاگ لوما',
          url: window.location.href,
        });
      } catch (_) {}
    } else {
      handleCopyLink();
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 border-4 border-luma-purple border-t-transparent rounded-full animate-spin" />
                <p className="text-zinc-500 dark:text-gray-400 text-sm animate-pulse">در حال دریافت مقاله از سرور...</p>
            </div>
        </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-6">
          <ImageIcon size={32} className="text-zinc-400" />
        </div>
        <h2 className="text-2xl font-bold mb-3">مقاله مورد نظر پیدا نشد</h2>
        <p className="text-zinc-500 dark:text-gray-400 max-w-md mb-8">
          ممکن است آدرس مقاله تغییر کرده باشد یا موقتاً در دسترس نباشد.
        </p>
        <button
          onClick={() => navigate('/blog')}
          className="px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium text-sm hover:opacity-90 transition-opacity"
        >
          بازگشت به آرشیو وبلاگ
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white selection:bg-luma-pink selection:text-white font-sans">
      
      {/* --- 1. Immersive Hero Section --- */}
      <div className="relative min-h-[65vh] md:min-h-[75vh] w-full overflow-hidden flex flex-col justify-end">
         
         <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: heroY, scale: heroScale }}
         >
            {coverImage ? (
                <img 
                    src={coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#2a1b3d] via-[#1a1a1a] to-[#0a0a0a]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/75 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/65 dark:to-transparent" />
         </motion.div>

         <div className="relative z-10 pb-16 md:pb-20 px-6 pt-32">
            <div className="max-w-4xl mx-auto w-full">
                 
                <motion.button 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/blog')}
                    className="mb-8 flex items-center gap-2 text-zinc-700 hover:text-zinc-950 dark:text-white/70 dark:hover:text-white transition-colors group w-fit"
                >
                    <div className="w-8 h-8 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur flex items-center justify-center border border-zinc-200 dark:border-white/10 group-hover:bg-zinc-100 dark:group-hover:bg-white/20 shadow-sm text-zinc-700 dark:text-white transition-all">
                        <ChevronLeft size={16} />
                    </div>
                    <span className="text-sm font-medium">بازگشت به مقالات</span>
                </motion.button>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap gap-3 mb-6"
                >
                    {dateFormatted && (
                      <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-white flex items-center gap-2 shadow-sm">
                          <Calendar size={13} className="text-luma-purple" />
                          {dateFormatted}
                      </span>
                    )}
                    {readTimeFormatted && (
                      <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-white flex items-center gap-2 shadow-sm">
                          <Clock size={13} className="text-luma-pink" />
                          {readTimeFormatted}
                      </span>
                    )}
                    {postAuthor && (
                      <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-white flex items-center gap-2 shadow-sm">
                          <User size={13} className="text-luma-yellow" />
                          {postAuthor}
                      </span>
                    )}
                </motion.div>

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

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2"
                >
                    {postTags.map((tag, i) => (
                        <span key={i} className="text-xs font-bold text-luma-purple px-2.5 py-1 bg-luma-purple/10 rounded-lg border border-luma-purple/20">
                            #{tag}
                        </span>
                    ))}
                </motion.div>

            </div>
         </div>
      </div>

      {/* --- 2. Content Section --- */}
      <div className="max-w-4xl mx-auto px-6 relative z-20 pb-28">
         
         <article className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
            <ReactMarkdown
               remarkPlugins={[remarkGfm]}
               components={{
                  // --- Structure ---
                  h1: ({node, ...props}) => <h1 className="hidden" {...props} />,
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
                        <Sparkles size={16} className="text-luma-yellow" />
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
                        <span className="absolute top-3.5 right-0 w-2 h-2 bg-luma-purple rounded-full ring-4 ring-luma-purple/10" />
                        {children}
                     </li>
                  ),
                  blockquote: ({node, children, ...props}) => (
                     <div className="my-10 relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-[#151515] dark:to-[#0a0a0a] border border-zinc-200 dark:border-white/10 p-7 shadow-sm">
                        <div className="absolute top-0 right-0 p-6 opacity-3 dark:opacity-5 pointer-events-none">
                           <Quote size={70} className="text-zinc-400 dark:text-white" />
                        </div>
                        <div className="absolute left-0 top-6 bottom-6 w-1 bg-luma-yellow rounded-r-full" />
                        <div className="relative z-10 text-lg md:text-xl font-medium text-zinc-800 dark:text-gray-200 italic leading-relaxed pl-6">
                           {children}
                        </div>
                     </div>
                  ),

                  // --- Code ---
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
                     return <MediaCard src={src} alt={alt} type={type} />;
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
         </article>

         {/* --- 3. Share & Actions --- */}
         <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-3 w-full sm:w-auto">
               <button 
                  onClick={handleShare}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/5 transition-colors text-zinc-800 dark:text-white font-medium text-sm"
               >
                  <Share2 size={16} />
                  اشتراک‌گذاری
               </button>
               <button 
                  onClick={handleCopyLink}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-luma-purple/10 hover:bg-luma-purple/20 border border-luma-purple/20 text-luma-purple transition-colors font-medium text-sm"
               >
                  {copiedLink ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  {copiedLink ? 'لینک کپی شد' : 'کپی لینک'}
               </button>
            </div>
            <div className="text-zinc-500 dark:text-gray-500 text-xs flex items-center gap-1.5">
               <Sparkles size={14} className="text-luma-purple" />
               نوشته شده توسط تیم تحریریه لوما
            </div>
         </div>

      </div>

      {/* --- 4. Related Posts --- */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-[#f5f5f7] dark:bg-[#050505] border-t border-zinc-200 dark:border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                    <Sparkles className="text-luma-yellow" size={22} />
                    شاید دوست داشته باشید
                  </h3>
                  <button 
                    onClick={() => navigate('/blog')}
                    className="text-xs md:text-sm font-medium text-luma-purple hover:underline flex items-center gap-1"
                  >
                    مشاهده همه
                    <ChevronLeft size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((item) => (
                    <RelatedPostCard key={item.id || item.slug} item={item} />
                ))}
                </div>
            </div>
        </section>
      )}

    </div>
  );
};

export default BlogPostPage;
