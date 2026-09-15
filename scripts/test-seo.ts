/**
 * Deterministic Test Suite for Luma AI SEO Metadata Architecture
 * Tests:
 * 1. Default route metadata
 * 2. Configured route metadata (VideoEnhancement, TextToSpeech, Workflow)
 * 3. Page-level override precedence (active override > route fallback > default)
 * 4. Override cleanup after unmount (restores route fallback)
 * 5. Route transition cleanup (stale tags removed)
 * 6. Duplicate prevention (re-renders never duplicate managed tags)
 * 7. Preservation of unrelated head tags & baseline preservation without data-luma-seo
 * 8. Unknown-route fallback (restores DEFAULT_TITLE, no invented metadata)
 */

import assert from 'node:assert/strict';

// Simple lightweight in-memory DOM mock for Node environment
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
  // Supports selectors like:
  // meta[name="description"]
  // meta[name="description"][data-luma-seo="true"]
  // [data-luma-seo="true"]
  // link[rel="canonical"]
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
} = await import('../lib/seo.ts');

console.log('--- Starting Luma SEO Architecture Test Suite ---');

const manager = new SEOManager();

// Test 1: Default route metadata
console.log('\n[Test 1] Default route metadata');
manager.setRoute('/');
assert.equal(document.title, DEFAULT_TITLE, 'Root path title should match DEFAULT_TITLE');
const rootManagedTags = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
assert.equal(rootManagedTags.length, 0, 'Root path should have zero unnecessary managed tags');
console.log('✓ Test 1 Passed: Default title verified and no unnecessary tags generated.');

// Test 2: Configured route metadata
console.log('\n[Test 2] Configured route metadata for 3 service routes');
const expectedTitles: Record<string, string> = {
  '/service/video-enhancement': 'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps',
  '/service/text-to-speech': 'لوما | تبدیل متن به گفتار - صدای طبیعی و حرفه‌ای',
  '/service/workflow': 'لوما | ورک‌فلوها - بوم بصری ساخت فرآیندهای چندمرحله‌ای',
};

for (const [route, expectedTitle] of Object.entries(expectedTitles)) {
  manager.setRoute(route);
  assert.equal(document.title, expectedTitle, `Route ${route} title must strictly match`);
}
console.log('✓ Test 2 Passed: VideoEnhancement, TextToSpeech, and Workflow titles matched exactly.');

// Test 3: Page-level override precedence
console.log('\n[Test 3] Page-level override precedence (Override > Route > Default)');
manager.setRoute('/service/video-enhancement');
assert.equal(document.title, 'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps');

// Register an override on this route
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
console.log('✓ Test 3 Passed: Page-level override takes precedence over route fallback.');

// Test 4: Override cleanup after unmount
console.log('\n[Test 4] Override cleanup after unmount');
manager.unregisterOverride('override-1');
assert.equal(
  document.title,
  'لوما | افزایش کیفیت ویدئو با هوش مصنوعی - تا ۴K و ۶۰fps',
  'Unregistering override must restore route fallback title'
);
const descTagAfterUnregister = document.head.querySelector('meta[name="description"]');
assert.equal(descTagAfterUnregister, null, 'Unregistered metadata tags must be cleanly removed');
console.log('✓ Test 4 Passed: Unregistering override restored route fallback and removed tags.');

// Test 5: Route transition cleanup
console.log('\n[Test 5] Route transition cleanup');
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
console.log('✓ Test 5 Passed: Route transitions cleanly strip stale tags.');

// Test 6: Duplicate prevention
console.log('\n[Test 6] Duplicate prevention');
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
console.log('✓ Test 6 Passed: Repeated renders never create duplicate tags.');

// Test 7: Preservation of unrelated head tags & baseline preservation
console.log('\n[Test 7] Preservation of unrelated head tags');
// Add pre-existing static tags like in index.html
const charsetMeta = mockDoc.createElement('meta');
charsetMeta.setAttribute('charset', 'UTF-8');
mockDoc.head.appendChild(charsetMeta);

const viewportMeta = mockDoc.createElement('meta');
viewportMeta.setAttribute('name', 'viewport');
viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
mockDoc.head.appendChild(viewportMeta);

// Add a pre-existing description tag (unmanaged baseline)
const existingDesc = mockDoc.createElement('meta');
existingDesc.setAttribute('name', 'description');
existingDesc.setAttribute('content', 'توضیحات پیش‌فرض سایت');
mockDoc.head.appendChild(existingDesc);

// Now register an override that modifies description
manager.setRoute('/');
manager.registerOverride('desc-override', {
  description: 'توضیحات صفحه جدید',
}, '/');

// Check that existingDesc was updated without data-luma-seo
assert.equal(existingDesc.getAttribute('content'), 'توضیحات صفحه جدید');
assert.equal(existingDesc.hasAttribute(SEO_TAG_ATTR), false, 'Pre-existing tag must NEVER receive data-luma-seo');

// Unregister override -> existingDesc should be restored to baseline
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
console.log('✓ Test 7 Passed: Unrelated tags and pre-existing baselines strictly preserved.');

// Test 8: Unknown-route fallback
console.log('\n[Test 8] Unknown-route fallback');
manager.setRoute('/some/completely/unknown/path-12345');
assert.equal(document.title, DEFAULT_TITLE, 'Unknown routes must fall back to DEFAULT_TITLE');
const unknownManaged = document.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
assert.equal(unknownManaged.length, 0, 'Unknown routes must not generate stray tags');
console.log('✓ Test 8 Passed: Unknown route cleanly restores DEFAULT_TITLE.');

console.log('\n=============================================');
console.log('ALL 8 SEO ARCHITECTURE TESTS PASSED SUCCESSFULLY!');
console.log('=============================================\n');
