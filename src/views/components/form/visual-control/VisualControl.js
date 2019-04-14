import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isObject, getLayoutLinksOfType, checkForNewLayoutLinks, filterThemes } from '../../../../utils';
import { Box, Text, Icon, Fragment } from '../../index';
import FormInput from '../input';

class VisualControl extends Component {
  static propTypes = {
    // type: string.isRequired,
    // question: object,
    // onChangeValue: func.isRequired,
    // ask: object,
    // asks: object,
    // inheritedThemes: object,
    // themes: object,
  }

  state = {
  }

  render() {
    const {
      ...restProps
    } = this.props;

    const hasLabel = false;
    const hasRequired = false;
    const hasHint = false;
    const hasDescription = false;
    const hasIcon = false;
    const hasError = false;

    const InputWrapper = hasIcon ? Box : Fragment;

    return (
      /* WRAPPER */
      <Box
        flexDirection="column"
        width="100%"
        justifyContent="centre"
      >

        {(
          hasLabel ||
          hasRequired ||
          hasHint
        ) && (
          <Box
            flexDirection="row"
            width="100%"
          >

            {/* LABEL */}
            {(
              hasLabel
            ) && (
              <Box>
                <Text
                  text="Label"
                />
              </Box>
            )}

            {/* REQUIRED */}
            {(
              hasRequired
            ) && (
              <Box>
                <Text
                  text="*"
                />
              </Box>
            )}

            {/* HINT */}
            {(
              hasHint
            ) && (
              <Box>
                <Text
                  text="?"
                />
              </Box>
            )}

          </Box>
        )}

        {/* DESCRIPTION */}
        {(
          hasDescription
        ) && (
          <Box>
            <Text
              text="Description text goes here"
            />
          </Box>
        )}

        <InputWrapper
          flexDirection="row"
          width="100%"
        >

          {/* ICON */}
          {(
            hasIcon
          ) && (
            <Box>
              <Icon
                name="home"
              />
            </Box>
          )}

          {/* INPUT COMPONENT */}
          <FormInput
            {...restProps}
          />

        </InputWrapper>

        {/* ERROR MESSAGE */}
        {(
          hasError
        ) && (
          <Box>
            <Text
              text="Error message goes here"
            />
          </Box>
        )}
      </Box>
    );
  }
}

export { VisualControl };

const mapStateToProps = state => ({
  themes: state.vertx.layouts.themes,
  asks: state.vertx.layouts.asks,
});

export default connect( mapStateToProps )( VisualControl );
