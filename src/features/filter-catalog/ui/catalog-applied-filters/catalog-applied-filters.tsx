import { ArrowDownUp, CalendarDays, Tag, Tent } from 'lucide-react';
import { categories, type CatalogParams } from '@/entities/catalog';
import { FilterChip } from '@/shared/ui';
import { rubles } from '@/shared/lib';
import styles from './catalog-applied-filters.module.css';
export function CatalogAppliedFilters({
  params,
  range,
  demo,
}: {
  params: CatalogParams;
  range: string;
  demo?: boolean;
}) {
  return (
    <div className={styles.chips}>
      <FilterChip active readOnly icon={<CalendarDays aria-hidden />}>
        {range}
      </FilterChip>
      {params.category && (
        <FilterChip active readOnly icon={<Tent aria-hidden />}>
          {categories[params.category]}
        </FilterChip>
      )}
      {params.maxPrice && (
        <FilterChip active readOnly icon={<Tag aria-hidden />}>
          до {rubles(Number(params.maxPrice))}
        </FilterChip>
      )}
      {!demo && params.minPrice && (
        <FilterChip active readOnly icon={<Tag aria-hidden />}>
          от {rubles(Number(params.minPrice))}
        </FilterChip>
      )}
      {!demo && params.available && (
        <FilterChip active readOnly icon={<ArrowDownUp aria-hidden />}>
          Только доступное
        </FilterChip>
      )}
    </div>
  );
}
