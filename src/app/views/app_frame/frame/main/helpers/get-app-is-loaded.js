import { prop } from 'ramda';
import getProjectKey from './get-project-key';

const getAppIsLoaded = ({ rootFrame, asks, attributes }) =>
  rootFrame && getProjectKey( asks ) && prop( getProjectKey( asks ), attributes );

export default getAppIsLoaded;
