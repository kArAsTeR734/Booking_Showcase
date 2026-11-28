import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui';
import { catalogHref, type CatalogParams } from '@/entities/catalog';
import { paginationPages } from '../../../model/pagination-pages';
import { CatalogLink } from '../catalog-link/catalog-link';
import styles from './catalog-pagination.module.css';
export function CatalogPagination({ params, total }: { params: CatalogParams; total: number }) {
  return (
    <nav className={styles.pagination} aria-label="Страницы каталога">
      <Button
        asChild={params.page > 1}
        disabled={params.page === 1}
        variant="outline"
        size="icon"
        aria-label="Предыдущая страница"
      >
        {params.page > 1 ? (
          <CatalogLink href={catalogHref({ ...params, page: params.page - 1 })}>
            <ArrowLeft aria-hidden />
          </CatalogLink>
        ) : (
          <ArrowLeft aria-hidden />
        )}
      </Button>
      {paginationPages(params.page, total).map((page) =>
        typeof page === 'string' ? (
          <span key={page} aria-hidden>
            …
          </span>
        ) : (
          <Button
            key={page}
            asChild
            variant={page === params.page ? 'secondary' : 'outline'}
            size="icon"
          >
            <CatalogLink
              href={catalogHref({ ...params, page })}
              aria-current={page === params.page ? 'page' : undefined}
              aria-label={`Страница ${page}`}
            >
              {page}
            </CatalogLink>
          </Button>
        ),
      )}
      <Button
        asChild={params.page < total}
        disabled={params.page >= total}
        variant="outline"
        size="icon"
        aria-label="Следующая страница"
      >
        {params.page < total ? (
          <CatalogLink href={catalogHref({ ...params, page: params.page + 1 })}>
            <ArrowRight aria-hidden />
          </CatalogLink>
        ) : (
          <ArrowRight aria-hidden />
        )}
      </Button>
    </nav>
  );
}
