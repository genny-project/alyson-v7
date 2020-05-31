import React from 'react';
import { Text as NativeText, Platform } from 'react-native';
import { string, number, oneOf, oneOfType, bool, node } from 'prop-types';
import capitalize from 'lodash.capitalize';
import upperCase from 'lodash.uppercase';
import lowerCase from 'lodash.lowercase';
import { TEXT_SIZES } from '../../../constants';
import { isString } from '../../../utils';

import { Typography } from '@material-ui/core';

const colors = {
  black: 'black',
  green: 'green',
  red: 'red',
  blue: 'blue',
  white: 'white',
  transparent: 'transparent',
};

const transforms = {
  upperCase: text => upperCase( text ),
  lowerCase: text => lowerCase( text ),
  capitalize: text => capitalize( text ),
};

const Text = ({
  children,
  color = 'black',
  decoration = 'none',
  fontWeight,
  height,
  size = 'sm',
  textAlign,
  alignSelf = 'center',
  width,
  bold,
  fontFamily,
  text,
  transform,
  whiteSpace = 'normal',
  cursor,
  componentID,
  componentCode,
  fontStyle = 'normal',
}) => {
  const style = {
    textDecorationLine: decoration,
    fontWeight: bold ? 'bold' : fontWeight,
    height,
    fontSize: TEXT_SIZES[size],
    textAlign,
    width,
    color: colors[color] || color,
    fontFamily:
      fontFamily ||
      Platform.select({
        web: 'system-ui, sans-serif',
        native: 'System',
      }),
    cursor,
    whiteSpace,
    alignSelf: alignSelf,
    fontStyle,
  };

  let child = text || children;

  if ( transform && transforms[transform] ) {
    child = transforms[transform]( child );
  }

  return (
    <Typography
      style={ style }
      data-component-type="TEXT"
      data-component-id={isString( componentID, { ofMinLength: 1 }) ? componentID : null}
      data-component-code={isString( componentCode, { ofMinLength: 1 }) ? componentCode : null}
      color={color || 'inherit'}
    >
      {child}
    </Typography>
  );
};

Text.propTypes = {
  text: oneOfType( [number, string] ),
  color: string,
  decoration: oneOf( ['none', 'underline'] ),
  fontWeight: string,
  size: string,
  height: oneOfType( [number, string] ),
  children: oneOfType( [number, string, node] ),
  textAlign: oneOf( ['auto', 'left', 'right', 'center', 'justify'] ),
  width: oneOfType( [number, string] ),
  bold: bool,
  fontFamily: string,
  transform: oneOf( ['upperCase', 'lowerCase', 'capitalize'] ),
  whiteSpace: oneOf( ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'initial', 'inherit'] ),
  cursor: oneOf( ['default', 'none', 'auto', 'help', 'pointer', 'wait', 'text'] ),
  alignSelf: oneOf( ['normal', 'auto', 'center', 'flex-start', 'flex-end'] ),
  componentID: string,
  componentCode: string,
  fontStyle: oneOf( ['normal', 'italic'] ),
};

export default Text;
