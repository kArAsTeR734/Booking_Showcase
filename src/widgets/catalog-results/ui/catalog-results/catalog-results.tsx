import { CircleAlert, Search } from 'lucide-react';
import { catalogHref, positions, resetFilters, type CatalogParams } from '@/entities/catalog';
import { CatalogAppliedFilters } from '@/features/filter-catalog';
import { CatalogSort } from '@/features/sort-catalog';
import { Button, StatePanel } from '@/shared/ui';
import type { CatalogProductCard } from '../../model/catalog-product-card';
import { CatalogLink } from './catalog-link/catalog-link';
import { CatalogPagination } from './catalog-pagination/catalog-pagination';
import { CatalogProductGrid } from './catalog-product-grid/catalog-product-grid';
import { CatalogResultsStatus } from './catalog-results-status/catalog-results-status';
import { CatalogRetry } from './catalog-retry/catalog-retry';
import styles from './catalog-results.module.css';

const timeFormat = new Intl.DateTimeFormat('ru-RU', {
  timeStyle: 'short',
  timeZone: 'Europe/Volgograd',
});

export function CatalogResults({
  params,
  total,
  pages,
  range,
  products,
  updatedAt,
}: {
  params: CatalogParams;
  total?: number;
  pages: number;
  range: string;
  products: CatalogProductCard[];
  updatedAt?: string;
}) {
  return (
    <section className={styles.results} aria-labelledby="catalog-results">
      <div className={styles.resultsHeader}>
        <div>
          <h2 id="catalog-results">
            {total === undefined
              ? 'Выдача'
              : `${params.available ? 'Доступно' : 'Найдено'} ${positions(total)}`}
          </h2>
          {updatedAt && (
            <p>
              Наличие обновлено в{' '}
              <time dateTime={updatedAt}>{timeFormat.format(new Date(updatedAt))}</time>
            </p>
          )}
        </div>
        <div className={styles.sort}>
          <CatalogSort params={params} />
        </div>
      </div>
      <CatalogAppliedFilters params={params} range={range} />
      <CatalogResultsStatus>
        {products.length > 0 ? (
          <CatalogProductGrid products={products} />
        ) : total === 0 ? (
          <StatePanel
            title="По выбранным параметрам ничего не найдено"
            icon={<Search />}
            action={
              <Button asChild>
                <CatalogLink href={catalogHref(resetFilters(params))}>Сбросить фильтры</CatalogLink>
              </Button>
            }
          >
            Измените период или сбросьте фильтры.
          </StatePanel>
        ) : (
          <StatePanel
            title="Не удалось загрузить каталог"
            icon={<CircleAlert />}
            action={<CatalogRetry />}
          >
            Проверьте соединение и повторите запрос. Выбранные параметры сохранены.
          </StatePanel>
        )}
        {pages > 1 && (
          <div className={styles.paginationWrap}>
            <CatalogPagination params={params} total={pages} />
          </div>
        )}
      </CatalogResultsStatus>
    </section>
  );
}
