import React from 'react';
import { useDrag } from 'react-dnd';
import { string } from 'prop-types';
import { Fragment, Text } from '../..';

const knightStyle = {
  fontWeight: 'bold',
  cursor: 'move',
};

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
  float: 'left',
  color: 'black',
};

export const DragDropItem = ({ label = 'Item', code }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      label,
      type: code,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Fragment>
      <div
        ref={drag}
        style={{
          ...knightStyle,
          opacity: isDragging ? 0.5 : 1,
          ...style,
        }}
      >
        <Text
          bold
          text={label}
        />
      </div>
    </Fragment>
  );
};

DragDropItem.propTypes = {
  label: string,
  code: string,
};
