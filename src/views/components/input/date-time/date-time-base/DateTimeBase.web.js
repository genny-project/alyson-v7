import React, { PureComponent } from 'react';
import { string, func, oneOfType, object, bool } from 'prop-types';
import Downshift from 'downshift';
import Kalendaryo from 'kalendaryo';
import range from 'lodash.range';
import dlv from 'dlv';
import {
  format,
  setMonth,
  setYear,
  getMonth,
  getYear,
  getDate,
  getDaysInMonth,
  setDate as setDay,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
} from 'date-fns';
import { isArray, isString } from '../../../../../utils';
import { Box, Touchable } from '../../../../components';
import { SubcomponentThemeHandler } from '../../../form/theme-handlers';

const NUMBER_OF_DOB_YEARS = 125;
const NUMBER_OF_CLOCK_HOURS = 12;
const NUMBER_OF_MINUTES = 60;

const separatorRegex = /(,|\s|\/|-|_|:)/g;

const currentYear = new Date().getFullYear();
const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const years = range( NUMBER_OF_DOB_YEARS ).map( year => currentYear + 2 - year );
const hours = range( NUMBER_OF_CLOCK_HOURS ).map( day => day + 1 );
const clockFormat = ['Am', 'Pm'];
const minutes = range( NUMBER_OF_MINUTES ).map( minutes => minutes );

// console.warn( 'minutes', minutes );

const dateTimeFormats = {
  // dayOfWeek: ['d', 'do', 'dd', 'ddd', 'dddd'],
  dayOfMonth: ['D', 'Do', 'DD'],
  // dayOfYear: ['DDD', 'DDDo', 'DDDD'],
  // quarter: ['Q', 'Qo'],
  month: ['M', 'Mo', 'MM', 'MMM', 'MMMM'],
  year: ['YY', 'YYYY'],
  hour: ['H', 'HH', 'h', 'hh'],
  minutes: ['m', 'mm'],
  // seconds: ['s', 'ss'],
  ampm: ['A', 'a', 'aa'],
  // timezone: ['Z', 'ZZ'],
};

