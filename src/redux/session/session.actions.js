export const setTestId = id => ({
  type: 'SET_TEST_ID',
  payload: id,
});

export const removeTestId = () => ({
  type: 'REMOVE_TEST_ID',
  payload: {},
});

export const rawSession = data => ({
  type: 'SESSION_TEST',
  payload: data,
});
