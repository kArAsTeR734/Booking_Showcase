import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('объединяет строки, массивы и условные классы', () => {
    expect(cn('card', ['block'], { active: true, disabled: false }, null)).toBe(
      'card block active',
    );
  });

  it('оставляет последнее значение для конфликтующих Tailwind-классов', () => {
    expect(cn('px-2 hover:px-3', 'px-4 hover:px-5')).toBe('px-4 hover:px-5');
  });

  it('возвращает пустую строку без входных классов', () => {
    expect(cn()).toBe('');
  });
});
