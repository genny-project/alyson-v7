import {  isInteger } from '../../../../utils';

const maskCharacters = [
  'a', '9', '*',
];

// insert ========>>>>>>>>  prototype  Array extension  ===========>>>>>>>> //
Array.prototype.insert = function ( index, item ) {
  this.splice( index, 0, item );
};

class Masker {
  setFields = ( formattedDate ) => {
    const selectionValuesForInputSections = ( datestring ) => {
      return datestring.split( separatorRegex );
    };

    const findMatchInFormatFields = ( string ) => {
      let value = null;

      Object.keys( dateTimeFormats ).some( fieldKey => {
        const findMatch = dateTimeFormats[fieldKey].some( formatString => {
          const isMatch = formatString === string;

          if ( isMatch ) value = fieldKey;

          return isMatch;
        });

        return findMatch;
      });

      return value;
    };

    const split = selectionValuesForInputSections( formattedDate );

    const fields = {};
    const inputs = {};

    split.forEach(( s, index ) => {
      const field = findMatchInFormatFields( s );

      if ( isString( field )) {
        fields[index] = {
          value: s,
          length: s.length,
          type: field,
        };

        inputs[Object.keys( inputs ).length] = field;
      }
      else {
        fields[index] = {
          value: s,
          length: s.length,
          type: 'separator',
        };
      }
    });

    this.selectionFields = fields;
    this.inputSections = inputs;
  }

  applyMask2( incomingValue, mask, delimeter, dataType ) {
    const delimeterPositions = this.getDelimeterPos( mask,delimeter ); // get delimeter positions

    const delimeterPositionsArr = Object.entries( delimeterPositions );

    const arrValues = this.convertStringToArray( incomingValue ); // array values from the incoming string

    console.warn({ arrValues }); //eslint-disable-line
    console.warn({ delimeterPositionsArr }); //eslint-disable-line
    console.warn({ delimeterPositions }); //eslint-disable-line
    const newArr = [];

    arrValues.forEach(( item,index ) => {
      delimeterPositionsArr.forEach(( ii,i ) => {
        // Another way of working with the data please donot delete
        // const delimetersArray = delimeterPositionsArr[i][1];
        // if ( delimetersArray.includes( index )) {
        //   // newArr[index] = delimeterPositionsArr[i][0];
        //   newArr.insert( index ,delimeterPositionsArr[i][0] );
        // }

        ii.forEach(( it, ind ) => {
          if ( delimeterPositionsArr[i][1][ind] === index ) {
            newArr.insert( index ,delimeterPositionsArr[i][0] );
          }
        });
      });

      if ( this.isMatchDataType( dataType, item )) {
        newArr.push( item );
      }
    });

    return newArr.join( '' );
  }

  // Data check match Returns a Boolean
  isMatchDataType( allowedDataType, character ) {
    if ( allowedDataType === 'number' ) {
      try {
        const a = parseInt( character ,10 );

        console.warn({ a }); //eslint-disable-line
        const b = isInteger( a );

        console.warn({ b }); //eslint-disable-line

        // throw new Error( ' EROOOOOOOOOOOOOOOOOOOOOOOOOOOOR' );

        return isInteger( a );
        // if ( isInteger( character ))  {
        //   return true;};
      }
      catch ( err ) {
          // We don't care, hands in the air
        console.error( err ); //eslint-disable-line
      }

      return;
    }

    if ( allowedDataType === 'string' ) {
      return true;
    }

    return true;
  }

  // Converts String into an Array
  convertStringToArray( string ) {
    const arr = string.split( '' );

    return arr;
  }

  /*
  // Get array Position of an Array
  getArrayPosition( arr,el ) {
    if ( arr.includes( el )) {
      return arr.indexOf( el );
    }
  }
  */

  /*
  // Get the positions for single delimeter
  getDelimeterPosition( mask, delimeter ) {
    const arrayFromMaskString = mask.split( '' );
    const arr = [];

    arrayFromMaskString.forEach(( element, i ) => {
      if ( element === delimeter ) {
        arr.push( i );
      }
    });
      // eslint-disable-next-line
      console.warn({ arr });

    return arr;
  };
  */

  // Get the Delimeter Positions for multiple delimeters
  /*
    Output = >
    {
      "-": [0,4,10],
      "(": [5],
      ")": [8]
    }
  */

  // get delimeter position for multiple positions
   getDelimeterPos = ( mask, delimeters ) => {
     const maskValArr = mask.split( '' );
     const a = {};

    // create an array
     console.log({ maskValArr, delimeters });
     maskValArr.forEach(( el, i ) => {
       delimeters.forEach( dd => {
         console.log( 'compare', { el, dd });
         if ( dd === el ) {
           a[dd] = [];
           console.log( i ); //eslint-disable-line
         }
       });
     });

     // append data to the created array above
     maskValArr.forEach(( el, i ) => {
       delimeters.forEach( dd => {
         if ( dd === el ) {
           a[dd].push( i );
         }
       });
     });

     return a;
   };

  /*
   getDelimeterPos = ( mask ) => {
    const maskValArr = mask.split( '' );
    const array = {};

   // create an array
    maskValArr.forEach(( character, i ) => {
      if ( maskCharacters.includes( character )) {
        array[dd] = [];
         console.log( i ); //eslint-disable-line
      }
    });

    // append data to the created array above
    maskValArr.forEach(( el, i ) => {
      delimeters.forEach( dd => {
        if ( dd === el ) {
          array[dd].push( i );
        }
      });
    });

    return a;
   };*/
}

export default new Masker();
