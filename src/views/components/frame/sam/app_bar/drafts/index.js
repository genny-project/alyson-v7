import React, { useState } from 'react';

import { map, pick, values } from 'ramda';

import { Button, Menu, MenuItem } from '@material-ui/core';

const Drafts = ({ drafts, setViewing }) => {
  const [menu, setMenu] = useState(null);

  console.log(drafts);

  return (
    <div>
      <Button
        color="inherit"
        style={{ marginRight: '1rem' }}
        variant="outlined"
        onClick={event => setMenu(event.currentTarget)}
      >{`DRAFTS`}</Button>
      <Menu open={!!menu} onClose={() => setMenu(null)} anchorEl={menu}>
        {map(
          ({ targetCode, question: { code, name } }) => (
            <MenuItem
              onClick={() => setViewing({ code, targetCode, parentCode: 'QUE_DRAFTS_GRP' })}
            >
              {name}
            </MenuItem>
          ),
          drafts
        )}
      </Menu>
    </div>
  );
};

export default Drafts;
