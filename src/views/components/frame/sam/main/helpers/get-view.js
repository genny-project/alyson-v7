import { contains, length, prop, replace, keys } from 'ramda';

const getView = ({ viewing: { code = '' }, asks }) =>
  contains( 'DASHBOARD', code )
    ? 'DASHBOARD'
    : contains( 'MENU', code )
      ? prop( replace( 'MENU', 'GRP', code ), asks )
      : contains( 'GRP', code )
        ? 'TABLE'
        : 'DETAIL';

export default getView;
