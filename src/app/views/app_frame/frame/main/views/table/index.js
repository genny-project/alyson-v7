import React, { useState, useEffect } from 'react'
import { map, head, includes } from 'ramda'

import { Button } from '@material-ui/core'
import Table, { MTableToolbar } from 'material-table'
import Actions from './actions'
import Pagination from './pagination'
import DetailPanel from './detail_panel'
import DownloadBar from './download_bar'

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

const TableView = ({ currentSearch, setViewing, viewing, downloadLink }) => {
  const [loadingPage, setLoadingPage] = useState(true)

  const table = getTable(currentSearch)

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

  useEffect(
    () => {
      title && title !== 'Loading...' ? setLoadingPage(false) : setLoadingPage(true)
    },
    [title, viewing],
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
        detailPanel={
          includes('Journal', title || '') ? rowData => <DetailPanel {...rowData} /> : null
        }
        options={{
          pageSize,
          maxBodyHeight: 500,
          search: false,
        }}
        actions={[
          ...map(({ attributeCode, attributeName, baseEntityCode }) => ({
            icon: getIcon(attributeName),
            tooltip: attributeName,
            onClick: ({ targetCode }) =>
              setViewing(makeActionData({ targetCode, attributeCode, baseEntityCode })),
          }))(actions),
        ]}
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
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
              <DownloadBar downloadLink={downloadLink} title={title} />
              <Button onClick={() => setViewing(viewing => ({ ...viewing, view: 'MAP_LIST' }))}>
                {'MAP VIEW'}
              </Button>
            </div>
          ),
        }}
        onRowClick={
          includes('Journal', title || '') ? (event, rowData, togglePanel) => togglePanel() : null
        }
      />
    </div>
  )
}

export default TableView
