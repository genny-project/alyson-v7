/**
 * Adapted from https://codesandbox.io/s/j47zv28xkw
 */

import React, { PureComponent } from 'react';
import { string, func, oneOfType, object, bool } from 'prop-types';
import Downshift from 'downshift';
import Kalendaryo from 'kalendaryo';
import range from 'lodash.range';
import dlv from 'dlv';
import { format, isSameMonth, isToday, setMonth, setYear, getMonth, getYear, getDate, getDaysInMonth, setDate } from 'date-fns';
import { getDeviceSize, isArray, isString } from '../../../../../utils';
import { Input, Box, Text, Touchable, Icon, Fragment } from '../../../../components';

const NUMBER_OF_DOB_YEARS = 125;

const currentYear = new Date().getFullYear();
const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const years = range( NUMBER_OF_DOB_YEARS ).map( year => currentYear + 2 - year );

const dateTimeFormats = {
  dayOfWeek: ['d', 'do', 'dd', 'ddd', 'dddd'],
  day: ['D', 'Do', 'DD'],
  dayOfYear: ['DDD', 'DDDo', 'DDDD'],
  quarter: ['Q', 'Qo'],
  month: ['M', 'Mo', 'MM', 'MMM', 'MMMM'],
  year: ['YY', 'YYYY'],
  hour: ['H', 'HH', 'h', 'hh'],
  minutes: ['m', 'mm'],
  seconds: ['s', 'ss'],
  ampm: ['A', 'a', 'aa'],
  timezone: ['Z', 'ZZ'],
};

class InputDatePicker extends PureComponent {
  static defaultProps = {
    // displayFormat: 'DD/MM/YYYY',
    displayFormat: 'MMMM-Do-YYYY',
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
    isCalendarOpen: false,
    currentInputSection: null,
    preventChange: false,
  }

  componentDidMount() {
    this.setSelectedItem();
    this.setFields( this.props.displayFormat );
    this.setSelectionValues( this.props.displayFormat );
  }

  componentDidUpdate( prevProps ) {
    if (
      this.props.value != null &&
      prevProps.value !== this.props.value
    ) {
      this.setSelectedItem();
    }
  }

  setSelectedItem = () => {
    if ( this.props.value ) {
      this.setState({
        value: this.props.value,
      });
    }
  }

  setFields = ( formattedDate ) => {
    const selectionValuesForInputSections = ( datestring ) => {
      const regex = /(,\s|\s|\/|-|_|:)/g;

      // console.log( 'selectionValuesForInputSections', datestring, regex );

      return datestring.split( regex );
    };

    const findMatchInFormatFields = ( string ) => {
      let value = null;

      Object.keys( dateTimeFormats ).some( fieldKey => {
        const findMatch = dateTimeFormats[fieldKey].some( formatString => {
          const isMatch = formatString === string;

          if ( isMatch ) value = fieldKey;

          return isMatch;
        });

        return findMatch;
      });

      return value;
    };

    const split = selectionValuesForInputSections( formattedDate );

    const fields = {};
    const inputs = {};

    split.forEach(( s, index ) => {
      const field = findMatchInFormatFields( s );

      if ( isString( field )) {
        fields[index] = {
          value: s,
          length: s.length,
          type: field,
        };

        inputs[Object.keys( inputs ).length] = field;
      }
      else {
        fields[index] = {
          value: s,
          length: s.length,
          type: 'separator',
        };
      }
    });

    console.log( 'lengths', fields );

    this.selectionFields = fields;
    this.inputSections = inputs;
  }

  setSelectionValues = ( formattedDate ) => {
    const selectionValuesForInputSections = ( datestring ) => {
      const regex = /(,\s|\s|\/|-|_|:)/g;

      // console.log( 'selectionValuesForInputSections', datestring, regex );

      return datestring.split( regex );
    };

    // console.log( 'formattedDate', formattedDate );
    const split = selectionValuesForInputSections( formattedDate );

    const selectionAreas = {};
    let length = 0;

    split.forEach(( string, index ) => {
      const field = this.selectionFields[index];

      if ( isString( field.type, { isNotSameAs: 'separator' })) {
        selectionAreas[field.type] = {
          start: length,
          end: length + string.length,
        };
      }

      length = length + string.length;
    });

    this.selectionValues = selectionAreas;
  }

  handleCalendarToggle = () => {
    this.setState( state => ({ isCalendarOpen: !state.isCalendarOpen }));
  }

  handleCalendarOpen = () => {
    this.setState({ isCalendarOpen: true });
  }

  handleCalendarClose = () => {
    this.setState({ isCalendarOpen: false });
  }

  handleFocus = ( selectItem, selectedItem, date ) => () => {
    // console.log( 'handleFocus', selectedItem, date );

    if ( selectedItem == null ) {
      selectItem( date );
      // this.setState({

      // })
    }
  }

