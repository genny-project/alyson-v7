import { prop } from 'ramda';

const getDataForEvent = viewing => ({
  ...viewing,
  rootCode: prop( 'parentCode', viewing ),
  targetCode: prop( 'targetCode', viewing ),
});

export default getDataForEvent;
