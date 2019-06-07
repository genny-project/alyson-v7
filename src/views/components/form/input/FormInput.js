import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import debounce from 'lodash.debounce';
import { Input } from '../../index';
import FormInputDropdown from './dropdown';
import FormInputCheckbox from './checkbox';

/*
1. This component handles higher level data and passes them to individual components
2. How the data is submitted like debouncing and not deboucing while sending the data to backend
*/
class FormInput extends Component {
  static propTypes = {
    type: string.isRequired,
    question: object,
    onChangeValue: func.isRequired,
    ask: object,
  };

  constructor( props ) {
    super( props );

    this.handleChangeDebounced = debounce( this.handleChangeDebounced, 300 );
  }

  focus() {
    if ( this.input && this.input.focus ) {
      this.input.focus();
    }
  }

  handleChangeDebounced = ( value, withSend ) => {
    this.props.onChangeValue( value, withSend );
  };

  handleChangeValueWithSend = value => {
    this.props.onChangeValue( value, true );
  };

  handleChangeValueWithSendAndDebounce = value => {
    this.handleChangeDebounced( value, true );
  };

  render() {
    const { type, question } = this.props;

    const inputProps = {
      ...this.props,
    };

    switch ( type ) {
      case 'termsandconditions':
        return (
          <Input
            {...inputProps}
            html={question.html}
            onChangeValue={this.handleChangeValueWithSend}
            ref={input => ( this.input = input )}
          />
        );

      case 'segmentedcontrol':
      case 'dropdown':
      case 'dropdownmultiple':
      case 'tag':
      case 'menu':
      case 'checkboxmultiple':
      case 'radio':
        return (
          <FormInputDropdown
            {...inputProps}
            onChangeValue={this.handleChangeValueWithSendAndDebounce}
            ref={input => ( this.input = input )}
          />
        );

      case 'switch':
      case 'java.lang.boolean':
      case 'boolean':
      case 'payment':
      case 'audioRecord':
      case 'audiorecord':
      case 'date':
      case 'java.time.localdate':
      case 'datetime':
      case 'codeverificationfive':
      case 'codeVerificationFive':
      case 'mobileverification':
      case 'java.time.localdatetime':
      case 'htmlarea':
      case 'rich-text-editor':
        return (
          <Input
            {...inputProps}
            onChangeValue={this.handleChangeValueWithSendAndDebounce}
            ref={input => ( this.input = input )}
          />
        );

      case 'file':
      case 'upload':
      case 'filemultiple':
      case 'uploadmultiple':
      case 'image':
      case 'Image':
      case 'imagemultiple':
      case 'Imagemultiple':
      case 'images':
      case 'signature':
        return (
          <Input
            {...inputProps}
            onChangeValue={this.handleChangeValueWithSend}
            ref={input => ( this.input = input )}
          />
        );

      default:
        return (
          <Input
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );
    }
  }
}

export default FormInput;
