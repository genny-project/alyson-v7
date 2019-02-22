import { combineReducers } from 'redux';
import baseEntities from './baseEntities.reducer';
import asks from './asks.reducer';
import connection from './connection.reducer';
import aliases from './aliases.reducer';
import user from './user.reducer';
import layouts from './layouts.reducer';
import layoutsLegacy from './layoutsLegacy.reducer';

const reducer = combineReducers({
  baseEntities,
  asks,
  connection,
  aliases,
  user,
  layouts,
  layoutsLegacy,
});

export default reducer;
