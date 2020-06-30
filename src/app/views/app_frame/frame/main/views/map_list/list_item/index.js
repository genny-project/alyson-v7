import React from 'react'
import { map } from 'ramda'
import { Card, CardHeader, CardActions, IconButton, Icon } from '@material-ui/core'
import { makeActionData, getIcon } from '../../table/helpers/get-table-data'

const ListItem = ({ PRI_NAME, PRI_ASSOC_HC, targetCode, actions, setViewing }) => {
  return (
    <Card>
      <CardHeader title={PRI_ASSOC_HC} subheader={PRI_NAME} />
      <CardActions>
        {map(({ attributeCode, attributeName }) => (
          <IconButton onClick={() => setViewing(makeActionData({ attributeCode, targetCode }))}>
            <Icon>{getIcon(attributeName)}</Icon>
          </IconButton>
        ))(actions || [])}
      </CardActions>
    </Card>
  )
}

export default ListItem
