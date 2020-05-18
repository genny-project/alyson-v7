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
              // width: '100%',
              width: 200,
              borderRadius: 8,
              backgroundColor: '#d3d3d3',
              padding: 4,
              marginBottom: 4,
              // opacity: '0.8',
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
