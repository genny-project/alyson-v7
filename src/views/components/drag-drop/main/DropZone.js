import React from 'react';
import { useDrop } from 'react-dnd';
import { string, node } from 'prop-types';
import { Square } from './Square';
import { moveItem } from './Game';
import Overlay from './Overlay';
import { isInteger } from '../../../../utils';

export const DropZone = ({ x = null, children, name, code /* moveItem */ }) => {
  const [{ isOver }, drop] = useDrop({
    // accept: ItemTypes.KNIGHT,
    accept: code,
    drop: ( e ) => {
      moveItem( x, e.label, code );
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
      }}
    >
      <Square
        name={name}
        backgroundColor={isInteger( x ) ? 'white' : null}
      >
        {children}
      </Square>
      {isOver && <Overlay color="yellow" />}
    </div>
  );
};

DropZone.propTypes = {
  x: string,
  children: node,
  name: string,
  code: string,
};
