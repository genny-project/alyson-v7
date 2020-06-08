import { contains, length, prop, replace, keys } from 'ramda';
import getBackendViewing from '../../helpers/get-backend-viewing';
const getView = ({ viewing: { parentCode = '', code = '' }, asks, frames }) =>
  getBackendViewing(frames) === 'TABLE'
    ? 'TABLE'
    : contains('DASHBOARD', code)
      ? 'DASHBOARD'
      : contains('MENU', code)
        ? prop(replace('MENU', 'GRP', code), asks)
        : contains('GRP', parentCode)
          ? 'TABLE'
          : 'DETAIL';

export default getView;
