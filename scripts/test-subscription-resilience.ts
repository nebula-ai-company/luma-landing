import assert from 'node:assert';
import { STUDIO_PLANS } from '../components/Subscription/SubscriptionData.ts';
import { toPersianNum as blogToPersianNum } from '../lib/blogUtils.ts';
import { formatPersianDigits } from '../lib/catalogApi.ts';

console.log('Running Subscription & Number Formatting Resilience Tests...');

// 1. Check all plans have required numeric properties and valid types
for (const plan of STUDIO_PLANS) {
  assert(typeof plan.id === 'string' && plan.id.length > 0, `Plan ${plan.id} missing id`);
  assert(typeof plan.name === 'string' && plan.name.length > 0, `Plan ${plan.id} missing name`);
  assert(typeof plan.priceMonthly === 'number', `Plan ${plan.id} missing priceMonthly`);
  assert(typeof plan.originalPriceMonthly === 'number', `Plan ${plan.id} missing originalPriceMonthly`);
  assert(typeof plan.lumIncluded === 'number', `Plan ${plan.id} missing lumIncluded`);
  assert(typeof plan.extraLumDiscount === 'string', `Plan ${plan.id} missing extraLumDiscount`);
  assert(typeof plan.storage === 'string', `Plan ${plan.id} missing storage`);
  assert(typeof plan.concurrent === 'number', `Plan ${plan.id} missing concurrent`);
  assert(typeof plan.earlyAccess === 'string', `Plan ${plan.id} missing earlyAccess`);
  assert(typeof plan.presets === 'string', `Plan ${plan.id} missing presets`);
  assert(typeof plan.support === 'string', `Plan ${plan.id} missing support`);
}
console.log('✓ All STUDIO_PLANS have all required properties including lumIncluded.');

// 2. Test toPersianNum and formatPersianDigits with all edge cases
const edgeCases = [undefined, null, '', 0, 123, -5, '456', NaN, Infinity, -Infinity];
for (const val of edgeCases) {
  assert.doesNotThrow(() => {
    const res = blogToPersianNum(val as any);
    assert(typeof res === 'string');
  }, `blogToPersianNum threw on: ${val}`);

  assert.doesNotThrow(() => {
    const res = formatPersianDigits(val as any);
    assert(typeof res === 'string');
  }, `formatPersianDigits threw on: ${val}`);
}
console.log('✓ toPersianNum and formatPersianDigits safely handle null, undefined, NaN, and edge cases.');

console.log('========================================');
console.log('All Subscription Resilience Tests Passed!');
console.log('========================================');
