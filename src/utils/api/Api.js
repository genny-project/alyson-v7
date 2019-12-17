import 'rxjs/add/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';
import queryString from 'query-string';
import config from '../../config';
import store from '../../redux/store';
import { isObject, isArray } from '../../utils';

class Api {
  observableCall = ( options = {}) => {
    return Observable.ajax({
      timeout: 30000,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
  }

  promiseCall = ( options = {}) => {
    return axios({
      timeout: 30000,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
  }

  gennyCall = ( options = {}) => {
    return this.observableCall({
      ...options,
      url: `${config.genny.host}/${options.url}`,
    });
  }

  eventCall = options => {
    return this.gennyCall({
      ...options,
      url: `${config.genny.bridge.endpoints.events}/${options.url}`,
    });
  }

  googleMapsCall = async ( options = {}) => {
    const queryPrefix = (
      options.url &&
      options.url.includes( '?' )
    )
      ? '&'
      : '?';

    const { keycloak } = store.getState();

    let apiKey = (
      process.env.ENV_GOOGLE_MAPS_APIKEY ||
      ( keycloak.data && keycloak.data.ENV_GOOGLE_MAPS_APIKEY )
    );

    /* If we can't find an API key, use the below util to keep trying. */
    if ( !apiKey ) {
      try {
        let counter = 0;
        const MAX_ATTEMPTS = 20;

        /* Keep trying to find the Google API key through an interval loop. */
        await new Promise(( resolve, reject ) => {
          this.interval = setInterval(() => {
            const { data } = store.getState().keycloak;

            if ( isObject( data, { withProperty: 'ENV_GOOGLE_MAPS_APIKEY' })) {
              clearInterval( this.interval );
              apiKey = data.ENV_GOOGLE_MAPS_APIKEY;
              resolve();
            }
            else if ( ++counter > MAX_ATTEMPTS ) {
              reject();
              clearInterval( this.interval );
            }
          }, 200 );
        });
      }
      /* If it doesn't happen within MAX_ATTEMPTS, stop trying. */
      catch ( error ) {
        // do nothing, let the network request fail so we can debug easier
      }
    }

    return this.promiseCall({
      ...options,
      url: `https://maps.googleapis.com/maps/api/${options.url}${queryPrefix}key=${apiKey}`,
    });
  }

  getPlaceAutocomplete = ( options = {}) => {
    const query = queryString.stringify({
      input: options.address,
    });

    return this.googleMapsCall({
      method: 'get',
      url: `place/autocomplete/json?${query}`,
    });
  }

  getGeocodedAddress = ( components ) => {
    const query = queryString.stringify( components );

    return this.googleMapsCall({
      method: 'get',
      url: `geocode/json?${query}`,
    });
  }

  getKeycloakConfig = () => {
    let initUrl;

    if ( process.env.NODE_ENV === 'development' ) {
      initUrl = process.env.ENV_GENNY_INIT_URL;
    }

    else {
      initUrl = process.env.ENV_GENNY_BRIDGE_URL;
    }

    /* Default to the env var if set, otherwise use the current URL as the init URL. */
    if ( !initUrl ) {
      /* This will only work on web, so ensure `location` is defined. */
      if ( typeof window !== 'undefined' && window.location ) {
        const { protocol, hostname, port } = window.location;
        const currentUrl = `${protocol}//${hostname}:${port}`;

        initUrl = currentUrl;
      }
    }

    return this.eventCall({
      url: `init?url=${initUrl}`,
    });
  }

  postMediaFile = async ( options = {}) => {
    const token = store.getState().keycloak.accessToken;
    const keycloakData = store.getState().keycloak.data;
    const mediaURL = `${keycloakData.ENV_MEDIA_PROXY_URL}`;
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `bearer ${token}`,
    };

    const result = await this.promiseCall({
      method: 'POST',
      url: mediaURL,
      headers: headers,
      timeout: 10000,
      ...options,
    });

    if ( isArray( result.data.files )) {
      result.data.files.forEach( file => {
        file['url'] = `${mediaURL}/${file.uuid}`;
      });
    }

    return result;
  }

  deleteMediaFile = async ( fileURL ) => {
    const token = store.getState().keycloak.accessToken;
    const headers = {
      Authorization: `bearer ${token}`,
    };

    const result = await this.promiseCall({
      method: 'DELETE',
      url: fileURL,
      headers: headers,
      timeout: 10000,
    });

    return result;
  }
}

export default new Api();
