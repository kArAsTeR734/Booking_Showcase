'use client';

import { useContext } from 'react';
import { useStore } from 'zustand';
import { SessionContext } from '../context/session-context';
import type { SessionStore } from '../store/sessionStore';

export function useSessionStore<T>(selector: (state: SessionStore) => T): T {
  const store = useContext(SessionContext);
  if (!store) throw new Error('UserSessionProvider is missing');
  return useStore(store, selector);
}
