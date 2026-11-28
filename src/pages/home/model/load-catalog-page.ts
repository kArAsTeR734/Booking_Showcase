import { catalogHref, categories } from '@/entities/catalog';
import { loadCatalog } from '@/entities/catalog/index.server';
import { periodLabels } from '@/shared/lib';
import { currentSafePeriod } from '@/entities/rental-period';
import type { CatalogProductCard } from '@/widgets/catalog-results';
import { correctedPage, parseCatalogParams, type CatalogSearchParams } from './catalog-params';

function normalizedQuery(raw: CatalogSearchParams) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    if (value === undefined) continue;
    for (const item of Array.isArray(value) ? value : [value]) query.append(key, item);
  }
  query.sort();
  return query.toString();
}

export async function loadCatalogPage(raw: CatalogSearchParams) {
  const { params: requested, notices } = parseCatalogParams(raw, currentSafePeriod());
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
