import type { ReactNode } from 'react';
import styles from './status-badge.module.css';

export function StatusBadge({
  children,
  variant = 'success',
}: {
  children: ReactNode;
  variant?: 'success' | 'available';
}) {
  return (
    <span className={styles.badge} data-variant={variant}>
      <span className={styles.dot} aria-hidden />
      {children}
    </span>
  );
}
