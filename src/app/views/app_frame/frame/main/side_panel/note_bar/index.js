import React, { useState } from 'react'
import { IconButton, Typography, Divider, LinearProgress, Menu, MenuItem } from '@material-ui/core'
import { Col, Row } from '../../components/layouts'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/MoreVert'

import Notes from './notes'

import useStyles from './styles'

const NoteBar = ({ setShowNotes, baseEntities, attributes, currentNote }) => {
  const [apiLoading, setApiLoading] = useState(false)
  const [filterByTag, setFilterByTag] = useState(null)
  const [optionsMenu, setOptionsMenu] = useState(null)
  const [userTags, setUserTags] = useState( [] )

  const classes = useStyles()

  console.error({userTags})

  return (
    <Col top stretch>
      {apiLoading ? <LinearProgress /> : <div className={classes.loadingBarSpot} />}
      <Row justify="space-between" className={classes.topBar}>
        <Typography variant="h6" color="primary" className={classes.title}>
          Note
        </Typography>
        <Row>
          <IconButton color="primary" onClick={event => setOptionsMenu(event.currentTarget)}>
            <MoreIcon />
          </IconButton>
          <IconButton color="primary">
            <SearchIcon color="inherit" />
          </IconButton>
          <IconButton className={classes.icon} color="primary" onClick={() => setShowNotes(false)}>
            <ClearIcon color="inherit" />
          </IconButton>
        </Row>
      </Row>
      <Divider />
      <Notes
        currentNote={currentNote}
        baseEntities={baseEntities}
        attributes={attributes}
        setApiLoading={setApiLoading}
        userTags={userTags}
        setUserTags={setUserTags}
      />
      <Menu open={!!optionsMenu} anchorEl={optionsMenu} onClose={() => setOptionsMenu(null)}>
        {userTags.map(({label}) => (
          <MenuItem key={label}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Col>
  )
}

export default NoteBar
