import { path } from 'ramda';

const getAgency = path( ['attributes', 'LNK_AGENCY', 'value'] );

export default getAgency;
