import React, { useState, useEffect } from 'react';
import Board from './Board';
import { observeItem } from './Game';

const containerStyle = {
  width: 500,
  height: 300,
  border: '1px solid gray',
};

/*
 * The Chessboard Tutorial Application
 */

const Match = ({ groups, items }) => {
  const initialPositions = {};

  items.forEach( item => {
    initialPositions[item.name] = null;
  });

  const [itemPos, setItemPos] = useState( initialPositions );

  // update hook to store position of multiple items

  // the observe function will return an unsubscribe callback
  useEffect(() => observeItem( newPos => {
    setItemPos( newPos );
  }));
  // update hook to set positions of multiple items

  return (
    <div>
      <div style={containerStyle}>
        <Board
          groups={groups}
          itemPositions={itemPos}
        />
      </div>
    </div>
  );
};

export default Match;
