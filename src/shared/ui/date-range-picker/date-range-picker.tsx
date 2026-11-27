'use client';

import { CalendarDays, ChevronDown, PencilLine } from 'lucide-react';
import { Popover } from 'radix-ui';
import { useId, useState, type FormEvent } from 'react';
import { formatDateRange, type DateRange } from '../../lib';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import styles from './date-range-picker.module.css';

type DateRangePickerProps = {
  value: DateRange | null;
  onValueChange: (value: DateRange) => void;
  label?: string;
  summary?: string;
  shortSummary?: string;
  duration?: string;
  header?: boolean;
  allowSameDay?: boolean;
};

export function DateRangePicker({
  value,
  onValueChange,
  label = 'Период аренды',
  summary,
  shortSummary,
  duration,
  header = false,
  allowSameDay = true,
}: DateRangePickerProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState('');
  const [error, setError] = useState<string>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const end = fields.get('end');

    if (!allowSameDay && end === start) {
      setError('Дата возврата должна быть позже даты выдачи.');
    } else if (typeof end === 'string' && start && end >= start) {
      onValueChange({ start, end });
      setOpen(false);
    }
  }

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        if (next) {
          setStart(value?.start ?? '');
          setError(undefined);
        }
        setOpen(next);
      }}
    >
      <Popover.Trigger asChild>
        <Button
          variant={header ? 'ghost' : 'outline'}
          className={styles.trigger}
          data-header={header}
          data-responsive={Boolean(shortSummary)}
          aria-label={
            summary || header ? `${label}. ${header ? shortSummary : summary}` : undefined
          }
        >
          <CalendarDays aria-hidden className={styles.calendar} />
          {header ? (
            shortSummary
          ) : (
            <span className={styles.summary}>
              <span className={styles.label}>{label}</span>
              {duration && <span className={styles.duration}>{duration}</span>}
              <span className={styles.value}>
                {summary ?? (value ? formatDateRange(value) : 'Выберите даты')}
              </span>
              {shortSummary && <span className={styles.shortSummary}>{shortSummary}</span>}
            </span>
          )}
          {!header && <ChevronDown aria-hidden className={styles.chevron} />}
          {!header && shortSummary && <PencilLine aria-hidden className={styles.edit} />}
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="start" sideOffset={6} aria-label={label} className={styles.popover}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              id={`${id}-start`}
              name="start"
              type="date"
              label="Дата выдачи"
              value={start}
              onChange={(event) => {
                setStart(event.currentTarget.value);
                setError(undefined);
              }}
              required
            />
            <TextField
              id={`${id}-end`}
              name="end"
              type="date"
              label="Дата возврата"
              defaultValue={value?.end}
              min={start || undefined}
              error={error}
              onChange={() => setError(undefined)}
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
