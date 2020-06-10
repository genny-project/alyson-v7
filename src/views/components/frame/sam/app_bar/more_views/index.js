import React, { useState } from 'react';

import { pickBy, contains, map, values, length } from 'ramda';

import { Button, Menu, MenuItem } from '@material-ui/core';

const MoreViews = ({ asks, setViewing }) => {
  const moreViews = values(pickBy((val, key) => contains('_VIEW', key), asks));

  const [menu, setMenu] = useState(null);
  return length(moreViews) ? (
    <div style={{ marginRight: '1rem' }}>
      <Button variant="outlined" color="inherit" onClick={event => setMenu(event.currentTarget)}>
        Views
      </Button>
      <Menu open={!!menu} anchorEl={menu} onClose={() => setMenu(null)}>
        {map(
          ({ name, questionCode, targetCode }) => (
            <MenuItem onClick={() => setViewing({ code: questionCode, targetCode })}>
              {name}
            </MenuItem>
          ),
          moreViews || []
        )}
      </Menu>
    </div>
  ) : null;
};

export default MoreViews;
