import { availablePositions, positions, type CatalogParams } from '@/entities/catalog';
import { CatalogPeriod } from '@/features/select-catalog-period';
import styles from './catalog-intro.module.css';
export function CatalogIntro({
  params,
  total,
  periodSummary,
}: {
  params: CatalogParams;
  total?: number;
  periodSummary?: string;
}) {
  return (
    <div className={styles.intro}>
      <div>
        <p className={styles.eyebrow}>
          Северный хребет<span className={styles.desktop}> · Один пункт выдачи</span>
        </p>
        <h1>
          Снаряжение на <span className={styles.desktop}>ваши </span>даты
        </h1>
        <p className={styles.description}>
          Проверяйте наличие сразу на весь маршрут — цена, залог и правила видны до бронирования.
        </p>
        {total !== undefined && (
          <p className={styles.mobileCount}>
            {params.available ? availablePositions(total) : `Найдено ${positions(total)}`}
          </p>
        )}
      </div>
      <div id="catalog-period" className={styles.period}>
        <CatalogPeriod params={params} summary={periodSummary} />
      </div>
    </div>
  );
}
