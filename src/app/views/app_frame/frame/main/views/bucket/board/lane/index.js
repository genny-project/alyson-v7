import React, { useState } from 'react'
import { map, mapObjIndexed, values, length } from 'ramda'

import { Row, Col } from '../../../../components/layouts'
import { Grid } from '@material-ui/core'
import ColumnHeader from '../column_header'
import Item from '../item'

import useStyles from './styles'
import getLaneActions from './helpers/get-lane-actions'
import getIconForTitle from './helpers/get-icon-for-title'

const Lane = ({
  metaData: {
    SCH_TITLE: { value: title },
  },
  metaData,
  id,
  items,
  setViewing,
  refreshBuckets,
  current,
  setCurrent,
}) => {
  const [expand, setExpand] = useState(true)
  const classes = useStyles({ expand: expand && length(items) > 0 })
  return (
    <Grid item key={'lane' + id}>
      <Col className={classes.lane} wrap="nowrap" top>
        <ColumnHeader
          icon={getIconForTitle(title || '')}
          title={title}
          key={'colHeader' + id}
          itemsCount={length(items || [])}
        />
        {map(item =>
          values(
            mapObjIndexed((val, key) => (
              <Item
                expandedColumn={expand && length(items) > 0}
                item={val}
                targetCode={key}
                setViewing={setViewing}
                column={title}
                key={'gridItemItem' + key}
                refreshBuckets={refreshBuckets}
                current={current}
                setCurrent={setCurrent}
                actions={getLaneActions(metaData)}
              />
            ))(item),
          ),
        )(items)}
      </Col>
    </Grid>
  )
}

export default Lane
