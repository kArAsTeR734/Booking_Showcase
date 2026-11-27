'use client';

import { DateRangePicker } from '@/shared/ui';
import { periodLabels } from '@/shared/lib';
import { catalogHref, type CatalogParams } from '@/entities/catalog';
import { useRouteTransition } from '@/shared/routing';
export function CatalogPeriod({
  params,
  header = false,
  summary,
}: {
  params: CatalogParams;
  header?: boolean;
  summary?: string;
}) {
  const { navigate } = useRouteTransition();
  const { range, duration } = periodLabels(params.dates);
  return (
    <DateRangePicker
      value={params.dates}
      header={header}
      allowSameDay={false}
      summary={summary ?? range}
      shortSummary={range}
      duration={duration}
      onValueChange={(dates) => navigate(catalogHref({ ...params, dates, page: 1 }))}
    />
  );
}
