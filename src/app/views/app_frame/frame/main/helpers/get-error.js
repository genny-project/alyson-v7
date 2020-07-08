import React from 'react'

import { Typography } from '@material-ui/core'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'

import {Row, Col} from '../components/layouts'

const getErrorFallback = ({error, componentStack, resetErrorBoundary}) => {
  return (
    <Col spacing={10}>
      <Row>
        <Typography variant="h6"> {`Ooops! Something went wrong. Please refresh your browser and try again.`} </Typography>
        <SentimentVeryDissatisfiedIcon />
      </Row>
    </Col>
  )
}

export default getErrorFallback
