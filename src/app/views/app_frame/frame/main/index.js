import React, { useState, useEffect } from 'react'

import { includes, prop, replace, pathOr, length, keys, not, equals } from 'ramda'
import { connect } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import { Bridge } from '../../../../../utils/vertx/index'

import { ThemeProvider } from '@material-ui/core'

import { getDrawerItems, getAppBarItems } from './helpers/get-components'
import getAgency from './helpers/get-agency'
import getAgencyCompany from './helpers/get-agency-company'
import getErrorFallback from './helpers/get-error'

import Sidebar from './side_bar'
import AppBar from './app_bar'
import Main from './main'
import SidePanel from './side_panel'

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
  downloadLink,
  currentAsk,
  currentNote,
}) => {
  const googleApiKey = getGoogleApiKey(keycloak)
  const agency = getAgency(user)
  const agencyCompany = getAgencyCompany(agency)(baseEntities)

  const [viewing, setViewing] = useState({ code: 'QUE_DASHBOARD_VIEW' })
  const [dialogContent, setDialogContent] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [staleTarget, setStaleTarget] = useState('')
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const toggleSidePanel = () => setSidePanelOpen(!sidePanelOpen)

  const theme = makeTheme({ attributes, asks })

  useEffect(
    () => {
      if (viewing.code || viewing.parentCode || viewing.targetCode) {
        if (viewing.view === 'FORM') {
          setStaleTarget(
            prop('targetCode', asks[replace('MENU', 'GRP', prop('code', viewing))] || {}),
          )
          setLoading(true)
        }

        if (includes('AGREEMENT', viewing.code) && !viewing.STOP) {
          setViewing({ ...viewing, STOP: true }) // help me Obi Wan
        }

        Bridge.sendEvent({
          event: 'BTN',
          data: getDataForEvent(viewing, user),
          eventType: 'BTN_CLICK',
          sendWithToken: true,
        })
      }
    },
    [viewing],
  )

  useEffect(
    () => {
      if (not(equals(prop('targetCode', currentAsk), staleTarget))) setLoading(false)
    },
    [asks, currentSearch, baseEntities],
  )

  return (
    <ThemeProvider theme={theme}>
      <div>
        <ErrorBoundary FallbackComponent={getErrorFallback}>
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
            viewing={viewing}
          />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={getErrorFallback}>
          <Sidebar
            items={getDrawerItems(frames, asks, user)}
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
            currentSearch={currentSearch}
          />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={getErrorFallback}>
          <Main
            downloadLink={downloadLink}
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
            drawerItems={getDrawerItems(frames, asks, user)}
            dashboard={dashboard}
            currentAsk={currentAsk}
          />
        </ErrorBoundary>
      </div>
      <ErrorBoundary FallbackComponent={getErrorFallback}>
        <SidePanel
          sidePanelOpen={sidePanelOpen}
          toggleSidePanel={toggleSidePanel}
          baseEntities={baseEntities}
          attributes={attributes}
          setSidePanelOpen={setSidePanelOpen}
          currentNote={currentNote}
        />
      </ErrorBoundary>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  dashboard: pathOr({}, ['vertx', 'bulkMessage', 'SAM', 'dashboard'], state),
  currentSearch: pathOr({}, ['vertx', 'bulkMessage', 'SAM', 'active'], state),
  downloadLink: pathOr({}, ['vertx', 'bulkMessage', 'SAM', 'downloadLink'], state),
  currentAsk: pathOr({}, ['vertx', 'bulkMessage', 'SAM', 'currentAsk'], state),
  currentNote: pathOr({}, ['vertx', 'bulkMessage', 'SAM', 'currentNote'], state),
  baseEntities: state.vertx.baseEntities.data,
  attributes: state.vertx.baseEntities.attributes,
  asks: state.vertx.asks,
  frames: state.vertx.layouts.frames,
  user: state.vertx.user,
  vertx: state.vertx,
  keycloak: state.keycloak,
})

export default connect(mapStateToProps)(Sam)
