/**
 * Adapted from https://codesandbox.io/s/j47zv28xkw
 */

import React, { PureComponent } from 'react';
import { string, func, oneOfType, object, bool } from 'prop-types';
import { Input, Box } from '../../../../components';
import DateTimeBase from '../date-time-base';

class InputDatePicker extends PureComponent {
  static defaultProps = {
    displayFormat: 'hh:mm A',
    calendarHeaderColor: 'white',
    calendarHeaderTextColor: 'black',
    placeholder: 'Please select a date...', // eslint-disable-line
    // placeholder: 'day month, year',
  }

  static propTypes = {
    displayFormat: string,
    calendarHeaderColor: string,
    calendarHeaderTextColor: string,
    onChangeValue: func,
    value: oneOfType( [string, object] ),
    testID: string,
    editable: bool,
    placeholder: string,
  }

  selectionValues = {};

  selectionFields = [];

  inputSections = [];

  state = {
  }

  render() {
    const {
      displayFormat,
      value,
      testID,
      onChangeValue, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;

    return (
      <DateTimeBase
        value={value}
        displayFormat={displayFormat}
        onChangeValue={onChangeValue}
        type="timepicker"
      >
        {({
          getInputProps,
          inputValue,
          date,
          selectedItem,
          selectItem,
          setDate,
          selection,
          onRef,
          close,
          onBlur,
          onKeyPress,
          onSelectionChange,
        }) => {
          return (
            <Box
              width="100%"
              zIndex={10}
              position="relative"
            >
              <Input
                {...getInputProps({
                  ...restProps,
                  type: 'text',
                // editable: false,
                  updateValueWhenFocused: true,
                  value: inputValue || displayFormat,
                // placeholder,
                  onRef: onRef,
                  dynamicWidth: true,
                  ignoreOnChange: true,
                })}
                onChange={null}
                onFocus={close}
                onBlur={onBlur}
                onKeyPress={onKeyPress( selectedItem, selectItem, setDate, date )}
                selection={selection}
                onSelectionChange={onSelectionChange}
                testID={`input-date-picker ${testID}`}
                showLogs
                identifier="timepicker"
                {...this.props.inputFieldProps} // eslint-disable-line
              />
              {/* <Touchable
                withFeedback
                disabled={!this.props.editable}
                onPress={this.props.editable ? this.handleCalendarToggle : null}
                onFocus={this.handleCalendarOpen}
                accessibilityRole="link"
              >
                <Box
                  position="absolute"
                  height="100%"
                  alignItems="center"
                  right={0}
                  zIndex={5}
                >
                  <Icon
                    name={isOpen ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                    color="black"
                    size="md"
                  />
                </Box>
              </Touchable> */}
            </Box>
          );
        }}
      </DateTimeBase>
    );
  }
}

export default InputDatePicker;
