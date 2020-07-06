import React from 'react'
import { prop } from 'ramda'
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined'
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined'
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined'
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'

const mapIcons = {
  register: <HowToRegOutlinedIcon />,
  search: <SearchOutlinedIcon />,
  apply: <TouchAppOutlinedIcon />,
  internships: <WorkOutlineOutlinedIcon />,
  workReady: <AssignmentTurnedInOutlinedIcon />,
}

const getIcons = title => prop(title || '', mapIcons)

export default getIcons
