'use client';

import { catalogHref, type CatalogParams, type Sort } from '@/entities/catalog';
import { SelectField } from '@/shared/ui';
import { useRouteTransition } from '@/shared/routing';
const sorts = [
  { value: 'popular', label: 'По популярности' },
  { value: 'price-asc', label: 'Сначала дешёвые' },
  { value: 'price-desc', label: 'Сначала дорогие' },
];

export function CatalogSort({
  params,
  compact = false,
}: {
  params: CatalogParams;
  compact?: boolean;
}) {
  const { navigate } = useRouteTransition();
  return (
    <SelectField
      label="Сортировка"
      compact={compact}
      value={params.sort ?? 'popular'}
      options={compact ? [{ value: 'popular', label: 'Популярные' }, ...sorts.slice(1)] : sorts}
      onValueChange={(value) =>
        navigate(
          catalogHref({
            ...params,
            sort: value === 'popular' ? undefined : (value as Sort),
            page: 1,
          }),
        )
      }
    />
  );
}
