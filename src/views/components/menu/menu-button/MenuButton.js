import React, { Component } from 'react';
import { node, string, func, bool } from 'prop-types';
import { Touchable, Area  } from '../../index';
import MenuConsumer from '../consumer';

class MenuButton extends Component {
  static propTypes = {
    children: node.isRequired,
    testID: string,
    onPress: func,
    suppressToggle: bool,
  }

  render() {
    const { children, testID, onPress, suppressToggle, ...restProps } = this.props;

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
                      // console.log( 'touchable press' );
                      !suppressToggle && handleToggle( event );
                      onPress ? onPress() : null;
                      props.updateArea();
                    }}
                    onRef={ref => setRef( ref, 'button' )}
                    alignSelf="flex-start"
                    // onFocus={() => {
                    //   console.log( 'touchable focus' );
                    //   this.props.onFocus && this.props.onFocus();
                    // }}
                    // onBlur={() => {
                    //   console.log( 'touchable blur' );
                    //   this.props.onBlur && this.props.onBlur();
                    // }}
                    onLayout={() => props.updateArea()}
                  >
                    <span
                      ref={props.setObserve}
                      style={{
                        display: 'flex',
                        width: '100%',
                        zIndex: 10,
                        position: 'relative',
                        flexDirection: 'row',
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
