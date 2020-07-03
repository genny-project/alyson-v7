import React from 'react'
import { map } from 'ramda'
import { IconButton, Icon, Typography } from '@material-ui/core'
import { Col, Row } from '../../../components/layouts'
import { makeActionData, getIcon } from '../../table/helpers/get-table-data'

import useStyles from './styles'

const ListItem = ({
  PRI_NAME,
  PRI_ASSOC_HC,
  PRI_ADDRESS_FULL,
  targetCode,
  actions,
  setViewing,
  viewing,
  attributes,
  setLoading,
  googleApiKey,
  currentDataPoint,
  setCurrentDataPoint,
  idx,
  first,
  last,
}) => {
  const classes = useStyles({ selected: currentDataPoint === idx, first, last })

  return (
    <div className={classes.card} onClick={() => setCurrentDataPoint(idx)}>
      <Row spaceBetween wrap="noWrap">
        <Col left>
          <Typography variant="subtitle1" color="primary">
            {PRI_NAME}
          </Typography>
          <Typography variant="subtitle2">{PRI_ASSOC_HC}</Typography>
          <Typography>{PRI_ADDRESS_FULL}</Typography>
        </Col>
        <Row wrap="noWrap">
          {map(({ attributeCode, attributeName }) => (
            <IconButton onClick={() => setViewing(makeActionData({ attributeCode, targetCode }))}>
              <Icon>{getIcon(attributeName)}</Icon>
            </IconButton>
          ))(actions || [])}
        </Row>
      </Row>
    </div>
  )
}

export default ListItem
