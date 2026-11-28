'use client';

import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartCount, rentalCost } from '@/entities/cart';
import { catalogHref, categories } from '@/entities/catalog';
import type { ProductDetail as Product } from '@/entities/product';
import { productHref } from '@/entities/rental-period';
import { AddToCart } from '@/features/add-to-cart';
import { ROUTES } from '@/shared/const';
import { periodLabels, rubles, type DateRange } from '@/shared/lib';
import {
  buttonVariants,
  DateRangePicker,
  PriceBreakdownRow,
  StatusBadge,
  WarningAlert,
} from '@/shared/ui';
import { RentalNavigation } from '@/widgets/navigation';
import { ProductMobileHeader } from '../product-mobile-header/product-mobile-header';
import { ProductPhoto } from '../product-photo/product-photo';
import styles from './product-detail.module.css';

export function ProductDetail({
  product,
  initialPeriod,
  notices,
  correctUrl,
}: {
  product: Product;
  initialPeriod: DateRange;
  notices: string[];
  correctUrl: boolean;
}) {
  const [period, setPeriod] = useState(initialPeriod);
  const href = productHref(product.id, period);
  const catalogUrl = catalogHref({ dates: period, page: 1 });
  const categoryUrl = catalogHref({ dates: period, page: 1, category: product.category });
  const { range, duration } = periodLabels(period);

  useEffect(() => {
    try {
      const pending = sessionStorage.getItem('product-navigation');
      sessionStorage.removeItem('product-navigation');
      if (pending) {
        const data: unknown = JSON.parse(pending);
        if (
          typeof data === 'object' &&
          data !== null &&
          'target' in data &&
          data.target === window.location.pathname + window.location.search &&
          'source' in data &&
          typeof data.source === 'string' &&
          data.source.startsWith('/?')
        ) {
          window.history.replaceState(
            { ...window.history.state, productFromCatalog: true },
            '',
            window.location.href,
          );
        }
      }
    } catch {
      /* A missing history marker falls back to the catalog. */
    }
    if (correctUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('start', initialPeriod.start);
      url.searchParams.set('end', initialPeriod.end);
      window.history.replaceState(window.history.state, '', url);
    }
  }, [correctUrl, initialPeriod.start, initialPeriod.end]);

  function applyPeriod(dates: DateRange) {
    setPeriod(dates);
    const url = new URL(window.location.href);
    url.searchParams.set('start', dates.start);
    url.searchParams.set('end', dates.end);
    window.history.replaceState(window.history.state, '', url);
  }

  const picker = (
    <DateRangePicker
      value={period}
      onValueChange={applyPeriod}
      label="Период"
      shortSummary={range}
      duration={duration}
      allowSameDay={false}
    />
  );
  return (
    <>
      <a
        className={styles.skipLink}
        href="#product-content"
        onClick={(event) => {
          const content = document.getElementById('product-content');
          if (content) {
            event.preventDefault();
            content.focus();
          }
        }}
      >
        Перейти к содержимому
      </a>
      <div className={styles.desktopHeader}>
        <div className={styles.container}>
          <RentalNavigation
            flush
            homeHref={catalogUrl}
            links={[
              { href: catalogUrl, label: 'Каталог', current: 'section' },
              { href: ROUTES.pickup, label: 'Условия выдачи' },
              { href: ROUTES.bookingHistory, label: 'История броней' },
            ]}
            cartHref={ROUTES.cart}
            searchHref={catalogUrl}
            dateControl={null}
            cartControl={
              <span className={buttonVariants({ size: 'sm' })}>
                <CartCount />
              </span>
            }
          />
        </div>
      </div>
      <ProductMobileHeader catalogUrl={catalogUrl} productUrl={href} />
      <main id="product-content" className={`${styles.container} ${styles.page}`} tabIndex={-1}>
        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <Link href={catalogUrl}>Каталог</Link>
          <span aria-hidden>→</span>
          <Link href={categoryUrl}>{categories[product.category]}</Link>
          <span aria-hidden>→</span>
          <span aria-current="page">{product.name}</span>
        </nav>
        {notices.length ? (
          <div className={styles.notices}>
            <WarningAlert compact announce>
              {notices.map((notice, index) => (
                <p key={index}>{notice}</p>
              ))}
            </WarningAlert>
          </div>
        ) : null}
        <div className={styles.layout}>
          <ProductPhoto
            name={product.name}
            imageSrc={product.imageSrc}
            available={product.available}
          />
          <div className={styles.info}>
            <div className={styles.description}>
              <p className={styles.category}>{categories[product.category]}</p>
              <h1>{product.name}</h1>
              <p className={styles.details}>{product.details}</p>
            </div>
            <dl className={styles.characteristics}>
              {product.characteristics.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div id="period" className={styles.mobilePeriod}>
              {picker}
            </div>
            <section className={styles.rental} aria-label="Аренда">
              <div className={styles.rates}>
                <div>
                  <span>Стоимость в день</span>
                  <strong>
                    {rubles(product.dailyRate)} <small>/ день</small>
                  </strong>
                </div>
                <div>
                  <span>Залог</span>
                  <strong>{rubles(product.deposit)}</strong>
                </div>
              </div>
              <div className={styles.desktopStatus}>
                <StatusBadge variant={product.available ? 'available' : 'unavailable'}>
                  {product.available ? 'В наличии' : 'Недоступно'}
                </StatusBadge>
              </div>
              <div className={styles.desktopPeriod}>{picker}</div>
              <dl className={styles.totals}>
                <PriceBreakdownRow
                  label={`Аренда · ${duration}`}
                  value={rubles(rentalCost(product.dailyRate, period))}
                />
                <PriceBreakdownRow label="Возвратный залог" value={rubles(product.deposit)} />
              </dl>
              <AddToCart
                productId={product.id}
                available={product.available}
                period={period}
                dailyRate={product.dailyRate}
                onUseCartPeriod={applyPeriod}
              />
            </section>
            <div className={styles.pickup}>
              <MapPin aria-hidden />
              <div>
                <strong>Пункт выдачи</strong>
                <p>{product.pickupAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
