const number = new Intl.NumberFormat('ru-RU');
const plural = new Intl.PluralRules('ru-RU');
export function positions(total: number) {
  const form = {
    one: 'позиция',
    few: 'позиции',
    many: 'позиций',
    other: 'позиции',
    zero: 'позиций',
    two: 'позиции',
  };
  const group = plural.select(total);
  return `${number.format(total)} ${form[group]}`;
}

export function availablePositions(total: number) {
  const available = plural.select(total) === 'one' ? 'доступна' : 'доступны';
  return `${positions(total)} ${available} сейчас`;
}
