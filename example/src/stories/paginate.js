import {Fragment, useEffect} from 'react';

import {Story} from 'docs';

import {usePaginate} from '@xorkevin/nuke/src/component/paginate';
import Button from '@xorkevin/nuke/src/component/button';

const Plain = () => {
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

const EndToggle = () => {
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

const FixedEnd = () => {
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

const Stories = () => (
  <Fragment>
    <p>
      <code>usePaginate</code> is used to create pagination.
    </p>
    <Story>
      <Plain />
    </Story>
    <p>
      <code>setAtEnd</code> may be manually called to set at the last page.
    </p>
    <Story>
      <EndToggle />
    </Story>
    <p>
      A fixed end number may be provided to inform <code>usePaginate</code> of
      the last page.
    </p>
    <Story>
      <FixedEnd />
    </Story>
  </Fragment>
);

export default Stories;
