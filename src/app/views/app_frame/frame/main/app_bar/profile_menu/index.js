import React, { useState } from 'react';
import { map, prop, path } from 'ramda';
import { Menu, MenuItem, IconButton, Avatar } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const ProfileMenu = ({
  group,
  setViewing,
  parentCode,
  profilePictureURL,
  userFullName,
  fakePictureForDemo,
}) => {
  const [menu, setMenu] = useState( null );

  return (
    <div>
      <IconButton
        onClick={event => setMenu( event.currentTarget )}
        color="inherit"
      >
        {fakePictureForDemo || ( profilePictureURL && profilePictureURL.length ) ? (
          <Avatar
            alt={userFullName}
            src={fakePictureForDemo || profilePictureURL}
          />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Menu
        open={!!menu}
        anchorEl={menu}
        onClose={() => setMenu( null )}
      >
        {map( item => (
          <MenuItem
            key={`menuItem${prop( 'questionCode', item )}`}
            onClick={() => {
              setMenu( null );
              setViewing({
                code: prop( 'questionCode', item ),
                parentCode,
                targetCode: prop( 'targetCode', item ),
              });
            }}
          >
            {prop( 'name', item || {})}
          </MenuItem>
        ))( prop( 'childAsks', group ) || [] )}
      </Menu>
    </div>
  );
};

export default ProfileMenu;
