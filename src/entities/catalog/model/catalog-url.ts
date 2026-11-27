import { ROUTES } from '@/shared/const';
import type { DateRange } from '@/shared/lib';
import { productQuery, type CatalogQuery } from './catalog-query';

export type CatalogParams = CatalogQuery & { dates: DateRange };

export function catalogHref(params: CatalogParams) {
  const query = productQuery(params);
  query.set('start', params.dates.start);
  query.set('end', params.dates.end);
  return `${ROUTES.catalog}?${query}`;
}

export function resetFilters({ dates, sort }: CatalogParams): CatalogParams {
  return { dates, sort, page: 1 };
}
