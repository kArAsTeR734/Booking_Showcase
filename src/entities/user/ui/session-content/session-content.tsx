'use client';

import { useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/const';
import { Button } from '@/shared/ui';
import { useSessionStore } from '../../model/hooks/use-session-store';

const subscribeToHydration = () => () => {};

export function SessionContent({
  children,
  onRetry,
}: {
  children: ReactNode;
  onRetry: () => void;
}) {
  const status = useSessionStore((state) => state.status);
  const pathname = usePathname();
  const router = useRouter();
  // The prerendered 404 and the browser can see different paths during hydration.
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const requiresSession = hydrated && pathname === ROUTES.bookingHistory;
  const redirecting = requiresSession && status === 'guest';

  useEffect(() => {
    if (redirecting) router.replace(ROUTES.auth);
  }, [redirecting, router]);

  if (!requiresSession && pathname !== ROUTES.auth) return children;

  return (
    <>
      {status === 'checking' ? <p role="status">Проверяем сессию…</p> : null}
      {status === 'error' ? (
        <div role="alert">
          <p>Не удалось проверить сессию. Проверьте подключение.</p>
          <Button onClick={onRetry}>Повторить</Button>
        </div>
      ) : null}
      {redirecting ? <p role="status">Переходим ко входу…</p> : null}
      {status !== 'checking' && status !== 'error' && !redirecting ? children : null}
    </>
  );
}
