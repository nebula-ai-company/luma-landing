/**
 * Deterministic Test Suite for Luma AI Structured Data (JSON-LD) Architecture
 *
 * NOTE ON TEST CLASSIFICATION:
 * ============================================================================
 * The tests in this suite are "SEOManager / Structured Data Unit & State Lifecycle Tests".
 * They test the deterministic state machine, precedence resolution, JSON-LD script creation,
 * stale script removal, duplicate prevention, and source truthfulness on the
 * StructuredDataManager instance directly.
 *
 * React component integration testing into a full React fiber DOM tree requires
 * a full browser DOM or jsdom environment with window/event APIs, which is intentionally
 * excluded to avoid adding unapproved dependencies to package.json. React component
 * lifecycle coverage is NOT claimed here; only the underlying StructuredDataManager
 * state lifecycle is verified.
 * ============================================================================
 */

import assert from 'node:assert/strict';

// Lightweight in-memory DOM mock for Node test runner
class MockElement {
  public tagName: string;
  public attributes: Map<string, string> = new Map();
  public parentNode: MockElement | null = null;
  public children: MockElement[] = [];
  public textContent: string = '';

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

  public createElement(tagName: string): MockElement {
    return new MockElement(tagName);
  }
}

const mockDoc = new MockDocument();
(globalThis as any).document = mockDoc;
(globalThis as any).window = {
  location: { pathname: '/', hash: '' },
};

// Import modules after DOM globals are installed
const {
  StructuredDataManager,
  SCHEMA_TAG_ATTR,
  SCHEMA_TAG_VALUE,
  PRODUCTION_ORIGIN,
  LUMA_ORGANIZATION,
  LUMA_WEBSITE,
  ROUTE_STRUCTURED_DATA,
  LUMA_SERVICES,
  buildBlogPostStructuredData,
  buildBlogCollectionStructuredData,
} = await import('../lib/structuredData.ts');

const { ROUTE_METADATA } = await import('../lib/seo.ts');
const { resolveExcerpt } = await import('../lib/blogUtils.ts');

console.log('================================================================');
console.log('StructuredDataManager Unit & State Lifecycle Test Suite');
console.log('(SEOManager / Structured Data Unit & State Lifecycle Tests)');
console.log('================================================================');

const manager = new StructuredDataManager();

// Helper to retrieve currently managed JSON-LD script from DOM
function getManagedScript(): MockElement | null {
  return mockDoc.head.querySelector(`script[${SCHEMA_TAG_ATTR}="${SCHEMA_TAG_VALUE}"]`);
}

function parseManagedSchema(): any {
  const script = getManagedScript();
  assert.ok(script, 'Managed schema script must exist in DOM');
  assert.equal(
    script.getAttribute('type'),
    'application/ld+json',
    'Schema script must have type="application/ld+json"'
  );
  assert.equal(
    script.getAttribute(SCHEMA_TAG_ATTR),
    SCHEMA_TAG_VALUE,
    `Schema script must contain ${SCHEMA_TAG_ATTR}="${SCHEMA_TAG_VALUE}"`
  );
  return JSON.parse(script.textContent);
}

// ----------------------------------------------------------------------------
// Test 1: Homepage JSON-LD exists and is valid JSON
// ----------------------------------------------------------------------------
console.log('\n[Test 1] Homepage JSON-LD exists and is valid JSON');
manager.setRoute('/');
const homeJson = parseManagedSchema();
assert.ok(homeJson, 'Homepage JSON-LD must be parseable JSON');
assert.equal(homeJson['@context'], 'https://schema.org');
assert.ok(Array.isArray(homeJson['@graph']), 'Homepage schema must use @graph');
console.log('✓ Homepage JSON-LD exists and is valid JSON.');

// ----------------------------------------------------------------------------
// Test 2: Homepage contains Organization and WebSite
// ----------------------------------------------------------------------------
console.log('\n[Test 2] Homepage contains Organization and WebSite');
const graph = homeJson['@graph'];
const orgEntity = graph.find((e: any) => e['@type'] === 'Organization');
const webSiteEntity = graph.find((e: any) => e['@type'] === 'WebSite');

