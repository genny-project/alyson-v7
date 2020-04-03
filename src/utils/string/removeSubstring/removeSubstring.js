import { isString } from '../..';

const removeSubstring = ( string, substring, options = {}) => {
  const {
    replaceWith = '',
  } = options;

  if ( !isString( string ) || !isString( substring )) return string;

  const newString = string.replace( substring, replaceWith );

  return newString;
};

export default removeSubstring;
