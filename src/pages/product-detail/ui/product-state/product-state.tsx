'use client';

import { CircleAlert, SearchX } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/const';
import { Button, StatePanel } from '@/shared/ui';
import styles from './product-state.module.css';

export function ProductNotFound() {
  return (
    <main className={styles.page}>
      <StatePanel
        headingAs="h1"
        title="Товар не найден"
        icon={<SearchX />}
        action={
          <Button asChild>
            <Link href={ROUTES.catalog}>В каталог</Link>
          </Button>
        }
      >
        Проверьте ссылку или вернитесь в каталог.
      </StatePanel>
    </main>
  );
}
export function ProductLoadError() {
  const router = useRouter();
  return (
    <main className={styles.page}>
      <StatePanel
        headingAs="h1"
        title="Не удалось загрузить товар"
        icon={<CircleAlert />}
        action={<Button onClick={() => router.refresh()}>Повторить</Button>}
      >
        Проверьте соединение и повторите запрос. Период сохранён в адресе.
      </StatePanel>
    </main>
  );
}
export function ProductError({ reset }: { reset: () => void }) {
  return (
    <main className={styles.page}>
      <StatePanel
        headingAs="h1"
        title="Не удалось показать карточку"
        icon={<CircleAlert />}
        action={<Button onClick={reset}>Попробовать снова</Button>}
      >
        Произошла непредвиденная ошибка.
      </StatePanel>
    </main>
  );
}
