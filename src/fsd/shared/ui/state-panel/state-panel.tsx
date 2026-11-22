import type { ReactNode } from 'react';
import styles from './state-panel.module.css';

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
