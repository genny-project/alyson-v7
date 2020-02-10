import React, { Component } from 'react';
import { node, string, func } from 'prop-types';
import { Touchable, Area  } from '../../index';
import MenuConsumer from '../consumer';

class MenuButton extends Component {
  static propTypes = {
    children: node.isRequired,
    testID: string,
    onPress: func,
  }

  render() {
    const { children, testID, onPress, ...restProps } = this.props;

    return (
      <MenuConsumer>
        {({ handleToggle, setButtonArea, setRef }) => {
          return (
            <Area
              onUpdate={setButtonArea}
            >
              {( props ) => {
                return (
                  <Touchable
                    {...restProps}
                    withFeedback
                    testID={testID}
                    onPress={( event ) => {
                      handleToggle( event );
                      onPress ? onPress() : null;
                      props.updateArea();
                    }}
                    onRef={ref => setRef( ref, 'button' )}
                    alignSelf="flex-start"
                    onFocus={() => {
                      console.log( 'touchable focus' );
                    }}
                    onBlur={() => {console.log( 'touchable blur' );}}
                  >
                    <span
                      ref={props.setObserve}
                      style={{
                        display: 'flex',
                      }}
                    >
                      {children}
                    </span>
                  </Touchable>
                );
              }}
            </Area>
          );
        }}
      </MenuConsumer>
    );
  }
}

export default MenuButton;
