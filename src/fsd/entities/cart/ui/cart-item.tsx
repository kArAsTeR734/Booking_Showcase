import Image from 'next/image';
import type { ReactNode } from 'react';
import styles from './cart-item.module.css';

type CartItemProps = {
  name: string;
  category: string;
  details: string;
  total: string;
  imageSrc: string;
  quantityControl: ReactNode;
};

export function CartItem({
  name,
  category,
  details,
  total,
  imageSrc,
  quantityControl,
}: CartItemProps) {
  return (
    <article className={styles.item}>
      <div className={styles.image}>
        <Image src={imageSrc} alt="" fill sizes="104px" />
      </div>
      <div className={styles.info}>
        <p className={styles.category}>{category}</p>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.details}>{details}</p>
      </div>
      {quantityControl}
      <strong className={styles.total}>{total}</strong>
    </article>
  );
}
