export const UNITY_LOADED = (eventType, data, token) => ({
  data_type: 'UNITY',
  msg_type: 'EVT_MSG',
  token,
  data,
})
