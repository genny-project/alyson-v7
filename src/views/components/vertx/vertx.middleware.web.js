import { push } from 'react-router-redux';
import * as actions from './vertx.actions';
import { showDialog } from '../../../redux/actions';
import { Bridge, removeStartingAndEndingSlashes } from '../../../utils';
import { alert } from '../../components';

const middleware = store => next => action => {
  /* Since we are not making any side effects to `action`, pass on next. */
  next( action );

  if ( action.type === 'AUTH_ATTEMPT_SUCCESS' ) {
    store.dispatch( actions.initVertx());
  } else if ( action.type === 'VERTX_INIT_ATTEMPT' ) {
    const { data } = store.getState().keycloak;
    const accessToken = localStorage.getItem( 'accessToken' );

    Bridge.initVertx( data.vertx_url, accessToken );
  } else if ( action.type === 'VERTX_INIT_SUCCESS' ) {
    const accessToken = localStorage.getItem( 'accessToken' );

    Bridge.sendAuthInit( accessToken );
  } else if ( action.type === 'ROUTE_CHANGE' ) {
    const { code, modal } = action.payload;

    if ( modal ) {
      store.dispatch(
        showDialog({
          layoutName: removeStartingAndEndingSlashes( code ),
        })
      );
    } else {
      store.dispatch( push( code ));
    }
  } else if ( action.type === 'NOTIFICATION_MESSAGE' ) {
    const { style, message } = action.payload;

    const title = style === 'warning' ? 'Warning!' : 'Notification';

    alert({ title, message, toast: true });
  }
};

export default middleware;
