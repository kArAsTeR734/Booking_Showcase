import { catalogHref, categories } from '@/entities/catalog';
import { loadCatalog } from '@/entities/catalog/index.server';
import { periodLabels } from '@/shared/lib';
import type { CatalogProductCard } from '@/widgets/catalog-results';
import { demoParams, demoProducts } from './catalog-demo';
import {
  correctedPage,
  parseCatalogParams,
  safePeriod,
  type CatalogSearch,
} from './catalog-params';

const calendarDate = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Volgograd' });

function normalizedQuery(raw: CatalogSearch) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    if (value === undefined) continue;
    for (const item of Array.isArray(value) ? value : [value]) query.append(key, item);
  }
  query.sort();
  return query.toString();
}

export async function loadCatalogPage(raw: CatalogSearch) {
  if (raw.demo === '1') {
    const products: CatalogProductCard[] = demoProducts.map((product) => ({
      ...product,
      imageSrc: '/images/rental-equipment.png',
      unavailable: false,
    }));
    return {
      params: demoParams,
      demo: true,
      products,
      total: 24,
      pages: 8,
      range: periodLabels(demoParams.dates).range,
      canonical: undefined,
      sourceQuery: '',
      notices: [
        'Параметр page=99 заменён на безопасное значение 1. Даты и фильтры сохранены в ссылке.',
      ],
      updatedAt: undefined,
    };
  }

  const today = calendarDate.format(new Date());
  const { params: requested, notices } = parseCatalogParams(raw, safePeriod(today));
  const data = await loadCatalog(requested);
  const params = { ...requested, page: data?.page ?? requested.page };
  if (data?.correctedFrom !== undefined) notices.push(correctedPage(String(data.correctedFrom)));

  const products: CatalogProductCard[] = (data?.items ?? []).map((product) => ({
    ...product,
    category: categories[product.category],
    availability: product.available ? 'Доступно' : 'Недоступно',
    unavailable: !product.available,
  }));
  const canonical = notices.length > 0 || !raw.start || !raw.end ? catalogHref(params) : undefined;

  return {
    params,
    demo: false,
    products,
    total: data?.total,
    pages: data ? Math.ceil(data.total / data.pageSize) : 0,
    range: periodLabels(params.dates).range,
    canonical,
    sourceQuery: canonical ? normalizedQuery(raw) : '',
    notices,
    updatedAt: data?.updatedAt,
  };
}
