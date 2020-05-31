import React from 'react';
import { Button } from '@material-ui/core';

const makeButton = ({ onClick, question: { name } }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
    >
      {name}
    </Button>
  );
};

export default makeButton;
