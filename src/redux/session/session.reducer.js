import branch from '!!raw-loader!../../static/git-info-branch.txt';
import commit from '!!raw-loader!../../static/git-info-commit.txt';
import date from '!!raw-loader!../../static/git-info-date.txt';

const initialState = {
  testId: null,
  persist: {},
  preload: {},
  version: {
    branch: branch.replace( /\n/g, '' ),
    commit: commit.replace( /\n/g, '' ),
    date: date.replace( /\n/g, '' ),
  },
};

const reducer = ( state = initialState, { type, payload }) => {
  switch ( type ) {
    case 'SET_TEST_ID':
      return {
        ...state,
        testId: payload.id,
      };

    case 'REMOVE_TEST_ID':
      return {
        ...state,
        testId: null,
      };

    case 'SESSION_TEST':
      return {
        ...state,
        sessionId: payload,
      };

    case 'persist/REHYDRATE':
      return {
        ...state,
        persist: {
          ...state.persist,
          timestamp: window.localStorage && window.localStorage.getItem( 'persist:timestamp' ),
        },
      };

    case 'USER_LOGOUT':
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
