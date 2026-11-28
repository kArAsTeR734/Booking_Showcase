import type { DateRange } from '@/shared/lib';

export type SearchParams = Record<string, string | string[] | undefined>;

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function safePeriod(today: string): DateRange {
  const end = new Date(`${today}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + 3);
  return { start: today, end: end.toISOString().slice(0, 10) };
}

export function readParam(raw: SearchParams, key: string, notices: string[]) {
  const value = raw[key];
  if (!Array.isArray(value)) return value;
  notices.push(`Параметр ${key} указан несколько раз. Использовано первое значение.`);
  return value[0] ?? '';
}

export function parsePeriod(
  start: string | undefined,
  end: string | undefined,
  fallback: DateRange,
  notices: string[],
) {
  if (start === undefined && end === undefined) return fallback;

  const validStart = start !== undefined && validDate(start);
  const validEnd = end !== undefined && validDate(end);
  if (!validStart)
    notices.push(`Дата выдачи отсутствует или указана неверно. Применена дата ${fallback.start}.`);
  if (!validEnd)
    notices.push(`Дата возврата отсутствует или указана неверно. Применена дата ${fallback.end}.`);

  if (validStart && validEnd) {
    if (start < end) return { start, end };
    notices.push(
      `Дата возврата должна быть позже даты выдачи. Использован период ${fallback.start} — ${fallback.end}.`,
    );
  } else if (validStart || validEnd) {
    notices.push(`Применён безопасный период ${fallback.start} — ${fallback.end}.`);
  }
  return fallback;
}

const calendarDate = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Volgograd' });

export function currentSafePeriod() {
  return safePeriod(calendarDate.format(new Date()));
}

export function readRentalPeriod(raw: SearchParams, fallback: DateRange) {
  const notices: string[] = [];
  const dates = parsePeriod(
    readParam(raw, 'start', notices),
    readParam(raw, 'end', notices),
    fallback,
    notices,
  );
  return { dates, notices };
}
