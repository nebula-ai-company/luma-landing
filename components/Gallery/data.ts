
export interface GalleryItemData {
  id: string;
  title: string;
  type: 'image' | 'comparison' | 'vton' | 'video';
  service: string; // e.g., 'img-gen', 'img-edit', 'vton', 'video'
  category: string; // e.g., 'Portrait', 'Product', 'Landscape'
  image: string; // Main or After image (or poster for video)
  imageBefore?: string; // Optional Before image
  garment?: string; // Optional Garment image for VTON
  video?: string; // Optional Video URL
  prompt: string;
  model: string;
  dimensions: string;
  date: string;
  author?: string;
}

export const GALLERY_DATA: GalleryItemData[] = [
  {
    id: '1',
    title: 'پرتره سایبرپانک',
    type: 'image',
    service: 'img-gen',
    category: 'Portrait',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop',
    prompt: 'پرتره زن جوان در شهر سایبرپانک با نورهای نئون صورتی و آبی، کلاه خود پیشرفته، کیفیت سینمایی 8k.',
    model: 'Flux 2 Pro',
    dimensions: '1024x1024',
    date: '۱۴۰۳/۰۲/۱۵'
  },
  {
    id: '2',
    title: 'حذف پس‌زمینه محصول',
    type: 'comparison',
    service: 'bg-remove',
    category: 'Product',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop', 
    imageBefore: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop&blur=5', 
    prompt: 'حذف پس‌زمینه کفش ورزشی قرمز و قرار دادن در محیط استودیویی سفید.',
    model: 'Luma Remove V3',
    dimensions: '1080x1080',
    date: '۱۴۰۳/۰۲/۲۰'
  },
  {
    id: '3',
    title: 'پرو مجازی کت',
    type: 'vton',
    service: 'vton',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1548062973-2c069eb8b4c7?q=80&w=1200&auto=format&fit=crop', // Result
    garment: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop', // Garment (Input)
    prompt: 'پوشاندن کت پشمی قهوه‌ای روی مدل زن با ژست ایستاده در خیابان.',
    model: 'Nano Banana Pro',
    dimensions: '1024x1536',
    date: '۱۴۰۳/۰۳/۰۵'
  },
  {
    id: '4',
    title: 'منظره رویایی',
    type: 'image',
    service: 'img-gen',
    category: 'Landscape',
    image: 'https://images.unsplash.com/photo-1440557653017-d39f46ee36f6?q=80&w=1200&auto=format&fit=crop',
    prompt: 'جنگل مه‌آلود در طلوع خورشید، پرتوهای نور از میان درختان کاج، رودخانه خروشان.',
    model: 'Flux 2 Max',
    dimensions: '1920x1080',
    date: '۱۴۰۳/۰۳/۱۰'
  },
  {
    id: '5',
    title: 'اصلاح رنگ سینمایی',
    type: 'comparison',
    service: 'img-edit',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
    imageBefore: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop&saturation=-50',
    prompt: 'اعمال فیلتر سینمایی Teal & Orange، افزایش کنتراست و شارپنس.',
    model: 'Luma Edit V2',
    dimensions: '3840x2160',
    date: '۱۴۰۳/۰۳/۱۲'
  },
  {
    id: '6',
    title: 'فضای داخلی مدرن',
    type: 'image',
    service: 'img-gen',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    prompt: 'اتاق نشیمن مینیمال با مبل‌های سفید، پنجره‌های قدی بزرگ رو به دریا، نور طبیعی.',
    model: 'Ideogram V3',
    dimensions: '1024x1024',
    date: '۱۴۰۳/۰۳/۱۵'
  },
  {
    id: '7',
    title: 'ترمیم عکس قدیمی',
    type: 'comparison',
    service: 'upscale',
    category: 'Restoration',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
    imageBefore: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop&blur=2',
    prompt: 'افزایش کیفیت، حذف نویز و خش، اصلاح رنگ چهره.',
    model: 'ClarityAI Crystal',
    dimensions: '2048x2048',
    date: '۱۴۰۳/۰۳/۲۰'
  },
  {
    id: '8',
    title: 'کاراکتر فانتزی',
    type: 'image',
    service: 'img-gen',
    category: 'Character',
    image: 'https://images.unsplash.com/photo-1614730341194-75c6074065db?q=80&w=1200&auto=format&fit=crop',
    prompt: 'گربه سامورایی با زره طلایی در جنگل شکوفه‌های گیلاس.',
    model: 'Seedream 4',
    dimensions: '1024x1536',
    date: '۱۴۰۳/۰۳/۲۵'
  },
  {
    id: '9',
    title: 'تیزر تبلیغاتی نوشابه',
    type: 'video',
    service: 'video',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1200&auto=format&fit=crop',
    video: 'https://famjljl5gg.ufs.sh/f/aej4FOV7nKCWa2gs1JuV7nKCWNQtX5A9MYsSFDeirbP10oRI', // Mock video URL
    prompt: 'نمای کلوزآپ از بطری نوشابه خنک با قطرات آب، نورپردازی استودیویی، حرکت دوربین آهسته و چرخشی.',
    model: 'Sora 2 Pro',
    dimensions: '1920x1080',
    date: '۱۴۰۳/۰۳/۲۸'
  },
  {
    id: '10',
    title: 'انیمیشن سه بعدی کاراکتر',
    type: 'video',
    service: 'video',
    category: 'Animation',
    image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1200&auto=format&fit=crop',
    video: 'https://famjljl5gg.ufs.sh/f/aej4FOV7nKCWbhZZGXk6SrQmVWuotE8sHOxYZJIcjiaR7hL9',
    prompt: 'کاراکتر ربات بامزه در حال رقصیدن در خیابان، سبک پیکسار، رندر سه بعدی با جزئیات بالا.',
    model: 'Kling 2.6',
    dimensions: '1080x1920',
    date: '۱۴۰۳/۰۴/۰۱'
  },
  {
    id: '11',
    title: 'تست لباس مجلسی',
    type: 'vton',
    service: 'vton',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
    garment: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600&auto=format&fit=crop',
    prompt: 'پوشاندن لباس مجلسی قرمز روی مدل، حفظ فرم بدن و نورپردازی محیط.',
    model: 'Nano Banana Pro',
    dimensions: '1024x1536',
    date: '۱۴۰۳/۰۴/۰۵'
  }
];
