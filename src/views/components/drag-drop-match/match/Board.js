import React from 'react';
import { BoardSquare } from './BoardSquare';
import { Item } from './Item';
/** Styling properties applied to the board element */
const boardStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
};
/** Styling properties applied to each square element */
const squareStyle = { height: '25%' };
/**
 * The chessboard component
 * @param props The react props
 */
const Board = ({ groups, itemPositions = {} }) => {
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
          width: '50%',
          height: '100%',
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

  groups.forEach(( group, index ) => {
    squares.push( renderSquare( index, group.name ));
  });

  space.push( renderSpace());

  return (
    <div style={boardStyle}>
      {squares}
      {space}
    </div>
  );
};

export default Board;
