import React from 'react';
import { Text } from 'react-native';
import { oneOf, string } from 'prop-types';
import styles from './Icon.style';
import { isString } from '../../../utils';

const sizes = {
  xs: 16,
  sm: 18,
  smd: 20,
  md: 24,
  lg: 36,
  xl: 48,
};

const colors = {
  white: 'white',
  black: 'black',
  red: 'red',
  blue: 'blue',
  green: 'green',
  grey: 'grey',
  lightGrey: 'lightgrey',
  yellow: 'yellow',
};

const materialIconTypes = {
  outlined: 'Outlined',
  ['two-tone']: 'Two Tone',
  round: 'Round',
  sharp: 'Sharp',
};

const Icon = ({
  name,
  color = 'white',
  size = 'md',
  cursor = 'auto',
  componentID,
  componentCode,
}) => {
  const materialIconType = isString( name, { includes: '__' })
    ? name.split( '__' )[1]
    : null;

  const iconName = isString( name, { includes: '__' })
    ? name.split( '__' )[0]
    : name;

  const style = {
    fontFamily: `Material Icons${materialIconTypes[materialIconType] ? ` ${materialIconTypes[materialIconType]}` : ''}`,
    whiteSpace: 'nowrap',
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: sizes[size],
    direction: 'ltr',
    fontSize: sizes[size],
    color: colors[color] || color,
    cursor,
  };

  return (
    <Text
      style={[
        styles.wrapper,
        style,
      ]}
      data-component-type="ICON"
      data-component-id={isString( componentID, { ofMinLength: 1 }) ? componentID : null}
      data-component-code={isString( componentCode, { ofMinLength: 1 }) ? componentCode : null}
    >
      {iconName && iconName !== 'undefined' && iconName.includes( '-' ) ? iconName.replace( /-/g, '_' ) : iconName}
    </Text>
  );
};

Icon.propTypes = {
  name: string.isRequired,
  color: string,
  size: oneOf( ['xs', 'sm', 'md', 'lg', 'xl'] ),
  cursor: oneOf( ['default', 'none', 'auto', 'help', 'pointer', 'wait', 'text'] ),
  componentID: string,
  componentCode: string,
};

export default Icon;
