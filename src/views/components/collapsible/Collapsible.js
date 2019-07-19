import React, { Component } from 'react';
import { any, bool, func, string, object, node, oneOf } from 'prop-types';
import { Box, Icon, Touchable, Fragment }  from '../../components';

class Collapsible extends Component {
  static defaultProps = {
    testID: 'collapsible',
    wrapperProps: {},
    headerWrapperProps: {},
    headerIconProps: {},
    iconPlacement: 'right',
  }

  static propTypes = {
    children: any,
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
    disabled: bool,
    color: string,
    backgroundColor: string,
    subcomponentProps: object,
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
      testID,
      wrapperProps,
      headerWrapperProps,
      headerIconProps,
      renderHeader,
      isClosed,
      iconPlacement,
      subcomponentProps,
    } = this.props;

    const { isOpen } = this.state;

    return (
      <Fragment>
        <Box
          // header wrapper styling here?
          flex={1}
          justifyContent="space-between"
          flexDirection={`row${iconPlacement === 'right' ? '' : '-reverse'}`}
          {...subcomponentProps['group-header-wrapper']}
        >
          {/* header alt goes here */}
          {/* {renderHeader} */}
          {
            !isClosed
              ? (
                <Touchable
                  withFeedback
                  onPress={this.handlePress}
                  testID={testID}
                >
                  {renderHeader}
                  <Box
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      transform={[
                        { rotate: isOpen ? '0deg' : '270deg' },
                      ]}
                      {...subcomponentProps['group-icon']}
                    >
                      <Icon
                        name="keyboard_arrow_down"
                        color="black"
                        cursor="pointer"
                        {...subcomponentProps['group-icon']}
                      />
                    </Box>
                  </Box>
                </Touchable>
              ) : null
            }
        </Box>

        <Box
          {...subcomponentProps['group-content-wrapper']}
        >
          {isOpen && !isClosed ? (
            React.Children.map( children, child => (
              React.cloneElement( child, {
                ...child.props,
                isOpen: isOpen,
              })
            ))
          ) : null}
        </Box>
      </Fragment>
    );
  }
}

export default Collapsible;
