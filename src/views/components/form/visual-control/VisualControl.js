import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isObject, getLayoutLinksOfType, checkForNewLayoutLinks, filterThemes, getPropsFromThemes } from '../../../../utils';
import { Box, Text, Icon, Fragment, Tooltip } from '../../../components';
import FormInput from '../input';

const linkValues = [
  'wrapper',
  'input',
  'icon',
  'label',
  'description',
  'hint',
  'error',
  'required',
];

const inputStates = [
  'default',
  'hover',
  'active',
  'disabled',
];

class VisualControl extends Component {
  static propTypes = {
    // type: string.isRequired,
    // question: object,
    // onChangeValue: func.isRequired,
    ask: object,
    asks: object,
    inheritedProps: object,
    inheritedThemes: object,
    themes: object,
  }

  state = {
    themes: [],
  }

  /* eslint-disable react/sort-comp */

  componentDidMount() {
    this.getThemes();
  }

  componentDidUpdate( nextProps ) {
    if ( isObject( dlv( nextProps, `asks.${nextProps.question.code}` ))) {
      const hasNewLinks = checkForNewLayoutLinks(
        this.state.themes,
        dlv( nextProps, `asks.${nextProps.question.code}.links` ),
        nextProps,
      );

      if ( hasNewLinks ) {
        this.getThemes();
      }
    }
  }

  getThemes = () => {
    const { ask, asks } = this.props;

    if ( !ask ) {
      return null;
    }

    const { questionCode } = ask;

    if ( !asks || !asks[questionCode] ) {
      return null;
    }

    const askData = asks[questionCode];

    /* filter each of the links based on their type */
    const linkedThemes = getLayoutLinksOfType( askData.links, this.props, 'theme' );

    /* update the state  */
    this.updateThemes( linkedThemes );
  }

  updateThemes = ( links ) => {
    /* check if the stateKey is valid  */
    this.setState({
      ['themes']: [
        ...links,
      ],
    }, () => {});
  }

  getInhertiableThemes = ( panel ) => {
    return [
      ...this.props.inheritedThemes,
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        {
          panel: panel,
          onlyInheritableThemes: true,
        }
      ),
    ];
  }

  getStyling = ( componentType ) => {
    // filter links for panel
    const inheritedLinks = [
      ...filterThemes(
        this.props.inheritedThemes,
        this.props.themes,
        {
          component: componentType,
        }
      ),
    ];

    const panelLinks = [
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        {
          component: componentType,
        }
      ),
    ];

    // get props from theme links
    const inheritedThemeProps = getPropsFromThemes( inheritedLinks, this.props.themes );
    const themeProps = getPropsFromThemes( panelLinks, this.props.themes );

    return {
      ...this.props.inheritedProps,
      ...inheritedThemeProps,
      ...themeProps,
    };
  }

  render() {
    const {
      ...restProps
    } = this.props;

    const { contextList } = this.props.ask;

    // console.log( this.props );

    const checkContext = ( field ) => {
      return isObject( contextList, { withProperty: 'visualControl' }) ? dlv( contextList, `visualControl.${field}` ) : false;
    };

    const hasLabel = checkContext( 'hasLabel' );
    const hasRequired = checkContext( 'hasRequired' );
    const hasHint = checkContext( 'hasHint' );
    const hasDescription = checkContext( 'hasDescription' );
    const hasIcon = checkContext( 'hasIcon' );
    const hasError = checkContext( 'hasError' );

    const InputWrapper = hasIcon ? Box : Fragment;

    const inputProps = {
      ...this.props,
      theme: this.getStyling( 'input' ),
    };

    return (
      /* WRAPPER */
      <Box
        flexDirection="column"
        flex={1}
        justifyContent="centre"
        // padding={5}
        {...this.getStyling( 'wrapper' )}
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
            <Box
              {...this.getStyling( 'label' )}
            >
              <Text
                size="xs"
                text={this.props.question.name}
                decoration="underline"
                {...this.getStyling( 'label' )}
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
                cursor="pointer"
                {...this.getStyling( 'hint' )}
              >
                <Icon
                  name="help"
                  size="xs"
                  color="grey"
                  cursor="help"
                  {...this.getStyling( 'hint' )}
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
            {...this.getStyling( 'description' )}
          >
            <Text
              size="xxs"
              text="Description text goes here"
              {...this.getStyling( 'description' )}
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
              {...this.getStyling( 'icon' )}
            >
              <Icon
                name="home"
                color="black"
                cursor="default"
                {...this.getStyling( 'icon' )}
              />
            </Box>
          )}

          {/* INPUT COMPONENT */}
          <FormInput
            {...inputProps}
            inhertiableStyling={this.getInhertiableThemes()}
            padding={3}
            // backgroundColor="white"
          />

        </InputWrapper>

        {/* ERROR MESSAGE */}
        {(
          this.props.error != null
        ) && (
          <Box
            {...this.getStyling( 'error' )}
          >
            <Text
              size="xxs"
              color="red"
              text={this.props.error}
              {...this.getStyling( 'error' )}
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
