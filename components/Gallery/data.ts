
export interface GalleryItemData {
  id: string;
  title: string;
  serviceType: string; // 'تولید تصویر', 'ویرایش تصویر', etc. OR mapped from API
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

const API_BASE_URL = 'https://luma-upload-center.pages.dev/api/public/assets';

export const fetchGalleryAssets = async (serviceType: string = 'all', page: number = 1): Promise<GalleryItemData[]> => {
  try {
    let assets: any[] = [];

    // Helper to safely extract array from various API response structures
    const extractArray = (data: any): any[] => {
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.assets)) return data.assets;
        if (data && Array.isArray(data.data)) return data.data;
        if (data && Array.isArray(data.items)) return data.items;
        return [];
    };

    if (serviceType === 'all') {
      // Fetch a mix for the "All" tab
      const types = ['image-gen', 'video-gen', 'edit-image', 'virtual-try-on', 'upscale'];
      const promises = types.map(type => 
        fetch(`${API_BASE_URL}?page=${page}&serviceType=${type}`)
          .then(res => res.ok ? res.json() : [])
          .then(data => extractArray(data))
          .catch(() => [])
      );
      
      const responses = await Promise.all(promises);
      // Flatten and shuffle slightly
      assets = responses.flat().sort(() => 0.5 - Math.random());
    } else {
      const url = `${API_BASE_URL}?page=${page}&serviceType=${serviceType}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      assets = extractArray(data);
    }

    if (!Array.isArray(assets)) {
        console.warn('Fetched data is not an array:', assets);
        return [];
    }

    // Map API response to stricter types and determine UI Type
    return assets.map((item: any) => {
      let uiType: 'image' | 'comparison' | 'vton' | 'video' = 'image';

      if (item.videoUrl) uiType = 'video';
      else if (item.thumbnailUrlBefore) uiType = 'comparison';
      else if (item.clothingImageUrl) uiType = 'vton';
      
      const safeServiceType = item.serviceType && typeof item.serviceType === 'string' ? item.serviceType : 'unknown';
      const safeTags = Array.isArray(item.tags) ? item.tags : [];

      return {
        ...item,
        uiType,
        serviceType: safeServiceType,
        tags: safeTags,
        // Ensure prompt is string
        prompt: item.prompt || 'بدون دستور متنی',
        // Fallback title
        title: item.title || safeServiceType || 'نمونه کار',
        // Format Date if needed (Assuming ISO string comes in)
        date: item.date ? new Date(item.date).toLocaleDateString('fa-IR') : ''
      };
    });

  } catch (error) {
    console.error("Failed to fetch gallery assets:", error);
    return [];
  }
};
