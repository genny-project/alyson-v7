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
    showIcon: true,
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
    showIcon: bool,
    questionCode: string,
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
      renderHeader,
      isClosed,
      iconPlacement,
      subcomponentProps,
      showIcon,
      questionCode,
    } = this.props;

    const { isOpen } = this.state;

    return (
      <Fragment>
        <Box
          // header wrapper styling here?
          flex={1}
          justifyContent="space-between"
          flexDirection={`row${iconPlacement === 'right' ? '' : '-reverse'}`}
          componentID="GROUP-HEADER-WRAPPER"
          componentCode={questionCode}
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
                  componentID="GROUP-CLICKABLE-WRAPPER"
                  componentCode={questionCode}
                  {...subcomponentProps['group-clickable-wrapper']}
                >
                  {renderHeader}
                  {showIcon ? (
                    <Box
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        transform={[
                          { rotate: isOpen ? '0deg' : '270deg' },
                        ]}
                        componentID="GROUP-ICON"
                        componentCode={questionCode}
                        {...subcomponentProps['group-icon']}
                      >
                        <Icon
                          name="keyboard_arrow_down"
                          color="black"
                          cursor="pointer"
                          componentID="GROUP-ICON"
                          componentCode={questionCode}
                          {...subcomponentProps['group-icon']}
                        />
                      </Box>
                    </Box>
                  ) : null }
                </Touchable>
              ) : null
            }
        </Box>

        <Box
          componentID="GROUP-CONTENT-WRAPPER"
          componentCode={questionCode}
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
