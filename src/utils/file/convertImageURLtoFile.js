import { isString } from '../../utils';

const convertImageURLtoFile = ( url, options = {}) => {
  const {
    name = 'file.png',
  } = options;

  if ( !isString( url )) return null;

  var arr = url.split( ',' ); var mime = arr[0].match( /:(.*?);/ )[1];

  var bstr = atob( arr[1] ); var n = bstr.length; var u8arr = new Uint8Array( n );

  while ( n-- ) {
    u8arr[n] = bstr.charCodeAt( n );
  }

  return new File( [u8arr], name, { type: mime });
} ;

export default convertImageURLtoFile;