  handleChange = value => {
    const formattedDate = format( value, this.props.displayFormat );

    // console.log( 'change value', format( value ), this.state.value, this.props.value );

    this.setSelectionValues( formattedDate );

    const date = format( value );

    this.setState({
      value: date,
    }, () => {
      // console.log( 'date', date );
      if ( this.props.onChangeValue ) {
        clearTimeout( this.state.timer );

        this.state.timer = setTimeout(() => {
          this.props.onChangeValue( date );
        }, 1000 );
      }
    });
  }

  handleSelectionChange = event => {
    const selection = dlv( event, 'nativeEvent.selection' );

    // console.log( 'key', dlv( event, 'nativeEvent.key' ));

    const locateSelectionArea = ({ end }) => {
      const areas = this.selectionValues;
      const index = end;

      if (
        this.state.preventChange
      ) {
        this.setState({
          preventChange: false,
        });

        return this.state.currentInputSection;
      }

      // loop and check each area until match is found

      if (
        index >= areas['day'].start &&
        index < areas['month'].start
      ) {
        return 'day';
      }
      if (
        index >= areas['month'].start &&
        index < areas['year'].start
      ) {
        return 'month';
      }
      if (
        index >= areas['year'].start &&
        index <= areas['year'].end
      ) {
        return 'year';
      }
    };

    const field = locateSelectionArea( selection );

    // console.log( 'locateSelectionArea', field );

    if ( this.state.currentInputSection !== field ) {
      this.setState({
        currentInputSection: field,
      });
    }
  }

  handleKeyPress = ( value, callback, setDate, date ) => event => {
    const key = event.nativeEvent.key;

    const currentIndex = Object.keys( this.inputSections ).findIndex( key => this.inputSections[key] === this.state.currentInputSection );
    const maxIndex = Object.keys( this.inputSections ).length;

    switch ( key ) {
      case 'ArrowDown':
      case 'ArrowUp':
        // console.log( 'value', value );
        this.setState({
          preventChange: true,
        });

        if ( value == null ) {
          callback( date );

          return;
        }
        switch ( this.state.currentInputSection ) {
          case 'day':
            this.handleIncrementDay( value, key, callback, setDate );
            break;
          case 'month':
            this.handleIncrementMonth( value, key, callback, setDate );
            break;
          case 'year':
            this.handleIncrementYear( value, key, callback, setDate, date );
            break;
          default:
            console.log( 'invalid this.state.currentInputSection' );
        }
        break;
      case 'ArrowLeft':
        // console.log( 'arrow left' );

        // need function to increment index of currentInputSection in this.inputSections
        console.log( this.inputSections, currentIndex <= 0 ? currentIndex : currentIndex - 1, this.inputSections[currentIndex <= 0 ? currentIndex : currentIndex - 1] );

        this.setState({
          currentInputSection: this.inputSections[currentIndex <= 0 ? currentIndex : currentIndex - 1],
        }, () => {
          console.log( 'state', this.state.currentInputSection, currentIndex );
        });
        break;
      case 'ArrowRight':
      case 'Enter':
        console.log( this.inputSections, currentIndex >= maxIndex ? currentIndex : currentIndex + 1, this.inputSections[currentIndex >= maxIndex ? currentIndex : currentIndex + 1] );
        this.setState({
          currentInputSection: this.inputSections[currentIndex >= maxIndex ? currentIndex : currentIndex + 1],
        }, () => {
          console.log( 'state', this.state.currentInputSection, currentIndex );
        });
        break;
      case 'Tab':
        this.setState({
          currentInputSection: this.inputSections[0],
        });
        break;
      case 'Space':
        // console.log( 'enter or space' );
        break;
      default:
    }
  }

  handleRef = ( input ) => {
    this.input = input;
  }

  handleIncrementDay = ( value, key, callback ) => {
    // console.log( 'increment day', value, key );

    const daysInMonth = getDaysInMonth( value );
    const currentDay = getDate( value );

    // console.log( 'currentDay', currentDay );
    // console.log( 'daysInMonth', daysInMonth );

    let newDay = key === 'ArrowUp' ? currentDay + 1 : currentDay - 1;

    if ( newDay <= 0 ) {
      newDay = daysInMonth;
    }
    else if ( newDay > daysInMonth ) {
      newDay = 1;
    }

    const newDate = setDate( value, newDay );

    // console.log( 'value', value, value && value.length );
    // console.log( 'newDay', newDay, newDate );

    if ( callback ) callback( newDate );
  }

  handleIncrementMonth = ( value, key, callback, setDate ) => {
    // const currentMonth = [months[getMonth( value )]];
    const monthIndex = getMonth( value );

    // console.log( 'currentMonth', monthIndex );

    let newMonth = key === 'ArrowUp' ? monthIndex + 1 : monthIndex - 1;

    if ( newMonth < 0 ) {
      newMonth = 11;
    }
    else if ( newMonth > 11 ) {
      newMonth = 0;
    }

    const newDate = setMonth( value, newMonth );

    // console.log( 'value', value, value &&  value.length );
    // console.log( 'newMonth', newMonth, newDate );

    if ( callback ) callback( newDate );
    if ( setDate ) setDate( newDate );
  }

