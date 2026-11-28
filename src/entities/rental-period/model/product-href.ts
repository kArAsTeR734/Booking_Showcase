import { ROUTES } from '@/shared/const';
import type { DateRange } from '@/shared/lib';

export function productHref(id: string, dates: DateRange) {
  const query = new URLSearchParams({ start: dates.start, end: dates.end });
  return `${ROUTES.product(id)}?${query}`;
}
