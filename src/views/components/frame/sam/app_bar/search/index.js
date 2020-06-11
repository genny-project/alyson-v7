import React, { useState, useEffect } from 'react';

import { Bridge } from '../../../../../../utils/vertx/index';

import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles';

const Search = ({ question }) => {
  const { askId, attributeCode, code, sourceCode, targetCode, weight } = question;

  const [value, setValue] = useState('');

  const classes = useStyles();

  useEffect(
    () => {
      Bridge.sendFormattedAnswer({
        askId,
        attributeCode,
        sourceCode,
        targetCode,
        code,
        identifier: code,
        weight,
        value,
      });
    },
    [value]
  );

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon color="inherit" />
      </div>
      <InputBase
        placeholder="Search..."
        onChange={event => setValue(event.target.value)}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

export default Search;
