import React, { useState, useEffect } from 'react'
import { map, addIndex } from 'ramda'
import { nanoid } from 'nanoid'

import getIcons from '../helpers/get-icons.js'
import Card from '../card'
import { Row, Col } from '../../../components/layouts'
import getStatus from '../helpers/get-status'

import { Timeline } from '@material-ui/lab'
import { Paper, Typography, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const register = {
  header: 'Register',
  body: [
    { content: 'Register for Safe Traffic Town', status: true },
    { content: 'Complete Profile', status: true },
  ],
  icon: 'register',
}

const learn = {
  header: 'Learn',
  body: [
    { content: 'Learn Definitions', status: true },
    { content: 'Learn Warnings', status: true },
    { content: 'Complete Quiz', status: true },
  ],
  icon: 'learn',
}

const applyKnowledge = {
  header: 'Apply Knowledge',
  body: [
    { content: 'Scenario 1', status: true },
    { content: 'Scenario 2 - 4 ', status: true },
    { content: 'Scenario 5 - 7', status: true },
    { content: 'Scenario 8 - 10', status: true },
  ],
  icon: 'apply',
}

const feedback = {
  header: 'Feedback',
  body: [
    { content: 'See Progress', status: true },
    { content: 'Generate Results Report', status: false },
  ],
  icon: 'internships',
}

const workReady = {
  header: 'Work Ready',
  body: [
    { content: 'Receive Certificate', status: false },
    { content: 'Update your LinkedIn Profile & Resume', status: false },
  ],
  icon: 'workReady',
}

const allData = [register, learn, applyKnowledge, feedback, workReady]

const TimelineSTT = ({ }) => {
  return (
    <Col stretch align="center">
      <Row>
        <Typography variant="h4">5 Steps to becoming</Typography>
        <Typography variant="h4" color="secondary">{`Work Ready`}</Typography>
      </Row>
      <Timeline align="alternate">
        {addIndex(map)(
          ({ header, body, icon }, idx) => (
            <Card
              key={nanoid()}
              status={getStatus(body)}
              header={header}
              body={body}
              icon={getIcons(icon)}
              side={idx % 2 === 0 ? 'right' : 'left'}
              isLast={idx === allData.length - 1}
            />
          ),
          allData,
        )}
      </Timeline>
    </Col>
  )
}

export default TimelineSTT
