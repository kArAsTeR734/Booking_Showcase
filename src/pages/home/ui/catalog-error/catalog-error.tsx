'use client';

import { CircleAlert } from 'lucide-react';
import { Button, StatePanel } from '@/shared/ui';
import styles from '../home-page/home-page.module.css';

export function CatalogError({ retry }: { retry: () => void }) {
  return (
    <main className={`${styles.container} ${styles.page}`}>
      <StatePanel
        title="Не удалось открыть каталог"
        icon={<CircleAlert />}
        action={<Button onClick={retry}>Открыть заново</Button>}
      >
        Обновите содержимое каталога, чтобы продолжить.
      </StatePanel>
    </main>
  );
}
