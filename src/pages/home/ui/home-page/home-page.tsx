import { CatalogPeriod } from '@/features/select-catalog-period';
import { ROUTES } from '@/shared/const';
import { RouteTransitionProvider } from '@/shared/routing';
import { WarningAlert } from '@/shared/ui';
import { CatalogControls } from '@/widgets/catalog-controls';
import { CatalogResults } from '@/widgets/catalog-results';
import { RentalMobileNavigation, RentalNavigation } from '@/widgets/navigation';
import type { CatalogSearch } from '../../model/catalog-params';
import { loadCatalogPage } from '../../model/load-catalog-page';
import { CatalogIntro } from '../catalog-intro/catalog-intro';
import { CatalogSupplement } from './catalog-supplement/catalog-supplement';
import { CatalogUrlCorrection } from './catalog-url-correction/catalog-url-correction';
import styles from './home-page.module.css';

const navigationLinks = [
  { href: ROUTES.catalog, label: 'Каталог', current: true },
  { href: ROUTES.pickup, label: 'Условия выдачи' },
  { href: ROUTES.bookingHistory, label: 'История броней' },
];

export async function HomePage({ searchParams }: { searchParams: Promise<CatalogSearch> }) {
  const {
    params,
    total,
    pages,
    range,
    canonical,
    sourceQuery,
    notices,
    products,
    updatedAt,
    demo,
  } = await loadCatalogPage(await searchParams);
  const periodSummary = demo ? '14 сен, 10:00 → 17 сен, 18:00' : undefined;

  return (
    <RouteTransitionProvider>
      <CatalogUrlCorrection canonical={canonical} sourceQuery={sourceQuery} />
      <header className={styles.header}>
        <div className={styles.container}>
          <RentalNavigation
            flush
            homeHref={ROUTES.catalog}
            links={navigationLinks}
            dates={{ href: '#catalog-period', label: range }}
            dateControl={<CatalogPeriod params={params} header summary={periodSummary} />}
            cartHref={ROUTES.cart}
            cartCount={demo ? 2 : undefined}
            searchHref="#catalog-filters"
          />
        </div>
      </header>
      <main className={`${styles.container} ${styles.page}`} data-demo={demo}>
        <CatalogIntro params={params} total={total} periodSummary={periodSummary} />
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
          <CatalogControls params={params} total={total} demo={demo} />
          <CatalogResults
            params={params}
            total={total}
            demo={demo}
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
