import { isString } from '../../../utils';

const trimAndAppendDots = ( string, number = 10 ) => {
  if ( !isString( string, { ofMinLength: number - 3 })) return string;

  return `${string.substring( 0, number - 3 )}...`;
};

export default trimAndAppendDots;
