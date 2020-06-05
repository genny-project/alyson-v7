import { contains, length, prop, replace, keys } from 'ramda';

const getView = ({ viewing: { parentCode = '', code = '' }, asks }) =>
  contains( 'DASHBOARD', code )
    ? 'DASHBOARD'
    : contains( 'MENU', parentCode )
      ? prop( replace( 'MENU', 'GRP', code ), asks )
      : contains( 'GRP', parentCode )
        ? 'TABLE'
        : 'DETAIL';

export default getView;
