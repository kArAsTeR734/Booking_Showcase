const products = [
  {
    id: 'tent',
    name: 'Палатка на двоих',
    category: 'tents',
    details: '2 места',
    dailyRate: 900,
    deposit: 3000,
    available: true,
  },
  {
    id: 'sup',
    name: 'Сапборд',
    category: 'sup',
    details: 'Весло и насос в комплекте',
    dailyRate: 1600,
    deposit: 5000,
    available: true,
  },
  {
    id: 'backpack',
    name: 'Походный рюкзак',
    category: 'gear',
    details: 'Объём 45 л',
    dailyRate: 400,
    deposit: 1500,
    available: true,
  },
  {
    id: 'sleeping-bag',
    name: 'Спальный мешок',
    category: 'gear',
    details: 'Температура комфорта +5 °C',
    dailyRate: 350,
    deposit: 1000,
    available: false,
  },
].map((product) => ({
  ...product,
  imageSrc: '/images/rental-equipment.png',
  pickupRules: 'Получение и возврат в пункте проката по номеру брони.',
}));

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function listProducts(params: URLSearchParams) {
  const category = params.get('category');
  const minPrice = Number(params.get('minPrice') ?? 0);
  const maxPrice = Number(params.get('maxPrice') ?? Infinity);
  const onlyAvailable = params.get('available') === 'true';
  const sort = params.get('sort');
  const requestedPage = Number(params.get('page') ?? 1);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const pageSize = 2;

  const matches = products.filter(
    (product) =>
      (!category || product.category === category) &&
      product.dailyRate >= minPrice &&
      product.dailyRate <= maxPrice &&
      (!onlyAvailable || product.available),
  );
  if (sort === 'price-asc') matches.sort((left, right) => left.dailyRate - right.dailyRate);
  if (sort === 'price-desc') matches.sort((left, right) => right.dailyRate - left.dailyRate);

  const offset = (page - 1) * pageSize;
  return { items: matches.slice(offset, offset + pageSize), page, pageSize, total: matches.length };
}
