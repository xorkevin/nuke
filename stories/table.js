import React, {Fragment} from 'react';
import Table from 'src/component/table';
import {tableData} from 'example/src/config';

export default {title: 'Table'};

export const plain = () => (
  <Table
    head={
      <Fragment>
        <th>name</th>
        <th>description</th>
      </Fragment>
    }
  >
    {tableData.map(({name, description}) => (
      <tr key={name}>
        <td>{name}</td>
        <td>{description}</td>
      </tr>
    ))}
  </Table>
);
