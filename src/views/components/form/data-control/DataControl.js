/* eslint-disable no-console */
import { Component } from 'react';
import { any, object, string, func } from 'prop-types';
import validatorABN from 'au-bn-validator';
import Masker from './masker';
import { isString, isObject } from '../../../../utils';

const types = [
  'email','abn','acn','password','double','floatingpoint',
];

const keyfilters = {
  pint: /^[0-9]+$/, // Positive integers
  int: /^[0-9-]+$/, // Integers
  pnum: /^[0-9.]+$/, // Positive numbers
  num: /^[0-9.-]+$/, // Numbers
  alpha: /^[a-zA-Z]+$/, // Alphabetic
  alphanum: /^[a-zA-Z0-9]+$/, // Alphanumeric
};

class DataControl extends Component {
  static defaultProps = {
    // keyfilter: 'pnum',
  }

  static propTypes = {
    children: any,
    mask: string,
    keyfilter: string,
    ask: object,
    type: string,
    error: string,
    onChangeValue: func,
    onBlur: func,
    value: any,
  }

  state = {
    maskedValue: '',
    // value: '',
    // valueLength: 0,
    error: null,
  }

  componentDidMount() {
    if ( this.props.value )
      this.setState({
        maskedValue: this.props.value,
      });
  }

  componentDidUpdate( prevProps, prevState ) {
    if (
      ((
        prevProps.value !== this.props.value &&
        this.state.value !== this.props.value
      ) ||
        prevState.value !== this.state.value
      ) &&
      (
        !this.state.maskedValue
      )
    ) {
      this.updateValue( this.props.value );
    }
  }

  updateValue = ( value ) => {
    this.setState({
      maskedValue: value,
    });
  }

  handleBlur = () => {
    if ( !isString( this.state.error )) {
      if ( this.props.onBlur ) {
        this.props.onBlur();
      }
    }
  }

  handleChangeValue = ( value ) => {
    if ( !isString( this.state.error )) {
      if ( this.props.onChangeValue ) {
        console.log(  this.props.onChangeValue );
        this.props.onChangeValue( value );
      }
    }
  }

  // handleChange func
  handleChangeText = ( value ) => {
    const { type, mask, keyfilter } = this.props;
    const dataType = type.toLowerCase();

    if ( mask ) {
      const maskedValue = Masker.applyMask( value, mask );

      if ( this.state.maskedValue !== maskedValue ) {
        this.setState({
          maskedValue,
        });
      }
    }

    if ( keyfilter ) {
      const isValueValid = isObject( keyfilters, { withProperty: keyfilter })
        ? keyfilters[keyfilter].test( value )
        : keyfilter.test( value );

      if ( isValueValid || value == null || value.length === 0 ) {
        this.setState({
          maskedValue: value,
        });
      }
    }

    switch ( dataType ) {
      case 'email':
        this.handleEmailValidation( value );
        break;
      // case 'abn':
      // case 'abn number':
      //   this.handleABNValidation( value );
      //   break;
      // case 'acn':
      //   this.handleACNValidation( value );
      //   break;
      // case 'password':
      //   this.handlePasswordValidation ( value );
      //   break;
      // case 'double':
      //   this.handleDoubleValidation( value );
      //   break;
      // case 'floatingpoint':
      //   this.handleABNValidation( value );
        // break;
      default:
        // eslint-disable-next-line no-console
        // console.warn( `data type '${type}' does not have a validation` );
    }
  }

  handleABNValidation = ( value ) => {
    const result = validatorABN.validateABN( value ); // eslint-disable-line
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
      // displayValue: emailValue,
      error: !validBoolean ? 'Please enter a valid email address' : null,
    });
  }

  handlePasswordValidation = ( val = '' ) => {
    const valueArr = val.split( '' );
    const passwordArr = valueArr.map(() => '*' );
    const passwordString = passwordArr.join( '' );

    console.log({ passwordString });  //eslint-disable-line
    // this.setState({
    //   displayValue: passwordString,
    // });
  }

  handleDoubleValidation = ( value ) => {
    // Working for Number and String data type and a double data type inside that
    // const a = 13123.123 ==> Valid
    // const a = '13123.123'  ==> Also Valid even though the data is inside the string
    // do a if check if only absoulte double is required
    const regexValue = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;

    const isValid = regexValue.test( value );

    // this.setState({
    //   displayValue: value,
    // });

    console.warn( isValid ); // eslint-disable-line

    return isValid;
  }

  render() {
    const { children, mask, keyfilter, ...restProps } = this.props;
    const {
      maskedValue,
      error,
    } = this.state;

    // if data control is not required, then return children with all props
    if (
      !types.includes( this.props.type ) &&
      !mask &&
      !keyfilter
    ) {
      return (
        children({
          ...restProps,
        })
      );
    }

    /* things to do
      1/ key restrict -> onChangeText, only allow certain keypresses to pass through
      2/ mask -> onChangeText, force each character to fit predescribed pattern
      3/ realtime validation -> onChangeText, run regex to check if field is valid
      4/ filter errors for child
      5/ stop onChangeValue and onBlur events from passing upwards if value is not a valid answer
    */

    const useMaskedValue = mask != null || keyfilter != null;

    return (
      children({
        ...restProps,
        onChangeValue: this.handleChangeValue,
        onChangeText: this.handleChangeText,
        onBlur: this.handleBlur,
        value: useMaskedValue ? maskedValue : this.props.value,
        updateValueWhenFocused: useMaskedValue ? true : null,
        // placeholder: mask ? mask : null, // input mask.placeholder ?? or just placeholder
        error: isString( error ) ? error : this.props.error,
      })
    );
  }
}

export default DataControl;
