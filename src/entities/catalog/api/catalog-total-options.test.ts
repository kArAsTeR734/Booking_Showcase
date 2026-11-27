import { QueryClient } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';
import { MockApiError } from '@/shared/api';
import { catalogTotalOptions } from './catalog-total-options';

afterEach(() => vi.unstubAllGlobals());

it('reads the full match count from the paginated endpoint and forwards the signal', async () => {
  const fetchMock = vi.fn().mockResolvedValue(Response.json({ items: [{}], total: 2 }));
  vi.stubGlobal('fetch', fetchMock);
  const client = new QueryClient();

  await expect(client.query(catalogTotalOptions('category=gear'))).resolves.toBe(2);
  expect(fetchMock).toHaveBeenCalledWith('/api/mock/products?category=gear', {
    signal: expect.any(AbortSignal),
  });
});

it('keeps zero distinct from an invalid response or an HTTP failure', async () => {
  vi.stubGlobal(
    'fetch',
    vi
      .fn()
      .mockResolvedValueOnce(Response.json({ total: 0 }))
      .mockResolvedValueOnce(Response.json({ total: -1 }))
      .mockResolvedValueOnce(Response.json({ total: 0 }, { status: 503 })),
  );
  const client = new QueryClient();

  await expect(client.query(catalogTotalOptions('minPrice=1700'))).resolves.toBe(0);
  await expect(client.query(catalogTotalOptions('category=tents'))).rejects.toThrow();
  await expect(client.query(catalogTotalOptions('category=sup'))).rejects.toEqual(
    new MockApiError(503),
  );
});
