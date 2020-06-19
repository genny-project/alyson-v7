import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import keycloak from '../app/keycloak/keycloak.reducer'
import vertx from '../app/vertx/vertx.reducer'
import session from './session/session.reducer'

const appReducer = combineReducers({
  keycloak,
  vertx,
  router,
  session,
})

export default appReducer
