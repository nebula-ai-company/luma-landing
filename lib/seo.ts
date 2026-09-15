import { useEffect, useRef } from 'react';

/**
 * Reusable SEO Metadata Foundation for Luma AI
 * Pure client-side implementation with deterministic single-owner synchronization,
 * route fallback support, page override precedence, and safe tag lifecycle management.
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
    title: 'لوما | مرکز جامع ابزارهای هوش مصنوعی',
    description:
      'لوما، مرکز جامع ابزارهای هوش مصنوعی برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.',
    ogTitle: 'لوما | مرکز جامع ابزارهای هوش مصنوعی',
    ogDescription:
      'لوما، مرکز جامع ابزارهای هوش مصنوعی برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | مرکز جامع ابزارهای هوش مصنوعی',
    twitterDescription:
      'لوما، مرکز جامع ابزارهای هوش مصنوعی برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.',
  },
  '/services': {
    title: 'لوما | خدمات و ابزارهای هوش مصنوعی',
    description:
      'ابزارهای هوش مصنوعی لوما برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، پوشاندن لباس، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.',
    ogTitle: 'لوما | خدمات و ابزارهای هوش مصنوعی',
    ogDescription:
      'ابزارهای هوش مصنوعی لوما برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، پوشاندن لباس، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'لوما | خدمات و ابزارهای هوش مصنوعی',
    twitterDescription:
      'ابزارهای هوش مصنوعی لوما برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، پوشاندن لباس، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.',
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

export interface TagConfig {
  key: string;
  type: 'meta' | 'link';
  keyAttr: 'name' | 'property' | 'rel';
  keyValue: string;
  contentAttr: 'content' | 'href';
  value: string;
}

export interface OverrideEntry {
  id: string;
  routePath: string;
  metadata: PageMetadata;
}

export interface BaselineEntry {
  el: Element;
  originalValue: string;
  contentAttr: 'content' | 'href';
}

function buildDescriptors(metadata: PageMetadata): TagConfig[] {
  const descriptors: TagConfig[] = [];

  if (metadata.description?.trim()) {
    descriptors.push({
      key: 'meta:name:description',
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'description',
      contentAttr: 'content',
      value: metadata.description.trim(),
    });
  }

  if (metadata.robots?.trim()) {
    descriptors.push({
      key: 'meta:name:robots',
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'robots',
      contentAttr: 'content',
      value: metadata.robots.trim(),
    });
  }

  if (metadata.ogTitle?.trim()) {
    descriptors.push({
      key: 'meta:property:og:title',
      type: 'meta',
      keyAttr: 'property',
      keyValue: 'og:title',
      contentAttr: 'content',
      value: metadata.ogTitle.trim(),
    });
  }

  if (metadata.ogDescription?.trim()) {
    descriptors.push({
      key: 'meta:property:og:description',
      type: 'meta',
      keyAttr: 'property',
      keyValue: 'og:description',
      contentAttr: 'content',
      value: metadata.ogDescription.trim(),
    });
  }

  if (metadata.ogType?.trim()) {
    descriptors.push({
      key: 'meta:property:og:type',
      type: 'meta',
      keyAttr: 'property',
      keyValue: 'og:type',
      contentAttr: 'content',
      value: metadata.ogType.trim(),
    });
  }

  const resolvedOgImage = (metadata.ogImage || metadata.image)?.trim();
  if (resolvedOgImage) {
    descriptors.push({
      key: 'meta:property:og:image',
      type: 'meta',
      keyAttr: 'property',
      keyValue: 'og:image',
      contentAttr: 'content',
      value: resolvedOgImage,
    });
  }

  if (metadata.twitterCard?.trim()) {
    descriptors.push({
      key: 'meta:name:twitter:card',
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'twitter:card',
      contentAttr: 'content',
      value: metadata.twitterCard.trim(),
    });
  }

  if (metadata.twitterTitle?.trim()) {
    descriptors.push({
      key: 'meta:name:twitter:title',
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'twitter:title',
      contentAttr: 'content',
      value: metadata.twitterTitle.trim(),
    });
  }

  if (metadata.twitterDescription?.trim()) {
    descriptors.push({
      key: 'meta:name:twitter:description',
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'twitter:description',
      contentAttr: 'content',
      value: metadata.twitterDescription.trim(),
    });
  }

  const resolvedTwitterImage = (metadata.twitterImage || metadata.image)?.trim();
  if (resolvedTwitterImage) {
    descriptors.push({
      key: 'meta:name:twitter:image',
      type: 'meta',
      keyAttr: 'name',
      keyValue: 'twitter:image',
      contentAttr: 'content',
      value: resolvedTwitterImage,
    });
  }

  if (metadata.canonical?.trim()) {
    descriptors.push({
      key: 'link:rel:canonical',
      type: 'link',
      keyAttr: 'rel',
      keyValue: 'canonical',
      contentAttr: 'href',
      value: metadata.canonical.trim(),
    });
  }

  return descriptors;
}

/**
 * Deterministic metadata manager that acts as the single synchronization owner
 * for document.head and document.title.
 */
