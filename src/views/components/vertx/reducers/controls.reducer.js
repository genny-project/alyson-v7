/* eslint-disable */

import dlv from 'dlv';
import { isArray, isString, isObject } from '../../../../utils';

/*
const panels = [
  "NORTH",
  "SOUTH",
  "EAST",
  "WEST",
  "CENTRE",
];

const injectControlIntoState = ({ item, state }) => {
  // alter the state

  // console.log('item', item);

  const baseEntityCode = item.code;

  panels.forEach( panel => {
    const panelId = `${baseEntityCode}:${panel}`;

    state[panelId] = 'open';
  });
};
*/

const injectControlIntoState = ({ item, state }) => {
  /* alter the state */

  // console.log('item', item);

  let controllablePanels = [];

  item.baseEntityAttributes.forEach( attribute => {
    if ( attribute.attributeCode === 'PRI_CONTROLLABLE_PANELS' ) {
      controllablePanels = attribute.value;
    }
  });

  const baseEntityCode = item.code;

  if ( isArray( controllablePanels, { ofMinLength: 1 } )) {

    controllablePanels.forEach( panel => {
      const panelId = `${baseEntityCode}:${panel}`;

      state[panelId] = 'open';
    })
  }
};

const updateControl = ({ payload, state }) => {
  /* alter the state */

  const panelId = payload.code;

  if ( state[panelId] ) {
    if ( state[panelId] !== 'open') {
      return {
        ...state,
        [panelId]: 'open',
      };
    }
    else if ( state[panelId] !== 'closed') {
      return {
        ...state,
        [panelId]: 'closed',
      };
    }
  }
};

const reducer = ( state = {}, { type, payload }) => {

  switch ( type ) {
    case 'BASE_ENTITY_MESSAGE': {
      if ( !isArray( payload.items, { ofMinLength: 1 }))
        return state;

      /* Loop through all of the layouts and store them in their corresponding layout groups. */
      return payload.items.reduce(( newState, item ) => {
        // console.log( newState );
        try {
          if ( isString( item.code, { startsWith: 'FRM_' })) {
            injectControlIntoState({ item, state: newState });
          }
          else {
            return state;
          }
        }
        catch ( error ) {
          // eslint-disable-next-line no-console
          console.warn( 'Unable to add control to reducer state', error, item.code, item );
        }

        return newState;
      }, { ...state });
    }

    case 'PANEL_TOGGLE': {
      if ( !isObject( payload))
        return state;

      return {
        ...state,
        ...updateControl({ payload, state})
      };
    }

    case 'USER_LOGOUT':
      return {};

    default:
      return state;
  }
};

export default reducer;
