import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import keycloak from '../views/components/keycloak/keycloak.reducer';
import vertx from '../views/components/vertx/vertx.reducer';
import navigation from '../views/routing/navigation.reducer';
import dialog from '../views/components/dialog/dialog.reducer';

import testDisplay from '../views/app/test-display/testDisplay.reducer';

const initialState = {
  session: '',
};

const testReducer = ( state = initialState, { type, payload }) => {
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

const reducers = combineReducers({
  keycloak,
  vertx,
  router,
  navigation,
  dialog,
  testDisplay,
  testReducer,
});

export default reducers;
