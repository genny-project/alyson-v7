import React from 'react';
import { path } from 'ramda';

import { AppBar, Toolbar, InputBase, IconButton, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HeaderMenu from './header_menu';

import { getIsMobile } from '../utils';
import useStyles from './styles';

const MainAppBar = ({ asks, user, setViewing, sidebarOpen, setSidebarOpen }) => {
  const profilePictureURL = path( ['attributes', 'PRI_USER_PROFILE_PICTURE', 'value'], user );
  const userFullName = path( ['data', 'name'], user );

  const classes = useStyles();

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
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            {profilePictureURL.length ? (
              <Avatar
                alt={userFullName}
                src={profilePictureURL}
              />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainAppBar;
