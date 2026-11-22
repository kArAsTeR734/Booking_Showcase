'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '../button/button';
import styles from './quantity-stepper.module.css';

type QuantityStepperProps = {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
};

export function QuantityStepper({
  value,
  onValueChange,
  min = 1,
  max,
  label = 'Количество',
}: QuantityStepperProps) {
  return (
    <div className={styles.stepper} role="group" aria-label={label}>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Уменьшить количество"
        disabled={value <= min}
        onClick={() => onValueChange(value - 1)}
      >
        <Minus aria-hidden />
      </Button>
      <output className={styles.quantity}>{value}</output>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Увеличить количество"
        disabled={max !== undefined && value >= max}
        onClick={() => onValueChange(value + 1)}
      >
        <Plus aria-hidden />
      </Button>
    </div>
  );
}
