export function paginationPages(page: number, total: number) {
  const candidates = [1, 2, 3, page - 1, page, page + 1, total];
  const pages = [...new Set(candidates)]
    .filter((value) => value >= 1 && value <= total)
    .sort((left, right) => left - right);
  return pages.flatMap((value, index): (number | string)[] => {
    const gap = value - (pages[index - 1] ?? value);
    if (gap === 2) return [value - 1, value];
    if (gap > 2) return [`gap-${value}`, value];
    return [value];
  });
}
