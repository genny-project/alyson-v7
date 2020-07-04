import React, { useState, useEffect } from 'react'

import {
  TextField,
  Tooltip,
  Grid,
  IconButton,
  CircularProgress,
  Typography,
} from '@material-ui/core'
import LockIcon from '@material-ui/icons/LockOutlined'
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import GoogleAutocompleteSuggestions from './google_autocomplete_suggestions'

import { getIsMobile } from '../../../../utils'
import handleSendAddress from './helpers/handle-send-address'
import useStyles from './styles'

const AddressSelect = ({ fieldData, onUpdate, googleApiKey, initialValue }) => {
  const {
    mandatory,
    question: { code: questionCode },
  } = fieldData

  const classes = useStyles()
  const [value, setValue] = useState(initialValue || null)
  const [restrictCountry, setRestrictCountry] = useState(true)

  useEffect(
    () => {
      if (value) {
        handleSendAddress({ onUpdate, value })
      }
    },
    [value],
  )

  return (
    <Grid container direction={getIsMobile() ? 'column' : 'row'} spacing={2}>
      <Grid item className={classes.icon} {...(getIsMobile() ? '' : { xs: 1 })}>
        <Grid container direction="row" alignItems="center" className={classes.iconGrid}>
          <Grid item>
            <Tooltip title={restrictCountry ? 'Unlock region' : 'Lock to Australia'}>
              <div>
                <IconButton onClick={() => setRestrictCountry(!restrictCountry)}>
                  {restrictCountry ? <LockIcon /> : <LockOpenIcon />}
                </IconButton>
              </div>
            </Tooltip>
          </Grid>
          <Grid item>
            {getIsMobile() ? <Typography>{'Toggle restricted to Australia'}</Typography> : null}
          </Grid>
        </Grid>
      </Grid>
      <Grid item {...(getIsMobile() ? '' : { xs: 11 })}>
        <GooglePlacesAutocomplete
          apiKey={googleApiKey}
          onSelect={selection => setValue(selection)}
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
              placeholder={initialValue || ''}
              required={mandatory}
              label="Address"
              variant="outlined"
              fullWidth
              className={classes.inputField}
              test-id={questionCode}
            />
          )}
          loader={<CircularProgress />}
          renderSuggestions={(active, suggestions, onSelectSuggestion) => (
            <GoogleAutocompleteSuggestions
              active={active}
              suggestions={suggestions}
              onSelectSuggestion={onSelectSuggestion}
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

export default AddressSelect
