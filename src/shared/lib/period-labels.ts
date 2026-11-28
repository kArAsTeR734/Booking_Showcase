import type { DateRange } from './date-range';
import { periodDays } from './period-days';

const date = new Intl.DateTimeFormat('ru-RU', { month: 'long', day: 'numeric', timeZone: 'UTC' });
const dateWithYear = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long', timeZone: 'UTC' });
const day = new Intl.NumberFormat('ru-RU', { style: 'unit', unit: 'day', unitDisplay: 'long' });

export function periodLabels(dates: DateRange) {
  const start = new Date(`${dates.start}T00:00:00Z`);
  const end = new Date(`${dates.end}T00:00:00Z`);
  const formatter = start.getUTCFullYear() === end.getUTCFullYear() ? date : dateWithYear;
  return {
    range: formatter.formatRange(start, end),
    duration: day.format(periodDays(dates)),
  };
}
