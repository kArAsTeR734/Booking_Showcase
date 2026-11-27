export const categories = { tents: 'Палатки', sup: 'SUP-борды', gear: 'Снаряжение' };
export type Category = keyof typeof categories;
export const categoryKeys = Object.keys(categories) as Category[];
export type Sort = 'price-asc' | 'price-desc';
export type Filters = {
  category?: Category;
  minPrice?: string;
  maxPrice?: string;
  available?: boolean;
};
export type CatalogQuery = Filters & { sort?: Sort; page: number };

export function productQuery(params: CatalogQuery) {
  const query = new URLSearchParams();
  for (const key of ['category', 'minPrice', 'maxPrice', 'available', 'sort'] as const) {
    if (params[key] !== undefined && params[key] !== false) query.set(key, String(params[key]));
  }
  if (params.page > 1) query.set('page', String(params.page));
  return query;
}
