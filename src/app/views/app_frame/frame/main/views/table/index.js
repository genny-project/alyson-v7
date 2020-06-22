import React, { useState, useEffect } from 'react'
import Table from 'material-table'
import { Icon, Grid, Tooltip, IconButton, Typography } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import NextIcon from '@material-ui/icons/NavigateNext'
import PreviousIcon from '@material-ui/icons/NavigateBefore'

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
  const [loadingPage, setLoadingPage] = useState(false)

  useEffect(
    () => {
      setLoadingPage(false)
    },
    [currentSearch],
  )

  const table = getTable(currentSearch)

  if (table) {
    const title = getTitle(table)
    const columns = getColumns(table)
    const data = getData(table)
    const actions = getActions(table)

    const {
      metaData: {
        PRI_TOTAL_RESULTS: { valueInteger: totalResults },
        SCH_PAGE_SIZE: { valueInteger: pageSize },
        SCH_PAGE_START: { valueInteger: pageStart },
      },
    } = table

    const classes = useStyles()

    return (
      <div>
        <Table
          title={title || ''}
          columns={columns}
          data={data}
          isLoading={loadingPage}
          options={{
            pageSize,
          }}
          onChangePage={props => console.log(props)}
          actions={map(({ attributeCode, attributeName, baseEntityCode }) => ({
            icon: getIcon(attributeName),
            tooltip: attributeName,
            onClick: ({ targetCode }) => () =>
              setViewing(makeActionData({ targetCode, attributeCode, baseEntityCode })),
          }))(actions)}
          components={{
            Pagination: props => (
              <Grid
                className={classes.footer}
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <IconButton
                    disabled={pageStart === 0}
                    onClick={() => {
                      window.scroll({ top: 0 })
                      setLoadingPage(true)
                      setViewing({
                        code: 'QUE_TABLE_PREVIOUS_BTN',
                        parentCode: 'QUE_TABLE_RESULTS_GRP',
                      })
                    }}
                  >
                    <PreviousIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary">{`${pageStart} - ${pageStart + pageSize} of ${
                    totalResults === -1 ? 1000 : totalResults
                  }`}</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={totalResults === -1 ? false : pageStart + pageSize >= totalResults}
                    onClick={() => {
                      window.scroll({ top: 0 })
                      setLoadingPage(true)
                      setViewing({
                        code: 'QUE_TABLE_NEXT_BTN',
                        parentCode: 'QUE_TABLE_RESULTS_GRP',
                      })
                    }}
                  >
                    <NextIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ),
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
