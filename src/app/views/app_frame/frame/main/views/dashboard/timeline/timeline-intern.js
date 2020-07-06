import React from 'react'
import { path, map, prop } from 'ramda';

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

const content = {
  header: 'Register',
  body: ['Register in Internmatch', 'Register Again']
}

const Card = ({icon, content}) => {
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
            {path('header', content)}
          </Typography>
            <Typography>
              {map((body) =>
                <Row left>
                  <CheckBoxOutlinedIcon className={classes.greenCheck} />
                  <Button color="inherit" >
                    {body}
                  </Button>
                </Row>
              , prop ('body', content))}
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
        <Card content={content} icon={<HowToRegOutlinedIcon />}/>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className={classes.green}>
              <SearchOutlinedIcon />
            </TimelineDot>
            <TimelineConnector className={classes.green} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Search
              </Typography>
              <Row right>
                <Button color="inherit" onClick={viewInternships}>
                  {`Search from recommended Internship Opportunities`}
                </Button>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
              </Row>
              <Row right>
                <Typography>Save Opportunities</Typography>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
              </Row>
              <Row right>
                <Typography>Complete Accreditation</Typography>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
              </Row>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className={classes.green}>
              <TouchAppOutlinedIcon />
            </TimelineDot>
            <TimelineConnector className={classes.green} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Apply
              </Typography>
              <Row left>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
                <Typography>Applying for internships</Typography>
              </Row>
              <Row left>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
                <Typography>Recommstarted skill development</Typography>
              </Row>
              <Row left>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
                <Typography>Application sent to Host Company</Typography>
              </Row>
              <Row left>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
                <Typography>Attstart Interviews</Typography>
              </Row>
              <Row left>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
                <Typography> Accept offer</Typography>
              </Row>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className={classes.orange}>
              <WorkOutlineOutlinedIcon />
            </TimelineDot>
            <TimelineConnector className={classes.orange} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Internships
              </Typography>
              <Row right>
                <Typography>Induction</Typography>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
              </Row>
              <Row right>
                <Typography>Progress reporting</Typography>
                <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
              </Row>
              <Row right>
                <Typography>Daily Logbook Completion</Typography>
                <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
              </Row>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className={classes.grey}>
              <AssignmentTurnedInOutlinedIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Work Ready
              </Typography>
              <Row left>
                <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
                <Typography>Receive Certificate</Typography>
              </Row>
              <Row left>
                <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
                <Typography>Update your LinkedIn Profile & Resume</Typography>
              </Row>
              <Row left>
                <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
                <Typography>Ask for a recommendation</Typography>
              </Row>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Col>
  )
}

export default TimelineIntern
