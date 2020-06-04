import React, { useState } from 'react';
import {
  includes,
  map,
  path,
  pick,
  values,
  prop,
  sortBy,
  find,
  propEq,
  head,
  compose,
} from 'ramda';
import { FormControl, InputLabel, MenuItem, Select, Chip, Typography } from '@material-ui/core';

import makeHandleUpdate from '../../helpers/make-handle-update';

import useStyles from './styles';

const DropdownSelect = ({
  fieldData,
  initialValue,
  label,
  validationList,
  baseEntities,
  multiple,
  onUpdate,
  setErrors,
  errors,
}) => {
  const optionsGrpName = compose(
    head,
    prop( 'selectionBaseEntityGroupList' ),
    head
  )( validationList );

  const optionsLinkList = path( [optionsGrpName, 'links'], baseEntities ) || [];
  const targetCodes = map( path( ['link', 'targetCode'] ), optionsLinkList ) || [];
  const options = sortBy( prop( 'name' ))( values( pick( values( targetCodes ), baseEntities ))) || [];
  const handleUpdate = makeHandleUpdate( onUpdate )( fieldData );

  const {
    mandatory,
    question: { code: questionCode },
  } = fieldData;
  const findOption = code => find( propEq( 'code', code ))( options );
  const [value, setValue] = useState( initialValue || multiple ? [] : '' );
  const [pristine, setPristine] = useState( true );
  const classes = useStyles();

  const handleChange = ({ target: { value } }) => {
    setValue( value );
    if ( pristine ) setPristine( false );
    if ( mandatory && value ) {
      setErrors( errors => ({ ...errors, [questionCode]: false }));
    }
    handleUpdate( multiple ? value : [value] );
  };

  return (
    <FormControl
      variant="outlined"
      className={classes.select}
    >
      <InputLabel>
        {label}
      </InputLabel>
      <Select
        error={errors[questionCode] && !pristine}
        label={label}
        multiple={multiple}
        value={value}
        onChange={handleChange}
        required={mandatory}
        renderValue={selected =>
          multiple ? (
            <div className={classes.chips}>
              {map(
                code => (
                  <Chip
                    key={code}
                    label={prop( 'name', findOption( code ) || {})}
                    className={classes.chip}
                  />
                ),
                selected
              )}
            </div>
          ) : (
            <Typography>
              {prop( 'name', findOption( selected ) || {})}
            </Typography>
          )
        }
      >
        {map(
          ({ code, name }) => (
            <MenuItem
              value={code}
              key={`menuItem${code}`}
            >
              <Typography color={includes( code, multiple ? value : [value] ) ? 'primary' : ''}>
                {name}
              </Typography>
            </MenuItem>
          ),
          options || []
        )}
      </Select>
    </FormControl>
  );
};

export default DropdownSelect;
