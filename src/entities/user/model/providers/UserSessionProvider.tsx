'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { MockApiError, requestMock } from '@/shared/api';
import { SessionContent } from '../../ui/session-content/session-content';
import { SessionContext } from '../context/session-context';
import { sessionSchema } from '../types/session-schema';
import { createSessionStore } from '../store/sessionStore';
import { getSessionToken, removeSessionToken } from '../utils/session-token';

export function UserSessionProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createSessionStore());
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const token = getSessionToken();
    if (!token) {
      store.setState({ status: 'guest' });
      return;
    }
    const controller = new AbortController();
    store.setState({ status: 'checking' });
    void requestMock('/session/refresh', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((body: unknown) => {
        const session = sessionSchema.parse(body);
        if (session.token !== token) throw new MockApiError(401);
        if (!controller.signal.aborted) store.getState().setSession(session);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        if (error instanceof MockApiError && error.status === 401) {
          removeSessionToken();
          store.setState({ session: null, status: 'guest' });
          return;
        }
        store.setState({ session: null, status: 'error' });
      });
    return () => controller.abort();
  }, [attempt, store]);

  return (
    <SessionContext.Provider value={store}>
      <SessionContent onRetry={() => setAttempt((value) => value + 1)}>{children}</SessionContent>
    </SessionContext.Provider>
  );
}
