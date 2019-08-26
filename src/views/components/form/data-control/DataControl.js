import { Component } from 'react';
import { any, object, string, func } from 'prop-types';
import validatorABN from 'au-bn-validator';
import Masker from './masker';
import { isString } from '../../../../utils';

const types = [
  'email','abn','acn','password','double','floatingpoint',
];

class DataControl extends Component {
  static defaultProps = {
    // mask: {
    //   maskValue: '###-###-###',
    // },
  }

  static propTypes = {
    children: any,
    // mask: object, // eslint-disable-line
    ask: object,
    type: string,
    error: string,
    onChangeValue: func,
    onBlur: func,
  }

  state = {
    maskedValue: '',
    // value: '',
    // valueLength: 0,
    error: null,
  }

  handleBlur = () => {
    console.log( 'blur intercept' );
    console.log( 'error', this.state.error );
    if ( !isString( this.state.error )) {
      if ( this.props.onBlur ) {
        this.props.onBlur();
      }
    }
  }

  handleChangeValue = ( value ) => {
    console.log( 'change value intercept' );
    if ( !isString( this.state.error )) {
      if ( this.props.onChangeValue ) {
        this.props.onChangeValue( value );
      }
    }
  }

  // handleChange func
  handleChangeText = ( value ) => {
    console.log( 'change text intercept' );
    const { type } = this.props;
    const dataType = type.toLowerCase();

    if ( this.props.mask ) {
      console.log( 'pure value', value );
      const maskedValue = Masker.applyMask2( value, '00(000)-000-0000', ['-','(',')'] , this.props.mask.type );

      console.log( 'maskedValue', maskedValue );

      if ( this.state.maskedValue !== maskedValue ) {
        this.setState({
          maskedValue,
        });
      }
    }

    switch ( dataType ) {
      case 'email':
        this.handleEmailValidation( value );
        break;
      case 'abn':
        this.handleABNValidation( value );
        break;
      case 'acn':
        this.handleACNValidation( value );
        break;
      case 'password':
        this.handlePasswordValidation ( value );
        break;
      case 'double':
        this.handleDoubleValidation( value );
        break;
      case 'floatingpoint':
        this.handleABNValidation( value );
        break;
      default:
        // eslint-disable-next-line no-console
        // console.warn( `data type '${type}' does not have a validation` );
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
    console.log( 'email validation' );
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validBoolean = emailRegex.test( emailValue );

    console.log( 'test', validBoolean );
    this.setState({
      // displayValue: emailValue,
      error: !validBoolean ? 'Please enter a valid email address' : null,
    });
  }

  handlePasswordValidation = ( val = '' ) => {
    console.log({ val });
    console.log( typeof val );
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
    const { children, ...restProps } = this.props;
    const {
      maskedValue,
      error,
    } = this.state;

    // if data control is not required, then return children with all props
    if (
      !types.includes( this.props.type ) &&
      !this.props.mask
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

    console.log( 'this.state.maskedValue', maskedValue, !this.props.mask );

    return (
      children({
        ...restProps,
        onChangeValue: this.handleChangeValue,
        onChangeText: this.handleChangeText,
        onBlur: this.handleBlur,
        value: this.props.mask ? maskedValue : this.props.value,
        updateValueWhenFocused: this.props.mask ? true : null,
        placeholder: this.props.mask ? '00(000)-000-0000' : null, // input mask.placeholder ?? or just placeholder
        error: isString( error ) ? error : this.props.error,
      })
    );
  }
}

export default DataControl;
