import React from 'react';

const squareStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const squareWithNameStyle = {
  justifyContent: 'flex-start',
};

const nameStyle = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
  float: 'left',
  color: 'black',
  width: '100px',
};

const squareWithChildrenStyle = {
  paddingLeft: '10px',
  width: 'calc( 100% - 10px )',
};

export const Square = ({ black, children, name }) => {
  const backgroundColor = black ? 'black' : 'white';
  const color = black ? 'white' : 'black';

  return (
    <div
      style={{
        ...squareStyle,
        color,
        backgroundColor,
        ...( name ? squareWithNameStyle : {}),
        ...( children != null ? squareWithChildrenStyle : {}),
        ...( !name && children ? { flexDirection: 'column' } : {}),
      }}
    >
      {
        name ? (
          <div
            style={{ ...nameStyle }}
          >
            {name}
          </div>
        ) : null
      }
      {children}
    </div>
  );
};
