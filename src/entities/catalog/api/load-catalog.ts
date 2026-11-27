import 'server-only';

import { QueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { MockApiError, requestMock } from '@/shared/api';
import { productQuery, type CatalogQuery } from '../model/catalog-query';

const product = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['tents', 'sup', 'gear']),
  details: z.string(),
  dailyRate: z.number().nonnegative(),
  deposit: z.number().nonnegative(),
  available: z.boolean(),
  imageSrc: z.string(),
});

const responseSchema = z.object({
  items: z.array(product),
  total: z.number().int().nonnegative(),
  pageSize: z.number().int().positive(),
  page: z.number().int().positive(),
});

export async function loadCatalog(params: CatalogQuery) {
  const client = new QueryClient();
  function load(options: CatalogQuery) {
    const query = productQuery(options).toString();
    return client.query({
      queryKey: ['catalog', query],
      queryFn: async ({ signal }) => {
        const origin = `http://127.0.0.1:${process.env.PORT ?? 3000}`;
        const response = await requestMock(
          `/products?${query}`,
          { signal, cache: 'no-store' },
          origin,
        );
        return responseSchema.parse(await response.json());
      },
    });
  }

  try {
    let data = await load(params);
    const pages = Math.max(1, Math.ceil(data.total / data.pageSize));
    const correctedFrom = params.page > pages ? params.page : undefined;
    if (correctedFrom !== undefined) data = await load({ ...params, page: 1 });
    return { ...data, correctedFrom, updatedAt: new Date().toISOString() };
  } catch (error) {
    if (
      error instanceof MockApiError ||
      error instanceof TypeError ||
      error instanceof SyntaxError ||
      error instanceof z.ZodError
    ) {
      return null;
    }
    throw error;
  }
}
