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
              bottom: '100%',
              borderRadius: '3px',
              backgroundColor: '#d3d3d3',
              padding: '5px',
              marginBottom: '5px',
              color: '#000',
              textAlign: 'center',
              fontSize: '12px',
              flexDirection: 'row',
              opacity: '0.8',
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
