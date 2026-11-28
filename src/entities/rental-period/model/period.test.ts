import { describe, expect, it } from 'vitest';
import { readRentalPeriod, safePeriod } from './period';

const fallback = { start: '2026-12-30', end: '2027-01-02' };
describe('rental period', () => {
  it('uses a three-day fallback across years', () => {
    expect(safePeriod('2026-12-30')).toEqual(fallback);
    expect(readRentalPeriod({}, fallback)).toEqual({ dates: fallback, notices: [] });
  });
  it.each([
    { start: '2026-02-29', end: '2026-03-02' },
    { start: '2026-09-14' },
    { start: '2026-09-17', end: '2026-09-14' },
    { start: '2026-09-14', end: '2026-09-14' },
  ])('corrects an invalid range %j', (raw) => {
    const result = readRentalPeriod(raw, fallback);
    expect(result.dates).toEqual(fallback);
    expect(result.notices.length).toBeGreaterThan(0);
  });
  it('uses the first repeated parameter and reports it', () => {
    const result = readRentalPeriod(
      { start: ['2028-02-29', '2028-03-01'], end: '2028-03-02' },
      fallback,
    );
    expect(result.dates).toEqual({ start: '2028-02-29', end: '2028-03-02' });
    expect(result.notices).toHaveLength(1);
  });
});
