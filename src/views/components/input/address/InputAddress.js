import React, { Component } from 'react';
import { func, number, object, array, string, oneOf } from 'prop-types';
import debounce from 'lodash.debounce';
import dlv from 'dlv';
import { flag /* code, name, countries */  } from 'country-emoji';
import { Input, GoogleConsumer, Touchable, Box, Text } from '../../index';
import { isString } from '../../../../utils';

const iconInternational = String.fromCodePoint( 0x1F30E );
const iconAU = flag( 'AU' );

class InputAddress extends Component {
  static defaultProps = {
    debounceTimer: 100,
    includeAddressFields: [
      'street_number',
      'route',
      'locality',
      'administrative_area_level_1',
      'postal_code',
      'country',
    ],
    excludeAddressFields: [],
    mapAddressComponentToField: {
      route: 'street_name',
      locality: 'suburb',
      administrative_area_level_1: 'state',
    },
    injectCustomAddressComponents: {
      street_address: '{{street_number}} {{street_name}}',
    },
    placeholder: 'Please enter an address...',
    getShortNameForAddressComponents: ['country'],
    restrictCountry: 'au',
  }

  static propTypes = {
    placeholder: string,
    onChange: func,
    onChangeValue: func,
    debounceTimer: number,
    google: object,
    includeAddressFields: array,
    excludeAddressFields: array,
    mapAddressComponentToField: object,
    injectCustomAddressComponents: object,
    getShortNameForAddressComponents: array,
    testID: string,
    restrictCountry: oneOf( [
      'au',
    ] ),
  }

  constructor( props ) {
    super( props );

    this.autocompleteAddress = debounce(
      this.autocompleteAddress,
      this.props.debounceTimer
    );
  }

  state = {
    items: [],
    countryLock: true,
  }

  autocompleteAddress = async address => {
    const { google, restrictCountry } = this.props;

    const options = {
      ...(
        isString( restrictCountry, { ofMinLength: 1 }) &&
        this.state.countryLock === true
          ? {
            componentRestrictions: {
              country: restrictCountry,
            },
          }
          : {}
      ),
    };

    if ( isString( address, { ofMinLength: 1 })) {
      try {
        const items = await google.autocompleteAddress(
          address,
          options
        );

        this.setState({ items });
      }
      catch ( error ) {
        // eslint-disable-next-line no-console
        console.warn( error );

        this.setState({ items: [] });
      }
    }
    else {
      this.setState({ items: [] });
    }
  }

  geocodeAddress = async address => {
    const { google } = this.props;

    try {
      await google.geocodeAddress( address );
    }
    catch ( error ) {
      // eslint-disable-next-line no-console
      console.warn( error );

      this.setState({ items: [] });
    }
  }

  formatPlace( place ) {
    // console.log( 'formatPlace', place );

    try {
      const { injectCustomAddressComponents } = this.props;
      const { formatted_address, address_components, geometry } = place;

      const components =
        address_components
          .filter( this.handleFilterAddressComponents )
          .reduce( this.handleReduceAddressComponent, {});

      const customComponents =
        injectCustomAddressComponents
          ? this.createCustomAddressComponents( components )
          : {};

      return {
        ...components,
        full_address: formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng,
        ...customComponents,
      };
    }
    catch ( error ) {
      throw new Error( 'Attempted to invoke `formatPlace` without a valid place object', error );
    }
  }

  createCustomAddressComponents( addressComponents ) {
    const { injectCustomAddressComponents } = this.props;

    return Object
      .keys( injectCustomAddressComponents )
      .reduce(( resultant, customAddressComponent ) => {
        const component =
          injectCustomAddressComponents[customAddressComponent]
            .split( '{{' )
            .map( this.handleFillCustomAddressPath( addressComponents ))
            .join( '' );

        resultant[customAddressComponent] = component;

        return resultant;
      }, {});
  }

  handleFillCustomAddressPath = addressComponents => path => {
    /* Remove the ending }} from the dirty path, and
    * keep the delimiter at the end in a separate array
    * element.
    */
    const tokens = path.split( '}}' );

    /* Set the first token, which is the sanitized path,
      * to be the corresponding value from the key in
      * `components`.
      */
    tokens[0] = dlv( addressComponents, tokens[0] );

    /* Re-combine tokens back to a single string. */
    return tokens.join( '' );
  }

  handleFilterAddressComponents = ({ types }) => {
    const { includeAddressFields, excludeAddressFields } = this.props;

    for ( const type of types ) {
      if (
        includeAddressFields.includes( type ) &&
        !excludeAddressFields.includes( type )
      ) {
        return true;
      }
    }

    return false;
  }

  handleReduceAddressComponent = ( resultant, addressComponent ) => {
    const {
      includeAddressFields,
      mapAddressComponentToField,
      getShortNameForAddressComponents,
    } = this.props;

    const { long_name, short_name, types } = addressComponent;

    types.forEach( type => {
      if ( includeAddressFields.includes( type )) {
        const key = mapAddressComponentToField[type] || type;

        if ( getShortNameForAddressComponents.includes( key ))
          resultant[key] = short_name;
        else
          resultant[key] = long_name;
      }
    });

    return resultant;
  }

  handleChange = async item => {
    // console.log( 'handleChange', item );

    const { google } = this.props;
    const { place_id } = item;

    try {
      const places = await google.geocodeAddress({
        placeId: place_id,
      });

      if (
        !places ||
        !( places instanceof Array ) ||
        !places.length
      ) {
        throw new Error( `Unable to find geocoded results for placeId ${place_id}` );
      }

      const formattedPlace = this.formatPlace( places[0] );

      if ( this.props.onChange ) {
        this.props.onChange({
          target: {
            value: formattedPlace,
          },
        });
      }

      if ( this.props.onChangeValue )
        this.props.onChangeValue( formattedPlace );
    }
    catch ( error ) {
      // eslint-disable-next-line no-console
      console.warn( error );
    }
  }

  handleToggleCountryLock = () => {
    this.setState( state => ({
      countryLock: !state.countryLock,
    }));
  }

  handleType = text => {
    // console.log( 'handleType', text );
    this.autocompleteAddress( text );
  }

  render() {
    const { testID, ...restProps } = this.props;
    const { items, countryLock } = this.state;

    return (
      <Box
        flexDirection="row"
        alignItems="center"
      >
        {/*
          This can be turned into a dropdown menu to allow any country to be selected.
        */}
        <Touchable
          withFeedback
          onPress={this.handleToggleCountryLock}
        >
          <Text
            text={countryLock ? iconAU : iconInternational}
            size="sm"
          />
        </Touchable>
        <Box
          paddingLeft={5}
        />

        <Input
          {...restProps}
          type="autocomplete"
          items={items}
          placeholder={this.props.placeholder}
          borderBetweenItems
          onType={this.handleType}
          itemStringKey="description"
          onChange={this.handleChange}
          testID={testID}
        />

      </Box>
    );
  }
}

export default props => (
  <GoogleConsumer>
    {google => (
      <InputAddress
        {...props}
        google={google}
      />
    )}
  </GoogleConsumer>
);
