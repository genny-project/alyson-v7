import dlv from 'dlv';
import { isArray } from '../../../../utils';

const reduceChildAsks = ( childAsks, state ) => {
  if (
    !childAsks ||
    !( childAsks instanceof Array ) ||
    childAsks.length === 0
  ) {
    return [];
  }

  return childAsks.map( childAsk => ({
    ...childAsk,
    // TO BE ADDED: context for child asks
    // contextList: {
    //   contexts: [
    //     ...( isArray( dlv( state, `${childAsk.questionCode}.contextList.contexts` )))
    //       ? childAsk.replace === true
    //         ? []
    //         : state[childAsk.questionCode].contextList.contexts.filter( existingLink => (
    //           !childAsk.contextList.contexts
    //             .some( newLink => newLink.contextCode === existingLink.contextCode )
    //         ))
    //       : [],
    //     ...childAsk.contextList.contexts,
    //   ],
    // },
    childAsks: reduceChildAsks( childAsk.childAsks, state ),
  }));
};

// dlv( state, `${current.questionCode}.contextList.contexts` )

const reducer = ( state = {}, { type, payload }) => {
  switch ( type ) {
    case 'ASK_DATA':
      return {
        ...state,
        ...payload.items.reduce(( resultant, current ) => {
          resultant[current.questionCode] = {
            ...current,
            contextList: {
              contexts: [
                ...( isArray( dlv( state, `${current.questionCode}.contextList.contexts` )))
                  ? current.replace === true
                    ? []
                    : state[current.questionCode].contextList.contexts.filter( existingLink => (
                      !current.contextList.contexts
                        .some( newLink => newLink.contextCode === existingLink.contextCode )
                    ))
                  : [],
                ...current.contextList.contexts,
              ],
            },
            childAsks: reduceChildAsks( current.childAsks, state ),
          };

          return resultant;
        }, {}),
      };

    case 'USER_LOGOUT':
      return {};

    default:
      return state;
  }
};

export default reducer;
