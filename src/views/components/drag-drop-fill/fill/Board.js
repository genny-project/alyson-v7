import React from 'react';
import { BoardSquare } from './BoardSquare';
import { Item } from './Item';
/** Styling properties applied to the board element */
const boardStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};
const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center',
  paddingBottom: 10,
};
/** Styling properties applied to each square element */
const squareStyle = {  };
/**
 * The chessboard component
 * @param props The react props
 */
const Board = ({ groups, content, itemPositions = {} }) => {
  function renderSquare( i, name ) {
    const x = i;
    // const y = Math.floor( i / 8 );

    return (
      <div
        key={i}
        style={squareStyle}
      >
        <BoardSquare
          x={x}
          // y={y}
          name={name}
        >
          {renderPiece( x )}
        </BoardSquare>
      </div>
    );
  }

  function renderSpace() {
    return (
      <div
        key="space"
        style={{
          // width: '50%',
          // height: '100%',
        }}
      >
        <BoardSquare>
          {renderPiece( null )}
        </BoardSquare>
      </div>
    );
  }

  function renderPiece( x ) {
    const items = [];

    Object.keys( itemPositions ).forEach( itemKey => {
      const shouldRenderItem = itemPositions[itemKey] === x;

      if ( shouldRenderItem ) {
        items.push(
          <Item
            key={itemKey}
            label={itemKey}
          />
        );
      };
    });

    return items.length > 0 ? items : null;
  }

  const squares = [];
  const space = [];
  const split = content.split( '{{BOX}}' );

  split.forEach(( text, index, array ) => {
    text.split( ' ' ).forEach( string => {
      squares.push(
        <span
          style={{
            whiteSpace: 'pre',
          }}
        >
          {`${string} `}
        </span>
      );
    });

    if ( index + 1 < array.length ) {
      squares.push(
        renderSquare( index, 'box' )
      );
    }
  });

  space.push( renderSpace());

  return (
    <div style={boardStyle}>
      <div style={containerStyle}>
        {squares}
      </div>
      {space}
    </div>
  );
};

export default Board;
