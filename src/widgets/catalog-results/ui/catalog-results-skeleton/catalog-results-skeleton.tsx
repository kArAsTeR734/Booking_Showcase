import { ProductCardSkeleton } from '@/entities/product';
import productGrid from '../catalog-results/catalog-product-grid/catalog-product-grid.module.css';
import styles from './catalog-results-skeleton.module.css';

export function CatalogResultsSkeleton() {
  return (
    <div className={`${productGrid.grid} ${styles.skeletons}`}>
      <ProductCardSkeleton catalog />
      <ProductCardSkeleton catalog />
      <ProductCardSkeleton catalog />
    </div>
  );
}
