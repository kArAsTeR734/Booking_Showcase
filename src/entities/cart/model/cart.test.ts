import { beforeEach, describe, expect, it } from 'vitest';
import { rentalCost, useCart } from './cart';

const period = { start: '2026-09-14', end: '2026-09-17' };
beforeEach(() => useCart.setState({ period: null, items: [] }));
describe('cart', () => {
  it('combines quantities and counts items for one period', () => {
    expect(useCart.getState().add('backpack', period)).toBe(true);
    expect(useCart.getState().add('backpack', period)).toBe(true);
    expect(useCart.getState().add('tent', period)).toBe(true);
    expect(useCart.getState()).toMatchObject({
      period,
      items: [
        { productId: 'backpack', quantity: 2 },
        { productId: 'tent', quantity: 1 },
      ],
    });
  });
  it('does not modify the cart when periods differ', () => {
    useCart.getState().add('tent', period);
    expect(useCart.getState().add('backpack', { start: '2026-09-15', end: '2026-09-18' })).toBe(
      false,
    );
    expect(useCart.getState()).toMatchObject({
      period,
      items: [{ productId: 'tent', quantity: 1 }],
    });
  });
  it('calculates rent without deposit', () => expect(rentalCost(400, period)).toBe(1200));
});
