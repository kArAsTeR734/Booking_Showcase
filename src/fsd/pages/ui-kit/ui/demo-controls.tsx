'use client';

import { Phone, RefreshCw, TentTree, WifiOff } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from '@/entities/cart';
import type { DateRange } from '@/shared/lib';
import {
  Button,
  DateRangePicker,
  FilterChip,
  OptionCheckbox,
  QuantityStepper,
  SelectField,
  StatePanel,
  TextField,
} from '@/shared/ui';
import styles from './ui-kit-page.module.css';

const sortOptions = [
  { value: 'available', label: 'Сначала доступные' },
  { value: 'cheap', label: 'По возрастанию цены' },
  { value: 'expensive', label: 'По убыванию цены' },
];

export function FormDemo() {
  const [dates, setDates] = useState<DateRange>({
    start: '2026-09-14',
    end: '2026-09-17',
  });
  const [active, setActive] = useState(true);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.formControls} id="dates">
      <TextField
        id="contact-phone"
        type="tel"
        autoComplete="tel"
        label="Контактный телефон"
        icon={<Phone size={17} />}
        placeholder="+7 900 000-00-00"
        hint="Используем только для связи по брони"
      />
      <DateRangePicker value={dates} onValueChange={setDates} />
      <FilterChip
        active={active}
        onClick={() => setActive(!active)}
        icon={<TentTree aria-hidden />}
      >
        Палатки
      </FilterChip>
      <QuantityStepper value={quantity} onValueChange={setQuantity} max={10} />
    </div>
  );
}

export function CartDemo({ imageSrc }: { imageSrc: string }) {
  const [quantity, setQuantity] = useState(1);
  const total = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(2070 * quantity);

  return (
    <CartItem
      name="Рюкзак Север 45"
      category="Треккинг"
      details="690 ₽ × 3 дня"
      total={total}
      imageSrc={imageSrc}
      quantityControl={
        <QuantityStepper
          label="Количество рюкзаков"
          value={quantity}
          onValueChange={setQuantity}
          max={10}
        />
      }
    />
  );
}

export function SelectionDemo() {
  const [sort, setSort] = useState('available');
  const [insured, setInsured] = useState(true);

  return (
    <div className={styles.selection}>
      <SelectField
        label="Сортировка"
        options={sortOptions}
        value={sort}
        onValueChange={setSort}
      />
      <OptionCheckbox
        title="Страховка от повреждений"
        description="+ 390 ₽ к заказу"
        checked={insured}
        onCheckedChange={setInsured}
      />
    </div>
  );
}

export function StateDemo() {
  const [retried, setRetried] = useState(false);

  return (
    <StatePanel
      title="Нет соединения"
      icon={<WifiOff />}
      action={
        <Button variant="outline" onClick={() => setRetried(true)}>
          <RefreshCw aria-hidden /> Повторить
        </Button>
      }
    >
      <p>Мы сохранили корзину. Проверьте сеть и повторите действие.</p>
      <p role="status">{retried && 'Повтор в демонстрационном режиме.'}</p>
    </StatePanel>
  );
}
