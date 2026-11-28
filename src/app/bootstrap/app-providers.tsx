import type { ReactNode } from 'react';
import { UserSessionProvider } from '@/entities/user';
import { QueryProvider } from './query-provider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <UserSessionProvider>{children}</UserSessionProvider>
    </QueryProvider>
  );
}
