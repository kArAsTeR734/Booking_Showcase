const products = [
  {
    characteristics: [
      { label: 'Вместимость', value: '2 места' },
      { label: 'Вес', value: '2,8 кг' },
      { label: 'Водостойкость тента', value: '3 000 мм' },
    ],
    id: 'tent',
    name: 'Палатка на двоих',
    category: 'tents',
    details: '2 места',
    dailyRate: 900,
    deposit: 3000,
    available: true,
  },
  {
    characteristics: [
      { label: 'Длина', value: '320 см' },
      { label: 'Нагрузка', value: '120 кг' },
      { label: 'Комплект', value: 'весло и насос' },
    ],
    id: 'sup',
    name: 'Сапборд',
    category: 'sup',
    details: 'Весло и насос в комплекте',
    dailyRate: 1600,
    deposit: 5000,
    available: true,
  },
  {
    characteristics: [
      { label: 'Вес', value: '1,4 кг' },
      { label: 'Объём', value: '45 л' },
      { label: 'Водостойкость чехла', value: '5 000 мм' },
    ],
    id: 'backpack',
    name: 'Походный рюкзак',
    category: 'gear',
    details: 'Объём 45 л',
    dailyRate: 400,
    deposit: 1500,
    available: true,
  },
  {
    characteristics: [
      { label: 'Температура комфорта', value: '+5 °C' },
      { label: 'Вес', value: '1,2 кг' },
      { label: 'Длина', value: '210 см' },
    ],
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
  pickupAddress: 'ул. Лесная, 18',
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
