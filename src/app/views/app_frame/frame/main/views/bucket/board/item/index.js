import React, { useState } from 'react'

import { contains, prop, has } from 'ramda'

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
  Badge,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import useStyles from './styles'

const Item = ({
  setViewing,
  item,
  expandedColumn,
  column,
  refreshBuckets,
  current,
  setCurrent,
}) => {
  const [menu, setMenu] = useState(null)
  const [expand, setExpand] = useState(false)
  const [loading, setLoading] = useState(null)

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

  const handleShortlist = () => {
    setViewing({
      code: 'QUE_SHORTLIST_APP',
      parentCode: 'QUE_CARD_RIGHT_GRP',
      rootCode: 'QUE_BUCKET_CONTENT_APPLIED_APPLICATIONS_GRP',
      targetCode,
    })
    setCurrent({ ...current, [targetCode]: true })
  }

  const handleInterview = () => {
    setViewing({
      code: 'QUE_INTERVIEW_APP',
      parentCode: 'QUE_CARD_RIGHT_GRP',
      rootCode: 'QUE_BUCKET_CONTENT_SHORTLISTED_APPLICATIONS_GRP',
      targetCode,
    })
    setCurrent({ ...current, [targetCode]: true })
  }

  const handleOffer = () => {
    setViewing({
      code: 'QUE_OFFER_APP',
      parentCode: 'QUE_CARD_RIGHT_GRP',
      rootCode: 'QUE_BUCKET_CONTENT_INTERVIEWED_APPLICATIONS_GRP',
      targetCode,
    })
    setCurrent({ ...current, [targetCode]: true })
  }

  const handlePlace = () => {
    setViewing({
      code: 'QUE_PLACE_APP',
      parentCode: 'QUE_CARD_RIGHT_GRP',
      rootCode: 'QUE_BUCKET_CONTENT_APPLIED_APPLICATIONS_GRP',
      targetCode,
    })
    setCurrent({ ...current, [targetCode]: true })
  }

  const handleReject = () => setViewing({})
  const handleWithdrawn = () => setViewing({})
  const handleViewInternshipAgreement = () =>
    setViewing({
      code: 'QUE_VIEW_AGREEMENT',
      parentCode: 'QUE_CARD_RIGHT_GRP',
      rootCode: 'QUE_BUCKET_CONTENT_OFFERED_APPLICATIONS_GRP',
      targetCode,
    })

  const handleOnHold = () => ({})

  return expandedColumn ? (
    <ClickAwayListener onClickAway={() => setExpand(false)}>
      <div
        onClick={() => {
          setExpand(!expand)
        }}
      >
        <Badge color="secondary" variant="dot" invisible={!has(targetCode, current)}>
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
              classes={{
                title: classes.profileText,
                subheader: classes.profileText,
              }}
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
                    <Typography variant="body2">{`Student Id: ${internStudentId ||
                      ''}`}</Typography>
                    <Typography variant="body2">{`Transport Options: ${transport ||
                      ''}`}</Typography>
                    <Rating readOnly value={Number(starRating)} />
                  </div>
                )}
              </CardContent>
            </Collapse>
          </Card>
        </Badge>
        {contains('PER', targetCode || '') ? (
          <Menu open={!!menu} anchorEl={menu} onClose={() => setMenu(null)}>
            <MenuItem onClick={handleView}>{`View Profile`}</MenuItem>
          </Menu>
        ) : (
          <Menu open={!!menu} anchorEl={menu} onClose={() => setMenu(null)}>
            <MenuItem onClick={handleView}>{`View Application`}</MenuItem>
            {column === 'Applied' ? (
              <MenuItem onClick={handleShortlist}>{`Shortlist`}</MenuItem>
            ) : null}
            {column === 'Offered' ? (
              <MenuItem
                onClick={handleViewInternshipAgreement}
              >{`View Internship Agreement`}</MenuItem>
            ) : null}
            {column === 'Shortlisted' ? (
              <MenuItem onClick={handleInterview}>{`Schedule Interview`}</MenuItem>
            ) : null}
            {column === 'Interview' ? (
              <MenuItem onClick={handleOffer}>{`Make Offer`}</MenuItem>
            ) : null}
          </Menu>
        )}
      </div>
    </ClickAwayListener>
  ) : (
    <Card>
      <CardHeader subheader={name || internName} />
    </Card>
  )
}

export default Item
