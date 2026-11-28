import { catalogHref, productQuery, resetFilters } from '@/entities/catalog';
import { describe, expect, it } from 'vitest';
import { parseCatalogParams, safePeriod } from './catalog-params';

const fallback = { start: '2026-11-26', end: '2026-11-29' };

describe('catalog URL', () => {
  it('restores a leap-day period, filters, sort, and page from a direct link', () => {
    const { params, notices } = parseCatalogParams(
      {
        start: '2028-02-29',
        end: '2028-03-02',
        category: 'gear',
        available: 'true',
        minPrice: '0',
        maxPrice: '900',
        sort: 'price-desc',
        page: '2',
      },
      fallback,
    );
    expect(notices).toEqual([]);
    expect(catalogHref(params)).toBe(
      '/?category=gear&minPrice=0&maxPrice=900&available=true&sort=price-desc&page=2&start=2028-02-29&end=2028-03-02',
    );
    expect(productQuery(params).has('start')).toBe(false);
    expect(catalogHref(resetFilters(params))).toBe(
      '/?sort=price-desc&start=2028-02-29&end=2028-03-02',
    );
  });

  it('uses a three-day period across the new year', () => {
    expect(safePeriod('2026-12-30')).toEqual({ start: '2026-12-30', end: '2027-01-02' });
    expect(parseCatalogParams({}, fallback)).toEqual({
      params: { dates: fallback, page: 1 },
      notices: [],
    });
  });

  it.each([
    [{ start: '2026-02-29', end: '2026-03-03' }, 'Дата выдачи'],
    [{ start: '2026-03-01' }, 'Дата возврата'],
    [{ start: '2026-03-04', end: '2026-03-01' }, 'Дата возврата должна быть позже'],
    [{ start: '2026-03-04', end: '2026-03-04' }, 'Дата возврата должна быть позже'],
  ])('corrects invalid or unordered dates %j', (raw, reason) => {
    const { params, notices } = parseCatalogParams(raw, fallback);
    expect(params.dates).toEqual(fallback);
    expect(notices.join(' ')).toContain(reason);
    expect(notices.join(' ')).toContain(fallback.end);
  });

  it.each(['-1', '0', '1.2', '1e2', '9007199254740992', ''])(
    'corrects an invalid page %s and keeps valid filters',
    (page) => {
      const { params, notices } = parseCatalogParams(
        { page, category: 'tents', sort: 'price-asc' },
        fallback,
      );
      expect(params).toEqual({ dates: fallback, page: 1, category: 'tents', sort: 'price-asc' });
      expect(notices[0]).toContain(`page=${page}`);
    },
  );

  it('reports duplicate filters and discards unsupported values', () => {
    const { params, notices } = parseCatalogParams(
      {
        category: ['gear', 'tents'],
        available: 'yes',
        sort: 'name',
        minPrice: '900',
        maxPrice: '700',
      },
      fallback,
    );
    expect(params).toEqual({ dates: fallback, page: 1, category: 'gear' });
    expect(notices).toHaveLength(4);
  });
});
