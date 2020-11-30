import {Fragment} from 'react';

import {Story} from 'docs';

import Table from '@xorkevin/nuke/src/component/table';
import {tableData} from 'config';

const Stories = () => (
  <Fragment>
    <p>
      <code>Table</code> is used to display a table.
    </p>
    <Story>
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
    </Story>
  </Fragment>
);

export default Stories;
