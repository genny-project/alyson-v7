import React, { Component, isValidElement } from 'react';
import { object, array, string, any } from 'prop-types';
import { isArray } from '../../../utils';
import { EventButtonLegacy as EventButton } from '../../components-legacy';
import RecursiveLegacy from '../../components-legacy/layout-loader/RecursiveLegacy';

class Selectable extends Component {
  static defaultProps = {
  }

  static propTypes = {
    context: object,
    selectionProps: object.isRequired,
    children: array,
    id: string.isRequired,
    item: any.isRequired,
  }

  handlePress = () => {
    const { selectionProps, id, item } = this.props;
    const { onSelect } = selectionProps;

    if ( onSelect ) onSelect( id, item );
  }

  render() {
    const { children, selectionProps, id, ...restProps } = this.props;

    if ( !isArray( children )) {
      if ( isValidElement )
        return children;

      return (
        <RecursiveLegacy {...children} />
      );
    }

    return children.map(( child, index ) => (
      <EventButton
        {...restProps}
        key={index} // eslint-disable-line react/no-array-index-key
        onPress={this.handlePress}
      >
        <RecursiveLegacy
          {...child.props}
          context={{
            ...child.props.context,
            selectable: {
              isSelected: selectionProps.selectedItem === id,
            },
          }}
        />
      </EventButton>
    ));
  }
}

export default Selectable;