assert.ok(orgEntity, 'Homepage @graph must contain Organization');
assert.equal(orgEntity.name, 'لوما');
assert.equal(orgEntity.url, PRODUCTION_ORIGIN);

assert.ok(webSiteEntity, 'Homepage @graph must contain WebSite');
assert.equal(webSiteEntity.name, 'لوما');
assert.equal(webSiteEntity.url, PRODUCTION_ORIGIN);
assert.equal(webSiteEntity.description, ROUTE_METADATA['/'].description);
console.log('✓ Homepage contains truthful Organization and WebSite entities.');

// ----------------------------------------------------------------------------
// Test 3: No fake sameAs, logo, social, price, rating, or review fields are generated
// ----------------------------------------------------------------------------
console.log('\n[Test 3] No fake sameAs, logo, social, price, rating, or review fields');
for (const entity of graph) {
  assert.equal(entity.sameAs, undefined, 'Must not invent sameAs links');
  assert.equal(entity.logo, undefined, 'Must not invent unverified logo');
  assert.equal(entity.social, undefined, 'Must not invent social profiles');
  assert.equal(entity.price, undefined, 'Must not invent price');
  assert.equal(entity.offers, undefined, 'Must not invent offers');
  assert.equal(entity.aggregateRating, undefined, 'Must not invent aggregateRating');
  assert.equal(entity.review, undefined, 'Must not invent reviews');
  assert.equal(entity.ratingValue, undefined, 'Must not invent rating values');
}
console.log('✓ No fake sameAs, logo, social, price, rating, or review fields.');

// ----------------------------------------------------------------------------
// Test 4: AboutPage and ContactPage schemas are valid
// ----------------------------------------------------------------------------
console.log('\n[Test 4] AboutPage and ContactPage schemas are valid');
manager.setRoute('/about');
const aboutJson = parseManagedSchema();
assert.equal(aboutJson['@type'], 'AboutPage');
assert.equal(aboutJson.name, ROUTE_METADATA['/about'].title);
assert.equal(aboutJson.description, ROUTE_METADATA['/about'].description);

manager.setRoute('/contact');
const contactJson = parseManagedSchema();
assert.equal(contactJson['@type'], 'ContactPage');
assert.equal(contactJson.name, ROUTE_METADATA['/contact'].title);
assert.equal(contactJson.description, ROUTE_METADATA['/contact'].description);
console.log('✓ AboutPage and ContactPage schemas are valid.');

// ----------------------------------------------------------------------------
// Test 5: Blog collection schema is valid
// ----------------------------------------------------------------------------
console.log('\n[Test 5] Blog collection schema is valid');
manager.setRoute('/blog');
const blogRouteJson = parseManagedSchema();
assert.equal(blogRouteJson['@type'], 'CollectionPage');
assert.equal(blogRouteJson.name, ROUTE_METADATA['/blog'].title);
assert.equal(blogRouteJson.description, ROUTE_METADATA['/blog'].description);

// Test dynamic blog collection enrichment with actual loaded posts
const samplePosts = [
  { id: '1', title: 'راهنمای کار با مدل‌های زبانی', content: 'این مقاله به بررسی راهکارهای تولید متن می‌پردازد.' },
  { id: '2', title: 'نحوه ساخت تصویر با هوش مصنوعی', content: 'آموزش جامع پرامپت‌نویسی برای تولید عکس‌های باکیفیت.' },
];
const enrichedBlog = buildBlogCollectionStructuredData(samplePosts);
assert.equal(enrichedBlog['@type'], 'CollectionPage');
assert.ok(enrichedBlog.mainEntity, 'Enriched blog must have mainEntity ItemList');
assert.equal(enrichedBlog.mainEntity['@type'], 'ItemList');
assert.equal(enrichedBlog.mainEntity.itemListElement.length, 2);
assert.equal(enrichedBlog.mainEntity.itemListElement[0].name, samplePosts[0].title);
assert.equal(enrichedBlog.mainEntity.itemListElement[1].name, samplePosts[1].title);
console.log('✓ Blog collection schema is valid.');

