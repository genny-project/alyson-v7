import { isFile } from '../../../utils';

const isFileList = ( filelist, options = {}) => {
  const {
    withName, // eslint-disable-line
  } = options;

  /* Ensure a valid object (and not an array - thanks JS!) is given. */
  if (
    filelist == null ||
    typeof filelist !== 'object' ||
    !( filelist instanceof FileList )
  ) {
    return false;
  }

  for ( let i = 0; i < filelist.length; i++ ) {
    const file = filelist[i];

    if ( !isFile( file )) {
      return false;
    }
  }

  return true;
};

export default isFileList;
