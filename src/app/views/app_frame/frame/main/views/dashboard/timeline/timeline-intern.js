import React, { useState, useEffect } from 'react'
import { map, addIndex, path, prop } from 'ramda'
import { nanoid } from 'nanoid'

import getIcons from '../helpers/get-icons.js'
import Card from '../card'
import { Row, Col } from '../../../components/layouts'
import getStatus from '../helpers/get-status'
import getTimeline from '../helpers/get-timeline'

import { Timeline } from '@material-ui/lab'
import { Paper, Typography, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const register = {
  header: 'Register',
  body: [
    { content: 'Register in Internmatch', status: true },
    { content: 'Complete Profile', status: true },
    { content: 'Record Introduction Video', status: true },
  ],
  icon: 'register',
}

const search = {
  header: 'Search',
  body: [
    { content: 'Search from recommended Internship Opportunities', status: true, redirect: true },
    { content: 'Save Opportunities', status: true },
    { content: 'Complete Accreditation', status: true },
  ],
  icon: 'search',
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
  icon: 'apply',
}

const internships = {
  header: 'Internships',
  body: [
    { content: 'Induction', status: true },
    { content: 'Progress reporting', status: false },
    { content: 'Daily Logbook Completion', status: false },
  ],
  icon: 'internships',
}

const workReady = {
  header: 'Work Ready',
  body: [
    { content: 'Receive Certificate', status: false },
    { content: 'Update your LinkedIn Profile & Resume', status: false },
    { content: 'Ask for a recommendation', status: false },
  ],
  icon: 'workReady',
}

const allData = [register, search, apply, internships, workReady]

const TimelineIntern = ({ viewInternships, setViewing, asks, user }) => {

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
      >
        {`Start Internship Search`}
      </Button>
      <Timeline align="alternate">
        {addIndex(map)(
          ({ header, body, parentCode, code }, idx) => (
            <Card
              key={nanoid()}
              status={getStatus(body)}
              header={header}
              body={body}
              icon={getIcons(header)}
              side={idx % 2 === 0 ? 'right' : 'left'}
              isLast={idx === allData.length - 1}
              viewInternships={viewInternships}
              setViewing={setViewing}
              parentCode={parentCode}
              code={code}
            />
          ),
          getTimeline(asks,user)
        )}
      </Timeline>
    </Col>
  )
}

export default TimelineIntern
