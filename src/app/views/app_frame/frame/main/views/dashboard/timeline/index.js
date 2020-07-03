import React from 'react'

import {Row, Component} from '../../../components/layouts'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

import useStyles from './styles'

const Timelines = () => {

  const classes = useStyles()

  return (
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
            <Row justify="flex-start">
              <CheckBoxOutlinedIcon className={classes.greenCheck} />
              <Typography>Register in Internmatch</Typography>
            </Row>
            <Row justify="flex-start">
              <CheckBoxOutlinedIcon className={classes.greenCheck} />
              <Typography>Complete Profile</Typography>
            </Row>
            <Row justify="flex-start">
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
            <Row justify="flex-end">
              <Typography>Search from recommended Internship Opportunities</Typography>
              <CheckBoxOutlinedIcon className={classes.greenCheck} />
            </Row>
            <Row justify="flex-end">
              <Typography>Save Opportunities</Typography>
              <CheckBoxOutlinedIcon className={classes.greenCheck} />
            </Row>
            <Row justify="flex-end">
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
            <Row justify="flex-start">
              <CheckBoxOutlinedIcon className={classes.greenCheck} />
              <Typography>Applying for internships</Typography>
            </Row>
            <Row justify="flex-start">
              <CheckBoxOutlinedIcon className={classes.greenCheck} />
              <Typography>Recommstarted skill development</Typography>
            </Row>
            <Row justify="flex-start">
              <CheckBoxOutlinedIcon className={classes.greenCheck} />
              <Typography>Application sent to Host Company</Typography>
            </Row>
            <Row justify="flex-start">
              <CheckBoxOutlinedIcon className={classes.greenCheck} />
              <Typography>Attstart Interviews</Typography>
            </Row>
            <Row justify="flex-start">
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
            <Row justify="flex-end">
              <Typography>Induction</Typography>
              <CheckBoxOutlinedIcon className={classes.greenCheck}/>
            </Row>
            <Row justify="flex-end">
              <Typography>Progress reporting</Typography>
              <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
            </Row>
            <Row justify="flex-end">
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
            <Row justify="flex-start">
              <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
              <Typography>Receive Certificate</Typography>
            </Row>
            <Row justify="flex-start">
              <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
              <Typography>Update your LinkedIn Profile & Resume</Typography>
            </Row>
            <Row justify="flex-start">
              <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck} />
              <Typography>Ask for a recommendation</Typography>
            </Row>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )

}

export default Timelines
