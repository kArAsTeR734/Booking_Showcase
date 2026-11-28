'use client';

import { ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '../../model/cart';
import styles from './cart-count.module.css';

export function CartCount({ compact = false }: { compact?: boolean }) {
  const count = useCart((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);
  return (
    <span className={styles.count} aria-live="polite" aria-atomic="true">
      <ShoppingBag aria-hidden size={18} />
      {compact ? <span className={styles.srOnly}>Корзина: </span> : 'Корзина · '}
      {count}
    </span>
  );
}
