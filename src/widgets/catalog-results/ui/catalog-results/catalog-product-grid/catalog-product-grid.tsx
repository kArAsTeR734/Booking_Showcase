import { ProductCard } from '@/entities/product';
import { ROUTES } from '@/shared/const';
import type { CatalogProductCard } from '../../../model/catalog-product-card';
import { rubles } from '@/shared/lib';
import styles from './catalog-product-grid.module.css';
export function CatalogProductGrid({ products }: { products: CatalogProductCard[] }) {
  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            catalog
            {...product}
            imageAlt=""
            rate={`${rubles(product.dailyRate)} / день`}
            deposit={`залог ${rubles(product.deposit)}`}
            href={ROUTES.product(product.id)}
          />
        </li>
      ))}
    </ul>
  );
}
