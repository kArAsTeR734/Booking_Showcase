import { useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { catalogTotalOptions, categoryKeys, productQuery, type Category } from '@/entities/catalog';

const availableCategoryQueries = categoryKeys.map((category) => ({
  ...catalogTotalOptions(productQuery({ category, available: true, page: 1 }).toString()),
  select: (count: number) => ({ category, count }),
}));

export function useAvailableCategoryCounts(demo?: boolean): Partial<Record<Category, number>> {
  const totals = useQueries({
    queries: demo ? [] : availableCategoryQueries,
  });
  return Object.fromEntries(
    totals.flatMap(({ data, isSuccess }) =>
      isSuccess ? [[data.category, data.count] as const] : [],
    ),
  );
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
