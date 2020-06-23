import React, { useState, useEffect } from 'react'
import { map, head } from 'ramda'

import Table from 'material-table'
import Actions from './actions'
import Pagination from './pagination'

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
  const [loadingPage, setLoadingPage] = useState(true)

  const table = getTable(currentSearch)

  const title = getTitle(table)
  const columns = getColumns(table)
  const data = getData(table)
  const actions = getActions(table)

  console.log(table)

  const {
    metaData: {
      PRI_TOTAL_RESULTS: { valueInteger: totalResults },
      SCH_PAGE_SIZE: { valueInteger: pageSize },
      SCH_PAGE_START: { valueInteger: pageStart },
    },
  } = table

  useEffect(
    () => {
      console.log(title)
      if (title !== 'Loading...') setLoadingPage(false)
    },
    [currentSearch, data],
  )

  const classes = useStyles()

  return (
    <div>
      <Table
        key={JSON.stringify(head(data)) + 'table'}
        title={title || ''}
        columns={columns}
        data={[...data]}
        isLoading={loadingPage}
        options={{
          pageSize,
          maxBodyHeight: 550,
        }}
        actions={map(({ attributeCode, attributeName, baseEntityCode }) => ({
          icon: getIcon(attributeName),
          tooltip: attributeName,
          onClick: ({ targetCode }) =>
            setViewing(makeActionData({ targetCode, attributeCode, baseEntityCode })),
        }))(actions)}
        components={{
          Pagination: props => (
            <Pagination
              setViewing={setViewing}
              pageStart={pageStart}
              pageSize={pageSize}
              totalResults={totalResults}
              setLoadingPage={setLoadingPage}
              isLoading={loadingPage}
            />
          ),
          Container: props => <div>{props.children}</div>,
          Actions: ({ actions, data }) => <Actions actions={actions} data={data} />,
        }}
      />
    </div>
  )
}

export default TableView
