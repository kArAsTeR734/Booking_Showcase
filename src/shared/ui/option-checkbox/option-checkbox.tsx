'use client';

import { Check } from 'lucide-react';
import { Checkbox } from 'radix-ui';
import { useId } from 'react';
import styles from './option-checkbox.module.css';

type OptionCheckboxProps = {
  title: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  compact?: boolean;
};

export function OptionCheckbox({
  title,
  description,
  checked,
  onCheckedChange,
  name,
  disabled,
  compact,
}: OptionCheckboxProps) {
  const id = useId();

  return (
    <label className={styles.option} data-compact={compact} htmlFor={id}>
      <Checkbox.Root
        id={id}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        name={name}
        disabled={disabled}
        aria-labelledby={`${id}-label`}
        aria-describedby={description ? `${id}-description` : undefined}
        className={styles.checkbox}
      >
        <Checkbox.Indicator asChild>
          <Check size={14} aria-hidden />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span className={styles.optionContent}>
        <span id={`${id}-label`} className={styles.optionTitle}>
          {title}
        </span>
        {description && (
          <span id={`${id}-description`} className={styles.optionDescription}>
            {description}
          </span>
        )}
      </span>
    </label>
  );
}
