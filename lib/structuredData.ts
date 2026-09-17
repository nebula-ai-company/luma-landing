import { useEffect, useRef } from 'react';
import { ROUTE_METADATA } from './seo.ts';
import type { BlogPostItem } from './blogUtils.ts';
import { resolveExcerpt, resolveCoverImage } from './blogUtils.ts';

export const LUMA_SERVICES = [
  { id: 'img-gen', title: 'ساخت تصویر', description: 'تبدیل متن به تصاویر هنری خیره‌کننده', path: '/service/img-gen' },
  { id: 'img-edit', title: 'ویرایش تصویر', description: 'ویرایش حرفه‌ای تصاویر با دستورات متنی', path: '/service/img-edit' },
  { id: 'bg-remove', title: 'حذف پس‌زمینه', description: 'حذف هوشمند و دقیق پس‌زمینه تصاویر', path: '/service/bg-remove' },
  { id: 'assistant', title: 'دستیار هوشمند', description: 'دستیار همه فن حریف برای کارهای روزمره', path: '/service/assistant' },
  { id: 'video', title: 'ساخت ویدیو', description: 'خلق ویدیوهای خلاقانه از متن', path: '/service/video' },
  { id: 'video-enhancement', title: 'افزایش کیفیت ویدئو', description: 'افزایش وضوح، بازسازی جزئیات و بهبود ویدئو با مدلهای تخصصی', path: '/service/video-enhancement' },
  { id: 'text-to-speech', title: 'تبدیل متن به گفتار', description: 'تبدیل متن فارسی و چندزبانه به صدای طبیعی و حرفه‌ای', path: '/service/text-to-speech' },
  { id: 'upscale', title: 'افزایش کیفیت تصویر', description: 'بهبود وضوح و جزئیات تصاویر قدیمی', path: '/service/upscale' },
  { id: 'try-on', title: 'پوشاندن لباس', description: 'پرو مجازی لباس بر روی مدل‌های دلخواه', path: '/service/try-on' },
  { id: 'chat', title: 'چت هوشمند', description: 'گفتگو با پیشرفته‌ترین مدل‌های زبانی', path: '/service/chat' },
  { id: 'workflow', title: 'ورک‌فلوها', description: 'بوم بصری ساخت فرآیندهای چندمرحله‌ای هوش مصنوعی', path: '/service/workflow' },
];

/**
 * Reusable Structured Data (JSON-LD) Foundation for Luma AI
 * Pure client-side implementation with deterministic single-owner synchronization,
 * route fallback support, dynamic page override precedence, and DOM script lifecycle management.
 */

export const SCHEMA_TAG_ATTR = 'data-luma-schema';
export const SCHEMA_TAG_VALUE = 'true';
export const PRODUCTION_ORIGIN = 'https://lumai.ir/';

export interface StructuredDataOverrideEntry {
  id: string;
  routePath: string;
  schema: Record<string, any>;
}

// 1. Truthful Luma Organization entity
export const LUMA_ORGANIZATION: Record<string, any> = {
  '@type': 'Organization',
  name: 'لوما',
  url: PRODUCTION_ORIGIN,
};

// 2. Truthful Luma WebSite entity
export const LUMA_WEBSITE: Record<string, any> = {
  '@type': 'WebSite',
  name: 'لوما',
  url: PRODUCTION_ORIGIN,
  description: ROUTE_METADATA['/']?.description || '',
};

// 3. Truthful Luma WebApplication entity
export const LUMA_WEB_APPLICATION: Record<string, any> = {
  '@type': 'WebApplication',
  name: 'لوما',
  url: PRODUCTION_ORIGIN,
  description: ROUTE_METADATA['/']?.description || '',
  applicationCategory: 'MultimediaApplication',
};

// 4. Homepage schema: Organization, WebSite, WebApplication in @graph
export const HOMEPAGE_STRUCTURED_DATA: Record<string, any> = {
  '@context': 'https://schema.org',
  '@graph': [
    LUMA_ORGANIZATION,
    LUMA_WEBSITE,
    LUMA_WEB_APPLICATION,
  ],
};

// 5. AboutPage schema
export const ABOUT_PAGE_STRUCTURED_DATA: Record<string, any> = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: ROUTE_METADATA['/about']?.title || 'لوما | درباره ما',
  description: ROUTE_METADATA['/about']?.description || '',
};

