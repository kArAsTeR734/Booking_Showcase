import { getProduct, listProducts } from './catalog';

type RouteContext = { params: Promise<{ path: string[] }> };
type BookingItem = { productId: string; quantity: number };
type Booking = {
  id: string;
  items: BookingItem[];
  status: 'pending-payment' | 'paid';
};

type MockUser = { id: string; name: string; surname: string };
const sessions = new Map<string, { user: MockUser; bookings: Map<string, Booking> }>();

function error(status: number, code: string) {
  return Response.json({ code }, { status });
}

function isBookingItem(value: unknown): value is BookingItem {
  if (typeof value !== 'object' || value === null) return false;

  return (
    'productId' in value &&
    typeof value.productId === 'string' &&
    'quantity' in value &&
    typeof value.quantity === 'number' &&
    Number.isSafeInteger(value.quantity) &&
    value.quantity > 0
  );
}

function getSession(request: Request) {
  const token = request.headers.get('authorization')?.match(/^Bearer (\S+)$/i)?.[1];
  const session = token ? sessions.get(token) : undefined;
  return token && session ? { token, ...session } : undefined;
}

export async function GET(request: Request, context: RouteContext) {
  const [resource, id, ...rest] = (await context.params).path;
  if (rest.length > 0) return error(404, 'NOT_FOUND');
  if (resource === 'products' && !id) {
    return Response.json(listProducts(new URL(request.url).searchParams));
  }
  if (process.env.NODE_ENV === 'production') return error(404, 'NOT_FOUND');

  if (resource === 'products') {
    const product = getProduct(id);
    return product ? Response.json(product) : error(404, 'NOT_FOUND');
  }

  if (resource === 'bookings' && !id) {
    const bookings = getSession(request)?.bookings;
    if (!bookings || request.headers.get('x-mock-scenario') === 'expired-session') {
      return error(401, 'SESSION_EXPIRED');
    }
    return Response.json({
      items: [...bookings.values()].filter(({ status }) => status === 'paid'),
    });
  }

  return error(404, 'NOT_FOUND');
}

export async function POST(request: Request, context: RouteContext) {
  if (process.env.NODE_ENV === 'production') return error(404, 'NOT_FOUND');

  const [resource, id, action, ...rest] = (await context.params).path;
  if (rest.length > 0) return error(404, 'NOT_FOUND');

  if (resource === 'session' && id === 'login' && !action) {
    const token = crypto.randomUUID();
    const user = { id: crypto.randomUUID(), name: 'Алексей', surname: 'Иванов' };
    sessions.set(token, { user, bookings: new Map() });
    return Response.json({ token, user });
  }

  const session = getSession(request);
  if (resource === 'session' && id === 'refresh' && !action) {
    return session?.bookings && request.headers.get('x-mock-scenario') !== 'expired-session'
      ? Response.json({ token: session.token, user: session.user })
      : error(401, 'SESSION_EXPIRED');
  }

  if (resource !== 'bookings' || (id && action !== 'payment')) return error(404, 'NOT_FOUND');

  const scenario = request.headers.get('x-mock-scenario');
  const bookings = session?.bookings;
  if (!bookings || scenario === 'expired-session') return error(401, 'SESSION_EXPIRED');

  if (id) {
    const booking = [...bookings.values()].find((entry) => entry.id === id);
    if (!booking) return error(404, 'NOT_FOUND');
    if (booking.status === 'pending-payment' && scenario === 'payment-failed') {
      return error(402, 'PAYMENT_FAILED');
    }
    booking.status = 'paid';
    return Response.json(booking);
  }

  const key = request.headers.get('idempotency-key')?.trim();
  if (!key) return error(400, 'IDEMPOTENCY_KEY_REQUIRED');

  const body: unknown = await request.json().catch(() => null);
  if (typeof body !== 'object' || body === null || !('items' in body)) {
    return error(400, 'INVALID_BOOKING');
  }
  if (!Array.isArray(body.items) || body.items.length === 0 || !body.items.every(isBookingItem)) {
    return error(400, 'INVALID_BOOKING');
  }
  const items = body.items.map(({ productId, quantity }) => ({ productId, quantity }));
  const existing = bookings.get(key);
  if (existing) {
    return JSON.stringify(existing.items) === JSON.stringify(items)
      ? Response.json(existing)
      : error(409, 'IDEMPOTENCY_KEY_REUSED');
  }
  const unavailableProductIds = items
    .filter(
      ({ productId }, index) =>
        !getProduct(productId)?.available || (index === 0 && scenario === 'availability-conflict'),
    )
    .map(({ productId }) => productId);
  if (unavailableProductIds.length) {
    return Response.json({ code: 'AVAILABILITY_CONFLICT', unavailableProductIds }, { status: 409 });
  }

  const booking: Booking = { id: crypto.randomUUID(), items, status: 'pending-payment' };
  bookings.set(key, booking);
  return Response.json(booking, { status: 201 });
}
