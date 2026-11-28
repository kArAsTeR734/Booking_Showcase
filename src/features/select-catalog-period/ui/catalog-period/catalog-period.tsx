'use client';

import { DateRangePicker } from '@/shared/ui';
import { periodLabels } from '@/shared/lib';
import { catalogHref, type CatalogParams } from '@/entities/catalog';
import { useRouteTransition } from '@/shared/routing';
export function CatalogPeriod({
  params,
  header = false,
}: {
  params: CatalogParams;
  header?: boolean;
}) {
  const { navigate, pending } = useRouteTransition();
  const { range, duration } = periodLabels(params.dates);
  return (
    <DateRangePicker
      value={params.dates}
      disabled={pending}
      header={header}
      allowSameDay={false}
      shortSummary={range}
      duration={duration}
      onValueChange={(dates) => navigate(catalogHref({ ...params, dates, page: 1 }))}
    />
  );
}
