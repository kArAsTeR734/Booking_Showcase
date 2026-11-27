'use client';

import type { ReactNode } from 'react';
import { useRouteTransition } from '@/shared/routing';
import styles from './catalog-results-status.module.css';
export function CatalogResultsStatus({ children }: { children: ReactNode }) {
  const { pending } = useRouteTransition();
  return (
    <>
      <p role="status" className={pending ? styles.updating : styles.srOnly}>
        {pending ? 'Обновляем выдачу…' : ''}
      </p>
      <div aria-busy={pending} data-updating={pending} className={styles.results}>
        {children}
      </div>
    </>
  );
}
