import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';
import { requestMock } from '@/shared/api';

const catalogTotalSchema = z.object({ total: z.number().int().nonnegative() });

export function catalogTotalOptions(query: string) {
  return queryOptions({
    queryKey: ['catalog-total', query],
    queryFn: async ({ signal }) => {
      const response = await requestMock(`/products?${query}`, { signal });
      return catalogTotalSchema.parse(await response.json()).total;
    },
    staleTime: 30_000,
    retry: false,
  });
}
