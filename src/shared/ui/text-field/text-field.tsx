import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib';
import styles from './text-field.module.css';

type TextFieldProps = Omit<ComponentProps<'input'>, 'id'> & {
  id: string;
  label: string;
  icon?: ReactNode;
  hint?: string;
};

export function TextField({
  id,
  label,
  hint,
  icon,
  className,
  'aria-describedby': describedBy,
  ...input
}: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <label className={cn(styles.field, className)} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      <span className={styles.inputFrame}>
        {icon && (
          <span className={styles.fieldIcon} aria-hidden>
            {icon}
          </span>
        )}
        <input
          {...input}
          id={id}
          className={styles.input}
          aria-describedby={
            hintId && describedBy ? `${hintId} ${describedBy}` : (hintId ?? describedBy)
          }
        />
      </span>
      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
    </label>
  );
}
