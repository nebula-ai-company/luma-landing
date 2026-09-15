import { useEffect } from 'react';

/**
 * Reusable SEO Metadata Foundation for Luma AI
 * Pure client-side implementation using DOM manipulation with zero external packages.
 */

export interface PageMetadata {
  title?: string;
  description?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player' | string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  image?: string;
  canonical?: string;
}

export const SEO_TAG_ATTR = 'data-luma-seo';
export const SEO_TAG_VALUE = 'true';

// Fallback title strictly preserved from index.html
export const DEFAULT_TITLE = 'لوما - پیشگام هوش مصنوعی در ایران';

/**
 * Registry of routes that have verified, approved metadata in this task.
 * Routes not explicitly registered here fallback to DEFAULT_TITLE with no invented metadata.
 */
export const ROUTE_METADATA: Record<string, PageMetadata> = {
  '/': {
    title: DEFAULT_TITLE,
  },
  '/service/video-enhancement': {
    title: 'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps',
  },
  '/service/text-to-speech': {
    title: 'لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای',
  },
  '/service/workflow': {
    title: 'لوما | ورک‌فلوها - بوم بصری ساخت فرآیندهای چندمرحله‌ای',
  },
};

export function getRouteMetadata(pathname: string): PageMetadata {
  return ROUTE_METADATA[pathname] || { title: DEFAULT_TITLE };
}

interface TagDescriptor {
  type: 'meta' | 'link';
  keyAttr: 'name' | 'property' | 'rel';
  keyValue: string;
  contentAttr: 'content' | 'href';
  value: string;
}

/**
 * Applies metadata to the document head safely.
 * - Updates document.title without duplicating title elements.
 * - Creates or updates tags marked with data-luma-seo="true".
 * - Removes any previously created data-luma-seo tags that are not in the new active metadata.
 * - Preserves all unrelated tags originally present in index.html.
 */
export function applyPageMetadata(metadata?: PageMetadata): void {
  if (typeof document === 'undefined') {
    return;
  }

  // 1. Title handling
  const title = metadata?.title?.trim() || DEFAULT_TITLE;
  document.title = title;

  // 2. Build desired tag descriptors
  const descriptors: TagDescriptor[] = [];

  if (metadata?.description?.trim()) {
    descriptors.push({
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'description',
      contentAttr: 'content',
      value: metadata.description.trim(),
    });
  }

  if (metadata?.robots?.trim()) {
    descriptors.push({
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'robots',
      contentAttr: 'content',
      value: metadata.robots.trim(),
    });
  }

  if (metadata?.ogTitle?.trim()) {
    descriptors.push({
      type: 'meta',
      keyAttr: 'property',
      keyValue: 'og:title',
      contentAttr: 'content',
      value: metadata.ogTitle.trim(),
    });
  }

  if (metadata?.ogDescription?.trim()) {
    descriptors.push({
      type: 'meta',
      keyAttr: 'property',
      keyValue: 'og:description',
      contentAttr: 'content',
      value: metadata.ogDescription.trim(),
    });
  }

  if (metadata?.ogType?.trim()) {
    descriptors.push({
      type: 'meta',
      keyAttr: 'property',
      keyValue: 'og:type',
      contentAttr: 'content',
      value: metadata.ogType.trim(),
    });
  }

  const resolvedOgImage = (metadata?.ogImage || metadata?.image)?.trim();
  if (resolvedOgImage) {
    descriptors.push({
      type: 'meta',
      keyAttr: 'property',
      keyValue: 'og:image',
      contentAttr: 'content',
      value: resolvedOgImage,
    });
  }

  if (metadata?.twitterCard?.trim()) {
    descriptors.push({
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'twitter:card',
      contentAttr: 'content',
      value: metadata.twitterCard.trim(),
    });
  }

  if (metadata?.twitterTitle?.trim()) {
    descriptors.push({
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'twitter:title',
      contentAttr: 'content',
      value: metadata.twitterTitle.trim(),
    });
  }

  if (metadata?.twitterDescription?.trim()) {
    descriptors.push({
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'twitter:description',
      contentAttr: 'content',
      value: metadata.twitterDescription.trim(),
    });
  }

  const resolvedTwitterImage = (metadata?.twitterImage || metadata?.image)?.trim();
  if (resolvedTwitterImage) {
    descriptors.push({
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'twitter:image',
      contentAttr: 'content',
      value: resolvedTwitterImage,
    });
  }

  // Canonical tag support (not populated by default in this task)
  if (metadata?.canonical?.trim()) {
    descriptors.push({
      type: 'link',
      keyAttr: 'rel',
      keyValue: 'canonical',
      contentAttr: 'href',
      value: metadata.canonical.trim(),
    });
  }

  // 3. Apply descriptors and keep track of elements
  const activeElements = new Set<Element>();

  for (const item of descriptors) {
    // Look for an existing tag with matching selector
    const selector = `${item.type}[${item.keyAttr}="${item.keyValue}"]`;
    let el = document.head.querySelector(selector);

    if (el) {
      el.setAttribute(item.contentAttr, item.value);
      el.setAttribute(SEO_TAG_ATTR, SEO_TAG_VALUE);
    } else {
      el = document.createElement(item.type);
      el.setAttribute(item.keyAttr, item.keyValue);
      el.setAttribute(item.contentAttr, item.value);
      el.setAttribute(SEO_TAG_ATTR, SEO_TAG_VALUE);
      document.head.appendChild(el);
    }

    activeElements.add(el);
  }

  // 4. Remove stale tags previously created by Luma SEO
  const allManagedTags = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
  allManagedTags.forEach((el) => {
    if (!activeElements.has(el)) {
      el.remove();
    }
  });
}

/**
 * Resets all managed SEO tags and restores the default title.
 */
export function clearManagedMetadata(): void {
  if (typeof document === 'undefined') {
    return;
  }
  document.title = DEFAULT_TITLE;
  const allManagedTags = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
  allManagedTags.forEach((el) => el.remove());
}

/**
 * Reusable hook to apply page-level metadata.
 */
export function usePageMetadata(metadata?: PageMetadata): void {
  useEffect(() => {
    if (metadata) {
      applyPageMetadata(metadata);
    }
  }, [
    metadata?.title,
    metadata?.description,
    metadata?.robots,
    metadata?.ogTitle,
    metadata?.ogDescription,
    metadata?.ogType,
    metadata?.ogImage,
    metadata?.twitterCard,
    metadata?.twitterTitle,
    metadata?.twitterDescription,
    metadata?.twitterImage,
    metadata?.image,
    metadata?.canonical,
  ]);
}
