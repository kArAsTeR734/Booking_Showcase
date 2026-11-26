import { createStore } from 'zustand/vanilla';
import type { User } from '../types/user.types';

export type Session = { token: string; user: User };
export type SessionStore = {
  session: Session | null;
  status: 'checking' | 'authenticated' | 'guest' | 'error';
  setSession: (session: Session) => void;
};

export const createSessionStore = () =>
  createStore<SessionStore>()((set) => ({
    session: null,
    status: 'checking',
    setSession: (session) => set({ session, status: 'authenticated' }),
  }));
