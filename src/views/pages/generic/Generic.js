
import React, { Component } from 'react';
import { object } from 'prop-types';
// import queryString from 'query-string';
// import { location } from '../../../utils';
import { KeycloakConsumer, Redirect, Frame, Box, ActivityIndicator } from '../../components';
import Unity from '../../components/input/unity';

class Generic extends Component {
  static propTypes = {
    keycloak: object,
  }

  shouldComponentUpdate( nextProps ) {
    const wasAuthenticated = this.props.keycloak.isAuthenticated;
    const wasCheckingStorage = this.props.keycloak.isCheckingStorage;
    const wasFetchingToken = this.props.keycloak.isFetchingToken;
    const { isAuthenticated, isCheckingStorage, isFetchingToken } = nextProps.keycloak;

    if (
      wasAuthenticated !== isAuthenticated || (
        wasCheckingStorage !== isCheckingStorage ||
        wasFetchingToken !== isFetchingToken
      )
    )
      return true;

    return false;
  }

  render() {
    const { isAuthenticated, isCheckingStorage, isFetchingToken } = this.props.keycloak;
    // const currentUrl = location.getBasePath();

    /* If the layout is not public and the user is not logged in, get them to login
     * or register. Afterwards, we should send them to the redirect URI specified here,
     * which should be the route they were originally trying to access. */

    if ( !isAuthenticated && ( isCheckingStorage || isFetchingToken )) {
      return (
        <Box
          width="100%"
          height="100%"
          justifyContent="center"
        >
          <ActivityIndicator />
        </Box>
      );
    }

    if ( !isAuthenticated ) {
      return (
        <Redirect
          to="login"
          useMainNavigator
        />
      );
    }

    return (
      <Unity />
    );
  }
}

export { Generic };

export default (
  props => (
    <KeycloakConsumer>
      {keycloak => (
        <Generic
          {...props}
          keycloak={keycloak}
        />
      )}
    </KeycloakConsumer>
  )
);
