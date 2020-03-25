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
      const {
        contentWrapperProps,
        clickableWrapperProps,
        headerWrapperProps,
        ...restProps
      } = this.props;

      return (
        <Dropdown
          {...restProps}
          subcomponentProps={{
            'group-content-wrapper': {
              ...contentWrapperProps,
              position: 'right',
              width: '100%',
              borderRadius: '8px',
              backgroundColor: '#d3d3d3',
              padding: '5px',
              marginBottom: '5px',
              opacity: '0.8',
            },
            'group-clickable-wrapper': {
              ...clickableWrapperProps,
            },'group-header-wrapper': {
              marginLeft: 'auto',
              ...headerWrapperProps,
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
