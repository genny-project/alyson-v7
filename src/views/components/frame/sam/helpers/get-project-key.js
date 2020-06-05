import { path } from 'ramda';

const getProjectKey = path( ['QUE_PROJECT_NAME_GRP', 'targetCode'] );

export default getProjectKey;
