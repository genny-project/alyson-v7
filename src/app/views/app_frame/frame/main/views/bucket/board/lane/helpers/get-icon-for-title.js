import React from 'react'
import { prop } from 'ramda'
import {
  Star,
  Visibility,
  RateReview,
  EventAvailable,
  Place,
  Done,
  VerifiedUser,
} from '@material-ui/icons'

const mapIcons = {
  Available: <Star color="secondary" />,
  Applied: <Visibility color="secondary" />,
  Shortlisted: <RateReview color="secondary" />,
  Interview: <EventAvailable color="secondary" />,
  Offered: <Done color="secondary" />,
  Placed: <Place color="secondary" />,
  'In Progress': <VerifiedUser color="secondary" />,
  '': <div />,
}
const getIconForTitle = title => prop(title || '', mapIcons)

export default getIconForTitle
