import { path } from 'ramda';

const getGoogleApiKey = path( ['data', 'ENV_GOOGLE_MAPS_APIKEY'] );

export default getGoogleApiKey;
