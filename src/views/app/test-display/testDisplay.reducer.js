const initialState = {
  testId: null,
  message: null,
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

    case 'USER_LOGOUT':
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
