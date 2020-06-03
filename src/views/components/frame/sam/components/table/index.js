import React, { useState } from 'react';
import Table from 'material-table';
import { CircularProgress, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';

import { path } from 'ramda';

import { getColumns, getData, getTitle } from './helpers/get-table-data';

const TableView = ({ attributes, frames, baseEntities, asks }) => {
  const table = path( ['QUE_TABLE_RESULTS_GRP', 'childAsks'], asks );

  const [menu, setMenu] = useState( null );

  if ( table && table.length ) {
    const title = getTitle({ asks, attributes, frames });
    const columns = getColumns({ table });
    const data = getData({ table, attributes });

    const handleOpenMenu = event => setMenu( event.currentTarget );

    return (
      <div>
        <Table
          title={title || ''}
          columns={columns}
          data={data}
          actions={[
            {
              onClick: ( event, rowData ) => setMenu( event.currentTarget ),
            },
          ]}
          components={{
            Container: props => (
              <div>
                {props.children}
              </div>
            ),
            Action: props => (
              <IconButton
                onClick={event => {
                  event.persist();
                  props.action.onClick( event, props.data );
                }}
              >
                <MoreIcon />
              </IconButton>
            ),
          }}
        />
        <Menu
          open={!!menu}
          anchorEl={menu}
          onClose={() => setMenu( null )}
        >
          <MenuItem>
HI
          </MenuItem>
        </Menu>
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
