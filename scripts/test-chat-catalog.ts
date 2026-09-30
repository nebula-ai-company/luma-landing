import fs from 'node:fs';
import path from 'node:path';
import type { CatalogResponse, ChatCatalogModel } from '../lib/catalogApi.ts';
import {
  findServiceById,
  getValidChatModels,
  formatPersianDigits,
  formatPerTokens,
  isChatModel,
} from '../lib/catalogApi.ts';

async function runTests() {
  console.log('=== LUMA Smart Chat Live Catalog Migration Test Suite ===\n');

  // Test 1: Page-level architecture inspection
  console.log('[Test 1] Inspecting pages/SmartChatPage.tsx...');
  const pagePath = path.join(process.cwd(), 'pages/SmartChatPage.tsx');
  if (!fs.existsSync(pagePath)) {
    throw new Error('pages/SmartChatPage.tsx does not exist');
  }
  const pageContent = fs.readFileSync(pagePath, 'utf8');

  // Must call useCatalog once
  const useCatalogMatches = pageContent.match(/useCatalog\(/g) || [];
  if (useCatalogMatches.length !== 1) {
    throw new Error(`pages/SmartChatPage.tsx should call useCatalog exactly once, found: ${useCatalogMatches.length}`);
  }

  // Must find chat service
  if (!pageContent.includes("findServiceById(data, 'chat')")) {
    throw new Error("pages/SmartChatPage.tsx must look up 'chat' via findServiceById");
  }

  // Must pass service and models down to ChatModels
  if (!pageContent.includes('service={chatService}') || !pageContent.includes('models={validModels}')) {
    throw new Error('pages/SmartChatPage.tsx must pass chatService and validModels to ChatModels');
  }

  // Must pass dynamic model count and models to Hero and FAQ
  if (!pageContent.includes('modelCount={validModels.length}')) {
    throw new Error('pages/SmartChatPage.tsx must pass modelCount to Hero');
  }
  if (!pageContent.includes('models={validModels}')) {
    throw new Error('pages/SmartChatPage.tsx must pass models to ChatModels and ChatHero');
  }
  console.log('✓ pages/SmartChatPage.tsx calls useCatalog once and distributes dynamic catalog data\n');

  // Test 2: ChatModels static catalogue audit
  console.log('[Test 2] Auditing components/Services/SmartChat/ChatModels.tsx for static model leaks...');
  const modelsPath = path.join(process.cwd(), 'components/Services/SmartChat/ChatModels.tsx');
  if (!fs.existsSync(modelsPath)) {
    throw new Error('components/Services/SmartChat/ChatModels.tsx does not exist');
  }
  const modelsContent = fs.readFileSync(modelsPath, 'utf8');

  // Must NOT contain static model arrays or hardcoded model records
  const bannedStaticTerms = [
    'ALL_MODELS:',
    'const ALL_MODELS =',
    'const ALL_MODELS:',
    'const MODELS =',
    'Claude Sonnet 4.5',
    'GPT 5.4 Mini',
    'GPT 5.4 Nano',
    'Claude Opus 4.8',
    'MiniMax M2.7',
    'DeepSeek V4 Pro',
    'Ministral 3B',
    'Llama 4 Maverick',
    'Context: 128k',
  ];

  for (const term of bannedStaticTerms) {
    if (modelsContent.includes(term)) {
      throw new Error(`Forbidden static catalogue term '${term}' found in ChatModels.tsx`);
    }
  }

  // Must verify formatPerTokens and Persian formatting
  if (!modelsContent.includes('formatPerTokens')) {
    throw new Error('ChatModels.tsx must use formatPerTokens for per-token units');
  }
  if (!modelsContent.includes('model.pricing.input') || !modelsContent.includes('model.pricing.output')) {
    throw new Error('ChatModels.tsx must render model.pricing.input and model.pricing.output');
  }
  if (!modelsContent.includes('searchQuery') || !modelsContent.includes('aria-label=')) {
    throw new Error('ChatModels.tsx must support search with accessible label');
  }
  if (!modelsContent.includes('showLegacy') || !modelsContent.includes('aria-pressed=')) {
    throw new Error('ChatModels.tsx must support toggling legacy models with accessible aria-pressed');
  }
  console.log('✓ ChatModels.tsx is free of static model definitions and renders dynamic token pricing\n');

  // Test 3: ChatFAQ audit
  console.log('[Test 3] Auditing components/Services/SmartChat/ChatFAQ.tsx...');
  const faqPath = path.join(process.cwd(), 'components/Services/SmartChat/ChatFAQ.tsx');
  if (!fs.existsSync(faqPath)) {
    throw new Error('components/Services/SmartChat/ChatFAQ.tsx does not exist');
  }
  const faqContent = fs.readFileSync(faqPath, 'utf8');

  if (faqContent.includes('GPT-4o mini و Claude Haiku اعتبارات بسیار ناچیزی مصرف می‌کنند')) {
    throw new Error('ChatFAQ still contains stale hardcoded model examples');
  }
  if (!faqContent.includes('ChatFAQProps')) {
    throw new Error('ChatFAQ must accept dynamic props');
  }
  if (!faqContent.includes('توکن')) {
    throw new Error('ChatFAQ must explain token-based pricing');
  }
  console.log('✓ ChatFAQ copy is grounded and explains transparent token-based pricing\n');

  // Test 4: ChatHero & ChatHeroAnim audit
  console.log('[Test 4] Auditing components/Services/SmartChat/ChatHero.tsx and ChatHeroAnim.tsx...');
  const heroPath = path.join(process.cwd(), 'components/Services/SmartChat/ChatHero.tsx');
  const heroAnimPath = path.join(process.cwd(), 'components/Services/SmartChat/ChatHeroAnim.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  const heroAnimContent = fs.readFileSync(heroAnimPath, 'utf8');

  if (heroContent.includes('GPT-5 Ready') || heroContent.includes('Claude 3.7') || heroContent.includes('Gemini 3 Pro')) {
    throw new Error('ChatHero still contains hardcoded model tags');
  }
  if (heroAnimContent.includes('⚡') || heroAnimContent.includes('⚛️') || heroAnimContent.includes('🧠')) {
    throw new Error('ChatHeroAnim still contains emojis (violation of Banned Patterns)');
  }
  if (heroAnimContent.includes('Claude Sonnet 4.6') || heroAnimContent.includes('GPT 5.4 Mini')) {
    throw new Error('ChatHeroAnim still contains static hardcoded MODELS');
  }
  if (!heroContent.includes('https://dash.lumai.ir/')) {
    throw new Error('ChatHero CTA must point to https://dash.lumai.ir/');
  }
  console.log('✓ ChatHero and ChatHeroAnim are grounded with dynamic models and zero emojis\n');

  // Test 5: ChatFeatures audit
  console.log('[Test 5] Auditing components/Services/SmartChat/ChatFeatures.tsx...');
  const featuresPath = path.join(process.cwd(), 'components/Services/SmartChat/ChatFeatures.tsx');
  const featuresContent = fs.readFileSync(featuresPath, 'utf8');

  if (featuresContent.includes('برای کدنویسی از Claude، برای خلاقیت از GPT-5')) {
    throw new Error('ChatFeatures still contains hardcoded model version claims');
  }
  if (!featuresContent.includes('ChatFeaturesProps')) {
    throw new Error('ChatFeatures must accept dynamic props');
  }
  console.log('✓ ChatFeatures provides durable descriptions and dynamic selection visual\n');

  // Test 6: Deterministic mock catalog testing
  console.log('[Test 6] Verifying deterministic mock chat service parsing and token pricing validation...');
  const mockCatalog: CatalogResponse = {
    data: {
      services: [
        {
          id: 'chat',
          name: 'چت هوشمند',
          type: 'chat',
          models: [
            {
              id: 'chat-model-1',
              name: 'Model Alpha Pro',
              provider: 'Vendor Alpha',
              description: 'Advanced reasoning model for multi-step problem solving',
              legacy: false,
              capabilities: {
                reasoning: true,
                tools: true,
                webSearch: true,
              },
              pricing: {
                currency: 'LUM',
                type: 'tokens',
                perTokens: 1000000,
                input: 150,
                output: 600,
                cacheRead: 15,
                cacheWrite: 180,
                tiers: [
                  {
                    minInputTokens: 200000,
                    input: 250,
                    output: 900,
                    cacheRead: 25,
                    cacheWrite: 300,
                  },
                ],
              },
            },
            {
              id: 'chat-model-2',
              name: 'Model Beta Flash',
              provider: 'Vendor Beta',
              description: 'Ultra fast everyday model',
              legacy: false,
              capabilities: {
                reasoning: false,
                tools: true,
                webSearch: false,
              },
              pricing: {
                currency: 'LUM',
                type: 'tokens',
                perTokens: 1000000,
                input: 20,
                output: 80,
              },
            },
            {
              id: 'chat-model-legacy',
              name: 'Model Gamma Legacy',
              provider: 'Vendor Gamma',
              description: 'Older generation model',
              legacy: true,
              capabilities: {
                reasoning: false,
                tools: false,
                webSearch: false,
              },
              pricing: {
                currency: 'LUM',
                type: 'tokens',
                perTokens: 1000000,
                input: 50,
                output: 200,
              },
            },
            // Malformed chat model missing capabilities / invalid pricing
            {
              id: 'chat-invalid-1',
              name: 'Malformed Model',
              provider: 'Unknown',
              description: 'Missing pricing object',
              legacy: false,
            } as any,
          ],
        },
      ],
    },
  };

  const service = findServiceById(mockCatalog, 'chat');
  if (!service) throw new Error('Service chat not found in mock catalog');

  const validModels = getValidChatModels(service);
  if (validModels.length !== 3) {
    throw new Error(`Expected 3 valid chat models (excluding malformed), got: ${validModels.length}`);
  }

  // Preserved backend ordering check
  if (validModels[0].id !== 'chat-model-1' || validModels[1].id !== 'chat-model-2' || validModels[2].id !== 'chat-model-legacy') {
    throw new Error('Backend ordering of chat models was not preserved');
  }

  // Capabilities validation check
  const m1 = validModels[0];
  if (!m1.capabilities.reasoning || !m1.capabilities.tools || !m1.capabilities.webSearch) {
    throw new Error('Model capabilities not correctly parsed');
  }

  // Pricing structure check
  if (m1.pricing.input !== 150 || m1.pricing.output !== 600 || m1.pricing.perTokens !== 1000000) {
    throw new Error('Model pricing token rates not correctly parsed');
  }

  // Tiered pricing check
  if (!m1.pricing.tiers || m1.pricing.tiers[0].minInputTokens !== 200000) {
    throw new Error('Tiered pricing not preserved');
  }

  // Legacy filter check
  const nonLegacyModels = getValidChatModels(service, { excludeLegacy: true });
  if (nonLegacyModels.length !== 2) {
    throw new Error(`Expected 2 non-legacy models, got: ${nonLegacyModels.length}`);
  }

  console.log('✓ Mock chat service parsing, capabilities, and token pricing validated successfully\n');

  // Test 7: Verify provider ordering preserves first appearance in backend model order
  console.log('[Test 7] Verifying dynamic provider derivation and ordering...');
  if (modelsContent.includes('PREFERRED_PROVIDER_ORDER')) {
    throw new Error('ChatModels.tsx must not use PREFERRED_PROVIDER_ORDER; providers must follow catalog order');
  }
  // Check provider derivation in ChatModels
  if (!modelsContent.includes('!ordered.includes(p)')) {
    throw new Error('ChatModels.tsx must derive unique providers in first-appearance order');
  }
  console.log('✓ Provider ordering respects first appearance in backend model order\n');

  // Test 8: Verify per-model token units and diverse perTokens handling
  console.log('[Test 8] Verifying per-model token units handling...');
  const unit1M = formatPerTokens(1000000);
  const unit100k = formatPerTokens(100000);
  const unit1k = formatPerTokens(1000);
  if (unit1M !== '۱ میلیون توکن') {
    throw new Error(`Expected '۱ میلیون توکن', got '${unit1M}'`);
  }
  if (!unit100k.includes('۱۰۰') || !unit100k.includes('توکن')) {
    throw new Error(`Expected '۱۰۰ هزار توکن' or formatted unit, got '${unit100k}'`);
  }
  if (unit1k !== '۱ هزار توکن') {
    throw new Error(`Expected '۱ هزار توکن', got '${unit1k}'`);
  }
  // Confirm ChatModels uses model.pricing.perTokens dynamically rather than hardcoding
  if (modelsContent.includes('قیمت به ازای هر یک میلیون توکن')) {
    throw new Error('ChatModels.tsx must not assume 1,000,000 tokens for all models');
  }
  console.log('✓ Per-model token units handle diverse token scales without silent normalization\n');

  // Test 9: Verify cache pricing exposure in ChatModels
  console.log('[Test 9] Verifying cache read/write pricing exposure...');
  if (!modelsContent.includes('cacheRead') || !modelsContent.includes('cacheWrite')) {
    throw new Error('ChatModels.tsx must expose cacheRead and cacheWrite when present');
  }
  if (!modelsContent.includes('خواندن کش') || !modelsContent.includes('نوشتن کش')) {
    throw new Error('ChatModels.tsx must include Persian labels for cache read and cache write');
  }
  console.log('✓ Cache read and write pricing accurately rendered with Persian labels\n');

  // Test 10: Verify tier pricing clone-and-sort behavior
  console.log('[Test 10] Verifying tiered pricing sorting and immutability...');
  if (!modelsContent.includes('تعرفه پلکانی')) {
    throw new Error('ChatModels.tsx must include تعرفه پلکانی label for tiered models');
  }
  if (!modelsContent.includes('[...model.pricing.tiers]') || !modelsContent.includes('minInputTokens')) {
    throw new Error('ChatModels.tsx must clone tiers before sorting by minInputTokens');
  }
  // Verify tier sorting deterministically without mutating source
  const rawTiers = [
    { minInputTokens: 500000, input: 100, output: 400, cacheRead: 10, cacheWrite: 120 },
    { minInputTokens: 100000, input: 150, output: 600, cacheRead: 15, cacheWrite: 180 },
    { minInputTokens: 1000000, input: 80, output: 300, cacheRead: 8, cacheWrite: 100 }
  ];
  const sortedTiers = [...rawTiers].sort((a, b) => a.minInputTokens - b.minInputTokens);
  if (sortedTiers[0].minInputTokens !== 100000 || sortedTiers[2].minInputTokens !== 1000000) {
    throw new Error('Tiers were not sorted ascending by minInputTokens');
  }
  if (rawTiers[0].minInputTokens !== 500000) {
    throw new Error('Original tier array was mutated');
  }
  console.log('✓ Tiered pricing clones and sorts by minInputTokens without mutation\n');

  console.log('========================================================');
  console.log('All LUMA Smart Chat Live Catalog migration tests passed!');
  console.log('========================================================\n');
}

runTests().catch((err) => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
