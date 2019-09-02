import React, { Component } from 'react';
import { object } from 'prop-types';
import { ActivityIndicator } from 'react-native';
import dlv from 'dlv';
import { KeycloakConsumer, Redirect, Box, Text } from '../../components';
import { storeQuery, setTitle } from '../../../utils';

class Loading extends Component {
  static propTypes = {
    keycloak: object,
  }

  render() {
    const {
      isAuthenticated,
      isAuthenticating,
      isCheckingStorage,
      isCheckingCallback,
    } = this.props.keycloak;

    // const projectAttributes = storeQuery.getProjectAttributes();
    // const projectName = dlv( projectAttributes, 'PRI_TITLE' );

    const projectAttributes = storeQuery.getProjectAttributes();
    const projectName = dlv( projectAttributes, 'PRI_NAME.value' );

    setTitle( projectName );

    if ( isAuthenticated ) {
      return (
        <Redirect
          to="app"
          useAppNavigator={false}
        />
      );
    }

    if (
      isAuthenticating ||
      isCheckingStorage ||
      isCheckingCallback
    ) {
      return (
        <Box
          justifyContent="center"
          alignItems="center"
          flex={1}
          flexDirection="column"
          testID="page-loading"
        >
          <ActivityIndicator />
          <Text>
            Loading...
          </Text>
        </Box>
      );
    }

    return (
      <Redirect
        to="auth"
        useAppNavigator={false}
      />
    );
  }
}

export default props => (
  <KeycloakConsumer>
    {keycloak => (
      <Loading
        {...props}
        keycloak={keycloak}
      />
    )}
  </KeycloakConsumer>
);
