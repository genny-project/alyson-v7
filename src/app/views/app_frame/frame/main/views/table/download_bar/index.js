import React from 'react'
import { length, includes } from 'ramda'
import { Button, CircularProgress } from '@material-ui/core'
import { Row } from '../../../components/layouts'
import DLIcon from '@material-ui/icons/GetApp'

const DownloadBar = ({ downloadLink, title }) => {
  const handleClick = () => window.open(downloadLink)

  return includes('Journal', title || '') ? (
    <Row justify="flex-end">
      <Button
        startIcon={length(downloadLink) ? <DLIcon /> : <CircularProgress size={15} />}
        disabled={!length(downloadLink)}
        onClick={handleClick}
      >{`DOWNLOAD`}</Button>
    </Row>
  ) : (
    <div />
  )
}

export default DownloadBar
