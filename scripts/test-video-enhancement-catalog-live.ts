import {
  fetchCatalog,
  clearCatalogCache,
  findServiceById,
  getValidMediaModels,
  formatStartingPrice,
} from '../lib/catalogApi.ts';

async function runLiveTests() {
  console.log('=== LUMA Video Enhancement Live Production Smoke Test ===\n');

  console.log('[Live Smoke] Querying live catalog API for upscale_video service...');
  clearCatalogCache();
  const catalog = await fetchCatalog();
  const upscaleService = findServiceById(catalog, 'upscale_video');
  if (!upscaleService) {
    throw new Error("Service 'upscale_video' not found in live catalog response");
  }

  const validModels = getValidMediaModels(upscaleService);
  if (validModels.length === 0) {
    throw new Error("'upscale_video' has 0 valid models in live catalog");
  }

  console.log(`  Found ${validModels.length} models in live upscale_video service:`);
  for (const m of validModels) {
    if (!m.id || !m.name || !m.provider) {
      throw new Error(`Model missing id, name, or provider: ${JSON.stringify(m)}`);
    }
    const priceStr = formatStartingPrice(m.pricing?.minimum ?? 0, m.pricing?.currency ?? 'LUM');
    console.log(`    - [${m.id}] ${m.name} (${m.provider}) -> ${priceStr} | Legacy: ${m.legacy} | Caps: ${m.capabilities?.join(', ')}`);
  }

  console.log('\n✓ Live upscale_video service models verified\n');

  console.log('================================================================');
  console.log('Video Enhancement Live Smoke Test Passed!');
  console.log('================================================================');
}

runLiveTests().catch((err) => {
  console.error('\n✗ Video Enhancement live smoke test failed:', err);
  process.exit(1);
});
