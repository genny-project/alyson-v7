import React from 'react';

import { Typography } from '@material-ui/core';

import useStyles from './styles';

const ColumnHeader = ({ title }) => {
  const classes = useStyles();

  return <Typography className={classes.title}>{title}</Typography>;
};

export default ColumnHeader;
