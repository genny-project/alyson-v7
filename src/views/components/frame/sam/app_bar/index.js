import React from 'react';
import { path } from 'ramda';

import { AppBar, Toolbar, InputBase, IconButton, Avatar, LinearProgress } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HeaderMenu from './header_menu';
import ProfileMenu from './profile_menu';
import { getIsMobile } from '../utils';
import useStyles from './styles';

const MainAppBar = ({ asks, user, setViewing, sidebarOpen, setSidebarOpen, loading }) => {
  const profilePictureURL = path( ['attributes', 'PRI_USER_PROFILE_PICTURE', 'value'], user );
  const userFullName = path( ['data', 'name'], user );
  const classes = useStyles();
  const [openMenu, setOpenMenu] = React.useState( null );

  const isMenuOpen = Boolean( openMenu );

  const handleProfileMenuOpen = ( event ) => {
    setOpenMenu( event.currentTarget );
  };

  const handleMenuClose = () => {
    setOpenMenu( null );
  };

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
Settings
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
Logout
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar className={classes.appBar}>
          {getIsMobile() ? (
            <IconButton
              color="inherit"
              onClick={() => setSidebarOpen( !sidebarOpen )}
            >
              <MenuIcon color="inherit" />
            </IconButton>
          ) : null}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon color="inherit" />
            </div>
            <InputBase
              placeholder="Search ..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <HeaderMenu
            group={asks['QUE_ADD_ITEMS_GRP']}
            setViewing={setViewing}
            parentCode="QUE_ADD_ITEMS_GRP"
          />
          <ProfileMenu
            group={asks['QUE_OPTIONS_GRP']}
            setViewing={setViewing}
            parentCode="QUE_OPTIONS_GRP"
            profilePictureURL={profilePictureURL}
            userFullName={userFullName}
          />
        </Toolbar>
        {loading ? <LinearProgress className={classes.loadingBar} /> : null}
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default MainAppBar;
