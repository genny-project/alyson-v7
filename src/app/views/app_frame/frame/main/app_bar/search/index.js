import React, { useState, useEffect } from 'react'

import { isEmpty, not, includes, tail, length } from 'ramda'
import { InputBase, Typography, IconButton, Menu, MenuItem } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/ExpandMore'
import ClearIcon from '@material-ui/icons/Clear'
import makeSearch from './helpers/make-search'
import useStyles from './styles'

const Search = ({ setLoading, question, setViewing, viewing }) => {
  const { askId, attributeCode, code, sourceCode, targetCode, weight } = question

  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [optionsMenu, setOptionsMenu] = useState(null)
  const [searchType, setSearchType] = useState('')

  const setGlobalSearch = () => setSearchType('')
  const setLocalSearch = () => setSearchType('!')

  const classes = useStyles({ focused })

  const search = makeSearch({
    setViewing,
    askId,
    attributeCode,
    sourceCode,
    targetCode,
    code,
    identifier: code,
    weight,
  })

  useEffect(
    () => {
      if (not(isEmpty(value))) {
        if (!includes('$', value)) {
          search(value)
          setLoading(`Searching for ${value} ${searchType ? 'here' : 'everywhere'}...`)
        }
      }
    },
    [value],
  )

  useEffect(
    () => {
      setOptionsMenu(null)
    },
    [searchType],
  )

  const handleDev = () => {
    if (includes('$', value)) {
      setViewing(JSON.parse(tail(value)))
    }
  }

  const handleClearSearch = () => {
    setValue('')
    setViewing({ ...viewing })
  }

  return (
    <div
      className={classes.search}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false)
        handleDev()
      }}
    >
      {includes('$', value) ? (
        <Typography variant="overline" color="error">{`DEV MODE`}</Typography>
      ) : (
        <div className={classes.searchIcon}>
          <SearchIcon color="inherit" />
        </div>
      )}
      <InputBase
        placeholder="Search..."
        onChange={event => setValue(event.target.value)}
        value={value}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton
        disabled={!length(value)}
        size="small"
        color="inherit"
        onClick={handleClearSearch}
      >
        <ClearIcon color="inherit" />
      </IconButton>
      <IconButton
        size="small"
        color="inherit"
        onClick={event => setOptionsMenu(event.currentTarget)}
      >
        <MoreIcon color="inherit" />
      </IconButton>
      <Menu open={!!optionsMenu} anchorEl={optionsMenu} onClose={() => setOptionsMenu(null)}>
        <MenuItem
          selected={!searchType}
          onClick={setGlobalSearch}
        >{`Search All Internmatch`}</MenuItem>
        <MenuItem selected={!!searchType} onClick={setLocalSearch}>{`Search Here`}</MenuItem>
      </Menu>
    </div>
  )
}

export default Search
