import { TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './feedback.module.css';

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

export function StatePanel({
  title,
  children,
  icon,
  action,
}: {
  title: string;
  children: ReactNode;
  icon: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className={styles.panel}>
      <span className={styles.stateIcon} aria-hidden>
        {icon}
      </span>
      <h3 className={styles.stateTitle}>{title}</h3>
      <div className={styles.stateText}>{children}</div>
      {action && <div className={styles.stateAction}>{action}</div>}
    </section>
  );
}

export function PriceBreakdownRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className={styles.priceRow}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
