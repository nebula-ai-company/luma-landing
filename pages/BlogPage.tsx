
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, BookOpen, Clock, Calendar, 
  ArrowLeft, Image as ImageIcon, Feather
} from 'lucide-react';
import CTA from '../components/CTA';
import { useNavigate } from 'react-router-dom';

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
        const response = await fetch(`https://luma-doc.nebula-ai-company.workers.dev/api/pages/${uuid}/markdown`);
        const data = await response.json();
        
        if (isMounted) {
          const { coverImage, content } = extractCoverAndContent(data.markdown);
          setCoverImage(coverImage);
          setReadTime(calculateReadTime(content));
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
      className="group cursor-pointer flex flex-col h-full rounded-[24px] bg-[#121212] border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full bg-[#1a1a1a] overflow-hidden">
        {isLoadingImage ? (
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/10 border-t-white/50 rounded-full animate-spin" />
           </div>
        ) : coverImage ? (
           <img 
             src={coverImage} 
             alt={item.title} 
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             loading="lazy"
           />
        ) : (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white/5 to-white/[0.02]">
              <ImageIcon size={32} className="text-white/20 mb-2" />
              <span className="text-[10px] text-white/30">تصویر یافت نشد</span>
           </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
         {/* Categories (Mocked based on title keywords or random for demo) */}
         <div className="flex gap-2 mb-3">
            <span className="px-2 py-0.5 rounded-md bg-luma-purple/10 text-luma-purple text-[10px] font-bold border border-luma-purple/20">
               هوش مصنوعی
            </span>
            {readTime > 7 && (
                <span className="px-2 py-0.5 rounded-md bg-luma-yellow/10 text-luma-yellow text-[10px] font-bold border border-luma-yellow/20">
                   مقاله جامع
                </span>
            )}
         </div>

         <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-luma-purple transition-colors">
            {item.title}
         </h3>

         <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 border-t border-white/5">
            <div className="flex items-center gap-4">
               <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  ۱۴۰۳/۰۴/۱۰
               </span>
               <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {readTime} دقیقه
               </span>
            </div>
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
               <ArrowLeft size={12} />
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
        const response = await fetch('https://luma-doc.nebula-ai-company.workers.dev/api/navigation');
        const data = await response.json();
        
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
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-luma-purple/30 selection:text-white font-sans">
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-32 pb-20"
      >
         {/* --- Hero Section --- */}
         <section className="relative mb-20 px-6">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luma-purple/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-luma-pink/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="max-w-4xl mx-auto text-center">
               <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
               >
                  <Feather size={14} className="text-luma-purple" />
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">وبلاگ تخصصی لوما</span>
               </motion.div>
               
               <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
               >
                  داستان‌های <span className="text-gradient-animated">آینده</span>
               </motion.h1>
               
               <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
               >
                  آخرین مقالات، آموزش‌ها و اخبار دنیای هوش مصنوعی. 
                  همراه ما باشید تا مرزهای خلاقیت را گسترش دهیم.
               </motion.p>

               {/* Search */}
               <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative max-w-md mx-auto group"
               >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-luma-purple/30 to-luma-pink/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                  <div className="relative bg-[#0c0c0e] border border-white/10 rounded-2xl flex items-center h-12 px-4 shadow-xl">
                     <Search size={18} className="ml-3 text-gray-500" />
                     <input 
                        type="text" 
                        placeholder="جستجو در مقالات..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm text-white placeholder:text-gray-600 w-full h-full font-light"
                     />
                  </div>
               </motion.div>
            </div>
         </section>

         {/* --- Blog Grid --- */}
         <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
            {isLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                     <div key={i} className="h-96 rounded-[24px] bg-[#121212] border border-white/5 animate-pulse" />
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
               <div className="text-center py-20 text-gray-500">
                  <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
                  <p>مقاله‌ای یافت نشد.</p>
               </div>
            )}
         </div>

         <div className="mt-32">
            <CTA />
         </div>
      </motion.div>
    </div>
  );
};

export default BlogPage;
