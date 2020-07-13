import React from 'react'

import { prop } from 'ramda'
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined'
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined'
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined'
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined'
import MenuBookIcon from '@material-ui/icons/MenuBook'

const mapIcons = {
  register: <HowToRegOutlinedIcon />,
  search: <SearchOutlinedIcon />,
  apply: <TouchAppOutlinedIcon />,
  internships: <WorkOutlineOutlinedIcon />,
  workReady: <AssignmentTurnedInOutlinedIcon />,
  postInternships: <ListAltOutlinedIcon />,
  select: <TouchAppOutlinedIcon />,
  internship: <WorkOutlineOutlinedIcon />,
  completionOfInternship: <AssignmentTurnedInOutlinedIcon />,
  learn: <MenuBookIcon />
}

const getIcons = icons => prop(icons || '', mapIcons)

export default getIcons
