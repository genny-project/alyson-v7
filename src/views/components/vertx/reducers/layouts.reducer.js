import dlv from 'dlv';
import { isArray, isString, isObject, isInteger } from '../../../../utils';

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
  PRI_IS_DROPDOWN: {
    default: false,
    label: 'dropdown',
  },
  PRI_IS_INHERITABLE: {
    default: true,
    label: 'inheritable',
  },
  PRI_IS_SHAREABLE: {
    default: false,
    label: 'shareable',
  },
  PRI_HAS_QUESTION_GRP_INPUT: {
    default: false,
    label: 'renderQuestionGroupInput',
  },
  PRI_HAS_QUESTION_GRP_LABEL: {
    default: false,
    label: 'renderQuestionGroupLabel',
  },
  PRI_HAS_QUESTION_GRP_ICON: {
    default: true,
    label: 'renderQuestionGroupIcon',
  },
  PRI_HAS_QUESTION_GRP_DESCRIPTION: {
    default: false,
    label: 'renderQuestionGroupDescription',
  },
  PRI_IS_QUESTION_GRP_LABEL_CLICKABLE: {
    default: false,
    label: 'renderQuestionGroupLabelInsideClickable',
  },
  PRI_IS_QUESTION_GRP_INPUT_CLICKABLE: {
    default: false,
    label: 'renderQuestionGroupInputInsideClickable',
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
  PRI_USE_ATTRIBUTE_NAME_AS_VALUE: {
    default: false,
    label: 'useAttributeNameAsValue',
  },
  PRI_USE_QUESTION_NAME_AS_VALUE: {
    default: false,
    label: 'useQuestionNameAsValue',
  },
  PRI_HAS_CHILD_ASKS: {
    default: true,
    label: 'renderChildAsks',
  },
};

const componentTypes = {
  // form groups
  GROUP: 'group',
  GROUP_WRAPPER: 'group-wrapper',
  GROUP_LABEL: 'group-label',
  GROUP_DESCRIPTION: 'group-description',
  GROUP_INPUT: 'group-input',
  GROUP_HEADER_WRAPPER: 'group-header-wrapper',
  GROUP_CLICKABLE_WRAPPER: 'group-clickable-wrapper',
  GROUP_ICON: 'group-icon',
  GROUP_CONTENT_WRAPPER: 'group-content-wrapper',

  // no supported yet
  GROUP_DELIMITER: 'group--delimiter',

  // visual control
  VCL: 'vcl',
  VCL_WRAPPER: 'vcl-wrapper',
  VCL_ICON: 'vcl-icon',
  VCL_LABEL: 'vcl-label',
  VCL_DESCRIPTION: 'vcl-description',
  VCL_HINT: 'vcl-hint',
  VCL_ERROR: 'vcl-error',
  VCL_REQUIRED: 'vcl-required',
  // higher level for each input
  VCL_INPUT: 'vcl-input',
  // input subcomponents
  INPUT_FIELD: 'input-field',
  INPUT_WRAPPER: 'input-wrapper',
  INPUT_ICON: 'input-icon',
  INPUT_ITEM_WRAPPER: 'input-item-wrapper',
  INPUT_ITEM: 'input-item',
  INPUT_SELECTED_WRAPPER: 'input-selected-wrapper',
  INPUT_SELECTED: 'input-selected',
  INPUT_PLACEHOLDER: 'input-placeholder',
};

