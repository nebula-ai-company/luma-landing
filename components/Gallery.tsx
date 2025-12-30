import React from 'react';
import { motion } from 'framer-motion';
import { GALLERY_ITEMS } from '../constants';
import { ZoomIn } from 'lucide-react';
import Button from './Button';

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-[#0a0a0a] relative">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">گالری خلاقیت</h2>
          <p className="text-gray-400">نمونه کارهای ساخته شده توسط کاربران لوما</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative group rounded-xl overflow-hidden cursor-pointer ${idx % 3 === 1 ? 'md:row-span-2' : ''}`}
            >
               <img 
                 src={item.imageUrl} 
                 alt={item.prompt} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
               
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                 <p className="text-white font-bold text-lg mb-1">{item.prompt}</p>
                 <span className="text-xs text-luma-pink uppercase tracking-wider">{item.category}</span>
                 <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md p-2 rounded-full">
                    <ZoomIn className="w-5 h-5 text-white" />
                 </div>
               </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
           <Button variant="secondary" className="px-8">
             مشاهده بیشتر
           </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;