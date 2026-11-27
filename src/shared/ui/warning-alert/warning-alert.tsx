import { Info, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './warning-alert.module.css';

export function WarningAlert({
  title,
  children,
  announce = false,
  compact = false,
}: {
  title?: string;
  children: ReactNode;
  announce?: boolean;
  compact?: boolean;
}) {
  const Icon = compact ? Info : TriangleAlert;

  return (
    <div className={styles.alert} data-compact={compact} role={announce ? 'alert' : undefined}>
      <Icon size={compact ? 16 : 20} className={styles.warningIcon} aria-hidden />
      <div className={styles.alertBody}>
        {title && <strong className={styles.alertTitle}>{title}</strong>}
        <div className={styles.alertText}>{children}</div>
      </div>
    </div>
  );
}
