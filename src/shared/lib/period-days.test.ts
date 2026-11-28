import { expect, it } from 'vitest';
import { periodDays } from './period-days';

it('calculates calendar days across a year and leap day', () => {
  expect(periodDays({ start: '2026-12-30', end: '2027-01-02' })).toBe(3);
  expect(periodDays({ start: '2028-02-28', end: '2028-03-01' })).toBe(2);
});
