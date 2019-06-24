export * from '../views/components/keycloak/keycloak.actions';
export * from '../views/components/vertx/vertx.actions';
export * from '../views/components/user/user.actions';
export * from '../utils/layouts-dev/layouts-dev.actions';
export * from '../views/components/dialog/dialog.actions';

export * from '../views/app/test-display/testDisplay.actions';

// Just for testing purposes
export const sessionTest = data => ({
  type: 'SESSION_TEST',
  payload: data,
});
