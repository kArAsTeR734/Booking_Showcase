import { useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { catalogTotalOptions, categoryKeys, productQuery, type Category } from '@/entities/catalog';

const availableCategoryQueries = categoryKeys.map((category) =>
  catalogTotalOptions(productQuery({ category, available: true, page: 1 }).toString()),
);

export function useAvailableCategoryCounts(demo?: boolean) {
  const totals = useQueries({
    queries: demo ? [] : availableCategoryQueries,
  });
  const counts: Partial<Record<Category, number>> = {};
  totals.forEach(({ data, isSuccess }, index) => {
    if (isSuccess) counts[categoryKeys[index]] = data;
  });
  return counts;
}

export function useDraftCatalogTotal(query: string | undefined) {
  const [settledQuery, setSettledQuery] = useState<string>();

  useEffect(() => {
    if (query === undefined) return;
    const timeout = setTimeout(() => setSettledQuery(query), 250);
    return () => clearTimeout(timeout);
  }, [query]);

  const result = useQuery({
    ...catalogTotalOptions(query ?? ''),
    enabled: query !== undefined && query === settledQuery,
  });

  return query !== undefined && result.isSuccess ? result.data : undefined;
}
