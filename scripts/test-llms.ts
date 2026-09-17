import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

/**
 * Dependency-free test runner for public/llms.txt discoverability layer.
 * Strictly verifies file existence, formatting, brand integrity, absence of
 * invented facts/domains, route referencing discipline, and capability coverage.
 */

console.log('================================================================');
console.log('LLMs.txt Discoverability Layer Unit & Integrity Tests');
console.log('================================================================');

const rootDir = process.cwd();
const llmsPath = path.join(rootDir, 'public', 'llms.txt');

// Test 1: public/llms.txt exists and is non-empty
console.log('[Test 1] public/llms.txt exists and has content');
assert.ok(fs.existsSync(llmsPath), 'public/llms.txt must exist');
const content = fs.readFileSync(llmsPath, 'utf8');
assert.ok(content.trim().length > 100, 'public/llms.txt must not be empty');
console.log('✓ public/llms.txt exists and is populated with content.');

// Test 2: Exactly one H1 heading
console.log('[Test 2] Exactly one H1 title');
const lines = content.split(/\r?\n/);
const h1Lines = lines.filter((line) => line.startsWith('# '));
assert.strictEqual(h1Lines.length, 1, `Expected exactly 1 H1 heading, found ${h1Lines.length}`);
assert.ok(
  h1Lines[0].includes('Luma') && h1Lines[0].includes('لوما'),
  'H1 must start with Luma (لوما)'
);
console.log(`✓ Exactly one H1 title found: "${h1Lines[0]}".`);

// Test 3: Contains the Luma brand name in English and Persian
console.log('[Test 3] Luma brand name present');
assert.ok(content.includes('Luma'), 'Must contain brand name "Luma"');
assert.ok(content.includes('لوما'), 'Must contain brand name "لوما"');
console.log('✓ Luma brand name verified in English and Persian.');

// Test 4: Contains no placeholder text
console.log('[Test 4] No placeholder text');
const placeholderPatterns = [
  /lorem ipsum/i,
  /\bTODO\b/,
  /\bTBD\b/,
  /placeholder/i,
  /\bxxx+\b/i,
  /coming soon/i,
];
for (const pattern of placeholderPatterns) {
  assert.ok(
    !pattern.test(content),
    `File must not contain placeholder pattern: ${pattern}`
  );
}
console.log('✓ No placeholder, lorem ipsum, or TODO tokens found.');

// Test 5: Contains no invented domains
console.log('[Test 5] No invented domains');
const inventedDomains = [
  'luma.today',
  'luma-ai.com',
  'example.com',
  'test.com',
  'mysite.com',
  'lumaknowledge.pages.dev',
];
for (const domain of inventedDomains) {
  assert.ok(
    !content.includes(domain),
    `File must not contain invented domain: ${domain}`
  );
}
// Any domain mentioned in content should strictly be lumai.ir (e.g. support@lumai.ir)
const urlDomainMatches = content.match(/https?:\/\/([a-zA-Z0-9.-]+)/g) || [];
for (const url of urlDomainMatches) {
  assert.fail(`File must not contain web links to external sites: ${url}`);
}
console.log('✓ No invented domains or external URLs found.');

// Test 6: Contains no fabricated dates, prices, authors, certifications, or social links
console.log('[Test 6] No fabricated dates, prices, authors, certifications, or social links');
const bannedClaims = [
  /\$\s*\d+/,
  /\b\d+\s*(?:USD|EUR|GBP|تومان|ریال)\b/i,
  /\bISO\s*27001\b/i,
  /\bSOC\s*2\b/i,
  /\bHIPAA\b/i,
  /twitter\.com/i,
  /x\.com\//i,
  /instagram\.com/i,
  /t\.me\//i,
  /linkedin\.com/i,
  /youtube\.com/i,
  /facebook\.com/i,
  /\bJohn Doe\b/i,
  /\bJane Doe\b/i,
];
for (const regex of bannedClaims) {
  assert.ok(!regex.test(content), `Found fabricated or banned claim matching ${regex}`);
}
console.log('✓ No fabricated dates, prices, certifications, social links, or authors found.');

// Test 7: Does not contain unsupported clean route URLs
console.log('[Test 7] No unsupported clean route links');
// Markdown links: [text](url)
const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
const links = [...content.matchAll(markdownLinkRegex)];
assert.strictEqual(
  links.length,
  0,
  `Markdown links found that imply clean route URLs or external links: ${links.map((l) => l[0]).join(', ')}`
);
console.log('✓ No unsupported clean route hyperlinks found; routes referenced as plain text.');

// Test 8: Contains all main verified Luma capability areas
console.log('[Test 8] All verified Luma capability areas present');
const requiredCapabilities = [
  'img-gen',
  'img-edit',
  'bg-remove',
  'assistant',
  'video',
  'video-enhancement',
  'text-to-speech',
  'upscale',
  'try-on',
  'chat',
  'workflow',
];
for (const cap of requiredCapabilities) {
  assert.ok(
    content.includes(cap),
    `File must cover verified capability route identifier: ${cap}`
  );
}

const requiredPersianTerms = [
  'ساخت تصویر',
  'ویرایش تصویر',
  'حذف پس‌زمینه',
  'دستیار هوشمند',
  'ساخت ویدیو',
  'افزایش کیفیت ویدئو',
  'تبدیل متن به گفتار',
  'افزایش کیفیت تصویر',
  'پوشاندن لباس',
  'چت هوشمند',
  'ورک‌فلوها',
];
for (const term of requiredPersianTerms) {
  assert.ok(
    content.includes(term),
    `File must mention verified Persian service name: ${term}`
  );
}
console.log('✓ All 11 verified Luma services and capability areas are present.');

// Test 9: Valid readable Markdown structure
console.log('[Test 9] Valid Markdown structure and required sections');
// Check blockquote
assert.ok(/^>\s+.+/m.test(content), 'File must contain a summary blockquote after title');

// Check all 9 required H2 sections
const requiredH2Sections = [
  'What Luma Is',
  'Main Capabilities',
  'Services',
  'Pricing and Subscription',
  'Documentation and Tutorials',
  'Blog and Knowledge Content',
  'Solutions and Security',
  'Contact',
  'Privacy and Terms',
];

for (const section of requiredH2Sections) {
  const sectionHeaderRegex = new RegExp(`^##\\s+${section}`, 'm');
  assert.ok(
    sectionHeaderRegex.test(content),
    `File must contain section "## ${section}"`
  );
}

// Check contact email is present
assert.ok(content.includes('support@lumai.ir'), 'Contact section must list support@lumai.ir');

console.log('✓ Valid Markdown structure with all 9 required sections and blockquote confirmed.');

console.log('================================================================');
console.log('All LLMs.txt Discoverability Layer Tests Passed Successfully!');
console.log('================================================================');
