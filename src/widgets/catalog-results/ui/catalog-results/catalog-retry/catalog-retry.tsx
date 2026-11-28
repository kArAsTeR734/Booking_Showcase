'use client';

import { Button } from '@/shared/ui';
import { useRouteTransition } from '@/shared/routing';
export function CatalogRetry() {
  const { refresh, pending } = useRouteTransition();
  return (
    <Button onClick={refresh} disabled={pending}>
      Повторить
    </Button>
  );
}
