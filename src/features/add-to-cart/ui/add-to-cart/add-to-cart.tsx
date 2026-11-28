'use client';

import { useRef, useState } from 'react';
import { rentalCost, useCart } from '@/entities/cart';
import { periodLabels, rubles, type DateRange } from '@/shared/lib';
import { Button, WarningAlert } from '@/shared/ui';
import styles from './add-to-cart.module.css';

export function AddToCart({
  productId,
  available,
  period,
  dailyRate,
  onUseCartPeriod,
}: {
  productId: string;
  available: boolean;
  period: DateRange;
  dailyRate: number;
  onUseCartPeriod: (period: DateRange) => void;
}) {
  const [conflict, setConflict] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const cartPeriod = useCart((state) => state.period);
  function add() {
    setConflict(!useCart.getState().add(productId, period));
  }
  return (
    <div className={styles.root}>
      <Button
        ref={addButtonRef}
        className={styles.button}
        size="lg"
        disabled={!available}
        onClick={add}
      >
        Добавить · {rubles(rentalCost(dailyRate, period))}
      </Button>
      {conflict && cartPeriod ? (
        <WarningAlert title="В корзине выбран другой период" announce>
          <p>{periodLabels(cartPeriod).range}</p>
          <Button
            variant="link"
            onClick={() => {
              onUseCartPeriod(cartPeriod);
              setConflict(false);
              addButtonRef.current?.focus();
            }}
          >
            Использовать период корзины
          </Button>
        </WarningAlert>
      ) : null}
    </div>
  );
}