// ----------------------------------------------------------------------------
// Test 6: Dynamic BlogPosting uses actual loaded post title
// ----------------------------------------------------------------------------
console.log('\n[Test 6] Dynamic BlogPosting uses actual loaded post title');
const postA = {
  id: 'post-101',
  title: 'معرفی سرویس‌های جدید ویدیویی لوما',
  content: 'در این مقاله به معرفی قابلیت‌های جدید ویدیویی می‌پردازیم.',
};
const postSchemaA = buildBlogPostStructuredData(postA);
assert.ok(postSchemaA);
assert.equal(postSchemaA['@type'], 'BlogPosting');
assert.equal(postSchemaA.headline, 'معرفی سرویس‌های جدید ویدیویی لوما');
console.log('✓ Dynamic BlogPosting uses actual loaded post title.');

// ----------------------------------------------------------------------------
// Test 7: Dynamic BlogPosting uses resolveExcerpt(post)
// ----------------------------------------------------------------------------
console.log('\n[Test 7] Dynamic BlogPosting uses resolveExcerpt(post)');
const postWithMarkdown = {
  id: 'post-102',
  title: 'راهنمای بهینه‌سازی پرامپت',
  content: '# عنوان اصلی\nپرامپت‌نویسی دقیق کلید دریافت بهترین خروجی از مدل‌های هوش مصنوعی است.',
};
const expectedExcerpt = resolveExcerpt(postWithMarkdown);
const postSchemaMarkdown = buildBlogPostStructuredData(postWithMarkdown);
assert.ok(postSchemaMarkdown);
assert.equal(postSchemaMarkdown.description, expectedExcerpt);
console.log('✓ Dynamic BlogPosting uses resolveExcerpt(post).');

// ----------------------------------------------------------------------------
// Test 8: Dynamic BlogPosting does not use loading text
// ----------------------------------------------------------------------------
console.log('\n[Test 8] Dynamic BlogPosting does not use loading text');
const loadingPost1 = { id: 'loading-1', title: 'در حال بارگذاری...', content: '' };
assert.equal(buildBlogPostStructuredData(loadingPost1), null, 'Loading text must not generate schema');

const loadingPost2 = { id: 'loading-2', title: 'در حال دریافت مقاله از سرور...', content: '' };
assert.equal(buildBlogPostStructuredData(loadingPost2), null, 'Loading text must not generate schema');

const emptyPost = { id: 'empty-1', title: '', content: '' };
assert.equal(buildBlogPostStructuredData(emptyPost), null, 'Empty post must not generate schema');
console.log('✓ Dynamic BlogPosting does not use loading text.');

// ----------------------------------------------------------------------------
// Test 9: Dynamic BlogPosting is removed when article becomes unavailable
// ----------------------------------------------------------------------------
console.log('\n[Test 9] Dynamic BlogPosting is removed when article becomes unavailable');
manager.setRoute('/blog/post-101');
// Apply dynamic article override
manager.registerOverride('article-active', postSchemaA, '/blog/post-101');
let currentScript = getManagedScript();
assert.ok(currentScript, 'Article schema must exist when loaded');
let parsed = JSON.parse(currentScript.textContent);
assert.equal(parsed.headline, 'معرفی سرویس‌های جدید ویدیویی لوما');

// Post becomes unavailable / error: unregister override
manager.unregisterOverride('article-active');
currentScript = getManagedScript();
assert.equal(
  currentScript,
  null,
  'Managed script must be completely removed when article is unavailable on an unmapped route'
);
console.log('✓ Dynamic BlogPosting is removed when article becomes unavailable.');