// 6. ContactPage schema
export const CONTACT_PAGE_STRUCTURED_DATA: Record<string, any> = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: ROUTE_METADATA['/contact']?.title || 'لوما | تماس با ما',
  description: ROUTE_METADATA['/contact']?.description || '',
};

// 7. Services CollectionPage schema with ItemList in exact visible order from constants
export const SERVICES_PAGE_STRUCTURED_DATA: Record<string, any> = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: ROUTE_METADATA['/services']?.title || 'لوما | خدمات و ابزارهای هوش مصنوعی',
  description: ROUTE_METADATA['/services']?.description || '',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: LUMA_SERVICES.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      description: service.description,
    })),
  },
};

// 8. Blog CollectionPage schema
export const BLOG_COLLECTION_STRUCTURED_DATA: Record<string, any> = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: ROUTE_METADATA['/blog']?.title || 'لوما | وبلاگ هوش مصنوعی',
  description: ROUTE_METADATA['/blog']?.description || '',
};

/**
 * Builds a CollectionPage schema for the blog with ItemList of actual loaded articles
 */
export function buildBlogCollectionStructuredData(
  items?: BlogPostItem[] | null
): Record<string, any> {
  const base: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: ROUTE_METADATA['/blog']?.title || 'لوما | وبلاگ هوش مصنوعی',
    description: ROUTE_METADATA['/blog']?.description || '',
  };

  if (items && Array.isArray(items) && items.length > 0) {
    base.mainEntity = {
      '@type': 'ItemList',
      itemListElement: items.slice(0, 20).map((item, index) => {
        const excerpt = resolveExcerpt(item);
        return {
          '@type': 'ListItem',
          position: index + 1,
          name: item.title,
          ...(excerpt ? { description: excerpt } : {}),
        };
      }),
    };
  }

  return base;
}

/**
 * Helper to build a truthful WebPage schema from approved route metadata
 */
function createWebPageSchema(route: string): Record<string, any> {
  const meta = ROUTE_METADATA[route];
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: meta?.title || 'لوما',
    description: meta?.description || '',
  };
}

/**
 * Registry of approved route-level structured data.
 * Routes not registered here return null (no schema emitted, stale schemas pruned).
 */
export const ROUTE_STRUCTURED_DATA: Record<string, Record<string, any>> = {
  '/': HOMEPAGE_STRUCTURED_DATA,
  '/about': ABOUT_PAGE_STRUCTURED_DATA,
  '/contact': CONTACT_PAGE_STRUCTURED_DATA,
  '/services': SERVICES_PAGE_STRUCTURED_DATA,
  '/blog': BLOG_COLLECTION_STRUCTURED_DATA,

  // Service pages (WebPage schemas only)
  '/service/img-gen': createWebPageSchema('/service/img-gen'),
  '/service/img-edit': createWebPageSchema('/service/img-edit'),
  '/service/bg-remove': createWebPageSchema('/service/bg-remove'),
  '/service/assistant': createWebPageSchema('/service/assistant'),
  '/service/upscale': createWebPageSchema('/service/upscale'),
  '/service/chat': createWebPageSchema('/service/chat'),
  '/service/video': createWebPageSchema('/service/video'),
  '/service/video-enhancement': createWebPageSchema('/service/video-enhancement'),
  '/service/text-to-speech': createWebPageSchema('/service/text-to-speech'),
  '/service/try-on': createWebPageSchema('/service/try-on'),
  '/service/workflow': createWebPageSchema('/service/workflow'),

  // Informational, legal, pricing, and resource pages (WebPage schemas only)
  '/pricing': createWebPageSchema('/pricing'),
  '/subscription': createWebPageSchema('/subscription'),
  '/docs': createWebPageSchema('/docs'),
  '/tutorials': createWebPageSchema('/tutorials'),
  '/privacy': createWebPageSchema('/privacy'),
  '/terms': createWebPageSchema('/terms'),
  '/solutions': createWebPageSchema('/solutions'),
  '/security': createWebPageSchema('/security'),
  '/gallery': createWebPageSchema('/gallery'),
};

export function getRouteStructuredData(pathname: string): Record<string, any> | null {
  return ROUTE_STRUCTURED_DATA[pathname] || null;
}

