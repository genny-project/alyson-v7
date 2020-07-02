import React from 'react'

import NextIcon from '@material-ui/icons/NavigateNext'
import CloseIcon from '@material-ui/icons/NavigateBefore'

import useStyles from './styles'

const PanelControl = ({ sidePanelOpen, toggleSidePanel }) => {
  const classes = useStyles({ sidePanelOpen })
  return (
    <div onClick={toggleSidePanel} className={classes.toggleContainer}>
      <CloseIcon color="inherit" className={classes.icon} />
    </div>
  )
}

export default PanelControl
