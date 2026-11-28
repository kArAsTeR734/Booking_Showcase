import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { StatusBadge } from '@/shared/ui';
import styles from './product-card.module.css';

type ProductCardProps = {
  name: string;
  category: string;
  details: string;
  imageSrc: string;
  imageAlt: string;
  rate: string;
  deposit: string;
  href: string;
  availability?: string;
  unavailable?: boolean;
  mobileCategory?: string;
  mobileDetails?: string;
  catalog?: boolean;
};

export function ProductCard({
  name,
  category,
  details,
  imageSrc,
  imageAlt,
  rate,
  deposit,
  href,
  availability,
  unavailable = false,
  mobileCategory = category,
  mobileDetails = details,
  catalog = false,
}: ProductCardProps) {
  return (
    <article className={styles.card} data-catalog={catalog}>
      <div className={styles.image}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes={catalog ? '(max-width: 820px) 116px, (max-width: 1150px) 40vw, 350px' : '310px'}
        />
        {availability && (
          <div className={styles.availability}>
            <StatusBadge variant={unavailable ? 'unavailable' : 'available'}>
              {availability}
            </StatusBadge>
          </div>
        )}
      </div>
      <div className={styles.body}>
        <p className={styles.category} data-desktop>
          {category}
        </p>
        {catalog && (
          <p className={styles.category} data-mobile>
            {mobileCategory}
            {availability && ` · ${availability}`}
          </p>
        )}
        <h3 className={styles.title}>
          <Link href={href} className={styles.link}>
            {name}
          </Link>
        </h3>
        <p className={styles.meta} data-desktop>
          {details}
        </p>
        {catalog && (
          <p className={styles.meta} data-mobile>
            {mobileDetails}
          </p>
        )}
        <div className={styles.footer}>
          <div className={styles.prices}>
            <strong className={styles.price}>{rate}</strong>
            <span className={styles.deposit}>{deposit}</span>
          </div>
          <ArrowUpRight size={22} className={styles.arrow} aria-hidden />
        </div>
      </div>
    </article>
  );
}
