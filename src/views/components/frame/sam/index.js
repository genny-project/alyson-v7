import React, { useState, useEffect } from 'react';
import { path } from 'ramda';
import { connect } from 'react-redux';

import { Bridge } from '../../../../utils/vertx/index';

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

  const agency = path( ['attributes', 'LNK_AGENCY', 'value'], user );
  const agencyCompany = path( [agency, 'name'], baseEntities );

  const [viewing, setViewing] = useState( ['QUE_DASHBOARD_VIEW'] );

  console.log( viewing );
  const data = { code: viewing[0] };

  useEffect(
    () => {
      Bridge.sendEvent({
        event: 'BTN',
        data,
        eventType: 'BTN_CLICK',
        sendWithToken: true,
      });
    },
    [viewing]
  );

  return (
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
      />
      <Main
        viewing={viewing}
        asks={asks}
        frames={frames}
        user={user}
        baseEntities={baseEntities}
        links={links}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  baseEntities: state.vertx.baseEntities.data,
  links: state.vertx.baseEntities.links,
  asks: state.vertx.asks,
  themes: state.vertx.layouts.themes,
  frames: state.vertx.layouts.frames,
  user: state.vertx.user,
  vertx: state.vertx,
});

export default connect( mapStateToProps )( Sam );
