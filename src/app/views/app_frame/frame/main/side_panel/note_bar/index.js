import React, { useContext, useState } from 'react'
import { Drawer, IconButton, Typography, Divider, LinearProgress } from '@material-ui/core'
import { Col, Row } from '../../components/layouts'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'

import { NoteBarContext } from '../../contexts'

import Notes from './notes'

import useStyles from './styles'

const NoteBar = ({ setShowNotes, baseEntities, attributes }) => {
  const [apiLoading, setApiLoading] = useState(false)

  const classes = useStyles()

  return (
    <Col top stretch>
      {apiLoading ? <LinearProgress /> : <div className={classes.loadingBarSpot} />}
      <Row justify="space-between" className={classes.topBar}>
        <Typography variant="h6" color="primary" className={classes.title}>
          Note
        </Typography>
        <Row>
          <IconButton color="primary">
            <SearchIcon color="inherit" />
          </IconButton>
          <IconButton className={classes.icon} color="primary" onClick={() => setShowNotes(false)}>
            <ClearIcon color="inherit" />
          </IconButton>
        </Row>
      </Row>
      <Divider />
      <Notes baseEntities={baseEntities} attributes={attributes} setApiLoading={setApiLoading} />
    </Col>
  )
}

export default NoteBar
