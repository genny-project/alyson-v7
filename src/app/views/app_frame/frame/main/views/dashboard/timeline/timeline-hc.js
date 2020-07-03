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
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined'

import useStyles from './styles'

const TimelineHC = () => {

  const classes = useStyles()

  return (
    <Col stretch align="center" >
      <Typography variant="h4">5 Steps for securing an Intern</Typography>
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
              <ListAltOutlinedIcon />
            </TimelineDot>
            <TimelineConnector className={classes.green}/>
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Post Internships
              </Typography>
              <Row right>
                <Typography>List internship opportunities</Typography>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
              </Row>
              <Row right>
                <Typography>Invite recommended interns to apply</Typography>
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
                Select
              </Typography>
              <Row left>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
                <Typography>Review applications </Typography>
              </Row>
              <Row left>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
                <Typography>Shortlist applicants</Typography>
              </Row>
              <Row left>
                <CheckBoxOutlinedIcon className={classes.greenCheck} />
                <Typography>Book Interviews</Typography>
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
                Internship
              </Typography>
              <Row right>
                <Typography>Induction & Orientation</Typography>
                <CheckBoxOutlinedIcon className={classes.greenCheck}/>
              </Row>
              <Row right>
                <Typography>Midpoint Check in</Typography>
                <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
              </Row>
              <Row right>
                <Typography>Completion Check In</Typography>
                <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
              </Row>
              <Row right>
                <Typography>Approve intern logbooks</Typography>
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
                Completion of Internship
              </Typography>
              <Row left>
                <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
                <Typography>Consider offer of employment</Typography>
              </Row>
              <Row left>
                <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
                <Typography>Intern Recommendation</Typography>
              </Row>
              <Row left>
                <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
                <Typography>Post another opportunity</Typography>
              </Row>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Col>
  )
}

export default TimelineHC
