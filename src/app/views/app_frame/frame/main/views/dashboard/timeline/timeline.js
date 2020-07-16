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

const TimelineGeneric = ({ viewInternships, setViewing, asks, user }) => {

  return (
    <Col stretch align="center">

    {path(['data', 'name'], user) ? (
      <Typography variant="h6">{`Hello, ${path(
          ['data', 'name'],
          user,
        )} from ${path(['attributes', 'PRI_ASSOC_EP', 'value'], user)}!`}</Typography>
      ) : (
        <div />
      )}
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
              isLast={idx === getTimeline(asks,user).length - 1}
              viewInternships={viewInternships}
              setViewing={setViewing}
              parentCode={parentCode}
            />
          ),
          getTimeline(asks,user)
        )}
      </Timeline>
    </Col>
  )
}

export default TimelineGeneric
