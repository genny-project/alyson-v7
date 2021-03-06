import { format } from 'date-fns'
import { push } from 'react-router-redux'
import * as actions from './vertx.actions'
import setInitSocketURL from './helpers/setInitSocketURL'
import { showDialog } from '../../redux/actions'
import { Bridge, removeStartingAndEndingSlashes, Storage } from '../../utils'

const persistActions = ['BASE_ENTITY_MESSAGE', 'ATTRIBUTE_DATA', 'ASK_DATA', 'CACHE_ACTIONS']

const setPersistTimestamp = () => {
  Storage.set('persist:timestamp', format(new Date(), 'x'))
}

const middleware = store => next => action => {
  /* Since we are not making any side effects to `action`, pass on next. */
  next(action)

  if (persistActions.includes(action.type)) {
    setPersistTimestamp()
  }

  if (action.type === 'AUTH_ATTEMPT_SUCCESS') {
    store.dispatch(actions.initVertx())
  } else if (action.type === 'VERTX_INIT_ATTEMPT') {
    const { data, accessToken } = store.getState().keycloak

    Bridge.initVertx(setInitSocketURL(data), accessToken)
  } else if (action.type === 'VERTX_INIT_SUCCESS') {
    const { accessToken } = store.getState().keycloak

    Bridge.sendAuthInit(accessToken)
  } else if (action.type === 'ROUTE_CHANGE') {
    const { code, modal } = action.payload

    if (modal) {
      store.dispatch(
        showDialog({
          layoutName: removeStartingAndEndingSlashes(code),
        }),
      )
    } else {
      store.dispatch(push(code))
    }
  } else if (action.type === 'NOTIFICATION_MESSAGE') {
    const { style, message } = action.payload

    console.log(message)
  }
}

export default middleware
