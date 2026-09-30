import fs from 'node:fs';
import path from 'node:path';
import type { CatalogResponse, MediaCatalogModel } from '../lib/catalogApi.ts';
import {
  fetchCatalog,
  clearCatalogCache,
  formatLumValue,
} from '../lib/catalogApi.ts';
import {
  VIDEO_SERVICE_IDS,
  isVideoServiceId,
  workflowTabToServiceId,
  serviceIdToWorkflowTab,
  getVideoCatalogServices,
  groupVideoModelsById,
  getVideoWorkflowModels,
  getVideoDisplayModels,
  countUniqueVideoModels,
  getActiveReferenceModels,
  getFeaturedVideoModelNames,
  formatVideoStartingPrice,
  getWorkflowsBadgeLabel,
} from '../lib/videoCatalog.ts';

async function runTests() {
  console.log('=== LUMA Video Generation Live Catalog Migration Test Suite ===\n');

  // Test 1: Video Service Constants & ID Type Guards
  console.log('[Test 1] Verifying video service constants and type guards...');
  if (VIDEO_SERVICE_IDS.length !== 3) {
    throw new Error(`Expected 3 video services, found ${VIDEO_SERVICE_IDS.length}`);
  }
  if (!VIDEO_SERVICE_IDS.includes('text_to_video')) throw new Error('Missing text_to_video');
  if (!VIDEO_SERVICE_IDS.includes('image_to_video')) throw new Error('Missing image_to_video');
  if (!VIDEO_SERVICE_IDS.includes('reference_to_video')) throw new Error('Missing reference_to_video');

  if (!isVideoServiceId('text_to_video')) throw new Error('isVideoServiceId(text_to_video) failed');
  if (!isVideoServiceId('image_to_video')) throw new Error('isVideoServiceId(image_to_video) failed');
  if (!isVideoServiceId('reference_to_video')) throw new Error('isVideoServiceId(reference_to_video) failed');
  if (isVideoServiceId('chat')) throw new Error('isVideoServiceId(chat) must be false');
  if (isVideoServiceId('unknown')) throw new Error('isVideoServiceId(unknown) must be false');

  if (workflowTabToServiceId('text-to-video') !== 'text_to_video') throw new Error('workflowTabToServiceId failed for text');
  if (workflowTabToServiceId('image-to-video') !== 'image_to_video') throw new Error('workflowTabToServiceId failed for image');
  if (workflowTabToServiceId('reference-to-video') !== 'reference_to_video') throw new Error('workflowTabToServiceId failed for ref');
  if (workflowTabToServiceId('all') !== null) throw new Error('workflowTabToServiceId(all) must be null');

  if (serviceIdToWorkflowTab('text_to_video') !== 'text-to-video') throw new Error('serviceIdToWorkflowTab failed for text');
  if (serviceIdToWorkflowTab('image_to_video') !== 'image-to-video') throw new Error('serviceIdToWorkflowTab failed for image');
  if (serviceIdToWorkflowTab('reference_to_video') !== 'reference-to-video') throw new Error('serviceIdToWorkflowTab failed for ref');
  console.log('✓ Video service constants, guards, and bidirectional tab mappings verified\n');

  // Test 2: Formatting & Workflow Badges
  console.log('[Test 2] Verifying starting price and workflow badge helpers...');
  const priceLUM = formatVideoStartingPrice(250, 'LUM');
  const priceUSD = formatVideoStartingPrice(1.5, 'USD');
  const priceFree = formatVideoStartingPrice(0, 'LUM');

  if (!priceLUM.includes('۲۵۰') || !priceLUM.includes('لوم') || !priceLUM.includes('شروع از')) {
    throw new Error(`Unexpected priceLUM: ${priceLUM}`);
  }
  if (!priceUSD.includes('دلار') || !priceUSD.includes('شروع از')) {
    throw new Error(`Unexpected priceUSD: ${priceUSD}`);
  }
  if (priceFree !== 'رایگان') {
    throw new Error(`Expected 'رایگان' for 0 price, got '${priceFree}'`);
  }

  const badgeAll = getWorkflowsBadgeLabel(['text_to_video', 'image_to_video', 'reference_to_video']);
  const badgeTextImg = getWorkflowsBadgeLabel(['text_to_video', 'image_to_video']);
  const badgeRefOnly = getWorkflowsBadgeLabel(['reference_to_video']);
  const badgeTextOnly = getWorkflowsBadgeLabel(['text_to_video']);

  if (badgeAll !== 'متن، تصویر و مرجع') throw new Error(`Expected 'متن، تصویر و مرجع', got '${badgeAll}'`);
  if (badgeTextImg !== 'متن و تصویر') throw new Error(`Expected 'متن و تصویر', got '${badgeTextImg}'`);
  if (badgeRefOnly !== 'مرجع به ویدیو') throw new Error(`Expected 'مرجع به ویدیو', got '${badgeRefOnly}'`);
  if (badgeTextOnly !== 'متن به ویدیو') throw new Error(`Expected 'متن به ویدیو', got '${badgeTextOnly}'`);
  console.log('✓ Formatting and workflow badge helpers verified\n');

  // Test 3: Deterministic Mock Data Testing (Context Preservation & Grouping Rules)
  console.log('[Test 3] Verifying mock grouping, context preservation, and lowest price rules...');
  const mockCatalog: CatalogResponse = {
    data: {
      services: [
        {
          id: 'text_to_video',
          name: 'تولید ویدیو',
          type: 'media',
          models: [
            {
              id: 'model-shared',
              name: 'Model Shared (Text Context)',
              provider: 'Provider Alpha',
              description: 'Text-to-video description',
              legacy: false,
              featured: false,
              isNew: true,
              capabilities: ['1080p', 'صدا'],
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 300,
                description: '300 LUM base',
              },
            },
            {
              id: 'model-text-only',
              name: 'Model Text Only',
              provider: 'Provider Beta',
              description: 'Text only description',
              legacy: false,
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 150,
                description: '150 LUM base',
              },
            },
          ],
        },
        {
          id: 'image_to_video',
          name: 'تصویر به ویدیو',
          type: 'media',
          models: [
            {
              id: 'model-shared',
              name: 'Model Shared (Image Context)',
              provider: 'Provider Alpha',
              description: 'Image-to-video description',
              legacy: false,
              featured: true,
              isNew: false,
              capabilities: ['4K', 'مدت طولانی'],
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 200, // Cheaper than text context!
                description: '200 LUM base',
              },
            },
          ],
        },
        {
          id: 'reference_to_video',
          name: 'ویدیو با فایل مرجع',
          type: 'media',
          models: [
            {
              id: 'model-ref-only',
              name: 'Model Ref Only',
              provider: 'Provider Gamma',
              description: 'Ref only description',
              legacy: false,
              capabilities: ['چندمرجع'],
              pricing: {
                currency: 'LUM',
                type: 'starting_at',
                minimum: 500,
                description: '500 LUM base',
              },
            },
          ],
        },
        {
          id: 'image_generation',
          name: 'ساخت تصویر',
          type: 'media',
          models: [
            {
              id: 'flux-img-gen',
              name: 'Flux Image',
              provider: 'Black Forest Labs',
              description: 'Not a video model',
              legacy: false,
              pricing: { currency: 'LUM', type: 'starting_at', minimum: 50, description: '50 LUM' },
            },
          ],
        },
      ],
    },
  };

  // 3a. Verify getVideoCatalogServices ignores image_generation
  const videoServices = getVideoCatalogServices(mockCatalog);
  if (videoServices.length !== 3) {
    throw new Error(`Expected 3 video services from mock, got ${videoServices.length}`);
  }
  if (videoServices.some(s => s.id === 'image_generation')) {
    throw new Error('getVideoCatalogServices must not include image_generation');
  }

  // 3b. Verify groupVideoModelsById deduplicates
  const grouped = groupVideoModelsById(mockCatalog);
  if (grouped.length !== 3) {
    throw new Error(`Expected exactly 3 unique models (model-shared, model-text-only, model-ref-only), got ${grouped.length}`);
  }

  // 3c. Verify lowest starting price rule on model-shared
  const sharedGrouped = grouped.find(m => m.id === 'model-shared');
  if (!sharedGrouped) throw new Error('model-shared not found in grouped models');

  if (sharedGrouped.startingPrice !== 200) {
    throw new Error(`model-shared startingPrice must be lowest finite price (200), got ${sharedGrouped.startingPrice}`);
  }
  if (!sharedGrouped.startingPriceNote?.includes('کمترین تعرفه')) {
    throw new Error(`model-shared must include startingPriceNote when prices vary across workflows, got: ${sharedGrouped.startingPriceNote}`);
  }
  if (sharedGrouped.contexts.length !== 2) {
    throw new Error(`model-shared must preserve both service contexts, got ${sharedGrouped.contexts.length}`);
  }
  if (!sharedGrouped.supportedWorkflows.includes('text_to_video') || !sharedGrouped.supportedWorkflows.includes('image_to_video')) {
    throw new Error('model-shared must list text_to_video and image_to_video in supportedWorkflows');
  }
  if (sharedGrouped.badgeWorkflow !== 'متن و تصویر') {
    throw new Error(`Expected badgeWorkflow 'متن و تصویر', got '${sharedGrouped.badgeWorkflow}'`);
  }

  // 3d. Verify single-context model-ref-only does NOT have startingPriceNote
  const refOnlyGrouped = grouped.find(m => m.id === 'model-ref-only');
  if (!refOnlyGrouped) throw new Error('model-ref-only not found');
  if (refOnlyGrouped.startingPriceNote !== undefined) {
    throw new Error('Single-context model must not have startingPriceNote');
  }
  if (refOnlyGrouped.badgeWorkflow !== 'مرجع به ویدیو') {
    throw new Error(`Expected 'مرجع به ویدیو', got '${refOnlyGrouped.badgeWorkflow}'`);
  }

  // 3e. Verify workflow-specific authoritative context preservation
  const textSpecific = getVideoWorkflowModels(mockCatalog, 'text_to_video');
  const sharedInText = textSpecific.find(m => m.id === 'model-shared');
  if (!sharedInText) throw new Error('model-shared must be in text_to_video');
  if (sharedInText.startingPrice !== 300) {
    throw new Error(`In text_to_video tab, model-shared price must be 300, got ${sharedInText.startingPrice}`);
  }
  if (sharedInText.name !== 'Model Shared (Text Context)') {
    throw new Error('In text_to_video tab, authoritative text entry must be preserved');
  }

  const imgSpecific = getVideoWorkflowModels(mockCatalog, 'image_to_video');
  const sharedInImg = imgSpecific.find(m => m.id === 'model-shared');
  if (!sharedInImg) throw new Error('model-shared must be in image_to_video');
  if (sharedInImg.startingPrice !== 200) {
    throw new Error(`In image_to_video tab, model-shared price must be 200, got ${sharedInImg.startingPrice}`);
  }
  if (sharedInImg.name !== 'Model Shared (Image Context)') {
    throw new Error('In image_to_video tab, authoritative image entry must be preserved');
  }

  console.log('✓ Mock grouping, context preservation, and lowest price rules verified\n');

  // Test 4: Source Code Audit - Zero Static Model Catalogue in VideoModels.tsx
  console.log('[Test 4] Auditing VideoModels.tsx for zero static model catalogue...');
  const videoModelsSource = fs.readFileSync(path.join(process.cwd(), 'components/Services/VideoGeneration/VideoModels.tsx'), 'utf8');

  if (videoModelsSource.includes('const MODELS')) {
    throw new Error('VideoModels.tsx still contains static "const MODELS" catalogue!');
  }
  if (videoModelsSource.includes('FLUX 3",') && videoModelsSource.includes('speed: "Advanced"')) {
    throw new Error('VideoModels.tsx still contains hardcoded fake model specifications!');
  }
  if (videoModelsSource.includes('شروع از ۱۲۷۵ لوم') || videoModelsSource.includes('شروع از ۱۲۰۰ لوم')) {
    throw new Error('VideoModels.tsx contains hardcoded fake pricing strings!');
  }

  // Tailwind dynamic interpolation check
  if (videoModelsSource.match(/bg-\${/g) || videoModelsSource.match(/text-\${/g) || videoModelsSource.match(/border-\${/g)) {
    throw new Error('VideoModels.tsx must not use runtime dynamic Tailwind class interpolation!');
  }

  // Accessibility check
  if (!videoModelsSource.includes('role="tablist"')) {
    throw new Error('VideoModels.tsx must have role="tablist" for workflow filters');
  }
  if (!videoModelsSource.includes('role="tab"')) {
    throw new Error('VideoModels.tsx must have role="tab" on workflow filter buttons');
  }
  if (!videoModelsSource.includes('role="tabpanel"')) {
    throw new Error('VideoModels.tsx must have role="tabpanel" for models container');
  }
  if (!videoModelsSource.includes('handleTabKeyDown')) {
    throw new Error('VideoModels.tsx must implement accessible keyboard navigation for tabs');
  }
  console.log('✓ VideoModels.tsx source audit passed (zero static data, strict accessibility, static themes)\n');

  // Test 6: Source Code Audit - Page-Level useCatalog in VideoGenerationPage.tsx
  console.log('[Test 6] Auditing VideoGenerationPage.tsx for page-level catalog integration...');
  const pageSource = fs.readFileSync(path.join(process.cwd(), 'pages/VideoGenerationPage.tsx'), 'utf8');

  if (!pageSource.includes('useCatalog(')) {
    throw new Error('VideoGenerationPage.tsx must call useCatalog() at page level');
  }
  if (!pageSource.includes('catalog={data}')) {
    throw new Error('VideoGenerationPage.tsx must pass catalog data down to VideoModels');
  }
  if (!pageSource.includes('referenceModels=')) {
    throw new Error('VideoGenerationPage.tsx must pass active referenceModels down to VideoReference');
  }
  console.log('✓ VideoGenerationPage.tsx page-level hook integration verified\n');

  // Test 7: Source Code Audit - Dynamic Reference Models in VideoReference.tsx
  console.log('[Test 7] Auditing VideoReference.tsx for dynamic reference models...');
  const refSource = fs.readFileSync(path.join(process.cwd(), 'components/Services/VideoGeneration/VideoReference.tsx'), 'utf8');

  if (refSource.includes('«Seedance 2.0 Reference» (با صدا، ۱۰۸۰p)')) {
    throw new Error('VideoReference.tsx still has hardcoded model resolution claims!');
  }
  if (!refSource.includes('referenceModels')) {
    throw new Error('VideoReference.tsx must accept and use referenceModels prop');
  }
  console.log('✓ VideoReference.tsx dynamic reference models verified\n');

  // Test 8: Source Code Audit - Removal of Fake Prices in VideoFAQ.tsx
  console.log('[Test 8] Auditing VideoFAQ.tsx for removal of stale/fake prices...');
  const faqSource = fs.readFileSync(path.join(process.cwd(), 'components/Services/VideoGeneration/VideoFAQ.tsx'), 'utf8');

  if (faqSource.includes('۱۲۷۵ لوم') || faqSource.includes('۱۲۰۰ لوم')) {
    throw new Error('VideoFAQ.tsx still has hardcoded fake model prices (۱۲۷۵ لوم or ۱۲۰۰ لوم)!');
  }
  console.log('✓ VideoFAQ.tsx clean copy verified\n');

  console.log('====================================================');
  console.log('All Video Generation Live Catalog tests passed!');
  console.log('====================================================');
}

runTests().catch(err => {
  console.error('\n❌ Video Generation test suite failed:', err);
  process.exit(1);
});
