const currency = new Intl.NumberFormat('ru-RU', {
  useGrouping: 'always',
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
});
export function rubles(amount: number) {
  return currency.format(amount);
}
