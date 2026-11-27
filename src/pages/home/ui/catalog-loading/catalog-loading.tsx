import { CatalogResultsSkeleton } from '@/widgets/catalog-results';
import layout from '../home-page/home-page.module.css';
import styles from './catalog-loading.module.css';

export function CatalogLoading() {
  return (
    <>
      <div className={styles.loadingHeader} aria-hidden />
      <main className={`${layout.container} ${layout.page}`} role="status">
        <span className={styles.loadingMessage}>Загрузка каталога…</span>
        <div className={styles.loadingIntro} aria-hidden />
        <div className={layout.layout}>
          <div className={styles.loadingFilters} aria-hidden />
          <CatalogResultsSkeleton />
        </div>
      </main>
    </>
  );
}
