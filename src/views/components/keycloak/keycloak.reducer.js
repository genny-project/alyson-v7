// import { combineReducers } from 'redux';
import { isObject, isString } from '../../../utils';
import * as keycloakUtils from '../../../utils/keycloak';
import { KEYCLOAK_CONFIG_FETCH_REQUEST, KEYCLOAK_CONFIG_FETCH_SUCCESS, KEYCLOAK_CONFIG_FETCH_FAILURE } from '../../../constants';

const configInitialState = {
  data: null,
  fetching: true,
  fetched: false,
  error: null,
  accessToken: null,
};

const decodeToken = ( token ) => {
  if ( !isString( token )) return null;

  const decodedIdToken = keycloakUtils.decodeToken( token );

  return isObject( decodedIdToken, { withPropery: 'sub' }) ? decodedIdToken.sub : null;
};

const compareAccessTokens = ( currentToken, newToken ) => {
  console.warn({ currentToken, newToken  });

  const currentTokenSub = decodeToken( currentToken );
  const newTokenSub = decodeToken( newToken );

  console.warn({ currentTokenSub, newTokenSub });

  // debugger; // eslint-disable-line
};

const configReducer = ( state = configInitialState, { type, payload }) => {
  switch ( type ) {
    case KEYCLOAK_CONFIG_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };

    case KEYCLOAK_CONFIG_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: payload,
      };

    case KEYCLOAK_CONFIG_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        error: payload,
      };

    case 'AUTH_ATTEMPT_SUCCESS':

      compareAccessTokens( state.accessToken, payload.accessToken );

      console.warn( 'ACCESS TOKEN UPDATE', payload.accessToken );

      return {
        ...state,
        accessToken: payload.accessToken,
      };

    case 'USER_LOGOUT':
      console.warn( 'ACCESS TOKEN UPDATE', null );

      return {
        ...state,
        accessToken: null,
      };

    default:
      return state;
  }
};

export default configReducer;

// TODO: use me when another sub-reducer is made
// export default combineReducers({
// configReducer,
// });
