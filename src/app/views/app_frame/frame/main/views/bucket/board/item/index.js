import React, { useState } from 'react'

import { contains, prop, has, map, mergeAll } from 'ramda'
import { Row, Col } from '../../../../components/layouts'
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
  LinearProgress,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { School, Smartphone, PermIdentity, Domain, Commute, Work } from '@material-ui/icons'

import useStyles from './styles'

const Item = ({
  setViewing,
  item,
  targetCode,
  expandedColumn,
  column,
  refreshBuckets,
  current,
  setCurrent,
  actions,
}) => {
  const [menu, setMenu] = useState(null)
  const [expand, setExpand] = useState(false)
  const [loading, setLoading] = useState(null)

  const {
    PRI_ASSOC_EP: eduProviderAssoc,
    PRI_EMAIL: email,
    PRI_ASSOC_INDUSTRY: internIndustry,
    PRI_INDUSTRY: industry,
    PRI_MOBILE: mobile,
    PRI_INTERN_MOBILE: internMobile,
    PRI_NAME: name,
    PRI_STATUS_COLOR: statusColor,
    PRI_STUDENT_ID: studentId,
    PRI_PROFILE_PICTURE_URL: profilePicture,
    PRI_COMPASS: locale,
    PRI_EDU_PROVIDER_NAME: eduProvider,
    PRI_INTERN_NAME: internName,
    PRI_INTERN_EMAIL: internEmail,
    PRI_INTERN_STUDENT_ID: internStudentId,
    PRI_USER_PROFILE_PICTURE: internProfilePicture,
    PRI_OCCUPATION: occupation,
    PRI_ASSOC_OCCUPATION: internOccupation,
    PRI_STAR_RATING: starRating,
    PRI_TRANSPORT: transport,
    PRI_ASSOC_HC: hostCompany,
  } = {
    ...mergeAll(
      map(
        ({ attributeCode, value, valueString }) => ({ [attributeCode]: valueString || value }),
        item,
      ),
    ),
  }

  const classes = useStyles({ statusColor })

  const handleAction = code => () => {
    setMenu(null)
    setCurrent(current => ({ ...current, [targetCode]: true }))

    if (code === 'QUE_PRI_EVENT_APPLY') {
      setViewing({
        code: `${code}_${targetCode}`,
        targetCode,
        parentCode: `QUE_${targetCode}_GRP`,
        rootCode: 'QUE_TABLE_RESULTS_GRP',
        view: 'BUCKET',
        dialog: 'APPLICATION',
        redirect: () => setViewing({ view: 'BUCKET' }),
      })
    } else {
      setLoading(true)
      setViewing({
        code: code === 'QUE_PRI_EVENT_OFFER' ? 'QUE_PRI_EVENT_OFFERED_APPLICATION' : code,
        targetCode,
        view: code === 'QUE_PRI_EVENT_EDIT_AGREEMENT' ? 'QUE_PRE_AGREEMENT_DOC_GRP' : 'BUCKET',
        redirect:
          code === 'QUE_PRI_EVENT_EDIT_AGREEMENT' ? () => setViewing({ view: 'BUCKET' }) : null,
      })
    }
  }

  return expandedColumn ? (
    <ClickAwayListener onClickAway={() => setExpand(false)}>
      <div
        onClick={() => {
          setExpand(!expand)
        }}
      >
        <Badge color="secondary" variant="dot" invisible={!has(targetCode, current)}>
          <Card className={classes.itemRoot}>
            {loading ? <LinearProgress /> : <div style={{ height: '5px' }} />}
            <CardHeader
              avatar={
                <Avatar
                  variant="rounded"
                  alt={name}
                  src={profilePicture || internProfilePicture}
                  className={classes.profilePicture}
                />
              }
              title={name || internName}
              subheader={email || internEmail || hostCompany}
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
                  <Col left>
                    <Row left>
                      <PermIdentity color="action" />
                      <Typography variant="body2">{`${studentId || ''}`}</Typography>
                    </Row>
                    <Row left>
                      <Smartphone color="action" />
                      <Typography variant="body2">{`${internMobile || mobile || ''}`}</Typography>
                    </Row>
                    <Row left>
                      <School color="action" />
                      <Typography variant="body2">{`${eduProviderAssoc ||
                        eduProvider ||
                        ''}`}</Typography>
                    </Row>
                  </Col>
                ) : (
                  <Col left>
                    <Row left>
                      <Smartphone color="action" />
                      <Typography variant="body2">{`${internMobile || mobile || ''}`}</Typography>
                    </Row>
                    <Row left>
                      <School color="action" />
                      <Typography variant="body2">{`${eduProviderAssoc ||
                        eduProvider ||
                        ''}`}</Typography>
                    </Row>
                    <Row left>
                      <Domain color="action" />
                      <Typography variant="body2">{`${internIndustry ||
                        industry ||
                        ''}`}</Typography>
                    </Row>
                    <Row left>
                      <Work color="action" />
                      <Typography variant="body2">{`${internOccupation ||
                        occupation ||
                        ''}`}</Typography>
                    </Row>
                    <Row left>
                      <PermIdentity color="action" />
                      <Typography variant="body2">{`${internStudentId || ''}`}</Typography>
                    </Row>
                    <Row left>
                      <Commute color="action" />
                      <Typography variant="body2">{`${transport || ''}`}</Typography>
                    </Row>
                    <Rating readOnly value={Number(starRating)} />
                  </Col>
                )}
              </CardContent>
            </Collapse>
          </Card>
        </Badge>
        <Menu open={!!menu} anchorEl={menu} onClose={() => setMenu(null)}>
          {map(
            ({ code, attributeName }) => (
              <MenuItem key={targetCode + code} onClick={handleAction(code)}>
                {attributeName}
              </MenuItem>
            ),
            actions,
          )}
        </Menu>
      </div>
    </ClickAwayListener>
  ) : (
    <Card>
      <CardHeader subheader={name || internName} />
    </Card>
  )
}

export default Item
