import React from 'react';

import { Card, CardContent, CardHeader, Typography, Grid, Avatar } from '@material-ui/core';

import useStyles from './styles';

const Item = ({ item: { email, name, profilePicture, mobile, studentId, statusColor } }) => {
  const classes = useStyles();

  return (
    <Card className={classes.itemRoot}>
      <CardHeader
        avatar={<Avatar alt={name} src={profilePicture} />}
        title={name}
        subheader={email}
      />
    </Card>
  );
};

export default Item;
