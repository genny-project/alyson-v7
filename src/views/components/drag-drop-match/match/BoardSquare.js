import React from 'react';
import { useDrop } from 'react-dnd';
import { Square } from './Square';
import { /* canMoveKnight, */ moveItem } from './Game';
import ItemTypes from './ItemTypes';
import Overlay from './Overlay';

export const BoardSquare = ({ x = null, children, name }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    drop: ( e ) => {
      moveItem( x, e.label );
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      // canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square
        name={name}
      >
        {children}
      </Square>
      {isOver && <Overlay color="yellow" />}
    </div>
  );
};
