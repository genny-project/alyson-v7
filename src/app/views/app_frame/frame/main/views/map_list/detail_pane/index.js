import React, { useEffect } from 'react'

import { Button, Paper } from '@material-ui/core'
import Details from '../../details'

import useStyles from './styles'

const DetailPane = ({ ...rest, dataPoints, currentDataPoint, setViewing }) => {

  const {targetCode} = dataPoints[currentDataPoint] || {}

  useEffect(() => {
    if(targetCode) {
      setViewing({
        code: `QUE_PRI_EVENT_VIEW_${targetCode}`,
        parentCode: `QUE_${targetCode}_GRP`,
        rootCode: `QUE_TABLE_RESULTS_GRP`,
        targetCode,
        view: 'MAP_LIST'
      })
    }
  }, [currentDataPoint])

  const handleFullDetails = () => setViewing({
    code: `QUE_PRI_EVENT_VIEW_${targetCode}`,
    parentCode: `QUE_${targetCode}_GRP`,
    rootCode: `QUE_TABLE_RESULTS_GRP`,
    targetCode,
  })

  const classes= useStyles()
  return (
    <Paper className={classes.detailPaneContainer}>
      <Button onClick={ handleFullDetails } >{`Go to full details`}</Button>
      <Details {...rest} targetCode={ targetCode } setViewing={setViewing} noMap mini/>
    </Paper>
  )
}

export default DetailPane
