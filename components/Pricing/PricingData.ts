
export type PricingStrategy = 
  | 'fixed' 
  | 'resolution' 
  | 'quality' 
  | 'upscale_factor' 
  | 'target_resolution'
  | 'duration_based' 
  | 'duration_quality_based' 
  | 'duration_sound_based'
  | 'complex' 
  | 'complex_audio' 
  | 'token_based';

export interface ModelPricing {
  id: string;
  name: string;
  pricing_strategy: PricingStrategy;
  price?: number; 
  prices?: any; 
  input_reference?: string;
  badge?: string;
  desc?: string;
  suitableFor: string;
}

export const PRICING_DATA = {
  textToImage: [
    { id: "nano_banana_pro", name: "NANO BANANA PRO", pricing_strategy: "resolution", prices: { "1k": 225, "2k": 225, "4k": 450 }, badge: "محبوب‌ترین", suitableFor: "تولید سریع محتوا برای شبکه‌های اجتماعی" },
    { id: "flux_2", name: "FLUX 2", pricing_strategy: "resolution", prices: { "1k": 18, "2k": 72 }, badge: "اقتصادی", suitableFor: "نمونه‌سازی اولیه و اسکچ‌های مفهومی" },
    { id: "flux_2_pro", name: "FLUX 2 PRO", pricing_strategy: "resolution", prices: { "1k": 44, "2k": 110 }, suitableFor: "پروژه‌های تجاری با جزئیات بالا" },
    { id: "flux_2_max", name: "FLUX 2 MAX", pricing_strategy: "resolution", prices: { "1k": 105, "2k": 240 }, badge: "کیفیت بالا", suitableFor: "چاپ در ابعاد بزرگ و بیلبورد" },
    { id: "flux_1_1_pro", name: "FLUX 1.1 PRO", pricing_strategy: "fixed", price: 60, suitableFor: "کارهای گرافیکی استاندارد و وب" },
    { id: "flux_1_1_pro_ultra", name: "FLUX 1.1 PRO ULTRA", pricing_strategy: "fixed", price: 90, suitableFor: "هنر دیجیتال با وضوح فوق‌العاده" },
    { id: "recraft_v3", name: "RECRAFT V3", pricing_strategy: "fixed", price: 60, suitableFor: "طراحی وکتور و گرافیک تخت" },
    { id: "gpt_image_1", name: "GPT IMAGE 1", pricing_strategy: "quality", prices: { "normal": 60, "good": 80, "perfect": 100 }, suitableFor: "تولید تصاویر با دقت معنایی بالا" },
    { id: "gpt_image_1_mini", name: "GPT IMAGE 1 MINI", pricing_strategy: "quality", prices: { "normal": 30, "good": 40, "perfect": 50 }, suitableFor: "نسخه سبک برای کارهای سریع" },
    { id: "gpt_image_1_5", name: "GPT IMAGE 1.5", pricing_strategy: "quality", prices: { "normal": 14, "good": 51, "perfect": 200 }, suitableFor: "تبدیل دقیق متن‌های پیچیده به تصویر" },
    { id: "imagen_4", name: "IMAGEN 4", pricing_strategy: "fixed", price: 60, suitableFor: "تصاویر واقع‌گرایانه (فوتورئالیسم)" },
    { id: "seedream_4", name: "SEEDREAM 4", pricing_strategy: "fixed", price: 45, suitableFor: "ایده‌پردازی خلاقانه و فانتزی" },
    { id: "seedream_4_5", name: "SEEDREAM 4.5", pricing_strategy: "fixed", price: 45, suitableFor: "نسخه ارتقا یافته برای رویاپردازی" },
    { id: "z_image_turbo", name: "Z IMAGE TURBO", pricing_strategy: "resolution", prices: { "1k": 7, "2k": 28 }, suitableFor: "تولید تصویر با سرعت نور" },
    { id: "ideogram_v3", name: "IDEOGRAM V3", pricing_strategy: "quality", prices: { "normal": 45, "good": 90, "perfect": 135 }, badge: "بهترین تایپوگرافی", suitableFor: "طراحی لوگو، پوستر و تصاویر دارای متن" },
    { id: "hunyuan_image_v3", name: "HUNYUAN IMAGE V3", pricing_strategy: "fixed", price: 150, suitableFor: "مدل پیشرفته چینی با درک هنری خاص" },
    { id: "wan_2_6", name: "WAN 2.6", pricing_strategy: "fixed", price: 45, suitableFor: "تولید تصاویر سبک و مینیمال" },
    { id: "wan_2_5", name: "WAN 2.5", pricing_strategy: "fixed", price: 75, suitableFor: "تصاویر هنری با استایل شرقی" },
  ],
  imageEditing: [
    { id: "nano_banana", name: "NANO BANANA", pricing_strategy: "fixed", price: 60, suitableFor: "ویرایش‌های ساده و سریع" },
    { id: "nano_banana_pro_edit", name: "NANO BANANA PRO", pricing_strategy: "complex", prices: { "1k": 225, "2k": 225, "4k": 450, "1k_web_search": 247, "2k_web_search": 247, "4k_web_search": 472 }, badge: "هوشمند", suitableFor: "ویرایش سریع و تغییرات کلی با جستجوی وب" },
    { id: "flux_2_edit", name: "FLUX 2", pricing_strategy: "resolution", prices: { "1k": 72, "2k": 180 }, suitableFor: "ویرایش با کیفیت استاندارد" },
    { id: "flux_2_pro_edit", name: "FLUX 2 PRO", pricing_strategy: "resolution", prices: { "1k": 44, "2k": 110 }, suitableFor: "روتوش حرفه‌ای و تغییرات دقیق" },
    { id: "flux_2_max_edit", name: "FLUX 2 MAX", pricing_strategy: "resolution", prices: { "1k": 105, "2k": 240 }, suitableFor: "ویرایش تصاویر بسیار بزرگ" },
    { id: "flux_kontext_pro", name: "FLUX KONTEXT PRO", pricing_strategy: "fixed", price: 60, suitableFor: "ویرایش با درک زمینه (Context)" },
    { id: "flux_kontext_max", name: "FLUX KONTEXT MAX", pricing_strategy: "fixed", price: 120, suitableFor: "بالاترین درک زمینه و جزئیات" },
    { id: "qweb_image_edit_2511", name: "QWEB IMAGE EDIT 2511", pricing_strategy: "resolution", prices: { "1k": 45, "2k": 180 }, suitableFor: "ویرایش مبتنی بر دستورات متنی خاص" },
    { id: "qweb_image_edit", name: "QWEB IMAGE EDIT", pricing_strategy: "fixed", price: 45, suitableFor: "ویرایش عمومی وب" },
    { id: "gpt_image_1_edit", name: "GPT IMAGE 1", pricing_strategy: "quality", prices: { "normal": 60, "good": 80, "perfect": 100 }, suitableFor: "ویرایش معنایی تصاویر" },
    { id: "gpt_image_1_mini_edit", name: "GPT IMAGE 1 MINI", pricing_strategy: "quality", prices: { "normal": 30, "good": 40, "perfect": 50 }, suitableFor: "ویرایش‌های سبک" },
    { id: "gpt_image_1_5_edit", name: "GPT IMAGE 1.5", pricing_strategy: "quality", prices: { "normal": 14, "good": 51, "perfect": 200 }, suitableFor: "درک عمیق صحنه برای تغییرات ساختاری" },
    { id: "seedance_4", name: "SEEDANCE 4", pricing_strategy: "fixed", price: 45, suitableFor: "ویرایش خلاقانه و رقص نور" },
    { id: "seedance_4_5", name: "SEEDANCE 4.5", pricing_strategy: "fixed", price: 45, suitableFor: "نسخه پیشرفته Seedance" },
    { id: "z_image_turbo_edit", name: "Z IMAGE TURBO", pricing_strategy: "resolution", prices: { "1k": 7, "2k": 28 }, suitableFor: "ویرایش فوق سریع" },
    { id: "wan_2_6_edit", name: "WAN 2.6", pricing_strategy: "fixed", price: 45, suitableFor: "فیلترهای سبک و هنری" },
    { id: "emu_3_5_image", name: "EMU 3.5 IMAGE", pricing_strategy: "resolution", prices: { "480p": 225, "720p": 450 }, suitableFor: "ویرایش‌های ساده و سریع موبایلی" },
    { id: "reve_faast", name: "REVE FAAST", pricing_strategy: "fixed", price: 15, suitableFor: "اعمال افکت‌های فوری" },
    { id: "reve", name: "REVE", pricing_strategy: "fixed", price: 60, suitableFor: "تغییر استایل و اعمال فیلترهای هنری" },
  ],
  upscaling: [
    { id: "clarity_ai_crystal_upscaler", name: "CLARITY AI CRYSTAL", pricing_strategy: "upscale_factor", input_reference: "1024x1024", prices: { "2x": 96, "4x": 408, "6x": 912, "8x": 1608, "10x": 2520 }, badge: "کیفیت کریستالی", suitableFor: "بازیابی جزئیات چهره و پرتره‌های قدیمی" },
    { id: "clarity_upscaler", name: "CLARITY UPSCALER", pricing_strategy: "upscale_factor", input_reference: "1024x1024", prices: { "2x": 96, "4x": 408 }, suitableFor: "افزایش کیفیت عمومی تصاویر تار" },
    { id: "topaz_labs_upscaler", name: "TOPAZ LABS", pricing_strategy: "upscale_factor", input_reference: "1024x1024", prices: { "2x": 120, "4x": 120 }, badge: "استاندارد صنعتی", suitableFor: "آماده‌سازی برای چاپ لارج فرمت" },
    { id: "ideogram_upscaler", name: "IDEOGRAM UPSCALER", pricing_strategy: "fixed", price: 80, suitableFor: "بهبود کیفیت متون و گرافیک" },
    { id: "recraft_crisp_upscaler", name: "RECRAFT CRISP", pricing_strategy: "fixed", price: 6, badge: "اقتصادی‌ترین", suitableFor: "وضوح لبه‌ها در وکتور و طرح‌های گرافیکی" },
    { id: "seedvr2_upscaler", name: "SEEDVR2 UPSCALER", pricing_strategy: "upscale_factor", input_reference: "1024x1024", prices: { "2x": 8, "4x": 34, "6x": 76, "8x": 134, "10x": 210 }, suitableFor: "بزرگ‌نمایی با هزینه کم" },
    { id: "nano_banana_pro_upscale", name: "NANO BANANA PRO", pricing_strategy: "target_resolution", prices: { "1k": 225, "2k": 225, "4k": 450 }, suitableFor: "افزایش سایز سریع برای استفاده در وب" },
  ],
  bgRemoval: [
    { id: "imageutils_rembg", name: "IMAGEUTILS REMBG", pricing_strategy: "fixed", price: 2, badge: "سریع", suitableFor: "پردازش انبوه تصاویر فروشگاهی" },
    { id: "birefnet_v2", name: "BIREFNET V2", pricing_strategy: "fixed", price: 2, badge: "دقیق", suitableFor: "جداسازی سوژه‌های پیچیده (مو، تور، شیشه)" }
  ],
  videoGen: [
    { id: "sora2", name: "SORA 2", pricing_strategy: "duration_based", prices: { "4s": 600, "8s": 1200, "12s": 1800 }, suitableFor: "نسل جدید تولید ویدیو با درک فیزیک" },
    { id: "sora2_pro", name: "SORA 2 PRO", pricing_strategy: "duration_quality_based", prices: { "4s": { "720p": 1800, "1080p": 3000 }, "8s": { "720p": 3600, "1080p": 6000 }, "12s": { "720p": 5400, "1080p": 9000 } }, badge: "پرچمدار", suitableFor: "تولید فیلم‌های سینمایی و تبلیغات حرفه‌ای" },
    { id: "wan_2_2_turbo", name: "WAN 2.2 TURBO", pricing_strategy: "duration_quality_based", prices: { "5s": { "480p": 75, "580p": 112, "720p": 150 } }, suitableFor: "ویدیوهای سبک و سریع" },
    { id: "wan_2_5_video", name: "WAN 2.5", pricing_strategy: "duration_quality_based", prices: { "5s": { "480p": 375, "720p": 750, "1080p": 1125 }, "10s": { "480p": 750, "720p": 1500, "1080p": 2250 } }, suitableFor: "ویدیوهای هنری و انتزاعی با کیفیت بالا" },
    { id: "kling_2_5_turbo_pro", name: "KLING 2.5 TURBO PRO", pricing_strategy: "duration_based", prices: { "5s": 525, "10s": 1050 }, suitableFor: "کلیپ‌های سریع برای سوشال مدیا" },
    { id: "kling_2_5_pro", name: "KLING 2.5 PRO", pricing_strategy: "duration_based", prices: { "5s": 1050, "10s": 2100 }, badge: "واقع‌گرایانه", suitableFor: "انیمیشن‌های واقع‌گرایانه با فیزیک دقیق" },
    { id: "kling_2_6_pro", name: "KLING 2.6 PRO", pricing_strategy: "duration_sound_based", prices: { "5s": { "without_sound": 525, "with_sound": 1050 }, "10s": { "without_sound": 1050, "with_sound": 2100 } }, suitableFor: "موشن گرافیک با هماهنگی صدا" },
    { id: "ltx_2_fast", name: "LTX 2 FAST", pricing_strategy: "duration_quality_based", prices: { "6s": { "1080p": 360, "1440p": 720, "2160p": 1440 }, "10s": { "1080p": 600, "1440p": 1200, "2160p": 2400 } }, suitableFor: "محتوای وایرال و ترند با رزولوشن بالا" },
    { id: "veo_3_fast", name: "VEO 3 FAST", pricing_strategy: "complex_audio", prices: { "4s": { "720p": { "without_sound": 600, "with_sound": 900 }, "1080p": { "without_sound": 600, "with_sound": 900 } }, "8s": { "720p": { "without_sound": 1200, "with_sound": 1800 }, "1080p": { "without_sound": 1200, "with_sound": 1800 } } }, suitableFor: "تبلیغات کوتاه و موشن" },
    { id: "veo_3_1_fast", name: "VEO 3.1 FAST", pricing_strategy: "complex_audio", prices: { "4s": { "720p": { "without_sound": 600, "with_sound": 900 }, "1080p": { "without_sound": 600, "with_sound": 900 } }, "8s": { "720p": { "without_sound": 1200, "with_sound": 1800 }, "1080p": { "without_sound": 1200, "with_sound": 1800 } } }, suitableFor: "استوری‌موشن و ویدیوهای پایدار" },
    { id: "hailuo_2_3", name: "HAILUO 2.3", pricing_strategy: "duration_based", prices: { "6s": 420, "10s": 840 }, suitableFor: "ویدیوهای هنری خاص" },
    { id: "seedance_v1_pro_fast", name: "SEEDANCE V1 PRO FAST", pricing_strategy: "duration_quality_based", prices: { "2s": { "480p": 22, "720p": 45, "1080p": 75 }, "12s": { "480p": 200, "720p": 450, "1080p": 875 } }, suitableFor: "رقص و حرکات موزون کاراکتر" },
  ],
  chat: [
    { id: "gpt_5_2", name: "GPT-5.2", pricing_strategy: "token_based", prices: { input: 1875, output: 3000 }, suitableFor: "هوشمندترین مدل جهان" },
    { id: "gpt_5_1", name: "GPT-5.1", pricing_strategy: "token_based", prices: { input: 1875, output: 3000 }, suitableFor: "نسخه پایدار GPT-5" },
    { id: "gpt_5", name: "GPT-5", pricing_strategy: "token_based", prices: { input: 1875, output: 3000 }, suitableFor: "مدل پرچمدار" },
    { id: "gpt_5_mini", name: "GPT-5 MINI", pricing_strategy: "token_based", prices: { input: 375, output: 300 }, suitableFor: "سریع و اقتصادی" },
    { id: "gpt_5_nano", name: "GPT-5 NANO", pricing_strategy: "token_based", prices: { input: 150, output: 75 }, suitableFor: "فوق سریع" },
    { id: "gpt_4o", name: "GPT-4o", pricing_strategy: "token_based", prices: { input: 750, output: 1500 }, suitableFor: "چندوجهی استاندارد" },
    { id: "claude_opus_4_5", name: "CLAUDE OPUS 4.5", pricing_strategy: "token_based", prices: { input: 5000, output: 25000 }, suitableFor: "کدنویسی و تحلیل عمیق" },
    { id: "gemini_3_pro", name: "GEMINI 3 PRO", pricing_strategy: "token_based", prices: { input: 2000, output: 12000 }, suitableFor: "اکوسیستم گوگل" },
    { id: "grok_4_1_reasoning", name: "GROK 4.1 REASONING", pricing_strategy: "token_based", prices: { input: 640, output: 1280 }, suitableFor: "استدلال منطقی" },
    { id: "deepseek_v3_2_thinking", name: "DEEPSEEK V3.2 THINKING", pricing_strategy: "token_based", prices: { input: 710, output: 2130 }, suitableFor: "حل مسائل ریاضی" },
  ]
};
