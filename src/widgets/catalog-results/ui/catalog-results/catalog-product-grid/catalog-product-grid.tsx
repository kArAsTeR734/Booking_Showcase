import { ProductCard } from '@/entities/product';
import { productHref } from '@/entities/rental-period';
import type { DateRange } from '@/shared/lib';
import type { CatalogProductCard } from '../../../model/catalog-product-card';
import { rubles } from '@/shared/lib';
import styles from './catalog-product-grid.module.css';
export function CatalogProductGrid({
  products,
  dates,
}: {
  products: CatalogProductCard[];
  dates: DateRange;
}) {
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
            href={productHref(product.id, dates)}
          />
        </li>
      ))}
    </ul>
  );
}
