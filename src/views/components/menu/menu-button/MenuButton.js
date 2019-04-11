import React, { Component } from 'react';
import { node, string } from 'prop-types';
import { Touchable, Area } from '../../index';
import MenuConsumer from '../consumer';

class MenuButton extends Component {
  static propTypes = {
    children: node.isRequired,
    testID: string,
  }

  render() {
    const { children, testID } = this.props;

    return (
      <MenuConsumer>
        {({ handleToggle, setButtonArea, setRef }) => {
          return (
            <Area
              identifier={`button-${testID}`}
              onChange={setButtonArea}
            >
              {( props ) => {
                return (
                  <Touchable
                    withFeedback
                    onPress={handleToggle}
                    onRef={ref => setRef( ref, 'button' )}
                    alignSelf="flex-start"
                  >
                    <span
                      ref={props.setObserve}
                      style={{ display: 'flex' }}
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