const letterOnlyFields = [
  'MMM',
  'MMMM',
  'dd',
  'ddd',
  'dddd',
];

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
    disabled: bool,
    error: string,
    placeholder: string,
    children: func,
    subcomponentProps: object,
  }

  selectionValues = {};

  selectionFields = [];

  inputSections = [];

  tempSectionValue = null;

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
      // this.props.value != null &&
      prevProps.value !== this.props.value
    ) {
      this.setSelectedItem();
    }
  }

  setSelectedItem = () => {
    if ( isString( this.props.value ) || this.props.value === null ) {
      this.setState({
        value: this.props.value,
      });
    }
  }

  setFields = ( formattedDate ) => {
    // console.warn( 'foramatted date', formattedDate );
    const selectionValuesForInputSections = ( datestring ) => {
      // console.warn( 'date tring', datestring );

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

    this.setSelectionValues( formattedDate );

    const date = format( value );

    this.setState({
      value: date,
    }, () => {
      // console.log( 'date', date );
      if ( this.props.onChangeValue ) {
        clearTimeout( this.state.timer );

        // eslint-disable-next-line
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

      let newField = null;

      Object.keys( fields ).some(( fieldKey, index ) => {
        const field = fields[fieldKey];
        const nextField = fields[index + 1];
        const isLastField = index >= Object.keys( fields ).length - 1;
        const areaStart = areas[field].start;
        const areaEnd = isLastField ? areas[field].end : areas[nextField].start;

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
          newField = field;

          return true;
        }
      });

      return newField;
    };

    const finalField = locateSelectionArea( selection );

    if ( this.state.currentInputSection !== finalField ) {
      this.setState({
        currentInputSection: finalField,
      });
    }
  }

  handleKeyPress = ( value, callback, setDate, date ) => event => {
    const key = event.key;

    switch ( key ) {
      case 'ArrowDown':
      case 'ArrowUp':
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
          case 'dayOfMonth':
            this.handleIncrementDayOfMonth( value, key, callback, setDate );
            break;
          case 'month':
            this.handleIncrementMonth( value, key, callback, setDate );
            break;
          case 'year':
            this.handleIncrementYear( value, key, callback, setDate, date );
            break;
          default:
            // eslint-disable-next-line no-console
            console.warn( 'invalid this.state.currentInputSection' );
        }
        break;
      case 'ArrowLeft':
        this.handleInputSectionChange( 'prev' );
        break;
      case 'ArrowRight':
      case 'Enter':
        this.handleInputSectionChange( 'next' );
        break;
      case 'Tab':
        this.setState({
          currentInputSection: this.inputSections[0],
        });
        break;
      case 'Space':
          // console.log( 'enter or space' );
        break;
      default: {
        const alphaRegex = /^[a-zA-Z]+$/g;
        const numericRegex = /^[0-9]+$/g;

        if (
          alphaRegex.test( key ) ||
          numericRegex.test( key )
        ) {
          this.handleAutocompleteSection( value, key, callback, setDate, date,  );
        }
      }
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

  handleIncrementDayOfMonth = ( value, key, callback ) => {
    // console.log( 'increment day', value, key );

    const daysInMonth = getDaysInMonth( value );
    const currentDay = getDate( value );

    let newDay = key === 'ArrowUp' ? currentDay + 1 : currentDay - 1;

    if ( newDay <= 0 ) {
      newDay = daysInMonth;
    }
    else if ( newDay > daysInMonth ) {
      newDay = 1;
    }

    const newDate = setDay( value, newDay );

    if ( callback ) callback( newDate );
  }

  handleIncrementMonth = ( value, key, callback, setDate ) => {
    const monthIndex = getMonth( value );

    let newMonth = key === 'ArrowUp' ? monthIndex + 1 : monthIndex - 1;

    if ( newMonth < 0 ) {
      newMonth = 11;
    }
    else if ( newMonth > 11 ) {
      newMonth = 0;
    }

    const newDate = setMonth( value, newMonth );

    if ( callback ) callback( newDate );
    if ( setDate ) setDate( newDate );
  }

  handleIncrementYear = ( value, key, callback, setDate ) => {
    const yearIndex = years.findIndex( year => year === getYear( value ));

    let newIndex = key === 'ArrowUp' ? yearIndex - 1 : yearIndex + 1;

    if ( newIndex < 0 ) {
      newIndex = years.length - 1;
    }
    else if ( newIndex > years.length - 1 ) {
      newIndex = 0;
    }

    const newYear = [years[newIndex]];

    const newDate = setYear( value, newYear );

    if ( callback ) callback( newDate );
    if ( setDate ) setDate( newDate );
  }

  handleSelectDay = ( callback, selectItem, day ) => {
    selectItem( day.dateValue );
    callback();
  }

  handleSelectMonth = ( callback, date ) => value => {
    const newMonth = isArray( value, { ofMinLength: 1 })
      ? value[0] : value;
    const monthIndex = months.findIndex( m => m === newMonth );
    const newDate = setMonth( date, monthIndex );

    callback( newDate );
  }

  handleSelectYear = ( callback, date ) => value => {
    const newDate = setYear( date, value );

    callback( newDate );
  }

  handleAutocompleteSection = ( value, key, callback, setDate ) => {
    const { currentInputSection } = this.state;
    // get stored value and add key to store value
    const newCharacter = isString( this.tempSectionValue )
      ? this.tempSectionValue + key
      : key;

    const findMatchingValue = ( valueOptions, setField ) => {
      let match = null;
      let partials = 0;

      valueOptions.forEach( valueOption => {
        const formatValue = ( value ) => value.toString().toLowerCase();
        const completeMatch = formatValue( valueOption ) === formatValue( newCharacter );
        const partialMatch = formatValue( valueOption ).startsWith( formatValue( newCharacter ));

        if ( completeMatch ) {
          match = valueOption;
        }
        else if ( partialMatch ) {
          partials = partials + 1;
          if ( !match ) {
            match = valueOption;
          }
        }
      });

      const newDate = setField( value, match );

      if ( !match && !partials && !isString( this.tempSectionValue )) {
        return;
      }

      if ( match ) {
        if ( callback ) callback( newDate );
        if ( setDate ) setDate( newDate );
      }

      if ( partials >= 2 ) {
        this.tempSectionValue = newCharacter;
      }
      else {
        this.tempSectionValue = null;
        this.handleInputSectionChange( 'next' );
      }
    };

    switch ( currentInputSection ) {
      case 'ampm': {
        const ampmValues = ['a', 'p'];
        const setNewAmPm = ( value, amPm ) => {
          const hoursIndex = getHours( value );
          let offsetHour = hoursIndex;

          if ( offsetHour < 12 && amPm === 'p' ) {
            offsetHour = offsetHour + 12;
          }
          else if ( offsetHour >= 12 && amPm === 'a' ) {
            offsetHour = offsetHour - 12;
          }

          return setHours( value, offsetHour );
        };

        findMatchingValue( ampmValues, setNewAmPm );
      }
        break;
      case 'minutes': {
        const minuteValues = range( 60 ).map( m => m + 1 );
        const setNewMinutes = ( value, minutes ) => {
          return setMinutes( value, minutes );
        };

        findMatchingValue( minuteValues, setNewMinutes );
      }
        break;
      case 'hour': {
        const hourValues = range( 12 ).map( m => m + 1 );
        const setNewHours = ( value, hour ) => {
          return setHours( value, hour );
        };

        findMatchingValue( hourValues, setNewHours );
      }
        break;
      case 'dayOfMonth': {
        const daysInMonth = getDaysInMonth( value );
        const dayValues = range( daysInMonth ).map( m => m + 1 );
        const setNewDay = ( value, day ) => {
          return setDay( value, day );
        };

        findMatchingValue( dayValues, setNewDay );
      }
        break;
      case 'month': {
        const monthValues = range( 12 ).map( m => m + 1 );
        const monthNames = months;

        const monthField = Object.keys( this.selectionFields ).filter( f => this.selectionFields[f].type === 'month' ).length > 0
          ? this.selectionFields[Object.keys( this.selectionFields ).filter( f => this.selectionFields[f].type === 'month' )[0]].value
          : '';

        const fieldType = letterOnlyFields.includes( monthField );

        const setNewMonth = ( value, month ) => {
          const monthIndex = months.findIndex( m => m === month );

          return setMonth( value, fieldType ? monthIndex : month - 1 );
        };

        // add function to check against month string eg "Feb"

        findMatchingValue( fieldType ? monthNames : monthValues, setNewMonth );
      }
        break;
      case 'year': {
        // const yearValues = years.reverse();
        const yearValues = years;

        findMatchingValue( yearValues, setYear );
      }
        break;
      default:
        // eslint-disable-next-line no-console
        console.log( 'invalid this.state.currentInputSection' );
    }
  }

  handleInputSectionChange = ( direction ) => {
    const currentIndex = Object.keys( this.inputSections )
      .findIndex( key => this.inputSections[key] === this.state.currentInputSection );
    const maxIndex = Object.keys( this.inputSections ).length;

    if ( direction === 'prev' ) {
      this.setState({
        currentInputSection: this.inputSections[
          currentIndex <= 0
            ? currentIndex
            : currentIndex - 1
        ],
      });
    }
    else if ( direction === 'next' ) {
      this.setState({
        currentInputSection: this.inputSections[
          currentIndex >= maxIndex - 1
            ? currentIndex
            : currentIndex + 1
        ],
      });
    }
  }

  render() {
    // console.warn( '%c Render-DateTimeBase', 'color: green', this.props );
    const {
      displayFormat,
      // value,
      // testID,
      onChangeValue, // eslint-disable-line no-unused-vars
      children,
      subcomponentProps,
    } = this.props;

    const { isCalendarOpen, value } = this.state;

    return (
      // STATE HOLDER
      <SubcomponentThemeHandler
        subcomponentProps={subcomponentProps}
        editable={this.props.editable}
        disabled={this.props.disabled}
        error={this.props.error}
      >
        {({
          componentProps,
          updateState,
          filterComponentProps,
        }) => {
          return (
            <Downshift
              // defaultInputValue={this.state.value}
              defaultInputValue={value ? format( value, displayFormat ) : null}
              onChange={this.handleChange}
              itemToString={date => {
                const newValue = date ? format( date, displayFormat ) : '';

                return newValue;
              }}
              isOpen={isCalendarOpen}
              selectedItem={value}
            >
              {({
                getInputProps,
                getItemProps,
                getRootProps,
                isOpen,
                selectedItem,
                inputValue,
                selectItem,
                setHighlightedIndex,
                highlightedIndex,
              }) => {
                return (
                  <Box
                    {...getRootProps({ refKey: 'onRef' })}
                    componentID="INPUT-WRAPPER"
                    {...componentProps['input-wrapper']}
                  >
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
                          getDate,
                          inputValue,
                          date,
                          selectedItem,
                          selectItem,
                          setHighlightedIndex,
                          highlightedIndex,
                          isOpen,
                          setDate,
                          currentYear,
                          daysOfTheWeek,
                          months,
                          years,
                          hours,
                          clockFormat,
                          minutes,
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
                          componentProps,
                          updateState,
                          filterComponentProps,
                        });
                      }}
                    />
                  </Box>
                );
              }}
            </Downshift>
          );
        }}
      </SubcomponentThemeHandler>
    );
  }
}

export default DateTimeBase;
