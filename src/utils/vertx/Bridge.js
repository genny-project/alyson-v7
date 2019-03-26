/* eslint-disable new-cap */
import axios from 'axios';
import config from '../../config';
import { prefixedLog, isObject, isString } from '../../utils';
import { store } from '../../redux';
import Vertx from './Vertx';
import MessageHandler from './MessageHandler';
import * as events from './events';

class Bridge {
  constructor() {
    this.messageHandler = new MessageHandler();

    this.log = prefixedLog( 'Bridge' );
  }

  __getAccessToken() {
    const { accessToken } = store.getState().keycloak;

    return accessToken;
  }

  initVertx( url, token ) {
    this.log( 'Opening Vertx...' );

    Vertx.setIncomingMessageHandler(
      this.messageHandler.onMessage
    );

    Vertx.init( url, token );
  }

  sendAuthInit( token ) {
    this.log( 'Sending auth init...' );

    const origin = window.location ? window.location.origin : 'http://localhost:3000';

    axios.post( `${config.genny.host}/${config.genny.bridge.endpoints.events}/init?url=${origin}`, {
      method: 'POST',
      responseType: 'json',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    Vertx.sendMessage(
      events.AUTH_INIT( token )
    );
  }

  sendEvent({
    event,
    eventType,
    data,
    sendWithToken,
  }) {
    const token = this.__getAccessToken();
    const eventObject = sendWithToken
      ? events[event]( eventType, data, token )
      : events[event]( eventType, data );

    const foundCachedAction = this.checkStoreForCachedAction({
      event,
      eventType,
      data,
    });

    // eslint-disable-next-line no-console
    console.warn( 'foundCachedAction', foundCachedAction );

    if ( foundCachedAction ) {
      Vertx.handleIncomingMessage( foundCachedAction, true );
    }

    if ( !foundCachedAction.cache_only ) {
      // eslint-disable-next-line no-console
      console.warn( 'sending event', eventObject );

      Vertx.sendMessage( eventObject );
    }
  }

  sendFormattedEvent({
    code,
    parentCode,
    rootCode,
    eventType = 'BTN_CLICK',
    messageType = 'BTN',
  }) {
    if (
      isString( code ) &&
      isString( parentCode )
    ) {
      this.sendEvent({
        event: messageType,
        sendWithToken: true,
        eventType,
        data: {
          code,
          parentCode,
          rootCode,
        },
      });
    }
  }

  /* ----------------------------
    legacy compatibility events
  ------------------------------*/

  sendAnswer( answer ) {
    this.sendAnswers( [...answer] );
  }

  sendAnswers( answers ) {
    this.sendEvent({
      event: 'ANSWER',
      sendWithToken: true,
      data: answers,
    });
  }

  sendButtonEvent( eventType, data ) {
    this.sendEvent({
      event: 'BTN',
      sendWithToken: true,
      eventType,
      data,
    });
  }

  sendCode( eventType, data ) {
    this.sendEvent({
      event: 'SEND_CODE',
      sendWithToken: true,
      eventType,
      data,
    });
  }

  sendTreeViewEvent( eventType, data ) {
    this.sendEvent({
      event: 'TV_EVENT',
      sendWithToken: true,
      eventType,
      data,
    });
  }

  /* ------------------------ */

  checkStoreForCachedAction({
    event,
    data,
  }) {
    const { actionCache } = store.getState().vertx;

    if ( isObject( data, { withProperties: ['code', 'value'] })) {
      const actionId = `${data.code}:${data.value}`;

      if ( actionCache[actionId] ) {
        if ( isObject( actionCache[actionId] )) {
          return actionCache[actionId];
        }
        // eslint-disable-next-line no-console
        console.warn( 'send cached message', actionCache[actionId] );

        return false;
      }
      // eslint-disable-next-line no-console
      console.warn( 'no match found for actionId', actionId );

      return false;
    }
    // eslint-disable-next-line no-console
    console.warn( 'event has no code or value keys', event );

    return false;
  }
}

export default new Bridge();
