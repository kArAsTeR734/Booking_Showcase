'use client';

import { useRouter } from 'next/navigation';
import { useTransition, type ReactNode } from 'react';
import { RouteTransitionContext } from './route-transition-context';

export function RouteTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <RouteTransitionContext.Provider
      value={{
        navigate: (href) => startTransition(() => router.push(href, { scroll: false })),
        refresh: () => startTransition(() => router.refresh()),
        pending,
      }}
    >
      {children}
    </RouteTransitionContext.Provider>
  );
}
