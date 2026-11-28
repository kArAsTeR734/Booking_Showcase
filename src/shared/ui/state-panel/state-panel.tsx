import type { ReactNode } from 'react';
import styles from './state-panel.module.css';

export function StatePanel({
  title,
  children,
  icon,
  action,
  headingAs: Heading = 'h3',
}: {
  title: string;
  children: ReactNode;
  icon: ReactNode;
  action?: ReactNode;
  headingAs?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <section className={styles.panel}>
      <span className={styles.stateIcon} aria-hidden>
        {icon}
      </span>
      <Heading className={styles.stateTitle}>{title}</Heading>
      <div className={styles.stateText}>{children}</div>
      {action && <div className={styles.stateAction}>{action}</div>}
    </section>
  );
}
