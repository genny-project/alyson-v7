import React from 'react';
import { any } from 'prop-types';
import { Box, Text } from '../.../../../components';

const Debug = ({ value }) => {
  return (
    <Box
      backgroundColor="#e3e3e3"
      padding="10px"
    >
      <Text text={JSON.stringify( value )} />
    </Box>
  );
};

Debug.propTypes = {
  value: any,
};

export default Debug;
