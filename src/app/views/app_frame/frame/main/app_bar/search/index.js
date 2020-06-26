import React, { useState, useEffect } from 'react'

import { isEmpty, not } from 'ramda'
import { InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import makeSearch from './helpers/make-search'
import useStyles from './styles'

const Search = ({ setLoading, question, setViewing }) => {
  const { askId, attributeCode, code, sourceCode, targetCode, weight } = question

  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  const classes = useStyles({ focused })

  const search = makeSearch({
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
        search(value)
        setLoading(`Searching for ${value} everywhere...`)
      }
    },
    [value],
  )

  return (
    <div
      className={classes.search}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className={classes.searchIcon}>
        <SearchIcon color="inherit" />
      </div>
      <InputBase
        placeholder="Search..."
        onChange={event => setValue(event.target.value)}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  )
}

export default Search
