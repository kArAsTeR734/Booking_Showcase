import { expect, it } from 'vitest';
import { availablePositions, positions } from './format-positions';

it('inflects the result count', () => {
  expect([0, 1, 3, 11, 21, 24].map((total) => positions(total))).toEqual([
    '0 позиций',
    '1 позиция',
    '3 позиции',
    '11 позиций',
    '21 позиция',
    '24 позиции',
  ]);
  expect(availablePositions(21)).toBe('21 позиция доступна сейчас');
});
