import React, { useState } from 'react'
import { isEmpty, not, path } from 'ramda'
import { Typography, Grid, Divider, Badge, Container } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import Loader from 'react-spinners/ClimbingBoxLoader'

import useStyles from './styles'

const InfoBadge = ({ onClick, label, value }) => {
  const [showBadge, setShowBadge] = useState(false)

  const classes = useStyles()

  return (
    <Badge invisible={!showBadge} badgeContent={<InfoIcon />}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        onMouseEnter={() => setShowBadge(true)}
        onMouseLeave={() => setShowBadge(false)}
        className={classes.textButton}
        onClick={onClick}
      >
        <Grid item>
          <Typography variant="h4">{value}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">{label}</Typography>
        </Grid>
      </Grid>
    </Badge>
  )
}

const Dashboard = ({ projectName, setViewing, dashboard, user }) => {
  const viewInterns = () =>
    setViewing({ code: 'QUE_TREE_ITEM_INTERNS_GRP', parentCode: 'QUE_TREE_ITEM_CONTACTS_GRP' })
  const viewInternships = () =>
    setViewing({
      parentCode: 'QUE_TREE_ITEM_INTENSHIPS_GRP',
      code: 'QUE_TREE_ITEM_INTENSHIPS_ACTIVE',
    })

  const classes = useStyles()

  if (not(isEmpty(dashboard))) {
    return projectName === 'Safe Traffic Town' ? (
      <Typography>{`STT Dashboard`}</Typography>
    ) : (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={10}
        className={classes.dashboardContainer}
      >
        <Grid item>
          <Typography variant="h4" className={classes.welcomeText}>{`Hello, ${path(
            ['data', 'name'],
            user,
          )}!`}</Typography>
        </Grid>
        <Grid item className={classes.topBar}>
          <Grid
            container
            justify="space-around"
            alignItems="center"
            direction="row"
            className={classes.fullWidth}
          >
            <Grid item>
              <InfoBadge
                label={'All Interns'}
                value={path(['PRI_COUNT_ALL_INTERNS', 'value'], dashboard)}
                onClick={viewInterns}
              />
            </Grid>
            <Grid item>
              <Divider orientation="vertical" className={classes.divider} />
            </Grid>
            <Grid item>
              <InfoBadge
                onClick={viewInternships}
                label={'All Internships'}
                value={path(['PRI_COUNT_ALL_INTERNSHIPS', 'value'], dashboard)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.fullWidth}>
          <Grid container direction="row" justify="space-between" alignItems="center" spacing={9}>
            <Grid item className={classes.tile}>
              <InfoBadge
                onClick={viewInterns}
                value={path(['PRI_COUNT_APPLIED_INTERNS', 'value'], dashboard)}
                label={'Applied Interns'}
              />
            </Grid>
            <Grid item className={classes.tile}>
              <InfoBadge
                onClick={viewInterns}
                value={path(['PRI_COUNT_PLACED_INTERNS', 'value'], dashboard)}
                label={'Placed Interns'}
              />
            </Grid>
            <Grid item className={classes.tile}>
              <InfoBadge
                onClick={viewInternships}
                value={path(['PRI_COUNT_IN_PROGRESS_INTERNSHIPS', 'value'], dashboard)}
                label={'In Progress Internships'}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.loading}
      spacing={4}
    >
      <Grid item>
        <Loader size={20} />
      </Grid>
      <Grid item>
        <Typography>{`Preparing Dashboard`}</Typography>
      </Grid>
    </Grid>
  )
}

export default Dashboard
