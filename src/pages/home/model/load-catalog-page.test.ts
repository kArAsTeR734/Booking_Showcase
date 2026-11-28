import { afterEach, expect, it, vi } from 'vitest';
import { loadCatalogPage } from './load-catalog-page';

vi.mock('server-only', () => ({}));

afterEach(() => vi.unstubAllGlobals());

it('builds the catalog from the mock API response', async () => {
  const product = {
    id: 'tent',
    name: 'Палатка',
    category: 'tents',
    details: '3 места',
    dailyRate: 900,
    deposit: 2000,
    available: false,
    imageSrc: '/images/rental-equipment.png',
  };
  const fetchMock = vi
    .fn()
    .mockResolvedValue(Response.json({ items: [product], total: 3, pageSize: 2, page: 1 }));
  vi.stubGlobal('fetch', fetchMock);

  const page = await loadCatalogPage({ start: '2026-09-14', end: '2026-09-17' });

  expect(fetchMock).toHaveBeenCalledOnce();
  expect(page).toMatchObject({ total: 3, pages: 2, canonical: undefined });
  expect(page.products).toEqual([
    { ...product, category: 'Палатки', availability: 'Недоступно', unavailable: true },
  ]);
});

it('builds a canonical URL and notice after the server corrects the page', async () => {
  vi.stubGlobal(
    'fetch',
    vi
      .fn()
      .mockResolvedValueOnce(Response.json({ items: [], total: 3, pageSize: 2, page: 99 }))
      .mockResolvedValueOnce(Response.json({ items: [], total: 3, pageSize: 2, page: 1 })),
  );

  const page = await loadCatalogPage({
    category: 'gear',
    page: '99',
    start: '2026-09-14',
    end: '2026-09-17',
  });

  expect(page.params.page).toBe(1);
  expect(page.sourceQuery).toBe('category=gear&end=2026-09-17&page=99&start=2026-09-14');
  expect(page.canonical).toBe('/?category=gear&start=2026-09-14&end=2026-09-17');
  expect(page.notices).toEqual([expect.stringContaining('page=99')]);
});
