/* eslint-disable react/no-unused-prop-types */
/**
 * Adapted from https://codesandbox.io/s/j47zv28xkw
 */

import React, { PureComponent } from 'react';
import { string, func, oneOfType, object, bool, shape } from 'prop-types';
import { getHours, getMinutes } from 'date-fns';
import { Input, Box,Fragment } from '../../../../components';
import DateTimeBase from '../date-time-base';

class InputDatePicker extends PureComponent {
  static defaultProps = {
    displayFormat: 'hh:mm A',
    placeholder: 'Please select a date...', // eslint-disable-line
    // placeholder: 'day month, year',
  }

  static propTypes = {
    displayFormat: string,

    onChangeValue: func,
    value: oneOfType( [string, object] ),
    testID: string,
    editable: bool,
    placeholder: string,
    subcomponentProps: shape({
      'input-field': object,
      'input-wrapper': object,
      'input-icon': object,
      'input-item-wrapper': object,
      'input-item': object,
      'input-selected-wrapper': object,
      'input-selected': object,
    }),
  }

  selectionValues = {};

  selectionFields = [];

  inputSections = [];

  state = {
  }

  render() {
    const {
      displayFormat,
      subcomponentProps,
      value,
      testID,
      onChangeValue, // eslint-disable-line no-unused-vars
    } = this.props;

    return (
      <DateTimeBase
        value={value}
        displayFormat={displayFormat}
        onChangeValue={onChangeValue}
        subcomponentProps={subcomponentProps}
      >
        {({
          // getWeeksInMonth,
          date, //
          selectedItem, //
          setDate,
          hours,
          clockFormat,
          minutes,
          selectHour,
          selectMinute,
          selectAmPm,
          updateState,
        }) => {
          return (
            <Fragment>
              <Box>
                {/*  ----------------------------
                            HOUR DROPDOWN
                    ------------------------------*/}

                <Box
                  flex={1}
                >
                  <Input
                    type="dropdown"
                    items={hours.map(( hour, index ) => (
                      { value: hour, label: hour, weight: index }
                    ))}
                    identifier="TIMEDROPDOWN"
                    sortByWeight
                    onChangeValue={selectHour( setDate, date )}
                    color="#000"
                    backgroundColor="#FFF"
                    padding={5}
                    borderRadius={10}
                    borderWidth={0}
                    textAlign="center"
                    cursor="pointer"
                    testID={`input-date-picker-hour ${testID}`}
                    nonTabable
                    editable
                    placeholder={selectedItem
                      ? getHours( selectedItem ) > 9
                        ? getHours( selectedItem ) > 12 ? `0${getHours( selectedItem ) - 12}` : getHours( selectedItem )
                        : `0${getHours( selectedItem )}`
                      : 'Hours'}
                    onChangeState={updateState( 'input-field' )}
                    value={selectedItem}
                  />
                </Box>

                {/*  ----------------------------
                            MINUTES DROPDOWN
                    ------------------------------*/}

                <Box
                  flex={1}
                >
                  <Input
                    type="dropdown"
                    items={minutes.map(( minute, index ) => (
                      { value: minute, label: minute, weight: index }
                    ))}
                    identifier="MINUTEDROPDOWN"
                    sortByWeight
                    onChangeValue={selectMinute( setDate, date )}
                    color="#000"
                    backgroundColor="#FFF"
                    padding={5}
                    borderRadius={10}
                    borderWidth={0}
                    textAlign="center"
                    cursor="pointer"
                    testID={`input-date-picker-minute ${testID}`}
                    nonTabable
                    editable
                    placeholder={selectedItem
                      ? getMinutes( selectedItem ) > 9
                        ? getMinutes( selectedItem )
                        : `0${getMinutes( selectedItem )}`
                      : 'Minutes'}
                    onChangeState={updateState( 'input-field' )}
                  />
                </Box>

                {/*  ----------------------------
                            AMPM DROPDOWN
                    ------------------------------*/}

                <Box
                  flex={1}
                >
                  <Input
                    type="dropdown"
                    items={clockFormat.map(( format, index ) => (
                      { value: format, label: format, weight: index }
                    ))}
                    onChangeValue={selectAmPm( setDate, date )}
                    color="#000"
                    backgroundColor="#FFF"
                    padding={5}
                    borderRadius={10}
                    borderWidth={0}
                    textAlign="center"
                    cursor="pointer"
                    testID={`input-date-picker-ampm ${testID}`}
                    nonTabable
                    editable
                    placeholder={selectedItem
                      ?  getHours( selectedItem ) < 12 ? 'AM' : 'PM'
                      : 'AM / PM'
                        }
                  />
                </Box>
              </Box>
            </Fragment>
          );
        }}
      </DateTimeBase>
    );
  }
}

export default InputDatePicker;