const PLACEHOLDER_AUTHORS = new Set([
  'تیم تحریریه لوما',
  'تیم لوما',
  'تحریریه لوما',
  'لوما',
  'luma team',
  'luma',
  'admin',
  'ادمین',
  'کاربر',
  'نویسنده',
  'anonymous',
  'unknown',
]);

/**
 * Builds dynamic BlogPosting schema only when an actual post is loaded.
 * Returns null if post is missing, loading, or unverified.
 */
export function buildBlogPostStructuredData(
  post: BlogPostItem | null | undefined
): Record<string, any> | null {
  if (!post || !post.title) {
    return null;
  }

  const trimmedTitle = post.title.trim();
  // Filter out any loading or temporary text
  if (
    !trimmedTitle ||
    trimmedTitle.includes('در حال بارگذاری') ||
    trimmedTitle.includes('در حال دریافت')
  ) {
    return null;
  }

  const excerpt = resolveExcerpt(post);

  // Valid source published date only when an actual date exists
  let datePublished: string | undefined;
  if (post.publishedAt && typeof post.publishedAt === 'number' && post.publishedAt > 0) {
    const d = new Date(post.publishedAt);
    if (!isNaN(d.getTime())) {
      datePublished = d.toISOString();
    }
  } else if (post.date && typeof post.date === 'string' && post.date.trim()) {
    const parsed = new Date(post.date.trim());
    if (!isNaN(parsed.getTime())) {
      datePublished = parsed.toISOString();
    }
  }

  // Valid modified date only when an actual modified date exists
  let dateModified: string | undefined;
  const anyPost = post as any;
  if (anyPost.updatedAt && typeof anyPost.updatedAt === 'number' && anyPost.updatedAt > 0) {
    const d = new Date(anyPost.updatedAt);
    if (!isNaN(d.getTime())) {
      dateModified = d.toISOString();
    }
  } else if (anyPost.modifiedDate && typeof anyPost.modifiedDate === 'string' && anyPost.modifiedDate.trim()) {
    const d = new Date(anyPost.modifiedDate.trim());
    if (!isNaN(d.getTime())) {
      dateModified = d.toISOString();
    }
  }

  // Cover image: only valid public HTTP(S) URL
  let image: string | undefined;
  const rawCover = resolveCoverImage(post);
  if (rawCover && typeof rawCover === 'string') {
    const trimmedCover = rawCover.trim();
    if (/^https?:\/\/[^\s]+$/.test(trimmedCover)) {
      image = trimmedCover;
    }
  }

  // Author: only when a real non-placeholder author is present
  const rawAuthor = (post.author || anyPost.writer || '').trim();
  let authorObj: Record<string, any> | undefined;
  if (rawAuthor && !PLACEHOLDER_AUTHORS.has(rawAuthor.toLowerCase())) {
    authorObj = {
      '@type': 'Person',
      name: rawAuthor,
    };
  }

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: trimmedTitle,
    description: excerpt || '',
    publisher: LUMA_ORGANIZATION,
  };

  if (datePublished) {
    schema.datePublished = datePublished;
  }
  if (dateModified) {
    schema.dateModified = dateModified;
  }
  if (image) {
    schema.image = image;
  }
  if (authorObj) {
    schema.author = authorObj;
  }

  return schema;
}

/**
 * Deterministic Structured Data Manager.
 * Single synchronization owner for <script type="application/ld+json" data-luma-schema="true">.
 */
export class StructuredDataManager {
  private currentRoute: string = '/';
  private overrides: StructuredDataOverrideEntry[] = [];
  private directSchema: Record<string, any> | null = null;

