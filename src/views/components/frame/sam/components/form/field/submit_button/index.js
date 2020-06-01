import React from 'react';

import { Button } from '@material-ui/core';

const SubmitButton = ({ label, onSubmit, disabled, fieldData }) => {
  const handleSubmit = () => onSubmit({ ask: fieldData });

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
