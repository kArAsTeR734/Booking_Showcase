import { ArrowDownUp, CalendarDays, Tag, Tent } from 'lucide-react';
import { categories, type CatalogParams } from '@/entities/catalog';
import { FilterChip } from '@/shared/ui';
import { rubles } from '@/shared/lib';
import styles from './catalog-applied-filters.module.css';
export function CatalogAppliedFilters({ params, range }: { params: CatalogParams; range: string }) {
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
      {params.minPrice && (
        <FilterChip active readOnly icon={<Tag aria-hidden />}>
          от {rubles(Number(params.minPrice))}
        </FilterChip>
      )}
      {params.available && (
        <FilterChip active readOnly icon={<ArrowDownUp aria-hidden />}>
          Только доступное
        </FilterChip>
      )}
    </div>
  );
}
