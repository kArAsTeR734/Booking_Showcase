import { afterEach, describe, expect, it, vi } from 'vitest';
import { getSessionToken, removeSessionToken, saveSessionToken } from './session-token';

afterEach(() => vi.unstubAllGlobals());

describe('session token', () => {
  it('saves, reads and removes the token in sessionStorage', () => {
    const values = new Map<string, string>();
    vi.stubGlobal('sessionStorage', {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
    });
    expect(getSessionToken()).toBeNull();
    saveSessionToken('test-token');
    expect(getSessionToken()).toBe('test-token');
    removeSessionToken();
    expect(getSessionToken()).toBeNull();
  });
});
