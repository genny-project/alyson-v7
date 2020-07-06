import React, { useState } from 'react'
import { map, prop, addIndex, } from 'ramda';
import getIcons from '../helpers/get-icons.js'

import { Row, Col } from '../../../components/layouts'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from '@material-ui/lab'
import { Paper, Typography, Button } from '@material-ui/core'
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined'
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined'
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined'
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './styles'

const register = {
  header: 'Register',
  body: [
    { content: 'Register in Internmatch', status: true },
    { content: 'Complete Profile', status: true },
    { content: 'Record Introduction Video', status: true },
  ],
  icon: 'register'
}

const search = {
  header: 'Search',
  body: [
    { content: 'Search from recommended Internship Opportunities', status: true, redirect: true },
    { content: 'Save Opportunities', status: true },
    { content: 'Complete Accreditation', status: true },
  ],
  icon: 'search'
}

const apply = {
  header: 'Apply',
  body: [
    { content: 'Applying for internships', status: true },
    { content: 'Recommended skill development', status: true },
    { content: 'Application sent to Host Company', status: true },
    { content: 'Attend Interviews', status: true },
    { content: 'Accept offer', status: true },
  ],
  icon: 'apply'
}

const internships = {
  header: 'Internships',
  body: [
    { content: 'Induction', status: true },
    { content: 'Progress reporting', status: false },
    { content: 'Daily Logbook Completion', status: false },
  ],
  icon: 'internships'
}

const workReady = {
  header: 'Work Ready',
  body: [
    { content: 'Receive Certificate', status: false },
    { content: 'Update your LinkedIn Profile & Resume', status: false },
    { content: 'Ask for a recommendation', status: false },
  ],
  icon: 'workReady'
}

const allData = [ register, search, apply, internships, workReady ]

const Card = ({icon, header, body, side, viewInternships }) => {
  const classes = useStyles()

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot className={classes.green}>
          {icon}
        </TimelineDot>
        <TimelineConnector className={classes.green} />
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" component="h1">
            {header}
          </Typography>
            <Typography>
              {map(({content, status, redirect}) =>
                <Row left={side==='right'} right={side==='left'}>
                  { side === 'right'
                    ? status
                      ? <CheckBoxOutlinedIcon className={classes.greenCheck}/>
                      : <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck}/>
                    : null }
                    <Button color="inherit" onClick={redirect ? viewInternships : () => console.log('nothing')}>
                      {content}
                    </Button>
                  { side === 'left'
                    ? status
                      ? <CheckBoxOutlinedIcon className={classes.greenCheck} />
                      : <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck}/>
                    : null }
                </Row>, body)}
            </Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  )
}

const TimelineIntern = ({ viewInternships }) => {
  const classes = useStyles()

  return (
    <Col stretch align="center">
      <Row>
        <Typography variant="h4">5 Steps to becoming</Typography>
        <Typography variant="h4" color="secondary">{`Work Ready`}</Typography>
      </Row>
      <Button
        color="primary"
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={viewInternships}
      >{`Start Internship Search`}</Button>
      <Timeline align="alternate">
       { addIndex(map)(( card, idx )=> <Card header={card.header} body={card.body} icon={getIcons(card.icon)} side={ idx%2 === 0 ? 'right' : 'left'} viewInternships={viewInternships}/>
       , allData)}
      </Timeline>
    </Col>
  )
}

export default TimelineIntern
