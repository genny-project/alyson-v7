import React from 'react';
import Table from 'material-table';

import { path } from 'ramda';

import { getColumns, getData, getTitle } from './helpers/get-table-data';
import getActionData from './helpers/get-action-data';

const TableView = ({ attributes, asks, setViewing }) => {
  const table = path(['QUE_TABLE_RESULTS_GRP', 'childAsks'], asks) || [];

  if (table && table.length) {
    const title = getTitle(table);
    const columns = getColumns({ table });
    const data = getData({ table, attributes });

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
              onClick: (event, rowData) =>
                setViewing(getActionData({ table, rowData, actionCode: 'PRI_EVENT_VIEW' })),
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
