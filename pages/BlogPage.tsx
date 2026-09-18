import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, BookOpen, Clock, Calendar, 
  ArrowLeft, Image as ImageIcon, Feather, Sparkles, User, Tag
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CTA from '../components/CTA';
import navigationFallback from '../components/navigation-fallback.json';
import postsFallback from '../components/posts-fallback.json';
import { 
  BlogPostItem, 
  toPersianNum, 
  formatPersianDate, 
  resolveCoverImage, 
  resolveExcerpt, 
  calculateReadTime 
} from '../lib/blogUtils';
import usePageStructuredData from '../components/StructuredData';
import { buildBlogCollectionStructuredData } from '../lib/structuredData';

// --- Components ---

interface BlogCardProps {
  item: BlogPostItem;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ item, index }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const coverImage = useMemo(() => resolveCoverImage(item), [item]);
  const excerpt = useMemo(() => resolveExcerpt(item), [item]);
  const rawDate = item.date || item.publishedAt;
  const dateFormatted = useMemo(() => formatPersianDate(item.date, item.publishedAt), [item.date, item.publishedAt]);
  const readTimeFormatted = useMemo(() => {
    const time = item.readingTime || calculateReadTime(item.content || item.fullDescription || '');
    return `${toPersianNum(time)} دقیقه`;
  }, [item.readingTime, item.content, item.fullDescription]);

  const target = item.slug || item.pageId || item.id;
  const postUrl = `/blog/${encodeURIComponent(target)}`;

  const primaryTag = item.tags && item.tags.length > 0 ? item.tags[0] : 'هوش مصنوعی';
  const authorName = item.author || item.writer || 'تیم لوما';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4) }}
      className="group flex flex-col h-full rounded-[32px] bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-luma-purple/5"
    >
      {/* Image Container */}
      <Link 
        to={postUrl}
        className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-[#1a1a1a] overflow-hidden block focus:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple"
        aria-label={`مطالعه مقاله: ${item.title}`}
      >
        {coverImage && !imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-[#161616]">
                <div className="w-8 h-8 border-2 border-zinc-200 dark:border-white/10 border-t-zinc-500 dark:border-t-white/50 rounded-full animate-spin" />
              </div>
            )}
            <img 
              src={coverImage} 
              alt={item.title ? `تصویر مقاله: ${item.title}` : 'تصویر مقاله لوما'} 
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black/5 to-black/[0.02] dark:from-white/5 dark:to-white/[0.02]">
            <ImageIcon size={32} className="text-zinc-400 dark:text-white/20 mb-2" aria-hidden="true" />
            <span className="text-[10px] text-zinc-400 dark:text-white/30">تصویر مقاله لوما</span>
          </div>
        )}
        
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Tags & Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="px-3 py-1.5 rounded-full bg-white/80 dark:bg-black/70 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-white text-[11px] font-bold shadow-sm">
            {primaryTag}
          </span>
          {item.featured && (
            <span className="px-2.5 py-1.5 rounded-full bg-luma-yellow/20 border border-luma-yellow/30 text-luma-yellow text-[10px] font-bold backdrop-blur-md">
              ویژه
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 line-clamp-2 leading-snug">
          <Link 
            to={postUrl}
            className="group-hover:text-luma-purple transition-colors focus:outline-none focus-visible:underline"
          >
            {item.title}
          </Link>
        </h3>

        <p className="text-sm text-zinc-600 dark:text-gray-400 font-light line-clamp-2 leading-relaxed mb-6">
          {excerpt}
        </p>

        {/* Footer Meta */}
        <div className="mt-auto pt-6 flex items-center justify-between text-xs text-zinc-500 dark:text-gray-500 border-t border-zinc-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            {rawDate ? (
              <time 
                dateTime={rawDate}
                className="flex items-center gap-1.5 group-hover:text-zinc-800 dark:group-hover:text-gray-300 transition-colors"
              >
                <Calendar size={13} className="text-zinc-400 dark:text-gray-500" aria-hidden="true" />
                {dateFormatted}
              </time>
            ) : null}
            {rawDate ? (
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" aria-hidden="true" />
            ) : null}
            <span className="flex items-center gap-1.5 group-hover:text-zinc-800 dark:group-hover:text-gray-300 transition-colors">
              <Clock size={13} className="text-zinc-400 dark:text-gray-500" aria-hidden="true" />
              {readTimeFormatted}
            </span>
            {authorName && (
              <>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" aria-hidden="true" />
                <span className="hidden sm:flex items-center gap-1.5 group-hover:text-zinc-800 dark:group-hover:text-gray-300 transition-colors">
                  <User size={13} className="text-zinc-400 dark:text-gray-500" aria-hidden="true" />
                  {authorName}
                </span>
              </>
            )}
          </div>
          <Link 
            to={postUrl}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-600 dark:text-white group-hover:bg-zinc-800 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-300 transform group-hover:-translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple"
            aria-label={`مطالعه مقاله: ${item.title}`}
          >
            <ArrowLeft size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

