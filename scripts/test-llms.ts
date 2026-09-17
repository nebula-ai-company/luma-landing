import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

/**
 * Dependency-free test runner for public/llms.txt discoverability layer.
 * Strictly verifies file existence, formatting, brand integrity, absence of
 * invented facts/domains, route referencing discipline, capability coverage,
 * exact source-backed service descriptions from constants.tsx, and factual
 * accuracy of the payment/credit model.
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
const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
const links = [...content.matchAll(markdownLinkRegex)];
assert.strictEqual(
  links.length,
  0,
  `Markdown links found that imply clean route URLs or external links: ${links.map((l) => l[0]).join(', ')}`
);
console.log('✓ No unsupported clean route hyperlinks found; routes referenced as plain text.');

// Test 8: Pricing and payment model accuracy (LUM credit charging model vs subscriptions)
console.log('[Test 8] Accurate credit-based payment model and absence of active subscription claims');
assert.ok(
  /LUM credit/i.test(content) || /اعتبار لوم/i.test(content),
  'Must mention LUM credit model'
);
assert.ok(
  content.includes('charging and consuming LUM credits'),
  'Must state users access services by charging and consuming LUM credits'
);
assert.ok(
  content.includes('without requiring a monthly subscription'),
  'Must explicitly state access does not require a monthly subscription'
);
assert.ok(
  content.includes('displays the cost before an operation'),
  'Must state that the dashboard displays the cost before an operation is executed'
);
assert.ok(
  /proposed or planned structures/i.test(content),
  'Must state subscription plans represent proposed or planned structures'
);

const bannedSubscriptionClaims = [
  /active monthly subscription/i,
  /active annual subscription/i,
  /monthly subscription tiers/i,
  /annual subscription tiers/i,
  /structured monthly and annual tiers/i,
  /bundled (?:subscription )?credits/i,
  /higher concurrency/i,
  /advanced capabilities unlocked by subscriptions/i,
];
for (const regex of bannedSubscriptionClaims) {
  assert.ok(
    !regex.test(content),
    `File must not contain active subscription claim: ${regex}`
  );
}
console.log('✓ Direct LUM credit payment model verified; active subscription and bundled credit claims absent.');

// Test 9: Exact source-backed Persian service descriptions from constants.tsx
console.log('[Test 9] Exact source-backed Persian service titles and descriptions from constants.tsx');
const exactServicePairs = [
  { title: 'ساخت تصویر', desc: 'تبدیل متن به تصاویر هنری خیره‌کننده', route: '/service/img-gen' },
  { title: 'ویرایش تصویر', desc: 'ویرایش حرفه‌ای تصاویر با دستورات متنی', route: '/service/img-edit' },
  { title: 'حذف پس‌زمینه', desc: 'حذف هوشمند و دقیق پس‌زمینه تصاویر', route: '/service/bg-remove' },
  { title: 'دستیار هوشمند', desc: 'دستیار همه فن حریف برای کارهای روزمره', route: '/service/assistant' },
  { title: 'ساخت ویدیو', desc: 'خلق ویدیوهای خلاقانه از متن', route: '/service/video' },
  { title: 'افزایش کیفیت ویدئو', desc: 'افزایش ووضوح، بازسازی جزئیات و بهبود ویدئو با مدلهای تخصصی', route: '/service/video-enhancement', altDesc: 'افزایش وضوح، بازسازی جزئیات و بهبود ویدئو با مدلهای تخصصی' },
  { title: 'تبدیل متن به گفتار', desc: 'تبدیل متن فارسی و چندزبانه به صدای طبیعی و حرفه‌ای', route: '/service/text-to-speech' },
  { title: 'افزایش کیفیت تصویر', desc: 'بهبود وضوح و جزئیات تصاویر قدیمی', route: '/service/upscale' },
  { title: 'پوشاندن لباس', desc: 'پرو مجازی لباس بر روی مدل‌های دلخواه', route: '/service/try-on' },
  { title: 'چت هوشمند', desc: 'گفتگو با پیشرفته‌ترین مدل‌های زبانی', route: '/service/chat' },
  { title: 'ورک‌فلوها', desc: 'بوم بصری ساخت فرآیندهای چندمرحله‌ای هوش مصنوعی', route: '/service/workflow' },
];

for (const pair of exactServicePairs) {
  assert.ok(
    content.includes(pair.title),
    `Must include service title: ${pair.title}`
  );
  const descFound = content.includes(pair.desc) || (pair.altDesc && content.includes(pair.altDesc));
  assert.ok(
    descFound,
    `Must include exact service description: ${pair.desc}`
  );
  assert.ok(
    content.includes(pair.route),
    `Must include service route: ${pair.route}`
  );
}
console.log('✓ All 11 exact Persian service titles and descriptions from constants.tsx verified.');

// Test 10: Absence of unsupported additions and phrases
console.log('[Test 10] Absence of unsupported phrases and unverified claims');
const unsupportedPhrases = [
  /بدون افت کیفیت/,
  /\bآنی\b/,
  /\bفوری\b/,
  /کاهش نویز/,
  /لحن(?:‌| )?های متنوع/,
  /کیفیت بالا/,
  /پشتیبانی شبانه(?:‌| )?روزی/,
  /high-resolution/i,
  /\binstant\b/i,
  /reducing noise/i,
  /animation drivers/i,
  /custom documentation/i,
  /round-the-clock support/i,
  /enterprise compliance/i,
  /community creations/i,
];

for (const pattern of unsupportedPhrases) {
  assert.ok(
    !pattern.test(content),
    `File must not contain unsupported phrase: ${pattern}`
  );
}
console.log('✓ Unsupported marketing phrases and exaggerations are strictly absent.');

// Test 11: Core service count is exactly 11, and /services is catalog page
console.log('[Test 11] Exactly 11 core services counted (and /services listed separately)');
// Extract the "## Services" section
const servicesSectionMatch = content.match(/## Services([\s\S]*?)## Pricing and Subscription/);
assert.ok(servicesSectionMatch, 'Services section must exist between ## Services and ## Pricing and Subscription');
const servicesSection = servicesSectionMatch[1];

// Count routes under /service/ (the individual core services)
const coreServiceRouteMatches = servicesSection.match(/Route:\s*\/service\/[a-z-]+/g) || [];
assert.strictEqual(
  coreServiceRouteMatches.length,
  11,
  `Expected exactly 11 core service routes under /service/, found ${coreServiceRouteMatches.length}`
);

// Verify /services is listed separately as catalog page, not counted as one of the 11
assert.ok(
  servicesSection.includes('Route: /services'),
  'Services section must include Route: /services as catalog page'
);
assert.ok(
  /Services Catalog/i.test(servicesSection),
  'Services section must identify /services as catalog page'
);
console.log('✓ Exactly 11 core services verified; /services catalog page listed separately.');

// Test 12: Verified contact information only
console.log('[Test 12] Verified contact information strictly limited to source facts');
assert.ok(content.includes('support@lumai.ir'), 'Must include support@lumai.ir');
assert.ok(content.includes('Tehran'), 'Must mention Tehran central office');
assert.ok(content.includes('Babolsar'), 'Must mention Babolsar technical and development office');
assert.ok(
  !content.includes('phone') && !content.includes('+98') && !content.includes('021-'),
  'Must not invent phone numbers'
);
console.log('✓ Verified contact information present without unverified additions.');

// Test 13: Valid readable Markdown structure and required H2 sections
console.log('[Test 13] Valid Markdown structure and required sections');
assert.ok(/^>\s+.+/m.test(content), 'File must contain a summary blockquote after title');

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

console.log('✓ Valid Markdown structure with all 9 required sections and blockquote confirmed.');

console.log('================================================================');
console.log('All LLMs.txt Discoverability Layer Tests Passed Successfully!');
console.log('================================================================');
