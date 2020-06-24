import React from 'react'

import { Typography } from '@material-ui/core'
import { Row, Col } from '../../../components/layouts'

import RichTextEditor from '../../form/field/rich_text'

const DetailPanel = ({ PRI_JOURNAL_TASKS: tasks, PRI_JOURNAL_LEARNING_OUTCOMES: outcomes }) => {
  return (
    <Col>
      <Typography variant="overline">{`Tasks`}</Typography>
      <Typography>{tasks}</Typography>
      <Typography variant="overline">{`Outcomes`}</Typography>
      <Typography>{outcomes}</Typography>
    </Col>
  )
}

export default DetailPanel
