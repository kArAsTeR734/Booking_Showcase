import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib';
import { Button } from '../button/button';
import styles from './filter-chip.module.css';

type FilterChipProps = Omit<ComponentProps<'button'>, 'aria-pressed'> & {
  active: boolean;
  icon?: ReactNode;
  readOnly?: boolean;
};

export function FilterChip({
  active,
  icon,
  className,
  children,
  readOnly,
  ...props
}: FilterChipProps) {
  if (readOnly) {
    return (
      <span className={cn(styles.chip, styles.readOnly, className)}>
        {icon}
        {children}
      </span>
    );
  }

  return (
    <Button {...props} variant="ghost" aria-pressed={active} className={cn(styles.chip, className)}>
      {icon}
      {children}
    </Button>
  );
}
