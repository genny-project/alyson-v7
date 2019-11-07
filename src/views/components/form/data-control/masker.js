import { isObject } from '../../../../utils';

const maskCharacters = [
  'a', // alpha
  '0', // numeric
  '*', // alpha numeric
  'h', // hexidecimal
];

class Masker {
  applyMask( incomingValue, mask ) {
    const delimiterPositions = this.getDelimiterPosition( mask ); // get delimiter positions

    // const delimiterPositionsArray = Object.entries( delimiterPositions );
    const delimiterPositionsArray = Object.keys( delimiterPositions );

    const incomingCharacterArray = incomingValue.split( '' ); // array values from the incoming string

    // console.warn({ incomingCharacterArray, delimiterPositionsArray, delimiterPositions }); //eslint-disable-line
    const newArr = [];

    // convert the incoming value into an array, then loop over each character
    incomingCharacterArray.forEach(( incomingCharacter, index ) => {
      if ( index + 1 > mask.length ) return;
      // array of delimiters, where the value is the index of the delimiter in the mask string
      // use the index of the incoming character array to check for the existence of the mask character

      const isDelimiterIndex = delimiterPositionsArray.includes( index.toString());
      const delimiterCharacter = delimiterPositions[index];

      if ( isDelimiterIndex ) {
        if ( delimiterPositionsArray[index] !== incomingCharacter ) {
          // insert delimiter character to value array
          newArr.splice( index, 0, delimiterCharacter );
        }
      }
      else if ( this.isCharacterValid( incomingCharacter, mask.charAt( index ))) {
        // insert incoming character to value array
        newArr.push( incomingCharacter );
      }
    });

    return newArr.join( '' );
  }

  isCharacterValid = ( valueCharacter, maskCharacter ) => {
    // check character against the mask value, if it is allowed return true;

    const testValue = ( regex ) => regex.test( valueCharacter );

    switch ( maskCharacter ) {
      case 'a':
        return testValue( /^[a-zA-Z]$/ );
      case '0':
        return testValue( /^\d$/ );
      case 'h':
        return testValue( /^[0-9a-fA-F]$/ );
      case '*':
        return testValue( /^\w$/ );
      default:
        return true;
    }
  };

  getDelimiterPosition = ( mask ) => {
    // delimiters are all non mask characters
    const maskValArr = mask.split( '' );
    const delimiters = {};

    // loop over each character
    maskValArr.forEach(( maskValue, i ) => {
      // use list of mask characters to find delimiters
      if ( !maskCharacters.includes( maskValue )) {
        if ( isObject( delimiters )) {
          if ( !delimiters[i] ) {
            delimiters[i] = maskValue;
          }
        }
      }
    });

    return delimiters;
  };
}

export default new Masker();
