import React, { PureComponent } from 'react';
import { string, func, oneOfType, object, bool } from 'prop-types';
import Downshift from 'downshift';
import Kalendaryo from 'kalendaryo';
import range from 'lodash.range';
import dlv from 'dlv';
import { format, getHours, setHours, getMinutes, setMinutes, getSeconds } from 'date-fns';
import { getDeviceSize, isArray } from '../../../../../utils';
import { Input, Box, Text, Touchable, Icon, Fragment } from '../../../../components';

const hours = 24;
const minutes = 60;
const seconds = 60;

class InputTimePicker extends PureComponent {
  static defaultProps = {
    // displayFormat: 'HH:mm:ss',
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

  selectionValues = {
    day: {},
    month: {},
    year: {},
  }

  inputSections = {
    day: null,
    month: null,
    year: null,
  };

  state = {
    isCalendarOpen: false,
    currentInputSection: 'day',
    preventChange: false,
  }

  componentDidMount() {
    this.setSelectedItem();
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

  setSelectionValues = ( formattedDate ) => {
    const selectionValuesForInputSections = ( datestring ) => {
      const regex = /(:|\s)/g;

      // console.log( 'selectionValuesForInputSections', datestring, regex );

      return datestring.split( regex );
    };

    // console.log( 'formattedDate', formattedDate );
    const split = selectionValuesForInputSections( formattedDate );

    const day = split[0];
    const month = split[2];
    const year = split[4];

    const lengths = {
      day: day.length,
      month: month.length,
      year: year.length,
      total: formattedDate.length,
    };

    // const inputSections = {
    //   day: ,
    //   month: ,
    //   year: ,
    // };

    const selectionAreas = {
      day: {
        start: 0,
        end: lengths['day'],
      },
      month: {
        start: lengths['day'] + split[1].length,
        end: lengths['day'] + split[1].length + lengths['month'],
      },
      year: {
        start: lengths['day'] + split[1].length + lengths['month'] + split[3].length,
        end: lengths['day'] + split[1].length + lengths['month'] + split[3].length + lengths['year'],
      },
    };

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

    console.log( 'change value', format( value ), this.state.value, this.props.value );

    this.setSelectionValues( formattedDate );

    const date = format( value );

    this.setState({
      value: date,
    }, () => {
      console.log( 'date', date );
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
            this.handleIncrementHours( value, key, callback, setDate );
            break;
          case 'month':
            this.handleIncrementMinutes( value, key, callback, setDate );
            break;
          case 'year':
            this.handleChangeAmPm( value, key, callback, setDate, date );
            break;
          default:
            console.log( 'invalid this.state.currentInputSection' );
        }
        break;
      case 'ArrowLeft':
        // console.log( 'arrow left' );
        this.setState( state => ({
          currentInputSection: state.currentInputSection === 'year'
            ? 'month'
            : state.currentInputSection === 'month'
              ? 'day'
              : 'day',
        }));
        break;
      case 'ArrowRight':
        // console.log( 'arrow right' );
        this.setState( state => ({
          currentInputSection: state.currentInputSection === 'day'
            ? 'month'
            : state.currentInputSection === 'month'
              ? 'year'
              : 'year',
        }));
        break;
      case 'Tab':
        this.setState({
          currentInputSection: 'day',
        });
        break;
      case 'Enter':
      case 'Space':
        // console.log( 'enter or space' );
        break;
      default:
    }
  }

  handleRef = ( input ) => {
    this.input = input;
  }

  handleIncrementHours = ( value, key, callback, setDate ) => {
    // console.log( 'increment day', value, key );

    const currentHour = getHours( value );

    // console.log( 'currentDay', currentDay );
    // console.log( 'daysInMonth', daysInMonth );

    let newDay = key === 'ArrowUp' ? currentHour + 1 : currentHour - 1;

    if ( currentHour >= 0 && currentHour <= 11 ) {
      if ( newDay < 0 ) {
        newDay = 11;
      }
      else if ( newDay > 11 ) {
        newDay = 0;
      }
    }
    else if ( currentHour >= 12 && currentHour <= 23 ) {
      if ( newDay < 12 ) {
        newDay = 23;
      }
      else if ( newDay > 23 ) {
        newDay = 12;
      }
    }

    const newDate = setHours( value, newDay );

    // console.log( 'value', value, value && value.length );
    // console.log( 'newDay', newDay, newDate );

    if ( callback ) callback( newDate );
    if ( setDate ) setDate( newDate );
  }

  handleIncrementMinutes = ( value, key, callback, setDate ) => {
    // const currentMonth = [months[getMonth( value )]];
    const monthIndex = getMinutes( value );

    // console.log( 'currentMonth', monthIndex );

    let newMonth = key === 'ArrowUp' ? monthIndex + 1 : monthIndex - 1;

    if ( newMonth < 0 ) {
      newMonth = 59;
    }
    else if ( newMonth > 59 ) {
      newMonth = 0;
    }

    const newDate = setMinutes( value, newMonth );

    // console.log( 'value', value, value &&  value.length );
    // console.log( 'newMonth', newMonth, newDate );

    if ( callback ) callback( newDate );
    if ( setDate ) setDate( newDate );
  }

  handleChangeAmPm = ( value, key, callback, setDate ) => {
    // const yearIndex = years.findIndex( year => year === getYear( value ));

    const hoursIndex = getHours( value );

    // console.log( 'year', key, yearIndex, currentYear, years );

    let newIndex = hoursIndex;

    if ( newIndex < 12 ) {
      newIndex = newIndex + 12;
    }
    else if ( newIndex >= 12 ) {
      newIndex = newIndex - 12;
    }

    // const newYear = [years[newIndex]];

    const newDate = setHours( value, newIndex );

    // console.log( 'value', value, value &&  value.length );
    // console.log( 'newYear', newYear, newDate );

    if ( callback ) callback( newDate );
    if ( setDate ) setDate( newDate );
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
        onChange={( value ) => {
          console.log( 'onChange', value );
          this.handleChange( value );
        }}
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
          console.log( 'inputValue', inputValue );

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
                    // getWeeksInMonth,
                    setDate,
                    selectedItem,
                    date,
                    selectItem,
                  }) => {
                    // const weeksInCurrentMonth = getWeeksInMonth();
                    // const isDisabled = dateValue => !isSameMonth( date, dateValue );
                    // const isSelectedDay = date => (
                    //   selectedItem &&
                    //   format( selectedItem ) === format( date )
                    // );

                    // const monthValue = [months[getMonth( date )]];
                    // const yearValue = [years[years.findIndex( year => year === getYear( date ))]];

                    const hourValue = '';
                    const minuteValue = '';
                    // const secondValue = '';

                    console.log( 'selectedItem', selectedItem,  );
                    // console.log( 'inputvalue', inputValue, displayFormat  );

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
                />
              </Box>
            </Box>
          );}}
      </Downshift>
    );
  }
}

export default InputTimePicker;
