import dlv from 'dlv';
import { isArray, isString, isObject } from '../../../../utils';

const initialState = {
  frames: {},
  themes: {},
  asks: {},
};

const themeBehaviourAttributes = {
  PRI_IS_EXPANDABLE: {
    default: false,
    label: 'expandable',
  },
  PRI_IS_INHERITABLE: {
    default: true,
    label: 'inheritable',
  },
  PRI_HAS_QUESTION_GRP_INPUT: {
    default: false,
    label: 'renderQuestionGroupInput',
  },
  PRI_HAS_QUESTION_GRP_TITLE: {
    default: false,
    label: 'renderQuestionGroupTitle',
  },
  PRI_HAS_QUESTION_GRP_DESCRIPTION: {
    default: false,
    label: 'renderQuestionGroupDescription',
  },
  PRI_HAS_LABEL: {
    default: true,
    label: 'renderVisualControlLabel',
  },
  PRI_HAS_REQUIRED: {
    default: true,
    label: 'renderVisualControlRequired',
  },
  PRI_HAS_HINT: {
    default: false,
    label: 'renderVisualControlHint',
  },
  PRI_HAS_DESCRIPTION: {
    default: false,
    label: 'renderVisualControlDescription',
  },
  PRI_HAS_ICON: {
    default: false,
    label: 'renderVisualControlIcon',
  },
  PRI_HAS_INPUT: {
    default: true,
    label: 'renderVisualControlInput',
  },
  PRI_HAS_DELIMITER: {
    default: false,
    label: 'renderDelimiter',
  },
};

