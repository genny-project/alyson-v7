import React, { Component } from 'react';
import { any, bool, func, string, object, node, oneOf } from 'prop-types';
import { Box, Icon, Touchable }  from '../../components';

class Collapsible extends Component {
  static defaultProps = {
    showHeader: true,
    testID: 'collapsible',
    wrapperProps: {},
    headerWrapperProps: {},
    headerIconProps: {},
    iconPlacement: 'right',
  }

  static propTypes = {
    children: any,
    showHeader: bool,
    // open: bool,
    onToggle: func,
    testID: string,
    wrapperProps: object,
    headerWrapperProps: object,
    headerIconProps: object,
    renderHeader: node,
    isClosed: bool,
    iconPlacement: oneOf(
      ['left', 'right']
    ),
  }

  state = {
    isOpen: false,
  }

  handlePress = () => {
    this.setState( state => ({ isOpen: !state.isOpen }));
  }

  render() {
    const {
      children,
      showHeader,
      testID,
      wrapperProps,
      headerWrapperProps,
      headerIconProps,
      renderHeader,
      isClosed,
      iconPlacement,
    } = this.props;

    const { isOpen } = this.state;

    return (
      <Box
        justifyContent="center"
        flexDirection="column"
        {...wrapperProps}
      >
        {showHeader
          ? (
            <Box
              // header wrapper styling here?
              flex={1}
              justifyContent="space-between"
              flexDirection={`row${iconPlacement === 'right' ? '' : '-reverse'}`}
            >
              {/* header alt goes here */}
              {renderHeader}
              {
                !isClosed
                  ? (
                    <Touchable
                      withFeedback
                      onPress={this.handlePress}
                      testID={testID}
                    >
                      <Box
                        justifyContent="center"
                        alignItems="center"
                        {...headerWrapperProps}
                      >
                        <Box
                          transform={[
                            { rotate: isOpen ? '0deg' : '270deg' },
                          ]}
                          {...headerWrapperProps}
                        >
                          <Icon
                            name="keyboard_arrow_down"
                            color="black"
                            cursor="pointer"
                            {...headerIconProps}
                          />
                        </Box>
                      </Box>
                    </Touchable>
                  ) : null
                }
            </Box>
          ) : null
        }
        {isOpen && !isClosed ? (
          React.Children.map( children, child => (
            React.cloneElement( child, {
              ...child.props,
              isOpen: isOpen,
            })
          ))
        ) : null}
      </Box>
    );
  }
}

export default Collapsible;
