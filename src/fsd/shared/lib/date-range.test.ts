import { describe, expect, it } from 'vitest';
import { formatDateRange } from './date-range';

describe('formatDateRange', () => {
  it('показывает даты и длительность проката на русском', () => {
    expect(formatDateRange({ start: '2026-09-14', end: '2026-09-17' })).toMatch(
      /14\s*–\s*17 сентября · 3 дня/,
    );
  });

  it('считает выдачу и возврат в один день за день проката', () => {
    expect(formatDateRange({ start: '2026-09-14', end: '2026-09-14' })).toBe(
      '14 сентября · 1 день',
    );
  });

  it('показывает оба года, если прокат заканчивается в следующем году', () => {
    expect(formatDateRange({ start: '2026-12-31', end: '2027-01-02' })).toMatch(
      /2026.*2027.*2 дня/,
    );
  });
});
