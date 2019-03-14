import copy from 'fast-copy';
import { isArray, isObject } from '../../../../utils';

const initialState = {
  data: {},
  relationships: {},
  aliases: {},
  attributes: {},
  definitions: {
    data: {},
    types: {},
  },
  links: {},
};

const getDisplayValueField = ( item ) => {
  if ( item.valueDouble != null ) {
    let local = navigator.language;

    if ( local == null )
      local = 'en-AU';

    const value = new Intl.NumberFormat( local ).format( item.valueDouble );

    return value
      ? new Intl.NumberFormat( local ).format( item.valueDouble )
      : item.valueDouble;
  }

  if ( item.valueInteger != null )
    return item.valueInteger;

  if ( item.valueLong != null )
    return item.valueLong;

  if ( item.valueDateTime != null )
    return item.valueDateTime;

  if ( item.valueDate != null )
    return item.valueDate;

  if ( item.valueBoolean != null )
    return item.valueBoolean;

  if ( item.valueMoney != null ) {
    const formatter = new Intl.NumberFormat( 'en-AU', {
      style: 'currency',
      currency: item.valueMoney.currency,
      minimumFractionDigits: 2,
    });

    return formatter.format( Number( item.valueMoney.amount ));
  }

  if ( item.valueString != null ) {
    try {
      if ( item.baseEntityCode.startsWith( 'THM' )) {
        // eslint-disable-next-line no-console
        console.warn( item.valueString.toString());
      }

      const object = JSON.parse( item.valueString.toString());

      return object;
    }
    catch ( error ) {
      if ( item.baseEntityCode.startsWith( 'THM' )) {
        // eslint-disable-next-line no-console
        console.warn({ item, error });
      }

      return item.valueString;
    }
  }

  return null;
};

const handleReduceAttributeCodes = ( resultantAttributes, currentAttribute ) => {
  const displayValue = getDisplayValueField( currentAttribute );

  if ( displayValue != null ) {
    currentAttribute['value'] = displayValue;
  }

  resultantAttributes[currentAttribute.attributeCode] = currentAttribute;

  return resultantAttributes;
};

const handleReduceAttributes = ( resultant, current ) => {
  if ( !current )
    return resultant;

  if ( current.baseEntityAttributes ) {
    const existing = resultant[current.code] || {};

    const baseEntityAttributes = current
      .baseEntityAttributes
      .reduce( handleReduceAttributeCodes, existing );

    resultant[current.code] = baseEntityAttributes;
  }

  return resultant;
};

const handleReplaceLinks = ( resultant, current ) => {
  return handleReduceLinks( resultant, current, true );
};

const handleReduceLinks = ( resultant, current, shouldReplace ) => {
  if ( !isArray( current.links ))
    return resultant;

  const entityCodeKey = current.code || current.questionCode;

  const removeMatchingExistingKeys = link => {
    if (
      link.link.linkValue &&
      resultant[entityCodeKey]
    ) {
      delete resultant[entityCodeKey];
    }
  };

  // TODO check for duplicate target code?
  const handleCombineLinkValues = link => {
    if ( link.link.linkValue ) {
      resultant[entityCodeKey] = {
        ...resultant[entityCodeKey],
        [link.link.linkValue]: [
          ...( resultant[entityCodeKey] && isArray( resultant[entityCodeKey][link.link.linkValue] ))
            ? resultant[entityCodeKey][link.link.linkValue]
              .filter( existingLink => existingLink.link.targetCode !== link.link.targetCode )
            : [],
          link,
        ],
      };
    }
  };

  // if ( isArray( current.links )) {
  //   console.log( 'call1' );
  //   current.links.forEach( handleCombineLinkValues );
  // }

  if ( shouldReplace === true ) {
    current.links.forEach( removeMatchingExistingKeys );
  }

  current.links.forEach( handleCombineLinkValues );

  if ( isArray( current.childAsks )) {
    current.childAsks.forEach( childAsk => {
      handleReduceLinks( resultant, childAsk, shouldReplace );
    });
  }

  return resultant;
};

const handleReduceDefinitionData = ( resultant, current ) => {
  resultant[current.code] = {
    ...current,
    dataType: current.dataType.typeName,
  };

  return resultant;
};

