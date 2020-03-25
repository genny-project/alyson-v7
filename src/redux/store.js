import { createStore } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import middleware from './middleware';
import reducers from './reducers';

// const store = createStore(
//   reducers,
//   middleware
// );

// export default store;

const logKeys = ['vertx', 'router'];

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  ( inboundState, key ) => {
    // convert mySet to an Array.
    if ( logKeys.includes( key )) {
      console.warn(
        'persist',
        key,
        JSON.stringify( inboundState )
      );
    }

    return { ...inboundState };
  },
  // transform state being rehydrated
  ( outboundState, key ) => {
    // convert mySet back to a Set.
    if ( logKeys.includes( key )) {
      console.warn(
        'rehydrate',
        key,
        JSON.stringify( outboundState )
      );
    }

    return { ...outboundState };
  },
);

const persistConfig = {
  key: 'root',
  storage,
  // transforms: [SetTransform],
  blacklist: ['router'],
};

const persistedReducer = persistReducer( persistConfig, reducers );

const setUp = () => {
  const store = createStore( persistedReducer, middleware );
  const persistor = persistStore( store );

  return { store, persistor };
};

export const persistor = setUp().persistor;

export default setUp().store;
