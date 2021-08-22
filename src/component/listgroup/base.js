import {Grid, Column} from '../grid';
import Anchor from '../anchor';

const ListDivider = ({className}) => {
  const k = ['listgroup-divider'];
  if (className) {
    k.push(className);
  }
  return <div className={k.join(' ')}></div>;
};

const ListHeader = ({className, children}) => {
  const k = ['listgroup-header'];
  if (className) {
    k.push(className);
  }
  return <div className={k.join(' ')}>{children}</div>;
};

const ListItem = ({
  className,
  onClick,
  local,
  ext,
  link,
  forwardedRef,
  children,
}) => {
  const k = ['listgroup-item'];
  if (className) {
    k.push(className);
  }

  if (link) {
    return (
      <Anchor
        forwardedRef={forwardedRef}
        className={k.join(' ')}
        local={local}
        ext={ext}
        href={link}
      >
        {children}
      </Anchor>
    );
  }
  return (
    <Column
      forwardedRef={forwardedRef}
      className={k.join(' ')}
      onClick={onClick}
    >
      {children}
    </Column>
  );
};

const listgroupSizeSet = new Set(['sm', 'md', 'lg']);

const ListGroup = ({className, size, padded, children}) => {
  const k = ['listgroup'];
  if (listgroupSizeSet.has(size)) {
    k.push(size);
  }
  if (padded) {
    k.push('padded');
  }
  if (className) {
    k.push(className);
  }
  return (
    <div className={k.join(' ')}>
      <Grid className="listgroup-items" strict nowrap direction="column">
        {children}
      </Grid>
    </div>
  );
};

export {ListGroup as default, ListGroup, ListItem, ListHeader, ListDivider};
