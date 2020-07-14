import React, { useState } from 'react'
import { isEmpty, not, path } from 'ramda'
import { Typography, Badge, Button } from '@material-ui/core'
import { Row, Col } from '../../components/layouts'
import { TimelineIntern, TimelineHC, TimelineSTT } from './timeline'
import InfoIcon from '@material-ui/icons/Info'
import Loader from 'react-spinners/ClimbingBoxLoader'
import getUserRole from './helpers/get-user-role'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './styles'

const InfoBadge = ({ onClick, label, value }) => {
  const [showBadge, setShowBadge] = useState(false)

  const classes = useStyles()

  return (
    <Badge invisible={!showBadge} badgeContent={<InfoIcon />}>
      <Col
        container
        onMouseEnter={() => setShowBadge(true)}
        onMouseLeave={() => setShowBadge(false)}
        className={classes.textButton}
        onClick={onClick}
        className={classes.tile}
      >
        <Typography variant="h4">{value}</Typography>
        <Typography variant="h6">{label}</Typography>
      </Col>
    </Badge>
  )
}

const Dashboard = ({ projectName, setViewing, dashboard, user, asks }) => {
  const viewInterns = () =>
    setViewing({ code: 'QUE_TREE_ITEM_INTERNS_GRP', parentCode: 'QUE_TREE_ITEM_CONTACTS_GRP' })
    const viewInternships = () =>
    setViewing({
      parentCode: 'QUE_ADD_ITEMS_GRP',
      code: 'QUE_HOST_CPY_MENU',
      view: 'FORM',
    })

  const classes = useStyles()
  const { isAdmin, isAgent, isSupervisor, isIntern } = getUserRole(user)

  if (not(isEmpty(dashboard))) {
    return isIntern ? (
      <TimelineIntern viewInternships={viewInternships} setViewing={setViewing}/>
    ) : isSupervisor ? (
      <TimelineHC />
    ) : projectName === 'Safe Traffic Town' ? (
      <Typography>{`STT Dashboard`}</Typography>
    ) : (
      <Col spacing={10} className={classes.dashboardContainer}>
        {path(['data', 'name'], user) ? (
          <Typography variant="h4" className={classes.welcomeText}>{`Hello, ${path(
            ['data', 'name'],
            user,
          )}!`}</Typography>
        ) : (
          <div />
        )}
        <Row justify="space-between" spacing={9}>
          <InfoBadge
            label={'All Interns'}
            value={path(['PRI_COUNT_ALL_INTERNS', 'value'], dashboard)}
            onClick={viewInterns}
          />
          <InfoBadge
            onClick={viewInternships}
            label={'All Internships'}
            value={path(['PRI_COUNT_ALL_INTERNSHIPS', 'value'], dashboard)}
          />
        </Row>
        <Row justify="space-between" spacing={9}>
          <InfoBadge
            onClick={viewInterns}
            value={path(['PRI_COUNT_APPLIED_INTERNS', 'value'], dashboard)}
            label={'Applied Interns'}
          />
          <InfoBadge
            onClick={viewInterns}
            value={path(['PRI_COUNT_PLACED_INTERNS', 'value'], dashboard)}
            label={'Placed Interns'}
          />
          <InfoBadge
            onClick={viewInternships}
            value={path(['PRI_COUNT_IN_PROGRESS_INTERNSHIPS', 'value'], dashboard)}
            label={'In Progress Internships'}
          />
        </Row>
      </Col>
    )
  }

  return (
    (projectName === 'Safe Traffic Town' && <TimelineSTT />) ? (
      <TimelineSTT viewInternships={viewInternships}/>
    ) :
    isIntern ? <TimelineIntern viewInternships={viewInternships} setViewing={setViewing} asks={asks}/> :
    <Col className={classes.loading} spacing={4}>
      <Loader size={20} />
      <Typography>{`Preparing Dashboard`}</Typography>
    </Col>
  )
}

export default Dashboard
