import React from 'react';

const TableRow = ({className, children}) => {
  return <tr className={className}>{children}</tr>;
};

const TableHead = ({
  id,
  className,
  scope,
  colspan,
  rowspan,
  headers,
  children,
}) => {
  return (
    <th
      id={id}
      className={className}
      scope={scope}
      colspan={colspan}
      rowspan={rowspan}
      headers={headers}
    >
      {children}
    </th>
  );
};

const TableData = ({className, colspan, rowspan, headers, children}) => {
  return (
    <td
      className={className}
      colspan={colspan}
      rowspan={rowspan}
      headers={headers}
    >
      {children}
    </td>
  );
};

const Table = ({className, head, children, foot}) => {
  return (
    <table className={className}>
      {head && (
        <thead>
          <tr>{head}</tr>
        </thead>
      )}
      <tbody>{children}</tbody>
      {foot && (
        <tfoot>
          <tr>{foot}</tr>
        </tfoot>
      )}
    </table>
  );
};

export {Table as default, Table, TableRow, TableHead, TableData};
