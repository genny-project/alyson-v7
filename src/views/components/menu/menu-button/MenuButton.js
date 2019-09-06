import React, { Component } from 'react';
import { node, string } from 'prop-types';
import { Touchable, Area  } from '../../index';
import MenuConsumer from '../consumer';

class MenuButton extends Component {
  static propTypes = {
    children: node.isRequired,
    testID: string,
  }

  render() {
    const { children, testID, ...restProps } = this.props;

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
                      props.updateArea();
                      handleToggle( event );
                    }}
                    onRef={ref => setRef( ref, 'button' )}
                    alignSelf="flex-start"
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
