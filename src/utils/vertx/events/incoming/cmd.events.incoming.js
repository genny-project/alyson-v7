// import { GPS_CMD } from 'constants';

export const CMD_GPS = message => ({
  type: 'GPS_CMD',
  payload: message,
});

export const CMD_BULKASK = message => ({
  type: 'CMD_BULKASK',
  payload: message,
});
