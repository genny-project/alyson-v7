import React from 'react';
import { string, oneOf } from 'prop-types';
import { Icon, Text } from '../../../../components';

const InputFilePlaceholder = ({
  text,
  name,
  type = 'text',
  showPlaceholder = true,
  ...restProps
}) => {
  if ( showPlaceholder !== true ) {
    return null;
  }

  switch ( type ) {
    case 'icon':
      return (
        <Icon
          name={name}
          {...restProps}
        />
      );
    default:
      return (
        <Text
          text={text}
          {...restProps}
        />
      );
  }
};

InputFilePlaceholder.propTypes = {
  text: string,
  name: string,
  transform: oneOf(
    ['text', 'icon']
  ),
};

export default InputFilePlaceholder;
