import { CatalogPeriod } from '@/features/select-catalog-period';
import { ROUTES } from '@/shared/const';
import { RouteTransitionProvider } from '@/shared/routing';
import { WarningAlert } from '@/shared/ui';
import { CatalogControls } from '@/widgets/catalog-controls';
import { CatalogResults } from '@/widgets/catalog-results';
import { RentalMobileNavigation, RentalNavigation } from '@/widgets/navigation';
import type { CatalogSearchParams } from '../../model/catalog-params';
import { loadCatalogPage } from '../../model/load-catalog-page';
import { CatalogIntro } from '../catalog-intro/catalog-intro';
import { CatalogSupplement } from './catalog-supplement/catalog-supplement';
import { CatalogUrlCorrection } from './catalog-url-correction/catalog-url-correction';
import styles from './home-page.module.css';

const navigationLinks = [
  { href: ROUTES.catalog, label: 'Каталог', current: 'page' },
  { href: ROUTES.pickup, label: 'Условия выдачи' },
  { href: ROUTES.bookingHistory, label: 'История броней' },
] as const;

export async function HomePage({ searchParams }: { searchParams: Promise<CatalogSearchParams> }) {
  const { params, total, pages, range, canonical, sourceQuery, notices, products, updatedAt } =
    await loadCatalogPage(await searchParams);

  return (
    <RouteTransitionProvider>
      <CatalogUrlCorrection canonical={canonical} sourceQuery={sourceQuery} />
      <header className={styles.header}>
        <div className={styles.container}>
          <RentalNavigation
            flush
            homeHref={ROUTES.catalog}
            links={navigationLinks}
            dateControl={<CatalogPeriod params={params} header />}
            cartHref={ROUTES.cart}
            searchHref="#catalog-filters"
          />
        </div>
      </header>
      <main className={`${styles.container} ${styles.page}`}>
        <CatalogIntro params={params} total={total} />
        {notices.length > 0 && (
          <div className={styles.notices}>
            <WarningAlert compact announce>
              {notices.map((notice, index) => (
                <p key={index}>{notice}</p>
              ))}
            </WarningAlert>
          </div>
        )}
        <div className={styles.layout}>
          <CatalogControls params={params} total={total} />
          <CatalogResults
            params={params}
            total={total}
            pages={pages}
            range={range}
            products={products}
            updatedAt={updatedAt}
          />
        </div>
        <CatalogSupplement>
          <RentalMobileNavigation current="catalog" />
        </CatalogSupplement>
      </main>
    </RouteTransitionProvider>
  );
}
