import React from 'react';
import { string, bool, any, func } from 'prop-types';
import { Bridge } from '../../../utils';
import { Button } from '../../components';

const EventButton = ({
  code = '',
  parentCode = '',
  rootCode = '',
  disabled = false,
  onPress,
  children,
  eventType = 'BTN_CLICK',
  messageType = 'BTN',
  showSpinnerOnClick = true,
  testID = 'event-button',
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

  return (
    <Button
      {...addedProps}
      testID={testID}
    >
      {children}
    </Button>
  );
};

EventButton.propTypes = {
  children: any,
  code: string.isRequired,
  parentCode: string.isRequired,
  rootCode: string.isRequired,
  onPress: func,
  disabled: bool,
  eventType: string,
  messageType: string,
  showSpinnerOnClick: bool,
  testID: string,
};

export default EventButton;
