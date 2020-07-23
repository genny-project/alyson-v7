import React, { useState, useEffect } from 'react'
import { map, filter, path } from 'ramda'

import { IconButton, Typography, Divider, LinearProgress, Menu, MenuItem } from '@material-ui/core'
import { Col, Row } from '../../components/layouts'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/MoreVert'

import Notes from './notes'
import useStyles from './styles'

const NoteBar = ({ setShowNotes, baseEntities, attributes, currentNote }) => {
  const [apiLoading, setApiLoading] = useState(false)
  const [optionsMenu, setOptionsMenu] = useState(null)
  const [userTags, setUserTags] = useState( [] )
  const [notes, setNotes] = useState( [] )
  const [filteredNotes, setFilteredNotes] = useState([])

  useEffect(() => {
    setFilteredNotes([...notes])
  }, [notes])

  const classes = useStyles()

  console.error('notes', {notes: notes, filteredNotes})

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
        notes={notes}
        setNotes={setNotes}
        filteredNotes={filteredNotes}
      />
      <Menu open={!!optionsMenu} anchorEl={optionsMenu} onClose={() => setOptionsMenu(null)}>
        <MenuItem key={`All`} onClick={() => setFilteredNotes(
          map( note => note)(notes)
        )}>
          {`All`}
        </MenuItem>
        {userTags.map(({label, abbreviation}) => (
          <MenuItem key={label} onClick={() => setFilteredNotes(
            filter((note) => path(['tags', 0, 'name'], note) === abbreviation, map( note => note)(notes))
          )}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Col>
  )
}

export default NoteBar
