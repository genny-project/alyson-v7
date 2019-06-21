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

  async __getAccessToken() {
    const accessToken = await Storage.get( 'accessToken' );

    return accessToken;
  }

  initVertx( url, token ) {
    this.log( 'Opening Vertx...' );

    Vertx.setIncomingMessageHandler( this.messageHandler.onMessage );

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

    Vertx.sendMessage( events.AUTH_INIT( token ));
  }

  sendEvent({ event, eventType, data, sendWithToken }) {
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
    targetCode,
    eventType = 'BTN_CLICK',
    messageType = 'BTN',
    value,
  }) {
    if ( isString( code, { ofMinLength: 1 }) && isString( parentCode, { ofMinLength: 1 })) {
      this.sendEvent({
        event: messageType,
        sendWithToken: true,
        eventType,
        data: {
          code,
          parentCode,
          rootCode,
          targetCode,
          ...value,
        },
      });
    }
  }

  checkStoreForCachedAction({ event, data }) {
    const { actionCache } = store.getState().vertx;

    if ( isObject( data, { withProperties: ['code', 'parentCode'] })) {
      const dataKeys = Object.keys( data ).filter(
        key => key !== 'code' && key !== 'parentCode' && key !== 'rootCode'
      );

      const dataString = dataKeys
        .map( key => {
          return `:${key}=${data[key]}`;
        })
        .join( '' );

      const actionId = `${data.rootCode}:${data.parentCode}:${data.code}${dataString}`;

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
