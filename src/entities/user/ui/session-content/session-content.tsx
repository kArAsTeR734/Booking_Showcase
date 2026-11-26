'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/shared/ui';
import { useSessionStore } from '@/entities/user/model/hooks/use-session-store';

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
  const redirecting = status === 'guest' && pathname !== null && pathname !== '/auth';

  useEffect(() => {
    if (redirecting) router.replace('/auth');
  }, [redirecting, router]);
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
