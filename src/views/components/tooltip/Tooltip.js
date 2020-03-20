import React, { Component } from 'react';
import { object } from 'prop-types';
import { Dropdown }  from '../../components';

class Tooltip extends Component {
    static propTypes = {
      contentWrapperProps: object,
      headerWrapperProps: object,
      clickableWrapperProps: object,
    }

    render() {
      // console.log( 'props--->', { contentWrapperProps, headerWrapperProps, clickableWrapperProps });
      const {
        contentWrapperProps,
        headerWrapperProps,
        clickableWrapperProps,
        ...restProps
      } = this.props;

      return (
        <Dropdown
          {...restProps}
          subcomponentProps={{
            'group-content-wrapper': {
              ...contentWrapperProps,
            },
            'group-header-wrapper': {
              ...headerWrapperProps,
            },
            'group-clickable-wrapper': {
              ...clickableWrapperProps,
            },
          }}
          showIcon={false}
          allowHoverEvents
          allowPressEvents={false}
        />
      );
    }
}

export default Tooltip;
