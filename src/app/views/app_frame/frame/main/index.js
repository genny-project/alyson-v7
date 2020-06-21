import React, { useState, useEffect } from 'react'

import { contains, prop, replace, has, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { Bridge } from '../../../../../utils/vertx/index'

import { ThemeProvider } from '@material-ui/core'

import { getDrawerItems, getAppBarItems } from './helpers/get-components'
import getAgency from './helpers/get-agency'
import getAgencyCompany from './helpers/get-agency-company'

<<<<<<< HEAD:src/views/components/frame/sam/index.js
import Sidebar from './side_bar';
import SidePanel from './side_panel';
import AppBar from './app_bar';
import Main from './main';

import getDataForEvent from './helpers/get-data-for-event';
import getGoogleApiKey from './helpers/get-google-api-key';
import makeTheme from './helpers/make-theme';
import { SidePanelContext } from './contexts'
=======
import Sidebar from './side_bar'
import AppBar from './app_bar'
import Main from './main'

import getDataForEvent from './helpers/get-data-for-event'
import getGoogleApiKey from './helpers/get-google-api-key'
import makeTheme from './helpers/make-theme'
>>>>>>> v3.1.0:src/app/views/app_frame/frame/main/index.js

const Sam = ({
  projectName = '',
  baseEntities = {},
  frames = {},
  asks = {},
  themes = {},
  user = {},
  attributes = {},
  keycloak = {},
  currentSearch,
}) => {
<<<<<<< HEAD:src/views/components/frame/sam/index.js
  const googleApiKey = getGoogleApiKey( keycloak );
  const agency = getAgency( user );
  const agencyCompany = getAgencyCompany( agency )( baseEntities );
  const backendViewing = getBackendViewing( frames );
  const [viewing, setViewing] = useState({ code: 'QUE_DASHBOARD_VIEW' });
  const [sidebarOpen, setSidebarOpen] = useState( false );
  const [loading, setLoading] = useState( false );
  const [staleTarget, setStaleTarget] = useState( '' );
  const [sidePanelOpen, setSidePanelOpen] = useState( false );
  const toggleSidePanel = () => setSidePanelOpen(( sidePanelOpen ) => sidePanelOpen === false ? true : false )

  const dataForEvent = getDataForEvent( viewing, user );
=======
  const googleApiKey = getGoogleApiKey(keycloak)
  const agency = getAgency(user)
  const agencyCompany = getAgencyCompany(agency)(baseEntities)

  const [viewing, setViewing] = useState({ code: 'QUE_DASHBOARD' })
  const [dialogContent, setDialogContent] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [staleTarget, setStaleTarget] = useState('')

  const dataForEvent = getDataForEvent(viewing, user)
>>>>>>> v3.1.0:src/app/views/app_frame/frame/main/index.js

  const theme = makeTheme({ attributes, asks })

  const value = React.useMemo(() => ({
    sidePanelOpen,
    toggleSidePanel,
  }), [sidePanelOpen] )

  useEffect(
    () => {
<<<<<<< HEAD:src/views/components/frame/sam/index.js
      if ( viewing.code || viewing.parentCode || viewing.targetCode ) {
        // if (viewing.parentCode) setLoading(true);
=======
      if (viewing.code || viewing.parentCode || viewing.targetCode) {
        if (
          (viewing.parentCode && !has(viewing.targetCode, baseEntities)) ||
          viewing.code === 'QUE_TAB_BUCKET_VIEW'
        )
          setLoading(true)
>>>>>>> v3.1.0:src/app/views/app_frame/frame/main/index.js

        if ( contains( 'MENU', prop( 'code', viewing ) || '' )) {
          setStaleTarget(
<<<<<<< HEAD:src/views/components/frame/sam/index.js
            prop( 'targetCode', asks[replace( 'MENU', 'GRP', prop( 'code', viewing ))] || {})
          );
=======
            prop('targetCode', asks[replace('MENU', 'GRP', prop('code', viewing))] || {}),
          )
>>>>>>> v3.1.0:src/app/views/app_frame/frame/main/index.js
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
      if ( contains( 'MENU', prop( 'code', viewing ) || '' )) {
        if (
          prop( 'targetCode', asks[replace( 'MENU', 'GRP', prop( 'code', viewing ))] || {}) !==
          staleTarget
        ) {
<<<<<<< HEAD:src/views/components/frame/sam/index.js
          setLoading( false );
        }
      } else {
        setLoading( false );
=======
          setLoading(false)
        }
      } else {
        setLoading(false)
        setDialogContent(null)
>>>>>>> v3.1.0:src/app/views/app_frame/frame/main/index.js
      }
    },
    [asks, currentSearch],
  )

  return (
    <ThemeProvider theme={theme}>
<<<<<<< HEAD:src/views/components/frame/sam/index.js
      <SidePanelContext.Provider value={value}>
        <div>
          <AppBar
            items={getAppBarItems( frames, asks, themes )}
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
            items={getDrawerItems( frames, asks, themes )}
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
            links={links}
            googleApiKey={googleApiKey}
            attributes={attributes}
            projectName={projectName}
          />
        </div>
        <SidePanel />
      </SidePanelContext.Provider>
=======
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
        />
      </div>
>>>>>>> v3.1.0:src/app/views/app_frame/frame/main/index.js
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  currentSearch: pathOr({}, ['vertx', 'bulkMessage', 'SAM', 'active'], state),
  baseEntities: state.vertx.baseEntities.data,
  attributes: state.vertx.baseEntities.attributes,
  asks: state.vertx.asks,
  frames: state.vertx.layouts.frames,
  user: state.vertx.user,
  vertx: state.vertx,
  keycloak: state.keycloak,
})

<<<<<<< HEAD:src/views/components/frame/sam/index.js
export default connect( mapStateToProps )( Sam );
=======
export default connect(mapStateToProps)(Sam)
>>>>>>> v3.1.0:src/app/views/app_frame/frame/main/index.js
