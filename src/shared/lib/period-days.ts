import type { DateRange } from './date-range';

export function periodDays({ start, end }: DateRange) {
  return (Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86_400_000;
}
