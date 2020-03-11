/**
 * Adapted from https://codesandbox.io/s/j47zv28xkw
 */

import React, { PureComponent } from 'react';
import { string, func, oneOfType, object, bool, shape } from 'prop-types';
import { format, isSameMonth, isToday, getMonth, getYear } from 'date-fns';
import { getDeviceSize } from '../../../../../utils';
import { Input, Box, Text, Touchable, Icon, Fragment } from '../../../../components';
import DateTimeBase from '../date-time-base';

class InputDatePicker extends PureComponent {
  static defaultProps = {
    displayFormat: 'DD/MM/YYYY',
    // displayFormat: 'Do-MMMM-YYYY',
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
      value,
      testID,
      onChangeValue, // eslint-disable-line no-unused-vars
      editable,
      subcomponentProps,
      ...restProps
    } = this.props;

    return (
      <DateTimeBase
        value={value}
        displayFormat={displayFormat}
        onChangeValue={onChangeValue}
        subcomponentProps={subcomponentProps}
      >
        {({
          getItemProps,
          getInputProps,
          getWeeksInMonth,
          getDatePrevMonth,
          getDateNextMonth,
          inputValue,
          date,
          selectedItem,
          selectItem,
          setHighlightedIndex,
          highlightedIndex,
          isOpen,
          setDate,
          daysOfTheWeek,
          months,
          years,
          selection,
          onRef,
          open,
          close,
          toggle,
          onBlur,
          onKeyPress,
          onSelectionChange,
          selectDay,
          selectMonth,
          selectYear,
          componentProps,
          updateState,
          filterComponentProps,
        }) => {
          const weeksInCurrentMonth = getWeeksInMonth();
          const isDisabled = dateValue => !isSameMonth( date, dateValue );
          const isSelectedDay = date => (
            selectedItem &&
            format( selectedItem ) === format( date )
          );

          const monthValue = [months[getMonth( date )]];
          const yearValue = [years[years.findIndex( year => year === getYear( date ))]];

          return (
            <Fragment>
              <Box
                // width="100%"
                zIndex={10}
                position="relative"
              >
                <Input
                  {...getInputProps({
                    ...restProps,
                    type: 'text',
                  // editable: false,
                    updateValueWhenFocused: true,
                    value: inputValue || editable ? displayFormat.toLowerCase() : '',
                  // placeholder,
                    onRef: onRef,
                    dynamicWidth: true,
                    ignoreOnChange: true,
                    ...componentProps['input-field'],
                  })}
                  onChange={null}
                  onFocus={close}
                  onBlur={onBlur}
                  onKeyPress={onKeyPress( selectedItem, selectItem, setDate, date )}
                  selection={selection}
                  onSelectionChange={onSelectionChange}
                  testID={`input-date-picker ${testID}`}
                  paddingRight={20}
                  iconProps={componentProps['input-icon']}
                  onChangeState={updateState( 'input-field' )}
                  // {...this.props.inputFieldProps} // eslint-disable-line
                />
                {
                  editable ? (
                    <Touchable
                      withFeedback
                      disabled={!this.props.editable}
                      onPress={this.props.editable ? toggle : null}
                      onFocus={open}
                      accessibilityRole="link"
                      testID={`input-date-picker ${testID}`}
                      position="absolute"
                      right={0}
                      zIndex={5}
                      transform="translateY(-50%)"
                      top="50%"
                    >
                      <Box
                        height="100%"
                        alignItems="center"
                        transform={[
                          { rotate: isOpen ? '0deg' : '180deg' },
                        ]}
                      >
                        <Icon
                          name="keyboard-arrow-up"
                          color="black"
                          size="md"
                          cursor="pointer"
                        />
                      </Box>
                    </Touchable>
                  ) : null
                }
              </Box>

              {/*  ----------------------------
                          DIALOG
              ------------------------------*/}

              {isOpen && editable ? (
                <Box
                  flexDirection="column"
                  marginTop="0.5rem"
                  shadowColor="#000"
                  shadowOpacity={0.4}
                  shadowRadius={5}
                  shadowOffset={{
                    width: 0,
                    height: 0,
                  }}
                // borderRadius={5}
                  overflow="hidden"
                  backgroundColor="#FFF"
                  position="absolute"
                  paddingY={5}
                  zIndex={20}
                  top="100%"
                  {...( getDeviceSize() === 'sm' ? { width: '100%' } : null )}
                  onPress={event => {
                    event.stopPropagation();
                  }}
                  componentID="INPUT-ITEM-WRAPPER"
                  {...componentProps['input-item-wrapper']}
                >
                  <Box
                    justifyContent="space-between"
                    alignItems="center"
                    padding={5}
                    onPress={event => {
                      event.stopPropagation();
                    }}
                    zIndex={1}
                    width="100%"
                  >
                    {/*  ----------------------------
                            PREV MONTH BUTTON
                    ------------------------------*/}

                    <Touchable
                      withFeedback
                      accessibilityRole="link"
                      onPress={event => {
                        event.stopPropagation();
                        setDate( getDatePrevMonth());
                      }}
                    >
                      <Box
                        flex={1}
                      >
                        <Icon
                          color="black"
                          name="arrow-back"
                        />
                      </Box>
                    </Touchable>

                    {/*  ----------------------------
                            MONTH DROPDOWN
                    ------------------------------*/}

                    <Box
                      flex={1}
                    >
                      <Input
                        type="dropdown"
                        items={months.map(( m, index ) => (
                          { value: m, label: m, weight: index }
                        ))}
                        identifier="MONTHDROPDOWN"
                        value={monthValue}
                        sortByWeight
                        onChangeValue={selectMonth( setDate, date )}
                        color="#000"
                        backgroundColor="#FFF"
                        padding={5}
                        borderRadius={10}
                        borderWidth={0}
                        textAlign="center"
                        cursor="pointer"
                        testID={`input-date-picker-month ${testID}`}
                        nonTabable
                        editable
                      />
                    </Box>

                    {/*  ----------------------------
                            YEAR DROPDOWN
                    ------------------------------*/}

                    <Box
                      flex={1}
                    >
                      <Input
                        type="dropdown"
                        items={years.map(( y, index ) => (
                          { value: y, label: y, weight: index }
                        ))}
                        value={yearValue}
                        onChangeValue={selectYear( setDate, date )}
                        color="#000"
                        backgroundColor="#FFF"
                        padding={5}
                        borderRadius={10}
                        borderWidth={0}
                        textAlign="center"
                        cursor="pointer"
                        testID={`input-date-picker-year ${testID}`}
                        nonTabable
                        editable
                      />
                    </Box>

                    {/*  ----------------------------
                            NEXT MONTH BUTTON
                    ------------------------------*/}

                    <Touchable
                      withFeedback
                      accessibilityRole="link"
                      onPress={event => {
                        event.stopPropagation();
                        setDate( getDateNextMonth());
                      }}
                    >
                      <Box
                        flex={1}
                      >
                        <Icon
                          color="black"
                          name="arrow-forward"
                        />
                      </Box>
                    </Touchable>
                  </Box>

                  <Box
                    flexDirection="column"
                  >

                    {/*  ----------------------------
                            DAY NAMES HEADER
                    ------------------------------*/}

                    <Box>
                      {daysOfTheWeek.map( day => (
                        <Box
                          key={day}
                          width="calc(100% / 7)"
                          paddingX={10}
                          paddingY={15}
                          justifyContent="center"
                        >
                          <Text
                            fontWeight="bold"
                            text={day}
                          />
                        </Box>
                      ))}
                    </Box>

                    {/*  ----------------------------
                            ALL DAYS
                    ------------------------------*/}

                    {weeksInCurrentMonth.map(( week, weekIndex ) => (
                      // ---------------
                      //   WEEK ROW
                      // ---------------
                      <Box
                        // eslint-disable-next-line
                        key={weekIndex}
                      >
                        {week.map(( day, dayIndex ) => {
                          // ---------------
                          //   DAY BUTTON
                          // ---------------

                          const monthIndex = ( weekIndex * 7 ) + dayIndex;
                          const isSelected = isSelectedDay( day.dateValue );
                          const disabled = isDisabled( day.dateValue );
                          const today = isToday( day.dateValue );
                          const isHighlighted = highlightedIndex === monthIndex;
                          const itemProps = filterComponentProps( 'input-item', { selected: isSelected, hover: isHighlighted });

                          return (

                            <Touchable
                              accessibilityRole="link"
                              testID={`input-date-picker-option input-date-picker-day ${testID}`}
                              key={day.label}
                              {...getItemProps({
                                item: day.dateValue,
                                disabled: disabled,
                                width: 'calc(100% / 7)',
                                paddingY: 5,
                                backgroundColor: isHighlighted ? '#DDD' : today ? '#BBB' : 'white',
                                ...disabled && {
                                  cursor: 'not-allowed',
                                },
                                justifyContent: 'center',
                                withFeedback: true,
                                onMouseEnter: () => {
                                  setHighlightedIndex( monthIndex );
                                },
                                ...itemProps,
                              })}
                              onPress={event => {
                                if ( disabled )
                                  event.stopPropagation();
                                else {
                                  selectDay(
                                    toggle,
                                    selectItem,
                                    day,
                                  );
                                }
                              }}
                            >
                              <Text
                                align="center"
                                color={disabled ? '#dedede' : '#000000'}
                                fontWeight={isSelected ? 'bold' : 'normal'}
                                {...itemProps}
                              >
                                {day.label}
                              </Text>
                            </Touchable>
                          );
                        })}
                      </Box>
                    ))}
                  </Box>
                </Box>
              ) : null}
            </Fragment>
          );
        }}
      </DateTimeBase>
    );
  }
}

export default InputDatePicker;
