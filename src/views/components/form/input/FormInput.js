import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import debounce from 'lodash.debounce';
import { Field } from 'formik';
import { Input } from '../../index';
import FormInputWithItems from './input-with-items';

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

  // validateUsername = ( value ) => {
  //   let error;

  //   if ( value === 'admin' ) {
  //     error = 'Nice try!';
  //   }

  //   return error;
  // }

  handleChangeDebounced = ( value, withSend ) => {
    this.props.onChangeValue( value, withSend );
  };

  handleChangeValueWithSend = value => {
    // console.log( 'handleChangeValueWithSend' );
    this.props.onChangeValue( value, true );
  };

  handleChangeValueWithSendAndDebounce = value => {
    // console.log( 'handleChangeValueWithSendAndDebounce' );
    this.handleChangeDebounced( value, true );
  };

  render() {
    // console.log( 'inisde of formInput--->',this.props );
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
          <FormInputWithItems
            {...inputProps}
          >
            {({ items }) => {
              return (
                <Input
                  {...inputProps}
                  onChangeValue={this.handleChangeValueWithSendAndDebounce}
                  items={items}
                  ref={input => ( this.input = input )}
                />
              );
            }}
          </FormInputWithItems>
        );

      case 'switch':
      case 'java.lang.boolean':
      case 'boolean':
      case 'payment':
      case 'audioRecord':
      case 'audiorecord':
      case 'date':
      case 'time':
      case 'java.time.localdate':
      case 'datetime':
      case 'codeverificationfive':
      case 'codeVerificationFive':
      case 'mobileverification':
      case 'java.time.localdatetime':
      case 'htmlarea':
      case 'rich-text-editor':
      case 'editor':
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
      case 'address':
        return (
          <Input
            {...inputProps}
            onChangeValue={this.handleChangeValueWithSend}
            ref={input => ( this.input = input )}
          />
        );

      default:
        return (
          <Field
            name={this.props.ask.questionCode}
            // validate={this.validateUsername}
          >
            {() =>
              // { form, field }
            {
              return (
                <Input
                  {...inputProps}
                    // value={field.value}
                  ref={input => ( this.input = input )}
                />
              );
            }
            }
          </Field>
        );
    }
  }
}

export default FormInput;