  constructor() {
    if (typeof window !== 'undefined' && window.location) {
      const hashPath = window.location.hash ? window.location.hash.replace(/^#/, '') : '';
      this.currentRoute = hashPath || window.location.pathname || '/';
    }
  }

  public getCurrentRoute(): string {
    return this.currentRoute;
  }

  public setRoute(pathname: string): void {
    this.currentRoute = pathname;
    this.sync();
  }

  public setDirectSchema(schema?: Record<string, any> | null): void {
    this.directSchema = schema && Object.keys(schema).length > 0 ? schema : null;
    this.sync();
  }

  public registerOverride(
    id: string,
    schema?: Record<string, any> | null,
    routePath?: string
  ): void {
    if (!schema || Object.keys(schema).length === 0) {
      this.unregisterOverride(id);
      return;
    }
    const route = routePath || this.currentRoute;
    const existingIndex = this.overrides.findIndex((o) => o.id === id);
    if (existingIndex >= 0) {
      this.overrides[existingIndex] = { id, routePath: route, schema };
    } else {
      this.overrides.push({ id, routePath: route, schema });
    }
    this.sync();
  }

  public updateOverride(id: string, schema?: Record<string, any> | null): void {
    if (!schema || Object.keys(schema).length === 0) {
      this.unregisterOverride(id);
      return;
    }
    const existing = this.overrides.find((o) => o.id === id);
    if (existing) {
      existing.schema = schema;
      this.sync();
    }
  }

  public unregisterOverride(id: string): void {
    const idx = this.overrides.findIndex((o) => o.id === id);
    if (idx >= 0) {
      this.overrides.splice(idx, 1);
      this.sync();
    }
  }

  public getEffectiveStructuredData(): Record<string, any> | null {
    const matchingOverrides = this.overrides.filter(
      (o) => !o.routePath || o.routePath === this.currentRoute
    );
    const activeOverride =
      matchingOverrides.length > 0
        ? matchingOverrides[matchingOverrides.length - 1].schema
        : null;

    if (activeOverride) {
      return activeOverride;
    }

    if (this.directSchema) {
      return this.directSchema;
    }

    return ROUTE_STRUCTURED_DATA[this.currentRoute] || null;
  }

  public sync(): void {
    if (typeof document === 'undefined') {
      return;
    }
    const effectiveSchema = this.getEffectiveStructuredData();
    this.commitDOM(effectiveSchema);
  }

  /**
   * Applies structured data to document.head safely and deterministically.
   * Modifies ONLY scripts bearing data-luma-schema="true".
   */
  public commitDOM(schema: Record<string, any> | null): void {
    if (typeof document === 'undefined' || !document.head) {
      return;
    }

    const managedSelector = `script[${SCHEMA_TAG_ATTR}="${SCHEMA_TAG_VALUE}"]`;
    const existingManaged = Array.from(document.head.querySelectorAll(managedSelector));

    if (!schema || Object.keys(schema).length === 0) {
      // Remove any stale generated scripts
      for (const el of existingManaged) {
        el.remove();
      }
      return;
    }

    const serialized = JSON.stringify(schema, null, 2);

    if (existingManaged.length > 0) {
      const primary = existingManaged[0];
      if (primary.getAttribute('type') !== 'application/ld+json') {
        primary.setAttribute('type', 'application/ld+json');
      }
      if (primary.textContent !== serialized) {
        primary.textContent = serialized;
      }
      // Prune any duplicate managed scripts
      for (let i = 1; i < existingManaged.length; i++) {
        existingManaged[i].remove();
      }
    } else {
      const newScript = document.createElement('script');
      newScript.setAttribute('type', 'application/ld+json');
      newScript.setAttribute(SCHEMA_TAG_ATTR, SCHEMA_TAG_VALUE);
      newScript.textContent = serialized;
      document.head.appendChild(newScript);
    }
  }

  public reset(): void {
    if (typeof document !== 'undefined' && document.head) {
      const managedSelector = `script[${SCHEMA_TAG_ATTR}="${SCHEMA_TAG_VALUE}"]`;
      const allManaged = Array.from(document.head.querySelectorAll(managedSelector));
      allManaged.forEach((el) => el.remove());
    }
    this.overrides = [];
    this.directSchema = null;
    this.currentRoute = '/';
  }
}

export const structuredDataManager = new StructuredDataManager();

let structuredOverrideCounter = 0;

/**
 * Reusable hook to register page-level structured data overrides.
 * Cleans up automatically on unmount or when schema becomes null.
 */
export function usePageStructuredData(
  schema?: Record<string, any> | null,
  routePath?: string
): void {
  const idRef = useRef<string>('');
  if (!idRef.current) {
    idRef.current = `schema-override-${++structuredOverrideCounter}`;
  }

  useEffect(() => {
    if (!schema || Object.keys(schema).length === 0) {
      structuredDataManager.unregisterOverride(idRef.current);
    } else {
      structuredDataManager.registerOverride(idRef.current, schema, routePath);
    }
  }, [schema, routePath]);

  useEffect(() => {
    const id = idRef.current;
    return () => {
      structuredDataManager.unregisterOverride(id);
    };
  }, []);
}

export function clearManagedStructuredData(): void {
  structuredDataManager.reset();
}
