import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isObject, getLayoutLinksOfType, checkForNewLayoutLinks, filterThemes } from '../../../../utils';
import { Box, Text, Icon, Fragment, Tooltip } from '../../../components';
import FormInput from '../input';

class VisualControl extends Component {
  static propTypes = {
    // type: string.isRequired,
    // question: object,
    // onChangeValue: func.isRequired,
    ask: object,
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

    const { contextList } = this.props.ask;

    console.log( this.props );

    const checkContext = ( field ) => {
      return isObject( contextList, { withProperty: 'visualControl' }) ? dlv( contextList, `visualControl.${field}` ) : false;
    };

    const hasLabel = checkContext( 'hasLabel' );
    const hasRequired = checkContext( 'hasRequired' );
    const hasHint = checkContext( 'hasHint' );
    const hasDescription = checkContext( 'hasDescription' );
    const hasIcon = checkContext( 'hasIcon' );
    const hasError = checkContext( 'hasError' );

    // console.log( hasLabel, hasRequired );

    const InputWrapper = hasIcon ? Box : Fragment;

    return (
      /* WRAPPER */
      <Box
        flexDirection="column"
        width="100%"
        justifyContent="centre"
        padding={5}
      >

        {(
          hasLabel
        ) && (
          <Box
            flexDirection="row"
            width="100%"
            paddingBottom={5}
          >

            {/* LABEL */}
            <Box>
              <Text
                size="xs"
                text={this.props.question.name}
                decoration="underline"
              />
            </Box>

            {/* REQUIRED */}
            {(
              hasRequired
            ) && (
              <Box
                paddingLeft={5}
                marginRight="auto"
              >
                <Text
                  text="*"
                  color="red"
                />
              </Box>
            )}

            {/* HINT */}
            {(
              hasHint
            ) && (
              <Box
                paddingLeft={5}
                paddingRight={5}
              >
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
          <Box
            paddingBottom={5}
          >
            <Text
              size="xxs"
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
            <Box
              paddingRight={5}
            >
              <Icon
                name="home"
                color="black"
              />
            </Box>
          )}

          {/* INPUT COMPONENT */}
          <FormInput
            {...restProps}
            padding={3}
            backgroundColor="white"
          />

        </InputWrapper>

        {/* ERROR MESSAGE */}
        {(
          this.props.error != null
        ) && (
          <Box>
            <Text
              size="xxs"
              color="red"
              text={this.props.error}
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
