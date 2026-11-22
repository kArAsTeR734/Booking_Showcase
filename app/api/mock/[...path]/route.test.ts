import { describe, expect, it } from 'vitest';
import { GET, POST } from './route';

function request(method: 'GET' | 'POST', path: string, headers?: HeadersInit, body?: unknown) {
  const url = new URL(`http://localhost/api/mock/${path}`);
  const context = {
    params: Promise.resolve({ path: url.pathname.slice('/api/mock/'.length).split('/') }),
  };
  return (method === 'GET' ? GET : POST)(
    new Request(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
    context,
  );
}

async function login() {
  const response = await request('POST', 'session/login');
  const { token } = await response.json();
  return { Authorization: `Bearer ${token}` };
}

describe('rental HTTP mock', () => {
  it('serves sorted and paginated catalog fixtures and returns 404 for unknown products', async () => {
    const response = await request('GET', 'products?available=true&sort=price-asc&page=2');
    expect(await response.json()).toMatchObject({
      items: [{ id: 'sup' }],
      page: 2,
      pageSize: 2,
      total: 3,
    });
    const empty = await request('GET', 'products?category=gear&minPrice=1000');
    expect(await empty.json()).toMatchObject({ items: [], total: 0 });
    expect((await request('GET', 'products/unknown')).status).toBe(404);
  });

  it('returns 401 for missing or simulated expired sessions and allows a retry after refresh', async () => {
    expect((await request('GET', 'bookings')).status).toBe(401);
    const headers = await login();
    const expired = await request('GET', 'bookings', {
      ...headers,
      'x-mock-scenario': 'expired-session',
    });
    expect(expired.status).toBe(401);
    expect(await expired.json()).toEqual({ code: 'SESSION_EXPIRED' });
    expect((await request('POST', 'session/refresh', headers)).status).toBe(200);
    expect((await request('GET', 'bookings', headers)).status).toBe(200);
  });

  it('identifies unavailable items, retries payment on the same booking and keeps history session-scoped', async () => {
    const headers = { ...(await login()), 'Idempotency-Key': 'cart-1' };
    const tent = { productId: 'tent', quantity: 1 };
    const sup = { productId: 'sup', quantity: 1 };
    const conflict = await request(
      'POST',
      'bookings',
      { ...headers, 'x-mock-scenario': 'availability-conflict' },
      { items: [tent, sup] },
    );
    expect(conflict.status).toBe(409);
    expect(await conflict.json()).toEqual({
      code: 'AVAILABILITY_CONFLICT',
      unavailableProductIds: ['tent'],
    });

    const body = { items: [sup] };
    const created = await request('POST', 'bookings', headers, body);
    expect(created.status).toBe(201);
    const booking = await created.json();
    const duplicate = await request('POST', 'bookings', headers, body);
    expect(await duplicate.json()).toEqual(booking);
    expect((await request('POST', 'bookings', headers, { items: [tent] })).status).toBe(409);
    expect(
      (await request('POST', 'bookings', headers, { items: [{ ...sup, quantity: 0 }] })).status,
    ).toBe(400);

    const payment = `bookings/${booking.id}/payment`;
    const failed = await request('POST', payment, {
      ...headers,
      'x-mock-scenario': 'payment-failed',
    });
    expect(failed.status).toBe(402);
    expect(await failed.json()).toEqual({ code: 'PAYMENT_FAILED' });
    expect(await (await request('GET', 'bookings', headers)).json()).toEqual({ items: [] });

    const retry = await request('POST', payment, headers);
    const paid = { ...booking, status: 'paid' };
    expect(await retry.json()).toEqual(paid);
    expect(await (await request('POST', payment, headers)).json()).toEqual(paid);
    expect(await (await request('GET', 'bookings', headers)).json()).toEqual({ items: [paid] });
    expect(await (await request('GET', 'bookings', await login())).json()).toEqual({ items: [] });
  });
});
