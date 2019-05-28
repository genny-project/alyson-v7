/**
 * Adapted from https://codesandbox.io/s/j47zv28xkw
 */

import React, { PureComponent } from './node_modules/react';
import { string, func, oneOfType, object, bool } from './node_modules/prop-types';
import Downshift from './node_modules/downshift';
import Kalendaryo from './node_modules/kalendaryo';
import range from './node_modules/lodash.range';
import dlv from './node_modules/dlv';
import { format, isSameMonth, setMonth, setYear, getMonth, getYear, getDate, getDaysInMonth, setDate } from 'date-fns';
import { isArray } from '../../../../../utils';

const NUMBER_OF_DOB_YEARS = 125;

const currentYear = new Date().getFullYear();
const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const years = range( NUMBER_OF_DOB_YEARS ).map( year => currentYear + 2 - year );

const dateFormatFields = {
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

class DateTimeBase extends PureComponent {
  static defaultProps = {
    displayFormat: 'DD/MM/YYYY',
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
      const regex = /(,\s|\s|\/)/g;

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
        this.setState( state => ({
          currentInputSection: state.currentInputSection === 'day'
            ? 'month'
            : state.currentInputSection === 'month'
              ? 'year'
              : 'year',
        }));
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

                return children({
                  ...this.state,
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
                });
              }}
            />
          );}}
      </Downshift>
    );
  }
}

export default DateTimeBase;
