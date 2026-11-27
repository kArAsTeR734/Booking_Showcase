export function validatePrices(min: string, max: string) {
  if (
    [min, max].some(
      (price) => price !== '' && (!/^\d+$/.test(price) || !Number.isSafeInteger(Number(price))),
    )
  ) {
    return 'Введите целые неотрицательные суммы.';
  }
  if (min && max && Number(min) > Number(max)) return 'Минимальная цена выше максимальной.';
}
