'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useId, useState } from 'react';
import { categories, type CatalogParams } from '@/entities/catalog';
import { Button, FilterChip } from '@/shared/ui';
import { CatalogFilterForm } from '@/features/filter-catalog';
import { CatalogSort } from '@/features/sort-catalog';
import { useCatalogFiltersVisibility } from '../../model/use-catalog-filters-visibility';
import styles from './catalog-controls.module.css';

export function CatalogControls({
  params,
  total,
  demo,
}: {
  params: CatalogParams;
  total?: number;
  demo?: boolean;
}) {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const filtersVisible = useCatalogFiltersVisibility(expanded);
  const count = [params.category, params.available, params.minPrice || params.maxPrice].filter(
    Boolean,
  ).length;
  const appliedFiltersKey = JSON.stringify([
    demo,
    params.category,
    params.available,
    params.minPrice,
    params.maxPrice,
  ]);
  return (
    <aside id="catalog-filters" className={styles.controls}>
      <div className={styles.mobileToolbar}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          aria-controls={id}
        >
          <SlidersHorizontal aria-hidden /> Фильтры{count > 0 && ` · ${demo ? 2 : count}`}
        </Button>
        {params.category && (
          <FilterChip active readOnly>
            {categories[params.category]}
          </FilterChip>
        )}
        <CatalogSort params={params} compact />
      </div>
      <CatalogFilterForm
        key={appliedFiltersKey}
        id={id}
        params={params}
        total={total}
        expanded={expanded}
        visible={filtersVisible}
        demo={demo}
        onClose={() => setExpanded(false)}
      />
    </aside>
  );
}
