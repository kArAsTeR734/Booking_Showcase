import { CalendarDays, MountainSnow, Search, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Button } from '@/shared/ui';
import styles from './rental-navigation.module.css';

type RentalNavigationProps = {
  homeHref: string;
  links: readonly { href: string; label: string; current?: 'page' | 'section' }[];
  cartHref: string;
  cartCount?: number;
  searchHref: string;
  compact?: boolean;
  flush?: boolean;
  cartControl?: ReactNode;
} & (
  | { dateControl: ReactNode; dates?: never }
  | { dateControl?: never; dates: { href: string; label: string } }
);

export function RentalNavigation({
  homeHref,
  links,
  dates,
  cartHref,
  cartCount,
  searchHref,
  compact = false,
  flush = false,
  dateControl,
  cartControl,
}: RentalNavigationProps) {
  const cartLabel = cartCount === undefined ? 'Корзина' : `Корзина · ${cartCount}`;

  return (
    <nav
      aria-label={compact ? 'Мобильная навигация проката' : 'Навигация проката'}
      className={styles.nav}
      data-compact={compact}
      data-flush={flush}
    >
      <Link href={homeHref} className={styles.brand} aria-label="Северный прокат">
        <MountainSnow aria-hidden className={styles.brandIcon} />
        <span className={styles.desktop}>Северный прокат</span>
        <span className={styles.mobile}>Север</span>
      </Link>
      <ul className={styles.links}>
        {links.map(({ href, label, current }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={current === 'page' ? 'page' : undefined}
              data-active={Boolean(current)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.desktopTools}>
        {dateControl !== undefined ? (
          dateControl
        ) : dates ? (
          <Button asChild variant="ghost" size="sm" className={styles.date}>
            <Link href={dates.href}>
              <CalendarDays aria-hidden />
              {dates.label}
            </Link>
          </Button>
        ) : null}
        {cartControl ?? (
          <Button asChild size="sm" className={styles.cart}>
            <Link href={cartHref}>
              <ShoppingBag aria-hidden />
              {cartLabel}
            </Link>
          </Button>
        )}
      </div>
      <div className={styles.mobileTools}>
        <Button asChild variant="ghost" size="icon">
          <Link href={searchHref} aria-label="Поиск по каталогу">
            <Search aria-hidden />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon" className={styles.mobileCart}>
          <Link href={cartHref} aria-label={cartLabel}>
            <ShoppingBag aria-hidden />
          </Link>
        </Button>
      </div>
    </nav>
  );
}
