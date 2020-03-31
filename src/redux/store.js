import { createStore } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import dlv from 'dlv';

import middleware from './middleware';
import reducers from './reducers';

// export default store;

// const logKeys = ['vertx', 'router'];

// const rootReducer = ( state, action ) => {
//   if ( action.type === 'persist/PERSIST' ) {
//     console.warn( 'state', state, action.payload );

//     const userId = dlv( state, 'vertx.user.attributes.PRI_KEYCLOAK_UUID.value' );

//     if ( state.vertx ) {
//       console.log( 'vertx' );
//       if ( state.vertx.user ) {
//         console.log( 'user' );

//         if ( state.vertx.user.attributes ) {
//           console.log( 'attributes', state.vertx.user.attributes  );

//           if ( state.vertx.user.attributes.PRI_KEYCLOAK_UUID ) {
//             console.log( 'PRI_KEYCLOAK_UUID' );

//             if ( state.vertx.user.attributes.PRI_KEYCLOAK_UUID.value ) {
//               console.log( 'value' );
//             }
//           }
//         }
//       }
//     }
//     console.warn( 'USER_ID', userId );
//   }

//   if ( action.type === 'persist/REHYDRATE' ) {
//     console.warn( 'state', state, action.payload );

//     const userId = dlv( state, 'vertx.user.attributes.PRI_KEYCLOAK_UUID.value' );

//     if ( state.vertx ) {
//       console.log( 'vertx' );
//       if ( state.vertx.user ) {
//         console.log( 'user' );

//         if ( state.vertx.user.attributes ) {
//           console.log( 'attributes', state.vertx.user.attributes  );

//           if ( state.vertx.user.attributes.PRI_KEYCLOAK_UUID ) {
//             console.log( 'PRI_KEYCLOAK_UUID' );

//             if ( state.vertx.user.attributes.PRI_KEYCLOAK_UUID.value ) {
//               console.log( 'value' );
//             }
//           }
//         }
//       }
//     }
//     console.warn( 'USER_ID', userId );
//   }

//   return reducers( state, action );
// };

// const SetTransform = createTransform(
//   // transform state on its way to being serialized and persisted.
//   ( inboundState, key ) => {
//     // convert mySet to an Array.
//     // if ( logKeys.includes( key )) {
//     console.warn(
//       'persist',
//       key,
//       inboundState
//         // JSON.stringify( inboundState )
//     );
//     // }

//     return {
//       ...inboundState,
//       // reduxSaveDate: new Date(),
//     };
//   },
//   // transform state being rehydrated
//   ( outboundState, key ) => {
//     // convert mySet back to a Set.
//     // if ( logKeys.includes( key )) {
//     console.warn(
//       'rehydrate',
//       key,
//       outboundState
//         // JSON.stringify( outboundState )
//     );
//     // }

//     const userId = dlv( outboundState, 'user.attributes.PRI_KEYCLOAK_UUID.value' );

//     console.warn({ userId });

//     return {
//       ...outboundState,
//       // reduxLoadDate: new Date(),
//     };
//   },
// );

const persistConfig = {
  key: 'root',
  storage,
  // transforms: [SetTransform],
  blacklist: ['router', 'session'],
  // whitelist: ['root'],
};

const persistedReducer = persistReducer( persistConfig, reducers );

const setUp = () => {
  const store = createStore( persistedReducer, middleware );
  const persistor = persistStore( store );

  return { store, persistor };
};

export const persistor = setUp().persistor;

export default setUp().store;
