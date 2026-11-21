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
}: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.image}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 360px) 100vw, 310px"
        />
        {availability && (
          <div className={styles.availability}>
            <StatusBadge variant="available">{availability}</StatusBadge>
          </div>
        )}
      </div>
      <div className={styles.body}>
        <p className={styles.category}>{category}</p>
        <h3 className={styles.title}>
          <Link href={href} className={styles.link}>
            {name}
          </Link>
        </h3>
        <p className={styles.meta}>{details}</p>
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
