'use client';

import { useRouter } from 'next/navigation';
import { useTransition, type ReactNode } from 'react';
import { RouteTransitionContext } from './route-transition-context';

export function RouteTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function navigate(href: string) {
    if (pending) return;
    startTransition(() => router.push(href, { scroll: false }));
  }

  function refresh() {
    if (pending) return;
    startTransition(() => router.refresh());
  }

  return (
    <RouteTransitionContext.Provider value={{ navigate, refresh, pending }}>
      {children}
    </RouteTransitionContext.Provider>
  );
}
