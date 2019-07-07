import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import { Text } from '../index';
import InputAddress from './address';
import InputAutocomplete from './autocomplete';
import InputDatePicker from './date-time/date-picker';
import InputTimePicker from './date-time/time-picker';
import InputDateTimePicker from './date-time/date-time-picker';
import InputFile from './file';
import InputScroll from './scroll';
import InputRating from './rating';
import InputText from './text';
// import InputTextWithStateThemes from './text/InputTextWithStateThemes';
import InputTextArea from './textarea';
import Switch from './switch';
import Passcode from './passcode';
import InputRead from './read';
import InputCurrency from './currency';
import InputCreditCard from './credit-card';
import InputPayment from './payment';
import AudioRecord from './audio-record';
import SegmentedControl from './segmented-control';
import InputTag from './tag';
import InputMenu from './menu';
import InputEvent from './event';
import Signature from './signature';
import RichTextEditor from './rich-text-editor';
import InputImage from './image';
import InputSort from './sort';
import InputBoolean from './input-boolean';
import CheckBoxList from './checkbox-list';

/* maps the component to  */

class Input extends Component {
  static propTypes = {
    type: string.isRequired,
    typeOnlyProps: object,
    question: object,
    theme: object,
    onChangeState: func,
  };

  state = {
    active: false,
    hover: false,
  };

  blur() {
    if ( this.input && this.input.blur ) {
      this.input.blur();
    }
  }

  focus() {
    if ( this.input && this.input.focus ) {
      this.input.focus();
    }
  }

  handleStateChange = newState => {
    this.setState(
      state => ({
        ...state,
        ...newState,
      }),
      () => {
        if ( this.props.onChangeState ) this.props.onChangeState( this.state );
      }
    );
  };

  render() {
    const { type, ...restProps } = this.props;

    const inputProps = {
      ...restProps,
      type,
    };

    switch ( type ) {
      case 'text':
      case 'abn number':
      case 'acn number':
      case 'double':
        return (
          <InputText
            {...inputProps}
            ref={input => ( this.input = input )}
            onChangeState={this.handleStateChange}
          />
        );

      case 'password':
        return (
          <InputText
            {...inputProps}
            type="text"
            secureTextEntry
            ref={input => ( this.input = input )}
          />
        );

      case 'email':
        return (
          <InputText
            keyboardType="email-address"
            {...inputProps}
            ref={input => ( this.input = input )}
            onChangeState={this.handleStateChange}
          />
        );

      case 'textarea':
        return (
          <InputTextArea
            multiline
            numberOfLines={2}
            {...inputProps}
            ref={input => this.input = input}
            onChangeState={this.handleStateChange}
          />
        );

      case 'number':
      case 'java.lang.integer':
      case 'java.lang.long':
      case 'java.lang.Long':
      case 'java.lang.Integer':
      case 'mobile':
      case 'landline':
        return (
          <InputText
            keyboardType="phone-pad"
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'currency':
      case 'org.javamoney.moneta.money':
        return (
          <InputCurrency
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'boolean':
        return (
          <InputBoolean
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'java.lang.boolean':
      case 'switch':
        return (
          <Switch
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'read':
      case 'termsandconditions':
        return (
          <InputRead
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'scroll':
        return (
          <InputScroll
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'rating':
        return (
          <InputRating
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'autocomplete':
        return (
          <InputAutocomplete
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'address':
        return (
          <InputAddress
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'dropdown':
        return (
          // <InputDropdown
          //   {...inputProps}
          //   ref={input => this.input = input}
          // />
          <InputTag
            {...inputProps}
            placeholder="Please select..."
            allowMultipleSelection={false}
            allowNewTags={false}
            ref={input => ( this.input = input )}
          />
        );

      case 'checkbox':
      case 'checkboxmultiple':
        return (
          <InputEvent {...inputProps} />
        );

      case 'radio':
        return (
          <InputEvent {...inputProps} />
        );

      case 'file':
      case 'upload':
        return (
          <InputFile
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'filemultiple':
      case 'uploadmultiple':
        return (
          <InputFile
            {...inputProps}
            multiple
            ref={input => ( this.input = input )}
          />
        );

      case 'image':
      case 'Image':
        return (
          <InputImage
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'imagemultiple':
      case 'Imagemultiple':
      case 'images':
        return (
          <InputFile
            {...inputProps}
            multiple
            imageOnly
            ref={input => ( this.input = input )}
          />
        );

      case 'date':
      case 'java.time.localdate':
        return (
          <InputDatePicker
            {...inputProps}
            date
            ref={input => ( this.input = input )}
          />
        );

      case 'time':
        return (
          <InputTimePicker
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'datetime':
      case 'java.time.localdatetime':
        return (
          <InputDateTimePicker
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'mobileverification':
        return (
          <Passcode
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'codeverificationfive':
      case 'codeVerificationFive':
        return (
          <Passcode
            {...inputProps}
            numberOfInputs={5}
            keyboardType="default"
            ref={input => ( this.input = input )}
          />
        );

      case 'credit-card':
        return (
          <InputCreditCard
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );
      case 'payment':
        return (
          <InputPayment
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'audioRecord':
      case 'audiorecord':
        return (
          <AudioRecord
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'segmentedcontrol':
        return (
          <SegmentedControl
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'dropdownmultiple':
        return (
          <InputTag
            {...inputProps}
            placeholder="Please select..."
            allowMultipleSelection
            allowNewTags={false}
            ref={input => ( this.input = input )}
          />
        );
      case 'tag':
        return (
          <InputTag
            {...inputProps}
            allowMultipleSelection
            ref={input => ( this.input = input )}
          />
        );
      case 'signature':
        return <Signature {...this.props} />;

      case 'htmlarea':
      case 'rich-text-editor':
      case 'editor':
      case 'texteditor':
        return <RichTextEditor {...inputProps} />;

      case 'event':
        return <InputEvent {...inputProps} />;

      case 'menu':
        return (
          <InputMenu
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'sort':
        return <InputSort {...inputProps} />;

      case 'questionname':
        return (
          <Text
            {...inputProps}
            text={this.props.question.name}
          />
        );

      default:
        return (
          <Text>
            Invalid type `
            {type}
            ` specified in Input
          </Text>
        );
    }
  }
}

export default Input;
