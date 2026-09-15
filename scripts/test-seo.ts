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
// Test 2: Configured route metadata for service routes (unit test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 2] Configured route metadata for verified service routes');
const expectedTitles: Record<string, string> = {
  '/service/video-enhancement': 'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps',
  '/service/text-to-speech': 'لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای',
  '/service/workflow': 'لوما | ورک‌فلوها - بوم بصری ساخت فرآیندهای چندمرحله‌ای',
};

for (const [route, expectedTitle] of Object.entries(expectedTitles)) {
  manager.setRoute(route);
  assert.equal(document.title, expectedTitle, `Route ${route} title must strictly match`);
}
console.log('✓ Unit Test 2 Passed: VideoEnhancement, TextToSpeech, and Workflow titles matched exactly.');

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
assert.equal(descTagAfterUnregister, null, 'Unregistered metadata tags must be cleanly removed on route without route description');
console.log('✓ Unit Test 5 Passed: Unregistering override restored route fallback and removed tags.');

// ----------------------------------------------------------------------------
// Test 6: Handling metadata changing to undefined or empty while registered (unit test)
// ----------------------------------------------------------------------------
console.log('\n[Unit Test 6] Override changing to undefined while registered immediately unregisters');
manager.setRoute('/service/text-to-speech');
assert.equal(document.title, 'لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای');

// Register an override with comprehensive fields
manager.registerOverride(
  'dynamic-tts-override',
  {
    title: 'تست متن به گفتار پویا',
    description: 'توضیح موقت متن به گفتار',
    robots: 'noindex, follow',
    ogTitle: 'OG Title TTS',
    ogDescription: 'OG Desc TTS',
    ogType: 'audio',
    ogImage: 'https://example.com/audio.jpg',
    twitterCard: 'summary',
    twitterTitle: 'Twitter Title TTS',
    twitterDescription: 'Twitter Desc TTS',
    twitterImage: 'https://example.com/audio.jpg',
    canonical: 'https://example.com/tts',
  },
  '/service/text-to-speech'
);

assert.equal(document.title, 'تست متن به گفتار پویا');
const managedTagsBeforeUndefined = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
assert.ok(managedTagsBeforeUndefined.length >= 8, 'All specified tags should be registered');

// Update override to undefined while still registered
manager.updateOverride('dynamic-tts-override', undefined);

// Title must immediately restore to route fallback
assert.equal(
  document.title,
  'لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای',
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
  '/service/text-to-speech'
);
assert.equal(document.title, 'عنوان تست');
manager.registerOverride(
  'whitespace-test',
  { title: '   ', description: '' },
  '/service/text-to-speech'
);
assert.equal(
  document.title,
  'لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای',
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
manager.setRoute('/service/workflow');
assert.equal(
  document.title,
  'لوما | ورک‌فلوها - بوم بصری ساخت فرآیندهای چندمرحله‌ای',
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
console.log('ALL 12 SEOMANAGER UNIT & STATE LIFECYCLE TESTS PASSED!');
console.log('================================================================\n');
