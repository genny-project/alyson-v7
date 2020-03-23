import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import middleware from './middleware';
import reducers from './reducers';

// const store = createStore(
//   reducers,
//   middleware
// );

// export default store;

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer( persistConfig, reducers );

const setUp = () => {
  const store = createStore( persistedReducer, middleware );
  const persistor = persistStore( store );

  return { store, persistor };
};

export const persistor = setUp().persistor;

export default setUp().store;
