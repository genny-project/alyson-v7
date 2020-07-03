import React from 'react'

import {Row, Col} from '../../../components/layouts'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot
} from '@material-ui/lab'
import { Paper, Typography } from '@material-ui/core'
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined'
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined'
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined'
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'

import useStyles from './styles'

const Timelines = () => {

  const classes = useStyles()

  return (
    <Col stretch align="center" >
      <Typography variant="h4"> 5 Steps to becoming Work Ready </Typography>
      <Timeline align="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className={classes.green}>
              <HowToRegOutlinedIcon />
            </TimelineDot>
            <TimelineConnector className={classes.green}/>
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Register
              </Typography>
              <Row left>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
                <Typography>Register in Internmatch</Typography>
              </Row>
              <Row left>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
                <Typography>Complete Profile</Typography>
              </Row>
              <Row left>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
                <Typography>Record Introduction Video</Typography>
              </Row>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className={classes.green}>
              <SearchOutlinedIcon />
            </TimelineDot>
            <TimelineConnector className={classes.green}/>
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Search
              </Typography>
              <Row right>
                <Typography>Search from recommended Internship Opportunities</Typography>
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
            <TimelineConnector className={classes.green}/>
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
                <CheckBoxOutlinedIcon className={classes.greenCheck}/>
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

export default Timelines
