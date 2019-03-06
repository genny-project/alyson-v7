import React from 'react';
import { string, oneOf, oneOfType, number } from 'prop-types';
import { Box, Icon } from '../../components';
import { isString, isInteger } from '../../../utils';

const style = {
  contain: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
  cover: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
};

const Image = ({
  width = '100%',
  height = '100%',
  source,
  testID = 'image',
  fit = 'none',
  color = 'white',
  backgroundColor = 'transparent',
}) => {
  const shouldScaleImage = fit => fit === 'cover' || fit === 'contain';

  const isScaledImage = shouldScaleImage( fit );

  const cssstyle = {
    width: width,
    height: height,
  };

  if (
    isString( source, { ofMinLength: 1 }) &&
    source !== 'undefined'
  ) {
    return (
      isScaledImage && (
        isInteger( width ) ||
        isInteger( height )
      )
        ? (
          <div
            style={{
              ...style[fit],
              height,
              width,
              backgroundColor: backgroundColor,
              backgroundImage: `url('${source}')`,
            }}
            role="img"
          />
        )
        : (
          <img
            style={cssstyle}
            src={source}
          />
        )
    );
  }

  return (
    <Box
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      justifyContent="center"
      alignItems="center"
      testID={testID}
    >
      <Icon
        name="photo"
        color={color}
        size="lg"
      />
    </Box>
  );
};

Image.propTypes = {
  width: oneOfType(
    [string, number]
  ),
  height: oneOfType(
    [string, number]
  ),
  source: string,
  fit: oneOf(
    ['none', 'cover', 'contain']
  ),
  color: string,
  backgroundColor: string,
  testID: string,
};

export default Image;
