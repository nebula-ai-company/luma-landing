
import { fetchCachedJson, getFileUrl, HOMEPAGE_THUMB_LARGE, PB_BASE_URL } from '../../lib/pbCache';

export interface GalleryItemData {
  id: string;
  title: string;
  serviceType: string; // 'image-gen', 'video-gen', 'edit-image', 'virtual-try-on', 'remove-bg', 'upscale'
  thumbnailUrl: string; // Thumbnailed preview URL
  originalUrl: string; // Original full resolution URL
  thumbnailUrlBefore?: string | null;
  originalUrlBefore?: string | null;
  videoUrl?: string | null;
  clothingImageUrl?: string | null;
  clothingOriginalUrl?: string | null;
  modelUsed: string;
  status: string;
  visibility?: string;
  prompt?: string;
  date: string;
  dimensions?: string;
  fileSize?: number;
  aspectRatio?: string;
  duration?: string;
  upscaleFactor?: string;
  tags?: string[];
  
  // Derived helper properties for UI logic
  uiType?: 'image' | 'comparison' | 'vton' | 'video'; 
}

const SERVICE_TYPE_TO_COLLECTION: Record<string, string> = {
  'image-gen': 'image_generation',
  'video-gen': 'video_generation',
  'edit-image': 'image_editing',
  'remove-bg': 'background_removal',
  'upscale': 'upscale',
  'virtual-try-on': 'virtual_tryon',
};

const COLLECTION_TO_SERVICE_TYPE: Record<string, string> = {
  'image_generation': 'image-gen',
  'video_generation': 'video-gen',
  'image_editing': 'edit-image',
  'background_removal': 'remove-bg',
  'upscale': 'upscale',
  'virtual_tryon': 'virtual-try-on'
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
};

