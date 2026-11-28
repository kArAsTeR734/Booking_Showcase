const mockBaseUrl = '/api/mock';

export class MockApiError extends Error {
  constructor(readonly status: number) {
    super(`Mock API returned HTTP ${status}`);
  }
}

export async function requestMock(path: `/${string}`, init?: RequestInit, origin = '') {
  const response = await fetch(`${origin}${mockBaseUrl}${path}`, init);
  if (!response.ok) throw new MockApiError(response.status);
  return response;
}
