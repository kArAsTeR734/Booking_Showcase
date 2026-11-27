import { afterEach, expect, it, vi } from 'vitest';
import { loadCatalog } from './load-catalog';

vi.mock('server-only', () => ({}));

afterEach(() => vi.unstubAllGlobals());

it('refetches the first page when the requested page is beyond the server total', async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce(Response.json({ items: [], total: 3, pageSize: 2, page: 99 }))
    .mockResolvedValueOnce(Response.json({ items: [], total: 3, pageSize: 2, page: 1 }));
  vi.stubGlobal('fetch', fetchMock);

  const data = await loadCatalog({ page: 99, sort: 'price-desc' });
  expect(data).toMatchObject({ page: 1, total: 3, correctedFrom: 99 });
  expect(fetchMock.mock.calls.map(([url]) => new URL(url).search)).toEqual([
    '?sort=price-desc&page=99',
    '?sort=price-desc',
  ]);
  expect(fetchMock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
});

it('treats a valid empty first page as a successful response', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(Response.json({ items: [], total: 0, pageSize: 2, page: 1 })),
  );
  await expect(loadCatalog({ page: 1 })).resolves.toMatchObject({ page: 1, total: 0 });
});

it.each([
  () => Promise.reject(new TypeError('network')),
  () => Promise.resolve(new Response(null, { status: 503 })),
  () => Promise.resolve(Response.json({ items: [] })),
])('handles a failed catalog request', async (fetchMock) => {
  vi.stubGlobal('fetch', fetchMock);
  await expect(loadCatalog({ page: 1 })).resolves.toBeNull();
});
