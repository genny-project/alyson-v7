import React from 'react';
import { string, node } from 'prop-types';

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
  // backgroundColor: 'white',
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

export const Square = ({ backgroundColor, children, name }) => {
  // const backgroundColor = black ? 'black' : 'white';

  return (
    <div
      style={{
        ...squareStyle,
        backgroundColor,
        // backgroundColor,
        ...( name ? nameStyle : {}),
        ...( children != null ? squareWithChildrenStyle : {}),
        ...( children != null && !name ? { flexWrap: 'wrap' } : {}),
      }}
    >
      {/* {
        name ? (
          <div
            style={{ ...nameStyle }}
          >
            {name}
          </div>
        ) : null
      } */}
      {children}
    </div>
  );
};

Square.propTypes = {
  backgroundColor: string,
  children: node,
  name: string,
};
