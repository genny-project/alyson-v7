import React, { useState, useEffect } from 'react'

import { includes, prop, replace, has, pathOr, length, keys } from 'ramda'
import { connect } from 'react-redux'
import {ErrorBoundary} from 'react-error-boundary'
import { Bridge } from '../../../../../utils/vertx/index'

import { ThemeProvider, Typography } from '@material-ui/core'

import { getDrawerItems, getAppBarItems } from './helpers/get-components'
import getAgency from './helpers/get-agency'
import getAgencyCompany from './helpers/get-agency-company'

import Sidebar from './side_bar'
import AppBar from './app_bar'
import Main from './main'
import SidePanel from './side_panel'
import {Row, Col} from './components/layouts'

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
  const toggleSidePanel = () => setSidePanelOpen(sidePanelOpen => !sidePanelOpen)

  const dataForEvent = getDataForEvent(viewing, user)

  const theme = makeTheme({ attributes, asks })

  const ErrorFallback = ({error, componentStack, resetErrorBoundary}) => {
    return (
      <Col spacing={10}>
        <Row>
          <Typography variant="h4" color="secondary">{`Error Occurred.`}</Typography>
          <Typography variant="h4"> {`Please contact the development team`}</Typography>
        </Row>
        {/*<pre>{error.message}</pre>
        <pre>{componentStack}</pre>*/}
      </Col>
    )
  }

  useEffect(
    () => {
      if (viewing.code || viewing.parentCode || viewing.targetCode) {
        if (
          (!viewing.code === 'QUE_TABLE_NEXT_BTN' &&
            !viewing.code === 'QUE_TABLE_PREVIOUS_BTN' &&
            viewing.parentCode &&
            !has(viewing.targetCode, baseEntities)) ||
          viewing.code === 'QUE_TAB_BUCKET_VIEW'
        ) {
          setLoading(true)
        }

        if (viewing.view === 'FORM') {
          setStaleTarget(
            prop('targetCode', asks[replace('MENU', 'GRP', prop('code', viewing))] || {}),
          )
          setLoading(true)
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
      if (includes('MENU', prop('code', viewing) || '')) {
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
    [asks, currentSearch, baseEntities],
  )

  useEffect(
    () => {
      if (length(keys(viewing)) === 1 && viewing.view === 'BUCKET') {
        setLoading(false)
      }
    },
    [viewing],
  )

  return (
    <ThemeProvider theme={theme}>
      <div>
        <ErrorBoundary FallbackComponent={ErrorFallback} >
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
        <ErrorBoundary FallbackComponent={ErrorFallback} >
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
        <ErrorBoundary FallbackComponent={ErrorFallback} >
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
      <ErrorBoundary FallbackComponent={ErrorFallback} >
        <SidePanel
          sidePanelOpen={sidePanelOpen}
          toggleSidePanel={toggleSidePanel}
          baseEntities={baseEntities}
          attributes={attributes}
          setSidePanelOpen={setSidePanelOpen}
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
  baseEntities: state.vertx.baseEntities.data,
  attributes: state.vertx.baseEntities.attributes,
  asks: state.vertx.asks,
  frames: state.vertx.layouts.frames,
  user: state.vertx.user,
  vertx: state.vertx,
  keycloak: state.keycloak,
})

export default connect(mapStateToProps)(Sam)
