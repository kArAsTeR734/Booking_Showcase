'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CartCount } from '@/entities/cart';
import { ShareProduct } from '@/features/share-product';
import { Button } from '@/shared/ui';
import styles from './product-mobile-header.module.css';

export function ProductMobileHeader({
  catalogUrl,
  productUrl,
}: {
  catalogUrl: string;
  productUrl: string;
}) {
  const router = useRouter();
  function goBack() {
    if (window.history.state?.productFromCatalog === true) router.back();
    else router.push(catalogUrl);
  }
  return (
    <header className={styles.header}>
      <Button variant="ghost" size="icon" onClick={goBack} aria-label="Назад к каталогу">
        <ArrowLeft aria-hidden />
      </Button>
      <strong>Карточка</strong>
      <div className={styles.actions}>
        <CartCount compact />
        <ShareProduct href={productUrl} />
      </div>
    </header>
  );
}
