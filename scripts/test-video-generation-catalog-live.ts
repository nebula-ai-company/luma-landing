import type { CatalogResponse } from '../lib/catalogApi.ts';
import {
  fetchCatalog,
  clearCatalogCache,
} from '../lib/catalogApi.ts';
import {
  getVideoCatalogServices,
  countUniqueVideoModels,
  getActiveReferenceModels,
  getFeaturedVideoModelNames,
} from '../lib/videoCatalog.ts';

async function runLiveTests() {
  console.log('=== LUMA Video Generation Live Production Smoke Test ===\n');

  console.log('[Live Smoke] Verifying with live authoritative catalog API...');
  clearCatalogCache();
  const liveCatalog = await fetchCatalog();
  const liveVideoServices = getVideoCatalogServices(liveCatalog);
  console.log(`  Live video services count: ${liveVideoServices.length}`);
  if (liveVideoServices.length !== 3) {
    throw new Error(`Expected 3 live video services, got ${liveVideoServices.length}`);
  }

  const liveUniqueCount = countUniqueVideoModels(liveCatalog);
  console.log(`  Unique video models across all 3 workflows: ${liveUniqueCount}`);
  if (liveUniqueCount < 20) {
    throw new Error(`Expected at least 20 unique video models, got ${liveUniqueCount}`);
  }

  const liveRefModels = getActiveReferenceModels(liveCatalog);
  console.log(`  Active reference models count: ${liveRefModels.length}`);
  if (liveRefModels.length < 5) {
    throw new Error(`Expected at least 5 active reference models, got ${liveRefModels.length}`);
  }
  console.log(`  Sample reference models: ${liveRefModels.slice(0, 3).map(m => m.name).join(', ')}`);

  const featuredNames = getFeaturedVideoModelNames(liveCatalog, 5);
  console.log(`  Featured video model names: ${featuredNames.join(', ')}`);
  if (featuredNames.length < 3) {
    throw new Error('Expected at least 3 featured model names');
  }
  console.log('✓ Live video generation catalog integration verified\n');

  console.log('====================================================');
  console.log('Video Generation Live Smoke Test Passed!');
  console.log('====================================================');
}

runLiveTests().catch(err => {
  console.error('\n❌ Video Generation live smoke test failed:', err);
  process.exit(1);
});
