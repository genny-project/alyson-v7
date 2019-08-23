import React, { Component } from 'react';
import { any, object, oneOf } from 'prop-types';
import validatorABN from 'au-bn-validator';
import Masker from './masker';
// render props to handle the state for applying the masks

const equalsIgnoreCase = ( value, expectedValue ) => {
  const val = value.toLowerCase();
  const expectedVal = expectedValue.toLowerCase();

  if ( val === expectedVal ) {
    return true;
  }

  return false;
};

class WithMask extends Component {
  static defaultProps = {
    mask: {
      maskValue: '###-###-###',
    },
  }

  static propTypes = {
    children: any,
    mask: object, // eslint-disable-line
    ask: object,
  }

  state = {
    displayValue: '',
    value: '',
    valueLength: 0,
  }

  // handleChange func
  handleChange = ( vall ) => {
    console.warn( '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', this.props.mask );
    console.warn({ vall }, 'VALUE FROM HANDLE CHANGE' ); //eslint-disable-line
    // if ( this.props.mask !== null ) {
    //   console.warn( 'NO MASK' );
    //   if ( this.props.editable === false || this.props.disabled )
    //     return null;

    //   const newValue = vall;

    //   this.setState({
    //     valueLength: newValue.length,
    //     value: newValue,
    //   });

    //   if ( this.props.onChangeText )
    //     this.props.onChangeText( newValue );

    //   return;
    // }

    const dataType = 'PASSWORD';

    const val = vall;

    if ( equalsIgnoreCase( dataType, 'EMAIL' )) {
      this.handleEmailValidation( val );

      return  ;
    }

    if ( equalsIgnoreCase( dataType, 'ABN' )) {
      this.handleABNValidation( val );

      return; // exit handle change after this line
    }

    if ( equalsIgnoreCase( dataType, 'ACN' )) {
      this.handleACNValidation( val );

      return;
    }

    if ( equalsIgnoreCase( dataType, 'PASSWORD' )) {
      console.warn( 'INSIDE PASSWORD triggered' ); //eslint-disable-line
      this.handlePasswordValidation ( val );

      return;
    }

    if ( equalsIgnoreCase( dataType, 'DOUBLE' )) {
      this.handleDoubleValidation( val );

      return;
    }

    if ( equalsIgnoreCase( dataType, 'FLOATINGPOINT' )) {
      this.handleABNValidation( val );

      return;
    }

    const value = Masker.applyMask2( val, '00(000)-000-0000', ['-','(',')'] , this.props.mask.type );

    if ( this.state.displayValue !== value ) {
      this.setState({
        displayValue: value,
      });
    }
  }

  handleABNValidation = ( value ) => {
    validatorABN.validateABN( value );
  }

  handleACNValidation = ( value ) => {
    validatorABN.validateACN( value );
  }

  handleMediCareValidation = ( value ) => {
    validatorABN.validateMedicareNumber( value );
  }

  handleTFNValidation = ( value ) => {
    validatorABN.validateTFN( value );
  }

  handleEmailValidation = ( emailValue ) => {
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validBoolean = emailRegex.test( emailValue );

    this.setState({
      displayValue: emailValue,
    });

    return validBoolean;
  }

  handlePasswordValidation = ( val = '' ) => {
    console.log({ val });
    console.log( typeof val );
    const valueArr = val.split( '' );
    const passwordArr = valueArr.map(() => '*' );
    const passwordString = passwordArr.join( '' );

    console.log({ passwordString });  //eslint-disable-line
    this.setState({
      displayValue: passwordString,
    });
  }

  handleDoubleValidation = ( value ) => {
    // Working for Number and String data type and a double data type inside that
    // const a = 13123.123 ==> Valid
    // const a = '13123.123'  ==> Also Valid even though the data is inside the string
    // do a if check if only absoulte double is required
    const regexValue = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;

    const isValid = regexValue.test( value );

    this.setState({
      displayValue: value,
    });

    console.warn( isValid ); // eslint-disable-line

    return isValid;
  }

  render() {
    const { children, ...restProps } = this.props;
    const { displayValue } = this.state;

    console.warn( 'render DataControl wrapper' );

    return (
      children({
        // handleChangeValue: this.handleChange,
        ...restProps,
        onChangeValue: () => console.log( 'data control change value intercept' ),
        onChangeText: () => console.log( 'data control change text intercept' ),
        onBlur: () => console.log( 'data control blur intercept' ),
        displayValue: !this.props.mask ? this.state.value : displayValue,
      })
    );
  }
}

export default WithMask;
