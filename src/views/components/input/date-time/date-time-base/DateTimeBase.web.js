import React, { PureComponent } from 'react';
import { string, func, oneOfType, object, bool } from 'prop-types';
import Downshift from 'downshift';
import Kalendaryo from 'kalendaryo';
import range from 'lodash.range';
import dlv from 'dlv';
import { format, isSameMonth, isToday, setMonth, setYear, getMonth, getYear, getDate, getDaysInMonth, setDate, getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import { isArray, isString } from '../../../../../utils';
import { Input, Box, Text, Touchable, Icon } from '../../../../components';

const NUMBER_OF_DOB_YEARS = 125;
const separatorRegex = /(,|\s|\/|-|_|:)/g;

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

class DateTimeBase extends PureComponent {
  static defaultProps = {
    // displayFormat: 'DD/MM/YYYY',
    displayFormat: 'MMMM-Do-YYYY',
    placeholder: 'Please select a date...', // eslint-disable-line
  }

  static propTypes = {
    displayFormat: string,
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
      return datestring.split( separatorRegex );
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

    this.selectionFields = fields;
    this.inputSections = inputs;
  }

  setSelectionValues = ( formattedDate ) => {
    const selectionValuesForInputSections = ( datestring ) => {
      return datestring.split( separatorRegex );
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

    const locateSelectionArea = ({ end }) => {
      const areas = this.selectionValues;
      const fields = this.inputSections;
      const cursorIndex = end;

      if (
        this.state.preventChange
      ) {
        this.setState({
          preventChange: false,
        });

        return this.state.currentInputSection;
      }

      const newField = Object.keys( fields ).forEach( fieldKey => {
        const field = fields[fieldKey];
        const isLastField = fieldKey >= fields.length - 1;
        const areaStart = areas[field].start;
        const areaEnd = isLastField
          ? areas[field].end
          : areas[fields[fieldKey + 1]].start;

        if (
          (
            !isLastField &&
            cursorIndex >= areaStart &&
            cursorIndex < areaEnd
          ) || (
            isLastField &&
            cursorIndex >= areaStart &&
            cursorIndex <= areaEnd
          )
        ) {
          return field;
        }
      });

      return newField;
    };

    const field = locateSelectionArea( selection );

    if ( this.state.currentInputSection !== field ) {
      this.setState({
        currentInputSection: field,
      });
    }
  }

  handleKeyPress = ( value, callback, setDate, date ) => event => {
    const key = event.nativeEvent.key;

    const currentIndex = Object.keys( this.inputSections )
      .findIndex( key => this.inputSections[key] === this.state.currentInputSection );
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
          case 'ampm':
            this.handleChangeAmPm( value, key, callback, setDate, date );
            break;
          case 'minutes':
            this.handleIncrementMinutes( value, key, callback, setDate, date );
            break;
          case 'hour':
            this.handleIncrementHours( value, key, callback, setDate, date );
            break;
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
        this.setState({
          currentInputSection: this.inputSections[
            currentIndex <= 0
              ? currentIndex
              : currentIndex - 1
          ],
        });
        break;
      case 'ArrowRight':
      case 'Enter':
        this.setState({
          currentInputSection: this.inputSections[
            currentIndex >= maxIndex - 1
              ? currentIndex
              : currentIndex + 1
          ],
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

  handleIncrementHours = ( value, key, callback, setDate ) => {
    const currentHour = getHours( value );

    let newHour = key === 'ArrowUp' ? currentHour + 1 : currentHour - 1;

    if ( currentHour >= 0 && currentHour <= 11 ) {
      if ( newHour < 0 ) {
        newHour = 11;
      }
      else if ( newHour > 11 ) {
        newHour = 0;
      }
    }
    else if ( currentHour >= 12 && currentHour <= 23 ) {
      if ( newHour < 12 ) {
        newHour = 23;
      }
      else if ( newHour > 23 ) {
        newHour = 12;
      }
    }

    const newDate = setHours( value, newHour );

    if ( callback ) callback( newDate );
    if ( setDate ) setDate( newDate );
  }

  handleIncrementMinutes = ( value, key, callback, setDate ) => {
    const minutesIndex = getMinutes( value );

    let newMinutes = key === 'ArrowUp' ? minutesIndex + 1 : minutesIndex - 1;

    if ( newMinutes < 0 ) {
      newMinutes = 59;
    }
    else if ( newMinutes > 59 ) {
      newMinutes = 0;
    }

    const newDate = setMinutes( value, newMinutes );

    if ( callback ) callback( newDate );
    if ( setDate ) setDate( newDate );
  }

  handleChangeAmPm = ( value, key, callback, setDate ) => {
    const hoursIndex = getHours( value );

    let newIndex = hoursIndex;

    if ( newIndex < 12 ) {
      newIndex = newIndex + 12;
    }
    else if ( newIndex >= 12 ) {
      newIndex = newIndex - 12;
    }

    const newDate = setHours( value, newIndex );

    if ( callback ) callback( newDate );
    if ( setDate ) setDate( newDate );
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
      value,
      testID,
      onChangeValue, // eslint-disable-line no-unused-vars
      children,
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
                    selectItem,
                  }) => {
                    return children({
                      getRootProps,
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
                      currentYear,
                      daysOfTheWeek,
                      months,
                      years,
                      selection: this.selectionValues[this.state.currentInputSection],
                      onRef: this.handleRef,
                      close: this.handleCalendarClose,
                      open: this.handleCalendarOpen,
                      toggle: this.handleCalendarToggle,
                      onBlur: this.handleBlur,
                      onKeyPress: this.handleKeyPress,
                      onSelectionChange: this.handleSelectionChange,
                      selectDay: this.handleSelectDay,
                      selectMonth: this.handleSelectMonth,
                      selectYear: this.handleSelectYear,
                    });
                  }}
                />
              </Box>
            </Box>
          );
        }}
      </Downshift>
    );
  }
}

export default DateTimeBase;
