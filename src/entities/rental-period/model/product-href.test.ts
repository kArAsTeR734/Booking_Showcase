import { expect, it } from 'vitest';
import { productHref } from './product-href';

it('encodes product identifiers and keeps both dates', () => {
  expect(productHref('bag / 1', { start: '2026-09-14', end: '2026-09-17' })).toBe(
    '/product/bag%20%2F%201?start=2026-09-14&end=2026-09-17',
  );
});
