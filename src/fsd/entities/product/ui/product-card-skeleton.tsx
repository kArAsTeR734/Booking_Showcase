import styles from './product-card.module.css';

export function ProductCardSkeleton() {
  return (
    <div className={styles.skeleton} aria-hidden>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonText} />
      <div className={styles.skeletonPrice} />
    </div>
  );
}
