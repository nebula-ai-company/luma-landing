export interface BlogPostItem {
  id: string;
  pageId?: string;
  linkId?: string;
  url?: string;
  name?: string;
  title: string;
  slug: string;
  shortDescription?: string;
  excerpt?: string;
  fullDescription?: string;
  content?: string;
  cover?: string | null;
  coverImage?: string | null;
  tags?: string[];
  writer?: string;
  author?: string;
  date?: string;
  publishedAt?: number;
  createdAt?: number;
  updatedAt?: number;
  status?: string;
  featured?: boolean;
  wordCount?: number;
  readingTime?: number;
}

export const toPersianNum = (num: number | string): string => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
};

export const formatPersianDate = (dateStr?: string | null, timestamp?: number | null): string => {
  try {
    const d = dateStr ? new Date(dateStr) : (timestamp ? new Date(timestamp) : null);
    if (d && !isNaN(d.getTime())) {
      const formatted = d.toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return toPersianNum(formatted);
    }
  } catch (_) {}
  return 'به‌تازگی';
};

export const resolveCoverImage = (post: {
  cover?: string | null;
  coverImage?: string | null;
  content?: string;
  fullDescription?: string;
}): string | null => {
  if (post.cover && typeof post.cover === 'string' && post.cover.startsWith('http')) {
    return post.cover;
  }
  if (post.coverImage && typeof post.coverImage === 'string' && post.coverImage.startsWith('http')) {
    return post.coverImage;
  }
  const raw = post.content || post.fullDescription || '';
  if (raw) {
    const firstLine = raw.trim().split('\n')[0].trim();
    if (firstLine.startsWith('http')) return firstLine;
    const match = firstLine.match(/\((https?:\/\/[^\s\)]+)\)/);
    if (match && match[1]) return match[1];
  }
  return null;
};

export const resolveExcerpt = (post: {
  shortDescription?: string;
  excerpt?: string;
  content?: string;
  fullDescription?: string;
}): string => {
  const raw = post.shortDescription || post.excerpt || '';
  if (raw && !raw.trim().startsWith('http')) {
    return raw.replace(/[#*`_]/g, '').trim();
  }
  const content = post.content || post.fullDescription || '';
  const cleanLines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length > 0 &&
        !line.startsWith('http') &&
        !line.startsWith('#') &&
        !line.startsWith('![') &&
        !line.startsWith('[') &&
        !line.startsWith('>')
    );
  const derived = cleanLines.join(' ').replace(/[#*`_\[\]]/g, '').trim();
  if (derived.length > 140) {
    return derived.substring(0, 140) + '...';
  }
  return derived || 'مطالعه مقاله کامل در وبلاگ تخصصی لوما...';
};

export const cleanMarkdownBody = (rawContent: string): string => {
  if (!rawContent) return '';
  const lines = rawContent.split('\n');
  if (lines.length > 0) {
    const first = lines[0].trim();
    if (
      first.startsWith('http') ||
      (first.startsWith('[') && first.includes('http')) ||
      (first.startsWith('![') && first.includes('http'))
    ) {
      return lines.slice(1).join('\n').trim();
    }
  }
  return rawContent;
};

export const calculateReadTime = (text: string): number => {
  const wordsPerMinute = 180;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

export const isFarsiText = (text: string, language?: string): boolean => {
  if (!text) return false;

  // Match Persian and Arabic unicode characters (letters, presentation forms)
  const farsiMatches = text.match(/[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/g);
  if (!farsiMatches || farsiMatches.length === 0) return false;

  const farsiCount = farsiMatches.length;
  const langLower = (language || '').toLowerCase().trim();

  // If language is generic (text, txt, prompt, none, markdown, md, plain)
  const isGeneric = !langLower || ['text', 'txt', 'prompt', 'markdown', 'md', 'none', 'plain'].includes(langLower);
  if (isGeneric) {
    return true;
  }

  // If a programming language was explicitly given (e.g. bash, js),
  // check if Farsi characters represent the core body of text
  const latinMatches = text.match(/[a-zA-Z]/g);
  const latinCount = latinMatches ? latinMatches.length : 0;

  return farsiCount >= latinCount || farsiCount > 20;
};

export const getMediaType = (url: string): 'image' | 'video' | 'audio' | null => {
  if (!url) return null;
  const cleanUrl = url.toLowerCase();
  if (
    /\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff|ico)([\?#].*)?$/.test(cleanUrl) ||
    cleanUrl.includes('/_next/image') ||
    cleanUrl.includes('/next/image')
  ) {
    return 'image';
  }
  if (/\.(mp4|webm|mov|mkv|avi|wmv)([\?#].*)?$/.test(cleanUrl)) {
    return 'video';
  }
  if (/\.(mp3|wav|ogg|m4a|aac)([\?#].*)?$/.test(cleanUrl)) {
    return 'audio';
  }
  return null;
};