const componentTypes = {
  // VISUAL_CONTROL: 'visualControl',
  WRAPPER: 'wrapper',
  INPUT: 'input',
  ICON: 'icon',
  LABEL: 'label',
  DESCRIPTION: 'description',
  HINT: 'hint',
  ERROR: 'error',
  REQUIRED: 'required',
  DELIMITER: 'delimiter',
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
    if ( state.frames[item.code] ) {
      delete state.frames[item.code];
    }
  }

  if ( state.frames ) {
    state.frames[item.code] = {
      name: item.name,
      code: item.code,
      links: [
        ...( isObject( state.frames[item.code], { withProperty: 'links' }) &&
        isArray( state.frames[item.code].links )
          ? state.frames[item.code].links.filter( existingLink => {
            if ( item.code === 'FRM_CONTENT' ) {
              const hasNewNonLegacyLink = item.links.filter(
                x => x.type !== 'sublayout' && x.type !== 'theme'
              );

              if ( existingLink.type === 'sublayout' && hasNewNonLegacyLink ) return false;
            }

            return !item.links.some( newLink => newLink.link.targetCode === existingLink.code );
          })
          : [] ),
        ...item.links.map( link => {
          const linkTypes = {
            LNK_THEME: 'theme',
            LNK_FRAME: 'frame',
            LNK_ASK: 'ask',
            LNK_LAYOUT: 'sublayout',
          };

          const panelTypes = {
            NORTH: 'NORTH',
            SOUTH: 'SOUTH',
            EAST: 'EAST',
            WEST: 'WEST',
            CENTRE: 'CENTRE',
          };

          return {
            code: link.link.targetCode,
            weight: link.link.weight,
            panel: panelTypes[link.link.linkValue] ? panelTypes[link.link.linkValue] : null,
            type: linkTypes[link.link.attributeCode] ? linkTypes[link.link.attributeCode] : 'none',
            created: link.created,
            component: componentTypes[link.visualControlType]
              ? componentTypes[link.visualControlType]
              : componentTypes[link.hint]
                ? componentTypes[link.hint]
                : null,
          };
        }),
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

  const themeData = {
    ...( dlv( attributes, 'PRI_CONTENT.value' )
      ? { default: dlv( attributes, 'PRI_CONTENT.value' ) }
      : null ),
    ...( dlv( attributes, 'PRI_CONTENT_ACTIVE.value' )
      ? { active: dlv( attributes, 'PRI_CONTENT_ACTIVE.value' ) }
      : null ),
    ...( dlv( attributes, 'PRI_CONTENT_HOVER.value' )
      ? { hover: dlv( attributes, 'PRI_CONTENT_HOVER.value' ) }
      : null ),
    ...( dlv( attributes, 'PRI_CONTENT_DISABLED.value' )
      ? { disabled: dlv( attributes, 'PRI_CONTENT_DISABLED.value' ) }
      : null ),
    ...( dlv( attributes, 'PRI_CONTENT_CLOSED.value' )
      ? { closed: dlv( attributes, 'PRI_CONTENT_CLOSED.value' ) }
      : null ),
    ...( dlv( attributes, 'PRI_CONTENT_ERROR.value' )
      ? { error: dlv( attributes, 'PRI_CONTENT_ERROR.value' ) }
      : null ),
  };

  if ( shouldReplaceEntity === true ) {
    if ( state.themes[item.code] ) {
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
    if ( state.frames[item.questionCode] ) {
      delete state.frames[item.questionCode];
    }
  }

  if ( state.asks ) {
    state.asks[item.questionCode] = {
      name: item.name,
      code: item.questionCode,
      ...( isObject( item.contextList ) && isArray( item.contextList.contexts )
        ? {
          links: [
            ...( isObject( state.asks[item.code], { withProperty: 'links' }) &&
              isArray( state.asks[item.code].links )
              ? state.asks[item.code].links.filter(
                existingLink =>
                  !item.contextList.contexts.some(
                    newLink => newLink.contextCode === existingLink.code
                  )
              )
              : [] ),
            ...item.contextList.contexts.map( link => {
              const nameTypes = {
                THEME: 'theme',
                ICON: 'icon',
              };

              return {
                code: link.contextCode,
                weight: link.weight,
                type: nameTypes[link.name] ? nameTypes[link.name] : 'none',
                component: componentTypes[link.visualControlType]
                  ? componentTypes[link.visualControlType]
                  : componentTypes[link.hint]
                    ? componentTypes[link.hint]
                    : null,
                created: link.created,
              };
            }),
          ],
        }
        : {}),
      created: item.created,
    };

    if ( isArray( item.childAsks )) {
      /* recursively check child groups and questions */

      item.childAsks.forEach( childItem => {
        if ( isString( childItem.questionCode, { startsWith: 'QUE_' })) {
          injectAskIntoState({ item: childItem, state });
        }
      });
    }
  }
};

const injectFakeLayoutLinkIntoState = ({ payload, state }) => {
  if ( state.frames ) {
    return {
      ...state,
      frames: {
        ...state.frames,
        FRM_CONTENT: {
          ...( state.frames.FRM_CONTENT
            ? state.frames.FRM_CONTENT
            : {
              name: 'Content Frame',
              code: 'FRM_CONTENT',
              created: new Date().toString(),
            }),
          links: [
            ...( isObject( state.frames['FRM_CONTENT'], { withProperty: 'links' }) &&
            isArray( state.frames['FRM_CONTENT'].links )
              ? state.frames['FRM_CONTENT'].links.filter( link => link.type !== 'sublayout' )
              : [] ),
            {
              code: payload.code,
              weight: 1,
              panel: 'CENTRE',
              type: 'sublayout',
              created: new Date().toString(),
            },
          ],
        },
      },
    };
  }

  return state;
};

const reducer = ( state = initialState, { type, payload }) => {
  // console.log( type, payload );
  // TODO - shouldDeleteLinkedBaseEntities

  const shouldReplaceEntity = payload && ( payload.replace || payload.delete );

  switch ( type ) {
    case 'BASE_ENTITY_MESSAGE': {
      if ( !isArray( payload.items, { ofMinLength: 1 })) return state;

      /* Loop through all of the layouts and store them in their corresponding layout groups. */
      return payload.items.reduce(
        ( newState, item ) => {
          // console.log( newState );
          try {
            if ( isString( item.code, { startsWith: 'FRM_' })) {
              injectFrameIntoState({ item, state: newState, shouldReplaceEntity });
            } else if ( isString( item.code, { startsWith: 'THM_' })) {
              injectThemeIntoState({ item, state: newState, shouldReplaceEntity });
            } else {
              return state;
            }
          } catch ( error ) {
            // eslint-disable-next-line no-console
            console.warn( 'Unable to add layout to reducer state', error, item.code, item );
          }

          return newState;
        },
        { ...state }
      );
    }

    case 'ASK_DATA':
      // console.log('ASK DATA', payload.items)
      if ( !isArray( payload.items, { ofMinLength: 1 })) return state;

      // TODO - shouldDeleteLinkedBaseEntities

      /* Loop through all of the layouts and store them in their corresponding layout groups. */
      return payload.items.reduce(
        ( newState, item ) => {
          // console.log( newState );
          try {
            if ( isString( item.questionCode, { startsWith: 'QUE_' })) {
              injectAskIntoState({ item, state: newState, shouldReplaceEntity });
            } else {
              return state;
            }
          } catch ( error ) {
            // eslint-disable-next-line no-console
            console.warn( 'Unable to add layout to reducer state', error, item.code, item );
          }

          return newState;
        },
        { ...state }
      );

    case 'ROUTE_CHANGE':
      // legacy compatibiity
      // automatically creates a link to FRM_CONTENT
      if ( !isObject( payload, { withProperty: 'code' })) return state;

      return {
        ...state,
        ...injectFakeLayoutLinkIntoState({ payload, state }),
      };

    case 'CLEAR_ALL_LAYOUTS':
    case 'USER_LOGOUT':
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
