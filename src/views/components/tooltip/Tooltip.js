import React, { Component } from 'react';
import { Dropdown }  from '../../components';

class Tooltip extends Component {
  render() {
    const {
      ...restProps
    } = this.props;

    return (
      <Dropdown
        {...restProps}
        subcomponentProps={{
          'group-content-wrapper': {
            position: 'right',
            width: '100%',
            bottom: '100%',
            borderRadius: '3px',
            backgroundColor: '#fff',
            padding: '5px',
            marginBottom: '5px',
            color: '#000',
            textAlign: 'center',
            fontSize: '12px',
            flexDirection: 'row',
            offsetY: 4,
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
