
export interface GalleryItemData {
  id: string;
  title: string;
  serviceType: string; // 'image-gen', 'video-gen', 'edit-image', 'virtual-try-on', 'remove-bg', 'upscale'
  thumbnailUrl: string;
  thumbnailUrlBefore?: string | null;
  videoUrl?: string | null;
  clothingImageUrl?: string | null;
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

const PB_BASE_URL = 'https://pb.lumai.ir';

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

const getFileUrl = (collection: string, recordId: string, filename: string): string => {
  if (!filename) return '';
  return `${PB_BASE_URL}/api/files/${collection}/${recordId}/${filename}`;
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

export const fetchGalleryAssets = async (serviceType: string = 'all', page: number = 1): Promise<GalleryItemData[]> => {
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

      // Fetch from each collection
      const promises = collections.map(col =>
        fetch(`${PB_BASE_URL}/api/collections/${col}/records?page=${page}&perPage=12&sort=-created`)
          .then(res => res.ok ? res.json() : { items: [] })
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
      const response = await fetch(`${PB_BASE_URL}/api/collections/${col}/records?page=${page}&perPage=16&sort=-created`);
      if (response.ok) {
        const data = await response.json();
        assets = (data.items || []).map((item: any) => ({ ...item, '@collection': col }));
      }
    }

    // Map each PocketBase record to standard GalleryItemData with strict typing
    return assets.map((item: any) => {
      const col = item['@collection'] || 'image_generation';
      const typeSlug = COLLECTION_TO_SERVICE_TYPE[col] || 'image-gen';

      let uiType: 'image' | 'comparison' | 'vton' | 'video' = 'image';
      let thumbnailUrl = '';
      let thumbnailUrlBefore: string | null = null;
      let videoUrl: string | null = null;
      let clothingImageUrl: string | null = null;

      // Map file paths precisely according to PB's conventions and field schemas of each category
      if (col === 'image_generation') {
        uiType = 'image';
        thumbnailUrl = getFileUrl(col, item.id, item.result);
      } else if (col === 'video_generation') {
        uiType = 'video';
        thumbnailUrl = item.poster ? getFileUrl(col, item.id, item.poster) : '';
        videoUrl = getFileUrl(col, item.id, item.video);
      } else if (col === 'image_editing') {
        uiType = 'comparison';
        thumbnailUrl = getFileUrl(col, item.id, item.result);
        thumbnailUrlBefore = getFileUrl(col, item.id, item.before);
      } else if (col === 'background_removal') {
        uiType = 'image';
        thumbnailUrl = getFileUrl(col, item.id, item.result);
      } else if (col === 'upscale') {
        uiType = 'comparison';
        thumbnailUrl = getFileUrl(col, item.id, item.result);
        thumbnailUrlBefore = getFileUrl(col, item.id, item.before);
      } else if (col === 'virtual_tryon') {
        uiType = 'vton';
        thumbnailUrl = getFileUrl(col, item.id, item.result);
        clothingImageUrl = getFileUrl(col, item.id, item.clothing);
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
        thumbnailUrlBefore,
        videoUrl,
        clothingImageUrl,
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
