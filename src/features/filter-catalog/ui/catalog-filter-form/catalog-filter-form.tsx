'use client';

import { Search } from 'lucide-react';
import { Button, OptionCheckbox, TextField } from '@/shared/ui';
import { categories, categoryKeys, type CatalogParams, type Filters } from '@/entities/catalog';
import { useAvailableCategoryCounts } from '../../model/use-catalog-filter-counts';
import { useCatalogFilterForm } from '../../model/use-catalog-filter-form';
import styles from './catalog-filter-form.module.css';

export function CatalogFilterForm({
  id,
  params,
  total,
  expanded,
  visible,
  demo,
  onClose,
}: {
  id: string;
  params: CatalogParams;
  total?: number;
  expanded: boolean;
  visible: boolean;
  demo?: boolean;
  onClose: () => void;
}) {
  const { filters, setFilters, error, matchCount, pending, apply, reset } = useCatalogFilterForm(
    params,
    total,
    onClose,
    visible,
  );
  const availableCounts = useAvailableCategoryCounts(visible && !demo);
  const filterCategories = demo
    ? [
        { value: 'tents', title: 'Палатки · 8' },
        { value: 'backpacks', title: 'Рюкзаки · 12' },
        { value: 'sup', title: 'SUP-борды · 6' },
        { value: 'trekking', title: 'Трекинг · 18' },
      ]
    : categoryKeys.map((value) => {
        const title = categories[value];
        const count = availableCounts[value];
        return { value, title: count === undefined ? title : `${title} · ${count}` };
      });

  return (
    <form id={id} className={styles.form} data-expanded={expanded} onSubmit={apply}>
      <div className={styles.formHeader}>
        <h2>Фильтры</h2>
        <Button type="button" onClick={reset} variant="ghost" size="sm" disabled={pending}>
          Сбросить
        </Button>
      </div>
      <fieldset className={styles.group}>
        <legend>Категория</legend>
        {filterCategories.map(({ value, title }) => (
          <OptionCheckbox
            key={value}
            compact
            title={title}
            checked={filters.category === value}
            disabled={!Object.hasOwn(categories, value)}
            onCheckedChange={(checked) =>
              setFilters({
                ...filters,
                category: checked ? (value as Filters['category']) : undefined,
              })
            }
          />
        ))}
      </fieldset>
      <fieldset className={styles.group}>
        <legend>Наличие</legend>
        <OptionCheckbox
          compact
          title="Только доступное"
          checked={!!filters.available}
          onCheckedChange={(checked) => setFilters({ ...filters, available: checked || undefined })}
        />
        {demo && (
          <OptionCheckbox
            compact
            title="Можно заменить"
            checked={false}
            disabled
            onCheckedChange={() => {}}
          />
        )}
      </fieldset>
      <fieldset className={styles.group}>
        <legend>Цена за день</legend>
        <div className={styles.prices}>
          <TextField
            id={`${id}-min`}
            label="Цена от, ₽"
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            icon={<span>от</span>}
            endAdornment={<span aria-hidden>₽</span>}
            inputMode="numeric"
            value={filters.minPrice ?? ''}
            onChange={(event) => setFilters({ ...filters, minPrice: event.target.value })}
          />
          <TextField
            id={`${id}-max`}
            label="Цена до, ₽"
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            icon={<span>до</span>}
            endAdornment={<span aria-hidden>₽</span>}
            inputMode="numeric"
            value={filters.maxPrice ?? ''}
            onChange={(event) => setFilters({ ...filters, maxPrice: event.target.value })}
          />
        </div>
        {error && (
          <p id={`${id}-error`} role="alert" className={styles.error}>
            {error}
          </p>
        )}
      </fieldset>
      <Button type="submit" className={styles.submit} disabled={pending}>
        <Search aria-hidden />
        <span aria-live="polite">
          {matchCount === undefined ? 'Показать' : `Показать ${matchCount}`}
        </span>
      </Button>
    </form>
  );
}
