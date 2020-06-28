import {useState, useCallback} from 'react';

const max = (a, b) => (a > b ? a : b);
const max0 = (a) => max(a, 0);

const noop = () => {};

const getPage = (index, limit) => Math.floor(index / max(limit, 1)) + 1;

// end is a number with the value of the size of the number of items. NOTE: not
// the index of the last item.
const usePaginate = (limit = 8, end = -1) => {
  const [atEnd, setAtEnd] = useState(false);
  const [index, setIndex] = useState(0);
  const page = getPage(index, limit);
  const lastPage = end > 0 ? getPage(end - 1, limit) : -1;
  const atFirst = page <= 1;
  const atLast = lastPage > 0 ? page >= lastPage : atEnd;

  const setPage = useCallback((i) => setIndex(max0((i - 1) * limit)), [
    setIndex,
    limit,
  ]);
  const next = useCallback(() => setIndex((i) => max0(i + limit)), [
    setIndex,
    limit,
  ]);
  const prev = useCallback(() => setIndex((i) => max0(i - limit)), [
    setIndex,
    limit,
  ]);
  const first = useCallback(() => setIndex(0), [setIndex]);
  const lastNum = useCallback(() => setPage(lastPage), [setPage, lastPage]);

  return {
    index,
    page,
    lastPage,
    atFirst,
    atLast,
    setPage,
    next: atLast ? noop : next,
    prev,
    first,
    last: lastPage > 0 ? lastNum : noop,
    setAtEnd,
  };
};

export {usePaginate as default, usePaginate};
