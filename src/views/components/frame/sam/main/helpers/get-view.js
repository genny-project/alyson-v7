import { contains, prop, replace } from 'ramda';
import getBackendViewing from '../../helpers/get-backend-viewing';

const getView = ({ viewing: { parentCode = '', code = '' }, asks, frames }) =>
  contains('BUCKET', code)
  ? 'BUCKET'
   : getBackendViewing( frames ) === 'TABLE'
    ? 'TABLE'
    : getBackendViewing( frames ) === 'UNITY'
      ? 'UNITY'
      : contains( 'DASHBOARD', code )
        ? 'DASHBOARD'
        : contains( 'MENU', code )
          ? prop( replace( 'MENU', 'GRP', code ), asks )
          : contains( 'GRP', parentCode )
            ? 'TABLE'
            : 'DETAIL';

export default getView;
