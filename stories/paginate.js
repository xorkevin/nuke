import React, {Fragment, useEffect} from 'react';
import {usePaginate} from 'src/component/paginate';
import Button from 'src/component/button';

export default {title: 'Paginate'};

export const Plain = () => {
  const {
    index,
    page,
    lastPage,
    atFirst,
    atLast,
    next,
    prev,
    first,
    last,
  } = usePaginate();
  return (
    <Fragment>
      <Button disabled={atFirst} onClick={first}>
        &lt;&lt;
      </Button>
      <Button disabled={atFirst} onClick={prev}>
        &lt;
      </Button>
      <span style={{padding: '8px'}}>index: {index}</span>
      <span style={{padding: '8px'}}>page: {page}</span>
      <span style={{padding: '8px'}}>last page: {lastPage}</span>
      <Button disabled={atLast} onClick={next}>
        &gt;
      </Button>
      <Button disabled={atLast} onClick={last}>
        &gt;&gt;
      </Button>
    </Fragment>
  );
};

export const EndToggle = () => {
  const {
    index,
    page,
    lastPage,
    atFirst,
    atLast,
    next,
    prev,
    first,
    last,
    setAtEnd,
  } = usePaginate();
  useEffect(() => {
    if (index > 30) {
      setAtEnd(true);
    } else {
      setAtEnd(false);
    }
  }, [setAtEnd, index]);
  return (
    <Fragment>
      <Button disabled={atFirst} onClick={first}>
        &lt;&lt;
      </Button>
      <Button disabled={atFirst} onClick={prev}>
        &lt;
      </Button>
      <span style={{padding: '8px'}}>index: {index}</span>
      <span style={{padding: '8px'}}>page: {page}</span>
      <span style={{padding: '8px'}}>last page: {lastPage}</span>
      <Button disabled={atLast} onClick={next}>
        &gt;
      </Button>
      <Button disabled={atLast} onClick={last}>
        &gt;&gt;
      </Button>
    </Fragment>
  );
};

export const FixedEnd = () => {
  const {
    index,
    page,
    lastPage,
    atFirst,
    atLast,
    next,
    prev,
    first,
    last,
  } = usePaginate(8, 36);
  return (
    <Fragment>
      <Button disabled={atFirst} onClick={first}>
        &lt;&lt;
      </Button>
      <Button disabled={atFirst} onClick={prev}>
        &lt;
      </Button>
      <span style={{padding: '8px'}}>index: {index}</span>
      <span style={{padding: '8px'}}>page: {page}</span>
      <span style={{padding: '8px'}}>last page: {lastPage}</span>
      <Button disabled={atLast} onClick={next}>
        &gt;
      </Button>
      <Button disabled={atLast} onClick={last}>
        &gt;&gt;
      </Button>
    </Fragment>
  );
};
