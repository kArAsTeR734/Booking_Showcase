import { expect, it } from 'vitest';
import { validatePrices } from './validate-prices';

it('validates both price bounds and permits a single or equal bound', () => {
  expect(validatePrices('0', '')).toBeUndefined();
  expect(validatePrices('500', '500')).toBeUndefined();
  expect(validatePrices('900', '700')).toContain('выше');
  expect(validatePrices('', '-1')).toContain('неотрицательные');
  expect(validatePrices('1.99', '')).toContain('целые');
});
