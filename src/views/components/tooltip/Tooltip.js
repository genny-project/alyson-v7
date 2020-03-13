import React from 'react';
import PropTypes from 'prop-types';
import Hover from '../hover/Hover.js';
// import { Box, Text, Fragment, Dropdown } from '../../components';

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  },
};

export default function Tooltip({ text, children }) {
  return (
    <Hover>
      {
        ( isOpen ) => (
          <div
            style={styles.container}
          >
            {isOpen === true && (
            <div style={styles.tooltip}>
              {' '}
              {text}
              {' '}
            </div>
            )}
            {
              React.Children.map( children, child => (
                React.cloneElement( child, {
                  ...child.props,
                })
              ))
            }
          </div>
        )
      }

    </Hover>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