export class SEOManager {
  private currentRoute: string = '/';
  private overrides: OverrideEntry[] = [];
  private directMetadata: PageMetadata | null = null;
  private baselines: Map<string, BaselineEntry> = new Map();

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

  /**
   * Sets direct/fallback metadata through the centralized SEOManager state.
   * Direct metadata is subordinate to active page overrides:
   * active page override > direct metadata > route fallback > default title
   */
  public setDirectMetadata(metadata?: PageMetadata | null): void {
    this.directMetadata = isEmptyMetadata(metadata) ? null : metadata!;
    this.sync();
  }

  public registerOverride(id: string, metadata?: PageMetadata | null, routePath?: string): void {
    if (isEmptyMetadata(metadata)) {
      this.unregisterOverride(id);
      return;
    }
    const route = routePath || this.currentRoute;
    const existingIndex = this.overrides.findIndex((o) => o.id === id);
    if (existingIndex >= 0) {
      this.overrides[existingIndex] = { id, routePath: route, metadata: metadata! };
    } else {
      this.overrides.push({ id, routePath: route, metadata: metadata! });
    }
    this.sync();
  }

  public updateOverride(id: string, metadata?: PageMetadata | null): void {
    if (isEmptyMetadata(metadata)) {
      this.unregisterOverride(id);
      return;
    }
    const existing = this.overrides.find((o) => o.id === id);
    if (existing) {
      existing.metadata = metadata!;
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

  public getEffectiveMetadata(): PageMetadata {
    const matchingOverrides = this.overrides.filter(
      (o) => !o.routePath || o.routePath === this.currentRoute
    );
    const activeOverride =
      matchingOverrides.length > 0
        ? matchingOverrides[matchingOverrides.length - 1].metadata
        : null;

    const routeMeta = ROUTE_METADATA[this.currentRoute] || {};
    const fallbackMeta = this.directMetadata || routeMeta;

    const title =
      activeOverride?.title?.trim() ||
      fallbackMeta.title?.trim() ||
      DEFAULT_TITLE;

    const description =
      activeOverride?.description?.trim() ||
      fallbackMeta.description?.trim();

    const robots =
      activeOverride?.robots?.trim() ||
      fallbackMeta.robots?.trim();

    const ogTitle =
      activeOverride?.ogTitle?.trim() ||
      fallbackMeta.ogTitle?.trim();

    const ogDescription =
      activeOverride?.ogDescription?.trim() ||
      fallbackMeta.ogDescription?.trim();

    const ogType =
      activeOverride?.ogType?.trim() ||
      fallbackMeta.ogType?.trim();

    const resolvedImage =
      activeOverride?.image?.trim() ||
      fallbackMeta.image?.trim();

    const ogImage =
      activeOverride?.ogImage?.trim() ||
      fallbackMeta.ogImage?.trim() ||
      resolvedImage;

    const twitterCard =
      activeOverride?.twitterCard?.trim() ||
      fallbackMeta.twitterCard?.trim();

    const twitterTitle =
      activeOverride?.twitterTitle?.trim() ||
      fallbackMeta.twitterTitle?.trim();

    const twitterDescription =
      activeOverride?.twitterDescription?.trim() ||
      fallbackMeta.twitterDescription?.trim();

    const twitterImage =
      activeOverride?.twitterImage?.trim() ||
      fallbackMeta.twitterImage?.trim() ||
      resolvedImage;

    const canonical =
      activeOverride?.canonical?.trim() ||
      fallbackMeta.canonical?.trim();

    return {
      title,
      description,
      robots,
      ogTitle,
      ogDescription,
      ogType,
      ogImage,
      twitterCard,
      twitterTitle,
      twitterDescription,
      twitterImage,
      image: resolvedImage,
      canonical,
    };
  }

  public sync(): void {
    if (typeof document === 'undefined') {
      return;
    }
    const meta = this.getEffectiveMetadata();
    this.commitDOM(meta);
  }

  /**
   * Private internal method: applies metadata to document.head safely and deterministically.
   * Cannot be called externally to bypass getEffectiveMetadata() precedence.
   */
  private commitDOM(metadata: PageMetadata): void {
    if (typeof document === 'undefined') {
      return;
    }

    // 1. Title handling
    const nextTitle = metadata.title?.trim() || DEFAULT_TITLE;
    if (document.title !== nextTitle) {
      document.title = nextTitle;
    }

    // 2. Build desired tag descriptors
    const descriptors = buildDescriptors(metadata);
    const activeManagedElements = new Set<Element>();
    const activeBaselineKeys = new Set<string>();

    for (const item of descriptors) {
      // Step A: Check if a managed tag already exists
      const managedSelector = `${item.type}[${item.keyAttr}="${item.keyValue}"][${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`;
      const managedTags = Array.from(document.head.querySelectorAll(managedSelector));

      if (managedTags.length > 0) {
        const primaryTag = managedTags[0];
        // Prune any duplicate managed tags for this same key
        for (let i = 1; i < managedTags.length; i++) {
          managedTags[i].remove();
        }
        if (primaryTag.getAttribute(item.contentAttr) !== item.value) {
          primaryTag.setAttribute(item.contentAttr, item.value);
        }
        activeManagedElements.add(primaryTag);
        continue;
      }

      // Step B: Check if an unmanaged pre-existing tag from index.html exists
      const existingSelector = `${item.type}[${item.keyAttr}="${item.keyValue}"]`;
      const preExistingEl = document.head.querySelector(existingSelector);

      if (preExistingEl && !preExistingEl.hasAttribute(SEO_TAG_ATTR)) {
        if (!this.baselines.has(item.key)) {
          this.baselines.set(item.key, {
            el: preExistingEl,
            originalValue: preExistingEl.getAttribute(item.contentAttr) || '',
            contentAttr: item.contentAttr,
          });
        }
        if (preExistingEl.getAttribute(item.contentAttr) !== item.value) {
          preExistingEl.setAttribute(item.contentAttr, item.value);
        }
        activeBaselineKeys.add(item.key);
        // Never add data-luma-seo to preExistingEl
        continue;
      }

      // Step C: Create a new managed tag
      const newEl = document.createElement(item.type);
      newEl.setAttribute(item.keyAttr, item.keyValue);
      newEl.setAttribute(item.contentAttr, item.value);
      newEl.setAttribute(SEO_TAG_ATTR, SEO_TAG_VALUE);
      document.head.appendChild(newEl);
      activeManagedElements.add(newEl);
    }

    // Step D: Remove stale managed tags
    const allManagedTags = Array.from(
      document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`)
    );
    for (const el of allManagedTags) {
      if (!activeManagedElements.has(el)) {
        el.remove();
      }
    }

    // Step E: Restore inactive pre-existing baselines
    for (const [key, baseline] of this.baselines.entries()) {
      if (!activeBaselineKeys.has(key)) {
        if (baseline.el.getAttribute(baseline.contentAttr) !== baseline.originalValue) {
          baseline.el.setAttribute(baseline.contentAttr, baseline.originalValue);
        }
      }
    }
  }

  public reset(): void {
    if (typeof document !== 'undefined') {
      document.title = DEFAULT_TITLE;
      const allManagedTags = Array.from(
        document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`)
      );
      allManagedTags.forEach((el) => el.remove());
      for (const [, baseline] of this.baselines.entries()) {
        baseline.el.setAttribute(baseline.contentAttr, baseline.originalValue);
      }
    }
    this.overrides = [];
    this.directMetadata = null;
    this.baselines.clear();
    this.currentRoute = '/';
  }
}

