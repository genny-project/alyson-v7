import React from 'react';
import Table from 'material-table';

import { getColumns, getData, getTitle, getTable } from './helpers/get-table-data';
import getActionData from './helpers/get-action-data';

const TableView = ({ currentSearch, setViewing }) => {
  const table = getTable(currentSearch);

  if (table) {
    const title = getTitle(table);
    const columns = getColumns(table);
    const data = getData(table);

    return (
      <div>
        <Table
          title={title || ''}
          columns={columns}
          data={data}
          actions={[
            {
              icon: 'visibility',
              tooltip: 'View',
              onClick: (event, rowData) => console.log(rowData),
            },
          ]}
          components={{
            Container: props => <div>{props.children}</div>,
          }}
        />
      </div>
    );
  }

  return <div />;
};

export default TableView;
