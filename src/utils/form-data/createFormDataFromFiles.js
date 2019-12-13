import { isFile, isFileList } from '..';

const createFormDataFromFiles = ( data, options = {}) => {
  const {
    name, // eslint-disable-line
  } = options;

  if (
    !isFile( data ) &&
    !isFileList( data )
  ) return null;

  const formData = new FormData();

  if ( isFileList( data )) {
    for ( const pair of data ) {
      formData.append( 'file', pair );
    }
  }
  else if ( isFile( data )) {
    formData.append( 'file', data );
  }

  return formData;
} ;

export default createFormDataFromFiles;
