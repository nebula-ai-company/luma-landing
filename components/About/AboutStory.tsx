
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Zap, Shield } from 'lucide-react';
import { fetchCachedJson, getFileUrl, HOMEPAGE_THUMB_LARGE } from '../../lib/pbCache';

export const AboutStory: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const data = await fetchCachedJson('https://pb.lumai.ir/api/collections/image_generation/records?page=1&perPage=1&sort=-created');
        if (data.items && data.items.length > 0) {
          const latest = data.items[0];
          if (latest.result) {
            setImageUrl(getFileUrl('image_generation', latest.id, latest.result, HOMEPAGE_THUMB_LARGE));
          }
        }
      } catch (err) {
        console.error("Failed to fetch image for AboutStory:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, []);

  return (
    <section className="py-24 bg-[#F5F5F7] dark:bg-[#080808] border-y border-zinc-200 dark:border-white/5 transition-colors duration-300">
         <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-square lg:aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg dark:shadow-none"
               >
                  {!loading && imageUrl ? (
                     <img 
                        src={imageUrl} 
                        alt="Team Collaboration" 
                        className="w-full h-full object-cover opacity-80 dark:opacity-60 hover:scale-105 transition-transform duration-[1.5s]"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                     />
                  ) : (
                     <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-8 right-8 left-8">
                     <div className="flex items-center gap-2 mb-2 text-luma-yellow">
                        <Globe size={18} />
                        <span className="text-xs font-bold tracking-widest uppercase">Global Standards</span>
                     </div>
                     <p className="text-white text-lg font-bold">زیرساختی در کلاس جهانی، بومی‌سازی شده برای شما.</p>
                  </div>
               </motion.div>

               <div className="space-y-8">
                  <motion.div 
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                  >
                     <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">چرا لوما را ساختیم؟</h3>
                     <p className="text-zinc-600 dark:text-gray-400 leading-loose text-lg font-light">
                        در دنیایی که هوش مصنوعی با سرعتی باورنکردنی در حال پیشرفت است، دسترسی به این تکنولوژی نباید محدود به جغرافیا باشد. ما لوما را خلق کردیم تا پل ارتباطی میان <strong className="text-zinc-900 dark:text-white font-bold">استعدادهای ایرانی</strong> و <strong className="text-zinc-900 dark:text-white font-bold">تکنولوژی‌های لبه دانش</strong> باشیم.
                     </p>
                  </motion.div>

                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.2 }}
                     className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  >
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                           <Zap size={20} />
                        </div>
                        <div>
                           <h4 className="text-zinc-900 dark:text-white font-bold mb-1">سرعت بی‌نظیر</h4>
                           <p className="text-sm text-zinc-550 dark:text-gray-500 leading-relaxed">سرورهای قدرتمند برای پردازش‌های سنگین گرافیکی و متنی.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                           <Shield size={20} />
                        </div>
                        <div>
                           <h4 className="text-zinc-900 dark:text-white font-bold mb-1">حریم خصوصی</h4>
                           <p className="text-sm text-zinc-550 dark:text-gray-500 leading-relaxed">داده‌های شما با بالاترین استانداردهای امنیتی محافظت می‌شوند.</p>
                        </div>
                     </div>
                  </motion.div>
               </div>

            </div>
         </div>
    </section>
  );
};
