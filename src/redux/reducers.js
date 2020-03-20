import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import keycloak from '../views/components/keycloak/keycloak.reducer';
import vertx from '../views/components/vertx/vertx.reducer';
import navigation from '../views/routing/navigation.reducer';

import testDisplay from '../views/app/test-display/testDisplay.reducer';

const initialState = {
  session: '',
};

const rawSession = ( state = initialState, { type, payload }) => {
  switch ( type ) {
    case 'SESSION_TEST':
      return {
        ...state,
        session: payload,
      };

    default:
      return state;
  }
};

const gennyteerDisplay = ( state = '', action ) => {
  switch ( action.type ) {
    case 'DISPLAY_FROM_GENNYTEER':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  keycloak,
  vertx,
  router,
  navigation,
  testDisplay,
  rawSession,
  gennyteerDisplay,
});

export default reducers;
