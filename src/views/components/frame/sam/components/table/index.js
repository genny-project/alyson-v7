import React from 'react';
import Table from 'material-table';
import { CircularProgress } from '@material-ui/core';

import { path, compose, head, prop, map, replace, tail, mergeAll } from 'ramda';

const makeColumns = compose(
  map(({ attributeCode, name }) => ({ title: name, field: replace( '_HEADER', '', attributeCode ) })),
  prop( 'childAsks' )
);

const makeCell = attributes =>
  compose(({ targetCode, attributeCode }) => ({
    [attributeCode]: path( [targetCode, attributeCode, 'value'], attributes ),
  }));

const makeRow = attributes =>
  compose(
    mergeAll,
    map( makeCell( attributes )),
    prop( 'childAsks' )
  );

const makeRows = attributes => compose( map( makeRow( attributes )));

const TableView = ({ attributes, frames, baseEntities, asks }) => {
  const table = path( ['QUE_TABLE_RESULTS_GRP', 'childAsks'], asks );

  if ( table && table.length ) {
    const title = compose(
      ({ attributeCode, targetCode }) => path( [targetCode, attributeCode, 'value'], attributes ),
      ({ code }) => prop( code, asks ),
      head,
      path( ['FRM_TABLE_TITLE', 'links'] )
    )( frames );

    console.log( title );

    const columns = compose(
      makeColumns,
      head
    )( table );

    const data = compose(
      makeRows( attributes ),
      tail
    )( table );

    return (
      <div>
        <Table
          title={title || ''}
          columns={columns}
          data={data}
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

  return (
    <div>
      <CircularProgress />
    </div>
  );
};

export default TableView;
