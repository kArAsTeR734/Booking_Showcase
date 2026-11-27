'use client';

import { createContext, useContext } from 'react';

export const RouteTransitionContext = createContext<{
  navigate: (href: string) => void;
  refresh: () => void;
  pending: boolean;
}>({ navigate: () => {}, refresh: () => {}, pending: false });

export function useRouteTransition() {
  return useContext(RouteTransitionContext);
}
