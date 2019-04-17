import React, { Component } from 'react';
import { object, array } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { Input } from '../../../index';
import { isArray, isObject, getLayoutLinksOfType, filterThemes, getPropsFromThemes } from '../../../../../utils';

class FormInputDropdown extends Component {
  static propTypes = {
    question: object,
    baseEntities: object,
    themes: object,
    inheritedThemes: array,
    inheritedProps: object,
  }

  state = {
    items: [],
  }

  componentDidMount() {
    this.setInitialItems();
  }

  componentDidUpdate() {
    this.checkForUpdatedItems();
  }

  setInitialItems() {
    const items = this.getItems();

    this.setState({ items });
  }

  getItems() {
    const { data, links } = this.props.baseEntities;
    const { validationList } = this.props.question.attribute.dataType;
    const items = [];

    if ( !isArray( validationList, { ofMinLength: 1 }))
      return items;

    validationList.forEach( validation => {
      if (
        validation.selectionBaseEntityGroupList &&
        validation.selectionBaseEntityGroupList instanceof Array &&
        validation.selectionBaseEntityGroupList.length > 0
      ) {
        validation.selectionBaseEntityGroupList.forEach( baseEntity => {
          const linkGroup = links[baseEntity];

          if (
            isObject( linkGroup )
          ) {
            const linkValues = Object.keys( linkGroup ).map( x => x );

            linkValues.forEach( linkValue => {
              if ( isArray( linkGroup[linkValue] )) {
                linkGroup[linkValue].forEach( link => {
                  const baseEntity = dlv( data, link.link.targetCode );

                  // get all links, check for themes for this base entity

                  const linkedThemes = isArray( baseEntity.links )
                    ? getLayoutLinksOfType( baseEntity.links.map( link => ({ type: 'theme', code: link.link.targetCode })), this.props, 'theme' )
                    : [];

                  const getStyling = () => {
                    // filter links for panel
                    const inheritedLinks = [
                      ...filterThemes(
                        this.props.inheritedThemes,
                        this.props.themes,
                      ),
                    ];

                    const panelLinks = [
                      ...filterThemes(
                        linkedThemes,
                        this.props.themes,
                      ),
                    ];

                    // get props from theme links
                    const inheritedThemeProps = getPropsFromThemes(
                      inheritedLinks,
                      this.props.themes,
                    );
                    const themeProps = getPropsFromThemes( panelLinks, this.props.themes );

                    const props = {
                      ...this.props.inheritedProps,
                      ...inheritedThemeProps,
                      ...themeProps,
                    };

                    // console.log( 'props', baseEntity.code, props );

                    return props;
                  };

                  // console.log( 'links', baseEntity.links, linkedThemes );
                  // console.log( 'themes', style );

                  if ( isObject( baseEntity )) {
                    items.push({
                      label: baseEntity.name,
                      value: baseEntity.code,
                      weight: link.weight || 1,
                      style: getStyling(),
                    });
                  }
                });
              }
            });
          }
        });
      }
    });

    return items;
  }

  checkForUpdatedItems() {
    const { items } = this.state;
    const newItems = this.getItems();

    // TODO check for new theme information

    if (
      items.length === 0 &&
      newItems.length > 0
    ) {
      this.setState({ items: newItems });

      return;
    }

    if (
      items.length > 0 &&
      newItems.length === 0
    ) {
      this.setState({ items: newItems });

      return;
    }

    for ( let i = 0; i < items.length; i++ ) {
      const item = items[i];
      const newItem = newItems[i];

      if ( !newItem ) {
        this.setState({ items: newItems });

        return;
      }

      if ( item.value !== newItem.value ) {
        this.setState({ items: newItems });

        return;
      }
    }
  }

  focus() {
    if (
      this.input &&
      this.input.focus
    ) {
      this.input.focus();
    }
  }

  render() {
    const { ...restProps } = this.props;
    const { items } = this.state;

    // console.log( 'render', items );

    return (
      <Input
        {...restProps}
        items={items}
        ref={input => this.input = input}
      />
    );
  }
}

export { FormInputDropdown };

const mapStateToProps = state => ({
  themes: state.vertx.layouts.themes,
  baseEntities: state.vertx.baseEntities,
});

export default connect( mapStateToProps )( FormInputDropdown );
