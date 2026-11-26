'use client';

import { createContext } from 'react';
import type { createSessionStore } from '../store/sessionStore';

export const SessionContext = createContext<ReturnType<typeof createSessionStore> | null>(null);
