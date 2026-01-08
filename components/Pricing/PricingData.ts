
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
  provider?: string; // Added for Chat models grouping
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
    // OpenAI
    { id: "gpt_5_2", name: "GPT-5.2", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 1875, output: 3000 }, suitableFor: "" },
    { id: "gpt_5_1", name: "GPT-5.1", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 1875, output: 3000 }, suitableFor: "" },
    { id: "gpt_5", name: "GPT-5", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 1875, output: 3000 }, suitableFor: "" },
    { id: "gpt_5_mini", name: "GPT-5 Mini", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 375, output: 300 }, suitableFor: "" },
    { id: "gpt_5_nano", name: "GPT-5 Nano", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 150, output: 75 }, suitableFor: "" },
    { id: "gpt_4o", name: "GPT-4o", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 750, output: 1500 }, suitableFor: "" },
    { id: "gpt_4o_mini", name: "GPT-4o Mini", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 225, output: 660 }, suitableFor: "" },
    { id: "o4_mini", name: "O4 Mini", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 330, output: 660 }, suitableFor: "" },
    { id: "o3", name: "O3", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 3000, output: 12000 }, suitableFor: "" },
    { id: "o3_mini", name: "O3 Mini", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 300, output: 6600 }, suitableFor: "" },
    { id: "gpt_4_1", name: "GPT-4.1", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 3000, output: 12000 }, suitableFor: "" },
    { id: "gpt_4_1_mini", name: "GPT-4.1 Mini", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 340, output: 1360 }, suitableFor: "" },
    { id: "gpt_4_1_nano", name: "GPT-4.1 Nano", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 150, output: 600 }, suitableFor: "" },

    // xAI
    { id: "grok_4_1_reasoning", name: "Grok 4.1 Fast Reasoning", provider: "xAI", pricing_strategy: "token_based", prices: { input: 640, output: 1280 }, suitableFor: "" },
    { id: "grok_4_1_fast", name: "Grok 4.1 Fast Non-Reasoning", provider: "xAI", pricing_strategy: "token_based", prices: { input: 300, output: 750 }, suitableFor: "" },
    { id: "grok_4_fast", name: "Grok 4 Fast Non-Reasoning", provider: "xAI", pricing_strategy: "token_based", prices: { input: 300, output: 750 }, suitableFor: "" },
    { id: "grok_4_fast_reasoning", name: "Grok 4 Fast Reasoning", provider: "xAI", pricing_strategy: "token_based", prices: { input: 300, output: 750 }, suitableFor: "" },

    // Google
    { id: "gemini_3_pro", name: "Gemini 3 Pro Preview", provider: "Google", pricing_strategy: "token_based", prices: { input: 2000, output: 12000 }, suitableFor: "" },
    { id: "gemini_3_flash", name: "Gemini 3 Flash", provider: "Google", pricing_strategy: "token_based", prices: { input: 500, output: 3000 }, suitableFor: "" },
    { id: "gemini_2_5_pro", name: "Gemini 2.5 Pro", provider: "Google", pricing_strategy: "token_based", prices: { input: 1875, output: 3750 }, suitableFor: "" },
    { id: "gemini_2_5_flash", name: "Gemini 2.5 Flash", provider: "Google", pricing_strategy: "token_based", prices: { input: 200, output: 350 }, suitableFor: "" },
    { id: "gemini_2_5_flash_lite", name: "Gemini 2.5 Flash Lite", provider: "Google", pricing_strategy: "token_based", prices: { input: 100, output: 300 }, suitableFor: "" },
    { id: "gemini_2_0_flash", name: "Gemini 2.0 Flash", provider: "Google", pricing_strategy: "token_based", prices: { input: 100, output: 400 }, suitableFor: "" },

    // Anthropic
    { id: "claude_opus_4_5", name: "Claude Opus 4.5", provider: "Anthropic", pricing_strategy: "token_based", prices: { input: 5000, output: 25000 }, suitableFor: "" },
    { id: "claude_sonnet_4_5", name: "Claude Sonnet 4.5", provider: "Anthropic", pricing_strategy: "token_based", prices: { input: 3000, output: 12000 }, suitableFor: "" },
    { id: "claude_haiku_4_5", name: "Claude Haiku 4.5", provider: "Anthropic", pricing_strategy: "token_based", prices: { input: 350, output: 1500 }, suitableFor: "" },
    { id: "claude_sonnet_4", name: "Claude Sonnet 4", provider: "Anthropic", pricing_strategy: "token_based", prices: { input: 2500, output: 10000 }, suitableFor: "" },
    { id: "claude_3_7_sonnet", name: "Claude 3.7 Sonnet", provider: "Anthropic", pricing_strategy: "token_based", prices: { input: 2000, output: 8000 }, suitableFor: "" },

    // Minimax
    { id: "minimax_m2_1", name: "Minimax M2.1", provider: "Minimax", pricing_strategy: "token_based", prices: { input: 120, output: 480 }, suitableFor: "" },
    { id: "minimax_m2_1_lightning", name: "Minimax M2.1 Lightning", provider: "Minimax", pricing_strategy: "token_based", prices: { input: 120, output: 480 }, suitableFor: "" },
    { id: "minimax_m2", name: "Minimax M2", provider: "Minimax", pricing_strategy: "token_based", prices: { input: 300, output: 1200 }, suitableFor: "" },

    // DeepSeek
    { id: "deepseek_v3_2_thinking", name: "DeepSeek V3.2 Thinking", provider: "DeepSeek", pricing_strategy: "token_based", prices: { input: 710, output: 2130 }, suitableFor: "" },
    { id: "deepseek_v3_2", name: "DeepSeek V3.2", provider: "DeepSeek", pricing_strategy: "token_based", prices: { input: 710, output: 2130 }, suitableFor: "" },
    { id: "deepseek_v3_1", name: "DeepSeek V3.1", provider: "DeepSeek", pricing_strategy: "token_based", prices: { input: 240, output: 480 }, suitableFor: "" },

    // Alibaba
    { id: "qwen3_max", name: "Qwen3 Max", provider: "Alibaba", pricing_strategy: "token_based", prices: { input: 3000, output: 9000 }, suitableFor: "" },
    { id: "qwen3_vl_thinking", name: "Qwen3 VL Thinking", provider: "Alibaba", pricing_strategy: "token_based", prices: { input: 1500, output: 4500 }, suitableFor: "" },

    // Mistral
    { id: "ministral_3b", name: "Ministral 3B", provider: "Mistral", pricing_strategy: "token_based", prices: { input: 400, output: 400 }, suitableFor: "" },
    { id: "devstral_2", name: "Devstral 2", provider: "Mistral", pricing_strategy: "token_based", prices: { input: 1000, output: 3000 }, suitableFor: "" },
    { id: "mistral_large", name: "Mistral Large", provider: "Mistral", pricing_strategy: "token_based", prices: { input: 2000, output: 6000 }, suitableFor: "" },

    // Zai
    { id: "glm_4_7", name: "GLM 4.7", provider: "Zai", pricing_strategy: "token_based", prices: { input: 500, output: 1500 }, suitableFor: "" },
    { id: "glm_4_6v", name: "GLM 4.6v", provider: "Zai", pricing_strategy: "token_based", prices: { input: 500, output: 1500 }, suitableFor: "" },
    { id: "glm_4_6", name: "GLM 4.6", provider: "Zai", pricing_strategy: "token_based", prices: { input: 225, output: 675 }, suitableFor: "" },
    { id: "glm_4_5", name: "GLM 4.5", provider: "Zai", pricing_strategy: "token_based", prices: { input: 300, output: 900 }, suitableFor: "" },
    { id: "glm_4_5_air", name: "GLM 4.5 Air", provider: "Zai", pricing_strategy: "token_based", prices: { input: 150, output: 300 }, suitableFor: "" },

    // Moonshotai
    { id: "kimi_k2", name: "Kimi K2", provider: "Moonshotai", pricing_strategy: "token_based", prices: { input: 300, output: 1200 }, suitableFor: "" },
    { id: "kimi_k2_thinking", name: "Kimi K2 Thinking", provider: "Moonshotai", pricing_strategy: "token_based", prices: { input: 600, output: 2500 }, suitableFor: "" },

    // Meta
    { id: "llama_4_maverick", name: "Llama 4 Maverick", provider: "Meta", pricing_strategy: "token_based", prices: { input: 225, output: 225 }, suitableFor: "" },
    { id: "llama_4_scout", name: "Llama 4 Scout", provider: "Meta", pricing_strategy: "token_based", prices: { input: 150, output: 150 }, suitableFor: "" },
  ]
};
