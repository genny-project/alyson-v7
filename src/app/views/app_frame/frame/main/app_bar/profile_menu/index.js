import React, { useState } from 'react'
import { Menu, MenuItem, IconButton, Avatar } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'

const ProfileMenu = ({
  setViewing,
  profilePictureURL,
  userFullName,
  fakePictureForDemo,
  group,
}) => {
  const [menu, setMenu] = useState(null)
  return (
    <div>
      <IconButton
        onClick={event => setMenu(event.currentTarget)}
        color="inherit"
        test-id={group.questionCode}
      >
        {fakePictureForDemo || (profilePictureURL && profilePictureURL.length) ? (
          <Avatar alt={userFullName} src={fakePictureForDemo || profilePictureURL} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Menu open={!!menu} anchorEl={menu} onClose={() => setMenu(null)}>
        <MenuItem
          test-id="QUE_AVATAR_PROFILE_GRP"
          onClick={() =>
            setViewing({
              view: 'FORM',
              code: 'QUE_AVATAR_PROFILE_GRP',
              parentCode: 'QUE_AVATAR_GRP',
            })
          }
        >{`Profile`}</MenuItem>
        <MenuItem
          test-id="QUE_AVATAR_SETTINGS"
          onClick={() => setViewing({ code: 'QUE_AVATAR_SETTINGS', parentCode: 'QUE_AVATAR_GRP' })}
        >{`Settings`}</MenuItem>
        <MenuItem
          test-id="QUE_AVATAR_LOGOUT"
          onClick={() => setViewing({ code: 'QUE_AVATAR_LOGOUT', parentCode: 'QUE_AVATAR_GRP' })}
        >{`Logout`}</MenuItem>
      </Menu>
    </div>
  )
}

export default ProfileMenu