export const fetchGalleryAssets = async (
  serviceType: string = 'all', 
  page: number = 1, 
  perPage?: number
): Promise<GalleryItemData[]> => {
  try {
    let assets: any[] = [];

    if (serviceType === 'all') {
      const collections = [
        'image_generation',
        'video_generation',
        'image_editing',
        'background_removal',
        'upscale',
        'virtual_tryon',
      ];

      const limit = perPage || 12;

      // Fetch from each collection
      const promises = collections.map(col =>
        fetchCachedJson(`${PB_BASE_URL}/api/collections/${col}/records?page=${page}&perPage=${limit}&sort=-created`)
          .then(data => (data.items || []).map((item: any) => ({ ...item, '@collection': col })))
          .catch(() => [])
      );

      const results = await Promise.all(promises);

      // Interleave results to maintain perfect rhythm of diverse services in the gallery grid
      const maxLength = Math.max(...results.map(arr => arr.length));
      for (let i = 0; i < maxLength; i++) {
        for (const res of results) {
          if (res[i]) {
            assets.push(res[i]);
          }
        }
      }
    } else {
      const col = SERVICE_TYPE_TO_COLLECTION[serviceType] || serviceType;
      const limit = perPage || 16;
      try {
        const data = await fetchCachedJson(`${PB_BASE_URL}/api/collections/${col}/records?page=${page}&perPage=${limit}&sort=-created`);
        assets = (data.items || []).map((item: any) => ({ ...item, '@collection': col }));
      } catch {
        assets = [];
      }
    }

    // Map each PocketBase record to standard GalleryItemData with strict typing
    return assets.map((item: any) => {
      const col = item['@collection'] || 'image_generation';
      const typeSlug = COLLECTION_TO_SERVICE_TYPE[col] || 'image-gen';

      let uiType: 'image' | 'comparison' | 'vton' | 'video' = 'image';
      let thumbnailUrl = '';
      let originalUrl = '';
      let thumbnailUrlBefore: string | null = null;
      let originalUrlBefore: string | null = null;
      let videoUrl: string | null = null;
      let clothingImageUrl: string | null = null;
      let clothingOriginalUrl: string | null = null;

      // Map file paths precisely according to PB's conventions and field schemas of each category
      if (col === 'image_generation') {
        uiType = 'image';
        thumbnailUrl = getFileUrl(col, item.id, item.result, HOMEPAGE_THUMB_LARGE);
        originalUrl = getFileUrl(col, item.id, item.result);
      } else if (col === 'video_generation') {
        uiType = 'video';
        thumbnailUrl = item.poster ? getFileUrl(col, item.id, item.poster, HOMEPAGE_THUMB_LARGE) : '';
        originalUrl = item.poster ? getFileUrl(col, item.id, item.poster) : '';
        videoUrl = getFileUrl(col, item.id, item.video);
      } else if (col === 'image_editing') {
        uiType = 'comparison';
        thumbnailUrl = getFileUrl(col, item.id, item.result, HOMEPAGE_THUMB_LARGE);
        originalUrl = getFileUrl(col, item.id, item.result);
        thumbnailUrlBefore = item.before ? getFileUrl(col, item.id, item.before, HOMEPAGE_THUMB_LARGE) : null;
        originalUrlBefore = item.before ? getFileUrl(col, item.id, item.before) : null;
      } else if (col === 'background_removal') {
        uiType = 'image';
        thumbnailUrl = getFileUrl(col, item.id, item.result, HOMEPAGE_THUMB_LARGE);
        originalUrl = getFileUrl(col, item.id, item.result);
      } else if (col === 'upscale') {
        uiType = 'comparison';
        thumbnailUrl = getFileUrl(col, item.id, item.result, HOMEPAGE_THUMB_LARGE);
        originalUrl = getFileUrl(col, item.id, item.result);
        thumbnailUrlBefore = item.before ? getFileUrl(col, item.id, item.before, HOMEPAGE_THUMB_LARGE) : null;
        originalUrlBefore = item.before ? getFileUrl(col, item.id, item.before) : null;
      } else if (col === 'virtual_tryon') {
        uiType = 'vton';
        thumbnailUrl = getFileUrl(col, item.id, item.result, HOMEPAGE_THUMB_LARGE);
        originalUrl = getFileUrl(col, item.id, item.result);
        clothingImageUrl = item.clothing ? getFileUrl(col, item.id, item.clothing, HOMEPAGE_THUMB_LARGE) : null;
        clothingOriginalUrl = item.clothing ? getFileUrl(col, item.id, item.clothing) : null;
      }

      // Default Persian prompt fallback depending on collection
      let defaultPrompt = 'بدون دستور متنی';
      if (col === 'background_removal') defaultPrompt = 'حذف پس‌زمینه تصویر با دقت بالا توسط هوش مصنوعی لوما';
      if (col === 'upscale') defaultPrompt = 'بهبود کیفیت، وضوح و جزئیات تصویر توسط هوش مصنوعی لوما';
      if (col === 'virtual_tryon') defaultPrompt = 'پرو و مدل‌سازی مجازی لباس و فشن با مدل هوش مصنوعی مدرن لوما';

      return {
        id: item.id,
        title: item.title || `${mapCollectionLabel(col)} ${item.id.slice(-4).toUpperCase()}`,
        serviceType: typeSlug,
        thumbnailUrl,
        originalUrl,
        thumbnailUrlBefore,
        originalUrlBefore,
        videoUrl,
        clothingImageUrl,
        clothingOriginalUrl,
        modelUsed: item.model_used || 'Luma Engine',
        status: item.status || 'تکمیل شده',
        prompt: item.prompt || defaultPrompt,
        date: formatDate(item.created),
        dimensions: item.dimensions || '1024x1024',
        aspectRatio: item.aspect_ratio,
        duration: item.duration,
        upscaleFactor: item.upscale_factor,
        tags: item.model_used ? [item.model_used] : [],
        uiType,
      };
    });

  } catch (error) {
    console.error("Failed to fetch gallery assets from PocketBase:", error);
    return [];
  }
};

const mapCollectionLabel = (col: string): string => {
  const map: Record<string, string> = {
    'image_generation': 'تصویرسازی',
    'video_generation': 'تولید ویدیو',
    'image_editing': 'ویرایش تصویر',
    'background_removal': 'حذف پس‌زمینه',
    'upscale': 'افزایش کیفیت',
    'virtual_tryon': 'پرو مجازی'
  };
  return map[col] || 'اثر هنری';
};
