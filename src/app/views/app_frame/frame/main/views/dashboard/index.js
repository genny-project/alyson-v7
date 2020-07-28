import React, { useState } from 'react'
import { path, map } from 'ramda'
import { Typography, Badge, Button } from '@material-ui/core'
import { Row, Col } from '../../components/layouts'
import { TimelineIntern, TimelineHC, TimelineSTT, TimelineGeneric } from './timeline'
import InfoIcon from '@material-ui/icons/Info'
import Loader from 'react-spinners/ClimbingBoxLoader'
import getUserRole from './helpers/get-user-role'
import SearchIcon from '@material-ui/icons/Search'
import getCount from './helpers/get-count'

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

const Dashboard = ({ projectName, setViewing, dashboard, user, asks, attributes }) => {

  const classes = useStyles()
  const { isAdmin, isAgent, isSupervisor, isIntern } = getUserRole(user)

    return path( ['QUE_DASHBOARD_TIMELINE_GRP'], asks ) ? (
      <TimelineGeneric setViewing={setViewing} user={user} asks={asks}/>
    ) : (
      <Col spacing={10} className={classes.dashboardContainer}>
        {path(['data', 'name'], user) ? (
          <Typography variant="h4" className={classes.welcomeText}>{`Hello, ${path(
            ['data', 'name'],
            user,
          )} from ${path(['attributes', 'PRI_ASSOC_ENTITY_NAME', 'value'], user)}!`}</Typography>
        ) : (
          <div />
        )}
        <Row justify="space-between" spacing={9}>
          <InfoBadge
            label={'All Interns'}
            value={getCount(attributes)('CNS_COUNT_INTERN_ALL')}
          />
          <InfoBadge
            label={'All Internships'}
            value={getCount(attributes)('CNS_COUNT_INTERNSHIP_ALL')}
          />
        </Row>
        <Row justify="space-between" spacing={9}>
          <InfoBadge
            value={getCount(attributes)('CNS_COUNT_INTERN_APPLIED')}
            label={'Applied Interns'}
          />
          <InfoBadge
            value={getCount(attributes)('CNS_COUNT_INTERN_PLACED')}
            label={'Placed Interns'}
          />
          <InfoBadge
            value={getCount(attributes)('CNS_COUNT_INTERNSHIP_IN_PROGRESS')}
            label={'In Progress Internships'}
          />
        </Row>
      </Col>
    )
}

export default Dashboard
