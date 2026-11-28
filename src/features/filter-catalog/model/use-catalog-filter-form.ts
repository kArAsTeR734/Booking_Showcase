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
  visible: boolean,
) {
  const { navigate, pending } = useRouteTransition();
  const [filters, setFilters] = useState<Filters>(() => ({
    category: params.category,
    available: params.available,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
  }));
  const [hasSubmitted, setHasSubmitted] = useState(false);
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
    !visible || priceError || knownTotal !== undefined ? undefined : draftQuery,
  );

  function apply(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setHasSubmitted(true);
    if (priceError) return;
    onClose();
    navigate(catalogHref({ ...params, ...draft, page: 1 }));
  }

  function reset() {
    if (pending) return;
    setFilters({});
    setHasSubmitted(false);
    onClose();
    navigate(catalogHref(resetFilters(params)));
  }

  return {
    filters,
    setFilters,
    error: hasSubmitted ? priceError : undefined,
    matchCount: knownTotal ?? draftTotal,
    pending,
    apply,
    reset,
  };
}
