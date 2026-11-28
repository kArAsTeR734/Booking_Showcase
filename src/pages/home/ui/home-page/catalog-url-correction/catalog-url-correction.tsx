'use client';

import { useEffect } from 'react';
import { useRouteTransition } from '@/shared/routing';

export function CatalogUrlCorrection({
  canonical,
  sourceQuery,
}: {
  canonical?: string;
  sourceQuery: string;
}) {
  const { pending } = useRouteTransition();
  useEffect(() => {
    // Keep the server-rendered explanation while correcting the address of this entry.
    if (!canonical || pending) return;
    const current = new URLSearchParams(window.location.search);
    current.sort();
    if (current.toString() === sourceQuery) {
      window.history.replaceState(null, '', canonical + window.location.hash);
    }
  }, [canonical, sourceQuery, pending]);

  return null;
}
