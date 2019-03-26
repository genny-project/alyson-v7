import React from 'react';
import { string, bool, any, func } from 'prop-types';
import { Bridge } from '../../../utils';
import { Touchable } from '../../components';

const EventTouchable = ({
  code = '',
  parentCode = '',
  rootCode = '',
  onPress,
  disabled,
  children,
  eventType = 'BTN_CLICK',
  messageType = 'BTN',
  showSpinnerOnClick = true,
  ...restProps
}) => {
  const handlePress = event => {
    if ( disabled ) {
      event.preventDefault();
      event.stopPropagation();

      return false;
    }

    if (
      code &&
      parentCode
    ) {
      Bridge.sendFormattedEvent(
        {
          code,
          parentCode,
          rootCode,
          eventType,
          messageType,
        }
      );
    }

    if ( onPress )
      onPress( event );
  };

  if ( typeof children === 'function' ) {
    return children({
      onPress: handlePress,
    });
  }

  const addedProps = {
    ...restProps,
    onPress: handlePress,
    showSpinnerOnClick,
  };

  return React.createElement(
    Touchable,
    addedProps,
    children
  );
};

EventTouchable.propTypes = {
  children: any,
  code: string.isRequired,
  parentCode: string.isRequired,
  rootCode: string.isRequired,
  onPress: func,
  disabled: bool,
  eventType: string,
  messageType: string,
  showSpinnerOnClick: bool,
};

export default EventTouchable;
