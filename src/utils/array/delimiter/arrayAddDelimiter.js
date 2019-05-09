import { isArray } from '../../../utils';

const arrayAddDelimiter = ( array, delimiter ) => {
  if ( !isArray( array )) return array;
  if ( isArray( array, { ofMaxLength: 1 })) return array;

  const newArray = [];

  array.forEach(( item, index ) => {
    newArray.push( item );

    if ( index < array.length - 1 ) {
      newArray.push( delimiter );
    }
  });

  return newArray;
};

export default arrayAddDelimiter;
