import { expect, it } from 'vitest';
import { periodLabels } from './period-labels';

it('formats a short period and includes the year across New Year', () => {
  const september = periodLabels({ start: '2026-09-14', end: '2026-09-17' });
  expect(september.range).toContain('сентября');
  expect(september.duration).toBe('3 дня');
  const newYear = periodLabels({ start: '2026-12-30', end: '2027-01-02' });
  expect(newYear.range).toContain('2026');
  expect(newYear.range).toContain('2027');
  expect(newYear.duration).toBe('3 дня');
});
