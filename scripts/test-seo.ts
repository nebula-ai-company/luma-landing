/**
 * Deterministic Test Suite for Luma AI SEO Metadata Architecture
 *
 * NOTE ON TEST CLASSIFICATION:
 * ============================================================================
 * The tests in this suite are "SEOManager Unit & State Lifecycle Tests".
 * They test the deterministic state machine, precedence resolution, tag creation,
 * stale tag removal, and baseline preservation on the SEOManager instance directly.
 *
 * React component integration testing (rendering <SEOHead /> and <AppSEOManager />
 * into a full React fiber DOM tree) requires a full browser DOM or jsdom environment
 * with window/event APIs, which is intentionally excluded to avoid adding unapproved
 * dependencies to package.json. React component lifecycle coverage is NOT claimed here;
 * only the underlying SEOManager state lifecycle is verified.
 * ============================================================================
 */

import assert from 'node:assert/strict';

// Lightweight in-memory DOM mock for Node test runner
class MockElement {
  public tagName: string;
  public attributes: Map<string, string> = new Map();
  public parentNode: MockElement | null = null;
  public children: MockElement[] = [];

  constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
  }

  public setAttribute(name: string, value: string): void {
    this.attributes.set(name, String(value));
  }

  public getAttribute(name: string): string | null {
    return this.attributes.get(name) ?? null;
  }

  public hasAttribute(name: string): boolean {
    return this.attributes.has(name);
  }

  public removeAttribute(name: string): void {
    this.attributes.delete(name);
  }

  public remove(): void {
    if (this.parentNode) {
      const idx = this.parentNode.children.indexOf(this);
      if (idx >= 0) {
        this.parentNode.children.splice(idx, 1);
      }
      this.parentNode = null;
    }
  }

  public appendChild(child: MockElement): MockElement {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  public querySelectorAll(selector: string): MockElement[] {
    const results: MockElement[] = [];
    for (const child of this.children) {
      if (matchSelector(child, selector)) {
        results.push(child);
      }
      results.push(...child.querySelectorAll(selector));
    }
    return results;
  }

  public querySelector(selector: string): MockElement | null {
    const all = this.querySelectorAll(selector);
    return all.length > 0 ? all[0] : null;
  }
}

