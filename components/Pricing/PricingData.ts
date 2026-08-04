
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
  | 'token_based'
  | 'option_matrix';

export interface PricingOption {
  dimensions: {
    aspect?: string;
    size?: string;
    quality?: string;
    duration?: string;
    resolution?: string;
    audio?: string;
  };
  priceLum: number;
}

export interface ModelPricing {
  id: string;
  name: string;
  pricing_strategy: PricingStrategy;
  price?: number; 
  prices?: any; 
  options?: PricingOption[];
  input_reference?: string;
  badge?: string;
  desc?: string;
  suitableFor: string;
  provider?: string; // Added for Chat models grouping
}

export interface AssistantModelPricing {
  id: string;
  name: string;
  pricePerMessage: number;
  provider: "OpenAI";
}

export const PRICING_DATA = {
  textToImage: [
    {
      id: "nano_banana_2",
      name: "Nano Banana 2",
      pricing_strategy: "resolution",
      prices: { "0.5k": 90, "1k": 120, "2k": 180, "4k": 240 },
      suitableFor: "تولید سریع تصاویر عمومی با انتخاب چند سطح رزولوشن"
    },
    {
      id: "nano_banana_pro",
      name: "Nano Banana Pro",
      pricing_strategy: "resolution",
      prices: { "1k": 225, "2k": 225, "4k": 450 },
      suitableFor: "تولید تصاویر حرفه‌ای با درک دقیق دستور و کیفیت بالا"
    },
    {
      id: "gpt_image_02",
      name: "GPT-IMAGE-02",
      pricing_strategy: "option_matrix",
      options: [
        { dimensions: { aspect: "4x3", size: "1536x1024", quality: "low" }, priceLum: 8 },
        { dimensions: { aspect: "4x3", size: "1536x1024", quality: "medium" }, priceLum: 56 },
        { dimensions: { aspect: "4x3", size: "1536x1024", quality: "high" }, priceLum: 218 },
        { dimensions: { aspect: "1x1", size: "1000x1000", quality: "low" }, priceLum: 9 },
        { dimensions: { aspect: "1x1", size: "1000x1000", quality: "medium" }, priceLum: 80 },
        { dimensions: { aspect: "1x1", size: "1000x1000", quality: "high" }, priceLum: 317 },
        { dimensions: { aspect: "3x4", size: "1024x1536", quality: "low" }, priceLum: 8 },
        { dimensions: { aspect: "3x4", size: "1024x1536", quality: "medium" }, priceLum: 56 },
        { dimensions: { aspect: "3x4", size: "1024x1536", quality: "high" }, priceLum: 218 }
      ],
      badge: "جدید",
      suitableFor: "نسل جدید تولید تصویر با کیفیت بالا و کنترل نسبت تصویر"
    },
    {
      id: "gpt_image_01",
      name: "GPT-IMAGE-01",
      pricing_strategy: "option_matrix",
      options: [
        { dimensions: { aspect: "16x9", size: "1536x1024", quality: "low" }, priceLum: 30 },
        { dimensions: { aspect: "16x9", size: "1536x1024", quality: "medium" }, priceLum: 105 },
        { dimensions: { aspect: "16x9", size: "1536x1024", quality: "high" }, priceLum: 375 },
        { dimensions: { aspect: "4x3", size: "1536x1024", quality: "low" }, priceLum: 30 },
        { dimensions: { aspect: "4x3", size: "1536x1024", quality: "medium" }, priceLum: 105 },
        { dimensions: { aspect: "4x3", size: "1536x1024", quality: "high" }, priceLum: 375 },
        { dimensions: { aspect: "1x1", size: "1000x1000", quality: "low" }, priceLum: 15 },
        { dimensions: { aspect: "1x1", size: "1000x1000", quality: "medium" }, priceLum: 105 },
        { dimensions: { aspect: "1x1", size: "1000x1000", quality: "high" }, priceLum: 285 },
        { dimensions: { aspect: "3x4", size: "1024x1536", quality: "low" }, priceLum: 30 },
        { dimensions: { aspect: "3x4", size: "1024x1536", quality: "medium" }, priceLum: 105 },
        { dimensions: { aspect: "3x4", size: "1024x1536", quality: "high" }, priceLum: 375 },
        { dimensions: { aspect: "9x16", size: "1024x1536", quality: "low" }, priceLum: 30 },
        { dimensions: { aspect: "9x16", size: "1024x1536", quality: "medium" }, priceLum: 105 },
        { dimensions: { aspect: "9x16", size: "1024x1536", quality: "high" }, priceLum: 375 }
      ],
      suitableFor: "تولید تصاویر با درک معنایی قوی و کنترل کیفیت خروجی"
    },
    {
      id: "image_gen_4",
      name: "Image Gen 4",
      pricing_strategy: "fixed",
      price: 60,
      suitableFor: "تولید تصاویر واقع‌گرایانه و محتوای تبلیغاتی"
    },
    {
      id: "flux_2",
      name: "Flux 2",
      pricing_strategy: "resolution",
      prices: { "1k": 18, "2k": 54 },
      badge: "اقتصادی",
      suitableFor: "تولید سریع و اقتصادی برای ایده‌پردازی و نمونه‌سازی"
    },
    {
      id: "flux_2_pro",
      name: "Flux 2 Pro",
      pricing_strategy: "resolution",
      prices: { "1k": 44, "2k": 88 },
      suitableFor: "تصاویر حرفه‌ای با جزئیات بالا برای استفاده تجاری"
    },
    {
      id: "flux_2_max",
      name: "Flux 2 Max",
      pricing_strategy: "resolution",
      prices: { "1k": 105, "2k": 195 },
      suitableFor: "بالاترین کیفیت خانواده Flux برای خروجی‌های حرفه‌ای"
    },
    {
      id: "flux_1_1_pro",
      name: "Flux 1.1 Pro",
      pricing_strategy: "fixed",
      price: 135,
      suitableFor: "تولید تصاویر استاندارد و قابل اتکا برای طراحی و وب"
    },
    {
      id: "flux_1_1_ultra",
      name: "Flux 1.1 Ultra",
      pricing_strategy: "fixed",
      price: 174,
      suitableFor: "تولید تصاویر با جزئیات و وضوح بالا"
    },
    {
      id: "recraft_4_1",
      name: "Recraft 4.1",
      pricing_strategy: "fixed",
      price: 60,
      suitableFor: "طراحی گرافیکی، تصویرسازی و محتوای برند"
    },
    {
      id: "recraft_4_1_pro",
      name: "Recraft 4.1 Pro",
      pricing_strategy: "fixed",
      price: 375,
      suitableFor: "خروجی حرفه‌ای برای پروژه‌های تبلیغاتی و طراحی برند"
    },
    {
      id: "recraft",
      name: "Recraft",
      pricing_strategy: "fixed",
      price: 135,
      suitableFor: "طراحی گرافیک، تصویرسازی و ساخت دارایی‌های بصری"
    },
    {
      id: "seedream_5_lite",
      name: "Seedream 5 Lite",
      pricing_strategy: "fixed",
      price: 52,
      suitableFor: "ایده‌پردازی و تولید سریع تصاویر خلاقانه"
    },
    {
      id: "seedream_4_5",
      name: "Seedream 4.5",
      pricing_strategy: "fixed",
      price: 60,
      suitableFor: "تولید تصاویر هنری و خلاقانه با جزئیات مناسب"
    },
    {
      id: "grok_imagine",
      name: "Grok Imagine",
      pricing_strategy: "fixed",
      price: 30,
      suitableFor: "تولید سریع تصاویر خلاقانه برای استفاده روزمره"
    },
    {
      id: "grok_imagine_pro",
      name: "Grok Imagine Pro",
      pricing_strategy: "resolution",
      prices: { "1k": 75, "2k": 105 },
      suitableFor: "تولید تصاویر حرفه‌ای با خروجی واضح و جزئیات بیشتر"
    },
    {
      id: "wan_2_7",
      name: "Wan 2.7",
      pricing_strategy: "fixed",
      price: 45,
      suitableFor: "تولید تصاویر سبک، خلاقانه و مناسب شبکه‌های اجتماعی"
    },
    {
      id: "wan_2_7_pro",
      name: "Wan 2.7 Pro",
      pricing_strategy: "fixed",
      price: 113,
      suitableFor: "خروجی حرفه‌ای‌تر خانواده Wan با جزئیات بیشتر"
    },
    {
      id: "wan_2_6",
      name: "Wan 2.6",
      pricing_strategy: "fixed",
      price: 45,
      suitableFor: "تولید سریع تصاویر عمومی و هنری"
    },
    {
      id: "qwen_image_max",
      name: "Qwen Image Max",
      pricing_strategy: "fixed",
      price: 112,
      suitableFor: "تولید تصاویر دقیق با درک مناسب متن و ترکیب‌بندی"
    },
    {
      id: "z_image_turbo",
      name: "Z Image Turbo",
      pricing_strategy: "option_matrix",
      options: [
        { dimensions: { aspect: "16x9 / 9x16", size: "1K" }, priceLum: 7 },
        { dimensions: { aspect: "16x9 / 9x16", size: "2K" }, priceLum: 21 },
        { dimensions: { aspect: "4x3 / 3x4", size: "1K" }, priceLum: 7 },
        { dimensions: { aspect: "4x3 / 3x4", size: "2K" }, priceLum: 21 },
        { dimensions: { aspect: "1x1", size: "1K" }, priceLum: 7 },
        { dimensions: { aspect: "1x1", size: "2K" }, priceLum: 28 }
      ],
      badge: "سریع‌ترین",
      suitableFor: "تولید فوق‌سریع و اقتصادی در نسبت‌های مختلف"
    },
    {
      id: "z_image_base",
      name: "Z Image Base",
      pricing_strategy: "resolution",
      prices: { "1k": 15, "2k": 45 },
      suitableFor: "تولید اقتصادی تصاویر با کیفیت پایه و قابل کنترل"
    },
    {
      id: "ideogram_v3",
      name: "Ideogram V3",
      pricing_strategy: "quality",
      prices: { "low": 45, "medium": 90, "high": 135 },
      badge: "بهترین تایپوگرافی",
      suitableFor: "طراحی پوستر، لوگو و تصاویر دارای نوشته"
    },
    {
      id: "hunyuan_image_v3",
      name: "Hunyuan Image V3",
      pricing_strategy: "fixed",
      price: 150,
      suitableFor: "تصاویر هنری و واقع‌گرایانه با سبک بصری متفاوت"
    }
  ] as ModelPricing[],
  imageEditing: [
    {
      id: "nano_banana_2_edit",
      name: "Nano Banana 2",
      pricing_strategy: "resolution",
      prices: { "0.5k": 90, "1k": 120, "2k": 180, "4k": 240 },
      badge: "جدید",
      suitableFor: "ویرایش سریع تصویر با چند سطح رزولوشن خروجی"
    },
    {
      id: "nano_banana_pro_edit",
      name: "Nano Banana Pro",
      pricing_strategy: "resolution",
      prices: { "1k": 225, "2k": 225, "4k": 450 },
      suitableFor: "ویرایش حرفه‌ای، تغییر عناصر و بازسازی دقیق تصویر"
    },
    {
      id: "gpt_image_02_edit",
      name: "GPT-IMAGE-02",
      pricing_strategy: "option_matrix",
      options: [
        { dimensions: { aspect: "4x3", size: "1536x1024", quality: "low" }, priceLum: 8 },
        { dimensions: { aspect: "4x3", size: "1536x1024", quality: "medium" }, priceLum: 56 },
        { dimensions: { aspect: "4x3", size: "1536x1024", quality: "high" }, priceLum: 218 },
        { dimensions: { aspect: "1x1", size: "1000x1000", quality: "low" }, priceLum: 9 },
        { dimensions: { aspect: "1x1", size: "1000x1000", quality: "medium" }, priceLum: 80 },
        { dimensions: { aspect: "1x1", size: "1000x1000", quality: "high" }, priceLum: 317 },
        { dimensions: { aspect: "3x4", size: "1024x1536", quality: "low" }, priceLum: 8 },
        { dimensions: { aspect: "3x4", size: "1024x1536", quality: "medium" }, priceLum: 56 },
        { dimensions: { aspect: "3x4", size: "1024x1536", quality: "high" }, priceLum: 218 }
      ],
      suitableFor: "نسل جدید ویرایش معنایی با کنترل کیفیت و نسبت تصویر"
    },
    {
      id: "gpt_image_01_edit",
      name: "GPT-IMAGE-01",
      pricing_strategy: "option_matrix",
      options: [
        { dimensions: { aspect: "16x9", size: "1536x1024", quality: "low" }, priceLum: 15 },
        { dimensions: { aspect: "16x9", size: "1536x1024", quality: "medium" }, priceLum: 75 },
        { dimensions: { aspect: "16x9", size: "1536x1024", quality: "high" }, priceLum: 270 },
        { dimensions: { aspect: "4x3", size: "1536x1024", quality: "low" }, priceLum: 15 },
        { dimensions: { aspect: "4x3", size: "1536x1024", quality: "medium" }, priceLum: 75 },
        { dimensions: { aspect: "4x3", size: "1536x1024", quality: "high" }, priceLum: 270 },
        { dimensions: { aspect: "1x1", size: "1024x1024", quality: "low" }, priceLum: 15 },
        { dimensions: { aspect: "1x1", size: "1024x1024", quality: "medium" }, priceLum: 75 },
        { dimensions: { aspect: "1x1", size: "1024x1024", quality: "high" }, priceLum: 270 },
        { dimensions: { aspect: "3x4", size: "1024x1536", quality: "low" }, priceLum: 15 },
        { dimensions: { aspect: "3x4", size: "1024x1536", quality: "medium" }, priceLum: 75 },
        { dimensions: { aspect: "3x4", size: "1024x1536", quality: "high" }, priceLum: 270 },
        { dimensions: { aspect: "9x16", size: "1024x1536", quality: "low" }, priceLum: 15 },
        { dimensions: { aspect: "9x16", size: "1024x1536", quality: "medium" }, priceLum: 75 },
        { dimensions: { aspect: "9x16", size: "1024x1536", quality: "high" }, priceLum: 270 }
      ],
      suitableFor: "ویرایش ساختاری تصاویر با درک دقیق دستور و محتوای صحنه"
    },
    {
      id: "qwen_edit",
      name: "Qwen",
      pricing_strategy: "fixed",
      price: 210,
      suitableFor: "ویرایش پیشرفته تصویر با درک دقیق دستورات متنی"
    },
    {
      id: "qwen_fast_edit",
      name: "Qwen Fast",
      pricing_strategy: "fixed",
      price: 75,
      badge: "سریع",
      suitableFor: "ویرایش سریع تصاویر برای تغییرات عمومی و روزمره"
    },
    {
      id: "flux_2_edit",
      name: "Flux 2",
      pricing_strategy: "resolution",
      prices: { "1k": 18, "2k": 54 },
      badge: "اقتصادی",
      suitableFor: "ویرایش سریع و اقتصادی تصاویر"
    },
    {
      id: "flux_2_pro_edit",
      name: "Flux 2 Pro",
      pricing_strategy: "resolution",
      prices: { "1k": 44, "2k": 88 },
      suitableFor: "روتوش حرفه‌ای و تغییرات دقیق با کیفیت بالا"
    },
    {
      id: "flux_2_max_edit",
      name: "Flux 2 Max",
      pricing_strategy: "resolution",
      prices: { "1k": 105, "2k": 195 },
      suitableFor: "ویرایش پیچیده تصاویر با بیشترین جزئیات خانواده Flux"
    },
    {
      id: "flux_kontext_pro",
      name: "Flux Kontext Pro",
      pricing_strategy: "fixed",
      price: 75,
      suitableFor: "ویرایش تصویر با حفظ زمینه، هویت و ترکیب‌بندی"
    },
    {
      id: "flux_kontext_max",
      name: "Flux Kontext Max",
      pricing_strategy: "fixed",
      price: 150,
      suitableFor: "ویرایش پیشرفته با بیشترین درک زمینه و جزئیات"
    },
    {
      id: "qwen_image_edit_2511",
      name: "Qwen Image Edit 2511",
      pricing_strategy: "option_matrix",
      options: [
        { dimensions: { aspect: "16x9 / 9x16", size: "1K" }, priceLum: 45 },
        { dimensions: { aspect: "16x9 / 9x16", size: "2K" }, priceLum: 135 },
        { dimensions: { aspect: "4x3 / 3x4", size: "1K" }, priceLum: 45 },
        { dimensions: { aspect: "4x3 / 3x4", size: "2K" }, priceLum: 135 },
        { dimensions: { aspect: "1x1", size: "1K" }, priceLum: 45 },
        { dimensions: { aspect: "1x1", size: "2K" }, priceLum: 180 }
      ],
      suitableFor: "ویرایش مبتنی بر دستور با کنترل نسبت و رزولوشن خروجی"
    },
    {
      id: "qwen_image_edit",
      name: "Qwen Image Edit",
      pricing_strategy: "fixed",
      price: 45,
      suitableFor: "ویرایش عمومی تصویر با دستورات متنی"
    },
    {
      id: "seedream_5_lite_edit",
      name: "Seedream 5 Lite",
      pricing_strategy: "fixed",
      price: 52,
      suitableFor: "ویرایش خلاقانه و سریع برای تغییر سبک و محتوای تصویر"
    },
    {
      id: "seedream_4_5_edit",
      name: "Seedream 4.5",
      pricing_strategy: "fixed",
      price: 60,
      suitableFor: "ویرایش خلاقانه، تغییر سبک و بازسازی عناصر"
    },
    {
      id: "seedream_4_edit",
      name: "Seedream 4",
      pricing_strategy: "fixed",
      price: 45,
      suitableFor: "ویرایش هنری و تغییر سبک تصاویر"
    },
    {
      id: "grok_imagine_edit",
      name: "Grok Imagine",
      pricing_strategy: "fixed",
      price: 33,
      suitableFor: "ویرایش سریع و خلاقانه تصاویر روزمره"
    },
    {
      id: "grok_imagine_pro_edit",
      name: "Grok Imagine Pro",
      pricing_strategy: "resolution",
      prices: { "1k": 90, "2k": 120 },
      suitableFor: "ویرایش حرفه‌ای تصاویر با خروجی دقیق‌تر"
    },
    {
      id: "wan_2_7_edit",
      name: "Wan 2.7",
      pricing_strategy: "fixed",
      price: 45,
      suitableFor: "ویرایش سریع و سبک تصاویر"
    },
    {
      id: "wan_2_7_pro_edit",
      name: "Wan 2.7 Pro",
      pricing_strategy: "fixed",
      price: 113,
      suitableFor: "ویرایش حرفه‌ای‌تر با حفظ جزئیات تصویر"
    },
    {
      id: "wan_2_6_edit",
      name: "Wan 2.6",
      pricing_strategy: "fixed",
      price: 45,
      suitableFor: "اعمال تغییرات عمومی و سبک‌های هنری"
    },
    {
      id: "qwen_image_max_edit",
      name: "Qwen Image Max",
      pricing_strategy: "fixed",
      price: 112,
      suitableFor: "ویرایش دقیق تصاویر پیچیده با درک بهتر ترکیب‌بندی"
    },
    {
      id: "z_image_turbo_edit",
      name: "Z Image Turbo",
      pricing_strategy: "option_matrix",
      options: [
        { dimensions: { aspect: "16x9 / 9x16", size: "1K" }, priceLum: 7 },
        { dimensions: { aspect: "16x9 / 9x16", size: "2K" }, priceLum: 21 },
        { dimensions: { aspect: "4x3 / 3x4", size: "1K" }, priceLum: 7 },
        { dimensions: { aspect: "4x3 / 3x4", size: "2K" }, priceLum: 21 },
        { dimensions: { aspect: "1x1", size: "1K" }, priceLum: 7 },
        { dimensions: { aspect: "1x1", size: "2K" }, priceLum: 28 }
      ],
      badge: "سریع‌ترین",
      suitableFor: "ویرایش فوق‌سریع و اقتصادی در نسبت‌های مختلف"
    },
    {
      id: "nano_banana_edit",
      name: "Nano Banana",
      pricing_strategy: "fixed",
      price: 60,
      suitableFor: "ویرایش‌های سریع، ساده و عمومی تصویر"
    },
    {
      id: "gpt_image_1_mini_edit",
      name: "GPT-IMAGE-1 Mini",
      pricing_strategy: "quality",
      prices: { "low": 30, "medium": 40, "high": 50 },
      suitableFor: "ویرایش سبک و اقتصادی با سه سطح کیفیت"
    },
    {
      id: "gpt_image_1_5_edit",
      name: "GPT-IMAGE-1.5",
      pricing_strategy: "option_matrix",
      options: [
        { dimensions: { aspect: "16x9 / 9x16", quality: "low" }, priceLum: 20 },
        { dimensions: { aspect: "16x9 / 9x16", quality: "medium" }, priceLum: 75 },
        { dimensions: { aspect: "16x9 / 9x16", quality: "high" }, priceLum: 300 },
        { dimensions: { aspect: "4x3 / 3x4", quality: "low" }, priceLum: 20 },
        { dimensions: { aspect: "4x3 / 3x4", quality: "medium" }, priceLum: 75 },
        { dimensions: { aspect: "4x3 / 3x4", quality: "high" }, priceLum: 300 },
        { dimensions: { aspect: "1x1", quality: "low" }, priceLum: 14 },
        { dimensions: { aspect: "1x1", quality: "medium" }, priceLum: 51 },
        { dimensions: { aspect: "1x1", quality: "high" }, priceLum: 200 }
      ],
      suitableFor: "ویرایش معنایی با کنترل نسبت تصویر و کیفیت خروجی"
    },
    {
      id: "emu_3_5_image",
      name: "EMU 3.5 Image",
      pricing_strategy: "resolution",
      prices: { "480p": 225, "720p": 450 },
      suitableFor: "ویرایش تصویر با انتخاب سطح کیفیت خروجی"
    },
    {
      id: "reve_fast",
      name: "Reve Fast",
      pricing_strategy: "fixed",
      price: 15,
      badge: "اقتصادی",
      suitableFor: "اعمال سریع تغییرات و افکت‌های تصویری"
    },
    {
      id: "reve",
      name: "Reve",
      pricing_strategy: "fixed",
      price: 60,
      suitableFor: "تغییر سبک و ویرایش خلاقانه تصاویر"
    }
  ] as ModelPricing[],
  upscaling: [
    {
      id: "clarity_ai_crystal_upscaler",
      name: "Clarity AI Crystal",
      pricing_strategy: "upscale_factor",
      input_reference: "1024x1024",
      prices: {
        "2x": 96,
        "4x": 408,
        "6x": 912,
        "8x": 1608,
        "10x": 2520
      },
      badge: "کیفیت کریستالی",
      suitableFor: "بازیابی جزئیات چهره، پرتره‌های قدیمی و تصاویر آسیب‌دیده"
    },
    {
      id: "clarity_upscaler",
      name: "Clarity Upscaler",
      pricing_strategy: "upscale_factor",
      input_reference: "1024x1024",
      prices: {
        "2x": 96,
        "4x": 408
      },
      suitableFor: "افزایش وضوح عمومی تصاویر تار و کم‌کیفیت"
    },
    {
      id: "topaz_labs_upscaler",
      name: "Topaz Labs",
      pricing_strategy: "upscale_factor",
      input_reference: "1024x1024",
      prices: {
        "2x": 120,
        "4x": 120
      },
      badge: "استاندارد صنعتی",
      suitableFor: "آماده‌سازی تصاویر حرفه‌ای برای چاپ و استفاده تجاری"
    },
    {
      id: "ideogram_upscaler",
      name: "Ideogram Upscaler",
      pricing_strategy: "fixed",
      price: 80,
      suitableFor: "بهبود وضوح نوشته‌ها، پوسترها و طرح‌های گرافیکی"
    },
    {
      id: "recraft_crisp_upscaler",
      name: "Recraft Crisp",
      pricing_strategy: "fixed",
      price: 6,
      badge: "اقتصادی‌ترین",
      suitableFor: "افزایش وضوح لبه‌ها در وکتور، آیکون و گرافیک تخت"
    },
    {
      id: "seedvr2_upscaler",
      name: "SeedVR2 Upscaler",
      pricing_strategy: "upscale_factor",
      input_reference: "1024x1024",
      prices: {
        "2x": 8,
        "4x": 34,
        "6x": 76,
        "8x": 134,
        "10x": 210
      },
      suitableFor: "بزرگ‌نمایی اقتصادی تصاویر در چند ضریب مختلف"
    },
    {
      id: "nano_banana_pro_upscale",
      name: "Nano Banana Pro",
      pricing_strategy: "target_resolution",
      prices: {
        "1K": 225,
        "2K": 225,
        "4K": 450
      },
      suitableFor: "بازسازی و افزایش رزولوشن تصویر با انتخاب اندازه خروجی"
    }
  ] as ModelPricing[],
  bgRemoval: [
    { id: "imageutils_rembg", name: "IMAGEUTILS REMBG", pricing_strategy: "fixed", price: 2, badge: "سریع", suitableFor: "پردازش انبوه تصاویر فروشگاهی" },
    { id: "birefnet_v2", name: "BIREFNET V2", pricing_strategy: "fixed", price: 2, badge: "دقیق", suitableFor: "جداسازی سوژه‌های پیچیده (مو، تور، شیشه)" }
  ] as ModelPricing[],
  videoGen: [
    { id: "sora2", name: "SORA 2", pricing_strategy: "duration_based", prices: { "4s": 600 }, suitableFor: "نسل جدید تولید ویدیو با درک فیزیک" },
    { id: "sora2_pro", name: "SORA 2 PRO", pricing_strategy: "duration_quality_based", prices: { "4s": { "720p": 1800, "1080p": 3000 } }, badge: "پرچمدار", suitableFor: "تولید فیلم‌های سینمایی و تبلیغات حرفه‌ای" },
    { id: "wan_2_7_video", name: "WAN 2.7", pricing_strategy: "fixed", price: 150, badge: "جدید", suitableFor: "نسل جدید ساخت ویدیو با حرکات روان و باکیفیت" },
    { id: "wan_2_7_pro_video", name: "WAN 2.7 PRO", pricing_strategy: "fixed", price: 375, badge: "حرفه‌ای", suitableFor: "تولید ویدیوی بسیار باکیفیت با پایداری عالی" },
    { id: "wan_2_6_video", name: "WAN 2.6", pricing_strategy: "fixed", price: 150, suitableFor: "ساخت سریع ویدیو با جزئیات بالا" },
    { id: "wan_2_5_video", name: "WAN 2.5", pricing_strategy: "duration_quality_based", prices: { "5s": { "480p": 375, "720p": 750, "1080p": 1125 } }, suitableFor: "ویدیوهای هنری و انتزاعی با کیفیت بالا" },
    { id: "wan_2_2_turbo", name: "WAN 2.2 TURBO", pricing_strategy: "duration_quality_based", prices: { "5s": { "480p": 75, "580p": 112, "720p": 150 } }, suitableFor: "ویدیوهای سبک و سریع" },
    { id: "grok_imagine_video", name: "GROK IMAGINE VIDEO", pricing_strategy: "fixed", price: 120, badge: "جدید", suitableFor: "تولید خلاقانه و سریع ویدیوهای کوتاه" },
    { id: "grok_imagine_pro_video", name: "GROK IMAGINE PRO VIDEO", pricing_strategy: "duration_quality_based", prices: { "5s": { "720p": 300, "1080p": 450 } }, badge: "با کیفیت", suitableFor: "ساخت ویدیوهای حرفه‌ای با جزئیات بالاتری از فریم" },
    { id: "seedance_2", name: "SEEDANCE 2", pricing_strategy: "duration_based", prices: { "5s": 300, "10s": 600 }, badge: "محبوب", suitableFor: "پویانمایی کاراکتر و رقص با هماهنگی عالی" },
    { id: "seedance_2_fast", name: "SEEDANCE 2 FAST", pricing_strategy: "duration_based", prices: { "5s": 150, "10s": 300 }, badge: "سریع", suitableFor: "تولید سریع انیمیشن و رقص کاراکتر" },
    { id: "seedance_v1_pro_fast", name: "SEEDANCE V1 PRO FAST", pricing_strategy: "duration_quality_based", prices: { "4s": { "480p": 45, "720p": 90, "1080p": 150 } }, suitableFor: "رقص و حرکات موزون کاراکتر" },
    { id: "kling_2_6_pro", name: "KLING 2.6 PRO", pricing_strategy: "duration_based", prices: { "5s": 525, "10s": 1050 }, suitableFor: "موشن گرافیک و ویدیوهای واقع‌گرایانه" },
    { id: "kling_2_5_turbo_pro", name: "KLING 2.5 TURBO PRO", pricing_strategy: "duration_based", prices: { "5s": 525 }, suitableFor: "کلیپ‌های سریع برای سوشال مدیا" },
    { id: "ltx_2_fast", name: "LTX 2 FAST", pricing_strategy: "duration_quality_based", prices: { "6s": { "1080p": 360, "1440p": 720, "2160p": 1440 } }, suitableFor: "محتوای وایرال و ترند با رزولوشن بالا" },
    { id: "veo_3_fast", name: "VEO 3 FAST", pricing_strategy: "duration_quality_based", prices: { "4s": { "720p": 600, "1080p": 900 }, "8s": { "720p": 1200, "1080p": 1800 } }, suitableFor: "تبلیغات کوتاه و موشن" },
    { id: "veo_3_1_fast", name: "VEO 3.1 FAST", pricing_strategy: "duration_quality_based", prices: { "4s": { "720p": 600, "1080p": 900 }, "8s": { "720p": 1200, "1080p": 1800 } }, suitableFor: "استوری‌موشن و ویدیوهای پایدار" },
    { id: "hailuo_2_3", name: "HAILUO 2.3", pricing_strategy: "duration_based", prices: { "6s": 420 }, suitableFor: "ویدیوهای هنری خاص" }
  ] as ModelPricing[],
  chat: [
    // OpenAI
    { id: "gpt_5_5", name: "GPT-5.5", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 7500, output: 45000 }, suitableFor: "" },
    { id: "gpt_5_4_mini", name: "GPT-5.4 Mini", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 1125, output: 6750 }, suitableFor: "" },
    { id: "gpt_5_4_nano", name: "GPT-5.4 Nano", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 300, output: 1875 }, suitableFor: "" },
    { id: "gpt_5_2", name: "GPT-5.2", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 2625, output: 21000 }, suitableFor: "" },
    { id: "gpt_5", name: "GPT-5", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 1875, output: 15000 }, suitableFor: "" },
    { id: "gpt_5_mini", name: "GPT-5 Mini", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 375, output: 3000 }, suitableFor: "" },
    { id: "gpt_5_nano", name: "GPT-5 Nano", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 75, output: 600 }, suitableFor: "" },
    { id: "gpt_4o", name: "GPT-4o", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 7500, output: 15000 }, suitableFor: "" },
    { id: "gpt_4o_mini", name: "GPT-4o Mini", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 225, output: 900 }, suitableFor: "" },
    { id: "o4_mini", name: "o4 Mini", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 1650, output: 6600 }, suitableFor: "" },
    { id: "o3", name: "o3", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 3000, output: 12000 }, suitableFor: "" },
    { id: "o3_mini", name: "o3 Mini", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 1650, output: 6600 }, suitableFor: "" },
    { id: "gpt_4_1", name: "GPT-4.1", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 3000, output: 12000 }, suitableFor: "" },
    { id: "gpt_4_1_mini", name: "GPT-4.1 Mini", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 600, output: 2400 }, suitableFor: "" },
    { id: "gpt_4_1_nano", name: "GPT-4.1 Nano", provider: "OpenAI", pricing_strategy: "token_based", prices: { input: 150, output: 600 }, suitableFor: "" },

    // Google
    { id: "gemini_3_1_pro", name: "Gemini 3.1 Pro", provider: "Google", pricing_strategy: "token_based", prices: { input: 3000, output: 18000 }, suitableFor: "" },
    { id: "gemini_3_5_flash", name: "Gemini 3.5 Flash", provider: "Google", pricing_strategy: "token_based", prices: { input: 2250, output: 13500 }, suitableFor: "" },
    { id: "gemini_3_1_flash_lite", name: "Gemini 3.1 Flash Lite", provider: "Google", pricing_strategy: "token_based", prices: { input: 375, output: 2250 }, suitableFor: "" },
    { id: "gemini_2_5_pro", name: "Gemini 2.5 Pro", provider: "Google", pricing_strategy: "token_based", prices: { input: 1875, output: 15000 }, suitableFor: "" },
    { id: "gemini_2_5_flash", name: "Gemini 2.5 Flash", provider: "Google", pricing_strategy: "token_based", prices: { input: 450, output: 3750 }, suitableFor: "" },
    { id: "gemini_2_5_flash_lite", name: "Gemini 2.5 Flash Lite", provider: "Google", pricing_strategy: "token_based", prices: { input: 150, output: 600 }, suitableFor: "" },

    // xAI
    { id: "grok_4_3", name: "Grok 4.3", provider: "xAI", pricing_strategy: "token_based", prices: { input: 1875, output: 3750 }, suitableFor: "" },
    { id: "grok_4_1_fast_reasoning", name: "Grok 4.1 Fast Reasoning", provider: "xAI", pricing_strategy: "token_based", prices: { input: 300, output: 750 }, suitableFor: "" },
    { id: "grok_4_fast_reasoning", name: "Grok 4 Fast Reasoning", provider: "xAI", pricing_strategy: "token_based", prices: { input: 300, output: 750 }, suitableFor: "" },
    { id: "grok_4_fast_non_reasoning", name: "Grok 4 Fast Non-Reasoning", provider: "xAI", pricing_strategy: "token_based", prices: { input: 300, output: 750 }, suitableFor: "" },

    // Anthropic
    { id: "claude_opus_4_8", name: "Claude Opus 4.8", provider: "Anthropic", pricing_strategy: "token_based", prices: { input: 7500, output: 37500 }, suitableFor: "" },
    { id: "claude_sonnet_4_6", name: "Claude Sonnet 4.6", provider: "Anthropic", pricing_strategy: "token_based", prices: { input: 4500, output: 22500 }, suitableFor: "" },
    { id: "claude_sonnet_4_5", name: "Claude Sonnet 4.5", provider: "Anthropic", pricing_strategy: "token_based", prices: { input: 4500, output: 22500 }, suitableFor: "" },
    { id: "claude_haiku_4_5", name: "Claude Haiku 4.5", provider: "Anthropic", pricing_strategy: "token_based", prices: { input: 1500, output: 7500 }, suitableFor: "" },
    { id: "claude_sonnet_4", name: "Claude Sonnet 4", provider: "Anthropic", pricing_strategy: "token_based", prices: { input: 4500, output: 22500 }, suitableFor: "" },
    { id: "claude_3_7_sonnet", name: "Claude 3.7 Sonnet", provider: "Anthropic", pricing_strategy: "token_based", prices: { input: 4500, output: 22500 }, suitableFor: "" },

    // Minimax
    { id: "minimax_m2_7", name: "Minimax M2.7", provider: "Minimax", pricing_strategy: "token_based", prices: { input: 450, output: 1800 }, suitableFor: "" },
    { id: "minimax_m2_1_lightning", name: "Minimax M2.1 Lightning", provider: "Minimax", pricing_strategy: "token_based", prices: { input: 450, output: 3600 }, suitableFor: "" },

    // DeepSeek
    { id: "deepseek_v4_pro", name: "DeepSeek V4 Pro", provider: "DeepSeek", pricing_strategy: "token_based", prices: { input: 2610, output: 5220 }, suitableFor: "" },
    { id: "deepseek_v4_flash", name: "DeepSeek V4 Flash", provider: "DeepSeek", pricing_strategy: "token_based", prices: { input: 210, output: 420 }, suitableFor: "" },
    { id: "deepseek_v3_2_exp", name: "DeepSeek V3.2 Exp", provider: "DeepSeek", pricing_strategy: "token_based", prices: { input: 405, output: 615 }, suitableFor: "" },
    { id: "deepseek_v3_1", name: "DeepSeek V3.1", provider: "DeepSeek", pricing_strategy: "token_based", prices: { input: 450, output: 1500 }, suitableFor: "" },

    // Alibaba
    { id: "qwen_3_7_max", name: "Qwen 3.7 Max", provider: "Alibaba", pricing_strategy: "token_based", prices: { input: 3750, output: 11250 }, suitableFor: "" },
    { id: "qwen3_max", name: "Qwen3 Max", provider: "Alibaba", pricing_strategy: "token_based", prices: { input: 1800, output: 9000 }, suitableFor: "" },
    { id: "qwen3_vl_thinking", name: "Qwen3 VL Thinking", provider: "Alibaba", pricing_strategy: "token_based", prices: { input: 1050, output: 12600 }, suitableFor: "" },

    // Mistral
    { id: "mistral_3b", name: "Mistral 3B", provider: "Mistral", pricing_strategy: "token_based", prices: { input: 60, output: 60 }, suitableFor: "" },
    { id: "devstral_2", name: "Devstral 2", provider: "Mistral", pricing_strategy: "token_based", prices: { input: 75, output: 75 }, suitableFor: "" },
    { id: "mistral_large", name: "Mistral Large", provider: "Mistral", pricing_strategy: "token_based", prices: { input: 3000, output: 9000 }, suitableFor: "" },

    // Zai
    { id: "glm_5", name: "GLM 5", provider: "Zai", pricing_strategy: "token_based", prices: { input: 1500, output: 4800 }, suitableFor: "" },
    { id: "glm_5v_turbo", name: "GLM 5V Turbo", provider: "Zai", pricing_strategy: "token_based", prices: { input: 1800, output: 6000 }, suitableFor: "" },
    { id: "glm_5_turbo", name: "GLM 5 Turbo", provider: "Zai", pricing_strategy: "token_based", prices: { input: 1800, output: 6000 }, suitableFor: "" },
    { id: "glm_4_6", name: "GLM 4.6", provider: "Zai", pricing_strategy: "token_based", prices: { input: 675, output: 2700 }, suitableFor: "" },
    { id: "glm_4_5", name: "GLM 4.5", provider: "Zai", pricing_strategy: "token_based", prices: { input: 900, output: 3300 }, suitableFor: "" },
    { id: "glm_4_5_air", name: "GLM 4.5 Air", provider: "Zai", pricing_strategy: "token_based", prices: { input: 300, output: 1650 }, suitableFor: "" },

    // Moonshot AI
    { id: "kimi_k2_6", name: "Kimi K2.6", provider: "Moonshot AI", pricing_strategy: "token_based", prices: { input: 1425, output: 6000 }, suitableFor: "" },
    { id: "kimi_k2", name: "Kimi K2", provider: "Moonshot AI", pricing_strategy: "token_based", prices: { input: 750, output: 3000 }, suitableFor: "" },

    // Meta
    { id: "llama_4_maverick", name: "Llama 4 Maverick", provider: "Meta", pricing_strategy: "token_based", prices: { input: 225, output: 900 }, suitableFor: "" },
    { id: "llama_4_scout", name: "Llama 4 Scout", provider: "Meta", pricing_strategy: "token_based", prices: { input: 120, output: 450 }, suitableFor: "" },
  ] as ModelPricing[],
  smartAssistant: [
    { id: "gpt_5_assistant", name: "GPT-5", pricePerMessage: 9, provider: "OpenAI" },
    { id: "gpt_5_mini_assistant", name: "GPT-5 Mini", pricePerMessage: 3, provider: "OpenAI" },
    { id: "gpt_5_nano_assistant", name: "GPT-5 Nano", pricePerMessage: 1, provider: "OpenAI" },
    { id: "gpt_4o_assistant", name: "GPT-4o", pricePerMessage: 10, provider: "OpenAI" },
    { id: "gpt_4o_mini_assistant", name: "GPT-4o Mini", pricePerMessage: 3, provider: "OpenAI" },
    { id: "o3_mini_assistant", name: "o3 Mini", pricePerMessage: 4, provider: "OpenAI" },
    { id: "gpt_4_1_assistant", name: "GPT-4.1", pricePerMessage: 7, provider: "OpenAI" },
    { id: "gpt_4_1_mini_assistant", name: "GPT-4.1 Mini", pricePerMessage: 3, provider: "OpenAI" },
    { id: "gpt_4_1_nano_assistant", name: "GPT-4.1 Nano", pricePerMessage: 2, provider: "OpenAI" },
  ] as AssistantModelPricing[]
};

export const PRICING_METADATA = {
  isoDate: "2026-08-04",
  displayDateFa: "۱۳ مرداد ۱۴۰۵"
} as const;

export const formatPersianNumber = (value: number | string): string => {
  const num = Number(value);
  if (isNaN(num)) return String(value);
  return new Intl.NumberFormat('fa-IR').format(num);
};

export const TOTAL_MODEL_COUNT = 
  PRICING_DATA.textToImage.length +
  PRICING_DATA.imageEditing.length +
  PRICING_DATA.videoGen.length +
  PRICING_DATA.upscaling.length +
  PRICING_DATA.bgRemoval.length +
  PRICING_DATA.chat.length +
  PRICING_DATA.smartAssistant.length;

