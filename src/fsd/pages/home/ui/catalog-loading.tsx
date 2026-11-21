import { ProductCardSkeleton } from '@/entities/product';
import styles from './home-page.module.css';

export function CatalogLoading() {
  return (
    <main className={styles.page}>
      <div role="status" className={styles.skeletons}>
        <span className={styles.loadingMessage}>Загрузка каталога</span>
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </main>
  );
}
