import { expect, it } from 'vitest';
import { rubles } from './format-rubles';

it('groups thousands and keeps the ruble sign with the number', () => {
  expect(rubles(2500)).toBe('2\u00a0500\u00a0₽');
  expect(rubles(0)).toBe('0\u00a0₽');
  expect(rubles(2500.5)).toBe('2\u00a0500,5\u00a0₽');
});
