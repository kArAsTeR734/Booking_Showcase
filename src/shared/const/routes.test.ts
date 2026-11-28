import { expect, it } from 'vitest';
import { ROUTES } from './routes';

it('builds a product URL with one encoded path segment', () => {
  expect(ROUTES.product('tent')).toBe('/product/tent');
  expect(ROUTES.product('a/b?')).toBe('/product/a%2Fb%3F');
});
