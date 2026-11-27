import { expect, it } from 'vitest';
import { paginationPages } from './pagination-pages';

it('keeps adjacent pages and inserts an ellipsis only for multiple omitted pages', () => {
  expect(paginationPages(1, 8)).toEqual([1, 2, 3, 'gap-8', 8]);
  expect(paginationPages(1, 2)).toEqual([1, 2]);
  expect(paginationPages(4, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  expect(paginationPages(9, 10)).toEqual([1, 2, 3, 'gap-8', 8, 9, 10]);
});
