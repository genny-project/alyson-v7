import React, { useState, useEffect } from 'react'

import { contains, prop, replace, has, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { Bridge } from '../../../../../utils/vertx/index'

import { ThemeProvider } from '@material-ui/core'

import { getDrawerItems, getAppBarItems } from './helpers/get-components'
import getAgency from './helpers/get-agency'
import getAgencyCompany from './helpers/get-agency-company'

import Sidebar from './side_bar'
import AppBar from './app_bar'
import Main from './main'

import getDataForEvent from './helpers/get-data-for-event'
import getGoogleApiKey from './helpers/get-google-api-key'
import makeTheme from './helpers/make-theme'

const Sam = ({
  projectName = '',
  baseEntities = {},
  frames = {},
  asks = {},
  themes = {},
  user = {},
  attributes = {},
  keycloak = {},
  dashboard,
  currentSearch,
}) => {
  const googleApiKey = getGoogleApiKey(keycloak)
  const agency = getAgency(user)
  const agencyCompany = getAgencyCompany(agency)(baseEntities)

  const [viewing, setViewing] = useState({ code: 'QUE_DASHBOARD_VIEW' })
  const [dialogContent, setDialogContent] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [staleTarget, setStaleTarget] = useState('')

  const dataForEvent = getDataForEvent(viewing, user)

  const theme = makeTheme({ attributes, asks })

  useEffect(
    () => {
      if (viewing.code || viewing.parentCode || viewing.targetCode) {
        if (
          (viewing.parentCode && !has(viewing.targetCode, baseEntities)) ||
          viewing.code === 'QUE_TAB_BUCKET_VIEW'
        )
          setLoading(true)

        if (contains('MENU', prop('code', viewing) || '')) {
          setStaleTarget(
            prop('targetCode', asks[replace('MENU', 'GRP', prop('code', viewing))] || {}),
          )
        }

        Bridge.sendEvent({
          event: 'BTN',
          data: dataForEvent,
          eventType: 'BTN_CLICK',
          sendWithToken: true,
        })
      }
    },
    [viewing],
  )

  useEffect(
    () => {
      if (contains('MENU', prop('code', viewing) || '')) {
        if (
          prop('targetCode', asks[replace('MENU', 'GRP', prop('code', viewing))] || {}) !==
          staleTarget
        ) {
          setLoading(false)
        }
      } else {
        setLoading(false)
        setDialogContent(null)
      }
    },
    [asks, currentSearch],
  )

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar
          items={getAppBarItems(frames, asks, themes)}
          asks={asks}
          frames={frames}
          user={user}
          setViewing={setViewing}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          loading={loading}
          setLoading={setLoading}
        />
        <Sidebar
          items={getDrawerItems(frames, asks, themes)}
          asks={asks}
          frames={frames}
          user={user}
          agencyCompany={agencyCompany}
          setViewing={setViewing}
          viewing={viewing}
          attributes={attributes}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          projectName={projectName}
        />
        <Main
          loading={loading}
          setLoading={setLoading}
          viewing={viewing}
          setViewing={setViewing}
          asks={asks}
          frames={frames}
          user={user}
          baseEntities={baseEntities}
          googleApiKey={googleApiKey}
          attributes={attributes}
          projectName={projectName}
          currentSearch={currentSearch}
          dialogContent={dialogContent}
          setDialogContent={setDialogContent}
          drawerItems={getDrawerItems(frames, asks)}
          dashboard={dashboard}
        />
      </div>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  dashboard: pathOr({}, ['vertx', 'bulkMessage', 'SAM', 'dashboard'], state),
  currentSearch: pathOr({}, ['vertx', 'bulkMessage', 'SAM', 'active'], state),
  baseEntities: state.vertx.baseEntities.data,
  attributes: state.vertx.baseEntities.attributes,
  asks: state.vertx.asks,
  frames: state.vertx.layouts.frames,
  user: state.vertx.user,
  vertx: state.vertx,
  keycloak: state.keycloak,
})

export default connect(mapStateToProps)(Sam)
