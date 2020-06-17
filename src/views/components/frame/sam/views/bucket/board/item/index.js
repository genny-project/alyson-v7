import React, { useState } from 'react'

import { contains } from 'ramda'

import {
  Card,
  IconButton,
  CardHeader,
  Avatar,
  Menu,
  MenuItem,
  Collapse,
  CardContent,
  Typography,
  ClickAwayListener,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import useStyles from './styles'

const Item = ({ setViewing, item }) => {
  const [menu, setMenu] = useState(null)
  const [expand, setExpand] = useState(false)

  const {
    PRI_ASSOC_EP,
    PRI_EMAIL: email,
    PRI_INDUSTRY: industry,
    PRI_MOBILE: mobile,
    PRI_NAME: name,
    PRI_STATUS_COLOR: statusColor,
    PRI_STUDENT_ID: studentId,
    PRI_PROFILE_PICTURE_URL: profilePicture,
    PRI_COMPASS: locale,
    PRI_EDU_PROVIDER_NAME: eduProvider,
    PRI_INTERN_NAME: internName,
    PRI_INTERN_EMAIL: internEmail,
    PRI_INTERN_STUDENT_ID: internStudentId,
    PRI_OCCUPATION: occupation,
    PRI_STAR_RATING: starRating,
    PRI_TRANSPORT: transport,
    targetCode,
  } = item

  const classes = useStyles({ statusColor })
  const handleView = () =>
    setViewing({
      code: 'QUE_VIEW_PROFILE',
      parentCode: 'QUE_CARD_RIGHT_GRP',
      rootCode: 'QUE_BUCKET_CONTENT_AVAILABLE_INTERNS_GRP',
      targetCode,
    })

  const handleOnHold = () => {}

  return (
    <ClickAwayListener onClickAway={() => setExpand(false)}>
      <div
        onClick={() => {
          setExpand(!expand)
        }}
      >
        <Card className={classes.itemRoot}>
          <CardHeader
            avatar={<Avatar alt={name} src={profilePicture} className={classes.profilePicture} />}
            title={name || internName}
            subheader={email || internEmail}
            action={
              <IconButton
                aria-label="settings"
                onClick={event => {
                  setMenu(event.currentTarget)
                }}
              >
                <MoreVertIcon />
              </IconButton>
            }
          />
          <Collapse in={expand && !menu}>
            <CardContent>
              {contains('PER', targetCode || '') ? (
                <div>
                  <Typography variant="body2">{`Student ID: ${studentId || ''}`}</Typography>
                  <Typography variant="body2">{`Mobile: ${mobile || ''}`}</Typography>
                </div>
              ) : (
                <div>
                  <Typography variant="body2">{`Education Provider: ${eduProvider ||
                    ''}`}</Typography>
                  <Typography variant="body2">{`Industry: ${industry || ''}`}</Typography>
                  <Typography variant="body2">{`Specialisation: ${occupation || ''}`}</Typography>
                  <Typography variant="body2">{`Student Id: ${internStudentId || ''}`}</Typography>
                  <Typography variant="body2">{`Transport Options: ${transport || ''}`}</Typography>
                  <Rating readOnly value={Number(starRating)} />
                </div>
              )}
            </CardContent>
          </Collapse>
        </Card>
        {contains('PER', targetCode || '') ? (
          <Menu open={!!menu} anchorEl={menu} onClose={() => setMenu(null)}>
            <MenuItem onClick={handleView}>{`View Profile`}</MenuItem>
          </Menu>
        ) : (
          <Menu open={!!menu} anchorEl={menu} onClose={() => setMenu(null)}>
            <MenuItem onClick={handleView}>{`View Application`}</MenuItem>
          </Menu>
        )}
      </div>
    </ClickAwayListener>
  )
}

export default Item