const deleteLinkedBaseEntities = ( data, resultant, depth = 1 ) => {
  if ( !data ) return;

  const { shouldDeleteLinkedBaseEntities, code } = data;
  const links = resultant[code] ? resultant[code].links : data.links;

  if ( !isArray( links ))
    return;

  links.forEach(({ link }) => {
    if ( depth >= shouldDeleteLinkedBaseEntities ) {
      delete resultant[link.targetCode];
    }
    else {
      deleteLinkedBaseEntities({
        ...resultant[link.targetCode],
        shouldDeleteLinkedBaseEntities,
      }, resultant, depth + 1 );
    }
  });
};

const handleReduceData = ( resultant, current ) => {
  if ( !current )
    return resultant;

  /* Shortcut to remove properties inside the current base entity. */
  const { baseEntityAttributes, ...wantedData } = current; // eslint-disable-line no-unused-vars

  if ( current.shouldDeleteLinkedBaseEntities ) {
    if ( Number.isInteger( current.shouldDeleteLinkedBaseEntities )) {
      deleteLinkedBaseEntities( current, resultant );
    }
  }

  resultant[current.code] = wantedData;

  return resultant;
};

const handleReduceDefinitionTypes = ( resultant, current ) => {
  const { dataType } = current;

  resultant[dataType.typeName] = dataType;

  return resultant;
};

const handleReduceAskQuestionData = ( resultant, current ) => {
  if ( !isObject( current.question, { withProperty: 'attribute' })) {
    return resultant;
  }

  /* Shortcut to remove properties inside the `current` object. */
  const { dataType, ...wantedData } = current.question.attribute; // eslint-disable-line

  resultant[current.question.attributeCode] = wantedData;

  if ( isArray( wantedData.childAsks, { ofMinLength: 1 })) {
    return wantedData.childAsks.reduce( handleReduceAskQuestionData, resultant );
  }

  return resultant;
};

const handleReduceAskQuestionTypes = ( resultant, current ) => {
  if ( !isObject( current.question, { withProperty: 'attribute' })) {
    return resultant;
  }

  const { dataType, childAsks } = current.question.attribute;

  resultant[dataType.typeName] = dataType;

  if ( isArray( childAsks, { ofMinLength: 1 })) {
    return childAsks.reduce( handleReduceAskQuestionTypes, resultant );
  }

  return resultant;
};

const handleRemoveLayoutAttributes = attributes => {
  return Object
    .keys( attributes )
    .filter( key => !key.startsWith( 'LAY_' ))
    .reduce(( result, current ) => ({
      ...result,
      [current]: attributes[current],
    }), {});
};

const handleUpdateProjectName = ( attributes, name ) => {
  /* Find the project key */
  const key = Object.keys( attributes ).find( key => key.startsWith( 'PRJ_' ));

  return {
    [key]: {
      ...attributes[key],
      PRI_NAME: {
        ...attributes[key].PRI_NAME,
        value: name,
        valueString: name,
      },
    },
  };
};

function handleReduceDataTwo( message, state ) {
  const newState = copy( state );

  delete newState[message.parentCode];

  if (
    message.delete &&
    !message.shouldDeleteLinkedBaseEntities
  ) {
    return newState;
  }

  return message.items.reduce( handleReduceData, newState );
}

function changeLink( message, state ) {
  /* if we have an oldLink and it already exists in the store, we remove it */
  if ( message.oldLink &&
    state[message.oldLink.sourceCode] &&
    state[message.oldLink.sourceCode][message.oldLink.linkValue] ) {
    state[message.oldLink.sourceCode][message.oldLink.linkValue] =
    state[message.oldLink.sourceCode][message.oldLink.linkValue]
    .filter( existingLink => existingLink.link.targetCode !== message.oldLink.targetCode );
  }
  /* TODO: to remove. here for demo */
  // else {
  //   const buckets =
  // ['GRP_APPLIED', 'GRP_SHORTLISTED',
  // 'GRP_INTERVIEWS', 'GRP_OFFER', 'GRP_PLACED', 'GRP_OFFERED', 'GRP_IN_PROGRESS'];

  //   buckets.forEach( bucket => {
  //     if ( bucket !== message.link.sourceCode &&
  //       state[bucket] && state[bucket].APPLICATION ) {
  //       state[bucket].APPLICATION = state[bucket].APPLICATION
  //       .filter( existingLink => existingLink.link.targetCode !== message.link.targetCode );
  //     }
  //   });
  // }

  if ( state[message.link.sourceCode] == null ) {
    state[message.link.sourceCode] = {
      [message.link.linkValue]: [],
    };
  }

  const createLink = ( current ) => ({
    code: current.code,
    weight: 1,
    link: {
      attributeCode: current.attributeCode,
      targetCode: current.targetCode,
      sourceCode: current.sourceCode,
      weight: 1,
      linkValue: current.linkValue,
    },
  });

  /* we push the new link */
  state[message.link.sourceCode][message.link.linkValue].push( createLink( message.link ));

  return state;
}

