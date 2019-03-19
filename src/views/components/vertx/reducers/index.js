import { combineReducers } from 'redux';
import baseEntities from './baseEntities.reducer';
import asks from './asks.reducer';
import connection from './connection.reducer';
import aliases from './aliases.reducer';
import user from './user.reducer';
import layouts from './layouts.reducer';
import actionCache from './actionCache.reducer';
import controls from './controls.reducer';
import layoutsLegacy from './layoutsLegacy.reducer'; // legacy compatibility

const reducer = combineReducers({
  baseEntities,
  asks,
  connection,
  aliases,
  user,
  layouts,
  actionCache,
  controls,
  layoutsLegacy, // legacy compatibility
});

export default reducer;
