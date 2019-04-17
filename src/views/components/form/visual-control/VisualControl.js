import React, { Component } from 'react';
import { string, object, bool } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isArray, isObject, getLayoutLinksOfType, checkForNewLayoutLinks, filterThemes, getPropsFromThemes } from '../../../../utils';
import { Box, Text, Icon, Fragment /* Tooltip */ } from '../../../components';
import FormInput from '../input';

/*
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
*/

class VisualControl extends Component {
  static propTypes = {
    // type: string.isRequired,
    question: object,
    // onChangeValue: func.isRequired,
    ask: object,
    asks: object,
    inheritedProps: object,
    inheritedThemes: object,
    themes: object,
    error: string,
    required: bool,
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

  getInhertiableThemes = () => {
    return [
      ...this.props.inheritedThemes,
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        {
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
      inheritedThemes,
      themes,
      ...restProps
    } = this.props;

    let properties = {};

    const checkThemeForProperties = ( linkedThemes ) => {
      if ( !isArray( linkedThemes )) return;

      linkedThemes.forEach( linkedTheme => {
        const themeProperties = dlv( themes, `${linkedTheme.code}.properties` );

        if ( isObject( themeProperties )) {
          properties = {
            ...properties,
            ...themeProperties,
          };
        }
      });
    };

    checkThemeForProperties( inheritedThemes );
    checkThemeForProperties( this.state.themes );

    const InputWrapper = properties.renderVisualControlIcon ? Box : Fragment;

    const inputProps = {
      ...restProps,
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
          properties.renderVisualControlLabel
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
              properties.renderVisualControlRequired &&
              this.props.required
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
              properties.renderVisualControlHint
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
          properties.renderVisualControlDescription
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
            properties.renderVisualControlIcon
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
            inheritedProps={this.getInhertiableThemes()}
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
