export const ROUTES = {
  catalog: '/',
  auth: '/auth',
  cart: '/card',
  product: (id: string) => `/product/${encodeURIComponent(id)}`,
  bookingHistory: '/booking-history',
  pickup: '/booking',
} as const;
