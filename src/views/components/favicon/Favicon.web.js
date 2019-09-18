import React, { Component } from 'react';
// import { object } from 'prop-types';
import Favicon from 'react-favicon';
import { connect } from 'react-redux';
import dlv from 'dlv';
import store from '../../../redux/store';

class ProjectFavicon extends Component {
  static defaultProps = {
    // attributes: {},
  }

  static propTypes = {
    // attributes: object,
  }

  render() {
    // const projectAttributes = storeQuery.getProjectAttributes();
    const { keycloak } = store.getState();
    const projectFavicon = dlv( keycloak, 'data.PRI_FAVICON' );

    return (
      <Favicon
        url={projectFavicon}
      />
    );
  }
}

export { ProjectFavicon };

const mapStateToProps = state => ({
  attributes: state.vertx.baseEntities.attributes,
});

export default connect( mapStateToProps )( ProjectFavicon );