// ----------------------------------------------------------------------------
// Test 10: Article A schema is removed before Article B schema becomes active
// ----------------------------------------------------------------------------
console.log('\n[Test 10] Article A schema is removed before Article B schema becomes active');
const postB = {
  id: 'post-102',
  title: 'تحلیل آینده هوش مصنوعی در سال جدید',
  content: 'بررسی روندهای کلیدی هوش مصنوعی.',
};
const postSchemaB = buildBlogPostStructuredData(postB);

// 1. Article A active
manager.setRoute('/blog/post-101');
manager.registerOverride('article-page', postSchemaA, '/blog/post-101');
assert.equal(parseManagedSchema().headline, 'معرفی سرویس‌های جدید ویدیویی لوما');

// 2. Navigation begins: Article A unmounts / resets to loading state (null)
manager.unregisterOverride('article-page');
assert.equal(getManagedScript(), null, 'Article A schema must be removed during transition');

// 3. Article B finishes loading
manager.setRoute('/blog/post-102');
manager.registerOverride('article-page', postSchemaB, '/blog/post-102');
assert.equal(parseManagedSchema().headline, 'تحلیل آینده هوش مصنوعی در سال جدید');
console.log('✓ Article A schema is removed before Article B schema becomes active.');

// ----------------------------------------------------------------------------
// Test 11: Unknown routes remove stale generated schema
// ----------------------------------------------------------------------------
console.log('\n[Test 11] Unknown routes remove stale generated schema');
// Reset override
manager.unregisterOverride('article-page');
// Set to a valid route first
manager.setRoute('/about');
assert.ok(getManagedScript(), 'Schema must exist on /about');

// Now navigate to unknown / 404 route
manager.setRoute('/non-existent-404-route');
assert.equal(
  getManagedScript(),
  null,
  'Unknown route must prune stale generated schema script'
);
console.log('✓ Unknown routes remove stale generated schema.');

// ----------------------------------------------------------------------------
// Test 12: Repeated renders never create duplicate generated scripts
// ----------------------------------------------------------------------------
console.log('\n[Test 12] Repeated renders never create duplicate generated scripts');
manager.setRoute('/');
manager.sync();
manager.sync();
manager.sync();
manager.setRoute('/');
manager.sync();

const allManagedScripts = mockDoc.head.querySelectorAll(
  `script[${SCHEMA_TAG_ATTR}="${SCHEMA_TAG_VALUE}"]`
);
assert.equal(
  allManagedScripts.length,
  1,
  'Must never create duplicate managed scripts on repeated sync or renders'
);
console.log('✓ Repeated renders never create duplicate generated scripts.');

// ----------------------------------------------------------------------------
// Test 13: Every generated script has data-luma-schema="true"
// ----------------------------------------------------------------------------
console.log('\n[Test 13] Every generated script has data-luma-schema="true"');
const testRoutes = ['/', '/about', '/contact', '/services', '/pricing', '/tutorials', '/privacy'];
for (const r of testRoutes) {
  manager.setRoute(r);
  const script = getManagedScript();
  assert.ok(script, `Script must exist on ${r}`);
  assert.equal(script.getAttribute('type'), 'application/ld+json');
  assert.equal(script.getAttribute(SCHEMA_TAG_ATTR), SCHEMA_TAG_VALUE);
  assert.equal(script.getAttribute(SCHEMA_TAG_ATTR), 'true');
}
console.log('✓ Every generated script has data-luma-schema="true".');

// ----------------------------------------------------------------------------
// Test 14: Unrelated existing scripts remain untouched
// ----------------------------------------------------------------------------
console.log('\n[Test 14] Unrelated existing scripts remain untouched');
// Inject an unrelated third-party script tag
const unrelatedScript = new MockElement('SCRIPT');
unrelatedScript.setAttribute('type', 'text/javascript');
unrelatedScript.setAttribute('id', 'google-analytics');
unrelatedScript.textContent = 'window.dataLayer = window.dataLayer || [];';
mockDoc.head.appendChild(unrelatedScript);

