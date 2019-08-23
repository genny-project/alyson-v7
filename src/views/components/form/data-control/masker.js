import {  isInteger } from '../../../../utils';

// insert ========>>>>>>>>  prototype  Array extension  ===========>>>>>>>> //
Array.prototype.insert = function ( index, item ) {
  this.splice( index, 0, item );
};

class Masker {
  // Apply masking for a single delimeter string
  applyMaskForSingleDelimeter( incomingValue, mask, delimeter, dataType = 'number' ) {
    console.warn({ incomingValue }); //eslint-disable-line
    // eslint-disable-next-line
    const delimeterPositions = this.getDelimeterPosition( mask,delimeter ); // get delimeter positions
    const arrValues = this.convertStringToArray( incomingValue ); // array values from the incoming string
    const newArr = [];

    console.warn({ arrValues }); //eslint-disable-line
    arrValues.forEach(( item,index ) => {
      if ( delimeterPositions.includes( index )) { // HARD PART BEGINS HERE
        newArr.insert( index , delimeter );
      }
      else if ( this.isMatchDataType( dataType, item )) {
        newArr.push( item );
      }
    });

    return newArr.join( '' );
  }

  applyMask1( incomingValue, mask, delimeter, dataType = 'number' ) {
    console.warn({ incomingValue }); //eslint-disable-line
    // eslint-disable-next-line
    const delimeterPositions = this.getDelimeterPos( mask,delimeter ); // get delimeter positions
    const delimeterPositionsArr = Object.entries( delimeterPositions );
    const arrValues = this.convertStringToArray( incomingValue ); // array values from the incoming string
    const newArr = [];

    console.warn({ delimeterPositions }); 
    console.warn({ delimeterPositionsArr }); 
    console.warn({ arrValues });  

    let trigger = false;
    let val = [];
  
    arrValues.forEach(( item,index ) => {
      delimeterPositionsArr.forEach(( ii,i ) => {
        const singleDelimeter = delimeterPositionsArr[i][0];
        const delimetersArray = delimeterPositionsArr[i][1];

        if ( delimetersArray.includes( index )) {
          console.warn( 'DELIMETER', singleDelimeter ); // eslint-disable-line
          trigger = true;
          val = [index, singleDelimeter];
          // newArr.insert( index,delimeterPositionsArr[i][0] );
        }
        else if ( this.isMatchDataType( dataType, item )) {
          trigger = false;
          val = item;
          // newArr.push( item );
        }
      });

      if ( trigger === true ) {
        console.warn( 'DELIMETER INSIDE TRIGGER', val[0] ); //eslint-disable-line
        newArr.insert( val[0], val[1] );
      }

      else if ( trigger === false ) {
        newArr.push( val );
      }
    });
    console.warn({ newArr }); //eslint-disable-line

    return newArr.join( '' );
  }

  // Apply Mask
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

  // Get array Position of an Array
  getArrayPosition( arr,el ) {
    if ( arr.includes( el )) {
      return arr.indexOf( el );
    }
  }

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
     maskValArr.forEach(( el, i ) => {
       delimeters.forEach( dd => {
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

   getMaskedValues() {
     console.log( ' GET MASKED VALUES' ); //eslint-disable-line
   }

   getRealValues() {
     console.log( 'GET REAL VALUES' ); //eslint-disable-line
   }
}

export default new Masker();
