import React, { useState, useEffect } from 'react'

import { isEmpty, not, includes, tail } from 'ramda'
import { InputBase, Typography } from '@material-ui/core'
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
        if (!includes('$')) {
          search(value)
          setLoading(`Searching for ${value} everywhere...`)
        }
      }
    },
    [value],
  )

  const handleDev = () => {
    if (includes('$')) {
      setViewing(JSON.parse(tail(value)))
    }
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