const selectorTypes = {
  FIRST: 'first',
  LAST: 'last',
  NOT_FIRST: 'not-first',
  NOT_LAST: 'not-last',
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
    return {
      ...state,
      frames: {
        ...state.frames,
        [item.code]: {
          ...state.frames[item.code],
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
            ...item.links
            .filter(( v, i, a ) => {
              const sameTargets = a.filter( t => (
                t.link.targetCode === v.link.targetCode &&
                t.link.linkValue === v.link.linkValue
              ));

              if ( sameTargets.length === 1 ) {
                return true;
              }

              if ( sameTargets.length > 1 ) {
                const firstIndex = a.findIndex( x => (
                  x.link.targetCode === v.link.targetCode &&
                  x.link.linkValue === v.link.linkValue
                ));

                if ( firstIndex === i ) {
                  return true;
                }
              }

              return false;
            })
            .map( link => {
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
                WRAPPER: 'WRAPPER',
                FRAME: 'FRAME',
              };

              return {
                code: link.link.targetCode,
                weight: link.link.weight,
                panel: panelTypes[link.link.linkValue] ? panelTypes[link.link.linkValue] : 'FRAME',
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
        },
      },
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
    ...( dlv( attributes, 'PRI_CONTENT_SELECTED.value' )
      ? { selected: dlv( attributes, 'PRI_CONTENT_SELECTED.value' ) }
      : null ),
    ...( dlv( attributes, 'PRI_CONTENT_READONLY.value' )
      ? { readonly: dlv( attributes, 'PRI_CONTENT_READONLY.value' ) }
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
    return {
      ...state,
      themes: {
        ...state.themes,
        [item.code]: {
          ...state.themes[item.code],
          name: item.name,
          code: item.code,
          data: isObject( themeData ) ? themeData : {},
          properties: layoutProperties,
          created: item.created,
        },
      },
    };
  }
};

const reduceAsks = ({ item, state }) => {
  let childAsks = {};

  if ( isArray( item.childAsks )) {
    /* recursively check child groups and questions */

    item.childAsks.forEach( childItem => {
      if ( isString( childItem.questionCode, { startsWith: 'QUE_' })) {
        childAsks = {
          ...childAsks,
          ...reduceAsks({ item: childItem, state }),
        };
      }
    });
  }

  return {
    ...childAsks,
    ...state.asks[item.questionCode],
    [item.questionCode]: {
      name: item.name,
      code: item.questionCode,
      ...( isArray( item.childAsks )
        ? {
          childAsks: [...item.childAsks.map( childAsk => childAsk.questionCode )],
        }
        : {}),
      ...(( isObject( item.contextList ) && isArray( item.contextList.contexts )) ||
      ( isObject( state.asks[item.questionCode], { withProperty: 'links' }) &&
        isArray( state.asks[item.questionCode].links ))
        ? {
          links: [
            ...( isObject( state.asks[item.questionCode], { withProperty: 'links' }) &&
              isArray( state.asks[item.questionCode].links )
              ? item.replace === true
                ? []
                : state.asks[item.questionCode].links.filter(
                  existingLink =>
                    isObject( item.contextList ) && isArray( item.contextList.contexts )
                      ? !item.contextList.contexts.some(
                        newLink => newLink.contextCode === existingLink.code
                      )
                      : true
                )
              : [] ),
            ...( isObject( item.contextList ) && isArray( item.contextList.contexts )
              ? item.contextList.contexts.map( link => {
                const nameTypes = {
                  THEME: 'theme',
                  ICON: 'icon',
                };

                return {
                  code: link.contextCode,
                  weight: link.weight,
                  type: nameTypes[link.name] ? nameTypes[link.name] : 'none',
                  component:
                    componentTypes[link.visualControlType]
                      ? componentTypes[link.visualControlType]
                      : componentTypes[link.hint]
                        ? componentTypes[link.hint]
                        : null,
                  dataType: isString( link.dataType )
                    ? link.dataType
                    : null,
                  selectorType: isInteger( link.selectorType )
                    ? link.selectorType
                    : isString( link.selectorType )
                      ? selectorTypes[link.selectorType]
                      : null,
                  created: link.created,
                };
              })
              : [] ),
          ],
        }
        : {}),
      created: item.created,
    },
  };
};

const injectAskIntoState = ({ item, state, shouldReplaceEntity }) => {
  // console.log( 'injectAskIntoState', item, state, state.asks );
  /* alter the state */

  // TODO - shouldDeleteLinkedBaseEntities

  if ( shouldReplaceEntity === true ) {
    if ( state.asks[item.questionCode] ) {
      delete state.asks[item.questionCode];
    }
  }

  if ( state.asks ) {
    return {
      ...state,
      asks: {
        ...state.asks,
        ...reduceAsks({ item, state }),
      },
    };
  }
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
              return injectFrameIntoState({ item, state: newState, shouldReplaceEntity });
            } if ( isString( item.code, { startsWith: 'THM_' })) {
              return injectThemeIntoState({ item, state: newState, shouldReplaceEntity });
            }

            return newState;
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
              return injectAskIntoState({ item, state: newState, shouldReplaceEntity });
            }

            return newState;
          } catch ( error ) {
            // eslint-disable-next-line no-console
            console.warn( 'Unable to add layout to reducer state', error, item.code, item );
          }

          return newState;
        },
        { ...state }
      );

    case 'CLEAR_ALL_LAYOUTS':
    case 'USER_LOGOUT':
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
