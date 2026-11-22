import styles from './price-breakdown-row.module.css';

export function PriceBreakdownRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.priceRow}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
