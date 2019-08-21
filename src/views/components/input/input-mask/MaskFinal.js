import React, { Component } from 'react';
import WithMask from './WithMask';
import InputText from '../text';

class MaskFinal extends Component {
  render() {
    return (
      <div style={{ margin: '100px', padding: '100px' }}>      
        <WithMask>
          {
          (
            {
              handleChange,  // handle value change
              displayValue,  // value for displaying in the input field
              handleFocus,
              ...restProps
            }
          ) => {
            {console.warn( 'Rest props inside mask final',{ restProps });} //eslint-disable-line

            return (

              <InputText
                {...restProps}
                onChange={handleChange}
                value={displayValue}
                handleFocus={handleFocus}
                
              />
            );
          }
        }
        </WithMask>
      </div>
    );
  }
}

export default MaskFinal;

// <input
//                 style={{ width: '400px',
//                   height: '40px',
//                   border: '1px soild grey',
//                   outlineColor: 'green',
//                   color: '#636161',
//                   fontSize: '16px', 
//                 }}
//                 value={displayValue}
//                 onChange={handleChange}
//                 onFocus={handleFocus}
//               />
