/**
 * Adapted from https://codesandbox.io/s/j47zv28xkw
 */

import React, { PureComponent } from 'react';
import { string, func, oneOfType, object, bool } from 'prop-types';
import { format, isSameMonth, isToday, getMonth, getYear } from 'date-fns';
import { getDeviceSize } from '../../../../../utils';
import { Input, Box, Text, Touchable, Icon, Fragment } from '../../../../components';
import DateTimeBase from '../date-time-base';

class InputDatePicker extends PureComponent {
  static defaultProps = {
    // displayFormat: 'DD/MM/YYYY',
    displayFormat: 'Do-MMMM-YYYY',
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
                    value: inputValue || displayFormat,
                  // placeholder,
                    onRef: onRef,
                  })}
                  onChange={null}
                  onFocus={close}
                  onBlur={onBlur}
                  onKeyPress={onKeyPress( selectedItem, selectItem, setDate, date )}
                  selection={selection}
                  onSelectionChange={onSelectionChange}
                  testID={`input-date-picker ${testID}`}
                  paddingRight={20}
                  notFullWidth
                />
                <Touchable
                  withFeedback
                  disabled={!this.props.editable}
                  onPress={this.props.editable ? toggle : null}
                  onFocus={open}
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
                </Touchable>
              </Box>

              {/*  ----------------------------
                          DIALOG
              ------------------------------*/}

              {isOpen ? (
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
                  zIndex={20}
                  top="100%"
                  {...( getDeviceSize() === 'sm' ? { width: '100%' } : null )}
                  onPress={event => {
                    event.stopPropagation();
                  }}
                >
                  <Box
                    justifyContent="space-between"
                    alignItems="center"
                    paddingX={10}
                    paddingY={15}
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
                        {week.map(( day, dayIndex ) => (
                          // ---------------
                          //   DAY BUTTON
                          // ---------------
                          <Touchable
                            accessibilityRole="link"
                            testID={`input-date-picker-option input-date-picker-day ${testID}`}
                            key={day.label}
                            {...getItemProps({
                              item: day.dateValue,
                              disabled: isDisabled( day.dateValue ),
                              width: 'calc(100% / 7)',
                              paddingY: 15,
                              paddingX: 10,
                              backgroundColor: (
                                isSelectedDay( day.dateValue )
                                  ? 'red'
                                  : '#FFFFFF'
                              ),
                              ...dayIndex > 0 && {
                              // borderLeftWidth: 1,
                              // borderStyle: 'solid',
                              // borderColor: '#efefef',
                              },
                              ...isDisabled( day.dateValue ) && {
                                cursor: 'not-allowed',
                              },
                              justifyContent: 'center',
                              withFeedback: true,
                              onPress: event => {
                                if ( isDisabled( day.dateValue ))
                                  event.stopPropagation();
                                else {
                                  selectDay(
                                    toggle,
                                    selectItem,
                                    day,
                                  );
                                }
                              },
                            })}
                          >
                            <Text
                              align="center"
                              color={(
                            isSelectedDay( day.dateValue ) ? 'black'
                            : isDisabled( day.dateValue ) ? '#dedede'
                            : isToday( day.dateValue ) ? 'crimson'
                            : '#000000'
                          )}
                            >
                              {day.label}
                            </Text>
                          </Touchable>
                        ))}
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
