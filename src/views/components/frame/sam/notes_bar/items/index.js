import React from 'react'
import {  Typography, Container, TextareaAutosize } from '@material-ui/core'
import useStyles from './styles'

const SideBarItems = () => {
  const classes = useStyles();

  return (
    <Container className={classes.header}>
      <Typography
        variant="h6"
        color="primary"
      >
          Note
      </Typography>

      <TextareaAutosize
        aria-label="minimum height"
        rowsMin={3}
        placeholder="Please enter your notes here"
      />
    </Container>
  )
}

export default SideBarItems
