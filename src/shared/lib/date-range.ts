export type DateRange = { start: string; end: string };

const dateFormat = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
});

const dayFormat = new Intl.NumberFormat('ru-RU', {
  style: 'unit',
  unit: 'day',
  unitDisplay: 'long',
});

export function formatDateRange({ start, end }: DateRange) {
  const from = new Date(`${start}T00:00:00Z`);
  const to = new Date(`${end}T00:00:00Z`);
  const days = Math.max(1, (to.getTime() - from.getTime()) / 86_400_000);
  const dates =
    from.getUTCFullYear() === to.getUTCFullYear()
      ? dateFormat.formatRange(from, to)
      : new Intl.DateTimeFormat('ru-RU', {
          dateStyle: 'long',
          timeZone: 'UTC',
        }).formatRange(from, to);

  return `${dates} · ${dayFormat.format(days)}`;
}
