import { afterEach, expect, it, vi } from 'vitest';
import { loadProduct } from './load-product';
vi.mock('server-only', () => ({}));
afterEach(() => vi.unstubAllGlobals());
const product = {
  id: 'backpack',
  name: 'Рюкзак',
  category: 'gear',
  details: '45 л',
  dailyRate: 400,
  deposit: 1500,
  available: true,
  imageSrc: '/bag.png',
  characteristics: [{ label: 'Вес', value: '1,4 кг' }],
  pickupAddress: 'ул. Лесная, 18',
};
it('returns validated product data', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json(product)));
  expect(await loadProduct('backpack')).toEqual({ status: 'success', product });
});
it('distinguishes missing products and request failures', async () => {
  vi.stubGlobal(
    'fetch',
    vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 404 }))
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValueOnce(Response.json({ ...product, characteristics: null })),
  );
  expect(await loadProduct('unknown')).toEqual({ status: 'not-found' });
  expect(await loadProduct('backpack')).toEqual({ status: 'error' });
  expect(await loadProduct('backpack')).toEqual({ status: 'error' });
});
