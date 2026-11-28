import { z } from 'zod';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { periodDays, type DateRange } from '@/shared/lib';

const storedCart = z
  .object({
    period: z.object({ start: z.iso.date(), end: z.iso.date() }).nullable(),
    items: z.array(
      z.object({ productId: z.string().min(1), quantity: z.number().int().positive().safe() }),
    ),
  })
  .refine(({ period, items }) =>
    period
      ? period.start < period.end &&
        items.length > 0 &&
        new Set(items.map((item) => item.productId)).size === items.length
      : items.length === 0,
  );

type CartData = z.infer<typeof storedCart>;
type CartState = CartData & { add: (productId: string, period: DateRange) => boolean };

export function rentalCost(dailyRate: number, period: DateRange) {
  return dailyRate * periodDays(period);
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      period: null,
      items: [],
      add: (productId, period) => {
        const cart = get();
        if (cart.period && (cart.period.start !== period.start || cart.period.end !== period.end))
          return false;
        const exists = cart.items.some((item) => item.productId === productId);
        set({
          period,
          items: exists
            ? cart.items.map((item) =>
                item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
              )
            : [...cart.items, { productId, quantity: 1 }],
        });
        return true;
      },
    }),
    {
      name: 'rental-cart',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
      partialize: ({ period, items }) => ({ period, items }),
      merge: (persisted, current) => {
        const result = storedCart.safeParse(persisted);
        return result.success ? { ...current, ...result.data } : current;
      },
    },
  ),
);
