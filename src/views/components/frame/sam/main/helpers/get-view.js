import { contains, length, prop, replace, keys } from 'ramda';

const getView = viewing =>
  length( keys( viewing )) === 1
    ? prop( 'code', viewing ) === 'QUE_DASHBOARD_VIEW'
      ? 'DASHBOARD'
      : 'DETAILS'
    : contains( 'MENU', prop( 'code', viewing ))
      ? asks[replace( 'MENU', 'GRP', prop( 'code', viewing ))]
      : 'TABLE';

export default getView;
