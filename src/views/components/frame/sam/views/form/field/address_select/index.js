import React, { useState, useEffect } from 'react';

import {
  TextField,
  Tooltip,
  Grid,
  IconButton,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import GoogleAutocompleteSuggestions from './google_autocomplete_suggestions';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';

import makeAddressData from './helpers/make-address-data';
import makeHandleUpdate from '../../helpers/make-handle-update';
import { getIsMobile } from '../../../../utils';
import useStyles from './styles';

const AddressSelect = ({ fieldData, onUpdate, googleApiKey }) => {
  const handleUpdate = makeHandleUpdate( onUpdate )( fieldData );

  const classes = useStyles();
  const [value, setValue] = useState( null );
  const [restrictCountry, setRestrictCountry] = useState( true );

  const handleSend = async () => {
    const result = await geocodeByPlaceId( value.place_id || '' );

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
      direction={getIsMobile() ? 'column' : 'row'}
      spacing={2}
    >
      <Grid
        item
        className={classes.icon}
        {...( getIsMobile() ? '' : { xs: 1 })}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.iconGrid}
        >
          <Grid item>
            <Tooltip title={restrictCountry ? 'Unlock region' : 'Lock to Australia'}>
              <div>
                <IconButton onClick={() => setRestrictCountry( !restrictCountry )}>
                  {restrictCountry ? <LockIcon /> : <LockOpenIcon />}
                </IconButton>
              </div>
            </Tooltip>
          </Grid>
          <Grid item>
            {getIsMobile() ? (
              <Typography>
                {'Toggle restricted to Australia'}
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        {...( getIsMobile() ? '' : { xs: 11 })}
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
