/**
 * Focused Test Suite for 404 & Route-Resilience Architecture
 *
 * Verifies:
 * 1. App.tsx declares the wildcard route <Route path="*" element={<NotFoundPage />} />
 * 2. HashRouter architecture is preserved
 * 3. NotFoundPage semantic HTML & content rules:
 *    - Exactly one <main> landmark
 *    - Exactly one descriptive <h1>
 *    - Explanatory message indicating page was not found
 *    - Clear link back to '/'
 *    - No invented support contacts, phone numbers, or business claims
 * 4. SEO behavior on unknown routes:
 *    - Restores DEFAULT_TITLE
 *    - Removes all stale managed tags (data-luma-seo="true")
 *    - Generates zero fake canonical, robots, OG, or Twitter tags
 * 5. Structured Data behavior on unknown routes:
 *    - Produces null schema
 *    - Removes all managed schema scripts (data-luma-schema="true")
 *    - Generates zero fake/invented structured data
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { register } from 'node:module';

// Register TypeScript loader for tsx file imports
register('./tsx-loader.js', import.meta.url);

// --- Lightweight in-memory DOM mock for Node environment ---
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

  public querySelector(selector: string): MockElement | null {
    const results = this.querySelectorAll(selector);
    return results.length > 0 ? results[0] : null;
  }

  public querySelectorAll(selector: string): MockElement[] {
    const results: MockElement[] = [];

    const matchTag = selector.match(/^([a-zA-Z0-9]+)/);
    const targetTag = matchTag ? matchTag[1].toUpperCase() : null;

    const attrMatches = Array.from(selector.matchAll(/\[([a-zA-Z0-9_-]+)(?:="([^"]*)")?\]/g));

    const checkNode = (node: MockElement) => {
      let matches = true;

      if (targetTag && node.tagName !== targetTag) {
        matches = false;
      }

      if (matches && attrMatches.length > 0) {
        for (const m of attrMatches) {
          const attrName = m[1];
          const attrVal = m[2];
          if (!node.hasAttribute(attrName)) {
            matches = false;
            break;
          }
          if (attrVal !== undefined && node.getAttribute(attrName) !== attrVal) {
            matches = false;
            break;
          }
        }
      }

      if (matches) {
        results.push(node);
      }

      for (const child of node.children) {
        checkNode(child);
      }
    };

    for (const child of this.children) {
      checkNode(child);
    }

    return results;
  }
}

class MockDocument {
  public title: string = '';
  public head: MockElement = new MockElement('HEAD');
  public body: MockElement = new MockElement('BODY');

  public createElement(tagName: string): MockElement {
    return new MockElement(tagName);
  }

  public querySelector(selector: string): MockElement | null {
    if (selector === 'head') return this.head;
    if (selector === 'body') return this.body;
    return this.head.querySelector(selector) || this.body.querySelector(selector);
  }

  public querySelectorAll(selector: string): MockElement[] {
    return [...this.head.querySelectorAll(selector), ...this.body.querySelectorAll(selector)];
  }
}

console.log('Running 404 & Route-Resilience Test Suite...\n');

// ----------------------------------------------------------------------------
// Test 1: App.tsx route tree inspection
// ----------------------------------------------------------------------------
console.log('[Test 1] App.tsx route tree inspection');
const appTsxPath = path.resolve(process.cwd(), 'App.tsx');
assert.ok(fs.existsSync(appTsxPath), 'App.tsx must exist');
const appContent = fs.readFileSync(appTsxPath, 'utf8');

// 1.1 Confirm HashRouter is preserved
assert.ok(appContent.includes('<HashRouter>'), 'App.tsx must preserve <HashRouter>');
assert.ok(appContent.includes('</HashRouter>'), 'App.tsx must preserve </HashRouter>');

// 1.2 Confirm wildcard route exists
const wildcardRegex = /<Route\s+path="\*"\s+element=\{<NotFoundPage\s*\/>\}\s*\/>/;
assert.ok(wildcardRegex.test(appContent), 'App.tsx must declare <Route path="*" element={<NotFoundPage />} />');

// 1.3 Confirm NotFoundPage is imported / lazy-loaded
assert.ok(
  appContent.includes('NotFoundPage') && appContent.includes('loadNotFoundPage'),
  'NotFoundPage must be lazy loaded via loadNotFoundPage in App.tsx'
);
console.log('✓ App.tsx correctly configures wildcard route and preserves HashRouter.');

// ----------------------------------------------------------------------------
// Test 2: NotFoundPage.tsx semantic HTML & design verification
// ----------------------------------------------------------------------------
console.log('\n[Test 2] NotFoundPage.tsx semantic HTML & content rules');
const notFoundPath = path.resolve(process.cwd(), 'pages/NotFoundPage.tsx');
assert.ok(fs.existsSync(notFoundPath), 'pages/NotFoundPage.tsx must exist');
const notFoundContent = fs.readFileSync(notFoundPath, 'utf8');

// 2.1 Exactly one <main> landmark
const mainOpenCount = (notFoundContent.match(/<main[\s>]/g) || []).length;
const mainCloseCount = (notFoundContent.match(/<\/main>/g) || []).length;
assert.equal(mainOpenCount, 1, 'NotFoundPage must contain exactly one opening <main> tag');
assert.equal(mainCloseCount, 1, 'NotFoundPage must contain exactly one closing </main> tag');

// 2.2 Exactly one descriptive H1
const h1OpenCount = (notFoundContent.match(/<h1[\s>]/g) || []).length;
const h1CloseCount = (notFoundContent.match(/<\/h1>/g) || []).length;
assert.equal(h1OpenCount, 1, 'NotFoundPage must contain exactly one opening <h1> tag');
assert.equal(h1CloseCount, 1, 'NotFoundPage must contain exactly one closing </h1> tag');
assert.ok(notFoundContent.includes('صفحه مورد نظر یافت نشد'), 'NotFoundPage <h1> must describe that the page was not found');

// 2.3 Explanatory copy indicating page was not found
assert.ok(
  notFoundContent.includes('صفحه‌ای که به دنبال آن هستید') || notFoundContent.includes('یافت نشد'),
  'NotFoundPage must explain that the requested page was not found'
);

// 2.4 Clear link back to home ('/')
assert.ok(
  notFoundContent.includes('href="/"') || notFoundContent.includes('to="/"'),
  'NotFoundPage must include a clear navigation link back to /'
);
assert.ok(
  notFoundContent.includes('بازگشت به صفحه اصلی') || notFoundContent.includes('صفحه اصلی'),
  'NotFoundPage link must clearly invite return to home'
);

// 2.5 Ensure no invented support contacts or business claims
assert.ok(!notFoundContent.includes('021-'), 'Must not invent Iranian phone numbers');
assert.ok(!notFoundContent.includes('+98'), 'Must not invent phone numbers');
assert.ok(!notFoundContent.includes('@luma.ir'), 'Must not invent fake contact email');
assert.ok(!notFoundContent.includes('support@'), 'Must not invent fake support email');
assert.ok(!notFoundContent.includes('تهران،'), 'Must not invent fake office address');
console.log('✓ NotFoundPage adheres strictly to semantic HTML, accessibility, and zero-hallucination rules.');

// ----------------------------------------------------------------------------
// Test 3: SEO behavior on unknown routes
// ----------------------------------------------------------------------------
console.log('\n[Test 3] SEOManager behavior on unknown routes');

// Set up mock DOM
const mockDoc = new MockDocument();
(globalThis as any).document = mockDoc;

const { seoManager, DEFAULT_TITLE, SEO_TAG_ATTR, SEO_TAG_VALUE } = await import('../lib/seo.ts');

// Step 3.1: Start at /services (valid route with metadata)
seoManager.setRoute('/services');
assert.notEqual(mockDoc.title, DEFAULT_TITLE, 'Valid route should set specific title');
const servicesManagedTags = mockDoc.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
assert.ok(servicesManagedTags.length > 0, 'Valid route should produce managed SEO tags');

// Step 3.2: Navigate to unknown route /some-nonexistent-path-404
seoManager.setRoute('/some-nonexistent-path-404');
assert.equal(mockDoc.title, DEFAULT_TITLE, 'Unknown route must restore DEFAULT_TITLE');

// Stale managed tags must all be removed
const unknownManagedTags = mockDoc.head.querySelectorAll(`[${SEO_TAG_ATTR}="${SEO_TAG_VALUE}"]`);
assert.equal(unknownManagedTags.length, 0, 'Unknown route must remove all stale managed tags');

// No fake tags created
assert.equal(mockDoc.head.querySelector('link[rel="canonical"]'), null, 'No canonical link for unknown routes');
assert.equal(mockDoc.head.querySelector('meta[name="robots"]'), null, 'No robots meta for unknown routes');
assert.equal(mockDoc.head.querySelector('meta[property="og:title"]'), null, 'No og:title for unknown routes');
assert.equal(mockDoc.head.querySelector('meta[property="og:description"]'), null, 'No og:description for unknown routes');
assert.equal(mockDoc.head.querySelector('meta[property="og:image"]'), null, 'No og:image for unknown routes');
assert.equal(mockDoc.head.querySelector('meta[name="twitter:card"]'), null, 'No twitter:card for unknown routes');

// Step 3.3: Return to home '/'
seoManager.setRoute('/');
assert.equal(mockDoc.title, 'لوما | مرکز جامع ابزارهای هوش مصنوعی', 'Restoring / recreates homepage title');
console.log('✓ SEOManager restores DEFAULT_TITLE and removes stale tags on unknown routes.');

// ----------------------------------------------------------------------------
// Test 4: Structured Data behavior on unknown routes
// ----------------------------------------------------------------------------
console.log('\n[Test 4] StructuredDataManager behavior on unknown routes');

const { structuredDataManager, SCHEMA_TAG_ATTR, SCHEMA_TAG_VALUE } = await import('../lib/structuredData.ts');

// Step 4.1: Start at /about (valid route with schema)
structuredDataManager.setRoute('/about');
let aboutScripts = mockDoc.head.querySelectorAll(`script[${SCHEMA_TAG_ATTR}="${SCHEMA_TAG_VALUE}"]`);
assert.equal(aboutScripts.length, 1, 'Valid route should create exactly one managed schema script');

// Step 4.2: Navigate to unknown route /unknown-service-xyz
structuredDataManager.setRoute('/unknown-service-xyz');
let unknownScripts = mockDoc.head.querySelectorAll(`script[${SCHEMA_TAG_ATTR}="${SCHEMA_TAG_VALUE}"]`);
assert.equal(unknownScripts.length, 0, 'Unknown route must remove all managed schema scripts');

const effectiveSchema = structuredDataManager.getEffectiveStructuredData();
assert.equal(effectiveSchema, null, 'Unknown route must yield null schema');

// Step 4.3: Navigate back to /about
structuredDataManager.setRoute('/about');
let restoredAboutScripts = mockDoc.head.querySelectorAll(`script[${SCHEMA_TAG_ATTR}="${SCHEMA_TAG_VALUE}"]`);
assert.equal(restoredAboutScripts.length, 1, 'Navigating back to /about restores approved schema script');
console.log('✓ StructuredDataManager produces null schema and removes stale scripts on unknown routes.');

console.log('\n================================================================');
console.log('All 404 & Route-Resilience Tests Passed Successfully!');
console.log('================================================================\n');
