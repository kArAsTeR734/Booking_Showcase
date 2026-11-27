import { afterEach, expect, it, vi } from 'vitest';
import { loadCatalogPage } from './load-catalog-page';

vi.mock('server-only', () => ({}));

afterEach(() => vi.unstubAllGlobals());

it('loads the reference layout without requesting products', async () => {
  const fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);

  const page = await loadCatalogPage({ demo: '1' });

  expect(fetchMock).not.toHaveBeenCalled();
  expect(page).toMatchObject({ total: 24, pages: 8, canonical: undefined });
  expect(page.products).toHaveLength(6);
  expect(page.products.filter((product) => product.mobile)).toHaveLength(2);
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
