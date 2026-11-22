'use client';

import { Check, ChevronDown } from 'lucide-react';
import { Select } from 'radix-ui';
import { useId } from 'react';
import styles from './fields.module.css';

type SelectFieldProps = {
  label: string;
  options: readonly { value: string; label: string; disabled?: boolean }[];
  value: string;
  onValueChange: (value: string) => void;
};

export function SelectField({ label, options, value, onValueChange }: SelectFieldProps) {
  const id = useId();

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.eyebrow}>
        {label}
      </label>
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger id={id} className={styles.selectTrigger}>
          <Select.Value />
          <Select.Icon asChild>
            <ChevronDown size={17} className={styles.fieldIcon} aria-hidden />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position="popper" sideOffset={4} className={styles.selectMenu}>
            <Select.Viewport>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={styles.selectOption}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator asChild>
                    <Check size={16} aria-hidden />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
