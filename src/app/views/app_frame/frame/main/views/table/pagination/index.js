import React from 'react'

import { IconButton, Typography, Grid } from '@material-ui/core'
import NextIcon from '@material-ui/icons/NavigateNext'
import PreviousIcon from '@material-ui/icons/NavigateBefore'

import useStyles from '../styles'

const Pagination = ({
  pageStart,
  setLoadingPage,
  setViewing,
  pageSize,
  totalResults,
  isLoading,
}) => {
  const classes = useStyles()

  return (
    <Grid
      className={classes.footer}
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <IconButton
          disabled={isLoading || pageStart === 0}
          onClick={() => {
            window.scroll({ top: 0 })
            setLoadingPage(true)
            setViewing({
              code: 'QUE_TABLE_PREVIOUS_BTN',
              parentCode: 'QUE_TABLE_RESULTS_GRP',
            })
          }}
        >
          <PreviousIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography color="textSecondary">{`${
          pageStart === 0 ? '0' : pageStart || ''
        } - ${pageStart + pageSize || ''} of ${
          totalResults === -1 ? 1000 : totalResults || ''
        }`}</Typography>
      </Grid>
      <Grid item>
        <IconButton
          disabled={isLoading || totalResults === -1 ? false : pageStart + pageSize >= totalResults}
          onClick={() => {
            window.scroll({ top: 0 })
            setLoadingPage(true)
            setViewing({
              code: 'QUE_TABLE_NEXT_BTN',
              parentCode: 'QUE_TABLE_RESULTS_GRP',
            })
          }}
        >
          <NextIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Pagination
