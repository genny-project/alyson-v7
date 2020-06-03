import React, { useState, useEffect } from 'react';

import {
  TextField,
  makeStyles,
  Tooltip,
  Grid,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import Geocode from 'react-geocode';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import GoogleAutocompleteSuggestions from './google_autocomplete_suggestions';

import makeAddressData from './helpers/make-address-data';

const useStyles = makeStyles( theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing( 2 ),
  },
  inputField: {
    minWidth: theme.spacing( 50 ),
  },
}));

const AddressSelect = ({ fieldData, onUpdate, googleApiKey }) => {
  const {
    attributeCode,
    question: { code: questionCode },
    sourceCode,
    targetCode,
    weight,
  } = fieldData;

  const handleUpdate = value =>
    onUpdate({
      ask: {
        attributeCode,
        questionCode,
        sourceCode,
        targetCode,
        weight,
      },
      value,
    });

  const classes = useStyles();
  const [value, setValue] = useState( null );
  const [restrictCountry, setRestrictCountry] = useState( true );

  const handleSend = async () => {
    const result = await Geocode.fromAddress( value.description || '' );

    if ( result ) {
      const addressData = makeAddressData( result );

      handleUpdate( addressData );
    }
  };

  useEffect(
    () => {
      if ( value ) {
        handleSend();
      }
    },
    [value]
  );

  return (
    <Grid
      container
      row
    >
      <Grid
        item
        className={classes.icon}
      >
        <Tooltip title={restrictCountry ? 'Unlock region' : 'Lock to Australia'}>
          <IconButton onClick={() => setRestrictCountry( !restrictCountry )}>
            {restrictCountry ? <LockIcon /> : <LockOpenIcon />}
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid
        item
        className={classes.inputField}
      >
        <GooglePlacesAutocomplete
          apiKey={googleApiKey}
          onSelect={selection => setValue( selection )}
          autocompletionRequest={
            restrictCountry
              ? {
                componentRestrictions: {
                  country: 'au',
                },
              }
              : {}
          }
          renderInput={params => (
            <TextField
              {...params}
              label="Address"
              variant="outlined"
              fullWidth
              className={classes.inputField}
            />
          )}
          loader={<CircularProgress />}
          renderSuggestions={( active, suggestions, onSelectSuggestion ) => (
            <GoogleAutocompleteSuggestions
              active={active}
              suggestions={suggestions}
              onSelectSuggestion={onSelectSuggestion}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default AddressSelect;
