import React, { useState } from 'react'
import { map, addIndex } from 'ramda';
import getIcons from '../helpers/get-icons.js'
import Card from '../card'

import { Row, Col } from '../../../components/layouts'
import {
  Timeline,
} from '@material-ui/lab'
import { Paper, Typography, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const register = {
  header: 'Register',
  body: [
    { content: 'Register in Internmatch', status: true },
    { content: 'Complete Profile', status: true },
    { content: 'Record Introduction Video', status: true },
  ],
  icon: 'register'
}

const postInternships = {
  header: 'Post Internships',
  body: [
    { content: 'List internship opportunities', status: true },
    { content: 'Invite recommended interns to apply', status: true },
  ],
  icon: 'postInternships'
}

const select = {
  header: 'Select',
  body: [
    { content: 'Review applications', status: true },
    { content: 'Shortlist applicants', status: true },
    { content: 'Book Interviews', status: true },
  ],
  icon: 'select'
}

const internship = {
  header: 'Internship',
  body: [
    { content: 'Induction & Orientation', status: true },
    { content: 'Midpoint Check in', status: false },
    { content: 'Completion Check In', status: false },
    { content: 'Approve intern logbooks', status: false },
  ],
  icon: 'internship'
}

const completionOfInternship = {
  header: 'Completion of Internshi',
  body: [
    { content: 'Consider offer of employment', status: false },
    { content: 'Intern Recommendation', status: false },
    { content: 'Post another opportunity', status: false },
  ],
  icon: 'completionOfInternship'
}

const allData = [ register, postInternships, select, internship, completionOfInternship ]

const TimelineHC = () => {

  return (
    <Col stretch align="center">
      <Typography variant="h4">5 Steps for securing an Intern</Typography>
      <Timeline align="alternate">
       { addIndex(map)(({header, body, icon}, idx)=>
        <Card
          header={header}
          body={body}
          icon={getIcons(icon)}
          side={ idx%2 === 0 ? 'right' : 'left'}
          length={allData.length}
        />
       , allData)}
      </Timeline>
    </Col>
  )
}

export default TimelineHC
