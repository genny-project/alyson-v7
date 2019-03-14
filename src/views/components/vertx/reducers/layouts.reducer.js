/* eslint-disable */

import dlv from 'dlv';
import { isArray, isString, isObject } from '../../../../utils';
import { FETCH_PUBLIC_LAYOUTS_FAILURE, FETCH_PUBLIC_LAYOUTS_SUCCESS } from '../../../../constants';

const initialState = {
  frames: {},
  themes: {},
  asks: {},
};

const themeBehaviourAttributes = {
  PRI_IS_EXPANDABLE: {
    default: false,
    label: "expandable"
  },
  PRI_IS_SELECTION_AREA: {
    default: false,
    label: "selectionArea"
  },
  PRI_IS_SELECTABLE_AREA: {
    default: false,
    label: "selectableArea"
  },
  PRI_IS_PAGINATION: {
    default: false,
    label: "pagination"
  },
  PRI_IS_INHERITABLE: {
    default: true,
    label: "inheritable"
  },
  PRI_HAS_QUESTION_GRP_INPUT: {
    default: false,
    label: "renderQuestionGroupInput"
  },
};

const injectFrameIntoState = ({ item, state, shouldReplaceEntity }) => {
  // console.log( 'injectFrameIntoState', item, state, state.frames );
  /* alter the state */

  const attributes = {};

  item.baseEntityAttributes.forEach( attribute => {
    // console.log( attribute );
    attributes[attribute.attributeCode] = attribute;
  });

  if ( shouldReplaceEntity === true ) {
    if (
      state.frames[item.code]
    ) {
      delete state.frames[item.code];
    }
  }

  if ( state.frames ) {
    state.frames[item.code] = {
      name: item.name,
      code: item.code,
      links: [
        ...( isObject( state.frames[item.code], { withProperty: 'links' }) && isArray( state.frames[item.code].links )) ? state.frames[item.code].links.filter( existingLink => (
          !item.links.some( newLink => newLink.link.targetCode === existingLink.code )
        )) : [],
        ...item.links.map( link => {
          const linkTypes = {
            LNK_THEME: 'theme',
            LNK_FRAME: 'frame',
            LNK_ASK: 'ask',
            LNK_LAYOUT: 'sublayout',
          };

          return {
            code: link.link.targetCode,
            weight: link.link.weight,
            panel: link.link.linkValue,
            type: linkTypes[link.link.attributeCode]
              ? linkTypes[link.link.attributeCode]
              : 'none',
            created: link.created,
          };
        })
      ],
      created: item.created,
    };
  }
};

const injectThemeIntoState = ({ item, state, shouldReplaceEntity }) => {
  // console.log( 'injectThemeIntoState', item, state, state.themes );
  const attributes = {};
  const layoutProperties = {};

  // console.log( item.baseEntityAttributes );
  item.baseEntityAttributes.forEach( attribute => {
    // console.log( attribute );
    attributes[attribute.attributeCode] = attribute;

    if ( isObject( themeBehaviourAttributes[attribute.attributeCode] )) {
      const themeBehaviourAttribute = themeBehaviourAttributes[attribute.attributeCode];
      const attributeValue = dlv( attributes, `${attribute.attributeCode}.value` );

      if ( attributeValue !== null ) {
        layoutProperties[themeBehaviourAttribute.label] = attributeValue;
      }
    }
  });

  // console.log( attributes );

  const themeData = dlv( attributes, 'PRI_CONTENT.value' );

  if ( shouldReplaceEntity === true ) {
    if (
      state.themes[item.code]
    ) {
      delete state.themes[item.code];
    }
  }

  /* alter the state */

  if ( state.themes ) {
    state.themes[item.code] = {
      name: item.name,
      code: item.code,
      data: isObject( themeData ) ? themeData : {},
      properties: layoutProperties,
      created: item.created,
    };
  }
};

const injectAskIntoState = ({ item, state, shouldReplaceEntity }) => {
  // console.log( 'injectAskIntoState', item, state, state.asks );
  /* alter the state */

  // TODO - shouldDeleteLinkedBaseEntities

  if ( shouldReplaceEntity === true ) {
    if (
      state.frames[item.questionCode]
    ) {
      delete state.frames[item.questionCode];
    }
  }

  if ( state.asks ) {
    state.asks[item.questionCode] = {
      name: item.name,
      code: item.questionCode,
      ...( item.links
        ? {
          links: [
            ...( isObject( state.frames[item.code], { withProperty: 'links' }) && isArray( state.frames[item.code].links )) ? state.frames[item.code].links.filter( existingLink => (
              !item.links.some( newLink => newLink.link.targetCode === existingLink.code )
            )) : [],
            ...item.links.map( link => {
              const linkTypes = {
                LNK_THEME: 'theme',
              };

              return {
                code: link.link.targetCode,
                weight: link.link.weight,
                panel: link.link.linkValue,
                type: linkTypes[link.link.attributeCode]
                  ? linkTypes[link.link.attributeCode]
                  : 'none',
                created: link.created,
              };
            })
          ],
        } : {}
      ),
      created: item.created,
    };

    if ( isArray( item.childAsks )) {
      /* recursively check child groups and questions */

      item.childAsks.forEach( childItem => {
        if ( isString( childItem.questionCode, { startsWith: 'QUE_' })) {
          injectAskIntoState({ item: childItem, state });
        }
      })
    }
  }
};

const reducer = ( state = initialState, { type, payload }) => {
  // console.log( type, payload );
  // TODO - shouldDeleteLinkedBaseEntities

  const shouldReplaceEntity = payload && ( payload.replace || payload.delete );

  switch ( type ) {
    case 'BASE_ENTITY_MESSAGE': {
      if ( !isArray( payload.items, { ofMinLength: 1 }))
        return state;

      /* Loop through all of the layouts and store them in their corresponding layout groups. */
      return payload.items.reduce(( newState, item ) => {
        // console.log( newState );
        try {
          if ( isString( item.code, { startsWith: 'FRM_' })) {
            injectFrameIntoState({ item, state: newState, shouldReplaceEntity });
          }
          else if ( isString( item.code, { startsWith: 'THM_' })) {
            injectThemeIntoState({ item, state: newState, shouldReplaceEntity });
          }
          else {
            return state;
          }
        }
        catch ( error ) {
          // eslint-disable-next-line no-console
          console.warn( 'Unable to add layout to reducer state', error, item.code, item );
        }

        return newState;
      }, { ...state });
    }

    case 'ASK_DATA':
      // console.log('ASK DATA', payload.items)
      if ( !isArray( payload.items, { ofMinLength: 1 }))
        return state;

        // TODO - shouldDeleteLinkedBaseEntities

      /* Loop through all of the layouts and store them in their corresponding layout groups. */
      return payload.items.reduce(( newState, item ) => {
        // console.log( newState );
        try {
          if ( isString( item.questionCode, { startsWith: 'QUE_' })) {
            injectAskIntoState({ item, state: newState, shouldReplaceEntity });
          }
          else {
            return state;
          }
        }
        catch ( error ) {
          // eslint-disable-next-line no-console
          console.warn( 'Unable to add layout to reducer state', error, item.code, item );
        }

        return newState;
      }, { ...state });

    case FETCH_PUBLIC_LAYOUTS_FAILURE:
    case FETCH_PUBLIC_LAYOUTS_SUCCESS:
    case 'CLEAR_ALL_LAYOUTS':
    case 'USER_LOGOUT':
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
