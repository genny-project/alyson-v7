/* eslint-disable new-cap */
import axios from 'axios';
import { Platform } from 'react-native';
import { detect } from 'detect-browser';
import queryString from 'query-string';
import { Dimensions } from 'react-native-web'; // TODO move
import config from '../../config';
import { prefixedLog, isObject, isString, isArray } from '../../utils';
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
    const accessToken = store.getState().keycloak.accessToken;

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

    const browser = detect();

    const sessionInfo = store.getState().session;

    const clientData = {
      platform: {
        type: Platform.OS,
        version: Platform.Version,
      },
      browser: {
        name: browser.name,
        os: browser.os,
        version: browser.version,
      },
      screen: {
        height: Dimensions.get( 'window' ).height,
        width: Dimensions.get( 'window' ).width,
      },
      ...sessionInfo,
    };

    if ( window ) {
      const paramsFromWindow = window.location.search;
      const values = queryString.parse( paramsFromWindow );

      clientData['queryParameters'] = values;
    }

    console.warn({ clientData }); // eslint-disable-line

    axios
      .post( `${config.genny.host}/${config.genny.bridge.endpoints.events}/init?url=${origin}`, {
        method: 'POST',
        responseType: 'json',
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(() => {
        Vertx.sendMessage( events.AUTH_INIT( token, clientData ));
      });
  }

  sendEvent({ event, eventType, data, sendWithToken }) {
    const token = this.__getAccessToken();
    const eventObject = sendWithToken
      ? events[event]( eventType, data, token )
      : events[event]( eventType, data );

    const foundCachedActions = this.checkStoreForCachedAction({
      event,
      eventType,
      data,
    });

    if ( isArray( foundCachedActions )) {
      console.warn( 'Triggering Cached Action...' ); // eslint-disable-line

      foundCachedActions.forEach( item => {
        if ( isObject( item )) {
          Vertx.handleIncomingMessage( item, true );

          if ( item.send !== false ) {
            console.warn( 'sending event', eventObject ); // eslint-disable-line

            Vertx.sendMessage( eventObject );
          }
        }
      });
    }
    else {
      console.warn( 'sending event', eventObject );  // eslint-disable-line

      Vertx.sendMessage( eventObject );
    }

    if ( event === 'ANSWER' ) {
      // console.log( 'ANSWER FOUND, UPDATE STORE' );

      const updatedAttributeMessage = {
        data_type: 'BaseEntity',
        delete: false,
        items: data.map( item => {
          // console.log( 'item', item );

          return {
            baseEntityAttributes: [
              {
                attributeCode: item.attributeCode,
                baseEntityCode: item.targetCode,
                valueString: item.value,
              },
            ],
            code: item.targetCode,
            delete: false,
            replace: false,
            totalCount: 1,
            updated: '2019-02-06T04:24:10',
          };
        }),
        msg_type: 'DATA_MSG',
        replace: false,
      };

      // console.log( 'fake message', updatedAttributeMessage );
      Vertx.handleIncomingMessage( updatedAttributeMessage, null, true );
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

  sendFormattedAnswer({
    targetCode,
    sourceCode,
    eventType = 'BTN_CLICK',
    messageType = 'ANSWER',
    value,
    ...restProps
  }) {
    if (
      isString( sourceCode, { ofMinLength: 1 }) &&
      isString( targetCode, { ofMinLength: 1 })
    ) {
      this.sendEvent({
        event: messageType,
        sendWithToken: true,
        eventType,
        data: [{
          targetCode,
          sourceCode,
          value,
          ...restProps,
        }],
      });
    }
  }

  checkStoreForCachedAction({ /* event, */ data }) {
    const { actionCache } = store.getState().vertx;

    if ( isObject( data, { withProperties: ['code', 'parentCode'] })) {
      const actionId = `${data.rootCode}:${data.parentCode}:${data.code}`;

      const getAllMatchingCacheActions = ( code ) => {
        let matches = [];

        const addToMatchingArray = ( code ) => {
          if (
            code &&
            isArray( actionCache[code], { ofMinLength: 1 })
          ) {
            matches =  matches.concat( actionCache[code] );
          }
        };

        const idVarRoot = `{ROOTCODE}:${data.parentCode}:${data.code}`;
        const idVarParent = `${data.rootCode}:{PARENTCODE}:${data.code}`;
        const idVarCode = `${data.rootCode}:${data.parentCode}:{CODE}`;

        if ( isObject( actionCache, { withProperty: code })) {
          addToMatchingArray( code );
        }

        if ( actionCache[idVarRoot] ) {
          addToMatchingArray( idVarRoot );
        }
        if ( actionCache[idVarParent] ) {
          addToMatchingArray( idVarParent );
        };
        if ( actionCache[idVarCode] ) {
          addToMatchingArray( idVarCode );
        };

        return matches;
      };

      const allMatchingCacheAction = getAllMatchingCacheActions( actionId );

      if ( isArray( allMatchingCacheAction, { ofMinLength: 1 })) {
        return allMatchingCacheAction;
      }
      // eslint-disable-next-line no-console
      console.warn( `Checking Action Cache; No Matches Found for '${actionId}'` );

      return false;
    }
    // eslint-disable-next-line no-console
    // console.warn( 'event has no code or value keys', event );

    return false;
  }
}

export default new Bridge();