// --- Main Page ---

const BlogPage: React.FC = () => {
  const [blogItems, setBlogItems] = useState<BlogPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('همه');

  const blogStructuredData = useMemo(() => {
    if (!blogItems || blogItems.length === 0) return null;
    return buildBlogCollectionStructuredData(blogItems);
  }, [blogItems]);

  usePageStructuredData(blogStructuredData);

  useEffect(() => {
    const fetchBlogList = async () => {
      try {
        setIsLoading(true);
        // 1. First priority: Use the dedicated and rich /api/blog endpoint
        const response = await fetch('https://luma-doc.nebula-ai-company.workers.dev/api/blog');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        if (data && Array.isArray(data.posts) && data.posts.length > 0) {
          setBlogItems(data.posts);
          return;
        }
      } catch (apiErr) {
        console.warn('Dedicated /api/blog endpoint failed, attempting fallback resolution:', apiErr);
        
        // 2. Secondary fallback: parse from navigation and fallback files if offline
        try {
          const navRes = await fetch('https://luma-doc.nebula-ai-company.workers.dev/api/navigation').catch(() => null);
          const navData = navRes && navRes.ok ? await navRes.json() : navigationFallback;
          const blogSection = navData?.navigation?.find((section: any) => section.title.trim() === 'بلاگ');
          
          if (blogSection && Array.isArray(blogSection.items)) {
            const fallbackPosts: BlogPostItem[] = blogSection.items.map((item: any) => {
              const uuid = item.url.replace('#', '');
              const localData = (postsFallback as Record<string, any>)[uuid];
              return {
                id: uuid,
                pageId: uuid,
                slug: uuid,
                title: item.title,
                content: localData?.markdown || '',
                fullDescription: localData?.markdown || '',
                tags: ['هوش مصنوعی'],
                ...(localData?.date ? { date: localData.date } : {}),
                ...(localData?.publishedAt ? { publishedAt: localData.publishedAt } : {}),
                readingTime: 5
              };
            });
            setBlogItems(fallbackPosts);
          }
        } catch (fallbackErr) {
          console.error('All blog fetch strategies failed:', fallbackErr);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogList();
  }, []);

  // Compute all available tags
  const tagsList = useMemo(() => {
    const set = new Set<string>();
    blogItems.forEach(item => {
      if (Array.isArray(item.tags)) {
        item.tags.forEach(t => {
          if (t && t.trim()) set.add(t.trim());
        });
      }
    });
    return ['همه', ...Array.from(set)];
  }, [blogItems]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return blogItems.filter(item => {
      const matchesSearch = !q || (
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
        (item.shortDescription && item.shortDescription.toLowerCase().includes(q)) ||
        (item.author && item.author.toLowerCase().includes(q)) ||
        (item.writer && item.writer.toLowerCase().includes(q)) ||
        (Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(q)))
      );

      const matchesTag = selectedTag === 'همه' || (Array.isArray(item.tags) && item.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [blogItems, searchQuery, selectedTag]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white selection:bg-luma-purple/30 selection:text-white font-sans">
      
      {/* --- Cinematic Hero Section --- */}
      <section className="relative pt-40 pb-28 overflow-hidden border-b border-zinc-200 dark:border-white/5">
         
         {/* Animated Background Elements */}
         <div className="absolute inset-0 pointer-events-none">
            <motion.div 
               animate={{ 
                  x: [0, 80, -40, 0],
                  y: [0, -40, 40, 0],
                  scale: [1, 1.15, 0.95, 1],
                  opacity: [0.15, 0.28, 0.15]
               }}
               transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-luma-purple/10 dark:bg-luma-purple/20 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div 
               animate={{ 
                  x: [0, -70, 30, 0],
                  y: [0, 50, -30, 0],
                  scale: [0.9, 1.1, 1, 0.9],
                  opacity: [0.15, 0.22, 0.15]
               }}
               transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-luma-pink/10 dark:bg-luma-pink/15 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />
            
            <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
         </div>

         {/* Hero Content */}
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-xl shadow-sm dark:shadow-lg"
            >
               <Feather size={14} className="text-luma-purple animate-bounce" aria-hidden="true" />
               <span className="text-[10px] font-bold text-zinc-600 dark:text-gray-300 uppercase tracking-widest">وبلاگ تخصصی لوما</span>
            </motion.div>
            
            <motion.h1 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-[linear-gradient(to_right,#DA8FFF,#FF6482,#FFB340,#DA8FFF)] mb-8 tracking-tight leading-[1.1] animate-text-flow bg-[length:200%_auto] drop-shadow-2xl"
            >
               داستان‌های آینده
            </motion.h1>
            
            <motion.p 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-xl md:text-2xl text-zinc-600 dark:text-gray-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed"
            >
               آخرین مقالات، آموزش‌ها و تجربیات دنیای هوش مصنوعی.
               <br className="hidden md:block" />
               با ابزارهای پیشرفته لوما، جریان تولید محتوا و هنر دیجیتال خود را متحول کنید.
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="relative max-w-lg mx-auto group mb-8"
            >
               <div className="absolute -inset-1 bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 group-focus-within:opacity-60" />
               
               <div className="relative bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 rounded-2xl flex items-center h-16 px-6 shadow-xl dark:shadow-2xl transition-all">
                  <Search size={22} className="ml-4 text-zinc-400 dark:text-gray-500 group-focus-within:text-zinc-900 group-focus-within:dark:text-white transition-colors" aria-hidden="true" />
                  <input 
                     type="text" 
                     placeholder="جستجو بر اساس عنوان، متن یا تگ..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     aria-label="جستجو در مقالات وبلاگ"
                     className="bg-transparent border-none outline-none text-base md:text-lg text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-600 w-full h-full font-light"
                  />
                  {searchQuery && (
                     <button 
                       onClick={() => setSearchQuery('')} 
                       className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors px-2 py-1"
                       aria-label="پاک‌کردن متن جستجو"
                     >
                       پاک‌کردن
                     </button>
                  )}
               </div>
            </motion.div>

            {/* Interactive Tag Filter Pills */}
            {tagsList.length > 1 && (
              <motion.div 
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto"
                role="group"
                aria-label="فیلتر دسته‌بندی مقالات"
              >
                <span className="text-xs text-zinc-500 dark:text-gray-400 ml-1 flex items-center gap-1">
                  <Tag size={12} aria-hidden="true" />
                  دسته‌ها:
                </span>
                {tagsList.map(tag => {
                  const isActive = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      aria-pressed={isActive}
                      aria-label={`فیلتر دسته ${tag}`}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isActive 
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-md' 
                          : 'bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-gray-400 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200/60 dark:border-white/5'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </motion.div>
            )}
         </div>
      </section>

      {/* --- Blog Grid Section --- */}
      <section aria-labelledby="latest-posts-heading" className="py-20 relative z-10">
         <div className="max-w-screen-2xl mx-auto px-6">
            
            {/* Section Header */}
            <div className="flex items-center justify-between mb-12">
               <div className="flex items-center gap-3">
                  <Sparkles className="text-luma-yellow" size={24} aria-hidden="true" />
                  <h2 id="latest-posts-heading" className="text-3xl font-bold text-zinc-900 dark:text-white">
                     آخرین نوشته‌ها
                  </h2>
               </div>
               {!isLoading && (
                 <span className="text-sm font-medium text-zinc-500 dark:text-gray-400 bg-zinc-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/5">
                    {toPersianNum(filteredItems.length)} مقاله یافت شد
                 </span>
               )}
            </div>

            {isLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="در حال بارگذاری مقالات">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                     <div key={i} className="h-[430px] rounded-[32px] bg-zinc-100 dark:bg-[#121212] border border-zinc-200 dark:border-white/5 animate-pulse" />
                  ))}
               </div>
            ) : filteredItems.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredItems.map((item, index) => (
                     <BlogCard 
                        key={item.id || item.pageId || index} 
                        item={item} 
                        index={index}
                     />
                  ))}
               </div>
            ) : (
               <div className="py-32 text-center border border-dashed border-zinc-200 dark:border-white/10 rounded-[32px] bg-zinc-50 dark:bg-white/[0.02]">
                  <BookOpen size={48} className="mx-auto mb-4 text-zinc-400 dark:text-gray-600" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">نتیجه‌ای یافت نشد</h3>
                  <p className="text-zinc-500 dark:text-gray-500 mb-6">مقاله‌ای با این مشخصات یافت نشد. می‌توانید جستجو را تغییر دهید.</p>
                  {(searchQuery || selectedTag !== 'همه') && (
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedTag('همه'); }}
                      className="px-5 py-2 rounded-full bg-luma-purple text-white text-xs font-bold hover:bg-luma-purple/90 transition-colors"
                      aria-label="مشاهده تمام مقالات"
                    >
                      مشاهده تمام مقالات
                    </button>
                  )}
               </div>
            )}
         </div>
      </section>

      <div className="mt-12">
         <CTA />
      </div>
    </main>
  );
};

export default BlogPage;
