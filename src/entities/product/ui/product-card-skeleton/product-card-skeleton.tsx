import styles from '../product-card/product-card.module.css';

export function ProductCardSkeleton({ catalog = false }: { catalog?: boolean }) {
  return (
    <div className={styles.skeleton} data-catalog={catalog} aria-hidden>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonText} />
      <div className={styles.skeletonPrice} />
    </div>
  );
}
