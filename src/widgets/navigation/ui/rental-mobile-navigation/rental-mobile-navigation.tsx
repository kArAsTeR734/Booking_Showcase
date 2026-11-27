import { Grid2X2, History, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/shared/const';
import styles from './rental-mobile-navigation.module.css';
export function RentalMobileNavigation({ current }: { current: 'catalog' | 'cart' | 'history' }) {
  return (
    <nav className={styles.mobileNav} aria-label="Разделы проката">
      <Link href={ROUTES.catalog} aria-current={current === 'catalog' ? 'page' : undefined}>
        <Grid2X2 aria-hidden />
        Каталог
      </Link>
      <Link href={ROUTES.cart} aria-current={current === 'cart' ? 'page' : undefined}>
        <ShoppingBag aria-hidden />
        Корзина
      </Link>
      <Link href={ROUTES.bookingHistory} aria-current={current === 'history' ? 'page' : undefined}>
        <History aria-hidden />
        История
      </Link>
    </nav>
  );
}
