const tokenKey = 'rental-session-token';

export function getSessionToken() {
  return sessionStorage.getItem(tokenKey);
}

export function saveSessionToken(token: string) {
  sessionStorage.setItem(tokenKey, token);
}

export function removeSessionToken() {
  sessionStorage.removeItem(tokenKey);
}