export const seoManager = new SEOManager();

/**
 * Checks whether metadata is undefined, null, or contains only empty/whitespace values.
 */
export function isEmptyMetadata(metadata?: PageMetadata | null): boolean {
  if (!metadata) {
    return true;
  }
  const keys: (keyof PageMetadata)[] = [
    'title',
    'description',
    'robots',
    'ogTitle',
    'ogDescription',
    'ogType',
    'ogImage',
    'twitterCard',
    'twitterTitle',
    'twitterDescription',
    'twitterImage',
    'image',
    'canonical',
  ];
  return keys.every((k) => !metadata[k] || metadata[k]!.trim() === '');
}

let overrideCounter = 0;

/**
 * Reusable hook to register page-level metadata overrides.
 * Guarantees that:
 * - When metadata is valid, it registers/updates the override.
 * - If metadata later becomes undefined or empty while mounted, it immediately unregisters the override.
 * - Stale tags are removed and route fallback is restored.
 * - Restores route-level fallback cleanly on unmount.
 */
export function usePageMetadata(metadata?: PageMetadata, routePath?: string): void {
  const idRef = useRef<string>('');
  if (!idRef.current) {
    idRef.current = `seo-override-${++overrideCounter}`;
  }

  // Register, update, or clear override when props or routePath change
  useEffect(() => {
    if (isEmptyMetadata(metadata)) {
      seoManager.unregisterOverride(idRef.current);
    } else {
      seoManager.registerOverride(idRef.current, metadata!, routePath);
    }
  }, [
    routePath,
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

  // Clean up override strictly on component unmount
  useEffect(() => {
    const id = idRef.current;
    return () => {
      seoManager.unregisterOverride(id);
    };
  }, []);
}

/**
 * Internal helper to apply direct metadata while strictly respecting metadata precedence.
 * An active page override CANNOT be overwritten by this helper.
 */
export function applyPageMetadata(metadata?: PageMetadata): void {
  seoManager.setDirectMetadata(metadata);
}

export function clearManagedMetadata(): void {
  seoManager.reset();
}