// function handleReduceLinksTwo( message, state ) {
//   const newState = copy( state );

// if ( message.parentCode ) {
//   delete newState[message.parentCode];
// }
// else if ( isArray( message.items )) {
//   message.items.forEach( item => {
//     delete newState[item.code];
//   });
// }

// if (
//   message.delete &&
//     !message.shouldDeleteLinkedBaseEntities
// ) {
//   return newState;
// }

//   return message.items.reduce( handleReduceLinks, newState );
// }

const reducer = ( state = initialState, { type, payload }) => {
  switch ( type ) {
    /**
     * When we receive a base entity, we want to loop through the items in the payload and convert
     * the array of items into a hash map / object. The keys for this object are the `code` property
     * on the item (base entity), and the value is the base entity object (well, most of it).
     * We store this data as the `data` property in the reducer. The reason why we store 'most of'
     * the base entity in `data` is because we want to separate the actual base entity attributes
     * into its own property, as stated below.
     *
     * The `attributes` property in the reducer refers to the actual attributes of the base entity.
     *
     * TODO: explain `links`
     */

    case 'BASE_ENTITY_MESSAGE': {
      if (
        payload.replace ||
        payload.delete
      ) {
        return {
          ...state,
          data: handleReduceDataTwo( payload, state.data ),
          attributes: payload.items.reduce( handleReduceAttributes, state.attributes ),
          links: payload.items.reduce( handleReplaceLinks, state.links ),
          // links: handleReduceLinksTwo( payload, state.links ),
        };
      }

      return {
        ...state,
        data: payload.items.reduce( handleReduceData, state.data ),
        attributes: payload.items.reduce( handleReduceAttributes, state.attributes ),
        links: payload.items.reduce( handleReduceLinks, state.links ),
      };
    }

    case 'BASE_ENTITY_LINK_CHANGE': {
      return {
        ...state,
        links: changeLink( payload, state.links ),
      };
    }

    /**
     * When we receive attribute data, we are renaming it to `definitions` for semantic purposes.
     * This does not contain real data, but mainly validation rules for getting data / attributes.
     *
     * `definitions` is split into two categories, `data` and `types`. Types are a key/value pair,
     * where the key is the `typeName`, and the value is the type (including the validation rules).
     * This is so that we are not storing any duplicate data and bloating our reducer.
     *
     * The `data` property in `definitions` holds the actual definition and is stored by the `code`
     * key. The `dataType` property references the corresponding dataType in the `type` category.
     */
    case 'ATTRIBUTE_DATA':
      return {
        ...state,

        definitions: {
          ...state.definitions,
          data: payload.items.reduce( handleReduceDefinitionData, state.definitions.data ),
          types: payload.items.reduce( handleReduceDefinitionTypes, state.definitions.types ),
        },
      };

    case 'ASK_DATA':

      // TODO Handle recursion of childAsks with links

      return {
        ...state,
        links: payload.items.reduce( handleReduceLinks, state.links ),
        // ...payload.items.reduce(( resultant, current ) => {
        //   resultant[current.questionCode] = {
        //     ...current,
        //     childAsks: reduceChildAsks( current.childAsks ),
        //   };

        //   return resultant;
        // }, {}),
      };

      /**
     * If we receive a CLEAR_ALL_LAYOUTS we need to remove any attributes that start with LAY_
     * We do this so that we can load in all of our development layouts.
     */
    case 'CLEAR_ALL_LAYOUTS':
      return {
        ...state,
        attributes: handleRemoveLayoutAttributes( state.attributes ),
      };

    /**
     * Loads in an individual dev layout as an attribute
     */
    case 'LOAD_DEV_LAYOUT':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          ...payload,
        },
      };

    /**
     * Updates the project name in the reducer. Used for development
     */
    case 'UPDATE_PROJECT_NAME':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          ...handleUpdateProjectName( state.attributes, payload ),
        },
      };

    case 'USER_LOGOUT':
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
