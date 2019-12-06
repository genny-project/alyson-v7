import React from 'react';

const squareStyle = {
  // width: '100%',
  // height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 10,
};

const nameStyle = {
  border: '1px solid gray',
  backgroundColor: 'white',
  padding: '0px',
  cursor: 'move',
  float: 'left',
  color: 'black',
  minWidth: '100px',
  minHeight: '35px',
};

const squareWithChildrenStyle = {
  padding: '0px',
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
        ...( name ? nameStyle : {}),
        ...( children != null ? squareWithChildrenStyle : {}),
        ...( children != null && !name ? { flexWrap: 'wrap' } : {}),
      }}
    >
      {children}
    </div>
  );
};
