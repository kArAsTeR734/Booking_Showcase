import {
  categories,
  validatePrices,
  type CatalogParams,
  type Category,
  type Sort,
} from '@/entities/catalog';
import type { DateRange } from '@/shared/lib';

export type CatalogSearchParams = Record<string, string | string[] | undefined>;

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function safePeriod(today: string): DateRange {
  const end = new Date(`${today}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + 3);
  return { start: today, end: end.toISOString().slice(0, 10) };
}

export function correctedPage(requested: string) {
  return `Параметр page=${requested} заменён на безопасное значение 1. Даты и корректные фильтры сохранены в ссылке.`;
}

function readParam(raw: CatalogSearchParams, key: string, notices: string[]) {
  const value = raw[key];
  if (!Array.isArray(value)) return value;
  notices.push(`Параметр ${key} указан несколько раз. Использовано первое значение.`);
  return value[0] ?? '';
}

function parsePeriod(
  start: string | undefined,
  end: string | undefined,
  fallback: DateRange,
  notices: string[],
) {
  if (start === undefined && end === undefined) return fallback;

  const validStart = start !== undefined && validDate(start);
  const validEnd = end !== undefined && validDate(end);
  if (!validStart)
    notices.push(`Дата выдачи отсутствует или указана неверно. Применена дата ${fallback.start}.`);
  if (!validEnd)
    notices.push(`Дата возврата отсутствует или указана неверно. Применена дата ${fallback.end}.`);

  if (validStart && validEnd) {
    if (start < end) return { start, end };
    notices.push(
      `Дата возврата должна быть позже даты выдачи. Использован период ${fallback.start} — ${fallback.end}.`,
    );
  } else if (validStart || validEnd) {
    notices.push(`Применён безопасный период ${fallback.start} — ${fallback.end}.`);
  }
  return fallback;
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
