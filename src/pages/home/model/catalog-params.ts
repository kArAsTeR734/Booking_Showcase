import {
  categories,
  validatePrices,
  type CatalogParams,
  type Category,
  type Sort,
} from '@/entities/catalog';
import type { DateRange } from '@/shared/lib';
import { parsePeriod, readParam, safePeriod } from '@/entities/rental-period';
export { safePeriod };

export type CatalogSearchParams = Record<string, string | string[] | undefined>;

export function correctedPage(requested: string) {
  return `Параметр page=${requested} заменён на безопасное значение 1. Даты и корректные фильтры сохранены в ссылке.`;
}

function parseFilters(
  {
    category,
    minPrice,
    maxPrice,
    available,
  }: Record<'category' | 'minPrice' | 'maxPrice' | 'available', string | undefined>,
  notices: string[],
) {
  const validCategory = category !== undefined && Object.hasOwn(categories, category);
  const priceError = validatePrices(minPrice ?? '', maxPrice ?? '');
  if (category !== undefined && !validCategory) notices.push('Неизвестная категория сброшена.');
  if (priceError) notices.push(`Ценовой фильтр сброшен. ${priceError}`);
  if (available !== undefined && available !== 'true')
    notices.push('Неизвестный фильтр наличия сброшен.');

  return {
    category: validCategory ? (category as Category) : undefined,
    minPrice: priceError ? undefined : minPrice || undefined,
    maxPrice: priceError ? undefined : maxPrice || undefined,
    available: available === 'true' ? true : undefined,
  };
}

function parsePage(value: string | undefined, notices: string[]) {
  if (value === undefined) return 1;
  const page = Number(value);
  if (/^\d+$/.test(value) && Number.isSafeInteger(page) && page > 0) return page;
  notices.push(correctedPage(value));
  return 1;
}

export function parseCatalogParams(raw: CatalogSearchParams, fallback: DateRange) {
  const notices: string[] = [];
  const read = (key: string) => readParam(raw, key, notices);
  const dates = parsePeriod(read('start'), read('end'), fallback, notices);
  const filters = parseFilters(
    {
      category: read('category'),
      minPrice: read('minPrice'),
      maxPrice: read('maxPrice'),
      available: read('available'),
    },
    notices,
  );
  const sort = read('sort');
  const validSort: Sort | undefined =
    sort === 'price-asc' || sort === 'price-desc' ? sort : undefined;
  if (sort !== undefined && !validSort)
    notices.push('Порядок сортировки заменён на «По популярности».');
  const page = parsePage(read('page'), notices);

  const params: CatalogParams = { ...filters, dates, sort: validSort, page };
  return { params, notices };
}
