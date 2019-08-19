import React, { Component } from 'react';
// import { object } from 'prop-types';
import Favicon from 'react-favicon';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { storeQuery  } from '../../../utils';

class ProjectFavicon extends Component {
  static defaultProps = {
    // attributes: {},
  }

  static propTypes = {
    // attributes: object,
  }

  render() {
    const projectAttributes = storeQuery.getProjectAttributes();
    const projectFavicon = dlv( projectAttributes, 'PRI_FAVICON.value' );

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
