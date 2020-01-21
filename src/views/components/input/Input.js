/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { string, object, func, bool } from 'prop-types';
import { Text, DragDrop } from '../index';
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
import InputTextWithDynamicWidth from './text-with-dynamic-width';
import Switch from './switch';
import Passcode from './passcode';
import InputRead from './read';
import InputCurrency from './currency';
import InputCreditCard from './credit-card';
import InputPayment from './payment';
import AudioRecord from './audio-record';
import SegmentedControl from './segmented-control';
import InputTag from './tag';
import InputEvent from './event';
import Signature from './signature';
import RichTextEditor from './rich-text-editor';
// import InputImage from './image';
import InputSort from './sort';
import InputBoolean from './input-boolean';
import CheckBoxList from './checkbox-list';
import ColourPicker from './colour-picker';
import UnityButtons from './unity/buttons'; // TEMP
import Progress from './progress';
import HtmlEditor from './html-editor';

/* maps the component to  */

class Input extends Component {
  static propTypes = {
    type: string.isRequired,
    typeOnlyProps: object,
    question: object,
    theme: object,
    onChangeState: func,
    inputFieldProps: object,
    dynamicWidth: bool,
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
    const { type, dynamicWidth, inputFieldProps, ...restProps } = this.props;

    const inputProps = {
      ...restProps,
      type,
      dynamicWidth,
    };

    // console.log( 'thisprospinsideinput:', this );

    const TextInputElement = dynamicWidth ? InputTextWithDynamicWidth : InputText;

    switch ( type ) {
      case 'text':
      case 'abn number':
      case 'acn number':
      case 'double':
        return (
          <TextInputElement
            {...inputProps}
            {...inputFieldProps}
            ref={input => ( this.input = input )}
            onChangeState={this.handleStateChange}
          />
        );

      case 'password':
        return (
          <InputText
            {...inputProps}
            {...inputFieldProps}
            type="text"
            secureTextEntry
            ref={input => ( this.input = input )}
          />
        );

      case 'email':
        return (
          <TextInputElement
            keyboardType="email-address"
            {...inputProps}
            {...inputFieldProps}
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
            {...inputFieldProps}
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
          <TextInputElement
            keyboardType="phone-pad"
            {...inputProps}
            {...inputFieldProps}
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
            // inputFieldProps={inputFieldProps}
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
          <InputTag
            {...inputProps}
            allowMultipleSelection={false}
            allowNewTags={false}
            ref={input => ( this.input = input )}
          />
        );

      case 'checkbox':
      case 'checkboxmultiple':
        return (
          <CheckBoxList
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'radio':
        return (
          <CheckBoxList
            {...inputProps}
            radio
            ref={input => this.input = input}
          />
        );

      case 'file':
      case 'upload':
      case 'imagemultiple':
      case 'Imagemultiple':
      case 'images':
        return (
          <InputFile
            {...inputProps}
            ref={input => this.input = input}
          />
        );

      case 'image':
      case 'Image':
        return (
          <InputFile
            allowedFileTypes={['image/*']}
            {...inputProps}
            ref={input => this.input = input}
          />
        );

      case 'date':
      case 'java.time.localdate':
        return (
          <InputDatePicker
            {...inputProps}
            // inputFieldProps={inputFieldProps}
            date
            ref={input => ( this.input = input )}
          />
        );

      case 'time':
        return (
          <InputTimePicker
            {...inputProps}
            inputFieldProps={inputFieldProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'datetime':
      case 'java.time.localdatetime':
        return (
          <InputDateTimePicker
            {...inputProps}
            inputFieldProps={inputFieldProps}
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

      case 'html-editor':
      case 'htmleditor':
        return <HtmlEditor {...inputProps} />;

      case 'event':
      case 'buttonevent':
      case 'form previous submit':
      case 'form cancel next':
      case 'form submit':
      case 'button':
      case 'form submit cancel':
        return (
          <InputEvent
            {...inputProps}
            {...inputFieldProps}
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

      case 'color':
      case 'colour':
        return (
          <ColourPicker
            {...inputProps}
            {...inputFieldProps}
            ref={input => ( this.input = input )}
          />
        );

      /*

      case 'fill':
      case 'dndfill':
      case 'dragdropfill':
        console.warn( this.props.items );

        return (
          <DragDrop
            {...inputProps}
            ref={input => ( this.input = input )}
            bumpItems
            onChange={( e ) => console.log( 'handleChange', e )}
            code={this.props.ask.questionCode}
            content="Bananas are among the most important {{OPT_001}} crops on the planet. They come from a family of plants called Musa that are native to {{OPT_002}} and grown in many of the {{OPT_003}} areas of the world."
            // items={[
            //   {
            //     value: 'ITM_FOOD',
            //     label: 'food',
            //   },
            //   {
            //     value: 'ITM_YELLOW',
            //     label: 'yellow',
            //   },
            //   {
            //     value: 'ITM_SOUTHEAST_ASIA',
            //     label: 'Southeast Asia',
            //   },
            //   {
            //     value: 'ITM_AUSTRALIA',
            //     label: 'Australia',
            //   },
            //   {
            //     value: 'ITM_SOUTH_AMERICA',
            //     label: 'South America',
            //   },
            //   {
            //     value: 'ITM_WARMER',
            //     label: 'warmer',
            //   },
            //   {
            //     value: 'ITM_DRIEST',
            //     label: 'driest',
            //   },
            // ]}
            items={this.props.items}
          />
        );

      */

      case 'match':
      case 'dndmatch':
      case 'dragdropmatch':
        // console.warn( JSON.stringify( this.props.items ));

        return (
          <DragDrop
            {...inputProps}
            ref={input => ( this.input = input )}
            // onChangeValue={( e ) => console.log( 'handleChange', e )}
            code="CODE_4"
            // bumpItems
            zoneItemLimit={3}
            // content="Bananas are among the most important {{BOX}} crops on the planet. They come from a family of plants called Musa that are native to {{BOX}} and grown in many of the {{BOX}} areas of the world."
            groups={[
              {
                value: 'ZNE_ONE',
                label: '',
              },
            ]}
            // items={this.props.items}
            items={[
              {
                label: 'A) A hand-held light wand',
                value: 'SEL_DRAGDROP_ITEM_ONE',
                weight: 1,
              },
              {
                label: 'B) Good approach sight distance',
                value: 'SEL_DRAGDROP_ITEM_TWO',
                weight: 2,
              },
              {
                label: 'C) Knowledge of the local area',
                value: 'SEL_DRAGDROP_ITEM_THREE',
                weight: 3,
              },
              {
                label: 'D) An escape route / path',
                value: 'SEL_DRAGDROP_ITEM_FOUR',
                weight: 4,
              },
              {
                label: 'E) A light tower to illuminate them',
                value: 'SEL_DRAGDROP_ITEM_FIVE',
                weight: 5,
              },
              {
                label: 'F) Conspicuous clothing',
                value: 'SEL_DRAGDROP_ITEM_SIX',
                weight: 6,
              },
            ]}
            componentProps={{
              ['input-wrapper']: {
                flexDirection: 'column',
                // flexDirection: 'row',
              },
              ['input-selected-wrapper']: {
                // flexDirection: 'column',
                backgroundColor: '#ddd',
                flexDirection: 'row',
                flex: 1,
              },
              ['input-selected-dropzone']: {
                // backgroundColor: 'blue',
              },
              ['input-selected']: {
                backgroundColor: 'white',
                // width: '50%',
              },
              ['input-item-wrapper']: {
                // backgroundColor: 'green',
                padding: 10,
              },
              ['input-item-dropzone']: {
                flexDirection: 'row',
              },
              ['input-item']: {
                backgroundColor: 'white',
                marginRight: 5,
                marginBottom: 5,
              },
            }}
          />
        );

      /*

      case 'list':
      case 'dndlist':
      case 'dragdroplist':
        return (
          <DragDrop
            {...inputProps}
            ref={input => ( this.input = input )}
            onChange={( e ) => console.log( 'handleChange', e )}
            code="CODE_2"
            componentProps={{
              ['input-item-wrapper']: {
                flexDirection: 'column',
              },
            }}
            shuffleItems
            canReorderItems
            items={[
              {
                id: 1,
                name: 'Write a cool JS library',
              },
              {
                id: 2,
                name: 'Make it generic enough',
              },
              {
                id: 3,
                name: 'Write README',
              },
              {
                id: 4,
                name: 'Create some examples',
              },
              {
                id: 5,
                name:
                  'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
              },
              {
                id: 6,
                name: '???',
              },
              {
                id: 7,
                name: 'PROFIT',
              },
            ]}
          />
        );

      */

      case 'unitybuttons':
      case 'unity-buttons':
        return (
          <UnityButtons
            {...inputProps}
            ref={input => ( this.input = input )}
          />
        );

      case 'progress':
        return (
          <Progress
            {...inputProps}
            {...inputFieldProps}
            ref={input => this.input = input}
          />
        );

      /* DEPRECATED DATATYPES */
      case 'menu':
        return (
          <Text>
            Datatype `
            {type}
            ` has been deprecated.
          </Text>
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
