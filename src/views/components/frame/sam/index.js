import React, { useState, useEffect } from 'react';
import { path } from 'ramda';
import { connect } from 'react-redux';
import Geocode from 'react-geocode';

import { Bridge } from '../../../../utils/vertx/index';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import {
  getDrawerItems,
  getAppBarItems,
  getLinksFrom,
  getComponents,
} from './helpers/get-components';
import Sidebar from './side_bar';
import AppBar from './app_bar';
import Main from './main';

const Sam = props => {
  const baseEntities = props.baseEntities || {};
  const links = props.links || {};
  const frames = props.frames || {};
  const asks = props.asks || {};
  const themes = props.themes || {};
  const user = props.user || {};
  const attributes = props.attributes || {};
  const googleApiKey = props.keycloak.data.ENV_GOOGLE_MAPS_APIKEY;

  const agency = path( ['attributes', 'LNK_AGENCY', 'value'], user );
  const agencyCompany = path( [agency, 'name'], baseEntities );

  const [viewing, setViewing] = useState({});

  const dataForEvent = { ...viewing, rootCode: viewing.parentCode, targetCode: 'PER_USER1' };

  Geocode.setApiKey( googleApiKey );
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: path( ['PRJ_INTERNMATCH', 'PRI_COLOR_PRIMARY', 'value'], attributes ),
      },
    },
  });

  useEffect(
    () => {
      if ( viewing.parentCode ) {
        Bridge.sendEvent({
          event: 'BTN',
          data: dataForEvent,
          eventType: 'BTN_CLICK',
          sendWithToken: true,
        });
      }
    },
    [viewing]
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar
          items={getAppBarItems( frames, asks, themes )}
          asks={asks}
          frames={frames}
          user={user}
          setViewing={setViewing}
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
        />
        <Main
          viewing={viewing}
          setViewing={setViewing}
          asks={asks}
          frames={frames}
          user={user}
          baseEntities={baseEntities}
          links={links}
          googleApiKey={googleApiKey}
          attributes={attributes}
        />
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = state => ({
  baseEntities: state.vertx.baseEntities.data,
  attributes: state.vertx.baseEntities.attributes,
  links: state.vertx.baseEntities.links,
  asks: state.vertx.asks,
  themes: state.vertx.layouts.themes,
  frames: state.vertx.layouts.frames,
  user: state.vertx.user,
  vertx: state.vertx,
  keycloak: state.keycloak,
});

export default connect( mapStateToProps )( Sam );
