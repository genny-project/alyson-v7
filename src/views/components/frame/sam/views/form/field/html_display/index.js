import React from 'react'

import { Typography } from '@material-ui/core'

const HtmlDisplay = ({ fieldData, label }) => {
  const { value } = fieldData
  console.log(fieldData)
  return !!value ? (
    <div>
      <Typography>{label}</Typography>
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  ) : (
    <Typography>{`No agreement generated`}</Typography>
  )
}

export default HtmlDisplay
