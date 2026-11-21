import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { StatusBadge } from '@/shared/ui';
import styles from './booking-history-card.module.css';

type BookingHistoryCardProps = {
  number: string;
  status: string;
  details: string;
  total: string;
  href: string;
};

export function BookingHistoryCard({
  number,
  status,
  details,
  total,
  href,
}: BookingHistoryCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.row}>
        <h3 className={styles.number}>
          <Link href={href} className={styles.link}>
            Бронь #{number}
          </Link>
        </h3>
        <StatusBadge>{status}</StatusBadge>
      </div>
      <p className={styles.details}>{details}</p>
      <div className={styles.row}>
        <strong className={styles.total}>Итого {total}</strong>
        <ArrowRight size={21} className={styles.arrow} aria-hidden />
      </div>
    </article>
  );
}
