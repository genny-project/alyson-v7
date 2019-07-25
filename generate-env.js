// Script to generate an env from details obtained from a server

const fs = require( 'fs' );
const axios = require( 'axios' );

const options = {};

process.argv.forEach( argument => {
  if ( argument.startsWith( '--' ) && argument.includes( '=' )) {
    // const variable = i.s( '===' );

    const splitIndex = argument.indexOf( '=' );

    const key = argument.slice( 2, splitIndex );
    const value = argument.slice( splitIndex + 1 );

    if ( key && value ) {
      options[key] = value;
    }
  }
});

const { url, force, default_env } = options;

const getVariablesFromUrl = ( url ) => {
  const projectStringStart = url.indexOf( '://' ) + 3;
  const projectStringEnd = url.indexOf( '-' );
  const environmentStringEnd = url.indexOf( '.' );

  const project = url.slice(
    projectStringStart,
    projectStringEnd < environmentStringEnd ? projectStringEnd : environmentStringEnd
  );
  const environment = url.slice(
    projectStringEnd + 1,
    projectStringEnd < environmentStringEnd ? environmentStringEnd : projectStringEnd + 1
  );

  return { project, environment };
};

const variablesFromUrl = getVariablesFromUrl( url );

if ( !variablesFromUrl.project || !variablesFromUrl.environment ) {
  if ( !variablesFromUrl.project ) {
  // eslint-disable-next-line no-console
    console.log( `Error: project not detected from variable ${url}` );
  }

  if ( !variablesFromUrl.environment ) {
  // eslint-disable-next-line no-console
    console.log( `Error: environment not detected from variable ${url}` );
  }

  if ( force !== 'true' )
    return;
}
const targetEnv = ( default_env !== 'true' && variablesFromUrl.project )
  ? `.env.${variablesFromUrl.project}${variablesFromUrl.environment ? `.${variablesFromUrl.environment}` : ''}`
  : '.env';

const parseURL = ( url ) => {
  const constructedUrl = `${url}/api/events/init?url=${url}&format=env`;

  return constructedUrl;
};

const getConfigFromBridge = async () => {
  // eslint-disable-next-line no-console
  console.log( 'Getting config details from server...' );

  await axios({
    method: 'get',
    url: parseURL( url ),
    timeout: 30000,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then( success => {
    // eslint-disable-next-line no-console
    console.log(
      'GET successful.'
    );

    if ( fs.existsSync( targetEnv ) && force !== 'true' ) {
      // eslint-disable-next-line no-console
      console.log(
        `Attempting to generate ${targetEnv} file when it already exists. ` +
        `If you wish to generate a new .${targetEnv} from your system's environment variables, ` +
        `please remove the existing ${targetEnv}`
      );

      return 0;
    }

    const envOutput = success.data;

    if ( envOutput === null || envOutput.length < 1 ) {
      // eslint-disable-next-line no-console
      console.log(
        `Attempting to generate ${targetEnv} file failed due to null or empty result`
      );

      return;
    };

    fs.writeFile( targetEnv, envOutput, err => {
      if ( err ) {
        // eslint-disable-next-line no-console
        console.log({ err });

        return;
      }

      // eslint-disable-next-line no-console
      console.log( `Succesfully generated ${targetEnv}` );
    });
  }).catch( error => {
    console.error( error );

    return;
  });
};

getConfigFromBridge();
