import { useState, type SubmitEvent } from 'react';
import {
  catalogHref,
  productQuery,
  resetFilters,
  validatePrices,
  type CatalogParams,
  type Filters,
} from '@/entities/catalog';
import { useRouteTransition } from '@/shared/routing';
import { useDraftCatalogTotal } from './use-catalog-filter-counts';

export function useCatalogFilterForm(
  params: CatalogParams,
  total: number | undefined,
  onClose: () => void,
) {
  const { navigate } = useRouteTransition();
  const [filters, setFilters] = useState<Filters>(() => ({
    category: params.category,
    available: params.available,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
  }));
  const [error, setError] = useState<string>();
  const draft = {
    category: filters.category,
    available: filters.available,
    minPrice: filters.minPrice || undefined,
    maxPrice: filters.maxPrice || undefined,
  };
  const draftQuery = productQuery({ ...draft, page: 1 }).toString();
  const appliedQuery = productQuery({ ...params, sort: undefined, page: 1 }).toString();
  const knownTotal = draftQuery === appliedQuery ? total : undefined;
  const priceError = validatePrices(filters.minPrice ?? '', filters.maxPrice ?? '');
  const draftTotal = useDraftCatalogTotal(
    priceError || knownTotal !== undefined ? undefined : draftQuery,
  );

  function apply(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(priceError);
    if (priceError) return;
    onClose();
    navigate(catalogHref({ ...params, ...draft, page: 1 }));
  }

  function reset() {
    setFilters({});
    setError(undefined);
    onClose();
    navigate(catalogHref(resetFilters(params)));
  }

  return { filters, setFilters, error, matchCount: knownTotal ?? draftTotal, apply, reset };
}