  handleIncrementYear = ( value, key, callback, setDate ) => {
    const yearIndex = years.findIndex( year => year === getYear( value ));

    // console.log( 'year', key, yearIndex, currentYear, years );

    let newIndex = key === 'ArrowUp' ? yearIndex - 1 : yearIndex + 1;

    if ( newIndex < 0 ) {
      newIndex = years.length - 1;
    }
    else if ( newIndex > years.length - 1 ) {
      newIndex = 0;
    }

    const newYear = [years[newIndex]];

    const newDate = setYear( value, newYear );

    // console.log( 'value', value, value &&  value.length );
    // console.log( 'newYear', newYear, newDate );

    if ( callback ) callback( newDate );
    if ( setDate ) setDate( newDate );
  }

  handleSelectDay = ( callback, selectItem, day ) => {
    // console.log( 'day', day, day.dateValue );

    selectItem( day.dateValue );
    callback();
  }

  handleSelectMonth = ( callback, date ) => value => {
    // console.log( 'props', callback, setMonth, value );
    const newMonth = isArray( value, { ofMinLength: 1 })
      ? value[0] : value;
    const monthIndex = months.findIndex( m => m === newMonth );
    const newDate = setMonth( date, monthIndex );

    // console.log( 'newDate', newDate );
    callback( newDate );
  }

  handleSelectYear = ( callback, date ) => value => {
    const newDate = setYear( date, value );

    callback( newDate );
  }

  render() {
    const {
      displayFormat,
      calendarHeaderColor,
      calendarHeaderTextColor,
      value,
      testID,
      onChangeValue, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;

    const { isCalendarOpen } = this.state;

    // console.log( this.selectionValues[this.state.currentInputSection] );

    // console.log( this.props );

    return (
      <Downshift
        defaultInputValue={value}
        onChange={this.handleChange}
        itemToString={date => {
          return date ? format( date, displayFormat ) : '';
        }}
        isOpen={isCalendarOpen}
        selectedItem={this.state.value}
      >
        {({
          getInputProps,
          getItemProps,
          getRootProps,
          isOpen,
          selectedItem,
          inputValue,
          selectItem,
        }) => {
          return (
            <Box
              flex={1}
              {...getRootProps( undefined, { suppressRefError: true })}
            >
              <Box>
                {isOpen ? (
                  <Touchable
                    withFeedback
                    accessibilityRole="link"
                    onPress={this.handleCalendarToggle}
                  >
                    <Box
                      position="fixed"
                      top={0}
                      left={0}
                      width="100%"
                      height="100%"
                    />
                  </Touchable>
                ) : null}
              </Box>

              <Box
                position="relative"
                // width="100%"
              >
                <Kalendaryo
                  startCurrentDateAt={selectedItem}
                  selectedItem={selectedItem}
                  getItemProps={getItemProps}
                  calendarHeaderColor={calendarHeaderColor}
                  calendarHeaderTextColor={calendarHeaderTextColor}
                  selectItem={selectItem}
                  render={({
                    // getFormattedDate,
                    getWeeksInMonth,
                    getDatePrevMonth,
                    getDateNextMonth,
                    setDate,
                    getItemProps,
                    selectedItem,
                    date,
                    calendarHeaderColor,
                    calendarHeaderTextColor,
                    selectItem,
                  }) => {
                    const weeksInCurrentMonth = getWeeksInMonth();
                    const isDisabled = dateValue => !isSameMonth( date, dateValue );
                    const isSelectedDay = date => (
                      selectedItem &&
                      format( selectedItem ) === format( date )
                    );

                    const monthValue = [months[getMonth( date )]];
                    const yearValue = [years[years.findIndex( year => year === getYear( date ))]];

                    // console.log( 'selectedItem', selectedItem,  );
                    // console.log( 'inputvalue', inputValue, displayFormat  );

                    return (
                      <Fragment>
                        {/*  ----------------------------
                              INPUT FIELD
                        ------------------------------*/}
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
                              onRef: this.handleRef,
                            })}
                            onFocus={this.handleCalendarClose}
                            onBlur={this.handleBlur}
                            onKeyPress={this.handleKeyPress( selectedItem, selectItem, setDate, date )}
                            selection={this.selectionValues[this.state.currentInputSection]}
                            onSelectionChange={this.handleSelectionChange}
                            testID={`input-date-picker ${testID}`}
                            paddingRight={20}
                          />
                          <Touchable
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
                              backgroundColor={calendarHeaderColor}
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
                                    name="arrow-back"
                                    color={calendarHeaderTextColor}
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
                                  onChangeValue={this.handleSelectMonth( setDate, date )}
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
                                  onChangeValue={this.handleSelectYear( setDate, date )}
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
                                    name="arrow-forward"
                                    color={calendarHeaderTextColor}
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
                                            this.handleSelectDay(
                                              this.handleCalendarToggle,
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
                />
              </Box>
            </Box>
          );}}
      </Downshift>
    );
  }
}

export default InputDatePicker;
