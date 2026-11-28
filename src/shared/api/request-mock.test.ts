import { afterEach, describe, expect, it, vi } from 'vitest';
import { MockApiError, requestMock } from './request-mock';

afterEach(() => vi.unstubAllGlobals());

describe('requestMock', () => {
  it('uses an explicit origin for server requests', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response());
    vi.stubGlobal('fetch', fetchMock);

    await requestMock('/products', undefined, 'http://127.0.0.1:3000');
    expect(fetchMock).toHaveBeenCalledWith('http://127.0.0.1:3000/api/mock/products', undefined);
  });
  it('добавляет базовый путь и передаёт параметры fetch', async () => {
    const response = new Response(null, { status: 204 });
    const fetchMock = vi.fn().mockResolvedValue(response);
    const init = { method: 'POST', signal: new AbortController().signal };
    vi.stubGlobal('fetch', fetchMock);

    await expect(requestMock('/session/login', init)).resolves.toBe(response);
    expect(fetchMock).toHaveBeenCalledWith('/api/mock/session/login', init);
  });

  it('передаёт статус ошибки от API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 401 })));

    await expect(requestMock('/bookings')).rejects.toEqual(new MockApiError(401));
  });

  it('передаёт транспортный сбой без подмены на HTTP-ошибку', async () => {
    const error = new TypeError('Failed to fetch');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(error));

    await expect(requestMock('/session/login')).rejects.toBe(error);
  });
});
