import React from 'react'
import { path } from 'ramda'

import { AppBar, Toolbar, InputBase, IconButton, LinearProgress } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import HeaderMenu from './header_menu'
import ProfileMenu from './profile_menu'
import { getIsMobile } from '../utils'
import useStyles from './styles'
import Search from './search'
import Drafts from './drafts'

const MainAppBar = ({
  setLoading,
  asks,
  user,
  setViewing,
  sidebarOpen,
  setSidebarOpen,
  loading,
}) => {
  const profilePictureURL = path(['attributes', 'PRI_USER_PROFILE_PICTURE', 'value'], user)
  const userFullName = path(['data', 'name'], user)
  const classes = useStyles()

  const fakePictureForDemo = path(['attributes', 'PRI_IMAGE_URL', 'value'], user)

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar className={classes.appBar}>
          {getIsMobile() ? (
            <IconButton color="inherit" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <MenuIcon color="inherit" />
            </IconButton>
          ) : null}
          <Search
            question={{
              askId: 272,
              attributeCode: 'PRI_SEARCH_TEXT',
              code: 'QUE_SEARCH',
              sourceCode: 'PER_USER1',
              targetCode: 'PER_USER1',
              weight: 1,
            }}
            setViewing={setViewing}
            setLoading={setLoading}
          />
          <div className={classes.grow} />
          <Drafts
            drafts={path(['QUE_DRAFTS_GRP', 'childAsks'], asks)}
            asks={asks}
            setViewing={setViewing}
          />
          <HeaderMenu
            group={asks['QUE_ADD_ITEMS_GRP']}
            setViewing={setViewing}
            parentCode="QUE_ADD_ITEMS_GRP"
          />
          <ProfileMenu
            group={asks['QUE_AVATAR_GRP']}
            setViewing={setViewing}
            parentCode="QUE_AVATAR_GRP"
            profilePictureURL={profilePictureURL}
            userFullName={userFullName}
            fakePictureForDemo={fakePictureForDemo}
          />
        </Toolbar>
        {loading ? <LinearProgress className={classes.loadingBar} /> : null}
      </AppBar>
    </div>
  )
}

export default MainAppBar
