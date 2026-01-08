
export type PricingStrategy = 
  | 'fixed' 
  | 'resolution' 
  | 'quality' 
  | 'upscale_factor' 
  | 'target_resolution'
  | 'duration_based' 
  | 'duration_quality_based' 
  | 'duration_sound_based'
  | 'complex' // For Nano Banana Pro (Editing)
  | 'complex_audio' // For Veo (Duration + Res + Audio)
  | 'token_based'; // For Chat

export interface ModelPricing {
  id: string;
  name: string;
  pricing_strategy: PricingStrategy;
  price?: number; // For fixed
  prices?: any; // For complex structures
  input_reference?: string;
  badge?: string; // e.g., 'Best Value', 'Fastest'
  desc?: string;
  suitableFor: string; // New field for use-case
}

export const PRICING_DATA = {
  textToImage: [
    { id: "nano_banana_pro", name: "NANO BANANA PRO", pricing_strategy: "resolution", prices: { "1k": 225, "2k": 225, "4k": 450 }, badge: "محبوب‌ترین", suitableFor: "تولید سریع محتوا برای شبکه‌های اجتماعی" },
    { id: "flux_2", name: "FLUX 2", pricing_strategy: "resolution", prices: { "1k": 18, "2k": 72 }, badge: "اقتصادی", suitableFor: "نمونه‌سازی اولیه و اسکچ‌های مفهومی" },
    { id: "flux_2_pro", name: "FLUX 2 PRO", pricing_strategy: "resolution", prices: { "1k": 44, "2k": 110 }, suitableFor: "پروژه‌های تجاری با جزئیات بالا" },
    { id: "flux_2_max", name: "FLUX 2 MAX", pricing_strategy: "resolution", prices: { "1k": 105, "2k": 240 }, badge: "کیفیت بالا", suitableFor: "چاپ در ابعاد بزرگ و بیلبورد" },
    { id: "flux_1_1_pro", name: "FLUX 1.1 PRO", pricing_strategy: "fixed", price: 60, suitableFor: "کارهای گرافیکی استاندارد و وب" },
    { id: "flux_1_1_pro_ultra", name: "FLUX 1.1 PRO ULTRA", pricing_strategy: "fixed", price: 90, suitableFor: "هنر دیجیتال با وضوح فوق‌العاده" },
    { id: "gpt_image_1_5", name: "GPT IMAGE 1.5", pricing_strategy: "quality", prices: { "normal": 14, "good": 51, "perfect": 200 }, suitableFor: "تبدیل دقیق متن‌های پیچیده به تصویر" },
    { id: "ideogram_v3", name: "IDEOGRAM V3", pricing_strategy: "quality", prices: { "normal": 45, "good": 90, "perfect": 135 }, badge: "بهترین تایپوگرافی", suitableFor: "طراحی لوگو، پوستر و تصاویر دارای متن" },
    { id: "imagen_4", name: "IMAGEN 4", pricing_strategy: "fixed", price: 60, suitableFor: "تصاویر واقع‌گرایانه (فوتورئالیسم)" },
    { id: "seedream_4", name: "SEEDREAM 4", pricing_strategy: "fixed", price: 45, suitableFor: "ایده‌پردازی خلاقانه و فانتزی" },
    { id: "wan_2_6", name: "WAN 2.6", pricing_strategy: "fixed", price: 45, suitableFor: "تولید تصاویر سبک و مینیمال" },
  ],
  imageEditing: [
    { id: "nano_banana_pro", name: "NANO BANANA PRO", pricing_strategy: "complex", prices: { "1k": 225, "2k": 225, "4k": 450, "1k_web_search": 247, "2k_web_search": 247, "4k_web_search": 472 }, badge: "هوشمند", suitableFor: "ویرایش سریع و تغییرات کلی در تصویر" },
    { id: "flux_2_pro", name: "FLUX 2 PRO", pricing_strategy: "resolution", prices: { "1k": 44, "2k": 110 }, suitableFor: "روتوش حرفه‌ای و تغییرات دقیق" },
    { id: "qweb_image_edit_2511", name: "QWEB IMAGE EDIT 2511", pricing_strategy: "resolution", prices: { "1k": 45, "2k": 180 }, suitableFor: "ویرایش مبتنی بر دستورات متنی خاص" },
    { id: "gpt_image_1_5", name: "GPT IMAGE 1.5", pricing_strategy: "quality", prices: { "normal": 14, "good": 51, "perfect": 200 }, suitableFor: "درک عمیق صحنه برای تغییرات ساختاری" },
    { id: "reve", name: "REVE", pricing_strategy: "fixed", price: 60, suitableFor: "تغییر استایل و اعمال فیلترهای هنری" },
    { id: "emu_3_5_image", name: "EMU 3.5 IMAGE", pricing_strategy: "resolution", prices: { "480p": 225, "720p": 450 }, suitableFor: "ویرایش‌های ساده و سریع موبایلی" },
  ],
  upscaling: [
    { id: "clarity_ai_crystal_upscaler", name: "CLARITY AI CRYSTAL", pricing_strategy: "upscale_factor", input_reference: "1024x1024", prices: { "2x": 96, "4x": 408, "6x": 912, "8x": 1608, "10x": 2520 }, badge: "کیفیت کریستالی", suitableFor: "بازیابی جزئیات چهره و پرتره‌های قدیمی" },
    { id: "clarity_upscaler", name: "CLARITY UPSCALER", pricing_strategy: "upscale_factor", input_reference: "1024x1024", prices: { "2x": 96, "4x": 408 }, suitableFor: "افزایش کیفیت عمومی تصاویر تار" },
    { id: "topaz_labs_upscaler", name: "TOPAZ LABS", pricing_strategy: "upscale_factor", input_reference: "1024x1024", prices: { "2x": 120, "4x": 120 }, badge: "استاندارد صنعتی", suitableFor: "آماده‌سازی برای چاپ لارج فرمت" },
    { id: "nano_banana_pro", name: "NANO BANANA PRO", pricing_strategy: "target_resolution", prices: { "1k": 225, "2k": 225, "4k": 450 }, suitableFor: "افزایش سایز سریع برای استفاده در وب" },
    { id: "recraft_crisp_upscaler", name: "RECRAFT CRISP", pricing_strategy: "fixed", price: 6, badge: "اقتصادی‌ترین", suitableFor: "وضوح لبه‌ها در وکتور و طرح‌های گرافیکی" },
  ],
  videoGen: [
    { id: "sora2_pro", name: "SORA 2 PRO", pricing_strategy: "duration_quality_based", prices: { "4s": { "720p": 1800, "1080p": 3000 }, "8s": { "720p": 3600, "1080p": 6000 }, "12s": { "720p": 5400, "1080p": 9000 } }, badge: "پرچمدار", suitableFor: "تولید فیلم‌های سینمایی و تبلیغات حرفه‌ای" },
    { id: "kling_2_5_pro", name: "KLING 2.5 PRO", pricing_strategy: "duration_based", prices: { "5s": 1050, "10s": 2100 }, badge: "واقع‌گرایانه", suitableFor: "انیمیشن‌های واقع‌گرایانه با فیزیک دقیق" },
    { id: "veo_3_1_fast", name: "VEO 3.1 FAST", pricing_strategy: "complex_audio", prices: { "4s": { "720p": { "without_sound": 600, "with_sound": 900 }, "1080p": { "without_sound": 600, "with_sound": 900 } }, "6s": { "720p": { "without_sound": 900, "with_sound": 1350 }, "1080p": { "without_sound": 900, "with_sound": 1350 } }, "8s": { "720p": { "without_sound": 1200, "with_sound": 1800 }, "1080p": { "without_sound": 1200, "with_sound": 1800 } } }, suitableFor: "استوری‌موشن و ویدیوهای کوتاه همراه با صدا" },
    { id: "ltx_2_fast", name: "LTX 2 FAST", pricing_strategy: "duration_quality_based", prices: { "6s": { "1080p": 360, "1440p": 720, "2160p": 1440 }, "10s": { "1080p": 600, "1440p": 1200, "2160p": 2400 } }, suitableFor: "محتوای وایرال و ترند شبکه‌های اجتماعی" },
    { id: "wan_2_5", name: "WAN 2.5", pricing_strategy: "duration_quality_based", prices: { "5s": { "480p": 375, "720p": 750, "1080p": 1125 }, "10s": { "480p": 750, "720p": 1500, "1080p": 2250 } }, suitableFor: "ویدیوهای هنری، موزیک ویدیو و انتزاعی" },
    { id: "hailuo_2_3", name: "HAILUO 2.3", pricing_strategy: "duration_based", prices: { "6s": 420, "10s": 840 }, suitableFor: "موشن گرافیک و کلیپ‌های کوتاه" },
  ],
  bgRemoval: [
    { id: "imageutils_rembg", name: "IMAGEUTILS REMBG", pricing_strategy: "fixed", price: 2, badge: "سریع", suitableFor: "پردازش انبوه تصاویر فروشگاهی" },
    { id: "birefnet_v2", name: "BIREFNET V2", pricing_strategy: "fixed", price: 2, badge: "دقیق", suitableFor: "جداسازی سوژه‌های پیچیده (مو، تور، شیشه)" }
  ]
};
