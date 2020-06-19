import React from 'react'
import { map, compose, values, prop, replace, reject, includes, any } from 'ramda'
import {
  Typography,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton,
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import { makeStyles } from '@material-ui/core/styles'
import ChartistGraph from 'react-chartist'

const data = {
  labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
  series: [[1, 2, 4, 8, 6]],
}

const options = {
  high: 20,
  low: 0,
  axisX: {
    labelInterpolationFnc: function(value, index) {
      return index % 2 === 0 ? value : null
    },
  },
}

const Dashboard = ({ projectName, drawerItems, attributes }) => {
  const tiles = compose(
    reject(title => any(test => includes(test, title))(['LOGO', 'VIEW', 'DASHBOARD'])),
    map(replace('TREE_ITEM_', '')),
    map(prop('name')),
    values,
  )(drawerItems)

  return projectName === 'Safe Traffic Town' ? (
    <Typography>{`STT Dashboard`}</Typography>
  ) : (
    <GridList cellHeight={180}>
      {map(
        title => (
          <GridListTile>
            <ChartistGraph data={data} options={options} type={'Bar'} />
            <GridListTileBar
              title={title}
              actionIcon={
                <IconButton color="inherit" aria-label={`info about ${title}`}>
                  <InfoIcon color="inherit" />
                </IconButton>
              }
            />
          </GridListTile>
        ),
        tiles,
      )}
    </GridList>
  )
}

export default Dashboard
