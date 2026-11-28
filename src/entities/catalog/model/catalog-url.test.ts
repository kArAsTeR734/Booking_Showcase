import { expect, it } from 'vitest';
import { catalogHref, resetFilters, type CatalogParams } from './catalog-url';

const params: CatalogParams = {
  dates: { start: '2026-09-14', end: '2026-09-17' },
  page: 3,
  sort: 'price-desc',
  category: 'tents',
  minPrice: '0',
  maxPrice: '1200',
  available: true,
};

it('includes applied criteria and keeps a zero price bound', () => {
  expect(catalogHref(params)).toBe(
    '/?category=tents&minPrice=0&maxPrice=1200&available=true&sort=price-desc&page=3&start=2026-09-14&end=2026-09-17',
  );
});

it('clears filters and resets pagination while keeping sort and period', () => {
  expect(catalogHref(resetFilters(params))).toBe(
    '/?sort=price-desc&start=2026-09-14&end=2026-09-17',
  );
});
