
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, BookOpen, Clock, Calendar, 
  ArrowLeft, Image as ImageIcon, Feather, Sparkles
} from 'lucide-react';
import CTA from '../components/CTA';
import { useNavigate } from 'react-router-dom';
import navigationFallback from '../components/navigation-fallback.json';
import postsFallback from '../components/posts-fallback.json';

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

// --- Components ---

interface BlogCardProps {
  item: NavItem;
  index: number;
}

// 1. Blog Card (Smart Component that fetches its own image)
const BlogCard: React.FC<BlogCardProps> = ({ item, index }) => {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [readTime, setReadTime] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchPreview = async () => {
      try {
        const uuid = item.url.replace('#', '');
        let markdownContent = '';
        try {
          const response = await fetch(`https://luma-doc.nebula-ai-company.workers.dev/api/pages/${uuid}/markdown`);
          if (!response.ok) throw new Error('Fetch error');
          const data = await response.json();
          markdownContent = data.markdown;
        } catch (fetchErr) {
          console.warn(`Failed to fetch preview for ${uuid}, using fallback:`, fetchErr);
          const fallbackPost = (postsFallback as Record<string, any>)[uuid];
          if (fallbackPost && fallbackPost.markdown) {
            markdownContent = fallbackPost.markdown;
          }
        }
        
        if (isMounted && markdownContent) {
          const { coverImage, content } = extractCoverAndContent(markdownContent);
          setCoverImage(coverImage);
          setReadTime(calculateReadTime(content));
          setIsLoadingImage(false);
        } else if (isMounted) {
          setIsLoadingImage(false);
        }
      } catch (e) {
        if (isMounted) setIsLoadingImage(false);
      }
    };
    fetchPreview();
    return () => { isMounted = false; };
  }, [item.url]);

  const handleCardClick = () => {
    const uuid = item.url.replace('#', '');
    navigate(`/blog/${uuid}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col h-full rounded-[32px] bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 hover:border-zinc-350 dark:hover:border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-luma-purple/5"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-[#1a1a1a] overflow-hidden">
        {isLoadingImage ? (
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-zinc-200 dark:border-white/10 border-t-zinc-500 dark:border-t-white/50 rounded-full animate-spin" />
           </div>
        ) : coverImage ? (
           <img 
             src={coverImage} 
             alt={item.title} 
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             loading="lazy"
           />
        ) : (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black/5 to-black/[0.02] dark:from-white/5 dark:to-white/[0.02]">
              <ImageIcon size={32} className="text-zinc-400 dark:text-white/20 mb-2" />
              <span className="text-[10px] text-zinc-400 dark:text-white/30">تصویر یافت نشد</span>
           </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 right-4 flex gap-2">
             <span className="px-3 py-1.5 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-white text-[10px] font-bold">
                هوش مصنوعی
             </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
         <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 line-clamp-2 leading-snug group-hover:text-luma-purple transition-colors">
            {item.title}
         </h3>

         <div className="mt-auto pt-6 flex items-center justify-between text-xs text-zinc-500 dark:text-gray-500 border-t border-zinc-150 dark:border-white/5">
            <div className="flex items-center gap-4">
               <span className="flex items-center gap-2 group-hover:text-zinc-800 dark:group-hover:text-gray-300 transition-colors">
                  <Calendar size={14} />
                  ۱۴۰۳/۰۴/۱۰
               </span>
               <span className="flex items-center gap-2 group-hover:text-zinc-800 dark:group-hover:text-gray-300 transition-colors">
                  <Clock size={14} />
                  {readTime} دقیقه
               </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-650 dark:text-white group-hover:bg-zinc-800 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-300 transform group-hover:rotate-45">
               <ArrowLeft size={14} />
            </div>
         </div>
      </div>
    </motion.div>
  );
};

// --- Main Page ---

const BlogPage: React.FC = () => {
  const [blogItems, setBlogItems] = useState<NavItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogList = async () => {
      try {
        setIsLoading(true);
        let data: any;
        try {
          const response = await fetch('https://luma-doc.nebula-ai-company.workers.dev/api/navigation');
          if (!response.ok) throw new Error('Fetch error');
          data = await response.json();
        } catch (fetchErr) {
          console.warn('Failed to load blog list from server, using navigation fallback:', fetchErr);
          data = navigationFallback;
        }
        
        // Filter for "بلاگ"
        const blogSection = data.navigation.find((section: NavSection) => section.title.trim() === "بلاگ");
        
        if (blogSection) {
          setBlogItems(blogSection.items);
        }
      } catch (err) {
        console.error("Failed to load blog items", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogList();
  }, []);

  const filteredItems = blogItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white selection:bg-luma-purple/30 selection:text-white font-sans">
      
      {/* --- Cinematic Hero Section --- */}
      <section className="relative pt-40 pb-32 overflow-hidden border-b border-zinc-200 dark:border-white/5">
         
         {/* Animated Background Elements */}
         <div className="absolute inset-0 pointer-events-none">
            {/* 1. Large Moving Blobs */}
            <motion.div 
               animate={{ 
                  x: [0, 100, -50, 0],
                  y: [0, -50, 50, 0],
                  scale: [1, 1.2, 0.9, 1],
                  opacity: [0.15, 0.3, 0.15]
               }}
               transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-luma-purple/10 dark:bg-luma-purple/20 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div 
               animate={{ 
                  x: [0, -80, 40, 0],
                  y: [0, 60, -40, 0],
                  scale: [0.9, 1.1, 1, 0.9],
                  opacity: [0.15, 0.25, 0.15]
               }}
               transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-luma-pink/10 dark:bg-luma-pink/15 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />
            
            {/* 2. Grid & Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
         </div>

         {/* Hero Content */}
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-xl shadow-sm dark:shadow-lg"
            >
               <Feather size={14} className="text-luma-purple animate-bounce" />
               <span className="text-[10px] font-bold text-zinc-600 dark:text-gray-300 uppercase tracking-widest">وبلاگ تخصصی لوما</span>
            </motion.div>
            
            <motion.h1 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-[linear-gradient(to_right,#DA8FFF,#FF6482,#FFB340,#DA8FFF)] mb-10 tracking-tight leading-[1.1] animate-text-flow bg-[length:200%_auto] drop-shadow-2xl"
            >
               داستان‌های آینده
            </motion.h1>
            
            <motion.p 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-xl md:text-2xl text-zinc-600 dark:text-gray-400 font-light max-w-2xl mx-auto mb-16 leading-relaxed"
            >
               آخرین مقالات، آموزش‌ها و اخبار دنیای هوش مصنوعی. 
               <br className="hidden md:block" />
               همراه ما باشید تا مرزهای خلاقیت را گسترش دهیم.
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="relative max-w-lg mx-auto group"
            >
               {/* Search Glow */}
               <div className="absolute -inset-1 bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 group-focus-within:opacity-60" />
               
               <div className="relative bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 rounded-2xl flex items-center h-16 px-6 shadow-xl dark:shadow-2xl transition-all">
                  <Search size={22} className="ml-4 text-zinc-450 dark:text-gray-500 group-focus-within:text-zinc-900 group-focus-within:dark:text-white transition-colors" />
                  <input 
                     type="text" 
                     placeholder="جستجو در مقالات..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="bg-transparent border-none outline-none text-lg text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-600 w-full h-full font-light"
                  />
                  {searchQuery && (
                     <span className="text-xs text-zinc-400 dark:text-gray-500 animate-pulse">Enter برای جستجو</span>
                  )}
               </div>
            </motion.div>
         </div>
      </section>

      {/* --- Blog Grid Section --- */}
      <section className="py-24 relative z-10">
         <div className="max-w-screen-2xl mx-auto px-6">
            
            {/* Section Header */}
            <div className="flex items-center justify-between mb-12">
               <h2 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                  <Sparkles className="text-luma-yellow" size={24} />
                  آخرین نوشته‌ها
               </h2>
            </div>

            {isLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                     <div key={i} className="h-[400px] rounded-[32px] bg-zinc-100 dark:bg-[#121212] border border-zinc-200 dark:border-white/5 animate-pulse" />
                  ))}
               </div>
            ) : filteredItems.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredItems.map((item, index) => (
                     <BlogCard 
                        key={item.id} 
                        item={item} 
                        index={index}
                     />
                  ))}
               </div>
            ) : (
               <div className="py-32 text-center border border-dashed border-zinc-200 dark:border-white/10 rounded-[32px] bg-zinc-50 dark:bg-white/[0.02]">
                  <BookOpen size={48} className="mx-auto mb-4 text-zinc-400 dark:text-gray-600" />
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">نتیجه‌ای یافت نشد</h3>
                  <p className="text-zinc-500 dark:text-gray-500">لطفاً واژه دیگری را جستجو کنید.</p>
               </div>
            )}
         </div>
      </section>

      <div className="mt-12">
         <CTA />
      </div>
    </div>
  );
};

export default BlogPage;