// Inject an unrelated JSON-LD script (without data-luma-schema)
const unrelatedJsonLd = new MockElement('SCRIPT');
unrelatedJsonLd.setAttribute('type', 'application/ld+json');
unrelatedJsonLd.setAttribute('id', 'external-widget-schema');
unrelatedJsonLd.textContent = '{"widget": "active"}';
mockDoc.head.appendChild(unrelatedJsonLd);

// Cycle through several routes and actions
manager.setRoute('/services');
manager.setRoute('/unknown-path');
manager.setRoute('/blog');
manager.reset();

// Verify unrelated scripts are completely untouched
assert.ok(
  mockDoc.head.querySelector('script[id="google-analytics"]'),
  'Unrelated script must never be removed'
);
assert.equal(
  mockDoc.head.querySelector('script[id="google-analytics"]')?.textContent,
  'window.dataLayer = window.dataLayer || [];'
);

assert.ok(
  mockDoc.head.querySelector('script[id="external-widget-schema"]'),
  'Unrelated JSON-LD script must never be removed'
);
assert.equal(
  mockDoc.head.querySelector('script[id="external-widget-schema"]')?.textContent,
  '{"widget": "active"}'
);
console.log('✓ Unrelated existing scripts remain untouched.');

// ----------------------------------------------------------------------------
// Test 15: JSON-LD content matches visible/source-backed facts
// ----------------------------------------------------------------------------
console.log('\n[Test 15] JSON-LD content matches visible/source-backed facts');
manager.setRoute('/services');
const servicesJson = parseManagedSchema();
assert.equal(servicesJson['@type'], 'CollectionPage');
assert.equal(servicesJson.name, ROUTE_METADATA['/services'].title);
assert.equal(servicesJson.description, ROUTE_METADATA['/services'].description);

assert.ok(servicesJson.mainEntity, 'Services schema must have ItemList');
assert.equal(servicesJson.mainEntity.itemListElement.length, LUMA_SERVICES.length);

for (let i = 0; i < LUMA_SERVICES.length; i++) {
  const item = servicesJson.mainEntity.itemListElement[i];
  assert.equal(item['@type'], 'ListItem');
  assert.equal(item.position, i + 1);
  assert.equal(item.name, LUMA_SERVICES[i].title);
  assert.equal(item.description, LUMA_SERVICES[i].description);
}
console.log('✓ JSON-LD content matches visible/source-backed facts exactly.');

// ----------------------------------------------------------------------------
// Test 16: No unsupported schema types or invented business facts are present
// ----------------------------------------------------------------------------
console.log('\n[Test 16] No unsupported schema types or invented business facts are present');
const bannedTypes = [
  'FAQPage',
  'Offer',
  'PriceSpecification',
  'Review',
  'Rating',
  'Person',
  'LocalBusiness',
];

for (const [route, schema] of Object.entries(ROUTE_STRUCTURED_DATA)) {
  const jsonString = JSON.stringify(schema);
  for (const banned of bannedTypes) {
    // Check top-level @type
    if (schema['@type']) {
      assert.notEqual(
        schema['@type'],
        banned,
        `Route ${route} must not use banned schema type ${banned}`
      );
    }
    // Check @graph types if present
    if (Array.isArray(schema['@graph'])) {
      for (const entity of schema['@graph']) {
        assert.notEqual(
          entity['@type'],
          banned,
          `Route ${route} @graph entity must not use banned type ${banned}`
        );
      }
    }
  }

  // Verify no invented prices, ratings, or certifications
  assert.ok(!jsonString.includes('"price"'), `Route ${route} must not contain invented price`);
  assert.ok(!jsonString.includes('"ratingValue"'), `Route ${route} must not contain invented ratings`);
  assert.ok(!jsonString.includes('"aggregateRating"'), `Route ${route} must not contain aggregateRating`);
  assert.ok(!jsonString.includes('"reviewCount"'), `Route ${route} must not contain reviewCount`);
}
console.log('✓ No unsupported schema types or invented business facts are present.');

console.log('\n================================================================');
console.log('All 16 Structured Data Tests Passed Successfully!');
console.log('================================================================\n');
