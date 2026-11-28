import { notFound } from 'next/navigation';
import { loadProduct } from '@/entities/product/index.server';
import { currentSafePeriod, readRentalPeriod, type SearchParams } from '@/entities/rental-period';
import { ProductDetail } from '../product-detail/product-detail';
import { ProductLoadError } from '../product-state/product-state';

export async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ id }, raw] = await Promise.all([params, searchParams]);
  const { dates, notices } = readRentalPeriod(raw, currentSafePeriod());
  const result = await loadProduct(id);
  if (result.status === 'not-found') notFound();
  if (result.status === 'error') return <ProductLoadError />;
  return (
    <ProductDetail
      product={result.product}
      initialPeriod={dates}
      notices={notices}
      correctUrl={notices.length > 0 || raw.start === undefined || raw.end === undefined}
    />
  );
}
