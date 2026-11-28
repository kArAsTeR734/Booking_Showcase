import 'server-only';

import { QueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { MockApiError, requestMock } from '@/shared/api';
import { productDetailSchema } from '../model/product-detail';

export async function loadProduct(id: string) {
  const client = new QueryClient();
  try {
    const product = await client.fetchQuery({
      queryKey: ['product', id],
      queryFn: async ({ signal }) => {
        const origin = `http://127.0.0.1:${process.env.PORT ?? 3000}`;
        const response = await requestMock(
          `/products/${encodeURIComponent(id)}`,
          { signal, cache: 'no-store' },
          origin,
        );
        return productDetailSchema.parse(await response.json());
      },
      retry: false,
    });
    return { status: 'success' as const, product };
  } catch (error) {
    if (error instanceof MockApiError && error.status === 404)
      return { status: 'not-found' as const };
    if (
      error instanceof MockApiError ||
      error instanceof TypeError ||
      error instanceof SyntaxError ||
      error instanceof z.ZodError
    )
      return { status: 'error' as const };
    throw error;
  }
}
