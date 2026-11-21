'use client';

import { CalendarDays, ChevronDown } from 'lucide-react';
import { Popover } from 'radix-ui';
import { useId, useState, type FormEvent } from 'react';
import { formatDateRange, type DateRange } from '../lib';
import { Button } from './button';
import { TextField } from './text-field';
import styles from './date-range-picker.module.css';

type DateRangePickerProps = {
  value: DateRange | null;
  onValueChange: (value: DateRange) => void;
  label?: string;
};

export function DateRangePicker({
  value,
  onValueChange,
  label = 'Период аренды',
}: DateRangePickerProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const end = fields.get('end');

    if (typeof end === 'string' && start && end >= start) {
      onValueChange({ start, end });
      setOpen(false);
    }
  }

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        if (next) setStart(value?.start ?? '');
        setOpen(next);
      }}
    >
      <Popover.Trigger asChild>
        <Button variant="outline" className={styles.trigger}>
          <CalendarDays aria-hidden className={styles.calendar} />
          <span className={styles.summary}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>
              {value ? formatDateRange(value) : 'Выберите даты'}
            </span>
          </span>
          <ChevronDown aria-hidden className={styles.chevron} />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          aria-label={label}
          className={styles.popover}
        >
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              id={`${id}-start`}
              name="start"
              type="date"
              label="Дата выдачи"
              value={start}
              onChange={(event) => setStart(event.currentTarget.value)}
              required
            />
            <TextField
              id={`${id}-end`}
              name="end"
              type="date"
              label="Дата возврата"
              defaultValue={value?.end}
              min={start || undefined}
              required
            />
            <Button type="submit" variant="secondary">
              Применить
            </Button>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
