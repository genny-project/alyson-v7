import { prop, path } from 'ramda';

const getDataForEvent = ( viewing, user ) => ({
  ...viewing,
  rootCode: prop( 'parentCode', viewing ) || prop( 'code', viewing ),
  targetCode: prop( 'targetCode', viewing ) || path( ['data', 'code'], user ),
  parentCode: prop( 'parentCode', viewing ) || prop( 'code', viewing ),
});

export default getDataForEvent;
