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

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  ( inboundState, key ) => {
    // convert mySet to an Array.
    console.warn( 'inbound', key, JSON.stringify( inboundState ));
    // debugger; // eslint-disable-line

    return { ...inboundState };
  },
  // transform state being rehydrated
  ( outboundState, key ) => {
    // convert mySet back to a Set.
    console.warn( 'outbound', key, JSON.stringify( outboundState ));

    return { ...outboundState };
  },
);

const persistConfig = {
  key: 'root',
  storage,
  // transforms: [SetTransform],
};

const persistedReducer = persistReducer( persistConfig, reducers );

const setUp = () => {
  const store = createStore( persistedReducer, middleware );
  const persistor = persistStore( store );

  return { store, persistor };
};

export const persistor = setUp().persistor;

export default setUp().store;
