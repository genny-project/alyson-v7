import React from 'react';
import Table from 'material-table';
import { CircularProgress } from '@material-ui/core';

import { path, prop } from 'ramda';

import { getColumns, getData, getTitle } from './helpers/get-table-data';

const TableView = ({ attributes, frames, asks, setViewing }) => {
  const table = path( ['QUE_TABLE_RESULTS_GRP', 'childAsks'], asks );

  if ( table && table.length ) {
    const title = getTitle({ asks, attributes, frames });
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
              onClick: ( event, rowData ) => setViewing({ targetCode: prop( 'targetCode', rowData ) }),
            },
          ]}
          components={{
            Container: props => (
              <div>
                {props.children}
              </div>
            ),
          }}
        />
      </div>
    );
  }

  return <div />;
};

export default TableView;
