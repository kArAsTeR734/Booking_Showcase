import { describe, expect, it } from 'vitest';
import { buttonVariants } from './button';
import styles from './button.module.css';

describe('buttonVariants', () => {
  it('по умолчанию выбирает основное действие стандартного размера', () => {
    expect(buttonVariants().split(' ')).toEqual([
      styles.button,
      styles.primary,
      styles.standard,
    ]);
  });

  it('сочетает вариант, размер и переданный класс', () => {
    expect(
      buttonVariants({
        variant: 'destructive',
        size: 'icon-xs',
        className: 'example',
      }).split(' '),
    ).toEqual([styles.button, styles.danger, styles.iconExtraSmall, 'example']);
  });
});
