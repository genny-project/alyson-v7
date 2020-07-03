import React from 'react'

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
            <Typography>Register in Internmatch</Typography>
            <Typography>Complete Profile</Typography>
            <Typography>Record Introduction Video</Typography>
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
            <Typography>Search from recommended Internship Opportunities</Typography>
            <Typography>Save Opportunities</Typography>
            <Typography>Complete Accreditation</Typography>
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
            <Typography>Applying for internships</Typography>
            <Typography>Recommended skill development</Typography>
            <Typography>Application sent to Host Company</Typography>
            <Typography>Attend Interviews</Typography>
            <Typography> Accept offer</Typography>
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
            <Typography>Induction</Typography>
            <Typography>Progress reporting</Typography>
            <Typography>Daily Logbook Completion</Typography>
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
            <Typography>Receive Certificate</Typography>
            <Typography>Update your LinkedIn Profile & Resume</Typography>
            <Typography>Ask for a recommendation</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )

}

export default Timelines