function matchSelector(el: MockElement, selector: string): boolean {
  const tagMatch = selector.match(/^([a-zA-Z]+)/);
  const expectedTag = tagMatch ? tagMatch[1].toUpperCase() : null;
  if (expectedTag && el.tagName !== expectedTag) {
    return false;
  }

  const attrMatches = [...selector.matchAll(/\[([a-zA-Z0-9_-]+)(?:="([^"]*)")?\]/g)];
  for (const m of attrMatches) {
    const attrName = m[1];
    const expectedValue = m[2];
    if (!el.hasAttribute(attrName)) {
      return false;
    }
    if (expectedValue !== undefined && el.getAttribute(attrName) !== expectedValue) {
      return false;
    }
  }
  return true;
}

class MockDocument {
  public head: MockElement = new MockElement('HEAD');
  public title: string = '';

  public createElement(tagName: string): MockElement {
    return new MockElement(tagName);
  }
}

const mockDoc = new MockDocument();
(globalThis as any).document = mockDoc;
(globalThis as any).window = {
  location: { pathname: '/', hash: '' },
};

// Import SEO module after DOM globals are installed
const {
  SEOManager,
  DEFAULT_TITLE,
  ROUTE_METADATA,
  SEO_TAG_ATTR,
  SEO_TAG_VALUE,
  isEmptyMetadata,
  applyPageMetadata,
} = await import('../lib/seo.ts');

const { resolveExcerpt } = await import('../lib/blogUtils.ts');

console.log('================================================================');
console.log('SEOManager Unit & State Lifecycle Test Suite');
console.log('(Distinction: Tests SEOManager class and state machine in isolation)');
console.log('================================================================');

const manager = new SEOManager();

// ----------------------------------------------------------------------------
// Test 1: Approved Homepage metadata (unit test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 1] Approved Homepage metadata on route "/"');
manager.setRoute('/');

// Verify homepage title
const expectedHomeTitle = 'لوما | مرکز جامع ابزارهای هوش مصنوعی';
assert.equal(document.title, expectedHomeTitle, 'Homepage title must match approved title');

// Verify homepage description
const expectedHomeDesc =
  'لوما، مرکز جامع ابزارهای هوش مصنوعی برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.';
const homeDescTag = document.head.querySelector('meta[name="description"]');
assert.ok(homeDescTag, 'Homepage description tag must exist');
assert.equal(homeDescTag.getAttribute('content'), expectedHomeDesc, 'Homepage description must match approved copy');
assert.equal(homeDescTag.getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE, 'Homepage description must be managed with data-luma-seo="true"');

// Verify Open Graph tags
const homeOgTitle = document.head.querySelector('meta[property="og:title"]');
assert.ok(homeOgTitle, 'og:title tag must exist');
assert.equal(homeOgTitle.getAttribute('content'), expectedHomeTitle);
assert.equal(homeOgTitle.getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const homeOgDesc = document.head.querySelector('meta[property="og:description"]');
assert.ok(homeOgDesc, 'og:description tag must exist');
assert.equal(homeOgDesc.getAttribute('content'), expectedHomeDesc);

const homeOgType = document.head.querySelector('meta[property="og:type"]');
assert.ok(homeOgType, 'og:type tag must exist');
assert.equal(homeOgType.getAttribute('content'), 'website');

// Verify Twitter Card tags
const homeTwitterCard = document.head.querySelector('meta[name="twitter:card"]');
assert.ok(homeTwitterCard, 'twitter:card tag must exist');
assert.equal(homeTwitterCard.getAttribute('content'), 'summary');

const homeTwitterTitle = document.head.querySelector('meta[name="twitter:title"]');
assert.ok(homeTwitterTitle, 'twitter:title tag must exist');
assert.equal(homeTwitterTitle.getAttribute('content'), expectedHomeTitle);

const homeTwitterDesc = document.head.querySelector('meta[name="twitter:description"]');
assert.ok(homeTwitterDesc, 'twitter:description tag must exist');
assert.equal(homeTwitterDesc.getAttribute('content'), expectedHomeDesc);

// Verify strictly NO unapproved tags on homepage
assert.equal(document.head.querySelector('meta[property="og:image"]'), null, 'og:image must NOT be present on homepage');
assert.equal(document.head.querySelector('meta[name="twitter:image"]'), null, 'twitter:image must NOT be present on homepage');
assert.equal(document.head.querySelector('meta[name="robots"]'), null, 'robots tag must NOT be present on homepage');
assert.equal(document.head.querySelector('link[rel="canonical"]'), null, 'canonical link must NOT be present on homepage');

console.log('✓ Unit Test 1 Passed: Approved homepage title, description, OG, and Twitter tags verified; unapproved tags absent.');

// ----------------------------------------------------------------------------
// Test 1b: Approved Services Catalog metadata on route "/services" (unit & lifecycle test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 1b] Approved Services Catalog metadata on route "/services"');
manager.setRoute('/services');

const expectedServicesTitle = 'لوما | خدمات و ابزارهای هوش مصنوعی';
const expectedServicesDesc =
  'ابزارهای هوش مصنوعی لوما برای ساخت و ویرایش تصویر و ویدئو، حذف پس‌زمینه، افزایش کیفیت، پوشاندن لباس، چت هوشمند، تبدیل متن به گفتار و ساخت ورک‌فلوهای چندمرحله‌ای.';

// 1. Route /services produces the exact approved title
assert.equal(document.title, expectedServicesTitle, 'Services title must match approved title');

// 2. Exactly one managed description tag exists with the approved description
const servicesDescTags = document.head.querySelectorAll('meta[name="description"]');
assert.equal(servicesDescTags.length, 1, 'Exactly one meta[name="description"] should exist on /services');
const servicesDescTag = servicesDescTags[0];
assert.equal(servicesDescTag.getAttribute('content'), expectedServicesDesc, 'Services description must match approved copy');
assert.equal(servicesDescTag.getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE, 'Services description must be managed with data-luma-seo="true"');

// 3. Exactly one managed og:title, og:description, and og:type tag exists
const servicesOgTitles = document.head.querySelectorAll('meta[property="og:title"]');
assert.equal(servicesOgTitles.length, 1, 'Exactly one meta[property="og:title"] should exist on /services');
assert.equal(servicesOgTitles[0].getAttribute('content'), expectedServicesTitle);
assert.equal(servicesOgTitles[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const servicesOgDescs = document.head.querySelectorAll('meta[property="og:description"]');
assert.equal(servicesOgDescs.length, 1, 'Exactly one meta[property="og:description"] should exist on /services');
assert.equal(servicesOgDescs[0].getAttribute('content'), expectedServicesDesc);
assert.equal(servicesOgDescs[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const servicesOgTypes = document.head.querySelectorAll('meta[property="og:type"]');
assert.equal(servicesOgTypes.length, 1, 'Exactly one meta[property="og:type"] should exist on /services');
assert.equal(servicesOgTypes[0].getAttribute('content'), 'website');
assert.equal(servicesOgTypes[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

// 4. Exactly one managed twitter:card, twitter:title, and twitter:description tag exists
const servicesTwitterCards = document.head.querySelectorAll('meta[name="twitter:card"]');
assert.equal(servicesTwitterCards.length, 1, 'Exactly one meta[name="twitter:card"] should exist on /services');
assert.equal(servicesTwitterCards[0].getAttribute('content'), 'summary');
assert.equal(servicesTwitterCards[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const servicesTwitterTitles = document.head.querySelectorAll('meta[name="twitter:title"]');
assert.equal(servicesTwitterTitles.length, 1, 'Exactly one meta[name="twitter:title"] should exist on /services');
assert.equal(servicesTwitterTitles[0].getAttribute('content'), expectedServicesTitle);
assert.equal(servicesTwitterTitles[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const servicesTwitterDescs = document.head.querySelectorAll('meta[name="twitter:description"]');
assert.equal(servicesTwitterDescs.length, 1, 'Exactly one meta[name="twitter:description"] should exist on /services');
assert.equal(servicesTwitterDescs[0].getAttribute('content'), expectedServicesDesc);
assert.equal(servicesTwitterDescs[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

// 5. No canonical, robots, og:image, or twitter:image tags are created
assert.equal(document.head.querySelector('link[rel="canonical"]'), null, 'canonical link must NOT be present on /services');
assert.equal(document.head.querySelector('meta[name="robots"]'), null, 'robots tag must NOT be present on /services');
assert.equal(document.head.querySelector('meta[property="og:image"]'), null, 'og:image must NOT be present on /services');
assert.equal(document.head.querySelector('meta[name="twitter:image"]'), null, 'twitter:image must NOT be present on /services');

// 6. Navigating from /services to an unknown route removes the services metadata and restores DEFAULT_TITLE
manager.setRoute('/some/unknown/route-after-services');
assert.equal(document.title, DEFAULT_TITLE, 'Navigating to unknown route must restore DEFAULT_TITLE');
const managedTagsAfterUnknown = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
assert.equal(managedTagsAfterUnknown.length, 0, 'Navigating from /services to unknown route must remove all services metadata');

// 7. Navigating back to /services recreates the approved services metadata
manager.setRoute('/services');
assert.equal(document.title, expectedServicesTitle, 'Navigating back to /services recreates approved title');
assert.equal(document.head.querySelector('meta[name="description"]')?.getAttribute('content'), expectedServicesDesc, 'Navigating back to /services recreates description');
assert.equal(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content'), expectedServicesTitle);
assert.equal(document.head.querySelector('meta[property="og:description"]')?.getAttribute('content'), expectedServicesDesc);
assert.equal(document.head.querySelector('meta[property="og:type"]')?.getAttribute('content'), 'website');
assert.equal(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content'), 'summary');
assert.equal(document.head.querySelector('meta[name="twitter:title"]')?.getAttribute('content'), expectedServicesTitle);
assert.equal(document.head.querySelector('meta[name="twitter:description"]')?.getAttribute('content'), expectedServicesDesc);
assert.equal(document.head.querySelector('link[rel="canonical"]'), null);
assert.equal(document.head.querySelector('meta[name="robots"]'), null);
assert.equal(document.head.querySelector('meta[property="og:image"]'), null);
assert.equal(document.head.querySelector('meta[name="twitter:image"]'), null);

console.log('✓ Unit Test 1b Passed: Approved services metadata, tag counts, absence of unapproved tags, and route lifecycle transitions verified.');

// ----------------------------------------------------------------------------
// Test 1c: Approved Image Generation Service metadata on route "/service/img-gen" (unit & lifecycle test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 1c] Approved Image Generation Service metadata on route "/service/img-gen"');
manager.setRoute('/service/img-gen');

const expectedImgGenTitle = 'لوما | ساخت تصویر با هوش مصنوعی';
const expectedImgGenDesc =
  'با سرویس ساخت تصویر لوما، ایده‌های خود را از متن به تصویر تبدیل کنید و برای خلق آثار دیجیتال از مدل‌های گوناگون هوش مصنوعی استفاده کنید.';

// 1. Route /service/img-gen produces the exact approved title
assert.equal(document.title, expectedImgGenTitle, 'Route /service/img-gen must produce the exact approved title');

// 2. Exactly one managed description tag exists with the approved description
const imgGenDescTags = document.head.querySelectorAll('meta[name="description"]');
assert.equal(imgGenDescTags.length, 1, 'Exactly one meta[name="description"] should exist on /service/img-gen');
const imgGenDescTag = imgGenDescTags[0];
assert.equal(imgGenDescTag.getAttribute('content'), expectedImgGenDesc, 'Description must match approved copy');
assert.equal(imgGenDescTag.getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE, 'Description must be managed with data-luma-seo="true"');

// 3. Exactly one managed og:title, og:description, and og:type tag exists
const imgGenOgTitles = document.head.querySelectorAll('meta[property="og:title"]');
assert.equal(imgGenOgTitles.length, 1, 'Exactly one meta[property="og:title"] should exist on /service/img-gen');
assert.equal(imgGenOgTitles[0].getAttribute('content'), expectedImgGenTitle);
assert.equal(imgGenOgTitles[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const imgGenOgDescs = document.head.querySelectorAll('meta[property="og:description"]');
assert.equal(imgGenOgDescs.length, 1, 'Exactly one meta[property="og:description"] should exist on /service/img-gen');
assert.equal(imgGenOgDescs[0].getAttribute('content'), expectedImgGenDesc);
assert.equal(imgGenOgDescs[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const imgGenOgTypes = document.head.querySelectorAll('meta[property="og:type"]');
assert.equal(imgGenOgTypes.length, 1, 'Exactly one meta[property="og:type"] should exist on /service/img-gen');
assert.equal(imgGenOgTypes[0].getAttribute('content'), 'website');
assert.equal(imgGenOgTypes[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

// 4. Exactly one managed twitter:card, twitter:title, and twitter:description tag exists
const imgGenTwitterCards = document.head.querySelectorAll('meta[name="twitter:card"]');
assert.equal(imgGenTwitterCards.length, 1, 'Exactly one meta[name="twitter:card"] should exist on /service/img-gen');
assert.equal(imgGenTwitterCards[0].getAttribute('content'), 'summary');
assert.equal(imgGenTwitterCards[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const imgGenTwitterTitles = document.head.querySelectorAll('meta[name="twitter:title"]');
assert.equal(imgGenTwitterTitles.length, 1, 'Exactly one meta[name="twitter:title"] should exist on /service/img-gen');
assert.equal(imgGenTwitterTitles[0].getAttribute('content'), expectedImgGenTitle);
assert.equal(imgGenTwitterTitles[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const imgGenTwitterDescs = document.head.querySelectorAll('meta[name="twitter:description"]');
assert.equal(imgGenTwitterDescs.length, 1, 'Exactly one meta[name="twitter:description"] should exist on /service/img-gen');
assert.equal(imgGenTwitterDescs[0].getAttribute('content'), expectedImgGenDesc);
assert.equal(imgGenTwitterDescs[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

// 5. No canonical, robots, og:image, or twitter:image tags are created
assert.equal(document.head.querySelector('link[rel="canonical"]'), null, 'canonical link must NOT be present on /service/img-gen');
assert.equal(document.head.querySelector('meta[name="robots"]'), null, 'robots tag must NOT be present on /service/img-gen');
assert.equal(document.head.querySelector('meta[property="og:image"]'), null, 'og:image must NOT be present on /service/img-gen');
assert.equal(document.head.querySelector('meta[name="twitter:image"]'), null, 'twitter:image must NOT be present on /service/img-gen');

// 6. Navigating from /service/img-gen to an unknown route removes the service metadata and restores DEFAULT_TITLE
manager.setRoute('/some/unknown/route-after-img-gen');
assert.equal(document.title, DEFAULT_TITLE, 'Navigating to unknown route must restore DEFAULT_TITLE');
const managedTagsAfterUnknownImgGen = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
assert.equal(managedTagsAfterUnknownImgGen.length, 0, 'Navigating from /service/img-gen to unknown route must remove all service metadata');

// 7. Navigating back to /service/img-gen recreates the approved metadata
manager.setRoute('/service/img-gen');
assert.equal(document.title, expectedImgGenTitle, 'Navigating back to /service/img-gen recreates approved title');
assert.equal(document.head.querySelector('meta[name="description"]')?.getAttribute('content'), expectedImgGenDesc, 'Navigating back to /service/img-gen recreates description');
assert.equal(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content'), expectedImgGenTitle);
assert.equal(document.head.querySelector('meta[property="og:description"]')?.getAttribute('content'), expectedImgGenDesc);
assert.equal(document.head.querySelector('meta[property="og:type"]')?.getAttribute('content'), 'website');
assert.equal(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content'), 'summary');
assert.equal(document.head.querySelector('meta[name="twitter:title"]')?.getAttribute('content'), expectedImgGenTitle);
assert.equal(document.head.querySelector('meta[name="twitter:description"]')?.getAttribute('content'), expectedImgGenDesc);
assert.equal(document.head.querySelector('link[rel="canonical"]'), null);
assert.equal(document.head.querySelector('meta[name="robots"]'), null);
assert.equal(document.head.querySelector('meta[property="og:image"]'), null);
assert.equal(document.head.querySelector('meta[name="twitter:image"]'), null);

console.log('✓ Unit Test 1c Passed: Approved image generation metadata, tag counts, absence of unapproved tags, and route lifecycle transitions verified.');

// ----------------------------------------------------------------------------
// Test 1d: Approved Image Editing Service metadata on route "/service/img-edit" (unit & lifecycle test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 1d] Approved Image Editing Service metadata on route "/service/img-edit"');
manager.setRoute('/service/img-edit');

const expectedImgEditTitle = 'لوما | ویرایش تصویر با هوش مصنوعی';
const expectedImgEditDesc =
  'با ویرایش تصویر لوما، اشیا را حذف یا جایگزین کنید، تصاویر را با متن تغییر دهید و نور، رنگ و ترکیب‌بندی را دقیق‌تر کنترل کنید.';

// 1. Route /service/img-edit produces the exact approved title
assert.equal(document.title, expectedImgEditTitle, 'Route /service/img-edit must produce the exact approved title');

// 2. Exactly one managed description tag exists with the approved description
const imgEditDescTags = document.head.querySelectorAll('meta[name="description"]');
assert.equal(imgEditDescTags.length, 1, 'Exactly one meta[name="description"] should exist on /service/img-edit');
const imgEditDescTag = imgEditDescTags[0];
assert.equal(imgEditDescTag.getAttribute('content'), expectedImgEditDesc, 'Description must match approved copy');
assert.equal(imgEditDescTag.getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE, 'Description must be managed with data-luma-seo="true"');

// 3. Exactly one managed og:title, og:description, and og:type tag exists
const imgEditOgTitles = document.head.querySelectorAll('meta[property="og:title"]');
assert.equal(imgEditOgTitles.length, 1, 'Exactly one meta[property="og:title"] should exist on /service/img-edit');
assert.equal(imgEditOgTitles[0].getAttribute('content'), expectedImgEditTitle);
assert.equal(imgEditOgTitles[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const imgEditOgDescs = document.head.querySelectorAll('meta[property="og:description"]');
assert.equal(imgEditOgDescs.length, 1, 'Exactly one meta[property="og:description"] should exist on /service/img-edit');
assert.equal(imgEditOgDescs[0].getAttribute('content'), expectedImgEditDesc);
assert.equal(imgEditOgDescs[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const imgEditOgTypes = document.head.querySelectorAll('meta[property="og:type"]');
assert.equal(imgEditOgTypes.length, 1, 'Exactly one meta[property="og:type"] should exist on /service/img-edit');
assert.equal(imgEditOgTypes[0].getAttribute('content'), 'website');
assert.equal(imgEditOgTypes[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

// 4. Exactly one managed twitter:card, twitter:title, and twitter:description tag exists
const imgEditTwitterCards = document.head.querySelectorAll('meta[name="twitter:card"]');
assert.equal(imgEditTwitterCards.length, 1, 'Exactly one meta[name="twitter:card"] should exist on /service/img-edit');
assert.equal(imgEditTwitterCards[0].getAttribute('content'), 'summary');
assert.equal(imgEditTwitterCards[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const imgEditTwitterTitles = document.head.querySelectorAll('meta[name="twitter:title"]');
assert.equal(imgEditTwitterTitles.length, 1, 'Exactly one meta[name="twitter:title"] should exist on /service/img-edit');
assert.equal(imgEditTwitterTitles[0].getAttribute('content'), expectedImgEditTitle);
assert.equal(imgEditTwitterTitles[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const imgEditTwitterDescs = document.head.querySelectorAll('meta[name="twitter:description"]');
assert.equal(imgEditTwitterDescs.length, 1, 'Exactly one meta[name="twitter:description"] should exist on /service/img-edit');
assert.equal(imgEditTwitterDescs[0].getAttribute('content'), expectedImgEditDesc);
assert.equal(imgEditTwitterDescs[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

// 5. No canonical, robots, og:image, or twitter:image tags are created
assert.equal(document.head.querySelector('link[rel="canonical"]'), null, 'canonical link must NOT be present on /service/img-edit');
assert.equal(document.head.querySelector('meta[name="robots"]'), null, 'robots tag must NOT be present on /service/img-edit');
assert.equal(document.head.querySelector('meta[property="og:image"]'), null, 'og:image must NOT be present on /service/img-edit');
assert.equal(document.head.querySelector('meta[name="twitter:image"]'), null, 'twitter:image must NOT be present on /service/img-edit');

// 6. Navigating from /service/img-edit to an unknown route removes the service metadata and restores DEFAULT_TITLE
manager.setRoute('/some/unknown/route-after-img-edit');
assert.equal(document.title, DEFAULT_TITLE, 'Navigating to unknown route must restore DEFAULT_TITLE');
const managedTagsAfterUnknownImgEdit = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
assert.equal(managedTagsAfterUnknownImgEdit.length, 0, 'Navigating from /service/img-edit to unknown route must remove all service metadata');

// 7. Navigating back to /service/img-edit recreates the approved metadata
manager.setRoute('/service/img-edit');
assert.equal(document.title, expectedImgEditTitle, 'Navigating back to /service/img-edit recreates approved title');
assert.equal(document.head.querySelector('meta[name="description"]')?.getAttribute('content'), expectedImgEditDesc, 'Navigating back to /service/img-edit recreates description');
assert.equal(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content'), expectedImgEditTitle);
assert.equal(document.head.querySelector('meta[property="og:description"]')?.getAttribute('content'), expectedImgEditDesc);
assert.equal(document.head.querySelector('meta[property="og:type"]')?.getAttribute('content'), 'website');
assert.equal(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content'), 'summary');
assert.equal(document.head.querySelector('meta[name="twitter:title"]')?.getAttribute('content'), expectedImgEditTitle);
assert.equal(document.head.querySelector('meta[name="twitter:description"]')?.getAttribute('content'), expectedImgEditDesc);
assert.equal(document.head.querySelector('link[rel="canonical"]'), null);
assert.equal(document.head.querySelector('meta[name="robots"]'), null);
assert.equal(document.head.querySelector('meta[property="og:image"]'), null);
assert.equal(document.head.querySelector('meta[name="twitter:image"]'), null);

console.log('✓ Unit Test 1d Passed: Approved image editing metadata, tag counts, absence of unapproved tags, and route lifecycle transitions verified.');

// ----------------------------------------------------------------------------
// Test 1e: Approved Background Removal Service metadata on route "/service/bg-remove" (unit & lifecycle test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 1e] Approved Background Removal Service metadata on route "/service/bg-remove"');
manager.setRoute('/service/bg-remove');

const expectedBgRemoveTitle = 'لوما | حذف پس‌زمینه عکس با هوش مصنوعی';
const expectedBgRemoveDesc =
  'با ابزار حذف پس‌زمینه لوما، سوژه را با یک کلیک از تصویر جدا کنید و برای عکس‌های محصول، پرتره و تبلیغات خروجی شفاف بگیرید.';

// 1. Route /service/bg-remove produces the exact approved title
assert.equal(document.title, expectedBgRemoveTitle, 'Route /service/bg-remove must produce the exact approved title');

// 2. Exactly one managed description tag exists with the approved description
const bgRemoveDescTags = document.head.querySelectorAll('meta[name="description"]');
assert.equal(bgRemoveDescTags.length, 1, 'Exactly one meta[name="description"] should exist on /service/bg-remove');
const bgRemoveDescTag = bgRemoveDescTags[0];
assert.equal(bgRemoveDescTag.getAttribute('content'), expectedBgRemoveDesc, 'Description must match approved copy');
assert.equal(bgRemoveDescTag.getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE, 'Description must be managed with data-luma-seo="true"');

// 3. Exactly one managed og:title, og:description, and og:type tag exists
const bgRemoveOgTitles = document.head.querySelectorAll('meta[property="og:title"]');
assert.equal(bgRemoveOgTitles.length, 1, 'Exactly one meta[property="og:title"] should exist on /service/bg-remove');
assert.equal(bgRemoveOgTitles[0].getAttribute('content'), expectedBgRemoveTitle);
assert.equal(bgRemoveOgTitles[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const bgRemoveOgDescs = document.head.querySelectorAll('meta[property="og:description"]');
assert.equal(bgRemoveOgDescs.length, 1, 'Exactly one meta[property="og:description"] should exist on /service/bg-remove');
assert.equal(bgRemoveOgDescs[0].getAttribute('content'), expectedBgRemoveDesc);
assert.equal(bgRemoveOgDescs[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const bgRemoveOgTypes = document.head.querySelectorAll('meta[property="og:type"]');
assert.equal(bgRemoveOgTypes.length, 1, 'Exactly one meta[property="og:type"] should exist on /service/bg-remove');
assert.equal(bgRemoveOgTypes[0].getAttribute('content'), 'website');
assert.equal(bgRemoveOgTypes[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

// 4. Exactly one managed twitter:card, twitter:title, and twitter:description tag exists
const bgRemoveTwitterCards = document.head.querySelectorAll('meta[name="twitter:card"]');
assert.equal(bgRemoveTwitterCards.length, 1, 'Exactly one meta[name="twitter:card"] should exist on /service/bg-remove');
assert.equal(bgRemoveTwitterCards[0].getAttribute('content'), 'summary');
assert.equal(bgRemoveTwitterCards[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const bgRemoveTwitterTitles = document.head.querySelectorAll('meta[name="twitter:title"]');
assert.equal(bgRemoveTwitterTitles.length, 1, 'Exactly one meta[name="twitter:title"] should exist on /service/bg-remove');
assert.equal(bgRemoveTwitterTitles[0].getAttribute('content'), expectedBgRemoveTitle);
assert.equal(bgRemoveTwitterTitles[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const bgRemoveTwitterDescs = document.head.querySelectorAll('meta[name="twitter:description"]');
assert.equal(bgRemoveTwitterDescs.length, 1, 'Exactly one meta[name="twitter:description"] should exist on /service/bg-remove');
assert.equal(bgRemoveTwitterDescs[0].getAttribute('content'), expectedBgRemoveDesc);
assert.equal(bgRemoveTwitterDescs[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

// 5. No canonical, robots, og:image, or twitter:image tags are created
assert.equal(document.head.querySelector('link[rel="canonical"]'), null, 'canonical link must NOT be present on /service/bg-remove');
assert.equal(document.head.querySelector('meta[name="robots"]'), null, 'robots tag must NOT be present on /service/bg-remove');
assert.equal(document.head.querySelector('meta[property="og:image"]'), null, 'og:image must NOT be present on /service/bg-remove');
assert.equal(document.head.querySelector('meta[name="twitter:image"]'), null, 'twitter:image must NOT be present on /service/bg-remove');

// 6. Navigating from /service/bg-remove to an unknown route removes the service metadata and restores DEFAULT_TITLE
manager.setRoute('/some/unknown/route-after-bg-remove');
assert.equal(document.title, DEFAULT_TITLE, 'Navigating to unknown route must restore DEFAULT_TITLE');
const managedTagsAfterUnknownBgRemove = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
assert.equal(managedTagsAfterUnknownBgRemove.length, 0, 'Navigating from /service/bg-remove to unknown route must remove all service metadata');

// 7. Navigating back to /service/bg-remove recreates the approved metadata
manager.setRoute('/service/bg-remove');
assert.equal(document.title, expectedBgRemoveTitle, 'Navigating back to /service/bg-remove recreates approved title');
assert.equal(document.head.querySelector('meta[name="description"]')?.getAttribute('content'), expectedBgRemoveDesc, 'Navigating back to /service/bg-remove recreates description');
assert.equal(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content'), expectedBgRemoveTitle);
assert.equal(document.head.querySelector('meta[property="og:description"]')?.getAttribute('content'), expectedBgRemoveDesc);
assert.equal(document.head.querySelector('meta[property="og:type"]')?.getAttribute('content'), 'website');
assert.equal(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content'), 'summary');
assert.equal(document.head.querySelector('meta[name="twitter:title"]')?.getAttribute('content'), expectedBgRemoveTitle);
assert.equal(document.head.querySelector('meta[name="twitter:description"]')?.getAttribute('content'), expectedBgRemoveDesc);
assert.equal(document.head.querySelector('link[rel="canonical"]'), null);
assert.equal(document.head.querySelector('meta[name="robots"]'), null);
assert.equal(document.head.querySelector('meta[property="og:image"]'), null);
assert.equal(document.head.querySelector('meta[name="twitter:image"]'), null);

console.log('✓ Unit Test 1e Passed: Approved background removal metadata, tag counts, absence of unapproved tags, and route lifecycle transitions verified.');

// ----------------------------------------------------------------------------
// Test 1f - 1k: Batch 1 & 2 Approved Service Metadata (unit & lifecycle tests)
// Helper for repeated route metadata assertions while keeping expected values explicit
// ----------------------------------------------------------------------------
function verifyServiceRouteLifecycle(
  testLabel: string,
  route: string,
  expectedTitle: string,
  expectedDesc: string
) {
  console.log(`\n[${testLabel}] Approved metadata on route "${route}"`);
  manager.setRoute(route);

  // 1. Exact title
  assert.equal(document.title, expectedTitle, `Route ${route} must produce exact approved title`);

  // 2. Exactly one managed meta description
  const descTags = document.head.querySelectorAll('meta[name="description"]');
  assert.equal(descTags.length, 1, `Exactly one meta[name="description"] should exist on ${route}`);
  assert.equal(descTags[0].getAttribute('content'), expectedDesc, `Description must match approved copy on ${route}`);
  assert.equal(descTags[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE, `Description must be managed on ${route}`);

  // 3. Exactly one managed og:title, og:description, and og:type
  const ogTitles = document.head.querySelectorAll('meta[property="og:title"]');
  assert.equal(ogTitles.length, 1, `Exactly one meta[property="og:title"] should exist on ${route}`);
  assert.equal(ogTitles[0].getAttribute('content'), expectedTitle);
  assert.equal(ogTitles[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

  const ogDescs = document.head.querySelectorAll('meta[property="og:description"]');
  assert.equal(ogDescs.length, 1, `Exactly one meta[property="og:description"] should exist on ${route}`);
  assert.equal(ogDescs[0].getAttribute('content'), expectedDesc);
  assert.equal(ogDescs[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

  const ogTypes = document.head.querySelectorAll('meta[property="og:type"]');
  assert.equal(ogTypes.length, 1, `Exactly one meta[property="og:type"] should exist on ${route}`);
  assert.equal(ogTypes[0].getAttribute('content'), 'website');
  assert.equal(ogTypes[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

  // 4. Exactly one managed twitter:card, twitter:title, and twitter:description
  const twitterCards = document.head.querySelectorAll('meta[name="twitter:card"]');
  assert.equal(twitterCards.length, 1, `Exactly one meta[name="twitter:card"] should exist on ${route}`);
  assert.equal(twitterCards[0].getAttribute('content'), 'summary');
  assert.equal(twitterCards[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

  const twitterTitles = document.head.querySelectorAll('meta[name="twitter:title"]');
  assert.equal(twitterTitles.length, 1, `Exactly one meta[name="twitter:title"] should exist on ${route}`);
  assert.equal(twitterTitles[0].getAttribute('content'), expectedTitle);
  assert.equal(twitterTitles[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

  const twitterDescs = document.head.querySelectorAll('meta[name="twitter:description"]');
  assert.equal(twitterDescs.length, 1, `Exactly one meta[name="twitter:description"] should exist on ${route}`);
  assert.equal(twitterDescs[0].getAttribute('content'), expectedDesc);
  assert.equal(twitterDescs[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

  // 5. No canonical, robots, og:image, or twitter:image tags
  assert.equal(document.head.querySelector('link[rel="canonical"]'), null, `canonical link must NOT be present on ${route}`);
  assert.equal(document.head.querySelector('meta[name="robots"]'), null, `robots tag must NOT be present on ${route}`);
  assert.equal(document.head.querySelector('meta[property="og:image"]'), null, `og:image must NOT be present on ${route}`);
  assert.equal(document.head.querySelector('meta[name="twitter:image"]'), null, `twitter:image must NOT be present on ${route}`);

  // 6. Navigating to an unknown route removes all route metadata and restores DEFAULT_TITLE
  manager.setRoute(`/some/unknown/route-after-${route.replace(/[^a-zA-Z0-9]/g, '_')}`);
  assert.equal(document.title, DEFAULT_TITLE, `Navigating to unknown route must restore DEFAULT_TITLE from ${route}`);
  const managedTagsAfterUnknown = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
  assert.equal(managedTagsAfterUnknown.length, 0, `Navigating from ${route} to unknown route must remove all service metadata`);

  // 7. Navigating back recreates the exact metadata
  manager.setRoute(route);
  assert.equal(document.title, expectedTitle, `Navigating back to ${route} recreates approved title`);
  assert.equal(document.head.querySelector('meta[name="description"]')?.getAttribute('content'), expectedDesc);
  assert.equal(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content'), expectedTitle);
  assert.equal(document.head.querySelector('meta[property="og:description"]')?.getAttribute('content'), expectedDesc);
  assert.equal(document.head.querySelector('meta[property="og:type"]')?.getAttribute('content'), 'website');
  assert.equal(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content'), 'summary');
  assert.equal(document.head.querySelector('meta[name="twitter:title"]')?.getAttribute('content'), expectedTitle);
  assert.equal(document.head.querySelector('meta[name="twitter:description"]')?.getAttribute('content'), expectedDesc);
  assert.equal(document.head.querySelector('link[rel="canonical"]'), null);
  assert.equal(document.head.querySelector('meta[name="robots"]'), null);
  assert.equal(document.head.querySelector('meta[property="og:image"]'), null);
  assert.equal(document.head.querySelector('meta[name="twitter:image"]'), null);

  console.log(`✓ ${testLabel} Passed: Approved metadata, tag counts, absence of unapproved tags, and route lifecycle transitions verified.`);
}

// ----------------------------------------------------------------------------
// Test 1f: Approved Video Generation Service metadata on route "/service/video" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedVideoTitle = 'لوما | ساخت ویدیو با هوش مصنوعی';
const expectedVideoDesc =
  'با سرویس ساخت ویدیو لوما، از متن و تصویر ویدیو بسازید یا با استفاده از ویدیوهای مرجع، محتوای متحرک خلق کنید.';
verifyServiceRouteLifecycle('Unit Test 1f', '/service/video', expectedVideoTitle, expectedVideoDesc);

// ----------------------------------------------------------------------------
// Test 1g: Approved Image Upscale Service metadata on route "/service/upscale" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedUpscaleTitle = 'لوما | افزایش کیفیت تصویر با هوش مصنوعی';
const expectedUpscaleDesc =
  'با ابزار افزایش کیفیت تصویر لوما، وضوح و جزئیات تصاویر را بهبود دهید، نویز را حذف کنید و عکس‌های قدیمی را بازسازی کنید.';
verifyServiceRouteLifecycle('Unit Test 1g', '/service/upscale', expectedUpscaleTitle, expectedUpscaleDesc);

// ----------------------------------------------------------------------------
// Test 1h: Approved Smart Assistant Service metadata on route "/service/assistant" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedAssistantTitle = 'لوما | ساخت دستیار هوشمند برای پشتیبانی مشتریان';
const expectedAssistantDesc =
  'با ساخت دستیار هوشمند لوما، نماینده‌ای ۲۴ ساعته بسازید که با مطالعه مستندات و وب‌سایت شما به سؤال‌های مشتریان پاسخ می‌دهد.';
verifyServiceRouteLifecycle('Unit Test 1h', '/service/assistant', expectedAssistantTitle, expectedAssistantDesc);

// ----------------------------------------------------------------------------
// Test 1i: Approved Chat Service metadata on route "/service/chat" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedChatTitle = 'لوما | چت هوشمند با هوش مصنوعی';
const expectedChatDesc =
  'با چت هوشمند لوما درباره موضوعات مختلف گفتگو کنید، پاسخ بگیرید و از ابزارهای متنی هوش مصنوعی در محیطی یکپارچه استفاده کنید.';
verifyServiceRouteLifecycle('Unit Test 1i', '/service/chat', expectedChatTitle, expectedChatDesc);

// ----------------------------------------------------------------------------
// Test 1j: Approved Try-On Service metadata on route "/service/try-on" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedTryOnTitle = 'لوما | پوشاندن لباس با هوش مصنوعی';
const expectedTryOnDesc =
  'با ابزار پوشاندن لباس لوما، لباس‌های مختلف را به‌صورت مجازی روی تصویر امتحان کنید و نتیجه را سریع‌تر بررسی کنید.';
verifyServiceRouteLifecycle('Unit Test 1j', '/service/try-on', expectedTryOnTitle, expectedTryOnDesc);

// ----------------------------------------------------------------------------
// Test 1k: Approved Text-to-Speech Service metadata on route "/service/text-to-speech" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedTtsTitle = 'لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای';
const expectedTtsDesc =
  'با ابزار تبدیل متن به گفتار لوما، متن‌های خود را به صدایی طبیعی و حرفه‌ای تبدیل کنید.';
verifyServiceRouteLifecycle('Unit Test 1k', '/service/text-to-speech', expectedTtsTitle, expectedTtsDesc);

// ----------------------------------------------------------------------------
// Test 1l: Approved Video Enhancement Service metadata on route "/service/video-enhancement" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedVideoEnhanceTitle = 'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps';
const expectedVideoEnhanceDesc =
  'با ابزار افزایش کیفیت ویدئو لوما، وضوح و فریم‌ریت ویدئوهای خود را بهبود دهید و خروجی روان‌تر و باکیفیت‌تری بسازید.';
verifyServiceRouteLifecycle('Unit Test 1l', '/service/video-enhancement', expectedVideoEnhanceTitle, expectedVideoEnhanceDesc);

// ----------------------------------------------------------------------------
// Test 1m: Approved Workflow Service metadata on route "/service/workflow" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedWorkflowTitle = 'لوما | ورک‌فلوها - بوم بصری ساخت فرآیندهای چندمرحله‌ای';
const expectedWorkflowDesc =
  'با ورک‌فلوهای لوما، فرآیندهای چندمرحله‌ای تولید محتوا را در یک بوم بصری طراحی و اجرا کنید.';
verifyServiceRouteLifecycle('Unit Test 1m', '/service/workflow', expectedWorkflowTitle, expectedWorkflowDesc);

// ----------------------------------------------------------------------------
// Test 1n: Approved Solutions metadata on route "/solutions" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedSolutionsTitle = 'لوما | راهکارهای سازمانی هوش مصنوعی';
const expectedSolutionsDesc =
  'راهکارهای سازمانی لوما برای کمک به تیم‌ها و کسب‌وکارها در استفاده از ابزارهای هوش مصنوعی و مدیریت فرآیندهای کاری.';
verifyServiceRouteLifecycle('Unit Test 1n', '/solutions', expectedSolutionsTitle, expectedSolutionsDesc);

// ----------------------------------------------------------------------------
// Test 1o: Approved Pricing metadata on route "/pricing" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedPricingTitle = 'لوما | تعرفه‌ها و قیمت‌گذاری خدمات هوش مصنوعی';
const expectedPricingDesc =
  'تعرفه‌ها و هزینه استفاده از ابزارهای هوش مصنوعی لوما را ببینید و اعتبار مورد نیاز خود را انتخاب کنید.';
verifyServiceRouteLifecycle('Unit Test 1o', '/pricing', expectedPricingTitle, expectedPricingDesc);

// ----------------------------------------------------------------------------
// Test 1p: Approved Subscription metadata on route "/subscription" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedSubscriptionTitle = 'لوما | پلن‌های اشتراک';
const expectedSubscriptionDesc =
  'پلن‌های اشتراک لوما را مقایسه کنید و با انتخاب پلن مناسب، به ابزارهای هوش مصنوعی و اعتبار مورد نیاز خود دسترسی داشته باشید.';
verifyServiceRouteLifecycle('Unit Test 1p', '/subscription', expectedSubscriptionTitle, expectedSubscriptionDesc);

// ----------------------------------------------------------------------------
// Test 1q: Approved Security metadata on route "/security" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedSecurityTitle = 'لوما | امنیت و حریم خصوصی';
const expectedSecurityDesc =
  'با راهکارهای امنیتی لوما برای حفاظت از داده‌ها و استفاده سازمانی از خدمات هوش مصنوعی آشنا شوید.';
verifyServiceRouteLifecycle('Unit Test 1q', '/security', expectedSecurityTitle, expectedSecurityDesc);

// ----------------------------------------------------------------------------
// Test 1r: Approved About metadata on route "/about" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedAboutTitle = 'لوما | درباره ما';
const expectedAboutDesc =
  'با داستان شکل‌گیری لوما، ارزش‌ها و رویکرد ما برای ارائه ابزارهای هوش مصنوعی آشنا شوید.';
verifyServiceRouteLifecycle('Unit Test 1r', '/about', expectedAboutTitle, expectedAboutDesc);

// ----------------------------------------------------------------------------
// Test 1s: Approved Gallery metadata on route "/gallery" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedGalleryTitle = 'لوما | گالری نمونه‌کارهای هوش مصنوعی';
const expectedGalleryDesc =
  'نمونه‌کارهای تولیدشده با ابزارهای هوش مصنوعی لوما را ببینید و با پرامپت‌های استفاده‌شده برای خلق آن‌ها آشنا شوید.';
verifyServiceRouteLifecycle('Unit Test 1s', '/gallery', expectedGalleryTitle, expectedGalleryDesc);

// ----------------------------------------------------------------------------
// Test 1t: Approved Tutorials metadata on route "/tutorials" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedTutorialsTitle = 'لوما | آموزش و راهنمای ابزارهای هوش مصنوعی';
const expectedTutorialsDesc =
  'با آموزش‌های و راهنماهای گام‌به‌گام لوما، نحوه استفاده از ابزارهای هوش مصنوعی و ساخت محتوای خلاقانه را یاد بگیرید.';
verifyServiceRouteLifecycle('Unit Test 1t', '/tutorials', expectedTutorialsTitle, expectedTutorialsDesc);

// ----------------------------------------------------------------------------
// Test 1u: Approved Docs metadata on route "/docs" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedDocsTitle = 'لوما | مستندات فنی و API';
const expectedDocsDesc =
  'مستندات فنی لوما برای آشنایی با API، سرویس‌ها و نحوه استفاده از قابلیت‌های پلتفرم.';
verifyServiceRouteLifecycle('Unit Test 1u', '/docs', expectedDocsTitle, expectedDocsDesc);

// ----------------------------------------------------------------------------
// Test 1v: Approved Contact metadata on route "/contact" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedContactTitle = 'لوما | تماس با ما';
const expectedContactDesc =
  'برای دریافت راهنمایی، طرح پرسش یا مشاوره درباره خدمات لوما با ما در تماس باشید.';
verifyServiceRouteLifecycle('Unit Test 1v', '/contact', expectedContactTitle, expectedContactDesc);

// ----------------------------------------------------------------------------
// Test 1w: Approved Blog metadata on route "/blog" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedBlogTitle = 'لوما | وبلاگ هوش مصنوعی';
const expectedBlogDesc =
  'مقالات و آموزش‌های لوما درباره ابزارهای هوش مصنوعی، تولید محتوا و استفاده کاربردی از مدل‌های هوشمند.';
verifyServiceRouteLifecycle('Unit Test 1w', '/blog', expectedBlogTitle, expectedBlogDesc);

// ----------------------------------------------------------------------------
// Test 1x: Approved Privacy metadata on route "/privacy" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedPrivacyTitle = 'لوما | حریم خصوصی';
const expectedPrivacyDesc =
  'در این صفحه با سیاست حریم خصوصی لوما و نحوه مدیریت و استفاده از اطلاعات کاربران آشنا شوید.';
verifyServiceRouteLifecycle('Unit Test 1x', '/privacy', expectedPrivacyTitle, expectedPrivacyDesc);

// ----------------------------------------------------------------------------
// Test 1y: Approved Terms metadata on route "/terms" (unit & lifecycle test)
// ----------------------------------------------------------------------------
const expectedTermsTitle = 'لوما | شرایط استفاده';
const expectedTermsDesc =
  'در این صفحه شرایط و ضوابط استفاده از خدمات و پلتفرم لوما را مطالعه کنید.';
verifyServiceRouteLifecycle('Unit Test 1y', '/terms', expectedTermsTitle, expectedTermsDesc);

// ----------------------------------------------------------------------------
// Test 1z: Dynamic Blog Post metadata on route "/blog/:id" (unit & lifecycle test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 1z] Dynamic Blog Post metadata on route "/blog/:id" (unit & lifecycle test)');

// 1. Static ROUTE_METADATA does NOT contain dynamic blog routes
assert.equal(ROUTE_METADATA['/blog/:id'], undefined, 'ROUTE_METADATA must not contain /blog/:id');
assert.equal(ROUTE_METADATA['/blog/post-1'], undefined, 'ROUTE_METADATA must not contain dynamic slugs');

// 2. Loading state: no stale article metadata, restores DEFAULT_TITLE and clears managed tags
manager.setRoute('/blog/post-1');
assert.equal(document.title, DEFAULT_TITLE, 'Loading article route must fall back to DEFAULT_TITLE');
assert.equal(
  document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`).length,
  0,
  'No managed SEO tags should exist while article is loading'
);

// 3. Valid post loaded: register page override with resolved post data
const mockPost1 = {
  id: 'post-1',
  title: 'راهنمای جامع هوش مصنوعی در سال ۲۰۲۵',
  slug: 'post-1',
  shortDescription: 'در این مقاله با جدیدترین روندهای هوش مصنوعی و کاربردهای آن در کسب‌وکارها آشنا می‌شوید.',
  tags: ['هوش مصنوعی', 'تکنولوژی'],
};
const excerpt1 = resolveExcerpt(mockPost1);
const expectedArticle1Title = `${mockPost1.title} | وبلاگ لوما`;

manager.registerOverride(
  'blog-post-page-override',
  {
    title: expectedArticle1Title,
    description: excerpt1,
    ogTitle: expectedArticle1Title,
    ogDescription: excerpt1,
    ogType: 'article',
    twitterCard: 'summary',
    twitterTitle: expectedArticle1Title,
    twitterDescription: excerpt1,
  },
  '/blog/post-1'
);

assert.equal(document.title, expectedArticle1Title, 'Article title must match ${post.title} | وبلاگ لوما');
const articleDescTags = document.head.querySelectorAll('meta[name="description"]');
assert.equal(articleDescTags.length, 1, 'Exactly one meta[name="description"] on article page');
assert.equal(articleDescTags[0].getAttribute('content'), excerpt1);
assert.equal(articleDescTags[0].getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE);

const articleOgTitles = document.head.querySelectorAll('meta[property="og:title"]');
assert.equal(articleOgTitles.length, 1);
assert.equal(articleOgTitles[0].getAttribute('content'), expectedArticle1Title);

const articleOgDescs = document.head.querySelectorAll('meta[property="og:description"]');
assert.equal(articleOgDescs.length, 1);
assert.equal(articleOgDescs[0].getAttribute('content'), excerpt1);

const articleOgTypes = document.head.querySelectorAll('meta[property="og:type"]');
assert.equal(articleOgTypes.length, 1);
assert.equal(articleOgTypes[0].getAttribute('content'), 'article');

const articleTwitterCards = document.head.querySelectorAll('meta[name="twitter:card"]');
assert.equal(articleTwitterCards.length, 1);
assert.equal(articleTwitterCards[0].getAttribute('content'), 'summary');

const articleTwitterTitles = document.head.querySelectorAll('meta[name="twitter:title"]');
assert.equal(articleTwitterTitles.length, 1);
assert.equal(articleTwitterTitles[0].getAttribute('content'), expectedArticle1Title);

const articleTwitterDescs = document.head.querySelectorAll('meta[name="twitter:description"]');
assert.equal(articleTwitterDescs.length, 1);
assert.equal(articleTwitterDescs[0].getAttribute('content'), excerpt1);

// Strictly NO unapproved tags
assert.equal(document.head.querySelector('link[rel="canonical"]'), null);
assert.equal(document.head.querySelector('meta[name="robots"]'), null);
assert.equal(document.head.querySelector('meta[property="og:image"]'), null);
assert.equal(document.head.querySelector('meta[name="twitter:image"]'), null);

// 4. Navigate from article A to article B:
// Route changes to /blog/post-2, loading begins -> metadata cleared
manager.setRoute('/blog/post-2');
manager.updateOverride('blog-post-page-override', undefined);
assert.equal(document.title, DEFAULT_TITLE, 'Stale title from article A removed while article B is loading');
assert.equal(
  document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`).length,
  0,
  'Stale meta tags from article A removed while article B is loading'
);

// Article B loads
const mockPost2 = {
  id: 'post-2',
  title: 'تکنیک‌های پیشرفته پرامپت‌نویسی',
  slug: 'post-2',
  fullDescription: 'آموزش جامع مهندسی پرامپت برای دریافت بهترین خروجی از مدل‌های زبانی بزرگ.',
};
const excerpt2 = resolveExcerpt(mockPost2);
const expectedArticle2Title = `${mockPost2.title} | وبلاگ لوما`;

manager.registerOverride(
  'blog-post-page-override',
  {
    title: expectedArticle2Title,
    description: excerpt2,
    ogTitle: expectedArticle2Title,
    ogDescription: excerpt2,
    ogType: 'article',
    twitterCard: 'summary',
    twitterTitle: expectedArticle2Title,
    twitterDescription: excerpt2,
  },
  '/blog/post-2'
);

assert.equal(document.title, expectedArticle2Title, 'Article B title applied');
assert.equal(document.head.querySelector('meta[name="description"]')?.getAttribute('content'), excerpt2);
assert.equal(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content'), expectedArticle2Title);
assert.equal(document.head.querySelector('meta[property="og:description"]')?.getAttribute('content'), excerpt2);
assert.equal(document.head.querySelector('meta[property="og:type"]')?.getAttribute('content'), 'article');

// 5. Navigate from article B to another route (e.g. /privacy)
manager.setRoute('/privacy');
manager.unregisterOverride('blog-post-page-override');
assert.equal(document.title, expectedPrivacyTitle, 'Title restored to approved privacy title');
assert.equal(document.head.querySelector('meta[name="description"]')?.getAttribute('content'), expectedPrivacyDesc);
assert.equal(document.head.querySelector('meta[property="og:type"]')?.getAttribute('content'), 'website');

// 6. Unknown / not-found article: restore fallback title and remove stale tags
manager.setRoute('/blog/unknown-post-404');
manager.unregisterOverride('blog-post-page-override');
assert.equal(document.title, DEFAULT_TITLE, 'Unknown article must restore DEFAULT_TITLE');
assert.equal(
  document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`).length,
  0,
  'Unknown article must have no stray or stale tags'
);

console.log('✓ Unit Test 1z Passed: Dynamic blog post SEO metadata lifecycle, transitions, and cleanup verified.');

// ----------------------------------------------------------------------------
// Test 2: Configured route metadata for service routes (unit test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 2] Configured route metadata for verified service routes');
const expectedTitles: Record<string, string> = {
  '/service/video-enhancement': 'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps',
  '/service/text-to-speech': 'لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای',
  '/service/workflow': 'لوما | ورک‌فلوها - بوم بصری ساخت فرآیندهای چندمرحله‌ای',
  '/solutions': 'لوما | راهکارهای سازمانی هوش مصنوعی',
  '/pricing': 'لوما | تعرفه‌ها و قیمت‌گذاری خدمات هوش مصنوعی',
  '/subscription': 'لوما | پلن‌های اشتراک',
  '/security': 'لوما | امنیت و حریم خصوصی',
  '/about': 'لوما | درباره ما',
  '/gallery': 'لوما | گالری نمونه‌کارهای هوش مصنوعی',
  '/tutorials': 'لوما | آموزش و راهنمای ابزارهای هوش مصنوعی',
  '/docs': 'لوما | مستندات فنی و API',
  '/contact': 'لوما | تماس با ما',
  '/blog': 'لوما | وبلاگ هوش مصنوعی',
  '/privacy': 'لوما | حریم خصوصی',
  '/terms': 'لوما | شرایط استفاده',
};

for (const [route, expectedTitle] of Object.entries(expectedTitles)) {
  manager.setRoute(route);
  assert.equal(document.title, expectedTitle, `Route ${route} title must strictly match`);
}
console.log('✓ Unit Test 2 Passed: Verified service, solutions, pricing, subscription, security, about, gallery, tutorials, docs, contact, blog, privacy, and terms titles matched exactly.');

// ----------------------------------------------------------------------------
// Test 3: Page-level override precedence (unit test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 3] Page-level override precedence (active override > route fallback > default)');
manager.setRoute('/service/video-enhancement');
assert.equal(document.title, 'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps');

manager.registerOverride(
  'override-1',
  {
    title: 'تست عنوان سفارشی ویدئو',
    description: 'توضیحات تست ویدئو',
    ogTitle: 'OG عنوان تست',
    robots: 'noindex, nofollow',
  },
  '/service/video-enhancement'
);

assert.equal(document.title, 'تست عنوان سفارشی ویدئو', 'Page-level override title must take precedence');
const descTag = document.head.querySelector('meta[name="description"]');
assert.ok(descTag, 'Description tag should be created');
assert.equal(descTag.getAttribute('content'), 'توضیحات تست ویدئو');
assert.equal(descTag.getAttribute(SEO_TAG_ATTR), SEO_TAG_VALUE, 'Managed tag must have data-luma-seo="true"');

const robotsTag = document.head.querySelector('meta[name="robots"]');
assert.ok(robotsTag, 'Robots tag should be created');
assert.equal(robotsTag.getAttribute('content'), 'noindex, nofollow');

// Re-setting the route does not overwrite the active page override
manager.setRoute('/service/video-enhancement');
assert.equal(document.title, 'تست عنوان سفارشی ویدئو', 'Route sync must not overwrite active page override');
console.log('✓ Unit Test 3 Passed: Page-level override takes precedence over route fallback.');

// ----------------------------------------------------------------------------
// Test 4: Exported helper / direct metadata call cannot bypass active page override (unit test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 4] Exported helper / direct metadata call cannot override active page override');
// Active override 'override-1' is currently active on '/service/video-enhancement'
assert.equal(document.title, 'تست عنوان سفارشی ویدئو');

// Attempt to call direct metadata helper
manager.setDirectMetadata({
  title: 'تلاش برای بازنویسی مستقیم عنوان',
  description: 'تلاش برای بازنویسی مستقیم توضیحات',
  ogTitle: 'تلاش برای بازنویسی مستقیم OG',
});

// Title and description MUST NOT be overwritten because active override has strict precedence!
assert.equal(
  document.title,
  'تست عنوان سفارشی ویدئو',
  'Active page override title MUST NOT be overwritten by direct metadata call'
);
const descStillOverride = document.head.querySelector('meta[name="description"]');
assert.equal(
  descStillOverride?.getAttribute('content'),
  'توضیحات تست ویدئو',
  'Active page override description MUST NOT be overwritten by direct metadata call'
);

// Clear direct metadata
manager.setDirectMetadata(null);
assert.equal(document.title, 'تست عنوان سفارشی ویدئو', 'Title still remains active override title');
console.log('✓ Unit Test 4 Passed: Direct metadata calls strictly respect active page override precedence.');

// ----------------------------------------------------------------------------
// Test 5: Override cleanup & route fallback restoration (unit test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 5] Override cleanup and route fallback restoration');
manager.unregisterOverride('override-1');
assert.equal(
  document.title,
  'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps',
  'Unregistering override must restore route fallback title'
);
const descTagAfterUnregister = document.head.querySelector('meta[name="description"]');
assert.equal(
  descTagAfterUnregister?.getAttribute('content'),
  expectedVideoEnhanceDesc,
  'Unregistering override must restore route fallback description'
);
const robotsAfterUnregister = document.head.querySelector('meta[name="robots"]');
assert.equal(robotsAfterUnregister, null, 'Override-only tags like robots must be cleanly removed on unregister');
console.log('✓ Unit Test 5 Passed: Unregistering override restored route fallback and removed tags.');

// ----------------------------------------------------------------------------
// Test 6: Handling metadata changing to undefined or empty while registered (unit test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 6] Override changing to undefined while registered immediately unregisters');
manager.setRoute('/unconfigured-sandbox');
assert.equal(document.title, DEFAULT_TITLE);

// Register an override with comprehensive fields
manager.registerOverride(
  'dynamic-workflow-override',
  {
    title: 'تست ورک‌فلو پویا',
    description: 'توضیح موقت ورک‌فلو',
    robots: 'noindex, follow',
    ogTitle: 'OG Title Workflow',
    ogDescription: 'OG Desc Workflow',
    ogType: 'website',
    ogImage: 'https://example.com/workflow.jpg',
    twitterCard: 'summary',
    twitterTitle: 'Twitter Title Workflow',
    twitterDescription: 'Twitter Desc Workflow',
    twitterImage: 'https://example.com/workflow.jpg',
    canonical: 'https://example.com/workflow',
  },
  '/unconfigured-sandbox'
);

assert.equal(document.title, 'تست ورک‌فلو پویا');
const managedTagsBeforeUndefined = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
assert.ok(managedTagsBeforeUndefined.length >= 8, 'All specified tags should be registered');

// Update override to undefined while still registered
manager.updateOverride('dynamic-workflow-override', undefined);

// Title must immediately restore to route fallback
assert.equal(
  document.title,
  DEFAULT_TITLE,
  'Title must immediately restore to route fallback when metadata becomes undefined'
);

// Stale managed tags must all be removed immediately
const managedTagsAfterUndefined = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
assert.equal(
  managedTagsAfterUndefined.length,
  0,
  'All managed tags must be removed when metadata becomes undefined'
);
console.log('✓ Unit Test 6 Passed: Setting metadata to undefined immediately unregisters override and clears stale tags.');

// Also test updating override to an empty object (all fields empty/whitespace)
manager.registerOverride(
  'whitespace-test',
  { title: 'عنوان تست', description: 'توضیح تست' },
  '/unconfigured-sandbox'
);
assert.equal(document.title, 'عنوان تست');
manager.registerOverride(
  'whitespace-test',
  { title: '   ', description: '' },
  '/unconfigured-sandbox'
);
assert.equal(
  document.title,
  DEFAULT_TITLE,
  'Empty/whitespace metadata must unregister override and restore route fallback'
);
assert.equal(document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`).length, 0);
console.log('✓ Unit Test 6b Passed: Empty/whitespace metadata also clears override safely.');

// ----------------------------------------------------------------------------
// Test 7: Stale managed tags removal and route transition cleanup (unit test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 7] Route transition cleanup removes stale tags');
manager.setRoute('/blog/sample-post');
manager.registerOverride('blog-override', {
  title: 'پست بلاگ تستی',
  description: 'محتوای بلاگ',
  ogImage: 'https://example.com/image.jpg',
}, '/blog/sample-post');

assert.equal(document.title, 'پست بلاگ تستی');
assert.ok(document.head.querySelector('meta[property="og:image"]'), 'OG Image tag present on blog route');

// Navigate to another route without overrides
manager.setRoute('/unconfigured-sandbox');
assert.equal(
  document.title,
  DEFAULT_TITLE,
  'Title updated to new route'
);
assert.equal(
  document.head.querySelector('meta[property="og:image"]'),
  null,
  'Stale og:image tag from previous route must be removed'
);
assert.equal(
  document.head.querySelector('meta[name="description"]'),
  null,
  'Stale description tag from previous route must be removed'
);
console.log('✓ Unit Test 7 Passed: Route transitions cleanly strip stale tags.');

// ----------------------------------------------------------------------------
// Test 8: Duplicate prevention across repeated calls (unit test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 8] Duplicate prevention on repeated registrations');
manager.setRoute('/service/video-enhancement');
for (let i = 0; i < 5; i++) {
  manager.registerOverride(
    'dup-test',
    {
      title: 'عنوان مکرر',
      description: 'توضیح مکرر',
      canonical: 'https://example.com/canonical',
    },
    '/service/video-enhancement'
  );
}

const allDescriptions = document.head.querySelectorAll('meta[name="description"]');
assert.equal(allDescriptions.length, 1, 'Exactly one meta[name="description"] should exist');
const allCanonicals = document.head.querySelectorAll('link[rel="canonical"]');
assert.equal(allCanonicals.length, 1, 'Exactly one canonical link should exist');
manager.unregisterOverride('dup-test');
console.log('✓ Unit Test 8 Passed: Repeated registrations never create duplicate tags.');

// ----------------------------------------------------------------------------
// Test 9: Preservation of unrelated head tags & baseline preservation (unit test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 9] Preservation of unrelated head tags and unmanaged baselines');
const charsetMeta = mockDoc.createElement('meta');
charsetMeta.setAttribute('charset', 'UTF-8');
mockDoc.head.appendChild(charsetMeta);

const viewportMeta = mockDoc.createElement('meta');
viewportMeta.setAttribute('name', 'viewport');
viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
mockDoc.head.appendChild(viewportMeta);

const existingDesc = mockDoc.createElement('meta');
existingDesc.setAttribute('name', 'description');
existingDesc.setAttribute('content', 'توضیحات پیش‌فرض سایت');
mockDoc.head.appendChild(existingDesc);

// Override description on an unconfigured route
manager.setRoute('/unconfigured-test-route');
manager.registerOverride('desc-override', {
  description: 'توضیحات صفحه جدید',
}, '/unconfigured-test-route');

assert.equal(existingDesc.getAttribute('content'), 'توضیحات صفحه جدید');
assert.equal(existingDesc.hasAttribute(SEO_TAG_ATTR), false, 'Pre-existing tag must NEVER receive data-luma-seo');

// Unregister override -> baseline restored
manager.unregisterOverride('desc-override');
assert.equal(
  existingDesc.getAttribute('content'),
  'توضیحات پیش‌فرض سایت',
  'Pre-existing baseline tag must be restored to original value on unmount'
);
assert.equal(
  existingDesc.parentNode !== null,
  true,
  'Pre-existing baseline tag must NEVER be removed from document.head'
);

// Verify unrelated tags were completely untouched
assert.equal(charsetMeta.getAttribute('charset'), 'UTF-8');
assert.equal(charsetMeta.hasAttribute(SEO_TAG_ATTR), false);
assert.equal(viewportMeta.getAttribute('content'), 'width=device-width, initial-scale=1.0');
assert.equal(viewportMeta.hasAttribute(SEO_TAG_ATTR), false);
console.log('✓ Unit Test 9 Passed: Unrelated tags and pre-existing baselines strictly preserved.');

// ----------------------------------------------------------------------------
// Test 10: Unknown-route fallback (unit test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 10] Unknown-route fallback preserves DEFAULT_TITLE');
manager.setRoute('/some/completely/unknown/path-12345');
assert.equal(document.title, DEFAULT_TITLE, 'Unknown routes must fall back to DEFAULT_TITLE');
const unknownManaged = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
assert.equal(unknownManaged.length, 0, 'Unknown routes must not generate stray tags');
console.log('✓ Unit Test 10 Passed: Unknown route cleanly restores DEFAULT_TITLE.');

// ----------------------------------------------------------------------------
// Test 11: Transitioning from unknown route back to Homepage applies full approved metadata
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 11] Navigation from unknown route to Homepage');
manager.setRoute('/');
assert.equal(document.title, expectedHomeTitle, 'Title restored to approved homepage title');
assert.equal(
  document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
  expectedHomeDesc,
  'Homepage description applied on route transition'
);
assert.equal(
  document.head.querySelector('meta[property="og:type"]')?.getAttribute('content'),
  'website',
  'Homepage og:type applied'
);
assert.equal(
  document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content'),
  'summary',
  'Homepage twitter:card applied'
);
console.log('✓ Unit Test 11 Passed: Navigating back to homepage applies all approved metadata.');

// ----------------------------------------------------------------------------
// Test 12: isEmptyMetadata helper unit tests
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 12] isEmptyMetadata utility verification');
assert.equal(isEmptyMetadata(undefined), true, 'undefined is empty');
assert.equal(isEmptyMetadata(null), true, 'null is empty');
assert.equal(isEmptyMetadata({}), true, 'empty object is empty');
assert.equal(isEmptyMetadata({ title: '   ', description: '' }), true, 'whitespace-only fields are empty');
assert.equal(isEmptyMetadata({ title: 'Non empty' }), false, 'non-empty title is not empty');
assert.equal(isEmptyMetadata({ robots: 'noindex' }), false, 'non-empty robots is not empty');
console.log('✓ Unit Test 12 Passed: isEmptyMetadata utility functions accurately.');

console.log('\n================================================================');
console.log('ALL SEOMANAGER UNIT & STATE LIFECYCLE TESTS PASSED!');
console.log('================================================================\n');
