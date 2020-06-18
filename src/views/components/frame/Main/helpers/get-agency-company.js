import { path } from 'ramda';

const getAgencyCompany = agency => path( [agency, 'name'] );

export default getAgencyCompany;
