import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import keycloak from '../views/components/keycloak/keycloak.reducer';
import vertx from '../views/components/vertx/vertx.reducer';
import navigation from '../views/routing/navigation.reducer';
import session from './session/session.reducer';

const appReducer = combineReducers({
  keycloak,
  vertx,
  router,
  navigation,
  session,
});

export default appReducer;
