import React, { useState } from 'react'
import Table from 'material-table'
import { Icon, Grid, Tooltip } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

import { map, length } from 'ramda'
import {
  getColumns,
  getData,
  getTitle,
  getTable,
  getActions,
  getIcon,
  makeActionData,
} from './helpers/get-table-data'

import useStyles from './styles'

const TableView = ({ currentSearch, setViewing }) => {
  const table = getTable(currentSearch)

  if (table) {
    const title = getTitle(table)
    const columns = getColumns(table)
    const data = getData(table)
    const actions = getActions(table)

    const classes = useStyles()

    return (
      <div>
        <Table
          title={title || ''}
          columns={columns}
          data={data}
          actions={map(({ attributeCode, attributeName, baseEntityCode }) => ({
            icon: getIcon(attributeName),
            tooltip: attributeName,
            onClick: ({ targetCode }) => () =>
              setViewing(makeActionData({ targetCode, attributeCode, baseEntityCode })),
          }))(actions)}
          components={{
            Container: props => <div>{props.children}</div>,
            Actions: ({ actions, data }) => {
              const [show, setShow] = useState(false)

              const { targetCode } = data || {}

              if (length(actions)) {
                return length(actions) === 1 ? (
                  map(({ icon, onClick, tooltip }) => (
                    <Tooltip title={tooltip} key={'tooltipActions' + icon}>
                      <Icon
                        color="action"
                        key={'iconActions' + icon}
                        className={classes.button}
                        onClick={onClick({ targetCode })}
                      >
                        {icon}
                      </Icon>
                    </Tooltip>
                  ))(actions)
                ) : (
                  <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={1}
                    >
                      {show ? (
                        map(
                          ({ icon, onClick, tooltip }) => (
                            <Grid item key={'gridActions' + icon}>
                              <Tooltip title={tooltip} key={'tooltipActions' + icon}>
                                <Icon
                                  color="action"
                                  key={'iconActions' + icon}
                                  className={classes.button}
                                  onClick={onClick({ targetCode })}
                                >
                                  {icon}
                                </Icon>
                              </Tooltip>
                            </Grid>
                          ),
                          actions || [],
                        )
                      ) : (
                        <Grid item>
                          <InfoIcon color="action" className={classes.moreIcon} />
                        </Grid>
                      )}
                    </Grid>
                  </div>
                )
              } else {
                return <div />
              }
            },
          }}
        />
      </div>
    )
  }

  return <div />
}

export default TableView
