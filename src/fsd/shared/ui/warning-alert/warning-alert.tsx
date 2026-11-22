import { TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './warning-alert.module.css';

export function WarningAlert({
  title,
  children,
  announce = false,
}: {
  title: string;
  children: ReactNode;
  announce?: boolean;
}) {
  return (
    <div className={styles.alert} role={announce ? 'alert' : undefined}>
      <TriangleAlert size={20} className={styles.warningIcon} aria-hidden />
      <div className={styles.alertBody}>
        <strong className={styles.alertTitle}>{title}</strong>
        <div className={styles.alertText}>{children}</div>
      </div>
    </div>
  );
}
