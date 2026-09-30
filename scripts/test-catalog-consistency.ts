import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

/**
 * Deterministic offline test suite for repository-wide catalog and model consistency.
 * Verifies that live product surfaces are free from stale hardcoded models,
 * unsupported technical guarantees (e.g. 4K/60fps, 4x boost), static inventories,
 * and residual provider availability claims.
 */

console.log('================================================================');
console.log('LUMA Repository-Wide Catalog & Consistency Regression Tests');
console.log('================================================================\n');

const rootDir = process.cwd();

function readSource(relPath: string): string {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Required product source file does not exist: ${relPath}`);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

// ----------------------------------------------------------------------------
// Test 1: Video Enhancement Global Claims
// ----------------------------------------------------------------------------
console.log('[Test 1] Video Enhancement: No unsupported 4K/60fps guarantees or x4 claims in product surfaces');

const videoEnhancementTargetFiles = [
  'lib/seo.ts',
  'components/Services/AllServices/ServiceGrid.tsx',
  'components/Services.tsx',
  'pages/VideoEnhancementPage.tsx',
  'components/Services/VideoEnhancement/VideoEnhancementHero.tsx',
  'components/Services/VideoEnhancement/VideoEnhancementFAQ.tsx',
];

for (const relPath of videoEnhancementTargetFiles) {
  const content = readSource(relPath);

  // Must not claim universal "تا ۴K و ۶۰fps"
  assert.ok(
    !content.includes('تا ۴K و ۶۰fps') && !content.includes('تا 4K و 60fps'),
    `Stale universal guarantee 'تا ۴K و ۶۰fps' found in ${relPath}`
  );

  // Must not contain mockup/badge "4K/60fps"
  assert.ok(
    !content.includes('4K/60fps') && !content.includes('۴K/۶۰fps'),
    `Stale badge '4K/60fps' found in ${relPath}`
  );

  // Must not contain "Luma 4K Ultra"
  assert.ok(
    !content.includes('Luma 4K Ultra'),
    `Stale mockup label 'Luma 4K Ultra' found in ${relPath}`
  );

  // Must not contain "x4 Boost"
  assert.ok(
    !content.includes('x4 Boost') && !content.includes('x4 boost'),
    `Stale claim 'x4 Boost' found in ${relPath}`
  );

  // Must not claim universal sound preservation "حفظ صدا"
  assert.ok(
    !content.includes('بازسازی هوشمند فریم‌ها و حفظ صدا') && !content.includes('بازسازی هوشمند فریمها و حفظ صدا'),
    `Universal claim 'حفظ صدا' found in ${relPath}`
  );
}
console.log('✓ Video Enhancement global surfaces are free from unverified 4K/60fps/x4 claims.\n');

// ----------------------------------------------------------------------------
// Test 2: All Services Catalog Claims & Inventory
// ----------------------------------------------------------------------------
console.log('[Test 2] All Services: No stale model names, fake Luma XL, or hardcoded service count');

const serviceGridContent = readSource('components/Services/AllServices/ServiceGrid.tsx');
const allServicesHeroContent = readSource('components/Services/AllServices/Hero.tsx');

// ServiceGrid features checks
assert.ok(
  !serviceGridContent.includes('GPT-4 بهینه شده') && !serviceGridContent.includes('مدل زبانی GPT-4'),
  "Stale claim 'GPT-4 بهینه شده' found in ServiceGrid.tsx"
);
assert.ok(
  !serviceGridContent.includes('Luma XL'),
  "Stale claim 'Luma XL' found in ServiceGrid.tsx"
);
assert.ok(
  !serviceGridContent.includes('افزایش رزولوشن تا ۴ برابر'),
  "Stale claim 'افزایش رزولوشن تا ۴ برابر' found in ServiceGrid.tsx"
);

// All Services Hero dynamic count check
assert.ok(
  !allServicesHeroContent.includes('"۸+"') && !allServicesHeroContent.includes("'۸+'"),
  "Hardcoded service count '۸+' found in AllServices Hero.tsx"
);
assert.ok(
  allServicesHeroContent.includes('SERVICES.length'),
  "AllServices Hero.tsx must derive service count dynamically from SERVICES.length"
);
assert.ok(
  allServicesHeroContent.includes('useReducedMotion()'),
  "AllServices Hero.tsx must use useReducedMotion() for animated background blobs"
);
console.log('✓ All Services features and hero counts are dynamic and durable.\n');

// ----------------------------------------------------------------------------
// Test 3: Smart Chat Live Catalog Architecture
// ----------------------------------------------------------------------------
console.log('[Test 3] Smart Chat: No static model catalogues, Context: 128k, or vendor preference ordering');

const chatModelsContent = readSource('components/Services/SmartChat/ChatModels.tsx');
const chatPageContent = readSource('pages/SmartChatPage.tsx');

assert.ok(
  !chatModelsContent.includes('const ALL_MODELS') && !chatModelsContent.includes('ALL_MODELS:'),
  "Static ALL_MODELS array found in ChatModels.tsx"
);
assert.ok(
  !chatModelsContent.includes('Context: 128k') && !chatModelsContent.includes('Context:128k'),
  "Invented 'Context: 128k' specification found in ChatModels.tsx"
);
assert.ok(
  !chatModelsContent.includes('PREFERRED_PROVIDER_ORDER'),
  "Artificial PREFERRED_PROVIDER_ORDER found in ChatModels.tsx; must preserve catalog order"
);
assert.ok(
  chatModelsContent.includes('formatPerTokens'),
  "ChatModels.tsx must format per-model token units dynamically"
);
assert.ok(
  chatModelsContent.includes('cacheRead') && chatModelsContent.includes('cacheWrite'),
  "ChatModels.tsx must expose cacheRead and cacheWrite pricing when present"
);
assert.ok(
  chatModelsContent.includes('[...model.pricing.tiers]'),
  "ChatModels.tsx must clone tiers before sorting to prevent API data mutation"
);
assert.ok(
  chatPageContent.includes("findServiceById(data, 'chat')"),
  "SmartChatPage.tsx must look up 'chat' service from live catalog"
);
console.log('✓ Smart Chat adheres strictly to live catalog schema and dynamic presentation.\n');

// ----------------------------------------------------------------------------
// Test 4: Text-to-Speech Pricing Formula
// ----------------------------------------------------------------------------
console.log('[Test 4] Text-to-Speech: No universal / 4 characters pricing assumption');

const ttsFiles = [
  'pages/TextToSpeechPage.tsx',
  'components/Services/TextToSpeech/TTSHero.tsx',
  'components/Services/TextToSpeech/TTSModels.tsx',
  'components/Services/TextToSpeech/TTSFAQ.tsx',
];

for (const relPath of ttsFiles) {
  const content = readSource(relPath);
  assert.ok(
    !content.includes('/ 4 characters') && !content.includes('/ ۴ کاراکتر'),
    `Universal '/ 4 characters' pricing claim found in ${relPath}`
  );
}
console.log('✓ Text-to-Speech models display authoritative pricing without universal /4 assumption.\n');

// ----------------------------------------------------------------------------
// Test 5: Route SEO Metadata Cleanliness
// ----------------------------------------------------------------------------
console.log('[Test 5] SEO: Route title metadata contains no unverified 4K/60fps promises');

const seoContent = readSource('lib/seo.ts');
const videoEnhanceRouteBlock = seoContent.slice(
  seoContent.indexOf("'/service/video-enhancement'"),
  seoContent.indexOf("'/service/workflow'")
);

assert.ok(
  !videoEnhanceRouteBlock.includes('۴K') && !videoEnhanceRouteBlock.includes('4K'),
  "4K found in /service/video-enhancement SEO block in lib/seo.ts"
);
assert.ok(
  !videoEnhanceRouteBlock.includes('۶۰fps') && !videoEnhanceRouteBlock.includes('60fps'),
  "60fps found in /service/video-enhancement SEO block in lib/seo.ts"
);
console.log('✓ Route SEO metadata for Video Enhancement is durable.\n');

// ----------------------------------------------------------------------------
// Test 6: Pricing Residual Provider Claim
// ----------------------------------------------------------------------------
console.log('[Test 6] Pricing: No residual hardcoded provider availability list in stats');

const pricingContent = readSource('pages/PricingPage.tsx');
assert.ok(
  !pricingContent.includes('شامل آخرین مدل‌های گوگل') && !pricingContent.includes('شامل آخرین مدلهای گوگل'),
  "Residual provider list found in PricingPage.tsx stats cards"
);
assert.ok(
  pricingContent.includes('countUniqueModels(services)'),
  "PricingPage.tsx must dynamically compute uniqueModelCount from catalog services"
);
console.log('✓ Pricing statistics cards provide durable, provider-agnostic summary.\n');

// ----------------------------------------------------------------------------
// Test 7: Production Model Counts in Live UI Surfaces
// ----------------------------------------------------------------------------
console.log('[Test 7] General: No hardcoded production counts in live UI source');

const vtonHeroContent = readSource('components/Services/VirtualTryOn/VtonHero.tsx');
const chatHeroContent = readSource('components/Services/SmartChat/ChatHero.tsx');

assert.ok(
  !vtonHeroContent.includes('۳۵ مدل') && !vtonHeroContent.includes('35 مدل'),
  "Hardcoded model count '۳۵ مدل' found in VtonHero.tsx; must use dynamic modelCount"
);
assert.ok(
  !chatHeroContent.includes('۶۶ مدل') && !chatHeroContent.includes('66 مدل'),
  "Hardcoded model count '۶۶ مدل' found in ChatHero.tsx; must use dynamic modelCount"
);
console.log('✓ Live UI components avoid hardcoded production model counts.\n');

// ----------------------------------------------------------------------------
// Test 8: Constants & LLMs.txt Phrasing
// ----------------------------------------------------------------------------
console.log('[Test 8] Constants and llms.txt: Durable service descriptions');

const constantsContent = readSource('constants.tsx');
const llmsContent = readSource('public/llms.txt');

assert.ok(
  constantsContent.includes('گفتگو با مدل‌های زبانی متنوع'),
  "constants.tsx must use durable description 'گفتگو با مدل‌های زبانی متنوع' for chat"
);
assert.ok(
  llmsContent.includes('گفتگو با مدل‌های زبانی متنوع'),
  "public/llms.txt must use durable description 'گفتگو با مدل‌های زبانی متنوع' for chat"
);
console.log('✓ constants.tsx and public/llms.txt use durable, verified phrasing.\n');

console.log('================================================================');
console.log('ALL REPOSITORY CATALOG CONSISTENCY TESTS PASSED SUCCESSFULLY!');
console.log('================================================================\n');
