// import { ASK as ASK_DATA } from 'constants';

export const Ask = message => ({
  type: 'ASK_DATA',
  payload: message,
});

export const AskContextChange = message => ({
  type: 'ASK_CONTEXT_CHANGE',
  payload: message,
});
