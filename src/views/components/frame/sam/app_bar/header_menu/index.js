import React, { useState } from 'react';
import { map, prop } from 'ramda';
import { Button, Menu, MenuItem } from '@material-ui/core';

const buildGroupCode = str => str.replace( 'MENU', 'GRP' );

const HeaderMenu = ({ group, setViewing, parentCode }) => {
  const [menu, setMenu] = useState( null );

  return (
    <div>
      <Button
        color="inherit"
        variant="outlined"
        onClick={event => setMenu( event.currentTarget )}
      >
        ADD
      </Button>
      <Menu
        open={!!menu}
        anchorEl={menu}
        onClose={() => setMenu( null )}
      >
        {map(({ name, questionCode }) => (
          <MenuItem
            key={`menuItem${questionCode}`}
            onClick={() =>
              setViewing({
                code: questionCode,
                parentCode,
              })
            }
          >
            {name}
          </MenuItem>
        ))( prop( 'childAsks', group ))}
      </Menu>
    </div>
  );
};

export default HeaderMenu;
