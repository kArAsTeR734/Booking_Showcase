import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib';
import styles from './text-field.module.css';

type TextFieldProps = Omit<ComponentProps<'input'>, 'id'> & {
  id: string;
  label: string;
  icon?: ReactNode;
  hint?: string;
  error?: string;
  endAdornment?: ReactNode;
};

export function TextField({
  id,
  label,
  hint,
  error,
  icon,
  endAdornment,
  className,
  'aria-describedby': describedBy,
  'aria-invalid': invalid,
  ...input
}: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const descriptionIds = [describedBy, hintId, errorId].filter(Boolean).join(' ');

  return (
    <div className={cn(styles.field, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputFrame}>
        {icon && (
          <span className={styles.fieldIcon} aria-hidden>
            {icon}
          </span>
        )}
        <input
          {...input}
          id={id}
          className={styles.input}
          aria-describedby={descriptionIds || undefined}
          aria-invalid={error ? true : invalid}
        />
        {endAdornment}
      </div>
      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}
